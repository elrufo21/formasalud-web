"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Shield, User, ArrowRight, Sparkles } from "lucide-react";
import { useAuthStore, Role } from "../store/useAuthStore";
import { Input } from "@/components/ui/Input";

const loginSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.enum(["admin", "student"]),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { login, demoLogin } = useAuthStore();
  const [role, setRole] = useState<Role>("admin");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: role === "admin" ? "admin@formasalud.pe" : "maritza.huaman@formasalud.pe",
      password: "password123",
      role: "admin",
    },
  });

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setValue("role", newRole);
    if (newRole === "admin") {
      setValue("email", "admin@formasalud.pe");
    } else {
      setValue("email", "maritza.huaman@formasalud.pe");
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);
    try {
      const user = await login(data.email, data.role);
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/aula");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (demoRole: Role) => {
    demoLogin(demoRole);
    if (demoRole === "admin") {
      router.push("/admin");
    } else {
      router.push("/aula");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-line shadow-xl p-6 sm:p-8">
      {/* Header */}
      <div className="text-center space-y-1 pb-6 border-b border-line">
        <h2 className="font-serif text-2xl font-bold text-navy">Iniciar Sesión</h2>
        <p className="text-xs text-ink-soft">
          Ingresa al Aula Virtual o al Panel Administrativo
        </p>

        {/* Role Toggle Selector */}
        <div className="flex p-1 bg-bg-alt rounded-xl border border-line mt-4">
          <button
            type="button"
            onClick={() => handleRoleChange("admin")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
              role === "admin"
                ? "bg-navy text-white shadow-xs"
                : "text-ink-soft hover:text-navy"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Administrador</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("student")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
              role === "student"
                ? "bg-teal text-white shadow-xs"
                : "text-ink-soft hover:text-navy"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Alumno / Aula</span>
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-6">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <Input
          label="Correo Electrónico"
          type="email"
          placeholder="correo@ejemplo.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-2.5 px-4 rounded-xl bg-navy text-white font-semibold text-sm hover:bg-navyink transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          ) : (
            <>
              <span>Acceder como {role === "admin" ? "Administrador" : "Alumno"}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Quick Access Shortcuts */}
      <div className="mt-6 pt-6 border-t border-line space-y-3">
        <p className="text-[11px] font-mono uppercase text-ink-soft text-center tracking-wider">
          Acceso Rápido de Prueba:
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemo("admin")}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-line hover:border-gold/50 bg-bg-alt hover:bg-white text-xs font-semibold text-navy transition-all cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-gold" />
            <span>Demo Admin</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo("student")}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-line hover:border-teal/50 bg-bg-alt hover:bg-white text-xs font-semibold text-teal transition-all cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-teal" />
            <span>Demo Alumno</span>
          </button>
        </div>
      </div>
    </div>
  );
}
