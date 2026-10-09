"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, X, ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";

const GALLERY_PHOTOS = [
  {
    id: 1,
    title: "Inaugural Technical Working Committee (TWC) Inception Session",
    location: "Transcorp Hilton, Abuja",
    date: "October 2025",
    image: "/images/brand/why-cesspa.jpg",
    caption: "Stakeholder conveners across all 6 geopolitical zones establishing the CESSPA charter.",
  },
  {
    id: 2,
    title: "ESIA Pillar 01 Masterclass: Risk Screening in Infrastructure",
    location: "Victoria Island, Lagos",
    date: "January 2026",
    image: "/images/brand/pillar-01-risk.jpg",
    caption: "Practitioners analyzing high-resolution predictive baseline models for road corridors.",
  },
  {
    id: 3,
    title: "Social Safeguards Field Workshop: Community Consultation Protocols",
    location: "Enugu Chapter Hub",
    date: "March 2026",
    image: "/images/brand/pillar-02-social.jpg",
    caption: "Engaging rural farmers and community leaders in livelihood restoration planning.",
  },
  {
    id: 4,
    title: "Continuous M&E Symposium: Lifecycle Digital Audit Logs",
    location: "Kano Chapter Hub",
    date: "May 2026",
    image: "/images/brand/pillar-03-monitoring.jpg",
    caption: "Demonstration of calibrated remote telemetry for water and air quality audits.",
  },
  {
    id: 5,
    title: "Host Community Peace & Dignity Dialogue",
    location: "Port Harcourt Hub",
    date: "July 2026",
    image: "/images/brand/peace-foundation.jpg",
    caption: "Panel discussion on institutionalizing Grievance Redress Mechanisms (GRMs).",
  },
  {
    id: 6,
    title: "CESSPA National Council Inauguration & Seal Unveiling",
    location: "International Conference Centre, Abuja",
    date: "September 2026",
    image: "/images/brand/esia-guide-cover.jpg",
    caption: "Official presentation of the Certified Practitioner Seal to inducted Fellows.",
  },
];

export default function EventPhotosPage() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="ARCHIVE" lightMode={true}>
            MEDIA & FIELD ENGAGEMENT
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            Event Photo Gallery
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Visual highlights from CESSPA national summits, geopolitical chapter forums, and safeguards training masterclasses.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        {/* Sub-nav tabs */}
        <div className="mb-10 border-b border-brand-border flex items-center gap-6 text-xs font-montserrat font-bold uppercase tracking-wider">
          <Link href="/events" className="text-ink-muted hover:text-forest-green pb-3">
            Event Calendar
          </Link>
          <Link href="/events/photos" className="text-forest-green border-b-2 border-heritage-gold pb-3">
            Event Photos
          </Link>
          <Link href="/events/presentations" className="text-ink-muted hover:text-forest-green pb-3">
            Public Presentations
          </Link>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_PHOTOS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(index)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-brand-border shadow-sm card-hover flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 w-full bg-forest-green/10 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-forest-green/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-forest-green flex items-center justify-center shadow-lg">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-ink-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-forest-green" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-forest-green" />
                    {item.location}
                  </span>
                </div>
                <h3 className="font-montserrat font-bold text-sm text-ink-dark group-hover:text-forest-green transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-ink-body line-clamp-2">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Lightbox Modal */}
      {activePhoto !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-green/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-brand-border">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-forest-green/80 text-white hover:bg-forest-green transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-16/10 w-full bg-black">
              <Image
                src={GALLERY_PHOTOS[activePhoto].image}
                alt={GALLERY_PHOTOS[activePhoto].title}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6 bg-white space-y-2">
              <span className="text-[10px] font-montserrat font-bold text-heritage-gold uppercase tracking-widest block">
                {GALLERY_PHOTOS[activePhoto].location} • {GALLERY_PHOTOS[activePhoto].date}
              </span>
              <h3 className="font-montserrat font-extrabold text-xl text-ink-dark">
                {GALLERY_PHOTOS[activePhoto].title}
              </h3>
              <p className="text-xs sm:text-sm text-ink-body">
                {GALLERY_PHOTOS[activePhoto].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
