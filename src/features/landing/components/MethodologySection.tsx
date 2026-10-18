import React from "react";
import {
  Stethoscope,
  Users,
  ClipboardCheck,
  BookOpenCheck,
  Award,
  CheckCircle2,
  Sparkles,
  Activity,
  HeartHandshake,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionReveal";

export function MethodologySection() {
  const methodologyItems = [
    {
      num: "01",
      icon: Stethoscope,
      title: "Aprendizaje basado en casos clínicos reales",
      desc: "Análisis y abordaje de escenarios asistenciales reales para fortalecer el criterio clínico y la toma de decisiones.",
    },
    {
      num: "02",
      icon: Activity,
      title: "Metodología teórico-práctica y simulación",
      desc: "Integración de fundamentos científicos con simulación clínica y resolución práctica de problemas hospitalarios.",
    },
    {
      num: "03",
      icon: Users,
      title: "Docentes especialistas con amplia experiencia",
      desc: "Profesionales en ejercicio activo con sólida trayectoria asistencial, administrativa y docente en el sector salud.",
    },
    {
      num: "04",
      icon: ClipboardCheck,
      title: "Evaluación continua con retroalimentación",
      desc: "Seguimiento académico constante y retroalimentación permanente para asegurar el logro de competencias.",
    },
    {
      num: "05",
      icon: BookOpenCheck,
      title: "Material académico actualizado",
      desc: "Recursos digitales, guías de práctica clínica y literatura científica actualizada disponible en el Aula Virtual.",
    },
    {
      num: "06",
      icon: HeartHandshake,
      title: "Acompañamiento durante todo el aprendizaje",
      desc: "Soporte académico y tutoría continua desde la matrícula hasta la emisión de tu certificación oficial.",
    },
  ];

  const participantBenefits = [
    "Certificaciones emitidas por FORMASALUD y respaldadas mediante convenios académicos nacionales e internacionales.",
    "Docentes con amplia trayectoria profesional y docente.",
    "Materiales digitales actualizados disponibles en plataforma.",
    "Acceso a conferencias y actividades académicas especializadas.",
    "Desarrollo de competencias altamente demandadas en el sector salud.",
    "Networking con profesionales nacionales e internacionales.",
    "Actualización permanente basada en evidencia científica.",
  ];

  return (
    <section className="band-navy texture-dark text-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="wrap relative z-10">
        {/* Encabezado de Metodología */}
        <FadeIn className="max-w-2xl">
          <Eyebrow onDark>Modelo Educativo FORMASALUD</Eyebrow>
          <h2 className="!text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold mt-3 tracking-tight">
            Nuestra Metodología y Beneficios para el Participante
          </h2>
          <p className="!text-white/80 text-sm sm:text-base mt-2.5 leading-relaxed">
            Nuestros programas académicos se desarrollan mediante una metodología moderna orientada al aprendizaje significativo, integrando teoría, simulación clínica y acompañamiento permanente.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-10 items-start">
          {/* Columna Izquierda (7 cols): Pilares de Nuestra Metodología */}
          <StaggerContainer
            staggerDelay={0.08}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          >
            {methodologyItems.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.num} className="h-full">
                  <div className="h-full group p-5 sm:p-6 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <div className="w-11 h-11 rounded-xl bg-teal/20 border border-teal/40 text-goldpale flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navyink group-hover:border-gold transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-goldpale/90">
                          Pilar {item.num}
                        </span>
                      </div>
                      <h3 className="!text-white text-base font-bold leading-snug">
                        {item.title}
                      </h3>
                      <p className="!text-white/75 text-xs sm:text-[13px] mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Columna Derecha (5 cols): Beneficios para Nuestros Participantes */}
          <FadeIn
            direction="left"
            delay={0.15}
            className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-teal/15 border border-gold/35 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-gold/10 blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gold text-navyink flex items-center justify-center shrink-0 shadow-md">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-goldpale">
                Valor al Estudiante
              </span>
            </div>

            <h3 className="!text-white text-xl sm:text-2xl font-extrabold leading-snug">
              Beneficios para Nuestros Participantes
            </h3>
            <p className="!text-white/75 text-xs sm:text-sm mt-2 leading-relaxed">
              Los estudiantes de FORMASALUD acceden a múltiples beneficios que fortalecen su desarrollo y competitividad profesional:
            </p>

            <ul className="mt-6 space-y-3.5">
              {participantBenefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-xs sm:text-[13.5px] text-white/90 leading-relaxed bg-navyink/40 p-3 rounded-xl border border-white/10 hover:border-gold/30 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-goldpale font-semibold">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>FORMASALUD · Excelencia Académica</span>
              </span>
              <span>Lima – Perú</span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
