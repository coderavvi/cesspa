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
            <Eyebrow chip="GENESIS">ORIGIN &amp; MANDATE OF CESSPA</Eyebrow>
            <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-ink-dark uppercase">
              Established by Pioneer Certified ESS Professionals
            </h2>

            <p className="text-sm sm:text-base text-ink-body leading-relaxed">
              The <strong>Certified Environmental and Social Standards Professionals Association (CESSPA)</strong> is a National Professional Body established by the pioneer Certified Professionals of the <strong>National Environmental Standards Certification Programme (NESCP)</strong> in the Federal Ministry of Environment and the <strong>Nigeria Social Standards Practice Certification Programme (NSSPCP)</strong> in the Federal Ministry of Women Affairs and Social Development, both under the <strong>Sustainable Procurement, Environmental and Social Standards Enhancement (SPESSE) Project</strong> sponsored by the <strong>World Bank</strong>.
            </p>

            <p className="text-sm sm:text-base text-ink-body leading-relaxed">
              CESSPA provides a unified platform for uniting, strengthening, and elevating Environmental and Social Standards (ESS) practice through promoting professionalism, ethical practice, research and capacity development, policy advocacy, and strategic collaboration with government agencies and partners to harmonize E&amp;S Standards with international frameworks for sustainable safeguards in public and private sector programs and projects, serving as a recognized voice for ESS Professionals in Nigeria.
            </p>

            <p className="text-sm sm:text-base text-ink-body leading-relaxed">
              As the first cohort of Certified ESS Professionals in Nigeria, CESSPA aims to build a credible, knowledge-driven community dedicated to advancing Nigeria&apos;s Environmental and Social Safeguards in alignment with global Sustainable Development Goals. Thus, CESSPA is committed to promoting sustainable development, environmental stewardship, social inclusion, climate resilience, and responsible investment in line with national development priorities and ESS international best practices for sustainability.
            </p>

            <div className="p-4 rounded-xl bg-sage-mist border border-brand-border space-y-2">
              <span className="font-montserrat font-bold text-xs uppercase tracking-wider text-forest-green block">
                Together, We Enhance Standard Practice for Sustainability:
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
          <Eyebrow chip="CONSTITUTION">STATUTORY FOUNDATION</Eyebrow>
          <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-ink-dark uppercase mt-1">
            Vision &amp; Mission
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="rounded-2xl p-8 bg-white border border-brand-border shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-forest-green text-white flex items-center justify-center">
              <Eye className="w-6 h-6 text-heritage-gold" />
            </div>
            <h3 className="font-montserrat font-bold text-lg text-ink-dark uppercase">Our Vision</h3>
            <p className="text-sm sm:text-base text-ink-body leading-relaxed">
              Be Nigeria&apos;s foremost professional body championing sustainable environmental and social standards enhancement, fostering a community of competent and ethical professionals dedicated to national and global development goals.
            </p>
          </div>

          <div className="rounded-2xl p-8 bg-white border border-brand-border shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-forest-green text-white flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-montserrat font-bold text-lg text-ink-dark uppercase">Our Mission</h3>
            <p className="text-sm sm:text-base text-ink-body leading-relaxed">
              To build a credible, knowledge-driven, and globally recognized network of Environmental and Social Standards Professionals that supports effective policy implementation, capacity building, and sustainable development.
            </p>
          </div>
        </div>
      </Section>

      {/* Strategic Objectives Grid */}
      <Section variant="white">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <Eyebrow chip="ARTICLE 2">CONSTITUTIONAL OBJECTIVES</Eyebrow>
            <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-ink-dark uppercase mt-1">
              Statutory Objectives of CESSPA
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mt-2 max-w-2xl mx-auto">
              Enacted under the Companies and Allied Matters Act (CAMA 2020) for the governance, operation, and regulation of E&amp;S standards practice in Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {[
              {
                title: "International Framework Alignment",
                desc: "Harmonize and strengthen E&S standards in line with the World Bank Environmental and Social Framework (ESF), IFC Performance Standards, AfDB Integrated Safeguard System (ISS), and ISO 14000 standards.",
              },
              {
                title: "Capacity Building & Certification",
                desc: "Enhance professional capacity through accredited training, SPESSECE Track A-E programs, peer certification, and continuous professional development.",
              },
              {
                title: "Inter-Agency Regulatory Collaboration",
                desc: "Foster structured partnerships with FMEnv, FMWA, NESREA, NOSDRA, NUC, United Nations agencies (UNDP, UNEP, UNICEF), and international development partners.",
              },
              {
                title: "Ethics, Compliance & Safeguards",
                desc: "Promote professionalism, ethics, transparency, gender equality, and best practices across environmental impact assessments and social welfare safeguards.",
              },
              {
                title: "Research, Innovation & National Voice",
                desc: "Serve as the recognized voice and reference body for E&S practitioners in Nigeria, advancing applied research, innovative methodologies, and policy implementation.",
              },
              {
                title: "Grassroots Chapter Coordination",
                desc: "Maintain active State Executive Councils (SEC) across 36 States and the FCT, coordinated through 6 Geopolitical Zonal structures.",
              },
            ].map((obj, i) => (
              <div key={obj.title} className="p-5 rounded-xl bg-slate-50 border border-brand-border space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-forest-green">0{i + 1}.</span>
                  <h4 className="font-montserrat font-bold text-sm text-ink-dark">
                    {obj.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-ink-body leading-relaxed">{obj.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-xl bg-[#08331f] text-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-heritage-gold block">
                LEGAL REGISTRATION &amp; SECRETARIAT
              </span>
              <p className="text-xs sm:text-sm text-white/90 mt-1 font-medium">
                Registered non-profit, non-political body under CAMA 2020. National Secretariat located in the Federal Capital Territory (FCT), Abuja, Nigeria.
              </p>
            </div>
            <Link
              href="/membership"
              className="px-5 py-2.5 rounded-lg bg-heritage-gold hover:bg-heritage-gold/90 text-forest-dark font-montserrat font-bold text-xs uppercase tracking-wider shrink-0"
            >
              Membership Schedule
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/about/board"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-forest-green text-white font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-deep-emerald transition-all"
            >
              National Advisory Committee
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about/executives"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-forest-green text-forest-green font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-forest-green hover:text-white transition-all"
            >
              Executive Council
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/chapters"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sage-mist border border-brand-border text-ink-dark font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-forest-green hover:text-white transition-all"
            >
              Geopolitical Chapters
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
