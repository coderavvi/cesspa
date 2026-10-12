"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Download,
  Mail,
  CheckCircle2,
  AlertCircle,
  Settings,
  ShieldCheck,
  Search,
  ExternalLink,
} from "lucide-react";
import { MOCK_PAYMENTS } from "@/lib/data/mockData";
import { formatNaira } from "@/lib/utils";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState(MOCK_PAYMENTS);
  const [search, setSearch] = useState("");
  const [gatewaySettingsOpen, setGatewaySettingsOpen] = useState(false);

  // Gateway state
  const [gateway, setGateway] = useState({
    activeProvider: "paystack",
    paystackPublicKey: "pk_test_cesspa_9920148821a980c",
    paystackSecretKey: "sk_test_cesspa_••••••••••••••••",
    flutterwavePublicKey: "FLWPUBK_TEST-e9821034-X",
    sandboxMode: true,
  });

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    return (
      !q ||
      p.reference.toLowerCase().includes(q) ||
      p.memberName.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-wider block">
            FINANCIAL AUDIT
          </span>
          <h1 className="font-montserrat font-extrabold text-2xl text-slate-900 uppercase mt-0.5">
            Dues & Transactions Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Reconciliation of membership dues, conference passes, and philanthropic donations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setGatewaySettingsOpen(true)}
            className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-montserrat font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Settings className="w-3.5 h-3.5" /> Gateway Settings
          </button>
          <button
            type="button"
            onClick={() => alert("Exporting Financial Ledger (CSV)...")}
            className="px-4 py-2 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> Export Ledger
          </button>
        </div>
      </div>

      {/* Summary Stat Strips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-400 font-montserrat uppercase font-bold">
            Total Inflow Cleared
          </span>
          <p className="font-montserrat font-extrabold text-2xl text-forest-green mt-1">
            {formatNaira(720000)}
          </p>
          <span className="text-[11px] text-slate-400">Current reconciliation period</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-400 font-montserrat uppercase font-bold">
            Overdue Dues Reminders
          </span>
          <p className="font-montserrat font-extrabold text-2xl text-amber-700 mt-1">
            28 Members
          </p>
          <button
            onClick={() => alert("Automated email dues reminders dispatched to 28 members.")}
            className="text-[11px] text-forest-green font-bold hover:underline"
          >
            Dispatch Batch Reminders →
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-400 font-montserrat uppercase font-bold">
            Active Clearing Gateway
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-montserrat font-bold text-lg text-slate-900 uppercase">
              {gateway.activeProvider}
            </span>
            <span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded text-[10px]">
              ACTIVE
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Card, Bank Transfer & USSD enabled</span>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reference or remitter..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
            />
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {filtered.length} Recorded Transactions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-montserrat uppercase text-[10px]">
                <th className="py-3 px-4">Transaction Ref</th>
                <th className="py-3 px-4">Remitter</th>
                <th className="py-3 px-4">Purpose</th>
                <th className="py-3 px-4">Amount (₦)</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-mono font-bold text-forest-green text-[11px]">
                    {tx.reference}
                  </td>
                  <td className="py-3.5 px-4">
                    <strong className="text-slate-900 block">{tx.memberName}</strong>
                    <span className="text-[11px] text-slate-400">{tx.email}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium">{tx.purpose}</td>
                  <td className="py-3.5 px-4 font-montserrat font-extrabold text-slate-900">
                    {formatNaira(tx.amount)}
                  </td>
                  <td className="py-3.5 px-4">{tx.method}</td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">{tx.date}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gateway Configuration Modal */}
      {gatewaySettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-montserrat font-bold text-heritage-gold uppercase tracking-widest block">
                  PAYMENT INFRASTRUCTURE
                </span>
                <h3 className="font-montserrat font-extrabold text-xl text-slate-900">
                  Payment Gateway Settings
                </h3>
              </div>
              <button
                onClick={() => setGatewaySettingsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                  Active Payment Processor
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGateway({ ...gateway, activeProvider: "paystack" })}
                    className={`py-2 px-3 rounded-xl border text-center font-bold ${
                      gateway.activeProvider === "paystack"
                        ? "border-forest-green bg-forest-green/10 text-forest-green"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    Paystack
                  </button>
                  <button
                    type="button"
                    onClick={() => setGateway({ ...gateway, activeProvider: "flutterwave" })}
                    className={`py-2 px-3 rounded-xl border text-center font-bold ${
                      gateway.activeProvider === "flutterwave"
                        ? "border-forest-green bg-forest-green/10 text-forest-green"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    Flutterwave
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                  Paystack Public Key
                </label>
                <input
                  type="text"
                  value={gateway.paystackPublicKey}
                  onChange={(e) => setGateway({ ...gateway, paystackPublicKey: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                  Environment Mode
                </label>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold flex items-center justify-between">
                  <span>Payment Gateway Connected</span>
                  <span className="text-[10px] uppercase bg-emerald-200 px-2 py-0.5 rounded font-bold">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setGatewaySettingsOpen(false)}
                className="px-5 py-2 rounded-xl bg-forest-green text-white font-montserrat font-bold text-xs uppercase"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
