"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Briefcase,
  FileUp,
  CheckCircle2,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  FileCheck,
  ShieldCheck,
  Download,
  Receipt,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { PaymentModal } from "@/components/shared/PaymentModal";
import { MOCK_TIERS } from "@/lib/data/mockData";
import { formatNaira } from "@/lib/utils";

const SPECIALISATIONS = [
  "Environmental & Social Impact Assessment (ESIA)",
  "Social Safeguards & Community Consultation",
  "Resettlement Action Planning (RAP) & Livelihood Restoration",
  "Monitoring, Evaluation & Learning (MEL)",
  "Biodiversity Conservation & Critical Habitats",
  "Occupational Health & Community Safety (OHS)",
  "Climate Resilience & Carbon Auditing",
  "Mine Closure, Oil Spill & Remediation Audits",
  "Pollution & Hazardous Waste Management",
];

export default function RegisterWizardPage() {
  const [step, setStep] = useState(1);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [generatedRef, setGeneratedRef] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    zone: "North Central",
    state: "FCT Abuja",
    organisation: "",
    roleTitle: "",
    experienceYears: "5",
    specialisations: ["Environmental & Social Impact Assessment (ESIA)"],
    qualification: "B.Sc / B.Tech (Honours)",
    institution: "",
    selectedTier: "certified",
    uploadedFiles: [
      { name: "Curriculum_Vitae_Updated.pdf", size: "1.2 MB", status: "Uploaded" },
      { name: "Degree_Certificate_Certified.pdf", size: "2.4 MB", status: "Uploaded" },
    ],
  });

  const selectedTierObj =
    MOCK_TIERS.find((t) => t.code === formData.selectedTier) || MOCK_TIERS[2];

  const handleToggleSpec = (spec: string) => {
    setFormData((prev) => {
      const exists = prev.specialisations.includes(spec);
      return {
        ...prev,
        specialisations: exists
          ? prev.specialisations.filter((s) => s !== spec)
          : [...prev.specialisations, spec],
      };
    });
  };

  const handleNext = () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      // Step 4 opens PaymentModal
      setIsPaymentOpen(true);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handlePaymentSuccess = (ref: string) => {
    setGeneratedRef(ref);
    setPaymentSuccess(true);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-forest-green text-white py-12 lg:py-16 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="ONBOARDING" lightMode={true}>
            PRACTITIONER ACCREDITATION
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl text-white uppercase mt-1">
            CESSPA Membership Registration
          </h1>
          <p className="text-xs sm:text-sm text-sage-mist/90 mt-2 max-w-xl">
            Complete this multi-step application to apply for accreditation and official registration.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        <div className="max-w-3xl mx-auto">
          {/* Wizard Stepper Bar */}
          {!paymentSuccess && (
            <div className="mb-10 p-4 rounded-2xl bg-white border border-brand-border shadow-xs">
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {[
                  { num: 1, label: "Personal Info", icon: User },
                  { num: 2, label: "Specialisation", icon: Briefcase },
                  { num: 3, label: "Documents", icon: FileUp },
                  { num: 4, label: "Review & Pay", icon: CreditCard },
                ].map((s) => {
                  const Icon = s.icon;
                  const isActive = step === s.num;
                  const isDone = step > s.num;
                  return (
                    <div
                      key={s.num}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-colors ${
                        isActive
                          ? "bg-forest-green/10 text-forest-green font-bold"
                          : isDone
                          ? "text-leaf-green font-medium"
                          : "text-ink-muted"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-montserrat font-bold ${
                          isActive
                            ? "bg-forest-green text-white ring-2 ring-heritage-gold"
                            : isDone
                            ? "bg-leaf-green text-white"
                            : "bg-sage-mist text-ink-muted"
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                      </div>
                      <span className="text-[11px] sm:text-xs truncate">{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Confirmation Success Screen */}
          {paymentSuccess ? (
            <div className="rounded-3xl p-8 sm:p-12 bg-white border border-brand-border shadow-lg text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-leaf-green flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-widest block">
                  REGISTRATION COMPLETED
                </span>
                <h2 className="text-2xl sm:text-3xl font-montserrat font-extrabold text-forest-green mt-1">
                  Welcome to CESSPA, {formData.fullName || "Practitioner"}!
                </h2>
                <p className="text-xs sm:text-sm text-ink-body max-w-lg mx-auto mt-2 leading-relaxed">
                  Your application has been received and logged on the CESSPA National Registry.
                  Your provisional membership identification is generated below.
                </p>
              </div>

              {/* Provisional Membership Card */}
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-forest-green text-white text-left space-y-4 shadow-xl border border-heritage-gold/30">
                <div className="flex justify-between items-start border-b border-sage-mist/20 pb-3">
                  <div>
                    <span className="text-[10px] font-montserrat font-bold text-heritage-gold-soft uppercase tracking-wider block">
                      PROVISIONAL IDENTIFIER
                    </span>
                    <span className="font-mono font-bold text-lg">
                      CESSPA-2026-{Math.floor(Math.random() * 8999 + 1000)}
                    </span>
                  </div>
                  <ShieldCheck className="w-8 h-8 text-heritage-gold" />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-sage-mist/70 text-[10px] block">MEMBER NAME:</span>
                    <span className="font-semibold">{formData.fullName || "John Doe"}</span>
                  </div>
                  <div>
                    <span className="text-sage-mist/70 text-[10px] block">CATEGORY:</span>
                    <span className="font-semibold">{selectedTierObj.name}</span>
                  </div>
                  <div>
                    <span className="text-sage-mist/70 text-[10px] block">ZONE CHAPTER:</span>
                    <span className="font-semibold">{formData.zone}</span>
                  </div>
                  <div>
                    <span className="text-sage-mist/70 text-[10px] block">PAYMENT REF:</span>
                    <span className="font-mono text-[10px] text-sage-mist truncate">
                      {generatedRef || "CESSPA-SIM-TX"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => alert("Official PDF Receipt Downloaded!")}
                  className="px-6 py-3 rounded-xl bg-forest-green text-white font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-deep-emerald shadow-md flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Official Receipt
                </button>
                <Link
                  href="/directory"
                  className="px-6 py-3 rounded-xl border border-brand-border text-forest-green font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-sage-mist"
                >
                  View Member Directory
                </Link>
              </div>
            </div>
          ) : (
            /* Wizard Steps Container */
            <div className="rounded-3xl p-6 sm:p-10 bg-white border border-brand-border shadow-sm space-y-6">
              {/* STEP 1: Personal Details */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-brand-border/60 pb-3">
                    <h3 className="font-montserrat font-extrabold text-xl text-ink-dark uppercase">
                      Step 1: Personal & Contact Information
                    </h3>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Enter your official details as recognized on national credentials.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                        Full Name (Surname First) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Adeyemi Babatunde Emmanuel"
                        className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                          Official Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="adeyemi@safeguards.ng"
                          className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                          Telephone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+234 803 123 4567"
                          className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                          Geopolitical Zone *
                        </label>
                        <select
                          value={formData.zone}
                          onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green bg-white"
                        >
                          <option value="North Central">North Central (FCT, Plateau, Niger...)</option>
                          <option value="South West">South West (Lagos, Ogun, Oyo...)</option>
                          <option value="South South">South South (Rivers, Delta, Edo...)</option>
                          <option value="South East">South East (Enugu, Anambra, Imo...)</option>
                          <option value="North West">North West (Kano, Kaduna, Sokoto...)</option>
                          <option value="North East">North East (Bauchi, Borno, Adamawa...)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                          State of Primary Practice *
                        </label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          placeholder="e.g. Lagos or FCT Abuja"
                          className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                        Current Organisation / Consulting Firm
                      </label>
                      <input
                        type="text"
                        value={formData.organisation}
                        onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                        placeholder="e.g. Federal Ministry of Environment or Private Practice"
                        className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Specialisation & Background */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-brand-border/60 pb-3">
                    <h3 className="font-montserrat font-extrabold text-xl text-ink-dark uppercase">
                      Step 2: Professional Specialisation
                    </h3>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Select all primary practice domains you audit, model, or implement.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SPECIALISATIONS.map((spec) => {
                        const checked = formData.specialisations.includes(spec);
                        return (
                          <button
                            type="button"
                            key={spec}
                            onClick={() => handleToggleSpec(spec)}
                            className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${
                              checked
                                ? "border-forest-green bg-forest-green/5 text-forest-green font-semibold"
                                : "border-brand-border hover:bg-sage-mist/40 text-ink-body"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => {}}
                              className="mt-0.5 text-forest-green rounded focus:ring-0"
                            />
                            <span>{spec}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                      <div>
                        <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                          Years of E&S Safeguards Experience
                        </label>
                        <select
                          value={formData.experienceYears}
                          onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green bg-white"
                        >
                          <option value="0">Student / Under 1 year</option>
                          <option value="2">1 – 3 years (Associate Track)</option>
                          <option value="5">4 – 9 years (Certified Professional Track)</option>
                          <option value="12">10 – 14 years (Senior Lead)</option>
                          <option value="16">15+ years (Fellow Track)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                          Highest Degree Obtained
                        </label>
                        <input
                          type="text"
                          value={formData.qualification}
                          onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                          placeholder="e.g. M.Sc Environmental Management"
                          className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Document Uploads */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-brand-border/60 pb-3">
                    <h3 className="font-montserrat font-extrabold text-xl text-ink-dark uppercase">
                      Step 3: Verification Documents
                    </h3>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Upload your CV, academic credentials, and project safeguard portfolios.
                    </p>
                  </div>

                  {/* Drag and Drop Zone */}
                  <div className="border-2 border-dashed border-forest-green/40 rounded-2xl p-8 text-center bg-sage-mist/30 hover:bg-sage-mist/60 transition-colors cursor-pointer space-y-2">
                    <UploadCloud className="w-12 h-12 text-forest-green mx-auto" />
                    <h4 className="font-montserrat font-bold text-sm text-ink-dark">
                      Click to Browse or Drag Credentials Here
                    </h4>
                    <p className="text-xs text-ink-muted">
                      Accepted formats: PDF, DOCX, JPG (Max 15MB per file)
                    </p>
                  </div>

                  {/* Uploaded Files Queue */}
                  <div className="space-y-2 pt-2">
                    <span className="font-montserrat font-bold text-xs uppercase text-ink-dark block">
                      Uploaded Documents (2 ready for review):
                    </span>
                    {formData.uploadedFiles.map((file, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-sage-mist/50 border border-brand-border flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileCheck className="w-4 h-4 text-leaf-green" />
                          <span className="font-medium text-ink-dark">{file.name}</span>
                          <span className="text-ink-muted">({file.size})</span>
                        </div>
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          VERIFIED
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Choose Tier & Review */}
              {step === 4 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-brand-border/60 pb-3">
                    <h3 className="font-montserrat font-extrabold text-xl text-ink-dark uppercase">
                      Step 4: Select Tier & Final Review
                    </h3>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Confirm your subscription category and proceed to secure checkout.
                    </p>
                  </div>

                  {/* Tier Radio Cards */}
                  <div className="space-y-2.5">
                    {MOCK_TIERS.map((tier) => (
                      <label
                        key={tier.id}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                          formData.selectedTier === tier.code
                            ? "border-forest-green bg-forest-green/5 ring-2 ring-forest-green/20"
                            : "border-brand-border hover:bg-sage-mist/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="tier"
                            value={tier.code}
                            checked={formData.selectedTier === tier.code}
                            onChange={() => setFormData({ ...formData, selectedTier: tier.code })}
                            className="text-forest-green focus:ring-0"
                          />
                          <div>
                            <span className="font-montserrat font-bold text-sm text-ink-dark block">
                              {tier.name}
                            </span>
                            <span className="text-xs text-ink-muted">{tier.tagline}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-montserrat font-extrabold text-base text-forest-green block">
                            {formatNaira(tier.annualFee, false)}
                          </span>
                          <span className="text-[10px] text-ink-muted">/{tier.period}</span>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-sage-mist/60 border border-brand-border space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Applicant:</span>
                      <span className="font-semibold text-ink-dark">{formData.fullName || "Practitioner"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Email:</span>
                      <span className="font-semibold text-ink-dark">{formData.email || "applicant@example.com"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Selected Tier:</span>
                      <span className="font-semibold text-forest-green">{selectedTierObj.name}</span>
                    </div>
                    <div className="pt-2 border-t border-brand-border flex justify-between items-baseline">
                      <span className="font-montserrat font-bold text-sm text-ink-dark">Amount Due:</span>
                      <span className="font-montserrat font-extrabold text-xl text-forest-green">
                        {formatNaira(selectedTierObj.annualFee)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="pt-6 border-t border-brand-border flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl border border-brand-border text-ink-dark hover:bg-sage-mist font-montserrat font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2"
                >
                  {step === 4 ? (
                    <>
                      Proceed to Payment ({formatNaira(selectedTierObj.annualFee, false)})
                      <CreditCard className="w-4 h-4 text-heritage-gold" />
                    </>
                  ) : (
                    <>
                      Next Step <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Reusable PaymentModal Integration */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        title={`Membership Fee: ${selectedTierObj.name}`}
        purpose="Registration Fee"
        amount={selectedTierObj.annualFee}
        customerName={formData.fullName || "CESSPA Applicant"}
        customerEmail={formData.email || "applicant@cesspa.org.ng"}
        metadata={{
          tier: selectedTierObj.name,
          zone: formData.zone,
        }}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
