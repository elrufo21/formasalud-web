"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  MessageCircle,
  Stethoscope,
  UserCheck,
  GraduationCap,
  ShieldCheck,
  Download,
  Share2,
  HelpCircle,
  Layers,
  Video,
  FileText,
  Check,
  Sparkles,
  Phone,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  api,
  CourseSyllabus,
  getPublicAssetUrl,
  type PublicCourse,
} from "@/lib/api";

const SECTIONS = [
  { id: "descripcion", label: "Descripción" },
  { id: "temario", label: "Plan de Estudios" },
  { id: "docentes", label: "Plana Docente" },
  { id: "certificacion", label: "Certificación Oficial" },
  { id: "faq", label: "Preguntas Frecuentes" },
];

const deliveryModeLabel: Record<string, string> = {
  in_person: "Presencial en Sede",
  virtual_sync: "Virtual Sincrónico (En vivo)",
  virtual_async: "Virtual Asincrónico (Aula 24/7)",
  hybrid: "Híbrido / Semipresencial",
};

const programTypeBadge: Record<string, string> = {
  course: "CURSO DE ALTA ESPECIALIZACIÓN",
  workshop: "TALLER PRÁCTICO CLÍNICO",
  diploma: "DIPLOMADO DE ESPECIALIZACIÓN",
  specialization: "PROGRAMA DE POSGRADO",
  webinar: "CONFERENCIA MAGISTRAL",
};

function formatDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString("es-PE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}

export function CourseDetailView({ course }: { course: PublicCourse }) {
  const [imageError, setImageError] = useState(false);
  const [syllabus, setSyllabus] = useState<CourseSyllabus | null>(null);
  const [openModules, setOpenModules] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const [activeTab, setActiveTab] = useState("descripcion");

  const imageUrl = getPublicAssetUrl(course.thumbnail_url);
  const teachers = course.teachers ?? [];
  const teacherNames = teachers
    .map((person) => `${person.name} ${person.last_name}`.trim())
    .join(", ");

  const price = Number(course.price ?? 0);
  const priceLabel = price === 0 ? "Acceso Libre" : `S/ ${price.toFixed(2)}`;
  const publishedAt = formatDate(course.published_at);
  const academicHours = Number(course.total_academic_hours ?? 0);
  const durationWeeks = Number(course.duration_weeks ?? 0);

  const certificateLabel = course.certificate_included
    ? "Incluido con el curso"
    : course.certificate_price != null
      ? `Opcional · S/ ${Number(course.certificate_price).toFixed(2)}`
      : "Consultar condiciones";

  const whatsappMessage = encodeURIComponent(
    `Hola FORMASALUD, deseo recibir el temario oficial e información de matrícula para: "${course.title}".`,
  );

  const programBadge =
    programTypeBadge[course.program_type ?? "course"] ||
    "PROGRAMA DE ESPECIALIZACIÓN PROFESIONAL";

  useEffect(() => {
    api
      .getCourseSyllabus(course.course_id)
      .then((data) => {
        setSyllabus(data);
        if (data && data.modules?.length) {
          const initialOpen: Record<number, boolean> = {};
          data.modules.forEach((_, idx) => {
            initialOpen[idx] = idx < 2; // Abre los 2 primeros módulos por defecto
          });
          setOpenModules(initialOpen);
        }
      })
      .catch(() => setSyllabus(null));
  }, [course.course_id]);

  const toggleModule = (idx: number) => {
    setOpenModules((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <main className="flex-1 bg-bg-alt">
      {/* 1. HERO SUPERIOR ENVOLVENTE CON BRANDING FORMASALUD */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navyink via-navy to-navy text-white pt-8 sm:pt-12 pb-16 sm:pb-24 border-b border-line/10">
        {/* Glows y Luces Ambientales */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-teal/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-gold/15 blur-3xl pointer-events-none" />

        <div className="wrap relative z-10">
          {/* Breadcrumbs en Hero */}
          <nav aria-label="Ruta de navegación" className="mb-6 text-xs text-white/70">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-goldpale transition-colors">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/40">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li>
                <Link href="/cursos" className="hover:text-goldpale transition-colors">
                  Cursos y Programas
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/40">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li className="font-semibold text-goldpale line-clamp-1 max-w-xs sm:max-w-md">
                {course.title}
              </li>
            </ol>
          </nav>

          {/* Grid Principal del Hero: Título + Datos a la izquierda, Tarjeta Flotante a la derecha */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Columna Izquierda (8 cols) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-5">
              {/* Badges de Categoría */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-gold/20 text-gold border border-gold/40 text-[11px] font-mono font-bold uppercase tracking-wider shadow-2xs">
                  {programBadge}
                </span>
                <span className="px-3 py-1 rounded-full bg-teal/30 text-teal-100 border border-teal/40 text-[11px] font-mono font-semibold">
                  {deliveryModeLabel[course.delivery_mode ?? ""] ?? "Modalidad Virtual"}
                </span>
                {academicHours > 0 && (
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-[11px] font-mono font-medium border border-white/15">
                    {academicHours} Horas Lectivas
                  </span>
                )}
              </div>

              {/* Título Principal de Alto Impacto */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[44px] font-extrabold text-white leading-[1.18] tracking-tight font-serif">
                {course.title}
              </h1>

              {/* Resumen conciso */}
              <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-3xl">
                {course.short_description ||
                  "Actualización profesional intensiva basada en evidencia científica y protocolos hospitalarios vigentes, diseñada para elevar las competencias en el cuidado y gestión clínica."}
              </p>

              {/* Plana Docente Resumida en el Hero */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm shrink-0 border-2 border-gold/50 shadow-sm">
                  {teachers[0] ? teachers[0].name.charAt(0) : "FS"}
                </div>
                <div>
                  <span className="text-[11px] text-white/60 uppercase font-semibold tracking-wider block">
                    Dirección y Plana Docente:
                  </span>
                  <span className="text-sm font-bold text-white block">
                    {teacherNames || "Cuerpo Docente Especialista FormaSalud"}
                  </span>
                </div>
              </div>

              {/* Pastillas de Métricas / Confianza */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <span className="text-[11px] text-white/60 block flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold" /> Certificación
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-0.5">
                    Oficial con QR
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <span className="text-[11px] text-white/60 block flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-gold" /> Disponibilidad
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-0.5">
                    Acceso 24/7 Ilimitado
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-white/60 block flex items-center gap-1.5 font-medium">
                    <GraduationCap className="w-3.5 h-3.5 text-gold" /> Nivel Académico
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-0.5">
                    Especialización
                  </span>
                </div>
              </div>
            </div>

            {/* Columna Derecha (4 cols en Desktop): Tarjeta de Matrícula Flotante */}
            <div className="lg:col-span-5 xl:col-span-4 lg:-mb-32 relative z-20">
              <div className="rounded-3xl bg-white text-ink border border-line shadow-[0_20px_50px_rgba(15,41,66,0.22)] overflow-hidden">
                {/* Cabecera Gráfica de la Tarjeta */}
                <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-navy via-navy to-tealdeep overflow-hidden">
                  {imageUrl && !imageError ? (
                    <Image
                      src={imageUrl}
                      alt={course.title}
                      fill
                      priority
                      unoptimized={imageUrl.includes("212.47.64.208")}
                      sizes="(max-width: 1024px) 100vw, 400px"
                      onError={() => setImageError(true)}
                      className="object-cover"
                    />
                  ) : (
                    /* Portada Académica Institucional Alternativa de Lujo cuando no hay imagen */
                    <div className="absolute inset-0 p-6 flex flex-col justify-between texture-dark bg-gradient-to-br from-navy via-navyink to-tealdeep">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono font-bold tracking-widest text-goldpale uppercase">
                          <Stethoscope className="w-3.5 h-3.5 text-gold" />
                          <span>FormaSalud</span>
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-gold/20 text-gold px-2.5 py-0.5 rounded-full border border-gold/30">
                          OFICIAL
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="w-12 h-1 bg-gold rounded-full" />
                        <h4 className="text-base font-serif font-black text-white leading-tight line-clamp-2">
                          {course.title}
                        </h4>
                        <p className="text-[11px] text-white/70">
                          Programa Académico Certificado 2026
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Badge flotante en miniatura */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy/90 backdrop-blur-xs border border-white/20 text-[10px] font-bold text-white shadow-xs">
                      <Award className="w-3 h-3 text-gold" />
                      <span>{certificateLabel}</span>
                    </span>
                  </div>
                </div>

                {/* Cuerpo de la Tarjeta de Inscripción */}
                <div className="p-6 sm:p-7 space-y-5">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-teal font-extrabold">
                        {price === 0 ? "MATRÍCULA LIBRE" : "INVERSIÓN ÚNICA"}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Inscripciones Abiertas
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-navy font-serif">
                        {priceLabel}
                      </span>
                      {price > 0 && (
                        <span className="text-xs text-ink-soft">pago único</span>
                      )}
                    </div>
                  </div>

                  {/* Botones de Conversión */}
                  <div className="space-y-2.5 pt-1">
                    <a
                      href={`https://wa.me/51939584395?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/25 transition-all hover:scale-[1.02] cursor-pointer group"
                    >
                      <MessageCircle className="w-5 h-5 shrink-0 fill-current" />
                      <span>Inscribirme por WhatsApp</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <Link
                      href="/aula/catalogo"
                      className="w-full py-3 px-5 rounded-2xl bg-navy hover:bg-navyink text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <GraduationCap className="w-4 h-4 text-goldpale" />
                      <span>Ingresar con mi cuenta al Aula</span>
                    </Link>
                  </div>

                  <p className="text-center text-[11px] text-ink-soft leading-tight">
                    ⚡ Respuesta inmediata por WhatsApp de un asesor académico.
                  </p>

                  {/* Beneficios Incluidos */}
                  <div className="pt-4 border-t border-line space-y-2.5">
                    <p className="text-xs font-bold text-navy uppercase tracking-wider font-mono">
                      Este programa incluye:
                    </p>
                    <ul className="space-y-2 text-xs text-ink">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                        <span>Acceso ilimitado 24/7 a las clases grabadas</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                        <span>Diploma oficial con código QR y validación web</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                        <span>Materiales descargables, guías clínicas y lecturas</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                        <span>Docentes especialistas de hospitales de referencia</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                        <span>Válido para concursos públicos y currículum vitae</span>
                      </li>
                    </ul>
                  </div>

                  {/* Ficha Técnica Rápida */}
                  <dl className="pt-4 border-t border-line grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <dt className="text-ink-soft text-[11px]">Modalidad</dt>
                      <dd className="font-bold text-navy mt-0.5">
                        {deliveryModeLabel[course.delivery_mode ?? ""] ?? "Virtual"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink-soft text-[11px]">Carga Horaria</dt>
                      <dd className="font-bold text-navy mt-0.5">
                        {academicHours > 0 ? `${academicHours} horas lectivas` : "Flexible"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink-soft text-[11px]">Certificado</dt>
                      <dd className="font-bold text-navy mt-0.5">
                        {course.certificate_included ? "Incluido" : "Opcional"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink-soft text-[11px]">Duración</dt>
                      <dd className="font-bold text-navy mt-0.5">
                        {durationWeeks > 0 ? `${durationWeeks} semanas` : "A tu propio ritmo"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BARRA DE PESTAÑAS STICKY PARA NAVEGACIÓN SUAVE */}
      <nav
        aria-label="Secciones del programa"
        className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-line shadow-2xs py-2.5"
      >
        <div className="wrap flex items-center gap-2 overflow-x-auto no-scrollbar">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setActiveTab(section.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === section.id
                  ? "bg-navy text-white shadow-xs"
                  : "text-ink-soft hover:text-navy hover:bg-bg-alt"
              }`}
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      {/* 3. CONTENIDO PRINCIPAL: DESCRIPCIÓN, TEMARIO, DOCENTES, CERTIFICADO Y FAQ */}
      <section className="py-12 sm:py-16">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Columna Izquierda de Contenido (8 columnas) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-12">
              {/* SECCIÓN 1: DESCRIPCIÓN */}
              <section id="descripcion" className="scroll-mt-32 space-y-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center font-bold">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-navy">
                      Descripción del Programa
                    </h2>
                    <p className="text-xs text-ink-soft">
                      Fundamentación académica y alcance profesional
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-line shadow-xs space-y-4">
                  <p className="text-sm sm:text-base text-ink-soft leading-relaxed whitespace-pre-line">
                    {course.description ||
                      course.short_description ||
                      "Este programa académico está diseñado para dotar a los profesionales de la salud con herramientas clínicas actualizadas, criterios de decisión fundamentados en evidencia científica y destrezas para la atención integral del paciente."}
                  </p>

                  {course.target_audience && (
                    <div className="pt-4 border-t border-line/70">
                      <h4 className="text-xs font-mono uppercase font-bold text-navy tracking-wider mb-2">
                        Público Objetivo:
                      </h4>
                      <p className="text-xs sm:text-sm text-ink-soft">
                        {course.target_audience}
                      </p>
                    </div>
                  )}
                </div>

                {/* Lo que aprenderás (Tarjetas destacadas) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-2xl bg-white border border-line flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-navy text-xs sm:text-sm">
                        Protocolos Clínicos Estandarizados
                      </h4>
                      <p className="text-[11px] sm:text-xs text-ink-soft mt-0.5 leading-relaxed">
                        Manejo terapéutico y procedimental según guías de práctica clínica internacionales.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-line flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-navy text-xs sm:text-sm">
                        Resolución de Casos Complejos
                      </h4>
                      <p className="text-[11px] sm:text-xs text-ink-soft mt-0.5 leading-relaxed">
                        Análisis crítico de situaciones reales presentadas por docentes asistenciales.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-line flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-navy text-xs sm:text-sm">
                        Seguridad del Paciente y Calidad
                      </h4>
                      <p className="text-[11px] sm:text-xs text-ink-soft mt-0.5 leading-relaxed">
                        Prevención de eventos adversos y aplicación de estándares de bioseguridad.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-line flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-navy text-xs sm:text-sm">
                        Habilidades Prácticas y Criterio
                      </h4>
                      <p className="text-[11px] sm:text-xs text-ink-soft mt-0.5 leading-relaxed">
                        Toma de decisiones oportunas en situaciones de emergencia o cuidados críticos.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECCIÓN 2: PLAN DE ESTUDIOS (SYLLABUS) */}
              <section id="temario" className="scroll-mt-32 space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center font-bold">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-navy">
                        Plan de Estudios
                      </h2>
                      <p className="text-xs text-ink-soft">
                        Estructura curricular módulo a módulo
                      </p>
                    </div>
                  </div>

                  {syllabus?.modules?.length ? (
                    <span className="text-xs font-mono font-bold text-teal bg-tealtint px-3 py-1 rounded-full border border-teal/20">
                      {syllabus.modules.length} Módulos Académicos
                    </span>
                  ) : null}
                </div>

                {syllabus && syllabus.modules?.length > 0 ? (
                  <div className="space-y-3">
                    {syllabus.modules.map((mod, idx) => {
                      const isOpen = Boolean(openModules[idx]);
                      const lessonsCount = mod.lessons?.length || 0;

                      return (
                        <div
                          key={mod.module_id || idx}
                          className="rounded-2xl border border-line bg-white shadow-2xs overflow-hidden transition-all"
                        >
                          {/* Cabecera del Módulo (Acordeón) */}
                          <button
                            onClick={() => toggleModule(idx)}
                            className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-bg-alt/40 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="w-8 h-8 rounded-xl bg-navy text-gold font-mono font-bold text-xs flex items-center justify-center shrink-0">
                                {mod.module_number || idx + 1}
                              </span>
                              <div className="min-w-0">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-teal font-bold block">
                                  Módulo {mod.module_number || idx + 1}
                                </span>
                                <h3 className="text-sm sm:text-base font-bold text-navy truncate">
                                  {mod.title}
                                </h3>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs font-mono text-ink-soft bg-bg-alt px-2.5 py-1 rounded-lg border border-line hidden sm:inline-block">
                                {lessonsCount} {lessonsCount === 1 ? "sesión" : "sesiones"}
                              </span>
                              {isOpen ? (
                                <ChevronUp className="w-4 h-4 text-navy" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-ink-soft" />
                              )}
                            </div>
                          </button>

                          {/* Contenido Desplegable de Lecciones */}
                          {isOpen && (
                            <div className="px-5 pb-5 pt-1 border-t border-line/60 bg-bg-alt/20 space-y-2">
                              {mod.description && (
                                <p className="text-xs text-ink-soft py-2 italic">
                                  {mod.description}
                                </p>
                              )}

                              {lessonsCount > 0 ? (
                                <div className="space-y-2 pt-1">
                                  {mod.lessons.map((lesson) => (
                                    <div
                                      key={lesson.lesson_id}
                                      className="p-3.5 rounded-xl bg-white border border-line flex items-start justify-between gap-3 text-xs"
                                    >
                                      <div className="flex items-start gap-2.5 min-w-0">
                                        <div className="w-6 h-6 rounded-lg bg-teal/10 text-teal flex items-center justify-center shrink-0 mt-0.5">
                                          {lesson.lesson_type === "practice" ? (
                                            <Stethoscope className="w-3.5 h-3.5" />
                                          ) : (
                                            <Video className="w-3.5 h-3.5" />
                                          )}
                                        </div>
                                        <div className="min-w-0">
                                          <p className="font-bold text-navy text-xs sm:text-[13px]">
                                            {lesson.title}
                                          </p>
                                          {lesson.summary && (
                                            <p className="text-[11px] text-ink-soft mt-0.5 line-clamp-2">
                                              {lesson.summary}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <span className="font-mono text-[11px] text-ink-soft font-semibold shrink-0 bg-bg-alt px-2 py-0.5 rounded">
                                        {lesson.academic_hours ?? 3} hrs
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-xs text-ink-soft py-2">
                                  Contenidos y lecturas especializadas asignadas para este módulo.
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Vista alternativa elegante cuando el temario es modular básico */
                  <div className="p-6 rounded-3xl bg-white border border-line space-y-4">
                    <p className="text-xs sm:text-sm text-ink-soft">
                      La malla curricular de este programa comprende sesiones teórico-prácticas desarrolladas por especialistas en el área:
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="p-3.5 rounded-xl bg-bg-alt/70 border border-line flex items-center gap-3">
                        <Check className="w-4 h-4 text-teal shrink-0" />
                        <span className="text-xs font-semibold text-navy">
                          Bases Fisiopatológicas y Diagnóstico Clínico
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-bg-alt/70 border border-line flex items-center gap-3">
                        <Check className="w-4 h-4 text-teal shrink-0" />
                        <span className="text-xs font-semibold text-navy">
                          Farmacoterapia y Monitorización Continua
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-bg-alt/70 border border-line flex items-center gap-3">
                        <Check className="w-4 h-4 text-teal shrink-0" />
                        <span className="text-xs font-semibold text-navy">
                          Técnicas de Procedimiento y Bioseguridad
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-bg-alt/70 border border-line flex items-center gap-3">
                        <Check className="w-4 h-4 text-teal shrink-0" />
                        <span className="text-xs font-semibold text-navy">
                          Evaluación Práctica y Casos Clínicos
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* SECCIÓN 3: PLANA DOCENTE */}
              <section id="docentes" className="scroll-mt-32 space-y-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center font-bold">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-navy">
                      Plana Docente & Especialistas
                    </h2>
                    <p className="text-xs text-ink-soft">
                      Profesionales con amplia trayectoria asistencial y académica
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {teachers.length ? (
                    teachers.map((person) => (
                      <div
                        key={`${person.name}-${person.last_name}`}
                        className="p-5 rounded-3xl bg-white border border-line hover:border-teal/40 hover:shadow-xs transition-all flex items-center gap-4"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-navy text-gold font-bold text-lg flex items-center justify-center shrink-0 border-2 border-gold/40 shadow-xs overflow-hidden">
                          {person.profile_photo_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={person.profile_photo_url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            `${person.name[0] ?? ""}${person.last_name[0] ?? ""}`
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-navy text-sm sm:text-base font-bold truncate">
                            {person.name} {person.last_name}
                          </h3>
                          <span className="text-xs font-semibold text-teal block truncate mt-0.5">
                            {person.specialty || "Especialista en Salud"}
                          </span>
                          <span className="text-[11px] text-ink-soft block truncate mt-0.5">
                            {person.profession || "Docente Clínico FormaSalud"}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full p-6 rounded-2xl bg-white border border-line flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-navy text-gold flex items-center justify-center font-bold text-sm shrink-0">
                        FS
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-navy">
                          Plana Docente Especializada
                        </h4>
                        <p className="text-xs text-ink-soft mt-0.5">
                          Dictado a cargo de médicos especialistas y licenciados en enfermería de las principales instituciones de salud del país.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* SECCIÓN 4: CERTIFICACIÓN OFICIAL CON QR */}
              <section id="certificacion" className="scroll-mt-32 space-y-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center font-bold">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-navy">
                      Certificación Oficial y Validación
                    </h2>
                    <p className="text-xs text-ink-soft">
                      Diploma verificable con código QR y registro único
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-tealtint/30 to-white border border-teal/20 shadow-xs space-y-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-xl">
                      <span className="px-2.5 py-0.5 rounded-md bg-gold/20 text-golddeep font-mono text-[10px] font-bold uppercase border border-gold/30">
                        VALIDEZ CURRICULAR NACIONAL
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-navy">
                        Diploma con Registro Único FormaSalud
                      </h3>
                      <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                        Al culminar y aprobar el programa, obtendrás tu diploma oficial emitido por **Grupo Paucar Perú S.A.C. (RUC 20613837613)** con respaldo institucional, horas académicas y código QR verificable en línea.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-line shadow-xs text-center shrink-0 w-full md:w-auto">
                      <div className="w-16 h-16 rounded-xl bg-gold/15 text-gold flex items-center justify-center mx-auto mb-2">
                        <Award className="w-9 h-9" />
                      </div>
                      <span className="font-mono text-xs font-bold text-navy block">
                        CÓDIGO ÚNICO QR
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                        Verificación 24/7
                      </span>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-line/80 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-ink-soft">
                      <ShieldCheck className="w-4 h-4 text-teal" />
                      <span>{certificateLabel}</span>
                    </div>
                    <Link
                      href="/verificar"
                      className="text-xs font-bold text-teal hover:text-tealdeep flex items-center gap-1.5 underline"
                    >
                      <span>Comprobar sistema de verificación pública</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </section>

              {/* SECCIÓN 5: PREGUNTAS FRECUENTES (FAQ) */}
              <section id="faq" className="scroll-mt-32 space-y-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center font-bold">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-navy">
                      Preguntas Frecuentes
                    </h2>
                    <p className="text-xs text-ink-soft">
                      Respuestas claras sobre la matrícula y desarrollo del curso
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-5 rounded-2xl bg-white border border-line shadow-2xs space-y-1.5">
                    <h4 className="font-bold text-navy text-sm">
                      ¿Cómo accedo al aula virtual después de matricularme?
                    </h4>
                    <p className="text-xs text-ink-soft leading-relaxed">
                      Una vez confirmada tu inscripción vía WhatsApp o en la plataforma, tu usuario queda habilitado inmediatamente con tu correo y contraseña para acceder las 24 horas del día.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-line shadow-2xs space-y-1.5">
                    <h4 className="font-bold text-navy text-sm">
                      ¿El certificado tiene valor para concursos públicos o SERUMS?
                    </h4>
                    <p className="text-xs text-ink-soft leading-relaxed">
                      Sí, nuestros diplomas cuentan con carga horaria oficial en horas académicas y créditos, firma de directores académicos y código QR que valida su autenticidad ante comités evaluadores.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-line shadow-2xs space-y-1.5">
                    <h4 className="font-bold text-navy text-sm">
                      ¿Puedo ver las clases grabadas si no me conecté en vivo?
                    </h4>
                    <p className="text-xs text-ink-soft leading-relaxed">
                      Absolutamente. Todas las sesiones quedan grabadas en alta definición y alojadas en el aula virtual para que estudies a tu propio ritmo desde cualquier dispositivo.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BANNER FINAL DE ATENCIÓN DIRECTA */}
      <section className="bg-gradient-to-r from-navy to-tealdeep py-12 text-white border-t border-line/10">
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-white">
              ¿Tienes dudas sobre este programa?
            </h3>
            <p className="text-xs sm:text-sm text-white/80">
              Escríbenos directamente y un asesor académico responderá tus consultas en tiempo real.
            </p>
          </div>

          <a
            href={`https://wa.me/51939584395?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-gold text-navy font-bold text-xs sm:text-sm hover:bg-goldpale transition-all flex items-center gap-2 shadow-lg shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
