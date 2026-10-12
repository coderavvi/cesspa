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
  FileText,
} from "lucide-react";
import { IMAGES } from "@/lib/images";

export default function HomePage() {
  return (
    <div className="w-full bg-white text-ink-body font-sans">
      {/* =========================================================================
          1. HERO SECTION (Behance Structure with Authentic CESSPA Mandate)
      ========================================================================== */}
      <section className="relative bg-[#072517] text-white overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Subtle background ambient light */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#16a34a]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6 2xl:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Vertical "FOLLOW US" Bar (Behance Style) */}
            <div className="hidden xl:flex lg:col-span-1 flex-col items-center gap-6 text-white/80">
              <span className="[writing-mode:vertical-lr] rotate-180 uppercase tracking-widest text-xs font-bold text-white/80">
                Follow Us
              </span>
              <div className="w-[1px] h-12 bg-white/30" />
              <div className="flex flex-col gap-4 text-white/80">
                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="X">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Hero Main Copy */}
            <div className="lg:col-span-7 xl:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#86efac] bg-[#16a34a]/30 px-3.5 py-1.5 rounded-full border border-[#4ade80]/40 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse shadow-[0_0_8px_#4ade80]" />
                <span>Environmental &amp; Social Standards • Nigeria</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                Raising Standards, <br />
                <span className="text-[#4ade80] drop-shadow-[0_2px_10px_rgba(74,222,128,0.3)]">Guarding Ecology</span>
              </h1>

              <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-xl font-medium">
                The unified statutory professional body for Environmental &amp; Social (E&amp;S) standards in Nigeria.
                We advance rigorous <span className="text-[#86efac] font-bold">ESIA benchmarks</span>, statutory ecological audits, and <span className="text-[#86efac] font-bold">certified practitioner excellence</span> to safeguard national biodiversity and community welfare.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/membership/register"
                  className="bg-[#16a34a] hover:bg-[#15803d] text-white font-bold px-7 py-3.5 rounded-lg flex items-center gap-2.5 transition-all shadow-lg hover:shadow-xl active:scale-95 border border-[#4ade80]/30"
                >
                  <span>Apply for Certification</span>
                  <ArrowRight className="w-4 h-4 text-[#86efac]" />
                </Link>

                <Link
                  href="/about"
                  className="border border-[#4ade80]/40 hover:border-white text-white font-semibold px-7 py-3.5 rounded-lg transition-all hover:bg-white/10"
                >
                  Explore Our Mandate
                </Link>
              </div>
            </div>

            {/* Hero Visual (Sprouting Plant in Rich Dark Soil) */}
            <div className="lg:col-span-5 xl:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#4ade80]/20 group">
                <Image
                  src={IMAGES.behance.heroSeedling}
                  alt="Environmental protection and ecological renewal in Nigeria"
                  width={700}
                  height={550}
                  priority
                  className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#072517]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 bg-[#092e1d]/95 backdrop-blur-md border border-[#4ade80]/30 rounded-xl p-4 text-white shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-[#86efac] font-bold uppercase tracking-wider">Federal Safeguards Mandate</div>
                      <div className="text-sm font-bold mt-0.5 text-white">Certified Environmental Professionals</div>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-[#16a34a] border border-[#4ade80]/40 flex items-center justify-center text-[#86efac]">
                      <ShieldCheck className="w-5 h-5 text-[#86efac]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HERO TICKER RIBBON (Full-Width Green Band)
      ========================================================================== */}
      <div className="bg-[#16a34a] py-4 overflow-hidden border-y border-[#15803d]">
        <div className="flex items-center justify-around gap-8 text-sm sm:text-base font-bold tracking-wide uppercase whitespace-nowrap animate-marquee">
          <span className="flex items-center gap-3">
            <span className="text-white">ESIA Statutory Safeguards</span>
            <span className="text-[#86efac]">🌿</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="text-[#dcfce7]">Environmental Audit &amp; Compliance</span>
            <span className="text-[#4ade80]">🌿</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="text-white">Ecological &amp; Marine Remediation</span>
            <span className="text-[#86efac]">🌿</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="text-[#dcfce7]">Resettlement Action Frameworks (RAP)</span>
            <span className="text-[#4ade80]">🌿</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="text-white">Certified Practitioner Registry</span>
            <span className="text-[#86efac]">🌿</span>
          </span>
        </div>
      </div>

      {/* =========================================================================
          2. ABOUT SECTION ("Environmental Sustainable Forever Green Future")
      ========================================================================== */}
      <section className="py-20 lg:py-28 bg-[#f9fbf9]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6 2xl:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Spherical Biosphere / Hands Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 group">
                <Image
                  src={IMAGES.behance.biosphereGlobe}
                  alt="Sustainable ecological development and environmental monitoring"
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
                Environmental &amp; Social Standards <br />
                for Nigeria&apos;s Sustainable Future
              </h2>

              <p className="text-gray-600 text-base leading-relaxed">
                CESSPA bridges federal statutory environmental guidelines, multilateral financing standards, and grassroots ecological preservation across Nigeria.
                We establish certified benchmarks for environmental baseline audits, impact screening, and ethical practitioner conduct.
              </p>

              {/* 2 Feature Items with Green Outline Circles */}
              <div className="space-y-6 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-[#16a34a] flex items-center justify-center text-[#16a34a] shrink-0 bg-white shadow-sm">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#0e1e17]">
                      Statutory Defensibility &amp; Economic Value
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Enabling national infrastructure, power, and industrial projects with legally robust, bankable ESIA documentation aligned with FMEnv and World Bank standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-[#16a34a] flex items-center justify-center text-[#16a34a] shrink-0 bg-white shadow-sm">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#0e1e17]">
                      Community Safeguards &amp; Ecological Health
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Safeguarding host community rights, resettlement equity, and vital ecosystems through continuous monitoring across Nigeria&apos;s six geopolitical zones.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold px-7 py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  <span>Discover Our Mandate</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CORE SERVICES ("CESSPA Provide Environment Best Leading Services")
      ========================================================================== */}
      <section id="services" className="py-20 lg:py-28 bg-white border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6 2xl:px-8">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-3">
                <Trees className="w-4 h-4" />
                CORE PILLARS &amp; SERVICES
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1e17] leading-tight">
                CESSPA Provides Foremost <br />
                Environmental &amp; Social Solutions
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
            {/* Card 1: Marine Remediation */}
            <div className="bg-[#f9fbf9] border border-gray-100 rounded-2xl p-7 flex flex-col justify-between card-hover">
              <div>
                <div className="w-14 h-14 rounded-full border-2 border-[#16a34a] bg-white flex items-center justify-center text-[#16a34a] mb-6 shadow-sm">
                  <Droplets className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#0e1e17] mb-3">
                  Marine &amp; River Remediation
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Specialized baseline water monitoring, hydrocarbon impact audits, and aquatic habitat restoration for the Niger Delta and inland river basins.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden h-48 w-full relative">
                <Image
                  src={IMAGES.behance.oceanCleanup}
                  alt="Waterway cleanup and marine habitat protection"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Card 2: ESIA & Ecological Safeguards */}
            <div className="bg-[#f9fbf9] border border-gray-100 rounded-2xl p-7 flex flex-col justify-between card-hover">
              <div>
                <div className="w-14 h-14 rounded-full border-2 border-[#16a34a] bg-white flex items-center justify-center text-[#16a34a] mb-6 shadow-sm">
                  <Trees className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#0e1e17] mb-3">
                  ESIA &amp; Ecological Safeguards
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Comprehensive Environmental &amp; Social Impact Assessments, critical biodiversity screening, and statutory FMEnv approval facilitation.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden h-48 w-full relative">
                <Image
                  src={IMAGES.behance.handsPlanting}
                  alt="Ecological safeguards and tree conservation"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Card 3: Statutory Audits & Compliance */}
            <div className="bg-[#f9fbf9] border border-gray-100 rounded-2xl p-7 flex flex-col justify-between card-hover">
              <div>
                <div className="w-14 h-14 rounded-full border-2 border-[#16a34a] bg-white flex items-center justify-center text-[#16a34a] mb-6 shadow-sm">
                  <Recycle className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#0e1e17] mb-3">
                  Statutory Audits &amp; Recycling
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Post-commissioning compliance audits, industrial effluent verification, and statutory NESREA &amp; NOSDRA regulatory reporting.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden h-48 w-full relative">
                <Image
                  src={IMAGES.behance.plasticRecycling}
                  alt="Industrial environmental audits and recycling compliance"
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
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6 2xl:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Content, Checkmarks & Progress Bars */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16a34a]">
                <Trees className="w-4 h-4" />
                OUR IMPACT &amp; RIGOUR
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1e17] leading-tight">
                Setting National Benchmarks <br />
                for Safeguard Excellence
              </h2>

              <p className="text-gray-600 text-base leading-relaxed">
                CESSPA enforces peer-reviewed accreditation frameworks ensuring certified practitioners possess the technical acumen and ethical dedication needed to protect communities and ecosystems in major national projects.
              </p>

              {/* 2 Pills Badges */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-[#0e1e17] shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                  FMEnv Statutory Compliance
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-[#0e1e17] shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                  Cryptographic Practitioner Seals
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-5 pt-4">
                <div>
                  <div className="flex justify-between text-sm font-bold text-[#0e1e17] mb-2">
                    <span>ESIA Statutory Compliance Benchmark</span>
                    <span>98%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#16a34a] rounded-full w-[98%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold text-[#0e1e17] mb-2">
                    <span>National Safeguard Audit Acceptance</span>
                    <span>94%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#16a34a] rounded-full w-[94%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Hands holding plant shoot */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 group">
                <Image
                  src={IMAGES.behance.handsPlanting}
                  alt="Nurturing ecological safeguards in Nigeria"
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
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6 2xl:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {/* 2,500+ Certified Practitioners */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-14 h-14 rounded-full border-2 border-[#86efac] bg-white/10 flex items-center justify-center text-[#86efac] shadow-xs">
                <Users className="w-7 h-7" />
              </div>
              <div className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-white">2,500+</div>
              <div className="text-[#dcfce7] text-sm font-bold uppercase tracking-wider">Certified Practitioners</div>
            </div>

            {/* 960+ Approved ESIAs */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-14 h-14 rounded-full border-2 border-[#86efac] bg-white/10 flex items-center justify-center text-[#86efac] shadow-xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-white">960+</div>
              <div className="text-[#dcfce7] text-sm font-bold uppercase tracking-wider">Approved ESIA Studies</div>
            </div>

            {/* 36 States & FCT */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-14 h-14 rounded-full border-2 border-[#86efac] bg-white/10 flex items-center justify-center text-[#86efac] shadow-xs">
                <Award className="w-7 h-7" />
              </div>
              <div className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-white">36</div>
              <div className="text-[#dcfce7] text-sm font-bold uppercase tracking-wider">States &amp; FCT Coverage</div>
            </div>

            {/* 99.4% Regulatory Approval */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-14 h-14 rounded-full border-2 border-[#86efac] bg-white/10 flex items-center justify-center text-[#86efac] shadow-xs">
                <Star className="w-7 h-7" />
              </div>
              <div className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-white">99.4%</div>
              <div className="text-[#dcfce7] text-sm font-bold uppercase tracking-wider">Regulatory Acceptance</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CALLOUT PROMO CARD ("Plant & Safe Trees" / Membership Admission)
      ========================================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#f4f8f4] border border-gray-100 rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-12 items-center">
            {/* Left: Sprouting tree image */}
            <div className="md:col-span-5 h-64 md:h-full relative min-h-[280px]">
              <Image
                src={IMAGES.behance.plantSprout}
                alt="Advance your environmental career with CESSPA certification"
                fill
                className="object-cover"
              />
            </div>

            {/* Right: Contact Callout */}
            <div className="md:col-span-7 p-8 sm:p-12 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16a34a]">
                <Trees className="w-4 h-4" />
                PROFESSIONAL ADMISSION
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0e1e17] leading-snug">
                Advance Your Practice with <br />
                CESSPA Certification
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                Join an esteemed network of Fellows, Certified Professionals, and Corporate Members leading Nigeria&apos;s transition toward sustainable, socially responsible development.
              </p>

              <div className="pt-2">
                <Link
                  href="/membership/register"
                  className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold px-6 py-3 rounded-lg transition-all shadow-md active:scale-95 text-sm"
                >
                  <span>Apply for Membership</span>
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
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6 2xl:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-3">
                <Trees className="w-4 h-4" />
                FIELD ENGAGEMENTS
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1e17] leading-tight">
                High-Impact National <br />
                Environmental Engagements
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
            {/* Project 1: Mangrove Ecosystem */}
            <div className="relative rounded-2xl overflow-hidden shadow-md group h-[400px]">
              <Image
                src={IMAGES.behance.plasticRecycling}
                alt="Mangrove Ecosystem Restoration in Niger Delta"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs font-bold text-[#dcfce7] uppercase tracking-wider bg-[#16a34a] border border-[#86efac]/40 px-2.5 py-1 rounded inline-block">Ecology</span>
                <h3 className="font-heading font-bold text-xl text-white">Mangrove Ecosystem Restoration</h3>
                <Link href="/resources/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#86efac] hover:text-white transition-all pt-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#86efac]" />
                </Link>
              </div>
            </div>

            {/* Project 2: Clean Energy Solar Corridor ESIA */}
            <div className="relative rounded-2xl overflow-hidden shadow-md group h-[400px]">
              <Image
                src={IMAGES.behance.oceanCleanup}
                alt="Solar Corridor ESIA and Social Safeguards"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs font-bold text-[#dcfce7] uppercase tracking-wider bg-[#16a34a] border border-[#86efac]/40 px-2.5 py-1 rounded inline-block">Energy &amp; Climate</span>
                <h3 className="font-heading font-bold text-xl text-white">Clean Energy Grid ESIA Oversight</h3>
                <Link href="/resources/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#86efac] hover:text-white transition-all pt-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#86efac]" />
                </Link>
              </div>
            </div>

            {/* Project 3: Industrial Effluent Compliance */}
            <div className="relative rounded-2xl overflow-hidden shadow-md group h-[400px]">
              <Image
                src={IMAGES.behance.forestPreserve}
                alt="Industrial Effluent Compliance Audits"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs font-bold text-[#dcfce7] uppercase tracking-wider bg-[#16a34a] border border-[#86efac]/40 px-2.5 py-1 rounded inline-block">Compliance</span>
                <h3 className="font-heading font-bold text-xl text-white">Industrial Effluent Baseline Audits</h3>
                <Link href="/resources/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#86efac] hover:text-white transition-all pt-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#86efac]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. WORKING PROCESS ("Building a Greener Future" / 3-Tier Pathway)
      ========================================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6 2xl:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-3">
            <Trees className="w-4 h-4" />
            ACCREDITATION PATHWAY
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1e17] mb-16">
            How CESSPA Certifies Practitioners
          </h2>

          {/* 3 Step Flow with Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#16a34a] border-2 border-[#86efac] flex items-center justify-center text-[#86efac] shadow-md group-hover:scale-105 transition-transform">
                <FileText className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0e1e17]">
                <span className="text-[#16a34a] font-extrabold mr-1">01.</span> Application &amp; Vetting
              </h3>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                Comprehensive evaluation of academic credentials, minimum 5 years field experience, and verifiable project portfolio.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#16a34a] border-2 border-[#86efac] flex items-center justify-center text-[#86efac] shadow-md group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0e1e17]">
                <span className="text-[#16a34a] font-extrabold mr-1">02.</span> Technical Peer Review
              </h3>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                Rigorous panel examination by the Council of Fellows on ESIA methodology, field ethics, and statutory compliance.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#16a34a] border-2 border-[#86efac] flex items-center justify-center text-[#86efac] shadow-md group-hover:scale-105 transition-transform">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0e1e17]">
                <span className="text-[#16a34a] font-extrabold mr-1">03.</span> Accredited Practice Seal
              </h3>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                Conferment of statutory practice seal, cryptographic QR verification, and inclusion in the National Registry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. TESTIMONIALS SECTION ("Clients Best Feedback About CESSPA Provision")
      ========================================================================== */}
      <section className="py-20 lg:py-28 bg-[#f9fbf9] border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6 2xl:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-3">
                <Trees className="w-4 h-4" />
                PRACTITIONER TESTIMONIALS
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1e17] leading-tight">
                What Regulators &amp; Environmental <br />
                Leaders Say
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
                      src={IMAGES.leadership.trustee1}
                      alt="Dr. Amina Garba Bello"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#0e1e17]">Dr. Amina Garba Bello</h4>
                    <p className="text-xs text-gray-500">Fellow (FCESSPA) • Lead Social Safeguards Advisor</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  &ldquo;CESSPA&apos;s standardized ESIA methodology has brought immense clarity to statutory environmental approvals. Reports stamped with the official seal satisfy federal benchmarks and donor requirements effortlessly.&rdquo;
                </p>
              </div>
              <div className="pt-6">
                <span className="text-xs font-bold text-[#16a34a] uppercase tracking-wider">Regulatory Oversight</span>
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
                      src={IMAGES.leadership.president}
                      alt="Engr. Nonso Nwankwo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#0e1e17]">Engr. Nonso Nwankwo</h4>
                    <p className="text-xs text-gray-500">Director of Technical Standards • Certified Professional</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  &ldquo;The continuous professional development workshops and technical compendiums from CESSPA ensure that practicing environmental auditors remain on the cutting edge of global ESG benchmarks.&rdquo;
                </p>
              </div>
              <div className="pt-6">
                <span className="text-xs font-bold text-[#16a34a] uppercase tracking-wider">Standards Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. INSTITUTIONAL TRUST BAR ("Collaborating with Federal Agencies & Global Institutions")
      ========================================================================== */}
      <section className="bg-[#16a34a] text-white py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6 2xl:px-8 text-center space-y-8">
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-wide">
            Trusted by <span className="text-white">Federal Ministries</span>, <span className="text-[#dcfce7]">State Regulatory Agencies</span> &amp; <span className="text-[#86efac]">Industry</span>
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-bold text-sm sm:text-base">
            <span className="bg-white/15 border border-[#86efac]/40 text-white px-5 py-2.5 rounded-lg shadow-xs hover:border-[#86efac] transition-colors">FMEnv Nigeria</span>
            <span className="bg-white/15 border border-[#86efac]/40 text-[#dcfce7] px-5 py-2.5 rounded-lg shadow-xs hover:border-[#86efac] transition-colors">NESREA</span>
            <span className="bg-white/15 border border-[#86efac]/40 text-white px-5 py-2.5 rounded-lg shadow-xs hover:border-[#86efac] transition-colors">NOSDRA</span>
            <span className="bg-white/15 border border-[#86efac]/40 text-[#dcfce7] px-5 py-2.5 rounded-lg shadow-xs hover:border-[#86efac] transition-colors">UNEP Partner</span>
            <span className="bg-white/15 border border-[#86efac]/40 text-white px-5 py-2.5 rounded-lg shadow-xs hover:border-[#86efac] transition-colors">World Bank E&amp;S Hub</span>
            <span className="bg-white/15 border border-[#86efac]/40 text-[#dcfce7] px-5 py-2.5 rounded-lg shadow-xs hover:border-[#86efac] transition-colors">NUPRC</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. TEAM SECTION ("Meet Our Dedicated Members" / Executive Council)
      ========================================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6 2xl:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-3">
            <Trees className="w-4 h-4" />
            NATIONAL LEADERSHIP
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1e17] mb-16">
            Meet Our Dedicated Executive Council
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/* Member 1: Dr. Joshua M. Akor */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg relative group">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  alt="Dr. Joshua M. Akor"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#0e1e17]">Dr. Joshua M. Akor</h3>
                <p className="text-xs text-gray-500">National Secretary General</p>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <a href="mailto:secgen@cesspa.org.ng" className="hover:text-[#16a34a] transition-colors" aria-label="Email">
                  <span className="text-xs font-bold">secgen@cesspa.org.ng</span>
                </a>
              </div>
            </div>

            {/* Member 2: Mrs. Toyin Balogun-Adeleke */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg relative group">
                <Image
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
                  alt="Mrs. Toyin Balogun-Adeleke"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#0e1e17]">Mrs. Toyin Balogun-Adeleke</h3>
                <p className="text-xs text-gray-500">National Vice President (West)</p>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <a href="mailto:vp.west@cesspa.org.ng" className="hover:text-[#16a34a] transition-colors" aria-label="Email">
                  <span className="text-xs font-bold">vp.west@cesspa.org.ng</span>
                </a>
              </div>
            </div>

            {/* Member 3: Ken Ebiama, Esq. */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg relative group">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80"
                  alt="Ken Ebiama, Esq."
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#0e1e17]">Ken Ebiama, Esq.</h3>
                <p className="text-xs text-gray-500">National Vice President (East/South)</p>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <a href="mailto:vp.south@cesspa.org.ng" className="hover:text-[#16a34a] transition-colors" aria-label="Email">
                  <span className="text-xs font-bold">vp.south@cesspa.org.ng</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. LATEST INSIGHTS ("Building a Greener Future Together Forever")
      ========================================================================== */}
      <section className="py-20 lg:py-28 bg-[#f9fbf9] border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6 2xl:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-3">
                <Trees className="w-4 h-4" />
                KNOWLEDGE HUB
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1e17] leading-tight">
                Latest Environmental Policy &amp; <br />
                Technical Gazettes
              </h2>
            </div>

            <Link
              href="/resources/blog"
              className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold px-6 py-3 rounded-lg transition-all shadow-md active:scale-95 text-sm shrink-0"
            >
              <span>View All Publications</span>
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
                    alt="Nigeria ESIA Guidelines 2026"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-heading font-bold text-lg text-[#0e1e17] leading-snug">
                    What Every Certified Practitioner Should Know About Nigeria&apos;s ESIA Guidelines
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    A comprehensive technical breakdown of statutory EIA Act compliance, public review procedures, and panel sittings.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                <span className="font-semibold text-[#0e1e17]">Dr. Joshua Akor</span>
                <Link href="/resources/blog/what-every-certified-professional-should-know-about-esia-in-nigeria" className="text-[#16a34a] hover:text-[#15803d] font-bold inline-flex items-center gap-1">
                  <span>Read Article</span>
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
                    alt="Peace and Community Relations"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-heading font-bold text-lg text-[#0e1e17] leading-snug">
                    Peace &amp; Community Relations: The Foundation of Responsible Infrastructure
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Strategic frameworks for stakeholder engagement, grievance redress mechanisms, and FPIC implementation across project corridors.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                <span className="font-semibold text-[#0e1e17]">Ken Ebiama, Esq.</span>
                <Link href="/resources/blog/peace-community-relations-foundation-responsible-development" className="text-[#16a34a] hover:text-[#15803d] font-bold inline-flex items-center gap-1">
                  <span>Read Article</span>
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
                    alt="Operationalising Wetland Conservation"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-heading font-bold text-lg text-[#0e1e17] leading-snug">
                    Operationalising Wetland Conservation and Biodiversity Net Gain in Delta Projects
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Guidelines for critical habitat screening, ecological offset ratios, and mangrove canopy regeneration in energy developments.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                <span className="font-semibold text-[#0e1e17]">Mrs. Toyin Balogun-Adeleke</span>
                <Link href="/resources/blog/twc-inception-uniting-practitioners-across-six-zones" className="text-[#16a34a] hover:text-[#15803d] font-bold inline-flex items-center gap-1">
                  <span>Read Article</span>
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
