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
