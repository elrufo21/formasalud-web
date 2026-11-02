"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  BookOpen,
  Award,
  ArrowUpRight,
  PlusCircle,
  GraduationCap,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Clock,
  Search,
} from "lucide-react";
import { api, User, Course, Certificate, TeacherProfile } from "@/lib/api";
import { AdminHeader } from "@/features/admin/components/AdminHeader";
import { UserModal } from "@/features/admin/components/UserModal";
import { IssueCertificateModal } from "@/features/admin/components/IssueCertificateModal";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export default function AdminDashboardPage() {
  const { user, role } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<TeacherProfile[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const isTeacherOnly = role === "teacher" && !user?.roles?.includes("admin");

  const loadData = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [u, c, certs, t] = await Promise.all([
        api.getUsers().catch(() => []),
        api.getCourses().catch(() => []),
        api.getCertificates().catch(() => []),
        api.getTeachers().catch(() => []),
      ]);
      setUsers(u);
      setCourses(c);
      setCertificates(certs);
      setTeachers(t);
    } catch (err: unknown) {
      setLoadError(
        err instanceof Error
          ? err.message
          : "No se pudieron obtener algunos datos del servidor. Verifica la conexión.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const todayFormatted = new Intl.DateTimeFormat("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="flex-1 flex flex-col bg-bg-alt min-h-screen">
      <AdminHeader
        title={isTeacherOnly ? "Panel del Docente" : "Panel de Control General"}
        subtitle="Monitoreo académico, alumnos matriculados y certificaciones oficiales"
        actionButton={
          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              title="Actualizar datos"
              disabled={loading}
              className="p-2 rounded-xl border border-line bg-white hover:bg-bg-alt text-ink-soft transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-teal" : ""}`} />
            </button>

            {!isTeacherOnly && (
              <>
                <button
                  onClick={() => setIsCertModalOpen(true)}
                  className="px-3 sm:px-4 py-2 rounded-xl bg-teal text-white text-xs font-semibold hover:bg-tealdeep transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-goldpale" />
                  <span className="hidden sm:inline">Emitir Diploma</span>
                  <span className="sm:hidden">Diploma</span>
                </button>

                <button
                  onClick={() => setIsUserModalOpen(true)}
                  className="px-3 sm:px-4 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navyink transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Nuevo Alumno</span>
                  <span className="sm:hidden">Alumno</span>
                </button>
              </>
            )}
          </div>
        }
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Welcome Banner Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-navy to-teal p-6 sm:p-8 text-white shadow-md">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-gold/20 text-gold border border-gold/30 text-[11px] font-mono font-bold uppercase tracking-wider">
                  {isTeacherOnly ? "DOCENCIA CLÍNICA" : "ADMINISTRACIÓN CENTRAL"}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-[11px] font-mono font-medium capitalize">
                  <Clock className="w-3 h-3 text-goldpale" />
                  {todayFormatted}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                ¡Hola, {user?.name || "Administrador"}! 👋
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {isTeacherOnly
                  ? "Revisa los diplomados que tienes asignados, registra asistencias a tus clases presenciales o virtuales y califica rúbricas de tus alumnos."
                  : "Supervisa el catálogo académico de FormaSalud, gestiona alumnos, docentes y emite diplomas oficiales con verificación QR instantánea."}
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
              <Link
                href="/admin/cursos/nuevo"
                className="px-4 py-2.5 rounded-xl bg-gold text-navy text-xs font-bold hover:bg-goldpale transition-all flex items-center gap-2 shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Crear Programa</span>
              </Link>
              <Link
                href="/aula"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs border border-white/20 transition-all flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-goldpale" />
                <span>Ver Aula Alumno</span>
              </Link>
            </div>
          </div>

          {/* Decorative ambient background blur */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-teal/30 blur-3xl pointer-events-none" />
          <div className="absolute right-40 -top-10 w-48 h-48 rounded-full bg-gold/20 blur-2xl pointer-events-none" />
        </div>

        {loadError && (
          <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50 text-amber-900 flex items-start justify-between gap-3 text-xs">
            <div className="flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Aviso de conexión:</p>
                <p>{loadError}</p>
              </div>
            </div>
            <button
              onClick={loadData}
              className="px-3 py-1 rounded-lg bg-amber-200 hover:bg-amber-300 font-semibold text-amber-900 transition-colors shrink-0"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* KPI Grid (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1: Alumnos */}
          <Link
            href="/admin/usuarios"
            className="group p-5 rounded-2xl bg-white border border-line hover:border-teal/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-ink-soft font-bold">
                  Alumnos & Usuarios
                </p>
                <h3 className="font-serif text-3xl font-extrabold text-navy mt-1 group-hover:text-teal transition-colors">
                  {loading ? (
                    <span className="inline-block w-12 h-8 bg-slate-100 rounded animate-pulse" />
                  ) : (
                    users.length
                  )}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs text-ink-soft">
              <span>Cuentas activas</span>
              <span className="text-teal font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                Gestionar <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>

          {/* KPI 2: Cursos */}
          <Link
            href="/admin/cursos"
            className="group p-5 rounded-2xl bg-white border border-line hover:border-navy/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-ink-soft font-bold">
                  Cursos & Diplomados
                </p>
                <h3 className="font-serif text-3xl font-extrabold text-navy mt-1 group-hover:text-teal transition-colors">
                  {loading ? (
                    <span className="inline-block w-12 h-8 bg-slate-100 rounded animate-pulse" />
                  ) : (
                    courses.length
                  )}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-navy/10 text-navy flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs text-ink-soft">
              <span>Programas en catálogo</span>
              <span className="text-teal font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                Ver catálogo <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>

          {/* KPI 3: Docentes */}
          <Link
            href="/admin/docentes"
            className="group p-5 rounded-2xl bg-white border border-line hover:border-gold/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-ink-soft font-bold">
                  Plana Docente
                </p>
                <h3 className="font-serif text-3xl font-extrabold text-navy mt-1 group-hover:text-gold transition-colors">
                  {loading ? (
                    <span className="inline-block w-12 h-8 bg-slate-100 rounded animate-pulse" />
                  ) : (
                    teachers.length
                  )}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs text-ink-soft">
              <span>Especialistas clínicos</span>
              <span className="text-teal font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                Ver docentes <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>

          {/* KPI 4: Certificados */}
          <Link
            href="/admin/certificados"
            className="group p-5 rounded-2xl bg-white border border-line hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-ink-soft font-bold">
                  Certificados QR
                </p>
                <h3 className="font-serif text-3xl font-extrabold text-navy mt-1 group-hover:text-emerald-600 transition-colors">
                  {loading ? (
                    <span className="inline-block w-12 h-8 bg-slate-100 rounded animate-pulse" />
                  ) : (
                    certificates.length
                  )}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs text-ink-soft">
              <span>Diplomas emitidos</span>
              <span className="text-teal font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                Ver emisiones <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        </div>

        {/* Quick Operations Bar */}
        <div className="p-5 rounded-2xl bg-white border border-line shadow-2xs">
          <p className="text-[11px] font-mono uppercase tracking-widest text-ink-soft font-bold mb-3">
            Acciones Frecuentes de Gestión
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <Link
              href="/admin/cursos/nuevo"
              className="flex items-center gap-2.5 p-3 rounded-xl border border-line bg-bg-alt hover:bg-tealtint hover:border-teal/30 transition-all text-xs font-semibold text-navy group"
            >
              <div className="w-7 h-7 rounded-lg bg-teal text-white flex items-center justify-center shrink-0">
                <PlusCircle className="w-4 h-4" />
              </div>
              <span className="truncate">Nuevo Programa</span>
            </Link>

            <button
              onClick={() => setIsCertModalOpen(true)}
              className="flex items-center gap-2.5 p-3 rounded-xl border border-line bg-bg-alt hover:bg-gold/10 hover:border-gold/30 transition-all text-xs font-semibold text-navy group text-left cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-gold text-navy flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <span className="truncate">Emitir Diploma</span>
            </button>

            <button
              onClick={() => setIsUserModalOpen(true)}
              className="flex items-center gap-2.5 p-3 rounded-xl border border-line bg-bg-alt hover:bg-tealtint hover:border-teal/30 transition-all text-xs font-semibold text-navy group text-left cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-navy text-white flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <span className="truncate">Nuevo Alumno</span>
            </button>

            <Link
              href="/admin/docentes/nuevo"
              className="flex items-center gap-2.5 p-3 rounded-xl border border-line bg-bg-alt hover:bg-tealtint hover:border-teal/30 transition-all text-xs font-semibold text-navy group"
            >
              <div className="w-7 h-7 rounded-lg bg-tealdeep text-white flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="truncate">Alta Docente</span>
            </Link>

            <Link
              href="/aula"
              className="flex items-center gap-2.5 p-3 rounded-xl border border-line bg-bg-alt hover:bg-gold/10 hover:border-gold/30 transition-all text-xs font-semibold text-navy group"
            >
              <div className="w-7 h-7 rounded-lg bg-gold text-navy flex items-center justify-center shrink-0">
                <ExternalLink className="w-4 h-4" />
              </div>
              <span className="truncate">Aula Alumno</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity Sections (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column 1: Alumnos Recientes */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-line shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-navy">
                  Alumnos Registrados
                </h3>
                <p className="text-xs text-ink-soft">
                  Estudiantes dados de alta en el sistema
                </p>
              </div>
              <Link
                href="/admin/usuarios"
                className="text-xs font-semibold text-teal hover:text-tealdeep flex items-center gap-1 group"
              >
                <span>Ver todos ({users.length})</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <div className="divide-y divide-line/70">
              {users.slice(0, 5).map((u) => (
                <div
                  key={u.user_id}
                  className="py-3 flex items-center justify-between gap-3 text-xs hover:bg-bg-alt/50 px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-teal/15 text-teal flex items-center justify-center font-bold text-xs shrink-0">
                      {u.name?.charAt(0) || "U"}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-navy truncate">
                        {u.name} {u.last_name}
                      </p>
                      <p className="text-ink-soft truncate text-[11px]">
                        {u.email} {u.document_number ? `· DNI: ${u.document_number}` : ""}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-tealtint text-tealdeep font-mono text-[10px] uppercase font-bold shrink-0">
                    {u.roles?.[0] || "Alumno"}
                  </span>
                </div>
              ))}

              {users.length === 0 && !loading && (
                <div className="py-8 text-center space-y-2">
                  <Users className="w-8 h-8 text-ink-soft/40 mx-auto" />
                  <p className="text-xs text-ink-soft">No hay alumnos registrados aún.</p>
                  <button
                    onClick={() => setIsUserModalOpen(true)}
                    className="text-xs font-semibold text-teal hover:underline"
                  >
                    + Registrar el primer alumno
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Últimos Certificados */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-line shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-navy">
                  Últimos Certificados Oficiales
                </h3>
                <p className="text-xs text-ink-soft">
                  Diplomas con código QR y verificación pública
                </p>
              </div>
              <Link
                href="/admin/certificados"
                className="text-xs font-semibold text-teal hover:text-tealdeep flex items-center gap-1 group"
              >
                <span>Ver todos ({certificates.length})</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <div className="divide-y divide-line/70">
              {certificates.slice(0, 5).map((c) => (
                <div
                  key={c.certificate_id}
                  className="py-3 flex items-center justify-between gap-3 text-xs hover:bg-bg-alt/50 px-2 rounded-xl transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-navy truncate">
                      {c.student_name || c.student?.name || "Estudiante"}
                    </p>
                    <p className="text-ink-soft truncate text-[11px]">
                      {c.course_title || c.course?.title || "Programa Académico"}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-2 py-0.5 rounded-md bg-gold/15 text-navy font-mono text-[10px] font-bold border border-gold/30 block">
                      {c.certificate_code}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Válido
                    </span>
                  </div>
                </div>
              ))}

              {certificates.length === 0 && !loading && (
                <div className="py-8 text-center space-y-2">
                  <Award className="w-8 h-8 text-ink-soft/40 mx-auto" />
                  <p className="text-xs text-ink-soft">No hay diplomas emitidos aún.</p>
                  <button
                    onClick={() => setIsCertModalOpen(true)}
                    className="text-xs font-semibold text-teal hover:underline"
                  >
                    + Emitir el primer certificado
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Featured Courses Overview */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-line shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-navy">
                Cursos y Diplomados en Catálogo
              </h3>
              <p className="text-xs text-ink-soft">
                Programas activos ofertados a los estudiantes
              </p>
            </div>
            <Link
              href="/admin/cursos"
              className="text-xs font-semibold text-teal hover:text-tealdeep flex items-center gap-1 group"
            >
              <span>Gestionar todos ({courses.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.slice(0, 3).map((course) => (
              <div
                key={course.course_id}
                className="p-4 rounded-xl border border-line bg-bg-alt/40 hover:bg-white hover:border-teal/40 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy/10 text-navy font-bold uppercase">
                      {course.delivery_mode || "Virtual"}
                    </span>
                    <span className="text-xs font-mono font-bold text-teal">
                      {Number(course.price) === 0 ? "Gratis" : `S/ ${Number(course.price).toFixed(2)}`}
                    </span>
                  </div>
                  <h4 className="font-bold text-navy text-xs sm:text-sm line-clamp-2 leading-snug">
                    {course.title}
                  </h4>
                  <p className="text-[11px] text-ink-soft font-mono mt-1">
                    /{course.slug}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-[11px]">
                  <span className="text-ink-soft">
                    {course.certificate_included ? "Diploma incluido" : "Certificado separado"}
                  </span>
                  <Link
                    href={`/admin/cursos/${course.course_id}/editar`}
                    className="text-teal font-semibold hover:underline"
                  >
                    Editar →
                  </Link>
                </div>
              </div>
            ))}

            {courses.length === 0 && !loading && (
              <div className="col-span-full py-8 text-center text-xs text-ink-soft">
                No hay cursos registrados. Haz clic en "Crear Programa" para comenzar.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
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
