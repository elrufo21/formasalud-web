"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { ImageFrame } from "@/components/ui/ImageFrame";

export function HeroSection() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setVideoEnded(true);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 8.0) {
      videoRef.current.pause();
      setVideoEnded(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setVideoEnded(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsEnrollModalOpen(false);
    };
    if (isEnrollModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEnrollModalOpen]);

  return (
    <section className="hero reg-frame texture-dark bg-navyink text-white relative overflow-hidden !py-0">
      {/* Background Animated Video (MP4) - Termina a los 8s y se oculta definitivamente */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          onTimeUpdate={handleTimeUpdate}
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ease-out ${
            videoEnded ? "opacity-0" : "opacity-60"
          }`}
        >
          <source src="/video/formasaludhero.mp4" type="video/mp4" />
        </video>
        {/* Gradiente direccional para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-navyink/95 via-navyink/80 to-navyink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navyink/90 via-transparent to-navyink/40" />
      </div>

      <div className="hero-inner !pt-4 sm:!pt-6 px-5 md:px-8 max-w-[1400px] mx-auto relative z-10">
        {/* Fila Principal del Hero */}
        <div className="hero-top-row flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12 pb-6 lg:pb-8">
          {/* Columna Izquierda: Mensajes Principales y CTAs */}
          <div className="hero-kicker flex flex-col gap-5 max-w-[660px] flex-1">
            {/* Top Tag */}
            <div className="flex items-center gap-2 self-start">
              <div className="edition-tag">
                <span className="dot" />
                Programa Académico · Edición 2026
              </div>
            </div>

            {/* Main Headline */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-[1.15] tracking-tight mt-1 max-w-[640px]"
              style={{ color: "#ffffff" }}
            >
              Capacitación Médica Continua &amp; Especialización de{" "}
              <em style={{ color: "#ffffff", fontStyle: "italic" }}>
                Alto Nivel
              </em>
            </h1>

            {/* Subtitle */}
            <p
              style={{ color: "#f5f1f1" }}
              className="hero-sub text-white text-sm sm:text-base md:text-lg max-w-[560px] leading-relaxed"
            >
              Empoderamos a los profesionales de la salud mediante diplomados,
              talleres y programas orientados al fortalecimiento de competencias
              clínicas, asistenciales, administrativas y tecnológicas.
            </p>

            {/* CTAs */}
            <div className="hero-ctas flex flex-wrap items-center gap-3.5 mt-2">
              <Link
                href="/cursos"
                className="btn btn-primary !py-3.5 !px-6 sm:!px-7 text-sm font-semibold shadow-lg"
              >
                Ver catálogo de cursos <span className="arrow">→</span>
              </Link>
              <a
                href="#flyers"
                className="btn-fine on-dark !py-3.5 !px-5 text-xs font-semibold backdrop-blur-sm"
              >
                Próximos Flyers &amp; Eventos
              </a>
            </div>

            {/* Micro Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/70 pt-2">
              <span className="flex items-center gap-1.5">
                <span className="text-gold font-bold">✓</span> Evidencia
                Científica y Práctica
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-gold font-bold">✓</span> Modalidad
                Flexible
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-gold font-bold">✓</span> Acompañamiento
                Continuo
              </span>
            </div>
          </div>

          {/* Columna Derecha: Flyer más grande revelado tras los 8s del video */}
          <div className="flex-1 w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] xl:max-w-[470px] flex items-center justify-center lg:justify-end self-center">
            <div
              onClick={() => setIsEnrollModalOpen(true)}
              className={`relative w-full transition-all duration-1000 ease-out group cursor-pointer ${
                videoEnded
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-90 translate-y-2 pointer-events-none"
              }`}
              title="Haz clic para ver detalles e inscribirte"
            >
              <ImageFrame
                src="/images/flyers/coche-de-paro-uci-emergencias.jpg"
                alt="Curso Internacional: Manejo del Coche de Paro en Áreas Críticas UCI y Emergencias"
                cut={0}
                aspectClassName="aspect-[431/523]"
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 470px"
                priority
                className="transition-transform duration-300 group-hover:scale-[1.01]"
              />

              {/* Indicador sutil al pasar el cursor (solo en desktop, sutil y elegante) */}
              <div className="absolute inset-0 bg-navy/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px] pointer-events-none flex items-end justify-center pb-4 hidden sm:flex">
                <span className="py-1.5 px-3.5 rounded-full bg-navy/90 text-white text-[11px] font-mono border border-gold/40 shadow-xl backdrop-blur-xs flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Clic para inscribirte</span>
                </span>
              </div>
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

        {/* Stats Strip más compacto para dar más protagonismo al flyer */}
        <div className="hero-stats border-t border-white/15 grid grid-cols-2 md:grid-cols-4">
          <div className="py-3 sm:py-4 border-r border-b md:border-b-0 border-white/15 pr-4">
            <b className="text-white font-serif text-xl sm:text-2xl font-bold">
              100%
            </b>
            <span className="font-mono text-[9px] sm:text-[10px] text-white/50 tracking-widest uppercase block mt-0.5">
              Basado en Evidencia
            </span>
          </div>
          <div className="py-3 sm:py-4 border-r-0 md:border-r border-b md:border-b-0 border-white/15 px-4">
            <b className="text-white font-serif text-xl sm:text-2xl font-bold">
              3
            </b>
            <span className="font-mono text-[9px] sm:text-[10px] text-white/50 tracking-widest uppercase block mt-0.5">
              Modalidades de Estudio
            </span>
          </div>
          <div className="py-3 sm:py-4 border-r border-white/15 pr-4 md:px-4">
            <b className="text-white font-serif text-xl sm:text-2xl font-bold">
              08+
            </b>
            <span className="font-mono text-[9px] sm:text-[10px] text-white/50 tracking-widest uppercase block mt-0.5">
              Líneas Académicas
            </span>
          </div>
          <div className="py-3 sm:py-4 pl-4">
            <b className="text-white font-serif text-xl sm:text-2xl font-bold">
              20613837613
            </b>
            <span className="font-mono text-[9px] sm:text-[10px] text-white/50 tracking-widest uppercase block mt-0.5">
              RUC Grupo Paucar Perú
            </span>
          </div>
        </div>
      </div>

      {/* Modal sutil de inscripción al hacer clic en el flyer */}
      {isEnrollModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navyink/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsEnrollModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-line overflow-hidden animate-in zoom-in-95 duration-200 text-ink"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera estilizada institucional */}
            <div className="p-6 bg-gradient-to-br from-navy via-navy to-tealdeep text-white relative">
              <button
                type="button"
                onClick={() => setIsEnrollModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer text-sm"
                aria-label="Cerrar modal"
              >
                ✕
              </button>

              <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-gold font-bold mb-1.5 px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/30">
                Inscripción Abierta 2026
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-snug pr-6">
                Manejo del Coche de Paro en Áreas Críticas
              </h3>
              <p className="text-xs text-white/80 mt-1 font-mono">
                UCI y Emergencias · 100% Virtual
              </p>
            </div>

            {/* Detalles rápidos y claros */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-bg-alt border border-line">
                  <span className="text-[10px] font-mono text-ink-soft block uppercase tracking-wider">
                    📅 Fecha
                  </span>
                  <span className="font-semibold text-navy mt-0.5 block">
                    13 de Septiembre
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-bg-alt border border-line">
                  <span className="text-[10px] font-mono text-ink-soft block uppercase tracking-wider">
                    ⏰ Horario
                  </span>
                  <span className="font-semibold text-navy mt-0.5 block">
                    8:00 PM – 10:00 PM
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-bg-alt border border-line text-xs">
                <span className="text-[10px] font-mono text-ink-soft block uppercase tracking-wider">
                  👨‍⚕️ Ponente Especialista
                </span>
                <span className="font-semibold text-navy mt-0.5 block">
                  Lic. Zambrano Cruz Miguel
                </span>
                <span className="text-[11px] text-ink-soft block mt-0.5">
                  Coordinador Académico &amp; Especialista en Áreas Críticas
                </span>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-[11px] text-emerald-800 flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>Vacantes disponibles para la transmisión en vivo y certificación.</span>
              </div>

              {/* Botón principal de WhatsApp */}
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.me/51999999999?text=${encodeURIComponent(
                    "Hola FORMASALUD, deseo inscribirme en el Curso Internacional: Manejo del Coche de Paro en Áreas Críticas UCI y Emergencias. ¿Podrían brindarme información para confirmar mi vacante?"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsEnrollModalOpen(false)}
                  className="btn btn-primary w-full justify-center !py-3 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>Inscribirme por WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 text-gold" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsEnrollModalOpen(false)}
                  className="w-full py-2 text-xs font-semibold text-ink-soft hover:text-navy transition-colors text-center cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
