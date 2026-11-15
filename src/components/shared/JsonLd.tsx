import React from "react";
import { FAQ_DATA } from "@/features/faq/data/faq";

const SITE_URL = "https://www.formasalud.org.pe";

export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "Organization"],
        "@id": `${SITE_URL}/#organization`,
        name: "FORMASALUD",
        alternateName: [
          "FormaSalud",
          "FORMASALUD — Innovación y Desarrollo Académico en Salud",
          "Centro de Capacitación en Salud FORMASALUD",
        ],
        legalName: "GRUPO PAUCAR PERÚ S.A.C.",
        taxID: "20613837613",
        foundingDate: "2025-03-09",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: `${SITE_URL}/icon-512.png`,
          contentUrl: `${SITE_URL}/icon-512.png`,
          width: 512,
          height: 512,
          caption: "FORMASALUD — Innovación y Desarrollo Académico en Salud",
        },
        image: `${SITE_URL}/og-image.png`,
        description:
          "Centro de capacitación especializado en la innovación y desarrollo académico para profesionales de la salud y público en general en Lima, Perú. Cursos de Primeros Auxilios, RCP/DEA, Enfermería en UCI, Emergencias y Diplomados con certificación oficial verificable con QR.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lima",
          addressRegion: "Lima",
          addressCountry: "PE",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+51-939-584-395",
            email: "formasalud2025@gmail.com",
            contactType: "customer service",
            areaServed: "PE",
            availableLanguage: ["Spanish"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+51-972-373-793",
            contactType: "sales",
            areaServed: "PE",
            availableLanguage: ["Spanish"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+51-949-992-362",
            contactType: "sales",
            areaServed: "PE",
            availableLanguage: ["Spanish"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "FORMASALUD",
        alternateName: "FormaSalud — Innovación y Desarrollo Académico en Salud",
        inLanguage: "es-PE",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "Course",
        "@id": `${SITE_URL}/cursos/primeros-auxilios-y-respuesta-rapida-ante-emergencias-comunes#course`,
        name: "Curso de Primeros Auxilios y Respuesta Rápida ante Emergencias Comunes",
        description:
          "Capacitación teórico-práctica de 3 meses (12 semanas, 50 horas académicas) dirigida al público en general para evaluar escenas de emergencia, medir signos vitales y glucosa capilar, controlar hemorragias y quemaduras, aplicar inyectables con bioseguridad, realizar RCP y uso del DEA, actuar ante atragantamiento (Heimlich), infarto y ACV, y manejar extintores y evacuaciones.",
        url: `${SITE_URL}/cursos/primeros-auxilios-y-respuesta-rapida-ante-emergencias-comunes`,
        image: `${SITE_URL}/images/flyers/primeros-auxilios-emergencias-2027.jpg`,
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
        educationalCredentialAwarded:
          "Certificado de Aprobación a nombre de FormaSalud por 50 horas académicas con código de verificación QR",
        timeRequired: "PT50H",
        inLanguage: "es-PE",
        audience: {
          "@type": "Audience",
          audienceType: "Público en general",
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: ["onsite", "blended"],
          startDate: "2027-01-15",
          duration: "P12W",
          courseSchedule: {
            "@type": "Schedule",
            repeatFrequency: "P1W",
            byDay: "https://schema.org/Saturday",
            repeatCount: 12,
          },
          location: {
            "@type": "Place",
            name: "Sede Práctica FORMASALUD — Lima, Perú",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Lima",
              addressRegion: "Lima",
              addressCountry: "PE",
            },
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQ_DATA.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
