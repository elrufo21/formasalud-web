import React from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function InstitutionalFicha() {
  return (
    <>
      {/* 1. Espacio superior e inferior reducido en la Ficha Institucional */}
      <section className="pt-6 pb-6">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
            <div>
              <Eyebrow>Ficha institucional</Eyebrow>
              <div className="ficha border-t border-line mt-4">
                <div className="ficha-row grid grid-cols-[180px_1fr] gap-6 py-5 border-b border-line">
                  <div className="k font-mono text-[11px] uppercase tracking-wider text-teal">
                    Razón social
                  </div>
                  <div className="v text-base text-ink font-semibold">
                    GRUPO PAUCAR PERÚ S.A.C.
                  </div>
                </div>
                <div className="ficha-row grid grid-cols-[180px_1fr] gap-6 py-5 border-b border-line">
                  <div className="k font-mono text-[11px] uppercase tracking-wider text-teal">
                    RUC
                  </div>
                  <div className="v text-base text-ink font-mono">
                    20613837613
                  </div>
                </div>
                <div className="ficha-row grid grid-cols-[180px_1fr] gap-6 py-5 border-b border-line">
                  <div className="k font-mono text-[11px] uppercase tracking-wider text-teal">
                    Fundación
                  </div>
                  <div className="v text-base text-ink">
                    09 de marzo de 2025 — Lima, Perú
                  </div>
                </div>
                <div className="ficha-row grid grid-cols-[180px_1fr] gap-6 py-5 border-b border-line">
                  <div className="k font-mono text-[11px] uppercase tracking-wider text-teal">
                    Enfoque
                  </div>
                  <div className="v text-base text-ink">
                    Formación continua para profesionales del sector salud.
                  </div>
                </div>
                <div className="ficha-row grid grid-cols-[180px_1fr] gap-6 py-5 border-b border-line">
                  <div className="k font-mono text-[11px] uppercase tracking-wider text-teal">
                    Dirección general
                  </div>
                  <div className="v text-base text-ink font-medium">
                    Francisco Paucar Benites
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="relative w-full max-w-[420px] mx-auto md:mx-0 aspect-[4/5] max-h-[480px] rounded-2xl overflow-hidden bg-gradient-to-br from-navyink to-navy shadow-lg">
                <div
                  className="absolute inset-0 opacity-[.08]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 1px,transparent 14px)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-8">
                  <svg
                    className="w-10 h-10 text-white/60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">
                    Retrato Institucional
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navyink/95 via-navyink/70 to-transparent">
                  <p className="text-white/85 italic font-serif text-[15px]">
                    "Formar con rigor y cercanía es nuestro compromiso con la salud del país."
                  </p>
                  <span className="block mt-2 font-mono text-[10.5px] text-goldpale tracking-wide uppercase">
                    Francisco Paucar Benites — Dirección General
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Espacio superior reducido antes de Misión y Visión (elimina el hueco en blanco previo a la franja gris) */}
      <section className="band pt-4 pb-14">
        <div className="wrap">
          <Eyebrow>Propósito institucional</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-serif text-navy mt-4">
            Misión y Visión
          </h2>
          <div className="mv-grid grid grid-cols-1 md:grid-cols-2 mt-8 border-t border-line bg-paper">
            <div className="mv-col p-8 md:p-11 border-b md:border-b-0 md:border-r border-line">
              <span className="tag font-mono text-xs text-gold uppercase tracking-wider">
                Misión
              </span>
              <h3 className="text-2xl font-serif text-navy font-semibold mt-4">
                Formación que transforma la práctica clínica
              </h3>
              <p className="text-ink-soft text-base mt-4 leading-relaxed">
                Fortalecer las competencias del talento humano en salud con formación continua de calidad, ponencias de alto nivel y talleres prácticos basados en evidencia.
              </p>
            </div>
            <div className="mv-col p-8 md:p-11">
              <span className="tag font-mono text-xs text-gold uppercase tracking-wider">
                Visión
              </span>
              <h3 className="text-2xl font-serif text-navy font-semibold mt-4">
                Referencia nacional en innovación académica
              </h3>
              <p className="text-ink-soft text-base mt-4 leading-relaxed">
                Ser el centro de referencia en innovación académica y actualización para los profesionales de la salud en el Perú, reconocidos por el rigor técnico y la excelencia de nuestros ponentes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}