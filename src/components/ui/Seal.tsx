import React from "react";

interface SealProps {
  variant?: "dark" | "light";
  className?: string;
}

export function Seal({ variant = "dark", className = "" }: SealProps) {
  return (
    <svg
      className={`seal ${variant === "light" ? "on-light" : ""} ${className}`}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle className="ring" cx="100" cy="100" r="94" />
      <circle className="ring-strong" cx="100" cy="100" r="80" />
      <path id="sealPath" d="M100,20 a80,80 0 1,1 -0.1,0" fill="none" />
      <text fontSize="8.4" letterSpacing="3.4">
        <textPath href="#sealPath" startOffset="1%">
          FORMASALUD · CENTRO DE CAPACITACIÓN EN SALUD · LIMA — PERÚ ·
        </textPath>
      </text>
      <text x="100" y="94" textAnchor="middle" className="fs" fontSize="30">
        FS
      </text>
      <text
        x="100"
        y="116"
        textAnchor="middle"
        className="mono-txt"
        fontSize="8"
        letterSpacing="2"
      >
        EST. 2025
      </text>
    </svg>
  );
}
