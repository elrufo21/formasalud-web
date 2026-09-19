import { renderToBuffer } from "@react-pdf/renderer";
import { readFile, writeFile, unlink, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { api, Certificate } from "@/lib/api";
import { CertificatePdfDocument } from "@/features/certificates/CertificatePdfDocument";
import { mapCertificateToPayload } from "@/features/certificates/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE_DIR = process.env.CERTIFICATES_CACHE_DIR || path.join(process.cwd(), "tmp", "certificates_cache");

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

async function imageDataUrl(fileName: string) {
  const file = await readFile(path.join(process.cwd(), "public", "certificates", fileName));
  return `data:image/png;base64,${file.toString("base64")}`;
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
      // Eliminar de caché si estaba almacenado
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

    // 1. Verificar si ya existe en caché en disco
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

    // 2. Si no está en caché o se solicitó refresco, compilar on-the-fly
    const [logoLeftUrl, logoRightUrl, sealUrl, signatureLeftUrl, signatureRightUrl, backgroundUrl] =
      await Promise.all([
        imageDataUrl("logofms.png"),
        imageDataUrl("ausp.png"),
        imageDataUrl("cello.png"),
        imageDataUrl("fra.png"),
        imageDataUrl("firmaMiguel.png"),
        imageDataUrl("coche-paro-hospital.png"),
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

    // 3. Guardar en disco en segundo plano para próximas consultas
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
