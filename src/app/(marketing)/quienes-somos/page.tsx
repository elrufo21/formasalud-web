import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { InstitutionalFicha } from "@/features/about/components/InstitutionalFicha";

export const metadata: Metadata = {
  title: "Quiénes Somos — FORMASALUD",
  description:
    "Compromiso académico con la salud pública y privada. FORMASALUD nace para responder a la necesidad de actualización constante del profesional de salud peruano.",
};

export default function QuienesSomosPage() {
  return (
    <main className="flex-1">
      
      <InstitutionalFicha />
    </main>
  );
}
