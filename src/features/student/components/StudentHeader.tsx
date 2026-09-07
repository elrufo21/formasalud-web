"use client";

import React from "react";
import { User, Bell, Award } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

interface StudentHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export function StudentHeader({ title, subtitle, actionButton }: StudentHeaderProps) {
  const { user } = useAuthStore();

  return (
    <header className="bg-white border-b border-line px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h1 className="font-serif font-bold text-xl sm:text-2xl text-navy">{title}</h1>
        {subtitle && <p className="text-xs text-ink-soft mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {actionButton}

        <div className="h-6 w-px bg-line mx-1 hidden sm:block" />

        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center font-bold text-xs">
            {user ? `${user.name[0]}${user.last_name[0]}` : "ES"}
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-xs font-bold text-navy block leading-none">
              {user ? `${user.name} ${user.last_name}` : "Estudiante"}
            </span>
            <span className="text-[10px] font-mono text-teal font-semibold block leading-tight mt-0.5">
              Alumno Activo
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
