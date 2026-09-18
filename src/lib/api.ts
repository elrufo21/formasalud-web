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

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  let res: Response;

  try {
    res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
  } catch {
    const error = new ApiError(
      "No se pudo conectar con el servidor",
      0,
      endpoint,
      null,
      [{ code: "NETWORK_ERROR", message: "No se pudo conectar con el servidor" }],
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
      [{ code: "INVALID_RESPONSE", message: "La respuesta no sigue el contrato de la API" }],
    );
    console.error(`[API Error] ${endpoint}:`, error.message);
    throw error;
  }

  return response.data as T;
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

export interface Certificate {
  valid?: boolean;
  certificate_id: number;
  certificate_code: string;
  certificate_type: "approval" | "participation";
  status: "active" | "revoked";
  issued_at: string;
  student_id?: number;
  student_name?: string;
  document_number?: string;
  course_id?: number;
  course_title?: string;
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
  thumbnail_url?: string;
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

  // Cursos
  getCourses: () => request<Course[]>("/course"),
  getCourseCombo: () =>
    request<{ value: number; label: string }[]>("/course/combo"),
  getCourse: (idOrSlug: string | number) =>
    request<Course>(`/course/${idOrSlug}`),
  createCourse: (data: CreateCourseData) =>
    request<Course>("/course", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Certificados
  getCertificates: () => request<Certificate[]>("/certificate"),
  getCertificate: (idOrCode: string | number) =>
    request<Certificate>(`/certificate/${idOrCode}`),
  verifyCertificate: (code: string) =>
    request<Certificate | Certificate[]>(`/certificate/verify/${code}`),
  checkEligibility: (studentId: number, courseId: number) =>
    request<any>(`/certificate/eligibility/${studentId}/${courseId}`),
  generateCertificate: (data: GenerateCertificateData) =>
    request<Certificate>("/certificate/generate", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Autenticación
  login: (email: string, password: string) =>
    request<any>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
};
