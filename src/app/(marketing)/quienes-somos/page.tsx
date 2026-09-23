import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import AboutHero from "@/features/landing/components/AboutHero";
import { TeamSection, TestimonialsSection } from "@/features/landing";
import { CourseHomeGrid } from "@/features/courses/components/CourseHomeGrid";

export const metadata: Metadata = {
  title: "Quiénes Somos — FORMASALUD",
  description:
    "Compromiso académico con la salud pública y privada. FORMASALUD nace para responder a la necesidad de actualización constante del profesional de salud peruano.",
};

export default function QuienesSomosPage() {
  return (
    <main className="flex-1">
      <AboutHero />

      {/* ===================================================
          SECCIÓN 2: NUESTRO PROPÓSITO
         =================================================== */}
      <section className="relative w-full h-screen min-h-[700px] bg-[#063335] text-white overflow-hidden flex flex-col justify-between py-5 lg:py-8">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/nuestro-proposito.png"
            alt="Fondo propósito"
            fill
            className="object-cover object-center"
            priority
          />

          <div className="absolute inset-0 bg-[#063335]/75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#042224]/40" />
        </div>

        <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 relative z-10 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-[30px] h-[2px] bg-[#e7a51c]" />

                <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#e7a51c]">
                  NUESTRO PROPÓSITO
                </span>
              </div>

              <h2
                className="text-[34px] sm:text-[44px] lg:text-[50px] font-extrabold leading-[1.1] mb-5"
              >
                <span className="text-white">Formamos profesionales</span>{" "}
                <br />
                <span className="text-[#f5be41]">
                  para un mejor sistema de salud
                </span>
              </h2>

              <p className="text-[#d0e1e1] text-[15px] sm:text-[17px] leading-[1.7] max-w-[620px]">
                Empoderamos a los profesionales de la salud mediante programas
                de capacitación innovadores y de alta calidad, proporcionando
                herramientas científicas, tecnológicas y metodológicas que
                fortalezcan sus competencias y optimicen su desempeño
                profesional.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4 lg:gap-5">
              {/* Ítem 1 */}
              <div className="bg-[#094749]/85 backdrop-blur-md border border-[#166063] p-5 lg:p-6 rounded-2xl flex items-center gap-5 transition-all hover:bg-[#0b5355]">
                <div className="w-[52px] h-[52px] rounded-full border border-[#1f787b] bg-[#0d595c] flex items-center justify-center text-[#7fe6e1] shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-white font-bold text-[18px] lg:text-[19px] mb-1">
                    Formación actualizada
                  </h3>

                  <p className="text-[#d0e1e1] text-[15px] lg:text-[16px] leading-relaxed">
                    Conocimiento alineado a las necesidades reales del sector
                    salud.
                  </p>
                </div>
              </div>

              {/* Ítem 2 */}
              <div className="bg-[#094749]/85 backdrop-blur-md border border-[#166063] p-5 lg:p-6 rounded-2xl flex items-center gap-5 transition-all hover:bg-[#0b5355]">
                <div className="w-[52px] h-[52px] rounded-full border border-[#1f787b] bg-[#0d595c] flex items-center justify-center text-[#7fe6e1] shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-white font-bold text-[18px] lg:text-[19px] mb-1">
                    Experiencia práctica
                  </h3>

                  <p className="text-[#d0e1e1] text-[15px] lg:text-[16px] leading-relaxed">
                    Metodologías aplicadas y casos reales de la práctica
                    profesional.
                  </p>
                </div>
              </div>

              {/* Ítem 3 */}
              <div className="bg-[#094749]/85 backdrop-blur-md border border-[#166063] p-5 lg:p-6 rounded-2xl flex items-center gap-5 transition-all hover:bg-[#0b5355]">
                <div className="w-[52px] h-[52px] rounded-full border border-[#1f787b] bg-[#0d595c] flex items-center justify-center text-[#7fe6e1] shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-white font-bold text-[18px] lg:text-[19px] mb-1">
                    Impacto en la comunidad
                  </h3>

                  <p className="text-[#d0e1e1] text-[15px] lg:text-[16px] leading-relaxed">
                    Profesionales mejor preparados para una sociedad más
                    saludable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 relative z-10 flex justify-between items-end pb-2">
          <div>
            <div className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-white">
              FORMASALUD
            </div>

            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] text-[#8ab5b3] mt-0.5">
              CENTRO DE CAPACITACIÓN EN SALUD
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <div className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#8ab5b3] leading-relaxed">
              CONOCIMIENTO
              <br />
              PRÁCTICA
              <br />
              IMPACTO REAL
            </div>

            <div className="flex justify-end gap-1.5 mt-1">
              <span className="w-[20px] h-[2px] bg-[#e7a51c]" />
              <span className="w-[10px] h-[2px] bg-[#e7a51c]" />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          SECCIÓN 3: NUESTRA ESENCIA
         =================================================== */}
      <section className="relative w-full py-16 lg:py-20 bg-[#f8fbfa] text-[#0f2d30] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/images/mision.png"
            alt="Fondo Misión y Visión"
            fill
            className="object-cover object-center opacity-85"
          />
        </div>

        <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 relative z-10">
          <div className="hidden xl:flex justify-between items-start mb-6 px-4">
            <div>
              <div className="font-mono text-[9px] tracking-[0.2em] text-[#7fa3a1] uppercase leading-tight mb-2">
                Educación
                <br />
                que transforma
                <br />
                vidas
              </div>

              <span className="block w-[35px] h-[2px] bg-[#e7a51c]" />
            </div>

            <div className="text-right">
              <div className="font-mono text-[9px] tracking-[0.2em] text-[#7fa3a1] uppercase leading-tight mb-2">
                Profesionales
                <br />
                más humanos
                <br />y preparados
              </div>

              <div className="flex justify-end">
                <span className="block w-[35px] h-[2px] bg-[#e7a51c]" />
              </div>
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-[30px] h-[2px] bg-[#e7a51c]" />

              <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#063335]">
                NUESTRA ESENCIA
              </span>

              <span className="w-[30px] h-[2px] bg-[#e7a51c]" />
            </div>

            <h2
              className="text-[36px] sm:text-[42px] font-extrabold tracking-tight mb-3"
            >
              <span className="text-[#063335]">Misión y</span>{" "}
              <span className="text-[#008f82]">Visión</span>
            </h2>

            <p className="text-[#52706e] text-[15px] sm:text-[16px]">
              Principios que guían nuestro compromiso con la formación en
              salud.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
            {/* MISIÓN */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-[0_10px_30px_rgba(6,51,53,0.06)] border border-[#e2eded] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#e2f2f1] flex items-center justify-center text-[#063335] shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="5" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 12l7 -7m0 0h-4m4 0v4"
                      />
                    </svg>
                  </div>

                  <h3
                    className="text-[28px] font-bold text-[#063335] leading-none"
                  >
                    Misión
                  </h3>
                </div>

                <div className="w-[40px] h-[2px] bg-[#e7a51c] mb-6" />

                <p className="text-[#405d5b] text-[15px] lg:text-[16px] leading-[1.7] mb-4">
                  Brindar capacitación integral, actualizada y de excelencia a
                  los profesionales de la salud mediante cursos, talleres,
                  diplomados y programas especializados que desarrollen
                  competencias clínicas, éticas, administrativas y tecnológicas.
                </p>

                <p className="text-[#405d5b] text-[15px] lg:text-[16px] leading-[1.7]">
                  Nos comprometemos a contribuir al fortalecimiento del sistema
                  sanitario formando profesionales altamente competentes,
                  humanistas y comprometidos con una atención segura, eficiente
                  y centrada en las personas.
                </p>
              </div>
            </div>

            {/* VISIÓN */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-[0_10px_30px_rgba(6,51,53,0.06)] border border-[#e2eded] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#e2f2f1] flex items-center justify-center text-[#063335] shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>

                  <h3
                    className="text-[28px] font-bold text-[#008f82] leading-none"
                  >
                    Visión
                  </h3>
                </div>

                <div className="w-[40px] h-[2px] bg-[#e7a51c] mb-6" />

                <p className="text-[#405d5b] text-[15px] lg:text-[16px] leading-[1.7] mb-4">
                  Ser la institución líder en capacitación y actualización de
                  profesionales de la salud a nivel nacional e internacional,
                  reconocida por la excelencia académica, la innovación
                  educativa y el impacto positivo de nuestros programas en la
                  transformación de los servicios de salud.
                </p>

                <p className="text-[#405d5b] text-[15px] lg:text-[16px] leading-[1.7]">
                  Aspiramos a convertirnos en un referente de formación
                  profesional, impulsando el desarrollo de líderes capaces de
                  elevar los estándares de calidad y seguridad en la atención
                  sanitaria.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end pt-8 border-t border-[#e2eded]">
            <div>
              <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#063335]">
                FORMASALUD
              </div>

              <div className="font-mono text-[10px] tracking-[0.15em] text-[#7fa3a1] mt-0.5">
                CENTRO DE CAPACITACIÓN EN SALUD
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <div className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#7fa3a1] leading-relaxed">
                CONOCIMIENTO
                <br />
                PRÁCTICA
                <br />
                IMPACTO REAL
              </div>

              <div className="flex justify-end gap-1.5 mt-1.5">
                <span className="w-[20px] h-[2px] bg-[#e7a51c]" />
                <span className="w-[10px] h-[2px] bg-[#e7a51c]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          SECCIÓN 4: CURSOS Y PROGRAMAS
         =================================================== */}
      <section id="cursos" className="pt-4 pb-12 bg-paper">
        <div className="wrap">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-serif text-navy mt-3">
              Cursos, Diplomados y Talleres Clínicos
            </h2>

            <p className="mt-2.5 text-sm sm:text-base max-w-xl text-ink-soft leading-relaxed">
              Programas certificados con horas lectivas y docentes especialistas
              de hospitales de referencia.
            </p>
          </div>

          <CourseHomeGrid />
        </div>
      </section>

      {/* ===================================================
          SECCIÓN 5: EQUIPO DIRECTIVO Y PLANA DOCENTE
         =================================================== */}
      <TeamSection />

      {/* ===================================================
          SECCIÓN 6: TESTIMONIOS
         =================================================== */}
      <TestimonialsSection />
    </main>
  );
}