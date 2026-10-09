"use client";

import React, { useState, useEffect } from "react";
import { ClipboardList, Cog, Search, TrendingUp, Sprout, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    id: "plan",
    name: "PLAN",
    icon: ClipboardList,
    description: "Identify baseline environmental receptors, community assets & establish risk mitigation hierarchy.",
    details: "Formulate Environmental & Social Management Plans (ESMP) prior to ground-breaking.",
  },
  {
    id: "implement",
    name: "IMPLEMENT",
    icon: Cog,
    description: "Execute engineered safeguards, community agreements & stakeholder engagements.",
    details: "Integrate mitigation protocols into contractor requirements and procurement contracts.",
  },
  {
    id: "monitor",
    name: "MONITOR",
    icon: Search,
    description: "Systematic field measurements of air, water, biodiversity, and community impacts.",
    details: "Deploy calibrated sensors, site inspections, and regular grievance mechanism logs.",
  },
  {
    id: "evaluate",
    name: "EVALUATE",
    icon: TrendingUp,
    description: "Compare empirical field telemetry against baseline standards and statutory EIA approvals.",
    details: "Identify variances, cumulative effects, and early warning threshold exceedances.",
  },
  {
    id: "improve",
    name: "IMPROVE",
    icon: Sprout,
    description: "Corrective intervention, standard refinement, and sustainable continuous elevation.",
    details: "Close out corrective actions with host communities and update institutional learning.",
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
        "rounded-2xl border border-brand-border bg-white p-6 sm:p-8 shadow-sm",
        className
      )}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Interactive Cycle Hub */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 shrink-0 flex items-center justify-center">
          {/* Circular Connecting Line */}
          <div className="absolute inset-4 rounded-full border-2 border-dashed border-leaf-accent/30 animate-spin-slow pointer-events-none" />

          {/* Centre Improvement Seedling Core */}
          <button
            onClick={() => setActiveStage(4)}
            className={cn(
              "w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 z-10",
              activeStage === 4
                ? "bg-forest-green text-white shadow-lg ring-4 ring-heritage-gold/50 scale-105"
                : "bg-sage-mist text-forest-green hover:bg-forest-green/10"
            )}
          >
            <Sprout className={cn("w-7 h-7 mb-0.5", activeStage === 4 ? "text-leaf-accent" : "text-leaf-green")} />
            <span className="font-montserrat font-bold text-xs tracking-wider">IMPROVE</span>
          </button>

          {/* 4 Outer Orbital Nodes */}
          {[0, 1, 2, 3].map((idx) => {
            const stage = STAGES[idx];
            const Icon = stage.icon;
            const isActive = activeStage === idx;

            // Coordinates for circular positioning (Top, Right, Bottom, Left)
            const positions = [
              "top-0 left-1/2 -translate-x-1/2", // Plan (Top)
              "top-1/2 right-0 -translate-y-1/2", // Implement (Right)
              "bottom-0 left-1/2 -translate-x-1/2", // Monitor (Bottom)
              "top-1/2 left-0 -translate-y-1/2", // Evaluate (Left)
            ];

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={cn(
                  "absolute z-20 flex flex-col items-center justify-center w-16 h-16 sm:w-18 sm:h-18 rounded-2xl transition-all duration-300 group",
                  positions[idx],
                  isActive
                    ? "bg-forest-green text-white shadow-lg ring-3 ring-heritage-gold scale-110"
                    : "bg-sage-mist text-ink-body hover:bg-white hover:border-forest-green border border-brand-border"
                )}
                aria-label={stage.name}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 mb-0.5 transition-colors",
                    isActive ? "text-heritage-gold-soft" : "text-leaf-green"
                  )}
                />
                <span className="font-montserrat font-bold text-[10px] tracking-wider">
                  {stage.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Stage Details */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-forest-green text-white font-montserrat font-bold text-xs px-2.5 py-1 rounded-md">
              STAGE 0{activeStage + 1}
            </span>
            <span className="text-heritage-gold font-montserrat font-bold text-xs uppercase tracking-wider">
              CONTINUOUS CYCLE
            </span>
          </div>

          <h4 className="font-montserrat font-extrabold text-2xl text-ink-dark mb-2 flex items-center gap-2">
            {current.name}
            <ArrowRight className="w-5 h-5 text-leaf-accent" />
          </h4>

          <p className="text-ink-body text-sm sm:text-base leading-relaxed mb-4">
            {current.description}
          </p>

          <div className="p-3.5 rounded-xl bg-sage-mist/70 border border-brand-border/80 text-xs sm:text-sm text-ink-body flex items-start gap-2.5 mb-5">
            <CheckCircle2 className="w-4 h-4 text-leaf-green shrink-0 mt-0.5" />
            <span>{current.details}</span>
          </div>

          {/* Cycle Steps Selector Bar */}
          <div className="grid grid-cols-5 gap-1.5 pt-2 border-t border-brand-border/60">
            {STAGES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveStage(idx)}
                className={cn(
                  "py-1.5 px-1 rounded-md text-center font-montserrat text-[10px] sm:text-xs font-bold transition-all",
                  activeStage === idx
                    ? "bg-forest-green text-white"
                    : "bg-sage-mist text-ink-muted hover:text-ink-dark"
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
