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
    id: "miguel-espinoza",
    name: "Miguel Eduardo Espinoza Osornio",
    role: "DOCENTE ESPECIALISTA",
    area: "Comité Científico",
    credentials: "Lic. · Especialista en manejo del paciente adulto en estado crítico",
    institution: "HOSPITAL MATERNO INFANTIL DE TIJUANA · MÉXICO",
    bio: "Profesional especializado en la atención y manejo del paciente adulto en estado crítico, con experiencia hospitalaria en la ciudad de Tijuana, México.",
    initials: "ME",
    specialtyTag: "CUIDADOS CRÍTICOS",
  },
  {
    id: "roberto-romero",
    name: "Roberto Adrián Romero Dávalos",
    role: "DOCENTE ESPECIALISTA",
    area: "Comité Científico",
    credentials: "Lic. · Especialista en Emergencias y Desastres",
    institution: "HOSPITAL NACIONAL GUILLERMO ALMENARA",
    bio: "Profesional especializado en emergencias y desastres, con experiencia asistencial en el Hospital Nacional Guillermo Almenara.",
    initials: "RR",
    specialtyTag: "EMERGENCIAS Y DESASTRES",
  },
  {
    id: "miguel-zambrano",
    name: "Miguel Zambrano Cruz",
    role: "DOCENTE ESPECIALISTA",
    area: "Comité Científico",
    credentials: "Lic. · Especialista en Emergencias y Desastres",
    institution: "HOSPITAL NACIONAL GUILLERMO ALMENARA",
    bio: "Profesional especializado en la atención de emergencias y desastres, con experiencia asistencial en el Hospital Nacional Guillermo Almenara.",
    initials: "MZ",
    specialtyTag: "EMERGENCIAS Y DESASTRES",
  },
  {
    id: "francisco-paucar",
    name: "Francisco Paucar Benites",
    role: "DOCENTE ESPECIALISTA",
    area: "Dirección & Gestión",
    credentials: "Lic. · Especialista en Emergencias y Desastres",
    institution: "HOSPITAL NACIONAL EDGARDO REBAGLIATI MARTINS",
    bio: "Profesional especializado en emergencias y desastres, con experiencia en atención hospitalaria en el Hospital Nacional Edgardo Rebagliati Martins.",
    initials: "FP",
    specialtyTag: "EMERGENCIAS Y DESASTRES",
  },
  {
    id: "bertha-gonzales",
    name: "Bertha Gonzales Gejaño",
    role: "DOCENTE ESPECIALISTA",
    area: "Comité Científico",
    credentials: "Lic. · Especialista en Unidad de Cuidados Intensivos",
    institution: "HOSPITAL NACIONAL EDGARDO REBAGLIATI MARTINS",
    bio: "Profesional especializada en cuidados intensivos y atención del paciente crítico, con experiencia asistencial en el Hospital Nacional Edgardo Rebagliati Martins.",
    initials: "BG",
    specialtyTag: "CUIDADOS INTENSIVOS",
  },
  {
    id: "percy-lopez",
    name: "Percy Abimael Lopez de la Cruz",
    role: "DOCENTE ESPECIALISTA",
    area: "Comité Científico",
    credentials: "Lic. · Especialista en Unidad de Cuidados Intensivos",
    institution: "HOSPITAL NACIONAL EDGARDO REBAGLIATI MARTINS",
    bio: "Profesional especializado en cuidados intensivos y manejo del paciente crítico, con experiencia asistencial en el Hospital Nacional Edgardo Rebagliati Martins.",
    initials: "PL",
    specialtyTag: "CUIDADOS INTENSIVOS",
  },
];
