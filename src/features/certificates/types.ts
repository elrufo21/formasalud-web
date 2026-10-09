export type CertificateTemplateId = "official-wave" | "classic-elegance" | "formasalud-classic" | "triaje-fisiouci" | "pancreatitis-formasalud" | "speaker-recognition";


export interface FormasaludCertificatePayload {
  certificateCode: string;
  studentName: string;
  documentNumber?: string;
  courseTitle: string;
  hours?: number;
  hoursUnit?: string;
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
  previewOnly?: boolean;
  modality?: string;
  logoLeftUrl?: string;
  logoRightUrl?: string;
  sponsorLogoUrl?: string;
  signatureLeftUrl?: string;
  signatureRightUrl?: string;
  sealUrl?: string;
  awardSealUrl?: string;
  backgroundUrl?: string;
  verificationUrl?: string;
  templateId?: CertificateTemplateId;
}
