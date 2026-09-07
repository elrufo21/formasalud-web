"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BookPlus } from "lucide-react";
import { api } from "@/lib/api";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";

const courseSchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  slug: z.string().min(3, "El slug es obligatorio (ej: diploma-uci)"),
  short_description: z.string().optional(),
  price: z.coerce.number().min(0, "El precio debe ser mayor o igual a 0"),
  certificate_included: z.boolean(),
  certificate_price: z.coerce.number().optional(),
});

type CourseFormData = z.infer<typeof courseSchema>;

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CourseModal({ isOpen, onClose, onSuccess }: CourseModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      price: 0,
      certificate_included: true,
      certificate_price: 0,
    },
  });

  const certIncluded = watch("certificate_included");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setValue("slug", generatedSlug);
  };

  const onSubmit = async (data: CourseFormData) => {
    setLoading(true);
    setError(null);
    try {
      await api.createCourse({
        title: data.title,
        slug: data.slug,
        short_description: data.short_description,
        price: data.price,
        certificate_included: data.certificate_included,
        certificate_price: data.certificate_included ? undefined : data.certificate_price,
      });
      reset();
      onSuccess();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al registrar curso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Registrar Nuevo Curso o Diplomado"
      description="Agrega un nuevo programa formativo con sus reglas de certificación"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
            {error}
          </div>
        )}

        <Input
          label="Título del Curso"
          placeholder="Ej: Diplomado en Auditoría Médica y Gestión Clínica"
          required
          error={errors.title?.message}
          {...register("title", {
            onChange: handleTitleChange,
          })}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Slug URL (identificador único)"
            placeholder="ej: auditoria-medica-gestion"
            required
            error={errors.slug?.message}
            {...register("slug")}
          />
          <Input
            label="Precio del Curso (PEN)"
            type="number"
            step="0.10"
            placeholder="0.00"
            required
            error={errors.price?.message}
            {...register("price")}
          />
        </div>

        <Input
          label="Descripción Corta"
          placeholder="Resumen para la tarjeta del catálogo (máx. 150 caracteres)"
          error={errors.short_description?.message}
          {...register("short_description")}
        />

        {/* Certificate Business Rule Checkbox */}
        <div className="p-4 rounded-xl bg-bg-alt border border-line space-y-3">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-4 h-4 rounded text-teal accent-teal"
              {...register("certificate_included")}
            />
            <span className="text-xs font-bold text-navy">
              ¿Certificado oficial incluido en el curso?
            </span>
          </label>

          {!certIncluded && (
            <div className="pt-2 pl-6 animate-in fade-in duration-200">
              <Input
                label="Precio del Certificado por Separado (PEN)"
                type="number"
                step="0.10"
                placeholder="Ej: 49.00"
                helperText="El alumno podrá ver las clases pero deberá pagar este monto para emitir su diploma."
                error={errors.certificate_price?.message}
                {...register("certificate_price")}
              />
            </div>
          )}
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
            className="px-5 py-2 rounded-xl bg-teal text-white text-xs font-semibold hover:bg-tealdeep transition-all flex items-center gap-1.5 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <>
                <BookPlus className="w-3.5 h-3.5" />
                <span>Guardar Curso</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
