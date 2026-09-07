"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Award, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";

const issueSchema = z.object({
  student_id: z.coerce.number().min(1, "Selecciona un alumno"),
  course_id: z.coerce.number().min(1, "Selecciona un curso"),
  certificate_type: z.enum(["approval", "participation"]),
  certificate_code: z.string().optional(),
});

type IssueFormData = z.infer<typeof issueSchema>;

interface IssueCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function IssueCertificateModal({ isOpen, onClose, onSuccess }: IssueCertificateModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<{ value: number; label: string }[]>([]);
  const [courses, setCourses] = useState<{ value: number; label: string }[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      certificate_type: "approval",
    },
  });

  useEffect(() => {
    if (isOpen) {
      api.getUserCombo().then(setUsers).catch(console.error);
      api.getCourseCombo().then(setCourses).catch(console.error);
    }
  }, [isOpen]);

  const onSubmit = async (data: IssueFormData) => {
    setLoading(true);
    setError(null);
    try {
      await api.generateCertificate({
        student_id: data.student_id,
        course_id: data.course_id,
        certificate_type: data.certificate_type,
        certificate_code: data.certificate_code || undefined,
        validate_payment: false, // Emisión rápida administrativa asistida
      });
      reset();
      onSuccess();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al emitir certificado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Emitir Certificado Oficial"
      description="Genera un certificado con código QR verificable para un alumno y curso"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
            {error}
          </div>
        )}

        <Select
          label="Alumno Beneficiario"
          options={[{ value: "", label: "Seleccionar alumno..." }, ...users]}
          required
          error={errors.student_id?.message}
          {...register("student_id")}
        />

        <Select
          label="Curso o Programa Aprobado"
          options={[{ value: "", label: "Seleccionar curso..." }, ...courses]}
          required
          error={errors.course_id?.message}
          {...register("course_id")}
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Tipo de Certificado"
            options={[
              { value: "approval", label: "Aprobación (Diploma)" },
              { value: "participation", label: "Participación" },
            ]}
            {...register("certificate_type")}
          />
          <Input
            label="Código Manual (Opcional)"
            placeholder="Ej: FS-2026-9999"
            helperText="Si lo dejas vacío, se autogenera"
            error={errors.certificate_code?.message}
            {...register("certificate_code")}
          />
        </div>

        <div className="p-3 bg-tealtint/60 rounded-xl border border-teal/20 text-xs text-tealdeep flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-teal shrink-0 mt-0.5" />
          <p>
            Modo emisión rápida activo: Se asociará la matrícula y se generará el código QR
            verificable en línea de inmediato.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-line">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-soft hover:bg-bg-alt transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navyink transition-all flex items-center gap-1.5 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <>
                <Award className="w-3.5 h-3.5 text-gold" />
                <span>Emitir Certificado</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
