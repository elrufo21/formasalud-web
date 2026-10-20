import { getPublicAssetUrl, type PublicCourse } from '@/lib/api';
import { useState } from 'react';
import Image from 'next/image';
import { Award, Calendar, Stethoscope, UserCheck } from 'lucide-react';

interface CourseCardProps {
  course: PublicCourse;
  onViewDetails: (course: PublicCourse) => void;
}

function publishedLabel(value?: string | null) {
  if (!value) return 'Programa Académico 2026';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'Programa Académico 2026'
    : `Publicado: ${date.toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' })}`;
}

const deliveryModeText: Record<string, string> = {
  in_person: 'Presencial',
  virtual_sync: 'Virtual en vivo',
  virtual_async: 'Virtual',
  hybrid: 'Semipresencial',
};

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
}

export function CourseCard({ course, onViewDetails }: CourseCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getPublicAssetUrl(course.thumbnail_url);
  const price = Number(course.price ?? 0);
  const teacher = course.teachers?.[0];
  const teacherNames = course.teachers?.map((person) => `${person.name} ${person.last_name}`.trim()).join(', ');
  const certLabel = course.certificate_included
    ? 'Certificado incluido'
    : course.certificate_price != null
      ? `Certificado opcional · S/ ${Number(course.certificate_price).toFixed(0)}`
      : 'Consultar certificación';

  return (
    <article className="group relative rounded-2xl border border-line bg-white shadow-[0_6px_24px_rgba(15,41,66,0.06)] hover:shadow-[0_18px_40px_rgba(15,41,66,0.13)] hover:border-teal/35 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Cabecera Visual Unificada (Miniatura o Banner Institucional FormaSalud) */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-navyink via-navy to-tealdeep flex-none">
        {imageUrl && !imageError ? (
          <Image
            src={imageUrl}
            alt={course.title}
            fill
            unoptimized={imageUrl.includes('212.47.64.208')}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 p-5 flex flex-col justify-between texture-dark">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold uppercase tracking-widest text-goldpale">
                <Stethoscope className="w-3 h-3 text-gold" />
                <span>FormaSalud</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                Edición 2026
              </span>
            </div>
            <div className="space-y-1">
              <div className="w-8 h-0.5 bg-gold rounded-full" />
              <p className="text-xs font-semibold text-white/85 line-clamp-2 leading-snug">
                Especialización y Actualización Clínica Continua
              </p>
            </div>
          </div>
        )}

        {/* Badge flotante de modalidad / estado */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navyink/85 backdrop-blur-xs border border-gold/35 text-[10px] font-bold uppercase tracking-wider text-goldpale shadow-sm">
            <Award className="w-3 h-3 text-gold shrink-0" />
            <span>{certLabel}</span>
          </span>
        </div>
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-teal font-bold uppercase tracking-wider flex-none">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-teal shrink-0" />
            <span>{publishedLabel(course.published_at)}</span>
          </span>
          {(Number(course.total_academic_hours ?? 0) > 0 || course.delivery_mode) && (
            <span className="rounded-md bg-tealtint px-2 py-0.5 text-[10px] font-mono text-tealdeep">
              {deliveryModeText[course.delivery_mode ?? ''] ?? 'Virtual'}
              {Number(course.total_academic_hours ?? 0) > 0 ? ` · ${course.total_academic_hours} hrs` : ''}
            </span>
          )}
        </div>

        {/* Título con altura consistente */}
        <div className="mt-2.5 min-h-[4.25rem] flex items-start overflow-hidden flex-none">
          <h3
            title={course.title}
            className="text-base sm:text-[17px] leading-snug text-navy font-bold group-hover:text-teal transition-colors line-clamp-3"
          >
            {course.title}
          </h3>
        </div>

        {/* Descripción corta opcional */}
        <p className="mt-2 text-xs text-ink-soft line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {course.short_description || course.description || 'Programa académico certificado con enfoque práctico y basado en evidencia clínica.'}
        </p>

        {/* Docente / Especialista */}
        <div className="flex items-center gap-3 mt-4 pt-3.5 border-t border-line flex-none">
          <div className="w-9 h-9 rounded-full bg-navy text-goldpale border border-gold/60 flex items-center justify-center flex-none shadow-xs overflow-hidden">
            {teacher?.profile_photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={teacher.profile_photo_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-bold">{teacher ? initials(`${teacher.name} ${teacher.last_name}`) : 'FS'}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[11px] text-ink-soft font-medium flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-teal shrink-0" />
              <span>{course.teachers?.length ? 'Docente' : 'Equipo Académico'}</span>
            </span>
            <b className="text-xs text-navy font-bold block truncate" title={teacherNames || 'Plana Docente FormaSalud'}>
              {teacherNames || 'Plana Docente FormaSalud'}
            </b>
          </div>
        </div>

        {/* Precio y botón Ver detalles siempre alineados en la parte inferior */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-line flex-none">
          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-wider text-ink-soft block font-semibold">
              {price === 0 ? 'Acceso Libre' : 'Inversión única'}
            </span>
            <div className="text-lg sm:text-xl font-extrabold text-navy leading-none mt-1">
              {price === 0 ? 'Gratuito' : `S/ ${price.toFixed(2)}`}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onViewDetails(course)}
            className="btn btn-primary !py-2.5 !px-4 !text-xs font-bold cursor-pointer shrink-0 !rounded-xl"
          >
            <span>Ver detalles</span>
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
