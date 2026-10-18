import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";

export type Role = "admin" | "student" | "teacher";

export interface AuthUser {
  user_id: number;
  name: string;
  last_name: string;
  email: string;
  document_type?: string;
  document_number?: string;
  phone?: string;
  roles: Role[];
  role: Role;
}

interface AuthState {
  user: AuthUser | null;
  role: Role | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<AuthUser>;
  registerStudent: (data: {
    name: string;
    last_name: string;
    email: string;
    password?: string;
    phone?: string;
    document_type?: string;
    document_number?: string;
  }) => Promise<AuthUser>;
  logout: () => void;
}

const dummyStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      isAuthenticated: false,
      accessToken: null,
      login: async (email: string, password: string) => {
        const response = await api.login(email, password);
        const value = isRecord(response.user) ? response.user : response;
        const accessToken = typeof response.access_token === "string" ? response.access_token : null;

        if (
          !accessToken || !isRecord(value) ||
          typeof value.user_id !== "number" ||
          typeof value.name !== "string" ||
          typeof value.last_name !== "string" ||
          typeof value.email !== "string"
        ) {
          throw new ApiError(
            "El servidor devolvió un usuario inválido",
            200,
            "/auth/login",
            response,
            [{ code: "INVALID_LOGIN_RESPONSE", message: "No se pudo iniciar la sesión" }],
          );
        }

        const roles: Role[] = Array.isArray(value.roles)
          ? value.roles.filter(isRole)
          : isRole(value.role)
            ? [value.role]
            : [];
        if (roles.length === 0) {
          throw new ApiError("La cuenta no tiene un rol válido", 403, "/auth/login");
        }
        const role: Role = roles.includes("admin") ? "admin" : (roles[0] ?? "student");
        const authUser: AuthUser = {
          user_id: value.user_id,
          name: value.name,
          last_name: value.last_name,
          email: value.email,
          document_type: typeof value.document_type === "string" ? value.document_type : undefined,
          document_number: typeof value.document_number === "string" ? value.document_number : undefined,
          phone: typeof value.phone === "string" ? value.phone : undefined,
          roles,
          role,
        };

        set({ user: authUser, role, isAuthenticated: true, accessToken });
        return authUser;
      },

      registerStudent: async (data) => {
        const response = await api.registerStudent({
          ...data,
          role: "student",
        });
        const created = response.user;

        const authUser: AuthUser = {
          user_id: created.user_id,
          name: created.name,
          last_name: created.last_name,
          email: created.email,
          document_type: created.document_type || "dni",
          document_number: created.document_number || "",
          phone: created.phone || "",
          roles: ["student"],
          role: "student",
        };

        set({ user: authUser, role: "student", isAuthenticated: true, accessToken: response.access_token });
        return authUser;
      },

      logout: () => {
        set({ user: null, role: null, isAuthenticated: false, accessToken: null });
      },
    }),
    {
      name: "formasalud_auth_storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : dummyStorage,
      ),
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
      }),
      version: 1,
      migrate: (persistedState) => {
        const state = persistedState as Partial<AuthState>;
        return state.accessToken
          ? state
          : { ...state, user: null, role: null, isAuthenticated: false, accessToken: null };
      },
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Error al restaurar sesión de FormaSalud:", error);
        }
      },
    },
  ),
);

// Sincronización automática de sesión entre pestañas
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === "formasalud_auth_storage") {
      useAuthStore.persist?.rehydrate?.();
    }
  });
}

/**
 * Hook para consumir la sesión asegurando que Zustand ya se sincronizó con el almacenamiento local
 */
export function useHydratedAuth() {
  const store = useAuthStore();
  const [hydrated, setHydrated] = useState(
    () => useAuthStore.persist?.hasHydrated?.() ?? false,
  );

  useEffect(() => {
    if (useAuthStore.persist?.hasHydrated?.()) {
      setHydrated(true);
      return;
    }
    const unsub = useAuthStore.persist?.onFinishHydration?.(() => {
      setHydrated(true);
    });
    return () => unsub?.();
  }, []);

  return {
    ...store,
    isHydrated: hydrated || (useAuthStore.persist?.hasHydrated?.() ?? false),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object";
}

function isRole(value: unknown): value is Role {
  return value === "admin" || value === "student" || value === "teacher";
}

