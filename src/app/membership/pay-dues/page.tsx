"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  ShieldCheck,
  Calendar,
  Clock,
  ArrowRight,
  User,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { PaymentModal } from "@/components/shared/PaymentModal";
import { memberService } from "@/lib/services";
import { Member } from "@/lib/types";
import { formatNaira, formatDate } from "@/lib/utils";

export default function PayDuesPage() {
  const [query, setQuery] = useState("");
  const [member, setMember] = useState<Member | null>(null);
  const [searched, setSearched] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setSearched(true);
    // Lookup via service
    const found = await memberService.getById(query);
    if (found) {
      setMember(found);
    } else {
      // Fallback sample lookup for demo if query matches email pattern or id
      const all = await memberService.getAll();
      const byEmail = all.find((m) => m.email.toLowerCase().includes(query.toLowerCase()));
      setMember(byEmail || all[0]); // default to demo member for great UX
    }
  };

  // Determine annual fee based on member tier
  const duesAmount =
    member?.tier === "Fellow"
      ? 150000
      : member?.tier === "Student"
      ? 15000
      : member?.tier === "Associate"
      ? 35000
      : member?.tier === "Corporate"
      ? 350000
      : 75000;

  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="DUES PORTAL" lightMode={true}>
            ANNUAL RENEWAL & VERIFICATION
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            Pay Annual Professional Dues
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Maintain your active certification status on the CESSPA Registry. Enter your Membership ID or registered email below to verify current dues.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Lookup Card */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white border border-brand-border shadow-sm">
            <h3 className="font-montserrat font-extrabold text-xl text-ink-dark uppercase mb-2">
              Member Dues Verification
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted mb-6">
              Enter your Membership Number (e.g. <code>CESSPA-2025-0104</code>) or your registered email address.
            </p>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-ink-muted absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter ID (e.g. CESSPA-2025-0104) or email..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-brand-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green bg-ivory/50"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-md transition-colors shrink-0"
                >
                  Verify Status
                </button>
              </div>
              <p className="text-[11px] text-ink-muted">
                Tip: Try typing <code>CESSPA-2025-0104</code> or <code>amina</code> to test sample practitioner records.
              </p>
            </form>
          </div>

          {/* Member Record Result Card */}
          {searched && member && (
            <div className="rounded-3xl p-6 sm:p-8 bg-white border border-forest-green/40 shadow-xl space-y-6 animate-in fade-in duration-300">
              <div className="flex items-start justify-between border-b border-brand-border pb-4">
                <div>
                  <span className="text-[10px] font-montserrat font-bold text-heritage-gold uppercase tracking-widest block">
                    FOUND IN NATIONAL REGISTRY
                  </span>
                  <h4 className="font-montserrat font-extrabold text-xl text-ink-dark mt-0.5">
                    {member.fullName}
                  </h4>
                  <p className="font-mono text-xs text-forest-green font-bold">
                    {member.membershipId}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-montserrat font-bold uppercase tracking-wider ${
                    paidSuccess
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {paidSuccess ? "DUES CURRENT" : "RENEWAL DUE"}
                </span>
              </div>

              {/* Status Details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-sage-mist/40 rounded-xl space-y-0.5">
                  <span className="text-ink-muted text-[11px]">Category:</span>
                  <p className="font-bold text-ink-dark">{member.tier}</p>
                </div>
                <div className="p-3 bg-sage-mist/40 rounded-xl space-y-0.5">
                  <span className="text-ink-muted text-[11px]">Geopolitical Chapter:</span>
                  <p className="font-bold text-ink-dark">{member.zone} ({member.state})</p>
                </div>
                <div className="p-3 bg-sage-mist/40 rounded-xl space-y-0.5">
                  <span className="text-ink-muted text-[11px]">Cycle Expiration:</span>
                  <p className="font-bold text-ink-dark">
                    {paidSuccess ? "14 Oct 2027" : formatDate(member.expiryDate)}
                  </p>
                </div>
                <div className="p-3 bg-sage-mist/40 rounded-xl space-y-0.5">
                  <span className="text-ink-muted text-[11px]">Outstanding Dues:</span>
                  <p className="font-montserrat font-extrabold text-forest-green text-sm">
                    {paidSuccess ? "₦0.00" : formatNaira(duesAmount)}
                  </p>
                </div>
              </div>

              {/* Payment Action or Receipt */}
              {paidSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Dues Successfully Settled</span>
                  </div>
                  <p className="text-xs text-ink-body">
                    Your certification seal has been extended for 12 months. Official electronic receipt has been dispatched.
                  </p>
                </div>
              ) : (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPaymentOpen(true)}
                    className="w-full py-4 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4 text-heritage-gold" />
                    Pay Annual Dues ({formatNaira(duesAmount)})
                  </button>
                  <p className="text-center text-[11px] text-ink-muted mt-2">
                    Secured by Paystack / Flutterwave instant reconciliation.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Help notice */}
          <div className="p-6 rounded-2xl bg-sage-mist/50 border border-brand-border text-center space-y-2">
            <h5 className="font-montserrat font-bold text-sm text-ink-dark">
              Not yet registered as a CESSPA practitioner?
            </h5>
            <p className="text-xs text-ink-muted">
              Apply today through our multi-step onboarding wizard to join the national registry.
            </p>
            <Link
              href="/membership/register"
              className="inline-flex items-center gap-1 text-xs font-montserrat font-bold text-forest-green hover:text-heritage-gold mt-1"
            >
              Start Member Registration <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Section>

      {/* Payment Modal */}
      {member && (
        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          title={`Annual Dues: ${member.tier}`}
          purpose="Membership Dues"
          amount={duesAmount}
          customerName={member.fullName}
          customerEmail={member.email}
          metadata={{
            membershipId: member.membershipId,
            tier: member.tier,
          }}
          onSuccess={() => {
            setPaidSuccess(true);
            setIsPaymentOpen(false);
          }}
        />
      )}
    </div>
  );
}
