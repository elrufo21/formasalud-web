import { Certificate } from "@/lib/api";
import { FormasaludCertificatePayload } from "./types";

type CertificateSource = Partial<Certificate> & {
  code?: string;
  full_name?: string;
  title?: string;
  hours?: number;
  course_date_text?: string;
  teacher_name?: string;
  coordinator_name?: string;
  template_key?: string;
  hours_unit?: string;
};

export function getCertificateVerificationUrl(code: string) {
  return `https://formasalud.org.pe/verificar/${encodeURIComponent(code)}`;
}

export function mapCertificateToPayload(
  cert: CertificateSource,
  overrides?: Partial<FormasaludCertificatePayload>
): FormasaludCertificatePayload {
  const studentName =
    cert.student_name ||
    cert.student?.full_name ||
    ([cert.student?.name, (cert.student as { last_name?: string } | undefined)?.last_name].filter(Boolean).join(" ") || undefined) ||
    cert.full_name ||
    "Alumno FormaSalud";

  const courseTitle =
    cert.course_title ||
    cert.course?.title ||
    cert.title ||
    "Programa de Especialización";

  const code = cert.certificate_code || cert.code || "FS-2026-0001";

  const normalizedTitle = (courseTitle || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

  const isCocheDeParo =
    normalizedTitle.includes("COCHE DE PARO") ||
    (cert as { course?: { slug?: string } }).course?.slug === "mdcracue" ||
    (cert as { course_id?: number }).course_id === 5;
  const isTriaje = cert.template_key === "triaje-fisiouci" ||
    Number(cert.course_id ?? cert.course?.course_id) === 6 ||
    normalizedTitle === "INTERVENCION DE ENFERMERIA EN EL AREA DE TRIAJE";
  const isPancreatitis = cert.template_key === "pancreatitis-formasalud" || normalizedTitle.includes("PANCREATITIS");
  const isSpeaker = (cert as { certificate_type?: string }).certificate_type === "speaker" || cert.template_key === "speaker-recognition";

  const issueDate = cert.issued_at ? new Date(cert.issued_at) : new Date();
  const issueParts = new Intl.DateTimeFormat("es-PE", {
    timeZone: "America/Lima", day: "2-digit", month: "long", year: "numeric",
  }).formatToParts(issueDate);
  const issueDay = issueParts.find((part) => part.type === "day")?.value || "01";
  const issueMonthText = issueParts.find((part) => part.type === "month")?.value || "enero";
  const issueYearFull = issueParts.find((part) => part.type === "year")?.value || "2026";
  const issueMonth = new Intl.DateTimeFormat("en-US", { timeZone: "America/Lima", month: "2-digit" }).format(issueDate);
  const issueYear = issueYearFull.slice(-2);
  const issueDateText = `${issueDay} de ${issueMonthText} del ${issueYearFull}`;

  return {
    certificateCode: code,
    studentName,
    documentNumber: cert.document_number || cert.student?.document_number || "",
    courseTitle,
    hours: cert.hours || (isTriaje || isPancreatitis || isSpeaker ? 2 : isCocheDeParo ? 4 : 40),
    hoursUnit: cert.hours_unit || (isTriaje || isPancreatitis || isSpeaker ? "horas lectivas" : "horas académicas"),
    courseDateText: cert.course_date_text || (isTriaje ? "06 de octubre de 2026" : isPancreatitis ? "03 de octubre de 2026" : isCocheDeParo ? "14 de agosto de 2026" : "año 2026"),
    issueDateText,
    issueDay,
    issueMonth,
    issueYear,
    role: isSpeaker ? "ponente" : "participante",
    teacherName: cert.teacher_name || "Lic. Enf. Francisco Paucar Benites",
    coordinatorName: cert.coordinator_name || "Lic. Zambrano Cruz Miguel",
    gerenteGeneral: "Lic. Francisco Paucar Benites",
    logoLeftUrl: isTriaje || isPancreatitis || isSpeaker ? "/certificates/ausp.png" : "/certificates/logofms.png",
    logoRightUrl: isTriaje || isPancreatitis || isSpeaker ? "/certificates/fisiouci.png" : "/certificates/ausp.png",
    sponsorLogoUrl: isTriaje ? "/certificates/ausp.png" : undefined,
    signatureLeftUrl: "/certificates/fra.png",
    signatureRightUrl: "/certificates/firmaMiguel.png",
    sealUrl: "/certificates/cello.png",
    verificationUrl: getCertificateVerificationUrl(code),
    templateId: isSpeaker ? "speaker-recognition" : isTriaje ? "triaje-fisiouci" : isPancreatitis ? "pancreatitis-formasalud" : "formasalud-classic",
    ...overrides,
  };
}
