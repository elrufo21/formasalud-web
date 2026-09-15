"use client";

import React, { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FlyerModal } from "@/components/ui/FlyerModal";
import { Carousel } from "@/components/ui/carousel/Carousel";
import { FLYERS_DATA, FlyerItem } from "../data/flyers";

export function FlyersSection() {
  const [selectedFlyer, setSelectedFlyer] = useState<FlyerItem | null>(null);

  return (
    <section id="flyers" className="py-20 bg-bg-alt border-y border-line">
      <div className="wrap">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <Eyebrow>Próximas Ponencias</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-serif text-navy mt-3">
              Flyers & Seminarios en Vivo 2026
            </h2>
            <p className="mt-2.5 text-sm sm:text-base max-w-xl text-ink-soft leading-relaxed">
              Capacitaciones intensivas, masterclasses de ingreso libre y talleres prácticos de cupo limitado. Haz clic en cualquier flyer para ver el temario y reservar tu vacante.
            </p>
          </div>
        </div>

        {/* Carrusel de imágenes de las próximas ponencias */}
        <Carousel
          slideClassName="flex-[0_0_88%] xs:flex-[0_0_80%] sm:flex-[0_0_60%] lg:flex-[0_0_42%]"
          className="px-1"
        >
          {FLYERS_DATA.map((flyer) => (
            <div
              key={flyer.id}
              onClick={() => setSelectedFlyer(flyer)}
              className={`group cursor-pointer aspect-[3/2] rounded-2xl bg-gradient-to-br ${flyer.colorGradient} text-white relative p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden border border-line`}
            >
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
                <h3 className="text-base sm:text-xl font-serif font-bold text-white leading-snug group-hover:text-goldpale transition-colors">
                  {flyer.title}
                </h3>
              </div>

              <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-white/80 border-t border-white/15 pt-2.5">
                <span>📅 {flyer.date.split(",")[0]}</span>
                <span>⏰ {flyer.time.split("(")[0]}</span>
              </div>

              <span className="absolute bottom-4 right-5 text-[11px] font-semibold text-goldpale group-hover:translate-x-1 transition-transform flex items-center gap-1 font-mono">
                Ver flyer <span className="arrow">→</span>
              </span>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Interactive Modal */}
      <FlyerModal flyer={selectedFlyer} onClose={() => setSelectedFlyer(null)} />
    </section>
  );
}
