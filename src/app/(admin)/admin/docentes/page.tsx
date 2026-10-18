"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { GraduationCap, Pencil, PlusCircle, RefreshCw } from "lucide-react";
import { AdminHeader } from "@/features/admin/components/AdminHeader";
import { DataTable } from "@/components/ui/table/DataTable";
import { api, type TeacherProfile } from "@/lib/api";

export default function TeachersAdminPage() {
  const [teachers, setTeachers] = useState<TeacherProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTeachers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setTeachers(await api.getTeachers());
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "No se pudo cargar el directorio.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    api
      .getTeachers()
      .then((data) => {
        if (active) setTeachers(data);
      })
      .catch((cause) => {
        if (active)
          setError(
            cause instanceof Error
              ? cause.message
              : "No se pudo cargar el directorio.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const columns = useMemo<ColumnDef<TeacherProfile>[]>(
    () => [
      {
        accessorKey: "user_id",
        header: "ID",
        cell: ({ getValue }) => (
          <span className="font-mono text-xs text-ink-soft">
            #{getValue<number>()}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: "Docente",
        cell: ({ row }) => (
          <div>
            <p className="text-sm font-bold text-navy">
              {row.original.name} {row.original.last_name}
            </p>
            <p className="text-xs text-ink-soft">{row.original.email}</p>
          </div>
        ),
      },
      {
        accessorKey: "profession",
        header: "Profesión",
        cell: ({ row }) => (
          <div>
            <p className="text-xs text-navy">
              {row.original.profession || "—"}
            </p>
            <p className="text-[11px] text-ink-soft">
              {row.original.specialty || "Sin especialidad"}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Acceso",
        cell: ({ getValue }) => {
          const status = getValue<TeacherProfile["status"]>();
          const style =
            status === "active"
              ? "bg-emerald-50 text-emerald-700"
              : status === "suspended"
                ? "bg-red-50 text-red-700"
                : "bg-amber-50 text-amber-800";
          return (
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${style}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Link
            href={`/admin/docentes/${row.original.user_id}/editar`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-semibold text-navy hover:bg-bg-alt"
          >
            <Pencil className="h-3.5 w-3.5" /> Editar
          </Link>
        ),
      },
    ],
    [],
  );

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Gestión de Docentes"
        subtitle="Perfiles profesionales, datos de acceso e imágenes de docentes"
        actionButton={
          <div className="flex gap-2">
            <button
              onClick={() => void loadTeachers()}
              title="Actualizar"
              className="rounded-lg border border-line bg-white p-2 text-ink-soft hover:bg-bg-alt"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <Link
              href="/admin/docentes/nuevo"
              className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2 text-xs font-semibold text-white hover:bg-navyink"
            >
              <PlusCircle className="h-3.5 w-3.5" /> Nuevo docente
            </Link>
          </div>
        }
      />
      <main className="mx-auto w-full max-w-7xl space-y-4 p-6">
        {error && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}
        {!loading && !error && teachers.length === 0 && (
          <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
            <GraduationCap className="mx-auto mb-3 h-8 w-8 text-teal" />
            <p className="font-bold text-navy">
              Aún no hay docentes registrados
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              Crea un perfil para habilitar su acceso a la plataforma.
            </p>
          </div>
        )}
        {(loading || teachers.length > 0) && (
          <DataTable
            columns={columns}
            data={teachers}
            searchPlaceholder="Buscar por nombre, correo o especialidad…"
            isLoading={loading}
          />
        )}
      </main>
    </div>
  );
}
