"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle, GraduationCap, Sparkles, Tag } from "lucide-react";
import { Course } from "@/lib/api";
import { cn } from "@/lib/utils";

interface CatalogCourseCardProps {
  course: Course;
  onEnroll: (course: Course) => void;
}

// Degradados de la paleta institucional para cursos sin imagen
const FALLBACK_GRADIENTS = [
  "from-teal via-tealdeep to-navy",
  "from-navy via-navyink to-tealdeep",
  "from-tealdeep via-teal to-navyink",
  "from-[#1c3d5e] via-navy to-navyink",
];

const NEW_COURSE_DAYS = 30;

function isNewCourse(publishedAt?: string | null) {
  if (!publishedAt) return false;
  const published = new Date(publishedAt).getTime();
  if (Number.isNaN(published)) return false;
  return Date.now() - published < NEW_COURSE_DAYS * 24 * 60 * 60 * 1000;
}

function formatPublishedDate(publishedAt?: string | null) {
  if (!publishedAt) return null;
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("es-PE", { month: "short", year: "numeric" });
}

function getInitials(title: string) {
  return title
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function CatalogCourseCard({ course, onEnroll }: CatalogCourseCardProps) {
  const [imageError, setImageError] = useState(false);

  const price = Number(course.price);
  const certIncluded = course.certificate_included;
  const certPrice = Number(course.certificate_price);
  const isFree = price === 0;
  const isNew = isNewCourse(course.published_at);
  const publishedLabel = formatPublishedDate(course.published_at);
  const showImage = !!course.thumbnail_url && !imageError;
  const gradient = FALLBACK_GRADIENTS[course.course_id % FALLBACK_GRADIENTS.length];

  return (
    <article className="group rounded-2xl bg-white border border-line shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Imagen del curso */}
      <div className="relative aspect-[16/9] overflow-hidden bg-bg-alt">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={course.thumbnail_url!}
            alt={course.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={cn(
              "w-full h-full bg-gradient-to-br flex items-center justify-center relative",
              gradient,
            )}
          >
            {/* Patrón sutil de fondo */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "18px 18px",
              }}
            />
            <div className="relative flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 rounded-full border border-gold/60 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-goldpale" />
              </div>
              <span className="font-serif italic text-goldpale/90 text-sm font-bold tracking-wide">
                {getInitials(course.title) || "FS"}
              </span>
            </div>
          </div>
        )}

        {/* Degradado superior para legibilidad de etiquetas */}
        <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />

        {/* Etiquetas sobre la imagen */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {isFree && (
              <span className="px-2 py-0.5 rounded-full bg-gold text-navyink text-[10px] font-bold uppercase tracking-wide shadow-xs">
                Gratuito
              </span>
            )}
            {isNew && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 text-teal text-[10px] font-bold uppercase tracking-wide shadow-xs">
                <Sparkles className="w-3 h-3" />
                Nuevo
              </span>
            )}
          </div>

          {certIncluded ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 text-emerald-700 text-[10px] font-semibold shadow-xs">
              <CheckCircle className="w-3 h-3" />
              Cert. Incluido
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 text-amber-800 text-[10px] font-semibold shadow-xs">
              <Tag className="w-3 h-3" />
              Cert. S/ {certPrice ? certPrice.toFixed(2) : "49.00"}
            </span>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 flex-1 flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-soft font-bold">
            FormaSalud
          </span>
          {publishedLabel && (
            <span className="font-mono text-[10px] text-ink-soft/80">
              Publicado {publishedLabel}
            </span>
          )}
        </div>

        <h3 className="font-serif font-bold text-base text-navy leading-snug line-clamp-2 group-hover:text-teal transition-colors">
          {course.title}
        </h3>

        <p className="text-xs text-ink-soft line-clamp-2">
          {course.short_description ||
            "Programa con certificación y simulación clínica avanzada."}
        </p>
      </div>

      {/* Pie: precio y acción */}
      <div className="px-5 py-4 bg-bg-alt/50 border-t border-line flex items-center justify-between">
        <div>
          <span className="text-[10px] text-ink-soft block leading-none">Inversión:</span>
          <span
            className={cn(
              "font-mono font-bold text-sm mt-0.5 block",
              isFree ? "text-teal" : "text-navy",
            )}
          >
            {isFree ? "Gratuito" : `S/ ${price.toFixed(2)}`}
          </span>
        </div>

        <button
          onClick={() => onEnroll(course)}
          className="px-4 py-2 rounded-xl bg-teal text-white text-xs font-semibold hover:bg-tealdeep transition-all flex items-center gap-1 cursor-pointer shadow-xs"
        >
          <span>Inscribirme</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
}

export function CatalogCourseCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-line overflow-hidden animate-pulse">
      <div className="aspect-[16/9] bg-line/60" />
      <div className="p-5 space-y-3">
        <div className="h-2.5 w-20 bg-line rounded" />
        <div className="h-4 w-4/5 bg-line rounded" />
        <div className="h-3 w-full bg-line/70 rounded" />
        <div className="h-3 w-2/3 bg-line/70 rounded" />
      </div>
      <div className="px-5 py-4 border-t border-line flex items-center justify-between">
        <div className="h-5 w-16 bg-line rounded" />
        <div className="h-8 w-28 bg-line rounded-xl" />
      </div>
    </div>
  );
}
