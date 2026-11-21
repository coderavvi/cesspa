"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  Plus,
  X,
  CreditCard,
  FileCheck,
  Terminal,
} from "lucide-react";
import { MOCK_PAYMENTS } from "@/lib/data/mockData";
import { PaymentTransaction } from "@/lib/types";
import { formatNaira, formatDate } from "@/lib/utils";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentTransaction[]>(MOCK_PAYMENTS);
  const [search, setSearch] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("All");
  const [recordModalOpen, setRecordModalOpen] = useState(false);

  // New Transaction State
  const [newTx, setNewTx] = useState({
    memberName: "",
    email: "",
    purpose: "Membership Dues" as PaymentTransaction["purpose"],
    amount: "10000",
    method: "Bank Transfer" as PaymentTransaction["method"],
  });

  useEffect(() => {
    // Automatically merge live verified Paystack payments into the ledger
    fetch("/api/paystack/webhook")
      .then((res) => res.json())
      .then((data) => {
        if (data.recentEvents && Array.isArray(data.recentEvents)) {
          const liveTransactions: PaymentTransaction[] = data.recentEvents
            .filter((e: any) => e.signatureValid && e.amount > 0)
            .map((e: any) => ({
              id: e.id,
              reference: e.reference,
              memberName: e.rawPayload?.data?.metadata?.customerName || e.customerEmail.split("@")[0],
              email: e.customerEmail,
              purpose: (e.rawPayload?.data?.metadata?.purpose || "Membership Dues") as PaymentTransaction["purpose"],
              amount: e.amount,
              method: `Paystack (${e.rawPayload?.data?.channel || "Online"})` as any,
              status: "Successful",
              date: e.receivedAt ? e.receivedAt.replace("T", " ").slice(0, 16) : "Recent",
            }));

          if (liveTransactions.length > 0) {
            setPayments((prev) => {
              const existingRefs = new Set(prev.map((p) => p.reference));
              const newItems = liveTransactions.filter((lt) => !existingRefs.has(lt.reference));
              return [...newItems, ...prev];
            });
          }
        }
      })
      .catch(() => {});
  }, []);

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      p.reference.toLowerCase().includes(q) ||
      p.memberName.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q);
    const matchPurpose =
      purposeFilter === "All" || p.purpose === purposeFilter;
    return matchQ && matchPurpose;
  });

  const totalCollected = payments
    .filter((p) => p.status === "Successful")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const nationalRetained = Math.round(totalCollected * 0.75);
  const stateChaptersRemittance = Math.round(totalCollected * 0.25);

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const tx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      reference: `CESSPA-REC-${Date.now().toString().slice(-6)}`,
      memberName: newTx.memberName,
      email: newTx.email,
      purpose: newTx.purpose,
      amount: Number(newTx.amount) || 0,
      method: newTx.method,
      status: "Successful",
      date: new Date().toISOString().replace("T", " ").slice(0, 16),
    };
    setPayments([tx, ...payments]);
    setRecordModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-900 tracking-tight">
            Dues &amp; Financial Administration
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Article 11 &amp; Table 3 Schedule • 75% National / 25% State Chapter Statutory Allocation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/payments/webhook-test"
            className="px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-[#0B4A2B]" /> Paystack Webhooks
          </Link>
          <button
            type="button"
            onClick={() => setRecordModalOpen(true)}
            className="px-3 py-1.5 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Record Receipt
          </button>
          <button
            type="button"
            onClick={() => alert("Exporting financial ledger (CSV)...")}
            className="px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" /> Export CSV
          </button>
        </div>
      </div>

      {/* Financial Allocation Overview (Article 11 Formula) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-2">
        <div className="space-y-1">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Total Inflow (Ledger)
          </span>
          <div className="text-2xl font-heading font-bold text-slate-900">
            {formatNaira(totalCollected)}
          </div>
          <div className="text-[11px] text-slate-500">
            Verified receipts &amp; clearing
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            75% National Secretariat Share
          </span>
          <div className="text-2xl font-heading font-bold text-[#0B4A2B]">
            {formatNaira(nationalRetained)}
          </div>
          <div className="text-[11px] text-slate-500">
            Standardization &amp; national operations
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            25% State Chapters Allocation
          </span>
          <div className="text-2xl font-heading font-bold text-slate-900">
            {formatNaira(stateChaptersRemittance)}
          </div>
          <div className="text-[11px] text-slate-500">
            Remitted per capita by membership strength
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-200" />

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reference, remitter, or email..."
            className="w-full pl-8 pr-3 py-1.5 rounded-md border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B4A2B]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 text-[11px]">Purpose:</span>
          <select
            value={purposeFilter}
            onChange={(e) => setPurposeFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0B4A2B] bg-white"
          >
            <option value="All">All Transactions</option>
            <option value="Membership Dues">Membership Dues</option>
            <option value="Registration Fee">Registration Fee</option>
            <option value="Conference Ticket">Conference Ticket</option>
            <option value="Donation">Donation</option>
          </select>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-medium">
              <th className="py-2.5 px-3">Reference</th>
              <th className="py-2.5 px-3">Remitter / Member</th>
              <th className="py-2.5 px-3">Purpose</th>
              <th className="py-2.5 px-3">Payment Channel</th>
              <th className="py-2.5 px-3">Amount</th>
              <th className="py-2.5 px-3">75% National</th>
              <th className="py-2.5 px-3">25% State</th>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filtered.map((tx) => {
              const nat = Math.round(tx.amount * 0.75);
              const st = Math.round(tx.amount * 0.25);
              return (
                <tr key={tx.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3 font-mono font-medium text-[#0B4A2B]">
                    {tx.reference}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{tx.memberName}</div>
                    <div className="text-[11px] text-slate-400">{tx.email}</div>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-800">
                    {tx.purpose}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {tx.method}
                  </td>
                  <td className="py-3 px-3 font-mono font-semibold text-slate-900">
                    {formatNaira(tx.amount)}
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                    {formatNaira(nat)}
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                    {formatNaira(st)}
                  </td>
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Record Payment Modal */}
      {recordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="max-w-md w-full bg-white rounded-lg p-6 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <h3 className="font-heading font-bold text-base text-slate-900">
                Record Financial Remittance
              </h3>
              <button
                type="button"
                onClick={() => setRecordModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Payer / Member Name</label>
                <input
                  type="text"
                  required
                  value={newTx.memberName}
                  onChange={(e) => setNewTx({ ...newTx, memberName: e.target.value })}
                  placeholder="e.g. Engr. Babatunde Adeyemi"
                  className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newTx.email}
                  onChange={(e) => setNewTx({ ...newTx, email: e.target.value })}
                  placeholder="payer@example.com"
                  className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Purpose (Table 3)</label>
                  <select
                    value={newTx.purpose}
                    onChange={(e) => setNewTx({ ...newTx, purpose: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B] bg-white"
                  >
                    <option value="Membership Dues">Annual Dues</option>
                    <option value="Registration Fee">Registration Fee</option>
                    <option value="Conference Ticket">Conference Ticket</option>
                    <option value="Donation">Grant / Donation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Channel</label>
                  <select
                    value={newTx.method}
                    onChange={(e) => setNewTx({ ...newTx, method: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B] bg-white"
                  >
                    <option value="Bank Transfer">Bank Transfer (Zenith / Central)</option>
                    <option value="Card">Paystack / Card Gateway</option>
                    <option value="USSD">USSD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Amount (₦)</label>
                <input
                  type="number"
                  required
                  value={newTx.amount}
                  onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })}
                  placeholder="e.g. 10000"
                  className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRecordModalOpen(false)}
                  className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-[#0B4A2B] text-white text-xs font-semibold hover:bg-[#08331F]"
                >
                  Confirm Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}