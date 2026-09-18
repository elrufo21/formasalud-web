import {
  ShieldCheck,
  AlertCircle,
  QrCode,
  Award,
  Calendar,
  User,
  BookOpen,
  Building2,
  FileCheck2,
  ExternalLink,
} from "lucide-react";
import { api, Certificate } from "@/lib/api";
import { FormasaludCertificatePayload } from "../types";
import { mapCertificateToPayload } from "../utils";
import { CertificateDownloadButton } from "./CertificateDownloadButton";

export async function CertificateVerificationView({ code }: { code: string }) {
  let certificate: Certificate | undefined;
  let unavailable = false;
  try {
    const result = await api.verifyCertificate(code);
    certificate = Array.isArray(result) ? result[0] : result;
  } catch (error) {
    console.error("Error al verificar certificado:", error);
    unavailable = true;
  }

  const error = unavailable
    ? "No se pudo consultar el registro en este momento. Inténtalo de nuevo más tarde."
    : !certificate?.certificate_code
      ? "No se encontró ningún certificado registrado con el código ingresado."
      : certificate.valid === false || certificate.status === "revoked"
        ? "Este certificado fue revocado o ya no se encuentra vigente."
        : null;
  const payload: FormasaludCertificatePayload | null = error || !certificate
    ? null
    : mapCertificateToPayload(certificate);

  if (error || !payload) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center p-6 max-w-xl mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 border border-red-200 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-navy">{unavailable ? "Verificación no disponible" : "Certificado no válido"}</h1>
        <p className="text-sm text-ink-soft mt-2 leading-relaxed">
          {error || "El código consultado no coincide con ningún registro académico activo."}
        </p>
        <div className="mt-4 p-3 bg-bg-alt rounded-xl font-mono text-xs text-navy border border-line">
          Código consultado: <span className="font-bold text-teal">{code}</span>
        </div>
        <a
          href="/contacto"
          className="mt-6 px-6 py-2.5 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navyink transition-all"
        >
          Contactar con Soporte Académico
        </a>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-8 px-4 sm:px-6 sm:py-12">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
      <div className="bg-white rounded-3xl border border-emerald-200 p-5 sm:p-8 shadow-lg shadow-navy/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-line">
          <div className="flex items-start gap-3 sm:gap-4 relative">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Registro válido</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
                Certificado verificado
              </h1>
              <p className="text-sm text-ink-soft mt-1 leading-relaxed">
                Registro académico de FormaSalud · {payload.certificateCode}
              </p>
            </div>
          </div>

          <div className="shrink-0 relative">
            <CertificateDownloadButton data={payload} variant="secondary" className="w-full md:w-auto" label="Descargar certificado" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
          <div className="p-4 rounded-2xl bg-bg-alt border border-line space-y-1">
            <div className="flex items-center gap-2 text-ink-soft text-xs font-semibold">
              <User className="w-4 h-4 text-teal" />
              <span>Participante</span>
            </div>
            <p className="font-serif font-bold text-base text-navy pt-1">
              {payload.studentName}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-bg-alt border border-line space-y-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 text-ink-soft text-xs font-semibold">
              <BookOpen className="w-4 h-4 text-teal" />
              <span>Curso</span>
            </div>
            <p className="font-serif font-bold text-base text-navy pt-1">
              {payload.courseTitle}
            </p>
            {payload.hours && <p className="text-xs text-teal font-semibold">{payload.hours} horas académicas</p>}
            {payload.courseDateText && <p className="text-xs text-ink-soft">Fecha del curso: {payload.courseDateText}</p>}
          </div>

          <div className="p-4 rounded-2xl bg-bg-alt border border-line space-y-1">
            <div className="flex items-center gap-2 text-ink-soft text-xs font-semibold">
              <QrCode className="w-4 h-4 text-teal" />
              <span>Código de registro</span>
            </div>
            <p className="font-mono font-bold text-sm text-navy pt-1">
              {payload.certificateCode}
            </p>
            <p className="text-[11px] text-ink-soft">Consulta pública de autenticidad</p>
          </div>

          <div className="p-4 rounded-2xl bg-bg-alt border border-line space-y-1">
            <div className="flex items-center gap-2 text-ink-soft text-xs font-semibold">
              <Calendar className="w-4 h-4 text-teal" />
              <span>Fecha de emisión</span>
            </div>
            <p className="font-serif font-bold text-sm text-navy pt-1">
              {payload.issueDateText || "Emitido en 2026"}
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold">Estado: Activo</p>
          </div>

          <div className="p-4 rounded-2xl bg-bg-alt border border-line space-y-1">
            <div className="flex items-center gap-2 text-ink-soft text-xs font-semibold">
              <Building2 className="w-4 h-4 text-teal" />
              <span>Entidad Emisora</span>
            </div>
            <p className="font-serif font-bold text-sm text-navy pt-1">
              Grupo Paucar Perú S.A.C.
            </p>
            <p className="font-mono text-xs text-ink-soft">RUC: 20613837613</p>
          </div>
        </div>
      </div>

      <section className="bg-white rounded-3xl border border-line p-4 sm:p-6 shadow-lg shadow-navy/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-gold" />
            <h2 className="font-serif font-bold text-lg text-navy">
              Certificado
            </h2>
          </div>
          <a
            href={`/api/certificates/${encodeURIComponent(payload.certificateCode)}/pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy px-4 py-2.5 text-xs font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Abrir a pantalla completa
          </a>
        </div>

        <div className="w-full h-[55vh] min-h-[360px] sm:h-[640px] rounded-2xl overflow-hidden border border-line bg-bg-alt shadow-inner">
          <iframe
            src={`/api/certificates/${encodeURIComponent(payload.certificateCode)}/pdf`}
            title={`Certificado ${payload.certificateCode}`}
            className="w-full h-full border-0"
          />
        </div>
      </section>
      </div>
    </main>
  );
}
