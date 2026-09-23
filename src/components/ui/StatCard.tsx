"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, description, icon, trend, className }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLHeadingElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const stringVal = String(value);
          const numericMatch = stringVal.match(/\d+/);

          if (!numericMatch) {
            setDisplayValue(stringVal);
            return;
          }

          const targetNum = parseInt(numericMatch[0], 10);
          const fullMatch = numericMatch[0];
          const startIndex = stringVal.indexOf(fullMatch);
          const prefix = stringVal.substring(0, startIndex);
          const suffix = stringVal.substring(startIndex + fullMatch.length);
          const isPadded = fullMatch.startsWith("0") && fullMatch.length > 1;
          const padLength = fullMatch.length;

          let startTimestamp: number | null = null;
          const duration = 2000; // Duración de la animación (2 segundos)

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const currentNum = Math.floor(easeProgress * targetNum);

            let formattedNum = String(currentNum);
            if (isPadded) {
              formattedNum = formattedNum.padStart(padLength, "0");
            }

            setDisplayValue(prefix + formattedNum + suffix);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setDisplayValue(value.toString());
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [value]);

  return (
    <div
      className={cn(
        "relative p-5 rounded-xl bg-white border border-line shadow-xs transition-all hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-ink-soft font-semibold">
            {title}
          </p>
          <h4 ref={ref} className="font-serif text-2xl sm:text-3xl font-bold text-navy mt-1.5">
            {displayValue}
          </h4>
          {description && <p className="text-xs text-ink-soft/80 mt-1">{description}</p>}
          {trend && (
            <p
              className={cn(
                "text-xs font-semibold mt-2 inline-flex items-center gap-1",
                trend.isPositive ? "text-teal" : "text-red-500"
              )}
            >
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{trend.value}</span>
            </p>
          )}
        </div>
        <div className="w-10 h-10 rounded-xl bg-tealtint text-teal flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}