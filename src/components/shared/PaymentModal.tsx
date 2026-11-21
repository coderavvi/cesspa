"use client";

import React, { useState } from "react";
import {
  X,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { formatNaira } from "@/lib/utils";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  purpose: "Membership Dues" | "Registration Fee" | "Conference Ticket" | "Donation" | "Brochure Access";
  amount: number;
  customerName?: string;
  customerEmail?: string;
  metadata?: Record<string, string | number>;
  onSuccess?: (ref: string) => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  title,
  purpose,
  amount,
  customerName = "Valued Member",
  customerEmail: initialEmail = "practitioner@cesspa.org.ng",
  metadata = {},
}: PaymentModalProps) {
  const [email, setEmail] = useState(initialEmail);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handlePaystackRedirect = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }

    setIsRedirecting(true);
    setErrorMsg("");

    try {
      const callbackUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/payments/callback?purpose=${encodeURIComponent(purpose)}`
          : undefined;

      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          amount: Number(amount),
          purpose,
          customerName,
          metadata: {
            ...metadata,
            customerName,
            purpose,
          },
          callbackUrl,
        }),
      });

      const json = await res.json();

      if (json.status && json.data?.authorization_url) {
        // Direct browser redirect to Paystack's official hosted checkout
        window.location.href = json.data.authorization_url;
        return;
      }

      throw new Error(json.message || "Failed to generate Paystack authorization URL.");
    } catch (err: any) {
      setIsRedirecting(false);
      setErrorMsg(err.message || "Unable to redirect to Paystack. Please check your network.");
    }
  };

  const handleClose = () => {
    if (isRedirecting) return;
    setErrorMsg("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Paystack Test Banner */}
        <div className="bg-[#0B4A2B] text-white px-4 py-2.5 flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            PAYSTACK SECURE CHECKOUT (TEST MODE)
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
            pk_test_fc5d...
          </span>
        </div>

        {/* Modal Header */}
        <div className="p-6 pb-4 flex items-start justify-between border-b border-slate-100">
          <div>
            <span className="text-xs font-heading font-bold text-[#0B4A2B] uppercase tracking-wider block">
              Official Payment Gateway
            </span>
            <h3 className="text-xl font-heading font-extrabold text-slate-900 mt-0.5">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isRedirecting}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Order Summary Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-500">Purpose:</span>
              <span className="font-semibold text-slate-900">{purpose}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Billed to:</span>
              <span className="font-medium text-slate-900">{customerName}</span>
            </div>

            {Object.entries(metadata).map(([k, v]) => (
              <div key={k} className="flex justify-between text-slate-500">
                <span className="capitalize">{k}:</span>
                <span className="text-slate-700 font-medium">{v}</span>
              </div>
            ))}

            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
              <span className="font-heading font-bold text-slate-900 text-sm">Total Payable:</span>
              <span className="font-heading font-extrabold text-2xl text-[#0B4A2B]">
                {formatNaira(amount)}
              </span>
            </div>
          </div>

          {/* Email confirmation */}
          <div className="space-y-1.5 text-xs">
            <label className="block font-medium text-slate-700">
              Receipt &amp; Payment Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. yourname@example.com"
              className="w-full px-3 py-2 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B] bg-white font-mono"
            />
            <span className="text-[11px] text-slate-400 block">
              Paystack will dispatch your official electronic transaction receipt to this email.
            </span>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Redirect CTA Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handlePaystackRedirect}
              disabled={isRedirecting}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0B4A2B] hover:bg-[#08331F] text-white font-heading font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isRedirecting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
                  <span>Redirecting to Paystack...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-emerald-300" />
                  <span>Proceed to Paystack Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Test Card Quick Helper */}
          <div className="p-3 rounded-md bg-emerald-50/70 border border-emerald-200 text-[11px] text-slate-600 space-y-1">
            <div className="font-semibold text-[#0B4A2B] flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-[#0B4A2B]" /> Paystack Test Credentials
            </div>
            <p>
              Test Card: <code className="font-mono font-bold text-[#0B4A2B]">4084 0840 8408 4084</code> • Expiry: <code className="font-mono">12/30</code> • CVV: <code className="font-mono">123</code> • PIN: <code className="font-mono">1111</code> • OTP: <code className="font-mono">123456</code>
            </p>
          </div>
        </div>

        {/* Modal Footer Trust Badges */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Secured by Paystack
          </span>
          <span>•</span>
          <span>PCI-DSS Level 1</span>
        </div>
      </div>
    </div>
  );
}

export { PaymentModal };
