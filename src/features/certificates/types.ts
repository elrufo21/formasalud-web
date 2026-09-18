export type CertificateTemplateId = "official-wave" | "classic-elegance" | "formasalud-classic";


export interface FormasaludCertificatePayload {
  certificateCode: string;
  studentName: string;
  documentNumber?: string;
  courseTitle: string;
  hours?: number;
  courseDateText?: string;
  issueDateText?: string;
  day?: string;
  month?: string;
  year?: string;
  issueDay?: string;
  issueMonth?: string;
  issueYear?: string;
  teacherName?: string;
  coordinatorName?: string;
  gerenteGeneral?: string;
  role?: "participante" | "ponente";
  modality?: string;
  logoLeftUrl?: string;
  logoRightUrl?: string;
  signatureLeftUrl?: string;
  signatureRightUrl?: string;
  sealUrl?: string;
  backgroundUrl?: string;
  verificationUrl?: string;
  templateId?: CertificateTemplateId;
}
