"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileCheck,
  CreditCard,
  Users,
  Check,
  X,
  ExternalLink,
  Briefcase,
  ChevronRight,
  Download,
} from "lucide-react";
import { MOCK_APPLICATIONS, MOCK_PAYMENTS, MOCK_COUNCILS } from "@/lib/data/mockData";
import { formatNaira, formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [selectedTaskTab, setSelectedTaskTab] = useState<"applications" | "remittances" | "councils">("applications");

  const handleApproveApp = (id: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Approved" } : a))
    );
  };

  const handleRejectApp = (id: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Rejected" } : a))
    );
  };

  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-900 tracking-tight">
            Secretariat Administration
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            National Executive Council • Federal Republic of Nigeria
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert("Exporting official CESSPA audit ledger (CSV)...")}
            className="px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export Ledger
          </button>
          <Link
            href="/admin/members"
            className="px-3.5 py-1.5 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] text-white text-xs font-semibold transition-colors"
          >
            Manage Members
          </Link>
        </div>
      </div>

      {/* Primary Key Operational Metrics (Minimalist divider-based row) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-2">
        <div className="space-y-1">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Total Members
          </span>
          <div className="text-2xl font-heading font-bold text-slate-900">542</div>
          <div className="text-[11px] text-slate-500">
            512 financial in good standing
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Pending Applications
          </span>
          <div className="text-2xl font-heading font-bold text-slate-900">
            {applications.filter((a) => a.status !== "Approved").length}
          </div>
          <div className="text-[11px] text-slate-500">
            30-day statutory review window
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Dues Cleared (YTD)
          </span>
          <div className="text-2xl font-heading font-bold text-[#0B4A2B]">
            ₦14,250,000
          </div>
          <div className="text-[11px] text-slate-500">
            75% National: ₦10.68M • 25% State: ₦3.56M
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Technical Councils
          </span>
          <div className="text-2xl font-heading font-bold text-slate-900">7</div>
          <div className="text-[11px] text-slate-500">
            Table 2 statutory standing bodies
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-200" />

      {/* Main Administrative Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column (8 Cols): Queue & Ledger */}
        <div className="lg:col-span-8 space-y-8">
          {/* Action Queue */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => setSelectedTaskTab("applications")}
                  className={`text-xs font-semibold pb-2 border-b-2 transition-colors ${
                    selectedTaskTab === "applications"
                      ? "border-[#0B4A2B] text-[#0B4A2B]"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Candidate Dossiers ({applications.filter((a) => a.status === "Pending Review" || a.status === "Under Evaluation").length})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTaskTab("remittances")}
                  className={`text-xs font-semibold pb-2 border-b-2 transition-colors ${
                    selectedTaskTab === "remittances"
                      ? "border-[#0B4A2B] text-[#0B4A2B]"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  State Remittance Dispatches (6 Zones)
                </button>
              </div>

              <Link
                href="/admin/applications"
                className="text-xs text-[#0B4A2B] hover:underline font-medium"
              >
                View all queue →
              </Link>
            </div>

            {selectedTaskTab === "applications" && (
              <div className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">
                          {app.applicantName}
                        </span>
                        <span className="font-mono text-[11px] text-slate-500">
                          {app.applicationNumber}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded-md text-[10px] font-medium ${
                            app.status === "Approved"
                              ? "bg-slate-100 text-[#0B4A2B]"
                              : app.status === "Rejected"
                              ? "bg-rose-50 text-rose-700"
                              : "bg-amber-50 text-amber-800"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <div className="text-slate-500">
                        {app.tier} • {app.specialisation}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Submitted: {formatDate(app.submittedDate)} • {app.qualifications}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {app.status !== "Approved" && (
                        <button
                          type="button"
                          onClick={() => handleApproveApp(app.id)}
                          className="px-2.5 py-1 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] text-white text-[11px] font-medium transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      {app.status !== "Rejected" && (
                        <button
                          type="button"
                          onClick={() => handleRejectApp(app.id)}
                          className="px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-medium transition-colors"
                        >
                          Decline
                        </button>
                      )}
                      <Link
                        href={`/admin/applications`}
                        className="px-2 py-1 text-slate-500 hover:text-slate-900 text-[11px]"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedTaskTab === "remittances" && (
              <div className="divide-y divide-slate-100 text-xs">
                {[
                  { zone: "South West", states: "Lagos, Ogun, Oyo, Osun, Ondo, Ekiti", amount: 1188000, status: "Dispatched" },
                  { zone: "North Central", states: "FCT Abuja, Benue, Kogi, Kwara, Nasarawa, Niger, Plateau", amount: 852000, status: "Pending Clearing" },
                  { zone: "South South", states: "Rivers, Delta, Edo, Akwa Ibom, Bayelsa, Cross River", amount: 744000, status: "Dispatched" },
                  { zone: "North West", states: "Kano, Kaduna, Katsina, Sokoto, Kebbi, Jigawa, Zamfara", amount: 576000, status: "Scheduled" },
                ].map((item) => (
                  <div key={item.zone} className="py-3.5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">{item.zone} Zone (25% Chapter Share)</div>
                      <div className="text-slate-500 text-[11px]">{item.states}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-semibold text-slate-900">{formatNaira(item.amount)}</div>
                      <div className="text-[10px] text-slate-500">{item.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="h-px bg-slate-200" />

          {/* Recent Financial Clearing Ledger */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h2 className="font-heading font-bold text-sm text-slate-900">
                Recent Transactions (Table 3)
              </h2>
              <Link
                href="/admin/payments"
                className="text-xs text-[#0B4A2B] hover:underline font-medium"
              >
                Open Full Ledger →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-medium">
                    <th className="py-2 px-2">Reference</th>
                    <th className="py-2 px-2">Member / Payer</th>
                    <th className="py-2 px-2">Purpose</th>
                    <th className="py-2 px-2">Amount</th>
                    <th className="py-2 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {MOCK_PAYMENTS.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-2 font-mono text-[11px] text-[#0B4A2B]">
                        {tx.reference}
                      </td>
                      <td className="py-2.5 px-2 font-medium text-slate-900">
                        {tx.memberName}
                      </td>
                      <td className="py-2.5 px-2 text-slate-600">{tx.purpose}</td>
                      <td className="py-2.5 px-2 font-mono font-semibold text-slate-900">
                        {formatNaira(tx.amount)}
                      </td>
                      <td className="py-2.5 px-2">
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols): Technical Councils & Chapters */}
        <div className="lg:col-span-4 space-y-8">
          {/* Statutory National Technical Councils (Table 2) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h2 className="font-heading font-bold text-sm text-slate-900">
                National Technical Councils
              </h2>
              <Link
                href="/admin/councils"
                className="text-xs text-[#0B4A2B] hover:underline font-medium"
              >
                View all 7 →
              </Link>
            </div>

            <div className="space-y-3">
              {MOCK_COUNCILS.slice(0, 4).map((council) => (
                <div key={council.id} className="text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">
                      {council.name}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">
                      {council.activeMatters} active
                    </span>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    {council.chairTitle} • {council.chairName}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-200" />

          {/* Statutory Quorum & Meeting Schedule (Article 12) */}
          <div className="space-y-3">
            <h2 className="font-heading font-bold text-sm text-slate-900 pb-2 border-b border-slate-200">
              Statutory Meetings Schedule
            </h2>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center justify-between">
                <span>Annual General Meeting (AGM)</span>
                <span className="font-mono text-slate-500">1/3 Quorum</span>
              </div>
              <div className="flex items-center justify-between">
                <span>National Executive Council (NEC)</span>
                <span className="font-mono text-slate-500">Quarterly (1/2+1)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Zonal Coordination Meetings</span>
                <span className="font-mono text-slate-500">Every 2 Months</span>
              </div>
              <div className="flex items-center justify-between">
                <span>State Executive Council (SEC)</span>
                <span className="font-mono text-slate-500">Monthly</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-200" />

          {/* Constitutional Compliance Summary */}
          <div className="space-y-2 text-xs">
            <h2 className="font-heading font-bold text-sm text-slate-900 pb-2 border-b border-slate-200">
              Governance Registry
            </h2>
            <div className="text-slate-600 space-y-1 text-[11px]">
              <div>• Legal Framework: CAMA 2020</div>
              <div>• Data Protection: NDPA 2023 Compliant</div>
              <div>• Secretariat: FCT Abuja, Nigeria</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}