"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { StudentSidebar } from "@/features/student/components/StudentSidebar";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, role, demoLogin } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // Auto-iniciar sesión como alumno de demostración para facilidad de prueba inmediata
      demoLogin("student");
    }
  }, [isAuthenticated, demoLogin]);

  return (
    <div className="min-h-screen bg-bg-alt flex">
      <StudentSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
