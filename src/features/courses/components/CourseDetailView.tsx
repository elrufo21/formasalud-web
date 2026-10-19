"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Calendar, CheckCircle2, ChevronRight, MessageCircle, Stethoscope, UserCheck } from "lucide-react";
import { getPublicAssetUrl, type PublicCourse } from "@/lib/api";

const SECTIONS = [
  { id: "descripcion", label: "Descripción" },
  { id: "docentes", label: "Docentes" },
  { id: "certificacion", label: "Certificación" },
];

function formatDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" });
}

export function CourseDetailView({ course }: { course: PublicCourse }) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getPublicAssetUrl(course.thumbnail_url);
  const teachers = course.teachers ?? [];
  const teacherNames = teachers.map((person) => `${person.name} ${person.last_name}`.trim()).join(", ");
  const price = Number(course.price ?? 0);
  const priceLabel = price === 0 ? "Consultar" : `S/ ${price.toFixed(2)}`;
  const publishedAt = formatDate(course.published_at);
  const certificateLabel = course.certificate_included
    ? "Incluido en el curso"
    : course.certificate_price != null
      ? `Opcional · S/ ${Number(course.certificate_price).toFixed(2)}`
      : "Consultar condiciones";
  const whatsappMessage = encodeURIComponent(
    `Hola FORMASALUD, me gustaría recibir el temario e información para inscribirme en: "${course.title}".`,
  );

  return (
    <main className="flex-1 bg-bg-alt">
      <section className="!pt-6 sm:!pt-8 !pb-16 sm:!pb-20">
        <div className="wrap">
          {/* Breadcrumb */}
          <nav aria-label="Ruta de navegación" className="mb-6 text-xs sm:text-sm text-ink-soft">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-teal transition-colors">Inicio</Link></li>
              <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
              <li><Link href="/cursos" className="hover:text-teal transition-colors">Cursos</Link></li>
              <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
              <li aria-current="page" className="font-semibold text-navy line-clamp-1 max-w-full">{course.title}</li>
            </ol>
          </nav>

          {/* Mobile order: header → enrollment card → content. Desktop: card sticks in the right column. */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-8 lg:gap-x-10 lg:gap-y-10 items-start">
            <header className="min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy leading-tight tracking-tight">
                {course.title}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-ink-soft">
                Por <span className="font-semibold text-navy">{teacherNames || "Plana Docente FormaSalud"}</span>
              </p>

              <div className="relative mt-6 aspect-[16/9] rounded-2xl overflow-hidden border border-line shadow-[0_10px_30px_rgba(15,41,66,0.10)] bg-gradient-to-br from-navyink via-navy to-tealdeep">
                {imageUrl && !imageError ? (
                  <Image
                    src={imageUrl}
                    alt={course.title}
                    fill
                    priority
                    unoptimized={imageUrl.includes("212.47.64.208")}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    onError={() => setImageError(true)}
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between texture-dark">
                    <span className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold uppercase tracking-widest text-goldpale">
                      <Stethoscope className="w-3.5 h-3.5 text-gold" />
                      <span>FormaSalud</span>
                    </span>
                    <div className="w-10 h-0.5 bg-gold rounded-full" />
                  </div>
                )}
              </div>

              <nav aria-label="Secciones del curso" className="mt-6 flex gap-2 overflow-x-auto pb-1">
                {SECTIONS.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="shrink-0 px-4 py-2 rounded-xl border border-line bg-white text-xs sm:text-sm font-semibold text-navy hover:border-teal hover:text-teal transition-colors"
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </header>

            {/* Enrollment card */}
            <aside className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-28">
              <div className="rounded-2xl bg-white border border-line shadow-[0_10px_30px_rgba(15,41,66,0.08)] p-5 sm:p-6">
                <h2 className="text-base font-bold text-navy">¿Cómo te inscribes?</h2>
                <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                  Escríbenos por WhatsApp y un asesor académico te enviará el temario y los pasos para tu matrícula.
                </p>

                <div className="mt-5 rounded-xl border border-teal/25 bg-tealtint p-4">
                  <span className="text-xs font-semibold text-tealdeep">Inversión única</span>
                  <div className="mt-1 text-3xl font-extrabold text-navy leading-none">{priceLabel}</div>
                </div>

                <a
                  href={`https://wa.me/51939584395?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full mt-5 !py-3.5 text-sm font-bold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inscribirme</span>
                  <span className="arrow">→</span>
                </a>

                <dl className="mt-6 pt-5 border-t border-line grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs text-ink-soft">
                      <Award className="w-3.5 h-3.5 text-teal" /> Certificado
                    </dt>
                    <dd className="mt-1 font-semibold text-navy">{certificateLabel}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs text-ink-soft">
                      <UserCheck className="w-3.5 h-3.5 text-teal" /> Docentes
                    </dt>
                    <dd className="mt-1 font-semibold text-navy">{teachers.length || "Por confirmar"}</dd>
                  </div>
                  {publishedAt && (
                    <div className="col-span-2">
                      <dt className="flex items-center gap-1.5 text-xs text-ink-soft">
                        <Calendar className="w-3.5 h-3.5 text-teal" /> Publicado
                      </dt>
                      <dd className="mt-1 font-semibold text-navy">{publishedAt}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </aside>

            {/* Content sections */}
            <div className="min-w-0 lg:col-start-1 space-y-10">
              <section id="descripcion" className="!p-0 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-extrabold text-navy">Descripción</h2>
                <p className="mt-3 text-sm sm:text-base text-ink-soft leading-relaxed whitespace-pre-line">
                  {course.description || course.short_description || "Consulta con un asesor académico para conocer el programa."}
                </p>
              </section>

              <section id="docentes" className="!p-0 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-extrabold text-navy">Docentes</h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {teachers.length ? teachers.map((person) => (
                    <div key={`${person.name}-${person.last_name}`} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-line">
                      <div className="w-12 h-12 rounded-full bg-navy text-goldpale text-base flex items-center justify-center font-bold flex-none border border-gold overflow-hidden">
                        {person.profile_photo_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={person.profile_photo_url} alt="" className="w-full h-full object-cover" />
                        ) : `${person.name[0] ?? ""}${person.last_name[0] ?? ""}`}
                      </div>
                      <div className="min-w-0">
                        <b className="text-navy text-sm sm:text-base block truncate">{person.name} {person.last_name}</b>
                        <span className="text-xs text-ink-soft block truncate">
                          {person.specialty || person.profession || "Docente FORMASALUD"}
                        </span>
                      </div>
                    </div>
                  )) : (
                    <div className="bg-white p-4 rounded-xl border border-line text-sm text-ink-soft">
                      Docente por confirmar
                    </div>
                  )}
                </div>
              </section>

              <section id="certificacion" className="!p-0 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-extrabold text-navy">Certificación</h2>
                <div className="mt-4 flex items-start gap-3 bg-white p-4 sm:p-5 rounded-xl border border-line">
                  <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                    {certificateLabel}. Los certificados FORMASALUD pueden validarse en línea mediante su código QR en{" "}
                    <Link href="/verificar" className="font-semibold text-teal hover:underline">la página de verificación</Link>.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
