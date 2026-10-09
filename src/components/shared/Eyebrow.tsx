import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  chip?: string | number; // e.g. "01", "2026", "FRAMEWORK"
  className?: string;
  lightMode?: boolean;
}

export function Eyebrow({ children, chip, className, lightMode = false }: EyebrowProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 mb-3.5", className)}>
      {chip !== undefined && (
        <span
          className={cn(
            "inline-flex items-center justify-center font-sans font-bold text-[10px] tracking-wider px-2.5 py-0.5 rounded-full border shadow-xs",
            lightMode
              ? "bg-heritage-gold/20 border-heritage-gold-soft/40 text-heritage-gold-soft"
              : "bg-forest-green/10 border-forest-green/20 text-forest-green"
          )}
        >
          {typeof chip === "number" && chip < 10 ? `0${chip}` : chip}
        </span>
      )}
      <span
        className={cn(
          "font-sans font-semibold text-xs tracking-[0.2em] uppercase",
          lightMode ? "text-heritage-gold-soft" : "text-heritage-gold"
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          "h-px w-8 rounded-full",
          lightMode
            ? "bg-gradient-to-r from-heritage-gold-soft/60 to-transparent"
            : "bg-gradient-to-r from-heritage-gold/70 to-transparent"
        )}
      />
    </div>
  );
}
