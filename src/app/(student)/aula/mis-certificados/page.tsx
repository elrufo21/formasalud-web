"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Award, QrCode, ExternalLink, ShieldCheck } from "lucide-react";
import { api, Certificate } from "@/lib/api";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { StudentHeader } from "@/features/student/components/StudentHeader";
import { mapCertificateToPayload } from "@/features/certificates/utils";
import { CertificateDownloadButton } from "@/features/certificates/components/CertificateDownloadButton";

const CertificateViewerModal = dynamic(
  () =>
    import("@/features/certificates/components/CertificateViewerModal").then(
      (mod) => mod.CertificateViewerModal
    ),
  { ssr: false }
);

export default function StudentCertificatesPage() {
  const { user } = useAuthStore();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewCert, setViewCert] = useState<Certificate | null>(null);

  useEffect(() => {
    async function loadCerts() {
      setLoading(true);
      try {
        const data = await api.getCertificates();
        // Mostrar certificados del alumno
        const myCerts = data.filter(
          (c) =>
            c.student_id === user?.user_id ||
            c.student?.email?.toLowerCase() === user?.email.toLowerCase() ||
            c.student_name?.toLowerCase().includes(user?.name.toLowerCase() || "")
        );
        setCertificates(myCerts.length > 0 ? myCerts : data);
      } finally {
        setLoading(false);
      }
    }
    loadCerts();
  }, [user]);

  return (
    <div className="flex-1 flex flex-col">
      <StudentHeader
        title="Mis Certificados y Diplomas Oficiales"
        subtitle="Diplomas con validez académica nacional y código de verificación QR único"
      />

      <main className="p-6 max-w-6xl w-full mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {certificates.map((cert) => (
            <div
              key={cert.certificate_id}
              className="rounded-2xl bg-white border-2 border-gold/30 shadow-xs hover:shadow-md transition-all p-6 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-navy text-goldpale flex items-center justify-center font-bold text-xs border border-gold/50">
                      FS
                    </div>
                    <div>
                      <span className="font-serif font-bold text-sm text-navy block leading-none">
                        FORMASALUD
                      </span>
                      <span className="font-mono text-[9px] uppercase text-teal font-semibold">
                        RUC 20613837613
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold uppercase border border-emerald-200">
                    {cert.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase text-ink-soft tracking-wider block">
                    DIPLOMA DE APROBACIÓN
                  </span>
                  <h3 className="font-serif font-bold text-base text-navy leading-snug">
                    {cert.course_title || cert.course?.title || "Programa Académico"}
                  </h3>
                  <p className="text-xs text-ink font-semibold pt-1">
                    Otorgado a: <span className="text-teal">{cert.student_name || cert.student?.name || user?.name}</span>
                  </p>
                </div>

                <div className="p-3 bg-bg-alt rounded-xl flex items-center justify-between border border-line">
                  <div>
                    <span className="text-[10px] font-mono text-ink-soft uppercase block">
                      Código de Verificación QR:
                    </span>
                    <span className="font-mono text-sm font-bold text-navy">
                      {cert.certificate_code}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-navy text-white flex items-center justify-center">
                    <QrCode className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-line flex flex-wrap items-center justify-between gap-2">
                <a
                  href={`/verificar/${cert.certificate_code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal hover:text-tealdeep"
                >
                  <ShieldCheck className="w-4 h-4 text-teal" />
                  <span>Verificar en Línea</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewCert(cert)}
                    className="px-3.5 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navyink transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5 text-gold" />
                    <span>Ver Diploma</span>
                  </button>
                  <CertificateDownloadButton
                    data={mapCertificateToPayload(cert)}
                    label="PDF"
                    variant="secondary"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {certificates.length === 0 && !loading && (
          <div className="p-12 text-center bg-white rounded-2xl border border-line">
            <Award className="w-10 h-10 text-ink-soft/40 mx-auto mb-2" />
            <p className="text-sm font-bold text-navy">No tienes certificados emitidos aún</p>
            <p className="text-xs text-ink-soft mt-1">
              Inscríbete a un curso para comenzar y obtener tu diploma oficial
            </p>
          </div>
        )}
      </main>

      {/* Diploma View Modal Oficial */}
      {viewCert && (
        <CertificateViewerModal
          isOpen={!!viewCert}
          onClose={() => setViewCert(null)}
          data={mapCertificateToPayload(viewCert)}
        />
      )}
    </div>
  );
}
