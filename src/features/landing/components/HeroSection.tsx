"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  const [videoEnded, setVideoEnded] = useState(false);
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
        <div className="hero-top-row flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12 pb-8 lg:pb-12">
          {/* Columna Izquierda: Mensajes Principales y CTAs */}
          <div className="hero-kicker flex flex-col gap-5 max-w-[680px] flex-1">
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
              Capacitación Médica Continua & Especialización de{" "}
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
                Próximos Flyers & Eventos
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

          {/* Columna Derecha: Logo Oficial FORMASALUD revelado tras los 8s del video */}
          <div className="flex-1 w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] flex items-center justify-center lg:justify-end self-center">
            <div
              className={`relative w-[220px] sm:w-[280px] lg:w-[330px] xl:w-[370px] aspect-square transition-all duration-1000 ease-out flex items-center justify-center ${
                videoEnded
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-90 translate-y-2 pointer-events-none"
              }`}
            >
              {/* Halo dorado ambiente */}
              <div className="absolute inset-2 rounded-full bg-gold/20 blur-2xl -z-10 animate-pulse" />

              {/* Logo Oficial en Alta Resolución */}
              <div className="relative w-full h-full drop-shadow-[0_12px_30px_rgba(0,0,0,0.65)]">
                <Image
                  src="/images/logo.png"
                  alt="Emblema Oficial FORMASALUD"
                  fill
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 370px"
                  priority
                  className="object-contain"
                />
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

        {/* Stats Strip bien estructurado hasta el fondo */}
        <div className="hero-stats border-t border-white/15 grid grid-cols-2 md:grid-cols-4">
          <div className="py-5 sm:py-6 border-r border-b md:border-b-0 border-white/15 pr-4">
            <b className="text-white font-serif text-2xl sm:text-3xl font-bold">
              100%
            </b>
            <span className="font-mono text-[10px] sm:text-[10.5px] text-white/50 tracking-widest uppercase block mt-1">
              Basado en Evidencia
            </span>
          </div>
          <div className="py-5 sm:py-6 border-r-0 md:border-r border-b md:border-b-0 border-white/15 px-4">
            <b className="text-white font-serif text-2xl sm:text-3xl font-bold">
              3
            </b>
            <span className="font-mono text-[10px] sm:text-[10.5px] text-white/50 tracking-widest uppercase block mt-1">
              Modalidades de Estudio
            </span>
          </div>
          <div className="py-5 sm:py-6 border-r border-white/15 pr-4 md:px-4">
            <b className="text-white font-serif text-2xl sm:text-3xl font-bold">
              08+
            </b>
            <span className="font-mono text-[10px] sm:text-[10.5px] text-white/50 tracking-widest uppercase block mt-1">
              Líneas Académicas
            </span>
          </div>
          <div className="py-5 sm:py-6 pl-4">
            <b className="text-white font-serif text-2xl sm:text-3xl font-bold">
              20613837613
            </b>
            <span className="font-mono text-[10px] sm:text-[10.5px] text-white/50 tracking-widest uppercase block mt-1">
              RUC Grupo Paucar Perú
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
