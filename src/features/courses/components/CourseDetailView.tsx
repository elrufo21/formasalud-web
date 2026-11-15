"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  MessageCircle,
  Stethoscope,
  UserCheck,
  GraduationCap,
  ShieldCheck,
  HelpCircle,
  Layers,
  Video,
  Check,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Calendar,
  Wrench,
  ClipboardCheck,
  AlertCircle,
  Sparkles,
  X,
  Eye,
} from "lucide-react";
import {
  api,
  CourseSyllabus,
  getPublicAssetUrl,
  type PublicCourse,
} from "@/lib/api";

const SECTIONS = [
  { id: "descripcion", label: "Descripción y Ficha" },
  { id: "temario", label: "Plan de Estudios y Talleres" },
  { id: "evaluacion", label: "Evaluación y Requisitos" },
  { id: "docentes", label: "Plana Docente" },
  { id: "certificacion", label: "Certificación Oficial" },
  { id: "faq", label: "Preguntas Frecuentes" },
];

const deliveryModeLabel: Record<string, string> = {
  in_person: "Presencial + Práctica Guiada",
  virtual_sync: "Virtual Sincrónico (En vivo)",
  virtual_async: "Virtual Asincrónico (Aula 24/7)",
  hybrid: "Presencial + Práctica Guiada",
};

const programTypeBadge: Record<string, string> = {
  course: "CURSO TEÓRICO-PRÁCTICO CERTIFICADO",
  workshop: "TALLER PRÁCTICO CLÍNICO",
  diploma: "DIPLOMADO DE ESPECIALIZACIÓN",
  specialization: "PROGRAMA DE POSGRADO",
  webinar: "CONFERENCIA MAGISTRAL",
};

const PRIMEROS_AUXILIOS_SYLLABUS: CourseSyllabus = {
  version_id: 10,
  course_id: 13,
  version_code: "v1.0",
  title: "Primeros Auxilios y Respuesta Rápida ante Emergencias Comunes",
  status: "published",
  total_academic_hours: 50,
  synchronous_hours: 36,
  complementary_hours: 14,
  theory_hours: 19,
  practice_hours: 31,
  duration_weeks: 12,
  recommended_frequency: "1 sesión semanal, los días sábados (3 horas académicas por sesión)",
  min_passing_grade: 14,
  min_attendance_percent: 80,
  requires_all_practices_made_up: true,
  makeup_counts_as_attendance: true,
  requires_complementary_hours: true,
  requires_critical_competencies: true,
  modules: [
    {
      module_id: 1,
      module_number: 1,
      title: "MÓDULO I: Fundamentos de Primeros Auxilios y Atención Inicial",
      description:
        "Evaluación de la escena, monitoreo de signos vitales y manejo inicial de lesiones, hemorragias, quemaduras e inmovilizaciones. Incluye Primera Evaluación Escrita del Módulo I (clases 1 a 4).",
      sort_order: 1,
      lessons: [
        {
          lesson_id: 1,
          module_id: 1,
          lesson_number: 1,
          week_number: 1,
          month_number: 1,
          title: "Clase 1: Evaluación inicial y reconocimiento de signos vitales (Teórico)",
          lesson_type: "theory",
          academic_hours: 3,
          is_mandatory_practice: false,
          sort_order: 1,
          syllabus_topics: [
            "Evaluación de la escena y seguridad del rescatista.",
            "Activación del sistema de emergencias (qué informar, cómo y a quién llamar).",
            "Reconocimiento y parámetros de los signos vitales esenciales (pulso, respiración, presión arterial, temperatura, saturación y glucosa) en adultos, niños y lactantes.",
          ],
        },
        {
          lesson_id: 2,
          module_id: 1,
          lesson_number: 2,
          week_number: 2,
          month_number: 1,
          title: "Clase 2: Control y monitoreo de signos vitales (Práctica)",
          lesson_type: "practice",
          academic_hours: 3,
          is_mandatory_practice: true,
          sort_order: 2,
          syllabus_topics: [
            "Toma de pulso, frecuencia respiratoria, saturación de oxígeno.",
            "Toma de presión arterial y control de temperatura.",
            "Toma de glucosa capilar y reconocimiento de alteraciones (hipoglucemia e hiperglucemia).",
          ],
        },
        {
          lesson_id: 3,
          module_id: 1,
          lesson_number: 3,
          week_number: 3,
          month_number: 1,
          title: "Clase 3: Manejo inicial de lesiones y accidentes frecuentes (Teórica)",
          lesson_type: "theory",
          academic_hours: 3,
          is_mandatory_practice: false,
          sort_order: 3,
          syllabus_topics: [
            "Atención de caídas y traumatismos.",
            "Manejo de cortes y hemorragias.",
            "Atención inicial de quemaduras.",
            "Lesiones por accidentes domésticos.",
          ],
        },
        {
          lesson_id: 4,
          module_id: 1,
          lesson_number: 4,
          week_number: 4,
          month_number: 1,
          title: "Clase 4: Control de hemorragias, quemaduras e inmovilización (Práctica)",
          lesson_type: "practice",
          academic_hours: 3,
          is_mandatory_practice: true,
          sort_order: 4,
          syllabus_topics: [
            "Técnicas de vendaje y control de sangrado.",
            "Inmovilización inicial de extremidades.",
            "Manejo práctico de quemaduras.",
            "Uso práctico del botiquín de primeros auxilios.",
            "Evaluación: Primera evaluación escrita del Módulo I (clases 1 a 4).",
          ],
        },
      ],
    },
    {
      module_id: 2,
      module_number: 2,
      title: "MÓDULO II: Procedimientos de Atención Inmediata y Respuesta ante Emergencias",
      description:
        "Fundamentos y práctica de bioseguridad, administración de inyectables de urgencia, control inicial de incendios, uso de extintores y evacuación. Incluye Segunda Evaluación Escrita (clases 5 a 8).",
      sort_order: 2,
      lessons: [
        {
          lesson_id: 5,
          module_id: 2,
          lesson_number: 5,
          week_number: 5,
          month_number: 2,
          title: "Clase 5: Fundamentos de administración de inyectables y bioseguridad (Teórico)",
          lesson_type: "theory",
          academic_hours: 3,
          is_mandatory_practice: false,
          sort_order: 5,
          syllabus_topics: [
            "Principios de bioseguridad y manejo de materiales punzocortantes.",
            "Tipos de medicamentos de urgencia y vías de administración.",
            "Técnica y zonas de aplicación subcutánea en pacientes diabéticos.",
            "Técnica y zonas de aplicación intramuscular en situaciones frecuentes.",
            "Complicaciones y medidas de seguridad durante la administración de inyectables.",
          ],
        },
        {
          lesson_id: 6,
          module_id: 2,
          lesson_number: 6,
          week_number: 6,
          month_number: 2,
          title: "Clase 6: Aplicación práctica de inyectables en urgencias (Práctica)",
          lesson_type: "practice",
          academic_hours: 3,
          is_mandatory_practice: true,
          sort_order: 6,
          syllabus_topics: [
            "Preparación de materiales y bioseguridad.",
            "Manejo inicial ante reacciones adversas inmediatas.",
            "Simulación práctica de preparación y aplicación de medicamentos.",
            "Técnica práctica de administración subcutánea.",
            "Técnica práctica de administración intramuscular.",
          ],
        },
        {
          lesson_id: 7,
          module_id: 2,
          lesson_number: 7,
          week_number: 7,
          month_number: 2,
          title: "Clase 7: Control inicial de incendios y seguridad en emergencias (Teórico)",
          lesson_type: "theory",
          academic_hours: 3,
          is_mandatory_practice: false,
          sort_order: 7,
          syllabus_topics: [
            "Tipos de fuego y riesgos asociados.",
            "Clasificación y uso de extintores.",
            "Prevención de incendios en hogar y trabajo.",
            "Protocolos de evacuación y zonas seguras.",
            "Organización de respuesta ante emergencias comunes.",
          ],
        },
        {
          lesson_id: 8,
          module_id: 2,
          lesson_number: 8,
          week_number: 8,
          month_number: 2,
          title: "Clase 8: Manejo de extintores, evacuación y respuesta organizada (Práctico)",
          lesson_type: "practice",
          academic_hours: 3,
          is_mandatory_practice: true,
          sort_order: 8,
          syllabus_topics: [
            "Uso práctico de extintores.",
            "Simulación de control de incendio inicial.",
            "Evaluación práctica de la escena y del paciente.",
            "Identificación de alteraciones del estado de conciencia y posición lateral de seguridad.",
            "Técnicas operativas de evacuación.",
            "Evaluación: Segunda evaluación escrita (clases 5 a 8).",
          ],
        },
      ],
    },
    {
      module_id: 3,
      module_number: 3,
      title: "MÓDULO III: Respuesta ante Emergencias Críticas y Soporte Inicial",
      description:
        "Emergencias cardiovasculares y neurológicas, RCP de calidad, uso del DEA, maniobra de Heimlich, simulacro integrador y evaluación final por estaciones.",
      sort_order: 3,
      lessons: [
        {
          lesson_id: 9,
          module_id: 3,
          lesson_number: 9,
          week_number: 9,
          month_number: 3,
          title: "Clase 9: Identificación de emergencias cardiovasculares y neurológicas (Teórico)",
          lesson_type: "theory",
          academic_hours: 3,
          is_mandatory_practice: false,
          sort_order: 9,
          syllabus_topics: [
            "Identificación del paro cardiorrespiratorio.",
            "Signos de infarto y accidente cerebrovascular.",
            "Manejo inicial de desmayos y convulsiones.",
            "Identificación de asfixia (parcial vs. total).",
            "Activación oportuna del sistema de emergencias.",
          ],
        },
        {
          lesson_id: 10,
          module_id: 3,
          lesson_number: 10,
          week_number: 10,
          month_number: 3,
          title: "Clase 10: Reanimación cardiopulmonar (RCP) para respuesta inmediata (Práctico)",
          lesson_type: "practice",
          academic_hours: 3,
          is_mandatory_practice: true,
          sort_order: 10,
          syllabus_topics: [
            "Ejecución de RCP en situaciones de emergencia.",
            "Coordinación correcta de compresiones torácicas.",
            "Manejo del DEA en pacientes adultos, pediátricos y lactantes.",
            "Simulación práctica de paro cardiorrespiratorio.",
            "Maniobra de Heimlich en adultos, niños, lactantes, embarazadas, personas con obesidad y Auto-Heimlich.",
            "Evaluación: Tercera evaluación escrita (clases 9 y 10).",
          ],
        },
        {
          lesson_id: 11,
          module_id: 3,
          lesson_number: 11,
          week_number: 11,
          month_number: 3,
          title: "Clase 11: Simulacro integrador de emergencias",
          lesson_type: "simulation",
          academic_hours: 3,
          is_mandatory_practice: true,
          sort_order: 11,
          syllabus_topics: [
            "Escenarios combinados (accidente doméstico, atragantamiento, paro cardiorrespiratorio, incendio con heridos).",
            "Trabajo en equipo, roles y comunicación en la escena.",
            "Repaso de puntos críticos y retroalimentación individual.",
          ],
        },
        {
          lesson_id: 12,
          module_id: 3,
          lesson_number: 12,
          week_number: 12,
          month_number: 3,
          title: "Clase 12: Evaluación final y certificación",
          lesson_type: "final_evaluation",
          academic_hours: 3,
          is_mandatory_practice: true,
          sort_order: 12,
          syllabus_topics: [
            "Evaluación práctica final por estaciones (signos vitales, hemorragias e inmovilización, inyectables, extintor, RCP/DEA y Heimlich).",
            "Evaluación escrita final.",
            "Retroalimentación, encuesta de satisfacción y ceremonia de entrega de certificados.",
          ],
        },
      ],
    },
  ],
  assessments: [],
};

