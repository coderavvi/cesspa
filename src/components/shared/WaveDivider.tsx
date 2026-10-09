import React from "react";
import { cn } from "@/lib/utils";

interface WaveDividerProps {
  position?: "top" | "bottom";
  fillColor?: string; // e.g. '#0B4A2B' or '#EEF3EA' or '#F7F9F5'
  hasGoldHairline?: boolean;
  className?: string;
  height?: number;
}

export function WaveDivider({
  position = "bottom",
  fillColor = "#0b4a2b",
  hasGoldHairline = true,
  className,
  height = 54,
}: WaveDividerProps) {
  const isTop = position === "top";

  return (
    <div
      className={cn(
        "w-full overflow-hidden leading-none select-none pointer-events-none relative z-10",
        isTop ? "-mb-px" : "-mt-px",
        className
      )}
      style={{ height }}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={cn("w-full h-full block", isTop && "rotate-180")}
      >
        {/* Curved Green / Background Wave */}
        <path
          d="M0 0C240 75 480 115 720 115C960 115 1200 75 1440 0V120H0V0Z"
          fill={fillColor}
        />
        {/* Subtle Gold Hairline Accent following the curve */}
        {hasGoldHairline && (
          <path
            d="M0 0C240 75 480 115 720 115C960 115 1200 75 1440 0"
            stroke="#B8892B"
            strokeWidth="3.5"
            strokeOpacity="0.85"
            fill="none"
          />
        )}
      </svg>
    </div>
  );
}
