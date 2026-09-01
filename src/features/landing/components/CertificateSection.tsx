import React from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function CertificateSection() {
  const points = [
    {
      title: "Modalidades Virtual, Presencial e Híbrida",
      desc: "Programas académicos adaptados con soporte en plataformas virtuales e interacción práctica.",
    },
    {
      title: "Docentes Especialistas de Alta Trayectoria",
      desc: "Plana docente integrada por profesionales especialistas con amplia experiencia asistencial y docente.",
    },
    {
      title: "Aprendizaje Basado en Evidencia y Casos Reales",
      desc: "Metodología teórico-práctica con simulación clínica, análisis de casos reales y evaluación continua.",
    },
    {
      title: "Certificación y Convenios Institucionales",
      desc: "Certificados respaldados por convenios marco de cooperación interinstitucional en el sector salud.",
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-line">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Columna Izquierda: Texto Promocional */}
          <div className="lg:col-span-5 space-y-6">
            <Eyebrow>Propuesta Académica & Beneficios</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-serif text-navy leading-tight">
              Innovación y Desarrollo Académico en Salud
            </h2>
            <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
              FORMASALUD ofrece programas especializados para profesionales de la salud, orientados al fortalecimiento de competencias clínicas, éticas, administrativas y tecnológicas.
            </p>

            <div className="space-y-4 pt-2">
              {points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-tealtint text-teal font-bold text-xs flex items-center justify-center flex-none mt-0.5 border border-teal/30">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-navy">
                      {pt.title}
                    </h4>
                    <p className="text-xs text-ink-soft leading-relaxed mt-0.5">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Logo Formasalud (Agrandado) */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-line shadow-xl flex items-center justify-center p-4 overflow-hidden">
              <img
                src="/images/logo.png"
                alt="Logo Formasalud"
                className="w-full max-w-md h-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}