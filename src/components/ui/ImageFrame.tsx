import React from "react";
import Image from "next/image";

interface ImageFrameProps {
  src: string;
  alt: string;
  /** Tailwind aspect-ratio class, e.g. "aspect-[3/4]" (default) or "aspect-square". */
  aspectClassName?: string;
  /** Size of the diagonal corner cut, in pixels. Set to 0 to disable. */
  cut?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Stylized frame for standalone marketing images (flyers, event art, etc).
 *
 * Instead of a plain square/rectangular <Image>, this wraps it in a
 * brand-consistent frame: a soft ambient glow, a hairline gold border,
 * corner registration marks (echoing `.reg-frame` used elsewhere in the
 * site), and one clipped corner so the shape reads as designed rather
 * than a default image box.
 */
export function ImageFrame({
  src,
  alt,
  aspectClassName = "aspect-[3/4]",
  cut = 26,
  priority = false,
  sizes = "(max-width: 640px) 220px, (max-width: 1024px) 300px, 380px",
  className = "",
}: ImageFrameProps) {
  const clipPath =
    cut > 0
      ? `polygon(0 0, calc(100% - ${cut}px) 0, 100% ${cut}px, 100% 100%, 0 100%)`
      : undefined;

  return (
    <div className={`relative ${className}`}>
      {/* Halo dorado ambiente, coherente con el resto del hero */}
      <div className="absolute -inset-3 -z-10 rounded-[28px] bg-gold/20 blur-2xl" />

      {/* Marco exterior: borde + esquina cortada */}
      <div
        className={`reg-frame relative w-full overflow-hidden rounded-[20px] border border-gold/50 bg-navy shadow-[0_20px_45px_-10px_rgba(0,0,0,0.55)] ${aspectClassName}`}
        style={{ clipPath }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />

        {/* Hairline interior para dar profundidad al recorte */}
        <div
          className="pointer-events-none absolute inset-0 border border-white/10"
          style={{ clipPath }}
        />

        {/* Acento dorado sobre el corte de la esquina */}
        {cut > 0 && (
          <div
            className="pointer-events-none absolute right-0 top-0 bg-gradient-to-bl from-gold/80 to-transparent"
            style={{ width: cut * 1.6, height: cut * 1.6 }}
          />
        )}
      </div>
    </div>
  );
}
