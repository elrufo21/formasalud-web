export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface ApiErrorDetail {
  code: string;
  message: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T | null;
  errors: ApiErrorDetail[];
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly endpoint: string,
    public readonly data: unknown = null,
    public readonly errors: ApiErrorDetail[] = [],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function isApiResponse(data: unknown): data is ApiResponse<unknown> {
  return (
    !!data &&
    typeof data === "object" &&
    "status" in data &&
    "message" in data &&
    "data" in data &&
    "errors" in data &&
    typeof data.status === "number" &&
    typeof data.message === "string" &&
    Array.isArray(data.errors)
  );
}

async function getResponseData(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return response.text().catch(() => undefined);
  }

  return response.json().catch(() => undefined);
}

async function request<T>(
  endpoint: string,
  options?: RequestInit,
  sameOrigin = false,
): Promise<T> {
  const url = sameOrigin ? endpoint : `${API_URL}${endpoint}`;
  const token = getStoredAccessToken();
  const isFormData =
    typeof FormData !== "undefined" && options?.body instanceof FormData;
  let res: Response;

  try {
    res = await fetch(url, {
      ...options,
      headers: {
        ...(!isFormData ? { "Content-Type": "application/json" } : {}),
        ...(token && !endpoint.startsWith("/auth/")
          ? { Authorization: `Bearer ${token}` }
          : {}),
        ...options?.headers,
      },
    });
  } catch {
    const error = new ApiError(
      "No se pudo conectar con el servidor",
      0,
      endpoint,
      null,
      [
        {
          code: "NETWORK_ERROR",
          message: "No se pudo conectar con el servidor",
        },
      ],
    );
    console.error(`[API Error] ${endpoint}:`, error.message);
    throw error;
  }

  const data = await getResponseData(res);
  const response = isApiResponse(data) ? data : undefined;
  if (!res.ok) {
    const error = new ApiError(
      response?.message || `Error ${res.status}: ${res.statusText}`,
      res.status,
      endpoint,
      response?.data,
      response?.errors,
    );
    console.error(`[API Error] ${endpoint}:`, error.message);
    throw error;
  }

  if (res.status === 204) {
    return undefined as T;
  }

  if (!response) {
    const error = new ApiError(
      "El servidor devolvió una respuesta inválida",
      res.status,
      endpoint,
      data,
      [
        {
          code: "INVALID_RESPONSE",
          message: "La respuesta no sigue el contrato de la API",
        },
      ],
    );
    console.error(`[API Error] ${endpoint}:`, error.message);
    throw error;
  }

  return response.data as T;
}

function getStoredAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = JSON.parse(
      window.localStorage.getItem("formasalud_auth_storage") || "null",
    );
    const token = stored?.state?.accessToken;
    return typeof token === "string" ? token : null;
  } catch {
    return null;
  }
}

export interface User {
  user_id: number;
  name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  document_type?: string;
  document_number?: string | null;
  photo_url?: string | null;
  status: "active" | "inactive" | "suspended";
  roles?: string[];
  created_at?: string;
}

export interface Course {
  course_id: number;
  title: string;
  slug: string;
  description?: string | null;
  short_description?: string | null;
  price: number;
  certificate_included: boolean;
  certificate_price?: number | null;
  thumbnail_url?: string | null;
  status: "draft" | "published" | "archived";
  program_type?: string | null;
  delivery_mode?: "in_person" | "virtual_sync" | "virtual_async" | "hybrid" | string | null;
  target_audience?: string | null;
  active_version_id?: number | null;
  version_code?: string | null;
  total_academic_hours?: number | null;
  synchronous_hours?: number | null;
  complementary_hours?: number | null;
  theory_hours?: number | null;
  practice_hours?: number | null;
  duration_weeks?: number | null;
  recommended_frequency?: string | null;
  min_passing_grade?: number | null;
  min_attendance_percent?: number | null;
  requires_all_practices_made_up?: boolean | null;
  makeup_counts_as_attendance?: boolean | null;
  requires_complementary_hours?: boolean | null;
  requires_critical_competencies?: boolean | null;
  published_at?: string | null;
  created_at?: string;
}

