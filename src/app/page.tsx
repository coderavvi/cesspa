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
  Search,
  Check,
} from "lucide-react";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Section } from "@/components/shared/Section";
import { StatCounter } from "@/components/shared/StatCounter";
import { CycleDiagram } from "@/components/shared/CycleDiagram";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { BRAND } from "@/lib/constants";
import { MOCK_TIERS, MOCK_EVENTS, MOCK_NEWS } from "@/lib/data/mockData";
import { formatNaira, formatDate } from "@/lib/utils";
import { IMAGES } from "@/lib/images";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-ivory">
      {/* =========================================================
          HERO SECTION (Da Vinci Renaissance Ecological Masterpiece)
      ========================================================= */}
      <section className="relative bg-gradient-to-b from-[#faf9f5] via-[#f4f7f2] to-[#eff4ec] pt-10 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
        {/* Subtle Da Vinci Sacred Geometry & Radial Sfumato Glow */}
        <div className="absolute inset-0 pattern-dots opacity-45 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-heritage-gold/10 to-leaf-accent/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-forest-green/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline, Subtitle, CTAs & Metrics */}
            <div className="lg:col-span-7 space-y-7">
              <Eyebrow chip="EST. NIGERIA">
                CHARTERED ENVIRONMENTAL & SOCIAL STANDARDS AUTHORITY
              </Eyebrow>

              <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[64px] text-ink-dark leading-[1.08] tracking-tight">
                Harmonizing Ecological Rigour{" "}
                <span className="font-serif italic text-forest-green font-normal relative inline-block">
                  with Human Dignity.
                  <span className="absolute bottom-1.5 left-0 w-full h-2.5 bg-heritage-gold/20 -z-10 rounded-sm" />
                </span>
              </h1>

              <p className="font-sans text-base sm:text-lg text-ink-body leading-relaxed max-w-2xl font-normal">
                Bridging the vital divide between official statutory certification and ethical, field-tested practice across Nigeria’s 36 states and the Federal Capital Territory.
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/membership/register"
                  className="px-7 py-4 rounded-full bg-gradient-to-r from-forest-green via-[#0e4e30] to-forest-green hover:from-deep-emerald hover:to-forest-green text-white font-sans font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl border border-heritage-gold/40 transition-all duration-300 flex items-center gap-2.5 group"
                >
                  <span>Apply for Membership</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/#pillars"
                  className="px-7 py-4 rounded-full border border-heritage-gold/60 hover:border-forest-green bg-white/80 hover:bg-white text-forest-green font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xs flex items-center gap-2"
                >
                  <span>Explore Technical Standards</span>
                </Link>

                <Link
                  href="/directory"
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-ink-body hover:text-forest-green transition-colors py-2 px-3 rounded-lg hover:bg-white/60"
                >
                  <Search className="w-3.5 h-3.5 text-heritage-gold" />
                  <span>Verify Practitioner</span>
                </Link>
              </div>

              {/* Trust Metric Counters */}
              <div className="pt-8 mt-4 border-t border-brand-border/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <StatCounter value={500} suffix="+" label="Chartered Members" sublabel="Across all 6 zones" />
                <StatCounter value={36} suffix=" States" label="National Reach" sublabel="+ FCT Secretariat" />
                <StatCounter value={6} suffix=" Zones" label="Zonal Chapters" sublabel="Coordinated councils" />
                <StatCounter value={50} suffix="+" label="CPD Masterclasses" sublabel="Annual field programs" />
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase (High-Definition Nature & Safeguards) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative Golden Vitruvian Aura */}
                <div className="absolute -top-8 -right-8 w-80 h-80 rounded-full bg-heritage-gold/15 blur-2xl pointer-events-none" />

                {/* Primary Masterpiece Feature Frame */}
                <div className="relative rounded-3xl overflow-hidden border border-heritage-gold/40 shadow-2xl bg-white p-3 group ring-1 ring-black/5">
                  <div className="relative aspect-4/3 sm:aspect-5/4 w-full rounded-2xl overflow-hidden bg-forest-green">
                    <Image
                      src={IMAGES.hero.canopy}
                      alt="Nigerian Emerald River Basin & Forest Canopy Preservation"
                      fill
                      className="object-cover group-hover:scale-104 transition-transform duration-700"
                      priority
                    />
                    {/* Artistic Gradient Sfumato Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#052115]/90 via-[#052115]/30 to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-heritage-gold-soft bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-heritage-gold/30">
                          STATUTORY EIA CAP E12
                        </span>
                        <span className="text-[10px] font-sans font-medium text-sage-mist/90">
                          Federal Ministry of Environment
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-lg sm:text-xl mt-2 text-white leading-snug">
                        Preserving Nigeria’s Living Heritage
                      </h4>
                      <p className="text-xs text-sage-mist/85 font-sans mt-1 line-clamp-2">
                        Empowering certified practitioners with independent scientific authority and ethical safeguards.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Glass Pill 1: ESIA Practice */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-xl rounded-2xl p-3.5 shadow-xl border border-heritage-gold/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-forest-green text-white flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-heritage-gold-soft" />
                  </div>
                  <div>
                    <span className="block font-sans font-bold text-xs text-ink-dark">
                      ESIA Protocol
                    </span>
                    <span className="text-[11px] font-sans text-ink-muted">Proactive Risk Screening</span>
                  </div>
                </div>

                {/* Floating Glass Pill 2: Social Safeguards */}
                <div className="absolute -bottom-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-xl rounded-2xl p-3.5 shadow-xl border border-heritage-gold/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-heritage-gold/20 text-forest-green flex items-center justify-center shrink-0 shadow-sm">
                    <Users className="w-5 h-5 text-forest-green" />
                  </div>
                  <div>
                    <span className="block font-sans font-bold text-xs text-ink-dark">
                      Social Safeguards
                    </span>
                    <span className="text-[11px] font-sans text-ink-muted">Community Trust & FPIC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          THE THREE SACRED GATEWAYS (Quick Action Navigation)
      ========================================================= */}
      <div className="bg-white border-y border-brand-border py-6">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Link
              href="/membership"
              className="flex items-center gap-4 p-4 rounded-2xl bg-sage-mist/50 hover:bg-forest-green/10 border border-brand-border/70 hover:border-heritage-gold/50 transition-all duration-300 group shadow-xs hover:shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-forest-green text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <Users className="w-5 h-5 text-heritage-gold-soft" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-xs uppercase tracking-wider text-forest-green">
                    1. Professional Membership
                  </span>
                  <ChevronRight className="w-4 h-4 text-ink-muted group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs font-sans text-ink-body mt-0.5">Explore 5 accredited tiers, fees & licensure</p>
              </div>
            </Link>

            <Link
              href="/events"
              className="flex items-center gap-4 p-4 rounded-2xl bg-sage-mist/50 hover:bg-forest-green/10 border border-brand-border/70 hover:border-heritage-gold/50 transition-all duration-300 group shadow-xs hover:shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-leaf-green text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-xs uppercase tracking-wider text-leaf-green">
                    2. Events & Masterclasses
                  </span>
                  <ChevronRight className="w-4 h-4 text-ink-muted group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs font-sans text-ink-body mt-0.5">National AGM, webinars & CPD field programs</p>
              </div>
            </Link>

            <Link
              href="/donate"
              className="flex items-center gap-4 p-4 rounded-2xl bg-sage-mist/50 hover:bg-forest-green/10 border border-brand-border/70 hover:border-heritage-gold/50 transition-all duration-300 group shadow-xs hover:shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-heritage-gold text-forest-green flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <Heart className="w-5 h-5 text-forest-green" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-xs uppercase tracking-wider text-ink-dark">
                    3. Public Impact Fund
                  </span>
                  <ChevronRight className="w-4 h-4 text-ink-muted group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs font-sans text-ink-body mt-0.5">Support public ESIA research & student bursaries</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================
          THE THREE ESIA PILLARS (Core Technical Standards)
      ========================================================= */}
      <Section variant="ivory" pattern="dots" id="pillars">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Eyebrow chip="TECHNICAL FRAMEWORK">THE THREE PILLARS OF ESIA</Eyebrow>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-ink-dark mt-2">
            What Every Certified Professional Must Uphold
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-forest-green via-heritage-gold to-forest-green mx-auto my-4 rounded-full" />
          <p className="font-sans text-base text-ink-body leading-relaxed font-normal">
            ESIA is not merely a statutory compliance exercise; it is an early preventive planning discipline that balances ecological integrity with community dignity.
          </p>
        </div>

        {/* 3 Pillar Deep-Dive Cards */}
        <div className="space-y-12">
          {/* PILLAR 01: Proactive Risk Identification */}
          <div className="rounded-3xl border border-brand-border bg-white shadow-sm overflow-hidden p-6 sm:p-8 lg:p-10 card-hover">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-forest-green text-white font-sans font-bold text-sm flex items-center justify-center shadow-xs">
                    01
                  </span>
                  <span className="font-sans font-bold text-xs text-heritage-gold uppercase tracking-widest">
                    PILLAR 01 • PROACTIVE RISK IDENTIFICATION
                  </span>
                </div>

                <h3 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-ink-dark">
                  Preventive Screening Before Groundbreaking
                </h3>

                <p className="font-sans text-sm sm:text-base text-ink-body leading-relaxed">
                  ESIA is far more than regulatory documentation. It is an engineering and planning tool that isolates environmental, ecological, and social vulnerabilities <strong>before</strong> statutory capital is committed.
                </p>

                <div className="pt-2">
                  <span className="font-sans font-bold text-xs uppercase tracking-wider text-forest-green block mb-2.5">
                    A rigorous ESIA systematically examines:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-ink-body">
                    {[
                      "Ecosystem baselines and critical habitats",
                      "Pollution controls & hazardous waste handling",
                      "Host community health, sanitation and safety",
                      "Resource efficiency & climate resilience models",
                      "Restoration of displaced artisanal livelihoods",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2 bg-sage-mist/60 p-3 rounded-xl border border-brand-border/60">
                        <CheckCircle2 className="w-4 h-4 text-leaf-green shrink-0 mt-0.5" />
                        <span className="font-sans">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Takeaway Strip */}
                <div className="p-4 rounded-xl bg-forest-green text-white flex items-center justify-between gap-4 mt-4">
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase text-heritage-gold-soft tracking-wider block">
                      CORE MANDATE:
                    </span>
                    <span className="text-xs sm:text-sm font-sans font-medium">
                      Identify risks early and design actionable, verifiable mitigation measures.
                    </span>
                  </div>
                  <span className="text-xs font-sans font-bold text-heritage-gold uppercase tracking-wider shrink-0 hidden sm:inline">
                    Assess First. Mitigate Early.
                  </span>
                </div>
              </div>

              {/* Graphic for Pillar 01 */}
              <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-brand-border bg-sage-mist group">
                <Image
                  src={IMAGES.pillars.riskScreening}
                  alt="Environmental Surveyors Conducting Pre-Construction Risk Assessment"
                  fill
                  className="object-cover group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-heritage-gold-soft bg-forest-green/90 px-2 py-0.5 rounded">
                    FIELD SCREENING
                  </span>
                  <p className="text-xs font-sans mt-1 text-sage-mist/90">
                    Scientific sensor mapping on rural development corridors
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PILLAR 02: Social & Community Safeguards */}
          <div className="rounded-3xl border border-brand-border bg-white shadow-sm overflow-hidden p-6 sm:p-8 lg:p-10 card-hover">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Graphic for Pillar 02 */}
              <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-brand-border bg-sage-mist order-last lg:order-first group">
                <Image
                  src={IMAGES.pillars.socialSafeguards}
                  alt="Participatory Host Community Dialogue and Social Safeguards"
                  fill
                  className="object-cover group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-heritage-gold-soft bg-forest-green/90 px-2 py-0.5 rounded">
                    HUMAN DIGNITY
                  </span>
                  <p className="text-xs font-sans mt-1 text-sage-mist/90">
                    Free, Prior and Informed Consultation with host elders
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-forest-green text-white font-sans font-bold text-sm flex items-center justify-center shadow-xs">
                    02
                  </span>
                  <span className="font-sans font-bold text-xs text-heritage-gold uppercase tracking-widest">
                    PILLAR 02 • SOCIAL & COMMUNITY SAFEGUARDS
                  </span>
                </div>

                <h3 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-ink-dark">
                  Environmental Sustainability Must Include People
                </h3>

                <p className="font-sans text-sm sm:text-base text-ink-body leading-relaxed">
                  Responsible development safeguards both nature and the human communities whose livelihood depends upon it. Projects that ignore social harmony court disaster.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    {
                      num: "01",
                      title: "Stakeholder Engagement",
                      desc: "Transparent, continuous consultation with host communities and customary leaders.",
                    },
                    {
                      num: "02",
                      title: "Livelihoods Protection",
                      desc: "Safeguarding farming, artisanal fishing, and local trade from disruption.",
                    },
                    {
                      num: "03",
                      title: "Resettlement Integrity",
                      desc: "Ethical relocation and prompt, equitable compensation benchmarks.",
                    },
                    {
                      num: "04",
                      title: "Vulnerable Group Inclusion",
                      desc: "Giving voice to women, youth, elders, and persons with disabilities.",
                    },
                  ].map((item) => (
                    <div key={item.num} className="p-3.5 rounded-xl border border-brand-border bg-sage-mist/40 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-sans font-bold text-leaf-green bg-white px-2 py-0.5 rounded border border-brand-border">
                          {item.num}
                        </span>
                        <h5 className="font-sans font-bold text-xs sm:text-sm text-ink-dark">
                          {item.title}
                        </h5>
                      </div>
                      <p className="text-xs font-sans text-ink-body">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Key Takeaway Strip */}
                <div className="p-4 rounded-xl bg-sage-mist border border-leaf-accent/40 flex items-center gap-3 mt-4">
                  <Leaf className="w-5 h-5 text-leaf-green shrink-0" />
                  <div className="text-xs sm:text-sm text-ink-dark font-sans font-medium">
                    <strong className="text-forest-green">Key Principle:</strong> Development is only sustainable when it protects both ecological assets and community rights.
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
                    <span className="w-10 h-10 rounded-xl bg-forest-green text-white font-sans font-bold text-sm flex items-center justify-center shadow-xs">
                      03
                    </span>
                    <span className="font-sans font-bold text-xs text-heritage-gold uppercase tracking-widest">
                      PILLAR 03 • LIFECYCLE MONITORING
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-ink-dark mt-1">
                    Continuous Monitoring & Adaptive Governance
                  </h3>
                </div>

                <div className="bg-heritage-gold/15 border border-heritage-gold/30 px-3.5 py-1.5 rounded-xl text-xs font-sans font-bold text-ink-dark flex items-center gap-2 self-start sm:self-auto">
                  <Activity className="w-4 h-4 text-heritage-gold" />
                  "What gets monitored can be improved."
                </div>
              </div>

              <p className="font-sans text-sm sm:text-base text-ink-body leading-relaxed max-w-3xl">
                Statutory approval is merely the inception of environmental responsibility. Environmental and social metrics must be audited, tracked, and transparently published across the lifecycle.
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
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Eyebrow chip="FOUNDATION" lightMode={true}>
                PEACE & COMMUNITY RELATIONS
              </Eyebrow>

              <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
                Peace Starts With How Communities Are Treated
              </h2>

              <p className="font-sans text-sm sm:text-base text-sage-mist/90 leading-relaxed font-normal">
                A peaceful, cooperative relationship between an infrastructure sponsor and its host community is neither accidental nor transactional. It is rooted in four non-negotiable principles:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  {
                    title: "Listening",
                    desc: "Genuinely hearing host community anxieties before designs and engineering contracts are finalized.",
                  },
                  {
                    title: "Respect",
                    desc: "Honoring indigenous customs, sacred heritage grooves, customary elders, and traditional leadership.",
                  },
                  {
                    title: "Inclusion",
                    desc: "Proactively inviting youth, women, farmers, and marginalized families into dialogue chambers.",
                  },
                  {
                    title: "Accountability",
                    desc: "Operating responsive grievance redress mechanisms that redress verified impacts promptly.",
                  },
                ].map((item) => (
                  <div key={item.title} className="p-4 rounded-2xl bg-deep-emerald/80 border border-sage-mist/20 space-y-1.5 shadow-sm">
                    <h5 className="font-sans font-bold text-sm text-heritage-gold-soft uppercase tracking-wider">
                      {item.title}
                    </h5>
                    <p className="font-sans text-xs text-sage-mist/85 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Pull Quote */}
              <blockquote className="font-serif text-xl sm:text-2xl italic text-white border-l-2 border-heritage-gold pl-5 py-2">
                "When people feel heard, respected and protected, trust becomes possible."
              </blockquote>

              {/* Formula Badge */}
              <div className="p-4 rounded-xl bg-deep-emerald border border-heritage-gold/40 text-xs sm:text-sm font-sans font-bold text-center text-heritage-gold-soft tracking-wide">
                {BRAND.formula}
              </div>
            </div>

            {/* Visual Graphic: High-Resolution Community Stewardship */}
            <div className="lg:col-span-5 relative aspect-square rounded-3xl overflow-hidden border border-sage-mist/30 shadow-2xl group">
              <Image
                src={IMAGES.pillars.peaceFoundation}
                alt="Community Environmental Stewardship and Peacebuilding"
                fill
                className="object-cover group-hover:scale-104 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-emerald/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-heritage-gold-soft bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-heritage-gold/30">
                  MUTUAL RESPECT
                </span>
                <h4 className="font-serif font-bold text-lg mt-2 text-white">
                  Cooperation in the Field
                </h4>
                <p className="font-sans text-xs text-sage-mist/85 mt-1">
                  Harmonizing modern infrastructure with indigenous African conservation values.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* =========================================================
          VALUES: UPHOLDING PROFESSIONAL EXCELLENCE
      ========================================================= */}
      <Section variant="sage">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Eyebrow chip="OUR ETHOS">UPHOLDING PROFESSIONAL EXCELLENCE</Eyebrow>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-ink-dark mt-2">
            Responsibility Beyond Compliance
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-forest-green via-heritage-gold to-forest-green mx-auto my-3 rounded-full" />
          <p className="font-sans text-sm sm:text-base text-ink-body">
            As chartered Environmental & Social practitioners in Nigeria, our statutory mandate is governed by five unwavering tenets.
          </p>
        </div>

        {/* 5 Value Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {[
            {
              title: "Environmental Protection",
              icon: Leaf,
              desc: "Preserving Nigerian ecosystems, soils, watersheds, and biodiversity.",
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
                className="rounded-2xl p-6 bg-white border border-brand-border text-center flex flex-col items-center justify-between card-hover space-y-3"
              >
                <div className="w-14 h-14 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center ring-4 ring-forest-green/5">
                  <Icon className="w-6 h-6 text-forest-green" />
                </div>
                <div>
                  <span className="text-[10px] font-sans font-bold text-heritage-gold uppercase tracking-wider block">
                    0{idx + 1}
                  </span>
                  <h4 className="font-serif font-bold text-base text-ink-dark mt-1">
                    {val.title}
                  </h4>
                  <p className="font-sans text-xs text-ink-muted mt-2 leading-relaxed">{val.desc}</p>
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
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-ink-dark mt-1">
              Find Your Professional Category
            </h2>
          </div>
          <Link
            href="/membership"
            className="inline-flex items-center gap-1.5 font-sans font-bold text-xs uppercase tracking-wider text-forest-green hover:text-deep-emerald underline underline-offset-4"
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
              className={`rounded-2xl p-7 bg-white border flex flex-col justify-between transition-all duration-300 relative ${
                tier.isPopular
                  ? "border-forest-green ring-2 ring-forest-green/20 shadow-xl"
                  : "border-brand-border hover:border-heritage-gold shadow-sm"
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-6 bg-heritage-gold text-forest-green text-[10px] font-sans font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                  MOST POPULAR BENCHMARK
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-ink-dark">
                    {tier.name}
                  </h3>
                  <p className="font-sans text-xs text-ink-muted mt-1">{tier.tagline}</p>
                </div>

                <div className="pt-2 border-t border-brand-border/60">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif font-bold text-3xl sm:text-4xl text-forest-green">
                      {formatNaira(tier.annualFee, false)}
                    </span>
                    <span className="font-sans text-xs text-ink-muted">/{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 pt-2 text-xs text-ink-body font-sans">
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
                  className={`w-full py-3 rounded-full font-sans font-bold text-xs uppercase tracking-wider text-center block transition-all ${
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
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-ink-dark mt-1">
              Upcoming Conferences & Masterclasses
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 font-sans font-bold text-xs uppercase tracking-wider text-forest-green hover:text-deep-emerald underline underline-offset-4"
          >
            View Full Event Calendar
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Conference Banner */}
        {MOCK_EVENTS[0] && (
          <div className="rounded-3xl bg-forest-green text-white p-6 sm:p-8 lg:p-10 mb-8 shadow-xl relative overflow-hidden border border-heritage-gold/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-heritage-gold text-forest-green font-sans font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                    NATIONAL FLAGSHIP EVENT
                  </span>
                  <span className="text-sage-mist text-xs font-sans">
                    {formatDate(MOCK_EVENTS[0].date)} • {MOCK_EVENTS[0].location}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-white">
                  {MOCK_EVENTS[0].title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-sage-mist/90 max-w-2xl leading-relaxed">
                  {MOCK_EVENTS[0].description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={`/events/${MOCK_EVENTS[0].slug}`}
                    className="px-6 py-3 rounded-full bg-white text-forest-green hover:bg-sage-mist font-sans font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                  >
                    View Agenda & Register
                  </Link>
                  <span className="text-xs font-sans text-heritage-gold-soft font-semibold">
                    Earn {MOCK_EVENTS[0].cpdPoints} CPD Points for Certification
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 relative aspect-video rounded-2xl overflow-hidden border border-sage-mist/20 shadow-lg">
                <Image
                  src={IMAGES.events.nationalConference}
                  alt="CESSPA National Conference at Abuja International Conference Centre"
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
                  <span className="font-sans font-bold text-leaf-green bg-sage-mist px-2.5 py-0.5 rounded-full">
                    {event.category}
                  </span>
                  <span className="font-sans text-ink-muted">{formatDate(event.date)}</span>
                </div>

                <h4 className="font-serif font-bold text-xl text-ink-dark">
                  {event.title}
                </h4>

                <p className="font-sans text-xs text-ink-body line-clamp-2 leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-brand-border/60 flex items-center justify-between text-xs font-sans">
                <span className="font-semibold text-forest-green">
                  {event.fee === 0 ? "Complimentary" : formatNaira(event.fee)}
                </span>
                <Link
                  href={`/events/${event.slug}`}
                  className="font-bold text-forest-green hover:text-heritage-gold flex items-center gap-1"
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
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-ink-dark mt-1">
              Latest E&S Safeguards Analysis
            </h2>
          </div>
          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-1.5 font-sans font-bold text-xs uppercase tracking-wider text-forest-green hover:text-deep-emerald underline underline-offset-4"
          >
            Browse All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_NEWS.map((article) => (
            <article
              key={article.id}
              className="rounded-3xl overflow-hidden bg-white border border-brand-border card-hover flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 w-full bg-forest-green/10">
                  <Image
                    src={article.coverImage || IMAGES.hero.fieldScientist}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-forest-green text-white text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-sans text-ink-muted">
                    <span>{formatDate(article.publishDate)}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-ink-dark line-clamp-2 hover:text-forest-green transition-colors">
                    <Link href={`/resources/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="font-sans text-xs text-ink-body line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/resources/blog/${article.slug}`}
                  className="font-sans font-bold text-xs text-forest-green hover:text-heritage-gold flex items-center gap-1"
                >
                  Read Full Analysis <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* =========================================================
          CLOSING MASTERPIECE BANNER: LET'S RAISE THE STANDARD
      ========================================================= */}
      <section className="relative bg-deep-emerald text-white py-20 lg:py-24 overflow-hidden">
        {/* Da Vinci Geometric Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-heritage-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-leaf-accent/10 blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <Eyebrow chip="JOIN THE MOVEMENT" lightMode={true}>
                {BRAND.taglines.primary}
              </Eyebrow>

              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                Let's Raise The Standard Together.
              </h2>

              <p className="font-sans text-sm sm:text-base text-sage-mist/90 max-w-2xl leading-relaxed font-normal">
                Connect with certified professionals, participate in national policy dialogues, and access the benchmark statutory standards for Environmental & Social practice across Nigeria.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href="/membership/register"
                  className="px-8 py-4 rounded-full bg-heritage-gold hover:bg-heritage-gold-soft text-forest-green font-sans font-bold text-xs uppercase tracking-wider shadow-xl transition-all"
                >
                  Apply For Membership
                </Link>
                <Link
                  href="/about/contact"
                  className="px-8 py-4 rounded-full border border-sage-mist/40 text-white hover:bg-white/10 font-sans font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Contact National Secretariat
                </Link>
              </div>
            </div>

            {/* Practitioner Engagement Card */}
            <div className="lg:col-span-4 bg-forest-green/85 rounded-3xl p-7 border border-heritage-gold/30 backdrop-blur-md space-y-4 shadow-2xl">
              <span className="font-sans font-bold text-xs text-heritage-gold-soft uppercase tracking-wider block">
                PRACTITIONER ENGAGEMENT
              </span>

              <div className="space-y-2.5 text-xs font-sans">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-deep-emerald/70 border border-sage-mist/10">
                  <Bookmark className="w-4 h-4 text-heritage-gold shrink-0" />
                  <span><strong>SAVE</strong> this guide for field assessment reference.</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-deep-emerald/70 border border-sage-mist/10">
                  <Share2 className="w-4 h-4 text-heritage-gold shrink-0" />
                  <span><strong>SHARE</strong> with fellow environmental engineers.</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-deep-emerald/70 border border-sage-mist/10">
                  <Globe2 className="w-4 h-4 text-heritage-gold shrink-0" />
                  <span><strong>FOLLOW</strong> CESSPA for regulatory bulletins.</span>
                </div>
              </div>

              <div className="pt-2 text-center text-xs text-sage-mist/80 border-t border-sage-mist/10 font-sans">
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
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-ink-muted">
            OPERATING IN HARMONY WITH NIGERIAN STATUTORY FRAMEWORKS
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 text-xs font-sans font-semibold text-ink-muted/80">
            <span>Federal Ministry of Environment</span>
            <span>•</span>
            <span>EIA Act CAP E12 LFN 2004</span>
            <span>•</span>
            <span>NESREA Regulations</span>
            <span>•</span>
            <span>World Bank ESS Standards</span>
          </div>
        </div>
      </div>
    </div>
  );
}
