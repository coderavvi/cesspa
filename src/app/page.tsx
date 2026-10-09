import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Star,
  Globe2,
  Recycle,
  Trees,
  Droplets,
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
  Search,
} from "lucide-react";
import { IMAGES } from "@/lib/images";

export default function HomePage() {
  return (
    <div className="w-full bg-white text-ink-body font-sans">
      {/* =========================================================================
          1. HERO SECTION (Behance "Be Safe Control Environment" 100% Replication)
      ========================================================================== */}
      <section className="relative bg-[#072517] text-white overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Subtle background ambient light */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#16a34a]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Vertical "FOLLOW US" Bar (Behance Style) */}
            <div className="hidden xl:flex lg:col-span-1 flex-col items-center gap-6 text-gray-400">
              <span className="[writing-mode:vertical-lr] rotate-180 uppercase tracking-widest text-xs font-bold text-gray-400">
                Follow Us
              </span>
              <div className="w-[1px] h-12 bg-white/20" />
              <div className="flex flex-col gap-4 text-gray-400">
                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[#4ade80] transition-colors" aria-label="X">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#4ade80] transition-colors" aria-label="Facebook">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#4ade80] transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Hero Main Copy */}
            <div className="lg:col-span-7 xl:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#4ade80]">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                Natural Environment & Certified Standards
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                Be Safe Control <br />
                <span className="text-[#22c55e]">Environment</span>
              </h1>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl">
                Professionally optimize interdependent intellectual interoperable connect best practices.
                CESSPA unites certified environmental specialists to uphold rigorous ESIA benchmarks, statutory ecological audits, and sustainable national progress across Nigeria.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/membership"
                  className="bg-[#16a34a] hover:bg-[#15803d] text-white font-bold px-7 py-3.5 rounded-lg flex items-center gap-2.5 transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/about"
                  className="border border-white/30 hover:border-white text-white font-semibold px-7 py-3.5 rounded-lg transition-all hover:bg-white/5"
                >
                  Read More
                </Link>
              </div>
            </div>

            {/* Hero Visual (Sprouting Plant in Rich Dark Soil) */}
            <div className="lg:col-span-5 xl:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <Image
                  src={IMAGES.behance.heroSeedling}
                  alt="Young plant sprout flourishing in rich dark soil"
                  width={700}
                  height={550}
                  priority
                  className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#072517]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 bg-[#092e1d]/90 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-[#4ade80] font-semibold uppercase tracking-wider">National Ecological Mandate</div>
                      <div className="text-sm font-bold mt-0.5">Certified Environmental Professionals</div>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-[#16a34a] flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HERO TICKER RIBBON (Behance Green Full-Width Band)
      ========================================================================== */}
      <div className="bg-[#16a34a] text-white py-4 overflow-hidden border-y border-[#15803d]">
        <div className="flex items-center justify-around gap-8 text-sm sm:text-base font-bold tracking-wide uppercase whitespace-nowrap animate-marquee">
          <span className="flex items-center gap-3">
            <span>Ocean · River Cleanup</span>
            <span className="text-emerald-200">🌿</span>
          </span>
          <span className="flex items-center gap-3">
            <span>Environmental Standards</span>
            <span className="text-emerald-200">🌿</span>
          </span>
          <span className="flex items-center gap-3">
            <span>Renewable · Energy</span>
            <span className="text-emerald-200">🌿</span>
          </span>
          <span className="flex items-center gap-3">
            <span>Ecological Audits</span>
            <span className="text-emerald-200">🌿</span>
          </span>
          <span className="flex items-center gap-3">
            <span>Certified ESIA Experts</span>
            <span className="text-emerald-200">🌿</span>
          </span>
        </div>
      </div>

      {/* =========================================================================
          2. ABOUT SECTION ("Environmental Sustainable Forever Green Future")
      ========================================================================== */}
      <section className="py-20 lg:py-28 bg-[#f9fbf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Spherical Biosphere / Hands Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 group">
                <Image
                  src={IMAGES.behance.biosphereGlobe}
                  alt="Environmental sustainability and globe biosphere"
                  width={640}
                  height={500}
                  className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Decorative side dots */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 pattern-dots opacity-40 pointer-events-none hidden sm:block" />
            </div>

            {/* Right: Content & 2 Feature Items */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16a34a]">
                <Trees className="w-4 h-4" />
                ABOUT CESSPA
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1e17] leading-tight">
                Environmental Sustainable <br />
                Forever Green Future
              </h2>

              <p className="text-gray-600 text-base leading-relaxed">
                Alternative innovation to ethical network professional environmental whiteboards transparent growth national done.
                CESSPA sets the gold standard for statutory environmental baseline assessments, policy stewardship, and accredited practice throughout Nigeria.
              </p>

              {/* 2 Feature Items with Green Outline Circles */}
              <div className="space-y-6 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-[#16a34a] flex items-center justify-center text-[#16a34a] shrink-0 bg-white shadow-sm">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#0e1e17]">
                      Economic Benefits
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Alternative innovation after ethical to network environmental whiteboard transparent growth natural done.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-[#16a34a] flex items-center justify-center text-[#16a34a] shrink-0 bg-white shadow-sm">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#0e1e17]">
                      Safe Environment
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Alternative innovation after ethical to network environmental whiteboard transparent growth natural done.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold px-7 py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  <span>More About</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CORE SERVICES ("Echofy Provide Environment Best Leading Services")
      ========================================================================== */}
      <section id="services" className="py-20 lg:py-28 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-3">
                <Trees className="w-4 h-4" />
                OUR SERVICES
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1e17] leading-tight">
                CESSPA Provide Environment <br />
                Best Leading Services
              </h2>
            </div>

            {/* Slider arrows */}
            <div className="flex items-center gap-3">
              <button
                className="w-11 h-11 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="w-11 h-11 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white flex items-center justify-center transition-colors shadow-md"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 3 Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Cleaning Ocean */}
            <div className="bg-[#f9fbf9] border border-gray-100 rounded-2xl p-7 flex flex-col justify-between card-hover">
              <div>
                <div className="w-14 h-14 rounded-full border-2 border-[#16a34a] bg-white flex items-center justify-center text-[#16a34a] mb-6 shadow-sm">
                  <Droplets className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#0e1e17] mb-3">
                  Cleaning Ocean
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Alternative innovation to ethical network professional engineer high-payoff deliverables without exceptional natural to environment.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden h-48 w-full relative">
                <Image
                  src={IMAGES.behance.oceanCleanup}
                  alt="Cleaning ocean and water plastic removal"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Card 2: Safe Cleaning */}
            <div className="bg-[#f9fbf9] border border-gray-100 rounded-2xl p-7 flex flex-col justify-between card-hover">
              <div>
                <div className="w-14 h-14 rounded-full border-2 border-[#16a34a] bg-white flex items-center justify-center text-[#16a34a] mb-6 shadow-sm">
                  <Trees className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#0e1e17] mb-3">
                  Safe Cleaning
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Alternative innovation to ethical network environmental whiteboard transparent natural to environment.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden h-48 w-full relative">
                <Image
                  src={IMAGES.behance.handsPlanting}
                  alt="Safe cleaning and seedling protection"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Card 3: Dirty Recycling */}
            <div className="bg-[#f9fbf9] border border-gray-100 rounded-2xl p-7 flex flex-col justify-between card-hover">
              <div>
                <div className="w-14 h-14 rounded-full border-2 border-[#16a34a] bg-white flex items-center justify-center text-[#16a34a] mb-6 shadow-sm">
                  <Recycle className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#0e1e17] mb-3">
                  Dirty Recycling
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Alternative innovation to ethical network professional whiteboard transparent natural to environment.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden h-48 w-full relative">
                <Image
                  src={IMAGES.behance.plasticRecycling}
                  alt="Industrial recycling and waste disposal"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SKILLS & IMPACT SECTION ("Getting A Greener Future Safe Environment")
      ========================================================================== */}
      <section id="standards" className="py-20 lg:py-28 bg-[#f9fbf9] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Content, Checkmarks & Progress Bars */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16a34a]">
                <Trees className="w-4 h-4" />
                OUR SKILLS
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1e17] leading-tight">
                Getting A Greener Future <br />
                Safe Environment
              </h2>

              <p className="text-gray-600 text-base leading-relaxed">
                Competently cultivate worldwide e-tailers through principle-centered value professionally engineer high-payoff deliverables without exceptional processes. Rapidly network cost effective portals.
              </p>

              {/* 2 Pills Badges */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-[#0e1e17] shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                  Safe Environment
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-[#0e1e17] shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                  Dirty Recycling
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-5 pt-4">
                <div>
                  <div className="flex justify-between text-sm font-bold text-[#0e1e17] mb-2">
                    <span>Recycling</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#16a34a] rounded-full w-[90%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold text-[#0e1e17] mb-2">
                    <span>Ocean Cleaning</span>
                    <span>80%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#16a34a] rounded-full w-[80%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Hands holding plant shoot */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 group">
                <Image
                  src={IMAGES.behance.handsPlanting}
                  alt="Caring hands nurturing green seedling"
                  width={640}
                  height={480}
                  className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 pattern-dots opacity-40 pointer-events-none hidden sm:block" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. STATS COUNTER BANNER (Solid Green Behance Full-Width Band)
      ========================================================================== */}
      <section className="bg-[#16a34a] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {/* 100+ Team Member */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="font-heading text-4xl sm:text-5xl font-black tracking-tight">100+</div>
              <div className="text-emerald-100 text-sm font-semibold uppercase tracking-wider">Team Member</div>
            </div>

            {/* 960+ Complete Work */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <div className="font-heading text-4xl sm:text-5xl font-black tracking-tight">960+</div>
              <div className="text-emerald-100 text-sm font-semibold uppercase tracking-wider">Complete Work</div>
            </div>

            {/* 38 Award Winning */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div className="font-heading text-4xl sm:text-5xl font-black tracking-tight">38</div>
              <div className="text-emerald-100 text-sm font-semibold uppercase tracking-wider">Award Winning</div>
            </div>

            {/* 4.7 Avg Ratings */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center">
                <Star className="w-7 h-7 text-white" />
              </div>
              <div className="font-heading text-4xl sm:text-5xl font-black tracking-tight">4.7</div>
              <div className="text-emerald-100 text-sm font-semibold uppercase tracking-wider">Avg Ratings</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CALLOUT PROMO CARD ("Plant & Safe Trees")
      ========================================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#f4f8f4] border border-gray-100 rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-12 items-center">
            {/* Left: Sprouting tree image */}
            <div className="md:col-span-5 h-64 md:h-full relative min-h-[280px]">
              <Image
                src={IMAGES.behance.plantSprout}
                alt="Fresh environmental plant sprout"
                fill
                className="object-cover"
              />
            </div>

            {/* Right: Contact Callout */}
            <div className="md:col-span-7 p-8 sm:p-12 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16a34a]">
                <Trees className="w-4 h-4" />
                CONTACT US
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0e1e17] leading-snug">
                Fresh Environmental <br />
                Plant &amp; Safe Trees
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                Competently cultivate worldwide e-tailers through principle-centered value professionally engineer high-payoff deliverables without exceptional processes. Rapidly network cost effective portals.
              </p>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold px-6 py-3 rounded-lg transition-all shadow-md active:scale-95 text-sm"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FEATURED WORK / RECENT PROJECTS ("Finished the Latest Leading Environmental Works")
      ========================================================================== */}
      <section className="py-20 lg:py-28 bg-[#f9fbf9] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-3">
                <Trees className="w-4 h-4" />
                OUR PRODUCT
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1e17] leading-tight">
                Finished the Latest Leading <br />
                Environmental Works
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="w-11 h-11 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Previous work"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="w-11 h-11 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white flex items-center justify-center transition-colors shadow-md"
                aria-label="Next work"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 3 Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="relative rounded-2xl overflow-hidden shadow-md group h-[400px]">
              <Image
                src={IMAGES.behance.plasticRecycling}
                alt="Plastic Recycling project"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs font-semibold text-[#4ade80] uppercase tracking-wider">Recycling</span>
                <h3 className="font-heading font-bold text-xl text-white">Plastic Recycling</h3>
                <Link href="/resources/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#4ade80] transition-colors pt-1">
                  <span>View More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Project 2 */}
            <div className="relative rounded-2xl overflow-hidden shadow-md group h-[400px]">
              <Image
                src={IMAGES.behance.oceanCleanup}
                alt="Ocean Cleaning project"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs font-semibold text-[#4ade80] uppercase tracking-wider">Recycling</span>
                <h3 className="font-heading font-bold text-xl text-white">Ocean Cleaning</h3>
                <Link href="/resources/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#4ade80] transition-colors pt-1">
                  <span>View More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Project 3 */}
            <div className="relative rounded-2xl overflow-hidden shadow-md group h-[400px]">
              <Image
                src={IMAGES.behance.forestPreserve}
                alt="Cleaning forest project"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs font-semibold text-[#4ade80] uppercase tracking-wider">Recycling</span>
                <h3 className="font-heading font-bold text-xl text-white">Cleaning forest</h3>
                <Link href="/resources/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#4ade80] transition-colors pt-1">
                  <span>View More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. WORKING PROCESS ("Building a Greener Future")
      ========================================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-3">
            <Trees className="w-4 h-4" />
            WORKING PROGRESS
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1e17] mb-16">
            Building a Greener Future
          </h2>

          {/* 3 Step Flow with Arrows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full border-2 border-[#16a34a] bg-[#e8f7ed] flex items-center justify-center text-[#16a34a] shadow-sm">
                <Globe2 className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0e1e17]">
                Sustain Solution
              </h3>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                Proactively drive maintainable value next mission-critical infrastructure
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full border-2 border-[#16a34a] bg-[#e8f7ed] flex items-center justify-center text-[#16a34a] shadow-sm">
                <Recycle className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0e1e17]">
                Renewable Energy
              </h3>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                Proactively drive maintainable value next mission-critical infrastructure
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full border-2 border-[#16a34a] bg-[#e8f7ed] flex items-center justify-center text-[#16a34a] shadow-sm">
                <Trees className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0e1e17]">
                Fresh Environment
              </h3>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                Proactively drive maintainable value next mission-critical infrastructure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. TESTIMONIALS SECTION ("Clients Best Feedback About Echofy Provision")
      ========================================================================== */}
      <section className="py-20 lg:py-28 bg-[#f9fbf9] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-3">
                <Trees className="w-4 h-4" />
                TASTIMONIALS
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1e17] leading-tight">
                Clients Best Feedback About <br />
                CESSPA Provision
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="w-11 h-11 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="w-11 h-11 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white flex items-center justify-center transition-colors shadow-md"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 2 Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#16a34a]/30" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden relative border-2 border-[#16a34a]/30">
                    <Image
                      src={IMAGES.leadership.trustee2}
                      alt="John Joe"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#0e1e17]">John Joe</h4>
                    <p className="text-xs text-gray-500">UI/UX Designer &amp; Safeguards Auditor</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  &ldquo;Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown.&rdquo;
                </p>
              </div>
              <div className="pt-6">
                <span className="text-xs font-bold text-[#16a34a] uppercase tracking-wider">Service Quality</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#16a34a]/30" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden relative border-2 border-[#16a34a]/30">
                    <Image
                      src={IMAGES.leadership.trustee3}
                      alt="Diksha Rathod"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#0e1e17]">Diksha Rathod</h4>
                    <p className="text-xs text-gray-500">Web Designer &amp; ESG Consultant</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  &ldquo;Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown.&rdquo;
                </p>
              </div>
              <div className="pt-6">
                <span className="text-xs font-bold text-[#16a34a] uppercase tracking-wider">Supports</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. INSTITUTIONAL TRUST BAR ("All over the world 100,000+ Customers")
      ========================================================================== */}
      <section className="bg-[#16a34a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-wide">
            All over the world 100,000+ Customers
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-90 text-white font-bold text-lg sm:text-xl">
            <span className="tracking-widest">Walmart</span>
            <span className="tracking-widest">amazon</span>
            <span className="tracking-widest">envato</span>
            <span className="tracking-widest">EPEE</span>
            <span className="tracking-widest">envato</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. TEAM SECTION ("Meet Our Dedicated Members")
      ========================================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-3">
            <Trees className="w-4 h-4" />
            OUR TEAM
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1e17] mb-16">
            Meet Our Dedicated Members
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/* Member 1 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg relative group">
                <Image
                  src={IMAGES.leadership.trustee1}
                  alt="Connie Diaz"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#0e1e17]">Connie Diaz</h3>
                <p className="text-xs text-gray-500">CEO &amp; Founder</p>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[#16a34a] transition-colors" aria-label="X">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#16a34a] transition-colors" aria-label="Facebook">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#16a34a] transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              </div>
            </div>

            {/* Member 2 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg relative group">
                <Image
                  src={IMAGES.leadership.president}
                  alt="James E. Huey"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#0e1e17]">James E. Huey</h3>
                <p className="text-xs text-gray-500">Co Founder</p>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[#16a34a] transition-colors" aria-label="X">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#16a34a] transition-colors" aria-label="Facebook">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#16a34a] transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              </div>
            </div>

            {/* Member 3 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg relative group">
                <Image
                  src={IMAGES.leadership.trustee5}
                  alt="June D. Vargas"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#0e1e17]">June D. Vargas</h3>
                <p className="text-xs text-gray-500">Environmentalist</p>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[#16a34a] transition-colors" aria-label="X">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#16a34a] transition-colors" aria-label="Facebook">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#16a34a] transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. LATEST BLOG ("Building a Greener Future Together Forever")
      ========================================================================== */}
      <section className="py-20 lg:py-28 bg-[#f9fbf9] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-3">
                <Trees className="w-4 h-4" />
                LATEST BLOG
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1e17] leading-tight">
                Building a Greener Future <br />
                Together Forever
              </h2>
            </div>

            <Link
              href="/resources/blog"
              className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold px-6 py-3 rounded-lg transition-all shadow-md active:scale-95 text-sm shrink-0"
            >
              <span>View All Blog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog Card 1 */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm card-hover flex flex-col justify-between">
              <div>
                <div className="relative h-52 w-full">
                  <Image
                    src={IMAGES.behance.plasticRecycling}
                    alt="Top 10 Recycling tips"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-heading font-bold text-lg text-[#0e1e17] leading-snug">
                    Top 10 Recycling tips for Environment
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Competently cultivate worldwide e-tailers professionally engineer high
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                <span className="font-semibold text-[#0e1e17]">John Joe</span>
                <Link href="/resources/blog" className="text-[#16a34a] hover:text-[#15803d] font-bold">
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Blog Card 2 */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm card-hover flex flex-col justify-between">
              <div>
                <div className="relative h-52 w-full">
                  <Image
                    src={IMAGES.behance.handsPlanting}
                    alt="Top 10 Recycling tips"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-heading font-bold text-lg text-[#0e1e17] leading-snug">
                    Top 10 Recycling tips for Environment
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Competently cultivate worldwide e-tailers professionally engineer high
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                <span className="font-semibold text-[#0e1e17]">John Joe</span>
                <Link href="/resources/blog" className="text-[#16a34a] hover:text-[#15803d] font-bold">
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Blog Card 3 */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm card-hover flex flex-col justify-between">
              <div>
                <div className="relative h-52 w-full">
                  <Image
                    src={IMAGES.behance.oceanCleanup}
                    alt="Top 10 Recycling tips"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-heading font-bold text-lg text-[#0e1e17] leading-snug">
                    Top 10 Recycling tips for Environment
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Competently cultivate worldwide e-tailers professionally engineer high
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                <span className="font-semibold text-[#0e1e17]">John Joe</span>
                <Link href="/resources/blog" className="text-[#16a34a] hover:text-[#15803d] font-bold">
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
