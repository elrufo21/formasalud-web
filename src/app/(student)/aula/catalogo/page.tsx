"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, CheckCircle, Tag, ArrowRight } from "lucide-react";
import { api, Course } from "@/lib/api";
import { StudentHeader } from "@/features/student/components/StudentHeader";
import { EnrollModal } from "@/features/student/components/EnrollModal";

export default function StudentCatalogPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await api.getCourses();
      setCourses(data);
    } catch (err) {
      console.error("Error loading courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <StudentHeader
        title="Catálogo de Cursos Disponibles"
        subtitle="Explora los diplomados y talleres de alta especialización en salud"
      />

      <main className="p-6 max-w-6xl w-full mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => {
            const price = Number(course.price);
            const certIncluded = course.certificate_included;
            const certPrice = Number(course.certificate_price);

            return (
              <div
                key={course.course_id}
                className="rounded-2xl bg-white border border-line shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink-soft bg-bg-alt px-2 py-0.5 rounded-md font-bold">
                      FormaSalud
                    </span>
                    {certIncluded ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                        <CheckCircle className="w-3 h-3" />
                        <span>Cert. Incluido</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-semibold">
                        <Tag className="w-3 h-3" />
                        <span>Cert. Sep. (S/ {certPrice ? certPrice.toFixed(2) : "49.00"})</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-base text-navy leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-ink-soft line-clamp-2">
                    {course.short_description || "Programa con certificación y simulación clínica avanzada."}
                  </p>
                </div>

                <div className="p-5 bg-bg-alt/50 border-t border-line flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-ink-soft block leading-none">Inversión:</span>
                    <span className="font-mono font-bold text-sm text-navy mt-0.5 block">
                      {price === 0 ? "Gratuito" : `S/ ${price.toFixed(2)}`}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="px-4 py-2 rounded-xl bg-teal text-white text-xs font-semibold hover:bg-tealdeep transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <span>Inscribirme</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {courses.length === 0 && !loading && (
          <div className="p-12 text-center bg-white rounded-2xl border border-line">
            <BookOpen className="w-10 h-10 text-ink-soft/40 mx-auto mb-2" />
            <p className="text-sm font-bold text-navy">No hay cursos disponibles por el momento</p>
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
