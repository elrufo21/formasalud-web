"use client";

import React from "react";
import { X, Award, ExternalLink, QrCode } from "lucide-react";
import { FormasaludCertificatePayload } from "../types";
import { CertificateDownloadButton } from "./CertificateDownloadButton";

interface CertificateViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: FormasaludCertificatePayload | null;
}

export function CertificateViewerModal({
  isOpen,
  onClose,
  data,
}: CertificateViewerModalProps) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border-2 border-gold/30 flex flex-col overflow-hidden max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-line bg-gradient-to-r from-navy to-navyink text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-white tracking-wide">
                Diploma Oficial FormaSalud
              </h2>
              <p className="font-mono text-xs text-gold/90">
                Registro Oficial: {data.certificateCode}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CertificateDownloadButton data={data} variant="secondary" />
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content - PDF Viewer */}
        <div className="flex-1 min-h-[500px] w-full bg-bg-alt relative p-2">
          <iframe
            src={`/api/certificates/${encodeURIComponent(data.certificateCode)}/pdf`}
            title={`Certificado ${data.certificateCode}`}
            className="w-full h-[520px] border-0 rounded-2xl shadow-inner"
          />
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-line bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-ink-soft">
            <QrCode className="w-4 h-4 text-teal" />
            <span>Verificable en línea en tiempo real con firma y resolución institucional.</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`/verificar/${data.certificateCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-teal hover:text-tealdeep transition-colors px-3 py-1.5 rounded-lg border border-teal/20 hover:bg-teal/5"
            >
              <span>Abrir Ficha de Verificación</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 font-semibold text-ink-soft hover:bg-bg-alt rounded-xl transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
