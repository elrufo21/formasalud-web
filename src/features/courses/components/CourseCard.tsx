import React from "react";
import { Course } from "../data/courses";

interface CourseCardProps {
  course: Course;
}

// IDs de los 2 cursos que ocultan su ícono y badge
const HIDDEN_ICON_BADGE_IDS = ["enfermeria-cuidados-criticos", "ia-aplicada-salud"];

export function CourseCard({ course }: CourseCardProps) {
  const getBannerGradient = (category: Course["category"]) => {
    switch (category) {
      case "ia":
        return "bg-gradient-to-br from-gold via-[#8a6a1c] to-navyink";
      case "gestion":
        return "bg-gradient-to-br from-navy via-navyink to-tealdeep";
      case "taller":
        return "bg-gradient-to-br from-tealdeep via-teal to-navyink";
      case "diplomado":
        return "bg-gradient-to-br from-teal via-tealdeep to-navy";
      default:
        return "bg-gradient-to-br from-[#1c3d5e] to-navyink";
    }
  };

  const getBadgeStyle = (badgeType?: Course["badgeType"]) => {
    switch (badgeType) {
      case "fire":
        return "bg-[#E63946] text-white";
      case "hot":
        return "bg-navy text-white";
      case "new":
        return "bg-teal text-white";
      default:
        return "bg-tealdeep text-goldpale border border-gold/40";
    }
  };

  const renderIcon = (iconType?: Course["iconType"]) => {
    switch (iconType) {
      case "ia":
        return (
          <svg className="w-8 h-8 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <rect x="3" y="4" width="18" height="14" rx="2" />
            <path d="M8 21h8M12 18v3" />
          </svg>
        );
      case "taller":
        return (
          <svg className="w-8 h-8 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M4 21v-7a8 8 0 0 1 16 0v7" />
            <path d="M4 14h16" />
          </svg>
        );
      case "gestion":
        return (
          <svg className="w-8 h-8 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <rect x="3" y="11" width="4" height="9" />
            <rect x="10" y="6" width="4" height="14" />
            <rect x="17" y="3" width="4" height="17" />
          </svg>
        );
      case "urgencia":
        return (
          <svg className="w-8 h-8 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
            <path d="M8 13v1a4 4 0 0 0 8 0v-1M6 21c0-2.5 2-4 6-4s6 1.5 6 4" />
          </svg>
        );
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hola FORMASALUD, me gustaría recibir el temario e inscribirme en el programa: "${course.title}" (${course.code}).`
  );

  const hideIconAndBadge = HIDDEN_ICON_BADGE_IDS.includes(course.id);

  return (
    <article className="group relative rounded-2xl border border-line bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Floating Badge */}
      {course.badge && !hideIconAndBadge && (
        <span
          className={`absolute top-6 right-5 z-10 text-[10px] font-mono font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-md ${getBadgeStyle(
            course.badgeType
          )}`}
        >
          {course.badge}
        </span>
      )}

      {/* Header Visual Bar - Altura fija estricta de 140px */}
      <div className={`h-[140px] relative flex flex-col justify-end p-6 text-white ${getBannerGradient(course.category)}`}>
        {/* Ícono posicionado de forma absoluta para no romper la alineación */}
        {!hideIconAndBadge && (
          <div className="absolute top-6 left-6 z-10">
            {renderIcon(course.iconType)}
          </div>
        )}

        <div className="space-y-1">
          <span className="font-mono text-[10px] tracking-widest uppercase text-goldpale block font-semibold">
            {course.categoryLabel}
          </span>
          <span className="text-[11px] font-mono text-white/80 block">
            📅 {course.startDate}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="text-lg sm:text-[19px] leading-snug text-navy font-serif font-bold group-hover:text-teal transition-colors">
          {course.title}
        </h3>

        <p className="mt-2.5 text-[13.5px] text-ink-soft leading-relaxed flex-1">
          {course.description}
        </p>

        {/* Academic Hours & Modality Chips */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          <span className="text-[10.5px] font-mono uppercase tracking-wide bg-tealtint text-tealdeep px-2.5 py-1 rounded-full font-semibold">
            {course.modality}
          </span>
          <span className="text-[10.5px] font-mono uppercase tracking-wide bg-tealtint text-tealdeep px-2.5 py-1 rounded-full font-semibold">
            {course.duration}
          </span>
          <span className="text-[10.5px] font-mono uppercase tracking-wide bg-goldpale/40 text-[#7a5c17] px-2.5 py-1 rounded-full font-semibold">
            {course.academicHours}
          </span>
        </div>

        {/* Features Highlights if available */}
        {course.features && course.features.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-xs text-ink-soft border-t border-line pt-3">
            {course.features.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <span className="text-teal font-bold text-xs">✓</span>
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Docente / Ponente Info */}
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
            <span className="font-mono text-[10px] text-ink-soft/80 block truncate">
              {course.speakerCredentials}
            </span>
          </div>
        </div>

        {/* Investment & Actions */}
        <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-line">
          <div>
            <span className="text-[10.5px] font-mono uppercase text-ink-soft block font-medium">
              Inversión única
            </span>
            <div className="font-serif text-xl sm:text-2xl font-bold text-navy leading-none">
              {course.price}
            </div>
            {course.installments && (
              <span className="text-[9.5px] font-mono text-teal block mt-0.5">
                {course.installments}
              </span>
            )}
          </div>

          <a
            href={`https://wa.me/51999999999?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary !py-2.5 !px-4 sm:!px-5 !text-[13px] font-semibold"
          >
            Inscribirme <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}