import React from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function SpeakersSection() {
  const speakers = [
    {
      initials: "CR",
      spec: "Medicina Intensiva",
      name: "Dra. Carmen Ríos Salazar",
      cred: "CMP 48291 · RNE 23910",
      topic: "Especialista en ventilación mecánica y falla multiorgánica.",
    },
    {
      initials: "PN",
      spec: "Gestión Sanitaria",
      name: "Lic. Patricia Nuñez Vidal",
      cred: "CEP 39201 · Mg. Salud Pública",
      topic: "Directora de proyectos de acreditación y calidad hospitalaria.",
    },
    {
      initials: "JM",
      spec: "Informática Médica",
      name: "Dr. Jorge Mendoza Ruiz",
      cred: "CMP 51204 · Ph.D(c) AI Health",
      topic: "Investigador en algoritmos de soporte a la decisión clínica.",
    },
    {
      initials: "CV",
      spec: "Emergentología",
      name: "Dr. Carlos Várgas Alva",
      cred: "CMP 44102 · RNE 19283",
      topic: "Jefe de guardia en emergencias con enfoque en trauma grave.",
    },
  ];

  return (
    <section className="py-20">
      <div className="wrap">
        <Eyebrow>Cuerpo Docente y Ponentes</Eyebrow>
        <h2 className="text-3xl md:text-4xl font-serif text-navy mt-4">
          Comité Científico
        </h2>
        <p className="text-ink-soft text-base mt-2 max-w-xl">
          Especialistas con destacada labor asistencial, docente e investigadora.
        </p>

        <div className="speaker-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line mt-10">
          {speakers.map((s) => (
            <div key={s.name} className="speaker-card bg-paper p-8">
              <div className="speaker-avatar w-16 h-16 rounded-full relative bg-gradient-to-br from-[#1c3d5e] to-navyink border border-gold flex items-center justify-center">
                <span className="font-serif italic font-medium text-xl text-goldpale">
                  {s.initials}
                </span>
              </div>
              <div className="spec mt-4 font-mono text-[10px] uppercase tracking-wider text-teal">
                {s.spec}
              </div>
              <h4 className="mt-2 text-base font-semibold leading-tight text-navy">
                {s.name}
              </h4>
              <span className="cred font-mono text-[10.5px] text-ink-soft mt-1 block">
                {s.cred}
              </span>
              <div className="topic mt-3 pt-3 border-t border-line text-xs text-ink-soft">
                {s.topic}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
