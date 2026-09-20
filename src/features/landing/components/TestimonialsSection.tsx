"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Eyebrow } from "@/components/ui/Eyebrow";

const BASE_TESTIMONIALS = [
  {
    name: "Mg. Carlos Ríos",
    profession: "Profesional de salud",
    location: "Arequipa, Perú",
    quote:
      "La formación recibida me permitió fortalecer mis competencias y mejorar la atención que brindo a mis pacientes.",
    image: "/images/testimonials/testimonial-carlos.png",
    rating: 4,
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
    rating: 4,
  },
];

// Duplicamos el arreglo para permitir el giro infinito fluido
const TESTIMONIALS = [...BASE_TESTIMONIALS, ...BASE_TESTIMONIALS, ...BASE_TESTIMONIALS];

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
    <section className="relative overflow-hidden bg-[#f3fafb] py-16 sm:py-20 lg:py-24">
      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute -left-[210px] -top-[190px] h-[430px] w-[430px] rounded-full border border-teal/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-[180px] -top-[180px] h-[400px] w-[400px] rounded-full bg-teal/[0.035]" aria-hidden="true" />

      <div className="wrap relative z-10">

        {/* BLOQUES DE LAS ESQUINAS */}
        <div className="pointer-events-none absolute -top-12 left-6 sm:left-10 lg:left-14 hidden font-mono text-[9px] font-medium uppercase leading-[1.4] tracking-[0.28em] text-teal/45 sm:block z-20">
          EDUCACIÓN<br />QUE TRANSFORMA<br />VIDAS
          <div className="mt-1.5 flex gap-1">
            <span className="h-[2px] w-[20px] bg-[#e7ad25]" />
            <span className="h-[2px] w-[8px] bg-[#e7ad25]" />
          </div>
        </div>

        <div className="pointer-events-none absolute -top-12 right-6 sm:right-10 lg:right-14 hidden text-right font-mono text-[9px] font-medium uppercase leading-[1.4] tracking-[0.28em] text-teal/45 sm:block z-20">
          PROFESIONALES<br />MÁS HUMANOS<br />Y PREPARADOS
          <div className="mt-1.5 flex justify-end gap-1">
            <span className="h-[2px] w-[8px] bg-[#e7ad25]" />
            <span className="h-[2px] w-[20px] bg-[#e7ad25]" />
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-12 left-6 sm:left-10 lg:left-14 hidden font-mono text-[9px] font-medium uppercase leading-[1.5] tracking-[0.28em] text-navy sm:block z-20">
          FORMASALUD<br />
          <span className="text-[8px] tracking-[0.15em] text-teal/65">CENTRO DE CAPACITACIÓN EN SALUD</span>
          <div className="mt-1.5 flex gap-1">
            <span className="h-[2px] w-[20px] bg-[#e7ad25]" />
            <span className="h-[2px] w-[8px] bg-[#e7ad25]" />
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-12 right-6 sm:right-10 lg:right-14 hidden text-right font-mono text-[9px] font-medium uppercase leading-[1.5] tracking-[0.28em] text-teal/45 sm:block z-20">
          CONOCIMIENTO<br />PRÁCTICA<br />IMPACTO REAL
          <div className="mt-1.5 flex justify-end gap-1">
            <span className="h-[2px] w-[8px] bg-[#e7ad25]" />
            <span className="h-[2px] w-[20px] bg-[#e7ad25]" />
          </div>
        </div>

        {/* ENCABEZADO */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow className="justify-center">Testimonios</Eyebrow>
          <h2 className="mt-3 font-sans text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-[44px]">
            Lo que dicen nuestros <span className="text-teal font-sans">participantes</span>
          </h2>
          <p className="mt-3 text-center text-sm leading-relaxed text-ink-soft sm:text-base">
            Profesionales de la salud que fortalecieron sus competencias con nuestros programas de formación.
          </p>
        </div>

        {/* CARRUSEL INFINITO CON POSICIÓN CENTRAL FIJA */}
        <div className="relative mx-auto mt-10 max-w-[1360px] pl-10 pr-6 sm:pl-14 sm:pr-10 lg:mt-12 lg:px-16">

          {/* Botón Izquierdo */}
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Testimonio anterior"
            className="absolute left-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-teal shadow-[0_5px_18px_rgba(15,61,74,0.15)] transition-all duration-200 hover:scale-105 hover:bg-teal hover:text-white sm:h-12 sm:w-12"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Viewport de Embla */}
          <div className="overflow-hidden px-1 py-3" ref={emblaRef}>
            <div className="flex -ml-4 sm:-ml-6">
              {TESTIMONIALS.map((testimonial, index) => {
                // Detectamos si ESTA tarjeta específica es la que está en la posición central actual del carrusel
                const isCenter = index === selectedIndex;

                return (
                  <div
                    key={`${testimonial.name}-${index}`}
                    className="min-w-0 shrink-0 grow-0 pl-4 sm:pl-6 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                  >
                    <div className="py-4 flex justify-center">
                      <article
                        className={`relative mx-auto flex w-full max-w-[430px] flex-col rounded-[18px] border border-white bg-white shadow-[0_10px_35px_rgba(14,63,76,0.08)] transition-all duration-300 ${isCenter
                            ? "min-h-[390px] lg:min-h-[410px] lg:-translate-y-2 lg:scale-[1.04] lg:shadow-[0_18px_45px_rgba(14,63,76,0.14)]"
                            : "min-h-[350px] lg:min-h-[365px] lg:translate-y-3 lg:scale-[0.94]"
                          }`}
                      >
                        <div className="flex h-full flex-col p-6 sm:p-7 lg:p-8">
                          <div className="flex items-start justify-between gap-4">
                            <div
                              className={`relative flex-none overflow-hidden rounded-full border-[5px] border-[#edf6f6] bg-white shadow-sm ${isCenter ? "h-[92px] w-[92px]" : "h-[82px] w-[82px]"
                                }`}
                            >
                              <Image
                                src={testimonial.image}
                                alt={testimonial.name}
                                fill
                                sizes="92px"
                                className="object-cover"
                              />
                            </div>

                            <div className="pt-2">
                              <div className="flex items-center gap-[2px]" aria-label={`${testimonial.rating} de 5 estrellas`}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    className={`text-[18px] leading-none ${star <= testimonial.rating ? "text-[#e7ad25]" : "text-[#d9e2e2]"
                                      }`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div
                            className={`pointer-events-none absolute font-serif font-bold leading-none text-teal/[0.12] ${isCenter ? "left-[145px] top-[95px] text-[82px]" : "left-[135px] top-[91px] text-[72px]"
                              }`}
                            aria-hidden="true"
                          >
                            “
                          </div>

                          <div className="relative z-10 mt-7 flex-1">
                            <p className={`font-sans leading-relaxed text-ink ${isCenter ? "text-[15px] sm:text-[16px]" : "text-[14px] sm:text-[14.5px]"}`}>
                              {testimonial.quote}
                            </p>
                          </div>

                          <div className="mt-6 h-[3px] w-10 bg-[#e7ad25]" />

                          <div className="mt-4">
                            <h3 className={`font-sans font-bold text-navy ${isCenter ? "text-[16px] sm:text-[17px]" : "text-[14px] sm:text-[15px]"}`}>
                              {testimonial.name}
                            </h3>
                            <p className="mt-1 text-[12px] leading-relaxed text-ink-soft sm:text-[13px]">
                              {testimonial.profession}
                              <span className="mx-1.5">·</span>
                              {testimonial.location}
                            </p>
                          </div>
                        </div>
                      </article>
                    </div>
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
            className="absolute right-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-teal shadow-[0_5px_18px_rgba(15,61,74,0.15)] transition-all duration-200 hover:scale-105 hover:bg-teal hover:text-white sm:h-12 sm:w-12"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

        </div>

      </div>
    </section>
  );
}