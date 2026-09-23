import Image from "next/image";

type HeroImagePosition = "left" | "right";

interface AboutHeroProps {
  imagePosition?: HeroImagePosition;
  imageSrc?: string;
  /**
   * Punto de la foto que queda en el centro del recuadro (object-position).
   * Sube el % X para mover a la enfermera hacia la izquierda (más al centro),
   * bájalo para moverla hacia la derecha.
   */
  imageFocus?: string;
  eyebrow?: string;
  title?: string;
  highlightedTitle?: string;
  description?: string;
  quote?: string;
}

const SHARP_MASK =
  "linear-gradient(to right, transparent 0%, #000 24%, #000 76%, transparent 100%)";
const SOFT_MASK =
  "linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%)";

export default function AboutHero({
  imagePosition = "right",
  imageSrc = "/images/quienes-somos-hero.png",
  imageFocus = "100% center",
  eyebrow = "QUIÉNES SOMOS",
  title = "Comprometidos con",
  highlightedTitle = "la formación en salud",
  description = `Somos un centro de capacitación en salud que impulsa el
  crecimiento profesional de médicos, enfermeros y personal de
  salud, a través de programas actualizados, prácticos y con enfoque
  en la realidad del país.`,
  quote = "Profesionales mejor preparados para una sociedad más saludable",
}: AboutHeroProps) {
  const imageRight = imagePosition === "right";

  return (
    <section className="relative w-full h-[calc(100vh-102px)] min-h-[600px] overflow-hidden bg-[#eef8f8]">
      {/* IMAGEN DE FONDO GENERAL CON LÍNEAS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/images/formacion-conocimientos.png"
          alt="Fondo decorativo formacion"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* CONTENEDOR DE LA IMAGEN: centro nítido + bordes borrosos en degradado */}
      <div
        className="absolute top-0 bottom-0 w-full lg:w-[60%] overflow-hidden z-10 pointer-events-none"
        style={
          imageRight
            ? { right: "calc(max(1.5rem, (100vw - 1440px) / 2 + 1rem) + 4vw)" }
            : { left: "calc(max(1.5rem, (100vw - 1440px) / 2 + 1rem) + 4vw)" }
        }
      >
        {/* 1. CAPA BORROSA (debajo): versión liviana, igual se desenfoca */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10"
          style={{ WebkitMaskImage: SOFT_MASK, maskImage: SOFT_MASK }}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="40vw"
            className="object-cover blur-[16px] scale-110"
            style={{ objectPosition: imageFocus }}
          />
        </div>

        {/* 2. CAPA NÍTIDA (encima): imagen original sin compresión ni redimensionado */}
        <div
          className="absolute inset-0 z-20"
          style={{ WebkitMaskImage: SHARP_MASK, maskImage: SHARP_MASK }}
        >
          <Image
            src={imageSrc}
            alt="Personal médico y de salud de FORMASALUD"
            fill
            priority
            unoptimized
            className="object-cover"
            style={{ objectPosition: imageFocus }}
          />
        </div>

        {/* FRASE SUPERIOR */}
        <div
          className={`absolute top-[65px] z-30 max-w-[215px] ${imageRight
            ? "right-[20px] lg:right-[35px] text-right"
            : "left-[20px] lg:left-[35px] text-left"
            }`}
        >
          <p className="font-serif italic text-[12px] sm:text-[13px] leading-[1.45] text-[#536b74]">
            &ldquo;{quote}&rdquo;
          </p>
          <div
            className={`w-[30px] h-[2px] bg-[#e7a51c] mt-3 ${imageRight ? "ml-auto" : "mr-auto"
              }`}
          />
        </div>

        {/* CRUZ */}
        <div
          className={`absolute top-[50%] -translate-y-1/2 opacity-[0.18] z-30 ${imageRight ? "right-[25px]" : "left-[25px]"
            }`}
        >
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
        <div
          className={`absolute bottom-[42px] z-30 ${imageRight
            ? "right-[20px] lg:right-[35px] text-right"
            : "left-[20px] lg:left-[35px] text-left"
            }`}
        >
          <div
            className={`flex flex-col gap-[2px] ${imageRight ? "items-end" : "items-start"
              }`}
          >
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

      {/* CONTENEDOR DE TEXTO */}
      <div className="relative z-30 w-full h-full max-w-[1440px] mx-auto px-6 lg:px-12 pointer-events-none">
        <div
          className={`flex h-full ${imageRight ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`flex flex-col justify-center h-full w-full lg:max-w-[42%] pointer-events-auto -translate-y-4 ${imageRight ? "pr-0 lg:pr-4" : "pl-0 lg:pl-4"
              }`}
          >
            {/* Etiqueta */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-[30px] h-[2px] bg-[#e7a51c]" />
              <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#0b2039]">
                {eyebrow}
              </span>
            </div>

            {/* Título */}
            <h1
              className="font-extrabold leading-[1.22] tracking-[-0.02em] text-[#071b35] whitespace-nowrap text-[26px] sm:text-[30px] lg:text-[32px] xl:text-[46px]"
            >
              {title}
              <br />
              <span className="text-[#087d72]">{highlightedTitle}</span>
            </h1>

            {/* Descripción */}
            <p className="mt-4 max-w-[460px] text-[15px] sm:text-[16px] leading-[1.6] text-[#536772]">
              {description}
            </p>

            {/* CARACTERÍSTICAS */}
            <div className="mt-6 border-t border-[#d2e0e1] pt-4">
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

            {/* BOTÓN */}
            <div className="mt-6">
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
      </div>
    </section >
  );
}