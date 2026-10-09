import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, ShieldCheck, MapPin, ArrowRight } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";

export const metadata = {
  title: "National Executives | CESSPA",
  description: "Operational leadership and National Executive Committee of CESSPA across Nigeria's six geopolitical zones.",
};

const EXECUTIVES = [
  {
    name: "Dr. Joshua M. Akor",
    role: "National Secretary General",
    zone: "North Central",
    office: "Secretariat HQ, Abuja",
    portfolio: "Operations, Council Records & Chapter Liaisons",
    email: "secgen@cesspa.org.ng",
    image: "/images/brand/what-is-cesspa.jpg",
  },
  {
    name: "Mrs. Toyin Balogun-Adeleke",
    role: "National Vice President (West)",
    zone: "South West",
    office: "Lagos Hub",
    portfolio: "Accreditation, CPD Workshops & Private Sector Partnerships",
    email: "vp.west@cesspa.org.ng",
    image: "/images/brand/why-cesspa.jpg",
  },
  {
    name: "Ken Ebiama, Esq.",
    role: "National Vice President (East/South)",
    zone: "South South",
    office: "Port Harcourt Hub",
    portfolio: "Host Community Rights, Maritime Safeguards & Mediation",
    email: "vp.south@cesspa.org.ng",
    image: "/images/brand/peace-foundation.jpg",
  },
  {
    name: "Aliyu Mohammed Sani",
    role: "National Vice President (North)",
    zone: "North West",
    office: "Kano Hub",
    portfolio: "Dryland Safeguards, Agriculture & Regional Integration",
    email: "vp.north@cesspa.org.ng",
    image: "/images/brand/values-excellence.jpg",
  },
  {
    name: "Engr. Nonso Nwankwo",
    role: "Director of Technical Standards",
    zone: "South East",
    office: "Enugu Hub",
    portfolio: "ESIA Guidelines, Peer Review & Methodology Quality Control",
    email: "standards@cesspa.org.ng",
    image: "/images/brand/what-is-cesspa.jpg",
  },
  {
    name: "Bilkisu Abubakar",
    role: "Director of Membership & Outreach",
    zone: "North East",
    office: "Bauchi Hub",
    portfolio: "Member Onboarding, Student Chapters & Women in Safeguards",
    email: "membership@cesspa.org.ng",
    image: "/images/brand/why-cesspa.jpg",
  },
];

export default function ExecutivesPage() {
  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="OPERATIONS" lightMode={true}>
            EXECUTIVE COUNCIL
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            National Executives
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Delivering CESSPA’s strategic programs, professional examinations, and member services across
            the six geopolitical zones of the Federal Republic of Nigeria.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXECUTIVES.map((exec) => (
            <div
              key={exec.name}
              className="rounded-3xl overflow-hidden bg-white border border-brand-border shadow-sm card-hover flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 w-full bg-sage-mist">
                  <Image
                    src={exec.image}
                    alt={exec.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-forest-green text-white font-montserrat font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                    {exec.zone}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="font-montserrat font-bold text-lg text-ink-dark">
                      {exec.name}
                    </h3>
                    <p className="text-xs font-semibold text-forest-green uppercase tracking-wide mt-0.5">
                      {exec.role}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-sage-mist/50 border border-brand-border/60 text-xs space-y-1">
                    <span className="font-montserrat font-bold text-[10px] text-heritage-gold uppercase tracking-wider block">
                      Portfolio Focus:
                    </span>
                    <p className="text-ink-body font-medium">{exec.portfolio}</p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                    <MapPin className="w-3.5 h-3.5 text-forest-green" />
                    <span>{exec.office}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-brand-border/60 flex items-center justify-between text-xs">
                <a
                  href={`mailto:${exec.email}`}
                  className="font-montserrat font-bold text-forest-green hover:text-heritage-gold flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Contact Portfolio
                </a>
                <span className="flex items-center gap-1 text-[11px] text-leaf-green">
                  <ShieldCheck className="w-3.5 h-3.5" /> Executive
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
