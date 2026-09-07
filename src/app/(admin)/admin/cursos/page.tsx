"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PlusCircle, RefreshCw, BookOpen, CheckCircle, Tag } from "lucide-react";
import { api, Course } from "@/lib/api";
import { AdminHeader } from "@/features/admin/components/AdminHeader";
import { DataTable } from "@/components/ui/table/DataTable";
import { CourseModal } from "@/features/admin/components/CourseModal";

export default function CoursesAdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await api.getCourses();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const columns = useMemo<ColumnDef<Course>[]>(
    () => [
      {
        accessorKey: "course_id",
        header: "ID",
        cell: (info) => (
          <span className="font-mono text-xs text-ink-soft">#{info.getValue<number>()}</span>
        ),
      },
      {
        accessorKey: "title",
        header: "Curso / Programa",
        cell: ({ row }) => (
          <div className="flex items-start gap-2.5 max-w-md">
            <div className="w-8 h-8 rounded-lg bg-navy/5 text-navy flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              <BookOpen className="w-4 h-4 text-teal" />
            </div>
            <div>
              <p className="font-bold text-navy text-xs sm:text-sm leading-snug">
                {row.original.title}
              </p>
              <p className="font-mono text-[11px] text-ink-soft/70">/{row.original.slug}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "price",
        header: "Precio Curso",
        cell: ({ row }) => {
          const price = Number(row.original.price);
          return (
            <span className="font-mono text-xs font-bold text-navy">
              {price === 0 ? (
                <span className="text-teal font-sans">Gratis</span>
              ) : (
                `S/ ${price.toFixed(2)}`
              )}
            </span>
          );
        },
      },
      {
        accessorKey: "certificate_included",
        header: "Certificación",
        cell: ({ row }) => {
          const included = row.original.certificate_included;
          const certPrice = Number(row.original.certificate_price);

          return included ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
              <CheckCircle className="w-3 h-3" />
              <span>Incluido</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200">
              <Tag className="w-3 h-3" />
              <span>Sep. (S/ {certPrice ? certPrice.toFixed(2) : "49.00"})</span>
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Estado",
        cell: (info) => (
          <span className="px-2 py-0.5 rounded-md bg-bg-alt text-ink font-mono text-[11px] uppercase font-bold border border-line">
            {info.getValue<string>()}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Catálogo de Cursos y Diplomados"
        subtitle="Configuración académica, precios y modelos de certificación"
        actionButton={
          <div className="flex items-center gap-2">
            <button
              onClick={fetchCourses}
              title="Refrescar"
              className="p-2 rounded-lg border border-line bg-white hover:bg-bg-alt text-ink-soft transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-teal text-white text-xs font-semibold hover:bg-tealdeep transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Nuevo Curso</span>
            </button>
          </div>
        }
      />

      <main className="p-6 max-w-7xl w-full mx-auto space-y-4">
        <DataTable
          columns={columns}
          data={courses}
          searchPlaceholder="Buscar por título o slug de curso..."
          isLoading={loading}
        />
      </main>

      <CourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchCourses}
      />
    </div>
  );
}
