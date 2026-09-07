"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Sparkles, BookOpen, Award } from "lucide-react";
import { Course, api } from "@/lib/api";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Modal } from "@/components/ui/Modal";

interface EnrollModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function EnrollModal({ course, isOpen, onClose, onSuccess }: EnrollModalProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!course) return null;

  const price = Number(course.price);
  const certIncluded = course.certificate_included;
  const certPrice = Number(course.certificate_price);

  const handleEnroll = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Inscribir y emitir certificado (modo rápido para acceso inmediato)
      await api.generateCertificate({
        student_id: user.user_id,
        course_id: course.course_id,
        certificate_type: "approval",
        validate_payment: false,
      });

      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al procesar la inscripción");
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    setSuccess(false);
    onClose();
    router.push("/aula/mis-certificados");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={success ? "¡Inscripción Exitosa!" : "Confirmar Inscripción al Curso"}
      description={
        success
          ? "Tu matrícula ha sido confirmada y tienes acceso al contenido y diploma."
          : "Revisa los detalles del programa académico antes de confirmar."
      }
      maxWidth="md"
    >
      {success ? (
        <div className="text-center py-4 space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-lg text-navy">{course.title}</h4>
            <p className="text-xs text-ink-soft mt-1">
              Se ha generado tu código de diploma oficial para este curso.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-2">
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
                router.push("/aula");
              }}
              className="px-4 py-2 rounded-xl border border-line text-xs font-semibold text-navy hover:bg-bg-alt transition-colors cursor-pointer"
            >
              Ir a Mis Cursos
            </button>
            <button
              onClick={handleFinish}
              className="px-4 py-2 rounded-xl bg-teal text-white text-xs font-semibold hover:bg-tealdeep transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-gold" />
              <span>Ver Mi Certificado</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
              {error}
            </div>
          )}

          <div className="p-4 rounded-xl bg-bg-alt border border-line space-y-2">
            <div className="flex items-center gap-2 text-teal font-semibold text-xs">
              <BookOpen className="w-4 h-4" />
              <span>Programa Académico</span>
            </div>
            <h4 className="font-serif font-bold text-navy text-sm sm:text-base leading-snug">
              {course.title}
            </h4>
            {course.short_description && (
              <p className="text-xs text-ink-soft">{course.short_description}</p>
            )}
          </div>

          {/* Pricing breakdown */}
          <div className="space-y-2 border-t border-b border-line py-3 text-xs">
            <div className="flex justify-between text-ink-soft">
              <span>Costo del Curso:</span>
              <span className="font-mono font-bold text-navy">
                {price === 0 ? "Gratis" : `S/ ${price.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span>Certificación Oficial:</span>
              <span className="font-mono font-bold text-teal">
                {certIncluded
                  ? "Incluida en el Curso"
                  : `Adicional (S/ ${certPrice ? certPrice.toFixed(2) : "49.00"})`}
              </span>
            </div>
          </div>

          <div className="p-3 bg-tealtint/60 rounded-xl border border-teal/20 text-xs text-tealdeep flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-teal shrink-0 mt-0.5" />
            <p>
              Alumno: <b>{user?.name} {user?.last_name}</b> (DNI: {user?.document_number || "Registrado"})
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-soft hover:bg-bg-alt transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleEnroll}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navyink transition-all flex items-center gap-1.5 disabled:opacity-60 cursor-pointer shadow-xs"
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirmar Inscripción Inmediata</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
