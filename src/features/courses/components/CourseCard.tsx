import React from "react";
import { Course } from "../data/courses";

interface CourseCardProps {
  course: Course;
  onViewDetails: (course: Course) => void;
}

/**
 * CourseCard — versión reducida.
 * Solo muestra: nombre del curso, fecha de inicio, horas académicas,
 * profesor, precio y un botón para ver el detalle completo (modal).
 * Se usa tanto en la vista Home como en la vista Cursos.
 */
export function CourseCard({ course, onViewDetails }: CourseCardProps) {
  const getBarGradient = (category: Course["category"]) => {
    switch (category) {
      case "ia":
        return "bg-gradient-to-r from-gold via-[#8a6a1c] to-navyink";
      case "gestion":
        return "bg-gradient-to-r from-navy via-navyink to-tealdeep";
      case "taller":
        return "bg-gradient-to-r from-tealdeep via-teal to-navyink";
      case "diplomado":
        return "bg-gradient-to-r from-teal via-tealdeep to-navy";
      default:
        return "bg-gradient-to-r from-[#1c3d5e] to-navyink";
    }
  };

  return (
    <article className="group relative rounded-2xl border border-line bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Barra superior de color por categoría */}
      <div className={`h-2 ${getBarGradient(course.category)}`} />

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Fecha de inicio */}
        <span className="text-[11px] font-mono text-teal font-semibold uppercase tracking-wide flex items-center gap-1.5">
          📅 {course.startDate}
        </span>

        {/* Nombre del curso */}
        <h3 className="mt-2.5 text-lg sm:text-[19px] leading-snug text-navy font-serif font-bold group-hover:text-teal transition-colors">
          {course.title}
        </h3>

        {/* Horas académicas */}
        <span className="mt-3.5 inline-flex w-fit text-[10.5px] font-mono uppercase tracking-wide bg-goldpale/40 text-[#7a5c17] px-2.5 py-1 rounded-full font-semibold">
          {course.academicHours}
        </span>

        {/* Profesor */}
        <div className="flex items-center gap-3 mt-4 pt-3.5 border-t border-line">
          <div className="w-9 h-9 rounded-full bg-navyink border border-gold flex items-center justify-center flex-none shadow-xs">
            <span className="font-serif italic text-goldpale text-xs font-bold">
              {course.speakerInitials}
            </span>
          </div>
          <div className="min-w-0">
            <span className="text-[12px] text-ink-soft block truncate">
              Docente: <b className="text-navy font-semibold">{course.speaker}</b>
            </span>
          </div>
        </div>

        {/* Precio y botón Ver detalles */}
        <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-line">
          <div>
            <span className="text-[10.5px] font-mono uppercase text-ink-soft block font-medium">
              Inversión única
            </span>
            <div className="font-serif text-xl sm:text-2xl font-bold text-navy leading-none">
              {course.price}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onViewDetails(course)}
            className="btn btn-primary !py-2.5 !px-4 sm:!px-5 !text-[13px] font-semibold cursor-pointer"
          >
            Ver detalles <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
