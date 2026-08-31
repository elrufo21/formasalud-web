import React from "react";
import Link from "next/link";
import {
  HeroSection,
  FlyersSection,
  TeamSection,
  CertificateSection,
  MethodologySection,
  PartnersSection,
  TestimonialsSection,
} from "@/features/landing";
import { CourseFilters } from "@/features/courses/components/CourseFilters";
import { FaqSection } from "@/features/faq/components/FaqSection";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* 1. Hero Principal con propuesta de valor, métricas y EKG animado */}
      <HeroSection />

      {/* 2. Sección Cursos y Programas Académicos con Tabs Interactivos */}
      <section id="cursos" className="py-20 bg-paper">
        <div className="wrap">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div>
              <Eyebrow>Oferta Académica 2026</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-serif text-navy mt-3">
                Cursos, Diplomados y Talleres Clínicos
              </h2>
              <p className="mt-2.5 text-sm sm:text-base max-w-xl text-ink-soft leading-relaxed">
                Selecciona la categoría de tu interés. Programas certificados con horas lectivas y docentes especialistas de hospitales de referencia.
              </p>
            </div>
            <Link href="/cursos" className="btn-fine flex-none">
              Ver catálogo completo
            </Link>
          </div>

          <CourseFilters />
        </div>
      </section>

      {/* 3. Sección Flyers & Masterclasses / Próximos Cursos */}
      <FlyersSection />

      {/* 4. Sección Equipo Directivo y Plana Docente */}
      <TeamSection />

      {/* 5. Sección Certificación Oficial con Verificación QR */}
      <CertificateSection />

      {/* 6. Metodología y Modelo Académico */}
      <MethodologySection />

      {/* 7. Colaboradores, Alianzas y Respaldo Institucional */}
      <PartnersSection />

      {/* 8. Testimonios de Egresados Médicos y Enfermeros */}
      <TestimonialsSection />

      {/* 9. Preguntas Frecuentes (FAQ) */}
      <FaqSection />

      {/* 10. High-Conversion CTA Banner Final */}
      <section className="bg-tealdeep py-16 text-white relative overflow-hidden">
        <div className="wrap flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <Eyebrow onDark>Inscripciones Abiertas · Ciclo 2026</Eyebrow>
            <h2 className="text-white text-2xl sm:text-4xl font-serif max-w-xl font-bold leading-tight">
              Potencia tu perfil profesional con formación médica de vanguardia
            </h2>
            <p className="text-white/80 text-sm max-w-lg font-sans pt-1">
              Comunícate con un asesor académico y recibe el temario detallado, facilidades de pago y requisitos de matrícula.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 flex-none w-full sm:w-auto">
            <a
              href="https://wa.me/51999999999?text=Hola%20FORMASALUD,%20quisiera%20asesor%C3%ADa%20para%20matricularme%20en%20uno%20de%20los%20programas%202026."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold text-navyink !py-4 !px-8 font-bold text-base shadow-xl w-full sm:w-auto justify-center"
            >
              Matricularme por WhatsApp <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
