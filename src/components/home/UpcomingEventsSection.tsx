"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Ticket,
} from "lucide-react";
import { MOCK_EVENTS } from "@/lib/data/mockData";
import { EventItem } from "@/lib/types";
import { formatDate, formatNaira } from "@/lib/utils";

export function UpcomingEventsSection() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [sectionEnabled, setSectionEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  const loadEventsData = () => {
    try {
      if (typeof window !== "undefined") {
        const enabledSetting = localStorage.getItem("cesspa_homepage_events_enabled");
        if (enabledSetting === "false") {
          setSectionEnabled(false);
          return;
        } else {
          setSectionEnabled(true);
        }

        const stored = localStorage.getItem("cesspa_admin_events");
        if (stored) {
          const parsed: EventItem[] = JSON.parse(stored);
          const active = parsed.filter((e) => e.showOnHomepage === true);
          setEvents(active.length > 0 ? active : parsed.slice(0, 3));
          return;
        }
      }
    } catch (e) {
      // Fallback
    }

    // Default to MOCK_EVENTS where showOnHomepage is true
    const defaultActive = MOCK_EVENTS.filter((e) => e.showOnHomepage !== false);
    setEvents(defaultActive);
  };

  useEffect(() => {
    setMounted(true);
    loadEventsData();

    const handleUpdate = () => {
      loadEventsData();
    };

    window.addEventListener("cesspa_events_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("cesspa_events_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // SSR or unmounted fallback: show default active events
  const displayEvents = mounted
    ? events
    : MOCK_EVENTS.filter((e) => e.showOnHomepage !== false);

  if (mounted && (!sectionEnabled || displayEvents.length === 0)) {
    return null;
  }

  return (
    <section id="upcoming-events" className="py-20 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B4A2B] uppercase tracking-wider mb-2 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              Calendar
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
              Upcoming Events
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl">
              Conferences, workshops, and association meetings for environmental and social practitioners.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B4A2B] hover:text-slate-900 font-heading uppercase tracking-wider transition-colors shrink-0"
          >
            <span>Full Calendar ({events.length || MOCK_EVENTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 flex flex-col justify-between hover:border-[#0B4A2B] transition-colors group"
            >
              <div className="space-y-4">
                {/* Event Flyer Banner (if uploaded) */}
                {evt.bannerImage ? (
                  <div className="relative w-full h-44 rounded-md overflow-hidden border border-slate-200 bg-slate-100">
                    <img
                      src={evt.bannerImage}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ) : null}

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
                    {evt.category}
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#0B4A2B]">
                    {evt.fee === 0 ? "Free" : formatNaira(evt.fee)}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-[#0B4A2B] transition-colors line-clamp-2 leading-snug">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#0B4A2B] shrink-0" />
                    <span>{formatDate(evt.date)} • {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#0B4A2B] shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket className="w-3.5 h-3.5 text-[#0B4A2B] shrink-0" />
                    <span className="font-semibold text-slate-800">
                      {evt.fee === 0 ? "Free" : `Registration: ${formatNaira(evt.fee)}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  {evt.registeredCount ? `${evt.registeredCount} registered` : "Registration open"}
                </span>
                <Link
                  href={`/events/${evt.slug}`}
                  className="px-3 py-1.5 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] text-white text-xs font-semibold font-heading uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Register</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}