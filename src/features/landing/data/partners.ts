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
  logoUrl?: string;
}

export const PARTNERS_DATA: Partner[] = [
  {
    id: "fisiouci-convenio",
    name: "FISIOUCI — Fisioterapia & Cuidados Intensivos",
    category: "Cooperación Académica",
    description:
      "Institución aliada especializada en fisioterapia cardiorrespiratoria, entrenamiento avanzado en ventilación mecánica y monitoreo del paciente en estado crítico hospitalario.",
    initials: "FU",
    location: "Nacional / Internacional",
    logoUrl: "/certificates/fisiouci.png",
  },
  {
    id: "medical-service-peru",
    name: "MEDICAL SERVICE PERÚ — Emergencias & Soporte Vital",
    category: "Acreditación Institucional",
    description:
      "Entidad especializada en emergencias médicas, soporte vital básico y avanzado, transporte asistido y acreditación continua de competencias clínicas en el sector salud.",
    initials: "MS",
    location: "Lima – Perú",
    logoUrl: "/certificates/ausp.png",
  },
  {
    id: "formasalud-oficial",
    name: "FORMASALUD — Innovación y Desarrollo Académico",
    category: "Acreditación Institucional",
    description:
      "Centro de capacitación especializado en la formación continua, diplomados y emisión de certificaciones oficiales con registro SUNAT (RUC 20613837613).",
    initials: "FS",
    location: "Lima – Perú",
    logoUrl: "/images/logo.png",
  },
  {
    id: "red-hospitalaria",
    name: "Red Hospitalaria de Cuidados Intensivos y Emergencias",
    category: "Cooperación Académica",
    description:
      "Cooperación con docentes asistenciales de los principales centros de referencia: Hospital Rebagliati, Almenara, Loayza y centros asistenciales internacionales.",
    initials: "RH",
    location: "Nacional e Internacional",
  },
  {
    id: "investigacion-salud",
    name: "Alianzas de Formación e Investigación Basada en Evidencia",
    category: "Investigación Científica",
    description:
      "Desarrollo conjunto de programas de actualización profesional basados en evidencia científica rigurosa, calidad asistencial y seguridad del paciente.",
    initials: "IC",
    location: "Perú",
  },
];
