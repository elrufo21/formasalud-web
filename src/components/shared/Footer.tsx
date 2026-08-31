import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-navyink text-white/70 pt-16 pb-8 texture-dark border-t border-white/10">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-navy text-goldpale flex items-center justify-center font-serif italic text-lg font-bold border border-gold shadow-md overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="FORMASALUD Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <b className="text-white font-serif text-lg tracking-wide block">FORMASALUD</b>
                <span className="font-mono text-[9px] uppercase tracking-widest text-teal block">
                  Centro de capacitación en salud
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] leading-relaxed text-white/60 max-w-sm">
              Centro especializado en formación y actualización médica continua en el Perú. Diplomados, cursos y talleres clínicos dictados por docentes especialistas de hospitales de referencia nacional.
            </p>

            <div className="pt-2 font-mono text-[10.5px] text-goldpale tracking-widest uppercase space-y-1">
              <div>GRUPO PAUCAR PERÚ S.A.C.</div>
              <div className="text-white/50">RUC 20613837613 · Lima, Perú</div>
            </div>
          </div>

          {/* Col 3: Navegación */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-widest text-white font-semibold mb-3">
              Navegación
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-goldpale transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/cursos" className="hover:text-goldpale transition-colors">
                  Cursos y Programas
                </Link>
              </li>
              <li>
                <a href="/#flyers" className="hover:text-goldpale transition-colors">
                  Próximos Flyers & Eventos
                </a>
              </li>
              <li>
                <a href="/#equipo" className="hover:text-goldpale transition-colors">
                  Docentes & Equipo
                </a>
              </li>
              <li>
                <Link href="/quienes-somos" className="hover:text-goldpale transition-colors">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-goldpale transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Líneas Académicas */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-widest text-white font-semibold mb-3">
              Líneas Académicas
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60">
              <li>Cuidados Críticos e Intensivos</li>
              <li>Inteligencia Artificial Médica</li>
              <li>Simulación Clínica & Vía Aérea</li>
              <li>Gerencia & Gestión de Salud</li>
              <li>Urgencias y Trauma Shock</li>
              <li>Auditoría Médica y SUSALUD</li>
            </ul>
          </div>

          {/* Col 5: Contacto y Aula Virtual */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-widest text-white font-semibold mb-3">
              Atención Académica
            </h5>
            <div className="text-xs leading-relaxed space-y-2 font-mono text-white/60">
              <div>📍 Lima, Perú</div>
              <div>📱 WhatsApp: +51 999 999 999</div>
              <div>✉️ contacto@formasalud.pe</div>
              <div className="pt-2 text-[10.5px] text-teal">
                Horario: Lun - Sáb 8:00 AM - 7:00 PM
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/51999999999?text=Hola%20FORMASALUD,%20quisiera%20asesor%C3%ADa%20para%20inscribirme."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary !py-2 !px-3.5 !text-xs font-semibold w-full justify-center"
              >
                Escribir al WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Legal and Accreditation Strip */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono tracking-wide text-white/50 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} FORMASALUD · GRUPO PAUCAR PERÚ S.A.C. · Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/contacto"
              className="border border-white/25 px-3.5 py-1.5 text-white hover:border-goldpale hover:text-goldpale transition-colors text-[11px] rounded"
            >
              📖 Libro de Reclamaciones
            </Link>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp CTA */}
      <a
        href="https://wa.me/51999999999?text=Hola%20FORMASALUD,%20quisiera%20informaci%C3%B3n%20sobre%20los%20cursos%20disponibles."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float hover:scale-110 transition-transform shadow-2xl flex items-center justify-center group"
        aria-label="Contactar por WhatsApp a FORMASALUD"
      >
        <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.15 4.197 4.293-1.127z" />
        </svg>
      </a>
    </footer>
  );
}
