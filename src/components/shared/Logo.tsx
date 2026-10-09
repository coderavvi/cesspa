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
    sm: { seal: 38, textTitle: "text-base", textSub: "text-[10px]" },
    md: { seal: 48, textTitle: "text-xl", textSub: "text-xs" },
    lg: { seal: 68, textTitle: "text-2xl", textSub: "text-sm" },
  }[size];

  const content = (
    <div className={cn("inline-flex items-center gap-3 select-none group", className)}>
      {/* Circular Seal */}
      {(variant === "seal-only" || variant === "full") && (
        <div
          className={cn(
            "relative rounded-full shrink-0 overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105",
            "ring-2 ring-heritage-gold/30"
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

      {/* Wordmark */}
      {(variant === "wordmark" || variant === "full") && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "font-extrabold tracking-tight font-montserrat uppercase",
                dimensions.textTitle,
                lightMode ? "text-white" : "text-forest-green"
              )}
            >
              CESSPA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-heritage-gold shrink-0 mb-0.5" />
          </div>
          <span
            className={cn(
              "font-medium tracking-wide uppercase line-clamp-1 max-w-[280px] sm:max-w-xs",
              dimensions.textSub,
              lightMode ? "text-sage-mist/80" : "text-ink-body"
            )}
          >
            Certified Environmental & Social Standards Professionals Association
          </span>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
