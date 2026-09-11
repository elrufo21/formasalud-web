import React from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function MethodologySection() {
  const items = [
    {
      num: "01",
      title: "Casos Clínicos Reales y Simulación",
      desc: "Aprendizaje basado en la resolución de casos clínicos reales, metodología teórico-práctica y simulación clínica.",
    },
    {
      num: "02",
      title: "Docentes Especialistas",
      desc: "Plana docente integrada por especialistas con amplia experiencia profesional y docente en el sector salud.",
    },
    {
      num: "03",
      title: "Evaluación Continua y Acompañamiento",
      desc: "Evaluación continua con retroalimentación permanente y acompañamiento durante todo el proceso de aprendizaje.",
    },
    {
      num: "04",
      title: "Material Académico Actualizado",
      desc: "Acceso a material académico digital actualizado y programas basados en evidencia científica.",
    },
  ];

  return (
    <section className="band-navy text-white py-20">
      <div className="wrap">
        <Eyebrow onDark>Nuestra Metodología</Eyebrow>
        <h2 className="!text-white text-3xl md:text-4xl font-serif mt-4 max-w-xl">
          Orientada al aprendizaje significativo
        </h2>

        <div className="num-list grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mt-8">
          {items.map((item) => (
            <div
              key={item.num}
              className="num-item flex gap-5 py-7 border-b border-white/12"
            >
              <b className="idx font-mono text-xs text-goldpale flex-none pt-1">
                {item.num}
              </b>
              <div>
                <h3 className="!text-white font-serif text-lg font-medium">
                  {item.title}
                </h3>
                <p className="!text-white/80 text-sm mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}