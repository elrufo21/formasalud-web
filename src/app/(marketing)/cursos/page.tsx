import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CourseFilters } from "@/features/courses/components/CourseFilters";

export const metadata: Metadata = {
  title: "Cursos y Programas — FORMASALUD",
  description:
    "Diplomados, cursos y talleres clínicos para el profesional de la salud. Encuentra el programa académico que impulsa tu desarrollo.",
};

export default function CursosPage() {
  return (
    <main className="flex-1">
      
      <section className="pt-4 pb-12">
        <div className="wrap">
          <CourseFilters />
        </div>
      </section>
    </main>
  );
}