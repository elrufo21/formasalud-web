"use client";

import React from "react";

export function ContactSection() {
  return (
    <section className="pt-4 pb-16 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">

      {/* Cabecera */}
      <div className="max-w-7xl mx-auto relative mb-10">
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[2px] bg-[#d4a373]"></span>
            <span className="text-[11px] font-mono tracking-widest text-gray-600 uppercase font-semibold">
              Comunicación
            </span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-[#0b1b3d] tracking-tight">
            Contáctanos
          </h1>
          <p className="text-sm text-gray-600 mt-2 max-w-xl">
            Estamos aquí para resolver tus consultas sobre cursos, programas y atención institucional.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">

          {/* Formulario (7 columnas) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-[#0b1b3d] mb-1">
              Envíanos un mensaje
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Completa el formulario y te responderemos a la brevedad.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-2">
                    Nombres y apellidos <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Maria Fernanda Torres"
                    className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0b5345] transition text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-2">
                    Correo electrónico <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Ej. nombre@correo.com"
                    className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0b5345] transition text-gray-800"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-2">
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. +51 999 999 999"
                    className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0b5345] transition text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-2">
                    Asunto <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0b5345] transition text-gray-600">
                    <option>Selecciona un asunto</option>
                    <option>Consultas sobre Cursos</option>
                    <option>Programas Académicos</option>
                    <option>Atención Institucional</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-2">
                  Mensaje <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0b5345] transition resize-none text-gray-800"
                  required
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#0b5345] text-white px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-[#083d33] transition shadow-sm"
                >
                  Enviar mensaje &rarr;
                </button>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <svg className="w-3.5 h-3.5 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>Tu información será tratada de forma confidencial.</span>
                </div>
              </div>

            </form>
          </div>

          {/* Tarjeta de Canales (5 columnas) - Contiene el bloque de personas exacto */}
          <div className="lg:col-span-5 bg-[#f0f7f4] p-8 rounded-2xl border border-[#e1ede8] space-y-6">

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-4 h-[2px] bg-[#d4a373]"></span>
                <span className="text-[10px] font-mono tracking-widest text-gray-600 uppercase font-semibold">
                  Nuestros Canales
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#0b1b3d] mt-1">
                También puedes comunicarte con nosotros
              </h3>
            </div>

            <div className="space-y-4 text-sm">

              {/* WhatsApp Item */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3.5 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#2e7d32] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.79.66 2.65a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.43-1.43a2 2 0 0 1 2.11-.45c.86.32 1.75.54 2.65.66A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#0b1b3d] text-xs">WhatsApp / Teléfono</p>
                  <p className="text-[#0b5345] font-bold text-sm mt-0.5">+51 999 999 999</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Respuesta directa en horario de oficina.</p>
                </div>
              </div>

              {/* Correo Item */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3.5 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#2e7d32] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#0b1b3d] text-xs">Correo</p>
                  <p className="text-[#0b5345] font-semibold text-sm mt-0.5">contacto@formasalud.pe</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Para consultas institucionales, convenios y solicitudes formales.</p>
                </div>
              </div>

              {/* Sede Item */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3.5 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#2e7d32] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#0b1b3d] text-xs">Sede</p>
                  <p className="text-[#0b1b3d] font-semibold text-sm mt-0.5">Lima, Perú</p>
                  <p className="text-[10px] text-gray-400 tracking-wide uppercase mt-0.5">GRUPO PAUCAR PERÚ S.A.C.</p>
                </div>
              </div>

            </div>

            {/* Bloque inferior interno de la tarjeta con el ícono de personas, textos y guion horizontal */}
            <div className="pt-4 border-t border-[#d8e8e2] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="text-[#0b5345] shrink-0">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-[#0b1b3d] block">Formación en salud</span>
                  <span className="text-gray-600 block">para un mejor mañana</span>
                </div>
              </div>
              <span className="w-8 h-[1px] bg-[#94a3b8] shrink-0"></span>
            </div>

          </div>

        </div>

      </div>

      {/* Franja Inferior Completa (Con el libro abierto y texto largo original) */}
      <div className="w-full bg-[#f0f7f4] border-t border-b border-[#e1ede8] py-6 px-4 sm:px-8 lg:px-16 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

          <div className="flex items-center gap-4">
            <div className="text-[#0b5345] shrink-0">
              <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Seguimos construyendo una comunidad de profesionales comprometidos con la salud del Perú.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden lg:block w-12 h-[1px] bg-[#94a3b8]"></span>
            <span className="font-mono text-[11px] tracking-widest text-gray-500 uppercase">
              Conocimiento que transforma
            </span>
          </div>

        </div>
      </div>

    </section>
  );
}