"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  ShieldCheck,
  MoreVertical,
  X,
  Mail,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { MOCK_MEMBERS } from "@/lib/data/mockData";
import { Member, MembershipStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [query, setQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("All");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New Member Form
  const [newMember, setNewMember] = useState({
    fullName: "",
    email: "",
    phone: "",
    tier: "Certified Professional" as Member["tier"],
    zone: "North Central" as Member["zone"],
    state: "FCT Abuja",
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
    const matchTier = selectedTier === "All" || m.tier.includes(selectedTier);
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
      status: "Active",
      specialisation: ["ESIA Safeguards", "Environmental Monitoring"],
      zone: newMember.zone,
      state: newMember.state,
      organisation: newMember.organisation || "Independent Practice",
      qualification: newMember.qualification || "B.Sc (Hons)",
      joinedDate: new Date().toISOString().split("T")[0],
      expiryDate: "2027-10-14",
      verified: true,
    };
    setMembers([created, ...members]);
    setAddModalOpen(false);
    alert(`Member ${created.fullName} enrolled with ID ${created.membershipId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-wider block">
            REGISTRY MANAGEMENT
          </span>
          <h1 className="font-montserrat font-extrabold text-2xl text-slate-900 uppercase mt-0.5">
            Registered Practitioners
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Total of {members.length} records in this administrative partition.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Practitioner
          </button>
          <button
            type="button"
            onClick={() => alert("Exporting Member Directory to CSV...")}
            className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-montserrat font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, ID, or state..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-forest-green"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 font-montserrat font-bold uppercase">Filter:</span>
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-forest-green bg-white"
          >
            <option value="All">All Categories</option>
            <option value="Certified Professional">Certified Professional</option>
            <option value="Fellow">Fellow</option>
            <option value="Associate">Associate</option>
            <option value="Student">Student</option>
          </select>
        </div>
      </div>

      {/* Members Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-montserrat uppercase text-[10px]">
                <th className="py-3 px-4">Member ID</th>
                <th className="py-3 px-4">Practitioner Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Zone / State</th>
                <th className="py-3 px-4">Organisation</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-mono font-bold text-forest-green">
                    {m.membershipId}
                  </td>
                  <td className="py-3.5 px-4">
                    <strong className="text-slate-900 block">{m.fullName}</strong>
                    <span className="text-[11px] text-slate-400">{m.email}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium">{m.tier}</td>
                  <td className="py-3.5 px-4">{m.state}, {m.zone}</td>
                  <td className="py-3.5 px-4 text-slate-500 max-w-[180px] truncate">{m.organisation}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedMember(m)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-forest-green hover:text-white font-montserrat font-bold text-[10px] uppercase transition-colors"
                    >
                      Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Dossier Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-forest-green">
                  {selectedMember.membershipId}
                </span>
                <h3 className="font-montserrat font-extrabold text-lg text-slate-900">
                  {selectedMember.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Category:</span>
                <strong className="text-slate-900">{selectedMember.tier}</strong>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span className="font-mono">{selectedMember.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone:</span>
                <span>{selectedMember.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Geopolitical Zone:</span>
                <span>{selectedMember.zone} ({selectedMember.state})</span>
              </div>
              <div className="flex justify-between">
                <span>Organisation:</span>
                <span>{selectedMember.organisation}</span>
              </div>
              <div className="flex justify-between">
                <span>Qualification:</span>
                <span>{selectedMember.qualification}</span>
              </div>
              <div className="flex justify-between">
                <span>Cycle Expiry:</span>
                <span>{formatDate(selectedMember.expiryDate)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Standing Valid
              </span>
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 rounded-xl bg-forest-green text-white font-montserrat font-bold text-xs uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <h3 className="font-montserrat font-extrabold text-xl text-slate-900 uppercase">
                Enroll New Practitioner
              </h3>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-3 text-xs">
              <div>
                <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                  Full Name (Surname First) *
                </label>
                <input
                  type="text"
                  required
                  value={newMember.fullName}
                  onChange={(e) => setNewMember({ ...newMember, fullName: e.target.value })}
                  placeholder="e.g. Bello Sani Haruna"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green"
                  />
                </div>
                <div>
                  <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={newMember.tier}
                    onChange={(e) => setNewMember({ ...newMember, tier: e.target.value as Member["tier"] })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green bg-white"
                  >
                    <option value="Certified Professional">Certified Professional</option>
                    <option value="Fellow">Fellow</option>
                    <option value="Associate">Associate</option>
                    <option value="Student">Student</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
                <div>
                  <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                    Geopolitical Zone
                  </label>
                  <select
                    value={newMember.zone}
                    onChange={(e) => setNewMember({ ...newMember, zone: e.target.value as Member["zone"] })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green bg-white"
                  >
                    <option value="North Central">North Central</option>
                    <option value="South West">South West</option>
                    <option value="South South">South South</option>
                    <option value="South East">South East</option>
                    <option value="North West">North West</option>
                    <option value="North East">North East</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest-green text-white font-montserrat font-bold uppercase hover:bg-deep-emerald"
                >
                  Enroll Practitioner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
