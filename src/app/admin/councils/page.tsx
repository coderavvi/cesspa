"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_COUNCILS } from "@/lib/data/mockData";
import { NationalCouncil } from "@/lib/types";

export default function AdminCouncilsPage() {
  const [councils, setCouncils] = useState<NationalCouncil[]>(MOCK_COUNCILS);
  const [selectedCouncil, setSelectedCouncil] = useState<NationalCouncil | null>(councils[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-900 tracking-tight">
            National Technical Councils
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Article 9 &amp; Table 2 of the CESSPA By-Laws
          </p>
        </div>

        <div className="text-xs text-slate-500">
          7 Statutory Councils
        </div>
      </div>

      {/* Main Workspace (Asymmetric Split: List on Left, Detail Pane on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Councils List (7 cols) */}
        <div className="lg:col-span-7 divide-y divide-slate-200 border-y border-slate-200">
          {councils.map((c) => {
            const isSelected = selectedCouncil?.id === c.id;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedCouncil(c)}
                className={`py-4 px-2 cursor-pointer transition-colors ${
                  isSelected ? "bg-slate-100/70" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#0B4A2B]">
                        0{c.sn}.
                      </span>
                      <h3 className="font-heading font-semibold text-sm text-slate-900">
                        {c.name}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600">
                      {c.chairTitle} • {c.chairName}
                    </p>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 shrink-0">
                    {c.activeMatters} active
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Council Inspector / Functions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {selectedCouncil ? (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Council Details
                </span>
                <h2 className="font-heading font-bold text-lg text-slate-900">
                  {selectedCouncil.name}
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Chaired by {selectedCouncil.chairTitle}
                </p>
                <div className="text-xs font-semibold text-[#0B4A2B] mt-0.5">
                  Lead: {selectedCouncil.chairName}
                </div>
              </div>

              <div className="h-px bg-slate-200" />

              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Mandatory Statutory Functions (Table 2)
                </span>
                <ul className="space-y-2 text-xs text-slate-700">
                  {selectedCouncil.functions.map((fn, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono text-[11px] text-[#0B4A2B] shrink-0 mt-0.5">•</span>
                      <span>{fn}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-px bg-slate-200" />

              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Council Matters
                </span>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-white border border-slate-200 rounded-md space-y-1">
                    <div className="flex justify-between font-medium text-slate-900">
                      <span>Standards Harmonization Docket 2026-1</span>
                      <span className="text-[10px] text-slate-500">In Review</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Reviewing convergence between World Bank ESF and NESREA industrial guidelines.
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-slate-200 rounded-md space-y-1">
                    <div className="flex justify-between font-medium text-slate-900">
                      <span>Curriculum Validation Round</span>
                      <span className="text-[10px] text-slate-500">Scheduled</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      NUC and SPESSE Centers of Excellence syllabus review for Track B &amp; C modules.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400">Select a council to inspect its mandate.</div>
          )}
        </div>
      </div>
    </div>
  );
}