import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Mail, ArrowRight } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";

export const metadata = {
  title: "Board of Trustees & Directors | CESSPA",
  description: "Governance leadership and Board of Trustees of the Certified Environmental and Social Standards Professionals Association of Nigeria.",
};

const TRUSTEES = [
  {
    name: "Dr. Amina Garba Bello",
    role: "Chairperson, Board of Trustees",
    honorific: "Ph.D, FCESSPA",
    zone: "North West (Kano)",
    bio: "Over two decades directing social safeguards and resettlement policy for trans-African infrastructure pipelines.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Folashade O. Williams, Esq.",
    role: "Trustee — Legal & Regulatory Affairs",
    honorific: "LL.M, FCESSPA",
    zone: "North Central (Abuja)",
    bio: "Pioneer environmental jurist specializing in EIA Act harmonisation and multilateral compliance enforcement.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Prof. Nnamdi C. Ezeoka",
    role: "Trustee — Scientific Baselines & Ecology",
    honorific: "Ph.D, FESN, FCESSPA",
    zone: "South East (Enugu)",
    bio: "Distinguished ecologist with 30 years in biodiversity impact modeling and critical habitat preservation.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Engr. Tariere Briggs",
    role: "Trustee — Industrial & Marine Safeguards",
    honorific: "FNSE, FCESSPA",
    zone: "South South (Rivers)",
    bio: "Specialist in Niger Delta mangrove remediation, oil spill environmental audits, and community peace frameworks.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Alhaji Ibrahim Dan-Musa",
    role: "Trustee — Finance & Institutional Sustainability",
    honorific: "FCA, FCESSPA",
    zone: "North East (Bauchi)",
    bio: "Financial governance specialist driving long-term endowment growth and fiduciary transparency for the association.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Dr. Olumide Adeleke",
    role: "Trustee — Professional Standards & Ethics",
    honorific: "Ph.D, FCESSPA",
    zone: "South West (Lagos)",
    bio: "Former regulatory director with extensive experience auditing commercial and public infrastructure ESIAs.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
  },
];

export default function BoardPage() {
  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="GOVERNANCE" lightMode={true}>
            FIDUCIARY & STRATEGIC OVERSIGHT
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            Board of Trustees
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            The CESSPA Board of Trustees upholds the legal integrity, fiduciary governance, and ethical mission
            of the association in compliance with Nigerian statutory guidelines.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TRUSTEES.map((trustee) => (
            <div
              key={trustee.name}
              className="rounded-3xl overflow-hidden bg-white border border-brand-border shadow-sm card-hover flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 w-full bg-sage-mist">
                  <Image
                    src={trustee.image}
                    alt={trustee.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-forest-green text-white font-montserrat font-bold text-[10px] px-2 py-0.5 rounded shadow-xs">
                    TRUSTEE
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-wider block">
                    {trustee.zone}
                  </span>
                  <h3 className="font-montserrat font-bold text-lg text-ink-dark">
                    {trustee.name}
                  </h3>
                  <p className="text-xs font-semibold text-forest-green">
                    {trustee.role} • <span className="text-ink-muted">{trustee.honorific}</span>
                  </p>
                  <p className="text-xs text-ink-body leading-relaxed pt-2">
                    {trustee.bio}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-brand-border/60 flex items-center justify-between text-xs text-ink-muted">
                <span className="flex items-center gap-1 text-leaf-green font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Certified Fellow
                </span>
                <span className="text-[11px]">CESSPA Council</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 p-8 rounded-3xl bg-sage-mist border border-brand-border text-center max-w-2xl mx-auto space-y-4">
          <h4 className="font-montserrat font-bold text-lg text-ink-dark uppercase">
            Looking for Operational Executive Leadership?
          </h4>
          <p className="text-xs sm:text-sm text-ink-body">
            Our National Executives oversee the day-to-day operations, chapter coordination, and CPD accreditation programs across all 6 geopolitical zones.
          </p>
          <Link
            href="/about/executives"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-forest-green text-white font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-deep-emerald transition-colors"
          >
            View National Executives <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>
    </div>
  );
}
