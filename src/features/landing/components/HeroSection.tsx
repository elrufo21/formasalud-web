"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Activity,
} from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="hero reg-frame texture-dark bg-navyink text-white relative overflow-hidden !py-0 min-h-[620px] sm:min-h-[660px] lg:min-h-[700px] flex flex-col justify-between">
      {/* Background Video: Alta visibilidad, nítido, claro y continuo en bucle */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-[center_right] sm:object-center opacity-90 sm:opacity-95 filter brightness-105 contrast-105 transition-opacity duration-700"
        >
          <source src="/video/formasaludhero.mp4" type="video/mp4" />
        </video>

        {/* Gradiente direccional suave: solo protege el texto en la zona izquierda, dejando la derecha luminosa y despejada */}
        <div className="absolute inset-0 bg-gradient-to-r from-navyink/95 via-navyink/75 sm:via-navyink/60 sm:to-transparent to-navyink/20" />
        {/* Desvanecimiento inferior suave hacia la barra de estadísticas */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navyink via-navyink/40 to-transparent" />
      </div>

      <div className="hero-inner pt-10 sm:pt-14 lg:pt-16 pb-6 px-4 sm:px-8 max-w-[1400px] mx-auto relative z-10 w-full flex-1 flex flex-col justify-between">
        {/* Fila Principal del Hero */}
        <div className="hero-top-row grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 pb-8 lg:pb-12 flex-1">
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
            className="lg:col-span-7 xl:col-span-7 flex flex-col gap-4 sm:gap-5 text-left"
          >
            {/* Top Tag */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
              }}
              className="flex items-center gap-2 self-start"
            >
              <div className="edition-tag backdrop-blur-xs bg-navyink/40">
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
              className="!text-white text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-extrabold leading-[1.12] tracking-tight max-w-[680px] drop-shadow-md font-serif"
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
              className="!text-white/90 text-sm sm:text-base lg:text-[16.5px] max-w-[590px] leading-relaxed font-normal drop-shadow-sm"
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
                className="btn btn-primary !py-3.5 !px-6 sm:!px-7 text-sm font-bold shadow-xl shadow-teal/30 w-full sm:w-auto"
              >
                <span>Ver catálogo de cursos</span>
                <span className="arrow">→</span>
              </Link>
              <a
                href="#flyers"
                className="btn-fine on-dark !py-3.5 !px-5 text-xs font-semibold backdrop-blur-md bg-navyink/50 hover:bg-navyink/80 w-full sm:w-auto shadow-md"
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
              className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-5 text-xs text-white/90 pt-2"
            >
              <span className="flex items-center gap-2 bg-navyink/30 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10 w-fit">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Evidencia Científica y Práctica</span>
              </span>
              <span className="flex items-center gap-2 bg-navyink/30 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10 w-fit">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Modalidad Flexible 24/7</span>
              </span>
              <span className="flex items-center gap-2 bg-navyink/30 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10 w-fit">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Certificación con QR Oficial</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Columna Derecha: El video se aprecia plenamente despejado y nítido, con controles sutiles flotantes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE_OUT }}
            className="lg:col-span-5 xl:col-span-5 flex flex-col items-center lg:items-end justify-center lg:justify-end gap-3 pointer-events-auto"
          >
            {/* Badge flotante sutil con indicador de actividad médica */}
            <div className="backdrop-blur-md bg-navyink/70 border border-white/20 text-white rounded-2xl p-3 sm:p-4 shadow-2xl flex items-center gap-3 max-w-xs transition-all hover:bg-navyink/85">
              <div className="w-9 h-9 rounded-xl bg-teal/30 border border-teal/40 flex items-center justify-center shrink-0 text-goldpale">
                <Activity className="w-5 h-5 text-teal-300 animate-pulse" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-goldpale">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>En Vivo · Plataforma 2026</span>
                </div>
                <p className="text-xs font-bold text-white leading-tight mt-0.5">
                  Simulación y Práctica Hospitalaria
                </p>
              </div>
            </div>

            {/* Controles de reproducción interactiva del video */}
            <div className="flex items-center gap-2 backdrop-blur-md bg-navyink/60 border border-white/15 rounded-full px-3 py-1.5 shadow-lg">
              <button
                type="button"
                onClick={togglePlay}
                className="flex items-center gap-1.5 text-xs text-white/90 hover:text-goldpale transition-colors px-2 py-1 rounded-full hover:bg-white/10 cursor-pointer"
                title={isPlaying ? "Pausar video" : "Reproducir video"}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-gold" />
                    <span className="text-[11px] font-semibold">Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-gold" />
                    <span className="text-[11px] font-semibold">Reproducir</span>
                  </>
                )}
              </button>

              <span className="text-white/20">|</span>

              <button
                type="button"
                onClick={toggleMute}
                className="flex items-center gap-1.5 text-xs text-white/90 hover:text-goldpale transition-colors px-2 py-1 rounded-full hover:bg-white/10 cursor-pointer"
                title={isMuted ? "Activar sonido" : "Silenciar sonido"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-white/70" />
                    <span className="text-[11px] font-semibold">Audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] font-semibold text-emerald-300">Activo</span>
                  </>
                )}
              </button>
            </div>
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
            <span className="text-[10px] text-white/75 tracking-wider uppercase block mt-0.5 font-semibold">
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
            <span className="text-[10px] text-white/75 tracking-wider uppercase block mt-0.5 font-semibold">
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
            <span className="text-[10px] text-white/75 tracking-wider uppercase block mt-0.5 font-semibold">
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
            <span className="text-[10px] text-white/75 tracking-wider uppercase block mt-0.5 font-semibold">
              RUC FORMASALUD · Lima, Perú
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
