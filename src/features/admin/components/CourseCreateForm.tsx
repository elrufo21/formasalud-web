"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, BookPlus, ImagePlus, Info, Plus, Trash2 } from "lucide-react";
import { api, CourseEditData, CourseFormOptions, CourseSyllabus, getPublicAssetUrl } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { CourseSyllabusEditor } from "./CourseSyllabusEditor";
import { CourseCohortsManager } from "./CourseCohortsManager";

const schema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  slug: z.string().min(3, "El slug es obligatorio"),
  short_description: z.string().max(500, "Máximo 500 caracteres").optional(),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "El precio debe ser mayor o igual a 0"),
  certificate_included: z.boolean(),
  certificate_price: z.coerce.number().min(0, "El precio debe ser mayor o igual a 0").optional(),
  status: z.enum(["draft", "published", "archived"]),
  program_type: z.string().optional(),
  delivery_mode: z.string().optional(),
  target_audience: z.string().optional(),
  total_academic_hours: z.coerce.number().min(0).optional(),
  synchronous_hours: z.coerce.number().min(0).optional(),
  complementary_hours: z.coerce.number().min(0).optional(),
  theory_hours: z.coerce.number().min(0).optional(),
  practice_hours: z.coerce.number().min(0).optional(),
  duration_weeks: z.coerce.number().min(0).optional(),
  recommended_frequency: z.string().optional(),
  min_passing_grade: z.coerce.number().min(0).max(20).optional(),
  min_attendance_percent: z.coerce.number().min(0).max(100).optional(),
  requires_all_practices_made_up: z.boolean().optional(),
  makeup_counts_as_attendance: z.boolean().optional(),
  requires_complementary_hours: z.boolean().optional(),
  requires_critical_competencies: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const sectionClass = "rounded-2xl border border-line bg-white p-5 sm:p-6 space-y-5";
const sectionTitleClass = "font-serif text-lg font-bold text-navy";
type Resource = { resource_type: "video" | "pdf" | "link" | "quiz" | "other"; title: string; file_url: string };
type CertificateType = "participation" | "approval";

