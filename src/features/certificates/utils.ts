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
    cert.student?.name ||
    cert.student?.full_name ||
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
    code.startsWith("REG-") ||
    (cert as { course?: { slug?: string } }).course?.slug === "mdcracue" ||
    (cert as { course_id?: number }).course_id === 5;

  const issueDate = cert.issued_at ? new Date(cert.issued_at) : new Date();
  const issueDay = String(issueDate.getDate()).padStart(2, "0");
  const issueMonth = String(issueDate.getMonth() + 1).padStart(2, "0");
  const issueYear = String(issueDate.getFullYear()).slice(-2);
  const issueDateText = `${issueDay} de ${issueDate.toLocaleDateString("es-PE", { month: "long" })} del ${issueDate.getFullYear()}`;

  return {
    certificateCode: code,
    studentName,
    documentNumber: cert.document_number || cert.student?.document_number || "",
    courseTitle,
    hours: cert.hours || (isCocheDeParo ? 4 : 40),
    courseDateText: cert.course_date_text || (isCocheDeParo ? "14 de agosto de 2026" : "año 2026"),
    issueDateText,
    issueDay,
    issueMonth,
    issueYear,
    role: cert.certificate_type === "participation" ? "participante" : "participante",
    teacherName: cert.teacher_name || "Lic. Enf. Francisco Paucar Benites",
    coordinatorName: cert.coordinator_name || "Lic. Zambrano Cruz Miguel",
    gerenteGeneral: "Lic. Francisco Paucar Benites",
    logoLeftUrl: "/certificates/logofms.png",
    logoRightUrl: "/certificates/ausp.png",
    signatureLeftUrl: "/certificates/fra.png",
    signatureRightUrl: "/certificates/firmaMiguel.png",
    sealUrl: "/certificates/cello.png",
    verificationUrl: getCertificateVerificationUrl(code),
    templateId: "formasalud-classic",
    ...overrides,
  };
}
