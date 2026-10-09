import React from "react";
import Link from "next/link";
import { ShieldCheck, Scale, FileText, CheckCircle2, AlertTriangle, Download, ArrowRight } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";

export const metadata = {
  title: "Code of Professional Ethics | CESSPA",
  description: "Official Code of Ethics governing all Certified Environmental and Social Standards Professionals in Nigeria.",
};

export default function CodeOfEthicsPage() {
  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="ETHICAL STANDARD" lightMode={true}>
            PROFESSIONAL INTEGRITY
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            CESSPA Code of Ethics & Professional Conduct
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Every certified practitioner, associate, and fellow bound by CESSPA pledges an unyielding commitment
            to scientific objectivity, human rights, and environmental preservation.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Executive Preamble Box */}
          <div className="rounded-3xl p-8 bg-white border border-brand-border shadow-md space-y-4">
            <div className="flex items-center gap-2 text-forest-green">
              <Scale className="w-6 h-6 text-heritage-gold" />
              <h2 className="font-montserrat font-extrabold text-xl sm:text-2xl text-ink-dark uppercase">
                Preamble & Binding Mandate
              </h2>
            </div>
            <p className="text-sm sm:text-base text-ink-body leading-relaxed">
              The environmental and social professions occupy a unique fiduciary role in national development.
              Decisions authored or signed off by CESSPA members directly affect ecosystems, water aquifers, atmospheric
              basins, vulnerable rural families, and intergenerational welfare.
            </p>
            <p className="text-sm sm:text-base text-ink-body leading-relaxed">
              Adherence to this Code is an irrevocable condition of membership. Violation of these canons shall result
              in disciplinary review, revocation of professional certification, and notification to statutory authorities.
            </p>
          </div>

          {/* Six Canon Articles */}
          <div className="space-y-6">
            {[
              {
                article: "CANON 01",
                title: "Primary Duty to the Public & Environment",
                rules: [
                  "Members shall hold paramount the safety, health, and welfare of the public and the protection of the natural environment in all assessments.",
                  "Under no circumstances shall commercial considerations or client pressures induce a member to conceal, alter, or minimize significant adverse findings.",
                  "Where a project sponsor disregards critical environmental and social risks that pose imminent harm, members have a professional duty to formally report the hazard.",
                ],
              },
              {
                article: "CANON 02",
                title: "Empirical Rigor & Scientific Objectivity",
                rules: [
                  "Baseline data collection must conform to rigorous scientific, geographical, and statistical standards without speculative extrapolation.",
                  "All models, laboratory testing, and methodologies must be transparent, verifiable, and cited accurately in ESIA submissions.",
                  "Members shall clearly differentiate between empirical field data, professional opinion, and client policy positions.",
                ],
              },
              {
                article: "CANON 03",
                title: "Dignity, Inclusion & Host Community Rights",
                rules: [
                  "Members shall treat host communities with absolute cultural dignity, respecting traditional values, customary rights, and sacred places.",
                  "Stakeholder consultations must be transparent, conducted in accessible languages, and proactively include women, youth, elders, and vulnerable groups.",
                  "Resettlement, land acquisition, and livelihood restoration plans must ensure affected populations are meaningfully compensated and better off post-relocation.",
                ],
              },
              {
                article: "CANON 04",
                title: "Conflicts of Interest & Fiduciary Transparency",
                rules: [
                  "Members shall not accept commissions, gratuities, or contingent fees tied to the approval outcome of any environmental permit.",
                  "Members must promptly disclose all financial, personal, or corporate interests that could create perceived or actual bias in an assessment.",
                  "No member shall issue an environmental audit or compliance report for an infrastructure asset in which they maintain an equity interest.",
                ],
              },
              {
                article: "CANON 05",
                title: "Continuous Professional Competence & Mentorship",
                rules: [
                  "Members shall practice only within their demonstrable areas of competence, retaining specialized co-experts when addressing unfamiliar domains.",
                  "All practicing members must fulfill statutory annual Continuous Professional Development (CPD) credit minimums to retain active standing.",
                  "Members bear an ethical responsibility to mentor junior practitioners, nurturing ethical culture across academic faculties and training centers.",
                ],
              },
              {
                article: "CANON 06",
                title: "Respect for the Profession & Anti-Corruption",
                rules: [
                  "Members shall not engage in bribery, extortion, or corrupt inducements with statutory officers of the Federal Ministry of Environment or state regulators.",
                  "Members shall not knowingly misrepresent credentials, peer rankings, or project experience in proposals.",
                  "Whistleblower protections: Any member who in good faith reports ethical infractions by a peer shall be safeguarded by CESSPA Council.",
                ],
              },
            ].map((canon) => (
              <div
                key={canon.article}
                className="rounded-2xl p-6 sm:p-8 bg-white border border-brand-border shadow-xs space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-forest-green text-white font-montserrat font-bold text-xs tracking-wider">
                    {canon.article}
                  </span>
                  <h3 className="font-montserrat font-bold text-lg sm:text-xl text-ink-dark">
                    {canon.title}
                  </h3>
                </div>

                <ul className="space-y-3 pt-2">
                  {canon.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-ink-body leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-leaf-green shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Practitioner Pledge Callout */}
          <div className="p-8 rounded-3xl bg-forest-green text-white text-center space-y-4 shadow-xl">
            <ShieldCheck className="w-12 h-12 text-heritage-gold mx-auto" />
            <h3 className="font-montserrat font-extrabold text-2xl text-white uppercase">
              The CESSPA Practitioner Pledge
            </h3>
            <p className="quote-font text-lg italic text-sage-mist max-w-2xl mx-auto leading-relaxed">
              "I pledge to uphold the dignity of the environmental and social profession; to speak truth to power with empirical evidence; to safeguard host communities from neglect; and to ensure that national progress never compromises ecological posterity."
            </p>
            <div className="pt-2">
              <Link
                href="/membership/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-heritage-gold text-forest-green font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-heritage-gold-soft transition-colors"
              >
                Sign The Pledge & Apply For Membership <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
