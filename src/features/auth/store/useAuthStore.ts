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
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
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
  demoLogin: (role: Role) => void;
  logout: () => void;
}

const dummyStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      role: null,
      isAuthenticated: false,
      isHydrated: false,

      setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),

      login: async (email: string, password: string) => {
        const response = await api.login(email, password);
        const value = isRecord(response.user) ? response.user : response;

        if (
          !isRecord(value) ||
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
            : ["student"];
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

        set({ user: authUser, role, isAuthenticated: true });
        return authUser;
      },

      registerStudent: async (data) => {
        const created = await api.createUser({
          ...data,
          role: "student",
        });

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

        set({ user: authUser, role: "student", isAuthenticated: true });
        return authUser;
      },

      demoLogin: (role: Role) => {
        if (role === "admin") {
          set({
            user: {
              user_id: 999,
              name: "Coordinación",
              last_name: "Académica",
              email: "admin@formasalud.pe",
              document_number: "20613837613",
              roles: ["admin"],
              role: "admin",
            },
            role: "admin",
            isAuthenticated: true,
          });
        } else {
          set({
            user: {
              user_id: 1,
              name: "Maritza",
              last_name: "Huamán Cárdenas",
              email: "maritza.huaman@formasalud.pe",
              document_number: "47829104",
              phone: "987654321",
              roles: ["student"],
              role: "student",
            },
            role: "student",
            isAuthenticated: true,
          });
        }
      },

      logout: () => {
        set({ user: null, role: null, isAuthenticated: false });
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
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Error al restaurar sesión de FormaSalud:", error);
        }
        state?.setHydrated(true);
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
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (store.isHydrated || useAuthStore.persist?.hasHydrated?.()) {
      setHydrated(true);
      if (!store.isHydrated) {
        store.setHydrated(true);
      }
      return;
    }
    const unsub = useAuthStore.persist?.onFinishHydration?.(() => {
      setHydrated(true);
      store.setHydrated(true);
    });
    return () => unsub?.();
  }, [store]);

  return {
    ...store,
    isHydrated: hydrated || store.isHydrated,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object";
}

function isRole(value: unknown): value is Role {
  return value === "admin" || value === "student" || value === "teacher";
}

