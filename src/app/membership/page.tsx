"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Download,
  FileCheck,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { MOCK_TIERS } from "@/lib/data/mockData";
import { formatNaira } from "@/lib/utils";

const FAQS = [
  {
    q: "Who is eligible to apply for Full Member (M-CESSPA)?",
    a: "Candidates must hold an approved degree/HND in environmental, social, or engineering fields, plus SPESSE Associate or Intermediate certification with at least 3 years post-certification experience, OR SPESSE Foundation certification with at least 5 years verifiable experience.",
  },
  {
    q: "How does the Membership Committee review applications?",
    a: "In accordance with Article 3 of the Constitution, the Membership Committee examines your academic credentials, SPESSE certification track, verifiable experience, and referee endorsements, communicating its decision in writing within 30 working days.",
  },
  {
    q: "What are the voting rights across different membership grades?",
    a: "Professional Fellows (F-CESSPA) and Full Members (M-CESSPA) have full voting rights and eligibility for all elective offices at National and State Council levels. Affiliate Members have voting and elective rights at the State Chapter level (except Chairman and Secretary). Student Members hold observer status.",
  },
  {
    q: "How are annual dues utilized?",
    a: "Under Article 11 of the By-Laws, 75% of membership dues are retained by the National Secretariat for standards development, continuous professional development, and statutory operations, while 25% is remitted to State Chapters based on per capita membership strength.",
  },
  {
    q: "Can members facing financial difficulty apply for a waiver?",
    a: "Yes. Under the Hardship Waiver clause (Article 11), the National Executive Council may, on formal written application, grant a full or partial waiver of annual dues for a period not exceeding one year at a time.",
  },
  {
    q: "How do members practicing outside Nigeria pay dues?",
    a: "Members resident and practicing in the diaspora may pay the prescribed registration fee and annual dues in United States Dollars (USD) at the official rate established annually by the National Executive Council.",
  },
];

