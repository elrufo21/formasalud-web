export interface FaqItem {
  id: string;
  num: string;
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: "modalidad",
    num: "01",
    question: "¿Cómo se desarrollan las clases y ponencias?",
    answer:
      "Nuestros programas se imparten mediante clases en vivo vía Aula Virtual y talleres presenciales de simulación clínica en Lima, combinando flexibilidad con práctica rigurosa.",
  },
  {
    id: "certificacion",
    num: "02",
    question: "¿Los diplomas y certificados cuentan con respaldo formal?",
    answer:
      "Sí. Todos los certificados son emitidos por GRUPO PAUCAR PERÚ S.A.C. (RUC 20613837613) e incluyen código QR de verificación institucional y horas lectivas acreditadas.",
  },
  {
    id: "matricula",
    num: "03",
    question: "¿Cuáles son los requisitos y formas de pago para matricularme?",
    answer:
      "Requieres copia de DNI y título profesional o constancia de estudios según el programa. Aceptamos transferencias bancarias, Yape/Plin y tarjetas de crédito/débito.",
  },
  {
    id: "grabaciones",
    num: "04",
    question: "¿Tengo acceso a las grabaciones si no puedo asistir en vivo?",
    answer:
      "Sí. Todas las ponencias en vivo quedan grabadas en alta definición dentro de tu Aula Virtual y permanecen disponibles durante todo el desarrollo del programa.",
  },
];
