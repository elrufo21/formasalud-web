export interface Course {
  id: string;
  code: string;
  category: "diplomado" | "curso" | "gestion" | "ia" | "taller";
  categoryLabel: string;
  badge?: string;
  badgeType?: "fire" | "hot" | "new" | "gold";
  title: string;
  description: string;
  modality: "Virtual en Vivo" | "Híbrida" | "Presencial" | "100% Asincrónico";
  duration: string;
  academicHours: string;
  startDate: string;
  speaker: string;
  speakerInitials: string;
  speakerSpecialty: string;
  speakerCredentials: string;
  price: string;
  installments?: string;
  iconType?: "intensive" | "ia" | "gestion" | "urgencia" | "auditoria" | "taller";
  features?: string[];
}

export const COURSES_DATA: Course[] = [
  {
    id: "enfermeria-cuidados-criticos",
    code: "FS · EN · 01",
    category: "diplomado",
    categoryLabel: "Diplomado Especializado",
    badge: "🔥 Pocos cupos disponibles",
    badgeType: "fire",
    title: "Enfermería en Cuidados Críticos y Cuidados Intensivos",
    description:
      "Actualización integral en ventilación mecánica, soporte hemodinámico, farmacología de infusión continua y manejo del paciente en estado crítico.",
    modality: "Híbrida",
    duration: "8 semanas",
    academicHours: "120 hrs lectivas · 4 créditos",
    startDate: "Inicio: 15 de Septiembre, 2026",
    speaker: "Dra. Carmen Ríos Salazar",
    speakerInitials: "CR",
    speakerSpecialty: "Medicina Intensiva & Cuidados Críticos",
    speakerCredentials: "CMP 48291 · RNE 23910 (Hosp. Edgardo Rebagliati)",
    price: "S/ 890",
    installments: "o 2 cuotas de S/ 460",
    iconType: "intensive",
    features: [
      "Simulación de casos UCI en tiempo real",
      "Talleres presenciales de VMNI y gases arteriales",
      "Acceso ilimitado a grabaciones en Aula Virtual",
    ],
  },
  {
    id: "ia-aplicada-salud",
    code: "FS · IA · 02",
    category: "ia",
    categoryLabel: "Programa de Alta Especialización",
    badge: "Más solicitado",
    badgeType: "hot",
    title: "Inteligencia Artificial Aplicada a la Práctica Clínica y Diagnóstica",
    description:
      "Aprende a integrar herramientas de IA generativa, procesamiento de lenguaje médico y modelos de visión computacional para optimizar diagnósticos e historias clínicas.",
    modality: "Virtual en Vivo",
    duration: "6 semanas",
    academicHours: "80 hrs lectivas · 3 créditos",
    startDate: "Inicio: 22 de Septiembre, 2026",
    speaker: "Dr. Renzo Salcedo Vega",
    speakerInitials: "RS",
    speakerSpecialty: "Informática Médica & Tecnologías en Salud",
    speakerCredentials: "CMP 51204 · Ph.D(c) Medical AI (UPCH)",
    price: "S/ 690",
    installments: "o 2 cuotas de S/ 360",
    iconType: "ia",
    features: [
      "Prompts clínicos y análisis de literatura médica",
      "Seguridad de datos de pacientes y bioética",
      "Proyecto aplicativo de triaje asistido por IA",
    ],
  },
  {
    id: "simulacion-clinica-avanzada",
    code: "FS · TL · 03",
    category: "taller",
    categoryLabel: "Taller Clínico Hands-On",
    badge: "Nueva cohorte 2026",
    badgeType: "new",
    title: "Taller Hands-On de Simulación Clínica y Vía Aérea Difícil",
    description:
      "Entrenamiento práctico intensivo en escenarios simulados de alta fidelidad: manejo invasivo y no invasivo de la vía aérea, intubación retrógrada y cricotiroidotomía.",
    modality: "Presencial",
    duration: "4 semanas",
    academicHours: "48 hrs prácticas",
    startDate: "Inicio: 28 de Septiembre, 2026",
    speaker: "Dr. Jorge Alarcón Morales",
    speakerInitials: "JA",
    speakerSpecialty: "Anestesiología & Simulación Médica",
    speakerCredentials: "CMP 41029 · RNE 18274 (Hosp. Guillermo Almenara)",
    price: "S/ 750",
    installments: "Cupos limitados por estación",
    iconType: "taller",
    features: [
      "Estaciones de trabajo con maniquíes de alta fidelidad",
      "Videolaringoscopía y fibroscopía flexible",
      "Certificado con evaluación de competencias",
    ],
  },
  {
    id: "gerencia-servicios-salud",
    code: "FS · GE · 04",
    category: "gestion",
    categoryLabel: "Diplomado Ejecutivo",
    badge: "Inscripciones Abiertas",
    badgeType: "gold",
    title: "Gerencia, Acreditación y Gestión de Servicios de Salud",
    description:
      "Desarrollo de competencias directivas para la optimización de procesos hospitalarios, costos en salud, gestión del talento y preparación para acreditación SUSALUD.",
    modality: "Virtual en Vivo",
    duration: "10 semanas",
    academicHours: "160 hrs lectivas · 5 créditos",
    startDate: "Inicio: 05 de Octubre, 2026",
    speaker: "Lic. Patricia Nuñez Vidal",
    speakerInitials: "PN",
    speakerSpecialty: "Gestión de Servicios de Salud & Calidad",
    speakerCredentials: "CEP 39201 · Mg. Salud Pública (UNMSM)",
    price: "S/ 950",
    installments: "o 3 cuotas de S/ 330",
    iconType: "gestion",
    features: [
      "Matrices de auditoría médica y de enfermería",
      "Indicadores de calidad y seguridad del paciente",
      "Elaboración de plan operativo institucional",
    ],
  },
  {
    id: "urgencias-emergencias-medicas",
    code: "FS · ER · 05",
    category: "curso",
    categoryLabel: "Curso de Actualización",
    badge: "🔥 Pocos cupos disponibles",
    badgeType: "fire",
    title: "Manejo Integral de Urgencias y Emergencias Médicas",
    description:
      "Algoritmos actualizados de soporte vital cardiovascular avanzado (ACLS), abordaje del shock séptico, trauma shock y emergencias cardiovasculares agudas.",
    modality: "Presencial",
    duration: "4 semanas",
    academicHours: "60 hrs lectivas · 2 créditos",
    startDate: "Inicio: 12 de Octubre, 2026",
    speaker: "Dr. Carlos Várgas Alva",
    speakerInitials: "CV",
    speakerSpecialty: "Emergencias & Desastres",
    speakerCredentials: "CMP 44102 · RNE 19283 (Hosp. Dos de Mayo)",
    price: "S/ 650",
    installments: "o 2 cuotas de S/ 340",
    iconType: "urgencia",
    features: [
      "Resolución de casos clínicos interactivos",
      "Interpretación rápida de EKG en urgencias",
      "Protocolos de reanimación cardiopulmonar avanzada",
    ],
  },
  {
    id: "auditoria-medica-calidad",
    code: "FS · AU · 06",
    category: "gestion",
    categoryLabel: "Diplomado Especializado",
    badge: "Normativa SUSALUD",
    badgeType: "hot",
    title: "Auditoría Médica en Salud y Control de Calidad Hospitalaria",
    description:
      "Metodología de auditoría de la calidad de atención en salud, análisis de historias clínicas, prevención de eventos adversos y respuesta técnica a requerimientos legales.",
    modality: "Virtual en Vivo",
    duration: "8 semanas",
    academicHours: "120 hrs lectivas · 4 créditos",
    startDate: "Inicio: 19 de Octubre, 2026",
    speaker: "Dra. Elena Alarcón Pinto",
    speakerInitials: "EA",
    speakerSpecialty: "Auditoría Médica & Gestión del Riesgo",
    speakerCredentials: "CMP 36192 · RNE 16820 · Auditora Registrada",
    price: "S/ 880",
    installments: "o 2 cuotas de S/ 455",
    iconType: "auditoria",
    features: [
      "Revisión de casos médico-legales reales",
      "Normativa Sunasa y NTS de historia clínica",
      "Modelos de informes de auditoría de primer nivel",
    ],
  },
];
