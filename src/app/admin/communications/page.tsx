"use client";

import React, { useState } from "react";
import { Mail, Send, Users, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminCommunicationsPage() {
  const [targetAudience, setTargetAudience] = useState("All Active Members (512)");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-wider block">
          BROADCAST & ADVOCACY
        </span>
        <h1 className="font-montserrat font-extrabold text-2xl text-slate-900 uppercase mt-0.5">
          Communications & Newsletter Composer
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Dispatch official bulletins, regulatory alerts, and AGM communiques across membership segments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-montserrat font-extrabold text-lg text-slate-900 uppercase">
            Compose Broadcast Communique
          </h3>

          {sentSuccess ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-leaf-green mx-auto" />
              <h4 className="font-montserrat font-bold text-lg text-forest-green">
                Broadcast Dispatched Successfully
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Communique delivered to {targetAudience}. Delivery telemetry has been archived in the council log.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSentSuccess(false);
                  setSubject("");
                  setMessage("");
                }}
                className="px-5 py-2 rounded-xl bg-forest-green text-white font-montserrat font-bold text-xs uppercase"
              >
                Compose Another Broadcast
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4 text-xs">
              <div>
                <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                  Target Recipient Segment *
                </label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green bg-white"
                >
                  <option value="All Active Members (512)">All Active Members (512)</option>
                  <option value="Certified Professionals Only (260)">Certified Professionals Only (260)</option>
                  <option value="Fellows (FCESSPA) (49)">Fellows of the Association (49)</option>
                  <option value="Overdue Dues Practitioners (28)">Overdue Dues Notice Segment (28)</option>
                  <option value="National Executives & Trustees (12)">Executive Council & Trustees (12)</option>
                  <option value="South West Chapter (198)">South West Regional Chapter (198)</option>
                  <option value="North Central Chapter (142)">North Central Regional Chapter (142)</option>
                </select>
              </div>

              <div>
                <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                  Subject Line *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. [CESSPA ADVISORY] Regulatory Update: 2026 ESIA Scoping Protocols"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green text-xs"
                />
              </div>

              <div>
                <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                  Communique Body (Rich Text) *
                </label>
                <textarea
                  rows={8}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter the official communique content..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green text-xs font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4 text-heritage-gold" /> Dispatch Broadcast to {targetAudience}
              </button>
            </form>
          )}
        </div>

        {/* Previous Broadcasts Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h4 className="font-montserrat font-extrabold text-sm text-slate-900 uppercase">
              Recent Sent Broadcasts
            </h4>
            <div className="space-y-3 text-xs">
              {[
                { title: "2026 Annual Dues Notice & Portal Launch", date: "Sep 28", sent: "542 delivered" },
                { title: "Invitation: National Conference & AGM Abuja", date: "Sep 15", sent: "512 delivered" },
                { title: "Technical Working Committee Inception Communique", date: "Aug 20", sent: "480 delivered" },
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl space-y-1 border border-slate-100">
                  <strong className="text-slate-900 block">{item.title}</strong>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>{item.date}</span>
                    <span className="text-forest-green font-medium">{item.sent}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
