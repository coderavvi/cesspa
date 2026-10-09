"use client";

import React, { useState } from "react";
import { Layers, Edit3, Plus, CheckCircle2, X } from "lucide-react";
import { MOCK_TIERS } from "@/lib/data/mockData";
import { MembershipTier } from "@/lib/types";
import { formatNaira } from "@/lib/utils";

export default function AdminTiersPage() {
  const [tiers, setTiers] = useState<MembershipTier[]>(MOCK_TIERS);
  const [editingTier, setEditingTier] = useState<MembershipTier | null>(null);

  const handleSaveTier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTier) return;
    setTiers((prev) => prev.map((t) => (t.id === editingTier.id ? editingTier : t)));
    setEditingTier(null);
    alert(`Tier ${editingTier.name} updated successfully.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-wider block">
            STRUCTURE & SUBSCRIPTION
          </span>
          <h1 className="font-montserrat font-extrabold text-2xl text-slate-900 uppercase mt-0.5">
            Membership Tiers & Tariffs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Configure annual dues, eligibility prerequisites, and benefits packages across all five tiers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className="rounded-3xl p-6 bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-forest-green font-bold uppercase">
                  {tier.code}
                </span>
                {tier.isPopular && (
                  <span className="bg-heritage-gold/20 text-heritage-gold font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                    BENCHMARK
                  </span>
                )}
              </div>

              <h3 className="font-montserrat font-extrabold text-xl text-slate-900">
                {tier.name}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">{tier.tagline}</p>

              <div className="pt-2 border-t border-slate-100 flex items-baseline gap-1">
                <span className="font-montserrat font-extrabold text-2xl text-forest-green">
                  {formatNaira(tier.annualFee, false)}
                </span>
                <span className="text-xs text-slate-400">/{tier.period}</span>
              </div>

              <div className="space-y-1.5 pt-2 text-xs text-slate-600">
                <span className="font-montserrat font-bold text-[10px] text-slate-400 uppercase block">
                  Core Benefits ({tier.benefits.length}):
                </span>
                {tier.benefits.slice(0, 3).map((b, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-leaf-green shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingTier(tier)}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-forest-green text-slate-700 hover:text-forest-green font-montserrat font-bold text-xs uppercase transition-colors flex items-center justify-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Tier & Fees
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Tier Modal */}
      {editingTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <h3 className="font-montserrat font-extrabold text-xl text-slate-900 uppercase">
                Edit {editingTier.name}
              </h3>
              <button
                onClick={() => setEditingTier(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTier} className="space-y-3 text-xs">
              <div>
                <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                  Tier Display Name
                </label>
                <input
                  type="text"
                  value={editingTier.name}
                  onChange={(e) => setEditingTier({ ...editingTier, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>

              <div>
                <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                  Annual Dues Fee (₦)
                </label>
                <input
                  type="number"
                  value={editingTier.annualFee}
                  onChange={(e) => setEditingTier({ ...editingTier, annualFee: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                  Tagline / Description
                </label>
                <textarea
                  rows={2}
                  value={editingTier.tagline}
                  onChange={(e) => setEditingTier({ ...editingTier, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTier(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest-green text-white font-montserrat font-bold uppercase hover:bg-deep-emerald"
                >
                  Save Tier Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
