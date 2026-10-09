import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "seal-only" | "wordmark" | "full";
  size?: "sm" | "md" | "lg";
  className?: string;
  linkToHome?: boolean;
  lightMode?: boolean; // if true, text adapts for dark backgrounds
}

export function Logo({
  variant = "full",
  size = "md",
  className,
  linkToHome = true,
  lightMode = false,
}: LogoProps) {
  const dimensions = {
    sm: { seal: 36, textTitle: "text-lg", textSub: "text-[9px]" },
    md: { seal: 46, textTitle: "text-xl", textSub: "text-[10px]" },
    lg: { seal: 62, textTitle: "text-3xl", textSub: "text-xs" },
  }[size];

  const content = (
    <div className={cn("inline-flex items-center gap-3 select-none group transition-opacity hover:opacity-95", className)}>
      {/* Renaissance Circular Seal with Gold Laurel Halo */}
      {(variant === "seal-only" || variant === "full") && (
        <div
          className={cn(
            "relative rounded-full shrink-0 overflow-hidden transition-all duration-500 group-hover:scale-105",
            "ring-2 ring-heritage-gold/60 shadow-[0_0_16px_rgba(199,150,44,0.25)] bg-deep-emerald"
          )}
          style={{ width: dimensions.seal, height: dimensions.seal }}
        >
          <Image
            src="/images/brand/logo.png"
            alt="CESSPA Official Seal"
            width={dimensions.seal * 2}
            height={dimensions.seal * 2}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      )}

      {/* Regal Wordmark */}
      {(variant === "wordmark" || variant === "full") && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "font-heading font-black tracking-wide",
                dimensions.textTitle,
                lightMode ? "text-white" : "text-forest-green"
              )}
            >
              CESSPA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] shrink-0 mb-0.5" />
          </div>
          <span
            className={cn(
              "font-sans font-semibold tracking-wider uppercase mt-1",
              dimensions.textSub,
              lightMode ? "text-[#4ade80]" : "text-ink-muted"
            )}
          >
            Environmental Standards • Nigeria
          </span>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        href="/"
        className="inline-block focus:outline-hidden focus-visible:ring-2 focus-visible:ring-heritage-gold rounded-lg"
      >
        {content}
      </Link>
    );
  }

  return content;
}
