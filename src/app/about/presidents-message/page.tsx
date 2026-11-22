import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Quote, ArrowRight, Award, ShieldCheck, Mail } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";

export const metadata = {
  title: "President's Message | CESSPA",
  description: "Official inaugural address from the Interim National President of the Certified Environmental and Social Standards Professionals Association (CESSPA).",
};

export default function PresidentsMessagePage() {
  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="LEADERSHIP" lightMode={true}>
            OFFICIAL ADDRESS FROM THE INTERIM NATIONAL PRESIDENT
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            President's Welcome &amp; Address
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            "Together, We Enhance Standard Practice for Sustainability!"
          </p>
        </div>
      </section>

      <Section variant="ivory">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* President Profile Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl p-6 bg-white border border-brand-border shadow-lg text-center space-y-4">
              <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden border-4 border-heritage-gold/40 shadow-inner bg-sage-mist">
                <Image
                  src="/images/executives/saminu-abdu.jpg"
                  alt="Saminu Abdu I-SSCP, F-ESCP - Interim National President"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              <div>
                <h3 className="font-montserrat font-extrabold text-lg text-ink-dark">
                  Saminu Abdu
                </h3>
                <span className="text-xs font-montserrat font-bold text-forest-green uppercase tracking-wider block mt-0.5">
                  Interim National President
                </span>
                <span className="text-xs text-ink-muted font-medium">
                  I-SSCP, F-ESCP
                </span>
              </div>

              <div className="pt-3 border-t border-brand-border text-xs text-ink-body space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-heritage-gold shrink-0" />
                  <span>SPESSE Certified ESS Leader</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-leaf-green shrink-0" />
                  <span>Convener &amp; Interim National Executive Council</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="mailto:president@cesspa.org.ng"
                  className="w-full py-2.5 rounded-xl bg-sage-mist hover:bg-forest-green hover:text-white text-forest-green font-montserrat font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Contact Office of the President
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-forest-green text-white space-y-2 shadow-md">
              <span className="font-montserrat font-bold text-xs text-heritage-gold-soft uppercase tracking-wider">
                OUR CESSPA CREED
              </span>
              <p className="quote-font text-xl italic text-sage-mist">
                "Welcome to CESSPA — Together, We Enhance Standard Practice for Sustainability!"
              </p>
            </div>
          </div>

          {/* President's Letter Body */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-12 border border-brand-border shadow-sm space-y-6 text-sm sm:text-base text-ink-body leading-relaxed">
            <div className="flex items-center gap-2 text-forest-green">
              <Quote className="w-8 h-8 text-heritage-gold" />
              <span className="text-xs font-montserrat font-bold tracking-wider uppercase text-forest-green">
                Inaugural Address to Members, Partners &amp; Stakeholders
              </span>
            </div>

            <h2 className="font-montserrat font-extrabold text-2xl text-ink-dark">
              Welcome to the Official Website of CESSPA!
            </h2>

            <p className="font-medium text-ink-dark">
              Dear Esteemed Members, Distinguished Professionals, Valued Partners, and Stakeholders,
            </p>

            <p>
              It is my great pleasure to welcome you to the digital home of the <strong>Certified Environmental and Social Standards Professionals Association (CESSPA)</strong>. A Professional Platform committed to advancing environmental sustainability, social standards compliance, capacity development, and professional excellence in Nigeria. It is therefore a privilege to address you at this important stage in the journey of the Environmental and Social Standards Professionalism.
            </p>

            <p>
              CESSPA emerged from the Federal Government and World Bank-supported <strong>Sustainable Procurement, Environmental and Social Standards Enhancement (SPESSE) Project</strong>, which created an opportunity to develop a new generation of Certified Environmental and Social Standards Professionals. Our emergence as a Professional Association reflects our shared commitment to environmental sustainability, social responsibility, professional integrity, and the effective application of Environmental and Social Standards in Nigeria and beyond.
            </p>

            <p>
              In today’s development landscape, environmental protection and community well-being must go hand in hand with economic progress. Environmental and Social Standards Professionals thus play a vital role in ensuring that policies, projects, and investments are responsible, inclusive, and sustainable.
            </p>

            <p>
              CESSPA was established to unite Certified Professionals, promote ethical practice, strengthen professional capacity, encourage knowledge sharing, and advance the recognition of our profession. Our vision is to build a credible and respected Association that contributes meaningfully to National Development and Global Sustainability objectives.
            </p>

            <blockquote className="quote-font text-lg sm:text-xl italic text-ink-dark bg-sage-mist/60 border-l-4 border-forest-green p-4 rounded-r-xl my-4">
              "In October 2025, this vision advanced with the formation of a Technical Committee representing Nigeria’s six geo-political zones to lay the foundation for a unified, credible, and nationally recognized professional Association."
            </blockquote>

            <p>
              Today, CESSPA stands as a collective voice for Professionals committed to ensuring that development projects uphold environmental protection, social inclusion, accountability, and sustainability.
            </p>

            <p>
              As Interim National President, I am committed to working with the Interim National Executive Council, Committees, and Members to establish a strong foundation for the Association’s growth, effective governance, and long-term sustainability. We will continue to promote professional development and pursue meaningful collaboration with government institutions, regulatory bodies, development partners, and private-sector organizations.
            </p>

            <p>
              However, the success of CESSPA depends upon the collective commitment of its members. I encourage us all to uphold unity, transparency, mutual respect, continuous learning, and the highest standards of professional conduct. Our strength lies not only in our certifications but also in our unity, expertise, integrity, competence, shared commitment to national development and positive impact on people and the environment.
            </p>

            <p>
              I invite all members, prospective members, and stakeholders to actively support our mission of strengthening environmental and social safeguards, protecting ecosystem and anthropologic communities, while promoting responsible development and creating opportunities for professional growth. Through collaboration and shared responsibility, we can enhance the visibility of our profession and establish CESSPA as a trusted voice in environmental and social standards practice in Nigeria and beyond.
            </p>

            <p>
              I therefore encourage all eligible Certified Professionals to join CESSPA, contribute to its growth, and help shape the future of Environmental and Social Standards practice in Nigeria. As we move forward, let us remain united by a common vision: to build a strong, credible, ethical, and respected professional institution that advances environmental protection, promotes social well-being, creates opportunities for members, contributes to sustainable development and delivers lasting value to our nation.
            </p>

            <p>
              On behalf of the Interim National Executive Council, I sincerely appreciate everyone who has contributed to the establishment and growth of our Association. The foundation we lay today will shape the future of CESSPA. Let us work together with dedication, confidence, and a shared commitment to excellence. Together, we can strengthen our profession, protect our environment, safeguard our communities, and build a CESSPA we can all be proud of.
            </p>

            <div className="p-4 rounded-xl bg-forest-green/5 border border-forest-green/20">
              <p className="font-montserrat font-bold text-base text-forest-green">
                Welcome to CESSPA — Together, We Enhance Standard Practice for Sustainability!
              </p>
              <p className="text-xs text-ink-muted mt-1">Thank you.</p>
            </div>

            <div className="pt-6 border-t border-brand-border flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <p className="font-montserrat font-extrabold text-base text-ink-dark">
                  SAMINU ABDU I-SSCP, F-ESCP
                </p>
                <p className="text-xs text-forest-green font-bold">
                  Interim National President
                </p>
                <p className="text-xs text-ink-muted">
                  Certified Environmental and Social Standards Professionals Association (CESSPA)
                </p>
                <p className="text-xs text-heritage-gold font-medium mt-1">
                  Abuja, Federal Capital Territory, Nigeria
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/membership/register"
                  className="px-5 py-2.5 rounded-lg bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Join CESSPA Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
