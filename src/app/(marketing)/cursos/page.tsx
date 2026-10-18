import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CourseFilters } from "@/features/courses/components/CourseFilters";
import { getPublishedCourses } from "@/lib/public-courses";

export const metadata: Metadata = {
  title: "Cursos y Programas — FORMASALUD",
  description:
    "Diplomados, cursos y talleres clínicos para el profesional de la salud. Encuentra el programa académico que impulsa tu desarrollo.",
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
