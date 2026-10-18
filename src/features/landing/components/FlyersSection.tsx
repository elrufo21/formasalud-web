"use client";

import React, { useState } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn } from "@/components/ui/MotionReveal";
import { FlyerModal } from "@/components/ui/FlyerModal";
import { Carousel } from "@/components/ui/carousel/Carousel";
import { FLYERS_DATA, FlyerItem } from "../data/flyers";

export function FlyersSection() {
  const [selectedFlyer, setSelectedFlyer] = useState<FlyerItem | null>(null);

  return (
    <section id="flyers" className="py-16 sm:py-20 bg-bg-alt border-y border-line">
      <div className="wrap">
        <FadeIn className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <Eyebrow>Próximas Ponencias</Eyebrow>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mt-3 tracking-tight">
              Flyers &amp; Seminarios en Vivo 2026
            </h2>
            <p className="mt-2.5 text-sm sm:text-base max-w-xl text-ink-soft leading-relaxed">
              Capacitaciones intensivas, masterclasses de ingreso libre y talleres prácticos de cupo limitado. Haz clic en cualquier flyer para ver el temario y reservar tu vacante.
            </p>
          </div>
        </FadeIn>

        {/* Carrusel de próximas ponencias */}
        <FadeIn delay={0.1}>
          <Carousel
            slideClassName="flex-[0_0_92%] sm:flex-[0_0_62%] lg:flex-[0_0_42%]"
            className="px-1"
          >
            {FLYERS_DATA.map((flyer) => (
              <div
                key={flyer.id}
                onClick={() => setSelectedFlyer(flyer)}
                className={`group cursor-pointer min-h-[260px] sm:min-h-[280px] rounded-2xl bg-gradient-to-br ${flyer.colorGradient} text-white relative p-5 sm:p-7 flex flex-col justify-between shadow-[0_8px_28px_rgba(15,41,66,0.14)] hover:shadow-[0_18px_42px_rgba(15,41,66,0.24)] hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-white/15`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full ${flyer.badgeColor}`}>
                    {flyer.type}
                  </span>
                  <span className="text-[10px] font-semibold text-goldpale border border-goldpale/35 bg-black/15 px-2.5 py-0.5 rounded-md">
                    {flyer.code}
                  </span>
                </div>

                <div className="space-y-1.5 my-4">
                  <span className="text-[10.5px] font-bold uppercase tracking-widest text-goldpale block">
                    {flyer.tag}
                  </span>
                  <h3 className="text-base sm:text-xl font-bold !text-white leading-snug group-hover:text-goldpale transition-colors line-clamp-3">
                    {flyer.title}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/85 border-t border-white/15 pt-3.5 mt-auto">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-goldpale shrink-0" />
                      <span>{flyer.date.split(",")[0]}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-goldpale shrink-0" />
                      <span>{flyer.time.split("(")[0].trim()}</span>
                    </span>
                  </div>

                  <span className="text-xs font-bold text-goldpale group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Ver temario</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </Carousel>
        </FadeIn>
      </div>

      {/* Interactive Modal */}
      <FlyerModal flyer={selectedFlyer} onClose={() => setSelectedFlyer(null)} />
    </section>
  );
}

