"use client";

import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Layers,
  Pencil,
  Plus,
  ShieldAlert,
  Trash2,
  X,
} from "lucide-react";
import {
  api,
  CourseAssessmentItem,
  CourseLessonItem,
  CourseModuleItem,
  CourseSyllabus,
} from "@/lib/api";
import { Input } from "@/components/ui/Input";

interface CourseSyllabusEditorProps {
  courseId: number;
  syllabus: CourseSyllabus;
  onRefresh: () => Promise<void>;
}

const lessonTypeLabels: Record<string, string> = {
  theory: "Teórica",
  practice: "Práctica",
  mixed: "Teórico-Práctica",
  simulation: "Simulacro",
  final_evaluation: "Evaluación Final",
};

const assessmentTypeLabels: Record<string, string> = {
  group: "Bloque / Grupo Ponderado",
  practical_checklist: "Rúbrica / Lista de Cotejo Práctica",
  written_exam: "Examen Escrito",
  simulation: "Simulacro Integrador",
  final_station: "Estación Práctica Final",
  critical_competency: "Competencia Crítica (Gatekeeper)",
  attitude: "Actitud / Participación",
  quiz: "Cuestionario Virtual",
};

export function CourseSyllabusEditor({
  courseId,
  syllabus,
  onRefresh,
}: CourseSyllabusEditorProps) {
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Estado del formulario de Módulo
  const [moduleForm, setModuleForm] = useState<{
    module_id?: number;
    module_number: number;
    title: string;
    description: string;
  } | null>(null);

  // Estado del formulario de Clase / Lección
  const [lessonForm, setLessonForm] = useState<{
    lesson_id?: number;
    module_id: number;
    lesson_number: number;
    week_number: string;
    month_number: string;
    title: string;
    summary: string;
    lesson_type: string;
    academic_hours: number;
    is_mandatory_practice: boolean;
    syllabus_topics_text: string;
    required_materials_text: string;
  } | null>(null);

  // Estado del formulario de Evaluación
  const [assessmentForm, setAssessmentForm] = useState<{
    assessment_id?: number;
    parent_assessment_id: string;
    module_id: string;
    lesson_id: string;
    code: string;
    title: string;
    description: string;
    assessment_type: string;
    weight_percent: number;
    max_score: number;
    min_passing_score: number;
    is_critical_gatekeeper: boolean;
  } | null>(null);

  const modules = Array.isArray(syllabus.modules) ? syllabus.modules : [];
  const assessments = Array.isArray(syllabus.assessments)
    ? syllabus.assessments
    : [];
  const allLessons = modules.flatMap((m) =>
    (m.lessons ?? []).map((l) => ({ ...l, module_id: m.module_id })),
  );

  const rootAssessments = assessments.filter((a) => !a.parent_assessment_id);
  const totalRootWeight = rootAssessments
    .filter((a) => !a.is_critical_gatekeeper)
    .reduce((acc, item) => acc + Number(item.weight_percent ?? 0), 0);

  const openNewModule = () => {
    const nextNum =
      modules.length > 0
        ? Math.max(...modules.map((m) => Number(m.module_number))) + 1
        : 1;
    setModuleForm({
      module_number: nextNum,
      title: "",
      description: "",
    });
  };

  const openEditModule = (mod: CourseModuleItem) => {
    setModuleForm({
      module_id: mod.module_id,
      module_number: mod.module_number,
      title: mod.title,
      description: mod.description ?? "",
    });
  };

  const handleSaveModule = async () => {
    if (!moduleForm || !moduleForm.title.trim()) return;
    setBusy(true);
    setFeedback(null);
    try {
      await api.saveCourseModule(courseId, {
        version_id: syllabus.version_id,
        module_id: moduleForm.module_id,
        module_number: Number(moduleForm.module_number),
        title: moduleForm.title.trim(),
        description: moduleForm.description.trim() || undefined,
        sort_order: Number(moduleForm.module_number),
      });
      setModuleForm(null);
      await onRefresh();
      setFeedback({ type: "success", text: "Módulo guardado correctamente." });
    } catch (err) {
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "No se pudo guardar el módulo",
      });
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteModule = async (mod: CourseModuleItem) => {
    if (
      !window.confirm(
        `¿Eliminar el Módulo ${mod.module_number}: "${mod.title}" y sus clases asociadas?`,
      )
    ) {
      return;
    }
    setBusy(true);
    setFeedback(null);
    try {
      await api.deleteCourseModule(courseId, mod.module_id);
      await onRefresh();
      setFeedback({ type: "success", text: "Módulo eliminado." });
    } catch (err) {
      setFeedback({
        type: "error",
        text:
          err instanceof Error ? err.message : "No se pudo eliminar el módulo",
      });
    } finally {
      setBusy(false);
    }
  };

  const openNewLesson = (moduleId: number) => {
    const nextNum =
      allLessons.length > 0
        ? Math.max(...allLessons.map((l) => Number(l.lesson_number))) + 1
        : 1;
    setLessonForm({
      module_id: moduleId,
      lesson_number: nextNum,
      week_number: String(nextNum),
      month_number: String(Math.ceil(nextNum / 4)),
      title: "",
      summary: "",
      lesson_type: "mixed",
      academic_hours: 3,
      is_mandatory_practice: true,
      syllabus_topics_text: "",
      required_materials_text: "",
    });
  };

  const openEditLesson = (moduleId: number, lesson: CourseLessonItem) => {
    setLessonForm({
      lesson_id: lesson.lesson_id,
      module_id: moduleId,
      lesson_number: lesson.lesson_number,
      week_number: lesson.week_number != null ? String(lesson.week_number) : "",
      month_number:
        lesson.month_number != null ? String(lesson.month_number) : "",
      title: lesson.title,
      summary: lesson.summary ?? "",
      lesson_type: lesson.lesson_type || "mixed",
      academic_hours: Number(lesson.academic_hours ?? 3),
      is_mandatory_practice: Boolean(lesson.is_mandatory_practice),
      syllabus_topics_text: Array.isArray(lesson.syllabus_topics)
        ? lesson.syllabus_topics.join("\n")
        : "",
      required_materials_text: Array.isArray(lesson.required_materials)
        ? lesson.required_materials.join("\n")
        : "",
    });
  };

  const handleSaveLesson = async () => {
    if (!lessonForm || !lessonForm.title.trim()) return;
    setBusy(true);
    setFeedback(null);
    try {
      const topics = lessonForm.syllabus_topics_text
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      const materials = lessonForm.required_materials_text
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      await api.saveCourseLesson(courseId, {
        version_id: syllabus.version_id,
        lesson_id: lessonForm.lesson_id,
        module_id: Number(lessonForm.module_id),
        lesson_number: Number(lessonForm.lesson_number),
        week_number: lessonForm.week_number
          ? Number(lessonForm.week_number)
          : null,
        month_number: lessonForm.month_number
          ? Number(lessonForm.month_number)
          : null,
        title: lessonForm.title.trim(),
        summary: lessonForm.summary.trim() || undefined,
        lesson_type: lessonForm.lesson_type,
        academic_hours: Number(lessonForm.academic_hours),
        is_mandatory_practice: Boolean(lessonForm.is_mandatory_practice),
        syllabus_topics: topics,
        required_materials: materials,
        sort_order: Number(lessonForm.lesson_number),
      });
      setLessonForm(null);
      await onRefresh();
      setFeedback({ type: "success", text: "Clase guardada correctamente." });
    } catch (err) {
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "No se pudo guardar la clase",
      });
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteLesson = async (lesson: CourseLessonItem) => {
    if (
      !window.confirm(
        `¿Eliminar la Clase ${lesson.lesson_number}: "${lesson.title}"?`,
      )
    ) {
      return;
    }
    setBusy(true);
    setFeedback(null);
    try {
      await api.deleteCourseLesson(courseId, lesson.lesson_id);
      await onRefresh();
      setFeedback({ type: "success", text: "Clase eliminada." });
    } catch (err) {
      setFeedback({
        type: "error",
        text:
          err instanceof Error ? err.message : "No se pudo eliminar la clase",
      });
    } finally {
      setBusy(false);
    }
  };

  const openNewAssessment = (parentId?: number) => {
    setAssessmentForm({
      parent_assessment_id: parentId ? String(parentId) : "",
      module_id: "",
      lesson_id: "",
      code: parentId ? `EVAL_ITEM_${assessments.length + 1}` : `GRP_${rootAssessments.length + 1}`,
      title: "",
      description: "",
      assessment_type: parentId ? "practical_checklist" : "group",
      weight_percent: parentId ? 0 : 25,
      max_score: 20,
      min_passing_score: 14,
      is_critical_gatekeeper: false,
    });
  };

  const openEditAssessment = (item: CourseAssessmentItem) => {
    setAssessmentForm({
      assessment_id: item.assessment_id,
      parent_assessment_id: item.parent_assessment_id
        ? String(item.parent_assessment_id)
        : "",
      module_id: item.module_id ? String(item.module_id) : "",
      lesson_id: item.lesson_id ? String(item.lesson_id) : "",
      code: item.code,
      title: item.title,
      description: item.description ?? "",
      assessment_type: item.assessment_type || "practical_checklist",
      weight_percent: Number(item.weight_percent ?? 0),
      max_score: Number(item.max_score ?? 20),
      min_passing_score: Number(item.min_passing_score ?? 14),
      is_critical_gatekeeper: Boolean(item.is_critical_gatekeeper),
    });
  };

  const handleSaveAssessment = async () => {
    if (
      !assessmentForm ||
      !assessmentForm.title.trim() ||
      !assessmentForm.code.trim()
    ) {
      return;
    }
    setBusy(true);
    setFeedback(null);
    try {
      await api.saveCourseAssessment(courseId, {
        version_id: syllabus.version_id,
        assessment_id: assessmentForm.assessment_id,
        parent_assessment_id: assessmentForm.parent_assessment_id
          ? Number(assessmentForm.parent_assessment_id)
          : null,
        module_id: assessmentForm.module_id
          ? Number(assessmentForm.module_id)
          : null,
        lesson_id: assessmentForm.lesson_id
          ? Number(assessmentForm.lesson_id)
          : null,
        code: assessmentForm.code.trim().toUpperCase(),
        title: assessmentForm.title.trim(),
        description: assessmentForm.description.trim() || undefined,
        assessment_type: assessmentForm.assessment_type,
        weight_percent: Number(assessmentForm.weight_percent ?? 0),
        max_score: Number(assessmentForm.max_score ?? 20),
        min_passing_score: Number(assessmentForm.min_passing_score ?? 14),
        is_critical_gatekeeper: Boolean(assessmentForm.is_critical_gatekeeper),
      });
      setAssessmentForm(null);
      await onRefresh();
      setFeedback({
        type: "success",
        text: "Configuración de evaluación guardada.",
      });
    } catch (err) {
      setFeedback({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "No se pudo guardar la evaluación",
      });
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteAssessment = async (item: CourseAssessmentItem) => {
    if (
      !window.confirm(
        `¿Eliminar la evaluación "${item.title}" (${item.code})?`,
      )
    ) {
      return;
    }
    setBusy(true);
    setFeedback(null);
    try {
      await api.deleteCourseAssessment(courseId, item.assessment_id);
      await onRefresh();
      setFeedback({ type: "success", text: "Evaluación eliminada." });
    } catch (err) {
      setFeedback({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "No se pudo eliminar la evaluación",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="rounded-2xl border border-line bg-white p-5 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-4">
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-teal">
            Editor Curricular Interactivo · Versión {syllabus.version_code}
          </p>
          <h2 className="font-serif text-lg font-bold text-navy">
            Plan de Estudios: Módulos, Clases y Matriz de Evaluación
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            {modules.length} módulos · {allLessons.length} clases configuradas ·{" "}
            {rootAssessments.length} bloques de evaluación ({totalRootWeight}%
            ponderado total).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={openNewModule}
            className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-3.5 py-2 text-xs font-semibold text-white hover:bg-navyink cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Nuevo Módulo
          </button>
          <button
            type="button"
            onClick={() => openNewAssessment()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-teal bg-tealtint px-3.5 py-2 text-xs font-semibold text-tealdeep hover:bg-teal/15 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Nuevo Bloque de Evaluación
          </button>
        </div>
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
            className="ml-2 text-current opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* FORMULARIO EMERGENTE INLINE: MÓDULO */}
      {moduleForm && (
        <div className="rounded-xl border-2 border-teal/40 bg-tealtint/30 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy flex items-center gap-2">
              <Layers className="h-4 w-4 text-teal" />
              {moduleForm.module_id ? "Editar Módulo" : "Nuevo Módulo Curricular"}
            </h3>
            <button
              type="button"
              onClick={() => setModuleForm(null)}
              className="rounded-lg p-1 text-ink-soft hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
            <Input
              label="N° Módulo"
              type="number"
              min="1"
              value={moduleForm.module_number}
              onChange={(e) =>
                setModuleForm({
                  ...moduleForm,
                  module_number: Number(e.target.value),
                })
              }
            />
            <Input
              label="Título del Módulo"
              placeholder="Ej. Evaluación Primaria y Soporte Vital Básico (RCP y DEA)"
              value={moduleForm.title}
              onChange={(e) =>
                setModuleForm({ ...moduleForm, title: e.target.value })
              }
            />
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Descripción / Objetivo del Módulo
              </label>
              <textarea
                rows={2}
                value={moduleForm.description}
                onChange={(e) =>
                  setModuleForm({ ...moduleForm, description: e.target.value })
                }
                placeholder="Resumen de competencias que desarrolla este módulo…"
                className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModuleForm(null)}
              className="rounded-lg border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink-soft"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={busy || !moduleForm.title.trim()}
              onClick={handleSaveModule}
              className="rounded-lg bg-teal px-4 py-2 text-xs font-semibold text-white hover:bg-tealdeep disabled:opacity-50"
            >
              {busy ? "Guardando…" : "Guardar Módulo"}
            </button>
          </div>
        </div>
      )}

      {/* FORMULARIO EMERGENTE INLINE: CLASE / LECCIÓN */}
      {lessonForm && (
        <div className="rounded-xl border-2 border-navy/30 bg-bg-alt p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-teal" />
              {lessonForm.lesson_id
                ? `Editar Clase ${lessonForm.lesson_number}`
                : "Agregar Nueva Clase / Sesión"}
            </h3>
            <button
              type="button"
              onClick={() => setLessonForm(null)}
              className="rounded-lg p-1 text-ink-soft hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-4">
            <Input
              label="N° Clase"
              type="number"
              min="1"
              value={lessonForm.lesson_number}
              onChange={(e) =>
                setLessonForm({
                  ...lessonForm,
                  lesson_number: Number(e.target.value),
                })
              }
            />
            <Input
              label="N° Semana"
              type="number"
              min="1"
              value={lessonForm.week_number}
              onChange={(e) =>
                setLessonForm({ ...lessonForm, week_number: e.target.value })
              }
            />
            <Input
              label="Horas académicas"
              type="number"
              min="0.5"
              step="0.5"
              value={lessonForm.academic_hours}
              onChange={(e) =>
                setLessonForm({
                  ...lessonForm,
                  academic_hours: Number(e.target.value),
                })
              }
            />
            <label className="space-y-1.5">
              <span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Tipo de Sesión
              </span>
              <select
                value={lessonForm.lesson_type}
                onChange={(e) =>
                  setLessonForm({ ...lessonForm, lesson_type: e.target.value })
                }
                className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm"
              >
                <option value="theory">Teórica</option>
                <option value="practice">Práctica</option>
                <option value="mixed">Teórico-Práctica</option>
                <option value="simulation">Simulacro</option>
                <option value="final_evaluation">Evaluación Final</option>
              </select>
            </label>
            <div className="sm:col-span-4">
              <Input
                label="Título de la Clase"
                placeholder="Ej. RCP en Adultos y Uso del Desfibrilador Externo Automático (DEA)"
                value={lessonForm.title}
                onChange={(e) =>
                  setLessonForm({ ...lessonForm, title: e.target.value })
                }
              />
            </div>
            <div className="sm:col-span-4 space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Resumen / Objetivo de la Clase
              </label>
              <textarea
                rows={2}
                value={lessonForm.summary}
                onChange={(e) =>
                  setLessonForm({ ...lessonForm, summary: e.target.value })
                }
                placeholder="Descripción de la sesión teórica, práctica y actividad complementaria…"
                className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm"
              />
            </div>
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Temas del Sílabo (uno por línea)
              </label>
              <textarea
                rows={3}
                value={lessonForm.syllabus_topics_text}
                onChange={(e) =>
                  setLessonForm({
                    ...lessonForm,
                    syllabus_topics_text: e.target.value,
                  })
                }
                placeholder={"Cadena de supervivencia\nCompresiones de alta calidad\nSecuencia con DEA"}
                className="w-full rounded-lg border border-line bg-white px-3 py-2 text-xs font-mono"
              />
            </div>
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Materiales Requeridos (uno por línea)
              </label>
              <textarea
                rows={3}
                value={lessonForm.required_materials_text}
                onChange={(e) =>
                  setLessonForm({
                    ...lessonForm,
                    required_materials_text: e.target.value,
                  })
                }
                placeholder={"Maniquí de RCP adulto\nDEA de entrenamiento"}
                className="w-full rounded-lg border border-line bg-white px-3 py-2 text-xs font-mono"
              />
            </div>
            <div className="sm:col-span-4">
              <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-line bg-white p-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-teal"
                  checked={lessonForm.is_mandatory_practice}
                  onChange={(e) =>
                    setLessonForm({
                      ...lessonForm,
                      is_mandatory_practice: e.target.checked,
                    })
                  }
                />
                <span className="text-xs font-semibold text-navy">
                  Práctica obligatoria (si el alumno falta, requiere sesión de recuperación para aprobar)
                </span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setLessonForm(null)}
              className="rounded-lg border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink-soft"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={busy || !lessonForm.title.trim()}
              onClick={handleSaveLesson}
              className="rounded-lg bg-teal px-4 py-2 text-xs font-semibold text-white hover:bg-tealdeep disabled:opacity-50"
            >
              {busy ? "Guardando…" : "Guardar Clase"}
            </button>
          </div>
        </div>
      )}

      {/* LISTADO DE MÓDULOS Y SUS CLASES */}
      <div className="space-y-4">
        {modules.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-ink-soft">
            Aún no hay módulos en este curso. Haz clic en <b>Nuevo Módulo</b> para estructurar el plan de estudios.
          </div>
        ) : (
          modules.map((mod) => (
            <div
              key={mod.module_id}
              className="rounded-xl border border-line bg-bg-alt/50 p-4 space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase text-teal">
                    Módulo {mod.module_number}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-navy">
                    {mod.title}
                  </h3>
                  {mod.description && (
                    <p className="mt-0.5 text-xs text-ink-soft">
                      {mod.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openNewLesson(mod.module_id)}
                    className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-teal hover:bg-tealtint cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Clase
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditModule(mod)}
                    title="Editar módulo"
                    className="rounded-lg border border-line bg-white p-1.5 text-ink-soft hover:text-navy cursor-pointer"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteModule(mod)}
                    title="Eliminar módulo"
                    className="rounded-lg border border-line bg-white p-1.5 text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {mod.lessons?.length > 0 ? (
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {mod.lessons.map((lesson) => (
                    <div
                      key={lesson.lesson_id}
                      className="rounded-xl border border-line bg-white p-3.5 text-xs space-y-1.5 flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono font-bold text-teal">
                            Clase {lesson.lesson_number}
                            {lesson.week_number
                              ? ` · Sem. ${lesson.week_number}`
                              : ""}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="rounded bg-bg-alt px-1.5 py-0.5 font-mono text-[10px] text-ink-soft">
                              {lesson.academic_hours ?? 3}h ·{" "}
                              {lessonTypeLabels[lesson.lesson_type] ??
                                lesson.lesson_type}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                openEditLesson(mod.module_id, lesson)
                              }
                              title="Editar clase"
                              className="p-1 text-ink-soft hover:text-teal cursor-pointer"
                            >
                              <Pencil className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteLesson(lesson)}
                              title="Eliminar clase"
                              className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <p className="font-bold text-navy leading-snug">
                          {lesson.title}
                        </p>
                        {lesson.summary && (
                          <p className="text-[11px] text-ink-soft line-clamp-2">
                            {lesson.summary}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {lesson.is_mandatory_practice && (
                          <span className="inline-flex items-center gap-1 rounded bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[10px] font-semibold text-amber-900">
                            Práctica obligatoria
                          </span>
                        )}
                        {Array.isArray(lesson.syllabus_topics) &&
                          lesson.syllabus_topics.length > 0 && (
                            <span className="rounded bg-navy/5 px-1.5 py-0.5 text-[10px] font-mono text-navy">
                              {lesson.syllabus_topics.length} temas
                            </span>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-ink-soft italic">
                  Sin clases registradas en este módulo.
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {/* MATRIZ DE EVALUACIÓN Y COMPETENCIAS CRÍTICAS */}
      <div className="border-t border-line pt-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-navy flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4 text-teal" />
              Matriz de Evaluación y Competencias Críticas (Gatekeepers)
            </h3>
            <p className="text-xs text-ink-soft">
              Configura los bloques ponderados (suma recomendada: 100%) y las rúbricas o competencias obligatorias.
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 font-mono text-xs font-bold ${
              totalRootWeight === 100
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-amber-50 text-amber-800 border border-amber-200"
            }`}
          >
            Peso Total: {totalRootWeight}%
          </span>
        </div>

        {/* FORMULARIO EMERGENTE INLINE: EVALUACIÓN */}
        {assessmentForm && (
          <div className="rounded-xl border-2 border-teal/40 bg-tealtint/30 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-navy">
                {assessmentForm.assessment_id
                  ? "Editar Evaluación"
                  : assessmentForm.parent_assessment_id
                    ? "Nuevo Instrumento / Sub-evaluación"
                    : "Nuevo Bloque de Evaluación"}
              </h4>
              <button
                type="button"
                onClick={() => setAssessmentForm(null)}
                className="rounded-lg p-1 text-ink-soft hover:bg-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Input
                label="Código Único"
                placeholder="Ej. PRAC_CL2_RCP"
                value={assessmentForm.code}
                onChange={(e) =>
                  setAssessmentForm({ ...assessmentForm, code: e.target.value })
                }
              />
              <div className="sm:col-span-2">
                <Input
                  label="Título de la Evaluación"
                  placeholder="Ej. Rúbrica Práctica: RCP de Alta Calidad y Uso de DEA"
                  value={assessmentForm.title}
                  onChange={(e) =>
                    setAssessmentForm({
                      ...assessmentForm,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <label className="space-y-1.5">
                <span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Tipo de Instrumento
                </span>
                <select
                  value={assessmentForm.assessment_type}
                  onChange={(e) =>
                    setAssessmentForm({
                      ...assessmentForm,
                      assessment_type: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm"
                >
                  {Object.entries(assessmentTypeLabels).map(([val, label]) => (
                    <option key={val} value={val}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1.5">
                <span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Bloque Padre (opcional)
                </span>
                <select
                  value={assessmentForm.parent_assessment_id}
                  onChange={(e) =>
                    setAssessmentForm({
                      ...assessmentForm,
                      parent_assessment_id: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm"
                >
                  <option value="">— Es un Bloque Principal (Raíz) —</option>
                  {rootAssessments.map((grp) => (
                    <option key={grp.assessment_id} value={grp.assessment_id}>
                      {grp.title} ({grp.weight_percent}%)
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1.5">
                <span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Vincular a Clase (opcional)
                </span>
                <select
                  value={assessmentForm.lesson_id}
                  onChange={(e) =>
                    setAssessmentForm({
                      ...assessmentForm,
                      lesson_id: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm"
                >
                  <option value="">— General / Sin clase fija —</option>
                  {allLessons.map((l) => (
                    <option key={l.lesson_id} value={l.lesson_id}>
                      Clase {l.lesson_number}: {l.title}
                    </option>
                  ))}
                </select>
              </label>
              <Input
                label="Peso Ponderado (%)"
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={assessmentForm.weight_percent}
                onChange={(e) =>
                  setAssessmentForm({
                    ...assessmentForm,
                    weight_percent: Number(e.target.value),
                  })
                }
              />
              <Input
                label="Nota Máxima"
                type="number"
                min="1"
                max="100"
                value={assessmentForm.max_score}
                onChange={(e) =>
                  setAssessmentForm({
                    ...assessmentForm,
                    max_score: Number(e.target.value),
                  })
                }
              />
              <Input
                label="Nota Mínima Aprobatoria"
                type="number"
                min="0"
                max="100"
                value={assessmentForm.min_passing_score}
                onChange={(e) =>
                  setAssessmentForm({
                    ...assessmentForm,
                    min_passing_score: Number(e.target.value),
                  })
                }
              />
              <div className="sm:col-span-3">
                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-amber-300 bg-amber-50/70 p-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-teal"
                    checked={assessmentForm.is_critical_gatekeeper}
                    onChange={(e) =>
                      setAssessmentForm({
                        ...assessmentForm,
                        is_critical_gatekeeper: e.target.checked,
                      })
                    }
                  />
                  <span className="text-xs font-bold text-amber-950">
                    Es Competencia Crítica Obligatoria (Gatekeeper): el estudiante debe aprobar este ítem indispensablemente para certificarse.
                  </span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setAssessmentForm(null)}
                className="rounded-lg border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink-soft"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={
                  busy ||
                  !assessmentForm.title.trim() ||
                  !assessmentForm.code.trim()
                }
                onClick={handleSaveAssessment}
                className="rounded-lg bg-teal px-4 py-2 text-xs font-semibold text-white hover:bg-tealdeep disabled:opacity-50"
              >
                {busy ? "Guardando…" : "Guardar Evaluación"}
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {rootAssessments.map((group) => {
            const children = assessments.filter(
              (c) => c.parent_assessment_id === group.assessment_id,
            );
            return (
              <div
                key={group.assessment_id}
                className="rounded-xl border border-line bg-white p-4 text-xs space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] uppercase text-ink-soft">
                        {group.code}
                      </span>
                      <h4 className="font-bold text-navy text-sm">
                        {group.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="rounded-full bg-teal/10 px-2.5 py-0.5 font-mono font-bold text-teal">
                        {group.weight_percent}%
                      </span>
                      <button
                        type="button"
                        onClick={() => openNewAssessment(group.assessment_id)}
                        title="Agregar sub-evaluación a este bloque"
                        className="rounded p-1 text-teal hover:bg-tealtint cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditAssessment(group)}
                        title="Editar bloque"
                        className="rounded p-1 text-ink-soft hover:text-navy cursor-pointer"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAssessment(group)}
                        title="Eliminar bloque"
                        className="rounded p-1 text-red-500 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {children.length > 0 && (
                    <ul className="space-y-1.5 pl-3 border-l-2 border-line pt-1">
                      {children.map((child) => (
                        <li
                          key={child.assessment_id}
                          className="flex items-center justify-between gap-2 text-[11px]"
                        >
                          <div className="min-w-0 flex-1">
                            <span className="text-ink font-medium">
                              {child.title}
                            </span>
                            {child.is_critical_gatekeeper && (
                              <span className="ml-1.5 inline-flex items-center gap-0.5 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-900">
                                <ShieldAlert className="h-2.5 w-2.5" /> Gatekeeper
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <span className="font-mono text-ink-soft">
                              {child.weight_percent > 0
                                ? `${child.weight_percent}% · `
                                : ""}
                              mín. {child.min_passing_score ?? 14}/
                              {child.max_score}
                            </span>
                            <button
                              type="button"
                              onClick={() => openEditAssessment(child)}
                              className="p-0.5 text-ink-soft hover:text-teal cursor-pointer"
                            >
                              <Pencil className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteAssessment(child)}
                              className="p-0.5 text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-line/60 text-[11px] text-ink-soft">
                  <span>
                    {assessmentTypeLabels[group.assessment_type] ??
                      group.assessment_type}
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="h-3 w-3" /> Escala 0–{group.max_score}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