export default function MembershipPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="MEMBERSHIP" lightMode={true}>
            STRUCTURED PROFESSIONAL ELEVATION
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            Membership Plans & Pricing
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Join Nigeria's unified professional body for Environmental & Social standards.
            Choose the membership tier aligned with your academic qualification and professional field trajectory.
          </p>
        </div>
      </section>

      {/* Tier Comparison Cards */}
      <Section variant="ivory" id="plans">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Eyebrow chip="TABLE 3">CONSTITUTIONAL FEES SCHEDULE</Eyebrow>
          <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-ink-dark uppercase mt-1">
            Official Membership Grades
          </h2>
          <p className="text-xs sm:text-sm text-ink-body mt-2">
            Prescribed under Article 11 of the CESSPA By-Laws. Fees fund professional standards, national technical councils, and state chapter capacity.
          </p>
        </div>

        {/* Official Fees Schedule Table */}
        <div className="max-w-4xl mx-auto mb-14 overflow-hidden rounded-xl border border-brand-border bg-white shadow-xs">
          <div className="p-4 bg-slate-50 border-b border-brand-border flex items-center justify-between">
            <span className="font-montserrat font-bold text-xs uppercase tracking-wider text-forest-green">
              Table 3: Membership Fees Schedule
            </span>
            <span className="text-[11px] text-ink-muted">
              75% National Secretariat • 25% State Chapter Remittance
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-border text-ink-muted font-montserrat uppercase text-[10px] bg-slate-50/50">
                  <th className="py-3 px-4">Membership Category</th>
                  <th className="py-3 px-4">Designation</th>
                  <th className="py-3 px-4">Registration Fee</th>
                  <th className="py-3 px-4">Annual Dues</th>
                  <th className="py-3 px-4">Voting Rights</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60 text-ink-body">
                {MOCK_TIERS.map((tier) => (
                  <tr key={tier.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 font-montserrat font-bold text-ink-dark">
                      {tier.name}
                      {tier.isPopular && (
                        <span className="ml-2 text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                          Core
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-forest-green">
                      {tier.designation}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-ink-dark">
                      {tier.registrationFee === 0 ? "Exempt" : formatNaira(tier.registrationFee)}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-ink-dark">
                      {tier.annualDues === 0
                        ? tier.code === "life"
                          ? "N/A (Exempt)"
                          : "Exempt"
                        : `${formatNaira(tier.annualDues)}/yr`}
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-ink-muted max-w-[200px]">
                      {tier.votingRights.includes("Full")
                        ? "Full National & State"
                        : tier.votingRights.includes("State")
                        ? "State Chapter Only"
                        : "Advisory / Observer"}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {tier.code !== "honorary" && (
                        <Link
                          href={`/membership/register?tier=${tier.code}`}
                          className="px-3 py-1.5 rounded-md bg-forest-green hover:bg-forest-dark text-white font-montserrat font-bold text-[10px] uppercase tracking-wider inline-block"
                        >
                          Apply
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tier Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TIERS.filter((t) => t.code !== "honorary").map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-6 bg-white border flex flex-col justify-between transition-all duration-200 relative ${
                tier.isPopular
                  ? "border-forest-green ring-1 ring-forest-green/30 shadow-md"
                  : "border-brand-border hover:border-slate-400 shadow-xs"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-forest-green">
                      {tier.designation}
                    </span>
                    <h3 className="font-montserrat font-extrabold text-lg text-ink-dark mt-0.5">
                      {tier.name}
                    </h3>
                  </div>
                  {tier.isPopular && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-forest-green border border-emerald-200">
                      Standard
                    </span>
                  )}
                </div>

                <p className="text-xs text-ink-muted leading-relaxed">{tier.description}</p>

                <div className="py-3 border-y border-brand-border/60 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-ink-muted block">
                      Registration Fee
                    </span>
                    <span className="font-montserrat font-extrabold text-base text-ink-dark">
                      {tier.registrationFee === 0 ? "Exempt" : formatNaira(tier.registrationFee)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-ink-muted block">
                      Annual Dues
                    </span>
                    <span className="font-montserrat font-extrabold text-base text-forest-green">
                      {tier.annualDues === 0
                        ? tier.code === "life"
                          ? "N/A"
                          : "Exempt"
                        : formatNaira(tier.annualDues)}
                    </span>
                  </div>
                </div>

                {/* Eligibility Criteria from Table 1 */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-montserrat font-bold text-ink-dark uppercase tracking-wider block">
                    Eligibility Standards (Table 1):
                  </span>
                  <ul className="space-y-1.5 text-xs text-ink-body">
                    {tier.eligibility.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-leaf-green shrink-0 mt-0.5" />
                        <span className="leading-tight text-[11px]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-brand-border/60">
                <Link
                  href={`/membership/register?tier=${tier.code}`}
                  className={`w-full py-2.5 rounded-lg font-montserrat font-bold text-xs uppercase tracking-wider text-center block transition-all ${
                    tier.isPopular
                      ? "bg-forest-green text-white hover:bg-forest-dark"
                      : "bg-slate-100 text-slate-800 hover:bg-forest-green hover:text-white"
                  }`}
                >
                  Register Application
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 4-Step Onboarding Process */}
      <Section variant="sage">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Eyebrow chip="PROCESS">HOW IT WORKS</Eyebrow>
          <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-ink-dark uppercase mt-1">
            4 Simple Steps to Certification
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Online Application",
              desc: "Complete our digital registration wizard with your personal, contact, and geopolitical zone details.",
            },
            {
              step: "02",
              title: "Portfolio Upload",
              desc: "Submit your academic credentials, CV, and verified evidence of safeguards field experience.",
            },
            {
              step: "03",
              title: "Peer Evaluation",
              desc: "Our Zonal Accreditation Panel reviews submissions to verify competence and ethical standing.",
            },
            {
              step: "04",
              title: "Induction & Seal",
              desc: "Upon clearance and dues settlement, receive your membership certificate and official verification seal.",
            },
          ].map((item) => (
            <div key={item.step} className="rounded-2xl p-6 bg-white border border-brand-border shadow-xs space-y-3">
              <span className="font-montserrat font-extrabold text-3xl text-heritage-gold block">
                {item.step}
              </span>
              <h4 className="font-montserrat font-bold text-base text-ink-dark uppercase">
                {item.title}
              </h4>
              <p className="text-xs text-ink-body leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
          <Link
            href="/membership/register"
            className="px-6 py-3 rounded-xl bg-forest-green text-white font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-deep-emerald shadow-md transition-all inline-flex items-center gap-2"
          >
            Start Registration Wizard <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/membership/brochure"
            className="px-6 py-3 rounded-xl border border-forest-green text-forest-green font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-white transition-all inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Official Brochure
          </Link>
        </div>
      </Section>

      {/* FAQ Accordion */}
      <Section variant="ivory">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <Eyebrow chip="HELP & CLARITY">FREQUENTLY ASKED QUESTIONS</Eyebrow>
            <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-ink-dark uppercase mt-1">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-brand-border overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-montserrat font-bold text-sm text-ink-dark hover:text-forest-green"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-forest-green" : "text-ink-muted"
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-ink-body leading-relaxed border-t border-brand-border/40 bg-sage-mist/20">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}
