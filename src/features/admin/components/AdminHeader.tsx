"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Bell,
  ShieldCheck,
  User,
  LogOut,
  GraduationCap,
  Globe,
  Award,
  BookOpen,
} from "lucide-react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useAdminUiStore } from "@/features/admin/store/useAdminUiStore";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export function AdminHeader({ title, subtitle, actionButton }: AdminHeaderProps) {
  const router = useRouter();
  const { user, role, logout } = useAuthStore();
  const { toggleSidebar } = useAdminUiStore();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const isTeacherOnly = role === "teacher" && !user?.roles?.includes("admin");

  const initials = user
    ? `${user.name.charAt(0)}${user.last_name?.charAt(0) || ""}`.toUpperCase()
    : "AD";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="bg-white border-b border-line px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleSidebar}
          aria-label="Abrir navegación"
          className="md:hidden p-2 rounded-xl border border-line bg-bg-alt text-navy hover:bg-slate-200 transition-colors shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="truncate">
          <h1 className="font-serif font-bold text-lg sm:text-2xl text-navy truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-ink-soft hidden sm:block truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Custom Action Buttons passed from page */}
        {actionButton}

        <div className="h-6 w-px bg-line hidden sm:block" />

        {/* User Profile Pill & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2.5 p-1 sm:p-1.5 rounded-xl hover:bg-bg-alt transition-colors border border-transparent hover:border-line"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-navy to-teal text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-xs font-bold text-navy block leading-none">
                {user ? `${user.name} ${user.last_name}` : "Administrador"}
              </span>
              <span className="text-[10px] font-mono text-teal font-bold block leading-tight mt-0.5">
                {isTeacherOnly ? "Docente FormaSalud" : "Super Admin"}
              </span>
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-line shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-line/60">
                  <p className="text-xs font-bold text-navy">
                    {user ? `${user.name} ${user.last_name}` : "Usuario"}
                  </p>
                  <p className="text-[11px] font-mono text-ink-soft truncate">
                    {user?.email}
                  </p>
                </div>

                <div className="py-1">
                  <Link
                    href="/aula"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-ink hover:bg-bg-alt font-medium"
                  >
                    <GraduationCap className="w-4 h-4 text-gold" />
                    <span>Ir a mi Aula Virtual</span>
                  </Link>

                  <Link
                    href="/"
                    target="_blank"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-ink hover:bg-bg-alt font-medium"
                  >
                    <Globe className="w-4 h-4 text-teal" />
                    <span>Ver Sitio Web Público</span>
                  </Link>
                </div>

                <div className="border-t border-line/60 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-semibold text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
