"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileCheck,
  CreditCard,
  Layers,
  MapPin,
  Mail,
  Award,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Briefcase,
  Calendar,
  BookOpen,
  Settings,
  LogOut,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_NAV = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Members", href: "/admin/members", icon: Users },
  { label: "Applications", href: "/admin/applications", icon: FileCheck },
  { label: "Dues & Finance", href: "/admin/payments", icon: CreditCard },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Insights & Activities", href: "/admin/content", icon: BookOpen },
  { label: "Technical Councils", href: "/admin/councils", icon: Briefcase },
  { label: "Chapters & Zones", href: "/admin/chapters", icon: MapPin },
  { label: "Certificates", href: "/admin/certificates", icon: Award },
  { label: "Communications", href: "/admin/communications", icon: Mail },
  { label: "Fee Schedule", href: "/admin/tiers", icon: Layers },
  { label: "Settings & Security", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Change password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);
  const [passLoading, setPassLoading] = useState(false);

  // Don't render admin chrome on the login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch {
      window.location.href = "/admin/login";
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    setPassSuccess(null);

    if (newPassword !== confirmPassword) {
      setPassError("New password and confirmation password do not match.");
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
        setPassError(data.error || "Failed to change password.");
        setPassLoading(false);
        return;
      }

      setPassSuccess(data.message || "Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setPasswordModalOpen(false);
        setPassSuccess(null);
      }, 2500);
    } catch {
      setPassError("Network error. Please try again.");
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-body antialiased text-slate-800">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 lg:static lg:inset-auto lg:h-screen lg:shrink-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Workspace Switcher / Header */}
          <div className="h-14 px-5 border-b border-slate-200 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-emerald-600/30 bg-white shrink-0">
                <Image
                  src="/images/brand/logo.png"
                  alt="CESSPA Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-heading font-bold text-sm tracking-tight text-slate-900">
                CESSPA Admin
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav List */}
          <div className="px-3 py-4 flex-1">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
              Management
            </div>
            <nav className="space-y-0.5">
              {ADMIN_NAV.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors",
                      isActive
                        ? "bg-slate-100 text-[#0B4A2B] font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={cn(
                          "w-4 h-4 shrink-0",
                          isActive ? "text-[#0B4A2B]" : "text-slate-400"
                        )}
                      />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Controls */}
          <div className="p-3 border-t border-slate-200 space-y-2">
            <div className="px-2 py-1 text-xs text-slate-600 flex items-center justify-between">
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-900 block truncate">
                  Secretariat Admin
                </span>
                <span className="text-[10px] text-slate-400 font-mono block truncate">
                  admin@cesspa.org.ng
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPasswordModalOpen(true)}
                className="p-1.5 text-slate-400 hover:text-[#0B4A2B] rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                title="Change Password"
              >
                <KeyRound className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-1 flex items-center gap-1.5">
              <Link
                href="/"
                className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 transition-colors"
              >
                <ExternalLink className="w-3 h-3 text-slate-400" /> Public Site
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-md border border-slate-200 hover:bg-rose-50 text-[11px] font-medium text-rose-600 transition-colors cursor-pointer"
                title="Sign out of admin console"
              >
                <LogOut className="w-3 h-3" />
                <span>Exit</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-14 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1 rounded-md text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span>CESSPA</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="font-semibold text-slate-900 capitalize">
                {pathname.replace("/admin", "").replace("/", "") || "Overview"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPasswordModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-slate-500" />
              <span>Change Password</span>
            </button>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-emerald-50 border border-emerald-200 text-[#0B4A2B] text-xs font-bold flex items-center justify-center">
                SA
              </span>
              <div className="hidden md:block text-left">
                <span className="text-xs font-semibold text-slate-800 block leading-tight">
                  Secretariat Admin
                </span>
                <span className="text-[10px] text-slate-400 font-mono block leading-tight">
                  admin@cesspa.org.ng
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">{children}</main>
      </div>

      {/* Change Password Modal */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="max-w-md w-full bg-white rounded-lg p-6 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900">
                  Change Admin Password
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update your authentication credentials for the administrative portal.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPasswordModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
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
                    placeholder="Enter current password"
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

              <div>
                <label className="block text-slate-700 font-medium mb-1">New Password (min. 8 characters)</label>
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

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passLoading}
                  className="px-4 py-1.5 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] text-white font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-70"
                >
                  {passLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <span>Update Password</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
