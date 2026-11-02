"use client";

import React, { useEffect, useState } from "react";
import { api, CourseSyllabus, PublicCourse } from "@/lib/api";

const deliveryModeLabel: Record<string, string> = {
  in_person: "Presencial",
  virtual_sync: "Virtual en vivo",
  virtual_async: "Virtual asincrónico",
  hybrid: "Híbrido / Semipresencial",
};

interface CourseDetailModalProps {
  course: PublicCourse | null;
  onClose: () => void;
}

export function CourseDetailModal({ course, onClose }: CourseDetailModalProps) {
  const [syllabus, setSyllabus] = useState<CourseSyllabus | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (course) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      api.getCourseSyllabus(course.course_id).then(setSyllabus).catch(() => setSyllabus(null));
    } else {
      setSyllabus(null);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [course, onClose]);

  if (!course) return null;

  const teacher = course.teachers?.[0];
  const teachers = course.teachers ?? [];
  const teacherNames = teachers.map((person) => `${person.name} ${person.last_name}`.trim()).join(", ");
  const price = Number(course.price ?? 0);
  const whatsappMessage = encodeURIComponent(
    `Hola FORMASALUD, me gustaría recibir el temario e información para inscribirme en: "${course.title}".`,
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
        onClick={(event) => event.stopPropagation()}
      >
        <div className="p-6 sm:p-8 bg-gradient-to-br from-teal via-tealdeep to-navy text-white relative flex-none">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar detalle del curso"
          >
            ✕
          </button>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-white/15 border border-white/25">
              Programa académico FORMASALUD
            </span>
          </div>
          <h2 id="course-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
            {course.title}
          </h2>
          <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-mono text-white/80">
            <span>🎓 {teacherNames || "Docente por confirmar"}</span>
            {teacher?.specialty && <span>{teacher.specialty}</span>}
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-ink">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal font-semibold block mb-2">
              Descripción del Programa
            </span>
            <p className="text-sm text-ink-soft leading-relaxed">
              {course.description || course.short_description || "Consulta con un asesor académico para conocer el programa."}
            </p>
          </div>

          {(Number(course.total_academic_hours ?? 0) > 0 || Number(course.duration_weeks ?? 0) > 0 || course.delivery_mode) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-bg-alt border border-line text-xs">
                <span className="font-mono uppercase text-[10px] text-ink-soft block">Modalidad</span>
                <b className="text-navy">{deliveryModeLabel[course.delivery_mode ?? ""] ?? "Virtual"}</b>
              </div>
              {Number(course.total_academic_hours ?? 0) > 0 && (
                <div className="p-3 rounded-xl bg-bg-alt border border-line text-xs">
                  <span className="font-mono uppercase text-[10px] text-ink-soft block">Carga Académica</span>
                  <b className="text-navy">{course.total_academic_hours} horas académicas</b>
                </div>
              )}
              {Number(course.duration_weeks ?? 0) > 0 && (
                <div className="p-3 rounded-xl bg-bg-alt border border-line text-xs">
                  <span className="font-mono uppercase text-[10px] text-ink-soft block">Duración</span>
                  <b className="text-navy">{course.duration_weeks} semanas</b>
                </div>
              )}
            </div>
          )}

          {syllabus && syllabus.modules.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-teal font-semibold block">
                Plan de Estudios ({syllabus.modules.length} módulos)
              </span>
              <div className="space-y-2.5">
                {syllabus.modules.map((mod) => (
                  <div key={mod.module_id} className="rounded-xl border border-line bg-bg-alt p-3.5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <b className="text-xs sm:text-sm text-navy">
                        Módulo {mod.module_number}: {mod.title}
                      </b>
                      {mod.lessons?.length ? (
                        <span className="text-[11px] font-mono text-teal font-semibold shrink-0">
                          {mod.lessons.length} sesiones
                        </span>
                      ) : null}
                    </div>
                    {mod.lessons?.length > 0 && (
                      <ul className="space-y-1 text-xs text-ink-soft pl-3 border-l-2 border-teal/30">
                        {mod.lessons.map((lesson) => (
                          <li key={lesson.lesson_id}>
                            <span className="font-mono font-semibold text-navy">Clase {lesson.lesson_number}:</span>{" "}
                            {lesson.title}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal font-semibold block mb-1">
              Docente / Ponente
            </span>
            <div className="space-y-2">
              {teachers.length ? teachers.map((person) => (
                <div key={`${person.name}-${person.last_name}`} className="flex items-center gap-3 bg-bg-alt p-3.5 rounded-xl border border-line">
                  <div className="w-10 h-10 rounded-full bg-navy text-goldpale font-serif italic text-base flex items-center justify-center font-bold flex-none border border-gold overflow-hidden">
                    {person.profile_photo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={person.profile_photo_url} alt="" className="w-full h-full object-cover" />
                    ) : `${person.name[0] ?? ""}${person.last_name[0] ?? ""}`}
                  </div>
                  <div className="min-w-0">
                    <b className="text-navy font-serif text-base block truncate">{person.name} {person.last_name}</b>
                    <span className="text-xs text-ink-soft block truncate">
                      {person.specialty || person.profession || "Docente FORMASALUD"}
                    </span>
                  </div>
                </div>
              )) : (
                <div className="bg-bg-alt p-3.5 rounded-xl border border-line text-sm text-ink-soft">
                  Docente por confirmar
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-tealtint rounded-xl border border-teal/20 text-xs font-mono text-tealdeep">
              <span className="font-bold block uppercase tracking-wider">Certificado</span>
              {course.certificate_included
                ? "Incluido en el curso"
                : course.certificate_price != null
                  ? `Opcional · S/ ${Number(course.certificate_price).toFixed(2)}`
                  : "Consultar condiciones"}
            </div>
            <div className="p-3 bg-bg-alt rounded-xl border border-line text-xs font-mono text-ink-soft">
              <span className="font-bold block uppercase tracking-wider text-navy">Inversión</span>
              {price === 0 ? "Consultar" : `S/ ${price.toFixed(2)}`}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-bg-alt border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 flex-none">
          <div>
            <span className="text-[11px] font-mono uppercase text-ink-soft block">Inversión única</span>
            <div className="font-serif text-xl font-bold text-navy">
              {price === 0 ? "Consultar" : `S/ ${price.toFixed(2)}`}
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button onClick={onClose} className="btn btn-ghost !py-3 !px-4 text-xs font-semibold w-1/2 sm:w-auto">
              Cerrar
            </button>
            <a
              href={`https://wa.me/51939584395?text=${whatsappMessage}`}
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