export type PublicCourse = Pick<
  Course,
  | "course_id"
  | "title"
  | "slug"
  | "description"
  | "short_description"
  | "price"
  | "certificate_included"
  | "certificate_price"
  | "thumbnail_url"
  | "program_type"
  | "delivery_mode"
  | "target_audience"
  | "total_academic_hours"
  | "synchronous_hours"
  | "complementary_hours"
  | "theory_hours"
  | "practice_hours"
  | "duration_weeks"
  | "recommended_frequency"
  | "min_passing_grade"
  | "min_attendance_percent"
  | "published_at"
> & {
  teachers?: PublicTeacher[];
};

export interface PublicTeacher {
  name: string;
  last_name: string;
  profession?: string | null;
  specialty?: string | null;
  profile_photo_url?: string | null;
}

export interface TeacherProfile extends User {
  profession: string | null;
  specialty: string | null;
  biography: string | null;
  profile_photo_url: string | null;
  cover_photo_url: string | null;
  signature_url: string | null;
  created_at?: string;
}

export interface SaveTeacherData {
  name: string;
  last_name: string;
  email: string;
  password?: string;
  phone: string | null;
  document_type: string | null;
  document_number: string | null;
  status: User["status"];
  profession: string | null;
  specialty: string | null;
  biography: string | null;
  profile_photo_url: string | null;
  cover_photo_url: string | null;
  signature_url: string | null;
}

export interface LoginResponse {
  access_token: string;
  expires_in: number;
  user: Pick<User, "user_id" | "name" | "last_name" | "email"> & {
    roles?: string[];
    role?: string;
    document_type?: string;
    document_number?: string;
    phone?: string;
  };
}

export function getPublicAssetUrl(pathOrUrl?: string | null) {
  if (!pathOrUrl) return undefined;
  try {
    const assetBaseUrl =
      process.env.NEXT_PUBLIC_COURSE_IMAGE_BASE_URL || API_URL;
    return new URL(pathOrUrl, `${assetBaseUrl}/`).toString();
  } catch {
    return undefined;
  }
}

export interface Certificate {
  valid?: boolean;
  certificate_id: number;
  certificate_code: string;
  certificate_type: "approval" | "participation" | "speaker";
  status: "active" | "revoked";
  issued_at: string;
  student_id?: number;
  student_name?: string;
  document_number?: string;
  course_id?: number;
  course_title?: string;
  template_key?: string;
  hours?: number;
  hours_unit?: string;
  course_date_text?: string;
  student?: {
    user_id: number;
    name?: string;
    full_name?: string;
    document_type?: string;
    document_number?: string;
    email?: string;
  };
  course?: {
    course_id: number;
    title: string;
    slug: string;
    price?: number;
    certificate_included?: boolean;
  };
}

export interface CreateUserData {
  name: string;
  last_name: string;
  email: string;
  password?: string;
  phone?: string;
  document_type?: string;
  document_number?: string;
  role?: "student" | "teacher" | "admin";
}

export interface CreateCourseData {
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  price?: number;
  certificate_included?: boolean;
  certificate_price?: number;
  thumbnail_url?: string | null;
  status?: "draft" | "published" | "archived";
  program_type?: string;
  delivery_mode?: string;
  target_audience?: string;
  total_academic_hours?: number;
  synchronous_hours?: number;
  complementary_hours?: number;
  theory_hours?: number;
  practice_hours?: number;
  duration_weeks?: number;
  recommended_frequency?: string;
  min_passing_grade?: number;
  min_attendance_percent?: number;
  requires_all_practices_made_up?: boolean;
  makeup_counts_as_attendance?: boolean;
  requires_complementary_hours?: boolean;
  requires_critical_competencies?: boolean;
  teacher_ids?: number[];
  resources?: {
    resource_type: "video" | "pdf" | "link" | "quiz" | "other";
    title: string;
    file_url?: string;
    sort_order?: number;
  }[];
  certificate_configs?: {
    certificate_type: "participation" | "approval";
    template_id: number;
    price?: number | null;
  }[];
}

