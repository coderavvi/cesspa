"use client";

import React, { useState } from "react";
import { MOCK_CHAPTERS } from "@/lib/data/mockData";
import { Chapter } from "@/lib/types";

export default function AdminChaptersPage() {
  const [chapters, setChapters] = useState<Chapter[]>(MOCK_CHAPTERS);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(chapters[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-900 tracking-tight">
            Chapters &amp; Geopolitical Zones
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Articles 6 &amp; 12 • 6 Geopolitical Zones • 37 State Chapters (SEC)
          </p>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          37 State Chapters
        </div>
      </div>

      {/* Main Workspace (Asymmetric Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Chapters Table (7 cols) */}
        <div className="lg:col-span-7 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-medium">
                <th className="py-2.5 px-3">Zone / Chapter</th>
                <th className="py-2.5 px-3">Coordinator</th>
                <th className="py-2.5 px-3">States Covered</th>
                <th className="py-2.5 px-3">Members</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {chapters.map((ch) => {
                const isSelected = selectedChapter?.id === ch.id;
                return (
                  <tr
                    key={ch.id}
                    onClick={() => setSelectedChapter(ch)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? "bg-slate-100/70" : "hover:bg-slate-50/70"
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{ch.name}</div>
                      <div className="font-mono text-[11px] text-[#0B4A2B]">{ch.zone}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-slate-900 font-medium">{ch.coordinator}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[140px]">{ch.coordinatorEmail}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 text-[11px] max-w-[150px]">
                      {ch.statesCovered.slice(0, 3).join(", ")}
                      {ch.statesCovered.length > 3 && ` +${ch.statesCovered.length - 3}`}
                    </td>
                    <td className="py-3 px-3 font-mono font-medium text-slate-900">
                      {ch.memberCount}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        {ch.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right Column: Selected Chapter Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {selectedChapter ? (
            <div className="space-y-6">
              <div className="pb-3 border-b border-slate-200">
                <span className="font-mono text-xs text-[#0B4A2B] font-bold block mb-1">
                  {selectedChapter.zone}
                </span>
                <h2 className="font-heading font-bold text-lg text-slate-900">
                  {selectedChapter.name}
                </h2>
                <div className="text-xs text-slate-500 mt-1">
                  {selectedChapter.memberCount} financial members enrolled
                </div>
              </div>

              {/* Coordinator & Contact */}
              <div className="space-y-2 text-xs divide-y divide-slate-100 text-slate-700">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Zonal Coordinator:</span>
                  <span className="font-semibold text-slate-900">{selectedChapter.coordinator}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-mono text-slate-900">{selectedChapter.coordinatorEmail}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Phone:</span>
                  <span>{selectedChapter.coordinatorPhone}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Meeting Schedule:</span>
                  <span>{selectedChapter.meetingSchedule}</span>
                </div>
              </div>

              <div className="h-px bg-slate-200" />

              {/* States Covered */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Jurisdiction (State Chapters)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedChapter.statesCovered.map((st) => (
                    <span
                      key={st}
                      className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              <div className="h-px bg-slate-200" />

              {/* Statutory Meeting & Quorum (Article 12) */}
              <div className="space-y-2 text-xs text-slate-600">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Constitutional Governance
                </span>
                <div className="p-3 bg-white border border-slate-200 rounded-md space-y-1">
                  <div className="font-medium text-slate-900">
                    SEC Meetings: Monthly
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Quorum: One-half of voting members plus one (Article 12).
                  </div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-md space-y-1">
                  <div className="font-medium text-slate-900">
                    25% Dues Remittance Share
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Calculated per capita on verified paid membership.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400">Select a chapter from the list.</div>
          )}
        </div>
      </div>
    </div>
  );
}