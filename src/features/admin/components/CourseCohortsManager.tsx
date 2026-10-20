"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Award,
  Calendar,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  MapPin,
  Pencil,
  Plus,
  RotateCcw,
  ShieldAlert,
  UserCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import {
  api,
  CourseCohortDetail,
  CourseCohortSession,
  CourseCohortSummary,
  CourseEnrollmentItem,
  EnrollmentAssessmentGradeItem,
  SessionAttendanceItem,
} from "@/lib/api";
import { Input } from "@/components/ui/Input";

interface CourseCohortsManagerProps {
  courseId: number;
  teachers: {
    value: number;
    label: string;
    profession: string | null;
    specialty: string | null;
  }[];
}

const cohortStatusLabels: Record<string, { label: string; badge: string }> = {
  planned: {
    label: "Planificada",
    badge: "bg-slate-100 text-slate-700 border-slate-200",
  },
  enrolling: {
    label: "Inscripciones Abiertas",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  in_progress: {
    label: "En Curso",
    badge: "bg-sky-50 text-sky-800 border-sky-200",
  },
  completed: {
    label: "Finalizada",
    badge: "bg-navy/10 text-navy border-navy/20",
  },
  cancelled: {
    label: "Cancelada",
    badge: "bg-red-50 text-red-700 border-red-200",
  },
};

const sessionStatusLabels: Record<string, string> = {
  scheduled: "Programada",
  in_progress: "En curso",
  completed: "Dictada / Completada",
  rescheduled: "Reprogramada",
  cancelled: "Cancelada",
};

const academicStatusLabels: Record<string, { label: string; badge: string }> = {
  in_progress: {
    label: "En curso",
    badge: "bg-sky-50 text-sky-800 border-sky-200",
  },
  approved: {
    label: "Aprobado (Apto Cert.)",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  failed_eligible_participation: {
    label: "Solo Constancia Participación",
    badge: "bg-amber-50 text-amber-800 border-amber-200",
  },
  failed: {
    label: "Desaprobado",
    badge: "bg-red-50 text-red-700 border-red-200",
  },
  withdrawn: {
    label: "Retirado",
    badge: "bg-slate-100 text-slate-600 border-slate-200",
  },
};

function formatDateTimeInput(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function formatReadableDate(iso?: string | null) {
  if (!iso) return "Fecha por definir";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatReadableDateTime(iso?: string | null) {
  if (!iso) return "Horario por definir";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("es-PE", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function CourseCohortsManager({
  courseId,
  teachers,
}: CourseCohortsManagerProps) {
  const [cohorts, setCohorts] = useState<CourseCohortSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Promoción seleccionada para ver calendario de sesiones y matriculados
  const [selectedCohort, setSelectedCohort] =
    useState<CourseCohortDetail | null>(null);
  const [activeTab, setActiveTab] = useState<"sessions" | "students">(
    "sessions",
  );
  const [enrollments, setEnrollments] = useState<CourseEnrollmentItem[]>([]);
  const [userCombo, setUserCombo] = useState<
    { value: number; label: string }[]
  >([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");

  // Formulario de creación / edición de promoción
  const [cohortForm, setCohortForm] = useState<{
    cohort_code: string;
    name: string;
    delivery_mode: string;
    start_date: string;
    end_date: string;
    schedule_summary: string;
    venue_name: string;
    max_capacity: string;
    status: string;
  } | null>(null);

  // Formulario de edición de una sesión del calendario
  const [sessionForm, setSessionForm] = useState<{
    cohort_session_id: number;
    session_number: number;
    title: string;
    teacher_user_id: string;
    starts_at: string;
    room_or_link: string;
    status: string;
  } | null>(null);

  // Panel de Asistencia y Recuperación de una sesión
  const [attendanceSession, setAttendanceSession] =
    useState<CourseCohortSession | null>(null);
  const [attendanceList, setAttendanceList] = useState<SessionAttendanceItem[]>(
    [],
  );

  // Panel de Libreta de Calificaciones de un alumno matriculado
  const [gradingEnrollment, setGradingEnrollment] =
    useState<CourseEnrollmentItem | null>(null);
  const [gradeItems, setGradeItems] = useState<EnrollmentAssessmentGradeItem[]>(
    [],
  );
  const [scoreDrafts, setScoreDrafts] = useState<Record<number, string>>({});
  const [compHoursDraft, setCompHoursDraft] = useState<string>("0");

  const loadCohorts = useCallback(async () => {
    setLoading(true);
    try {
      const list = await api.getCourseCohorts(courseId);
      setCohorts(Array.isArray(list) ? list : []);
    } catch {
      setCohorts([]);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    loadCohorts();
  }, [loadCohorts]);

  const openCohortDetail = async (cohortId: number) => {
    setBusy(true);
    setFeedback(null);
    try {
      const [detail, enrolledList] = await Promise.all([
        api.getCourseCohortDetail(courseId, cohortId),
        api.getCourseEnrollments(courseId, cohortId),
      ]);
      setSelectedCohort(detail);
      setEnrollments(Array.isArray(enrolledList) ? enrolledList : []);
      if (userCombo.length === 0) {
        api
          .getUserCombo()
          .then((users) => setUserCombo(Array.isArray(users) ? users : []))
          .catch(() => {});
      }
    } catch (err) {
      setFeedback({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "No se pudo cargar el detalle de la promoción",
      });
    } finally {
      setBusy(false);
    }
  };

  const openNewCohortForm = () => {
    const nextIdx = cohorts.length + 1;
    setCohortForm({
      cohort_code: `PROM-2026-${nextIdx}`,
      name: `Promoción 2026-${nextIdx}`,
      delivery_mode: "in_person",
      start_date: "",
      end_date: "",
      schedule_summary: "Sábados 09:00 a 12:00",
      venue_name: "Sede Principal FormaSalud",
      max_capacity: "25",
      status: "enrolling",
    });
  };

  const openEditCohortForm = (cohort: CourseCohortSummary) => {
    setCohortForm({
      cohort_code: cohort.cohort_code,
      name: cohort.name,
      delivery_mode: cohort.delivery_mode || "in_person",
      start_date: cohort.start_date ? cohort.start_date.slice(0, 10) : "",
      end_date: cohort.end_date ? cohort.end_date.slice(0, 10) : "",
      schedule_summary: cohort.schedule_summary ?? "",
      venue_name: cohort.venue_name ?? "",
      max_capacity:
        cohort.max_capacity != null ? String(cohort.max_capacity) : "",
      status: cohort.status || "enrolling",
    });
  };

  const handleSaveCohort = async () => {
    if (
      !cohortForm ||
      !cohortForm.cohort_code.trim() ||
      !cohortForm.name.trim()
    ) {
      return;
    }
    setBusy(true);
    setFeedback(null);
    try {
      const saved = await api.saveCourseCohort(courseId, {
        cohort_code: cohortForm.cohort_code.trim().toUpperCase(),
        name: cohortForm.name.trim(),
        delivery_mode: cohortForm.delivery_mode,
        start_date: cohortForm.start_date || null,
        end_date: cohortForm.end_date || null,
        schedule_summary: cohortForm.schedule_summary.trim() || null,
        venue_name: cohortForm.venue_name.trim() || null,
        max_capacity: cohortForm.max_capacity
          ? Number(cohortForm.max_capacity)
          : null,
        status: cohortForm.status,
      });
      setCohortForm(null);
      await loadCohorts();
      if (saved?.cohort_id) {
        await openCohortDetail(saved.cohort_id);
      }
      setFeedback({
        type: "success",
        text: "Promoción guardada y calendario de sesiones generado automáticamente.",
      });
    } catch (err) {
      setFeedback({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "No se pudo guardar la promoción",
      });
    } finally {
      setBusy(false);
    }
  };

  const openEditSession = (session: CourseCohortSession) => {
    setAttendanceSession(null);
    setSessionForm({
      cohort_session_id: session.cohort_session_id,
      session_number: session.session_number,
      title: session.title,
      teacher_user_id: session.teacher_user_id
        ? String(session.teacher_user_id)
        : "",
      starts_at: formatDateTimeInput(session.starts_at),
      room_or_link: session.room_or_link ?? "",
      status: session.status || "scheduled",
    });
  };

  const handleSaveSession = async () => {
    if (!sessionForm || !selectedCohort) return;
    setBusy(true);
    setFeedback(null);
    try {
      await api.updateCohortSession(courseId, sessionForm.cohort_session_id, {
        teacher_user_id: sessionForm.teacher_user_id
          ? Number(sessionForm.teacher_user_id)
          : null,
        starts_at: sessionForm.starts_at
          ? new Date(sessionForm.starts_at).toISOString()
          : undefined,
        room_or_link: sessionForm.room_or_link.trim() || null,
        status: sessionForm.status,
      });
      setSessionForm(null);
      await openCohortDetail(selectedCohort.cohort_id);
      setFeedback({
        type: "success",
        text: `Sesión ${sessionForm.session_number} actualizada.`,
      });
    } catch (err) {
      setFeedback({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "No se pudo actualizar la sesión",
      });
    } finally {
      setBusy(false);
    }
  };

  // --- Asistencia y Recuperación de Prácticas ---
  const openSessionAttendance = async (session: CourseCohortSession) => {
    setSessionForm(null);
    setBusy(true);
    setFeedback(null);
    try {
      const list = await api.getSessionAttendance(
        courseId,
        session.cohort_session_id,
      );
      setAttendanceSession(session);
      setAttendanceList(Array.isArray(list) ? list : []);
    } catch (err) {
      setFeedback({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "No se pudo cargar la lista de asistencia",
      });
    } finally {
      setBusy(false);
    }
  };

  const handleSaveAttendance = async () => {
    if (!attendanceSession || !selectedCohort) return;
    setBusy(true);
    setFeedback(null);
    try {
      await api.recordSessionAttendance(
        courseId,
        attendanceSession.cohort_session_id,
        attendanceList.map((item) => ({
          enrollment_id: item.enrollment_id,
          status: (item.status as "present" | "late" | "absent" | "excused") || "present",
          notes: item.notes ?? undefined,
        })),
      );
      const updatedAttendance = await api.getSessionAttendance(
        courseId,
        attendanceSession.cohort_session_id,
      );
      setAttendanceList(
        Array.isArray(updatedAttendance) ? updatedAttendance : [],
      );
      await openCohortDetail(selectedCohort.cohort_id);
      setFeedback({
        type: "success",
        text: `Asistencia de la Sesión ${attendanceSession.session_number} registrada y promedios actualizados.`,
      });
    } catch (err) {
      setFeedback({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "No se pudo guardar la asistencia",
      });
    } finally {
      setBusy(false);
    }
  };

  const handleRecordMakeup = async (item: SessionAttendanceItem) => {
    if (!attendanceSession || !selectedCohort) return;
    const notes = window.prompt(
      `Confirmar recuperación de práctica para ${item.student_name} en "${attendanceSession.title}".\nIngresa una observación opcional:`,
      "Práctica recuperada y convalidada satisfactoriamente",
    );
    if (notes === null) return;
    setBusy(true);
    setFeedback(null);
    try {
      await api.recordSessionMakeup(
        courseId,
        attendanceSession.cohort_session_id,
        {
          enrollment_id: item.enrollment_id,
          makeup_notes: notes.trim() || undefined,
        },
      );
      const updatedAttendance = await api.getSessionAttendance(
        courseId,
        attendanceSession.cohort_session_id,
      );
      setAttendanceList(
        Array.isArray(updatedAttendance) ? updatedAttendance : [],
      );
      await openCohortDetail(selectedCohort.cohort_id);
      setFeedback({
        type: "success",
        text: `Recuperación de práctica registrada para ${item.student_name}. Se convalidó la asistencia.`,
      });
    } catch (err) {
      setFeedback({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "No se pudo registrar la recuperación",
      });
    } finally {
      setBusy(false);
    }
  };

  // --- Libreta de Calificaciones y Competencias Críticas ---
  const openStudentGrades = async (enr: CourseEnrollmentItem) => {
    setBusy(true);
    setFeedback(null);
    try {
      const items = await api.getEnrollmentAssessments(
        courseId,
        enr.enrollment_id,
      );
      const list = Array.isArray(items) ? items : [];
      setGradingEnrollment(enr);
      setGradeItems(list);
      const drafts: Record<number, string> = {};
      for (const it of list) {
        drafts[it.assessment_id] = it.score != null ? String(it.score) : "";
      }
      setScoreDrafts(drafts);
      setCompHoursDraft(String(enr.complementary_hours_done ?? 0));
    } catch (err) {
      setFeedback({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "No se pudo cargar la libreta de calificaciones",
      });
    } finally {
      setBusy(false);
    }
  };

  const handleSaveSingleGrade = async (item: EnrollmentAssessmentGradeItem) => {
    if (!gradingEnrollment || !selectedCohort) return;
    const rawScore = scoreDrafts[item.assessment_id]?.trim();
    if (rawScore === "" || Number.isNaN(Number(rawScore))) return;
    setBusy(true);
    setFeedback(null);
    try {
      const numericScore = Number(rawScore);
      const minPass = Number(item.min_passing_score ?? 14);
      await api.gradeEnrollmentAssessment(
        courseId,
        gradingEnrollment.enrollment_id,
        {
          assessment_id: item.assessment_id,
          score: numericScore,
          passed: numericScore >= minPass,
        },
      );
      const [updatedGrades, enrolledList] = await Promise.all([
        api.getEnrollmentAssessments(courseId, gradingEnrollment.enrollment_id),
        api.getCourseEnrollments(courseId, selectedCohort.cohort_id),
      ]);
      setGradeItems(Array.isArray(updatedGrades) ? updatedGrades : []);
      const updatedList = Array.isArray(enrolledList) ? enrolledList : [];
      setEnrollments(updatedList);
      const refreshedStudent = updatedList.find(
        (e) => e.enrollment_id === gradingEnrollment.enrollment_id,
      );
      if (refreshedStudent) setGradingEnrollment(refreshedStudent);
      setFeedback({
        type: "success",
        text: `Calificación guardada en "${item.title}". Promedio y estado académico recalculados.`,
      });
    } catch (err) {
      setFeedback({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "No se pudo guardar la calificación",
      });
    } finally {
      setBusy(false);
    }
  };

  const handleSaveComplementaryHours = async () => {
    if (!gradingEnrollment || !selectedCohort) return;
    setBusy(true);
    setFeedback(null);
    try {
      await api.recalculateEnrollmentProgress(
        courseId,
        gradingEnrollment.enrollment_id,
        {
          complementary_hours_done: Number(compHoursDraft || 0),
        },
      );
      const enrolledList = await api.getCourseEnrollments(
        courseId,
        selectedCohort.cohort_id,
      );
      const updatedList = Array.isArray(enrolledList) ? enrolledList : [];
      setEnrollments(updatedList);
      const refreshedStudent = updatedList.find(
        (e) => e.enrollment_id === gradingEnrollment.enrollment_id,
      );
      if (refreshedStudent) setGradingEnrollment(refreshedStudent);
      setFeedback({
        type: "success",
        text: "Horas complementarias acreditadas y estado académico recalculado.",
      });
    } catch (err) {
      setFeedback({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "No se pudieron actualizar las horas complementarias",
      });
    } finally {
      setBusy(false);
    }
  };

  const handleEnrollStudent = async () => {
    if (!selectedCohort || !selectedStudentId) return;
    setBusy(true);
    setFeedback(null);
    try {
      await api.enrollStudentInCourse(courseId, {
        student_id: Number(selectedStudentId),
        cohort_id: selectedCohort.cohort_id,
        status: "active",
      });
      setSelectedStudentId("");
      await Promise.all([
        loadCohorts(),
        openCohortDetail(selectedCohort.cohort_id),
      ]);
      setFeedback({
        type: "success",
        text: "Estudiante matriculado exitosamente en la promoción.",
      });
    } catch (err) {
      setFeedback({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "No se pudo matricular al estudiante",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="rounded-2xl border border-line bg-white p-5 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-4">
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-teal">
            Operación Académica (Cohorts, Asistencia y Calificaciones)
          </p>
          <h2 className="font-serif text-lg font-bold text-navy">
            Promociones, Calendario de Sesiones, Asistencia y Evaluaciones
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Gestiona promociones, pasa lista en cada sesión, convalida recuperaciones de prácticas y registra calificaciones ponderadas.
          </p>
        </div>
        <button
          type="button"
          onClick={openNewCohortForm}
          className="inline-flex items-center gap-1.5 rounded-xl bg-teal px-3.5 py-2 text-xs font-semibold text-white hover:bg-tealdeep cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" /> Nueva Promoción
        </button>
      </div>

      {feedback && (
        <div
          className={`flex items-center justify-between rounded-xl border px-4 py-3 text-xs font-semibold ${
            feedback.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          <span>{feedback.text}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="ml-2 opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* FORMULARIO CREAR / EDITAR PROMOCIÓN */}
      {cohortForm && (
        <div className="rounded-xl border-2 border-teal/40 bg-tealtint/30 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy flex items-center gap-2">
              <Calendar className="h-4 w-4 text-teal" />
              Configurar Promoción / Edición del Curso
            </h3>
            <button
              type="button"
              onClick={() => setCohortForm(null)}
              className="rounded-lg p-1 text-ink-soft hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              label="Código de Promoción"
              placeholder="Ej. PAUX-2026-I"
              value={cohortForm.cohort_code}
              onChange={(e) =>
                setCohortForm({ ...cohortForm, cohort_code: e.target.value })
              }
            />
            <div className="sm:col-span-2">
              <Input
                label="Nombre de la Promoción"
                placeholder="Ej. Promoción 2026-I · Turno Sábados Mañana"
                value={cohortForm.name}
                onChange={(e) =>
                  setCohortForm({ ...cohortForm, name: e.target.value })
                }
              />
            </div>
            <Input
              label="Fecha de Inicio (auto-agenda sesiones)"
              type="date"
              value={cohortForm.start_date}
              onChange={(e) =>
                setCohortForm({ ...cohortForm, start_date: e.target.value })
              }
            />
            <Input
              label="Fecha de Fin (opcional)"
              type="date"
              value={cohortForm.end_date}
              onChange={(e) =>
                setCohortForm({ ...cohortForm, end_date: e.target.value })
              }
            />
            <Input
              label="Vacantes Máximas"
              type="number"
              min="1"
              value={cohortForm.max_capacity}
              onChange={(e) =>
                setCohortForm({ ...cohortForm, max_capacity: e.target.value })
              }
            />
            <Input
              label="Horario Referencial"
              placeholder="Ej. Sábados de 09:00 a 12:00"
              value={cohortForm.schedule_summary}
              onChange={(e) =>
                setCohortForm({
                  ...cohortForm,
                  schedule_summary: e.target.value,
                })
              }
            />
            <Input
              label="Sede / Aula / Enlace"
              placeholder="Ej. Auditorio Taller FormaSalud - Piso 2"
              value={cohortForm.venue_name}
              onChange={(e) =>
                setCohortForm({ ...cohortForm, venue_name: e.target.value })
              }
            />
            <label className="space-y-1.5">
              <span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Estado de la Promoción
              </span>
              <select
                value={cohortForm.status}
                onChange={(e) =>
                  setCohortForm({ ...cohortForm, status: e.target.value })
                }
                className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm"
              >
                <option value="planned">Planificada</option>
                <option value="enrolling">Inscripciones Abiertas</option>
                <option value="in_progress">En Curso</option>
                <option value="completed">Finalizada</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setCohortForm(null)}
              className="rounded-lg border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink-soft"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={
                busy ||
                !cohortForm.cohort_code.trim() ||
                !cohortForm.name.trim()
              }
              onClick={handleSaveCohort}
              className="rounded-lg bg-teal px-4 py-2 text-xs font-semibold text-white hover:bg-tealdeep disabled:opacity-50"
            >
              {busy ? "Guardando…" : "Guardar Promoción y Generar Sesiones"}
            </button>
          </div>
        </div>
      )}

      {/* LISTA DE PROMOCIONES DEL CURSO */}
      {loading ? (
        <p className="text-xs text-ink-soft">Cargando promociones…</p>
      ) : cohorts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-ink-soft">
          No hay promociones abiertas para este curso. Haz clic en{" "}
          <b>Nueva Promoción</b> para programar fechas y habilitar matrículas por grupo.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {cohorts.map((cohort) => {
            const st = cohortStatusLabels[cohort.status] ?? {
              label: cohort.status,
              badge: "bg-bg-alt text-ink border-line",
            };
            const isSelected = selectedCohort?.cohort_id === cohort.cohort_id;
            return (
              <div
                key={cohort.cohort_id}
                className={`rounded-xl border p-4 transition-all space-y-3 ${
                  isSelected
                    ? "border-teal bg-tealtint/20 shadow-xs"
                    : "border-line bg-bg-alt/40 hover:border-teal/40"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[11px] font-bold text-teal">
                      {cohort.cohort_code}
                    </span>
                    <h3 className="text-sm font-bold text-navy">
                      {cohort.name}
                    </h3>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${st.badge}`}
                  >
                    {st.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-ink-soft">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-teal shrink-0" />
                    <span>Inicio: {formatReadableDate(cohort.start_date)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-teal shrink-0" />
                    <span>
                      Matriculados: <b>{cohort.enrolled_count}</b>
                      {cohort.max_capacity ? ` / ${cohort.max_capacity}` : ""}
                    </span>
                  </div>
                  {cohort.schedule_summary && (
                    <div className="col-span-2 flex items-center gap-1.5">
                      <CalendarClock className="h-3.5 w-3.5 text-teal shrink-0" />
                      <span className="truncate">{cohort.schedule_summary}</span>
                    </div>
                  )}
                  {cohort.venue_name && (
                    <div className="col-span-2 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-teal shrink-0" />
                      <span className="truncate">{cohort.venue_name}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-line">
                  <button
                    type="button"
                    onClick={() => openEditCohortForm(cohort)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-ink-soft hover:text-navy cursor-pointer"
                  >
                    <Pencil className="h-3 w-3" /> Editar datos
                  </button>
                  <button
                    type="button"
                    onClick={() => openCohortDetail(cohort.cohort_id)}
                    className="rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-navyink cursor-pointer"
                  >
                    {isSelected
                      ? "Viendo Promoción"
                      : "Gestionar Sesiones y Alumnos"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETALLE DE PROMOCIÓN SELECCIONADA: SESIONES, ASISTENCIA Y NOTAS */}
      {selectedCohort && (
        <div className="rounded-xl border border-teal/40 bg-bg-alt/40 p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase text-teal">
                Promoción Seleccionada · {selectedCohort.cohort_code}
              </span>
              <h3 className="text-base font-bold text-navy">
                {selectedCohort.name}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("sessions");
                  setGradingEnrollment(null);
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                  activeTab === "sessions"
                    ? "bg-teal text-white"
                    : "bg-white text-ink-soft border border-line"
                }`}
              >
                Sesiones y Asistencia ({selectedCohort.sessions?.length ?? 0})
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("students");
                  setAttendanceSession(null);
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                  activeTab === "students"
                    ? "bg-teal text-white"
                    : "bg-white text-ink-soft border border-line"
                }`}
              >
                Alumnos y Calificaciones ({enrollments.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCohort(null);
                  setAttendanceSession(null);
                  setGradingEnrollment(null);
                }}
                className="rounded-lg border border-line bg-white p-1.5 text-ink-soft hover:text-navy"
                title="Cerrar detalle"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {activeTab === "sessions" && (
            <div className="space-y-4">
              {/* PANEL DE TOMA DE ASISTENCIA Y RECUPERACIÓN DE PRÁCTICA */}
              {attendanceSession && (
                <div className="rounded-xl border-2 border-teal bg-white p-4 space-y-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                    <div>
                      <span className="font-mono text-[11px] font-bold uppercase text-teal">
                        Control de Asistencia · Sesión{" "}
                        {attendanceSession.session_number}
                      </span>
                      <h4 className="text-sm font-bold text-navy">
                        {attendanceSession.title}
                      </h4>
                      <p className="text-xs text-ink-soft">
                        {attendanceSession.is_mandatory_practice
                          ? "Sesión con Práctica Obligatoria: las inasistencias generan requerimiento de recuperación."
                          : "Sesión teórica regular."}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAttendanceSession(null)}
                      className="rounded-lg p-1 text-ink-soft hover:bg-bg-alt"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {attendanceList.length === 0 ? (
                    <p className="text-xs text-ink-soft py-2">
                      No hay estudiantes matriculados en esta promoción para pasar lista. Matricula alumnos en la pestaña &ldquo;Alumnos y Calificaciones&rdquo;.
                    </p>
                  ) : (
                    <>
                      <div className="overflow-x-auto rounded-lg border border-line">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-bg-alt text-[11px] uppercase text-ink-soft border-b border-line">
                            <tr>
                              <th className="px-3 py-2">Estudiante</th>
                              <th className="px-3 py-2">Estado de Asistencia</th>
                              <th className="px-3 py-2">Observación</th>
                              <th className="px-3 py-2">
                                Recuperación de Práctica
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-line">
                            {attendanceList.map((row, idx) => (
                              <tr key={row.enrollment_id}>
                                <td className="px-3 py-2">
                                  <p className="font-bold text-navy">
                                    {row.student_name}
                                  </p>
                                  <p className="text-[11px] text-ink-soft">
                                    {row.document_number || `#${row.student_id}`}
                                  </p>
                                </td>
                                <td className="px-3 py-2">
                                  <select
                                    value={row.status}
                                    onChange={(e) =>
                                      setAttendanceList((current) =>
                                        current.map((it, i) =>
                                          i === idx
                                            ? { ...it, status: e.target.value }
                                            : it,
                                        ),
                                      )
                                    }
                                    className="rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-semibold"
                                  >
                                    <option value="present">Presente</option>
                                    <option value="late">Tardanza</option>
                                    <option value="absent">Falta</option>
                                    <option value="excused">
                                      Falta Justificada
                                    </option>
                                  </select>
                                </td>
                                <td className="px-3 py-2">
                                  <input
                                    type="text"
                                    placeholder="Nota opcional…"
                                    value={row.notes ?? ""}
                                    onChange={(e) =>
                                      setAttendanceList((current) =>
                                        current.map((it, i) =>
                                          i === idx
                                            ? { ...it, notes: e.target.value }
                                            : it,
                                        ),
                                      )
                                    }
                                    className="w-full rounded-lg border border-line px-2.5 py-1.5 text-xs"
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  {row.makeup_status === "completed" ? (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                                      <CheckCircle2 className="h-3 w-3" />{" "}
                                      Práctica Recuperada
                                    </span>
                                  ) : row.requires_makeup ||
                                    (attendanceSession.is_mandatory_practice &&
                                      (row.status === "absent" ||
                                        row.status === "excused")) ? (
                                    <div className="flex items-center gap-2">
                                      <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                                        Pendiente recuperar
                                      </span>
                                      {row.has_record && (
                                        <button
                                          type="button"
                                          disabled={busy}
                                          onClick={() => handleRecordMakeup(row)}
                                          className="inline-flex items-center gap-1 rounded-lg bg-navy px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-navyink cursor-pointer"
                                        >
                                          <RotateCcw className="h-3 w-3" />{" "}
                                          Convalidar Recuperación
                                        </button>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-[11px] text-ink-soft">
                                      No requiere
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setAttendanceSession(null)}
                          className="rounded-lg border border-line px-3.5 py-2 text-xs font-semibold text-ink-soft"
                        >
                          Cerrar
                        </button>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={handleSaveAttendance}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-teal px-4 py-2 text-xs font-semibold text-white hover:bg-tealdeep cursor-pointer"
                        >
                          <UserCheck className="h-4 w-4" />
                          {busy
                            ? "Guardando…"
                            : "Guardar Asistencia de la Sesión"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {sessionForm && (
                <div className="rounded-xl border-2 border-navy/30 bg-white p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
                      Programar / Asignar Docente · Sesión{" "}
                      {sessionForm.session_number}: {sessionForm.title}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setSessionForm(null)}
                      className="text-ink-soft hover:text-navy"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-4">
                    <Input
                      label="Fecha y Hora de Inicio"
                      type="datetime-local"
                      value={sessionForm.starts_at}
                      onChange={(e) =>
                        setSessionForm({
                          ...sessionForm,
                          starts_at: e.target.value,
                        })
                      }
                    />
                    <label className="space-y-1.5">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                        Docente de la Sesión
                      </span>
                      <select
                        value={sessionForm.teacher_user_id}
                        onChange={(e) =>
                          setSessionForm({
                            ...sessionForm,
                            teacher_user_id: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm"
                      >
                        <option value="">— Por asignar —</option>
                        {teachers.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Input
                      label="Aula / Laboratorio / Link"
                      placeholder="Ej. Taller de Simulación 1"
                      value={sessionForm.room_or_link}
                      onChange={(e) =>
                        setSessionForm({
                          ...sessionForm,
                          room_or_link: e.target.value,
                        })
                      }
                    />
                    <label className="space-y-1.5">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                        Estado de Sesión
                      </span>
                      <select
                        value={sessionForm.status}
                        onChange={(e) =>
                          setSessionForm({
                            ...sessionForm,
                            status: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm"
                      >
                        {Object.entries(sessionStatusLabels).map(
                          ([val, label]) => (
                            <option key={val} value={val}>
                              {label}
                            </option>
                          ),
                        )}
                      </select>
                    </label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setSessionForm(null)}
                      className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink-soft"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={handleSaveSession}
                      className="rounded-lg bg-teal px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-tealdeep"
                    >
                      Guardar Sesión
                    </button>
                  </div>
                </div>
              )}

              <div className="grid gap-2.5 sm:grid-cols-2">
                {(selectedCohort.sessions ?? []).map((s) => (
                  <div
                    key={s.cohort_session_id}
                    className="rounded-xl border border-line bg-white p-3.5 text-xs flex flex-col justify-between gap-2.5"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-teal">
                            Sesión {s.session_number}
                          </span>
                          <span
                            className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ${
                              s.status === "completed"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-bg-alt text-ink-soft"
                            }`}
                          >
                            {sessionStatusLabels[s.status] ?? s.status}
                          </span>
                          {s.is_mandatory_practice && (
                            <span className="rounded bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[10px] font-semibold text-amber-900">
                              Práctica
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => openEditSession(s)}
                          className="rounded-lg border border-line p-1 text-ink-soft hover:text-navy cursor-pointer"
                          title="Programar horario o docente"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="font-bold text-navy">{s.title}</p>
                      <p className="text-[11px] text-ink-soft">
                        📅 {formatReadableDateTime(s.starts_at)} ·{" "}
                        {s.academic_hours}h
                      </p>
                      <p className="text-[11px] text-ink-soft">
                        👨‍⚕️ {s.teacher_name || "Docente por asignar"}
                        {s.room_or_link ? ` · 📍 ${s.room_or_link}` : ""}
                      </p>
                    </div>
                    <div className="flex justify-end pt-2 border-t border-line/60">
                      <button
                        type="button"
                        onClick={() => openSessionAttendance(s)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-tealtint px-3 py-1.5 text-xs font-bold text-tealdeep hover:bg-teal/20 cursor-pointer"
                      >
                        <UserCheck className="h-3.5 w-3.5" /> Pasar Lista /
                        Recuperaciones
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-end gap-3 rounded-xl border border-line bg-white p-3.5">
                <div className="flex-1 min-w-[240px]">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1">
                    Matricular Estudiante en {selectedCohort.cohort_code}
                  </label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="w-full rounded-lg border border-line bg-white px-3 py-2 text-xs"
                  >
                    <option value="">
                      — Seleccionar usuario registrado —
                    </option>
                    {userCombo.map((u) => (
                      <option key={u.value} value={u.value}>
                        {u.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  disabled={busy || !selectedStudentId}
                  onClick={handleEnrollStudent}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-teal px-4 py-2 text-xs font-semibold text-white hover:bg-tealdeep disabled:opacity-50 cursor-pointer"
                >
                  <UserPlus className="h-3.5 w-3.5" /> Matricular en Promoción
                </button>
              </div>

              {/* PANEL DE CALIFICACIONES Y COMPETENCIAS CRÍTICAS DEL ALUMNO */}
              {gradingEnrollment && (
                <div className="rounded-xl border-2 border-teal bg-white p-4 space-y-4 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-2 border-b border-line pb-3">
                    <div>
                      <span className="font-mono text-[11px] font-bold uppercase text-teal">
                        Libreta de Evaluaciones y Competencias Críticas
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-navy">
                        {gradingEnrollment.student_name}
                      </h4>
                      <p className="text-xs text-ink-soft">
                        Asistencia actual:{" "}
                        <b>
                          {Number(
                            gradingEnrollment.attendance_percent ?? 0,
                          ).toFixed(1)}
                          %
                        </b>{" "}
                        · Promedio Ponderado:{" "}
                        <b>
                          {gradingEnrollment.final_grade != null
                            ? Number(gradingEnrollment.final_grade).toFixed(2)
                            : "—"}
                        </b>{" "}
                        · Competencias Críticas:{" "}
                        <b>
                          {gradingEnrollment.critical_competencies_passed
                            ? "Aprobadas"
                            : "Pendiente"}
                        </b>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setGradingEnrollment(null)}
                      className="rounded-lg p-1 text-ink-soft hover:bg-bg-alt"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Acreditación de Horas Complementarias */}
                  <div className="flex flex-wrap items-end justify-between gap-3 rounded-xl border border-line bg-bg-alt/60 p-3">
                    <div>
                      <p className="text-xs font-bold text-navy">
                        Trabajo Autónomo / Horas Complementarias Acreditadas
                      </p>
                      <p className="text-[11px] text-ink-soft">
                        Registra las horas complementarias cumplidas por el estudiante (ej. 14 horas en Primeros Auxilios).
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={compHoursDraft}
                        onChange={(e) => setCompHoursDraft(e.target.value)}
                        className="w-24 rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-mono font-bold"
                      />
                      <button
                        type="button"
                        disabled={busy}
                        onClick={handleSaveComplementaryHours}
                        className="rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-navyink cursor-pointer"
                      >
                        Acreditar Horas
                      </button>
                    </div>
                  </div>

                  {/* Tabla de Evaluaciones e Instrumentos */}
                  <div className="overflow-x-auto rounded-lg border border-line">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-bg-alt text-[11px] uppercase text-ink-soft border-b border-line">
                        <tr>
                          <th className="px-3 py-2">Instrumento / Evaluación</th>
                          <th className="px-3 py-2">Peso / Regla</th>
                          <th className="px-3 py-2">Nota (0 - 20)</th>
                          <th className="px-3 py-2">Estado</th>
                          <th className="px-3 py-2"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        {gradeItems.map((item) => {
                          const isGroupWithChildren =
                            !item.parent_assessment_id &&
                            gradeItems.some(
                              (c) =>
                                c.parent_assessment_id === item.assessment_id,
                            );
                          return (
                            <tr
                              key={item.assessment_id}
                              className={
                                !item.parent_assessment_id
                                  ? "bg-navy/5 font-semibold"
                                  : "bg-white"
                              }
                            >
                              <td className="px-3 py-2">
                                <div
                                  className={
                                    item.parent_assessment_id ? "pl-4" : ""
                                  }
                                >
                                  <span className="font-mono text-[10px] text-ink-soft block">
                                    {item.code}
                                  </span>
                                  <span className="text-navy">
                                    {item.title}
                                  </span>
                                  {item.is_critical_gatekeeper && (
                                    <span className="ml-2 inline-flex items-center gap-0.5 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-900">
                                      <ShieldAlert className="h-2.5 w-2.5" />{" "}
                                      Competencia Crítica
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-3 py-2 font-mono text-[11px] text-ink-soft">
                                {item.weight_percent > 0
                                  ? `${item.weight_percent}%`
                                  : "Requisito"}
                                {item.min_passing_score
                                  ? ` · mín. ${item.min_passing_score}`
                                  : ""}
                              </td>
                              <td className="px-3 py-2">
                                {isGroupWithChildren ? (
                                  <span className="text-[11px] text-ink-soft italic">
                                    Calculado por sub-ítems
                                  </span>
                                ) : (
                                  <input
                                    type="number"
                                    min="0"
                                    max={item.max_score || 20}
                                    step="0.5"
                                    placeholder="0 - 20"
                                    value={
                                      scoreDrafts[item.assessment_id] ?? ""
                                    }
                                    onChange={(e) =>
                                      setScoreDrafts((prev) => ({
                                        ...prev,
                                        [item.assessment_id]: e.target.value,
                                      }))
                                    }
                                    className="w-20 rounded-lg border border-line bg-white px-2.5 py-1 font-mono text-xs font-bold text-navy"
                                  />
                                )}
                              </td>
                              <td className="px-3 py-2">
                                {item.score != null ? (
                                  item.passed ? (
                                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                                      <CheckCircle2 className="h-3.5 w-3.5" />{" "}
                                      Aprobado ({item.score})
                                    </span>
                                  ) : (
                                    <span className="text-red-600 font-bold">
                                      Desaprobado ({item.score})
                                    </span>
                                  )
                                ) : (
                                  <span className="text-ink-soft">
                                    Sin calificar
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-2 text-right">
                                {!isGroupWithChildren && (
                                  <button
                                    type="button"
                                    disabled={
                                      busy ||
                                      scoreDrafts[item.assessment_id] === ""
                                    }
                                    onClick={() => handleSaveSingleGrade(item)}
                                    className="rounded-lg bg-teal px-3 py-1 text-[11px] font-semibold text-white hover:bg-tealdeep disabled:opacity-40 cursor-pointer"
                                  >
                                    Guardar
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {enrollments.length === 0 ? (
                <p className="rounded-xl border border-dashed border-line bg-white p-4 text-center text-xs text-ink-soft">
                  Aún no hay alumnos matriculados en esta promoción.
                </p>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-line bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-line bg-bg-alt text-[11px] uppercase text-ink-soft">
                      <tr>
                        <th className="px-3 py-2.5">Estudiante</th>
                        <th className="px-3 py-2.5">Asistencia</th>
                        <th className="px-3 py-2.5">Hrs Compl.</th>
                        <th className="px-3 py-2.5">Promedio</th>
                        <th className="px-3 py-2.5">Competencias Críticas</th>
                        <th className="px-3 py-2.5">Estado Académico</th>
                        <th className="px-3 py-2.5 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {enrollments.map((enr) => {
                        const acad = academicStatusLabels[
                          enr.academic_status
                        ] ?? {
                          label: enr.academic_status,
                          badge: "bg-bg-alt text-ink border-line",
                        };
                        return (
                          <tr key={enr.enrollment_id}>
                            <td className="px-3 py-2.5">
                              <p className="font-bold text-navy">
                                {enr.student_name}
                              </p>
                              <p className="text-[11px] text-ink-soft">
                                {enr.document_number || enr.email}
                              </p>
                            </td>
                            <td className="px-3 py-2.5 font-mono font-semibold text-navy">
                              {Number(enr.attendance_percent ?? 0).toFixed(1)}%
                            </td>
                            <td className="px-3 py-2.5 font-mono text-ink-soft">
                              {Number(enr.complementary_hours_done ?? 0)}h
                            </td>
                            <td className="px-3 py-2.5 font-mono font-bold text-navy">
                              {enr.final_grade != null
                                ? Number(enr.final_grade).toFixed(2)
                                : "—"}
                            </td>
                            <td className="px-3 py-2.5">
                              {enr.critical_competencies_passed ? (
                                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                                  <CheckCircle2 className="h-3.5 w-3.5" />{" "}
                                  Aprobadas
                                </span>
                              ) : (
                                <span className="text-ink-soft">Pendiente</span>
                              )}
                            </td>
                            <td className="px-3 py-2.5">
                              <span
                                className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold ${acad.badge}`}
                              >
                                {acad.label}
                              </span>
                            </td>
                            <td className="px-3 py-2.5 text-right">
                              <button
                                type="button"
                                onClick={() => openStudentGrades(enr)}
                                className="inline-flex items-center gap-1 rounded-lg bg-navy px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-navyink cursor-pointer"
                              >
                                <ClipboardCheck className="h-3.5 w-3.5" />{" "}
                                Calificar / Notas
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
