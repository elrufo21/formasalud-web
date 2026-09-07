import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-ink-soft/60 pointer-events-none flex items-center">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink transition-all placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal disabled:cursor-not-allowed disabled:bg-bg-alt disabled:text-ink-soft",
              icon ? "pl-10" : "",
              error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-line",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-ink-soft">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
