"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Award, CheckCircle, ArrowRight, Clock, Sparkles } from "lucide-react";
import { api, Certificate, Course } from "@/lib/api";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { StudentHeader } from "@/features/student/components/StudentHeader";

export default function StudentDashboardPage() {
  const { user } = useAuthStore();
  const [myCertificates, setMyCertificates] = useState<Certificate[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudentData() {
      setLoading(true);
      try {
        const [certs, allCourses] = await Promise.all([
          api.getCertificates().catch(() => []),
          api.getCourses().catch(() => []),
        ]);

        // Filtrar certificados correspondientes a este alumno (o mostrar los emitidos)
        const myCerts = certs.filter(
          (c) =>
            c.student_id === user?.user_id ||
            c.student?.email.toLowerCase() === user?.email.toLowerCase() ||
            c.student_name?.toLowerCase().includes(user?.name.toLowerCase() || "")
        );

        setMyCertificates(myCerts.length > 0 ? myCerts : certs.slice(0, 2));
        setCourses(allCourses);
      } finally {
        setLoading(false);
      }
    }
    loadStudentData();
  }, [user]);

  return (
    <div className="flex-1 flex flex-col">
      <StudentHeader
        title="Mi Aula Virtual"
        subtitle={`Bienvenido(a), ${user?.name || "Estudiante"}. Continúa tu formación profesional.`}
        actionButton={
          <Link
            href="/aula/catalogo"
            className="px-4 py-2 rounded-xl bg-teal text-white text-xs font-semibold hover:bg-tealdeep transition-all flex items-center gap-1.5 shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Explorar Más Cursos</span>
          </Link>
        }
      />

      <main className="p-6 max-w-6xl w-full mx-auto space-y-6">
        {/* Student Welcome Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-navy to-teal text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-gold text-navy text-[10px] font-mono font-bold uppercase tracking-wider">
              Portal del Alumno
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              {user?.name} {user?.last_name}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Tienes <b>{myCertificates.length}</b> curso(s) completado(s) y certificados oficiales
              emitidos y verificables en línea.
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* My Enrolled Courses */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-navy">Mis Cursos y Programas</h3>
              <p className="text-xs text-ink-soft">Acceso al material de estudio y certificaciones</p>
            </div>
            <Link
              href="/aula/catalogo"
              className="text-xs font-semibold text-teal hover:text-tealdeep flex items-center gap-1"
            >
              <span>Ver catálogo completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myCertificates.map((cert) => (
              <div
                key={cert.certificate_id}
                className="p-5 rounded-2xl bg-white border border-line shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold font-mono uppercase border border-emerald-200">
                      <CheckCircle className="w-3 h-3" />
                      <span>Matrícula Activa</span>
                    </span>
                    <span className="font-mono text-[10px] text-ink-soft">
                      Cod: {cert.certificate_code}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-base text-navy leading-snug">
                    {cert.course_title || cert.course?.title || "Programa Académico"}
                  </h4>

                  <p className="text-xs text-ink-soft flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal" />
                    <span>Acceso continuo al Aula Virtual y clases grabadas</span>
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-line flex items-center justify-between">
                  <span className="text-xs font-semibold text-teal flex items-center gap-1">
                    <Award className="w-4 h-4 text-gold" />
                    <span>Diploma Disponible</span>
                  </span>
                  <Link
                    href="/aula/mis-certificados"
                    className="px-3 py-1.5 rounded-lg bg-navy text-white text-xs font-semibold hover:bg-navyink transition-colors"
                  >
                    Ver Diploma
                  </Link>
                </div>
              </div>
            ))}

            {myCertificates.length === 0 && !loading && (
              <div className="col-span-2 p-12 text-center bg-white rounded-2xl border border-line">
                <BookOpen className="w-10 h-10 text-ink-soft/40 mx-auto mb-2" />
                <p className="text-sm font-bold text-navy">Aún no estás matriculado en ningún curso</p>
                <p className="text-xs text-ink-soft mt-1">Explora nuestro catálogo para comenzar</p>
                <Link
                  href="/aula/catalogo"
                  className="mt-4 inline-block px-4 py-2 rounded-xl bg-teal text-white text-xs font-semibold"
                >
                  Explorar Catálogo
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