export interface CourseLessonItem {
  lesson_id: number;
  module_id?: number | null;
  lesson_number: number;
  week_number?: number | null;
  month_number?: number | null;
  title: string;
  summary?: string | null;
  lesson_type: "theory" | "practice" | "mixed" | "simulation" | "final_evaluation" | string;
  academic_hours: number;
  is_mandatory_practice: boolean;
  syllabus_topics?: string[];
  required_materials?: string[];
  sort_order: number;
  activities?: {
    activity_id: number;
    activity_type: string;
    title: string;
    instructions?: string | null;
    credit_hours?: number;
    is_mandatory: boolean;
    content_config?: Record<string, unknown>;
  }[];
}

export interface CourseModuleItem {
  module_id: number;
  module_number: number;
  title: string;
  description?: string | null;
  sort_order: number;
  lessons: CourseLessonItem[];
}

export interface CourseAssessmentItem {
  assessment_id: number;
  parent_assessment_id?: number | null;
  module_id?: number | null;
  lesson_id?: number | null;
  code: string;
  title: string;
  description?: string | null;
  assessment_type: string;
  weight_percent: number;
  max_score: number;
  min_passing_score?: number | null;
  is_critical_gatekeeper: boolean;
  max_attempts?: number;
  sort_order: number;
}

export interface CourseSyllabus {
  version_id: number;
  course_id: number;
  version_code: string;
  title: string;
  status: string;
  total_academic_hours: number;
  synchronous_hours: number;
  complementary_hours: number;
  theory_hours: number;
  practice_hours: number;
  duration_weeks: number;
  recommended_frequency?: string | null;
  min_passing_grade: number;
  min_attendance_percent: number;
  requires_all_practices_made_up: boolean;
  makeup_counts_as_attendance: boolean;
  requires_complementary_hours: boolean;
  requires_critical_competencies: boolean;
  modules: CourseModuleItem[];
  assessments: CourseAssessmentItem[];
}

export interface SaveCourseModulePayload {
  version_id?: number;
  module_id?: number;
  module_number: number;
  title: string;
  description?: string;
  sort_order?: number;
}

export interface SaveCourseLessonPayload {
  version_id?: number;
  lesson_id?: number;
  module_id?: number | null;
  lesson_number: number;
  week_number?: number | null;
  month_number?: number | null;
  title: string;
  summary?: string;
  lesson_type?: string;
  academic_hours?: number;
  is_mandatory_practice?: boolean;
  syllabus_topics?: string[];
  required_materials?: string[];
  sort_order?: number;
}

export interface SaveCourseAssessmentPayload {
  version_id?: number;
  assessment_id?: number;
  parent_assessment_id?: number | null;
  module_id?: number | null;
  lesson_id?: number | null;
  code: string;
  title: string;
  description?: string;
  assessment_type?: string;
  weight_percent?: number;
  max_score?: number;
  min_passing_score?: number | null;
  is_critical_gatekeeper?: boolean;
  max_attempts?: number;
  sort_order?: number;
}

export interface CourseCohortSummary {
  cohort_id: number;
  course_id: number;
  course_title: string;
  version_id: number;
  cohort_code: string;
  name: string;
  delivery_mode: string;
  start_date?: string | null;
  end_date?: string | null;
  schedule_summary?: string | null;
  venue_name?: string | null;
  max_capacity?: number | null;
  enrolled_count: number;
  status: "planned" | "enrolling" | "in_progress" | "completed" | "cancelled" | string;
}

