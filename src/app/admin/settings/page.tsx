"use client";

import React, { useState } from "react";
import { Settings, ShieldCheck, Building2, Key, Users, CheckCircle2 } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState({
    orgName: BRAND.fullName,
    acronym: BRAND.name,
    email: BRAND.contact.email,
    phone: BRAND.contact.phone,
    address: BRAND.contact.address,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-wider block">
          SYSTEM CONFIGURATION
        </span>
        <h1 className="font-montserrat font-extrabold text-2xl text-slate-900 uppercase mt-0.5">
          Organisation & Council Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Secretariat headquarters metadata, access governance matrix, and security policies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Org Profile (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-montserrat font-extrabold text-base text-slate-900 uppercase">
              Secretariat Metadata Profile
            </h3>
            {saved && (
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Changes Saved
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                Association Full Name
              </label>
              <input
                type="text"
                value={profile.orgName}
                onChange={(e) => setProfile({ ...profile, orgName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                  Acronym
                </label>
                <input
                  type="text"
                  value={profile.acronym}
                  onChange={(e) => setProfile({ ...profile, acronym: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold text-forest-green"
                />
              </div>
              <div>
                <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                  National Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                Secretariat Telephone Lines
              </label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-montserrat font-bold text-slate-700 uppercase mb-1">
                Secretariat Physical Headquarters Address
              </label>
              <textarea
                rows={2}
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-forest-green text-white font-montserrat font-bold text-xs uppercase hover:bg-deep-emerald shadow-xs"
            >
              Update Secretariat Metadata
            </button>
          </form>
        </div>

        {/* Roles & Security Matrix (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h4 className="font-montserrat font-extrabold text-sm text-slate-900 uppercase">
              Access Governance Matrix
            </h4>
            <div className="space-y-3 text-xs">
              {[
                { role: "Super Administrator", user: "National Secretary General", level: "Full Read / Write / Issuance" },
                { role: "Accreditation Panel Chair", user: "TWC Accreditation Lead", level: "Application Dossier Approval" },
                { role: "National Treasurer", user: "Finance Directorate", level: "Ledger Reconciliation & Invoices" },
                { role: "Editorial Officer", user: "Media & Publications Desk", level: "CMS & Bulletin Publishing" },
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl space-y-0.5 border border-slate-100">
                  <div className="flex justify-between items-center">
                    <strong className="text-slate-900">{item.role}</strong>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-[11px] text-forest-green font-medium">{item.user}</p>
                  <p className="text-[10px] text-slate-400">{item.level}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
            <span className="font-montserrat font-bold uppercase block">Statutory Audit Mode</span>
            <p>
              Administrative actions, application approvals, and certificate generation are cryptographically logged for annual report presentation to the Federal Ministry of Environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
