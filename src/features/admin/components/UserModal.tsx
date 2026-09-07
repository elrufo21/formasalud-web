"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserPlus } from "lucide-react";
import { api, CreateUserData } from "@/lib/api";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const userSchema = z.object({
  name: z.string().min(2, "Nombres requeridos"),
  last_name: z.string().min(2, "Apellidos requeridos"),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().optional(),
  document_type: z.enum(["dni", "ce", "passport", "other"]),
  document_number: z.string().min(8, "Mínimo 8 dígitos").optional().or(z.literal("")),
  phone: z.string().optional(),
  role: z.enum(["student", "teacher", "admin"]),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function UserModal({ isOpen, onClose, onSuccess }: UserModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      document_type: "dni",
      role: "student",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    setLoading(true);
    setError(null);
    try {
      await api.createUser({
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        password: data.password || undefined,
        document_type: data.document_type,
        document_number: data.document_number || undefined,
        phone: data.phone || undefined,
        role: data.role,
      });
      reset();
      onSuccess();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Registrar Nuevo Alumno / Usuario"
      description="Crea la cuenta del alumno en la base de datos de FormaSalud"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Nombres"
            placeholder="Ej: Sofía"
            required
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Apellidos"
            placeholder="Ej: Mendoza V."
            required
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
              { value: "passport", label: "Pasaporte" },
            ]}
            {...register("document_type")}
          />
          <div className="col-span-2">
            <Input
              label="Nro. Documento"
              placeholder="Ej: 48920192"
              error={errors.document_number?.message}
              {...register("document_number")}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="alumno@ejemplo.com"
            required
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Teléfono"
            placeholder="987654321"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Contraseña"
            type="password"
            placeholder="Opcional (por defecto DNI)"
            error={errors.password?.message}
            {...register("password")}
          />
          <Select
            label="Rol de Usuario"
            options={[
              { value: "student", label: "Alumno (Student)" },
              { value: "teacher", label: "Docente (Teacher)" },
              { value: "admin", label: "Administrador" },
            ]}
            {...register("role")}
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-line">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-soft hover:bg-bg-alt transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navyink transition-all flex items-center gap-1.5 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <>
                <UserPlus className="w-3.5 h-3.5" />
                <span>Guardar Usuario</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
