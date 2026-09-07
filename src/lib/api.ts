export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${res.status}: ${res.statusText}`);
    }

    return res.json();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error de conexión";
    console.error(`[API Error] ${endpoint}:`, message);
    throw err;
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

export interface Certificate {
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
    name: string;
    document_type?: string;
    document_number?: string;
    email: string;
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
  getUserCombo: () => request<{ value: number; label: string }[]>("/user/combo"),
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
  getCourseCombo: () => request<{ value: number; label: string }[]>("/course/combo"),
  getCourse: (idOrSlug: string | number) => request<Course>(`/course/${idOrSlug}`),
  createCourse: (data: CreateCourseData) =>
    request<Course>("/course", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Certificados
  getCertificates: () => request<Certificate[]>("/certificate"),
  getCertificate: (idOrCode: string | number) => request<Certificate>(`/certificate/${idOrCode}`),
  verifyCertificate: (code: string) => request<any>(`/certificate/verify/${code}`),
  checkEligibility: (studentId: number, courseId: number) =>
    request<any>(`/certificate/eligibility/${studentId}/${courseId}`),
  generateCertificate: (data: GenerateCertificateData) =>
    request<Certificate>("/certificate/generate", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
