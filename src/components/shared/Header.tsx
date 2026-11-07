"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useHydratedAuth } from "@/features/auth/store/useAuthStore";
import {
  Shield,
  User as UserIcon,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Award,
} from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, role, isHydrated } = useHydratedAuth();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/cursos", label: "Cursos" },
    { href: "/quienes-somos", label: "Quiénes somos" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <>
      {/* Top Institutional Bar */}
      <div className="bg-navyink text-white/85 border-b border-white/10 text-[11px]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-2 flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 truncate max-w-full">
            <span className="inline-flex items-center gap-1.5 font-bold text-goldpale tracking-wider uppercase text-[10px] sm:text-[10.5px]">
              <Sparkles className="w-3 h-3 text-gold shrink-0" />
              <span>FORMASALUD</span>
            </span>
            <span className="text-white/25 hidden md:inline">|</span>
            <span className="hidden md:inline text-white/75 font-medium truncate">
              Innovación y Desarrollo Académico en Salud
            </span>
            <span className="text-white/25">|</span>
            <span className="text-white/70 font-semibold tracking-wide text-[10px] sm:text-[10.5px]">
              RUC 20613837613 · Lima – Perú
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] font-semibold shrink-0">
            <a
              href="mailto:formasalud2025@gmail.com"
              className="text-white/75 hover:text-goldpale transition-colors inline-flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-teal shrink-0" />
              <span>formasalud2025@gmail.com</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href="https://wa.me/51939584395?text=Hola%20FORMASALUD,%20deseo%20informaci%C3%B3n%20sobre%20sus%20programas%20acad%C3%A9micos."
              target="_blank"
              rel="noopener noreferrer"
              className="text-goldpale hover:text-white transition-colors inline-flex items-center gap-1.5 bg-white/[0.06] hover:bg-white/[0.12] px-2.5 py-0.5 rounded-full border border-gold/30"
            >
              <Phone className="w-3 h-3 text-gold shrink-0" />
              <span>939 584 395</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,41,66,0.08)] border-b border-line"
            : "bg-white/98 backdrop-blur-md border-b border-line/80 shadow-[0_2px_16px_rgba(15,41,66,0.04)]"
        }`}
      >
        {/* Subtle Institutional Accent Line */}
        <div className="h-[2.5px] w-full bg-gradient-to-r from-navy via-teal to-gold" />

        <nav className="flex items-center justify-between py-3 sm:py-3.5 px-4 sm:px-8 max-w-[1400px] mx-auto gap-4">
          {/* Logo & Brand Lockup */}
          <Link
            href="/"
            className="flex items-center gap-3 sm:gap-3.5 group shrink-0"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-navy text-goldpale flex items-center justify-center font-bold border-2 border-gold shadow-[0_4px_14px_rgba(15,41,66,0.18)] ring-2 ring-gold/20 overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Logo FORMASALUD"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-[21px] tracking-tight text-navy leading-none group-hover:text-tealdeep transition-colors">
                FORMASALUD
              </span>
              <span className="text-[9px] sm:text-[9.5px] uppercase tracking-[0.13em] text-teal font-bold leading-tight mt-1">
                Innovación y Desarrollo Académico
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-[13.5px] whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? "text-tealdeep bg-tealtint/70 font-bold"
                      : "text-slate-600 hover:text-navy hover:bg-slate-100/70 font-semibold"
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Actions Desktop & Tablet */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <Link
              href="/verificar"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold text-slate-600 hover:text-tealdeep rounded-lg hover:bg-slate-100/70 transition-all whitespace-nowrap"
            >
              <Award className="w-4 h-4 text-teal shrink-0" />
              <span>Validar Certificado</span>
            </Link>

            <span className="w-px h-5 bg-slate-200/80" />

            {isHydrated && isAuthenticated ? (
              <Link
                href={role === "admin" ? "/admin" : "/aula"}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy hover:bg-tealdeep text-white text-[13px] font-bold shadow-xs hover:shadow-md transition-all duration-200 whitespace-nowrap"
              >
                {role === "admin" ? (
                  <>
                    <Shield className="w-3.5 h-3.5 text-gold" />
                    <span>Panel Admin</span>
                  </>
                ) : (
                  <>
                    <UserIcon className="w-3.5 h-3.5 text-gold" />
                    <span>Mi Aula</span>
                  </>
                )}
                <span className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all text-xs">
                  →
                </span>
              </Link>
            ) : (
              <Link
                href="/aula"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy hover:bg-tealdeep text-white text-[13px] font-bold shadow-xs hover:shadow-md transition-all duration-200 whitespace-nowrap"
              >
                <GraduationCap className="w-4 h-4 text-gold group-hover:scale-105 transition-transform shrink-0" />
                <span>Aula Virtual</span>
                <span className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all text-xs">
                  →
                </span>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-slate-700 hover:text-navy rounded-lg hover:bg-slate-100 focus:outline-none cursor-pointer transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={
              isOpen
                ? "Cerrar menú de navegación"
                : "Abrir menú de navegación"
            }
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Menu Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-white border-b border-line px-4 sm:px-6 py-5 flex flex-col gap-3.5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-2.5 border-b border-line text-[11px] font-bold uppercase tracking-wider text-ink-soft">
              <span>Menú Institucional</span>
              <span className="text-teal font-extrabold">FORMASALUD</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {links.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`py-3 px-4 text-sm flex items-center justify-between rounded-xl transition-colors ${
                      isActive
                        ? "text-white font-bold bg-navy shadow-xs"
                        : "text-navy font-semibold bg-bg-alt/50 hover:bg-bg-alt"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive ? "bg-gold" : "bg-teal/40"
                        }`}
                      />
                      <span>{link.label}</span>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 ${
                        isActive ? "text-goldpale" : "text-ink-soft/50"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Validar Certificado Móvil */}
            <Link
              href="/verificar"
              onClick={() => setIsOpen(false)}
              className="py-2.5 px-3.5 rounded-xl text-slate-700 hover:text-teal font-semibold text-xs flex items-center justify-between transition-colors bg-slate-50 hover:bg-slate-100"
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-teal shrink-0" />
                <span>Validar Certificado Oficial</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-teal/70 shrink-0" />
            </Link>

            {/* Mobile CTAs */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:hidden gap-2">
              {isHydrated && isAuthenticated ? (
                <Link
                  href={role === "admin" ? "/admin" : "/aula"}
                  onClick={() => setIsOpen(false)}
                  className="w-full justify-center text-xs font-bold flex items-center gap-2 py-3 px-4 rounded-xl bg-navy text-white hover:bg-tealdeep transition-colors shadow-xs"
                >
                  {role === "admin" ? (
                    <Shield className="w-4 h-4 text-gold" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-gold" />
                  )}
                  <span>
                    Ir a{" "}
                    {role === "admin"
                      ? "Panel Administrador"
                      : "Mi Aula Virtual"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/70" />
                </Link>
              ) : (
                <Link
                  href="/aula"
                  onClick={() => setIsOpen(false)}
                  className="w-full justify-center text-xs font-bold flex items-center gap-2 py-3 px-4 rounded-xl bg-navy text-white hover:bg-tealdeep transition-colors shadow-xs"
                >
                  <GraduationCap className="w-4 h-4 text-gold" />
                  <span>Ingresar al Aula Virtual</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/70" />
                </Link>
              )}
            </div>

            {/* Mobile Contact Strip */}
            <div className="pt-2.5 border-t border-line flex flex-wrap items-center justify-between gap-2 text-[11px] text-ink-soft font-semibold">
              <a
                href="https://wa.me/51939584395"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-navy font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-teal" />
                <span>939 584 395</span>
              </a>
              <a
                href="mailto:formasalud2025@gmail.com"
                className="inline-flex items-center gap-1.5 text-ink-soft hover:text-navy"
              >
                <Mail className="w-3.5 h-3.5 text-teal" />
                <span>formasalud2025@gmail.com</span>
              </a>
              <span className="inline-flex items-center gap-1 text-ink-soft">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                <span>Lima – Perú</span>
              </span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

