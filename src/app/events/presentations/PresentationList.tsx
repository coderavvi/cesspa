"use client";

import React, { useState } from "react";
import { Download, User, Check } from "lucide-react";

interface PresentationItem {
  id: string;
  title: string;
  speaker: string;
  occasion: string;
  date: string;
  pages: string;
  fileSize: string;
}

export function PresentationList({ items }: { items: PresentationItem[] }) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (item: PresentationItem) => {
    setDownloadingId(item.id);
    setTimeout(() => {
      setDownloadingId(null);
    }, 2000);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {items.map((item) => {
        const isDownloading = downloadingId === item.id;
        return (
          <div
            key={item.id}
            className="rounded-2xl p-6 bg-white border border-brand-border shadow-xs card-hover flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-xs text-ink-muted">
                <span className="font-montserrat font-bold text-forest-green bg-sage-mist px-2.5 py-0.5 rounded">
                  {item.pages}
                </span>
                <span>•</span>
                <span>{item.date}</span>
              </div>

              <h3 className="font-montserrat font-bold text-base text-ink-dark">
                {item.title}
              </h3>

              <div className="text-xs text-ink-body space-y-0.5">
                <p className="font-semibold text-forest-green flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-heritage-gold" /> {item.speaker}
                </p>
                <p className="text-ink-muted italic">{item.occasion}</p>
              </div>
            </div>

            <div className="sm:border-l sm:border-brand-border/60 sm:pl-6 shrink-0 flex flex-col sm:items-end justify-center gap-2">
              <span className="text-[11px] font-mono text-ink-muted">{item.fileSize}</span>
              <button
                type="button"
                onClick={() => handleDownload(item)}
                className="px-5 py-2.5 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
              >
                {isDownloading ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-heritage-gold" />
                    Downloaded
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-heritage-gold" />
                    Download Deck
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
