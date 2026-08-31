import React from "react";
import { COURSES_DATA } from "@/features/courses/data/courses";

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "FORMASALUD",
    legalName: "GRUPO PAUCAR PERÚ S.A.C.",
    taxID: "20613837613",
    url: "https://formasalud.pe",
    logo: "https://formasalud.pe/images/logo.png",
    description:
      "Centro de capacitación y formación médica continua en el Perú. Diplomados, cursos y talleres clínicos dictados por especialistas de hospitales de referencia.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+51-999-999-999",
      contactType: "Customer Support",
      availableLanguage: ["Spanish"],
    },
    sameAs: [
      "https://facebook.com/formasalud",
      "https://instagram.com/formasalud",
      "https://linkedin.com/company/formasalud",
    ],
  };

  const courseListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: COURSES_DATA.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: course.title,
        description: course.description,
        provider: {
          "@type": "EducationalOrganization",
          name: "FORMASALUD",
          sameAs: "https://formasalud.pe",
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: course.modality,
          instructor: {
            "@type": "Person",
            name: course.speaker,
            jobTitle: course.speakerSpecialty,
          },
        },
        offers: {
          "@type": "Offer",
          price: course.price.replace("S/ ", ""),
          priceCurrency: "PEN",
          category: "Medical Training",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }}
      />
    </>
  );
}
