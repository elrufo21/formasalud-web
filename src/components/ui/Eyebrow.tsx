import React from "react";

interface EyebrowProps {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}

export function Eyebrow({ children, onDark = false, className = "" }: EyebrowProps) {
  return (
    <div className={`eyebrow ${onDark ? "on-dark" : ""} ${className}`}>
      {children}
    </div>
  );
}
