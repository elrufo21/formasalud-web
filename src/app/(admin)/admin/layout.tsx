"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { useHydratedAuth } from "@/features/auth/store/useAuthStore";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, role, isHydrated } = useHydratedAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated || role !== "admin") {
      router.push("/login");
    }
  }, [isAuthenticated, role, isHydrated, router]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-bg-alt flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-3 border-navy border-t-transparent animate-spin" />
        <span className="text-xs font-semibold text-ink-soft">Verificando sesión...</span>
      </div>
    );
  }

  if (!isAuthenticated || role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-bg-alt flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
