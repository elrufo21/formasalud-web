import { renderToBuffer } from "@react-pdf/renderer";
import { readFile, writeFile, unlink, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { api, Certificate } from "@/lib/api";
import { CertificatePdfDocument } from "@/features/certificates/CertificatePdfDocument";
import { mapCertificateToPayload } from "@/features/certificates/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// En Vercel Serverless / AWS Lambda, el único directorio con permisos de escritura es /tmp
const CACHE_DIR = process.env.CERTIFICATES_CACHE_DIR || path.join(os.tmpdir(), "certificates_cache");

async function getCachedFile(filePath: string): Promise<Buffer | null> {
  try {
    const fileStat = await stat(filePath);
    if (fileStat.isFile() && fileStat.size > 0) {
      return await readFile(filePath);
    }
  } catch {
    // No existe en caché
  }
  return null;
}

async function imageDataUrl(fileName: string, origin: string): Promise<string> {
  // 1. Intentar leer desde el disco local
  const localPath = path.join(process.cwd(), "public", "certificates", fileName);
  try {
    const file = await readFile(localPath);
    return `data:image/png;base64,${file.toString("base64")}`;
  } catch {
    // En Vercel Serverless Function los assets están en la CDN pública
  }

  // 2. Fallback: Descarga desde el origin de la petición (Vercel CDN)
  try {
    const publicUrl = `${origin}/certificates/${fileName}`;
    const res = await fetch(publicUrl);
    if (res.ok) {
      const ab = await res.arrayBuffer();
      const buf = Buffer.from(ab);
      return `data:image/png;base64,${buf.toString("base64")}`;
    }
  } catch (err) {
    console.warn(`No se pudo cargar la imagen ${fileName} desde ${origin}:`, err);
  }

  // 3. Fallback de respaldo con dominio directo de Vercel
  try {
    const fallbackUrl = `https://formasalud-web.vercel.app/certificates/${fileName}`;
    const res = await fetch(fallbackUrl);
    if (res.ok) {
      const ab = await res.arrayBuffer();
      const buf = Buffer.from(ab);
      return `data:image/png;base64,${buf.toString("base64")}`;
    }
  } catch (err) {
    console.error(`Fallo definitivo al cargar la imagen ${fileName}:`, err);
  }

  throw new Error(`No se pudo encontrar la imagen de plantilla: ${fileName}`);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code: rawCode } = await params;
  const code = decodeURIComponent(rawCode);

  try {
    const result = await api.verifyCertificate(code);
    const certificate: Certificate | undefined = Array.isArray(result)
      ? result[0]
      : result;

    if (!certificate) {
      return Response.json({ message: "Certificado no encontrado" }, { status: 404 });
    }

    const safeFileName = `Certificado_${code.replace(/[^a-zA-Z0-9-]/g, "_")}.pdf`;
    const cachedFilePath = path.join(CACHE_DIR, `${code.replace(/[^a-zA-Z0-9-]/g, "_")}.pdf`);

    if (certificate.valid === false || certificate.status === "revoked") {
      try {
        await unlink(cachedFilePath);
      } catch {
        // Ignorar si no existía
      }
      return Response.json({ message: "Certificado revocado" }, { status: 410 });
    }

    const requestUrl = new URL(request.url);
    const download = requestUrl.searchParams.get("download") === "1";
    const forceRefresh = requestUrl.searchParams.get("refresh") === "1" || requestUrl.searchParams.get("nocache") === "1";

    // 1. Verificar si ya existe en caché
    if (!forceRefresh) {
      const cachedBuffer = await getCachedFile(cachedFilePath);
      if (cachedBuffer) {
        return new Response(new Uint8Array(cachedBuffer), {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${safeFileName}"`,
            "Cache-Control": "public, max-age=86400, s-maxage=86400",
            "X-Certificate-Cache": "HIT",
          },
        });
      }
    }

    // 2. Compilar PDF cargando imágenes con fallback a Vercel CDN
    const origin = requestUrl.origin;
    const [logoLeftUrl, logoRightUrl, sealUrl, signatureLeftUrl, signatureRightUrl, backgroundUrl] =
      await Promise.all([
        imageDataUrl("logofms.png", origin),
        imageDataUrl("ausp.png", origin),
        imageDataUrl("cello.png", origin),
        imageDataUrl("fra.png", origin),
        imageDataUrl("firmaMiguel.png", origin),
        imageDataUrl("coche-paro-hospital.png", origin),
      ]);

    const data = mapCertificateToPayload(certificate, {
      logoLeftUrl,
      logoRightUrl,
      sealUrl,
      signatureLeftUrl,
      signatureRightUrl,
      backgroundUrl,
    });

    const document = CertificatePdfDocument({ data });
    const buffer = await renderToBuffer(document);

    // 3. Guardar en disco en segundo plano en /tmp para próximas consultas
    try {
      await mkdir(CACHE_DIR, { recursive: true });
      await writeFile(cachedFilePath, buffer);
    } catch (saveError) {
      console.warn("No se pudo guardar el certificado en caché:", saveError);
    }

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${safeFileName}"`,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
        "X-Certificate-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error(`No se pudo generar el certificado ${code}:`, error);
    const detail = error instanceof Error ? error.message : String(error);
    return Response.json(
      {
        message: "No se pudo generar el certificado",
        error: detail,
      },
      { status: 500 }
    );
  }
}
