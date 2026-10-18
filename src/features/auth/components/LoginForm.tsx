"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useHydratedAuth } from "../store/useAuthStore";
import { Input } from "@/components/ui/Input";

const loginSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { login, isAuthenticated, role: activeRole, user: activeUser, isHydrated, logout } = useHydratedAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      if (activeRole === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/aula");
      }
    }
  }, [isHydrated, isAuthenticated, activeRole, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);
    try {
      const user = await login(data.email, data.password);
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

  if (isHydrated && isAuthenticated) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-line shadow-xl p-6 sm:p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold text-navy">Sesión Activa</h2>
          <p className="text-xs text-ink-soft mt-1">
            Has iniciado sesión como <strong className="text-navy">{activeUser?.name || (activeRole === "admin" ? "Administrador" : "Alumno")}</strong>. Redirigiendo...
          </p>
        </div>
        <div className="pt-2 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => router.push(activeRole === "admin" ? "/admin" : "/aula")}
            className="w-full py-2.5 px-4 rounded-xl bg-navy text-white font-semibold text-xs hover:bg-navyink transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continuar a {activeRole === "admin" ? "Panel Admin" : "Aula Virtual"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => logout()}
            className="w-full py-2 px-4 rounded-xl border border-line text-ink-soft hover:text-navy text-xs font-medium hover:bg-bg-alt transition-all cursor-pointer"
          >
            Cerrar sesión / Cambiar de cuenta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-line shadow-xl p-6 sm:p-8">
      {/* Header */}
      <div className="text-center space-y-1 pb-6 border-b border-line">
        <h2 className="font-serif text-2xl font-bold text-navy">
          Iniciar Sesión
        </h2>
        <p className="text-xs text-ink-soft">
          Ingresa con tu cuenta de FORMASALUD
        </p>
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
              <span>
                Iniciar sesión
              </span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

    </div>
  );
}
