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
    <main
      className="min-h-screen flex flex-col justify-between relative overflow-hidden selection:bg-gold selection:text-navyink"
      style={{ backgroundColor: "#06131F", color: "#FFFFFF" }}
    >
      {/* Luces y ambientación de fondo para dar profundidad elegante */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25"
        style={{ background: "radial-gradient(circle, #0E6E63 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-10 left-10 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #C6992E 0%, transparent 70%)" }}
      />

      {/* Header institucional */}
      <header className="relative z-10 max-w-[1400px] w-full mx-auto px-6 py-6 sm:py-8 flex justify-between items-center border-b border-white/15">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0F2942] border border-[#C6992E] flex items-center justify-center overflow-hidden shadow-md">
            <Image
              src="/images/logo.png"
              alt="FORMASALUD Logo"
              width={44}
              height={44}
              className="object-cover"
              priority
            />
          </div>
          <div>
            <span
              className="font-serif font-bold text-lg sm:text-xl tracking-tight block leading-none"
              style={{ color: "#FFFFFF" }}
            >
              FORMASALUD
            </span>
            <span
              className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase font-medium block mt-1"
              style={{ color: "#2DD4BF" }}
            >
              Centro de Capacitación en Salud
            </span>
          </div>
        </Link>

        <Link
          href="/verificar"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg border transition-all shadow-sm"
          style={{
            backgroundColor: "rgba(198, 153, 46, 0.15)",
            borderColor: "#C6992E",
            color: "#F6C343",
          }}
        >
          <ShieldCheck className="w-4 h-4 text-[#F6C343]" />
          <span>Verificar Certificados</span>
        </Link>
      </header>

      {/* Contenido Central */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-12 sm:py-16 text-center flex-1 flex flex-col justify-center items-center">
        {/* Badge de estado */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 border shadow-sm"
          style={{
            backgroundColor: "rgba(14, 110, 99, 0.3)",
            borderColor: "#14B8A6",
            color: "#CCFBF1",
          }}
        >
          <Clock className="w-4 h-4 text-[#2DD4BF] animate-pulse" />
          <span>Plataforma en actualización</span>
        </div>

        {/* Titular principal */}
        <h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-3"
          style={{ color: "#FFFFFF" }}
        >
          Estamos trabajando.
        </h1>
        <p
          className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium mb-6"
          style={{ color: "#F6C343" }}
        >
          Pronto tendrá novedades.
        </p>

        {/* Descripción */}
        <p
          className="max-w-2xl text-base sm:text-lg leading-relaxed mb-10 font-sans"
          style={{ color: "#E2E8F0" }}
        >
          Estamos renovando nuestra plataforma académica y aula virtual para ofrecerle una experiencia moderna, ágil y de excelencia en formación médica continua.
        </p>

        {/* Tarjeta destacada: Módulo de Verificación de Certificados Activo */}
        <div
          className="w-full max-w-xl rounded-2xl p-6 sm:p-8 text-left shadow-2xl relative overflow-hidden border transition-all"
          style={{
            backgroundColor: "#0B2135",
            borderColor: "rgba(198, 153, 46, 0.4)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: "rgba(198, 153, 46, 0.2)",
                borderColor: "#C6992E",
                color: "#F6C343",
              }}
            >
              <Award className="w-6 h-6 text-[#F6C343]" />
            </div>
            <div className="flex-1">
              <div
                className="inline-block text-[11px] font-mono tracking-wider uppercase font-bold px-2.5 py-0.5 rounded mb-2"
                style={{
                  backgroundColor: "#0E6E63",
                  color: "#FFFFFF",
                }}
              >
                Servicio Activo
              </div>
              <h2
                className="text-xl sm:text-2xl font-bold mb-2 font-serif"
                style={{ color: "#FFFFFF" }}
              >
                Consulta y Validación de Diplomas
              </h2>
              <p
                className="text-sm sm:text-base mb-6 leading-relaxed"
                style={{ color: "#CBD5E1" }}
              >
                El sistema de validación pública de diplomas y códigos QR emitidos por FORMASALUD y GRUPO PAUCAR PERÚ se encuentra 100% operativo.
              </p>
              <Link
                href="/verificar"
                className="inline-flex items-center gap-2 font-bold text-sm sm:text-base px-6 py-3 rounded-lg shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                style={{
                  backgroundColor: "#F6C343",
                  color: "#081826",
                }}
              >
                <span>Ir al Portal de Verificación</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Canales de atención */}
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm"
          style={{ color: "#E2E8F0" }}
        >
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#2DD4BF]" />
            <span>
              Consultas académicas:{" "}
              <strong style={{ color: "#FFFFFF" }}>+51 924 814 167</strong>
            </span>
          </div>
          <span className="hidden sm:inline opacity-40">•</span>
          <span>Lima, Perú</span>
        </div>
      </section>

      {/* Footer institucional */}
      <footer className="relative z-10 border-t border-white/15 py-6 px-6 text-center text-xs">
        <div
          className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ color: "#94A3B8" }}
        >
          <p>© 2026 FORMASALUD — Centro de Capacitación y Formación Médica Continua.</p>
          <p className="font-mono text-[11px]" style={{ color: "#64748B" }}>
            Respaldo oficial GRUPO PAUCAR PERÚ S.A.C.
          </p>
        </div>
      </footer>
    </main>
  );
}
