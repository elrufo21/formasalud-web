"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { StudentSidebar } from "@/features/student/components/StudentSidebar";
import { useHydratedAuth } from "@/features/auth/store/useAuthStore";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isHydrated } = useHydratedAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isHydrated, router]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-bg-alt flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-3 border-teal border-t-transparent animate-spin" />
        <span className="text-xs font-semibold text-ink-soft">Cargando Aula Virtual...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bg-alt flex">
      <StudentSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
