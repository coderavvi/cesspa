"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Users,
  Calendar,
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { MOCK_CHAPTERS } from "@/lib/data/mockData";
import { NIGERIA_ZONES } from "@/lib/constants";

export default function ChaptersPage() {
  const [selectedZone, setSelectedZone] = useState<string>("All");

  const filteredChapters =
    selectedZone === "All"
      ? MOCK_CHAPTERS
      : MOCK_CHAPTERS.filter((c) => c.zone === selectedZone);

  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="NATIONWIDE" lightMode={true}>
            FEDERAL GEOPOLITICAL COVERAGE
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            CESSPA Geopolitical Chapters
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Inaugurated across all six geopolitical zones in October 2025. Connect with certified practitioners,
            attend monthly chapter roundtables, and drive localized safeguard advocacy in your state.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        {/* Zone Selector Filter Chips */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {["All", ...NIGERIA_ZONES.map((z) => z.name)].map((zone) => (
            <button
              key={zone}
              type="button"
              onClick={() => setSelectedZone(zone)}
              className={`px-4 py-2 rounded-xl font-montserrat font-bold text-xs uppercase tracking-wider transition-all ${
                selectedZone === zone
                  ? "bg-forest-green text-white shadow-md ring-2 ring-heritage-gold"
                  : "bg-white text-ink-body border border-brand-border hover:border-forest-green"
              }`}
            >
              {zone}
            </button>
          ))}
        </div>

        {/* Chapters Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChapters.map((chapter) => (
            <div
              key={chapter.id}
              className="rounded-3xl p-6 sm:p-8 bg-white border border-brand-border shadow-sm card-hover flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-montserrat font-bold text-xs text-heritage-gold uppercase tracking-wider">
                    {chapter.zone}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded text-[10px] uppercase">
                    {chapter.status}
                  </span>
                </div>

                <h3 className="font-montserrat font-extrabold text-xl text-ink-dark">
                  {chapter.name}
                </h3>

                {/* States Tag Cloud */}
                <div>
                  <span className="text-[10px] font-montserrat font-bold text-ink-muted uppercase tracking-wider block mb-1">
                    States Covered:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {chapter.statesCovered.map((st) => (
                      <span
                        key={st}
                        className="px-2 py-0.5 rounded-md bg-sage-mist/70 border border-brand-border/60 text-[11px] text-ink-body font-medium"
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Coordinator & Secretariat Info */}
                <div className="pt-3 border-t border-brand-border/60 space-y-2 text-xs text-ink-body">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-forest-green shrink-0" />
                    <div>
                      <span className="text-ink-muted text-[10px] block">Zonal Coordinator:</span>
                      <strong className="text-ink-dark">{chapter.coordinator}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-forest-green shrink-0" />
                    <div>
                      <span className="text-ink-muted text-[10px] block">Meeting Assembly:</span>
                      <span>{chapter.meetingSchedule}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-forest-green shrink-0" />
                    <a
                      href={`mailto:${chapter.coordinatorEmail}`}
                      className="text-forest-green underline hover:text-heritage-gold"
                    >
                      {chapter.coordinatorEmail}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-border/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-forest-green">
                  {chapter.memberCount} Certified Members
                </span>
                <Link
                  href="/membership/register"
                  className="font-montserrat font-bold text-xs uppercase text-forest-green hover:text-heritage-gold flex items-center gap-1"
                >
                  Join Chapter <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Nigeria Geopolitical Map Reference Note */}
        <div className="mt-14 p-8 rounded-3xl bg-sage-mist/60 border border-brand-border text-center max-w-2xl mx-auto space-y-3">
          <MapPin className="w-8 h-8 text-forest-green mx-auto" />
          <h4 className="font-montserrat font-bold text-lg text-ink-dark uppercase">
            State-Level Working Committees
          </h4>
          <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
            Every chapter operates under the CESSPA National Charter, coordinating localized public hearing monitors,
            regulatory consultations with State Environmental Protection Agencies (SEPAs), and CPD workshops.
          </p>
        </div>
      </Section>
    </div>
  );
}
