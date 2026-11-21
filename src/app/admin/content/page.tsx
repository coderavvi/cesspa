"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  BookOpen,
  FileText,
  Video,
  ExternalLink,
  Trash2,
  X,
  Check,
  Download,
} from "lucide-react";
import { MOCK_NEWS, MOCK_PUBLICATIONS } from "@/lib/data/mockData";
import { NewsArticle, Publication } from "@/lib/types";
import { formatDate } from "@/lib/utils";

// Mock videos matching /resources/videos
interface VideoAsset {
  id: string;
  title: string;
  category: string;
  duration: string;
  date: string;
  thumbnail: string;
  description: string;
}

const INITIAL_VIDEOS: VideoAsset[] = [
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
];

// Mock presentations matching /events/presentations
interface PresentationAsset {
  id: string;
  title: string;
  presenter: string;
  event: string;
  date: string;
  slidesCount: number;
  fileSize: string;
}

const INITIAL_PRESENTATIONS: PresentationAsset[] = [
  {
    id: "pres-01",
    title: "Aligning National ESIA Baselines with AfDB Integrated Safeguards System",
    presenter: "Engr. Babatunde Adeyemi, FNSE",
    event: "CESSPA National Technical Summit 2026",
    date: "October 2026",
    slidesCount: 42,
    fileSize: "6.2 MB PDF",
  },
  {
    id: "pres-02",
    title: "Resettlement Action Planning (RAP) in Urban Road Corridors",
    presenter: "Dr. Amina Garba Bello",
    event: "North West Zonal Safeguards Forum",
    date: "September 2026",
    slidesCount: 36,
    fileSize: "4.8 MB PDF",
  },
  {
    id: "pres-03",
    title: "Industrial Effluent Sampling and Statutory NESREA Reporting Protocols",
    presenter: "Folashade O. Williams, LL.M",
    event: "Federal Safeguards Working Group",
    date: "August 2026",
    slidesCount: 28,
    fileSize: "3.4 MB PDF",
  },
];

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<"articles" | "publications" | "videos" | "presentations">("articles");
  const [news, setNews] = useState<NewsArticle[]>(MOCK_NEWS);
  const [publications, setPublications] = useState<Publication[]>(MOCK_PUBLICATIONS);
  const [videos, setVideos] = useState<VideoAsset[]>(INITIAL_VIDEOS);
  const [presentations, setPresentations] = useState<PresentationAsset[]>(INITIAL_PRESENTATIONS);

  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Form State for Article
  const [newArticle, setNewArticle] = useState({
    title: "",
    category: "Policy & Standards" as NewsArticle["category"],
    author: "National Technical Committee",
    authorRole: "Technical Secretariat",
    summary: "",
    content: "",
    readTime: "5 min read",
  });

  // Form State for Publication
  const [newPub, setNewPub] = useState({
    title: "",
    category: "ESIA Guidelines" as Publication["category"],
    pages: "48",
    publishedYear: "2026",
    fileSize: "2.5 MB PDF",
    summary: "",
  });

  // Form State for Video
  const [newVideo, setNewVideo] = useState({
    title: "",
    category: "Technical Webinar",
    duration: "52 mins",
    date: "November 2026",
    description: "",
  });

  // Form State for Presentation
  const [newPres, setNewPres] = useState({
    title: "",
    presenter: "",
    event: "CESSPA National Technical Symposium",
    slidesCount: "35",
    fileSize: "4.2 MB PDF",
  });

  // Article Submit
  const handlePublishArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const item: NewsArticle = {
      id: `art-${Date.now()}`,
      slug: newArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: newArticle.title,
      category: newArticle.category,
      author: newArticle.author,
      authorRole: newArticle.authorRole,
      publishDate: new Date().toISOString().split("T")[0],
      readTime: newArticle.readTime,
      summary: newArticle.summary,
      content: newArticle.content || newArticle.summary,
    };
    setNews([item, ...news]);
    setModalOpen(false);
  };

  // Publication Submit
  const handlePublishPublication = (e: React.FormEvent) => {
    e.preventDefault();
    const item: Publication = {
      id: `pub-${Date.now()}`,
      title: newPub.title,
      category: newPub.category,
      pages: Number(newPub.pages) || 20,
      publishedYear: Number(newPub.publishedYear) || 2026,
      fileSize: newPub.fileSize,
      summary: newPub.summary,
      downloadUrl: "#",
    };
    setPublications([item, ...publications]);
    setModalOpen(false);
  };

  // Video Submit
  const handlePublishVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const item: VideoAsset = {
      id: `vid-${Date.now()}`,
      title: newVideo.title,
      category: newVideo.category,
      duration: newVideo.duration,
      date: newVideo.date,
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
      description: newVideo.description,
    };
    setVideos([item, ...videos]);
    setModalOpen(false);
  };

  // Presentation Submit
  const handlePublishPresentation = (e: React.FormEvent) => {
    e.preventDefault();
    const item: PresentationAsset = {
      id: `pres-${Date.now()}`,
      title: newPres.title,
      presenter: newPres.presenter,
      event: newPres.event,
      date: "November 2026",
      slidesCount: Number(newPres.slidesCount) || 30,
      fileSize: newPres.fileSize,
    };
    setPresentations([item, ...presentations]);
    setModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-900 tracking-tight">
            Insights &amp; Publications CMS
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Publish knowledge assets, regulatory guidelines, video recordings, and conference slide decks
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-3.5 py-1.5 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            {activeTab === "articles" && "Publish Article"}
            {activeTab === "publications" && "Upload Publication"}
            {activeTab === "videos" && "Add Video Recording"}
            {activeTab === "presentations" && "Upload Presentation"}
          </button>
        </div>
      </div>

      {/* Publishing Category Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("articles")}
          className={`pb-2.5 border-b-2 transition-colors ${
            activeTab === "articles"
              ? "border-[#0B4A2B] text-[#0B4A2B]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Insights &amp; Blog ({news.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("publications")}
          className={`pb-2.5 border-b-2 transition-colors ${
            activeTab === "publications"
              ? "border-[#0B4A2B] text-[#0B4A2B]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Publications &amp; Guidelines ({publications.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("videos")}
          className={`pb-2.5 border-b-2 transition-colors ${
            activeTab === "videos"
              ? "border-[#0B4A2B] text-[#0B4A2B]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Recorded Masterclasses ({videos.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("presentations")}
          className={`pb-2.5 border-b-2 transition-colors ${
            activeTab === "presentations"
              ? "border-[#0B4A2B] text-[#0B4A2B]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Presentations &amp; Papers ({presentations.length})
        </button>
      </div>

      {/* TAB 1: Insights & Blog Articles */}
      {activeTab === "articles" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-medium">
                <th className="py-2.5 px-3">Article Title</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Author</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Read Time</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900 line-clamp-1">{item.title}</div>
                    <div className="font-mono text-[10px] text-slate-400">/{item.slug}</div>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-800">{item.category}</td>
                  <td className="py-3 px-3 text-slate-600">{item.author}</td>
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{formatDate(item.publishDate)}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{item.readTime}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/resources/blog/${item.slug}`}
                        target="_blank"
                        className="text-[#0B4A2B] hover:underline text-[11px] font-medium"
                      >
                        Public Link
                      </Link>
                      <button
                        type="button"
                        onClick={() => setNews(news.filter((n) => n.id !== item.id))}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: Publications & Guidelines */}
      {activeTab === "publications" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-medium">
                <th className="py-2.5 px-3">Publication Title</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Length</th>
                <th className="py-2.5 px-3">Edition</th>
                <th className="py-2.5 px-3">File Size</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {publications.map((pub) => (
                <tr key={pub.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{pub.title}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{pub.summary}</div>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-800">{pub.category}</td>
                  <td className="py-3 px-3 text-slate-600">{pub.pages} Pages</td>
                  <td className="py-3 px-3 font-mono text-slate-500">{pub.publishedYear}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{pub.fileSize}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href="/resources"
                        target="_blank"
                        className="text-[#0B4A2B] hover:underline text-[11px] font-medium"
                      >
                        Public Link
                      </Link>
                      <button
                        type="button"
                        onClick={() => setPublications(publications.filter((p) => p.id !== pub.id))}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: Video Masterclasses */}
      {activeTab === "videos" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-medium">
                <th className="py-2.5 px-3">Webinar / Masterclass</th>
                <th className="py-2.5 px-3">Format</th>
                <th className="py-2.5 px-3">Duration</th>
                <th className="py-2.5 px-3">Broadcast Date</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {videos.map((vid) => (
                <tr key={vid.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{vid.title}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{vid.description}</div>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-800">{vid.category}</td>
                  <td className="py-3 px-3 font-mono text-slate-600">{vid.duration}</td>
                  <td className="py-3 px-3 text-slate-500">{vid.date}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href="/resources/videos"
                        target="_blank"
                        className="text-[#0B4A2B] hover:underline text-[11px] font-medium"
                      >
                        Stream Page
                      </Link>
                      <button
                        type="button"
                        onClick={() => setVideos(videos.filter((v) => v.id !== vid.id))}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: Presentations & Papers */}
      {activeTab === "presentations" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-medium">
                <th className="py-2.5 px-3">Presentation Title</th>
                <th className="py-2.5 px-3">Keynote Presenter</th>
                <th className="py-2.5 px-3">Event Venue</th>
                <th className="py-2.5 px-3">Slides</th>
                <th className="py-2.5 px-3">File Size</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {presentations.map((pres) => (
                <tr key={pres.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3 font-semibold text-slate-900">{pres.title}</td>
                  <td className="py-3 px-3 text-slate-700">{pres.presenter}</td>
                  <td className="py-3 px-3 text-slate-500">{pres.event}</td>
                  <td className="py-3 px-3 font-mono text-slate-600">{pres.slidesCount} slides</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{pres.fileSize}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href="/events/presentations"
                        target="_blank"
                        className="text-[#0B4A2B] hover:underline text-[11px] font-medium"
                      >
                        Public Link
                      </Link>
                      <button
                        type="button"
                        onClick={() => setPresentations(presentations.filter((p) => p.id !== pres.id))}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal: Publish New Asset */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="max-w-xl w-full bg-white rounded-lg p-6 border border-slate-200 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <h3 className="font-heading font-bold text-base text-slate-900">
                {activeTab === "articles" && "Publish New Insight Article"}
                {activeTab === "publications" && "Publish Technical Guideline / SOP"}
                {activeTab === "videos" && "Publish Recorded Masterclass"}
                {activeTab === "presentations" && "Publish Slide Deck / Technical Paper"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form for Article */}
            {activeTab === "articles" && (
              <form onSubmit={handlePublishArticle} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Article Title</label>
                  <input
                    type="text"
                    required
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    placeholder="e.g. Modernizing EIA Act Compliance for Capital Projects"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Category</label>
                    <select
                      value={newArticle.category}
                      onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B] bg-white"
                    >
                      <option value="Policy & Standards">Policy &amp; Standards</option>
                      <option value="Technical Guide">Technical Guide</option>
                      <option value="Case Study">Case Study</option>
                      <option value="Association News">Association News</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Read Time</label>
                    <input
                      type="text"
                      value={newArticle.readTime}
                      onChange={(e) => setNewArticle({ ...newArticle, readTime: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Author Name</label>
                    <input
                      type="text"
                      required
                      value={newArticle.author}
                      onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
                      placeholder="e.g. Ken Ebiama, Esq."
                      className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Author Title / Role</label>
                    <input
                      type="text"
                      value={newArticle.authorRole}
                      onChange={(e) => setNewArticle({ ...newArticle, authorRole: e.target.value })}
                      placeholder="e.g. Lead Social Safeguards Advisor"
                      className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Executive Summary</label>
                  <textarea
                    rows={2}
                    required
                    value={newArticle.summary}
                    onChange={(e) => setNewArticle({ ...newArticle, summary: e.target.value })}
                    placeholder="Brief overview of the article core argument..."
                    className="w-full p-2.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Full Article Body</label>
                  <textarea
                    rows={6}
                    required
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                    placeholder="Write or paste the full essay markdown or body text..."
                    className="w-full p-2.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-md bg-[#0B4A2B] text-white text-xs font-semibold hover:bg-[#08331F]"
                  >
                    Publish to Insights
                  </button>
                </div>
              </form>
            )}

            {/* Form for Publication */}
            {activeTab === "publications" && (
              <form onSubmit={handlePublishPublication} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Publication Title</label>
                  <input
                    type="text"
                    required
                    value={newPub.title}
                    onChange={(e) => setNewPub({ ...newPub, title: e.target.value })}
                    placeholder="e.g. Standard Operating Procedures for Effluent Testing"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Category</label>
                    <select
                      value={newPub.category}
                      onChange={(e) => setNewPub({ ...newPub, category: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B] bg-white"
                    >
                      <option value="ESIA Guidelines">ESIA Guidelines</option>
                      <option value="Technical Brief">Technical Brief</option>
                      <option value="Policy Paper">Policy Paper</option>
                      <option value="Standard Operating Procedures">SOP Document</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Page Count</label>
                    <input
                      type="number"
                      value={newPub.pages}
                      onChange={(e) => setNewPub({ ...newPub, pages: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Year</label>
                    <input
                      type="number"
                      value={newPub.publishedYear}
                      onChange={(e) => setNewPub({ ...newPub, publishedYear: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Document Summary</label>
                  <textarea
                    rows={3}
                    required
                    value={newPub.summary}
                    onChange={(e) => setNewPub({ ...newPub, summary: e.target.value })}
                    placeholder="Core statutory context and operational focus of this guideline..."
                    className="w-full p-2.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-md bg-[#0B4A2B] text-white text-xs font-semibold hover:bg-[#08331F]"
                  >
                    Add to Guidelines
                  </button>
                </div>
              </form>
            )}

            {/* Form for Video */}
            {activeTab === "videos" && (
              <form onSubmit={handlePublishVideo} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Masterclass Title</label>
                  <input
                    type="text"
                    required
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                    placeholder="e.g. Field Auditing of Resettlement Action Plans"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Format Category</label>
                    <select
                      value={newVideo.category}
                      onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B] bg-white"
                    >
                      <option value="Technical Webinar">Technical Webinar</option>
                      <option value="Field Masterclass">Field Masterclass</option>
                      <option value="Symposium Plenary">Symposium Plenary</option>
                      <option value="Presidential Address">Presidential Address</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Video Duration</label>
                    <input
                      type="text"
                      value={newVideo.duration}
                      onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                      placeholder="e.g. 1 hr 10 mins"
                      className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Synopsis / Learning Objectives</label>
                  <textarea
                    rows={3}
                    required
                    value={newVideo.description}
                    onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                    placeholder="Summary of recorded presentation..."
                    className="w-full p-2.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-md bg-[#0B4A2B] text-white text-xs font-semibold hover:bg-[#08331F]"
                  >
                    Publish Video
                  </button>
                </div>
              </form>
            )}

            {/* Form for Presentation */}
            {activeTab === "presentations" && (
              <form onSubmit={handlePublishPresentation} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Slide Deck Title</label>
                  <input
                    type="text"
                    required
                    value={newPres.title}
                    onChange={(e) => setNewPres({ ...newPres, title: e.target.value })}
                    placeholder="e.g. Biodiversity Metrics & Offset Frameworks in Mangrove Corridors"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Presenter</label>
                    <input
                      type="text"
                      required
                      value={newPres.presenter}
                      onChange={(e) => setNewPres({ ...newPres, presenter: e.target.value })}
                      placeholder="e.g. Chukwuma Emmanuel Okafor"
                      className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Event Venue / Summit</label>
                    <input
                      type="text"
                      value={newPres.event}
                      onChange={(e) => setNewPres({ ...newPres, event: e.target.value })}
                      placeholder="e.g. Annual National Convention"
                      className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Slide Count</label>
                    <input
                      type="number"
                      value={newPres.slidesCount}
                      onChange={(e) => setNewPres({ ...newPres, slidesCount: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">File Size</label>
                    <input
                      type="text"
                      value={newPres.fileSize}
                      onChange={(e) => setNewPres({ ...newPres, fileSize: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-md bg-[#0B4A2B] text-white text-xs font-semibold hover:bg-[#08331F]"
                  >
                    Upload Slide Deck
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}