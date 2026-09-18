"use client";

import React, { useState } from "react";
import { COURSES_DATA, Course } from "../data/courses";
import { CourseCard } from "./CourseCard";
import { CourseDetailModal } from "./CourseDetailModal";
import { Carousel } from "@/components/ui/carousel/Carousel";

/**
 * CourseHomeGrid — vista de cursos para el Home.
 * Carrusel (loop infinito: al llegar al final vuelve al inicio) con las
 * cards simplificadas de toda la oferta académica.
 * La vista dedicada "Cursos" (CourseFilters) sigue usando su propia
 * grilla normal y no se ve afectada por este componente.
 */
export function CourseHomeGrid() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <div>
      <Carousel
        options={{ loop: true }}
        slideClassName="flex-[0_0_88%] xs:flex-[0_0_80%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
        className="px-1"
      >
        {COURSES_DATA.map((course) => (
          <CourseCard key={course.id} course={course} onViewDetails={setSelectedCourse} />
        ))}
      </Carousel>

      <CourseDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
}
