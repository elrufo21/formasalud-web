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
    name: "Lic. Francisco Paucar Benites",
    role: "DIRECTOR ACADÉMICO / GERENTE GENERAL",
    area: "Dirección & Gestión",
    credentials:
      "Licenciado en Enfermería · Enfermero Auditor · Especialista en Emergencias y Desastres · Mg. en Gestión Pública y Privada de la Salud · Doctorando en Salud Pública y Salud Global",
    institution: "HOSPITAL NACIONAL EDGARDO REBAGLIATI MARTINS · UNMSM",
    bio: "Enfermero auditor y especialista en Emergencias y Desastres con maestría en Gestión Pública y Privada de la Salud, actualmente cursando estudios de Doctorado en Salud Pública y Salud Global. Se desempeña profesionalmente en la Unidad de Cuidados Intensivos del Hospital Nacional Edgardo Rebagliati Martins. Docente de prácticas de la Universidad Nacional Mayor de San Marcos en la sede del Hospital Rebagliati. Gerente General de GRUPO PAUCAR PERÚ S.A.C.",
    initials: "FP",
    photoUrl: "/images/team/francisco-paucar.jpeg",
    specialtyTag: "DIRECCIÓN & UCI",
  },
  {
    id: "liz-pajuelo",
    name: "Lic. Liz Joselí Pajuelo Espinoza",
    role: "DOCENTE ESPECIALISTA",
    area: "Comité Científico",
    credentials:
      "Licenciada en Enfermería · Especialista en Cuidados Intensivos Adultos · Magíster en Gestión en Salud · Enfermera Auditora en Salud",
    institution: "HOSPITAL NACIONAL EDGARDO REBAGLIATI MARTINS · UNMSM",
    bio: "Especialista en Cuidados Quirúrgicos con mención en Tratamiento Avanzado de Heridas y Ostomías. Docente Adjunta de la Escuela Profesional de Enfermería de la Facultad de Medicina Humana de la UNMSM. Cuenta con amplia participación en la organización y dirección académica de congresos y actividades nacionales e internacionales vinculadas a Enfermería Intensiva, Neurointensivismo y lesiones cutáneas asociadas a la dependencia. Se desempeña en la Unidad de Cuidados Intensivos del Hospital Nacional Edgardo Rebagliati Martins.",
    initials: "LP",
    photoUrl: "/images/team/liz-pajuelo.jpeg",
    specialtyTag: "CUIDADOS INTENSIVOS",
  },
  {
    id: "abraham-munarriz",
    name: "Mg. Abraham Christian Munarriz Ticona",
    role: "DOCENTE ESPECIALISTA",
    area: "Comité Científico",
    credentials:
      "Doctorando en Salud Pública · Mg. en Ciencias: Epidemiología Clínica y Bioestadística · Terapeuta Respiratorio Certificado (TRC) CLACPTER/NBRC (EE. UU.)",
    institution: "HOSPITAL NACIONAL EDGARDO REBAGLIATI MARTINS · FISIOUCI · UNMSM",
    bio: "Tecnólogo Médico en Terapia Física y Rehabilitación con segunda especialidad en Fisioterapia Cardiorrespiratoria e Instructor especializado en FISIOUCI ENTERPRISE. Terapeuta Respiratorio Certificado (TRC) por CLACPTER / National Board for Respiratory Care (EE. UU.). Actualmente labora en la Unidad de Cuidados Intensivos del Hospital Nacional Edgardo Rebagliati Martins. Docente de Posgrado de la Universidad Norbert Wiener y de la UNMSM.",
    initials: "AM",
    photoUrl: "/images/team/abraham-munarriz.jpeg",
    specialtyTag: "TERAPIA RESPIRATORIA",
  },
  {
    id: "roberto-romero",
    name: "Lic. Roberto Adrián Romero Dávalos",
    role: "DOCENTE ESPECIALISTA",
    area: "Comité Científico",
    credentials:
      "Licenciado en Enfermería · Especialista en Emergencias y Desastres · Especialista en Unidad de Cuidados Intensivos",
    institution: "HOSPITAL NACIONAL GUILLERMO ALMENARA · CLÍNICA SAN PABLO",
    bio: "Docente y expositor internacional en temas relacionados con Áreas Críticas, Emergencias y Cuidados Intensivos. Cuenta con trayectoria asistencial en el Hospital Nacional Arzobispo Loayza, Hospital María Auxiliadora y Hospital Nacional Hipólito Unanue. Actualmente se desempeña en el Servicio de Emergencia del Hospital Nacional Guillermo Almenara Irigoyen y en la UCI de la Clínica San Pablo (La Victoria).",
    initials: "RR",
    photoUrl: "/images/team/roberto-romero.jpeg",
    specialtyTag: "EMERGENCIAS Y UCI",
  },
  {
    id: "bertha-gonzales",
    name: "Lic. Bertha Victoria Gonzales Gejaño",
    role: "COORDINADORA ADMINISTRATIVA",
    area: "Dirección & Gestión",
    credentials:
      "Licenciada en Enfermería · Especialista en Emergencias y Desastres · Especialista en Cuidados Intensivos Adultos · Magíster en Gestión y Administración en Salud",
    institution: "HOSPITAL NACIONAL EDGARDO REBAGLIATI MARTINS",
    bio: "Cuenta con amplia experiencia profesional en el Hospital Nacional Sergio E. Bernales y en la Clínica Internacional (sede Lima). Actualmente se desempeña en la Unidad de Cuidados Intensivos del Hospital Nacional Edgardo Rebagliati Martins. Es Coordinadora Administrativa de FORMASALUD.",
    initials: "BG",
    photoUrl: "/images/team/bertha-gonzales.jpeg",
    specialtyTag: "GESTIÓN Y UCI",
  },
  {
    id: "miguel-zambrano",
    name: "Lic. Miguel Zambrano Cruz",
    role: "COORDINADOR ACADÉMICO",
    area: "Coordinación Académica",
    credentials:
      "Licenciado en Enfermería · Especialista en Emergencias y Desastres",
    institution: "HOSPITAL NACIONAL GUILLERMO ALMENARA · UPeU",
    bio: "Especialista con sólida experiencia asistencial en Emergencias y Cuidados Intensivos en instituciones públicas y privadas de salud. Actualmente labora en los servicios de UCI y Emergencia del Hospital Nacional Guillermo Almenara Irigoyen y desarrolla actividades docentes de prácticas de especialidad en Emergencia en la Universidad Peruana Unión. Es Coordinador Académico de FORMASALUD.",
    initials: "MZ",
    photoUrl: "/images/team/miguel-zambrano.jpeg",
    specialtyTag: "EMERGENCIAS Y UCI",
  },
  {
    id: "miguel-espinoza",
    name: "Lic. Miguel Eduardo Espinoza Osornio",
    role: "DOCENTE ESPECIALISTA INTERNACIONAL",
    area: "Comité Científico",
    credentials:
      "Licenciado en Enfermería y Obstetricia · Máster en Cuidados Intensivos",
    institution: "HOSPITAL MATERNO INFANTIL DE TIJUANA (MÉXICO)",
    bio: "Máster en Cuidados Intensivos y docente universitario en difusión de artículos científicos e investigación en el sector de la salud. Actualmente labora en el Hospital Materno Infantil de Tijuana, México, y participa como ponente internacional en programas de soporte crítico de FORMASALUD.",
    initials: "ME",
    photoUrl: "/images/team/miguel-espinoza.jpeg",
    specialtyTag: "CUIDADOS CRÍTICOS",
  },
  {
    id: "percy-lopez",
    name: "Lic. Percy Abimael López de la Cruz",
    role: "DOCENTE ESPECIALISTA",
    area: "Comité Científico",
    credentials:
      "Licenciado en Enfermería · Especialista en Unidad de Cuidados Intensivos",
    institution: "HOSPITAL NACIONAL EDGARDO REBAGLIATI MARTINS",
    bio: "Profesional especializado en cuidados intensivos y manejo del paciente crítico, con destacada trayectoria asistencial en la Unidad de Cuidados Intensivos del Hospital Nacional Edgardo Rebagliati Martins.",
    initials: "PL",
    photoUrl: "/images/team/percy-lopez.jpeg",
    specialtyTag: "CUIDADOS INTENSIVOS",
  },
];
