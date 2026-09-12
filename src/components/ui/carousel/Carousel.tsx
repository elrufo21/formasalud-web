"use client";

/**
 * Carousel — componente padre reutilizable basado en Embla Carousel.
 * https://www.embla-carousel.com/get-started/react/
 *
 * Encapsula la lógica de Embla (viewport, drag, botones prev/next y
 * paginación por puntos) para que cualquier sección del sitio pueda
 * mostrar sus tarjetas "en una sola fila" dentro de un carrusel,
 * sin repetir la configuración cada vez.
 *
 * Uso:
 * <Carousel slideClassName="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
 *   {items.map((item) => <Card key={item.id} {...item} />)}
 * </Carousel>
 */

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";

interface CarouselProps {
  /** Tarjetas/slides del carrusel. Cada hijo se convierte en un slide. */
  children: React.ReactNode[];
  /** Opciones nativas de Embla (loop, align, dragFree, etc.) */
  options?: EmblaOptionsType;
  /**
   * Clases Tailwind que definen cuánto ocupa cada slide del ancho total
   * (ej. "flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]").
   * Por defecto muestra 1 slide por vista.
   */
  slideClassName?: string;
  /** Espaciado horizontal entre slides (clase de gap/padding Tailwind). */
  gapClassName?: string;
  /** Muestra los botones circulares de navegación prev/next. */
  showArrows?: boolean;
  /** Muestra la paginación por puntos debajo del carrusel. */
  showDots?: boolean;
  /** Muestra el contador "1 / N" (estilo usado en la web de referencia). */
  showCounter?: boolean;
  className?: string;
}

export function Carousel({
  children,
  options,
  slideClassName = "flex-[0_0_100%]",
  gapClassName = "pl-4 sm:pl-6",
  showArrows = true,
  showDots = true,
  showCounter = false,
  className = "",
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
    ...options,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    // Patrón oficial de Embla Carousel: sincroniza el estado de React con el
    // motor del carrusel al montar y en cada reInit (ej. cambia el nº de slides).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const childArray = React.Children.toArray(children);
  const hasMultipleSlides = scrollSnaps.length > 1;

  return (
    <div className={`relative ${className}`}>
      {/* Contador estilo "1 / N" (opcional, arriba a la derecha) */}
      {showCounter && hasMultipleSlides && (
        <div className="flex justify-end mb-3">
          <span className="font-mono text-xs text-ink-soft">
            {selectedIndex + 1} / {scrollSnaps.length}
          </span>
        </div>
      )}

      {/* Viewport del carrusel */}
      <div className="overflow-hidden -mx-1 px-1" ref={emblaRef}>
        <div className="flex -ml-4 sm:-ml-6">
          {childArray.map((child, index) => (
            <div key={index} className={`min-w-0 shrink-0 grow-0 ${gapClassName} ${slideClassName}`}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Botones circulares prev/next */}
      {showArrows && hasMultipleSlides && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Anterior"
            className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-5 z-10 w-11 h-11 rounded-full bg-white border border-line shadow-md items-center justify-center text-navy hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Siguiente"
            className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-5 z-10 w-11 h-11 rounded-full bg-white border border-line shadow-md items-center justify-center text-navy hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {/* Paginación por puntos */}
      {showDots && hasMultipleSlides && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Ir al grupo ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === selectedIndex ? "w-6 bg-teal" : "w-2 bg-line-strong hover:bg-teal/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
