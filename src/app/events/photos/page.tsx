"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, X, ChevronLeft, ChevronRight, Calendar, MapPin, Building2 } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";

const GALLERY_PHOTOS = [
  {
    id: 1,
    title: "Courtesy Visit to RAAMP National Coordinators",
    location: "NAIC Building, Abuja",
    date: "November 2026",
    image: "/images/visits/visit-raamp.jpg",
    caption: "CESSPA courtesy visit the Rural Access and Agricultural Marketing Project (RAAMP) National COORDINATORS at the NAIC building Abuja.",
    category: "Institutional Engagement",
  },
  {
    id: 2,
    title: "Follow-up Visit to Nigerian Social Standard Practice Certificate Program",
    location: "Federal Ministry of Women Affairs, Abuja",
    date: "November 2026",
    image: "/images/visits/visit-nsspcp-fmwa.jpg",
    caption: "CESSPA follow-up courtesy visit to the Nigerian Social Standard Practice Certificate program, Federal Ministry of Women Affairs Abuja.",
    category: "Ministry Collaboration",
  },
  {
    id: 3,
    title: "Courtesy Visit to SPESSE Center Leader ATBU",
    location: "ATBU Bauchi",
    date: "November 2026",
    image: "/images/visits/visit-spesse-atbu.jpg",
    caption: "CESSPA courtesy visit to the SPESSE Center leader ATBU Bauchi.",
    category: "Academic Partnership",
  },
  {
    id: 4,
    title: "Courtesy Visit to National Agency for the Great Green Wall (NAGGW)",
    location: "NAGGW Headquarters, Abuja",
    date: "November 2026",
    image: "/images/visits/visit-naggw.jpg",
    caption: "CESSPA courtesy visit to the National Agency for the Great Green Wall (NAGGW), Abuja.",
    category: "Environmental Safeguards",
  },
  {
    id: 5,
    title: "Courtesy Visit to NESREA Headquarters",
    location: "NESREA Headquarters, Abuja",
    date: "November 2026",
    image: "/images/visits/visit-nesrea.jpg",
    caption: "CESSPA courtesy visit to National Environmental Standards and Regulations Enforcement Agency (NESREA) Headquarters Abuja.",
    category: "Regulatory Alignment",
  },
  {
    id: 6,
    title: "Courtesy Visit to Director Environmental Sustainability, TCN",
    location: "Transmission Company of Nigeria (TCN) Head Office, Abuja",
    date: "November 2026",
    image: "/images/visits/visit-tcn.jpg",
    caption: "CESSPA courtesy visit to the Director Environmental Sustainability, Transmission Company of Nigeria, Head office Abuja.",
    category: "Infrastructure Safeguards",
  },
  {
    id: 7,
    title: "Courtesy Visit to Director Environmental Assessment, FMEnv",
    location: "Federal Ministry of Environment, Abuja",
    date: "November 2026",
    image: "/images/visits/visit-fmenv-ea.jpg",
    caption: "CESSPA courtesy visit to the Director Environmental Assessment, Federal Ministry of Environment Abuja.",
    category: "Regulatory Alignment",
  },
  {
    id: 8,
    title: "Courtesy Visit to Director Desertification, Land Degradation & Drought Management",
    location: "Federal Ministry of Environment, Abuja",
    date: "November 2026",
    image: "/images/visits/visit-fmenv-desertification.jpg",
    caption: "CESSPA courtesy visit to the Director Desertification, Land Degradation and Drought Management, Federal Ministry of Environment Abuja.",
    category: "Ecological Restoration",
  },
  {
    id: 9,
    title: "Follow-up Visit to NESCP, Federal Ministry of Environment",
    location: "Federal Ministry of Environment, Abuja",
    date: "November 2026",
    image: "/images/visits/visit-nescp-fmenv.jpg",
    caption: "CESSPA follow-up courtesy visit to the National Environmental Standard Certification Program, Federal Ministry of Environment Abuja.",
    category: "Certification Alignment",
  },
];

export default function EventPhotosPage() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="ARCHIVE" lightMode={true}>
            FIELD ENGAGEMENTS &amp; COURTESY VISITS
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            Event &amp; Stakeholder Photos
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Visual documentation of CESSPA official courtesy visits, stakeholder engagements, and regulatory dialogues across Federal Ministries, agencies, and SPESSE Centers of Excellence.
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
            Event Photos &amp; Courtesy Visits
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
                <div className="absolute top-3 left-3 bg-forest-green/90 text-white font-montserrat font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                  {item.category}
                </div>
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
                <p className="text-xs text-ink-body line-clamp-3 leading-relaxed">{item.caption}</p>
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
              aria-label="Close"
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
              <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
                {GALLERY_PHOTOS[activePhoto].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
