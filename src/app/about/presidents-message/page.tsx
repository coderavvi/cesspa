import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Quote, ArrowRight, Award, ShieldCheck, Mail } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";

export const metadata = {
  title: "President's Message | CESSPA",
  description: "Official inaugural message from the President of the Certified Environmental and Social Standards Professionals Association of Nigeria.",
};

export default function PresidentsMessagePage() {
  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="LEADERSHIP" lightMode={true}>
            OFFICIAL ADDRESS
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            President's Message to Practitioners
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            "We are not merely consultants documenting risks — we are the custodians of Nigeria's environmental heritage and community dignity."
          </p>
        </div>
      </section>

      <Section variant="ivory">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* President Profile Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl p-6 bg-white border border-brand-border shadow-lg text-center space-y-4">
              <div className="relative w-44 h-44 mx-auto rounded-full overflow-hidden border-4 border-heritage-gold/40 shadow-inner bg-sage-mist">
                <Image
                  src="/images/brand/what-is-cesspa.jpg"
                  alt="Interim President & Convener"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-montserrat font-extrabold text-lg text-ink-dark">
                  Dr. Amina Garba Bello
                </h3>
                <span className="text-xs font-montserrat font-bold text-forest-green uppercase tracking-wider block mt-0.5">
                  Interim President & TWC Chair
                </span>
                <span className="text-xs text-ink-muted">
                  Fellow, CESSPA (FCESSPA)
                </span>
              </div>

              <div className="pt-3 border-t border-brand-border text-xs text-ink-body space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-heritage-gold shrink-0" />
                  <span>22+ Years Multilateral E&S Safeguards</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-leaf-green shrink-0" />
                  <span>Lead Author, National Safeguards Manual</span>
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
                OUR PRIMARY WATCHWORD
              </span>
              <p className="quote-font text-xl italic text-sage-mist">
                "Assess first. Mitigate early. Develop responsibly."
              </p>
            </div>
          </div>

          {/* President's Letter Body */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-12 border border-brand-border shadow-sm space-y-6 text-sm sm:text-base text-ink-body leading-relaxed">
            <div className="flex items-center gap-2 text-forest-green">
              <Quote className="w-8 h-8 text-heritage-gold" />
            </div>

            <h2 className="font-montserrat font-extrabold text-2xl text-ink-dark">
              Dear Distinguished Colleagues and Partners in Sustainable Development,
            </h2>

            <p>
              It is with profound gratitude and a deep sense of national responsibility that I welcome you to
              the <strong>Certified Environmental and Social Standards Professionals Association of Nigeria (CESSPA)</strong>.
            </p>

            <p>
              For decades, Nigeria's environmental and social safeguard landscape operated in fragmentation.
              While our country possesses some of the most gifted ecological researchers, hydrologists, and social impact
              practitioners on the continent, our practice has too often been reduced to late-stage administrative compliance —
              a rubber stamp procured when heavy earthmovers are already clearing ground.
            </p>

            <p>
              The consequences of this deficit are evident across our federation: unresolved community grievances, damaged
              watersheds, disrupted rural livelihoods, and expensive project litigations that stall critical national infrastructure.
            </p>

            <blockquote className="quote-font text-lg sm:text-xl italic text-ink-dark bg-sage-mist/60 border-l-4 border-forest-green p-4 rounded-r-xl my-4">
              "We must boldly declare: environmental sustainability without genuine human safeguards is an illusion.
              A highway or pipeline that destroys community harmony cannot claim to be progressive development."
            </blockquote>

            <p>
              When the Technical Working Committee was inaugurated in October 2025 across all six geopolitical zones,
              our mandate was singular: <strong>unite certified professionals under an uncompromising ethical standard</strong>.
              CESSPA is your institutional shield. When you conduct an ESIA, CESSPA stands behind your scientific independence.
              When you identify critical social risks, CESSPA provides the regulatory weight to ensure those risks are addressed
              before capital is committed.
            </p>

            <p>
              As we open registration across our five membership categories, I call upon all practicing professionals,
              academic faculties, corporate project sponsors, and regulatory agencies to walk this path with us.
              Together, let us raise the standard.
            </p>

            <div className="pt-8 border-t border-brand-border flex items-end justify-between">
              <div>
                <p className="font-montserrat font-extrabold text-base text-ink-dark">
                  Dr. Amina Garba Bello, FCESSPA
                </p>
                <p className="text-xs text-ink-muted">
                  Interim President & Convener, CESSPA Technical Working Committee
                </p>
                <p className="text-xs text-heritage-gold font-medium mt-1">
                  Abuja, Federal Capital Territory
                </p>
              </div>

              <div className="font-cormorant italic text-2xl text-forest-green font-bold">
                Amina G. Bello
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
