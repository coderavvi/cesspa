import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  chip?: string | number; // e.g. "01", "02"
  className?: string;
  lightMode?: boolean;
}

export function Eyebrow({ children, chip, className, lightMode = false }: EyebrowProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 mb-3", className)}>
      {chip !== undefined && (
        <span
          className={cn(
            "inline-flex items-center justify-center font-montserrat font-bold text-xs tracking-wider px-2 py-0.5 rounded-md",
            lightMode
              ? "bg-heritage-gold text-forest-green"
              : "bg-forest-green text-white shadow-xs"
          )}
        >
          {typeof chip === "number" && chip < 10 ? `0${chip}` : chip}
        </span>
      )}
      <span
        className={cn(
          "font-montserrat font-bold text-xs md:text-sm tracking-widest uppercase",
          lightMode ? "text-heritage-gold-soft" : "text-heritage-gold"
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          "h-px w-6 rounded-full",
          lightMode ? "bg-heritage-gold/40" : "bg-heritage-gold/60"
        )}
      />
    </div>
  );
}
