export interface FlyerItem {
  id: string;
  code: string;
  title: string;
  type: "Masterclass Gratuita" | "Curso Certificado" | "Seminario Clínico" | "Taller Práctico";
  tag: string;
  date: string;
  time: string;
  modality: "En Vivo vía Zoom / Aula Virtual" | "Presencial en Auditorio Lima" | "Híbrida";
  speaker: string;
  speakerRole: string;
  speakerInitials: string;
  summary: string;
  highlights: string[];
  spots: string;
  priceTag: string;
  colorGradient: string;
  badgeColor: string;
}

export const FLYERS_DATA: FlyerItem[] = [
  {
    id: "flyer-uci-shock",
    code: "FLY-2026-01",
    title: "Masterclass: Actualización en Shock Séptico & Protocolos Surviving Sepsis 2026",
    type: "Masterclass Gratuita",
    tag: "Transmisión en Vivo",
    date: "Jueves 18 de Septiembre, 2026",
    time: "7:30 PM (Hora de Lima)",
    modality: "En Vivo vía Zoom / Aula Virtual",
    speaker: "Dra. Carmen Ríos Salazar",
    speakerRole: "Médico Intensivista · Hosp. Rebagliati",
    speakerInitials: "CR",
    summary: "Revisión clínica de las metas tempranas de resucitación, vasopresores de primera línea y monitoreo hemodinámico no invasivo.",
    highlights: [
      "Certificado de asistencia digital opcional",
      "Guía descargable de dosis y titulación de fármacos",
      "Sesión de preguntas y respuestas en vivo con la docente",
    ],
    spots: "Últimos 45 accesos libres",
    priceTag: "Ingreso Libre (Previa Inscripción)",
    colorGradient: "from-tealdeep via-navy to-navyink",
    badgeColor: "bg-gold text-navyink",
  },
  {
    id: "flyer-ia-radiologia",
    code: "FLY-2026-02",
    title: "Seminario Clínico: Inteligencia Artificial en Imagenología y Rayos X de Tórax",
    type: "Seminario Clínico",
    tag: "Innovación & Salud",
    date: "Sábado 27 de Septiembre, 2026",
    time: "10:00 AM – 1:00 PM",
    modality: "En Vivo vía Zoom / Aula Virtual",
    speaker: "Dr. Renzo Salcedo Vega",
    speakerRole: "Especialista en IA Médica & Informática en Salud",
    speakerInitials: "RS",
    summary: "Demostración práctica de algoritmos de detección de consolidaciones, nódulos y patologías pulmonares con modelos de Deep Learning.",
    highlights: [
      "Taller con software de lectura radiológica asistida",
      "Certificación por 24 horas académicas",
      "Acceso de por vida a la grabación en Aula Virtual",
    ],
    spots: "Cupos limitados a 30 profesionales",
    priceTag: "Preventa: S/ 120",
    colorGradient: "from-[#8a6a1c] via-navy to-navyink",
    badgeColor: "bg-teal text-white",
  },
  {
    id: "flyer-via-aerea",
    code: "FLY-2026-03",
    title: "Taller Clínico: Manejo Avanzado de Vía Aérea Difícil & Videolaringoscopía",
    type: "Taller Práctico",
    tag: "Entrenamiento Presencial",
    date: "Sábado 03 de Octubre, 2026",
    time: "8:30 AM – 5:30 PM (Jornada Completa)",
    modality: "Presencial en Auditorio Lima",
    speaker: "Dr. Jorge Alarcón Morales",
    speakerRole: "Anestesiólogo & Especialista en Simulación",
    speakerInitials: "JA",
    summary: "Entrenamiento 100% práctico en maniquíes anatómicos de alta fidelidad, algoritmos DAS y técnicas quirúrgicas de rescate.",
    highlights: [
      "Práctica individual por cada estación de destreza",
      "Manual impreso de procedimientos de urgencia",
      "Certificado oficial con evaluación práctica de competencias",
    ],
    spots: "Solo 18 vacantes por aforo técnico",
    priceTag: "Inversión: S/ 450",
    colorGradient: "from-teal via-tealdeep to-navyink",
    badgeColor: "bg-navy text-white",
  },
];
