export interface Partner {
  id: string;
  name: string;
  category:
    | "Acreditación Institucional"
    | "Cooperación Académica"
    | "Investigación Científica"
    | "Intercambio Internacional";
  description: string;
  initials: string;
  location: string;
}

export const PARTNERS_DATA: Partner[] = [
  {
    id: "formasalud-oficial",
    name: "FORMASALUD — Innovación y Desarrollo Académico",
    category: "Acreditación Institucional",
    description:
      "Centro de capacitación especializado en la formación continua y emisión de certificaciones oficiales (RUC 20613837613).",
    initials: "FS",
    location: "Lima – Perú",
  },
  {
    id: "cooperacion-academica",
    name: "Red de Convenios de Cooperación Académica",
    category: "Cooperación Académica",
    description:
      "Alianzas estratégicas orientadas a fortalecer el diseño curricular de diplomados, cursos y programas de especialización.",
    initials: "CA",
    location: "Nacional",
  },
  {
    id: "investigacion-salud",
    name: "Alianzas de Investigación y Evidencia Científica",
    category: "Investigación Científica",
    description:
      "Desarrollo conjunto de programas de actualización basados en evidencia científica, calidad y seguridad del paciente.",
    initials: "IC",
    location: "Perú",
  },
  {
    id: "intercambio-internacional",
    name: "Convenios de Intercambio Académico Internacional",
    category: "Intercambio Internacional",
    description:
      "Cooperación con docentes e instituciones internacionales para seminarios sobre innovación y nuevas tecnologías en salud.",
    initials: "II",
    location: "Internacional",
  },
  {
    id: "capacitacion-clinica",
    name: "Programas de Capacitación Clínica y Hospitalaria",
    category: "Cooperación Académica",
    description:
      "Respaldo académico para talleres prácticos de procedimientos clínicos, asistenciales y simulación hospitalaria.",
    initials: "CH",
    location: "Lima – Perú",
  },
];

