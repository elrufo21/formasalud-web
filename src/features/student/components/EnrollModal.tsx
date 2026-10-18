"use client";

import React from "react";
import { BookOpen, ShieldCheck } from "lucide-react";
import { PublicCourse } from "@/lib/api";
import { Modal } from "@/components/ui/Modal";

interface EnrollModalProps {
  course: PublicCourse | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function EnrollModal({ course, isOpen, onClose }: EnrollModalProps) {
  if (!course) return null;
  const price = Number(course.price ?? 0);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Inscripción al curso"
      description="La matrícula requiere confirmación administrativa del pago."
      maxWidth="md"
    >
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-bg-alt border border-line space-y-2">
          <div className="flex items-center gap-2 text-teal font-semibold text-xs">
            <BookOpen className="w-4 h-4" />
            <span>Programa académico</span>
          </div>
          <h4 className="font-serif font-bold text-navy text-sm sm:text-base">{course.title}</h4>
          {course.short_description && <p className="text-xs text-ink-soft">{course.short_description}</p>}
        </div>
        <div className="flex justify-between border-y border-line py-3 text-sm">
          <span className="text-ink-soft">Costo del curso</span>
          <strong className="text-navy">{price === 0 ? "Consultar" : `S/ ${price.toFixed(2)}`}</strong>
        </div>
        <div className="p-3 rounded-xl bg-tealtint/60 border border-teal/20 text-xs text-tealdeep flex gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <p>Este paso no registra pagos ni emite certificados. Tu certificado existente y su código no se modifican.</p>
        </div>
        <div className="flex justify-end pt-1">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navyink">
            Entendido
          </button>
        </div>
      </div>
    </Modal>
  );
}
