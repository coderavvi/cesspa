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
    q: "Who is eligible to apply for Certified Professional membership?",
    a: "Candidates must hold at least a Bachelor's degree (or equivalent) in an environmental, social, or engineering discipline, possess a minimum of 5 years verifiable field experience in ESIA, social safeguards, or monitoring, and pass the CESSPA peer review assessment.",
  },
  {
    q: "How does CESSPA certification align with the Nigerian EIA Act?",
    a: "CESSPA establishes the accredited professional registry that certifies practitioner competence. Our members prepare and audit ESIA reports in full compliance with the Federal Ministry of Environment's EIA procedural guidelines and NESREA standards.",
  },
  {
    q: "Can I upgrade from Associate to Certified Professional?",
    a: "Yes. Associate members who accumulate the requisite 5 years of verified field practice and complete 40 Continuous Professional Development (CPD) points through CESSPA workshops can apply for tier elevation during our bi-annual intake panels.",
  },
  {
    q: "What are the payment options for annual dues?",
    a: "Dues can be paid securely online via debit card, bank transfer, or USSD using our Paystack / Flutterwave integrated gateway, or directly at our Secretariat accounts.",
  },
  {
    q: "Is Corporate Membership open to non-consulting firms?",
    a: "Yes. Project developers, infrastructure contractors, commercial banks with ESG desks, and mining operators are encouraged to register as Corporate Members to accredit their in-house safeguards teams.",
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
          <Eyebrow chip="TIERS">TRANSPARENT PROFESSIONAL DUES</Eyebrow>
          <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-ink-dark uppercase mt-1">
            Official Membership Categories
          </h2>
          <p className="text-xs sm:text-sm text-ink-body mt-2">
            All subscriptions run annually with continuous access to the CESSPA knowledge repository and CPD webinars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {MOCK_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-6 bg-white border flex flex-col justify-between transition-all duration-300 relative ${
                tier.isPopular
                  ? "border-forest-green ring-2 ring-forest-green/20 shadow-xl"
                  : "border-brand-border hover:border-heritage-gold shadow-xs"
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-heritage-gold text-forest-green text-[10px] font-montserrat font-extrabold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap shadow-xs">
                  BENCHMARK TIER
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-montserrat font-extrabold text-lg text-ink-dark">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-ink-muted mt-1 leading-snug">{tier.tagline}</p>
                </div>

                <div className="pt-2 border-t border-brand-border/60">
                  <div className="flex items-baseline gap-1">
                    <span className="font-montserrat font-extrabold text-2xl text-forest-green">
                      {formatNaira(tier.annualFee, false)}
                    </span>
                    <span className="text-[11px] text-ink-muted">/yr</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="pt-2">
                  <span className="text-[10px] font-montserrat font-bold text-ink-dark uppercase tracking-wider block mb-2">
                    Key Entitlements:
                  </span>
                  <ul className="space-y-2 text-xs text-ink-body">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-leaf-green shrink-0 mt-0.5" />
                        <span className="leading-tight">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-border/60">
                <Link
                  href={`/membership/register?tier=${tier.code}`}
                  className={`w-full py-2.5 rounded-xl font-montserrat font-bold text-xs uppercase tracking-wider text-center block transition-all ${
                    tier.isPopular
                      ? "bg-forest-green text-white hover:bg-deep-emerald shadow-md"
                      : "bg-sage-mist text-forest-green hover:bg-forest-green hover:text-white"
                  }`}
                >
                  Apply Now
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
