import { renderToBuffer } from "@react-pdf/renderer";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { api, Certificate } from "@/lib/api";
import { CertificatePdfDocument } from "@/features/certificates/CertificatePdfDocument";
import { mapCertificateToPayload } from "@/features/certificates/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
    if (certificate.valid === false || certificate.status === "revoked") {
      return Response.json({ message: "Certificado revocado" }, { status: 410 });
    }

    const requestUrl = new URL(request.url);
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
    const download = requestUrl.searchParams.get("download") === "1";
    const fileName = `Certificado_${code.replace(/[^a-zA-Z0-9-]/g, "_")}.pdf`;

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${fileName}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error(`No se pudo generar el certificado ${code}:`, error);
    return Response.json(
      { message: "No se pudo generar el certificado" },
      { status: 500 }
    );
  }
}
