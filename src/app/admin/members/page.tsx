"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Download,
  X,
  Check,
} from "lucide-react";
import { MOCK_MEMBERS } from "@/lib/data/mockData";
import { Member } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [query, setQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("All");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New Member Form state
  const [newMember, setNewMember] = useState({
    fullName: "",
    email: "",
    phone: "",
    tier: "Full Member" as Member["tier"],
    zone: "North Central" as Member["zone"],
    state: "FCT Abuja",
    spesseTrack: "Track A" as Member["spesseTrack"],
    node: "Environmental Standards" as Member["node"],
    organisation: "",
    qualification: "",
  });

  const filtered = members.filter((m) => {
    const q = query.toLowerCase();
    const matchQ =
      !q ||
      m.fullName.toLowerCase().includes(q) ||
      m.membershipId.toLowerCase().includes(q) ||
      m.state.toLowerCase().includes(q);
    const matchTier =
      selectedTier === "All" ||
      m.tier.toLowerCase().includes(selectedTier.toLowerCase());
    return matchQ && matchTier;
  });

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Member = {
      id: `mem-${Date.now()}`,
      membershipId: `CESSPA-2026-${Math.floor(Math.random() * 8999 + 1000)}`,
      fullName: newMember.fullName,
      email: newMember.email,
      phone: newMember.phone,
      tier: newMember.tier,
      designation:
        newMember.tier === "Professional Fellow"
          ? "F-CESSPA"
          : newMember.tier === "Affiliate Member"
          ? "A-CESSPA"
          : "M-CESSPA",
      status: "Active",
      specialisation: ["ESIA Safeguards", "Environmental Monitoring"],
      spesseTrack: newMember.spesseTrack,
      node: newMember.node,
      zone: newMember.zone,
      state: newMember.state,
      organisation: newMember.organisation || "Independent Practice",
      qualification: newMember.qualification || "B.Sc (Hons)",
      joinedDate: new Date().toISOString().split("T")[0],
      expiryDate: "2027-10-14",
      verified: true,
      votingEligible:
        newMember.tier === "Professional Fellow" || newMember.tier === "Full Member",
    };
    setMembers([created, ...members]);
    setAddModalOpen(false);
  };

  const handleToggleVotingClearance = (id: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, votingEligible: !m.votingEligible } : m
      )
    );
    if (selectedMember && selectedMember.id === id) {
      setSelectedMember({
        ...selectedMember,
        votingEligible: !selectedMember.votingEligible,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-900 tracking-tight">
            Members Directory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Registered practitioners under Article 3 &amp; Table 1
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="px-3 py-1.5 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Enrol Member
          </button>
          <button
            type="button"
            onClick={() => alert("Exporting member ledger (CSV)...")}
            className="px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filter and Search Bar (Clean hairline layout, no box wrapping) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, ID, or state..."
            className="w-full pl-8 pr-3 py-1.5 rounded-md border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B4A2B]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 text-[11px]">Grade:</span>
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0B4A2B] bg-white"
          >
            <option value="All">All Grades</option>
            <option value="Fellow">Professional Fellow (F-CESSPA)</option>
            <option value="Full">Full Member (M-CESSPA)</option>
            <option value="Affiliate">Affiliate Member (A-CESSPA)</option>
            <option value="Student">Student Member</option>
            <option value="Corporate">Corporate Member (C-CESSPA)</option>
            <option value="Life">Life Member</option>
          </select>
        </div>
      </div>

      {/* Table: Minimalist hairline rows */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-medium">
              <th className="py-2.5 px-3">Member ID</th>
              <th className="py-2.5 px-3">Practitioner</th>
              <th className="py-2.5 px-3">Grade</th>
              <th className="py-2.5 px-3">SPESSE Track / Node</th>
              <th className="py-2.5 px-3">Chapter / State</th>
              <th className="py-2.5 px-3">Voting Rights (Art. 4)</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filtered.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50/70">
                <td className="py-3 px-3 font-mono font-medium text-[#0B4A2B]">
                  {m.membershipId}
                </td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-slate-900">{m.fullName}</div>
                  <div className="text-[11px] text-slate-400">{m.email}</div>
                </td>
                <td className="py-3 px-3">
                  <span className="font-medium text-slate-900">{m.tier}</span>
                  {m.designation && (
                    <span className="ml-1 font-mono text-[10px] text-slate-500">
                      ({m.designation})
                    </span>
                  )}
                </td>
                <td className="py-3 px-3 text-slate-600">
                  <div>{m.spesseTrack || "Track A"}</div>
                  <div className="text-[10px] text-slate-400">{m.node || "Environmental"}</div>
                </td>
                <td className="py-3 px-3">
                  <div>{m.state}</div>
                  <div className="text-[10px] text-slate-400">{m.zone}</div>
                </td>
                <td className="py-3 px-3">
                  {m.votingEligible ? (
                    <span className="text-[11px] text-[#0B4A2B] font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> Full Elective
                    </span>
                  ) : m.tier.includes("Affiliate") ? (
                    <span className="text-[11px] text-slate-600">State Level Only</span>
                  ) : (
                    <span className="text-[11px] text-slate-400">Non-Voting</span>
                  )}
                </td>
                <td className="py-3 px-3">
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                    {m.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => setSelectedMember(m)}
                    className="px-2 py-1 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-medium transition-colors"
                  >
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Member Dossier Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="max-w-md w-full bg-white rounded-lg p-6 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="font-mono text-xs text-[#0B4A2B] font-bold">
                  {selectedMember.membershipId}
                </span>
                <h3 className="font-heading font-bold text-base text-slate-900">
                  {selectedMember.fullName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600 divide-y divide-slate-100">
              <div className="flex justify-between py-1">
                <span>Grade:</span>
                <strong className="text-slate-900">{selectedMember.tier}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span>Email:</span>
                <span className="font-mono text-slate-900">{selectedMember.email}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Phone:</span>
                <span>{selectedMember.phone}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Chapter / Zone:</span>
                <span>{selectedMember.state} ({selectedMember.zone})</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Organisation:</span>
                <span>{selectedMember.organisation}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Academic Qualification:</span>
                <span>{selectedMember.qualification}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Voting Clearance (Art. 4):</span>
                <span className="font-semibold text-slate-900">
                  {selectedMember.votingEligible ? "Cleared for National & State" : "State Level Only / Observer"}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span>Dues Standing:</span>
                <span>Paid (Valid through {formatDate(selectedMember.expiryDate)})</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleToggleVotingClearance(selectedMember.id)}
                className="px-2.5 py-1.5 rounded-md border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Toggle Voting Clearance
              </button>
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="px-3.5 py-1.5 rounded-md bg-[#0B4A2B] text-white text-xs font-semibold hover:bg-[#08331F]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enrol Member Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="max-w-lg w-full bg-white rounded-lg p-6 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <h3 className="font-heading font-bold text-base text-slate-900">
                Enrol Practitioner
              </h3>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newMember.fullName}
                  onChange={(e) => setNewMember({ ...newMember, fullName: e.target.value })}
                  placeholder="e.g. Dr. Jane Alabi"
                  className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    required
                    value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                    placeholder="+234..."
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Grade</label>
                  <select
                    value={newMember.tier}
                    onChange={(e) => setNewMember({ ...newMember, tier: e.target.value as Member["tier"] })}
                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B] bg-white"
                  >
                    <option value="Professional Fellow">Professional Fellow (F-CESSPA)</option>
                    <option value="Full Member">Full Member (M-CESSPA)</option>
                    <option value="Affiliate Member">Affiliate Member (A-CESSPA)</option>
                    <option value="Student Member">Student Member</option>
                    <option value="Corporate Member">Corporate Member</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">SPESSE Track</label>
                  <select
                    value={newMember.spesseTrack}
                    onChange={(e) => setNewMember({ ...newMember, spesseTrack: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B] bg-white"
                  >
                    <option value="Track A">Track A (Short Executive Courses)</option>
                    <option value="Track B">Track B (Professional Certification)</option>
                    <option value="Track C">Track C (Postgraduate Diploma)</option>
                    <option value="Track D">Track D (Master of Science)</option>
                    <option value="Track E">Track E (Doctor of Philosophy)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">State Chapter</label>
                  <input
                    type="text"
                    required
                    value={newMember.state}
                    onChange={(e) => setNewMember({ ...newMember, state: e.target.value })}
                    placeholder="e.g. Lagos, Rivers, FCT Abuja"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Geopolitical Zone</label>
                  <select
                    value={newMember.zone}
                    onChange={(e) => setNewMember({ ...newMember, zone: e.target.value as Member["zone"] })}
                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs focus:outline-none focus:border-[#0B4A2B] bg-white"
                  >
                    <option value="North Central">North Central</option>
                    <option value="North East">North East</option>
                    <option value="North West">North West</option>
                    <option value="South East">South East</option>
                    <option value="South South">South South</option>
                    <option value="South West">South West</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-[#0B4A2B] text-white text-xs font-semibold hover:bg-[#08331F]"
                >
                  Confirm Enrolment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}