"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { MOCK_NEWS } from "@/lib/data/mockData";
import { formatDate } from "@/lib/utils";

export default function BlogListingPage() {
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = ["All", "Policy & Standards", "Association News", "Case Study", "Technical Guide"];

  const filteredNews =
    selectedCat === "All"
      ? MOCK_NEWS
      : MOCK_NEWS.filter((n) => n.category === selectedCat);

  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="INSIGHTS" lightMode={true}>
            THOUGHT LEADERSHIP & FIELD ESSAYS
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            CESSPA Insights & Blog
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Analytical commentaries on Nigerian environmental laws, community safeguards frameworks,
            and sustainable infrastructure engineering.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        {/* Sub-nav tabs */}
        <div className="mb-8 border-b border-brand-border flex items-center gap-6 text-xs font-montserrat font-bold uppercase tracking-wider">
          <Link href="/resources" className="text-ink-muted hover:text-forest-green pb-3">
            Publications & Guidelines
          </Link>
          <Link href="/resources/blog" className="text-forest-green border-b-2 border-heritage-gold pb-3">
            Insights & Articles
          </Link>
          <Link href="/resources/videos" className="text-ink-muted hover:text-forest-green pb-3">
            Video Webinars
          </Link>
        </div>

        {/* Filter Chips */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-4 py-2 rounded-xl text-xs font-montserrat font-bold uppercase tracking-wider transition-all ${
                selectedCat === c
                  ? "bg-forest-green text-white shadow-md ring-2 ring-heritage-gold"
                  : "bg-white text-ink-body border border-brand-border hover:border-forest-green"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredNews.map((article) => (
            <article
              key={article.id}
              className="rounded-3xl overflow-hidden bg-white border border-brand-border shadow-xs card-hover flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 w-full bg-forest-green/10">
                  <Image
                    src={article.coverImage || "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80"}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-forest-green text-white text-[10px] font-montserrat font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-ink-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-forest-green" />
                      {formatDate(article.publishDate)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-forest-green" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-montserrat font-bold text-lg text-ink-dark leading-snug hover:text-forest-green transition-colors">
                    <Link href={`/resources/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-body leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>

                  <div className="pt-2 text-xs text-ink-muted">
                    <span>By: </span>
                    <strong className="text-forest-green">{article.author}</strong>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/resources/blog/${article.slug}`}
                  className="font-montserrat font-bold text-xs uppercase tracking-wider text-forest-green hover:text-heritage-gold flex items-center gap-1"
                >
                  Read Full Article <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
