"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Compass,
  ArrowRight,
  Calendar,
  CheckCircle2,
  FileText,
  Heart,
  Globe2,
  Sparkles,
  BookOpen,
  Scale,
  Award,
  ChevronRight,
  Leaf,
  Layers,
  Activity,
  Bookmark,
  Share2,
  ArrowUpRight,
} from "lucide-react";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Section } from "@/components/shared/Section";
import { StatCounter } from "@/components/shared/StatCounter";
import { CycleDiagram } from "@/components/shared/CycleDiagram";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { BRAND } from "@/lib/constants";
import { MOCK_TIERS, MOCK_EVENTS, MOCK_NEWS } from "@/lib/data/mockData";
import { formatNaira, formatDate } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* =========================================================
          HERO SECTION (Split Layout + Floating Glass Cards)
      ========================================================= */}
      <section className="relative bg-gradient-to-b from-white via-ivory to-sage-mist/40 pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Subtle dot pattern in background */}
        <div className="absolute inset-0 pattern-dots opacity-40 pointer-events-none" />

        <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline, CTAs, Counters */}
            <div className="lg:col-span-7 space-y-6">
              <Eyebrow chip="2026">
                CERTIFIED ENVIRONMENTAL & SOCIAL STANDARDS PROFESSIONALS ASSOCIATION
              </Eyebrow>

              <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-ink-dark leading-[1.12] tracking-tight uppercase">
                Raising the standard of{" "}
                <span className="text-forest-green relative inline-block">
                  environmental & social
                  <span className="absolute bottom-1 left-0 w-full h-2 bg-leaf-accent/30 -z-10 rounded-sm" />
                </span>{" "}
                practice in Nigeria.
              </h1>

              <p className="text-base sm:text-lg text-ink-body leading-relaxed max-w-xl">
                Bridging the gap between official certification and structured, ethical professional practice.
                Because environmental sustainability must include people.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/membership/register"
                  className="px-6 py-3.5 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
                >
                  Join CESSPA Today
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/membership"
                  className="px-6 py-3.5 rounded-xl border-2 border-heritage-gold/80 hover:border-forest-green bg-white/80 hover:bg-white text-forest-green font-montserrat font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
                >
                  Explore Membership
                </Link>
              </div>

              {/* Trust Counters Row */}
              <div className="pt-8 mt-4 border-t border-brand-border/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <StatCounter value={500} suffix="+" label="Members" sublabel="Across all sectors" />
                <StatCounter value={36} suffix=" States" label="Coverage" sublabel="+ FCT Abuja" />
                <StatCounter value={6} suffix=" Zones" label="Chapters" sublabel="National reach" />
                <StatCounter value={50} suffix="+" label="CPD Programs" sublabel="Field workshops" />
              </div>
            </div>

            {/* Right Column: Hero Graphic Composition & Floating Glass Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative Circular Backdrop */}
                <div className="absolute -top-6 -right-6 w-72 h-72 rounded-full bg-leaf-accent/15 blur-2xl pointer-events-none" />

                {/* Primary Feature Card with Official ESIA Guide Visual */}
                <div className="relative rounded-3xl overflow-hidden border border-brand-border shadow-2xl bg-white p-3 group">
                  <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-forest-green">
                    <Image
                      src="/images/brand/what-is-cesspa.jpg"
                      alt="CESSPA Decoding Environmental & Social Standards in Nigeria"
                      fill
                      className="object-cover object-top group-hover:scale-103 transition-transform duration-500"
                      priority
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-green/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-montserrat font-bold uppercase tracking-wider text-heritage-gold-soft bg-forest-green/90 px-2 py-0.5 rounded">
                        OFFICIAL FRAMEWORK
                      </span>
                      <h4 className="font-montserrat font-bold text-sm sm:text-base mt-1">
                        Enhancing Standards for Sustainability
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Floating Glass Pill 1: ESIA Practice */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-brand-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-forest-green text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-heritage-gold-soft" />
                  </div>
                  <div>
                    <span className="block font-montserrat font-extrabold text-xs text-ink-dark">
                      ESIA Practice
                    </span>
                    <span className="text-[11px] text-ink-muted">Proactive Risk Screening</span>
                  </div>
                </div>

                {/* Floating Glass Pill 2: Social Safeguards */}
                <div className="absolute -bottom-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-brand-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-heritage-gold/20 text-forest-green flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-forest-green" />
                  </div>
                  <div>
                    <span className="block font-montserrat font-extrabold text-xs text-ink-dark">
                      Social Safeguards
                    </span>
                    <span className="text-[11px] text-ink-muted">Community Trust & Livelihoods</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          QUICK ACTION NAVIGATION BAR (Matching Official Wireframe)
      ========================================================= */}
      <div className="bg-white border-y border-brand-border py-4">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/membership"
              className="flex items-center gap-4 p-3.5 rounded-xl bg-sage-mist/50 hover:bg-forest-green/10 border border-brand-border/60 transition-all group"
            >
              <div className="w-11 h-11 rounded-lg bg-forest-green text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5 text-heritage-gold-soft" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-montserrat font-bold text-xs uppercase tracking-wider text-forest-green">
                    1. Membership
                  </span>
                  <ChevronRight className="w-4 h-4 text-ink-muted group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-ink-body mt-0.5">Explore 5 professional tiers & fees</p>
              </div>
            </Link>

            <Link
              href="/events"
              className="flex items-center gap-4 p-3.5 rounded-xl bg-sage-mist/50 hover:bg-forest-green/10 border border-brand-border/60 transition-all group"
            >
              <div className="w-11 h-11 rounded-lg bg-leaf-green text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-montserrat font-bold text-xs uppercase tracking-wider text-leaf-green">
                    2. Events & CPD
                  </span>
                  <ChevronRight className="w-4 h-4 text-ink-muted group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-ink-body mt-0.5">National AGM, webinars & field workshops</p>
              </div>
            </Link>

            <Link
              href="/donate"
              className="flex items-center gap-4 p-3.5 rounded-xl bg-sage-mist/50 hover:bg-forest-green/10 border border-brand-border/60 transition-all group"
            >
              <div className="w-11 h-11 rounded-lg bg-heritage-gold text-forest-green flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 text-forest-green" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-montserrat font-bold text-xs uppercase tracking-wider text-ink-dark">
                    3. Support Our Work
                  </span>
                  <ChevronRight className="w-4 h-4 text-ink-muted group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-ink-body mt-0.5">Donate to public research & training</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================
          THE THREE ESIA PILLARS (Core Brand Knowledge)
      ========================================================= */}
      <Section variant="ivory" pattern="dots" id="pillars">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Eyebrow chip="FRAMEWORK">OFFICIAL E&S STANDARDS PILLARS</Eyebrow>
          <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl text-ink-dark uppercase mt-2">
            What Every Certified Professional Should Know About ESIA
          </h2>
          <div className="w-16 h-1 bg-forest-green mx-auto my-4 rounded-full" />
          <p className="text-sm sm:text-base text-ink-body leading-relaxed">
            ESIA is not merely a statutory compliance exercise; it is an early preventive planning discipline that
            balances ecological preservation with human dignity.
          </p>
        </div>

        {/* 3 Pillar Deep-Dive Cards */}
        <div className="space-y-12">
          {/* PILLAR 01: Proactive Risk Identification */}
          <div className="rounded-3xl border border-brand-border bg-white shadow-sm overflow-hidden p-6 sm:p-8 lg:p-10 card-hover">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-forest-green text-white font-montserrat font-extrabold text-sm flex items-center justify-center shadow-xs">
                    01
                  </span>
                  <span className="font-montserrat font-bold text-xs text-heritage-gold uppercase tracking-widest">
                    PILLAR 01
                  </span>
                </div>

                <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-ink-dark uppercase">
                  Proactive Risk Identification
                </h3>

                <p className="text-sm sm:text-base text-ink-body leading-relaxed">
                  ESIA is more than a regulatory requirement. It is a preventive planning tool that helps identify
                  potential environmental and social risks <strong>before</strong> project implementation.
                </p>

                <div className="pt-2">
                  <span className="font-montserrat font-bold text-xs uppercase tracking-wider text-forest-green block mb-2.5">
                    A robust ESIA systematically considers:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-ink-body">
                    {[
                      "Ecosystem and biodiversity impacts",
                      "Pollution and waste management",
                      "Community health, hygiene and safety",
                      "Resource use and climate-related risks",
                      "Potential impacts on local livelihoods",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2 bg-sage-mist/60 p-2.5 rounded-xl border border-brand-border/60">
                        <CheckCircle2 className="w-4 h-4 text-leaf-green shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Takeaway Strip */}
                <div className="p-4 rounded-xl bg-forest-green text-white flex items-center justify-between gap-4 mt-4">
                  <div>
                    <span className="text-[10px] font-montserrat font-bold uppercase text-heritage-gold-soft tracking-wider block">
                      THE GOAL:
                    </span>
                    <span className="text-xs sm:text-sm font-medium">
                      Identify risks early and design appropriate, actionable mitigation measures.
                    </span>
                  </div>
                  <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-wider shrink-0 hidden sm:inline">
                    {BRAND.taglines.secondary}
                  </span>
                </div>
              </div>

              {/* Graphic for Pillar 01 */}
              <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-brand-border bg-sage-mist">
                <Image
                  src="/images/brand/pillar-01-risk.jpg"
                  alt="Pillar 01 Proactive Risk Identification"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* PILLAR 02: Social & Community Safeguards */}
          <div className="rounded-3xl border border-brand-border bg-white shadow-sm overflow-hidden p-6 sm:p-8 lg:p-10 card-hover">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Graphic for Pillar 02 */}
              <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-brand-border bg-sage-mist order-last lg:order-first">
                <Image
                  src="/images/brand/pillar-02-social.jpg"
                  alt="Pillar 02 Social & Community Safeguards"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-forest-green text-white font-montserrat font-extrabold text-sm flex items-center justify-center shadow-xs">
                    02
                  </span>
                  <span className="font-montserrat font-bold text-xs text-heritage-gold uppercase tracking-widest">
                    PILLAR 02
                  </span>
                </div>

                <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-ink-dark uppercase">
                  Social & Community Safeguards
                </h3>

                <p className="text-sm sm:text-base text-ink-body leading-relaxed">
                  <strong>Environmental sustainability must include people.</strong> Responsible project development
                  considers how communities, livelihoods, and vulnerable groups are affected throughout the project lifecycle.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    {
                      num: "01",
                      title: "Stakeholder Engagement",
                      desc: "Meaningful, transparent consultation with affected host communities.",
                    },
                    {
                      num: "02",
                      title: "Livelihoods Protection",
                      desc: "Analyzing economic disruption and restoring artisanal/farming activities.",
                    },
                    {
                      num: "03",
                      title: "Resettlement & Land Impacts",
                      desc: "Ethical relocation and prompt, equitable compensation guidelines.",
                    },
                    {
                      num: "04",
                      title: "Inclusion of Vulnerable Groups",
                      desc: "Giving voice to women, youth, elders, and persons with disabilities.",
                    },
                  ].map((item) => (
                    <div key={item.num} className="p-3.5 rounded-xl border border-brand-border bg-sage-mist/40 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-montserrat font-bold text-leaf-green bg-white px-2 py-0.5 rounded border border-brand-border">
                          {item.num}
                        </span>
                        <h5 className="font-montserrat font-bold text-xs sm:text-sm text-ink-dark">
                          {item.title}
                        </h5>
                      </div>
                      <p className="text-xs text-ink-body">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Key Takeaway Strip */}
                <div className="p-4 rounded-xl bg-sage-mist border border-leaf-accent/40 flex items-center gap-3 mt-4">
                  <Leaf className="w-5 h-5 text-leaf-green shrink-0" />
                  <div className="text-xs sm:text-sm text-ink-dark font-medium">
                    <strong className="text-forest-green">Key Takeaway:</strong> Sustainable development protects
                    both the natural environment and the human communities who depend on it.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PILLAR 03: Continuous Monitoring & Evaluation */}
          <div className="rounded-3xl border border-brand-border bg-white shadow-sm overflow-hidden p-6 sm:p-8 lg:p-10 card-hover">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-forest-green text-white font-montserrat font-extrabold text-sm flex items-center justify-center shadow-xs">
                      03
                    </span>
                    <span className="font-montserrat font-bold text-xs text-heritage-gold uppercase tracking-widest">
                      PILLAR 03
                    </span>
                  </div>
                  <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-ink-dark uppercase mt-1">
                    Continuous Monitoring & Evaluation
                  </h3>
                </div>

                <div className="bg-heritage-gold/15 border border-heritage-gold/30 px-3.5 py-1.5 rounded-xl text-xs font-montserrat font-bold text-ink-dark flex items-center gap-2 self-start sm:self-auto">
                  <Activity className="w-4 h-4 text-heritage-gold" />
                  "What gets monitored can be improved."
                </div>
              </div>

              <p className="text-sm sm:text-base text-ink-body leading-relaxed max-w-3xl">
                Approval is not the end of environmental responsibility. Environmental and social performance must
                be monitored, verified, and adapted throughout the entire lifecycle.
              </p>

              {/* Interactive Cycle Diagram */}
              <CycleDiagram />
            </div>
          </div>
        </div>
      </Section>

      {/* =========================================================
          THE FOUNDATION: PEACE & COMMUNITY RELATIONS
      ========================================================= */}
      <Section variant="dark" pattern="dots">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Eyebrow chip="FOUNDATION" lightMode={true}>
                PEACE & COMMUNITY RELATIONS
              </Eyebrow>

              <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl text-white uppercase leading-tight">
                Peace Starts With How Communities Are Treated
              </h2>

              <p className="text-sm sm:text-base text-sage-mist/90 leading-relaxed">
                A peaceful relationship between a project and its host community is neither transactional nor accidental.
                It is built on four bedrock principles:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  {
                    title: "Listening",
                    desc: "Understanding genuine community anxieties before final design decisions are locked in.",
                  },
                  {
                    title: "Respect",
                    desc: "Recognising local culture, traditions, indigenous knowledge, and sacred sites.",
                  },
                  {
                    title: "Inclusion",
                    desc: "Giving affected people and vulnerable groups a meaningful voice at every milestone.",
                  },
                  {
                    title: "Accountability",
                    desc: "Responding swiftly to grievances and redressing verified impacts responsibly.",
                  },
                ].map((item) => (
                  <div key={item.title} className="p-4 rounded-xl bg-deep-emerald/80 border border-sage-mist/20 space-y-1.5">
                    <h5 className="font-montserrat font-bold text-sm text-heritage-gold-soft uppercase tracking-wider">
                      {item.title}
                    </h5>
                    <p className="text-xs text-sage-mist/85 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Pull quote */}
              <blockquote className="quote-font text-lg sm:text-xl italic text-sage-mist border-l-2 border-heritage-gold pl-4 py-1">
                "When people feel heard, respected and considered, trust becomes possible."
              </blockquote>

              {/* Formula Badge */}
              <div className="p-4 rounded-xl bg-deep-emerald border border-heritage-gold/40 text-xs sm:text-sm font-montserrat font-bold text-center text-heritage-gold-soft">
                {BRAND.formula}
              </div>
            </div>

            {/* Visual Graphic */}
            <div className="lg:col-span-5 relative aspect-square rounded-3xl overflow-hidden border border-sage-mist/30 shadow-2xl">
              <Image
                src="/images/brand/peace-foundation.jpg"
                alt="CESSPA Community Peace & Safeguards"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* =========================================================
          VALUES: UPHOLDING PROFESSIONAL EXCELLENCE
      ========================================================= */}
      <Section variant="sage">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Eyebrow chip="OUR ETHOS">UPHOLDING PROFESSIONAL EXCELLENCE</Eyebrow>
          <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl text-ink-dark uppercase mt-2">
            Responsibility Beyond Compliance
          </h2>
          <div className="w-16 h-1 bg-forest-green mx-auto my-3 rounded-full" />
          <p className="text-sm sm:text-base text-ink-body">
            As Environmental & Social practitioners in Nigeria, our mandate is defined by five non-negotiable pillars.
          </p>
        </div>

        {/* 5 Value Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              title: "Environmental Protection",
              icon: Leaf,
              desc: "Preserving Nigerian ecosystems, soils, water basins, and biodiversity.",
            },
            {
              title: "Social Responsibility",
              icon: Users,
              desc: "Centering human well-being, fair labor, and social justice.",
            },
            {
              title: "Evidence-Based Decisions",
              icon: Scale,
              desc: "Grounded in empirical scientific baselines and verifiable data.",
            },
            {
              title: "Meaningful Engagement",
              icon: Heart,
              desc: "Deep, early, and continuous dialogue with all project stakeholders.",
            },
            {
              title: "Sustainable Development",
              icon: Globe2,
              desc: "Infrastructure that enriches current generations without compromising tomorrow.",
            },
          ].map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="rounded-2xl p-5 bg-white border border-brand-border text-center flex flex-col items-center justify-between card-hover space-y-3"
              >
                <div className="w-14 h-14 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center ring-4 ring-forest-green/5">
                  <Icon className="w-6 h-6 text-forest-green" />
                </div>
                <div>
                  <span className="text-[10px] font-montserrat font-bold text-heritage-gold uppercase tracking-wider block">
                    0{idx + 1}
                  </span>
                  <h4 className="font-montserrat font-bold text-sm text-ink-dark mt-1">
                    {val.title}
                  </h4>
                  <p className="text-xs text-ink-muted mt-2 leading-relaxed">{val.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* =========================================================
          MEMBERSHIP TIERS TEASER
      ========================================================= */}
      <Section variant="ivory" id="membership-teaser">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <Eyebrow chip="JOIN CESSPA">MEMBERSHIP PATHWAYS</Eyebrow>
            <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl text-ink-dark uppercase mt-1">
              Find Your Professional Category
            </h2>
          </div>
          <Link
            href="/membership"
            className="inline-flex items-center gap-1.5 font-montserrat font-bold text-xs uppercase tracking-wider text-forest-green hover:text-deep-emerald underline underline-offset-4"
          >
            Compare All Plans & Pricing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Top 3 Tiers Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TIERS.slice(1, 4).map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-6 bg-white border flex flex-col justify-between transition-all duration-300 relative ${
                tier.isPopular
                  ? "border-forest-green ring-2 ring-forest-green/20 shadow-xl"
                  : "border-brand-border hover:border-heritage-gold shadow-sm"
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-6 bg-heritage-gold text-forest-green text-[10px] font-montserrat font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                  MOST POPULAR BENCHMARK
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-montserrat font-extrabold text-xl text-ink-dark">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-ink-muted mt-1">{tier.tagline}</p>
                </div>

                <div className="pt-2 border-t border-brand-border/60">
                  <div className="flex items-baseline gap-1">
                    <span className="font-montserrat font-extrabold text-3xl text-forest-green">
                      {formatNaira(tier.annualFee, false)}
                    </span>
                    <span className="text-xs text-ink-muted">/{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-2 pt-2 text-xs text-ink-body">
                  {tier.benefits.slice(0, 4).map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-leaf-green shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
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
                  Apply as {tier.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* =========================================================
          UPCOMING EVENTS & CONFERENCES
      ========================================================= */}
      <Section variant="sage">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <Eyebrow chip="CPD & LEARNING">PROFESSIONAL CALENDAR</Eyebrow>
            <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl text-ink-dark uppercase mt-1">
              Upcoming Conferences & Webinars
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 font-montserrat font-bold text-xs uppercase tracking-wider text-forest-green hover:text-deep-emerald underline underline-offset-4"
          >
            View Full Event Calendar
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Conference Banner */}
        {MOCK_EVENTS[0] && (
          <div className="rounded-3xl bg-forest-green text-white p-6 sm:p-8 lg:p-10 mb-8 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-heritage-gold text-forest-green font-montserrat font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md">
                    NATIONAL FLAGSHIP EVENT
                  </span>
                  <span className="text-sage-mist text-xs">
                    {formatDate(MOCK_EVENTS[0].date)} • {MOCK_EVENTS[0].location}
                  </span>
                </div>

                <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-white">
                  {MOCK_EVENTS[0].title}
                </h3>

                <p className="text-xs sm:text-sm text-sage-mist/90 max-w-2xl leading-relaxed">
                  {MOCK_EVENTS[0].description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={`/events/${MOCK_EVENTS[0].slug}`}
                    className="px-5 py-2.5 rounded-xl bg-white text-forest-green hover:bg-sage-mist font-montserrat font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    View Agenda & Register
                  </Link>
                  <span className="text-xs text-sage-mist/80">
                    Earn {MOCK_EVENTS[0].cpdPoints} CPD Points for Certification
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 relative aspect-video rounded-2xl overflow-hidden border border-sage-mist/20">
                <Image
                  src="/images/brand/esia-guide-cover.jpg"
                  alt="CESSPA National Conference"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2 Other Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_EVENTS.slice(1, 3).map((event) => (
            <div
              key={event.id}
              className="rounded-2xl p-6 bg-white border border-brand-border card-hover flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-montserrat font-bold text-leaf-green bg-sage-mist px-2.5 py-0.5 rounded">
                    {event.category}
                  </span>
                  <span className="text-ink-muted">{formatDate(event.date)}</span>
                </div>

                <h4 className="font-montserrat font-bold text-lg text-ink-dark">
                  {event.title}
                </h4>

                <p className="text-xs text-ink-body line-clamp-2 leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-brand-border/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-forest-green">
                  {event.fee === 0 ? "Complimentary" : formatNaira(event.fee)}
                </span>
                <Link
                  href={`/events/${event.slug}`}
                  className="font-montserrat font-bold text-forest-green hover:text-heritage-gold flex items-center gap-1"
                >
                  Details <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* =========================================================
          NEWS & INSIGHTS (Official Brand Publications)
      ========================================================= */}
      <Section variant="ivory">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <Eyebrow chip="KNOWLEDGE">PUBLICATIONS & INSIGHTS</Eyebrow>
            <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl text-ink-dark uppercase mt-1">
              Latest E&S Safeguards Analysis
            </h2>
          </div>
          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-1.5 font-montserrat font-bold text-xs uppercase tracking-wider text-forest-green hover:text-deep-emerald underline underline-offset-4"
          >
            Browse All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_NEWS.map((article) => (
            <article
              key={article.id}
              className="rounded-2xl overflow-hidden bg-white border border-brand-border card-hover flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 w-full bg-forest-green/10">
                  <Image
                    src={article.coverImage || "/images/brand/what-is-cesspa.jpg"}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-forest-green text-white text-[10px] font-montserrat font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {article.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-ink-muted">
                    <span>{formatDate(article.publishDate)}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-montserrat font-bold text-base text-ink-dark line-clamp-2 hover:text-forest-green transition-colors">
                    <Link href={`/resources/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-ink-body line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/resources/blog/${article.slug}`}
                  className="font-montserrat font-bold text-xs text-forest-green hover:text-heritage-gold flex items-center gap-1"
                >
                  Read Full Analysis <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* =========================================================
          CLOSING CTA BANNER: LET'S RAISE THE STANDARD
      ========================================================= */}
      <section className="relative bg-deep-emerald text-white py-16 lg:py-20 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <Eyebrow chip="JOIN THE MOVEMENT" lightMode={true}>
                {BRAND.taglines.primary}
              </Eyebrow>

              <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white uppercase leading-tight">
                Let's Raise The Standard Together.
              </h2>

              <p className="text-sm sm:text-base text-sage-mist/90 max-w-xl leading-relaxed">
                Connect with certified professionals, participate in national policy dialogues, and access
                the benchmark standards for Environmental & Social practice in Nigeria.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/membership/register"
                  className="px-6 py-3.5 rounded-xl bg-heritage-gold hover:bg-heritage-gold-soft text-forest-green font-montserrat font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  Apply For Membership
                </Link>
                <Link
                  href="/about/contact"
                  className="px-6 py-3.5 rounded-xl border border-sage-mist/40 text-white hover:bg-white/10 font-montserrat font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Contact National Secretariat
                </Link>
              </div>
            </div>

            {/* Official Closing Action Card from brand graphics */}
            <div className="lg:col-span-4 bg-forest-green/80 rounded-2xl p-6 border border-sage-mist/20 backdrop-blur-xs space-y-4 shadow-xl">
              <span className="font-montserrat font-bold text-xs text-heritage-gold-soft uppercase tracking-wider block">
                PRACTITIONER ENGAGEMENT
              </span>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-deep-emerald/60 border border-sage-mist/10">
                  <Bookmark className="w-4 h-4 text-heritage-gold" />
                  <span><strong>SAVE</strong> this guide for future field reference.</span>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-deep-emerald/60 border border-sage-mist/10">
                  <Share2 className="w-4 h-4 text-heritage-gold" />
                  <span><strong>SHARE</strong> with a fellow E&S practitioner.</span>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-deep-emerald/60 border border-sage-mist/10">
                  <Globe2 className="w-4 h-4 text-heritage-gold" />
                  <span><strong>FOLLOW</strong> CESSPA for educational content.</span>
                </div>
              </div>

              <div className="pt-2 text-center text-xs text-sage-mist/80 border-t border-sage-mist/10">
                Official enquiries: <a href="mailto:info@cesspa.org.ng" className="text-white underline">info@cesspa.org.ng</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          REGULATORY AND PARTNERS STRIP
      ========================================================= */}
      <div className="bg-white py-8 border-b border-brand-border">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[11px] font-montserrat font-bold uppercase tracking-widest text-ink-muted">
            OPERATING IN HARMONY WITH NIGERIAN ENVIRONMENTAL & SOCIAL FRAMEWORKS
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 text-xs font-montserrat font-bold text-ink-muted/80">
            <span>Federal Ministry of Environment</span>
            <span>•</span>
            <span>EIA Act CAP E12 LFN 2004</span>
            <span>•</span>
            <span>NESREA Regulations</span>
            <span>•</span>
            <span>Multilateral E&S Safeguard Standards</span>
          </div>
        </div>
      </div>
    </div>
  );
}
