"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, ShieldCheck, MapPin, Award } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";

export interface LeadershipMember {
  id: string;
  name: string;
  credentials?: string;
  role: string;
  category: "executive" | "zonal" | "advisory";
  badge: string;
  badgeVariant?: "president" | "executive" | "zonal" | "advisory";
  office: string;
  portfolio: string;
  email: string;
  image: string;
  isNationalPresident?: boolean;
}

export const ALL_LEADERSHIP_MEMBERS: LeadershipMember[] = [
  // ==========================================
  // INTERIM NATIONAL EXECUTIVE COUNCIL (INEC)
  // ==========================================
  {
    id: "exec-1",
    name: "Saminu Abdu",
    credentials: "I-SSCP, F-ESCP",
    role: "Interim National President",
    category: "executive",
    badge: "NATIONAL PRESIDENT",
    badgeVariant: "president",
    office: "National Secretariat, Abuja",
    portfolio: "Strategic Governance, Institutional Engagement & National Leadership",
    email: "president@cesspa.org.ng",
    image: "/images/executives/saminu-abdu.jpg",
    isNationalPresident: true,
  },
  {
    id: "exec-2",
    name: "Amos Ibrahim Agwom",
    credentials: "MAF, MSSD, B.Sc, I-SSCP, CESSPA, AFAn, IMCON",
    role: "Interim National Vice Chairman Sustainable Social Standard",
    category: "executive",
    badge: "EXECUTIVE COUNCIL",
    badgeVariant: "executive",
    office: "National Secretariat, Abuja",
    portfolio: "Sustainable Social Standards Enhancement, Community Inclusion & Safeguards",
    email: "vc.social@cesspa.org.ng",
    image: "/images/executives/amos-ibrahim-agwom.jpg",
  },
  {
    id: "exec-3",
    name: "ORGA Joseph Terfa",
    credentials: "I-SSCP, I-ESCP",
    role: "Interim National Secretary",
    category: "executive",
    badge: "EXECUTIVE COUNCIL",
    badgeVariant: "executive",
    office: "National Secretariat HQ, Abuja",
    portfolio: "Secretariat Operations, Council Records, Official Communications",
    email: "secgen@cesspa.org.ng",
    image: "/images/executives/orga-joseph-terfa.jpg",
  },
  {
    id: "exec-4",
    name: "Oluwafemi Adedoyin Florence",
    credentials: "NES, F-ESCP",
    role: "Interim National Assistant Secretary",
    category: "executive",
    badge: "EXECUTIVE COUNCIL",
    badgeVariant: "executive",
    office: "National Secretariat, Abuja",
    portfolio: "Administrative Coordination, Secretariat Archives & Documentation",
    email: "asst.sec@cesspa.org.ng",
    image: "/images/executives/oluwafemi-adedoyin-florence.jpg",
  },
  {
    id: "exec-5",
    name: "Deborah Abieyuwa Aiguokun",
    role: "Interim Financial Secretary",
    category: "executive",
    badge: "EXECUTIVE COUNCIL",
    badgeVariant: "executive",
    office: "National Secretariat, Abuja",
    portfolio: "Financial Records, Accounts Management & Dues Verification",
    email: "finance@cesspa.org.ng",
    image: "/images/executives/deborah-abieyuwa-aiguokun.jpg",
  },
  {
    id: "exec-6",
    name: "Aminu Mai'adua Suleiman",
    role: "Interim National Publicity Secretary",
    category: "executive",
    badge: "EXECUTIVE COUNCIL",
    badgeVariant: "executive",
    office: "National Secretariat, Abuja",
    portfolio: "Media Strategy, Public Relations, Press Releases & Information Dissemination",
    email: "publicity@cesspa.org.ng",
    image: "/images/executives/aminu-maiadua-suleiman.jpg",
  },
  {
    id: "exec-7",
    name: "Riskat Bukola Mustapha",
    credentials: "Certified Environmental Standard Professional",
    role: "Interim Assistant Treasurer",
    category: "executive",
    badge: "EXECUTIVE COUNCIL",
    badgeVariant: "executive",
    office: "National Secretariat, Abuja",
    portfolio: "Treasury Support, Member Welfare & Fiduciary Accounting",
    email: "treasury@cesspa.org.ng",
    image: "/images/executives/riskat-bukola-mustapha.jpg",
  },

  // ==========================================
  // ZONAL LEADERSHIP
  // ==========================================
  {
    id: "exec-8",
    name: "Nkom Achi Emmanuel",
    credentials: "I-ESCP, I-SSCP, CBOP",
    role: "Interim North Central Zonal Coordinator",
    category: "zonal",
    badge: "ZONAL COORDINATOR",
    badgeVariant: "zonal",
    office: "North Central Secretariat (FCT & Middle Belt)",
    portfolio: "Zonal Chapter Mobilization, Grassroots Engagement & Middle Belt Coordination",
    email: "northcentral@cesspa.org.ng",
    image: "/images/coordinators/nkom-achi-emmanuel.jpg",
  },

  // ==========================================
  // NATIONAL ADVISORY COMMITTEE
  // ==========================================
  {
    id: "adv-1",
    name: "Prof. Ibrahim Kolawole Muritala",
    credentials: "A-ESCP, I-SSCP",
    role: "National Advisory Committee Member",
    category: "advisory",
    badge: "ADVISORY MEMBER",
    badgeVariant: "advisory",
    office: "National Advisory Committee",
    portfolio: "Pioneer academic and safeguard practitioner harmonizing national and global frameworks",
    email: "advisory@cesspa.org.ng",
    image: "/images/advisory/prof-ibrahim-kolawole-muritala.jpg",
  },
  {
    id: "adv-2",
    name: "Prof. John Gushit",
    credentials: "S-ESCP, F-SSCP",
    role: "National Advisory Committee Member",
    category: "advisory",
    badge: "ADVISORY MEMBER",
    badgeVariant: "advisory",
    office: "National Advisory Committee",
    portfolio: "Specialist standards researcher and senior environmental scientist advancing applied research",
    email: "advisory@cesspa.org.ng",
    image: "/images/advisory/prof-john-gushit.jpg",
  },
  {
    id: "adv-3",
    name: "Leonell Elijah Echa",
    credentials: "I-ESCP, I-SSCP",
    role: "National Advisory Committee Member",
    category: "advisory",
    badge: "ADVISORY MEMBER",
    badgeVariant: "advisory",
    office: "National Advisory Committee",
    portfolio: "Practicing E&S standards leader focusing on project safeguard integration and risk screening",
    email: "advisory@cesspa.org.ng",
    image: "/images/advisory/leonell-elijah-echa.jpg",
  },
  {
    id: "adv-4",
    name: "Dr. Ogechukwu Onyebueke",
    credentials: "I-ESCP, F-SSCP",
    role: "National Advisory Committee Member",
    category: "advisory",
    badge: "ADVISORY MEMBER",
    badgeVariant: "advisory",
    office: "National Advisory Committee",
    portfolio: "Environmental professional championing baseline auditing and ecological conservation",
    email: "advisory@cesspa.org.ng",
    image: "/images/advisory/dr-ogechukwu-onyebueke.jpg",
  },
  {
    id: "adv-5",
    name: "Fatima Adekemi Ajala",
    credentials: "I-ESCP, I-SSCP",
    role: "National Advisory Committee Member",
    category: "advisory",
    badge: "ADVISORY MEMBER",
    badgeVariant: "advisory",
    office: "National Advisory Committee",
    portfolio: "E&S practitioner with dedicated leadership in social standards enhancement and gender inclusion",
    email: "advisory@cesspa.org.ng",
    image: "/images/advisory/fatima-adekemi-ajala.jpg",
  },
  {
    id: "adv-6",
    name: "Assoc. Prof. Adamu Jibir",
    credentials: "F-ESCP, F-SSCP",
    role: "National Advisory Committee Member",
    category: "advisory",
    badge: "ADVISORY MEMBER",
    badgeVariant: "advisory",
    office: "National Advisory Committee",
    portfolio: "Development economist advising on responsible development, socioeconomic impacts, and policy",
    email: "advisory@cesspa.org.ng",
    image: "/images/advisory/assoc-prof-adamu-jibir.jpg",
  },
  {
    id: "adv-7",
    name: "Agomoh, Okechi Ketandu",
    credentials: "F-ESCP, F-SSCP",
    role: "National Advisory Committee Member",
    category: "advisory",
    badge: "ADVISORY MEMBER",
    badgeVariant: "advisory",
    office: "National Advisory Committee",
    portfolio: "Certified practitioner advancing grassroots compliance, safeguards auditing and capacity development",
    email: "advisory@cesspa.org.ng",
    image: "/images/advisory/agomoh-okechi-ketandu.jpg",
  },
];

