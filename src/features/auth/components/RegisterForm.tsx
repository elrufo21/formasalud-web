"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const registerSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre"),
  last_name: z.string().min(2, "Ingresa tus apellidos"),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener mínimo 6 caracteres"),
  document_type: z.enum(["dni", "ce", "passport", "other"]),
  document_number: z.string().min(8, "Ingresa un número de documento válido"),
  phone: z.string().min(7, "Ingresa un número telefónico").optional().or(z.literal("")),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const { registerStudent } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      document_type: "dni",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError(null);
    try {
      await registerStudent({
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        document_type: data.document_type,
        document_number: data.document_number,
        phone: data.phone || undefined,
      });
      router.push("/aula");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-line shadow-xl p-6 sm:p-8">
      <div className="text-center space-y-1 pb-6 border-b border-line">
        <h2 className="font-serif text-2xl font-bold text-navy">Registro de Alumno</h2>
        <p className="text-xs text-ink-soft">
          Crea tu cuenta para acceder a tus cursos y certificados
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 pt-6">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Nombres"
            placeholder="Ej: Ana Lucía"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Apellidos"
            placeholder="Ej: Torres Q."
            error={errors.last_name?.message}
            {...register("last_name")}
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Select
            label="Doc."
            options={[
              { value: "dni", label: "DNI" },
              { value: "ce", label: "CE" },
              { value: "passport", label: "Pas." },
            ]}
            {...register("document_type")}
          />
          <div className="col-span-2">
            <Input
              label="Nro. Documento"
              placeholder="Ej: 71829304"
              error={errors.document_number?.message}
              {...register("document_number")}
            />
          </div>
        </div>

        <Input
          label="Correo Electrónico"
          type="email"
          placeholder="tu.correo@ejemplo.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Teléfono / WhatsApp"
          placeholder="Ej: 987654321"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="Mínimo 6 caracteres"
          error={errors.password?.message}
          {...register("password")}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-3 py-2.5 px-4 rounded-xl bg-teal text-white font-semibold text-sm hover:bg-tealdeep transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
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
      </form>
    </div>
  );
}
