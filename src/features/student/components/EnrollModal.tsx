"use client";

import React from "react";
import { BookOpen, ShieldCheck, MessageCircle } from "lucide-react";
import { PublicCourse } from "@/lib/api";
import { Modal } from "@/components/ui/Modal";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

interface EnrollModalProps {
  course: PublicCourse | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function EnrollModal({ course, isOpen, onClose }: EnrollModalProps) {
  const { user } = useAuthStore();
  if (!course) return null;
  const price = Number(course.price ?? 0);

  const studentInfo = user
    ? `Soy ${user.name} ${user.last_name} (${(user.document_type || "DNI").toUpperCase()}: ${user.document_number || "registrado"}, correo: ${user.email}). `
    : "";
  const whatsappMessage = encodeURIComponent(
    `Hola FORMASALUD, ${studentInfo}deseo confirmar mi inscripción en el curso "${course.title}".`,
  );
  const whatsappUrl = `https://wa.me/51939584395?text=${whatsappMessage}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Inscripción al curso"
      description="Solicita tu matrícula directamente con tus datos de alumno registrado."
      maxWidth="md"
    >
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-bg-alt border border-line space-y-2">
          <div className="flex items-center gap-2 text-teal font-semibold text-xs">
            <BookOpen className="w-4 h-4" />
            <span>Programa académico</span>
          </div>
          <h4 className="font-serif font-bold text-navy text-sm sm:text-base">
            {course.title}
          </h4>
          {course.short_description && (
            <p className="text-xs text-ink-soft">{course.short_description}</p>
          )}
        </div>
        <div className="flex justify-between border-y border-line py-3 text-sm">
          <span className="text-ink-soft">Inversión del programa</span>
          <strong className="text-navy">
            {price === 0 ? "Consultar promoción" : `S/ ${price.toFixed(2)}`}
          </strong>
        </div>
        <div className="p-3 rounded-xl bg-tealtint/60 border border-teal/20 text-xs text-tealdeep flex gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            Tu cuenta ya está registrada en FormaSalud. Confirma tu inscripción
            por WhatsApp para activar tu matrícula oficial en este programa.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-line text-ink-soft hover:text-navy text-xs font-semibold hover:bg-bg-alt cursor-pointer"
          >
            Cerrar
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#1fa855] hover:bg-[#198f47] text-white text-xs font-bold inline-flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirmar Inscripción por WhatsApp</span>
          </a>
        </div>
      </div>
    </Modal>
  );
}
