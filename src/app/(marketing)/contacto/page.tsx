import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactSection } from "@/features/contact/components/ContactSection";

export const metadata: Metadata = {
  title: "Contacto — FORMASALUD",
  description:
    "Un asesor académico te orienta sobre programas, fechas y modalidades de FORMASALUD.",
};

export default function ContactoPage() {
  return (
    <main className="flex-1">
      
      <ContactSection />
    </main>
  );
}
