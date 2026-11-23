"use client";

import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
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

  // Carousel navigation state
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Update carousel scroll buttons state
  const updateScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const firstCard = el.firstElementChild as HTMLElement;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 24; // width + gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.max(0, Math.min(newIndex, filteredPhotos.length - 1)));
    }
  }, [filteredPhotos.length]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    // Reset scroll to 0 when category changes
    el.scrollTo({ left: 0, behavior: "smooth" });
    setActiveIndex(0);
    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [selectedCategory, updateScrollState]);

  const scrollPrev = () => {
    const el = carouselRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 360;
    el.scrollBy({ left: -cardWidth, behavior: "smooth" });
  };

  const scrollNext = () => {
    const el = carouselRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 360;
    el.scrollBy({ left: cardWidth, behavior: "smooth" });
  };

  const scrollToCard = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 360;
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

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
  }, [activePhotoIndex, filteredPhotos.length]);

  if (mounted && (!sectionEnabled || homepagePhotos.length === 0)) {
    return null;
  }

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <section id="past-events-gallery" className="py-20 lg:py-24 bg-[#fbfdfa] border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
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

          {/* Right Action & Carousel Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/events/photos"
              className="inline-flex items-center gap-2 text-xs font-bold text-forest-green hover:text-deep-emerald font-heading uppercase tracking-wider transition-colors bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs hover:shadow-sm"
            >
              <span>Full Archive ({photos.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Carousel Arrow Controls in Header */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollLeft}
                aria-label="Previous event slide"
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  canScrollLeft
                    ? "text-slate-700 hover:bg-forest-green hover:text-white"
                    : "text-slate-300 cursor-not-allowed opacity-50"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="h-4 w-[1px] bg-slate-200" />
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollRight}
                aria-label="Next event slide"
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  canScrollRight
                    ? "text-slate-700 hover:bg-forest-green hover:text-white"
                    : "text-slate-300 cursor-not-allowed opacity-50"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        {categories.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none text-xs">
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

        {/* Carousel Viewport Container */}
        <div className="relative group">
          {/* Subtle Floating Navigation Buttons on Desktop */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Scroll left"
              className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-slate-800 shadow-xl border border-slate-200 items-center justify-center hover:bg-forest-green hover:text-white transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {canScrollRight && (
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Scroll right"
              className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-slate-800 shadow-xl border border-slate-200 items-center justify-center hover:bg-forest-green hover:text-white transition-all duration-200 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Carousel Track */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth py-3 px-1 -mx-1"
          >
            {filteredPhotos.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setActivePhotoIndex(index)}
                className="w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start group/card cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo Header */}
                <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-forest-green/95 backdrop-blur-xs text-white font-montserrat font-semibold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs z-10">
                    {item.category}
                  </div>
                  <div className="absolute inset-0 bg-forest-green/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-forest-green flex items-center justify-center shadow-lg transform scale-90 group-hover/card:scale-100 transition-transform">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
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

                    <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover/card:text-forest-green transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-forest-green font-semibold">
                    <span className="inline-flex items-center gap-1 text-[11px] group-hover/card:underline">
                      View Event Details <ArrowRight className="w-3 h-3 group-hover/card:translate-x-0.5 transition-transform" />
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      #{index + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Pagination Dots */}
          {filteredPhotos.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {filteredPhotos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToCard(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeIndex === i
                      ? "w-7 h-2 bg-forest-green shadow-xs"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          )}
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
