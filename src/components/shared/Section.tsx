import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: "ivory" | "sage" | "dark" | "white";
  containerSize?: "default" | "narrow" | "wide" | "full";
  pattern?: "none" | "dots" | "leaf";
  className?: string;
  containerClassName?: string;
}

export function Section({
  children,
  variant = "ivory",
  containerSize = "default",
  pattern = "none",
  className,
  containerClassName,
  ...props
}: SectionProps) {
  const bgStyles = {
    ivory: "bg-ivory text-ink-body",
    sage: "bg-sage-mist text-ink-body",
    dark: "bg-[#052115] text-sage-mist",
    white: "bg-white text-ink-body",
  }[variant];

  const maxStyles = {
    default: "max-w-[1360px]",
    narrow: "max-w-[920px]",
    wide: "max-w-[1440px]",
    full: "max-w-none px-0",
  }[containerSize];

  return (
    <section
      className={cn(
        "relative py-16 md:py-24 lg:py-28 overflow-hidden transition-colors",
        bgStyles,
        className
      )}
      {...props}
    >
      {/* Background Motifs */}
      {pattern === "dots" && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none opacity-40 z-0",
            variant === "dark" ? "pattern-dots-white opacity-20" : "pattern-dots"
          )}
        />
      )}

      {/* Container */}
      <div
        className={cn(
          "relative z-10 mx-auto px-4 sm:px-6 lg:px-8",
          maxStyles,
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
