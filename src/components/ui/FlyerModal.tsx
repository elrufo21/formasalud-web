"use client";

import React, { useEffect } from "react";
import { FlyerItem } from "@/features/landing/data/flyers";

interface FlyerModalProps {
  flyer: FlyerItem | null;
  onClose: () => void;
}

export function FlyerModal({ flyer, onClose }: FlyerModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (flyer) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [flyer, onClose]);

  if (!flyer) return null;

  const whatsappMessage = encodeURIComponent(
    `Hola FORMASALUD, deseo reservar mi vacante para el evento: "${flyer.title}" (Código: ${flyer.code}). ¿Podrían brindarme los pasos para confirmar mi asistencia?`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navyink/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="flyer-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-paper rounded-2xl shadow-2xl border border-line overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Visual Poster Bar */}
        <div className={`p-6 sm:p-8 bg-gradient-to-br ${flyer.colorGradient} text-white relative flex-none`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar vista previa"
          >
            ✕
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full ${flyer.badgeColor}`}>
              {flyer.type}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-goldpale border border-goldpale/30 px-2.5 py-1 rounded-full">
              {flyer.code}
            </span>
          </div>

          <h2 id="flyer-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
            {flyer.title}
          </h2>

          <div className="flex items-center gap-3 mt-4 text-xs font-mono text-white/80">
            <span>📅 {flyer.date}</span>
            <span>⏰ {flyer.time}</span>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-ink">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal font-semibold block mb-1">
              Docente / Ponente Principal
            </span>
            <div className="flex items-center gap-3 bg-bg-alt p-3.5 rounded-xl border border-line">
              <div className="w-10 h-10 rounded-full bg-navy text-goldpale font-serif italic text-base flex items-center justify-center font-bold flex-none border border-gold">
                {flyer.speakerInitials}
              </div>
              <div>
                <b className="text-navy font-serif text-base block">{flyer.speaker}</b>
                <span className="text-xs text-ink-soft block">{flyer.speakerRole}</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal font-semibold block mb-2">
              Resumen Académico del Evento
            </span>
            <p className="text-sm text-ink-soft leading-relaxed">
              {flyer.summary}
            </p>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal font-semibold block mb-2">
              ¿Qué incluye este programa?
            </span>
            <ul className="space-y-2 text-sm text-ink-soft">
              {flyer.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-teal font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-tealtint rounded-xl border border-teal/20 text-xs font-mono text-tealdeep">
              <span className="font-bold block uppercase tracking-wider">Modalidad</span>
              {flyer.modality}
            </div>
            <div className="p-3 bg-bg-alt rounded-xl border border-line text-xs font-mono text-ink-soft">
              <span className="font-bold block uppercase tracking-wider text-navy">Disponibilidad</span>
              {flyer.spots}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-bg-alt border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 flex-none">
          <div>
            <span className="text-[11px] font-mono uppercase text-ink-soft block">Acceso / Tarifa</span>
            <div className="font-serif text-xl font-bold text-navy">{flyer.priceTag}</div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="btn btn-ghost !py-3 !px-4 text-xs font-semibold w-1/2 sm:w-auto"
            >
              Cerrar
            </button>
            <a
              href={`https://wa.me/51999999999?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary !py-3 !px-6 text-sm font-semibold flex-1 sm:flex-none justify-center"
            >
              Reservar por WhatsApp <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
