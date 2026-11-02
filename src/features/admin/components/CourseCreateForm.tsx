"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ThemeProvider,
  Box,
  Typography,
  Stepper,
  Step,
  StepButton,
  Button,
  Card,
  CardContent,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
  Chip,
  Avatar,
  Divider,
  Alert,
  AlertTitle,
  Paper,
  Tabs,
  Tab,
  Tooltip,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  MenuBook as BookIcon,
  Image as ImageIcon,
  School as SchoolIcon,
  WorkspacePremium as CertificateIcon,
  People as PeopleIcon,
  CheckCircle as CheckIcon,
  ArrowBack as BackIcon,
  ArrowForward as NextIcon,
  Save as SaveIcon,
  CloudUpload as UploadIcon,
  DeleteOutlined as DeleteIcon,
  Add as AddIcon,
  Layers as LayersIcon,
  Event as EventIcon,
  Preview as PreviewIcon,
} from "@mui/icons-material";

import {
  api,
  CourseEditData,
  CourseFormOptions,
  CourseSyllabus,
  getPublicAssetUrl,
} from "@/lib/api";
import { formaSaludMuiTheme } from "@/lib/muiTheme";
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

type Resource = {
  resource_type: "video" | "pdf" | "link" | "quiz" | "other";
  title: string;
  file_url: string;
};

type CertificateType = "participation" | "approval";

