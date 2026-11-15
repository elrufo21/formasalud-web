import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactSection } from "@/features/contact/components/ContactSection";

export const metadata: Metadata = {
  title: "Contacto e Informes de Matrícula",
  description:
    "Comunícate con un asesor académico de FORMASALUD por WhatsApp (972 373 793 / 939 584 395 / 949 992 362) o correo electrónico sobre cursos, fechas e inscripciones.",
  alternates: {
    canonical: "https://www.formasalud.org.pe/contacto",
  },
};

export default function ContactoPage() {
  return (
    <main className="flex-1">
      
      <ContactSection />
    </main>
  );
}
