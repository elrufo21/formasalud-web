"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, FileText, CheckCircle2, PlayCircle } from "lucide-react";
import { StudentHeader } from "@/features/student/components/StudentHeader";

export default function CourseDetailPage() {
    return (
        <div className="flex-1 flex flex-col">
            <StudentHeader
                title="Detalle del Curso"
                subtitle="Visualiza el contenido, clases y materiales de tu programa académico."
                actionButton={
                    <Link
                        href="/aula"
                        className="px-4 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navyink transition-all flex items-center gap-1.5 shadow-xs"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Regresar a Mis Cursos</span>
                    </Link>
                }
            />

            <main className="p-6 max-w-6xl w-full mx-auto space-y-6">
                {/* Banner principal del curso (Estático / Maqueta) */}
                <div className="p-8 rounded-2xl bg-gradient-to-r from-navy to-teal text-white shadow-md space-y-4 relative overflow-hidden">
                    <div className="relative z-10 space-y-2 max-w-2xl">
                        <span className="inline-block px-3 py-1 rounded-full bg-gold text-navy text-[11px] font-mono font-bold uppercase tracking-wider">
                            Curso Activo
                        </span>
                        <h1 className="font-serif text-2xl sm:text-3xl font-bold">
                            Diplomado en Gestión Farmacéutica y Atención de Salud
                        </h1>
                        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                            Capacitación especializada orientada al manejo integral de oficinas farmacéuticas, dispensación y normativas de salud vigentes.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4 pt-2 relative z-10 text-xs text-white/90 font-medium">
                        <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-lg">
                            <Clock className="w-4 h-4 text-gold" /> 120 Horas Académicas
                        </span>
                        <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-lg">
                            <BookOpen className="w-4 h-4 text-gold" /> 6 Módulos de Estudio
                        </span>
                    </div>
                </div>

                {/* Contenido / Módulos de la Maqueta */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Listado de Clases / Módulos */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="font-serif font-bold text-lg text-navy">Módulos del Programa</h3>

                        <div className="space-y-3">
                            {/* Módulo 1 */}
                            <div className="p-4 rounded-xl bg-white border border-line shadow-xs flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-teal/10 text-teal flex items-center justify-center font-bold">
                                        1
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm text-navy">Introducción a la Gestión Farmacéutica</h4>
                                        <p className="text-xs text-ink-soft">Fundamentos y normativas iniciales</p>
                                    </div>
                                </div>
                                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Completado
                                </span>
                            </div>

                            {/* Módulo 2 */}
                            <div className="p-4 rounded-xl bg-white border border-line shadow-xs flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-teal/10 text-teal flex items-center justify-center font-bold">
                                        2
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm text-navy">Farmacología Aplicada y Dispensación</h4>
                                        <p className="text-xs text-ink-soft">Clase en vivo y sesiones grabadas</p>
                                    </div>
                                </div>
                                <span className="flex items-center gap-1 text-xs font-semibold text-teal bg-teal/10 px-2.5 py-1 rounded-full">
                                    <PlayCircle className="w-3.5 h-3.5" /> En curso
                                </span>
                            </div>

                            {/* Módulo 3 */}
                            <div className="p-4 rounded-xl bg-white border border-line shadow-xs flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-ink-soft/10 text-ink-soft flex items-center justify-center font-bold">
                                        3
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm text-navy">Legislación y Buenas Prácticas de Almacenamiento</h4>
                                        <p className="text-xs text-ink-soft">Próximamente disponible</p>
                                    </div>
                                </div>
                                <span className="text-xs text-ink-soft bg-line px-2.5 py-1 rounded-full font-medium">
                                    Bloqueado
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Panel Lateral: Recursos y Profesor */}
                    <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-white border border-line shadow-xs space-y-4">
                            <h3 className="font-serif font-bold text-base text-navy">Recursos del Curso</h3>
                            <ul className="space-y-2 text-xs">
                                <li>
                                    <a href="#" className="p-2.5 rounded-lg bg-line/50 hover:bg-line transition-colors flex items-center justify-between text-navy font-medium">
                                        <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-teal" /> Sílabo del Curso.pdf</span>
                                        <span className="text-teal font-bold">Descargar</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="p-2.5 rounded-lg bg-line/50 hover:bg-line transition-colors flex items-center justify-between text-navy font-medium">
                                        <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-teal" /> Guía de Normativas.pdf</span>
                                        <span className="text-teal font-bold">Descargar</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}