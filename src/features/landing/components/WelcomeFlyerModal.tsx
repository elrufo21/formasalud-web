"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, MessageCircle, BookOpen, Calendar, Sparkles } from "lucide-react";

const COURSE_SLUG =
  "primeros-auxilios-y-respuesta-rapida-ante-emergencias-comunes";

export function WelcomeFlyerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const whatsappMessage = encodeURIComponent(
    "Hola FORMASALUD, vi el flyer en la web y deseo información e inscribirme en el Curso de Primeros Auxilios y Respuesta Rápida ante Emergencias Comunes (Inicio: 15 de enero de 2027).",
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navyink/85 backdrop-blur-md animate-in fade-in duration-300"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-flyer-title"
    >
      <div
        className="relative w-full max-w-[500px] bg-navyink rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.65)] border-2 border-gold/50 overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra Superior Compacta */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-navyink via-navy to-tealdeep border-b border-white/15 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold text-navyink text-[10px] font-extrabold uppercase tracking-wider shrink-0">
              <Sparkles className="w-3 h-3" />
              <span>Próximo Inicio</span>
            </span>
            <span
              id="welcome-flyer-title"
              className="text-xs font-bold text-white truncate"
            >
              15 de Enero 2027 · Todos los Sábados
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Cerrar flyer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Imagen Oficial del Flyer Completa */}
        <div className="relative flex-1 overflow-y-auto bg-[#071a2e] flex items-center justify-center p-2 sm:p-3">
          <Link
            href={`/cursos/${COURSE_SLUG}`}
            onClick={() => setIsOpen(false)}
            className="block relative w-full group"
            title="Ver temario completo del curso"
          >
            <Image
              src="/images/flyers/primeros-auxilios-emergencias-2027.jpg"
              alt="Flyer Oficial: Curso de Primeros Auxilios y Respuesta Rápida ante Emergencias Comunes - Inicio 15 de Enero de 2027"
              width={682}
              height={1024}
              priority
              className="w-full h-auto max-h-[68vh] object-contain mx-auto rounded-xl shadow-lg"
            />
          </Link>
        </div>

        {/* Botones de Acción Inferiores */}
        <div className="p-3.5 sm:p-4 bg-gradient-to-b from-navy to-navyink border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <Link
            href={`/cursos/${COURSE_SLUG}`}
            onClick={() => setIsOpen(false)}
            className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-goldpale text-navy font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-teal shrink-0" />
            <span>Ver Curso y Temario</span>
          </Link>

          <a
            href={`https://wa.me/51939584395?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 shrink-0 fill-current" />
            <span>Inscribirme por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
