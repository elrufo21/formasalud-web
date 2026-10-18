import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Calendar, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navyink text-white/75 pt-14 sm:pt-16 pb-8 texture-dark border-t border-white/10">
      <div className="wrap">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand Info (4 cols) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full bg-navy text-goldpale flex items-center justify-center font-bold border-2 border-gold shadow-md overflow-hidden shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="FORMASALUD Logo"
                  width={44}
                  height={44}
                  className="object-cover"
                />
              </div>
              <div>
                <b className="text-white text-lg font-extrabold tracking-tight block leading-none">
                  FORMASALUD
                </b>
                <span className="text-[9px] uppercase tracking-[0.15em] text-teal font-bold block mt-1">
                  Innovación y Desarrollo Académico en Salud
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] leading-relaxed !text-white/65 max-w-sm">
              Centro de capacitación especializado en la innovación y desarrollo académico para los profesionales de la salud, comprometido con la formación continua, el fortalecimiento de competencias y la excelencia en la atención sanitaria.
            </p>

            <div className="pt-1 text-[11px] text-goldpale tracking-wider uppercase font-bold space-y-0.5">
              <div>FORMASALUD</div>
              <div className="text-white/55 font-semibold">
                RUC 20613837613 · Lima – Perú
              </div>
            </div>
          </div>

          {/* Col 2: Navegación (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs uppercase tracking-widest !text-white font-bold mb-3">
              Navegación
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-medium">
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
                <Link href="/quienes-somos" className="hover:text-goldpale transition-colors">
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-goldpale transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/aula" className="text-goldpale hover:text-white transition-colors font-semibold">
                  Aula Virtual 24/7 →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Programas Académicos Oficiales (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs uppercase tracking-widest !text-white font-bold mb-3">
              Programas Académicos
            </h5>
            <ul className="space-y-2 text-xs sm:text-[13px] text-white/65">
              <li>Cursos para Enfermería y Sector Salud</li>
              <li>Diplomados en Áreas Clínicas y Asistenciales</li>
              <li>Diplomados en Gerencia y Gestión en Salud</li>
              <li>Inteligencia Artificial Aplicada a la Salud</li>
              <li>Talleres Prácticos de Procedimientos Clínicos</li>
              <li>Calidad, Seguridad del Paciente y Gestión</li>
            </ul>
          </div>

          {/* Col 4: Contacto Oficial (3 cols) */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-3">
            <h5 className="text-xs uppercase tracking-widest !text-white font-bold mb-3">
              Información de Contacto
            </h5>
            <div className="text-xs leading-relaxed space-y-2.5 text-white/75">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Lima – Perú</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                <a
                  href="https://wa.me/51939584395"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-goldpale transition-colors font-semibold"
                >
                  Teléfono / WhatsApp: 939 584 395
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                <a
                  href="mailto:formasalud2025@gmail.com"
                  className="hover:text-goldpale transition-colors break-all"
                >
                  formasalud2025@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-goldpale font-semibold">
                <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Fundación: 09 de marzo de 2025</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/51939584395?text=Hola%20FORMASALUD,%20quisiera%20asesor%C3%ADa%20sobre%20sus%20programas%20de%20capacitaci%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary !py-2.5 !px-4 !text-xs font-bold w-full justify-center !rounded-xl"
              >
                <span>Escribir al WhatsApp</span>
                <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Legal and Accreditation Strip */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/55 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} FORMASALUD · Innovación y Desarrollo Académico en Salud · RUC 20613837613. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/contacto"
              className="border border-white/20 px-3.5 py-1.5 text-white/85 hover:border-goldpale hover:text-goldpale transition-colors text-[11px] font-semibold rounded-lg inline-flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-gold" />
              <span>Libro de Reclamaciones</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp CTA */}
      <a
        href="https://wa.me/51939584395?text=Hola%20FORMASALUD,%20quisiera%20informaci%C3%B3n%20sobre%20los%20cursos%20y%20programas%20disponibles."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float hover:scale-110 transition-transform shadow-2xl flex items-center justify-center group"
        aria-label="Contactar por WhatsApp a FORMASALUD"
      >
        <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.15 4.197 4.293-1.127z" />
        </svg>
      </a>
    </footer>
  );
}

