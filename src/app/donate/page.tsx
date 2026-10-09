"use client";

import React, { useState } from "react";
import { Heart, ShieldCheck, CreditCard, CheckCircle2, Lock } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { PaymentModal } from "@/components/shared/PaymentModal";
import { formatNaira } from "@/lib/utils";

const PRESET_AMOUNTS = [10000, 25000, 50000, 100000, 250000];

export default function DonatePage() {
  const [amount, setAmount] = useState<number>(25000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("One-time");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [donatedSuccess, setDonatedSuccess] = useState(false);

  // Form Fields matching NAEP-SC reference images
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    comment: "",
  });

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }
    setIsPaymentOpen(true);
  };

  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="SUPPORT OUR WORK" lightMode={true}>
            COMMUNITY & RESEARCH ENDOWMENT
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            Support Environmental & Social Standards
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Your philanthropic donations fund independent community baseline research, student environmental scholarships,
            and rural host-community safeguards training across Nigeria.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-3xl p-6 sm:p-10 bg-white border border-brand-border shadow-sm space-y-6">
            <div className="border-b border-brand-border/60 pb-3">
              <span className="text-[10px] font-montserrat font-bold text-heritage-gold uppercase tracking-widest block">
                MAKE A DIFFERENCE
              </span>
              <h2 className="font-montserrat font-extrabold text-2xl text-ink-dark uppercase mt-0.5">
                CESSPA Contribution Form
              </h2>
              <p className="text-xs text-ink-muted mt-1">
                * Indicates mandatory required fields. All contributions processed in Nigerian Naira (₦).
              </p>
            </div>

            {donatedSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-leaf-green flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-montserrat font-extrabold text-2xl text-forest-green">
                  Thank You For Your Support!
                </h3>
                <p className="text-xs sm:text-sm text-ink-body max-w-md mx-auto leading-relaxed">
                  Your generous donation of <strong>{formatNaira(finalAmount)}</strong> has been registered.
                  An electronic tax deductible receipt has been dispatched to {formData.email}.
                </p>
                <button
                  type="button"
                  onClick={() => setDonatedSuccess(false)}
                  className="px-6 py-2.5 rounded-xl bg-forest-green text-white font-montserrat font-bold text-xs uppercase"
                >
                  Make Another Contribution
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Amount Selection */}
                <div>
                  <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-2">
                    * Contribution Amount (₦)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
                    {PRESET_AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setAmount(amt);
                          setCustomAmount("");
                        }}
                        className={`py-2 px-1 rounded-xl font-montserrat font-bold text-xs transition-all ${
                          !customAmount && amount === amt
                            ? "bg-forest-green text-white ring-2 ring-heritage-gold shadow-xs"
                            : "bg-sage-mist/60 text-ink-dark border border-brand-border hover:bg-white"
                        }`}
                      >
                        {formatNaira(amt, false)}
                      </button>
                    ))}
                  </div>

                  <input
                    type="number"
                    min="1000"
                    placeholder="Or enter custom amount in ₦..."
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green"
                  />
                </div>

                {/* Payment Frequency */}
                <div>
                  <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-2">
                    Payment Frequency
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["One-time", "Monthly", "Quarterly", "Semi-annually", "Annually"].map((freq) => (
                      <label
                        key={freq}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs cursor-pointer transition-all ${
                          frequency === freq
                            ? "border-forest-green bg-forest-green/5 font-bold text-forest-green ring-1 ring-forest-green/20"
                            : "border-brand-border text-ink-body hover:bg-sage-mist/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="frequency"
                          value={freq}
                          checked={frequency === freq}
                          onChange={() => setFrequency(freq)}
                          className="text-forest-green focus:ring-0"
                        />
                        <span>{freq}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Donor Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                      * First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="e.g. Babatunde"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                      * Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="e.g. Adeyemi"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                      * Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="donor@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                      Company / Affiliation
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Optional corporate affiliation"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                    Comment / In Honor Of
                  </label>
                  <textarea
                    rows={3}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Provide a dedication or specific program you wish to support..."
                    className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4 text-heritage-gold" />
                    Donate {formatNaira(finalAmount)} ({frequency})
                  </button>
                  <p className="text-center text-[11px] text-ink-muted mt-2">
                    Secured by Paystack / Flutterwave instant checkout.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </Section>

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        title={`Donation: ${formatNaira(finalAmount)}`}
        purpose="Donation"
        amount={finalAmount}
        customerName={`${formData.firstName} ${formData.lastName}`}
        customerEmail={formData.email}
        metadata={{
          frequency,
          company: formData.company,
        }}
        onSuccess={() => {
          setDonatedSuccess(true);
          setIsPaymentOpen(false);
        }}
      />
    </div>
  );
}
