"use client";

import React, { useState, useEffect } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

const TESTIMONIALS = [
  {
    quote:
      "La calidad académica de las ponencias y la practicidad de los casos clínicos me permitieron aplicar de inmediato nuevos protocolos en el área de cuidados intensivos.",
    author: "Lic. Maritza Huamán Cárdenas",
    role: "Enfermera Especialista en UCI — Lima",
  },
  {
    quote:
      "El programa en Gestión de Servicios me dio las herramientas precisas para liderar el proceso de acreditación en nuestro centro de salud.",
    author: "Dr. Luis Alberto Paredes",
    role: "Director Médico — Arequipa",
  },
  {
    quote:
      "Aprender a incorporar herramientas de IA en el diagnóstico diario fue una experiencia reveladora. Un enfoque futurista y sumamente útil.",
    author: "Dr. Gonzalo Espinoza",
    role: "Médico Cirujano — Trujillo",
  },
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="band py-20">
      <div className="wrap text-center">
        <Eyebrow className="justify-center">Testimonios Académicos</Eyebrow>

        <div className="feature-quote max-w-[760px] mx-auto mt-[44px]">
          <span className="mark font-serif text-6xl text-gold leading-none block">
            “
          </span>
          <p className="font-serif text-xl md:text-2xl text-navy font-medium italic leading-snug mt-3 min-h-[100px]">
            {TESTIMONIALS[index].quote}
          </p>
          <div className="feature-who mt-6 font-mono text-[11.5px] text-ink-soft tracking-wider uppercase">
            <b className="font-sans font-semibold text-sm text-navy block uppercase-none tracking-normal">
              {TESTIMONIALS[index].author}
            </b>
            {TESTIMONIALS[index].role}
          </div>
        </div>

        <div className="quote-nav flex justify-center gap-2.5 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`quote-dot ${
                i === index ? "active" : ""
              } h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-teal" : "w-2 bg-line-strong"
              }`}
              aria-label={`Ver testimonio ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
