"use client";

import React, { useState } from "react";
import { Send, Check, Mail } from "lucide-react";

export default function AdminCommunicationsPage() {
  const [targetAudience, setTargetAudience] = useState("All Financial Members (512)");
  const [noticeType, setNoticeType] = useState("Official Secretariat Circular");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-900 tracking-tight">
            Communications &amp; Circulars
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Article 6: Official communications issued through Secretariat channels
          </p>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          512 Recipients
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Composer (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-heading font-bold text-base text-slate-900">
            Draft Official Notice
          </h2>

          {sentSuccess ? (
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-3 text-xs">
              <div className="flex items-center gap-2 text-[#0B4A2B] font-semibold">
                <Check className="w-4 h-4" /> Notice Dispatched to {targetAudience}
              </div>
              <p className="text-slate-600">
                Official circular was recorded in the Secretariat dispatch registry and transmitted to recipient inboxes.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSentSuccess(false);
                  setSubject("");
                  setMessage("");
                }}
                className="px-3 py-1.5 rounded-md bg-[#0B4A2B] text-white font-semibold hover:bg-[#08331F]"
              >
                Draft New Circular
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Notice Type</label>
                  <select
                    value={noticeType}
                    onChange={(e) => setNoticeType(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B] bg-white"
                  >
                    <option value="Official Secretariat Circular">Official Secretariat Circular</option>
                    <option value="Annual General Meeting (AGM) Summons">AGM Summons (Article 6 &amp; 12)</option>
                    <option value="National Executive Council (NEC) Notice">NEC Meeting Notice (Quarterly)</option>
                    <option value="Technical Council Communique">Technical Council Communique</option>
                    <option value="Annual Dues Renewal Notice">Annual Dues Renewal Notice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Target Audience</label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B] bg-white"
                  >
                    <option value="All Financial Members (512)">All Financial Members (512)</option>
                    <option value="Fellows & Full Members Only (Voting Eligible)">Fellows &amp; Full Members Only (Voting Eligible)</option>
                    <option value="State Chapter Executives (SEC)">State Chapter Executives (SEC)</option>
                    <option value="National Executive Council (NEC)">National Executive Council (NEC)</option>
                    <option value="Overdue Dues Notice (28 Members)">Overdue Members (28)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Subject Header</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Notice of 2026 Annual General Meeting & Statutory Agenda"
                  className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Circular Content</label>
                <textarea
                  rows={8}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter the official resolution, agenda, or administrative instructions..."
                  className="w-full p-3 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" /> Dispatch Notice
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Historical Circular Log (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="font-heading font-bold text-base text-slate-900 pb-2 border-b border-slate-200">
            Dispatch Registry
          </h2>

          <div className="space-y-3 text-xs">
            {[
              {
                title: "Call for Nominations: Fellowship Committee 2026",
                audience: "Fellows & Full Members",
                date: "Nov 02, 2026",
                ref: "CESSPA/SEC/2026/089",
              },
              {
                title: "Q3 State Chapter Remittance Notification (25% Share)",
                audience: "State Chapter Executives",
                date: "Oct 15, 2026",
                ref: "CESSPA/FIN/2026/044",
              },
              {
                title: "Adoption of Reviewed National By-Laws",
                audience: "All Financial Members",
                date: "Sep 28, 2026",
                ref: "CESSPA/GOV/2026/012",
              },
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-white border border-slate-200 rounded-md space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-slate-900">{item.title}</span>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">{item.date}</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Target: {item.audience} • Ref: {item.ref}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}