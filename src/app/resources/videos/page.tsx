"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, Calendar, Clock, Video } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";

const VIDEOS = [
  {
    id: "vid-01",
    title: "Operationalizing the 2026 ESIA Guidelines for Transport & Energy Projects",
    category: "Technical Webinar",
    duration: "1 hr 14 mins",
    date: "September 2026",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    description: "Complete recording of the CESSPA National Webinar explaining baseline data integrity and risk scoring.",
  },
  {
    id: "vid-02",
    title: "Community Grievance Redress: Building Trust in Infrastructure Corridors",
    category: "Field Masterclass",
    duration: "48 mins",
    date: "August 2026",
    thumbnail: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
    description: "Case studies from the Niger Delta and Middle Belt on culturally grounded consultation.",
  },
  {
    id: "vid-03",
    title: "Pillar 03 in Action: Lifecycle Monitoring & Digital Audit Verification",
    category: "Symposium Plenary",
    duration: "56 mins",
    date: "July 2026",
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
    description: "Expert walkthrough on post-EIA approval compliance logs and regulatory submission formats.",
  },
  {
    id: "vid-04",
    title: "Why CESSPA Was Created: Inaugural Nationwide Inception Broadcast",
    category: "Presidential Address",
    duration: "32 mins",
    date: "October 2025",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    description: "The founding convocation speech by the Technical Working Committee leadership.",
  },
];

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState<(typeof VIDEOS)[0] | null>(null);

  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="MULTIMEDIA" lightMode={true}>
            RECORDED MASTERCLASSES & DIALOGUES
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            CESSPA Video Library
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Stream recorded technical webinars, conference keynote panels, and regulatory masterclasses on demand.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        {/* Sub-nav tabs */}
        <div className="mb-8 border-b border-brand-border flex items-center gap-6 text-xs font-montserrat font-bold uppercase tracking-wider">
          <Link href="/resources" className="text-ink-muted hover:text-forest-green pb-3">
            Publications & Guidelines
          </Link>
          <Link href="/resources/blog" className="text-ink-muted hover:text-forest-green pb-3">
            Insights & Articles
          </Link>
          <Link href="/resources/videos" className="text-forest-green border-b-2 border-heritage-gold pb-3">
            Video Webinars
          </Link>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VIDEOS.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="rounded-3xl overflow-hidden bg-white border border-brand-border shadow-xs card-hover cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-16/9 w-full bg-forest-green/20 overflow-hidden">
                  <Image
                    src={vid.thumbnail}
                    alt={vid.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-forest-green/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-heritage-gold text-forest-green flex items-center justify-center shadow-xl group-hover:scale-110 transition-all">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-forest-green/90 text-white font-mono text-xs px-2 py-0.5 rounded">
                    {vid.duration}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-xs text-ink-muted">
                    <span className="font-montserrat font-bold text-forest-green uppercase">
                      {vid.category}
                    </span>
                    <span>{vid.date}</span>
                  </div>

                  <h3 className="font-montserrat font-bold text-lg text-ink-dark leading-snug group-hover:text-forest-green transition-colors">
                    {vid.title}
                  </h3>

                  <p className="text-xs text-ink-body leading-relaxed line-clamp-2">
                    {vid.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-brand-border/60 flex items-center justify-between text-xs text-forest-green font-montserrat font-bold uppercase">
                <span>Watch Stream</span>
                <span>Earn CPD Points</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-green/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-brand-border space-y-4 p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-wider">
                  {activeVideo.category} • {activeVideo.duration}
                </span>
                <h3 className="font-montserrat font-extrabold text-xl text-ink-dark mt-0.5">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-lg text-ink-muted hover:text-ink-dark hover:bg-sage-mist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Modal */}
            <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-black flex flex-col items-center justify-center text-white space-y-3">
              <div className="w-20 h-20 rounded-full bg-heritage-gold text-forest-green flex items-center justify-center shadow-2xl animate-pulse">
                <Play className="w-10 h-10 fill-current ml-1" />
              </div>
              <p className="text-xs sm:text-sm text-sage-mist font-mono">
                Streaming High-Definition Stream: {activeVideo.title}
              </p>
              <span className="text-[10px] text-sage-mist/60 bg-white/10 px-3 py-1 rounded-full">
                CESSPA Media Server • 1080p WAT
              </span>
            </div>

            <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
              {activeVideo.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