export function CourseCreateForm({ courseId }: { courseId?: number }) {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<CourseFormOptions>({ teachers: [], certificate_templates: [] });
  const [optionsError, setOptionsError] = useState<string | null>(null);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [course, setCourse] = useState<CourseEditData | null>(null);
  const [syllabus, setSyllabus] = useState<CourseSyllabus | null>(null);
  const [loadingCourse, setLoadingCourse] = useState(Boolean(courseId));
  const [removeImage, setRemoveImage] = useState(false);
  const [teacherIds, setTeacherIds] = useState<number[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [certificateConfigs, setCertificateConfigs] = useState<Record<CertificateType, { templateId: string; price: string }>>({
    participation: { templateId: "", price: "" },
    approval: { templateId: "", price: "" },
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      price: 0,
      certificate_included: true,
      certificate_price: 0,
      status: "draft",
      program_type: "course",
      delivery_mode: "virtual_async",
      total_academic_hours: 0,
      synchronous_hours: 0,
      complementary_hours: 0,
      theory_hours: 0,
      practice_hours: 0,
      duration_weeks: 0,
      min_passing_grade: 14,
      min_attendance_percent: 0,
      requires_all_practices_made_up: false,
      makeup_counts_as_attendance: true,
      requires_complementary_hours: false,
      requires_critical_competencies: false,
    },
  });

  const certificateIncluded = useWatch({ control, name: "certificate_included" });

  useEffect(() => {
    if (!imagePreview) return;
    return () => URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  useEffect(() => {
    let active = true;
    api.getCourseFormOptions().then((data) => {
      if (!active) return;
      setOptions({
        teachers: Array.isArray(data?.teachers) ? data.teachers : [],
        certificate_templates: Array.isArray(data?.certificate_templates) ? data.certificate_templates : [],
      });
      if (!Array.isArray(data?.teachers) || !Array.isArray(data?.certificate_templates)) {
        setOptionsError("El servidor devolvió opciones incompletas. Reinicia/actualiza el backend y vuelve a cargar.");
      }
      setOptionsLoading(false);
    }).catch((cause: unknown) => {
      if (active) {
        setOptionsError(cause instanceof Error ? cause.message : "No se pudieron cargar docentes y plantillas");
        setOptionsLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!courseId) return;
    let active = true;
    Promise.all([
      api.getCourseForEdit(courseId),
      api.getCourseSyllabus(courseId).catch(() => null),
    ]).then(([data, syllabusData]) => {
      if (!active) return;
      setCourse(data);
      setSyllabus(syllabusData);
      reset({
        title: data.title ?? "",
        slug: data.slug ?? "",
        short_description: data.short_description ?? "",
        description: data.description ?? "",
        price: Number(data.price ?? 0),
        certificate_included: data.certificate_included ?? true,
        certificate_price: Number(data.certificate_price ?? 0),
        status: data.status ?? "draft",
        program_type: data.program_type ?? "course",
        delivery_mode: data.delivery_mode ?? "virtual_async",
        target_audience: data.target_audience ?? "",
        total_academic_hours: Number(data.total_academic_hours ?? 0),
        synchronous_hours: Number(data.synchronous_hours ?? 0),
        complementary_hours: Number(data.complementary_hours ?? 0),
        theory_hours: Number(data.theory_hours ?? 0),
        practice_hours: Number(data.practice_hours ?? 0),
        duration_weeks: Number(data.duration_weeks ?? 0),
        recommended_frequency: data.recommended_frequency ?? "",
        min_passing_grade: Number(data.min_passing_grade ?? 14),
        min_attendance_percent: Number(data.min_attendance_percent ?? 0),
        requires_all_practices_made_up: Boolean(data.requires_all_practices_made_up),
        makeup_counts_as_attendance: data.makeup_counts_as_attendance ?? true,
        requires_complementary_hours: Boolean(data.requires_complementary_hours),
        requires_critical_competencies: Boolean(data.requires_critical_competencies),
      });
      setTeacherIds(Array.isArray(data.teacher_ids) ? data.teacher_ids : []);
      setResources(Array.isArray(data.resources) ? data.resources.map((resource) => ({ ...resource, file_url: resource.file_url ?? "" })) : []);
      const configs = Array.isArray(data.certificate_configs) ? data.certificate_configs : [];
      setCertificateConfigs({
        participation: { templateId: String(configs.find((item) => item.certificate_type === "participation")?.template_id ?? ""), price: String(configs.find((item) => item.certificate_type === "participation")?.price ?? "") },
        approval: { templateId: String(configs.find((item) => item.certificate_type === "approval")?.template_id ?? ""), price: String(configs.find((item) => item.certificate_type === "approval")?.price ?? "") },
      });
      setLoadingCourse(false);
    }).catch((cause: unknown) => {
      if (active) {
        setError(cause instanceof Error ? cause.message : "No se pudo cargar el curso");
        setLoadingCourse(false);
      }
    });
    return () => { active = false; };
  }, [courseId, reset]);

  const submit = async (data: FormData) => {
    setSaving(true);
    setError(null);
    try {
      const uploadedImage = imageFile ? await api.uploadCourseImage(imageFile) : undefined;
      const payload = {
        title: data.title.trim(),
        slug: data.slug.trim(),
        short_description: data.short_description?.trim() || undefined,
        description: data.description?.trim() || undefined,
        price: data.price,
        certificate_included: data.certificate_included,
        certificate_price: data.certificate_included ? undefined : data.certificate_price,
        program_type: data.program_type || "course",
        delivery_mode: data.delivery_mode || "virtual_async",
        target_audience: data.target_audience?.trim() || undefined,
        total_academic_hours: data.total_academic_hours ?? 0,
        synchronous_hours: data.synchronous_hours ?? 0,
        complementary_hours: data.complementary_hours ?? 0,
        theory_hours: data.theory_hours ?? 0,
        practice_hours: data.practice_hours ?? 0,
        duration_weeks: data.duration_weeks ?? 0,
        recommended_frequency: data.recommended_frequency?.trim() || undefined,
        min_passing_grade: data.min_passing_grade ?? 14,
        min_attendance_percent: data.min_attendance_percent ?? 0,
        requires_all_practices_made_up: Boolean(data.requires_all_practices_made_up),
        makeup_counts_as_attendance: Boolean(data.makeup_counts_as_attendance),
        requires_complementary_hours: Boolean(data.requires_complementary_hours),
        requires_critical_competencies: Boolean(data.requires_critical_competencies),
        ...(removeImage ? { thumbnail_url: null } : uploadedImage ? { thumbnail_url: uploadedImage.url } : {}),
        ...(courseId ? { status: data.status } : {}),
        teacher_ids: teacherIds.map(Number),
        resources: resources.filter((resource) => resource.title.trim()).map((resource, index) => ({ ...resource, sort_order: index })),
        certificate_configs: (Object.entries(certificateConfigs) as [CertificateType, { templateId: string; price: string }][])
          .filter(([, config]) => config.templateId)
          .map(([certificate_type, config]) => ({
            certificate_type,
            template_id: Number(config.templateId),
            price: config.price.trim() ? Number(config.price) : null,
          })),
      };
      if (courseId) await api.updateCourse(courseId, payload);
      else await api.createCourse(payload);
      router.push("/admin/cursos");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudo guardar el curso");
    } finally {
      setSaving(false);
    }
  };

  const teachers = Array.isArray(options?.teachers) ? options.teachers : [];
  const templates = Array.isArray(options?.certificate_templates) ? options.certificate_templates : [];

  if (loadingCourse) return <div className="p-8 text-sm text-ink-soft">Cargando información del curso…</div>;
  if (courseId && !course) {
    return (
      <div className="m-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        <p>{error ?? "No se pudo cargar el curso."}</p>
        <Link href="/admin/cursos" className="mt-3 inline-block font-semibold underline">Volver al listado</Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-line bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/cursos" aria-label="Volver al listado de cursos" className="rounded-lg border border-line p-2 text-ink-soft hover:bg-bg-alt">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="font-serif text-xl font-bold text-navy sm:text-2xl">{courseId ? "Editar curso" : "Nuevo curso"}</h1>
            <p className="mt-0.5 text-xs text-ink-soft">Completa la información académica, del catálogo y de certificación.</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <Link href="/admin/cursos" className="rounded-xl px-4 py-2 text-xs font-semibold text-ink-soft hover:bg-bg-alt">Cancelar</Link>
          <button form="course-create-form" type="submit" disabled={saving || optionsLoading || Boolean(optionsError)} className="inline-flex items-center gap-2 rounded-xl bg-teal px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-tealdeep disabled:opacity-60">
            <BookPlus className="h-4 w-4" /> {saving ? "Guardando…" : courseId ? "Guardar cambios" : "Guardar curso"}
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl space-y-5 p-4 sm:p-6">
        <div className="flex items-start gap-3 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-950">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{courseId ? "La edición conserva matrículas y certificados. Si el curso ya tiene alumnos, la regla de cobro y la configuración de certificados quedan protegidas; si tiene certificados emitidos, también se protegen el título y los docentes históricos." : "El registro queda como borrador. La asignación de docentes, los recursos y las plantillas se guardan junto al curso en una sola transacción."} Las plantillas solo se vinculan; no se modifican las plantillas ni los certificados ya emitidos.</p>
        </div>

        {optionsError && <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">No se pudo preparar el formulario completo: {optionsError} Actualiza/reinicia el backend antes de guardar.</div>}

        {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

        <form id="course-create-form" onSubmit={handleSubmit(submit)} className="space-y-5">
          <section className={sectionClass}>
            <div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-teal">01 · Catálogo</p>
              <h2 className={sectionTitleClass}>Información del curso</h2>
              <p className="mt-1 text-sm text-ink-soft">Datos visibles en el catálogo público y en la ficha del curso.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Título" placeholder="Ej. Cuidados críticos y terapia intensiva" required error={errors.title?.message} {...register("title", { onChange: (event) => {
                const slug = event.target.value.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                setValue("slug", slug, { shouldValidate: true });
              } })} />
              <Input label="Slug de la URL" placeholder="cuidados-criticos" required error={errors.slug?.message} {...register("slug")} />
              <div className="md:col-span-2 space-y-1.5">
                <label htmlFor="short_description" className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">Descripción corta</label>
                <textarea id="short_description" rows={3} maxLength={500} placeholder="Resumen breve para la tarjeta del catálogo" className="w-full resize-y rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/40 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30" {...register("short_description")} />
                {errors.short_description && <p className="text-xs text-red-500">{errors.short_description.message}</p>}
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">Descripción completa</label>
                <textarea id="description" rows={7} placeholder="Temario descriptivo, objetivos y alcance del programa…" className="w-full resize-y rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/40 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30" {...register("description")} />
              </div>
            </div>
          </section>

          <section className={sectionClass}>
            <div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-teal">02 · Portada</p>
              <h2 className={sectionTitleClass}>Imagen del curso</h2>
              <p className="mt-1 text-sm text-ink-soft">Se sube desde este equipo al servidor y se guarda su URL en el curso.</p>
            </div>
            <Input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp" label="Seleccionar imagen" helperText="JPG, PNG o WebP · máximo 5 MB" onChange={(event) => {
              const file = event.currentTarget.files?.[0] ?? null;
              if (file && !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
                setError("La imagen debe ser JPG, PNG o WebP"); event.currentTarget.value = ""; setImageFile(null); setImagePreview(null); return;
              }
              if (file && file.size > 5 * 1024 * 1024) {
                setError("La imagen no puede superar los 5 MB"); event.currentTarget.value = ""; setImageFile(null); setImagePreview(null); return;
              }
              setError(null); setRemoveImage(false); setImageFile(file); setImagePreview(file ? URL.createObjectURL(file) : null);
            }} />
            {(imagePreview || (!removeImage && course?.thumbnail_url)) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imagePreview ?? getPublicAssetUrl(course?.thumbnail_url) ?? ""} alt="Vista previa de la portada" className="max-h-64 w-full rounded-xl border border-line object-cover" />
            ) : (
              <div className="flex min-h-32 items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-bg-alt text-sm text-ink-soft"><ImagePlus className="h-5 w-5" /> Vista previa de la portada</div>
            )}
            {course?.thumbnail_url && !removeImage && <button type="button" onClick={() => { setRemoveImage(true); setImageFile(null); setImagePreview(null); if (imageInputRef.current) imageInputRef.current.value = ""; }} className="text-xs font-semibold text-red-600 hover:underline">Quitar imagen actual</button>}
          </section>

          <section className={sectionClass}>
            <div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-teal">03 · Diseño Curricular (LMS)</p>
              <h2 className={sectionTitleClass}>Estructura Académica y Reglas de Aprobación</h2>
              <p className="mt-1 text-sm text-ink-soft">Define la modalidad, carga horaria y criterios académicos de la versión curricular activa ({course?.version_code ?? "v1.0"}).</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <label className="space-y-1.5">
                <span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">Tipo de programa</span>
                <select {...register("program_type")} className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm">
                  <option value="course">Curso de capacitación</option>
                  <option value="workshop">Taller práctico</option>
                  <option value="diploma">Diplomado</option>
                  <option value="specialization">Especialización</option>
                </select>
              </label>
              <label className="space-y-1.5">
                <span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">Modalidad</span>
                <select {...register("delivery_mode")} className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm">
                  <option value="in_person">Presencial</option>
                  <option value="virtual_sync">Virtual sincrónico (en vivo)</option>
                  <option value="virtual_async">Virtual asincrónico</option>
                  <option value="hybrid">Híbrido / Semipresencial</option>
                </select>
              </label>
              <Input label="Frecuencia recomendada" placeholder="Ej. 1 vez por semana (3h)" {...register("recommended_frequency")} />
              <div className="md:col-span-3">
                <Input label="Público objetivo" placeholder="Ej. Estudiantes, profesionales de la salud, brigadistas y público general" {...register("target_audience")} />
              </div>
              <Input label="Horas académicas totales" type="number" min="0" step="0.5" {...register("total_academic_hours")} />
              <Input label="Horas presenciales / sincrónicas" type="number" min="0" step="0.5" {...register("synchronous_hours")} />
              <Input label="Horas complementarias" type="number" min="0" step="0.5" {...register("complementary_hours")} />
              <Input label="Horas teóricas" type="number" min="0" step="0.5" {...register("theory_hours")} />
              <Input label="Horas prácticas" type="number" min="0" step="0.5" {...register("practice_hours")} />
              <Input label="Duración (semanas)" type="number" min="0" step="1" {...register("duration_weeks")} />
              <Input label="Nota mínima aprobatoria (0-20)" type="number" min="0" max="20" step="0.5" {...register("min_passing_grade")} />
              <Input label="Asistencia mínima obligatoria (%)" type="number" min="0" max="100" step="1" {...register("min_attendance_percent")} />
            </div>
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-bg-alt p-3.5">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-teal" {...register("requires_all_practices_made_up")} />
                <span>
                  <span className="block text-xs font-bold text-navy">Exigir recuperación de prácticas</span>
                  <span className="mt-0.5 block text-[11px] text-ink-soft">El alumno debe asistir o recuperar el 100% de sesiones prácticas obligatorias.</span>
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-bg-alt p-3.5">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-teal" {...register("makeup_counts_as_attendance")} />
                <span>
                  <span className="block text-xs font-bold text-navy">Práctica recuperada convalida asistencia</span>
                  <span className="mt-0.5 block text-[11px] text-ink-soft">La sesión recuperada suma como asistencia válida para el porcentaje mínimo.</span>
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-bg-alt p-3.5">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-teal" {...register("requires_complementary_hours")} />
                <span>
                  <span className="block text-xs font-bold text-navy">Exigir actividades complementarias</span>
                  <span className="mt-0.5 block text-[11px] text-ink-soft">Requiere completar el trabajo autónomo/complementario para aprobar.</span>
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-bg-alt p-3.5">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-teal" {...register("requires_critical_competencies")} />
                <span>
                  <span className="block text-xs font-bold text-navy">Exigir competencias críticas (Gatekeepers)</span>
                  <span className="mt-0.5 block text-[11px] text-ink-soft">Requiere aprobar las competencias prácticas obligatorias (ej. RCP, Hemorragias).</span>
                </span>
              </label>
            </div>
          </section>

          {courseId && syllabus && (
            <CourseSyllabusEditor
              courseId={courseId}
              syllabus={syllabus}
              onRefresh={async () => {
                const updated = await api.getCourseSyllabus(courseId);
                setSyllabus(updated);
              }}
            />
          )}

          {courseId && (
            <CourseCohortsManager
              courseId={courseId}
              teachers={teachers}
            />
          )}

          <section className={sectionClass}>
            <div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-teal">04 · Precio y certificado</p>
              <h2 className={sectionTitleClass}>Regla comercial</h2>
              <p className="mt-1 text-sm text-ink-soft">Esto conserva la estructura actual del curso. No edita plantillas ni certificados ya emitidos.</p>
              {courseId && <label className="space-y-1.5"><span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">Estado</span><select {...register("status")} className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm"><option value="draft">Borrador</option><option value="published">Publicado</option><option value="archived">Archivado</option></select></label>}
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Precio del curso (PEN)" type="number" min="0" step="0.01" required error={errors.price?.message} {...register("price")} />
              <div className="rounded-xl border border-line bg-bg-alt p-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 accent-teal" {...register("certificate_included")} />
                  <span><span className="block text-sm font-semibold text-navy">Certificado incluido</span><span className="mt-1 block text-xs text-ink-soft">Si se desmarca, el certificado tendrá precio separado.</span></span>
                </label>
              </div>
              {!certificateIncluded && <Input label="Precio del certificado (PEN)" type="number" min="0" step="0.01" required error={errors.certificate_price?.message} {...register("certificate_price")} />}
            </div>
          </section>

          <section className={sectionClass}>
            <div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-teal">04 · Equipo docente</p>
              <h2 className={sectionTitleClass}>Docentes asignados</h2>
              <p className="mt-1 text-sm text-ink-soft">Selecciona docentes activos. Su nombre y perfil se mostrarán en la ficha pública.</p>
            </div>
            {teachers.length ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {teachers.map((teacher) => (
                  <label key={teacher.value} className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-3 hover:bg-bg-alt">
                    <input type="checkbox" className="mt-0.5 h-4 w-4 accent-teal" checked={teacherIds.includes(teacher.value)} onChange={(event) => setTeacherIds((current) => event.target.checked ? [...current, teacher.value] : current.filter((id) => id !== teacher.value))} />
                    <span><span className="block text-sm font-semibold text-navy">{teacher.label}</span><span className="block text-xs text-ink-soft">{[teacher.profession, teacher.specialty].filter(Boolean).join(" · ") || "Perfil docente"}</span></span>
                  </label>
                ))}
              </div>
            ) : <p className="rounded-xl border border-dashed border-line p-4 text-sm text-ink-soft">No hay docentes activos disponibles para asignar.</p>}
          </section>

          <section className={sectionClass}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-teal">05 · Materiales</p>
                <h2 className={sectionTitleClass}>Recursos del curso</h2>
                <p className="mt-1 text-sm text-ink-soft">Agrega videos, documentos, enlaces u otros recursos mediante su URL.</p>
              </div>
              <button type="button" onClick={() => setResources((items) => [...items, { resource_type: "link", title: "", file_url: "" }])} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-semibold text-teal hover:bg-bg-alt"><Plus className="h-4 w-4" /> Agregar recurso</button>
            </div>
            {resources.length === 0 ? <p className="rounded-xl border border-dashed border-line p-4 text-sm text-ink-soft">Aún no agregas recursos. Puedes completar esta sección después desde otro curso.</p> : (
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <div key={index} className="grid gap-3 rounded-xl border border-line p-4 md:grid-cols-[150px_1fr_1.3fr_auto]">
                    <label className="space-y-1.5"><span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">Tipo</span><select value={resource.resource_type} onChange={(event) => setResources((items) => items.map((item, i) => i === index ? { ...item, resource_type: event.target.value as Resource["resource_type"] } : item))} className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm"><option value="video">Video</option><option value="pdf">PDF</option><option value="link">Enlace</option><option value="quiz">Evaluación</option><option value="other">Otro</option></select></label>
                    <Input label="Título" required value={resource.title} onChange={(event) => setResources((items) => items.map((item, i) => i === index ? { ...item, title: event.target.value } : item))} />
                    <Input label="URL del recurso" type="url" placeholder="https://…" value={resource.file_url} onChange={(event) => setResources((items) => items.map((item, i) => i === index ? { ...item, file_url: event.target.value } : item))} />
                    <button type="button" aria-label="Eliminar recurso" onClick={() => setResources((items) => items.filter((_, i) => i !== index))} className="self-end rounded-lg p-2.5 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className={sectionClass}>
            <div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-teal">06 · Plantillas</p>
              <h2 className={sectionTitleClass}>Configuración de certificados</h2>
              <p className="mt-1 text-sm text-ink-soft">Vincula una plantilla activa para cada tipo que ofrezca este curso. Las configuraciones apuntan a plantillas existentes; no las editan.</p>
            </div>
            {templates.length === 0 ? <p className="rounded-xl border border-dashed border-line p-4 text-sm text-ink-soft">No hay plantillas activas disponibles. Puedes guardar el curso y configurar esta relación cuando exista una plantilla.</p> : (
              <div className="grid gap-4 md:grid-cols-2">
                {(["participation", "approval"] as const).map((type) => (
                  <div key={type} className="space-y-4 rounded-xl border border-line p-4">
                    <h3 className="text-sm font-bold text-navy">Certificado de {type === "participation" ? "participación" : "aprobación"}</h3>
                    <label className="block space-y-1.5"><span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">Plantilla {courseId ? "" : "activa"}</span><select value={certificateConfigs[type].templateId} onChange={(event) => setCertificateConfigs((current) => ({ ...current, [type]: { ...current[type], templateId: event.target.value } }))} className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm"><option value="">No configurar</option>{templates.filter((template) => template.status === "active" || template.template_id === Number(certificateConfigs[type].templateId)).map((template) => <option key={template.template_id} value={template.template_id}>{template.name}{template.status === "inactive" ? " (inactiva, ya vinculada)" : ""}</option>)}</select></label>
                    <Input label="Precio de esta configuración (PEN)" type="number" min="0" step="0.01" placeholder="Opcional" value={certificateConfigs[type].price} onChange={(event) => setCertificateConfigs((current) => ({ ...current, [type]: { ...current[type], price: event.target.value } }))} />
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="flex flex-col-reverse gap-2 border-t border-line py-4 sm:flex-row sm:justify-end">
            <Link href="/admin/cursos" className="rounded-xl border border-line px-5 py-3 text-center text-sm font-semibold text-ink-soft hover:bg-bg-alt">Cancelar</Link>
            <button type="submit" disabled={saving || optionsLoading || Boolean(optionsError)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal px-5 py-3 text-sm font-semibold text-white hover:bg-tealdeep disabled:opacity-60">
              <BookPlus className="h-4 w-4" /> {saving ? "Guardando…" : courseId ? "Guardar cambios" : "Guardar curso"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
