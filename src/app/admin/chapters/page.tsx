"use client";

import React, { useState } from "react";
import { MapPin, Users, Edit3, Mail, Phone, Calendar, Plus, X } from "lucide-react";
import { MOCK_CHAPTERS } from "@/lib/data/mockData";
import { Chapter } from "@/lib/types";

export default function AdminChaptersPage() {
  const [chapters, setChapters] = useState<Chapter[]>(MOCK_CHAPTERS);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChapter) return;
    setChapters((prev) => prev.map((c) => (c.id === editingChapter.id ? editingChapter : c)));
    setEditingChapter(null);
    alert(`Chapter "${editingChapter.name}" details updated.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-wider block">
            TERRITORIAL COVERAGE
          </span>
          <h1 className="font-montserrat font-extrabold text-2xl text-slate-900 uppercase mt-0.5">
            Geopolitical Chapters
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Secretariat oversight for the six regional chapters and their state working committees.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map((ch) => (
          <div
            key={ch.id}
            className="rounded-3xl p-6 bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-montserrat font-bold text-xs text-forest-green bg-emerald-50 px-2.5 py-0.5 rounded uppercase">
                  {ch.zone}
                </span>
                <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                  {ch.status}
                </span>
              </div>

              <h3 className="font-montserrat font-extrabold text-lg text-slate-900">
                {ch.name}
              </h3>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Coordinator:</span>
                  <strong className="text-slate-900">{ch.coordinator}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Assembly:</span>
                  <span>{ch.meetingSchedule}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Email:</span>
                  <span className="font-mono">{ch.coordinatorEmail}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500 font-medium">Covered States:</span>
                <span className="font-semibold text-slate-900">{ch.statesCovered.length} States</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {ch.statesCovered.map((st) => (
                  <span
                    key={st}
                    className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600"
                  >
                    {st}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-montserrat font-extrabold text-forest-green">
                {ch.memberCount} Members
              </span>
              <button
                type="button"
                onClick={() => setEditingChapter(ch)}
                className="text-xs font-montserrat font-bold text-slate-700 hover:text-forest-green flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Chapter
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Chapter Modal */}
      {editingChapter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <h3 className="font-montserrat font-extrabold text-xl text-slate-900 uppercase">
                Edit {editingChapter.name}
              </h3>
              <button
                onClick={() => setEditingChapter(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                  Zonal Coordinator Name
                </label>
                <input
                  type="text"
                  value={editingChapter.coordinator}
                  onChange={(e) => setEditingChapter({ ...editingChapter, coordinator: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>

              <div>
                <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                  Coordinator Official Email
                </label>
                <input
                  type="email"
                  value={editingChapter.coordinatorEmail}
                  onChange={(e) => setEditingChapter({ ...editingChapter, coordinatorEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>

              <div>
                <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                  Assembly Meeting Schedule
                </label>
                <input
                  type="text"
                  value={editingChapter.meetingSchedule}
                  onChange={(e) => setEditingChapter({ ...editingChapter, meetingSchedule: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingChapter(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest-green text-white font-montserrat font-bold uppercase hover:bg-deep-emerald"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
