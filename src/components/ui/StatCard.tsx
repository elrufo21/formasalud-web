import React from "react";
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
          <h4 className="font-serif text-2xl sm:text-3xl font-bold text-navy mt-1.5">{value}</h4>
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
