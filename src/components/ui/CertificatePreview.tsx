import React from "react";
import { Seal } from "./Seal";

export function CertificatePreview() {
  return (
    <div className="relative rounded-2xl bg-white border-2 border-gold/40 shadow-2xl p-6 sm:p-10 max-w-2xl mx-auto overflow-hidden">
      {/* Background Watermark Seal */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <Seal className="w-96 h-96" />
      </div>

      {/* Decorative Guilloche/Border Line */}
      <div className="absolute inset-2 sm:inset-3 border border-gold/30 rounded-xl pointer-events-none" />
      <div className="absolute inset-3 sm:inset-4 border border-teal/20 rounded-lg pointer-events-none" />

      {/* Top Header of Certificate */}
      <div className="text-center relative z-10 space-y-1 pb-4 border-b border-line">
        <div className="flex items-center justify-center gap-2">
          <div className="w-7 h-7 rounded-full bg-navy text-goldpale font-serif italic text-xs flex items-center justify-center font-bold border border-gold">
            FS
          </div>
          <span className="font-serif font-bold text-base tracking-wide text-navy">
            FORMASALUD
          </span>
        </div>
        <p className="font-mono text-[9px] uppercase tracking-widest text-teal font-semibold">
          GRUPO PAUCAR PERÚ S.A.C. · RUC 20613837613
        </p>
        <span className="inline-block font-mono text-[8px] bg-tealtint text-tealdeep px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          Registro Académico N° FS-2026-8492
        </span>
      </div>

      {/* Certificate Main Text */}
      <div className="py-6 sm:py-8 text-center relative z-10 space-y-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft block">
          Otorga el presente
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy tracking-tight">
          DIPLOMA DE ESPECIALIZACIÓN
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft block">
          A:
        </span>
        <div className="font-serif text-lg sm:text-xl font-bold text-navy border-b-2 border-gold/50 inline-block px-6 pb-1">
          Lic. Maritza Huamán Cárdenas
        </div>
        <p className="text-xs sm:text-sm text-ink-soft max-w-md mx-auto leading-relaxed pt-1">
          Por haber aprobado satisfactoriamente el programa de alta especialización en:
        </p>
        <b className="block font-serif text-base sm:text-lg text-teal font-semibold">
          "Enfermería en Cuidados Críticos y Cuidados Intensivos"
        </b>
        <div className="font-mono text-[10px] text-ink-soft pt-1">
          Con una duración de <b>120 horas lectivas</b> (4 créditos académicos). Lima, Perú.
        </div>
      </div>

      {/* Signatures & Security Validation */}
      <div className="pt-4 border-t border-line grid grid-cols-3 gap-2 sm:gap-4 items-end text-center relative z-10">
        {/* Left Signature */}
        <div className="space-y-1">
          <div className="font-serif italic text-xs text-navy/70 border-b border-line-strong pb-1 font-semibold">
            Francisco Paucar B.
          </div>
          <span className="font-mono text-[8px] sm:text-[9px] text-ink-soft uppercase block">
            Dirección General
          </span>
        </div>

        {/* Center QR Validation */}
        <div className="flex flex-col items-center justify-center p-1.5 bg-bg-alt rounded-lg border border-line">
          <div className="w-10 h-10 bg-navy text-white flex items-center justify-center font-mono text-[9px] rounded font-bold border border-gold">
            QR
          </div>
          <span className="font-mono text-[7px] text-teal uppercase tracking-tight mt-1 font-bold">
            Verificación Online
          </span>
        </div>

        {/* Right Signature */}
        <div className="space-y-1">
          <div className="font-serif italic text-xs text-navy/70 border-b border-line-strong pb-1 font-semibold">
            Dra. Carmen Ríos S.
          </div>
          <span className="font-mono text-[8px] sm:text-[9px] text-ink-soft uppercase block">
            Comité Científico
          </span>
        </div>
      </div>
    </div>
  );
}
