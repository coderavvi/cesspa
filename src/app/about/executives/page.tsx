import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, ShieldCheck, MapPin, ArrowRight, Award } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";

export const metadata = {
  title: "National Executive Council | CESSPA",
  description: "Interim National Executive Council of the Certified Environmental and Social Standards Professionals Association (CESSPA).",
};

export interface ExecutiveMember {
  name: string;
  credentials?: string;
  role: string;
  office: string;
  portfolio: string;
  email: string;
  image: string;
  isNationalPresident?: boolean;
}

export const MOCK_INTERIM_EXECUTIVES: ExecutiveMember[] = [
  {
    name: "Saminu Abdu",
    credentials: "I-SSCP, F-ESCP",
    role: "Interim National President",
    office: "National Secretariat, Abuja",
    portfolio: "Strategic Governance, Institutional Engagement & National Leadership",
    email: "president@cesspa.org.ng",
    image: "/images/executives/saminu-abdu.jpg",
    isNationalPresident: true,
  },
  {
    name: "Amos Ibrahim Agwom",
    credentials: "MAF, MSSD, B.Sc, I-SSCP, CESSPA, AFAn, IMCON",
    role: "Interim National Vice Chairman Sustainable Social Standard",
    office: "National Secretariat, Abuja",
    portfolio: "Sustainable Social Standards Enhancement, Community Inclusion & Safeguards",
    email: "vc.social@cesspa.org.ng",
    image: "/images/executives/amos-ibrahim-agwom.jpg",
  },
  {
    name: "ORGA Joseph Terfa",
    credentials: "I-SSCP, I-ESCP",
    role: "Interim National Secretary",
    office: "National Secretariat HQ, Abuja",
    portfolio: "Secretariat Operations, Council Records, Official Communications",
    email: "secgen@cesspa.org.ng",
    image: "/images/executives/orga-joseph-terfa.jpg",
  },
  {
    name: "Oluwafemi Adedoyin Florence",
    credentials: "NES, F-ESCP",
    role: "Interim National Assistant Secretary",
    office: "National Secretariat, Abuja",
    portfolio: "Administrative Coordination, Secretariat Archives & Documentation",
    email: "asst.sec@cesspa.org.ng",
    image: "/images/executives/oluwafemi-adedoyin-florence.jpg",
  },
  {
    name: "Deborah Abieyuwa Aiguokun",
    role: "Interim Financial Secretary",
    office: "National Secretariat, Abuja",
    portfolio: "Financial Records, Accounts Management & Dues Verification",
    email: "finance@cesspa.org.ng",
    image: "/images/executives/deborah-abieyuwa-aiguokun.jpg",
  },
  {
    name: "Aminu Mai'adua Suleiman",
    role: "Interim National Publicity Secretary",
    office: "National Secretariat, Abuja",
    portfolio: "Media Strategy, Public Relations, Press Releases & Information Dissemination",
    email: "publicity@cesspa.org.ng",
    image: "/images/executives/aminu-maiadua-suleiman.jpg",
  },
  {
    name: "Riskat Bukola Mustapha",
    credentials: "Environmental Health Consultant Certified Environmental Standard Professional",
    role: "Interim Assistant Treasurer",
    office: "National Secretariat, Abuja",
    portfolio: "Treasury Support, Member Welfare & Fiduciary Accounting",
    email: "treasury@cesspa.org.ng",
    image: "/images/executives/riskat-bukola-mustapha.jpg",
  },
];

export default function ExecutivesPage() {
  const executivesList = MOCK_INTERIM_EXECUTIVES || [];

  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="OPERATIONS & LEADERSHIP" lightMode={true}>
            INTERIM NATIONAL EXECUTIVE COUNCIL (INEC)
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            National Executives
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Leading the establishment, operational delivery, and national expansion of the Certified Environmental
            and Social Standards Professionals Association across Nigeria.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {executivesList.map((exec) => (
            <div
              key={exec.name}
              className={`rounded-3xl overflow-hidden bg-white border shadow-sm card-hover flex flex-col justify-between ${
                exec.isNationalPresident ? "border-heritage-gold ring-2 ring-heritage-gold/20" : "border-brand-border"
              }`}
            >
              <div>
                <div className="relative aspect-4/3 w-full bg-sage-mist overflow-hidden">
                  <Image
                    src={exec.image}
                    alt={exec.name}
                    fill
                    className="object-cover object-top"
                  />
                  {exec.isNationalPresident ? (
                    <div className="absolute top-3 left-3 bg-heritage-gold text-forest-dark font-montserrat font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded shadow-xs flex items-center gap-1">
                      <Award className="w-3 h-3" /> National President
                    </div>
                  ) : (
                    <div className="absolute top-3 left-3 bg-forest-green text-white font-montserrat font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                      National Executive
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="font-montserrat font-bold text-lg text-ink-dark">
                      {exec.name}
                    </h3>
                    {exec.credentials && (
                      <p className="text-[11px] font-semibold text-heritage-gold font-mono">
                        {exec.credentials}
                      </p>
                    )}
                    <p className="text-xs font-bold text-forest-green uppercase tracking-wide mt-1">
                      {exec.role}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-sage-mist/50 border border-brand-border/60 text-xs space-y-1">
                    <span className="font-montserrat font-bold text-[10px] text-heritage-gold uppercase tracking-wider block">
                      Portfolio Responsibilities:
                    </span>
                    <p className="text-ink-body font-medium leading-relaxed">{exec.portfolio}</p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                    <MapPin className="w-3.5 h-3.5 text-forest-green" />
                    <span>{exec.office}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-brand-border/60 flex items-center justify-between text-xs">
                <a
                  href={`mailto:${exec.email}`}
                  className="font-montserrat font-bold text-forest-green hover:text-heritage-gold flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Contact Portfolio
                </a>
                <span className="flex items-center gap-1 text-[11px] text-leaf-green font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Certified
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation bridge */}
        <div className="mt-14 p-8 rounded-3xl bg-sage-mist border border-brand-border text-center max-w-2xl mx-auto space-y-4">
          <h4 className="font-montserrat font-bold text-lg text-ink-dark uppercase">
            Explore Geopolitical Chapters &amp; Advisory Committee
          </h4>
          <p className="text-xs sm:text-sm text-ink-body">
            CESSPA coordinates six geopolitical chapters across Nigeria led by dedicated Zonal Coordinators and backed by our National Advisory Committee.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/chapters"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-forest-green text-white font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-deep-emerald transition-colors"
            >
              View Zonal Chapters <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about/board"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-forest-green text-forest-green font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-forest-green hover:text-white transition-colors"
            >
              National Advisory Committee <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
