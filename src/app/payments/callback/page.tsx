"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Download,
  Receipt,
  Home,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { formatNaira, formatDate } from "@/lib/utils";

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const purpose = searchParams.get("purpose") || "CESSPA Payment";

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [txData, setTxData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!reference) {
      setLoading(false);
      setErrorMsg("No transaction reference detected in callback URL.");
      return;
    }

    const verifyTx = async () => {
      try {
        const res = await fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference)}`);
        const json = await res.json();

        if (json.status && json.data) {
          setTxData(json.data);
          setVerified(json.data.status === "success");
          if (json.data.status !== "success") {
            setErrorMsg(json.data.gateway_response || "Payment was not successful.");
          }
        } else {
          setErrorMsg(json.message || "Failed to verify transaction with Paystack.");
        }
      } catch (err: any) {
        setErrorMsg(err.message || "Network error verifying transaction.");
      } finally {
        setLoading(false);
      }
    };

    verifyTx();
  }, [reference]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#0B4A2B]" />
        <h2 className="font-heading font-bold text-xl text-slate-900">
          Verifying Paystack Transaction...
        </h2>
        <p className="text-xs text-slate-500 font-mono">
          Querying reference: {reference || "Loading..."}
        </p>
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4">
        <div className="p-8 rounded-lg border border-rose-200 bg-white shadow-sm text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-2xl text-slate-900">
              Payment Not Completed
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              {errorMsg || "We were unable to verify this transaction with Paystack."}
            </p>
          </div>

          {reference && (
            <div className="p-3 rounded-md bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
              Reference: {reference}
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/membership/pay-dues"
              className="w-full sm:w-auto px-4 py-2 rounded-md bg-[#0B4A2B] text-white text-xs font-semibold hover:bg-[#08331F] transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-4 py-2 rounded-md border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const amountNaira = txData?.amount ? Math.round(txData.amount / 100) : 0;

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 space-y-6">
      <div className="p-8 rounded-lg border border-slate-200 bg-white shadow-sm space-y-6">
        {/* Success Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#0B4A2B] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-bold block">
            PAYSTACK TEST VERIFIED
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Payment Cleared Successfully
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Your transaction has been confirmed by Paystack and logged to the CESSPA financial registry.
          </p>
        </div>

        {/* Receipt Ledger Card */}
        <div className="p-5 rounded-md bg-slate-50 border border-slate-200 space-y-3 text-xs">
          <div className="flex justify-between items-baseline pb-2 border-b border-slate-200">
            <span className="text-slate-500 uppercase text-[10px] font-mono">Amount Paid:</span>
            <span className="font-heading font-bold text-2xl text-[#0B4A2B]">
              {formatNaira(amountNaira)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-slate-700">
            <div>
              <span className="text-slate-400 block text-[10px]">Purpose:</span>
              <span className="font-semibold">{txData?.metadata?.purpose || purpose}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Payment Channel:</span>
              <span className="font-medium capitalize">{txData?.channel || "card"}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Billed Email:</span>
              <span className="font-mono">{txData?.customer?.email || "N/A"}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Paid At:</span>
              <span>{txData?.paid_at ? formatDate(txData.paid_at) : "Confirmed"}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] font-mono">
            <span className="text-slate-500">Paystack Reference:</span>
            <span className="font-bold text-slate-900">{txData?.reference || reference}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-auto px-4 py-2 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Receipt</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Return to Home</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#0B4A2B]" />
        </div>
      }
    >
      <PaymentCallbackContent />
    </Suspense>
  );
}
