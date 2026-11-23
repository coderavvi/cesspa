"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Calendar,
  MapPin,
  ArrowRight,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  PastEventPhoto,
  getStoredPastEventPhotos,
  getHomepagePastEventsEnabled,
  PAST_EVENTS_UPDATED_EVENT,
  INITIAL_PAST_EVENT_PHOTOS,
} from "@/lib/data/pastEventsGallery";

export function PastEventsGallerySection() {
  const [photos, setPhotos] = useState<PastEventPhoto[]>(INITIAL_PAST_EVENT_PHOTOS);
  const [sectionEnabled, setSectionEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const loadData = () => {
    setPhotos(getStoredPastEventPhotos());
    setSectionEnabled(getHomepagePastEventsEnabled());
  };

  useEffect(() => {
    setMounted(true);
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener(PAST_EVENTS_UPDATED_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(PAST_EVENTS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activePhotoIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePhotoIndex(null);
      } else if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex]);

  // Filter only active homepage photos
  const homepagePhotos = useMemo(() => {
    return photos.filter((p) => p.showOnHomepage !== false);
  }, [photos]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add("All");
    homepagePhotos.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [homepagePhotos]);

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === "All") return homepagePhotos;
    return homepagePhotos.filter((p) => p.category === selectedCategory);
  }, [homepagePhotos, selectedCategory]);

  if (mounted && (!sectionEnabled || homepagePhotos.length === 0)) {
    return null;
  }

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <section id="past-events-gallery" className="py-20 lg:py-24 bg-[#fbfdfa] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-forest-green uppercase tracking-wider mb-2.5 px-3 py-1 rounded-full bg-forest-green/10">
              <Camera className="w-3.5 h-3.5" />
              FIELD ENGAGEMENTS &amp; PAST EVENTS
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
              Past Events &amp; Stakeholder Dialogues
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Official photographic documentation of CESSPA courtesy visits, inter-agency dialogues, and institutional partnerships advancing environmental and social governance in Nigeria.
            </p>
          </div>

          <Link
            href="/events/photos"
            className="inline-flex items-center gap-2 text-xs font-bold text-forest-green hover:text-deep-emerald font-heading uppercase tracking-wider transition-colors shrink-0 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs hover:shadow-sm"
          >
            <span>Full Photo Archive ({photos.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        {categories.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none text-xs">
            <span className="text-slate-400 flex items-center gap-1 shrink-0 font-medium mr-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setActivePhotoIndex(null);
                }}
                className={`px-3.5 py-1.5 rounded-full font-medium shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-forest-green text-white shadow-xs font-semibold"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActivePhotoIndex(index)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 bg-forest-green/95 backdrop-blur-xs text-white font-montserrat font-semibold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                  {item.category}
                </div>
                <div className="absolute inset-0 bg-forest-green/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/95 text-forest-green flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5 truncate mr-2">
                      <MapPin className="w-3.5 h-3.5 text-forest-green shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </span>
                    <span className="flex items-center gap-1.5 shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-forest-green shrink-0" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-forest-green transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-forest-green font-semibold">
                  <span className="inline-flex items-center gap-1 text-[11px] group-hover:underline">
                    View Event Details <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActivePhotoIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close & Counter Bar */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="px-2 py-0.5 rounded bg-forest-green/10 text-forest-green font-bold text-[10px] uppercase">
                  {activePhoto.category}
                </span>
                <span>•</span>
                <span>
                  Photo {(activePhotoIndex ?? 0) + 1} of {filteredPhotos.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActivePhotoIndex(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Viewport with Nav Arrows */}
            <div className="relative aspect-16/10 sm:aspect-16/9 w-full bg-black/95 flex items-center justify-center overflow-hidden shrink-0">
              <Image
                src={activePhoto.image}
                alt={activePhoto.title}
                fill
                className="object-contain"
                priority
              />

              {filteredPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Detailed Description Footer */}
            <div className="p-6 bg-white overflow-y-auto space-y-2.5">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 text-forest-green font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  {activePhoto.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {activePhoto.date}
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 leading-snug">
                {activePhoto.title}
              </h3>

              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {activePhoto.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
