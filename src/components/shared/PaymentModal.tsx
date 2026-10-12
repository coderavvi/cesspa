"use client";

import React, { useState } from "react";
import {
  X,
  CreditCard,
  Building,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
} from "lucide-react";
import { formatNaira } from "@/lib/utils";
import { paymentService } from "@/lib/services";

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

export function PaymentModal({
  isOpen,
  onClose,
  title,
  purpose,
  amount,
  customerName = "Valued Member",
  customerEmail = "practitioner@cesspa.org.ng",
  metadata = {},
  onSuccess,
}: PaymentModalProps) {
  const [method, setMethod] = useState<"card" | "bank" | "ussd">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [reference, setReference] = useState("");

  if (!isOpen) return null;

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    setStatus("idle");

    try {
      // Call service layer
      const init = await paymentService.initializePayment({
        amount,
        email: customerEmail,
        purpose,
      });

      // Gateway verification processing window
      setTimeout(async () => {
        const verify = await paymentService.verifyPayment(init.reference);
        if (verify.verified) {
          setReference(init.reference);
          setStatus("success");
          setIsProcessing(false);
          if (onSuccess) onSuccess(init.reference);
        } else {
          setStatus("error");
          setIsProcessing(false);
        }
      }, 1800);
    } catch {
      setStatus("error");
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setStatus("idle");
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-green/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-brand-border overflow-hidden">
        {/* Secure SSL Banner */}
        <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-4 py-2 flex items-center justify-between text-xs font-semibold text-emerald-900">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            256-BIT SSL ENCRYPTED SECURE PAYMENT
          </span>
          <span className="text-[10px] uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-300 font-bold">
            SECURE
          </span>
        </div>

        {/* Modal Header */}
        <div className="p-6 pb-4 flex items-start justify-between border-b border-brand-border/60">
          <div>
            <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-wider">
              CESSPA SECURE CHECKOUT
            </span>
            <h3 className="text-xl font-montserrat font-extrabold text-ink-dark mt-0.5">
              {title}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-ink-muted hover:text-ink-dark rounded-lg hover:bg-sage-mist transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {status === "idle" && (
            <>
              {/* Order Summary Box */}
              <div className="p-4 rounded-xl bg-sage-mist/60 border border-brand-border space-y-2">
                <div className="flex justify-between text-sm text-ink-body">
                  <span>Purpose:</span>
                  <span className="font-semibold text-ink-dark">{purpose}</span>
                </div>
                <div className="flex justify-between text-sm text-ink-body">
                  <span>Billed to:</span>
                  <span className="font-medium text-ink-dark">{customerName}</span>
                </div>
                <div className="flex justify-between text-sm text-ink-body">
                  <span>Email:</span>
                  <span className="font-mono text-xs">{customerEmail}</span>
                </div>
                {Object.entries(metadata).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-xs text-ink-muted">
                    <span className="capitalize">{k}:</span>
                    <span>{v}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-brand-border flex justify-between items-baseline">
                  <span className="font-montserrat font-bold text-ink-dark">Total Payable:</span>
                  <span className="font-montserrat font-extrabold text-2xl text-forest-green">
                    {formatNaira(amount)}
                  </span>
                </div>
              </div>

              {/* Method Tabs */}
              <div>
                <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase tracking-wider mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setMethod("card")}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition-all ${
                      method === "card"
                        ? "border-forest-green bg-forest-green/5 text-forest-green ring-2 ring-forest-green/20"
                        : "border-brand-border hover:bg-sage-mist/40 text-ink-body"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mb-1" />
                    Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod("bank")}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition-all ${
                      method === "bank"
                        ? "border-forest-green bg-forest-green/5 text-forest-green ring-2 ring-forest-green/20"
                        : "border-brand-border hover:bg-sage-mist/40 text-ink-body"
                    }`}
                  >
                    <Building className="w-5 h-5 mb-1" />
                    Bank Transfer
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod("ussd")}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition-all ${
                      method === "ussd"
                        ? "border-forest-green bg-forest-green/5 text-forest-green ring-2 ring-forest-green/20"
                        : "border-brand-border hover:bg-sage-mist/40 text-ink-body"
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mb-1" />
                    USSD Code
                  </button>
                </div>
              </div>

              {/* Card / Bank Input Preview */}
              {method === "card" && (
                <div className="space-y-3 bg-ivory p-3.5 rounded-xl border border-brand-border/60 text-xs text-ink-body">
                  <div className="flex justify-between items-center text-[11px] text-ink-muted">
                    <span>Card Information</span>
                    <span className="flex items-center gap-1 text-forest-green font-semibold">
                      <Lock className="w-3 h-3" /> 256-bit SSL
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-brand-border font-mono text-ink-dark">
                    4084 0000 0000 1234
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 bg-white rounded-lg border border-brand-border font-mono text-ink-dark">
                      12 / 28
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-brand-border font-mono text-ink-dark">
                      •••
                    </div>
                  </div>
                </div>
              )}

              {method === "bank" && (
                <div className="bg-ivory p-4 rounded-xl border border-brand-border/60 text-xs space-y-2">
                  <p className="text-ink-body font-medium">
                    Dynamic virtual account allocated for this transaction:
                  </p>
                  <div className="p-3 bg-white rounded-lg border border-brand-border space-y-1">
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Bank:</span>
                      <span className="font-semibold text-ink-dark">CESSPA Collection (Zenith / Paystack)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Account No:</span>
                      <span className="font-mono font-bold text-forest-green text-sm">9920148821</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Account Name:</span>
                      <span className="font-semibold text-ink-dark">CESSPA National Treasury</span>
                    </div>
                  </div>
                </div>
              )}

              {method === "ussd" && (
                <div className="bg-ivory p-4 rounded-xl border border-brand-border/60 text-xs text-center space-y-2">
                  <p className="text-ink-body">Dial the unified USSD code below on your registered phone:</p>
                  <div className="p-3 bg-white rounded-lg border border-brand-border font-mono font-bold text-lg text-forest-green">
                    *737*000*2026#
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                type="button"
                onClick={handleProcessPayment}
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing Secure Verification...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-heritage-gold" />
                    Pay {formatNaira(amount)}
                  </>
                )}
              </button>
            </>
          )}

          {/* Success State */}
          {status === "success" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-leaf-green flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-2xl font-montserrat font-extrabold text-forest-green">
                  Payment Confirmed!
                </h4>
                <p className="text-sm text-ink-body mt-1">
                  Your transaction has been approved and registered on the CESSPA official treasury ledger.
                </p>
              </div>
              <div className="p-3 bg-sage-mist rounded-xl border border-brand-border text-xs text-left font-mono space-y-1">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Reference:</span>
                  <span className="font-semibold text-ink-dark">{reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Amount:</span>
                  <span className="font-semibold text-forest-green">{formatNaira(amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Status:</span>
                  <span className="text-emerald-700 font-bold">APPROVED / CLEARED</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 rounded-xl bg-forest-green text-white font-montserrat font-bold text-sm hover:bg-deep-emerald transition-colors"
              >
                Close & Return
              </button>
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shadow-inner">
                <AlertCircle className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-2xl font-montserrat font-extrabold text-ink-dark">
                  Transaction Incomplete
                </h4>
                <p className="text-sm text-ink-muted mt-1">
                  The payment gateway was unable to verify the transaction. Please check your network and try again.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="w-full py-3 rounded-xl bg-forest-green text-white font-montserrat font-bold text-sm hover:bg-deep-emerald transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer Trust Badges */}
        <div className="p-4 bg-sage-mist/40 border-t border-brand-border/60 flex items-center justify-center gap-4 text-[11px] text-ink-muted">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-leaf-green" /> Secured by Paystack & Flutterwave
          </span>
          <span>•</span>
          <span>ISO 27001 & PCI-DSS Level 1</span>
        </div>
      </div>
    </div>
  );
}
