"use client";

import React, { useState } from "react";
import { Edit3, X, Check } from "lucide-react";
import { MOCK_TIERS } from "@/lib/data/mockData";
import { MembershipTier } from "@/lib/types";
import { formatNaira } from "@/lib/utils";

export default function AdminTiersPage() {
  const [tiers, setTiers] = useState<MembershipTier[]>(MOCK_TIERS);
  const [editingTier, setEditingTier] = useState<MembershipTier | null>(null);

  const handleSaveTier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTier) return;
    setTiers((prev) =>
      prev.map((t) => (t.id === editingTier.id ? editingTier : t))
    );
    setEditingTier(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-900 tracking-tight">
            Fee Schedule (Table 3)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Article 11 • Reviewable by National Executive Council once every two years
          </p>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          7 Constitutional Grades
        </div>
      </div>

      {/* Table 3 Schedule */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-medium">
              <th className="py-2.5 px-3">Grade</th>
              <th className="py-2.5 px-3">Designation</th>
              <th className="py-2.5 px-3">Registration Fee (₦)</th>
              <th className="py-2.5 px-3">Annual Dues (₦)</th>
              <th className="py-2.5 px-3">Voting Rights (Article 4)</th>
              <th className="py-2.5 px-3">Admission Route (Table 1)</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {tiers.map((tier) => (
              <tr key={tier.id} className="hover:bg-slate-50/70">
                <td className="py-3 px-3">
                  <span className="font-semibold text-slate-900">{tier.name}</span>
                  {tier.isPopular && (
                    <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded-md bg-slate-100 text-[#0B4A2B] font-semibold">
                      Standard
                    </span>
                  )}
                </td>
                <td className="py-3 px-3 font-mono font-medium text-[#0B4A2B]">
                  {tier.designation}
                </td>
                <td className="py-3 px-3 font-mono font-semibold text-slate-900">
                  {tier.registrationFee === 0 ? "Exempt" : formatNaira(tier.registrationFee)}
                </td>
                <td className="py-3 px-3 font-mono font-semibold text-slate-900">
                  {tier.annualDues === 0
                    ? tier.code === "life"
                      ? "N/A"
                      : "Exempt"
                    : `${formatNaira(tier.annualDues)}/yr`}
                </td>
                <td className="py-3 px-3 text-slate-600 max-w-[220px]">
                  {tier.votingRights.includes("Full")
                    ? "Full Elective (National & State)"
                    : tier.votingRights.includes("State")
                    ? "State Level Only"
                    : "Advisory / Observer"}
                </td>
                <td className="py-3 px-3 text-slate-500 max-w-[200px]">
                  {tier.typicalRoute}
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => setEditingTier(tier)}
                    className="px-2 py-1 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-medium transition-colors"
                  >
                    Configure
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Statutory Rules Note */}
      <div className="pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
        <div>
          <div className="font-heading font-semibold text-slate-900 mb-1">
            Article 11 Allocation Formula
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500">
            75% of dues are retained by the National Body, while 25% are remitted to State Chapters according to per capita membership strength.
          </p>
        </div>

        <div>
          <div className="font-heading font-semibold text-slate-900 mb-1">
            Hardship Waiver Clause
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500">
            The National Executive Council may grant a full or partial waiver of dues to a member facing demonstrable hardship for up to one year at a time.
          </p>
        </div>

        <div>
          <div className="font-heading font-semibold text-slate-900 mb-1">
            International Diaspora Tier
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500">
            Members resident and practicing outside Nigeria pay prescribed dues in USD at an annual rate fixed by the National Executive Council.
          </p>
        </div>
      </div>

      {/* Edit Tier Modal */}
      {editingTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="max-w-md w-full bg-white rounded-lg p-6 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="font-mono text-xs text-[#0B4A2B] font-bold">
                  {editingTier.designation}
                </span>
                <h3 className="font-heading font-bold text-base text-slate-900">
                  {editingTier.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingTier(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTier} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Registration Fee (₦)</label>
                <input
                  type="number"
                  value={editingTier.registrationFee}
                  onChange={(e) =>
                    setEditingTier({
                      ...editingTier,
                      registrationFee: Number(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Annual Dues (₦)</label>
                <input
                  type="number"
                  value={editingTier.annualDues}
                  onChange={(e) =>
                    setEditingTier({
                      ...editingTier,
                      annualDues: Number(e.target.value) || 0,
                      annualFee: Number(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingTier.tagline}
                  onChange={(e) =>
                    setEditingTier({ ...editingTier, tagline: e.target.value })
                  }
                  className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTier(null)}
                  className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-[#0B4A2B] text-white text-xs font-semibold hover:bg-[#08331F]"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}