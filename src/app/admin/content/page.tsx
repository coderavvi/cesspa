"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Plus, Edit3, Trash2, CheckCircle2, FileText, ArrowUpRight } from "lucide-react";
import { MOCK_NEWS, MOCK_PUBLICATIONS } from "@/lib/data/mockData";
import { formatDate } from "@/lib/utils";

export default function AdminContentPage() {
  const [news, setNews] = useState(MOCK_NEWS);
  const [publications, setPublications] = useState(MOCK_PUBLICATIONS);
  const [tab, setTab] = useState<"news" | "publications">("news");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-wider block">
            EDITORIAL CMS
          </span>
          <h1 className="font-montserrat font-extrabold text-2xl text-slate-900 uppercase mt-0.5">
            Content & Publications CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Publish knowledge assets, technical notes, and regulatory advisories.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Simulated: Opening Draft Article / Technical Guide Editor...")}
          className="px-4 py-2 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" /> Create New Post
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-slate-200 text-xs font-montserrat font-bold uppercase tracking-wider">
        <button
          onClick={() => setTab("news")}
          className={`pb-3 ${
            tab === "news" ? "text-forest-green border-b-2 border-heritage-gold" : "text-slate-400 hover:text-slate-700"
          }`}
        >
          Insights & Blog ({news.length})
        </button>
        <button
          onClick={() => setTab("publications")}
          className={`pb-3 ${
            tab === "publications" ? "text-forest-green border-b-2 border-heritage-gold" : "text-slate-400 hover:text-slate-700"
          }`}
        >
          Technical Publications ({publications.length})
        </button>
      </div>

      {tab === "news" ? (
        <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-montserrat uppercase text-[10px]">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Published Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4">
                    <strong className="text-slate-900 block">{item.title}</strong>
                    <span className="text-[11px] text-slate-400 font-mono">/{item.slug}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium">{item.category}</td>
                  <td className="py-3.5 px-4">{item.author}</td>
                  <td className="py-3.5 px-4 text-slate-500">{formatDate(item.publishDate)}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/resources/blog/${item.slug}`}
                        className="text-forest-green hover:underline font-bold text-[11px]"
                      >
                        View
                      </Link>
                      <span>•</span>
                      <button
                        onClick={() => alert(`Simulated: Editing ${item.title}`)}
                        className="text-slate-500 hover:text-slate-800 text-[11px]"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-montserrat uppercase text-[10px]">
                <th className="py-3 px-4">Compendium Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Edition Year</th>
                <th className="py-3 px-4">Pages / Size</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {publications.map((pub) => (
                <tr key={pub.id} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-medium text-slate-900">{pub.title}</td>
                  <td className="py-3.5 px-4">{pub.category}</td>
                  <td className="py-3.5 px-4 font-mono">{pub.publishedYear}</td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {pub.pages} Pages • {pub.fileSize}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Simulated: Managing file asset for ${pub.title}`)}
                      className="text-forest-green hover:underline font-bold text-[11px]"
                    >
                      Update File
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
