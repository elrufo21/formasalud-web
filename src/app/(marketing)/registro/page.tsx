import React from "react";
import type { Metadata } from "next";
import LoginRegister from "@/components/auth/LoginRegister";

export const metadata: Metadata = {
  title: "Registro de Alumnos | Aula Virtual FormaSalud",
  description:
    "Crea tu cuenta gratuita de alumno en FormaSalud para inscribirte en cursos de salud, enfermería y primeros auxilios y descargar tus certificados oficiales.",
  alternates: {
    canonical: "https://www.formasalud.org.pe/registro",
  },
};

export default function RegistroPage() {
  return (
    <main className="flex-1 py-16 flex items-center justify-center min-h-[50vh]">
      <LoginRegister initialTab="register" />
    </main>
  );
}
