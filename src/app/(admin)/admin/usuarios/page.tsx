"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PlusCircle, RefreshCw, UserCheck, Shield } from "lucide-react";
import { api, User } from "@/lib/api";
import { AdminHeader } from "@/features/admin/components/AdminHeader";
import { DataTable } from "@/components/ui/table/DataTable";
import { UserModal } from "@/features/admin/components/UserModal";

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "user_id",
        header: "ID",
        cell: (info) => (
          <span className="font-mono text-xs text-ink-soft">#{info.getValue<number>()}</span>
        ),
      },
      {
        accessorKey: "name",
        header: "Alumno / Usuario",
        cell: ({ row }) => (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-tealtint text-teal flex items-center justify-center font-bold text-xs shrink-0">
              {row.original.name[0]}
            </div>
            <div>
              <p className="font-bold text-navy text-xs sm:text-sm">
                {row.original.name} {row.original.last_name}
              </p>
              <p className="text-[11px] text-ink-soft">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "document_number",
        header: "Documento",
        cell: ({ row }) => (
          <span className="font-mono text-xs">
            <span className="uppercase text-ink-soft font-semibold mr-1">
              {row.original.document_type || "DNI"}:
            </span>
            {row.original.document_number || "-"}
          </span>
        ),
      },
      {
        accessorKey: "phone",
        header: "Teléfono",
        cell: (info) => (
          <span className="text-xs text-ink-soft">{info.getValue<string>() || "-"}</span>
        ),
      },
      {
        accessorKey: "roles",
        header: "Rol",
        cell: ({ row }) => {
          const roleName = row.original.roles?.[0] || "student";
          const isAdmin = roleName === "admin";
          return (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                isAdmin
                  ? "bg-navy text-goldpale border border-gold/40"
                  : "bg-tealtint text-tealdeep"
              }`}
            >
              {isAdmin ? <Shield className="w-2.5 h-2.5" /> : <UserCheck className="w-2.5 h-2.5" />}
              <span>{roleName}</span>
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Estado",
        cell: (info) => (
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5 align-middle" />
        ),
      },
    ],
    []
  );

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Gestión de Alumnos y Usuarios"
        subtitle="Registro, roles y directorio de alumnos matriculados"
        actionButton={
          <div className="flex items-center gap-2">
            <button
              onClick={fetchUsers}
              title="Refrescar"
              className="p-2 rounded-lg border border-line bg-white hover:bg-bg-alt text-ink-soft transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navyink transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Nuevo Alumno</span>
            </button>
          </div>
        }
      />

      <main className="p-6 max-w-7xl w-full mx-auto space-y-4">
        <DataTable
          columns={columns}
          data={users}
          searchPlaceholder="Buscar por nombre, correo o DNI..."
          isLoading={loading}
        />
      </main>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchUsers}
      />
    </div>
  );
}
