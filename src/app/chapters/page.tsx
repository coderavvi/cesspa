"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  Award,
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
            FEDERAL GEOPOLITICAL COVERAGE &amp; ZONAL LEADERSHIP
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            CESSPA Geopolitical Chapters
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Inaugurated across all six geopolitical zones in October 2025. Meet our dedicated Zonal Coordinators,
            connect with certified practitioners, and participate in localized safeguard advocacy in your state.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        {/* Zone Selector Filter Chips */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
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

        {/* Chapters Cards Grid with Zonal Coordinator Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChapters.map((chapter) => (
            <div
              key={chapter.id}
              className="rounded-3xl overflow-hidden bg-white border border-brand-border shadow-sm card-hover flex flex-col justify-between"
            >
              <div>
                {/* Zonal Coordinator Portrait Photo */}
                <div className="relative aspect-4/3 w-full bg-sage-mist overflow-hidden">
                  {chapter.coordinatorImage ? (
                    <Image
                      src={chapter.coordinatorImage}
                      alt={`${chapter.coordinator} - ${chapter.zone} Zonal Coordinator`}
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-forest-green text-white">
                      <Users className="w-12 h-12 text-sage-mist" />
                    </div>
                  )}

                  <div className="absolute top-3 left-3 bg-forest-green text-white font-montserrat font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded shadow-xs">
                    {chapter.zone}
                  </div>

                  <div className="absolute top-3 right-3 bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase shadow-xs">
                    {chapter.status}
                  </div>

                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-heritage-gold block">
                      ZONAL COORDINATOR
                    </span>
                    <h4 className="font-montserrat font-bold text-base leading-tight">
                      {chapter.coordinator}
                    </h4>
                    {chapter.coordinatorCredentials && (
                      <span className="text-[11px] text-sage-mist font-mono font-semibold">
                        {chapter.coordinatorCredentials}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-montserrat font-extrabold text-lg text-ink-dark">
                      {chapter.name}
                    </h3>
                    {chapter.coordinatorTitle && (
                      <p className="text-xs font-semibold text-forest-green mt-0.5">
                        {chapter.coordinatorTitle}
                      </p>
                    )}
                  </div>

                  {/* States Tag Cloud */}
                  <div>
                    <span className="text-[10px] font-montserrat font-bold text-ink-muted uppercase tracking-wider block mb-1.5">
                      States Covered in this Zone:
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

                  {/* Meeting & Contact Info */}
                  <div className="pt-3 border-t border-brand-border/60 space-y-2 text-xs text-ink-body">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                      <div>
                        <span className="text-ink-muted text-[10px] block font-semibold uppercase">Meeting Assembly:</span>
                        <span>{chapter.meetingSchedule}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-forest-green shrink-0" />
                      <a
                        href={`mailto:${chapter.coordinatorEmail}`}
                        className="text-forest-green font-medium underline hover:text-heritage-gold"
                      >
                        {chapter.coordinatorEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-forest-green flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-leaf-green" />
                  {chapter.memberCount} Certified Members
                </span>
                <Link
                  href="/membership/register"
                  className="font-montserrat font-bold text-xs uppercase text-forest-green hover:text-heritage-gold flex items-center gap-1 transition-colors"
                >
                  Join Chapter <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* State-Level Committee Notice */}
        <div className="mt-14 p-8 rounded-3xl bg-sage-mist/60 border border-brand-border text-center max-w-3xl mx-auto space-y-3">
          <MapPin className="w-8 h-8 text-forest-green mx-auto" />
          <h4 className="font-montserrat font-bold text-lg text-ink-dark uppercase">
            State Executive Councils (SEC) &amp; Grassroots Safeguards
          </h4>
          <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
            Every geopolitical zone coordinates State Executive Councils across the 36 states and the FCT Abuja.
            Zonal coordinators monitor implementation of National Executive Council (NEC) directives, coordinate accredited CPD sessions,
            and engage with State Ministries of Environment and Women Affairs.
          </p>
        </div>
      </Section>
    </div>
  );
}
