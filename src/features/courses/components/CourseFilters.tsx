"use client";

import React, { useMemo, useState } from 'react';
import type { PublicCourse } from '@/lib/api';
import { CourseCard } from './CourseCard';

export function CourseFilters({ courses }: { courses: PublicCourse[] }) {
  const [search, setSearch] = useState('');
  const normalize = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const filteredCourses = useMemo(() => {
    const query = normalize(search.trim());
    return query
      ? courses.filter((course) => normalize(course.title).includes(query))
      : courses;
  }, [courses, search]);

  return (
    <div>
      <div className="relative mb-8 max-w-md">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar curso por nombre..."
          aria-label="Buscar curso por nombre"
          className="w-full px-4 py-3 rounded-full border border-line bg-white text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
        />
      </div>

      {filteredCourses.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCourses.map((course) => (
            <CourseCard key={course.course_id} course={course} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-ink-soft font-serif bg-bg-alt rounded-2xl border border-line">
          <p>{courses.length ? 'No hay cursos que coincidan con la búsqueda.' : 'No hay cursos publicados disponibles.'}</p>
          {search && <button onClick={() => setSearch('')} className="mt-3 text-sm text-teal font-semibold hover:underline">Limpiar búsqueda</button>}
        </div>
      )}
    </div>
  );
}
