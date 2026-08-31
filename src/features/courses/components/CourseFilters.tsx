"use client";

import React, { useState } from "react";
import { COURSES_DATA } from "../data/courses";
import { CourseCard } from "./CourseCard";

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

  const filteredCourses =
    activeTab === "all"
      ? COURSES_DATA
      : COURSES_DATA.filter((c) => c.category === activeTab);

  return (
    <div>
      {/* Category Tabs Header - Responsive Horizontal Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-line">
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

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="py-16 text-center text-ink-soft font-serif bg-bg-alt rounded-2xl border border-line">
          <p className="text-base">No hay cursos disponibles en esta categoría por el momento.</p>
          <button
            onClick={() => setActiveTab("all")}
            className="mt-3 text-sm text-teal font-semibold hover:underline cursor-pointer"
          >
            Ver todos los programas
          </button>
        </div>
      )}
    </div>
  );
}
