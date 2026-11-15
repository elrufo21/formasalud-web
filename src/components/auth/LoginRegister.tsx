"use client";

import React, { useState, useEffect } from "react";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

interface LoginRegisterProps {
  initialTab?: "login" | "register";
}

export function LoginRegister({ initialTab = "login" }: LoginRegisterProps) {
  const [tab, setTab] = useState<"login" | "register">(initialTab);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab") || params.get("modo");
    if (tabParam === "register" || tabParam === "registro") {
      setTab("register");
    } else if (tabParam === "login") {
      setTab("login");
    }
  }, []);

  return (
    <div className="w-full max-w-md mx-auto space-y-4 px-4 sm:px-0">
      {/* Top Tab Switcher */}
      <div className="flex rounded-xl bg-bg-alt p-1 border border-line shadow-2xs">
        <button
          type="button"
          onClick={() => setTab("login")}
          className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            tab === "login"
              ? "bg-white text-navy shadow-xs font-bold"
              : "text-ink-soft hover:text-navy"
          }`}
        >
          Iniciar Sesión
        </button>
        <button
          type="button"
          onClick={() => setTab("register")}
          className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            tab === "register"
              ? "bg-white text-teal shadow-xs font-bold"
              : "text-ink-soft hover:text-navy"
          }`}
        >
          Crear Cuenta Alumno
        </button>
      </div>

      {tab === "login" ? (
        <LoginForm onSwitchToRegister={() => setTab("register")} />
      ) : (
        <RegisterForm onSwitchToLogin={() => setTab("login")} />
      )}
    </div>
  );
}

export default LoginRegister;
