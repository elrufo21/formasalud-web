"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, CheckCircle2, Calendar, Clock, UserCheck } from "lucide-react";
import { ImageFrame } from "@/components/ui/ImageFrame";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
      {/* Background Animated Video (MP4) - Termina a los 8s y se atenúa suavemente */}
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
            videoEnded ? "opacity-15" : "opacity-55"
          }`}
        >
          <source src="/video/formasaludhero.mp4" type="video/mp4" />
        </video>
        {/* Gradientes direccionales para máxima legibilidad en móvil y desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-navyink via-navyink/85 to-navyink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navyink via-transparent to-navyink/50" />
      </div>

      <div className="hero-inner pt-8 sm:pt-12 lg:pt-14 pb-6 px-4 sm:px-8 max-w-[1400px] mx-auto relative z-10">
        {/* Fila Principal del Hero */}
        <div className="hero-top-row grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 pb-8 lg:pb-10">
          {/* Columna Izquierda: Mensajes Principales y CTAs con entrada escalonada */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.05 },
              },
            }}
            className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 text-left"
          >
            {/* Top Tag */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
              }}
              className="flex items-center gap-2 self-start"
            >
              <div className="edition-tag">
                <span className="dot animate-pulse" />
                <span>Innovación y Desarrollo Académico en Salud</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
              }}
              className="!text-white text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-extrabold leading-[1.12] tracking-tight max-w-[660px]"
            >
              Formación Continua y Excelencia en la{" "}
              <span className="text-goldpale italic font-bold">
                Atención Sanitaria
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
              }}
              className="!text-white/85 text-sm sm:text-base lg:text-[16.5px] max-w-[590px] leading-relaxed font-normal"
            >
              Somos un centro de capacitación especializado en empoderar a los profesionales de la salud mediante programas que integran conocimientos científicos actualizados, metodologías innovadoras y experiencias prácticas.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
              }}
              className="flex flex-col xs:flex-row sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-3.5 pt-2"
            >
              <Link
                href="/cursos"
                className="btn btn-primary !py-3.5 !px-6 sm:!px-7 text-sm font-bold shadow-lg w-full sm:w-auto"
              >
                <span>Ver catálogo de cursos</span>
                <span className="arrow">→</span>
              </Link>
              <a
                href="#flyers"
                className="btn-fine on-dark !py-3.5 !px-5 text-xs font-semibold backdrop-blur-xs w-full sm:w-auto"
              >
                <span>Próximos Flyers &amp; Eventos</span>
              </a>
            </motion.div>

            {/* Micro Trust Indicators */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
              }}
              className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-5 text-xs text-white/80 pt-2"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Evidencia Científica y Práctica</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Modalidad Flexible 24/7</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Certificación con QR Oficial</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Columna Derecha: Flyer Destacado con entrada suave y micro-interacción */}
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2, ease: EASE_OUT }}
            className="lg:col-span-5 flex items-center justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              onClick={() => setIsEnrollModalOpen(true)}
              className={`relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] transition-opacity duration-700 ease-out group cursor-pointer ${
                videoEnded
                  ? "opacity-100"
                  : "opacity-95 lg:opacity-90"
              }`}
              title="Haz clic para ver detalles e inscribirte"
            >
              {/* Halo dorado sutil detrás del flyer */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-gold/25 via-teal/20 to-transparent rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative rounded-2xl overflow-hidden border-2 border-gold/40 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                <ImageFrame
                  src="/images/flyers/coche-de-paro-uci-emergencias.jpg"
                  alt="Curso Internacional: Manejo del Coche de Paro en Áreas Críticas UCI y Emergencias"
                  cut={0}
                  aspectClassName="aspect-[431/523]"
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 420px"
                  priority
                  className="transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Badge flotante en la parte inferior del flyer */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-navyink/95 via-navyink/70 to-transparent flex items-center justify-between">
                  <span className="text-[11px] font-bold text-goldpale uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>Programa Destacado</span>
                  </span>
                  <span className="py-1 px-3 rounded-full bg-gold text-navyink text-[11px] font-bold shadow-md group-hover:bg-white transition-colors">
                    Inscribirme →
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Pulse Line SVG Animation */}
        <svg
          className="pulse-line opacity-80"
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

        {/* Stats Strip con revelado escalonado */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.15 },
            },
          }}
          className="hero-stats border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-y-2 pt-2"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
            }}
            className="py-3 sm:py-4 border-r border-b lg:border-b-0 border-white/15 pr-3 sm:pr-4"
          >
            <b className="text-white text-xl sm:text-2xl font-extrabold tracking-tight">
              100%
            </b>
            <span className="text-[10px] text-white/60 tracking-wider uppercase block mt-0.5 font-semibold">
              Basado en Evidencia
            </span>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
            }}
            className="py-3 sm:py-4 border-b lg:border-b-0 lg:border-r border-white/15 pl-3 sm:px-4"
          >
            <b className="text-white text-xl sm:text-2xl font-extrabold tracking-tight">
              24/7
            </b>
            <span className="text-[10px] text-white/60 tracking-wider uppercase block mt-0.5 font-semibold">
              Aula Virtual Activa
            </span>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
            }}
            className="py-3 sm:py-4 border-r border-white/15 pr-3 sm:px-4"
          >
            <b className="text-white text-xl sm:text-2xl font-extrabold tracking-tight">
              08+
            </b>
            <span className="text-[10px] text-white/60 tracking-wider uppercase block mt-0.5 font-semibold">
              Líneas Académicas
            </span>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
            }}
            className="py-3 sm:py-4 pl-3 sm:pl-4"
          >
            <b className="text-goldpale text-lg sm:text-2xl font-extrabold tracking-tight truncate block">
              20613837613
            </b>
            <span className="text-[10px] text-white/60 tracking-wider uppercase block mt-0.5 font-semibold">
              RUC FORMASALUD · Lima, Perú
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal de inscripción al hacer clic en el flyer */}
      <AnimatePresence>
        {isEnrollModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navyink/80 backdrop-blur-sm"
            onClick={() => setIsEnrollModalOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-line overflow-hidden text-ink"
              onClick={(e) => e.stopPropagation()}
            >
            {/* Cabecera institucional */}
            <div className="p-6 bg-gradient-to-br from-navy via-navy to-tealdeep text-white relative">
              <button
                type="button"
                onClick={() => setIsEnrollModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer text-sm"
                aria-label="Cerrar modal"
              >
                ✕
              </button>

              <span className="inline-block text-[10px] uppercase tracking-widest text-goldpale font-bold mb-2 px-2.5 py-0.5 rounded-full bg-gold/20 border border-gold/40">
                Inscripción Abierta 2026
              </span>
              <h3 className="text-lg sm:text-xl font-bold !text-white leading-snug pr-6">
                Manejo del Coche de Paro en Áreas Críticas
              </h3>
              <p className="text-xs !text-white/80 mt-1 font-medium">
                UCI y Emergencias · Modalidad 100% Virtual
              </p>
            </div>

            {/* Detalles rápidos y claros */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-bg-alt border border-line">
                  <span className="text-[10px] text-ink-soft font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal" />
                    <span>Fecha</span>
                  </span>
                  <span className="font-bold text-navy mt-1 block">
                    13 de Septiembre
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-bg-alt border border-line">
                  <span className="text-[10px] text-ink-soft font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal" />
                    <span>Horario</span>
                  </span>
                  <span className="font-bold text-navy mt-1 block">
                    8:00 PM – 10:00 PM
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-bg-alt border border-line text-xs">
                <span className="text-[10px] text-ink-soft font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-teal" />
                  <span>Ponente Especialista</span>
                </span>
                <span className="font-bold text-navy mt-1 block text-sm">
                  Lic. Zambrano Cruz Miguel
                </span>
                <span className="text-xs text-ink-soft block mt-0.5">
                  Coordinador Académico &amp; Especialista en Áreas Críticas
                </span>
              </div>

              <div className="p-3 bg-tealtint/70 rounded-xl border border-teal/20 text-xs text-tealdeep flex items-center gap-2.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse shrink-0" />
                <span>Vacantes disponibles para acceso al programa y certificación oficial.</span>
              </div>

              {/* Botón principal de WhatsApp */}
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.me/51939584395?text=${encodeURIComponent(
                    "Hola FORMASALUD, deseo inscribirme en el Curso Internacional: Manejo del Coche de Paro en Áreas Críticas UCI y Emergencias. ¿Podrían brindarme información para confirmar mi vacante?"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsEnrollModalOpen(false)}
                  className="btn btn-primary w-full justify-center !py-3 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>Inscribirme por WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 text-goldpale" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsEnrollModalOpen(false)}
                  className="w-full py-2 text-xs font-semibold text-ink-soft hover:text-navy transition-colors text-center cursor-pointer"
                >
                  Cerrar ventana
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
}
