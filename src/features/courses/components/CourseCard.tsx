"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Calendar, Stethoscope, UserCheck, ArrowRight, Clock } from "lucide-react";
import { getPublicAssetUrl, type PublicCourse } from "@/lib/api";
import { slugify } from "@/lib/utils";

interface CourseCardProps {
  course: PublicCourse;
}

function publishedLabel(value?: string | null) {
  if (!value) return "Programa Académico 2026";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Programa Académico 2026"
    : `Publicado: ${date.toLocaleDateString("es-PE", { day: "numeric", month: "short", year: "numeric" })}`;
}

const deliveryModeText: Record<string, string> = {
  in_person: "Presencial",
  virtual_sync: "En vivo",
  virtual_async: "Virtual 24/7",
  hybrid: "Semipresencial",
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function CourseCard({ course }: CourseCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getPublicAssetUrl(course.thumbnail_url);
  const price = Number(course.price ?? 0);
  const teacher = course.teachers?.[0];
  const teacherNames = course.teachers
    ?.map((person) => `${person.name} ${person.last_name}`.trim())
    .join(", ");

  const certLabel = course.certificate_included
    ? "Certificado Oficial Incluido"
    : course.certificate_price != null
      ? `Certificado Opcional · S/ ${Number(course.certificate_price).toFixed(0)}`
      : "Certificación oficial";

  const hours = Number(course.total_academic_hours ?? 0);

  return (
    <article className="group relative rounded-3xl border border-line bg-white shadow-[0_4px_20px_rgba(15,41,66,0.05)] hover:shadow-[0_16px_36px_rgba(15,41,66,0.12)] hover:border-teal/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Cabecera Gráfica de la Tarjeta */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-navyink via-navy to-tealdeep flex-none">
        {imageUrl && !imageError ? (
          <Image
            src={imageUrl}
            alt={course.title}
            fill
            unoptimized={imageUrl.includes("212.47.64.208")}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Portada Institucional Alternativa con estética médica premium */
          <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between texture-dark bg-gradient-to-br from-navy via-navy to-tealdeep">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono font-bold uppercase tracking-widest text-goldpale">
                <Stethoscope className="w-3 h-3 text-gold" />
                <span>FormaSalud</span>
              </span>
              <span className="text-[10px] font-mono font-bold bg-gold/20 text-gold px-2 py-0.5 rounded-full border border-gold/30">
                2026
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="w-10 h-1 bg-gold rounded-full" />
              <p className="text-xs sm:text-sm font-serif font-extrabold text-white line-clamp-2 leading-snug">
                {course.title}
              </p>
              <p className="text-[10px] text-white/60 font-mono">
                Actualización y Especialización Clínica
              </p>
            </div>
          </div>
        )}

        {/* Badge flotante de certificación */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-navy/90 backdrop-blur-xs border border-gold/40 text-[10px] font-bold text-goldpale shadow-xs">
            <Award className="w-3 h-3 text-gold shrink-0" />
            <span>{certLabel}</span>
          </span>
        </div>

        {/* Modalidad en esquina derecha */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-0.5 rounded-md bg-white/90 text-navy text-[10px] font-mono font-bold shadow-xs">
            {deliveryModeText[course.delivery_mode ?? ""] ?? "Virtual"}
          </span>
        </div>
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Metadatos superiores (Horas y Fecha) */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-ink-soft pb-2 border-b border-line/60">
          <span className="flex items-center gap-1 text-teal font-semibold">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{publishedLabel(course.published_at)}</span>
          </span>
          {hours > 0 && (
            <span className="font-mono text-xs font-bold text-navy bg-tealtint px-2 py-0.5 rounded-md">
              {hours} hrs académicas
            </span>
          )}
        </div>

        {/* Título del curso */}
        <div className="mt-3 min-h-[3.8rem] flex items-start">
          <h3
            title={course.title}
            className="text-base sm:text-lg font-serif font-bold text-navy group-hover:text-teal transition-colors line-clamp-2 leading-snug"
          >
            {course.title}
          </h3>
        </div>

        {/* Descripción corta */}
        <p className="mt-1.5 text-xs text-ink-soft line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {course.short_description ||
            course.description ||
            "Programa académico con acreditación oficial, casos clínicos reales y metodología virtual interactiva."}
        </p>

        {/* Docente / Equipo */}
        <div className="flex items-center gap-2.5 mt-4 pt-3.5 border-t border-line/70">
          <div className="w-8 h-8 rounded-full bg-navy text-goldpale flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs border border-gold/40">
            {teacher ? initials(`${teacher.name} ${teacher.last_name}`) : "FS"}
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-ink-soft uppercase font-semibold tracking-wider block">
              {course.teachers?.length ? "Docente Especialista" : "Plana Docente"}
            </span>
            <span className="text-xs font-bold text-navy truncate block">
              {teacherNames || "Cuerpo Docente FormaSalud"}
            </span>
          </div>
        </div>

        {/* Precio y Botón Ver Detalles en el Footer */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-line/80">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-ink-soft block font-semibold">
              {price === 0 ? "Acceso" : "Inversión"}
            </span>
            <div className="text-xl font-extrabold text-navy font-serif leading-none mt-0.5">
              {price === 0 ? "Libre" : `S/ ${price.toFixed(2)}`}
            </div>
          </div>

          <Link
            href={`/cursos/${slugify(course.title)}`}
            className="px-4 py-2.5 rounded-xl bg-teal text-white hover:bg-tealdeep text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 group-hover:shadow-md group-hover:scale-102"
          >
            <span>Ver Programa</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
