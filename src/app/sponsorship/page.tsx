"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Handshake,
  ShieldCheck,
  Send,
  Building,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { formatNaira } from "@/lib/utils";

const SPONSOR_TIERS = [
  {
    tier: "Platinum Sponsor",
    amount: 5000000,
    tagline: "Premier Institutional Leadership",
    color: "border-slate-300 bg-white",
    badge: "bg-slate-100 text-slate-800 border-slate-300",
    benefits: [
      "Keynote speaking address at the CESSPA Annual National Conference (AGM)",
      "Prominent corporate exhibition pavilion at all 6 Geopolitical Zonal Forums",
      "Full-page executive profile inside the CESSPA Annual Safeguards Compendium",
      "Prime logo placement on national website banner, media wall & backdrop",
      "10 complimentary full-delegate access passes to all CPD masterclasses",
      "Nomination rights for one corporate seat on the National Advisory Board",
    ],
  },
  {
    tier: "Gold Sponsor",
    amount: 2500000,
    tagline: "Strategic Sector Alignment",
    color: "border-heritage-gold/50 bg-white",
    badge: "bg-amber-100 text-amber-900 border-amber-300",
    isPopular: true,
    benefits: [
      "Panel session sponsorship & brand exposure at the National AGM",
      "Exhibition booth at 3 chosen geopolitical chapter summits",
      "Half-page feature in the CESSPA Annual Safeguards Compendium",
      "Prominent logo displayed across website, event guides & digital streams",
      "5 complimentary full-delegate passes to national training masterclasses",
      "Recognition plaque presented during the Presidential Gala Dinner",
    ],
  },
  {
    tier: "Bronze Sponsor",
    amount: 1000000,
    tagline: "Corporate Capacity Partner",
    color: "border-brand-border bg-white",
    badge: "bg-orange-100 text-orange-900 border-orange-300",
    benefits: [
      "Corporate logo displayed on conference brochure and partner wall",
      "Exhibition desk at 1 geopolitical chapter regional forum",
      "Quarter-page mention in the CESSPA Annual Safeguards Compendium",
      "2 complimentary full-delegate passes to the CESSPA National Conference",
      "Certificate of Corporate Sustainability Patronage",
    ],
  },
];

export default function SponsorshipPage() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState("Gold Sponsor");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="PARTNERSHIP" lightMode={true}>
            INSTITUTIONAL ENGAGEMENT
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            Corporate Sponsorship Programs
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Position your organization at the forefront of environmental stewardship, ESG governance,
            and social safeguard leadership in Nigeria.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Eyebrow chip="PACKAGES">ANNUAL CORPORATE TIERS</Eyebrow>
          <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-ink-dark uppercase mt-1">
            Choose Your Sponsorship Level
          </h2>
          <p className="text-xs sm:text-sm text-ink-body mt-2">
            CESSPA sponsorships directly fund public community research, regulatory harmonization dialogues, and student bursaries.
          </p>
        </div>

        {/* 3 Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPONSOR_TIERS.map((tier) => (
            <div
              key={tier.tier}
              className={`rounded-3xl p-8 border flex flex-col justify-between shadow-sm card-hover relative ${tier.color} ${
                tier.isPopular ? "ring-2 ring-heritage-gold" : ""
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-heritage-gold text-forest-green text-[10px] font-montserrat font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                  RECOMMENDED PARTNERSHIP
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-montserrat font-bold uppercase border ${tier.badge}`}>
                    {tier.tier}
                  </span>
                  <Handshake className="w-5 h-5 text-forest-green" />
                </div>

                <div>
                  <h3 className="font-montserrat font-extrabold text-2xl text-ink-dark">
                    {tier.tier}
                  </h3>
                  <p className="text-xs text-ink-muted mt-1">{tier.tagline}</p>
                </div>

                <div className="pt-2 border-t border-brand-border/60">
                  <span className="font-montserrat font-extrabold text-3xl text-forest-green block">
                    {formatNaira(tier.amount, false)}
                  </span>
                  <span className="text-[11px] text-ink-muted">Annual Commitment (₦)</span>
                </div>

                <ul className="space-y-2.5 pt-4 text-xs text-ink-body">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-leaf-green shrink-0 mt-0.5" />
                      <span className="leading-tight">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-brand-border/60">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTier(tier.tier);
                    setInquiryModalOpen(true);
                  }}
                  className={`w-full py-3 rounded-xl font-montserrat font-bold text-xs uppercase tracking-wider transition-all ${
                    tier.isPopular
                      ? "bg-forest-green text-white hover:bg-deep-emerald shadow-md"
                      : "bg-sage-mist text-forest-green hover:bg-forest-green hover:text-white"
                  }`}
                >
                  Inquire For {tier.tier}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Recognition Strip */}
        <div className="mt-16 p-8 rounded-3xl bg-sage-mist/60 border border-brand-border text-center space-y-4">
          <Building className="w-8 h-8 text-forest-green mx-auto" />
          <h4 className="font-montserrat font-bold text-lg text-ink-dark uppercase">
            Multilateral & Corporate Recognition
          </h4>
          <p className="text-xs sm:text-sm text-ink-body max-w-xl mx-auto leading-relaxed">
            All sponsors receive formal audit receipts, corporate certificates of sustainability patronage,
            and inclusion in the annual directory presented to the Federal Ministry of Environment.
          </p>
        </div>
      </Section>

      {/* Sponsorship Inquiry Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-green/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-brand-border">
            <h3 className="font-montserrat font-extrabold text-xl text-ink-dark uppercase mb-1">
              Become a Corporate Sponsor
            </h3>
            <p className="text-xs text-ink-muted mb-4">
              Express institutional interest in partnering with CESSPA under the <strong>{selectedTier}</strong> package.
            </p>

            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-leaf-green mx-auto" />
                <h4 className="font-montserrat font-bold text-lg text-forest-green">
                  Inquiry Dispatched to Council
                </h4>
                <p className="text-xs text-ink-body">
                  Our Corporate Relations Officer will contact your designated liaison within 24 business hours with our detailed sponsorship prospectus.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setInquiryModalOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-forest-green text-white text-xs font-montserrat font-bold uppercase mt-2"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block font-montserrat font-bold text-ink-dark uppercase mb-1">
                    Corporate Entity / Organisation Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dangote Industries / TotalEnergies / Zenith Bank"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border focus:outline-none focus:ring-2 focus:ring-forest-green"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-montserrat font-bold text-ink-dark uppercase mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Name & Title"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-border focus:outline-none focus:ring-2 focus:ring-forest-green"
                    />
                  </div>
                  <div>
                    <label className="block font-montserrat font-bold text-ink-dark uppercase mb-1">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="esg@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-border focus:outline-none focus:ring-2 focus:ring-forest-green"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-montserrat font-bold text-ink-dark uppercase mb-1">
                    Select Target Tier
                  </label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border focus:outline-none focus:ring-2 focus:ring-forest-green bg-white"
                  >
                    <option value="Platinum Sponsor">Platinum Sponsor (₦5,000,000)</option>
                    <option value="Gold Sponsor">Gold Sponsor (₦2,500,000)</option>
                    <option value="Bronze Sponsor">Bronze Sponsor (₦1,000,000)</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-brand-border text-ink-body font-montserrat font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-forest-green text-white font-montserrat font-bold uppercase hover:bg-deep-emerald shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
