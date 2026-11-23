"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  X,
  Trash2,
  Eye,
  Globe,
  Upload,
  Camera,
  Edit3,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import {
  PastEventPhoto,
  INITIAL_PAST_EVENT_PHOTOS,
  getStoredPastEventPhotos,
  savePastEventPhotos,
  getHomepagePastEventsEnabled,
  setHomepagePastEventsEnabled,
  PAST_EVENTS_UPDATED_EVENT,
} from "@/lib/data/pastEventsGallery";

// Client-side image compression helper to keep localStorage fast and prevent storage limit errors
function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxW = 1200;
        const scale = Math.min(1, maxW / img.width);
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error("Failed to process image."));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
}

export function PastEventsManager() {
  const [photos, setPhotos] = useState<PastEventPhoto[]>(INITIAL_PAST_EVENT_PHOTOS);
  const [selectedPhoto, setSelectedPhoto] = useState<PastEventPhoto | null>(null);
  const [homepageGlobalEnabled, setHomepageGlobalEnabledState] = useState(true);
  const [query, setQuery] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<PastEventPhoto | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [inspectorUploading, setInspectorUploading] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const inspectorFileInputRef = useRef<HTMLInputElement>(null);

  // New Event Form State
  const [newPhoto, setNewPhoto] = useState({
    title: "",
    date: "November 2026",
    location: "Abuja, Nigeria",
    image: "",
    caption: "",
    showOnHomepage: true,
  });

  // Edit inspector state
  const [editForm, setEditForm] = useState<PastEventPhoto | null>(null);

  const refreshData = () => {
    const stored = getStoredPastEventPhotos();
    setPhotos(stored);
    setHomepageGlobalEnabledState(getHomepagePastEventsEnabled());
    if (stored.length > 0 && !selectedPhoto) {
      setSelectedPhoto(stored[0]);
      setEditForm(stored[0]);
    }
  };

  useEffect(() => {
    refreshData();

    const handleUpdate = () => {
      refreshData();
    };

    window.addEventListener(PAST_EVENTS_UPDATED_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(PAST_EVENTS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  useEffect(() => {
    if (selectedPhoto) {
      setEditForm(selectedPhoto);
    }
  }, [selectedPhoto]);

  // Handle global toggle for homepage gallery
  const handleToggleGlobalHomepage = () => {
    const nextState = !homepageGlobalEnabled;
    setHomepageGlobalEnabledState(nextState);
    setHomepagePastEventsEnabled(nextState);
  };

  // Handle single photo homepage toggle
  const handleTogglePhotoHomepage = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = photos.map((item) => {
      if (item.id === id) {
        const currentVal = item.showOnHomepage !== false;
        return { ...item, showOnHomepage: !currentVal };
      }
      return item;
    });
    setPhotos(updated);
    savePastEventPhotos(updated);

    if (selectedPhoto?.id === id) {
      const refreshed = { ...selectedPhoto, showOnHomepage: selectedPhoto.showOnHomepage === false };
      setSelectedPhoto(refreshed);
      setEditForm(refreshed);
    }
  };

  // Handle upload for new event modal
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingImage(true);
      const compressed = await compressImage(file);
      setNewPhoto((prev) => ({ ...prev, image: compressed }));
    } catch {
      alert("Failed to read image file. Please try a different JPEG or PNG.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle replace image in inspector
  const handleInspectorFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editForm) return;
    try {
      setInspectorUploading(true);
      const compressed = await compressImage(file);
      const updatedItem = { ...editForm, image: compressed };
      setEditForm(updatedItem);
      setSelectedPhoto(updatedItem);

      const updatedList = photos.map((p) => (p.id === editForm.id ? updatedItem : p));
      setPhotos(updatedList);
      savePastEventPhotos(updatedList);
      showNotice();
    } catch {
      alert("Failed to process image.");
    } finally {
      setInspectorUploading(false);
    }
  };

  const showNotice = () => {
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 2500);
  };

  // Handle saving changes in inspector
  const handleSaveInspector = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    const updatedList = photos.map((p) => (p.id === editForm.id ? editForm : p));
    setPhotos(updatedList);
    savePastEventPhotos(updatedList);
    setSelectedPhoto(editForm);
    showNotice();
  };

  // Handle submit new event
  const handleCreatePastEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.title.trim()) {
      alert("Please provide a title or brief headline for this photo.");
      return;
    }
    if (!newPhoto.image.trim()) {
      alert("Please upload a photograph or provide an image URL.");
      return;
    }

    const created: PastEventPhoto = {
      id: `past-evt-${Date.now()}`,
      title: newPhoto.title.trim(),
      date: newPhoto.date.trim() || undefined,
      location: newPhoto.location.trim() || undefined,
      image: newPhoto.image,
      caption: newPhoto.caption.trim() || newPhoto.title.trim(),
      showOnHomepage: newPhoto.showOnHomepage,
    };

    const nextList = [created, ...photos];
    setPhotos(nextList);
    savePastEventPhotos(nextList);
    setSelectedPhoto(created);
    setEditForm(created);
    setCreateModalOpen(false);

    // Reset form
    setNewPhoto({
      title: "",
      date: "November 2026",
      location: "Abuja, Nigeria",
      image: "",
      caption: "",
      showOnHomepage: true,
    });
  };

  // Handle delete past event
  const handleDeletePastEvent = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm("Are you sure you want to remove this photo from the gallery?")) return;

    const nextList = photos.filter((p) => p.id !== id);
    setPhotos(nextList);
    savePastEventPhotos(nextList);

    if (selectedPhoto?.id === id) {
      const nextSelected = nextList[0] || null;
      setSelectedPhoto(nextSelected);
      setEditForm(nextSelected);
    }
  };

  // Filtered photos by search query
  const filtered = photos.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      (p.location && p.location.toLowerCase().includes(q)) ||
      p.caption.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Sub-Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="font-heading font-bold text-xl text-slate-900 tracking-tight flex items-center gap-2">
            <Camera className="w-5 h-5 text-forest-green" />
            Past Events &amp; Photo Gallery
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Simple gallery updating tool: upload event photos and write descriptions to update the homepage and archive gallery.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Global Homepage Section Toggle */}
          <button
            type="button"
            onClick={handleToggleGlobalHomepage}
            title="Toggle whether the past events gallery is shown on the homepage"
            className={`px-3 py-1.5 rounded-md border text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer ${
              homepageGlobalEnabled
                ? "border-emerald-300 bg-emerald-50 text-forest-green hover:bg-emerald-100"
                : "border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-forest-green" />
            <span>Homepage Gallery:</span>
            <span className="font-semibold">{homepageGlobalEnabled ? "Visible" : "Hidden"}</span>
            <span
              className={`w-2 h-2 rounded-full ${homepageGlobalEnabled ? "bg-emerald-600" : "bg-slate-400"}`}
            />
          </button>

          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="px-3.5 py-1.5 rounded-md bg-forest-green hover:bg-deep-emerald text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Add Gallery Photo
          </button>
        </div>
      </div>

      {/* Simple Search Row */}
      <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gallery photos by title or description..."
            className="w-full pl-8 pr-3 py-1.5 rounded-md border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-forest-green"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium ml-auto">
          {filtered.length} photo{filtered.length === 1 ? "" : "s"} in gallery
        </div>
      </div>

      {/* Main Grid: List on Left (7 cols), Selected Inspector on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Photo List */}
        <div className="lg:col-span-7 space-y-3">
          {filtered.length === 0 ? (
            <div className="p-8 text-center rounded-xl border border-dashed border-slate-300 text-slate-500 text-xs">
              No gallery photos match your search.
            </div>
          ) : (
            filtered.map((item) => {
              const isSelected = selectedPhoto?.id === item.id;
              const isShown = item.showOnHomepage !== false;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedPhoto(item)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex gap-4 items-start ${
                    isSelected
                      ? "border-forest-green/60 bg-emerald-50/40 shadow-xs"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-24 h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  {/* Information */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {item.title}
                      </h4>
                      <button
                        type="button"
                        onClick={(e) => handleTogglePhotoHomepage(item.id, e)}
                        title={isShown ? "Shown on homepage gallery (click to hide)" : "Hidden from homepage gallery (click to show)"}
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold transition-colors cursor-pointer shrink-0 ${
                          isShown
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {isShown ? "Homepage: Visible" : "Homepage: Hidden"}
                      </button>
                    </div>

                    {(item.location || item.date) && (
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        {item.location && (
                          <span className="flex items-center gap-1 truncate max-w-[150px]">
                            <MapPin className="w-3 h-3 text-forest-green shrink-0" />
                            <span className="truncate">{item.location}</span>
                          </span>
                        )}
                        {item.location && item.date && <span>•</span>}
                        {item.date && (
                          <span className="flex items-center gap-1 shrink-0">
                            <Calendar className="w-3 h-3 text-forest-green shrink-0" />
                            {item.date}
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Selected Past Event Inspector */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 space-y-5 sticky top-6 shadow-xs">
          {editForm ? (
            <form onSubmit={handleSaveInspector} className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-heading font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Edit3 className="w-4 h-4 text-forest-green" /> Edit Photo Details
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setLightboxPhoto(editForm)}
                    title="View full size photo"
                    className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDeletePastEvent(editForm.id, e)}
                    title="Delete this photo"
                    className="p-1.5 rounded-md hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {saveSuccessNotice && (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Changes saved successfully to live gallery!</span>
                </div>
              )}

              {/* Image Preview & Replace */}
              <div>
                <label className="block text-slate-700 font-medium mb-1.5">Photograph</label>
                <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
                  <Image
                    src={editForm.image}
                    alt={editForm.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => inspectorFileInputRef.current?.click()}
                      disabled={inspectorUploading}
                      className="px-3 py-1.5 rounded-lg bg-white/95 text-slate-800 text-xs font-semibold hover:bg-white flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      {inspectorUploading ? "Processing..." : "Replace Image"}
                    </button>
                  </div>
                </div>
                <input
                  ref={inspectorFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleInspectorFileSelect}
                  className="hidden"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-slate-700 font-medium mb-1">Photo Title / Headline</label>
                <input
                  type="text"
                  required
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-forest-green"
                />
              </div>

              {/* Detailed Description / Caption */}
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Description / Caption
                </label>
                <textarea
                  rows={4}
                  required
                  value={editForm.caption}
                  onChange={(e) => setEditForm({ ...editForm, caption: e.target.value })}
                  placeholder="Detailed description of the event, attendees, and discussions..."
                  className="w-full p-2.5 rounded-md border border-slate-200 text-xs text-slate-900 leading-relaxed focus:outline-none focus:border-forest-green"
                />
              </div>

              {/* Optional Date & Location */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Date (Optional)</label>
                  <input
                    type="text"
                    value={editForm.date || ""}
                    onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                    placeholder="e.g. November 2026"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-forest-green"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Location (Optional)</label>
                  <input
                    type="text"
                    value={editForm.location || ""}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    placeholder="e.g. Abuja, Nigeria"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              {/* Show on Homepage Toggle */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="block font-semibold text-slate-800 text-xs">Show on Homepage Gallery</span>
                  <span className="block text-[11px] text-slate-500">
                    Feature this photo in the homepage past events carousel
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={editForm.showOnHomepage !== false}
                  onChange={(e) => setEditForm({ ...editForm, showOnHomepage: e.target.checked })}
                  className="w-4 h-4 text-forest-green rounded border-slate-300 focus:ring-forest-green cursor-pointer"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-forest-green hover:bg-deep-emerald text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Save Photo Details
                </button>
              </div>
            </form>
          ) : (
            <div className="p-10 text-center text-slate-400 text-xs">
              Select a photo from the list to view and edit its details.
            </div>
          )}
        </div>
      </div>

      {/* Upload Past Event Modal */}
      {createModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in"
        >
          <div className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50 shrink-0">
              <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
                <Camera className="w-4 h-4 text-forest-green" /> Add Photo to Gallery
              </h3>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePastEvent} className="p-6 space-y-4 overflow-y-auto text-xs">
              {/* Image Upload Dropzone */}
              <div>
                <label className="block text-slate-700 font-medium mb-1.5">
                  Photograph <span className="text-red-500">*</span>
                </label>
                {newPhoto.image ? (
                  <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
                    <Image
                      src={newPhoto.image}
                      alt="Uploaded preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg bg-white text-slate-800 font-semibold text-xs shadow-md cursor-pointer"
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-forest-green rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-emerald-50/20"
                  >
                    <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="font-semibold text-slate-700">Click to upload photo from device</p>
                    <p className="text-[11px] text-slate-400 mt-1">JPEG, PNG or WEBP (auto-compressed)</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* Direct URL input fallback */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 shrink-0">Or image URL / path:</span>
                  <input
                    type="text"
                    value={newPhoto.image}
                    onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.value })}
                    placeholder="/images/visits/example.jpg or https://..."
                    className="flex-1 px-2.5 py-1 rounded border border-slate-200 text-[11px] text-slate-700 focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Title / Headline <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  placeholder="e.g. Courtesy Visit to NESREA Headquarters"
                  className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-forest-green"
                />
              </div>

              {/* Detailed Description / Caption */}
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Description / Caption <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={newPhoto.caption}
                  onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                  placeholder="Detail description of the visit, attendees, or event highlights..."
                  className="w-full p-2.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-forest-green leading-relaxed"
                />
              </div>

              {/* Optional Date & Location */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Date (Optional)</label>
                  <input
                    type="text"
                    value={newPhoto.date}
                    onChange={(e) => setNewPhoto({ ...newPhoto, date: e.target.value })}
                    placeholder="e.g. November 2026"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-forest-green"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Location (Optional)</label>
                  <input
                    type="text"
                    value={newPhoto.location}
                    onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                    placeholder="e.g. NESREA Headquarters, Abuja"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              {/* Show on Homepage Toggle */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="block font-semibold text-slate-800 text-xs">Display in Homepage Gallery</span>
                  <span className="block text-[11px] text-slate-500">
                    Immediately feature this photo on the homepage carousel
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={newPhoto.showOnHomepage}
                  onChange={(e) => setNewPhoto({ ...newPhoto, showOnHomepage: e.target.checked })}
                  className="w-4 h-4 text-forest-green rounded border-slate-300 focus:ring-forest-green cursor-pointer"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="px-4 py-1.5 rounded-md bg-forest-green text-white text-xs font-semibold hover:bg-deep-emerald transition-colors cursor-pointer"
                >
                  {uploadingImage ? "Processing..." : "Publish to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs animate-in fade-in"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-white">
              <span className="text-xs font-bold text-slate-800 truncate">
                {lightboxPhoto.title}
              </span>
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                className="p-1 rounded-md text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-16/10 w-full bg-black">
              <Image
                src={lightboxPhoto.image}
                alt={lightboxPhoto.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-5 bg-white space-y-2">
              {(lightboxPhoto.location || lightboxPhoto.date) && (
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  {lightboxPhoto.location && (
                    <span className="flex items-center gap-1 font-semibold text-forest-green">
                      <MapPin className="w-3.5 h-3.5" />
                      {lightboxPhoto.location}
                    </span>
                  )}
                  {lightboxPhoto.location && lightboxPhoto.date && <span>•</span>}
                  {lightboxPhoto.date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {lightboxPhoto.date}
                    </span>
                  )}
                </div>
              )}
              <h3 className="font-heading font-extrabold text-base text-slate-900">
                {lightboxPhoto.title}
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                {lightboxPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
