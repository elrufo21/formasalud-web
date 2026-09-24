"use client";

import React, { useState, useEffect, useMemo } from "react";
import { BookOpen, SearchX } from "lucide-react";
import { api, Course } from "@/lib/api";
import { StudentHeader } from "@/features/student/components/StudentHeader";
import { EnrollModal } from "@/features/student/components/EnrollModal";
import {
  CatalogCourseCard,
  CatalogCourseCardSkeleton,
} from "@/features/student/components/CatalogCourseCard";
import {
  CatalogFilters,
  CatalogFiltersState,
  DEFAULT_CATALOG_FILTERS,
  applyCatalogFilters,
} from "@/features/student/components/CatalogFilters";

export default function StudentCatalogPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [filters, setFilters] = useState<CatalogFiltersState>(DEFAULT_CATALOG_FILTERS);

  useEffect(() => {
    let cancelled = false;
    api
      .getCourses()
      .then((data) => {
        if (!cancelled) setCourses(data);
      })
      .catch((err) => console.error("Error loading courses:", err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredCourses = useMemo(
    () => applyCatalogFilters(courses, filters),
    [courses, filters],
  );

  return (
    <div className="flex-1 flex flex-col">
      <StudentHeader
        title="Catálogo de Cursos Disponibles"
        subtitle="Explora los diplomados y talleres de alta especialización en salud"
      />

      <main className="p-6 max-w-6xl w-full mx-auto space-y-6">
        <CatalogFilters
          filters={filters}
          onChange={setFilters}
          resultCount={filteredCourses.length}
          totalCount={courses.length}
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <CatalogCourseCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourses.map((course) => (
              <CatalogCourseCard
                key={course.course_id}
                course={course}
                onEnroll={setSelectedCourse}
              />
            ))}
          </div>
        )}

        {!loading && courses.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-line">
            <BookOpen className="w-10 h-10 text-ink-soft/40 mx-auto mb-2" />
            <p className="text-sm font-bold text-navy">No hay cursos disponibles por el momento</p>
          </div>
        )}

        {!loading && courses.length > 0 && filteredCourses.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-line">
            <SearchX className="w-10 h-10 text-ink-soft/40 mx-auto mb-2" />
            <p className="text-sm font-bold text-navy">
              No encontramos cursos con esos criterios
            </p>
            <button
              type="button"
              onClick={() => setFilters(DEFAULT_CATALOG_FILTERS)}
              className="mt-3 text-xs text-teal font-semibold hover:underline cursor-pointer"
            >
              Ver todos los cursos
            </button>
          </div>
        )}
      </main>

      <EnrollModal
        course={selectedCourse}
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
}
