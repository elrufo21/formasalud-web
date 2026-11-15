import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CourseFilters } from "@/features/courses/components/CourseFilters";
import { getPublishedCourses } from "@/lib/public-courses";

export const metadata: Metadata = {
  title: "Catálogo de Cursos, Talleres y Diplomados en Salud",
  description:
    "Explora el catálogo oficial de FORMASALUD: Curso de Primeros Auxilios y Respuesta Rápida ante Emergencias Comunes, Enfermería en UCI, Triaje, BLS-ACLS y más programas con certificación oficial QR.",
  alternates: {
    canonical: "https://www.formasalud.org.pe/cursos",
  },
};

export const revalidate = 60;

export default async function CursosPage() {
  const courses = await getPublishedCourses();
  return (
    <main className="flex-1">
      <section className="!pt-2 pb-12">
        <div className="wrap">
          <CourseFilters courses={courses} />
        </div>
      </section>
    </main>
  );
}
