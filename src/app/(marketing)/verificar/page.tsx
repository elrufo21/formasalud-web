"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Search, Award, CheckCircle2 } from "lucide-react";

export default function VerificarIndexPage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim();
    if (!cleanCode) return;
    router.push(`/verificar/${encodeURIComponent(cleanCode)}`);
  };

  return (
    <div className="bg-bg-alt min-h-[70vh] py-12 md:py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Cabecera de la sección */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tealtint text-teal text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Validación Pública Oficial</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mb-3">
            Verificación de Certificados
          </h1>
          <p className="text-ink-soft text-sm sm:text-base max-w-lg mx-auto">
            Ingrese el código alfanumérico impreso en su diploma físico o digital para comprobar su autenticidad, créditos académicos y horas lectivas.
          </p>
        </div>

        {/* Formulario de búsqueda */}
        <div className="bg-white rounded-xl shadow-lg border border-line p-6 sm:p-8 mb-8">
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                Código de Certificado
              </label>
              <div className="relative">
                <input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Ej: REG-0072-2026 o FS-2026-0001"
                  className="w-full pl-4 pr-12 py-3.5 rounded-lg border border-line text-ink font-mono text-base focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent uppercase transition-all"
                  required
                />
                <Award className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-soft pointer-events-none" />
              </div>
              <p className="text-xs text-ink-soft mt-2">
                También puede escanear directamente el código QR impreso en su diploma con la cámara de su celular.
              </p>
            </div>

            <button
              type="submit"
              disabled={!code.trim()}
              className="w-full bg-teal hover:bg-tealdeep text-white font-semibold py-3.5 px-6 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Verificar Autenticidad</span>
            </button>
          </form>
        </div>

        {/* Garantías de verificación */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-ink-soft">
          <div className="flex items-start gap-2.5 p-4 rounded-lg bg-white border border-line">
            <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
            <div>
              <strong className="text-ink block mb-0.5">Firma Digital e Inmutable</strong>
              Certificados respaldados institucionalmente por Grupo Paucar Perú S.A.C.
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-4 rounded-lg bg-white border border-line">
            <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
            <div>
              <strong className="text-ink block mb-0.5">Descarga Directa en PDF</strong>
              Acceso a la versión original de alta resolución lista para imprimir.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
