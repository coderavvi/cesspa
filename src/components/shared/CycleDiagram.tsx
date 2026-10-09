"use client";

import React, { useState, useEffect } from "react";
import { ClipboardList, Cog, Search, TrendingUp, Sprout, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    id: "plan",
    name: "PLAN",
    icon: ClipboardList,
    description: "Identify baseline environmental receptors, host community assets, and formulate the mitigation hierarchy.",
    details: "Formulate Environmental & Social Management Plans (ESMP) prior to contract groundbreaking.",
  },
  {
    id: "implement",
    name: "IMPLEMENT",
    icon: Cog,
    description: "Execute engineered safeguards, community agreements, and continuous stakeholder engagement.",
    details: "Integrate mitigation protocols into binding contractor agreements and procurement covenants.",
  },
  {
    id: "monitor",
    name: "MONITOR",
    icon: Search,
    description: "Systematic field measurements of air, water, biodiversity, and community impacts.",
    details: "Deploy calibrated telemetry, multi-stakeholder audits, and accessible grievance logs.",
  },
  {
    id: "evaluate",
    name: "EVALUATE",
    icon: TrendingUp,
    description: "Compare empirical field telemetry against baseline standards and statutory EIA approvals.",
    details: "Identify variances, cumulative impacts, and threshold alerts before harms materialize.",
  },
  {
    id: "improve",
    name: "IMPROVE",
    icon: Sprout,
    description: "Adaptive mitigation refinement, corrective close-outs, and institutional learning.",
    details: "Close out corrective actions collaboratively with host communities and regulatory liaisons.",
  },
];

export function CycleDiagram({ className }: { className?: string }) {
  const [activeStage, setActiveStage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % STAGES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const current = STAGES[activeStage];

  return (
    <div
      className={cn(
        "rounded-3xl border border-heritage-gold/30 bg-white/90 backdrop-blur-md p-6 sm:p-10 shadow-lg",
        className
      )}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
        {/* Interactive Cycle Hub with Da Vinci Orbital Accents */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 shrink-0 flex items-center justify-center">
          {/* Orbital Concentric Ring */}
          <div className="absolute inset-4 rounded-full border border-heritage-gold/30 pointer-events-none" />
          <div className="absolute inset-8 rounded-full border border-dashed border-forest-green/20 animate-spin-slow pointer-events-none" />

          {/* Centre Improvement Core */}
          <button
            onClick={() => setActiveStage(4)}
            className={cn(
              "w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 z-10 cursor-pointer",
              activeStage === 4
                ? "bg-forest-green text-white shadow-xl ring-4 ring-heritage-gold/60 scale-105"
                : "bg-sage-mist text-forest-green hover:bg-forest-green/10"
            )}
          >
            <Sprout className={cn("w-7 h-7 mb-0.5", activeStage === 4 ? "text-heritage-gold-soft" : "text-leaf-green")} />
            <span className="font-sans font-bold text-xs tracking-wider">IMPROVE</span>
          </button>

          {/* 4 Outer Orbital Nodes */}
          {[0, 1, 2, 3].map((idx) => {
            const stage = STAGES[idx];
            const Icon = stage.icon;
            const isActive = activeStage === idx;

            const positions = [
              "top-0 left-1/2 -translate-x-1/2", // Plan
              "top-1/2 right-0 -translate-y-1/2", // Implement
              "bottom-0 left-1/2 -translate-x-1/2", // Monitor
              "top-1/2 left-0 -translate-y-1/2", // Evaluate
            ];

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={cn(
                  "absolute z-20 flex flex-col items-center justify-center w-16 h-16 sm:w-18 sm:h-18 rounded-2xl transition-all duration-300 group cursor-pointer",
                  positions[idx],
                  isActive
                    ? "bg-forest-green text-white shadow-xl ring-3 ring-heritage-gold scale-110"
                    : "bg-white text-ink-body hover:bg-sage-mist/70 hover:border-forest-green border border-brand-border shadow-xs"
                )}
                aria-label={stage.name}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 mb-0.5 transition-colors",
                    isActive ? "text-heritage-gold-soft" : "text-forest-green"
                  )}
                />
                <span className="font-sans font-bold text-[10px] tracking-wider">
                  {stage.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Stage Details */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-forest-green text-white font-sans font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              STAGE 0{activeStage + 1}
            </span>
            <span className="text-heritage-gold font-sans font-bold text-xs uppercase tracking-widest">
              LIFECYCLE TELEMETRY
            </span>
          </div>

          <h4 className="font-serif font-bold text-2xl sm:text-3xl text-ink-dark mb-2 flex items-center gap-2">
            <span>{current.name}</span>
            <ArrowRight className="w-5 h-5 text-heritage-gold" />
          </h4>

          <p className="font-sans text-ink-body text-sm sm:text-base leading-relaxed mb-4">
            {current.description}
          </p>

          <div className="p-4 rounded-2xl bg-sage-mist/70 border border-brand-border/80 text-xs sm:text-sm text-ink-body font-sans flex items-start gap-3 mb-6">
            <CheckCircle2 className="w-4 h-4 text-leaf-green shrink-0 mt-0.5" />
            <span>{current.details}</span>
          </div>

          {/* Cycle Steps Selector Bar */}
          <div className="grid grid-cols-5 gap-2 pt-2 border-t border-brand-border/60">
            {STAGES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveStage(idx)}
                className={cn(
                  "py-2 px-1 rounded-xl text-center font-sans text-[11px] font-bold transition-all cursor-pointer",
                  activeStage === idx
                    ? "bg-forest-green text-white shadow-xs"
                    : "bg-sage-mist/60 text-ink-muted hover:text-forest-green hover:bg-sage-mist"
                )}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
