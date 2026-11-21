"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ShieldCheck,
  MapPin,
  Briefcase,
  LayoutGrid,
  List,
  X,
  Mail,
  Phone,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { MOCK_MEMBERS } from "@/lib/data/mockData";
import { Member } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const TIER_FILTERS = ["All", "Fellow", "Certified Professional", "Associate", "Student"];

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filteredMembers = MOCK_MEMBERS.filter((m) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      m.fullName.toLowerCase().includes(q) ||
      m.membershipId.toLowerCase().includes(q) ||
      m.state.toLowerCase().includes(q) ||
      m.specialisation.some((s) => s.toLowerCase().includes(q));

    const matchesTier = tierFilter === "All" || m.tier.includes(tierFilter);
    return matchesQuery && matchesTier;
  });

  return (
    <div className="w-full">
      <section className="bg-forest-green text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Eyebrow chip="REGISTRY" lightMode={true}>
            PUBLIC VERIFICATION & EXPERT DIRECTORY
          </Eyebrow>
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white uppercase mt-2 max-w-3xl">
            Find a Certified E&S Professional
          </h1>
          <p className="text-sm sm:text-base text-sage-mist/90 max-w-2xl mt-4 leading-relaxed">
            Verify accredited safeguards practitioners, ESIA team leads, and resettlement auditors across Nigeria's 36 states and FCT Abuja.
          </p>
        </div>
      </section>

      <Section variant="ivory">
        {/* Controls Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tier Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {TIER_FILTERS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setTierFilter(cat)}
                className={`px-3.5 py-2 rounded-xl font-montserrat font-bold text-xs uppercase tracking-wider transition-all ${
                  tierFilter === cat
                    ? "bg-forest-green text-white shadow-md ring-2 ring-heritage-gold"
                    : "bg-white text-ink-body border border-brand-border hover:border-forest-green"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar & Grid/List Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, state, skill..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-forest-green bg-white"
              />
            </div>

            <div className="flex items-center bg-white border border-brand-border rounded-xl p-1 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-forest-green text-white" : "text-ink-muted hover:text-ink-dark"
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-forest-green text-white" : "text-ink-muted hover:text-ink-dark"
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Members Grid / List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="rounded-3xl p-6 bg-white border border-brand-border shadow-xs card-hover cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-heritage-gold/50 bg-sage-mist flex items-center justify-center font-montserrat font-extrabold text-forest-green text-lg">
                      {member.fullName.charAt(0)}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-montserrat font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-leaf-green" /> Verified
                    </span>
                  </div>

                  <div>
                    <h3 className="font-montserrat font-bold text-base text-ink-dark leading-snug">
                      {member.fullName}
                    </h3>
                    <p className="font-mono text-[11px] text-forest-green font-semibold mt-0.5">
                      {member.membershipId}
                    </p>
                    <span className="text-xs text-heritage-gold font-semibold uppercase tracking-wider block mt-1">
                      {member.tier}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-ink-muted">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-forest-green shrink-0" />
                      <span>{member.state}, {member.zone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 line-clamp-1">
                      <Briefcase className="w-3.5 h-3.5 text-forest-green shrink-0" />
                      <span>{member.organisation}</span>
                    </div>
                  </div>

                  {/* Specialisations Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {member.specialisation.slice(0, 2).map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded bg-sage-mist/70 border border-brand-border/60 text-[10px] text-ink-body"
                      >
                        {s}
                      </span>
                    ))}
                    {member.specialisation.length > 2 && (
                      <span className="px-1.5 py-0.5 rounded bg-sage-mist/70 text-[10px] text-ink-muted">
                        +{member.specialisation.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-brand-border/60 text-right">
                  <span className="font-montserrat font-bold text-xs text-forest-green hover:underline">
                    View Verified Profile →
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-3">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-brand-border shadow-xs card-hover cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-forest-green text-white flex items-center justify-center font-montserrat font-extrabold text-base shrink-0">
                    {member.fullName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-montserrat font-bold text-base text-ink-dark">
                        {member.fullName}
                      </h3>
                      <ShieldCheck className="w-4 h-4 text-leaf-green" />
                    </div>
                    <p className="text-xs text-forest-green font-semibold">
                      {member.membershipId} • {member.tier}
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {member.state} • {member.organisation}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="font-montserrat font-bold text-xs text-forest-green">
                    View Credentials →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Profile Detail Drawer Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-green/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-brand-border space-y-6">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-ink-muted hover:text-ink-dark hover:bg-sage-mist"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-forest-green text-white flex items-center justify-center font-montserrat font-extrabold text-2xl shrink-0 ring-4 ring-heritage-gold/30">
                {selectedMember.fullName.charAt(0)}
              </div>
              <div>
                <span className="text-[10px] font-montserrat font-bold text-heritage-gold uppercase tracking-widest block">
                  CESSPA NATIONAL REGISTRY
                </span>
                <h3 className="font-montserrat font-extrabold text-xl text-ink-dark">
                  {selectedMember.fullName}
                </h3>
                <p className="font-mono text-xs font-bold text-forest-green">
                  {selectedMember.membershipId}
                </p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-montserrat font-bold bg-sage-mist text-forest-green border border-brand-border">
                  {selectedMember.tier}
                </span>
              </div>
            </div>

            {/* Bio excerpt */}
            {selectedMember.bio && (
              <p className="text-xs sm:text-sm text-ink-body leading-relaxed bg-ivory p-4 rounded-2xl border border-brand-border/60">
                {selectedMember.bio}
              </p>
            )}

            {/* Verification Metadata */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-sage-mist/40 space-y-0.5">
                <span className="text-ink-muted text-[10px]">Geopolitical Zone:</span>
                <p className="font-bold text-ink-dark">{selectedMember.zone} ({selectedMember.state})</p>
              </div>
              <div className="p-3 rounded-xl bg-sage-mist/40 space-y-0.5">
                <span className="text-ink-muted text-[10px]">Academic Credential:</span>
                <p className="font-bold text-ink-dark">{selectedMember.qualification}</p>
              </div>
              <div className="p-3 rounded-xl bg-sage-mist/40 space-y-0.5">
                <span className="text-ink-muted text-[10px]">Registered Entity:</span>
                <p className="font-bold text-ink-dark">{selectedMember.organisation}</p>
              </div>
              <div className="p-3 rounded-xl bg-sage-mist/40 space-y-0.5">
                <span className="text-ink-muted text-[10px]">Standing Status:</span>
                <p className="font-bold text-emerald-700">Certified Active Practitioner</p>
              </div>
            </div>

            {/* Specialisations */}
            <div>
              <span className="text-[10px] font-montserrat font-bold text-ink-dark uppercase tracking-wider block mb-1.5">
                Accredited Safeguard Specialisations:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedMember.specialisation.map((spec) => (
                  <span
                    key={spec}
                    className="px-2.5 py-1 rounded-lg bg-forest-green/10 text-forest-green text-xs font-semibold"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Seal Verification */}
            <div className="pt-4 border-t border-brand-border flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-leaf-green font-medium">
                <ShieldCheck className="w-4 h-4" /> Verified CESSPA Certified Practitioner
              </span>
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 rounded-xl bg-forest-green text-white font-montserrat font-bold text-xs uppercase"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
