"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";

interface CarouselProps {
  children: React.ReactNode[];
  options?: EmblaOptionsType;
  slideClassName?: string;
  gapClassName?: string;
  showArrows?: boolean;
  showDots?: boolean;
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
    loop: true,
    align: "center",
    skipSnaps: false,
    ...options,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const childArray = React.Children.toArray(children);
  const hasMultipleSlides = childArray.length > 1;

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(
    (api: NonNullable<typeof emblaApi>) => {
      setSelectedIndex(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={`relative ${className}`}>
      {showCounter && hasMultipleSlides && (
        <div className="mb-3 flex justify-end">
          <span className="font-mono text-xs text-ink-soft">
            {selectedIndex + 1} / {scrollSnaps.length}
          </span>
        </div>
      )}

      <div className="overflow-hidden px-1 py-3" ref={emblaRef}>
        <div className="flex -ml-4 sm:-ml-6">
          {childArray.map((child, index) => (
            <div
              key={index}
              className={`min-w-0 shrink-0 grow-0 ${gapClassName} ${slideClassName}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && hasMultipleSlides && (
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Testimonio anterior"
          className="absolute left-0 top-1/2 z-30 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-teal shadow-[0_5px_18px_rgba(15,61,74,0.15)] transition-all duration-200 hover:scale-105 hover:bg-teal hover:text-white sm:h-12 sm:w-12 lg:left-[-2px]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {showArrows && hasMultipleSlides && (
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Siguiente testimonio"
          className="absolute right-0 top-1/2 z-30 flex h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-teal shadow-[0_5px_18px_rgba(15,61,74,0.15)] transition-all duration-200 hover:scale-105 hover:bg-teal hover:text-white sm:h-12 sm:w-12 lg:right-[-2px]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {showDots && hasMultipleSlides && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {childArray.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Ir al testimonio ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${index === selectedIndex
                ? "w-7 bg-teal"
                : "w-2 bg-[#c9dddd] hover:bg-teal/50"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}