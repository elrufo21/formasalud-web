import { Metadata } from "next";
import { CertificateVerificationView } from "@/features/certificates/components/CertificateVerificationView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verificación de Certificado Oficial | FormaSalud",
  description:
    "Portal oficial de verificación y descarga de certificados y diplomas emitidos por FormaSalud y Grupo Paucar Perú S.A.C.",
};

export default async function VerificarCertificadoPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return <CertificateVerificationView code={decodeURIComponent(code)} />;
}
