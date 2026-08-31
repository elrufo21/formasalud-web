import React from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function ContactSection() {
  return (
    <section className="!pt-2 pb-20">
      <div className="wrap">
        <div className="relative w-full aspect-[21/9] max-h-[360px] rounded-2xl overflow-hidden bg-gradient-to-br from-navy to-teal mb-14 shadow-md">
          <div
            className="absolute inset-0 opacity-[.08]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 1px,transparent 14px)",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
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
            <span className="font-mono text-[11px] tracking-widest uppercase text-white/60">
              Sede FORMASALUD · Lima, Perú
            </span>
          </div>
        </div>

        <Eyebrow>Canales de atención</Eyebrow>
        <div className="contact-grid grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line mt-6">
          <div className="contact-card bg-paper p-8">
            <svg
              className="w-9 h-9 text-teal"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.79.66 2.65a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.43-1.43a2 2 0 0 1 2.11-.45c.86.32 1.75.54 2.65.66A2 2 0 0 1 22 16.92z" />
            </svg>
            <h4 className="text-lg font-serif text-navy font-semibold mt-4">
              WhatsApp / Teléfono
            </h4>
            <p className="text-sm text-ink-soft mt-2 leading-relaxed">
              Respuesta directa de un asesor académico en horario de oficina.
            </p>
            <a
              className="value block mt-4 font-mono font-semibold text-navy text-base hover:text-teal"
              href="https://wa.me/51999999999"
              target="_blank"
              rel="noopener noreferrer"
            >
              +51 999 999 999
            </a>
          </div>

          <div className="contact-card bg-paper p-8">
            <svg
              className="w-9 h-9 text-teal"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            <h4 className="text-lg font-serif text-navy font-semibold mt-4">
              Correo electrónico
            </h4>
            <p className="text-sm text-ink-soft mt-2 leading-relaxed">
              Para consultas institucionales, convenios y solicitudes formales.
            </p>
            <a
              className="value block mt-4 font-mono font-semibold text-navy text-base hover:text-teal"
              href="mailto:contacto@formasalud.pe"
            >
              contacto@formasalud.pe
            </a>
          </div>

          <div className="contact-card bg-paper p-8">
            <svg
              className="w-9 h-9 text-teal"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <h4 className="text-lg font-serif text-navy font-semibold mt-4">
              Sede
            </h4>
            <p className="text-sm text-ink-soft mt-2 leading-relaxed">
              GRUPO PAUCAR PERÚ S.A.C.
            </p>
            <span className="value block mt-4 font-mono font-semibold text-navy text-base">
              Lima, Perú
            </span>
          </div>
        </div>

        <div className="claim-band bg-tealtint border border-line p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-14 rounded-sm">
          <div>
            <h4 className="text-xl font-serif text-navy font-semibold">
              Libro de Reclamaciones
            </h4>
            <p className="text-sm text-ink-soft mt-1.5 leading-relaxed max-w-xl">
              Como establece la normativa peruana de protección al consumidor, FORMASALUD pone a tu disposición este canal formal.
            </p>
          </div>
          <Link href="#" className="btn btn-ghost">
            Ir al Libro de Reclamaciones
          </Link>
        </div>
      </div>
    </section>
  );
}
