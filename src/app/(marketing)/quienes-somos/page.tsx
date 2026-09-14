import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quiénes Somos — FORMASALUD",
  description:
    "Compromiso académico con la salud pública y privada. FORMASALUD nace para responder a la necesidad de actualización constante del profesional de salud peruano.",
};

export default function QuienesSomosPage() {
  return (
    <main className={`flex-1 ${inter.className}`}>
      <section className="relative w-full h-[calc(100vh-102px)] min-h-[700px] overflow-hidden bg-[#eef8f8]">
        {/* Decoraciones circulares del fondo */}
        <div className="absolute left-[-120px] bottom-[-130px] w-[320px] h-[320px] rounded-full border border-[#d5ebea] opacity-70 pointer-events-none" />
        <div className="absolute left-[-85px] bottom-[-95px] w-[250px] h-[250px] rounded-full border border-[#d5ebea] opacity-60 pointer-events-none" />

        {/* =====================================
            IMAGEN DERECHA — SIN CAMBIOS
        ====================================== */}
        <div
          className="absolute top-0 bottom-0 w-full lg:w-[50%] overflow-hidden z-10"
          style={{
            right: "max(1.5rem, calc((100vw - 1440px) / 2 + 3rem))",
          }}
        >
          {/* Imagen */}
          <div className="absolute inset-0">
            <Image
              src="/images/quienes-somos-hero.png"
              alt="Personal médico y de salud de FORMASALUD"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            {/* Degradado izquierdo */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, #eef8f8 0%, rgba(238,248,248,0.85) 8%, rgba(238,248,248,0.4) 22%, rgba(238,248,248,0.1) 32%, rgba(238,248,248,0) 40%)",
              }}
            />
            {/* Degradado superior/inferior */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(238,248,248,0.18) 0%, transparent 15%, transparent 85%, rgba(238,248,248,0.12) 100%)",
              }}
            />
          </div>

          {/* FRASE SUPERIOR */}
          <div className="absolute top-[65px] right-[35px] lg:right-[42px] z-20 max-w-[215px]">
            <p className="font-serif italic text-[12px] sm:text-[13px] leading-[1.45] text-[#536b74] text-right">
              &ldquo;Profesionales mejor preparados para una sociedad más
              saludable&rdquo;
            </p>
            <div className="w-[30px] h-[2px] bg-[#e7a51c] mt-3 ml-auto" />
          </div>

          {/* CRUZ */}
          <div className="absolute right-[35px] top-[50%] -translate-y-1/2 opacity-[0.18] z-10">
            <svg
              className="w-[95px] h-[95px] text-[#45aaa2]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16M4 12h16"
              />
            </svg>
          </div>

          {/* TEXTO INFERIOR */}
          <div className="absolute bottom-[42px] right-[35px] lg:right-[42px] z-20 text-right">
            <div className="flex flex-col items-end gap-[2px]">
              <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[#08796e]">
                SALUD
              </span>
              <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[#08796e]">
                CONOCIMIENTO
              </span>
              <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[#08796e]">
                OPORTUNIDADES
              </span>
              <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[#08796e]">
                IMPACTO REAL
              </span>
              <div className="w-[30px] h-[2px] bg-[#e7a51c] mt-2" />
            </div>
          </div>
        </div>

        {/* =====================================
            CONTENEDOR DE TEXTO (izquierda)
            Ancho un poco mayor (38% → 41%) para
            que el título quepa en 2 líneas con
            Montserrat 800.
        ====================================== */}
        <div className="relative z-30 w-full h-full max-w-[1440px] mx-auto px-6 lg:px-12 pointer-events-none">
          <div className="flex flex-col justify-center h-full w-full lg:max-w-[41%] pr-0 lg:pr-8 pointer-events-auto -translate-y-4">
            {/* Etiqueta */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-[30px] h-[2px] bg-[#e7a51c]" />
              <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#0b2039]">
                QUIÉNES SOMOS
              </span>
            </div>

            {/* Título — Montserrat ExtraBold (800)
                Tamaño reducido para que quepa en
                2 líneas: "Comprometidos con" /
                "la formación en salud" */}
            <h1
              className={`${montserrat.className} font-extrabold leading-[1.22] tracking-[-0.02em] text-[#071b35] whitespace-nowrap text-[26px] sm:text-[30px] lg:text-[32px] xl:text-[50px]`}
            >
              Comprometidos con
              <br />
              <span className="text-[#087d72]">la formación en salud</span>
            </h1>

            {/* Descripción */}
            <p className="mt-5 max-w-[500px] text-[15px] sm:text-[16px] leading-[1.6] text-[#536772]">
              Somos un centro de capacitación en salud que impulsa el
              crecimiento profesional de médicos, enfermeros y personal de
              salud, a través de programas actualizados, prácticos y con
              enfoque en la realidad del país.
            </p>

            {/* =====================================
                CARACTERÍSTICAS
            ====================================== */}
            <div className="mt-7 border-t border-[#d2e0e1] pt-5">
              <div className="flex items-center flex-wrap gap-y-4">
                {/* FORMACIÓN */}
                <div className="flex items-center flex-1 min-w-[110px]">
                  <div className="w-[38px] h-[38px] rounded-full bg-[#dcefed] flex items-center justify-center text-[#08786d] shrink-0">
                    <svg
                      className="w-[18px] h-[18px]"
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14v7"
                      />
                    </svg>
                  </div>
                  <div className="ml-2.5 leading-tight">
                    <span className="block text-[13px] font-bold text-[#0b2039]">
                      Formación
                    </span>
                    <span className="block text-[11px] text-[#65777d]">
                      de calidad
                    </span>
                  </div>
                </div>

                {/* SEPARADOR */}
                <div className="w-px h-[36px] bg-[#d2dfe0] mx-2" />

                {/* DOCENTES */}
                <div className="flex items-center flex-1 min-w-[110px]">
                  <div className="w-[38px] h-[38px] rounded-full bg-[#dcefed] flex items-center justify-center text-[#08786d] shrink-0">
                    <svg
                      className="w-[18px] h-[18px]"
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
                  <div className="ml-2.5 leading-tight">
                    <span className="block text-[13px] font-bold text-[#0b2039]">
                      Docentes
                    </span>
                    <span className="block text-[11px] text-[#65777d]">
                      especialistas
                    </span>
                  </div>
                </div>

                {/* SEPARADOR */}
                <div className="w-px h-[36px] bg-[#d2dfe0] mx-2" />

                {/* ENFOQUE */}
                <div className="flex items-center flex-1 min-w-[110px]">
                  <div className="w-[38px] h-[38px] rounded-full bg-[#dcefed] flex items-center justify-center text-[#08786d] shrink-0">
                    <svg
                      className="w-[18px] h-[18px]"
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
                  <div className="ml-2.5 leading-tight">
                    <span className="block text-[13px] font-bold text-[#0b2039]">
                      Enfoque
                    </span>
                    <span className="block text-[11px] text-[#65777d]">
                      práctico
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================
                BOTÓN
            ====================================== */}
            <div className="mt-7">
              <a
                href="#contacto"
                className="inline-flex items-center gap-3 bg-[#08796e] hover:bg-[#06675e] text-white text-[14px] font-semibold px-6 py-3.5 rounded-[4px] transition-all duration-200"
              >
                <span className="text-white">Conoce más sobre nosotros</span>
                <span className="text-white text-[17px]">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}