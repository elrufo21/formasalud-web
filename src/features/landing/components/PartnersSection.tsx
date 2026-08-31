import React from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PARTNERS_DATA } from "../data/partners";

export function PartnersSection() {
  return (
    <section className="py-20 bg-bg-alt border-t border-line">
      <div className="wrap">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Eyebrow className="justify-center">Respaldo & Colaboración</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-serif text-navy mt-3">
            Nuestros Colaboradores y Alianzas
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-soft leading-relaxed">
            Trabajamos junto a profesionales de las principales redes hospitalarias y sociedades médicas del país para garantizar formación de máximo rigor científico.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PARTNERS_DATA.map((partner) => (
            <div
              key={partner.id}
              className="p-6 rounded-2xl bg-white border border-line shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-navy text-goldpale font-mono text-xs flex items-center justify-center font-bold border border-gold/30">
                    {partner.initials}
                  </div>
                  <span className="font-mono text-[9.5px] uppercase tracking-wider text-teal bg-tealtint px-2 py-0.5 rounded-full font-semibold">
                    {partner.category}
                  </span>
                </div>
                <h4 className="text-base font-serif font-bold text-navy">
                  {partner.name}
                </h4>
                <p className="mt-2 text-xs text-ink-soft leading-relaxed">
                  {partner.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-[11px] font-mono text-ink-soft">
                <span>Sede: {partner.location}</span>
                <span className="text-teal font-semibold">✓ Aliado Validado</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
