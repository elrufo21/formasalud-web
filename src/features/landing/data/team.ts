export interface TeamMember {
  id: string;
  name: string;
  role: string;
  area: "Dirección & Gestión" | "Comité Científico" | "Coordinación Académica";
  credentials: string;
  institution: string;
  bio: string;
  initials: string;
  photoUrl?: string;
  specialtyTag: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "francisco-paucar",
    name: "Francisco Paucar Benites",
    role: "Dirección General & Fundador",
    area: "Dirección & Gestión",
    credentials: "Mg. Gestión de Organizaciones de Salud",
    institution: "GRUPO PAUCAR PERÚ S.A.C.",
    bio: "Líder en innovación formativa para el sector salud con más de 10 años promoviendo la actualización técnica y médica continua de profesionales en todo el Perú.",
    initials: "FP",
    specialtyTag: "Dirección Institucional",
  },
  {
    id: "carmen-rios",
    name: "Dra. Carmen Ríos Salazar",
    role: "Directora del Comité Científico de Cuidados Críticos",
    area: "Comité Científico",
    credentials: "CMP 48291 · RNE 23910",
    institution: "Hospital Nacional Edgardo Rebagliati Martins",
    bio: "Especialista en Medicina Intensiva, docente universitaria de posgrado con amplia experiencia en soporte vital avanzado y manejo de pacientes politraumatizados.",
    initials: "CR",
    specialtyTag: "Medicina Intensiva",
  },
  {
    id: "patricia-nunez",
    name: "Lic. Patricia Nuñez Vidal",
    role: "Coordinadora de Programas de Gestión y Calidad",
    area: "Coordinación Académica",
    credentials: "CEP 39201 · Mg. Salud Pública (UNMSM)",
    institution: "Auditora en Sistemas de Gestión de Calidad en Salud",
    bio: "Especialista en acreditación de establecimientos de salud, auditoría médica y de enfermería según estándares nacionales e internacionales de SUSALUD.",
    initials: "PN",
    specialtyTag: "Gestión Hospitalaria",
  },
  {
    id: "renzo-salcedo",
    name: "Dr. Renzo Salcedo Vega",
    role: "Docente Principal de IA & Salud Digital",
    area: "Comité Científico",
    credentials: "CMP 51204 · Ph.D(c) Medical Informatics",
    institution: "Investigador en Salud Digital y Bioestadística",
    bio: "Pionero en la aplicación de algoritmos diagnósticos y herramientas de IA generativa para la optimización de procesos médicos y toma de decisiones clínicas.",
    initials: "RS",
    specialtyTag: "Informática Médica & IA",
  },
  {
    id: "carlos-vargas",
    name: "Dr. Carlos Várgas Alva",
    role: "Director de Talleres de Urgencias y Trauma",
    area: "Comité Científico",
    credentials: "CMP 44102 · RNE 19283",
    institution: "Hospital Nacional Dos de Mayo",
    bio: "Emergentólogo con trayectoria de más de 12 años en salas de trauma shock y formación de médicos residentes en protocolos de resucitación y ecografía FAST.",
    initials: "CV",
    specialtyTag: "Medicina de Emergencias",
  },
  {
    id: "elena-alarcon",
    name: "Dra. Elena Alarcón Pinto",
    role: "Coordinadora del Área de Auditoría en Salud",
    area: "Coordinación Académica",
    credentials: "CMP 36192 · RNE 16820 · Auditora Certificada",
    institution: "Consultora Senior en Normativa y Calidad Sanitaria",
    bio: "Especialista en derecho médico, prevención del riesgo clínico y auditoría integral de historias clínicas con valor probatorio legal.",
    initials: "EA",
    specialtyTag: "Auditoría Médica",
  },
];
