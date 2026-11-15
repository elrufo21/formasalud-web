"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useHydratedAuth } from "../store/useAuthStore";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Ingresa tus nombres"),
  last_name: z.string().trim().min(2, "Ingresa tus apellidos"),
  email: z.string().trim().email("Ingresa un correo electrónico válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  document_type: z.enum(["dni", "ce", "passport", "other"]),
  document_number: z
    .string()
    .trim()
    .min(6, "Ingresa un número de documento válido"),
  phone: z
    .string()
    .trim()
    .min(7, "Ingresa un número telefónico válido")
    .optional()
    .or(z.literal("")),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const router = useRouter();
  const {
    registerStudent,
    isAuthenticated,
    role: activeRole,
    user: activeUser,
    isHydrated,
    logout,
  } = useHydratedAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
      password: "",
      document_type: "dni",
      document_number: "",
      phone: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError(null);
    try {
      await registerStudent({
        name: data.name.trim(),
        last_name: data.last_name.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
        document_type: data.document_type,
        document_number: data.document_number.trim(),
        phone: data.phone?.trim() || undefined,
      });
      router.push("/aula");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo completar el registro. Verifica tus datos.",
      );
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
          <h2 className="font-serif text-xl font-bold text-navy">
            Cuenta Activa
          </h2>
          <p className="text-xs text-ink-soft mt-1">
            Has iniciado sesión como{" "}
            <strong className="text-navy">
              {activeUser?.name} {activeUser?.last_name}
            </strong>
            .
          </p>
        </div>
        <div className="pt-2 flex flex-col gap-2">
          <button
            type="button"
            onClick={() =>
              router.push(activeRole === "admin" ? "/admin" : "/aula")
            }
            className="w-full py-2.5 px-4 rounded-xl bg-teal text-white font-semibold text-xs hover:bg-tealdeep transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              Ir a {activeRole === "admin" ? "Panel Admin" : "Mi Aula Virtual"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => logout()}
            className="w-full py-2 px-4 rounded-xl border border-line text-ink-soft hover:text-navy text-xs font-medium hover:bg-bg-alt transition-all cursor-pointer"
          >
            Cerrar sesión para registrar otra cuenta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-line shadow-xl p-6 sm:p-8">
      <div className="text-center space-y-1 pb-6 border-b border-line">
        <h2 className="font-serif text-2xl font-bold text-navy">
          Registro de Alumno
        </h2>
        <p className="text-xs text-ink-soft">
          Crea tu cuenta para acceder a tus cursos y certificados oficiales
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 pt-6" noValidate>
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Nombres"
            placeholder="Ej: Ana Lucía"
            autoComplete="given-name"
            required
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Apellidos"
            placeholder="Ej: Torres Quispe"
            autoComplete="family-name"
            required
            error={errors.last_name?.message}
            {...register("last_name")}
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Select
            label="Tipo Doc."
            options={[
              { value: "dni", label: "DNI" },
              { value: "ce", label: "CE" },
              { value: "passport", label: "Pasaporte" },
              { value: "other", label: "Otro" },
            ]}
            {...register("document_type")}
          />
          <div className="col-span-2">
            <Input
              label="Nro. de Documento"
              placeholder="Ej: 71829304"
              inputMode="text"
              required
              error={errors.document_number?.message}
              {...register("document_number")}
            />
          </div>
        </div>

        <Input
          label="Correo Electrónico"
          type="email"
          placeholder="tu.correo@ejemplo.com"
          autoComplete="email"
          required
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Teléfono / WhatsApp"
          type="tel"
          placeholder="Ej: 987654321"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <div className="relative">
          <Input
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            placeholder="Mínimo 6 caracteres"
            autoComplete="new-password"
            required
            error={errors.password?.message}
            className="pr-10"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[30px] text-ink-soft hover:text-navy transition-colors cursor-pointer"
            tabIndex={-1}
            aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-3 py-2.5 px-4 rounded-xl bg-teal text-white font-semibold text-sm hover:bg-tealdeep transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer shadow-sm"
        >
          {loading ? (
            <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Completar Registro y Entrar al Aula</span>
            </>
          )}
        </button>

        {onSwitchToLogin && (
          <div className="pt-3 border-t border-line text-center">
            <p className="text-xs text-ink-soft">
              ¿Ya tienes una cuenta en FormaSalud?{" "}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="font-bold text-navy hover:text-teal transition-colors underline cursor-pointer"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
