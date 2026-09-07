"use client";

import React, { useState } from "react";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export function LoginRegister() {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Top Tab Switcher */}
      <div className="flex rounded-xl bg-bg-alt p-1 border border-line">
        <button
          onClick={() => setTab("login")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            tab === "login"
              ? "bg-white text-navy shadow-xs font-bold"
              : "text-ink-soft hover:text-navy"
          }`}
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => setTab("register")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            tab === "register"
              ? "bg-white text-teal shadow-xs font-bold"
              : "text-ink-soft hover:text-navy"
          }`}
        >
          Crear Cuenta Alumno
        </button>
      </div>

      {tab === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}

export default LoginRegister;
