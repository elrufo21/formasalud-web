"use client";

import React, { useMemo, useState } from "react";
import { Search, X, Sparkles, BookOpen, Filter, MessageCircle } from "lucide-react";
import type { PublicCourse } from "@/lib/api";
import { CourseCard } from "./CourseCard";

const PROGRAM_FILTERS = [
  { id: "all", label: "Todos los Programas" },
  { id: "course", label: "Cursos" },
  { id: "diploma", label: "Diplomados" },
  { id: "workshop", label: "Talleres Clínicos" },
  { id: "specialization", label: "Especializaciones" },
];

export function CourseFilters({ courses }: { courses: PublicCourse[] }) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const normalize = (value: string) =>
    value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const filteredCourses = useMemo(() => {
    let result = courses;

    if (selectedType !== "all") {
      result = result.filter((course) => (course.program_type || "course") === selectedType);
    }

    const query = normalize(search.trim());
    if (query) {
      result = result.filter(
        (course) =>
          normalize(course.title).includes(query) ||
          normalize(course.short_description || "").includes(query) ||
          normalize(course.description || "").includes(query),
      );
    }

    return result;
  }, [courses, search, selectedType]);

  return (
    <div className="space-y-8">
      {/* Header institucional del catálogo */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-line">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tealtint border border-teal/30 text-[11px] font-bold text-teal uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal" />
            <span>Oferta Académica Vigente 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy font-serif tracking-tight">
            Catálogo Oficial de Cursos y Programas
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-soft leading-relaxed">
            Explora nuestros programas formativos orientados a la actualización clínica, gestión de la salud y desarrollo profesional de alto impacto con certificación oficial con código QR.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto bg-bg-alt px-4 py-2.5 rounded-2xl border border-line">
          <BookOpen className="w-4 h-4 text-teal" />
          <span className="text-xs font-bold text-navy">
            {filteredCourses.length} de {courses.length} {courses.length === 1 ? "programa" : "programas"}
          </span>
        </div>
      </div>

      {/* Controles de Búsqueda y Filtros Rápidos */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Barra de búsqueda interactiva */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-ink-soft/70 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, especialidad o tema..."
            aria-label="Buscar curso por nombre"
            className="w-full pl-11 pr-10 py-3 rounded-2xl border border-line bg-white text-sm text-ink placeholder:text-ink-soft/70 shadow-2xs focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-ink-soft hover:text-navy rounded-full transition-colors"
              aria-label="Borrar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Chips de Categorías */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {PROGRAM_FILTERS.map((tab) => {
            const isActive = selectedType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-navy text-white shadow-xs font-bold"
                    : "bg-white text-ink-soft hover:text-navy border border-line hover:border-teal/40"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de Cursos */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2">
          {filteredCourses.map((course) => (
            <CourseCard key={course.course_id} course={course} />
          ))}
        </div>
      ) : (
        <div className="py-16 px-6 text-center bg-white rounded-3xl border border-line shadow-xs max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-tealtint text-teal flex items-center justify-center mx-auto border border-teal/20">
            <Filter className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-navy font-serif">
              No encontramos cursos con esos criterios
            </h3>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed max-w-md mx-auto">
              Prueba buscando con otras palabras clave o restablece los filtros para ver todos los cursos disponibles.
            </p>
          </div>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setSearch("");
                setSelectedType("all");
              }}
              className="px-5 py-2.5 rounded-xl bg-teal text-white text-xs font-bold hover:bg-tealdeep transition-colors"
            >
              Restablecer filtros
            </button>
            <a
              href="https://wa.me/51939584395?text=Hola%20FORMASALUD,%20quisiera%20consultar%20sobre%20pr%C3%B3ximos%20cursos%20disponibles."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-bg-alt text-navy border border-line text-xs font-bold hover:bg-white transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