const PRIMEROS_AUXILIOS_GRADUATE_PROFILE = [
  "Evaluar la escena, protegerse y activar el sistema de emergencias.",
  "Medir e interpretar signos vitales y glucosa capilar básica.",
  "Atender caídas, traumatismos, heridas, hemorragias, quemaduras e inmovilizaciones iniciales.",
  "Aplicar normas de bioseguridad y conocer las técnicas de inyección subcutánea e intramuscular en entorno simulado y de acuerdo con la normativa vigente.",
  "Actuar ante un conato de incendio y organizar una evacuación.",
  "Reconocer y responder ante paro cardiorrespiratorio, infarto, ACV, convulsiones, desmayos y atragantamiento.",
  "Realizar RCP de calidad y usar el DEA en adultos, niños y lactantes.",
];

const PRIMEROS_AUXILIOS_METHODOLOGY = [
  "Clases expositivas breves con apoyo audiovisual.",
  "Demostración del instructor, práctica guiada y práctica supervisada.",
  "Simulación con maniquíes, brazos de práctica, DEA de entrenamiento y extintores de práctica.",
  "Estudio de casos y simulacros de escenarios reales.",
  "Listas de cotejo (checklists) para evaluar cada habilidad práctica.",
];

const PRIMEROS_AUXILIOS_MATERIALS = [
  "Maniquíes de RCP para adulto, niño y lactante.",
  "DEA (Desfibrilador Externo Automático) de entrenamiento.",
  "Brazos de práctica para inyecciones, jeringas de práctica y contenedor de punzocortantes.",
  "Tensiómetros, estetoscopios, termómetros, pulsioxímetros y glucómetros con tiras.",
  "Vendas, gasas, férulas, botiquín completo y material de bioseguridad (guantes, mascarillas).",
  "Extintores de práctica y señalética de evacuación.",
  "Manual del participante y presentaciones.",
];

