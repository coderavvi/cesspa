import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { DownloadBrochureButton } from "./DownloadBrochureButton";

export const metadata = {
  title: "Official Prospectus & Membership Brochure | CESSPA",
  description: "Download the comprehensive CESSPA brochure detailing accreditation standards, geopolitical chapter structures, and certification tracks.",
};

export default function BrochurePage() {
  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="DOCUMENTATION" lightMode={true}>
            OFFICIAL INFORMATION PACK
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            CESSPA Membership Prospectus
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            The definitive 28-page overview of Nigeria&apos;s unified professional body for Environmental &amp; Social Standards.
            Explore accreditation benchmarks, tier fees, and geopolitical chapters.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Brochure Cover Visual */}
          <div className="md:col-span-5 relative aspect-3/4 rounded-3xl overflow-hidden border border-brand-border shadow-2xl bg-white">
            <Image
              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80"
              alt="CESSPA Official Brochure Cover"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-green/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] font-montserrat font-bold uppercase text-heritage-gold-soft bg-forest-green/90 px-2 py-0.5 rounded">
                EDITION 2026/2027
              </span>
              <h3 className="font-montserrat font-bold text-base mt-1">
                Enhancing Standards for Sustainability
              </h3>
            </div>
          </div>

          {/* Brochure Metadata & Download Action */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-wider block">
                INFORMATION PACK (PDF)
              </span>
              <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-ink-dark uppercase mt-1">
                What&apos;s Inside the Brochure:
              </h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-ink-body">
              {[
                "Executive Summary: Genesis of the Technical Working Committee (TWC)",
                "Detailed comparison of 5 Membership Categories & annual fee schedules",
                "The 3 ESIA Pillars: Proactive Risk, Social Safeguards, and Lifecycle M&E",
                "Code of Ethics and Professional Responsibility Canons",
                "6 Geopolitical Chapter meeting structures and coordination secretariats",
                "Corporate Partnership & Institutional Sponsorship guidelines",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-white border border-brand-border/60">
                  <CheckCircle2 className="w-4 h-4 text-leaf-green shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-sage-mist/60 border border-brand-border flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-ink-dark block">File Format: High-Resolution PDF</span>
                <span className="text-ink-muted">Size: 4.6 MB • 28 Pages Full Color</span>
              </div>
              <span className="bg-forest-green/10 text-forest-green font-bold px-2 py-1 rounded text-[11px]">
                Official Copy
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <DownloadBrochureButton />

              <Link
                href="/membership/register"
                className="px-6 py-3.5 rounded-xl border border-forest-green text-forest-green font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-1.5"
              >
                Apply for Membership <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
