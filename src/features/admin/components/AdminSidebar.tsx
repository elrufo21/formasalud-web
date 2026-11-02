"use client";

import React from "react";
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
  X,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useAdminUiStore } from "@/features/admin/store/useAdminUiStore";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user, role } = useAuthStore();
  const { isSidebarOpen, closeSidebar } = useAdminUiStore();

  const handleLogout = () => {
    logout();
    closeSidebar();
    router.push("/login");
  };

  const isTeacherOnly = role === "teacher" && !user?.roles?.includes("admin");

  const navItems = isTeacherOnly
    ? [
        { label: "Mi Panel Docente", href: "/admin", icon: LayoutDashboard },
        { label: "Mis Cursos & Clases", href: "/admin/cursos", icon: BookOpen },
        { label: "Alumnos & Asistencias", href: "/admin/usuarios", icon: Users },
        { label: "Mi Perfil Profesional", href: "/admin/docentes", icon: UserCheck },
      ]
    : [
        { label: "Panel General", href: "/admin", icon: LayoutDashboard },
        { label: "Alumnos y Usuarios", href: "/admin/usuarios", icon: Users },
        { label: "Docentes & Plana", href: "/admin/docentes", icon: GraduationCap },
        { label: "Cursos y Programas", href: "/admin/cursos", icon: BookOpen },
        { label: "Certificados Oficiales", href: "/admin/certificados", icon: Award },
      ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-gradient-to-b from-navy via-navy to-navyink text-white">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <NextLink
          href="/admin"
          onClick={closeSidebar}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-goldpale text-navy font-serif italic text-sm flex items-center justify-center font-black shadow-sm group-hover:scale-105 transition-transform">
            FS
          </div>
          <div>
            <h2 className="font-serif font-black text-base tracking-wider text-white leading-none">
              FORMASALUD
            </h2>
            <span className="font-mono text-[9px] uppercase tracking-widest text-goldpale block font-bold mt-1">
              {isTeacherOnly ? "Portal Docente" : "Panel Administrativo"}
            </span>
          </div>
        </NextLink>

        {/* Mobile Close Button */}
        <button
          onClick={closeSidebar}
          aria-label="Cerrar menú"
          className="md:hidden p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Role Pill Banner */}
      <div className="px-5 py-2.5 bg-white/5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-white/80">
          <ShieldCheck className="w-3.5 h-3.5 text-teal" />
          <span className="font-medium">Sesión activa como:</span>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal/30 text-teal border border-teal/40 uppercase">
          {isTeacherOnly ? "Docente" : "Super Admin"}
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-mono uppercase tracking-widest text-white/40 pb-1.5 font-bold">
          {isTeacherOnly ? "Gestión Académica" : "Menú de Gestión"}
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <NextLink
              key={item.href}
              href={item.href}
              onClick={closeSidebar}
              className={cn(
                "group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all relative overflow-hidden",
                isActive
                  ? "bg-teal text-white shadow-sm font-bold"
                  : "text-white/75 hover:text-white hover:bg-white/10",
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-transform group-hover:scale-110",
                    isActive ? "text-goldpale" : "text-white/60 group-hover:text-white",
                  )}
                />
                <span>{item.label}</span>
              </div>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              )}
            </NextLink>
          );
        })}

        {/* Shortcuts Section */}
        <div className="pt-6">
          <p className="px-3 text-[10px] font-mono uppercase tracking-widest text-white/40 pb-1.5 font-bold">
            Accesos Directos
          </p>

          <NextLink
            href="/aula"
            onClick={closeSidebar}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-goldpale hover:bg-white/10 hover:text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <GraduationCap className="w-4 h-4 shrink-0 text-gold group-hover:scale-110 transition-transform" />
              <span>Aula Virtual (Alumno)</span>
            </div>
            <span className="text-[9px] font-mono bg-gold/20 text-gold px-1.5 py-0.5 rounded border border-gold/30">
              Ver
            </span>
          </NextLink>

          <NextLink
            href="/"
            target="_blank"
            onClick={closeSidebar}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 shrink-0 text-teal group-hover:scale-110 transition-transform" />
              <span>Web Pública Oficial</span>
            </div>
            <span className="text-[9px] font-mono bg-white/10 text-white/70 px-1.5 py-0.5 rounded">
              Abrir
            </span>
          </NextLink>
        </div>
      </nav>

      {/* User Footer */}
      <div className="p-3.5 border-t border-white/10 bg-black/20">
        <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-teal text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              {user ? user.name.charAt(0) : "A"}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate leading-tight">
                {user ? `${user.name} ${user.last_name}` : "Administrador"}
              </p>
              <p className="text-[10px] font-mono text-teal truncate leading-tight mt-0.5">
                {user?.email || "admin@formasalud.pe"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Cerrar sesión"
            className="p-2 rounded-lg text-white/70 hover:text-red-400 hover:bg-white/10 transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-64 h-screen sticky top-0 shrink-0 border-r border-line/10 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer with Backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={closeSidebar}
          />

          {/* Drawer Body */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