const PRIMEROS_AUXILIOS_WORKSHOPS = [
  {
    module: "MÓDULO I: Fundamentos de Primeros Auxilios y Atención Inicial",
    evalNote: "Evaluación: Primera evaluación escrita del Módulo I (Taller 1 y 2).",
    workshops: [
      {
        title: "Taller 1: Control y monitoreo de signos vitales",
        items: [
          "Toma de pulso, frecuencia respiratoria, saturación de oxígeno.",
          "Toma de presión arterial y control de temperatura.",
          "Toma de glucosa capilar y reconocimiento de alteraciones (hipoglucemia e hiperglucemia).",
        ],
      },
      {
        title: "Taller 2: Control de hemorragias, quemaduras e inmovilización",
        items: [
          "Técnicas de vendaje y control de sangrado.",
          "Inmovilización inicial de extremidades.",
          "Manejo práctico de quemaduras.",
          "Uso práctico del botiquín de primeros auxilios.",
        ],
      },
    ],
  },
  {
    module: "MÓDULO II: Procedimientos de Atención Inmediata y Respuesta ante Emergencias",
    evalNote: "Evaluación: Segunda evaluación escrita (Taller 3 y 4).",
    workshops: [
      {
        title: "Taller 3: Aplicación práctica de inyectables en urgencias",
        items: [
          "Preparación de materiales y bioseguridad.",
          "Manejo inicial ante reacciones adversas inmediatas.",
          "Simulación práctica de preparación y aplicación de medicamentos.",
          "Técnica práctica de administración subcutánea.",
          "Técnica práctica de administración intramuscular.",
        ],
      },
      {
        title: "Taller 4: Manejo de extintores, evacuación y respuesta organizada",
        items: [
          "Uso práctico de extintores.",
          "Simulación de control de incendio inicial.",
          "Evaluación práctica de la escena y del paciente.",
          "Identificación de alteraciones del estado de conciencia y posición lateral de seguridad.",
          "Técnicas operativas de evacuación.",
        ],
      },
    ],
  },
  {
    module: "MÓDULO III: Respuesta ante Emergencias Críticas y Soporte Inicial",
    evalNote:
      "Evaluación final y certificación: Evaluación práctica final por estaciones (signos vitales, hemorragias e inmovilización, inyectables, extintor, RCP/DEA y Heimlich), evaluación escrita final y ceremonia de entrega de certificados.",
    workshops: [
      {
        title: "Taller 5: Reanimación cardiopulmonar (RCP) para respuesta inmediata (Práctico)",
        items: [
          "Ejecución de RCP en situaciones de emergencia.",
          "Coordinación correcta de compresiones torácicas.",
          "Manejo del DEA en pacientes adultos, pediátricos y lactantes.",
          "Simulación práctica de paro cardiorrespiratorio.",
          "Maniobra de Heimlich en adultos, niños, lactantes, embarazadas, personas con obesidad y Auto-Heimlich.",
        ],
      },
    ],
  },
];

const PRIMEROS_AUXILIOS_CALENDAR = [
  { mes: 1, semana: 1, clase: "Clase 1", tipo: "Teórico", modulo: "I" },
  { mes: 1, semana: 2, clase: "Clase 2", tipo: "Práctica", modulo: "I" },
  { mes: 1, semana: 3, clase: "Clase 3", tipo: "Teórico", modulo: "I" },
  { mes: 1, semana: 4, clase: "Clase 4", tipo: "Práctica", modulo: "I" },
  { mes: 2, semana: 5, clase: "Clase 5", tipo: "Teórico", modulo: "II" },
  { mes: 2, semana: 6, clase: "Clase 6", tipo: "Práctica", modulo: "II" },
  { mes: 2, semana: 7, clase: "Clase 7", tipo: "Teórico", modulo: "II" },
  { mes: 2, semana: 8, clase: "Clase 8", tipo: "Práctica", modulo: "II" },
  { mes: 3, semana: 9, clase: "Clase 9", tipo: "Teórico", modulo: "III" },
  { mes: 3, semana: 10, clase: "Clase 10", tipo: "Práctica", modulo: "III" },
  { mes: 3, semana: 11, clase: "Clase 11", tipo: "Simulacro integrador", modulo: "III" },
  { mes: 3, semana: 12, clase: "Clase 12", tipo: "Evaluación final y certificación", modulo: "III" },
];

const PRIMEROS_AUXILIOS_EVALUATION = [
  { componente: "Evaluaciones prácticas (clases 2, 4, 6, 8, 10)", ponderacion: "35 %" },
  { componente: "Evaluaciones escritas de módulo (3)", ponderacion: "25 %" },
  { componente: "Simulacro integrador (clase 11)", ponderacion: "10 %" },
  { componente: "Evaluación final práctica y escrita (clase 12)", ponderacion: "25 %" },
  { componente: "Participación y actitud", ponderacion: "5 %" },
];

