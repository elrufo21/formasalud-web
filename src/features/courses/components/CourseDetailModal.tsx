"use client";

import React, { useEffect } from "react";
import { Course } from "../data/courses";

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
}

export function CourseDetailModal({ course, onClose }: CourseDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (course) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [course, onClose]);

  if (!course) return null;

  const getBannerGradient = (category: Course["category"]) => {
    switch (category) {
      case "ia":
        return "from-gold via-[#8a6a1c] to-navyink";
      case "gestion":
        return "from-navy via-navyink to-tealdeep";
      case "taller":
        return "from-tealdeep via-teal to-navyink";
      case "diplomado":
        return "from-teal via-tealdeep to-navy";
      default:
        return "from-[#1c3d5e] to-navyink";
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hola FORMASALUD, me gustaría recibir el temario e inscribirme en el programa: "${course.title}" (${course.code}).`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navyink/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-paper rounded-2xl shadow-2xl border border-line overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Visual */}
        <div className={`p-6 sm:p-8 bg-gradient-to-br ${getBannerGradient(course.category)} text-white relative flex-none`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar detalle del curso"
          >
            ✕
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-white/15 border border-white/25">
              {course.categoryLabel}
            </span>
            {course.badge && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-goldpale border border-goldpale/30 px-2.5 py-1 rounded-full">
                {course.badge}
              </span>
            )}
          </div>

          <h2 id="course-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
            {course.title}
          </h2>

          <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-mono text-white/80">
            <span>📅 {course.startDate}</span>
            <span>🎓 {course.academicHours}</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-ink">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal font-semibold block mb-2">
              Descripción del Programa
            </span>
            <p className="text-sm text-ink-soft leading-relaxed">{course.description}</p>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal font-semibold block mb-1">
              Docente / Ponente Principal
            </span>
            <div className="flex items-center gap-3 bg-bg-alt p-3.5 rounded-xl border border-line">
              <div className="w-10 h-10 rounded-full bg-navy text-goldpale font-serif italic text-base flex items-center justify-center font-bold flex-none border border-gold">
                {course.speakerInitials}
              </div>
              <div className="min-w-0">
                <b className="text-navy font-serif text-base block truncate">{course.speaker}</b>
                <span className="text-xs text-ink-soft block truncate">{course.speakerSpecialty}</span>
                <span className="font-mono text-[10.5px] text-ink-soft/80 block truncate">{course.speakerCredentials}</span>
              </div>
            </div>
          </div>

          {course.features && course.features.length > 0 && (
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-teal font-semibold block mb-2">
                ¿Qué incluye este programa?
              </span>
              <ul className="space-y-2 text-sm text-ink-soft">
                {course.features.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-tealtint rounded-xl border border-teal/20 text-xs font-mono text-tealdeep">
              <span className="font-bold block uppercase tracking-wider">Modalidad</span>
              {course.modality}
            </div>
            <div className="p-3 bg-bg-alt rounded-xl border border-line text-xs font-mono text-ink-soft">
              <span className="font-bold block uppercase tracking-wider text-navy">Duración</span>
              {course.duration}
            </div>
            <div className="p-3 bg-goldpale/30 rounded-xl border border-gold/30 text-xs font-mono text-[#7a5c17] col-span-2 sm:col-span-1">
              <span className="font-bold block uppercase tracking-wider">Código</span>
              {course.code}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-bg-alt border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 flex-none">
          <div>
            <span className="text-[11px] font-mono uppercase text-ink-soft block">Inversión única</span>
            <div className="font-serif text-xl font-bold text-navy">{course.price}</div>
            {course.installments && (
              <span className="text-[10.5px] font-mono text-teal block mt-0.5">{course.installments}</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="btn btn-ghost !py-3 !px-4 text-xs font-semibold w-1/2 sm:w-auto"
            >
              Cerrar
            </button>
            <a
              href={`https://wa.me/51999999999?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary !py-3 !px-6 text-sm font-semibold flex-1 sm:flex-none justify-center"
            >
              Inscribirme <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
