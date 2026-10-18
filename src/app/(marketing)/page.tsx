import React from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, CheckCircle2, Mail } from "lucide-react";
import {
  HeroSection,
  FlyersSection,
  TeamSection,
  CertificateSection,
  MethodologySection,
  PartnersSection,
  TestimonialsSection,
} from "@/features/landing";
import { CourseHomeGrid } from "@/features/courses/components/CourseHomeGrid";
import { FaqSection } from "@/features/faq/components/FaqSection";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionReveal";
import { getPublishedCourses } from "@/lib/public-courses";

export const revalidate = 60;

const ACADEMIC_PROGRAM_LINES = [
  "Cursos de capacitación para profesionales de enfermería y demás profesionales del sector salud.",
  "Diplomados de especialización en áreas clínicas y asistenciales.",
  "Diplomados en Gerencia, Gestión y Administración de los Servicios de Salud.",
  "Seminarios nacionales e internacionales sobre innovación y nuevas tecnologías en salud.",
  "Programas de Inteligencia Artificial aplicada a los servicios de salud.",
  "Talleres prácticos de procedimientos clínicos y hospitalarios.",
  "Programas de actualización profesional basados en evidencia científica.",
  "Cursos sobre calidad, seguridad del paciente, investigación y gestión del cuidado.",
];

export default async function HomePage() {
  const courses = await getPublishedCourses();
  return (
    <main className="flex-1">
      {/* 1. Hero Principal con propuesta de valor, métricas y EKG animado */}
      <HeroSection />

      {/* 2. Sección Cursos y Programas Académicos */}
      <section id="cursos" className="py-16 sm:py-20 bg-paper">
        <div className="wrap">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <Eyebrow>Nuestros Programas Académicos</Eyebrow>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mt-3 tracking-tight">
                Cursos, Diplomados y Talleres Especializados
              </h2>
              <p className="mt-2.5 text-sm sm:text-base max-w-2xl text-ink-soft leading-relaxed">
                FORMASALUD desarrolla programas de formación orientados a fortalecer las competencias profesionales mediante una oferta académica actualizada.
              </p>
            </div>
            <Link
              href="/cursos"
              className="btn btn-ghost !py-2.5 !px-5 !text-xs font-bold self-start md:self-auto"
            >
              <span>Explorar catálogo completo</span>
              <ArrowRight className="w-4 h-4 text-teal" />
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <CourseHomeGrid courses={courses} />
          </FadeIn>

          {/* Las 8 Líneas Oficiales de Programas que ofrece FORMASALUD */}
          <div className="mt-12 pt-10 border-t border-line">
            <FadeIn className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-teal block">
                  Líneas de Formación Continua
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-navy mt-1">
                  Programas que ofrecemos a los profesionales de la salud
                </h3>
              </div>
              <span className="text-xs font-semibold text-ink-soft bg-bg-alt px-3.5 py-1.5 rounded-full border border-line self-start sm:self-auto">
                8 Líneas Especializadas
              </span>
            </FadeIn>

            <StaggerContainer
              staggerDelay={0.06}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4"
            >
              {ACADEMIC_PROGRAM_LINES.map((program, idx) => (
                <StaggerItem key={idx} className="h-full">
                  <div className="h-full p-4 sm:p-5 rounded-2xl bg-bg-alt/70 hover:bg-white border border-line hover:border-teal/40 hover:shadow-[0_8px_24px_rgba(15,41,66,0.06)] hover:-translate-y-0.5 transition-all duration-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-[13px] font-semibold text-navy leading-relaxed">
                      {program}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* 3. Sección Flyers & Masterclasses / Próximos Cursos */}
      <FlyersSection />

      {/* 4. Sección Equipo Directivo y Plana Docente */}
      <TeamSection isCarousel={true} />

      {/* 5. Sección Certificación Oficial con Verificación QR */}
      <CertificateSection />

      {/* 6. Metodología y Beneficios para Nuestros Participantes */}
      <MethodologySection />

      {/* 7. Convenios Institucionales */}
      <PartnersSection />

      {/* 8. Testimonios de Egresados Médicos y Enfermeros */}
      <TestimonialsSection />

      {/* 9. Preguntas Frecuentes (FAQ) */}
      <FaqSection />

      {/* 10. Compromiso Institucional y Contacto Final */}
      <section className="bg-gradient-to-br from-navyink via-navy to-tealdeep py-16 sm:py-20 text-white relative overflow-hidden border-t border-white/10">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-teal/15 blur-3xl pointer-events-none" />

        <FadeIn className="wrap flex flex-col lg:flex-row justify-between items-center gap-8 relative z-10">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <Eyebrow onDark className="justify-center lg:justify-start">
              FORMASALUD · Innovación y Desarrollo Académico en Salud
            </Eyebrow>
            <h2 className="!text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">
              Reafirmamos nuestro compromiso con la excelencia académica
            </h2>
            <p className="!text-white/80 text-sm sm:text-base max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Estaremos complacidos de responder sus consultas sobre nuestros programas y establecer alianzas estratégicas que contribuyan al fortalecimiento del talento humano en el sector salud.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 flex-none w-full sm:w-auto">
            <a
              href="https://wa.me/51939584395?text=Hola%20FORMASALUD,%20quisiera%20informaci%C3%B3n%20sobre%20sus%20programas%20acad%C3%A9micos."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold !py-4 !px-7 text-sm font-extrabold shadow-xl w-full sm:w-auto justify-center flex items-center gap-2.5 !rounded-xl"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: 939 584 395</span>
              <span className="arrow">→</span>
            </a>
            <a
              href="mailto:formasalud2025@gmail.com"
              className="btn btn-line !py-4 !px-6 text-xs sm:text-sm font-semibold w-full sm:w-auto justify-center !rounded-xl flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-goldpale" />
              <span>Escribir al correo</span>
            </a>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}


