import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { MOCK_ADVISORY_COMMITTEE } from "@/lib/data/mockData";

export const metadata = {
  title: "National Advisory Committee | CESSPA",
  description: "Distinguished leadership and members of the National Advisory Committee of the Certified Environmental and Social Standards Professionals Association of Nigeria.",
};

export default function AdvisoryCommitteePage() {
  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="STRATEGIC OVERSIGHT" lightMode={true}>
            GOVERNANCE &amp; ADVISORY LEADERSHIP
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            National Advisory Committee
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Eminent researchers, scholars, and pioneer certified safeguard practitioners providing high-level strategic counsel,
            fiduciary direction, and ethical oversight for CESSPA across Nigeria.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-montserrat font-bold text-forest-green uppercase tracking-wider block">
            Accredited Committee Members
          </span>
          <p className="text-sm text-ink-muted mt-1">
            Certified across the National Environmental Standards Certification Programme (NESCP) and Nigeria Social Standards Practice Certification Programme (NSSPCP).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_ADVISORY_COMMITTEE.map((member) => (
            <div
              key={member.id}
              className="rounded-3xl overflow-hidden bg-white border border-brand-border shadow-sm card-hover flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 w-full bg-sage-mist overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute top-3 right-3 bg-forest-green text-white font-montserrat font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded shadow-xs">
                    Advisory Member
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="font-montserrat font-bold text-lg text-ink-dark">
                      {member.name}
                    </h3>
                    <div className="inline-block px-2.5 py-0.5 mt-1 rounded bg-heritage-gold/15 text-forest-dark font-mono font-bold text-xs">
                      {member.certification}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs pt-1">
                    <div className="p-2.5 rounded-lg bg-sage-mist/50 border border-brand-border/60">
                      <span className="font-montserrat font-bold text-[10px] text-forest-green uppercase tracking-wide block">
                        NESCP Certification:
                      </span>
                      <p className="text-ink-body font-medium mt-0.5">{member.nescpLevel}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-sage-mist/50 border border-brand-border/60">
                      <span className="font-montserrat font-bold text-[10px] text-heritage-gold uppercase tracking-wide block">
                        NSSPCP Certification:
                      </span>
                      <p className="text-ink-body font-medium mt-0.5">{member.nsspcpLevel}</p>
                    </div>
                  </div>

                  {member.bio && (
                    <p className="text-xs text-ink-muted leading-relaxed pt-1">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-brand-border/60 flex items-center justify-between text-xs text-ink-muted">
                <span className="flex items-center gap-1.5 text-leaf-green font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Profile Verified
                </span>
                <span className="text-[11px] font-semibold text-forest-green">CESSPA Governance</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 p-8 rounded-3xl bg-sage-mist border border-brand-border text-center max-w-2xl mx-auto space-y-4">
          <h4 className="font-montserrat font-bold text-lg text-ink-dark uppercase">
            Operational Executive Leadership
          </h4>
          <p className="text-xs sm:text-sm text-ink-body">
            Our Interim National Executive Council oversees daily administration, state chapter liaisons, and CPD certification across Nigeria&apos;s six geopolitical zones.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/about/executives"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-forest-green text-white font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-deep-emerald transition-colors"
            >
              View National Executives <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/chapters"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-forest-green text-forest-green font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-forest-green hover:text-white transition-colors"
            >
              View Geopolitical Chapters <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
