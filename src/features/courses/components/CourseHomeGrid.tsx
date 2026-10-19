"use client";

import React from 'react';
import type { PublicCourse } from '@/lib/api';
import { CourseCard } from './CourseCard';
import { Carousel } from '@/components/ui/carousel/Carousel';

export function CourseHomeGrid({ courses }: { courses: PublicCourse[] }) {
  if (!courses.length) {
    return <p className="py-8 text-sm text-ink-soft">Los cursos publicados aparecerán aquí.</p>;
  }

  return (
    <div>
      <Carousel
        options={{ loop: courses.length > 1 }}
        slideClassName="flex-[0_0_88%] xs:flex-[0_0_80%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
        className="px-1"
      >
        {courses.map((course) => (
          <CourseCard key={course.course_id} course={course} />
        ))}
      </Carousel>
    </div>
  );
}