export function CourseCreateForm({ courseId }: { courseId?: number }) {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Stepper state
  const [activeStep, setActiveStep] = useState(0);

  // Form states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [options, setOptions] = useState<CourseFormOptions>({
    teachers: [],
    certificate_templates: [],
  });
  const [optionsError, setOptionsError] = useState<string | null>(null);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const [course, setCourse] = useState<CourseEditData | null>(null);
  const [syllabus, setSyllabus] = useState<CourseSyllabus | null>(null);
  const [loadingCourse, setLoadingCourse] = useState(Boolean(courseId));
  const [removeImage, setRemoveImage] = useState(false);

  // Advanced sub-tabs for Edit mode (Syllabus vs Cohorts)
  const [editTab, setEditTab] = useState<"syllabus" | "cohorts">("syllabus");

  // Relationships
  const [teacherIds, setTeacherIds] = useState<number[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [certificateConfigs, setCertificateConfigs] = useState<
    Record<CertificateType, { templateId: string; price: string }>
  >({
    participation: { templateId: "", price: "" },
    approval: { templateId: "", price: "" },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    trigger,
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
  const formValues = useWatch({ control });

  useEffect(() => {
    if (!imagePreview) return;
    return () => URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  useEffect(() => {
    let active = true;
    api
      .getCourseFormOptions()
      .then((data) => {
        if (!active) return;
        setOptions({
          teachers: Array.isArray(data?.teachers) ? data.teachers : [],
          certificate_templates: Array.isArray(data?.certificate_templates)
            ? data.certificate_templates
            : [],
        });
        if (
          !Array.isArray(data?.teachers) ||
          !Array.isArray(data?.certificate_templates)
        ) {
          setOptionsError(
            "El servidor devolvió opciones incompletas. Se recomienda verificar el backend.",
          );
        }
        setOptionsLoading(false);
      })
      .catch((cause: unknown) => {
        if (active) {
          setOptionsError(
            cause instanceof Error
              ? cause.message
              : "No se pudieron cargar docentes y plantillas",
          );
          setOptionsLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!courseId) return;
    let active = true;
    Promise.all([
      api.getCourseForEdit(courseId),
      api.getCourseSyllabus(courseId).catch(() => null),
    ])
      .then(([data, syllabusData]) => {
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
          requires_all_practices_made_up: Boolean(
            data.requires_all_practices_made_up,
          ),
          makeup_counts_as_attendance: data.makeup_counts_as_attendance ?? true,
          requires_complementary_hours: Boolean(
            data.requires_complementary_hours,
          ),
          requires_critical_competencies: Boolean(
            data.requires_critical_competencies,
          ),
        });
        setTeacherIds(Array.isArray(data.teacher_ids) ? data.teacher_ids : []);
        setResources(
          Array.isArray(data.resources)
            ? data.resources.map((res) => ({
                ...res,
                file_url: res.file_url ?? "",
              }))
            : [],
        );
        const configs = Array.isArray(data.certificate_configs)
          ? data.certificate_configs
          : [];
        setCertificateConfigs({
          participation: {
            templateId: String(
              configs.find((item) => item.certificate_type === "participation")
                ?.template_id ?? "",
            ),
            price: String(
              configs.find((item) => item.certificate_type === "participation")
                ?.price ?? "",
            ),
          },
          approval: {
            templateId: String(
              configs.find((item) => item.certificate_type === "approval")
                ?.template_id ?? "",
            ),
            price: String(
              configs.find((item) => item.certificate_type === "approval")
                ?.price ?? "",
            ),
          },
        });
        setLoadingCourse(false);
      })
      .catch((cause: unknown) => {
        if (active) {
          setError(
            cause instanceof Error
              ? cause.message
              : "No se pudo cargar el curso",
          );
          setLoadingCourse(false);
        }
      });
    return () => {
      active = false;
    };
  }, [courseId, reset]);

  const submit = async (data: FormData) => {
    setSaving(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const uploadedImage = imageFile
        ? await api.uploadCourseImage(imageFile)
        : undefined;
      const payload = {
        title: data.title.trim(),
        slug: data.slug.trim(),
        short_description: data.short_description?.trim() || undefined,
        description: data.description?.trim() || undefined,
        price: data.price,
        certificate_included: data.certificate_included,
        certificate_price: data.certificate_included
          ? undefined
          : data.certificate_price,
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
        requires_all_practices_made_up: Boolean(
          data.requires_all_practices_made_up,
        ),
        makeup_counts_as_attendance: Boolean(data.makeup_counts_as_attendance),
        requires_complementary_hours: Boolean(
          data.requires_complementary_hours,
        ),
        requires_critical_competencies: Boolean(
          data.requires_critical_competencies,
        ),
        ...(removeImage
          ? { thumbnail_url: null }
          : uploadedImage
            ? { thumbnail_url: uploadedImage.url }
            : {}),
        ...(courseId ? { status: data.status } : {}),
        teacher_ids: teacherIds.map(Number),
        resources: resources
          .filter((res) => res.title.trim())
          .map((res, index) => ({ ...res, sort_order: index })),
        certificate_configs: (
          Object.entries(certificateConfigs) as [
            CertificateType,
            { templateId: string; price: string },
          ][]
        )
          .filter(([, cfg]) => cfg.templateId)
          .map(([certificate_type, cfg]) => ({
            certificate_type,
            template_id: Number(cfg.templateId),
            price: cfg.price.trim() ? Number(cfg.price) : null,
          })),
      };

      if (courseId) {
        await api.updateCourse(courseId, payload);
        setSuccessMsg("¡Curso actualizado con éxito!");
      } else {
        await api.createCourse(payload);
        setSuccessMsg("¡Curso creado con éxito!");
      }
      setTimeout(() => {
        router.push("/admin/cursos");
        router.refresh();
      }, 900);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "No se pudo guardar el curso",
      );
    } finally {
      setSaving(false);
    }
  };

  const steps = [
    { label: "1. Información y Catálogo", icon: <BookIcon fontSize="small" /> },
    { label: "2. Portada & Imagen", icon: <ImageIcon fontSize="small" /> },
    { label: "3. Carga Académica & LMS", icon: <SchoolIcon fontSize="small" /> },
    { label: "4. Comercial & Certificados", icon: <CertificateIcon fontSize="small" /> },
    { label: "5. Docentes & Recursos", icon: <PeopleIcon fontSize="small" /> },
    ...(courseId
      ? [{ label: "6. Módulos & Promociones", icon: <LayersIcon fontSize="small" /> }]
      : []),
  ];

  const handleNext = async () => {
    if (activeStep === 0) {
      const valid = await trigger(["title", "slug", "short_description"]);
      if (!valid) return;
    } else if (activeStep === 3) {
      const valid = await trigger(["price", "certificate_price"]);
      if (!valid) return;
    }
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const teachers = Array.isArray(options?.teachers) ? options.teachers : [];
  const templates = Array.isArray(options?.certificate_templates)
    ? options.certificate_templates
    : [];

  if (loadingCourse) {
    return (
      <ThemeProvider theme={formaSaludMuiTheme}>
        <Box sx={{ p: 6, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography color="text.secondary">Cargando información del programa académico…</Typography>
        </Box>
      </ThemeProvider>
    );
  }

  if (courseId && !course) {
    return (
      <ThemeProvider theme={formaSaludMuiTheme}>
        <Box sx={{ m: 4 }}>
          <Alert severity="error">
            <AlertTitle>Error al cargar el curso</AlertTitle>
            {error ?? "No se encontró el curso solicitado."}
            <Box sx={{ mt: 2 }}>
              <Link href="/admin/cursos">
                <Button variant="outlined" color="error" size="small">
                  Volver al listado
                </Button>
              </Link>
            </Box>
          </Alert>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={formaSaludMuiTheme}>
      <Box sx={{ width: "100%", bgcolor: "#F4F7F6", minHeight: "100vh", pb: 10 }}>
        {/* Top Sticky Header */}
        <Paper
          elevation={0}
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 30,
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "#FFFFFF",
            px: { xs: 2, sm: 4 },
            py: 2,
          }}
        >
          <Box
            sx={{
              maxWidth: 1200,
              mx: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Tooltip title="Volver al catálogo de cursos">
                <IconButton
                  component={Link}
                  href="/admin/cursos"
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "#FFFFFF",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <BackIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "secondary.main" }}>
                    {courseId ? "Editar Programa Académico" : "Nuevo Programa Académico"}
                  </Typography>
                  <Chip
                    label={formValues.status === "published" ? "Publicado" : formValues.status === "archived" ? "Archivado" : "Borrador"}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      bgcolor: formValues.status === "published" ? "#D1FAE5" : formValues.status === "archived" ? "#FEE2E2" : "#FEF3C7",
                      color: formValues.status === "published" ? "#065F46" : formValues.status === "archived" ? "#991B1B" : "#92400E",
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {formValues.title ? formValues.title : "Completa la configuración académica y de certificación"}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Button
                component={Link}
                href="/admin/cursos"
                variant="text"
                color="inherit"
                size="small"
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                disabled={saving || optionsLoading || Boolean(optionsError)}
                onClick={handleSubmit(submit)}
                sx={{
                  bgcolor: "primary.main",
                  fontWeight: 700,
                  px: 3,
                }}
              >
                {saving ? "Guardando…" : courseId ? "Guardar Cambios" : "Guardar Curso"}
              </Button>
            </Box>
          </Box>
        </Paper>

        <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, sm: 4 }, mt: 3 }}>
          {/* Alertas */}
          {optionsError && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              <AlertTitle>Advertencia del servidor</AlertTitle>
              {optionsError}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
              <AlertTitle>Error al guardar</AlertTitle>
              {error}
            </Alert>
          )}

          {successMsg && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMsg(null)}>
              {successMsg}
            </Alert>
          )}

          {/* Stepper Navigation Card */}
          <Card sx={{ mb: 3, overflow: "visible" }}>
            <CardContent sx={{ py: 2.5, "&:last-child": { pb: 2.5 } }}>
              <Stepper
                nonLinear
                activeStep={activeStep}
                alternativeLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    cursor: "pointer",
                    transition: "color 0.2s",
                  },
                }}
              >
                {steps.map((step, index) => (
                  <Step key={step.label} completed={index < activeStep}>
                    <StepButton onClick={() => setActiveStep(index)} icon={step.icon}>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {step.label}
                      </Typography>
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>

          {/* STEP 0: Información y Catálogo */}
          {activeStep === 0 && (
            <Card sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 800, letterSpacing: 1.2 }}>
                  PASO 1 DE {steps.length}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "secondary.main" }}>
                  Información General y del Catálogo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Estos datos se mostrarán en la ficha pública, landing page y aula virtual del estudiante.
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
                <Box sx={{ gridColumn: { xs: "span 1", md: "span 2" } }}>
                  <TextField
                    fullWidth
                    label="Nombre / Título Oficial del Programa"
                    placeholder="Ej. Cuidados de Enfermería en Paciente Crítico"
                    required
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message || "Mínimo 5 caracteres. Debe ser claro y formal."}
                    {...register("title", {
                      onChange: (event) => {
                        const autoSlug = event.target.value
                          .toLowerCase()
                          .trim()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-|-$/g, "");
                        setValue("slug", autoSlug, { shouldValidate: true });
                      },
                    })}
                  />
                </Box>

                <TextField
                  fullWidth
                  label="Slug de URL (Enlace amigable)"
                  placeholder="cuidados-enfermeria-paciente-critico"
                  required
                  error={Boolean(errors.slug)}
                  helperText={errors.slug?.message || "Se autogenera a partir del título. Define la URL del curso."}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            formasalud.org.pe/cursos/
                          </Typography>
                        </InputAdornment>
                      ),
                    },
                  }}
                  {...register("slug")}
                />

                <TextField
                  select
                  fullWidth
                  label="Tipo de Programa"
                  defaultValue="course"
                  {...register("program_type")}
                  helperText="Clasificación en el catálogo y diplomas"
                >
                  <MenuItem value="course">Curso de Capacitación</MenuItem>
                  <MenuItem value="workshop">Taller Práctico / Workshop</MenuItem>
                  <MenuItem value="diploma">Diplomado Académico</MenuItem>
                  <MenuItem value="specialization">Especialización de Posgrado</MenuItem>
                  <MenuItem value="webinar">Webinar / Conferencia</MenuItem>
                </TextField>

                <Box sx={{ gridColumn: { xs: "span 1", md: "span 2" } }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Descripción Breve (Extracto para tarjeta del catálogo)"
                    placeholder="Resumen conciso de 1 o 2 líneas que atraiga al alumno y destaque en la grilla…"
                    error={Boolean(errors.short_description)}
                    helperText={`${formValues.short_description?.length || 0}/500 caracteres`}
                    slotProps={{
                      htmlInput: { maxLength: 500 },
                    }}
                    {...register("short_description")}
                  />
                </Box>

                <Box sx={{ gridColumn: { xs: "span 1", md: "span 2" } }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Descripción Completa y Temario del Programa"
                    placeholder="Detalla los objetivos de aprendizaje, justificación clínica, metodología pedagógica y alcance..."
                    {...register("description")}
                  />
                </Box>
              </Box>
            </Card>
          )}

          {/* STEP 1: Portada & Imagen */}
          {activeStep === 1 && (
            <Card sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 800, letterSpacing: 1.2 }}>
                  PASO 2 DE {steps.length}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "secondary.main" }}>
                  Imagen de Portada e Identidad Visual
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Esta imagen ilustra la ficha en la web pública, el aula virtual y las redes sociales.
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" }, gap: 4, alignItems: "start" }}>
                {/* Zona de Carga */}
                <Box>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 4,
                      border: "2px dashed",
                      borderColor: imagePreview || course?.thumbnail_url ? "primary.main" : "divider",
                      borderRadius: 3,
                      textAlign: "center",
                      bgcolor: "background.default",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": { borderColor: "primary.main", bgcolor: "#E8F1EF" },
                    }}
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      style={{ display: "none" }}
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0] ?? null;
                        if (file && !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
                          setError("Formato incompatible. Usa JPG, PNG o WebP.");
                          return;
                        }
                        if (file && file.size > 5 * 1024 * 1024) {
                          setError("El archivo supera el límite de 5 MB.");
                          return;
                        }
                        setError(null);
                        setRemoveImage(false);
                        setImageFile(file);
                        setImagePreview(file ? URL.createObjectURL(file) : null);
                      }}
                    />
                    <UploadIcon sx={{ fontSize: 48, color: "primary.main", mb: 1.5 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      Haz clic para subir o arrastrar una imagen
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      Formatos soportados: JPG, PNG o WebP (Máx. 5 MB)
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{ mt: 2 }}
                    >
                      Examinar archivos
                    </Button>
                  </Paper>

                  {(imagePreview || (!removeImage && course?.thumbnail_url)) && (
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="caption" color="text.secondary">
                        {imageFile ? `Archivo seleccionado: ${imageFile.name}` : "Imagen existente en el servidor"}
                      </Typography>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          setRemoveImage(true);
                          setImageFile(null);
                          setImagePreview(null);
                          if (imageInputRef.current) imageInputRef.current.value = "";
                        }}
                      >
                        Quitar imagen
                      </Button>
                    </Box>
                  )}
                </Box>

                {/* Previsualización en Vivo de la Card */}
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                    <PreviewIcon fontSize="small" color="primary" /> Vista previa en el catálogo:
                  </Typography>

                  <Card sx={{ maxWidth: 380, mx: "auto", overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
                    <Box sx={{ position: "relative", height: 180, bgcolor: "secondary.dark" }}>
                      {imagePreview || (!removeImage && course?.thumbnail_url) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imagePreview ?? getPublicAssetUrl(course?.thumbnail_url) ?? ""}
                          alt="Preview"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF80" }}>
                          <ImageIcon sx={{ fontSize: 48 }} />
                        </Box>
                      )}
                      <Chip
                        label={formValues.program_type?.toUpperCase() || "CURSO"}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          bgcolor: "#0F2942E6",
                          color: "#EFDFAE",
                          fontWeight: 700,
                          fontSize: "0.65rem",
                        }}
                      />
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 1 }}>
                        {formValues.title || "Título del Programa Académico"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem", mb: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {formValues.short_description || "Aquí aparecerá la descripción concisa del curso en la tienda..."}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: "primary.main" }}>
                          {formValues.price && Number(formValues.price) > 0 ? `S/ ${Number(formValues.price).toFixed(2)}` : "GRATUITO"}
                        </Typography>
                        <Chip
                          label={certificateIncluded ? "Certificado Incluido" : "Certificado Opcional"}
                          size="small"
                          color={certificateIncluded ? "success" : "default"}
                          sx={{ fontSize: "0.65rem", height: 22 }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Card>
          )}

          {/* STEP 2: Carga Académica & LMS */}
          {activeStep === 2 && (
            <Card sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 800, letterSpacing: 1.2 }}>
                  PASO 3 DE {steps.length}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "secondary.main" }}>
                  Estructura Curricular y Criterios de Aprobación
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Define la carga horaria en los dos ejes pedagógicos y los requisitos académicos para emitir diplomas.
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 3 }}>
                <TextField
                  select
                  fullWidth
                  label="Modalidad de Impartición"
                  defaultValue="virtual_async"
                  {...register("delivery_mode")}
                >
                  <MenuItem value="in_person">Presencial en Sede</MenuItem>
                  <MenuItem value="virtual_sync">Virtual Sincrónico (En vivo vía Zoom/Meet)</MenuItem>
                  <MenuItem value="virtual_async">Virtual Asincrónico (Aula Virtual)</MenuItem>
                  <MenuItem value="hybrid">Híbrido / Semipresencial</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  label="Frecuencia Recomendada"
                  placeholder="Ej. Sábados de 9:00 a 13:00"
                  {...register("recommended_frequency")}
                />

                <TextField
                  fullWidth
                  type="number"
                  label="Duración Estimada (Semanas)"
                  slotProps={{ htmlInput: { min: 0, step: 1 } }}
                  {...register("duration_weeks")}
                />

                <Box sx={{ gridColumn: { xs: "span 1", sm: "span 2", md: "span 3" } }}>
                  <TextField
                    fullWidth
                    label="Público Objetivo / Dirigido a"
                    placeholder="Ej. Médicos, licenciados en enfermería, internos de salud y técnicos paramédicos"
                    {...register("target_audience")}
                  />
                </Box>

                <TextField
                  fullWidth
                  type="number"
                  label="Horas Académicas Totales"
                  helperText="Créditos totales en el diploma"
                  slotProps={{ htmlInput: { min: 0, step: 0.5 } }}
                  {...register("total_academic_hours")}
                />

                <TextField
                  fullWidth
                  type="number"
                  label="Horas Teóricas"
                  slotProps={{ htmlInput: { min: 0, step: 0.5 } }}
                  {...register("theory_hours")}
                />

                <TextField
                  fullWidth
                  type="number"
                  label="Horas Prácticas / Simulación"
                  slotProps={{ htmlInput: { min: 0, step: 0.5 } }}
                  {...register("practice_hours")}
                />

                <TextField
                  fullWidth
                  type="number"
                  label="Horas Sincrónicas / En vivo"
                  slotProps={{ htmlInput: { min: 0, step: 0.5 } }}
                  {...register("synchronous_hours")}
                />

                <TextField
                  fullWidth
                  type="number"
                  label="Horas Complementarias (Autónomo)"
                  slotProps={{ htmlInput: { min: 0, step: 0.5 } }}
                  {...register("complementary_hours")}
                />

                <TextField
                  fullWidth
                  type="number"
                  label="Nota Mínima Aprobatoria (0 - 20)"
                  slotProps={{ htmlInput: { min: 0, max: 20, step: 0.5 } }}
                  helperText="Generalmente 14.0 en diplomados de salud"
                  {...register("min_passing_grade")}
                />

                <TextField
                  fullWidth
                  type="number"
                  label="Asistencia Mínima (%)"
                  slotProps={{ htmlInput: { min: 0, max: 100, step: 1 } }}
                  helperText="Ej. 80% para habilitar certificación"
                  {...register("min_attendance_percent")}
                />
              </Box>

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 4, mb: 2, color: "secondary.main" }}>
                Condiciones Especiales de Aprobación
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <FormControlLabel
                    control={<Switch color="primary" {...register("requires_all_practices_made_up")} />}
                    label={
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          Exigir Recuperación de Prácticas
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          El alumno debe asistir o recuperar el 100% de los talleres obligatorios.
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>

                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <FormControlLabel
                    control={<Switch color="primary" {...register("makeup_counts_as_attendance")} />}
                    label={
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          Práctica Recuperada Convalida Asistencia
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          La sesión recuperada se suma al porcentaje mínimo exigido.
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>

                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <FormControlLabel
                    control={<Switch color="primary" {...register("requires_complementary_hours")} />}
                    label={
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          Exigir Actividades Complementarias
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Requiere completar tareas y lecturas del aula virtual para aprobar.
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>

                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <FormControlLabel
                    control={<Switch color="primary" {...register("requires_critical_competencies")} />}
                    label={
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          Competencias Críticas (Gatekeepers)
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Requiere aprobar evaluaciones clave (ej. RCP o Reanimación) sin importar el promedio.
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>
              </Box>
            </Card>
          )}

          {/* STEP 3: Comercial & Certificados */}
          {activeStep === 3 && (
            <Card sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 800, letterSpacing: 1.2 }}>
                  PASO 4 DE {steps.length}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "secondary.main" }}>
                  Reglas Comerciales y Plantillas de Certificación
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Establece los costos de matrícula y vincula los diplomas oficiales a emitir al culminar.
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Precio del Curso (PEN)"
                  slotProps={{
                    htmlInput: { min: 0, step: 0.01 },
                    input: {
                      startAdornment: <InputAdornment position="start">S/</InputAdornment>,
                    },
                  }}
                  error={Boolean(errors.price)}
                  helperText={errors.price?.message || "Coloca 0 si el curso es 100% de libre acceso"}
                  {...register("price")}
                />

                {courseId && (
                  <TextField
                    select
                    fullWidth
                    label="Estado de Publicación"
                    {...register("status")}
                  >
                    <MenuItem value="draft">Borrador (Oculto)</MenuItem>
                    <MenuItem value="published">Publicado (Visible en catálogo)</MenuItem>
                    <MenuItem value="archived">Archivado (Cerrado a inscripciones)</MenuItem>
                  </TextField>
                )}

                <Box sx={{ gridColumn: { xs: "span 1", md: "span 2" } }}>
                  <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, bgcolor: "#F4F7F6" }}>
                    <FormControlLabel
                      control={<Switch color="primary" {...register("certificate_included")} />}
                      label={
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "secondary.main" }}>
                            Certificado Incluido en el Precio del Curso
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Si está activo, el diploma se emite automáticamente tras aprobar. Si se desmarca, el alumno podrá comprar el certificado aparte.
                          </Typography>
                        </Box>
                      }
                    />
                  </Paper>
                </Box>

                {!certificateIncluded && (
                  <Box sx={{ gridColumn: { xs: "span 1", md: "span 2" } }}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Precio del Certificado Separado (PEN)"
                      slotProps={{
                        htmlInput: { min: 0, step: 0.01 },
                        input: {
                          startAdornment: <InputAdornment position="start">S/</InputAdornment>,
                        },
                      }}
                      error={Boolean(errors.certificate_price)}
                      helperText={errors.certificate_price?.message || "Monto a cobrar por tramitar y descargar el diploma"}
                      {...register("certificate_price")}
                    />
                  </Box>
                )}
              </Box>

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 4, mb: 1, color: "secondary.main" }}>
                Vinculación de Plantillas Oficiales de Certificado
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Asocia los diseños con código QR y firmas digitales que el sistema generará automáticamente.
              </Typography>

              {templates.length === 0 ? (
                <Alert severity="info">
                  No hay plantillas activas cargadas en este momento. Podrás vincularlas más adelante.
                </Alert>
              ) : (
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
                  {(["approval", "participation"] as const).map((type) => (
                    <Paper key={type} variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <CertificateIcon sx={{ color: type === "approval" ? "warning.main" : "primary.main" }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          Certificado de {type === "approval" ? "Aprobación Oficial" : "Participación / Asistencia"}
                        </Typography>
                      </Box>

                      <TextField
                        select
                        fullWidth
                        label="Seleccionar Plantilla"
                        value={certificateConfigs[type].templateId}
                        onChange={(event) =>
                          setCertificateConfigs((curr) => ({
                            ...curr,
                            [type]: { ...curr[type], templateId: event.target.value },
                          }))
                        }
                        sx={{ mb: 2 }}
                      >
                        <MenuItem value="">Sin plantilla (No emitir este tipo)</MenuItem>
                        {templates.map((tpl) => (
                          <MenuItem key={tpl.template_id} value={tpl.template_id}>
                            {tpl.name} {tpl.status === "inactive" ? "(Inactiva)" : ""}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        fullWidth
                        type="number"
                        label="Precio Específico de este Diploma (Opcional)"
                        placeholder="Dejar vacío para usar precio por defecto"
                        slotProps={{
                          htmlInput: { min: 0, step: 0.01 },
                          input: {
                            startAdornment: <InputAdornment position="start">S/</InputAdornment>,
                          },
                        }}
                        value={certificateConfigs[type].price}
                        onChange={(event) =>
                          setCertificateConfigs((curr) => ({
                            ...curr,
                            [type]: { ...curr[type], price: event.target.value },
                          }))
                        }
                      />
                    </Paper>
                  ))}
                </Box>
              )}
            </Card>
          )}

          {/* STEP 4: Docentes & Recursos */}
          {activeStep === 4 && (
            <Card sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 800, letterSpacing: 1.2 }}>
                  PASO 5 DE {steps.length}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "secondary.main" }}>
                  Plana Docente y Materiales de Descarga
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Selecciona a los profesionales a cargo del dictado y provee enlaces a libros, guías clínicas o diapositivas.
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: "secondary.main" }}>
                Docentes Asignados al Programa
              </Typography>

              {teachers.length === 0 ? (
                <Alert severity="warning" sx={{ mb: 3 }}>
                  No hay docentes registrados o activos en el sistema. Puedes crearlos en el módulo Docentes.
                </Alert>
              ) : (
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 2, mb: 4 }}>
                  {teachers.map((teacher) => {
                    const isSelected = teacherIds.includes(teacher.value);
                    return (
                      <Paper
                        key={teacher.value}
                        variant="outlined"
                        onClick={() =>
                          setTeacherIds((curr) =>
                            isSelected
                              ? curr.filter((id) => id !== teacher.value)
                              : [...curr, teacher.value],
                          )
                        }
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          borderColor: isSelected ? "primary.main" : "divider",
                          bgcolor: isSelected ? "#E8F1EF" : "background.paper",
                          "&:hover": { borderColor: "primary.main" },
                        }}
                      >
                        <Avatar
                          sx={{ bgcolor: isSelected ? "primary.main" : "secondary.main" }}
                        >
                          {teacher.label.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {teacher.label}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {[teacher.profession, teacher.specialty].filter(Boolean).join(" · ") || "Docente Clínico"}
                          </Typography>
                        </Box>
                        {isSelected && <CheckIcon fontSize="small" color="primary" />}
                      </Paper>
                    );
                  })}
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "secondary.main" }}>
                    Recursos y Materiales Digitales
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Enlaces a Google Drive, carpetas de lecturas o videos complementarios
                  </Typography>
                </Box>
                <Button
                  startIcon={<AddIcon />}
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    setResources((curr) => [
                      ...curr,
                      { resource_type: "link", title: "", file_url: "" },
                    ])
                  }
                >
                  Agregar Recurso
                </Button>
              </Box>

              {resources.length === 0 ? (
                <Paper variant="outlined" sx={{ p: 4, textAlign: "center", borderRadius: 2, bgcolor: "background.default" }}>
                  <Typography variant="body2" color="text.secondary">
                    Aún no se han agregado recursos de descarga. Haz clic en "Agregar Recurso" para vincular materiales.
                  </Typography>
                </Paper>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {resources.map((resource, index) => (
                    <Paper key={index} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "140px 1fr 1.5fr auto" }, gap: 2, alignItems: "center" }}>
                        <TextField
                          select
                          size="small"
                          label="Tipo"
                          value={resource.resource_type}
                          onChange={(e) =>
                            setResources((curr) =>
                              curr.map((item, i) =>
                                i === index
                                  ? {
                                      ...item,
                                      resource_type: e.target.value as Resource["resource_type"],
                                    }
                                  : item,
                              ),
                            )
                          }
                        >
                          <MenuItem value="link">Enlace Web</MenuItem>
                          <MenuItem value="pdf">Documento PDF</MenuItem>
                          <MenuItem value="video">Video Externo</MenuItem>
                          <MenuItem value="quiz">Evaluación</MenuItem>
                          <MenuItem value="other">Otro</MenuItem>
                        </TextField>

                        <TextField
                          size="small"
                          label="Título del Material"
                          placeholder="Ej. Guía RCP 2026"
                          required
                          value={resource.title}
                          onChange={(e) =>
                            setResources((curr) =>
                              curr.map((item, i) =>
                                i === index ? { ...item, title: e.target.value } : item,
                              ),
                            )
                          }
                        />

                        <TextField
                          size="small"
                          label="URL del Archivo / Enlace"
                          placeholder="https://drive.google.com/..."
                          value={resource.file_url}
                          onChange={(e) =>
                            setResources((curr) =>
                              curr.map((item, i) =>
                                i === index ? { ...item, file_url: e.target.value } : item,
                              ),
                            )
                          }
                        />

                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => setResources((curr) => curr.filter((_, i) => i !== index))}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              )}
            </Card>
          )}

          {/* STEP 5: Módulos & Promociones (Solo en modo edición) */}
          {courseId && activeStep === 5 && (
            <Card sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 800, letterSpacing: 1.2 }}>
                  CONFIGURACIÓN AVANZADA
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "secondary.main" }}>
                  Módulos Curriculares y Promociones (Cohortes)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gestiona la malla de lecciones y las fechas/sedes de dictado presencial o virtual.
                </Typography>
              </Box>

              <Tabs
                value={editTab}
                onChange={(_, val) => setEditTab(val)}
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  mb: 3,
                  "& .MuiTab-root": { fontWeight: 700, textTransform: "none" },
                }}
              >
                <Tab
                  value="syllabus"
                  icon={<LayersIcon />}
                  iconPosition="start"
                  label="Plan de Estudios (Módulos & Lecciones)"
                />
                <Tab
                  value="cohorts"
                  icon={<EventIcon />}
                  iconPosition="start"
                  label="Promociones & Sesiones de Dictado"
                />
              </Tabs>

              {editTab === "syllabus" && syllabus && (
                <CourseSyllabusEditor
                  courseId={courseId}
                  syllabus={syllabus}
                  onRefresh={async () => {
                    const updated = await api.getCourseSyllabus(courseId);
                    setSyllabus(updated);
                  }}
                />
              )}

              {editTab === "cohorts" && (
                <CourseCohortsManager
                  courseId={courseId}
                  teachers={teachers}
                />
              )}
            </Card>
          )}

          {/* Navigation Action Buttons Card */}
          <Paper
            elevation={0}
            sx={{
              mt: 3,
              p: 2.5,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#FFFFFF",
            }}
          >
            <Button
              variant="outlined"
              color="inherit"
              disabled={activeStep === 0}
              startIcon={<BackIcon />}
              onClick={handleBack}
              sx={{ fontWeight: 600 }}
            >
              Anterior
            </Button>

            <Box sx={{ display: "flex", gap: 1.5 }}>
              {activeStep < steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<NextIcon />}
                  onClick={handleNext}
                  sx={{ fontWeight: 700, px: 3 }}
                >
                  Siguiente
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  disabled={saving || optionsLoading || Boolean(optionsError)}
                  onClick={handleSubmit(submit)}
                  sx={{ fontWeight: 700, px: 3.5 }}
                >
                  {saving ? "Guardando…" : courseId ? "Guardar Cambios" : "Guardar Curso"}
                </Button>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
