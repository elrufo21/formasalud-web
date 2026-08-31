import React from "react";
import Link from "next/link";
import { Seal } from "@/components/ui/Seal";

export function HeroSection() {
  return (
    <section className="hero reg-frame texture-dark bg-navyink text-white py-0 relative overflow-hidden">
      <div className="hero-inner pt-14 sm:pt-20 px-5 md:px-8 max-w-[1400px] mx-auto relative">
        <Seal className="hero-seal hidden lg:block" />

        <div className="hero-top-row flex flex-col lg:flex-row justify-between items-stretch gap-8 lg:gap-12 pb-10">
          <div className="hero-kicker flex flex-col gap-5 max-w-[680px] flex-1">
            {/* Top Tag */}
            <div className="flex flex-wrap items-center gap-2 self-start">
              <div className="edition-tag">
                <span className="dot" />
                Programa Académico · Edición 2026
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-teal bg-tealtint/10 border border-teal/30 px-3 py-1 rounded-full hidden sm:inline-block">
                🎓 Certificación con respaldo RUC 20613837613
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-white text-3xl sm:text-5xl lg:text-[54px] font-serif leading-[1.1] tracking-tight mt-1">
              Formación Médica Continua & Ponencias de <em>Alto Nivel</em>
            </h1>

            {/* Subtitle */}
            <p className="hero-sub text-white/75 text-sm sm:text-base md:text-lg max-w-[540px] leading-relaxed">
              Capacítate con especialistas en ejercicio clínico activo de los principales hospitales del Perú. Diplomados, cursos y talleres hands-on orientados a la práctica médica real.
            </p>

            {/* CTAs */}
            <div className="hero-ctas flex flex-wrap items-center gap-3.5 mt-2">
              <Link href="/cursos" className="btn btn-primary !py-3.5 !px-6 sm:!px-7 text-sm font-semibold">
                Ver catálogo de cursos <span className="arrow">→</span>
              </Link>
              <a href="#flyers" className="btn-fine on-dark !py-3.5 !px-5 text-xs font-semibold">
                Próximos Flyers & Eventos
              </a>
            </div>

            {/* Micro Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60 pt-2">
              <span className="flex items-center gap-1.5">
                <span className="text-gold font-bold">✓</span> Horas lectivas acreditadas
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-gold font-bold">✓</span> Aula Virtual HD 24/7
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-gold font-bold">✓</span> Validación con código QR
              </span>
            </div>
          </div>

          {/* Right Visual Graphic Card */}
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-teal via-navy to-navyink flex-none hidden md:block self-center shadow-2xl border border-white/10">
            <div
              className="absolute inset-0 opacity-[.08]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 1px,transparent 14px)",
              }}
            />
            
            {/* Visual Header Mock */}
            <div className="absolute top-5 left-5 right-5 flex justify-between items-center text-white/80 border-b border-white/15 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-navy border border-gold flex items-center justify-center font-serif italic text-xs font-bold text-goldpale">
                  FS
                </div>
                <span className="font-mono text-xs uppercase tracking-widest font-semibold">
                  FORMASALUD 2026
                </span>
              </div>
              <span className="font-mono text-[10px] text-gold bg-gold/10 px-2 py-0.5 rounded uppercase font-bold">
                En vivo & Online
              </span>
            </div>

            {/* Central Graphic */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-8">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                <svg
                  className="w-8 h-8 text-goldpale"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <span className="font-serif text-lg font-bold text-white max-w-[260px] leading-snug">
                Educación Médica Especializada para Profesionales de Salud
              </span>
              <span className="font-mono text-[10.5px] text-white/60 tracking-widest uppercase">
                Médicos · Enfermeros · Gestores en Salud
              </span>
            </div>

            {/* Bottom Tag */}
            <div className="absolute bottom-4 left-4 right-4 bg-navyink/90 backdrop-blur-md p-3.5 rounded-xl border border-white/15 flex items-center justify-between text-xs font-mono">
              <span className="text-white/80">Plataforma Virtual</span>
              <span className="text-gold font-bold">Próximamente Aula Virtual</span>
            </div>
          </div>
        </div>

        {/* Pulse Line SVG Animation */}
        <svg
          className="pulse-line"
          viewBox="0 0 1160 46"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 23 H430 L448 6 L466 40 L484 23 H560 L575 12 L588 34 L602 23 H680 L695 8 L710 38 L726 23 H1160"
            strokeLinecap="round"
          />
        </svg>

        {/* Stats Strip */}
        <div className="hero-stats border-t border-white/15 grid grid-cols-2 md:grid-cols-4">
          <div className="py-6 border-r border-b md:border-b-0 border-white/15 pr-4">
            <b className="text-white font-serif text-2xl sm:text-3xl font-bold">+1,200</b>
            <span className="font-mono text-[10px] sm:text-[10.5px] text-white/50 tracking-widest uppercase block mt-1">
              Profesionales capacitados
            </span>
          </div>
          <div className="py-6 border-r-0 md:border-r border-b md:border-b-0 border-white/15 px-4">
            <b className="text-white font-serif text-2xl sm:text-3xl font-bold">100%</b>
            <span className="font-mono text-[10px] sm:text-[10.5px] text-white/50 tracking-widest uppercase block mt-1">
              Docentes Especialistas
            </span>
          </div>
          <div className="py-6 border-r border-white/15 pr-4 md:px-4">
            <b className="text-white font-serif text-2xl sm:text-3xl font-bold">05</b>
            <span className="font-mono text-[10px] sm:text-[10.5px] text-white/50 tracking-widest uppercase block mt-1">
              Líneas Académicas
            </span>
          </div>
          <div className="py-6 pl-4">
            <b className="text-white font-serif text-2xl sm:text-3xl font-bold">RUC 2061</b>
            <span className="font-mono text-[10px] sm:text-[10.5px] text-white/50 tracking-widest uppercase block mt-1">
              Respaldo Grupo Paucar
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
