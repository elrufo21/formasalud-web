"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Users, BookOpen, Award, ArrowUpRight, PlusCircle, CheckCircle2 } from "lucide-react";
import { api, User, Course, Certificate } from "@/lib/api";
import { AdminHeader } from "@/features/admin/components/AdminHeader";
import { StatCard } from "@/components/ui/StatCard";
import { UserModal } from "@/features/admin/components/UserModal";
import { CourseModal } from "@/features/admin/components/CourseModal";
import { IssueCertificateModal } from "@/features/admin/components/IssueCertificateModal";

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [u, c, certs] = await Promise.all([
        api.getUsers().catch(() => []),
        api.getCourses().catch(() => []),
        api.getCertificates().catch(() => []),
      ]);
      setUsers(u);
      setCourses(c);
      setCertificates(certs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Panel de Control General"
        subtitle="Monitoreo y administración de alumnos, cursos y certificaciones"
        actionButton={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCertModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-teal text-white text-xs font-semibold hover:bg-tealdeep transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-gold" />
              <span>Emitir Certificado</span>
            </button>
            <button
              onClick={() => setIsUserModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-navy text-white text-xs font-semibold hover:bg-navyink transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Nuevo Alumno</span>
            </button>
          </div>
        }
      />

      <main className="p-6 space-y-6 max-w-7xl w-full mx-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Alumnos y Usuarios"
            value={users.length}
            description="Estudiantes y docentes activos"
            icon={<Users className="w-5 h-5" />}
          />
          <StatCard
            title="Cursos en Catálogo"
            value={courses.length}
            description="Programas académicos publicados"
            icon={<BookOpen className="w-5 h-5" />}
          />
          <StatCard
            title="Certificados Emitidos"
            value={certificates.length}
            description="Diplomas oficiales con código QR"
            icon={<Award className="w-5 h-5 text-gold" />}
          />
        </div>

        {/* Quick Actions & Recent Tables preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Students */}
          <div className="p-5 rounded-2xl bg-white border border-line shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-navy">Alumnos Registrados</h3>
                <p className="text-xs text-ink-soft">Últimos estudiantes dados de alta</p>
              </div>
              <Link
                href="/admin/usuarios"
                className="text-xs font-semibold text-teal hover:text-tealdeep flex items-center gap-1"
              >
                <span>Ver todos</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-line">
              {users.slice(0, 4).map((u) => (
                <div key={u.user_id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-navy">{u.name} {u.last_name}</p>
                    <p className="text-ink-soft">{u.email} · DNI: {u.document_number || "-"}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-tealtint text-tealdeep font-mono text-[10px] uppercase font-bold">
                    {u.roles?.[0] || "student"}
                  </span>
                </div>
              ))}
              {users.length === 0 && !loading && (
                <p className="py-6 text-center text-xs text-ink-soft">No hay alumnos aún.</p>
              )}
            </div>
          </div>

          {/* Recent Certificates */}
          <div className="p-5 rounded-2xl bg-white border border-line shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-navy">Últimos Certificados</h3>
                <p className="text-xs text-ink-soft">Certificados con QR verificable emitidos</p>
              </div>
              <Link
                href="/admin/certificados"
                className="text-xs font-semibold text-teal hover:text-tealdeep flex items-center gap-1"
              >
                <span>Ver todos</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-line">
              {certificates.slice(0, 4).map((c) => (
                <div key={c.certificate_id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-navy">{c.student_name || c.student?.name || "Alumno"}</p>
                    <p className="text-ink-soft truncate max-w-xs">{c.course_title || c.course?.title || "Curso"}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded-md bg-goldpale/50 text-navy font-mono text-[10px] font-bold border border-gold/30">
                      {c.certificate_code}
                    </span>
                    <span className="block text-[10px] text-teal font-semibold mt-0.5">
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
              {certificates.length === 0 && !loading && (
                <p className="py-6 text-center text-xs text-ink-soft">No hay certificados emitidos aún.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSuccess={loadData}
      />
      <CourseModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        onSuccess={loadData}
      />
      <IssueCertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        onSuccess={loadData}
      />
    </div>
  );
}
