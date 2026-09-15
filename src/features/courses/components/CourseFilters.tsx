"use client";

import React, { useMemo, useState } from "react";
import { COURSES_DATA, Course } from "../data/courses";
import { CourseCard } from "./CourseCard";
import { CourseDetailModal } from "./CourseDetailModal";

const TABS = [
  { id: "all", label: "Todos los programas" },
  { id: "diplomado", label: "Diplomados" },
  { id: "curso", label: "Cursos Clínicos" },
  { id: "gestion", label: "Gestión Sanitaria" },
  { id: "ia", label: "IA & Salud Digital" },
  { id: "taller", label: "Talleres Prácticos" },
];

export function CourseFilters() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const normalize = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filteredCourses = useMemo(() => {
    const byCategory =
      activeTab === "all" ? COURSES_DATA : COURSES_DATA.filter((c) => c.category === activeTab);

    const query = normalize(search.trim());
    if (!query) return byCategory;

    return byCategory.filter((c) => normalize(c.title).includes(query));
  }, [activeTab, search]);

  return (
    <div>
      {/* Category Tabs Header - Responsive Horizontal Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar border-b border-line">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const count =
            tab.id === "all"
              ? COURSES_DATA.length
              : COURSES_DATA.filter((c) => c.category === tab.id).length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-full font-medium text-xs md:text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer flex-none ${
                isActive
                  ? "bg-navy text-white shadow-md font-semibold ring-2 ring-navy/20"
                  : "bg-paper text-ink-soft hover:bg-bg-alt hover:text-navy border border-line"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                  isActive ? "bg-gold text-navyink font-bold" : "bg-line text-ink-soft"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Buscador por nombre del curso */}
      <div className="relative mb-8 max-w-md">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar curso por nombre..."
          className="w-full pl-10 pr-4 py-3 rounded-full border border-line bg-white text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
        />
      </div>

      {/* Grilla normal de cursos (sin carrusel) */}
      {filteredCourses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} onViewDetails={setSelectedCourse} />
          ))}
        </div>
      )}

      {filteredCourses.length === 0 && (
        <div className="py-16 text-center text-ink-soft font-serif bg-bg-alt rounded-2xl border border-line">
          <p className="text-base">No hay cursos disponibles con esos criterios de búsqueda.</p>
          <button
            onClick={() => {
              setActiveTab("all");
              setSearch("");
            }}
            className="mt-3 text-sm text-teal font-semibold hover:underline cursor-pointer"
          >
            Ver todos los programas
          </button>
        </div>
      )}

      <CourseDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
}
