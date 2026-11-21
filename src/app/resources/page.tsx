"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Download, FileText, BookOpen, ArrowRight, ShieldCheck } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { MOCK_PUBLICATIONS } from "@/lib/data/mockData";

export default function ResourcesPage() {
  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="KNOWLEDGE" lightMode={true}>
            TECHNICAL COMPENDIUM & FIELD MANUALS
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            CESSPA Publications & Guidelines
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Standard operating procedures, ESIA field compendiums, resettlement guidance notes, and environmental monitoring protocols.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        {/* Sub-nav tabs */}
        <div className="mb-10 border-b border-brand-border flex items-center gap-6 text-xs font-montserrat font-bold uppercase tracking-wider">
          <Link href="/resources" className="text-forest-green border-b-2 border-heritage-gold pb-3">
            Publications & Guidelines
          </Link>
          <Link href="/resources/blog" className="text-ink-muted hover:text-forest-green pb-3">
            Insights & Articles
          </Link>
          <Link href="/resources/videos" className="text-ink-muted hover:text-forest-green pb-3">
            Video Webinars
          </Link>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_PUBLICATIONS.map((pub) => (
            <div
              key={pub.id}
              className="rounded-3xl p-6 sm:p-8 bg-white border border-brand-border shadow-sm card-hover flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-montserrat font-bold text-leaf-green bg-sage-mist px-3 py-1 rounded-full uppercase">
                    {pub.category}
                  </span>
                  <span className="text-ink-muted font-mono">{pub.publishedYear} Edition</span>
                </div>

                <h3 className="font-montserrat font-extrabold text-xl text-ink-dark leading-snug">
                  {pub.title}
                </h3>

                <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
                  {pub.summary}
                </p>

                <div className="p-3 rounded-xl bg-sage-mist/40 border border-brand-border/60 text-xs text-ink-muted flex items-center justify-between">
                  <span>{pub.pages} Pages Document</span>
                  <span className="font-mono">{pub.fileSize}</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-border/60 flex items-center justify-between">
                <span className="text-xs text-forest-green font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-leaf-green" /> Official Standard
                </span>

                <button
                  type="button"
                  onClick={() => alert(`Downloading ${pub.title}...`)}
                  className="px-5 py-2.5 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-heritage-gold" /> Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
