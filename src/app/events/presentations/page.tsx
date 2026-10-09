import React from "react";
import Link from "next/link";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { PresentationList } from "./PresentationList";

export const metadata = {
  title: "Public Presentations & Technical Papers | CESSPA",
  description: "Download keynote slides and technical presentations delivered by CESSPA practitioners at national conferences and regulatory symposiums.",
};

const PRESENTATIONS = [
  {
    id: "pres-01",
    title: "Harmonizing the Nigerian EIA Act with International Performance Standards (IFC PS 1-8)",
    speaker: "Dr. Amina Garba Bello, FCESSPA",
    occasion: "CESSPA National Stakeholders Plenary, Abuja",
    date: "October 2025",
    pages: "44 Slides",
    fileSize: "6.2 MB PDF",
  },
  {
    id: "pres-02",
    title: "Predictive Ecological Modeling for Linear Infrastructure Corridors in Nigeria",
    speaker: "Engr. Babatunde Adeyemi, FNSE",
    occasion: "South West Zonal Masterclass, Lagos",
    date: "January 2026",
    pages: "38 Slides",
    fileSize: "4.8 MB PDF",
  },
  {
    id: "pres-03",
    title: "Culturally Grounded Stakeholder Engagement: FPIC Principles in Land Acquisition",
    speaker: "Ken Ebiama, Esq.",
    occasion: "Niger Delta Safeguards Dialogue, Port Harcourt",
    date: "March 2026",
    pages: "52 Slides",
    fileSize: "5.5 MB PDF",
  },
  {
    id: "pres-04",
    title: "Digital Environmental Monitoring & Auditing: IoT Sensor Arrays in Extractive Sites",
    speaker: "Haruna Danjuma Musa, MCESSPA",
    occasion: "Northern Regional Mining Summit, Bauchi",
    date: "May 2026",
    pages: "32 Slides",
    fileSize: "3.9 MB PDF",
  },
];

export default function PresentationsPage() {
  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="KNOWLEDGE REPOSITORY" lightMode={true}>
            TECHNICAL COMMUNIQUE
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            Public Presentations & Keynotes
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Access and download slides, technical papers, and plenary presentations delivered by CESSPA
            fellows, regulatory directors, and international safeguard advisors.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        {/* Sub-nav tabs */}
        <div className="mb-10 border-b border-brand-border flex items-center gap-6 text-xs font-montserrat font-bold uppercase tracking-wider">
          <Link href="/events" className="text-ink-muted hover:text-forest-green pb-3">
            Event Calendar
          </Link>
          <Link href="/events/photos" className="text-ink-muted hover:text-forest-green pb-3">
            Event Photos
          </Link>
          <Link href="/events/presentations" className="text-forest-green border-b-2 border-heritage-gold pb-3">
            Public Presentations
          </Link>
        </div>

        {/* Presentation List */}
        <PresentationList items={PRESENTATIONS} />
      </Section>
    </div>
  );
}
