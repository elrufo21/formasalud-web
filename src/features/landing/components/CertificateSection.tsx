"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  QrCode,
  ShieldCheck,
  FileCheck2,
  ArrowRight,
  MessageCircle,
  Maximize2,
  X,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function CertificateSection() {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const features = [
    {
      icon: QrCode,
      title: "Certificación con código QR",
      description:
        "Cada certificado incluye un código QR que facilita la validación inmediata de tu formación académica desde cualquier teléfono o dispositivo móvil.",
    },
    {
      icon: ShieldCheck,
      title: "Validación digital del documento",
      description:
        "Registro académico trazable y disponible para consulta institucional en línea las 24 horas, garantizando autenticidad y respaldo formal permanente.",
    },
    {
      icon: FileCheck2,
      title: "Información del programa y participante",
      description:
        "Detalle completo del programa formativo, nombre del egresado, horas académicas lectivas acreditadas, créditos y firmas de las autoridades institucionales.",
    },
  ];

  return (
    <section
      id="certificacion"
      className="py-20 lg:py-28 bg-gradient-to-b from-white via-paper to-white border-t border-line relative overflow-hidden"
    >
      {/* Halos decorativos suaves de fondo */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Columna Izquierda: Información & Beneficios de la Certificación */}
          <div className="lg:col-span-5 space-y-6">
            <Eyebrow>Acreditación Oficial &amp; Respaldo Institucional</Eyebrow>

            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-serif text-navy font-bold leading-tight">
              Fortalece tu perfil con una certificación verificable
            </h2>

            <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
              Al culminar satisfactoriamente tu programa, recibe una certificación
              con código QR que facilita la validación de tu formación.
            </p>

            {/* Lista de beneficios destacados */}
            <div className="space-y-4 pt-2">
              {features.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-line shadow-xs hover:border-gold/40 hover:shadow-md transition-all duration-200 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-tealtint text-teal flex items-center justify-center shrink-0 border border-teal/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-serif font-bold text-navy">
                        {item.title}
                      </h4>
                      <p className="text-xs text-ink-soft leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTAs de acción */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                href="/contacto"
                className="btn btn-primary !py-3.5 !px-7 text-xs sm:text-sm font-semibold shadow-lg flex items-center gap-2"
              >
                <span>Contáctanos</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/51999999999?text=Hola%20FORMASALUD,%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20certificaci%C3%B3n%20y%20los%20cursos%20disponibles."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost !py-3.5 !px-5 text-xs font-semibold flex items-center gap-2 border border-line hover:border-teal/40"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Vista del Certificado Real Oficial */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              onClick={() => setIsZoomOpen(true)}
              className="group relative w-full rounded-2xl sm:rounded-3xl bg-white p-2.5 sm:p-3.5 border-2 border-gold/40 shadow-[0_20px_50px_-10px_rgba(3,29,88,0.18)] hover:shadow-[0_25px_60px_-10px_rgba(201,151,37,0.3)] transition-all duration-300 cursor-pointer overflow-hidden"
              title="Haz clic para ver el certificado en alta resolución"
            >
              {/* Contenedor del Certificado con aspect ratio exacto */}
              <div className="relative w-full aspect-[1684/1191] rounded-xl sm:rounded-2xl overflow-hidden bg-[#FFFDF8] border border-gold/20">
                <Image
                  src="/certificates/certificado-oficial.png"
                  alt="Certificado Oficial FormaSalud"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 750px"
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                />

                {/* Overlay sutil al pasar el mouse (para incentivar el clic de zoom) */}
                <div className="absolute inset-0 bg-navy/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="px-4 py-2 rounded-full bg-navy/90 text-white text-xs font-mono border border-gold/50 shadow-2xl backdrop-blur-xs flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-3.5 h-3.5 text-gold" />
                    <span>Ver certificado completo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Barra informativa inferior con sellos de garantía institucional */}
            <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white border border-line shadow-xs">
              <div className="flex items-center gap-2.5 text-xs text-navy font-medium">
                <div className="w-8 h-8 rounded-xl bg-tealtint text-teal flex items-center justify-center shrink-0 border border-teal/20">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-navy block text-xs sm:text-sm">
                    Certificación oficial con valor curricular
                  </span>
                  <span className="text-[11px] text-ink-soft">
                    Emitido con código QR verificable, firmas de dirección y sello oficial.
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                className="text-xs font-mono font-semibold text-teal hover:text-navy transition-colors flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg border border-teal/20 bg-tealtint/40 hover:bg-tealtint cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Ampliar diploma</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Lightbox de Alta Resolución para inspeccionar el certificado real */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navyink/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsZoomOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-5xl bg-[#FFFDF8] rounded-2xl sm:rounded-3xl shadow-2xl border border-gold/40 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Lightbox */}
            <div className="px-5 py-3.5 bg-navy text-white flex items-center justify-between border-b border-gold/30">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span className="font-serif font-bold text-sm tracking-wide text-white">
                  Certificado Oficial FormaSalud — Modelo Institucional
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer text-base"
                aria-label="Cerrar vista ampliada"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contenido del Certificado en máxima resolución */}
            <div className="relative w-full aspect-[1684/1191] bg-[#FFFDF8] p-2 sm:p-4 overflow-auto">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner border border-gold/30">
                <Image
                  src="/certificates/certificado-oficial.png"
                  alt="Certificado Oficial FormaSalud en Alta Resolución"
                  fill
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* Footer explicativo del Lightbox */}
            <div className="px-5 py-3 bg-white border-t border-line flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink-soft">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Incluye código QR de verificación institucional y respaldo legal formal.</span>
              </div>
              <Link
                href="/contacto"
                className="btn btn-primary !py-1.5 !px-4 text-xs font-semibold"
                onClick={() => setIsZoomOpen(false)}
              >
                Inscribirme en un programa
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}