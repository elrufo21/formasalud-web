"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useHydratedAuth } from "@/features/auth/store/useAuthStore";
import { Shield, User as UserIcon } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, role, user, isHydrated } = useHydratedAuth();

  const links = [
    { href: "/", label: "Inicio", num: "01" },
    { href: "/cursos", label: "Cursos y Programas", num: "02" },
    { href: "/quienes-somos", label: "Quiénes somos", num: "03" },
    { href: "/contacto", label: "Contacto", num: "04" },
  ];

  return (
    <>
      {/* Top masthead strip */}
      <div className="masthead-strip">
        <div className="wrap flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4 text-center sm:text-left">
          <span>GRUPO PAUCAR PERÚ S.A.C. · RUC 20613837613 · LIMA, PERÚ</span>
          <div className="flex items-center gap-3">
            <span className="text-goldpale">📞 +51 999 999 999</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">FORMACIÓN MÉDICA 2026</span>
          </div>
        </div>
      </div>

      {/* Main sticky navigation header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-line shadow-xs">
        <nav className="flex items-center justify-between py-3.5 px-4 sm:px-8 max-w-[1400px] mx-auto">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full bg-navy text-goldpale flex items-center justify-center font-serif italic text-lg font-bold border border-gold shadow-xs overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="Logo FormaSalud"
                width={40}
                height={40}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <span className="font-serif font-black text-xl tracking-tight text-navy block leading-none">
                FORMASALUD
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-teal font-semibold block leading-tight mt-0.5">
                Centro de Capacitación
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13.5px] font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? "text-navy font-bold border-b-2 border-gold pb-0.5"
                      : "text-ink-soft hover:text-navy"
                  }`}
                >
                  <span className="font-mono text-[10px] text-gold font-bold">
                    {link.num}
                  </span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {isHydrated && isAuthenticated ? (
              <>
                <Link
                  href={role === "admin" ? "/admin" : "/aula"}
                  className="btn btn-ghost !py-2.5 !px-4 !text-[12.5px] flex items-center gap-1.5"
                >
                  <span>{role === "admin" ? "Panel Control" : "Aula Virtual"}</span>
                  <span className="font-mono text-[8.5px] bg-emerald-500/10 text-emerald-700 px-1.5 py-0.5 rounded font-bold">
                    Activa
                  </span>
                </Link>

                <Link
                  href={role === "admin" ? "/admin" : "/aula"}
                  className="btn btn-primary !py-2.5 !px-5 !text-[13px] font-semibold flex items-center gap-2"
                >
                  {role === "admin" ? (
                    <>
                      <Shield className="w-3.5 h-3.5" />
                      <span>Panel Admin</span>
                    </>
                  ) : (
                    <>
                      <UserIcon className="w-3.5 h-3.5" />
                      <span>Mi Aula</span>
                    </>
                  )}
                  <span className="arrow">→</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/aula"
                  className="btn btn-ghost !py-2.5 !px-4 !text-[12.5px] flex items-center gap-1.5"
                >
                  <span>Aula Virtual</span>
                  <span className="font-mono text-[8.5px] bg-teal/10 text-teal px-1.5 py-0.5 rounded font-bold">
                    24/7
                  </span>
                </Link>

                <Link
                  href="/login"
                  className="btn btn-primary !py-2.5 !px-5 !text-[13px] font-semibold"
                >
                  Iniciar sesión <span className="arrow">→</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger button */}
          <button
            className="lg:hidden p-2 text-navy rounded-lg hover:bg-bg-alt focus:outline-none cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menú de navegación"
          >
            <span className={`block w-6 h-0.5 bg-navy mb-1.5 transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-navy mb-1.5 transition-opacity ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-navy transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </nav>

        {/* Mobile menu drawer */}
        {isOpen && (
          <div className="lg:hidden bg-white border-b border-line px-6 py-5 flex flex-col gap-3 shadow-xl animate-in slide-in-from-top-2">
            <div className="flex items-center justify-between pb-3 border-b border-line text-xs font-mono text-ink-soft">
              <span>Navegación Académica</span>
              <span className="text-teal font-semibold">FORMASALUD 2026</span>
            </div>

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`py-2 text-sm font-medium flex items-center gap-2.5 rounded-lg px-2 ${pathname === link.href ? "text-navy font-bold bg-bg-alt" : "text-ink-soft hover:text-navy"
                  }`}
              >
                <span className="font-mono text-xs text-gold font-bold">{link.num}</span>
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-line flex flex-col gap-2.5">
              {isHydrated && isAuthenticated ? (
                <Link
                  href={role === "admin" ? "/admin" : "/aula"}
                  onClick={() => setIsOpen(false)}
                  className="btn btn-primary w-full justify-center text-sm font-semibold flex items-center gap-2"
                >
                  {role === "admin" ? <Shield className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
                  <span>Ir a {role === "admin" ? "Panel Administrador" : "Mi Aula Virtual"}</span>
                </Link>
              ) : (
                <>
                  <Link
                    href="/aula"
                    onClick={() => setIsOpen(false)}
                    className="btn btn-ghost w-full justify-center text-xs"
                  >
                    Acceso Aula Virtual
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="btn btn-primary w-full justify-center text-sm font-semibold"
                  >
                    Iniciar sesión
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