export function CourseDetailView({ course }: { course: PublicCourse }) {
  const isPrimerosAuxilios =
    Number(course.course_id) === 13 ||
    course.slug?.includes("primeros-auxilios-y-respuesta-rapida");

  const [imageError, setImageError] = useState(false);
  const [syllabus, setSyllabus] = useState<CourseSyllabus | null>(
    isPrimerosAuxilios ? PRIMEROS_AUXILIOS_SYLLABUS : null,
  );
  const [openModules, setOpenModules] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });
  const [activeTab, setActiveTab] = useState("descripcion");
  const [showFlyerLightbox, setShowFlyerLightbox] = useState(false);

  const imageUrl = getPublicAssetUrl(course.thumbnail_url);
  const teachers = course.teachers ?? [];
  const teacherNames = teachers
    .map((person) => `${person.name} ${person.last_name}`.trim())
    .join(", ");

  const price = Number(course.price ?? 0);
  const priceLabel = isPrimerosAuxilios
    ? "Inscripciones Abiertas"
    : price === 0
      ? "Acceso Libre"
      : `S/ ${price.toFixed(2)}`;
  const academicHours = Number(course.total_academic_hours || (isPrimerosAuxilios ? 50 : 0));
  const durationWeeks = Number(course.duration_weeks || (isPrimerosAuxilios ? 12 : 0));

  const certificateLabel = course.certificate_included
    ? isPrimerosAuxilios
      ? "Certificado Oficial (50 hrs académicas)"
      : "Incluido con el curso"
    : course.certificate_price != null
      ? `Opcional · S/ ${Number(course.certificate_price).toFixed(2)}`
      : "Consultar condiciones";

  const whatsappMessage = encodeURIComponent(
    isPrimerosAuxilios
      ? `Hola FORMASALUD, deseo informes e inscripción para el "${course.title}" (Inicio: 15 de enero de 2027 · Clases todos los sábados).`
      : `Hola FORMASALUD, deseo recibir el temario oficial e información de matrícula para: "${course.title}".`,
  );

  const programBadge =
    programTypeBadge[course.program_type ?? "course"] ||
    "PROGRAMA DE ESPECIALIZACIÓN PROFESIONAL";

  useEffect(() => {
    api
      .getCourseSyllabus(course.course_id)
      .then((data) => {
        if (data && data.modules?.length) {
          setSyllabus(data);
          const initialOpen: Record<number, boolean> = {};
          data.modules.forEach((_, idx) => {
            initialOpen[idx] = true;
          });
          setOpenModules(initialOpen);
        }
      })
      .catch(() => {
        if (!isPrimerosAuxilios) setSyllabus(null);
      });
  }, [course.course_id, isPrimerosAuxilios]);

  const toggleModule = (idx: number) => {
    setOpenModules((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <main className="flex-1 bg-bg-alt">
      {/* 1. HERO SUPERIOR COMPACTO CON BRANDING FORMASALUD */}
      <section className="relative bg-gradient-to-b from-navyink via-navy to-navy text-white pt-6 sm:pt-8 pb-10 sm:pb-12 border-b border-line/10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-teal/20 blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-gold/15 blur-3xl" />
        </div>

        <div className="wrap relative z-10">
          {/* Breadcrumbs en Hero */}
          <nav aria-label="Ruta de navegación" className="mb-4 text-xs text-white/70">
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

          {/* Contenido del Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              {/* Badges de Categoría */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-gold/20 text-gold border border-gold/40 text-[11px] font-mono font-bold uppercase tracking-wider shadow-2xs">
                  {programBadge}
                </span>
                <span className="px-3 py-1 rounded-full bg-teal/30 text-teal-100 border border-teal/40 text-[11px] font-mono font-semibold">
                  {isPrimerosAuxilios
                    ? "Presencial + Práctica Guiada"
                    : deliveryModeLabel[course.delivery_mode ?? ""] ?? "Modalidad Virtual"}
                </span>
                {academicHours > 0 && (
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-[11px] font-mono font-medium border border-white/15">
                    {academicHours} Horas Académicas
                  </span>
                )}
                {isPrimerosAuxilios && (
                  <span className="px-3 py-1 rounded-full bg-red-500/25 text-goldpale border border-red-400/40 text-[11px] font-mono font-bold">
                    Inicio: 15 de Enero de 2027
                  </span>
                )}
              </div>

              {/* Título Principal */}
              <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-white leading-[1.18] tracking-tight font-serif">
                {course.title}
              </h1>

              {/* Resumen conciso */}
              <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-3xl">
                {course.description ||
                  course.short_description ||
                  "Actualización profesional intensiva basada en evidencia científica y protocolos hospitalarios vigentes, diseñada para elevar las competencias en el cuidado y gestión clínica."}
              </p>

              {/* Plana Docente Resumida en el Hero */}
              <div className="pt-1 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal text-white flex items-center justify-center font-bold text-xs shrink-0 border-2 border-gold/50 shadow-sm">
                    {teachers[0] ? teachers[0].name.charAt(0) : "FS"}
                  </div>
                  <div>
                    <span className="text-[10px] text-white/60 uppercase font-semibold tracking-wider block">
                      Dirección y Plana Docente:
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white block">
                      {teacherNames ||
                        (isPrimerosAuxilios
                          ? "Profesionales en Emergencias, UCI y Soporte Vital Básico (BLS)"
                          : "Cuerpo Docente Especialista FormaSalud")}
                    </span>
                  </div>
                </div>

                {isPrimerosAuxilios && (
                  <button
                    type="button"
                    onClick={() => setShowFlyerLightbox(true)}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-gold/40 text-xs font-bold text-goldpale transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-gold" />
                    <span>Ver Flyer Oficial</span>
                  </button>
                )}
              </div>

              {/* Pastillas de Métricas / Confianza */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <span className="text-[10px] sm:text-[11px] text-white/60 flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />{" "}
                    {isPrimerosAuxilios ? "Inicio de Clases" : "Certificación"}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-0.5 truncate">
                    {isPrimerosAuxilios ? "15 Ene 2027 (Sáb)" : "Oficial con QR"}
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <span className="text-[10px] sm:text-[11px] text-white/60 flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-gold shrink-0" />{" "}
                    {isPrimerosAuxilios ? "Duración" : "Disponibilidad"}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-0.5 truncate">
                    {isPrimerosAuxilios ? "3 Meses (12 Sem)" : "Acceso 24/7 Ilimitado"}
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <span className="text-[10px] sm:text-[11px] text-white/60 flex items-center gap-1.5 font-medium">
                    <GraduationCap className="w-3.5 h-3.5 text-gold shrink-0" />{" "}
                    {isPrimerosAuxilios ? "Dirigido a" : "Nivel Académico"}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-0.5 truncate">
                    {course.target_audience || "Especialización"}
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <span className="text-[10px] sm:text-[11px] text-white/60 flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" /> Certificación
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-0.5 truncate">
                    {academicHours > 0 ? `${academicHours} Hrs · Con QR` : "Oficial con QR"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTENIDO PRINCIPAL EN TABS INTERACTIVOS + TARJETA DE COMPRA LATERAL COMPLETA */}
      <section className="py-8 sm:py-10">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Columna Izquierda: Barra de Pestañas + Contenido (8 columnas) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6 order-2 lg:order-1">
              {/* Barra de Pestañas Interactiva */}
              <div
                role="tablist"
                aria-label="Secciones del programa"
                className="bg-white p-1.5 rounded-2xl border border-line shadow-2xs flex items-center gap-1.5 overflow-x-auto no-scrollbar"
              >
                {SECTIONS.map((section) => {
                  const isActive = activeTab === section.id;
                  return (
                    <button
                      key={section.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(section.id)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex-1 text-center ${
                        isActive
                          ? "bg-navy text-white shadow-xs"
                          : "text-ink-soft hover:text-navy hover:bg-bg-alt"
                      }`}
                    >
                      {section.label}
                    </button>
                  );
                })}
              </div>

              {/* TAB 1: DESCRIPCIÓN Y FICHA GENERAL */}
              {activeTab === "descripcion" && (
                <section id="descripcion" className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center font-bold">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy">
                          Datos Generales y Fundamentación
                        </h2>
                        <p className="text-xs text-ink-soft">
                          Ficha oficial del programa, perfil de egreso, metodología y recursos
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab("temario")}
                      className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-teal hover:text-tealdeep cursor-pointer"
                    >
                      <span>Ver Plan de Estudios</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 1. Tabla de Datos Generales (para Primeros Auxilios o cursos con metadatos) */}
                  {isPrimerosAuxilios && (
                    <div className="rounded-3xl bg-white border border-line shadow-xs overflow-hidden">
                      <div className="px-5 py-4 bg-navy text-white flex items-center justify-between">
                        <h3 className="text-sm sm:text-base font-bold font-serif">
                          1. Datos Generales del Curso
                        </h3>
                        <span className="text-[11px] font-mono text-goldpale bg-white/10 px-2.5 py-0.5 rounded-full">
                          Inicio: 15 de Enero 2027
                        </span>
                      </div>
                      <div className="divide-y divide-line text-xs sm:text-sm">
                        {[
                          [
                            "Nombre del curso",
                            "Primeros Auxilios y Respuesta Rápida ante Emergencias Comunes",
                          ],
                          ["Dirigido a", "Público en general"],
                          ["Inicio de clases", "15 de enero de 2027"],
                          ["Duración", "3 meses (12 semanas)"],
                          ["Frecuencia", "1 sesión semanal, los días sábados"],
                          ["Carga por sesión", "3 horas académicas"],
                          ["Total de horas", "50 horas académicas (36 h presenciales y 14 h teóricas/complementarias)"],
                          [
                            "Modalidad",
                            "Presencial más trabajo complementario guiado; 19 h de teoría (38 %) y 31 h de práctica (62 %)",
                          ],
                          [
                            "Certificación",
                            "Certificado de aprobación a nombre de FormaSalud (50 horas académicas) con código de verificación",
                          ],
                        ].map(([aspecto, detalle]) => (
                          <div
                            key={aspecto}
                            className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 px-5 py-3 hover:bg-bg-alt/40 transition-colors"
                          >
                            <div className="sm:col-span-4 font-bold text-navy">{aspecto}</div>
                            <div className="sm:col-span-8 text-ink-soft">{detalle}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. Fundamentación */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-white border border-line shadow-xs space-y-4">
                    <h3 className="text-base sm:text-lg font-serif font-bold text-navy">
                      {isPrimerosAuxilios ? "2. Fundamentación" : "Resumen del Programa"}
                    </h3>
                    <p className="text-sm sm:text-base text-ink-soft leading-relaxed whitespace-pre-line">
                      {course.description ||
                        course.short_description ||
                        "Este programa académico está diseñado para dotar a los participantes con herramientas clínicas actualizadas, criterios de decisión fundamentados en evidencia científica y destrezas para la atención integral."}
                    </p>

                    {course.target_audience && (
                      <div className="pt-4 border-t border-line/70">
                        <h4 className="text-xs font-mono uppercase font-bold text-navy tracking-wider mb-1.5">
                          Dirigido a:
                        </h4>
                        <p className="text-xs sm:text-sm text-ink-soft">
                          {course.target_audience}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 3. Perfil de Egreso */}
                  {isPrimerosAuxilios ? (
                    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-line shadow-xs space-y-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-serif font-bold text-navy">
                          3. Perfil de Egreso (¿Qué aprenderás?)
                        </h3>
                        <p className="text-xs sm:text-sm text-ink-soft mt-1">
                          Al finalizar el curso, el participante será capaz de:
                        </p>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {PRIMEROS_AUXILIOS_GRADUATE_PROFILE.map((item, idx) => (
                          <li
                            key={idx}
                            className="p-3.5 rounded-2xl bg-bg-alt/60 border border-line flex items-start gap-2.5 text-xs sm:text-sm text-navy font-medium leading-relaxed"
                          >
                            <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  )}

                  {/* 4. Metodología y 8. Recursos y materiales */}
                  {isPrimerosAuxilios && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-line shadow-xs space-y-3">
                        <h3 className="text-base font-serif font-bold text-navy flex items-center gap-2">
                          <ClipboardCheck className="w-4 h-4 text-teal" />
                          <span>4. Metodología y Horas</span>
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm text-ink-soft">
                          {PRIMEROS_AUXILIOS_METHODOLOGY.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-3 border-t border-line text-xs text-navy bg-tealtint/60 p-3 rounded-xl">
                          <strong>Distribución de las horas académicas:</strong> El curso suma{" "}
                          <strong>50 horas académicas</strong>: 36 horas presenciales y 14 horas teóricas/complementarias (19 h de teoría 38 % y 31 h de práctica 62 %).
                        </div>
                      </div>

                      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-line shadow-xs space-y-3">
                        <h3 className="text-base font-serif font-bold text-navy flex items-center gap-2">
                          <Wrench className="w-4 h-4 text-teal" />
                          <span>8. Recursos y Materiales de Práctica</span>
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm text-ink-soft">
                          {PRIMEROS_AUXILIOS_MATERIALS.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Vista Previa del Flyer Oficial en la pestaña Descripción */}
                  {isPrimerosAuxilios && (
                    <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-navyink via-navy to-tealdeep text-white border border-gold/30 shadow-md flex flex-col sm:flex-row items-center gap-6">
                      <div
                        onClick={() => setShowFlyerLightbox(true)}
                        className="relative w-44 sm:w-48 shrink-0 rounded-2xl overflow-hidden border-2 border-gold shadow-xl cursor-pointer group"
                      >
                        <Image
                          src="/images/flyers/primeros-auxilios-emergencias-2027.jpg"
                          alt="Flyer Oficial del Curso de Primeros Auxilios y Respuesta Rápida ante Emergencias Comunes"
                          width={682}
                          height={1024}
                          className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="space-y-3 text-center sm:text-left">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold text-navyink text-[10px] font-extrabold uppercase tracking-wider">
                          <Sparkles className="w-3 h-3" />
                          <span>Afiche Oficial 2027</span>
                        </span>
                        <h3 className="text-lg sm:text-xl font-serif font-bold !text-white">
                          ¡Prepárate para actuar y salvar vidas!
                        </h3>
                        <p className="text-xs sm:text-sm !text-white/80 leading-relaxed">
                          Iniciamos este <strong>15 de enero de 2027</strong> con clases todos los sábados. Vacantes limitadas para garantizar la práctica guiada con maniquíes, DEA y equipos médicos.
                        </p>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2.5 pt-1">
                          <button
                            type="button"
                            onClick={() => setShowFlyerLightbox(true)}
                            className="px-4 py-2.5 rounded-xl bg-white text-navy font-extrabold text-xs hover:bg-goldpale transition-colors cursor-pointer inline-flex items-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5 text-teal" />
                            <span>Ampliar Flyer</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveTab("temario")}
                            className="px-4 py-2.5 rounded-xl bg-teal text-white font-extrabold text-xs hover:bg-tealdeep transition-colors cursor-pointer inline-flex items-center gap-1.5"
                          >
                            <span>Ver las 12 Clases y 5 Talleres</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* TAB 2: PLAN DE ESTUDIOS (SYLLABUS, CALENDARIO Y TALLERES) */}
              {activeTab === "temario" && (
                <section id="temario" className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center font-bold">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy">
                          5. Estructura General, Calendario y Plan de Estudios
                        </h2>
                        <p className="text-xs text-ink-soft">
                          Desarrollo curricular por módulos, clases teórico-prácticas y talleres
                        </p>
                      </div>
                    </div>

                    {syllabus?.modules?.length ? (
                      <span className="text-xs font-mono font-bold text-teal bg-tealtint px-3 py-1 rounded-full border border-teal/20 shrink-0">
                        {syllabus.modules.length} Módulos · 12 Clases
                      </span>
                    ) : null}
                  </div>

                  {/* Calendario de 12 Semanas para Primeros Auxilios */}
                  {isPrimerosAuxilios && (
                    <div className="rounded-3xl bg-white border border-line shadow-xs overflow-hidden">
                      <div className="px-5 py-3.5 bg-navy text-white flex items-center justify-between">
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono">
                          Calendario Académico (3 Meses · 12 Semanas)
                        </h3>
                        <span className="text-[11px] text-goldpale font-semibold">
                          Todos los sábados
                        </span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-bg-alt border-b border-line text-navy font-bold">
                              <th className="py-2.5 px-4">Mes</th>
                              <th className="py-2.5 px-4">Semana</th>
                              <th className="py-2.5 px-4">Clase</th>
                              <th className="py-2.5 px-4">Tipo de Sesión</th>
                              <th className="py-2.5 px-4">Módulo</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-line/60 text-ink-soft">
                            {PRIMEROS_AUXILIOS_CALENDAR.map((row) => (
                              <tr key={row.semana} className="hover:bg-bg-alt/40">
                                <td className="py-2 px-4 font-semibold text-navy">Mes {row.mes}</td>
                                <td className="py-2 px-4 font-mono">Semana {row.semana}</td>
                                <td className="py-2 px-4 font-bold text-navy">{row.clase}</td>
                                <td className="py-2 px-4">
                                  <span
                                    className={`inline-block px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                                      row.tipo.toLowerCase().includes("práctica")
                                        ? "bg-tealtint text-tealdeep"
                                        : row.tipo.toLowerCase().includes("teórico")
                                          ? "bg-slate-100 text-navy"
                                          : "bg-gold/20 text-navy font-bold"
                                    }`}
                                  >
                                    {row.tipo}
                                  </span>
                                </td>
                                <td className="py-2 px-4 font-mono font-bold text-navy">
                                  Módulo {row.modulo}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Acordeón de Módulos y las 12 Clases */}
                  {syllabus && syllabus.modules?.length > 0 ? (
                    <div className="space-y-3.5">
                      {syllabus.modules.map((mod, idx) => {
                        const isOpen = Boolean(openModules[idx]);
                        const lessonsCount = mod.lessons?.length || 0;

                        return (
                          <div
                            key={mod.module_id || idx}
                            className="rounded-2xl border border-line bg-white shadow-2xs overflow-hidden transition-all"
                          >
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
                                  <h3 className="text-sm sm:text-base font-bold text-navy">
                                    {mod.title}
                                  </h3>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-xs font-mono text-ink-soft bg-bg-alt px-2.5 py-1 rounded-lg border border-line hidden sm:inline-block">
                                  {lessonsCount} {lessonsCount === 1 ? "clase" : "clases"}
                                </span>
                                {isOpen ? (
                                  <ChevronUp className="w-4 h-4 text-navy" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-ink-soft" />
                                )}
                              </div>
                            </button>

                            {isOpen && (
                              <div className="px-5 pb-5 pt-1 border-t border-line/60 bg-bg-alt/20 space-y-2.5">
                                {mod.description && (
                                  <p className="text-xs text-ink-soft py-2 italic">
                                    {mod.description}
                                  </p>
                                )}

                                {lessonsCount > 0 ? (
                                  <div className="space-y-2.5 pt-1">
                                    {mod.lessons.map((lesson) => (
                                      <div
                                        key={lesson.lesson_id}
                                        className="p-4 rounded-xl bg-white border border-line space-y-2 text-xs"
                                      >
                                        <div className="flex items-start justify-between gap-3">
                                          <div className="flex items-start gap-2.5 min-w-0">
                                            <div className="w-6 h-6 rounded-lg bg-teal/10 text-teal flex items-center justify-center shrink-0 mt-0.5">
                                              {lesson.lesson_type === "practice" ||
                                              lesson.lesson_type === "simulation" ? (
                                                <Stethoscope className="w-3.5 h-3.5" />
                                              ) : (
                                                <Video className="w-3.5 h-3.5" />
                                              )}
                                            </div>
                                            <div className="min-w-0">
                                              <p className="font-bold text-navy text-xs sm:text-[13.5px]">
                                                {lesson.title}
                                              </p>
                                              {lesson.summary && (
                                                <p className="text-[11px] text-ink-soft mt-0.5">
                                                  {lesson.summary}
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                          <span className="font-mono text-[11px] text-navy font-bold shrink-0 bg-tealtint px-2.5 py-0.5 rounded-md">
                                            {lesson.academic_hours ?? 3} hrs
                                          </span>
                                        </div>

                                        {lesson.syllabus_topics &&
                                          lesson.syllabus_topics.length > 0 && (
                                            <ul className="pl-8 space-y-1 text-ink-soft pt-1">
                                              {lesson.syllabus_topics.map((topic, tIdx) => (
                                                <li
                                                  key={tIdx}
                                                  className="flex items-start gap-2 text-xs leading-relaxed"
                                                >
                                                  <span className="text-teal font-bold">•</span>
                                                  <span>{topic}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          )}
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

                  {/* Sección de Talleres Prácticos (Taller 1 al 5) */}
                  {isPrimerosAuxilios && (
                    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-line shadow-xs space-y-5">
                      <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-teal font-bold block">
                            Entrenamiento Presencial Supervisado
                          </span>
                          <h3 className="text-lg sm:text-xl font-serif font-bold text-navy">
                            Programa de Talleres Prácticos (Talleres 1 al 5)
                          </h3>
                        </div>
                        <span className="text-xs font-bold bg-gold/20 text-navy px-3 py-1 rounded-full border border-gold/40">
                          62 % Práctico
                        </span>
                      </div>

                      <div className="space-y-4">
                        {PRIMEROS_AUXILIOS_WORKSHOPS.map((group, gIdx) => (
                          <div
                            key={gIdx}
                            className="p-4 rounded-2xl bg-bg-alt/50 border border-line space-y-3"
                          >
                            <h4 className="text-xs sm:text-sm font-bold text-navy uppercase tracking-wide">
                              {group.module}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {group.workshops.map((ws, wIdx) => (
                                <div
                                  key={wIdx}
                                  className="p-3.5 rounded-xl bg-white border border-line space-y-2"
                                >
                                  <p className="text-xs sm:text-sm font-bold text-tealdeep">
                                    {ws.title}
                                  </p>
                                  <ul className="space-y-1 text-xs text-ink-soft">
                                    {ws.items.map((item, iIdx) => (
                                      <li key={iIdx} className="flex items-start gap-1.5">
                                        <Check className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                            <p className="text-xs font-semibold text-navy bg-white px-3 py-2 rounded-lg border border-line">
                              📌 {group.evalNote}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* TAB 3: SISTEMA DE EVALUACIÓN Y REQUISITOS */}
              {activeTab === "evaluacion" && (
                <section id="evaluacion" className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center font-bold">
                      <ClipboardCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy">
                        6. Sistema de Evaluación y Requisitos de Aprobación
                      </h2>
                      <p className="text-xs text-ink-soft">
                        Criterios académicos para obtener el Certificado Oficial de Aprobación
                      </p>
                    </div>
                  </div>

                  {/* Tabla de Ponderación */}
                  <div className="rounded-3xl bg-white border border-line shadow-xs overflow-hidden">
                    <div className="px-5 py-4 bg-navy text-white flex items-center justify-between">
                      <h3 className="text-sm sm:text-base font-bold font-serif">
                        6. Sistema de Evaluación Ponderado
                      </h3>
                      <span className="text-xs font-mono text-goldpale">Total: 100 %</span>
                    </div>
                    <div className="divide-y divide-line text-xs sm:text-sm">
                      {PRIMEROS_AUXILIOS_EVALUATION.map((item) => (
                        <div
                          key={item.componente}
                          className="flex items-center justify-between px-5 py-3.5 hover:bg-bg-alt/40"
                        >
                          <span className="font-semibold text-navy">{item.componente}</span>
                          <span className="font-mono font-bold text-tealdeep bg-tealtint px-3 py-1 rounded-lg">
                            {item.ponderacion}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 7. Requisitos de aprobación y certificación */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-white border border-line shadow-xs space-y-4">
                    <h3 className="text-base sm:text-lg font-serif font-bold text-navy">
                      7. Requisitos de Aprobación y Certificación
                    </h3>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-ink-soft">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                        <span>
                          <strong>Asistencia mínima del 80 % (10 de 12 sesiones):</strong> Las sesiones prácticas perdidas deben recuperarse. Completar las 14 horas complementarias.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                        <span>
                          <strong>Nota mínima aprobatoria:</strong> 14 sobre 20 en la escala vigesimal.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                        <span>
                          <strong>Competencias críticas obligatorias:</strong> Aprobar obligatoriamente las estaciones críticas de <strong>RCP/DEA y Maniobra de Heimlich</strong>.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Award className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span>
                          <strong>Certificación Oficial:</strong> Se otorgará el{" "}
                          <strong>
                            Certificado de Aprobación en {course.title} ({academicHours || 50} horas académicas)
                          </strong>
                          , emitido a nombre de <strong>FormaSalud</strong>, con código único de verificación QR. A quienes no cumplan los requisitos de aprobación se les entregará constancia de participación.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* 10. Consideraciones adicionales */}
                  {isPrimerosAuxilios && (
                    <div className="p-5 rounded-3xl bg-bg-alt border border-line space-y-2.5 text-xs text-ink-soft">
                      <h4 className="font-bold text-navy text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-teal" />
                        <span>10. Consideraciones Académicas y de Seguridad</span>
                      </h4>
                      <ul className="space-y-1.5 pl-6 list-disc">
                        <li>
                          El módulo de inyectables cumple la normativa local del Perú y los lineamientos vigentes, siendo dictado y supervisado directamente por personal médico y de enfermería.
                        </li>
                        <li>
                          Las guías de RCP y uso del DEA se desarrollan conforme a las recomendaciones internacionales vigentes (AHA / ERC).
                        </li>
                        <li>
                          Todas las prácticas se realizan en entorno simulado seguro con protocolos de bioseguridad.
                        </li>
                      </ul>
                    </div>
                  )}
                </section>
              )}

              {/* TAB 4: PLANA DOCENTE */}
              {activeTab === "docentes" && (
                <section id="docentes" className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center font-bold">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy">
                        9. Perfil Docente y Especialistas
                      </h2>
                      <p className="text-xs text-ink-soft">
                        Profesionales con amplia trayectoria asistencial, emergencias y docencia
                      </p>
                    </div>
                  </div>

                  {isPrimerosAuxilios && (
                    <div className="space-y-4">
                      {/* Tarjeta Destacada del Ponente Oficial: Lic. Juan Vicente Velázquez Magallanes */}
                      <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-teal/30 shadow-md relative overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-navy via-teal to-gold" />
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-1">
                          <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-2xl overflow-hidden border-2 border-gold shadow-md shrink-0 bg-navy">
                            <Image
                              src="/images/team/juan-velazquez.jpeg"
                              alt="Lic. Juan Vicente Velázquez Magallanes — Ponente Oficial FormaSalud"
                              fill
                              sizes="112px"
                              className="object-cover object-top"
                            />
                          </div>
                          <div className="space-y-2.5 text-center sm:text-left flex-1">
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                              <span className="px-2.5 py-0.5 rounded-full bg-tealtint text-tealdeep text-[10px] font-extrabold uppercase tracking-wider border border-teal/20">
                                Ponente y Docente Principal
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full bg-gold/20 text-navy text-[10px] font-mono font-bold uppercase border border-gold/40">
                                C.E.P. N.º 101694 · SUNEDU
                              </span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-serif font-bold text-navy">
                              Lic. Juan Vicente Velázquez Magallanes
                            </h3>
                            <p className="text-xs sm:text-sm font-semibold text-tealdeep">
                              Licenciado en Enfermería · Diplomado en Cuidados Intensivos en el Adulto · Diplomado de Auditor en Salud · Certificado en Soporte Vital Básico Prehospitalario (BLS y OVACE)
                            </p>
                            <p className="text-xs text-ink-soft leading-relaxed">
                              Responsable del Área de Referencia y Contrarreferencia de la <strong>DIRIS Lima Sur (MINSA)</strong> e integrante acreditado del <strong>Comité Transitorio de Emergencias y Desastres del Colegio de Enfermeros del Perú – Consejo Regional III Lima Metropolitana</strong>. Cuenta con amplia trayectoria liderando servicios de enfermería en EsSalud (ENSI Móvil), INABIF y Sociedad de Beneficencia de Lima Metropolitana, además de especialización en Inteligencia Artificial aplicada a la Gestión de Servicios de Salud y Gestión Pública.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-line shadow-xs space-y-3">
                        <h3 className="text-base font-serif font-bold text-navy">
                          Perfil del Cuerpo de Instructores del Curso
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm text-ink-soft">
                          <li className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                            <span>
                              <strong>Profesional de salud</strong> (médico, licenciado/a en enfermería o especialista en emergencias y áreas críticas) con experiencia acreditada en docencia clínica.
                            </span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                            <span>
                              <strong>Instructor con certificación vigente</strong> en Soporte Vital Básico (BLS) y manejo de emergencias prehospitalarias.
                            </span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                            <span>
                              <strong>Taller de extintores y evacuación:</strong> A cargo de personal especializado con formación en seguridad, control inicial de incendios y gestión de emergencias.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

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
                                src={getPublicAssetUrl(person.profile_photo_url) || person.profile_photo_url}
                                alt=""
                                className="w-full h-full object-cover object-top"
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
                            Equipo Docente Especializado FormaSalud
                          </h4>
                          <p className="text-xs text-ink-soft mt-0.5">
                            Dictado a cargo de médicos especialistas, licenciados en enfermería en UCI/Emergencias e instructores certificados en soporte vital básico (BLS).
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* TAB 5: CERTIFICACIÓN OFICIAL CON QR */}
              {activeTab === "certificacion" && (
                <section id="certificacion" className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center font-bold">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy">
                        Certificación Oficial y Validación QR
                      </h2>
                      <p className="text-xs text-ink-soft">
                        Diploma verificable en línea con código de registro único
                      </p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-tealtint/30 to-white border border-teal/20 shadow-xs space-y-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div className="space-y-2 max-w-xl">
                        <span className="px-2.5 py-0.5 rounded-md bg-gold/20 text-golddeep font-mono text-[10px] font-bold uppercase border border-gold/30">
                          ACREDITACIÓN OFICIAL FORMASALUD · {academicHours || 50} HORAS ACADÉMICAS
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-navy">
                          Certificado de Aprobación con Registro Único y QR
                        </h3>
                        <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                          Al culminar y aprobar el programa, obtendrás tu certificado oficial emitido a nombre de <strong>FormaSalud (RUC 20613837613)</strong> por <strong>{academicHours || 50} horas académicas</strong>, con respaldo institucional y código QR verificable en nuestro portal público.
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
              )}

              {/* TAB 6: PREGUNTAS FRECUENTES (FAQ) */}
              {activeTab === "faq" && (
                <section id="faq" className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center font-bold">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy">
                        Preguntas Frecuentes
                      </h2>
                      <p className="text-xs text-ink-soft">
                        Respuestas claras sobre la inscripción, talleres y certificación
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {isPrimerosAuxilios ? (
                      <>
                        <div className="p-5 rounded-2xl bg-white border border-line shadow-2xs space-y-1.5">
                          <h4 className="font-bold text-navy text-sm">
                            ¿Necesito tener conocimientos previos en salud para llevar el curso?
                          </h4>
                          <p className="text-xs text-ink-soft leading-relaxed">
                            No. El curso está dirigido al <strong>público en general</strong> (así como a estudiantes, brigadistas, cuidadores y trabajadores) y enseña paso a paso desde cero tanto la teoría como las destrezas prácticas.
                          </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-white border border-line shadow-2xs space-y-1.5">
                          <h4 className="font-bold text-navy text-sm">
                            ¿Cuándo inician las clases y en qué días se desarrollan?
                          </h4>
                          <p className="text-xs text-ink-soft leading-relaxed">
                            El curso inicia el <strong>15 de enero de 2027</strong>. Las clases se dictan <strong>todos los sábados</strong> durante 3 meses (12 semanas), con una carga de 3 horas académicas por sesión presencial más actividades complementarias guiadas.
                          </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-white border border-line shadow-2xs space-y-1.5">
                          <h4 className="font-bold text-navy text-sm">
                            ¿Qué pasa si falto a una sesión práctica?
                          </h4>
                          <p className="text-xs text-ink-soft leading-relaxed">
                            Para aprobar se requiere al menos el 80 % de asistencia (10 de 12 sesiones), y toda sesión práctica perdida puede y debe ser recuperada en coordinación académica.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
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
                            Sí, nuestros diplomas cuentan con carga horaria oficial en horas académicas, firma de directores académicos y código QR que valida su autenticidad ante comités evaluadores.
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
                      </>
                    )}
                  </div>
                </section>
              )}
            </div>

            {/* Columna Derecha (4 cols en Desktop): Tarjeta de Matrícula Flotante */}
            <div className="lg:col-span-5 xl:col-span-4 lg:-mt-72 relative z-20 order-1 lg:order-2 lg:sticky lg:top-24">
              <div className="rounded-3xl bg-white text-ink border border-line shadow-[0_20px_50px_rgba(15,41,66,0.18)] overflow-hidden">
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
                    <div className="absolute inset-0 p-5 flex flex-col justify-between texture-dark bg-gradient-to-br from-navy via-navyink to-tealdeep">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono font-bold tracking-widest text-goldpale uppercase">
                          <Stethoscope className="w-3.5 h-3.5 text-gold" />
                          <span>FormaSalud</span>
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-gold/20 text-gold px-2.5 py-0.5 rounded-full border border-gold/30">
                          OFICIAL
                        </span>
                      </div>
                      <div className="space-y-1 pb-7">
                        <div className="w-10 h-1 bg-gold rounded-full" />
                        <h4 className="text-sm sm:text-base font-serif font-black text-white leading-snug line-clamp-2">
                          {course.title}
                        </h4>
                        <p className="text-[11px] text-white/70">
                          Programa Académico Certificado
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Badge flotante en miniatura */}
                  <div className="absolute bottom-2.5 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy/90 backdrop-blur-xs border border-white/20 text-[10px] font-bold text-white shadow-xs">
                      <Award className="w-3 h-3 text-gold" />
                      <span>{certificateLabel}</span>
                    </span>
                  </div>
                </div>

                {/* Cuerpo de la Tarjeta de Inscripción */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-teal font-extrabold">
                        {isPrimerosAuxilios
                          ? "INICIO: 15 DE ENERO 2027"
                          : price === 0
                            ? "MATRÍCULA LIBRE"
                            : "INVERSIÓN ÚNICA"}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Vacantes Limitadas
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold text-navy font-serif">
                        {priceLabel}
                      </span>
                      {price > 0 && (
                        <span className="text-xs text-ink-soft">pago único</span>
                      )}
                    </div>
                  </div>

                  {/* Botones de Conversión */}
                  <div className="space-y-2">
                    <a
                      href={`https://wa.me/51939584395?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/25 transition-all hover:scale-[1.01] cursor-pointer group"
                    >
                      <MessageCircle className="w-5 h-5 shrink-0 fill-current" />
                      <span>Inscribirme por WhatsApp</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    {isPrimerosAuxilios && (
                      <button
                        type="button"
                        onClick={() => setShowFlyerLightbox(true)}
                        className="w-full py-2.5 px-5 rounded-2xl bg-tealtint hover:bg-teal/20 text-tealdeep border border-teal/30 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-teal" />
                        <span>Ver Flyer Oficial Completo</span>
                      </button>
                    )}

                    <Link
                      href="/aula/catalogo"
                      className="w-full py-2.5 px-5 rounded-2xl bg-navy hover:bg-navyink text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <GraduationCap className="w-4 h-4 text-goldpale" />
                      <span>Ingresar con mi cuenta al Aula</span>
                    </Link>
                  </div>

                  {isPrimerosAuxilios ? (
                    <div className="p-3 rounded-xl bg-bg-alt border border-line text-[11px] text-ink-soft space-y-1">
                      <span className="font-bold text-navy block uppercase tracking-wider">
                        Central de Informes e Inscripciones:
                      </span>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono font-bold text-tealdeep">
                        <a href="https://wa.me/51972373793" target="_blank" rel="noopener noreferrer" className="hover:underline">
                          📱 972 373 793
                        </a>
                        <a href="https://wa.me/51939584395" target="_blank" rel="noopener noreferrer" className="hover:underline">
                          📱 939 584 395
                        </a>
                        <a href="https://wa.me/51949992362" target="_blank" rel="noopener noreferrer" className="hover:underline">
                          📱 949 992 362
                        </a>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-[11px] text-ink-soft leading-tight">
                      ⚡ Respuesta inmediata por WhatsApp de un asesor académico.
                    </p>
                  )}

                  {/* Beneficios Incluidos */}
                  <div className="pt-3.5 border-t border-line space-y-2">
                    <p className="text-[11px] font-bold text-navy uppercase tracking-wider font-mono">
                      Este programa incluye:
                    </p>
                    <ul className="space-y-1.5 text-xs text-ink">
                      {isPrimerosAuxilios ? (
                        <>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                            <span>36 hrs presenciales + 14 hrs complementarias guiadas</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                            <span>Práctica con maniquíes RCP, DEA, brazos de inyección y extintores</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                            <span>Manual del participante, guías y checklists prácticos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                            <span>Certificado oficial por 50 horas académicas con QR</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                            <span>Auspiciado por FisioUCI y Medical Service Perú</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                            <span>Acceso ilimitado 24/7 a las clases grabadas</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                            <span>Diploma oficial con código QR y validación web</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                            <span>Materiales descargables, guías clínicas y lecturas</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                            <span>Docentes especialistas de hospitales de referencia</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                            <span>Válido para concursos públicos y currículum vitae</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* Ficha Técnica Rápida */}
                  <dl className="pt-3.5 border-t border-line grid grid-cols-2 gap-2.5 text-xs">
                    <div>
                      <dt className="text-ink-soft text-[11px]">Modalidad</dt>
                      <dd className="font-bold text-navy mt-0.5">
                        {isPrimerosAuxilios
                          ? "Presencial + Práctica"
                          : deliveryModeLabel[course.delivery_mode ?? ""] ?? "Virtual"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink-soft text-[11px]">Carga Horaria</dt>
                      <dd className="font-bold text-navy mt-0.5">
                        {academicHours > 0 ? `${academicHours} horas académicas` : "Flexible"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink-soft text-[11px]">Frecuencia</dt>
                      <dd className="font-bold text-navy mt-0.5">
                        {isPrimerosAuxilios
                          ? "Todos los Sábados"
                          : course.certificate_included
                            ? "Certificado Incluido"
                            : "Certificado Opcional"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink-soft text-[11px]">Duración</dt>
                      <dd className="font-bold text-navy mt-0.5">
                        {durationWeeks > 0
                          ? isPrimerosAuxilios
                            ? "3 meses (12 sem)"
                            : `${durationWeeks} semanas`
                          : "A tu propio ritmo"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BANNER FINAL DE ATENCIÓN DIRECTA COMPACTO */}
      <section className="bg-gradient-to-r from-navy to-tealdeep py-8 sm:py-10 text-white border-t border-line/10">
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-lg sm:text-xl font-serif font-extrabold text-white">
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
            className="px-6 py-3 rounded-2xl bg-gold text-navy font-bold text-xs sm:text-sm hover:bg-goldpale transition-all flex items-center gap-2 shadow-lg shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Modal Lightbox para ver el Flyer Oficial Completo */}
      {showFlyerLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navyink/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowFlyerLightbox(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-lg w-full bg-navyink rounded-3xl border-2 border-gold/50 overflow-hidden shadow-2xl p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowFlyerLightbox(false)}
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer"
              aria-label="Cerrar flyer"
            >
              <X className="w-5 h-5" />
            </button>
            <Image
              src="/images/flyers/primeros-auxilios-emergencias-2027.jpg"
              alt="Flyer Oficial Curso de Primeros Auxilios y Respuesta Rápida ante Emergencias Comunes"
              width={682}
              height={1024}
              className="w-full h-auto max-h-[82vh] object-contain rounded-2xl mx-auto"
            />
          </div>
        </div>
      )}
    </main>
  );
}
