"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  Award,
  Users,
  X,
  Check,
  ExternalLink,
  Trash2,
  Eye,
  EyeOff,
  Globe,
  Upload,
  Image as ImageIcon,
  FileImage,
} from "lucide-react";
import { MOCK_EVENTS } from "@/lib/data/mockData";
import { EventItem } from "@/lib/types";
import { formatDate, formatNaira } from "@/lib/utils";

// Client-side image compression helper to keep localStorage fast and prevent storage limit errors
function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxW = 1000;
        const scale = Math.min(1, maxW / img.width);
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error("Failed to load image file."));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(MOCK_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [homepageGlobalEnabled, setHomepageGlobalEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [uploadingFlyer, setUploadingFlyer] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const inspectorFileInputRef = useRef<HTMLInputElement>(null);

  // Form State for Posting New Event
  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "Webinar" as EventItem["category"],
    date: "2026-12-15",
    time: "10:00 AM - 01:00 PM WAT",
    location: "Virtual (Zoom Conference Room)",
    fee: "0",
    cpdPoints: "4",
    capacity: "250",
    description: "",
    speaker: "Dr. Joshua M. Akor",
    agendaTopic: "Harmonizing ESIA Baseline Methods with International Standards",
    showOnHomepage: true,
    bannerImage: "",
  });

  // Load persisted state from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      if (typeof window !== "undefined") {
        const storedGlobal = localStorage.getItem("cesspa_homepage_events_enabled");
        if (storedGlobal === "false") {
          setHomepageGlobalEnabled(false);
        } else {
          setHomepageGlobalEnabled(true);
        }

        const storedEvents = localStorage.getItem("cesspa_admin_events");
        if (storedEvents) {
          const parsed: EventItem[] = JSON.parse(storedEvents);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setEvents(parsed);
            setSelectedEvent(parsed[0]);
            return;
          }
        }
      }
    } catch (e) {
      // fallback
    }

    setEvents(MOCK_EVENTS);
    setSelectedEvent(MOCK_EVENTS[0] || null);
  }, []);

  // Helper to persist events & notify listeners
  const persistEvents = (updated: EventItem[]) => {
    setEvents(updated);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("cesspa_admin_events", JSON.stringify(updated));
        window.dispatchEvent(new Event("cesspa_events_updated"));
      }
    } catch (e) {
      // ignore
    }
  };

  // Toggle global homepage events section
  const handleToggleGlobalHomepage = () => {
    const nextState = !homepageGlobalEnabled;
    setHomepageGlobalEnabled(nextState);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("cesspa_homepage_events_enabled", nextState ? "true" : "false");
        window.dispatchEvent(new Event("cesspa_events_updated"));
      }
    } catch (e) {
      // ignore
    }
  };

  // Toggle per-event homepage display
  const handleToggleEventHomepage = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = events.map((item) => {
      if (item.id === id) {
        const currentVal = item.showOnHomepage !== false;
        return { ...item, showOnHomepage: !currentVal };
      }
      return item;
    });

    persistEvents(updated);
    if (selectedEvent?.id === id) {
      const refreshed = updated.find((it) => it.id === id) || null;
      setSelectedEvent(refreshed);
    }
  };

  // Handle flyer file selection in the modal
  const handleModalFlyerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingFlyer(true);
      const compressedDataUrl = await compressImage(file);
      setNewEvent((prev) => ({ ...prev, bannerImage: compressedDataUrl }));
    } catch (err) {
      alert("Unable to process the image. Please select a valid JPEG, PNG, or WebP file.");
    } finally {
      setUploadingFlyer(false);
    }
  };

  // Handle flyer replacement for existing selected event
  const handleInspectorFlyerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedEvent) return;

    try {
      setUploadingFlyer(true);
      const compressedDataUrl = await compressImage(file);
      const updated = events.map((item) => {
        if (item.id === selectedEvent.id) {
          return { ...item, bannerImage: compressedDataUrl };
        }
        return item;
      });

      persistEvents(updated);
      setSelectedEvent({ ...selectedEvent, bannerImage: compressedDataUrl });
    } catch (err) {
      alert("Unable to process the image flyer.");
    } finally {
      setUploadingFlyer(false);
    }
  };

  // Remove flyer from selected event
  const handleRemoveInspectorFlyer = () => {
    if (!selectedEvent) return;
    const updated = events.map((item) => {
      if (item.id === selectedEvent.id) {
        const copy = { ...item };
        delete copy.bannerImage;
        return copy;
      }
      return item;
    });

    persistEvents(updated);
    const refreshed = { ...selectedEvent };
    delete refreshed.bannerImage;
    setSelectedEvent(refreshed);
  };

  const filtered = events.filter((e) => {
    const matchQ =
      !query ||
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.location.toLowerCase().includes(query.toLowerCase());
    const matchCat =
      categoryFilter === "All" || e.category === categoryFilter;
    return matchQ && matchCat;
  });

  const handlePostEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const created: EventItem = {
      id: `evt-${Date.now()}`,
      slug: newEvent.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: newEvent.title,
      category: newEvent.category,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      isVirtual:
        newEvent.location.toLowerCase().includes("virtual") ||
        newEvent.location.toLowerCase().includes("zoom"),
      fee: Number(newEvent.fee) || 0,
      cpdPoints: Number(newEvent.cpdPoints) || 0,
      capacity: Number(newEvent.capacity) || 100,
      registeredCount: 0,
      showOnHomepage: newEvent.showOnHomepage,
      bannerImage: newEvent.bannerImage ? newEvent.bannerImage : undefined,
      description: newEvent.description || "CESSPA statutory continuous professional development session.",
      agenda: [
        {
          time: "10:00 AM",
          topic: newEvent.agendaTopic || "Session Keynote & Context",
          speaker: newEvent.speaker || "Lead Presenter",
        },
      ],
    };

    const nextEvents = [created, ...events];
    persistEvents(nextEvents);
    setSelectedEvent(created);
    setCreateModalOpen(false);

    // Reset form
    setNewEvent({
      title: "",
      category: "Webinar",
      date: "2026-12-15",
      time: "10:00 AM - 01:00 PM WAT",
      location: "Virtual (Zoom Conference Room)",
      fee: "0",
      cpdPoints: "4",
      capacity: "250",
      description: "",
      speaker: "Dr. Joshua M. Akor",
      agendaTopic: "Harmonizing ESIA Baseline Methods with International Standards",
      showOnHomepage: true,
      bannerImage: "",
    });
  };

  const handleDeleteEvent = (id: string) => {
    const updated = events.filter((e) => e.id !== id);
    persistEvents(updated);
    if (selectedEvent?.id === id) {
      setSelectedEvent(updated[0] || null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-900 tracking-tight">
            Events &amp; Continuous Professional Development
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Publish and manage summits, chapter technical sessions, event flyers, and accredited masterclasses
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Global Homepage Section Toggle */}
          <button
            type="button"
            onClick={handleToggleGlobalHomepage}
            title="Toggle whether upcoming events are visible to public visitors on the homepage"
            className={`px-3 py-1.5 rounded-md border text-xs font-medium flex items-center gap-2 transition-colors ${
              homepageGlobalEnabled
                ? "border-emerald-300 bg-emerald-50 text-[#0B4A2B] hover:bg-emerald-100"
                : "border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#0B4A2B]" />
            <span>Homepage Section:</span>
            <span className="font-semibold">
              {homepageGlobalEnabled ? "Visible" : "Hidden"}
            </span>
            <span
              className={`w-2 h-2 rounded-full ${
                homepageGlobalEnabled ? "bg-emerald-600" : "bg-slate-400"
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="px-3.5 py-1.5 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Post Upcoming Event
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by event title or venue..."
            className="w-full pl-8 pr-3 py-1.5 rounded-md border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B4A2B]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 text-[11px]">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0B4A2B] bg-white"
          >
            <option value="All">All Categories</option>
            <option value="Conference">National Conference / AGM</option>
            <option value="Webinar">Technical Webinar</option>
            <option value="Workshop">Safeguards Masterclass</option>
            <option value="Chapter Event">Chapter Forum</option>
          </select>
        </div>
      </div>

      {/* Main Workspace (Asymmetric Split: Events Table on Left, Inspector on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Events Table (7 cols) */}
        <div className="lg:col-span-7 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-medium">
                <th className="py-2.5 px-3">Event &amp; Flyer</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Date &amp; Venue</th>
                <th className="py-2.5 px-3">CPD Points</th>
                <th className="py-2.5 px-3">Fee</th>
                <th className="py-2.5 px-3 text-right">Homepage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((evt) => {
                const isSelected = selectedEvent?.id === evt.id;
                const isShownOnHome = evt.showOnHomepage !== false;
                return (
                  <tr
                    key={evt.id}
                    onClick={() => setSelectedEvent(evt)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? "bg-slate-100/70" : "hover:bg-slate-50/70"
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        {evt.bannerImage ? (
                          <img
                            src={evt.bannerImage}
                            alt=""
                            className="w-10 h-10 rounded-md object-cover border border-slate-200 shrink-0 bg-slate-100"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-md border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 line-clamp-1">{evt.title}</div>
                          <div className="font-mono text-[10px] text-slate-400">/{evt.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800">
                      {evt.category}
                    </td>
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      <div>{formatDate(evt.date)}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[130px]">{evt.location}</div>
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-[#0B4A2B]">
                      {evt.cpdPoints} pts
                    </td>
                    <td className="py-3 px-3 font-mono font-medium text-slate-900">
                      {evt.fee === 0 ? "Free" : formatNaira(evt.fee)}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => handleToggleEventHomepage(evt.id, e)}
                        title={isShownOnHome ? "Click to hide from homepage" : "Click to show on homepage"}
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border transition-colors ${
                          isShownOnHome
                            ? "bg-emerald-50 border-emerald-200 text-[#0B4A2B] hover:bg-emerald-100"
                            : "bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-700"
                        }`}
                      >
                        {isShownOnHome ? (
                          <>
                            <Eye className="w-3 h-3 text-[#0B4A2B]" />
                            <span>Shown</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-slate-400" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right Column: Selected Event Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {selectedEvent ? (
            <div className="space-y-6">
              <div className="pb-3 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#0B4A2B]">
                    {selectedEvent.category}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 font-mono font-semibold text-slate-700">
                    {selectedEvent.cpdPoints} CPD Points
                  </span>
                </div>
                <h2 className="font-heading font-bold text-base text-slate-900 mt-1">
                  {selectedEvent.title}
                </h2>
                <div className="text-xs text-slate-500 mt-1">
                  {formatDate(selectedEvent.date)} • {selectedEvent.time}
                </div>
              </div>

              {/* Event Flyer Banner Preview & Upload Actions */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-600 flex items-center gap-1.5">
                    <FileImage className="w-3.5 h-3.5 text-[#0B4A2B]" />
                    Event Flyer / Banner
                  </span>
                  {selectedEvent.bannerImage && (
                    <button
                      type="button"
                      onClick={handleRemoveInspectorFlyer}
                      className="text-[11px] text-rose-600 hover:underline"
                    >
                      Remove flyer
                    </button>
                  )}
                </div>

                {selectedEvent.bannerImage ? (
                  <div className="relative group border border-slate-200 rounded-lg overflow-hidden bg-slate-100">
                    <img
                      src={selectedEvent.bannerImage}
                      alt={selectedEvent.title}
                      className="w-full max-h-48 object-cover"
                    />
                    <div className="p-2 bg-white border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500">Flyer attached</span>
                      <label className="cursor-pointer px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 inline-flex items-center gap-1">
                        <Upload className="w-3 h-3 text-slate-500" />
                        <span>Change Flyer</span>
                        <input
                          ref={inspectorFileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleInspectorFlyerChange}
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="border border-dashed border-slate-300 rounded-lg p-5 text-center bg-slate-50/50 space-y-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 mx-auto flex items-center justify-center text-slate-400">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div className="text-xs text-slate-600 font-medium">No event flyer uploaded</div>
                    <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                      Upload an official flyer to display on the homepage event card and public event page.
                    </p>
                    <div>
                      <label className="cursor-pointer px-3 py-1.5 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingFlyer ? "Processing..." : "Upload Event Flyer"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleInspectorFlyerChange}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Homepage Visibility Status Card */}
              <div className="p-3 rounded-md border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-600">Homepage Visibility:</span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      selectedEvent.showOnHomepage !== false ? "text-[#0B4A2B]" : "text-slate-400"
                    }`}
                  >
                    {selectedEvent.showOnHomepage !== false ? "Visible on Homepage" : "Hidden from Homepage"}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <span className="text-[10px] text-slate-400">
                    {selectedEvent.showOnHomepage !== false
                      ? "Visitors can see and register for this event on the homepage"
                      : "Only visible on the full events calendar"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleEventHomepage(selectedEvent.id)}
                    className="px-2.5 py-1 rounded-md text-xs font-medium border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shrink-0"
                  >
                    {selectedEvent.showOnHomepage !== false ? "Hide from Homepage" : "Show on Homepage"}
                  </button>
                </div>
              </div>

              {/* Event Metadata */}
              <div className="space-y-2 text-xs divide-y divide-slate-100 text-slate-700">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Location / Platform:</span>
                  <span className="font-medium text-slate-900 text-right">{selectedEvent.location}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Attendance Type:</span>
                  <span>{selectedEvent.isVirtual ? "Virtual / Online" : "Physical In-Person"}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Registration Tariff:</span>
                  <span className="font-semibold text-slate-900">
                    {selectedEvent.fee === 0 ? "Complimentary for Members" : formatNaira(selectedEvent.fee)}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Roster Capacity:</span>
                  <span>{selectedEvent.registeredCount || 0} registered ({selectedEvent.capacity} seats max)</span>
                </div>
              </div>

              <div className="h-px bg-slate-200" />

              {/* Description */}
              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Program Brief
                </span>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Agenda Highlights */}
              {selectedEvent.agenda && selectedEvent.agenda.length > 0 && (
                <>
                  <div className="h-px bg-slate-200" />
                  <div className="space-y-2 text-xs">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Program Agenda
                    </span>
                    <div className="space-y-1.5">
                      {selectedEvent.agenda.map((item, idx) => (
                        <div key={idx} className="p-2 rounded-md border border-slate-200 text-slate-700">
                          <div className="flex justify-between font-medium text-slate-900">
                            <span>{item.topic}</span>
                            <span className="font-mono text-slate-400 text-[10px]">{item.time}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{item.speaker}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="h-px bg-slate-200" />

              {/* Controls */}
              <div className="flex items-center justify-between pt-1">
                <Link
                  href={`/events/${selectedEvent.slug}`}
                  target="_blank"
                  className="px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" /> Public Page
                </Link>

                <button
                  type="button"
                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                  className="px-2.5 py-1.5 rounded-md text-rose-600 hover:bg-rose-50 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400">Select an event from the calendar.</div>
          )}
        </div>
      </div>

      {/* Post Upcoming Event Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="max-w-xl w-full bg-white rounded-lg p-6 border border-slate-200 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <h3 className="font-heading font-bold text-base text-slate-900">
                Post Upcoming Event
              </h3>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePostEvent} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g. 2026 National Environmental Standards Summit"
                  className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                />
              </div>

              {/* Event Flyer Image Upload Section */}
              <div className="p-3 rounded-md border border-slate-200 bg-slate-50/50 space-y-2">
                <label className="block text-slate-700 font-medium">Event Flyer / Banner</label>
                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  {newEvent.bannerImage ? (
                    <div className="relative border border-slate-200 rounded-md overflow-hidden w-full sm:w-44 h-28 bg-white shrink-0">
                      <img
                        src={newEvent.bannerImage}
                        alt="Flyer preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setNewEvent({ ...newEvent, bannerImage: "" })}
                        className="absolute top-1 right-1 p-1 rounded-md bg-white/90 text-rose-600 hover:bg-white shadow-xs"
                        title="Remove flyer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-full sm:w-44 h-28 rounded-md border border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-slate-400 shrink-0 p-2 text-center">
                      <FileImage className="w-5 h-5 mb-1 text-slate-300" />
                      <span className="text-[10px] text-slate-400">No flyer selected</span>
                    </div>
                  )}

                  <div className="space-y-2 flex-1">
                    <div>
                      <label className="cursor-pointer px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium inline-flex items-center gap-1.5 transition-colors">
                        <Upload className="w-3.5 h-3.5 text-[#0B4A2B]" />
                        <span>{uploadingFlyer ? "Processing image..." : "Upload Flyer Image"}</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleModalFlyerChange}
                        />
                      </label>
                      <span className="block text-[10px] text-slate-400 mt-1">
                        Uploads JPEG, PNG, or WebP. Automatically scaled for fast loading.
                      </span>
                    </div>

                    <div className="pt-1">
                      <input
                        type="url"
                        value={newEvent.bannerImage.startsWith("data:") ? "" : newEvent.bannerImage}
                        onChange={(e) => setNewEvent({ ...newEvent, bannerImage: e.target.value })}
                        placeholder="Or paste external image URL..."
                        className="w-full px-2.5 py-1 rounded-md border border-slate-200 text-[11px] focus:outline-none focus:border-[#0B4A2B] bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Category</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B] bg-white"
                  >
                    <option value="Webinar">Technical Webinar</option>
                    <option value="Conference">National Conference / AGM</option>
                    <option value="Workshop">Safeguards Masterclass</option>
                    <option value="Chapter Event">Chapter Forum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">CPD Points</label>
                  <input
                    type="number"
                    required
                    value={newEvent.cpdPoints}
                    onChange={(e) => setNewEvent({ ...newEvent, cpdPoints: e.target.value })}
                    placeholder="e.g. 4"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Time Window</label>
                  <input
                    type="text"
                    required
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    placeholder="e.g. 10:00 AM - 01:00 PM WAT"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Location / Venue</label>
                <input
                  type="text"
                  required
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="e.g. International Conference Centre, Abuja or Zoom Link"
                  className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Delegate Fee (₦, 0 for free)</label>
                  <input
                    type="number"
                    value={newEvent.fee}
                    onChange={(e) => setNewEvent({ ...newEvent, fee: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Capacity Limit</label>
                  <input
                    type="number"
                    value={newEvent.capacity}
                    onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Summary of learning outcomes, regulatory focal points, and target audience..."
                  className="w-full p-2.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Keynote Speaker</label>
                  <input
                    type="text"
                    value={newEvent.speaker}
                    onChange={(e) => setNewEvent({ ...newEvent, speaker: e.target.value })}
                    placeholder="e.g. Dr. Amina Garba Bello"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Topic</label>
                  <input
                    type="text"
                    value={newEvent.agendaTopic}
                    onChange={(e) => setNewEvent({ ...newEvent, agendaTopic: e.target.value })}
                    placeholder="e.g. Modernizing Ecological Baselines"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>
              </div>

              {/* Homepage Visibility Checkbox */}
              <div className="p-3 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="block font-medium text-slate-800">Show on Homepage</span>
                  <span className="block text-[11px] text-slate-500">
                    Feature this event in the upcoming events section so visitors can see the flyer and register.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={newEvent.showOnHomepage}
                  onChange={(e) => setNewEvent({ ...newEvent, showOnHomepage: e.target.checked })}
                  className="w-4 h-4 text-[#0B4A2B] rounded border-slate-300 focus:ring-[#0B4A2B]"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-[#0B4A2B] text-white text-xs font-semibold hover:bg-[#08331F]"
                >
                  Publish to Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
