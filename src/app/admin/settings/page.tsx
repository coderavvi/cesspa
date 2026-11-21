"use client";

import React, { useState } from "react";
import {
  Settings,
  ShieldCheck,
  Building2,
  KeyRound,
  Users,
  CheckCircle2,
  Loader2,
  RotateCcw,
  Eye,
  EyeOff,
} from "lucide-react";
import { BRAND } from "@/lib/constants";
import { DEFAULT_CREDENTIALS, DEFAULT_PASSWORD_DISPLAY } from "@/lib/auth/constants";

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState({
    orgName: BRAND.fullName,
    acronym: BRAND.name,
    email: BRAND.contact.email,
    phone: BRAND.contact.phone,
    address: BRAND.contact.address,
  });

  const [saved, setSaved] = useState(false);

  // Change password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);

  const handleSaveMetadata = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    setPassSuccess(null);

    if (newPassword !== confirmPassword) {
      setPassError("New password and confirmation do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setPassError("New password must be at least 8 characters long.");
      return;
    }

    try {
      setPassLoading(true);
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPassError(data.error || "Failed to update password.");
        setPassLoading(false);
        return;
      }

      setPassSuccess(data.message || "Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setPassError("Network error. Please try again.");
    } finally {
      setPassLoading(false);
    }
  };

  const handleResetDemoPassword = async () => {
    if (!confirm("Reset demo password back to default (Admin@2026!)?")) return;
    try {
      setResetting(true);
      setPassError(null);
      const res = await fetch("/api/admin/reset-password", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setPassSuccess(`Demo password reset to default: ${DEFAULT_PASSWORD_DISPLAY}`);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPassError(data.error || "Failed to reset password.");
      }
    } catch {
      setPassError("Network error while resetting password.");
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="font-heading font-bold text-2xl text-slate-900 tracking-tight">
          Settings &amp; Access Governance
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Secretariat organizational metadata, admin credentials, and access security policies
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Security & Credentials + Metadata (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Admin Credentials & Password Management */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#0B4A2B]" />
                  <span>Admin Credentials &amp; Security</span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Manage the password used to access the secretariat administration console.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetDemoPassword}
                disabled={resetting}
                className="px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-600 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Reset demo credentials to Admin@2026!"
              >
                <RotateCcw className={`w-3 h-3 ${resetting ? "animate-spin" : ""}`} />
                <span>Reset Demo Password</span>
              </button>
            </div>

            {/* Current Active Account Info */}
            <div className="p-3 rounded-md bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Logged In Account</span>
                <span className="font-semibold text-slate-900">{DEFAULT_CREDENTIALS.email}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Access Tier</span>
                <span className="font-semibold text-[#0B4A2B]">{DEFAULT_CREDENTIALS.role}</span>
              </div>
            </div>

            {passError && (
              <div className="p-2.5 rounded-md bg-rose-50 border border-rose-200 text-xs text-rose-800">
                {passError}
              </div>
            )}

            {passSuccess && (
              <div className="p-2.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{passSuccess}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter existing password"
                    className="w-full pl-3 pr-9 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-[#0B4A2B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">New Password (min. 8 chars)</label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full pl-3 pr-9 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-[#0B4A2B]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full px-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-[#0B4A2B]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={passLoading}
                  className="px-4 py-2 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] text-white font-semibold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-70"
                >
                  {passLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Updating Password...</span>
                    </>
                  ) : (
                    <span>Update Admin Password</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Org Profile Metadata */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-heading font-bold text-sm text-slate-900">
                  Secretariat Metadata Profile
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Official contact information and national headquarters address.
                </p>
              </div>
              {saved && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Saved
                </span>
              )}
            </div>

            <form onSubmit={handleSaveMetadata} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Association Full Name
                </label>
                <input
                  type="text"
                  value={profile.orgName}
                  onChange={(e) => setProfile({ ...profile, orgName: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-md border border-slate-200 focus:outline-none focus:border-[#0B4A2B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    Acronym
                  </label>
                  <input
                    type="text"
                    value={profile.acronym}
                    onChange={(e) => setProfile({ ...profile, acronym: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 font-bold text-[#0B4A2B]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    National Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Telephone Numbers
                </label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-md border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Secretariat Physical Address
                </label>
                <textarea
                  rows={2}
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="w-full p-2.5 rounded-md border border-slate-200 focus:outline-none focus:border-[#0B4A2B]"
                />
              </div>

              <div className="pt-1 flex items-center justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-[#0B4A2B] text-white font-semibold text-xs hover:bg-[#08331F] transition-colors cursor-pointer"
                >
                  Update Metadata
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Roles & Security Matrix (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-xs space-y-4">
            <h4 className="font-heading font-bold text-sm text-slate-900">
              Access Governance Matrix
            </h4>
            <div className="space-y-2.5 text-xs">
              {[
                { role: "Super Administrator", user: "National Secretariat Admin", level: "Full Read / Write / Issuance" },
                { role: "Accreditation Lead", user: "TWC Accreditation Desk", level: "Application Dossier Approval" },
                { role: "National Treasurer", user: "Finance Directorate", level: "Ledger Reconciliation & Invoices" },
                { role: "Editorial Officer", user: "Media & Publications Desk", level: "Insights & Activity Publishing" },
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-md space-y-0.5 border border-slate-100">
                  <div className="flex justify-between items-center">
                    <strong className="text-slate-900">{item.role}</strong>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-[11px] text-[#0B4A2B] font-medium">{item.user}</p>
                  <p className="text-[10px] text-slate-400">{item.level}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs space-y-1">
            <span className="font-semibold text-slate-900 block">Statutory Audit Logging</span>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Administrative actions, application reviews, and credential updates are cryptographically signed and logged for the annual secretariat report.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
