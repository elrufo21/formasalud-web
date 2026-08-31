"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Inicio", num: "01" },
    { href: "/cursos", label: "Cursos y Programas", num: "02" },
    { href: "/#flyers", label: "Próximos Flyers", num: "03" },
    { href: "/#equipo", label: "Docentes & Equipo", num: "04" },
    { href: "/quienes-somos", label: "Institucional", num: "05" },
    { href: "/contacto", label: "Contacto", num: "06" },
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
                alt="FORMASALUD Logo"
                width={40}
                height={40}
                className="object-cover"
                priority
              />
            </div>
            <div className="font-serif font-bold text-lg text-navy leading-none">
              FORMASALUD
              <span className="block font-mono font-normal text-[9px] tracking-widest text-teal uppercase mt-1">
                Centro de capacitación en salud
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href) && link.href !== "/";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-medium py-2 px-3 flex items-center gap-1.5 transition-colors rounded-md ${
                    isActive
                      ? "text-navy font-semibold bg-bg-alt"
                      : "text-ink-soft hover:text-navy hover:bg-bg-alt/60"
                  }`}
                >
                  <span
                    className={`font-mono text-[9.5px] ${
                      isActive ? "text-gold font-bold" : "text-line-strong"
                    }`}
                  >
                    {link.num}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <div className="relative group">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("El Aula Virtual estará disponible próximamente para el inicio de las clases 2026. Si ya estás matriculado, recibirás tus credenciales por WhatsApp/Email.");
                }}
                className="btn btn-ghost !py-2.5 !px-4 !text-[12.5px] flex items-center gap-1.5"
              >
                <span>Aula Virtual</span>
                <span className="font-mono text-[8.5px] bg-teal/10 text-teal px-1.5 py-0.5 rounded font-bold">
                  24/7
                </span>
              </a>
            </div>

            <a
              href="https://wa.me/51999999999?text=Hola%20FORMASALUD,%20quisiera%20recibir%20informaci%C3%B3n%20sobre%20los%20programas%20acad%C3%A9micos%202026."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary !py-2.5 !px-5 !text-[13px] font-semibold"
            >
              Matricúlate <span className="arrow">→</span>
            </a>
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
                className={`py-2 text-sm font-medium flex items-center gap-2.5 rounded-lg px-2 ${
                  pathname === link.href ? "text-navy font-bold bg-bg-alt" : "text-ink-soft hover:text-navy"
                }`}
              >
                <span className="font-mono text-xs text-gold font-bold">{link.num}</span>
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-line flex flex-col gap-2.5">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("El Aula Virtual estará disponible próximamente para el inicio de las clases 2026.");
                }}
                className="btn btn-ghost w-full justify-center text-xs"
              >
                Acceso Aula Virtual (Próximamente)
              </a>
              <a
                href="https://wa.me/51999999999?text=Hola%20FORMASALUD,%20quisiera%20recibir%20informaci%C3%B3n%20sobre%20los%20programas%20acad%C3%A9micos%202026."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full justify-center text-sm font-semibold"
              >
                Hablar con un asesor por WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
