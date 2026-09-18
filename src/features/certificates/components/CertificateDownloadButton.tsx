"use client";

import React from "react";
import { Download } from "lucide-react";
import { FormasaludCertificatePayload } from "../types";

interface CertificateDownloadButtonProps {
  data: FormasaludCertificatePayload;
  className?: string;
  label?: string;
  variant?: "primary" | "secondary" | "outline";
}

export function CertificateDownloadButton({
  data,
  className = "",
  label = "Descargar Diploma (PDF)",
  variant = "primary",
}: CertificateDownloadButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 font-semibold text-xs rounded-xl transition-all cursor-pointer px-4 py-2.5";
  
  let variantStyle = "bg-navy text-white hover:bg-navyink shadow-sm";
  if (variant === "secondary") {
    variantStyle = "bg-gold text-navy font-bold hover:bg-gold-light";
  } else if (variant === "outline") {
    variantStyle = "border-2 border-navy text-navy hover:bg-navy hover:text-white";
  }

  return (
    <a
      href={`/api/certificates/${encodeURIComponent(data.certificateCode)}/pdf?download=1`}
      className={`${baseStyle} ${variantStyle} ${className}`}
    >
      <Download className="w-4 h-4 text-gold" />
      <span>{label}</span>
    </a>
  );
}
