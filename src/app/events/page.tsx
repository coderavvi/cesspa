"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Filter,
  Search,
  Award,
  Video,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { MOCK_EVENTS } from "@/lib/data/mockData";
import { formatDate, formatNaira } from "@/lib/utils";

const CATEGORIES = ["All", "Conference", "Webinar", "Workshop", "Chapter Event"];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = MOCK_EVENTS.filter((e) => {
    const matchesCat = selectedCategory === "All" || e.category === selectedCategory;
    const matchesQuery =
      !searchQuery ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="PROGRAMS & CPD" lightMode={true}>
            CONTINUOUS PROFESSIONAL DEVELOPMENT
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            CESSPA Events & Conferences
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Participate in high-impact national conferences, technical ESIA masterclasses, and virtual webinars.
            Accumulate verifiable CPD points required for annual certification renewal.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        {/* Sub-navigation Tabs matching sitemap */}
        <div className="mb-8 border-b border-brand-border flex items-center gap-6 text-xs font-montserrat font-bold uppercase tracking-wider">
          <Link href="/events" className="text-forest-green border-b-2 border-heritage-gold pb-3">
            Event Calendar
          </Link>
          <Link href="/events/photos" className="text-ink-muted hover:text-forest-green pb-3">
            Event Photos
          </Link>
          <Link href="/events/presentations" className="text-ink-muted hover:text-forest-green pb-3">
            Public Presentations
          </Link>
        </div>

        {/* Filters and Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl font-montserrat font-bold text-xs uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-forest-green text-white shadow-md ring-2 ring-heritage-gold"
                    : "bg-white text-ink-body border border-brand-border hover:border-forest-green"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic or location..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-forest-green bg-white"
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-3xl p-6 sm:p-8 bg-white border border-brand-border shadow-sm card-hover flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-montserrat font-bold text-leaf-green bg-sage-mist px-3 py-1 rounded-full uppercase">
                    {event.category}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-forest-green bg-forest-green/10 px-2.5 py-1 rounded-md">
                    <Award className="w-3.5 h-3.5 text-heritage-gold" />
                    {event.cpdPoints} CPD Points
                  </span>
                </div>

                <h3 className="font-montserrat font-extrabold text-xl text-ink-dark leading-snug">
                  {event.title}
                </h3>

                <p className="text-xs sm:text-sm text-ink-body leading-relaxed line-clamp-3">
                  {event.description}
                </p>

                <div className="space-y-2 pt-2 text-xs text-ink-muted border-t border-brand-border/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-forest-green shrink-0" />
                    <span>{formatDate(event.date)} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-forest-green shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-border/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-ink-muted uppercase block">Registration:</span>
                  <span className="font-montserrat font-extrabold text-forest-green text-base">
                    {event.fee === 0 ? "Complimentary" : formatNaira(event.fee)}
                  </span>
                </div>

                <Link
                  href={`/events/${event.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5"
                >
                  View Agenda & Register <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