export function ExecutivesClient() {
  const [filter, setFilter] = useState<"all" | "executive" | "zonal" | "advisory">("all");

  const filteredMembers =
    filter === "all"
      ? ALL_LEADERSHIP_MEMBERS
      : ALL_LEADERSHIP_MEMBERS.filter((m) => m.category === filter);

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="NATIONAL LEADERSHIP DIRECTORY" lightMode={true}>
            GOVERNANCE, EXECUTIVE &amp; ZONAL LEADERSHIP
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            National Executives &amp; Leadership
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            The accredited leadership driving the operational delivery, regulatory engagement, geopolitical expansion,
            and ethical governance of the Certified Environmental and Social Standards Professionals Association across Nigeria.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        {/* Interactive Filter Chips */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-montserrat font-bold text-xs uppercase tracking-wider transition-all ${
              filter === "all"
                ? "bg-forest-green text-white shadow-md ring-2 ring-heritage-gold"
                : "bg-white text-ink-body border border-brand-border hover:border-forest-green"
            }`}
          >
            All Leadership ({ALL_LEADERSHIP_MEMBERS.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("executive")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-montserrat font-bold text-xs uppercase tracking-wider transition-all ${
              filter === "executive"
                ? "bg-forest-green text-white shadow-md ring-2 ring-heritage-gold"
                : "bg-white text-ink-body border border-brand-border hover:border-forest-green"
            }`}
          >
            Executive Council (7)
          </button>
          <button
            type="button"
            onClick={() => setFilter("zonal")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-montserrat font-bold text-xs uppercase tracking-wider transition-all ${
              filter === "zonal"
                ? "bg-forest-green text-white shadow-md ring-2 ring-heritage-gold"
                : "bg-white text-ink-body border border-brand-border hover:border-forest-green"
            }`}
          >
            Zonal Leadership (1)
          </button>
          <button
            type="button"
            onClick={() => setFilter("advisory")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-montserrat font-bold text-xs uppercase tracking-wider transition-all ${
              filter === "advisory"
                ? "bg-forest-green text-white shadow-md ring-2 ring-heritage-gold"
                : "bg-white text-ink-body border border-brand-border hover:border-forest-green"
            }`}
          >
            National Advisory Committee (7)
          </button>
        </div>

        {/* Leadership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`rounded-3xl overflow-hidden bg-white border shadow-sm card-hover flex flex-col justify-between ${
                member.isNationalPresident
                  ? "border-heritage-gold ring-2 ring-heritage-gold/20"
                  : "border-brand-border"
              }`}
            >
              <div>
                {/* Image Container with 4:3 Aspect Ratio and Top-Right Badge */}
                <div className="relative aspect-4/3 w-full bg-sage-mist overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center"
                  />
                  <div
                    className={`absolute top-3 right-3 font-montserrat font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded shadow-xs ${
                      member.badgeVariant === "president"
                        ? "bg-forest-green text-white"
                        : "bg-forest-green text-white"
                    }`}
                  >
                    {member.badge}
                  </div>
                </div>

                {/* Card Content with Name & Gold Credentials Pill */}
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="font-montserrat font-bold text-lg text-ink-dark">
                      {member.name}
                    </h3>
                    {member.credentials && (
                      <div className="inline-block px-2.5 py-0.5 mt-1 rounded bg-heritage-gold/15 text-forest-dark font-mono font-bold text-xs">
                        {member.credentials}
                      </div>
                    )}
                    <p className="text-xs font-bold text-forest-green uppercase tracking-wide mt-1.5">
                      {member.role}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-sage-mist/50 border border-brand-border/60 text-xs space-y-1">
                    <span className="font-montserrat font-bold text-[10px] text-heritage-gold uppercase tracking-wider block">
                      Portfolio Responsibilities:
                    </span>
                    <p className="text-ink-body font-medium leading-relaxed">
                      {member.portfolio}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                    <MapPin className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <span>{member.office}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-brand-border/60 flex items-center justify-between text-xs">
                <a
                  href={`mailto:${member.email}`}
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
      </Section>
    </div>
  );
}
