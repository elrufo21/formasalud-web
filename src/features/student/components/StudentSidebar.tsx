"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import NextLink from "next/link";
import {
  GraduationCap,
  BookOpen,
  Award,
  LogOut,
  ExternalLink,
  Shield,
} from "lucide-react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Mis Cursos", href: "/aula", icon: BookOpen },
  { label: "Explorar Catálogo", href: "/aula/catalogo", icon: GraduationCap },
  { label: "Mis Certificados", href: "/aula/mis-certificados", icon: Award },
];

export function StudentSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-tealdeep text-white flex flex-col border-r border-teal/20 h-screen sticky top-0 shrink-0">
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
            Aula Virtual
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-[10px] font-mono uppercase tracking-wider text-white/40 pb-1">
          Mi Formación
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/aula"
              ? pathname === "/aula"
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
            Navegación
          </p>
          <NextLink
            href="/admin"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-goldpale hover:bg-white/5 transition-all"
          >
            <Shield className="w-4 h-4 shrink-0 text-gold" />
            <span>Panel Administrador</span>
          </NextLink>
          <NextLink
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            <span>Inicio Web</span>
          </NextLink>
        </div>
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center justify-between">
          <div className="truncate pr-2">
            <p className="text-xs font-bold text-white truncate">
              {user ? `${user.name} ${user.last_name}` : "Estudiante"}
            </p>
            <p className="text-[10px] font-mono text-goldpale truncate">
              DNI: {user?.document_number || "47829104"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            title="Cerrar sesión"
            className="p-2 rounded-lg text-white/60 hover:text-red-300 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
