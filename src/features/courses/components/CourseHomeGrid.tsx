"use client";

import React, { useState } from "react";
import { COURSES_DATA, Course } from "../data/courses";
import { CourseCard } from "./CourseCard";
import { CourseDetailModal } from "./CourseDetailModal";

/**
 * CourseHomeGrid — vista de cursos para el Home.
 * Sin tabs de categoría, sin carrusel: solo una grilla de cards
 * simplificadas con toda la oferta académica.
 */
export function CourseHomeGrid() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {COURSES_DATA.map((course) => (
          <CourseCard key={course.id} course={course} onViewDetails={setSelectedCourse} />
        ))}
      </div>

      <CourseDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
}
