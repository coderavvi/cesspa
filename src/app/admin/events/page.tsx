"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, Plus, Users, MapPin, Award, Edit3, X, CheckCircle2 } from "lucide-react";
import { MOCK_EVENTS } from "@/lib/data/mockData";
import { EventItem } from "@/lib/types";
import { formatDate, formatNaira } from "@/lib/utils";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(MOCK_EVENTS);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "Webinar" as EventItem["category"],
    date: "2026-12-10",
    time: "10:00 AM - 01:00 PM WAT",
    location: "Virtual (Zoom)",
    fee: 0,
    cpdPoints: 4,
    description: "",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const created: EventItem = {
      id: `evt-${Date.now()}`,
      slug: newEvent.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: newEvent.title,
      category: newEvent.category,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      isVirtual: newEvent.location.includes("Virtual") || newEvent.location.includes("Zoom"),
      fee: Number(newEvent.fee),
      cpdPoints: Number(newEvent.cpdPoints),
      description: newEvent.description || "CESSPA Continuing Professional Development event.",
      capacity: 250,
      registeredCount: 0,
    };
    setEvents([created, ...events]);
    setCreateModalOpen(false);
    alert(`Event "${created.title}" successfully added to the national calendar.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-wider block">
            CPD PROGRAMMING
          </span>
          <h1 className="font-montserrat font-extrabold text-2xl text-slate-900 uppercase mt-0.5">
            Events & Masterclasses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Publish national summits, geopolitical chapter forums, and accredited webinars.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" /> Schedule Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="rounded-3xl p-6 bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-montserrat font-bold text-forest-green bg-emerald-50 px-2.5 py-0.5 rounded uppercase">
                  {evt.category}
                </span>
                <span className="flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                  <Award className="w-3.5 h-3.5" /> {evt.cpdPoints} CPD Points
                </span>
              </div>

              <h3 className="font-montserrat font-extrabold text-lg text-slate-900 leading-snug">
                {evt.title}
              </h3>

              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-forest-green" />
                  <span>{formatDate(evt.date)} • {evt.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-forest-green" />
                  <span>{evt.location}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Delegates:</span>
                  <span className="font-semibold text-slate-900">
                    {evt.registeredCount || 0} / {evt.capacity || 500} Confirmed
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Standard Fee:</span>
                  <span className="font-montserrat font-bold text-forest-green">
                    {evt.fee === 0 ? "Free" : formatNaira(evt.fee)}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link
                href={`/events/${evt.slug}`}
                className="font-montserrat font-bold text-forest-green hover:underline"
              >
                View Public Page →
              </Link>
              <button
                type="button"
                onClick={() => alert(`Opening delegate roster for: ${evt.title}`)}
                className="text-slate-500 hover:text-slate-800 font-medium"
              >
                Delegate Roster
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Event Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <h3 className="font-montserrat font-extrabold text-xl text-slate-900 uppercase">
                Schedule CPD Event
              </h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g. Masterclass on ESIA Cumulative Impact Modeling"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as EventItem["category"] })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green bg-white"
                  >
                    <option value="Webinar">Webinar</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Conference">Conference</option>
                    <option value="Chapter Event">Chapter Event</option>
                  </select>
                </div>
                <div>
                  <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                    CPD Points Awarded
                  </label>
                  <input
                    type="number"
                    value={newEvent.cpdPoints}
                    onChange={(e) => setNewEvent({ ...newEvent, cpdPoints: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green"
                  />
                </div>
                <div>
                  <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                    Fee (₦ - 0 for Free)
                  </label>
                  <input
                    type="number"
                    value={newEvent.fee}
                    onChange={(e) => setNewEvent({ ...newEvent, fee: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                  Location / Venue
                </label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="e.g. Virtual (Zoom) or Lagos Continental Hotel"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest-green text-white font-montserrat font-bold uppercase hover:bg-deep-emerald"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
