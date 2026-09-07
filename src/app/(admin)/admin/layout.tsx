"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, role } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Si no está autenticado, permitir demo o redirigir a login
    if (!isAuthenticated) {
      // Redirige al login para identificarse
      router.push("/login");
    }
  }, [isAuthenticated, role, router]);

  return (
    <div className="min-h-screen bg-bg-alt flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
