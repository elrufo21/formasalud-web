"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImagePlus, LoaderCircle, Save, Trash2 } from "lucide-react";
import { AdminHeader } from "@/features/admin/components/AdminHeader";
import {
  api,
  getPublicAssetUrl,
  type SaveTeacherData,
  type TeacherProfile,
} from "@/lib/api";

type ImageKey = "profile_photo_url" | "cover_photo_url" | "signature_url";
type ImageFiles = Partial<Record<ImageKey, File | null>>;
type FormState = Omit<SaveTeacherData, "password"> & { password: string };

const emptyForm: FormState = {
  name: "",
  last_name: "",
  email: "",
  password: "",
  phone: "",
  document_type: "dni",
  document_number: "",
  status: "active",
  profession: "",
  specialty: "",
  biography: "",
  profile_photo_url: null,
  cover_photo_url: null,
  signature_url: null,
};

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-teal focus:ring-2 focus:ring-teal/10";
const labelClass = "mb-1.5 block text-xs font-semibold text-navy";

export function TeacherForm({ teacherId }: { teacherId?: number }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [files, setFiles] = useState<ImageFiles>({});
  const [previews, setPreviews] = useState<Partial<Record<ImageKey, string>>>(
    {},
  );
  const [loading, setLoading] = useState(Boolean(teacherId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!teacherId) return;
    api
      .getTeacher(teacherId)
      .then((teacher: TeacherProfile) => {
        setForm({
          ...emptyForm,
          ...teacher,
          phone: teacher.phone ?? "",
          document_type: teacher.document_type ?? "dni",
          document_number: teacher.document_number ?? "",
          password: "",
        });
        if (teacher.signature_url) {
          api
            .getTeacherSignaturePreview(teacher.signature_url)
            .then((url) => {
              if (url)
                setPreviews((current) => ({ ...current, signature_url: url }));
            })
            .catch(() => undefined);
        }
      })
      .catch(() => setError("No se pudo cargar el perfil del docente."))
      .finally(() => setLoading(false));
  }, [teacherId]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!teacherId && form.password.length < 12) {
      setError("La contraseña inicial debe tener al menos 12 caracteres.");
      return;
    }
    if (form.password && form.password.length < 12) {
      setError("La contraseña debe tener al menos 12 caracteres.");
      return;
    }

    setSaving(true);
    try {
      const data: SaveTeacherData = { ...form };
      for (const key of [
        "profile_photo_url",
        "cover_photo_url",
        "signature_url",
      ] as const) {
        const file = files[key];
        if (file)
          data[key] = (
            await api.uploadTeacherImage(file, key === "signature_url")
          ).url;
      }
      if (!data.password) delete (data as Partial<SaveTeacherData>).password;
      if (teacherId) await api.updateTeacher(teacherId, data);
      else await api.createTeacher(data);
      router.push("/admin/docentes");
      router.refresh();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "No se pudo guardar el docente.",
      );
    } finally {
      setSaving(false);
    }
  }

  const imageField = (key: ImageKey, title: string, hint: string) => {
    const file = files[key];
    const imageUrl = previews[key] || getPublicAssetUrl(form[key]);
    return (
      <div className="rounded-2xl border border-line bg-white p-4">
        <label className={labelClass}>{title}</label>
        <p className="mb-3 text-[11px] text-ink-soft">{hint}</p>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={640}
            height={360}
            unoptimized
            className="mb-3 max-h-44 w-full rounded-xl bg-bg-alt object-contain"
          />
        ) : (
          <div className="mb-3 flex h-32 items-center justify-center rounded-xl bg-bg-alt text-ink-soft">
            <ImagePlus className="h-6 w-6" />
          </div>
        )}
        <div className="flex items-center gap-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-semibold text-navy hover:bg-bg-alt">
            <ImagePlus className="h-3.5 w-3.5" /> Elegir imagen
            <input
              className="sr-only"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => {
                const nextFile = event.target.files?.[0] ?? null;
                setFiles((current) => ({ ...current, [key]: nextFile }));
                setPreviews((current) => {
                  if (current[key]) URL.revokeObjectURL(current[key]!);
                  return {
                    ...current,
                    [key]: nextFile ? URL.createObjectURL(nextFile) : undefined,
                  };
                });
              }}
            />
          </label>
          {(form[key] || file) && (
            <button
              type="button"
              title="Quitar imagen"
              onClick={() => {
                setField(key, null);
                setFiles((current) => ({ ...current, [key]: null }));
                setPreviews((current) => {
                  if (current[key]) URL.revokeObjectURL(current[key]!);
                  return { ...current, [key]: undefined };
                });
              }}
              className="rounded-lg p-2 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading)
    return <div className="p-8 text-sm text-ink-soft">Cargando perfil…</div>;

  return (
    <div className="flex-1">
      <AdminHeader
        title={teacherId ? "Editar docente" : "Nuevo docente"}
        subtitle="Perfil profesional y acceso a la plataforma"
      />
      <main className="mx-auto w-full max-w-5xl space-y-5 p-6">
        <button
          type="button"
          onClick={() => router.push("/admin/docentes")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-ink-soft hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al directorio
        </button>
        <form onSubmit={onSubmit} className="space-y-5">
          <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
            <h2 className="mb-4 font-serif text-lg font-bold text-navy">
              Datos de la cuenta
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Nombres *</label>
                <input
                  className={inputClass}
                  required
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Apellidos *</label>
                <input
                  className={inputClass}
                  required
                  value={form.last_name}
                  onChange={(e) => setField("last_name", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Correo de acceso *</label>
                <input
                  className={inputClass}
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>
                  {teacherId
                    ? "Nueva contraseña (opcional)"
                    : "Contraseña inicial *"}
                </label>
                <input
                  className={inputClass}
                  type="password"
                  autoComplete="new-password"
                  required={!teacherId}
                  minLength={12}
                  value={form.password}
                  onChange={(e) => setField("password", e.target.value)}
                />
                <p className="mt-1 text-[10px] text-ink-soft">
                  Mínimo 12 caracteres. Déjala vacía para conservarla al editar.
                </p>
              </div>
              <div>
                <label className={labelClass}>Teléfono</label>
                <input
                  className={inputClass}
                  value={form.phone ?? ""}
                  onChange={(e) => setField("phone", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Estado de acceso</label>
                <select
                  className={inputClass}
                  value={form.status}
                  onChange={(e) =>
                    setField("status", e.target.value as FormState["status"])
                  }
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                  <option value="suspended">Suspendido</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Tipo de documento</label>
                <select
                  className={inputClass}
                  value={form.document_type ?? "dni"}
                  onChange={(e) => setField("document_type", e.target.value)}
                >
                  <option value="dni">DNI</option>
                  <option value="ce">Carnet de extranjería</option>
                  <option value="passport">Pasaporte</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Número de documento</label>
                <input
                  className={inputClass}
                  value={form.document_number ?? ""}
                  onChange={(e) => setField("document_number", e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
            <h2 className="mb-4 font-serif text-lg font-bold text-navy">
              Perfil profesional
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Profesión</label>
                <input
                  className={inputClass}
                  value={form.profession ?? ""}
                  onChange={(e) => setField("profession", e.target.value)}
                  placeholder="Ej. Médico cirujano"
                />
              </div>
              <div>
                <label className={labelClass}>Especialidad</label>
                <input
                  className={inputClass}
                  value={form.specialty ?? ""}
                  onChange={(e) => setField("specialty", e.target.value)}
                  placeholder="Ej. Medicina intensiva"
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Biografía</label>
                <textarea
                  className={`${inputClass} min-h-32 resize-y`}
                  value={form.biography ?? ""}
                  onChange={(e) => setField("biography", e.target.value)}
                  placeholder="Experiencia, formación y presentación profesional"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
            <h2 className="mb-1 font-serif text-lg font-bold text-navy">
              Imágenes y firma
            </h2>
            <p className="mb-4 text-xs text-ink-soft">
              Se guardan en el servidor. La firma queda disponible para los
              flujos de certificados.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {imageField(
                "profile_photo_url",
                "Foto de perfil",
                "JPG, PNG o WebP; máximo 5 MB.",
              )}
              {imageField(
                "cover_photo_url",
                "Imagen de portada",
                "JPG, PNG o WebP; máximo 5 MB.",
              )}
              {imageField(
                "signature_url",
                "Firma del docente",
                "Imagen para uso en certificados; máximo 5 MB.",
              )}
            </div>
          </section>

          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-teal px-5 py-3 text-sm font-bold text-white hover:bg-tealdeep disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saving ? "Guardando…" : "Guardar docente"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