export interface CourseCohortSession {
  cohort_session_id: number;
  lesson_id: number;
  session_number: number;
  week_number?: number | null;
  title: string;
  lesson_type: string;
  academic_hours: number;
  is_mandatory_practice: boolean;
  teacher_user_id?: number | null;
  teacher_name?: string | null;
  starts_at?: string | null;
  ends_at?: string | null;
  room_or_link?: string | null;
  status: "scheduled" | "in_progress" | "completed" | "rescheduled" | "cancelled" | string;
}

export interface CourseCohortDetail extends CourseCohortSummary {
  venue_address?: string | null;
  meeting_link?: string | null;
  price_override?: number | null;
  sessions: CourseCohortSession[];
}

export interface SaveCourseCohortPayload {
  version_id?: number;
  cohort_code: string;
  name: string;
  delivery_mode?: string;
  start_date?: string | null;
  end_date?: string | null;
  schedule_summary?: string | null;
  venue_name?: string | null;
  venue_address?: string | null;
  meeting_link?: string | null;
  max_capacity?: number | null;
  price_override?: number | null;
  status?: string;
}

export interface UpdateCohortSessionPayload {
  teacher_user_id?: number | null;
  starts_at?: string | null;
  ends_at?: string | null;
  room_or_link?: string | null;
  status?: string;
}

export interface CourseEnrollmentItem {
  enrollment_id: number;
  student_id: number;
  student_name: string;
  document_number?: string | null;
  email: string;
  course_id: number;
  course_title: string;
  cohort_id?: number | null;
  cohort_name?: string | null;
  status: string;
  payment_summary_status: string;
  academic_status: string;
  attendance_percent: number;
  complementary_hours_done: number;
  final_grade?: number | null;
  critical_competencies_passed: boolean;
  certificate_status: string;
  enrolled_at: string;
}

export interface SessionAttendanceItem {
  enrollment_id: number;
  student_id: number;
  student_name: string;
  document_number?: string | null;
  status: "present" | "late" | "absent" | "excused" | string;
  has_record: boolean;
  requires_makeup: boolean;
  makeup_status: "not_required" | "pending" | "completed" | string;
  notes?: string | null;
  makeup_notes?: string | null;
  makeup_at?: string | null;
}

export interface EnrollmentAssessmentGradeItem {
  assessment_id: number;
  parent_assessment_id?: number | null;
  code: string;
  title: string;
  assessment_type: string;
  weight_percent: number;
  max_score: number;
  min_passing_score?: number | null;
  is_critical_gatekeeper: boolean;
  sort_order: number;
  score?: number | null;
  passed?: boolean | null;
  feedback?: string | null;
  graded_at?: string | null;
}

export interface CourseEditData extends Course {
  teacher_ids: number[];
  resources: {
    resource_type: "video" | "pdf" | "link" | "quiz" | "other";
    title: string;
    file_url: string | null;
    sort_order: number;
  }[];
  certificate_configs: {
    certificate_type: "participation" | "approval";
    template_id: number;
    price: number | null;
  }[];
}

export interface CourseFormOptions {
  teachers?: {
    value: number;
    label: string;
    profession: string | null;
    specialty: string | null;
  }[];
  certificate_templates?: {
    template_id: number;
    name: string;
    status: "active" | "inactive";
  }[];
}

export interface GenerateCertificateData {
  student_id: number;
  course_id: number;
  certificate_type?: "approval" | "participation";
  certificate_code?: string;
  validate_payment?: boolean;
  payment_method?: string;
}

