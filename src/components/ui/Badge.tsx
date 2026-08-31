import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "teal" | "navy" | "tint" | "fire" | "outline";
  className?: string;
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "tint",
  size = "sm",
  className = "",
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-mono uppercase tracking-wider font-semibold rounded-full";

  const sizeStyles = {
    sm: "text-[10.5px] px-2.5 py-1",
    md: "text-xs px-3 py-1.5",
  };

  const variantStyles = {
    gold: "bg-gold text-navyink shadow-xs",
    teal: "bg-teal text-white",
    navy: "bg-navy text-white",
    tint: "bg-tealtint text-tealdeep",
    fire: "bg-[#E63946] text-white shadow-xs",
    outline: "border border-line text-ink-soft bg-paper",
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
