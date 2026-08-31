export interface Partner {
  id: string;
  name: string;
  category: "Sociedad Médica" | "Red Hospitalaria" | "Entidad Educativa" | "Acreditación";
  description: string;
  initials: string;
  location: string;
}

export const PARTNERS_DATA: Partner[] = [
  {
    id: "grup-paucar",
    name: "GRUPO PAUCAR PERÚ S.A.C.",
    category: "Acreditación",
    description: "Entidad jurídica promotora y acreditadora oficial (RUC 20613837613).",
    initials: "GP",
    location: "Lima, Perú",
  },
  {
    id: "red-rebagliati",
    name: "Red Asistencial Rebagliati - Colaboradores Docentes",
    category: "Red Hospitalaria",
    description: "Docentes médicos adscritos en los servicios de cuidados intensivos y urgencias.",
    initials: "HN-EGM",
    location: "Lima",
  },
  {
    id: "soc-med-emergencias",
    name: "Comité de Emergencias Médicas y Trauma",
    category: "Sociedad Médica",
    description: "Alianza técnica para la revisión y validación de protocolos clínicos de resucitación.",
    initials: "CET",
    location: "Nacional",
  },
  {
    id: "colegios-profesionales",
    name: "Colegios Profesionales de Salud",
    category: "Entidad Educativa",
    description: "Alineamiento curricular a los estándares y horas lectivas reconocidas para recertificación.",
    initials: "CPS",
    location: "Perú",
  },
  {
    id: "auditoria-calidad",
    name: "Red de Auditores y Gestores en Salud del Perú",
    category: "Acreditación",
    description: "Intercambio de mejores prácticas y actualización en normativas SUSALUD.",
    initials: "RAGS",
    location: "Lima",
  },
  {
    id: "simulacion-peru",
    name: "Centro de Entrenamiento en Simulación Médica",
    category: "Entidad Educativa",
    description: "Infraestructura tecnológica y simuladores para talleres presenciales de vía aérea y trauma.",
    initials: "SIM",
    location: "Lima, Perú",
  },
];
