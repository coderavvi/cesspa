"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  className?: string;
  lightMode?: boolean;
}

export function StatCounter({
  value,
  suffix = "+",
  prefix = "",
  label,
  sublabel,
  className,
  lightMode = false,
}: StatCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1600; // ms
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className={cn("flex flex-col items-center sm:items-start text-center sm:text-left", className)}>
      <div className="flex items-baseline gap-1">
        {prefix && (
          <span
            className={cn(
              "font-serif font-bold text-2xl md:text-3xl",
              lightMode ? "text-heritage-gold-soft" : "text-heritage-gold"
            )}
          >
            {prefix}
          </span>
        )}
        <span
          className={cn(
            "font-serif font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight tabular-nums",
            lightMode ? "text-white" : "text-forest-green"
          )}
        >
          {count}
        </span>
        {suffix && (
          <span
            className={cn(
              "font-sans font-bold text-xl md:text-2xl",
              lightMode ? "text-heritage-gold-soft" : "text-heritage-gold"
            )}
          >
            {suffix}
          </span>
        )}
      </div>
      <span
        className={cn(
          "font-sans font-bold text-xs tracking-wider uppercase mt-1",
          lightMode ? "text-sage-mist" : "text-ink-dark"
        )}
      >
        {label}
      </span>
      {sublabel && (
        <span
          className={cn(
            "text-xs font-sans mt-0.5 max-w-[180px] leading-tight",
            lightMode ? "text-sage-mist/75" : "text-ink-muted"
          )}
        >
          {sublabel}
        </span>
      )}
    </div>
  );
}
