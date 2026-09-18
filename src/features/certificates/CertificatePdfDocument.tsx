import React from "react";
import { FormasaludCertificatePayload } from "./types";
import { OfficialWaveCertificate } from "./templates/OfficialWaveCertificate";
import { ClassicEleganceCertificate } from "./templates/ClassicEleganceCertificate";
import { CertificatePdf18 as FormasaludClassicCertificate } from "./templates/FormasaludClassicCertificate";

export function CertificatePdfDocument({ data }: { data: FormasaludCertificatePayload }) {
  if (data.templateId === "classic-elegance") {
    return <ClassicEleganceCertificate data={data} />;
  }
  if (data.templateId === "formasalud-classic") {
    const classicData = {
      name: data.studentName,
      course: data.courseTitle,
      hours: data.hours,
      teacher1: data.gerenteGeneral || data.teacherName || "FRANCISCO PAUCAR BENITES",
      teacher2: data.coordinatorName || "ZAMBRANO CRUZ MIGUEL",
      idCertificado: data.certificateCode,
      certificateCode: data.certificateCode,
      coordinatorName: data.coordinatorName,
      logoImage: data.logoLeftUrl || "/certificates/logofms.png",
      secondaryLogoImage: data.logoRightUrl || "/certificates/ausp.png",
      sealImage: data.sealUrl || "/certificates/cello.png",
      signatureLeftImage: data.signatureLeftUrl || "/certificates/fra.png",
      signatureRightImage: data.signatureRightUrl || "/certificates/firmaMiguel.png",
      backgroundImage: data.backgroundUrl || "/certificates/coche-paro-hospital.png",
      courseDateText: data.courseDateText,
      issueDateText: data.issueDateText,
      issueDay: data.issueDay,
      issueMonth: data.issueMonth,
      issueYear: data.issueYear,
      ruc: "20613837613",
      website: "formasalud.org.pe",
      modality: data.modality || "Virtual",
      verificationUrl: data.verificationUrl,
    };
    return <FormasaludClassicCertificate data={classicData} />;
  }
  return <OfficialWaveCertificate data={data} />;
}
