import React from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CertificatePreview } from "@/components/ui/CertificatePreview";

export function CertificateSection() {
  const points = [
    {
      title: "Respaldo Jurídico Formal",
      desc: "Emitido por GRUPO PAUCAR PERÚ S.A.C. con RUC 20613837613, cumpliendo los estándares de la Ley General de Sociedades y normativa educativa peruana.",
    },
    {
      title: "Código QR de Validación Inmediata",
      desc: "Cada diploma cuenta con un identificador único y código QR que permite a clínicas, hospitales y comités de concurso verificar la autenticidad en tiempo real.",
    },
    {
      title: "Horas Lectivas y Créditos Académicos",
      desc: "Especificación detallada de horas teóricas, prácticas y créditos, válidos para concursos públicos, legajo profesional y recertificación de colegios profesionales.",
    },
    {
      title: "Entrega Digital y Física Opcional",
      desc: "Descarga instantánea en alta resolución desde el Aula Virtual y opción de envío de diploma físico con sellos de seguridad a todo el Perú.",
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-line">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-5 space-y-6">
            <Eyebrow>Valor Curricular & Acreditación</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-serif text-navy leading-tight">
              Certificación Oficial con Validación Digital
            </h2>
            <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
              Sabemos que tu tiempo y esfuerzo merecen un respaldo tangible. En FORMASALUD todos nuestros programas cuentan con acreditación formal para impulsar tu carrera médica.
            </p>

            <div className="space-y-4 pt-2">
              {points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-tealtint text-teal font-bold text-xs flex items-center justify-center flex-none mt-0.5 border border-teal/30">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-navy">
                      {pt.title}
                    </h4>
                    <p className="text-xs text-ink-soft leading-relaxed mt-0.5">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Certificate Mock Preview */}
          <div className="lg:col-span-7">
            <CertificatePreview />
          </div>
        </div>
      </div>
    </section>
  );
}
