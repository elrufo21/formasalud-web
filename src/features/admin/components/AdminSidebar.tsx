"use client";

import React from "react";
import Link from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import NextLink from "next/link";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Award,
  LogOut,
  ExternalLink,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Alumnos y Usuarios", href: "/admin/usuarios", icon: Users },
  { label: "Cursos y Programas", href: "/admin/cursos", icon: BookOpen },
  { label: "Certificados", href: "/admin/certificados", icon: Award },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-navy text-white flex flex-col border-r border-line/10 h-screen sticky top-0 shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gold text-navy font-serif italic text-sm flex items-center justify-center font-bold">
          FS
        </div>
        <div>
          <h2 className="font-serif font-bold text-base tracking-wide text-white">
            FORMASALUD
          </h2>
          <span className="font-mono text-[9px] uppercase tracking-widest text-goldpale block font-semibold">
            Panel Administrativo
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-[10px] font-mono uppercase tracking-wider text-white/40 pb-1">
          Menú de Gestión
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <NextLink
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all",
                isActive
                  ? "bg-teal text-white shadow-xs font-bold"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NextLink>
          );
        })}

        <div className="pt-6">
          <p className="px-3 text-[10px] font-mono uppercase tracking-wider text-white/40 pb-1">
            Accesos Directos
          </p>
          <NextLink
            href="/aula"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-goldpale hover:bg-white/5 transition-all"
          >
            <GraduationCap className="w-4 h-4 shrink-0 text-gold" />
            <span>Vista Alumno (Aula)</span>
          </NextLink>
          <NextLink
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            <span>Ver Web Pública</span>
          </NextLink>
        </div>
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-white/10 bg-navyink/40">
        <div className="flex items-center justify-between">
          <div className="truncate pr-2">
            <p className="text-xs font-bold text-white truncate">
              {user ? `${user.name} ${user.last_name}` : "Administrador"}
            </p>
            <p className="text-[10px] font-mono text-teal truncate">
              {user?.email || "admin@formasalud.pe"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            title="Cerrar sesión"
            className="p-2 rounded-lg text-white/60 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
