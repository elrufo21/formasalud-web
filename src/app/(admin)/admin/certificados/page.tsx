"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { ColumnDef } from "@tanstack/react-table";
import { Award, RefreshCw, QrCode, ExternalLink, CheckCircle, Eye } from "lucide-react";
import { api, Certificate } from "@/lib/api";
import { AdminHeader } from "@/features/admin/components/AdminHeader";
import { DataTable } from "@/components/ui/table/DataTable";
import { IssueCertificateModal } from "@/features/admin/components/IssueCertificateModal";
import { mapCertificateToPayload } from "@/features/certificates/utils";
import { CertificateDownloadButton } from "@/features/certificates/components/CertificateDownloadButton";

const CertificateViewerModal = dynamic(
  () =>
    import("@/features/certificates/components/CertificateViewerModal").then(
      (mod) => mod.CertificateViewerModal
    ),
  { ssr: false }
);

export default function CertificatesAdminPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const data = await api.getCertificates();
      setCertificates(data);
    } catch (err) {
      console.error("Error fetching certificates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const columns = useMemo<ColumnDef<Certificate>[]>(
    () => [
      {
        accessorKey: "certificate_code",
        header: "Código QR / Diploma",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-navy text-goldpale flex items-center justify-center shrink-0 border border-gold/40">
              <QrCode className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-navy block">
                {row.original.certificate_code}
              </span>
              <span className="text-[10px] text-teal uppercase font-semibold font-mono">
                {row.original.certificate_type === "approval" ? "Aprobación" : "Participación"}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "student_name",
        header: "Alumno Beneficiario",
        cell: ({ row }) => (
          <div>
            <p className="font-bold text-navy text-xs sm:text-sm">
              {row.original.student_name || row.original.student?.name}
            </p>
            <p className="font-mono text-[11px] text-ink-soft">
              DNI: {row.original.document_number || row.original.student?.document_number || "-"}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "course_title",
        header: "Programa Académico",
        cell: ({ row }) => (
          <p className="text-xs text-ink max-w-sm leading-snug">
            {row.original.course_title || row.original.course?.title}
          </p>
        ),
      },
      {
        accessorKey: "issued_at",
        header: "Fecha Emisión",
        cell: (info) => {
          const raw = info.getValue<string>();
          const date = raw ? new Date(raw).toLocaleDateString("es-PE") : "-";
          return <span className="font-mono text-xs text-ink-soft">{date}</span>;
        },
      },
      {
        accessorKey: "status",
        header: "Estado",
        cell: (info) => (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold uppercase border border-emerald-200">
            <CheckCircle className="w-3 h-3" />
            <span>{info.getValue<string>()}</span>
          </span>
        ),
      },
      {
        id: "actions",
        header: "Acciones / Verificación",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCert(row.original)}
              className="p-1.5 rounded-lg border border-line bg-white hover:bg-bg-alt text-navy transition-colors cursor-pointer"
              title="Ver Diploma Oficial"
            >
              <Eye className="w-3.5 h-3.5 text-navy" />
            </button>
            <CertificateDownloadButton
              data={mapCertificateToPayload(row.original)}
              label="PDF"
              variant="secondary"
              className="py-1 px-2.5 text-[11px]"
            />
            <a
              href={`/verificar/${row.original.certificate_code}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-teal hover:text-tealdeep ml-1"
            >
              <span>QR</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Certificados y Diplomas Oficiales"
        subtitle="Registro de diplomas emitidos con validación QR en tiempo real"
        actionButton={
          <div className="flex items-center gap-2">
            <button
              onClick={fetchCertificates}
              title="Refrescar"
              className="p-2 rounded-lg border border-line bg-white hover:bg-bg-alt text-ink-soft transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navyink transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Award className="w-3.5 h-3.5 text-gold" />
              <span>Emitir Certificado</span>
            </button>
          </div>
        }
      />

      <main className="p-6 max-w-7xl w-full mx-auto space-y-4">
        <DataTable
          columns={columns}
          data={certificates}
          searchPlaceholder="Buscar por código, alumno o curso..."
          isLoading={loading}
        />
      </main>

      <IssueCertificateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchCertificates}
      />

      <CertificateViewerModal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        data={selectedCert ? mapCertificateToPayload(selectedCert) : null}
      />
    </div>
  );
}