export const api = {
  // Usuarios
  getUsers: () => request<User[]>("/user"),
  getUser: (id: number) => request<User>(`/user/${id}`),
  getUserCombo: () =>
    request<{ value: number; label: string }[]>("/user/combo"),
  createUser: (data: CreateUserData) =>
    request<User>("/user", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateUser: (id: number, data: Partial<CreateUserData>) =>
    request<User>(`/user/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteUser: (id: number) =>
    request<{ success: boolean }>(`/user/${id}`, {
      method: "DELETE",
    }),

  // Docentes: cuentas con rol teacher y perfil académico propio.
  getTeachers: () => request<TeacherProfile[]>("/teacher"),
  getTeacher: (id: number) => request<TeacherProfile>(`/teacher/${id}`),
  createTeacher: (data: SaveTeacherData) =>
    request<TeacherProfile>("/teacher", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateTeacher: (id: number, data: SaveTeacherData) =>
    request<TeacherProfile>(`/teacher/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  uploadTeacherImage: (file: File, signature = false) => {
    const formData = new FormData();
    formData.append("folder", signature ? "teacher-signatures" : "teachers");
    formData.append("file", file);
    return request<{ url: string }>("/upload", {
      method: "POST",
      body: formData,
    });
  },
  getTeacherSignaturePreview: async (path: string) => {
    const filename = path.split("/").pop();
    if (!filename) return undefined;
    const token = getStoredAccessToken();
    const response = await fetch(
      `${API_URL}/upload/signatures/${encodeURIComponent(filename)}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    );
    if (!response.ok)
      throw new Error("No se pudo cargar la firma privada del docente");
    return URL.createObjectURL(await response.blob());
  },

  // Cursos
  getCourses: () => request<Course[]>("/course"),
  getPublicCourses: () => request<PublicCourse[]>("/courses"),
  getPublicCourse: (slug: string) =>
    request<PublicCourse>(`/courses/${encodeURIComponent(slug)}`),
  getCourseCombo: () =>
    request<{ value: number; label: string }[]>("/course/combo"),
  getCourseFormOptions: () =>
    request<CourseFormOptions>("/course/form-options"),
  getCourse: (idOrSlug: string | number) =>
    request<Course>(`/course/${idOrSlug}`),
  getCourseForEdit: (courseId: number) =>
    request<CourseEditData>(`/course/${courseId}/edit`),
  getCourseSyllabus: (courseId: number, versionId?: number) =>
    request<CourseSyllabus>(
      `/course/${courseId}/syllabus${versionId ? `?versionId=${versionId}` : ""}`,
    ),
  saveCourseModule: (courseId: number, data: SaveCourseModulePayload) =>
    request<{ module_id: number }>(`/course/${courseId}/modules`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  deleteCourseModule: (courseId: number, moduleId: number) =>
    request<{ deleted: boolean }>(`/course/${courseId}/modules/${moduleId}`, {
      method: "DELETE",
    }),
  saveCourseLesson: (courseId: number, data: SaveCourseLessonPayload) =>
    request<{ lesson_id: number }>(`/course/${courseId}/lessons`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  deleteCourseLesson: (courseId: number, lessonId: number) =>
    request<{ deleted: boolean }>(`/course/${courseId}/lessons/${lessonId}`, {
      method: "DELETE",
    }),
  saveCourseAssessment: (courseId: number, data: SaveCourseAssessmentPayload) =>
    request<{ assessment_id: number }>(`/course/${courseId}/assessments`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  deleteCourseAssessment: (courseId: number, assessmentId: number) =>
    request<{ deleted: boolean }>(
      `/course/${courseId}/assessments/${assessmentId}`,
      {
        method: "DELETE",
      },
    ),
  getCourseCohorts: (courseId: number) =>
    request<CourseCohortSummary[]>(`/course/${courseId}/cohorts`),
  getCourseCohortDetail: (courseId: number, cohortId: number) =>
    request<CourseCohortDetail>(`/course/${courseId}/cohorts/${cohortId}`),
  saveCourseCohort: (courseId: number, data: SaveCourseCohortPayload) =>
    request<CourseCohortDetail>(`/course/${courseId}/cohorts`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateCohortSession: (
    courseId: number,
    cohortSessionId: number,
    data: UpdateCohortSessionPayload,
  ) =>
    request<{ success: boolean; cohort_session_id: number }>(
      `/course/${courseId}/cohorts/sessions/${cohortSessionId}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
    ),
  getCourseEnrollments: (courseId: number, cohortId?: number) =>
    request<CourseEnrollmentItem[]>(
      `/course/${courseId}/enrollments${cohortId ? `?cohortId=${cohortId}` : ""}`,
    ),
  enrollStudentInCourse: (
    courseId: number,
    data: { student_id: number; cohort_id?: number | null; status?: string },
  ) =>
    request<CourseEnrollmentItem>(`/course/${courseId}/enrollments`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getSessionAttendance: (courseId: number, cohortSessionId: number) =>
    request<SessionAttendanceItem[]>(
      `/course/${courseId}/cohorts/sessions/${cohortSessionId}/attendance`,
    ),
  recordSessionAttendance: (
    courseId: number,
    cohortSessionId: number,
    records: {
      enrollment_id: number;
      status: "present" | "late" | "absent" | "excused";
      notes?: string;
    }[],
  ) =>
    request<{ success: boolean; cohort_session_id: number }>(
      `/course/${courseId}/cohorts/sessions/${cohortSessionId}/attendance`,
      {
        method: "POST",
        body: JSON.stringify({ records }),
      },
    ),
  recordSessionMakeup: (
    courseId: number,
    cohortSessionId: number,
    data: { enrollment_id: number; makeup_notes?: string },
  ) =>
    request<unknown>(
      `/course/${courseId}/cohorts/sessions/${cohortSessionId}/makeup`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    ),
  getEnrollmentAssessments: (courseId: number, enrollmentId: number) =>
    request<EnrollmentAssessmentGradeItem[]>(
      `/course/${courseId}/enrollments/${enrollmentId}/assessments`,
    ),
  gradeEnrollmentAssessment: (
    courseId: number,
    enrollmentId: number,
    data: {
      assessment_id: number;
      score?: number | null;
      passed?: boolean;
      feedback?: string;
    },
  ) =>
    request<unknown>(
      `/course/${courseId}/enrollments/${enrollmentId}/assessments`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    ),
  recalculateEnrollmentProgress: (
    courseId: number,
    enrollmentId: number,
    data: { complementary_hours_done?: number; close_evaluation?: boolean },
  ) =>
    request<unknown>(
      `/course/${courseId}/enrollments/${enrollmentId}/recalculate`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    ),
  createCourse: (data: CreateCourseData) =>
    request<Course>("/course", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateCourse: (courseId: number, data: CreateCourseData) =>
    request<Course>(`/course/${courseId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  uploadCourseImage: (file: File) => {
    const formData = new FormData();
    formData.append("folder", "courses");
    formData.append("file", file);
    return request<{ url: string }>(
      "/api/course-image-upload",
      {
        method: "POST",
        body: formData,
      },
      true,
    );
  },

  // Certificados
  getCertificates: () => request<Certificate[]>("/certificate"),
  getMyCertificates: () => request<Certificate[]>("/certificate/mine"),
  getCertificate: (idOrCode: string | number) =>
    request<Certificate>(`/certificate/${idOrCode}`),
  verifyCertificate: (code: string) =>
    request<Certificate | Certificate[]>(`/certificate/verify/${code}`),
  checkEligibility: (studentId: number, courseId: number) =>
    request<unknown>(`/certificate/eligibility/${studentId}/${courseId}`),
  generateCertificate: (data: GenerateCertificateData) =>
    request<Certificate>("/certificate/generate", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Autenticación
  login: (email: string, password: string) =>
    request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  registerStudent: (data: CreateUserData) =>
    request<{ access_token: string; expires_in: number; user: User }>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify({ ...data, role: "student" }),
      },
    ),
};
