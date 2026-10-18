"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn } from "@/components/ui/MotionReveal";

const BASE_TESTIMONIALS = [
  {
    name: "Mg. Carlos Ríos",
    profession: "Profesional de la Salud",
    location: "Lima, Perú",
    quote:
      "La capacitación recibida en FORMASALUD fortaleció significativamente mis competencias profesionales, permitiéndome optimizar mi desempeño y brindar una atención más segura y de mayor calidad a mis pacientes.",
    image: "/images/testimonials/testimonial-carlos.png",
    rating: 5,
  },
  {
    name: "Lic. Andrea Salazar",
    profession: "Enfermera asistencial",
    location: "Lima, Perú",
    quote:
      "Gracias a FormaSalud pude actualizar mis conocimientos y aplicar herramientas más prácticas en mi entorno laboral. La metodología y el nivel de los docentes marcaron una gran diferencia.",
    image: "/images/testimonials/testimonial-andrea.png",
    rating: 5,
  },
  {
    name: "Dra. Valeria Torres",
    profession: "Médico general",
    location: "Trujillo, Perú",
    quote:
      "Encontré una propuesta académica seria, actualizada y realmente enfocada en la práctica profesional.",
    image: "/images/testimonials/testimonial-valeria.png",
    rating: 5,
  },
];

const TESTIMONIALS = [...BASE_TESTIMONIALS, ...BASE_TESTIMONIALS];

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="relative overflow-hidden bg-tealtint/45 py-16 sm:py-20 border-t border-line">
      {/* Fondo decorativo sutil */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full border border-teal/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-teal/5"
        aria-hidden="true"
      />

      <div className="wrap relative z-10">
        {/* ENCABEZADO */}
        <FadeIn className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow className="justify-center">Testimonios de Egresados</Eyebrow>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-navy">
            Lo que dicen nuestros <span className="text-teal">participantes</span>
          </h2>
          <p className="mt-2.5 text-center text-sm leading-relaxed text-ink-soft sm:text-base">
            Profesionales de la salud que fortalecieron sus competencias clínicas con nuestros programas de formación.
          </p>
        </FadeIn>

        {/* CARRUSEL */}
        <FadeIn delay={0.1} className="relative mx-auto mt-8 sm:mt-10 max-w-[1360px] px-2 sm:px-12 lg:px-14">
          {/* Botón Izquierdo */}
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Testimonio anterior"
            className="absolute left-1 sm:left-0 top-1/2 z-30 flex h-9 w-9 sm:h-11 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/95 text-teal shadow-[0_6px_20px_rgba(15,41,66,0.14)] transition-all duration-200 hover:scale-105 hover:bg-teal hover:text-white cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Viewport de Embla */}
          <div className="overflow-hidden px-1 py-3" ref={emblaRef}>
            <div className="flex items-stretch -ml-4 sm:-ml-6">
              {TESTIMONIALS.map((testimonial, index) => {
                const isCenter = index === selectedIndex;

                return (
                  <div
                    key={`${testimonial.name}-${index}`}
                    className="min-w-0 shrink-0 grow-0 pl-4 sm:pl-6 flex-[0_0_92%] sm:flex-[0_0_75%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] flex"
                  >
                    <article
                      className={`relative mx-auto flex w-full flex-col rounded-2xl border bg-white p-6 sm:p-7 transition-all duration-300 ${
                        isCenter
                          ? "border-gold/50 shadow-[0_16px_40px_rgba(15,41,66,0.12)] lg:-translate-y-1"
                          : "border-line shadow-[0_6px_20px_rgba(15,41,66,0.06)] opacity-90"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-none overflow-hidden rounded-full border-4 border-tealtint bg-white shadow-xs">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex items-center gap-0.5" aria-label={`${testimonial.rating} de 5 estrellas`}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`text-base sm:text-lg leading-none ${
                                star <= testimonial.rating ? "text-gold" : "text-line"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="relative z-10 mt-5 flex-1">
                        <p className="text-xs sm:text-sm leading-relaxed text-ink">
                          “{testimonial.quote}”
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-line">
                        <h3 className="text-sm sm:text-base font-bold text-navy">
                          {testimonial.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-ink-soft font-medium">
                          {testimonial.profession} · <span className="text-teal font-semibold">{testimonial.location}</span>
                        </p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botón Derecho */}
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Siguiente testimonio"
            className="absolute right-1 sm:right-0 top-1/2 z-30 flex h-9 w-9 sm:h-11 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/95 text-teal shadow-[0_6px_20px_rgba(15,41,66,0.14)] transition-all duration-200 hover:scale-105 hover:bg-teal hover:text-white cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </FadeIn>
      </div>
    </section>
  );
}