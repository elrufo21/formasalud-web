import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api, User } from "@/lib/api";

export type Role = "admin" | "student";

export interface AuthUser {
  user_id: number;
  name: string;
  last_name: string;
  email: string;
  document_type?: string;
  document_number?: string;
  phone?: string;
  role: Role;
}

interface AuthState {
  user: AuthUser | null;
  role: Role | null;
  isAuthenticated: boolean;
  login: (email: string, role?: Role) => Promise<AuthUser>;
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      role: null,
      isAuthenticated: false,

      login: async (email: string, desiredRole: Role = "student") => {
        try {
          const users = await api.getUsers();
          const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

          if (found) {
            const userRole: Role =
              found.roles?.includes("admin") || desiredRole === "admin" ? "admin" : "student";
            const authUser: AuthUser = {
              user_id: found.user_id,
              name: found.name,
              last_name: found.last_name,
              email: found.email,
              document_type: found.document_type || "dni",
              document_number: found.document_number || "",
              phone: found.phone || "",
              role: userRole,
            };

            set({ user: authUser, role: userRole, isAuthenticated: true });
            return authUser;
          }
        } catch {
          // Si el backend no está corriendo o no se encuentra, usar fallback
        }

        // Fallback demo user
        const fallbackUser: AuthUser = {
          user_id: desiredRole === "admin" ? 99 : 1,
          name: desiredRole === "admin" ? "Administrador" : "Maritza",
          last_name: desiredRole === "admin" ? "FormaSalud" : "Huamán Cárdenas",
          email: email,
          document_number: desiredRole === "admin" ? "00000000" : "47829104",
          role: desiredRole,
        };

        set({ user: fallbackUser, role: desiredRole, isAuthenticated: true });
        return fallbackUser;
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
    }
  )
);
