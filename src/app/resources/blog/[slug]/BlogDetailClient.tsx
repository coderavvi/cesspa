"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Check,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { NewsArticle } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function BlogDetailClient({ article }: { article: NewsArticle }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-forest-green text-white py-14 lg:py-18 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-1.5 text-xs font-montserrat font-bold uppercase tracking-wider text-heritage-gold-soft hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Articles
          </Link>

          <span className="bg-heritage-gold text-forest-green font-montserrat font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded inline-block">
            {article.category}
          </span>

          <h1 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-5xl text-white uppercase max-w-4xl leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-sage-mist/90 pt-2">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-heritage-gold" />
              <span>{article.author} ({article.authorRole})</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-heritage-gold" />
              <span>{formatDate(article.publishDate)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-heritage-gold" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <Section variant="ivory">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Cover Image */}
          <div className="relative aspect-16/9 w-full rounded-3xl overflow-hidden border border-brand-border shadow-md bg-white">
            <Image
              src={article.coverImage || "/images/brand/what-is-cesspa.jpg"}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Summary Lead */}
          <p className="text-base sm:text-lg text-ink-dark font-medium leading-relaxed border-l-4 border-heritage-gold pl-4 py-1 italic">
            &ldquo;{article.summary}&rdquo;
          </p>

          {/* Article Content */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-6 text-sm sm:text-base text-ink-body leading-relaxed">
            {article.content.split("\n\n").map((para, idx) => {
              const trimmed = para.trim();
              if (trimmed.startsWith("###")) {
                return (
                  <h3 key={idx} className="font-montserrat font-extrabold text-xl text-ink-dark uppercase pt-4">
                    {trimmed.replace("###", "").trim()}
                  </h3>
                );
              }
              if (trimmed.startsWith("1.") || trimmed.startsWith("-")) {
                return (
                  <div key={idx} className="space-y-2 p-4 bg-sage-mist/40 rounded-2xl border border-brand-border/60">
                    <p className="font-medium text-ink-dark">{trimmed}</p>
                  </div>
                );
              }
              return <p key={idx}>{trimmed}</p>;
            })}

            {/* Pull Quote */}
            <blockquote className="quote-font text-xl italic text-forest-green bg-sage-mist/60 border-l-4 border-forest-green p-5 rounded-r-2xl my-6">
              &ldquo;When people feel heard, respected and considered, trust becomes possible. Sustainable development protects both the environment and the people who depend on it.&rdquo;
            </blockquote>

            <p>
              For additional consultation or to contribute a peer-reviewed technical note to the CESSPA Safeguards Digest,
              contact the Practice Directorate at{" "}
              <a href="mailto:info@cesspa.org.ng" className="text-forest-green underline font-medium">
                info@cesspa.org.ng
              </a>.
            </p>
          </div>

          {/* Author Card */}
          <div className="p-6 rounded-2xl bg-white border border-brand-border shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-forest-green text-white flex items-center justify-center font-montserrat font-bold text-lg shrink-0">
                {article.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-sm text-ink-dark">{article.author}</h4>
                <p className="text-xs text-forest-green">{article.authorRole}</p>
                <p className="text-[11px] text-ink-muted">CESSPA Technical Working Committee</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sage-mist hover:bg-forest-green hover:text-white transition-colors text-xs font-montserrat font-bold uppercase tracking-wider text-forest-green"
                title="Share Article"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" /> Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" /> Share
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
