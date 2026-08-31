import React from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function MethodologySection() {
  const items = [
    {
      num: "01",
      title: "Docentes Especialistas y Activos",
      desc: "Nuestros ponentes son especialistas con amplio recorrido en hospitales públicos y clínicas privadas del Perú.",
    },
    {
      num: "02",
      title: "Casos Clínicos Basados en Evidencia",
      desc: "Enfoque 100% práctico orientado a la resolución de dilemas y protocolos de atención real.",
    },
    {
      num: "03",
      title: "Plataforma Virtual 24/7",
      desc: "Acceso inmediato a ponencias grabadas en HD, lecturas seleccionadas y material descargable.",
    },
    {
      num: "04",
      title: "Certificación con Código QR",
      desc: "Verificación digital de tus horas lectivas respaldadas formalmente por el GRUPO PAUCAR PERÚ S.A.C.",
    },
  ];

  return (
    <section className="band-navy text-white py-20">
      <div className="wrap">
        <Eyebrow onDark>Metodología y Modelo Académico</Eyebrow>
        <h2 className="!text-white text-3xl md:text-4xl font-serif mt-4 max-w-xl">
          Diseñado para el profesional en ejercicio
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
                <h4 className="!text-white font-serif text-lg font-medium">
                  {item.title}
                </h4>
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
