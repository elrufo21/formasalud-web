import React from "react";

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "FORMASALUD",
    legalName: "FORMASALUD",
    taxID: "20613837613",
    foundingDate: "2025-03-09",
    url: "https://formasalud.pe",
    logo: "https://formasalud.pe/images/logo.png",
    description:
      "Centro de capacitación especializado en la innovación y desarrollo académico para los profesionales de la salud en Lima, Perú.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+51-939-584-395",
      email: "formasalud2025@gmail.com",
      contactType: "Customer Support",
      availableLanguage: ["Spanish"],
    },
    sameAs: [
      "https://facebook.com/formasalud",
      "https://instagram.com/formasalud",
      "https://linkedin.com/company/formasalud",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
