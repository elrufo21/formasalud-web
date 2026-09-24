"use client";

import React from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { Course } from "@/lib/api";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Tipos y valores por defecto                                               */
/* -------------------------------------------------------------------------- */

export type PriceFilter = "all" | "free" | "paid";
export type CertificateFilter = "all" | "included" | "separate";
export type SortOption = "recent" | "price-asc" | "price-desc" | "title";

export interface CatalogFiltersState {
  search: string;
  /** Solo visual: la categoría aún no existe en la BD */
  category: string;
  /** Solo visual: la modalidad aún no existe en la BD */
  modality: string;
  price: PriceFilter;
  certificate: CertificateFilter;
  sort: SortOption;
}

export const DEFAULT_CATALOG_FILTERS: CatalogFiltersState = {
  search: "",
  category: "all",
  modality: "all",
  price: "all",
  certificate: "all",
  sort: "recent",
};

// TODO: reemplazar por las categorías reales cuando existan en la BD
const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "diplomado", label: "Diplomados" },
  { id: "curso", label: "Cursos Clínicos" },
  { id: "taller", label: "Talleres Prácticos" },
  { id: "gestion", label: "Gestión Sanitaria" },
  { id: "ia", label: "IA & Salud Digital" },
];

// TODO: reemplazar por las modalidades reales cuando existan en la BD
const MODALITIES = [
  { value: "all", label: "Todas" },
  { value: "virtual", label: "Virtual" },
  { value: "presencial", label: "Presencial" },
  { value: "hibrido", label: "Híbrido" },
];

const PRICES = [
  { value: "all", label: "Todos" },
  { value: "free", label: "Gratuitos" },
  { value: "paid", label: "De pago" },
];

const CERTIFICATES = [
  { value: "all", label: "Todos" },
  { value: "included", label: "Incluido" },
  { value: "separate", label: "Pago aparte" },
];

const SORTS = [
  { value: "recent", label: "Más recientes" },
  { value: "price-asc", label: "Menor precio" },
  { value: "price-desc", label: "Mayor precio" },
  { value: "title", label: "Nombre (A-Z)" },
];

/* -------------------------------------------------------------------------- */
/*  Lógica de filtrado (solo con campos que ya devuelve GET /course)          */
/* -------------------------------------------------------------------------- */

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function applyCatalogFilters(courses: Course[], filters: CatalogFiltersState) {
  const query = normalize(filters.search.trim());

  const result = courses.filter((course) => {
    const price = Number(course.price);

    if (query) {
      const haystack = normalize(`${course.title} ${course.short_description ?? ""}`);
      if (!haystack.includes(query)) return false;
    }
    if (filters.price === "free" && price !== 0) return false;
    if (filters.price === "paid" && price === 0) return false;
    if (filters.certificate === "included" && !course.certificate_included) return false;
    if (filters.certificate === "separate" && course.certificate_included) return false;

    // category y modality: pendientes de implementar en la BD
    return true;
  });

  const time = (c: Course) => new Date(c.published_at ?? c.created_at ?? 0).getTime() || 0;

  return [...result].sort((a, b) => {
    switch (filters.sort) {
      case "price-asc":
        return Number(a.price) - Number(b.price);
      case "price-desc":
        return Number(b.price) - Number(a.price);
      case "title":
        return a.title.localeCompare(b.title, "es");
      default:
        return time(b) - time(a);
    }
  });
}

export function countActiveFilters(filters: CatalogFiltersState) {
  return (Object.keys(DEFAULT_CATALOG_FILTERS) as (keyof CatalogFiltersState)[]).filter(
    (key) => key !== "sort" && filters[key] !== DEFAULT_CATALOG_FILTERS[key],
  ).length;
}

/* -------------------------------------------------------------------------- */
/*  Componentes                                                               */
/* -------------------------------------------------------------------------- */

interface FilterSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  const isActive = value !== options[0].value;

  return (
    <label className="flex flex-col gap-1 min-w-[140px] flex-1 sm:flex-none">
      <span className="text-[10px] font-mono uppercase tracking-wider text-ink-soft font-semibold">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full appearance-none pl-3 pr-8 py-2 rounded-xl border bg-white text-xs text-ink cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all",
            isActive ? "border-teal text-teal font-semibold" : "border-line",
          )}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-soft pointer-events-none" />
      </div>
    </label>
  );
}

interface CatalogFiltersProps {
  filters: CatalogFiltersState;
  onChange: (filters: CatalogFiltersState) => void;
  resultCount: number;
  totalCount: number;
}

export function CatalogFilters({
  filters,
  onChange,
  resultCount,
  totalCount,
}: CatalogFiltersProps) {
  const update = <K extends keyof CatalogFiltersState>(key: K, value: CatalogFiltersState[K]) =>
    onChange({ ...filters, [key]: value });

  const activeCount = countActiveFilters(filters);

  return (
    <section className="bg-white rounded-2xl border border-line shadow-xs p-4 sm:p-5 space-y-4">
      {/* Buscador + contador */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => update("search", e.target.value)}
            placeholder="Buscar curso por nombre o tema..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-line bg-bg-alt/40 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal focus:bg-white transition-all"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => update("search", "")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-ink-soft hover:bg-bg-alt hover:text-navy cursor-pointer"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>
              <b className="text-navy font-mono">{resultCount}</b> de {totalCount} cursos
            </span>
          </span>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => onChange(DEFAULT_CATALOG_FILTERS)}
              className="text-teal font-semibold hover:underline cursor-pointer"
            >
              Limpiar filtros ({activeCount})
            </button>
          )}
        </div>
      </div>

      {/* Categorías (solo visual por ahora) */}
      <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-1 px-1 pb-1">
        {CATEGORIES.map((cat) => {
          const isActive = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => update("category", cat.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex-none cursor-pointer",
                isActive
                  ? "bg-navy text-white shadow-sm font-semibold"
                  : "bg-bg-alt text-ink-soft hover:bg-tealtint hover:text-navy border border-line",
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Filtros secundarios */}
      <div className="flex flex-wrap items-end gap-3 pt-3 border-t border-line">
        <FilterSelect
          label="Modalidad"
          value={filters.modality}
          options={MODALITIES}
          onChange={(v) => update("modality", v)}
        />
        <FilterSelect
          label="Precio"
          value={filters.price}
          options={PRICES}
          onChange={(v) => update("price", v as PriceFilter)}
        />
        <FilterSelect
          label="Certificado"
          value={filters.certificate}
          options={CERTIFICATES}
          onChange={(v) => update("certificate", v as CertificateFilter)}
        />
        <div className="sm:ml-auto">
          <FilterSelect
            label="Ordenar por"
            value={filters.sort}
            options={SORTS}
            onChange={(v) => update("sort", v as SortOption)}
          />
        </div>
      </div>
    </section>
  );
}
