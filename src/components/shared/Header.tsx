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
    { href: "/cursos", label: "Cursos y Programas" },
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

          {/* Desktop Navigation Pill Bar */}
          <div className="hidden lg:flex items-center bg-bg-alt/90 p-1.5 rounded-2xl border border-line/90 shadow-2xs">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 xl:px-5 py-2 rounded-xl text-[13px] transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "bg-navy text-white font-bold shadow-[0_4px_12px_rgba(15,41,66,0.2)]"
                      : "text-ink-soft font-semibold hover:text-navy hover:bg-white/80"
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTAs Desktop & Tablet */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {isHydrated && isAuthenticated ? (
              <>
                <Link
                  href={role === "admin" ? "/admin" : "/aula"}
                  className="px-3.5 py-2.5 rounded-xl border border-teal/25 bg-tealtint/60 hover:bg-tealtint text-tealdeep text-xs font-bold transition-all flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    {role === "admin" ? "Panel Control" : "Aula Virtual"}
                  </span>
                </Link>

                <Link
                  href={role === "admin" ? "/admin" : "/aula"}
                  className="btn btn-primary !py-2.5 !px-4 !text-xs font-bold flex items-center gap-2 !rounded-xl shadow-md"
                >
                  {role === "admin" ? (
                    <>
                      <Shield className="w-3.5 h-3.5 text-goldpale" />
                      <span>Panel Admin</span>
                    </>
                  ) : (
                    <>
                      <UserIcon className="w-3.5 h-3.5 text-goldpale" />
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
                  className="px-3.5 py-2.5 rounded-xl border border-teal/25 bg-tealtint/55 hover:bg-tealtint text-navy hover:text-tealdeep text-xs font-bold transition-all flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-teal shrink-0" />
                  <span>Aula Virtual</span>
                  <span className="text-[9.5px] bg-teal text-white px-1.5 py-0.5 rounded-md font-extrabold tracking-wide">
                    24/7
                  </span>
                </Link>

                <Link
                  href="/login"
                  className="btn btn-primary !py-2.5 !px-5 !text-xs font-bold !rounded-xl shadow-md"
                >
                  <span>Iniciar sesión</span>
                  <span className="arrow">→</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="lg:hidden p-2.5 text-navy rounded-xl border border-line bg-bg-alt/60 hover:bg-bg-alt focus:outline-none cursor-pointer transition-colors"
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

            {/* Mobile CTAs */}
            <div className="pt-3 border-t border-line flex flex-col sm:hidden gap-2.5">
              {isHydrated && isAuthenticated ? (
                <Link
                  href={role === "admin" ? "/admin" : "/aula"}
                  onClick={() => setIsOpen(false)}
                  className="btn btn-primary w-full justify-center text-xs font-bold flex items-center gap-2 !py-3 !rounded-xl"
                >
                  {role === "admin" ? (
                    <Shield className="w-4 h-4" />
                  ) : (
                    <UserIcon className="w-4 h-4" />
                  )}
                  <span>
                    Ir a{" "}
                    {role === "admin"
                      ? "Panel Administrador"
                      : "Mi Aula Virtual"}
                  </span>
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    href="/aula"
                    onClick={() => setIsOpen(false)}
                    className="btn btn-ghost w-full justify-center !text-xs font-bold !py-3 !px-3 !rounded-xl"
                  >
                    Aula Virtual 24/7
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="btn btn-primary w-full justify-center !text-xs font-bold !py-3 !px-3 !rounded-xl"
                  >
                    Iniciar sesión
                  </Link>
                </div>
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

