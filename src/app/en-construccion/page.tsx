import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Clock, Award, Phone } from "lucide-react";

export const metadata = {
  title: "Estamos trabajando | FORMASALUD",
  description: "Estamos renovando nuestra plataforma académica. Pronto tendrá novedades.",
};

export default function EnConstruccionPage() {
  return (
    <main className="min-h-screen bg-navyink text-white flex flex-col justify-between relative overflow-hidden selection:bg-gold selection:text-navyink">
      {/* Fondos y gradientes decorativos */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,110,99,0.18),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(198,153,46,0.12),transparent_50%)] pointer-events-none" />

      {/* Header institucional */}
      <header className="relative z-10 max-w-[1400px] w-full mx-auto px-6 py-8 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-3">
          <Image
            src="/images/formasalud-logo-header.png"
            alt="FORMASALUD"
            width={180}
            height={48}
            className="h-9 sm:h-11 w-auto object-contain brightness-110"
            priority
          />
        </div>
        <Link
          href="/verificar"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gold bg-gold/10 hover:bg-gold/20 border border-gold/30 px-3.5 py-2 rounded transition-colors"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Verificar Certificados</span>
        </Link>
      </header>

      {/* Contenido Central */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-12 sm:py-16 text-center flex-1 flex flex-col justify-center items-center">
        {/* Badge de estado */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal/20 border border-teal/40 text-teal-tint text-xs sm:text-sm font-medium mb-6">
          <Clock className="w-3.5 h-3.5 text-teal animate-pulse" />
          <span>Plataforma en actualización</span>
        </div>

        {/* Titular principal */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight mb-4 text-white">
          Estamos trabajando.
        </h1>
        <p className="font-serif text-2xl sm:text-3xl text-gold mb-6 font-normal">
          Pronto tendrá novedades.
        </p>

        {/* Descripción */}
        <p className="text-white/70 max-w-2xl text-base sm:text-lg leading-relaxed mb-10 font-sans">
          Estamos renovando nuestra plataforma académica y aula virtual para ofrecerle una experiencia moderna, ágil y de excelencia en formación médica continua.
        </p>

        {/* Tarjeta destacada: Módulo de Verificación de Certificados Activo */}
        <div className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-white/15 rounded-xl p-6 sm:p-8 text-left shadow-2xl relative overflow-hidden group hover:border-gold/50 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gold/20 border border-gold/40 flex items-center justify-center shrink-0 text-gold">
              <Award className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="inline-block text-[11px] font-mono tracking-widest text-teal-tint uppercase font-semibold bg-teal/25 px-2 py-0.5 rounded mb-1">
                Servicio Activo
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Consulta y Validación de Diplomas
              </h2>
              <p className="text-white/75 text-sm mb-5 leading-relaxed">
                El sistema de validación pública de diplomas y códigos QR emitidos por FORMASALUD y GRUPO PAUCAR PERÚ se encuentra 100% operativo.
              </p>
              <Link
                href="/verificar"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-navyink font-semibold text-sm px-5 py-2.5 rounded shadow transition-transform hover:-translate-y-0.5"
              >
                <span>Ir al Portal de Verificación</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Canales de atención */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-teal" />
            <span>Consultas académicas: <strong>+51 924 814 167</strong></span>
          </div>
          <span className="hidden sm:inline text-white/30">•</span>
          <span>Lima, Perú</span>
        </div>
      </section>

      {/* Footer institucional */}
      <footer className="relative z-10 border-t border-white/10 py-6 px-6 text-center text-xs text-white/50">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© 2026 FORMASALUD — Centro de Capacitación y Formación Médica Continua.</p>
          <p className="font-mono text-[11px] text-white/40">Respaldo oficial GRUPO PAUCAR PERÚ S.A.C.</p>
        </div>
      </footer>
    </main>
  );
}
