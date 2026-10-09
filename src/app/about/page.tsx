import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Users,
  Compass,
  ArrowRight,
  Target,
  Eye,
  Flag,
  Calendar,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { BRAND } from "@/lib/constants";

export const metadata = {
  title: "About Us — Who We Are | CESSPA",
  description: "Origin, mission, vision, and core purpose of the Certified Environmental and Social Standards Professionals Association of Nigeria.",
};

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="WHO WE ARE" lightMode={true}>
            ORGANISATION CONTEXT & GENESIS
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            Uniting Nigeria's Safeguards Professionals
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            CESSPA bridges the gap between official certification and structured, ethical professional practice.
            Raising the standard of practice beyond box-ticking compliance.
          </p>
        </div>
      </section>

      {/* Origin Story Section */}
      <Section variant="ivory">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Eyebrow chip="GENESIS">WHY CESSPA WAS CREATED</Eyebrow>
            <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-ink-dark uppercase">
              Addressing Nigeria's Infrastructure Imperative
            </h2>

            <p className="text-sm sm:text-base text-ink-body leading-relaxed">
              Nigeria’s rapid infrastructure growth across transportation, energy, mining, and urban renewal
              demands certified, regulated professionals in Environmental & Social (E&S) safeguards.
            </p>

            <p className="text-sm sm:text-base text-ink-body leading-relaxed">
              Initiated by intensive nationwide stakeholder consultations, the <strong>Technical Working Committee (TWC)</strong> was
              incepted in <strong>October 2025</strong> across all six geopolitical zones to unite certified professionals.
              CESSPA establishes the regulatory bridge ensuring that infrastructure projects do not harm local ecosystems or disenfranchise host communities.
            </p>

            <div className="p-4 rounded-xl bg-sage-mist border border-brand-border space-y-2">
              <span className="font-montserrat font-bold text-xs uppercase tracking-wider text-forest-green block">
                Our Core Proposition:
              </span>
              <p className="text-xs sm:text-sm text-ink-dark font-medium leading-relaxed">
                "Environmental sustainability must include people. Sustainable development protects both the environment and the people who depend on it."
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-4/3 rounded-3xl overflow-hidden border border-brand-border shadow-xl bg-white">
            <Image
              src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1600&q=80"
              alt="Preserving Nigerian Ecosystems - CESSPA Mission"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Mission, Vision, and Core Mandate */}
      <Section variant="sage">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Eyebrow chip="MANDATE">PURPOSE & DIRECTION</Eyebrow>
          <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-ink-dark uppercase mt-1">
            Our Guiding Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl p-6 bg-white border border-brand-border shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-forest-green text-white flex items-center justify-center">
              <Eye className="w-6 h-6 text-heritage-gold" />
            </div>
            <h3 className="font-montserrat font-bold text-lg text-ink-dark uppercase">Our Vision</h3>
            <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
              To be Nigeria’s pre-eminent professional certifying authority for Environmental and Social safeguards, recognized globally for ethical rigor, scientific excellence, and social justice.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-white border border-brand-border shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-leaf-green text-white flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-montserrat font-bold text-lg text-ink-dark uppercase">Our Mission</h3>
            <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
              To institutionalize world-class ESIA, safeguards audit, and stakeholder engagement standards through accredited certification, continuous professional development, and collaborative policy advocacy.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-white border border-brand-border shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-heritage-gold text-forest-green flex items-center justify-center">
              <Flag className="w-6 h-6 text-forest-green" />
            </div>
            <h3 className="font-montserrat font-bold text-lg text-ink-dark uppercase">Our Core Goal</h3>
            <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
              To empower practitioners with the tools, authority, and ethical backing required to assess first, mitigate early, and develop responsibly across both public and private capital pipelines.
            </p>
          </div>
        </div>
      </Section>

      {/* Strategic Objectives Grid */}
      <Section variant="white">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <Eyebrow chip="OBJECTIVES">CORE STRATEGIC MANDATE</Eyebrow>
            <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-ink-dark uppercase mt-1">
              What CESSPA Delivers
            </h2>
          </div>

          <div className="space-y-4 pt-4">
            {[
              {
                title: "1. Foster Professional Standards & Certification",
                desc: "Establish stringent peer-reviewed accreditation pathways for ESIA practitioners, baseline scientists, resettlement specialists, and safeguards auditors.",
              },
              {
                title: "2. Nationwide Outreach & Continuous Training (CPD)",
                desc: "Conduct mandatory ongoing training modules, technical workshops, and field masterclasses across all 6 geopolitical zones to keep members abreast of evolving regulatory frameworks.",
              },
              {
                title: "3. Promote Member Welfare, Professional Indemnity & Ethics",
                desc: "Safeguard the integrity of practitioners when issuing objective environmental assessments, resisting undue commercial pressures, and protecting whistleblowers.",
              },
              {
                title: "4. Policy Advocacy & Regulatory Convergence",
                desc: "Collaborate constructively with the Federal Ministry of Environment, NESREA, and State Environmental Protection Boards to modernize national impact assessment standards.",
              },
            ].map((obj) => (
              <div key={obj.title} className="p-5 rounded-2xl bg-sage-mist/40 border border-brand-border space-y-1.5">
                <h4 className="font-montserrat font-bold text-sm sm:text-base text-forest-green">
                  {obj.title}
                </h4>
                <p className="text-xs sm:text-sm text-ink-body leading-relaxed">{obj.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 text-center">
            <Link
              href="/about/executives"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-forest-green text-white font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-deep-emerald shadow-md transition-all"
            >
              Meet National Executives
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
