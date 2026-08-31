"use client";

import React, { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FlyerModal } from "@/components/ui/FlyerModal";
import { FLYERS_DATA, FlyerItem } from "../data/flyers";

export function FlyersSection() {
  const [selectedFlyer, setSelectedFlyer] = useState<FlyerItem | null>(null);

  return (
    <section id="flyers" className="py-20 bg-bg-alt border-y border-line">
      <div className="wrap">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <Eyebrow>Próximos Eventos & Masterclasses</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-serif text-navy mt-3">
              Flyers & Seminarios en Vivo 2026
            </h2>
            <p className="mt-2.5 text-sm sm:text-base max-w-xl text-ink-soft leading-relaxed">
              Capacitaciones intensivas, masterclasses de ingreso libre y talleres prácticos de cupo limitado. Haz clic en cualquier flyer para ver el temario y reservar tu vacante.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-teal font-semibold bg-tealtint px-3.5 py-2 rounded-full border border-teal/20">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            Transmisiones en Vivo & Aforo Limitado
          </div>
        </div>

        {/* Flyers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {FLYERS_DATA.map((flyer) => (
            <div
              key={flyer.id}
              onClick={() => setSelectedFlyer(flyer)}
              className="group cursor-pointer rounded-2xl bg-white border border-line shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Flyer Visual Poster Top */}
              <div className={`p-6 bg-gradient-to-br ${flyer.colorGradient} text-white relative min-h-[190px] flex flex-col justify-between`}>
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[9.5px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${flyer.badgeColor}`}>
                    {flyer.type}
                  </span>
                  <span className="text-[9.5px] font-mono text-goldpale border border-goldpale/30 px-2 py-0.5 rounded">
                    {flyer.code}
                  </span>
                </div>

                <div className="space-y-1.5 my-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-goldpale/90 block">
                    {flyer.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-snug group-hover:text-goldpale transition-colors">
                    {flyer.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-white/80 border-t border-white/15 pt-2">
                  <span>📅 {flyer.date.split(",")[0]}</span>
                  <span>⏰ {flyer.time.split("(")[0]}</span>
                </div>
              </div>

              {/* Flyer Card Details Bottom */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-navy text-goldpale font-serif italic text-xs flex items-center justify-center font-bold border border-gold flex-none">
                      {flyer.speakerInitials}
                    </div>
                    <div className="min-w-0">
                      <b className="text-navy text-xs font-serif block truncate">
                        {flyer.speaker}
                      </b>
                      <span className="text-[11px] text-ink-soft block truncate">
                        {flyer.speakerRole}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-ink-soft line-clamp-2 leading-relaxed">
                    {flyer.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-line flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-ink-soft block">Acceso</span>
                    <div className="font-serif text-sm font-bold text-navy">{flyer.priceTag}</div>
                  </div>
                  <span className="text-xs font-semibold text-teal group-hover:translate-x-1 transition-transform flex items-center gap-1 font-mono">
                    Ver flyer <span className="arrow">→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modal */}
      <FlyerModal flyer={selectedFlyer} onClose={() => setSelectedFlyer(null)} />
    </section>
  );
}
