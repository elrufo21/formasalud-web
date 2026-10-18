"use client";

import React from "react";
import { CheckCircle2, MapPin } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn } from "@/components/ui/MotionReveal";
import { Carousel } from "@/components/ui/carousel/Carousel";
import { PARTNERS_DATA } from "../data/partners";

export function PartnersSection() {
  return (
    <section className="py-16 sm:py-20 bg-bg-alt border-t border-line">
      <div className="wrap">
        <FadeIn className="text-center max-w-3xl mx-auto mb-10">
          <Eyebrow className="justify-center">Convenios Institucionales</Eyebrow>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mt-3 tracking-tight">
            Alianzas Estratégicas Nacionales e Internacionales
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-ink-soft leading-relaxed">
            En FORMASALUD mantenemos una amplia red de convenios nacionales e internacionales que fortalecen nuestros programas académicos y permiten desarrollar actividades de cooperación, investigación, capacitación e intercambio académico, garantizando una educación alineada con estándares de calidad.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Carousel
            slideClassName="flex-[0_0_90%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            showCounter
            className="px-1"
          >
            {PARTNERS_DATA.map((partner) => (
              <div
                key={partner.id}
                className="h-full p-6 rounded-2xl bg-white border border-line shadow-[0_6px_20px_rgba(15,41,66,0.05)] hover:shadow-[0_14px_34px_rgba(15,41,66,0.11)] hover:border-teal/35 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="w-11 h-11 rounded-xl bg-navy text-goldpale text-xs flex items-center justify-center font-extrabold border border-gold/40 shadow-xs">
                      {partner.initials}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-tealdeep bg-tealtint px-2.5 py-1 rounded-full font-bold">
                      {partner.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-navy leading-snug">
                    {partner.name}
                  </h3>
                  <p className="mt-2 text-xs text-ink-soft leading-relaxed">
                    {partner.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-line flex items-center justify-between text-[11px] text-ink-soft font-medium">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal shrink-0" />
                    <span>{partner.location}</span>
                  </span>
                  <span className="text-teal font-bold inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Alianza Activa</span>
                  </span>
                </div>
              </div>
            ))}
          </Carousel>
        </FadeIn>
      </div>
    </section>
  );
}