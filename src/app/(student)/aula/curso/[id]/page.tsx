"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    BookOpen,
    Clock,
    FileText,
    CheckCircle2,
    PlayCircle,
    Lock,
    ChevronRight,
    Video,
    FileCode,
    PenTool,
    HelpCircle,
    Award,
    Heart,
    ClipboardCheck,
    ShieldCheck,
} from "lucide-react";
import { StudentHeader } from "@/features/student/components/StudentHeader";

export default function CourseDetailPage() {
    const [activeTab, setActiveTab] = useState("video");

    return (
        <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
            <StudentHeader
                title="Aula Virtual"
                subtitle="Visualiza tus clases en video, materiales interactivos y evalúa tu progreso."
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

            <main className="p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-6">
                {/* Banner Principal del Curso */}
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-navy via-navyink to-teal text-white shadow-md relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-3 max-w-3xl relative z-10">
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-gold/20 text-gold border border-gold/30 text-[11px] font-mono font-bold uppercase tracking-wider">
                                PROGRAMA DE ACTUALIZACIÓN PROFESIONAL
                            </span>
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-bold uppercase tracking-wider">
                                EN CURSO
                            </span>
                        </div>
                        {/* Título en Blanco brillante */}
                        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                            Cuidados integrales del paciente crítico
                        </h1>
                        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                            Desarrolla habilidades clínicas con clases en video, presentaciones interactivas y recursos de aprendizaje especializados.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2 text-xs text-white/90 font-medium">
                            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                                <BookOpen className="w-4 h-4 text-gold" /> 3 Módulos
                            </span>
                            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                                <Video className="w-4 h-4 text-gold" /> 6 Clases
                            </span>
                            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                                <Clock className="w-4 h-4 text-gold" /> 120 Horas Académicas
                            </span>
                            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                                <Award className="w-4 h-4 text-gold" /> Certificación
                            </span>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center relative z-10 opacity-20 pr-6">
                        <Heart className="w-28 h-28 text-white fill-white" />
                    </div>
                </div>

                {/* Layout Principal: 3 Columnas */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* COLUMNA IZQUIERDA: Ruta de Aprendizaje */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                            <div>
                                <span className="text-[10px] font-bold text-teal uppercase tracking-widest block">TU RUTA DE APRENDIZAJE</span>
                                <h3 className="font-serif font-bold text-base text-navy">Contenido del curso</h3>
                            </div>

                            {/* Barra de progreso rápida */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-xs text-slate-500 font-medium">
                                    <span>2 de 6 clases completadas</span>
                                    <span className="font-bold text-navy">33%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-teal h-full w-1/3 rounded-full transition-all"></div>
                                </div>
                            </div>

                            {/* Acordeón de Módulos y Clases */}
                            <div className="space-y-3 pt-2">
                                {/* MÓDULO 01 */}
                                <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                                    <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-mono font-bold text-slate-400">01</span>
                                            <h4 className="text-xs font-bold text-navy">Fundamentos de cuidados críticos</h4>
                                            <p className="text-[10px] text-slate-400">2 de 2 clases</p>
                                        </div>
                                    </div>
                                    <div className="p-2 space-y-1">
                                        <button className="w-full p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs text-left flex items-start gap-2 border border-emerald-100">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-medium">1. Bienvenida y orientación del curso</p>
                                                <p className="text-[10px] text-emerald-600/80">12 min · Video + PPT</p>
                                            </div>
                                        </button>
                                        <button className="w-full p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs text-left flex items-start gap-2 border border-emerald-100">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-medium">2. Principios de atención al paciente</p>
                                                <p className="text-[10px] text-emerald-600/80">19 min · Video + PPT</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* MÓDULO 02 (Activo) */}
                                <div className="border border-teal/40 rounded-xl overflow-hidden bg-white shadow-xs">
                                    <div className="p-3 bg-teal/5 border-b border-teal/20 flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-mono font-bold text-teal">02</span>
                                            <h4 className="text-xs font-bold text-navy">Valoración clínica inicial</h4>
                                            <p className="text-[10px] text-teal font-medium">0 de 2 clases</p>
                                        </div>
                                    </div>
                                    <div className="p-2 space-y-1">
                                        <button className="w-full p-2 rounded-lg bg-teal/10 text-navy font-semibold text-xs text-left flex items-start gap-2 border border-teal/30">
                                            <PlayCircle className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-medium text-teal">1. Evaluación primaria: ABCDE</p>
                                                <p className="text-[10px] text-teal/80">24 min · Video + PPT</p>
                                            </div>
                                        </button>
                                        <button className="w-full p-2 rounded-lg hover:bg-slate-50 text-slate-600 text-xs text-left flex items-start gap-2 transition-colors">
                                            <PlayCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-medium">2. Monitorización y signos vitales</p>
                                                <p className="text-[10px] text-slate-400">28 min · Video + PPT</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* MÓDULO 03 (Bloqueado) */}
                                <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/30 opacity-75">
                                    <div className="p-3 bg-slate-100/50 flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-mono font-bold text-slate-400">03</span>
                                            <h4 className="text-xs font-bold text-slate-500">Intervención y seguimiento</h4>
                                            <p className="text-[10px] text-slate-400">0 de 2 clases</p>
                                        </div>
                                        <Lock className="w-4 h-4 text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Botón de Ayuda */}
                            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs space-y-1">
                                <div className="flex items-center gap-1.5 font-bold text-navy">
                                    <HelpCircle className="w-4 h-4 text-teal" /> ¿Necesitas ayuda?
                                </div>
                                <p className="text-[11px] text-slate-500">Te ayudamos con el acceso al material y a tus clases.</p>
                                <a href="#" className="text-teal font-semibold text-[11px] inline-flex items-center gap-1 hover:underline pt-1">
                                    Ver orientaciones →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA CENTRAL: Reproductor de Video y Contenido de la Clase */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">MÓDULO 02 - CLASE 01</span>
                                    <h2 className="font-serif font-bold text-lg text-navy">Evaluación primaria: ABCDE</h2>
                                </div>
                                <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                                    Acceso protegido
                                </span>
                            </div>

                            {/* Pestañas de Interacción */}
                            <div className="flex border-b border-slate-200 px-4 text-xs font-semibold text-slate-500 gap-4 overflow-x-auto">
                                <button
                                    onClick={() => setActiveTab("video")}
                                    className={`py-3 flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${activeTab === "video" ? "border-teal text-teal" : "border-transparent hover:text-navy"}`}
                                >
                                    <Video className="w-4 h-4" /> Video
                                </button>
                                <button
                                    onClick={() => setActiveTab("ppt")}
                                    className={`py-3 flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${activeTab === "ppt" ? "border-teal text-teal" : "border-transparent hover:text-navy"}`}
                                >
                                    <FileCode className="w-4 h-4" /> Presentación PPT
                                </button>
                                <button
                                    onClick={() => setActiveTab("apuntes")}
                                    className={`py-3 flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${activeTab === "apuntes" ? "border-teal text-teal" : "border-transparent hover:text-navy"}`}
                                >
                                    <PenTool className="w-4 h-4" /> Mis apuntes
                                </button>
                            </div>

                            {/* Área del Reproductor de Video */}
                            <div className="p-4">
                                <div className="aspect-video bg-slate-900 rounded-xl relative flex items-center justify-center overflow-hidden shadow-inner group">
                                    <div className="text-center text-white space-y-3 p-4 relative z-10">
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-teal-300">
                                            FORMA SALUD · AULA DIGITAL
                                        </span>
                                        <h3 className="text-base font-bold">Evaluación primaria: ABCDE</h3>
                                        <button className="w-12 h-12 rounded-full bg-teal hover:bg-teal/90 text-white flex items-center justify-center mx-auto shadow-lg transition-transform transform group-hover:scale-105">
                                            <PlayCircle className="w-8 h-8" />
                                        </button>
                                        <p className="text-[11px] text-slate-400">Presiona para reproducir la simulación</p>
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-2">
                                    * Video simulado para el prototipo. El reproductor real cargará desde el servidor streaming.
                                </p>
                            </div>

                            {/* Botones de Progreso y Siguiente Clase */}
                            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/30">
                                <p className="text-xs text-slate-500 text-center sm:text-left">
                                    Marca la clase como completada para avanzar.
                                </p>
                                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                                    <button className="px-3.5 py-2 rounded-xl border border-teal text-teal text-xs font-semibold hover:bg-teal/5 transition-all flex-1 sm:flex-none flex items-center justify-center gap-1 whitespace-nowrap">
                                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                        <span>Marcar completada</span>
                                    </button>
                                    <button className="px-3.5 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navyink transition-all flex-1 sm:flex-none flex items-center justify-center gap-1 shadow-xs whitespace-nowrap">
                                        <span>Siguiente clase</span>
                                        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Material Complementario */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg bg-teal/10 text-teal">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-navy">Material complementario</h4>
                                        <p className="text-[10px] text-slate-400">Accede al contenido de esta lección</p>
                                    </div>
                                </div>
                                <a href="#" className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between text-xs font-medium text-navy">
                                    <span>Presentación de la clase (.PPT)</span>
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                </a>
                            </div>

                            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg bg-teal/10 text-teal">
                                        <BookOpen className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-navy">Recomendación del docente</h4>
                                        <p className="text-[10px] text-slate-400">Para aprovechar mejor el módulo</p>
                                    </div>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Revisa el video, consulta las diapositivas y registra tus dudas antes de iniciar la evaluación final.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: Mi Progreso, Certificación, Evaluación y Controles de Demostración */}
                    <div className="lg:col-span-3 space-y-4">

                        {/* Card de Progreso Circular */}
                        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-left">MI PROGRESO</span>

                            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <path
                                        className="text-slate-100"
                                        strokeWidth="3.5"
                                        stroke="currentColor"
                                        fill="none"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                        className="text-teal"
                                        strokeDasharray="33, 100"
                                        strokeWidth="3.5"
                                        strokeLinecap="round"
                                        stroke="currentColor"
                                        fill="none"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-xl font-bold text-navy">33%</span>
                                    <span className="text-[9px] text-slate-400 uppercase font-semibold">Completado</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h4 className="font-bold text-xs text-navy">¡Vas por buen camino!</h4>
                                <p className="text-[11px] text-slate-500">Has completado 2 de 6 clases.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-center">
                                <div className="bg-slate-50 p-2 rounded-xl">
                                    <p className="text-xs font-bold text-navy">2/6</p>
                                    <p className="text-[10px] text-slate-400">Clases</p>
                                </div>
                                <div className="bg-slate-50 p-2 rounded-xl">
                                    <p className="text-xs font-bold text-navy">Pendiente</p>
                                    <p className="text-[10px] text-slate-400">Evaluación</p>
                                </div>
                            </div>
                        </div>

                        {/* Card de Certificación Académica */}
                        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                                <Award className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block">CERTIFICACIÓN ACADÉMICA</span>
                                <h4 className="font-serif font-bold text-sm text-navy">Tu certificado te espera</h4>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-normal">
                                Completa el curso y aprueba la evaluación final para obtener tu certificado oficial.
                            </p>
                            <ul className="text-[11px] text-slate-600 space-y-1.5 pt-1">
                                <li className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Completar el 100% de clases
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-300" /> Aprobar la evaluación final
                                </li>
                            </ul>
                            <button disabled className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-400 font-semibold text-xs cursor-not-allowed flex items-center justify-center gap-1">
                                <Lock className="w-3.5 h-3.5" /> Generar certificado
                            </button>
                        </div>

                        {/* Card de Evaluación del Curso */}
                        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                            <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center">
                                <ClipboardCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-teal uppercase tracking-widest block">VERIFICACIÓN FINAL</span>
                                <h4 className="font-serif font-bold text-sm text-navy">Evaluación del curso</h4>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-normal">
                                Se habilita al terminar todas tus clases.
                            </p>
                            <button disabled className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-400 font-semibold text-xs cursor-not-allowed flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors">
                                Evaluación bloqueada <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* Nota de Seguridad / Autenticación */}
                        <div className="flex items-start gap-2.5 px-2 text-[11px] text-slate-500 leading-relaxed">
                            <ShieldCheck className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                            <p>
                                Material protegido mediante autenticación. En producción, el servidor controla el acceso a cada lección.
                            </p>
                        </div>

                        {/* Controles Exclusivos de la Demostración */}
                        <div className="p-4 rounded-2xl border border-dashed border-slate-300 bg-white/50 space-y-2 text-[11px]">
                            <p className="font-bold text-navy uppercase font-mono tracking-wider text-[10px]">
                                CONTROLES EXCLUSIVOS DE ESTA DEMOSTRACIÓN
                            </p>
                            <div className="flex items-center justify-between gap-2 pt-1">
                                <button className="text-teal font-medium hover:underline">
                                    Simular curso completado
                                </button>
                                <button className="text-teal font-medium hover:underline">
                                    Reiniciar demostración
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}