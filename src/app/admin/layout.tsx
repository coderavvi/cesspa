"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileCheck,
  CreditCard,
  Layers,
  Calendar,
  MapPin,
  BookOpen,
  Mail,
  Award,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  LogOut,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Members", href: "/admin/members", icon: Users },
  { label: "Applications", href: "/admin/applications", icon: FileCheck },
  { label: "Payments & Dues", href: "/admin/payments", icon: CreditCard },
  { label: "Membership Tiers", href: "/admin/tiers", icon: Layers },
  { label: "Events & CPD", href: "/admin/events", icon: Calendar },
  { label: "Chapters (6 Zones)", href: "/admin/chapters", icon: MapPin },
  { label: "Content & News", href: "/admin/content", icon: BookOpen },
  { label: "Communications", href: "/admin/communications", icon: Mail },
  { label: "Certificates", href: "/admin/certificates", icon: Award },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans antialiased">
      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-forest-green text-sage-mist flex flex-col justify-between transition-transform duration-300 shadow-2xl lg:translate-x-0 lg:static lg:inset-auto lg:h-screen lg:shrink-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Sidebar Top: Logo & Exit to Site */}
          <div className="p-6 border-b border-sage-mist/15 flex items-center justify-between">
            <Logo variant="full" size="sm" lightMode={true} />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-lg text-sage-mist hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 py-3">
            <span className="text-[10px] font-montserrat font-bold text-heritage-gold-soft uppercase tracking-widest block">
              COUNCIL ADMIN CONSOLE
            </span>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-4 py-2 space-y-1">
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
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-montserrat font-semibold text-xs tracking-wide transition-all relative",
                    isActive
                      ? "bg-deep-emerald text-white shadow-xs font-bold border-l-4 border-heritage-gold"
                      : "text-sage-mist/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0",
                      isActive ? "text-heritage-gold" : "text-sage-mist/60"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer User & Exit Link */}
          <div className="p-4 border-t border-sage-mist/15 space-y-3">
            <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 rounded-full bg-heritage-gold text-forest-green font-montserrat font-extrabold text-xs flex items-center justify-center shrink-0">
                AD
              </div>
              <div className="leading-tight overflow-hidden">
                <span className="font-montserrat font-bold text-xs text-white block truncate">
                  Admin Secretariat
                </span>
                <span className="text-[10px] text-sage-mist/70 truncate block">
                  secretariat@cesspa.org.ng
                </span>
              </div>
            </div>

            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-montserrat font-semibold text-sage-mist transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Return to Public Portal
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Admin Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-forest-green hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb representation */}
            <div className="flex items-center gap-2 text-xs font-montserrat font-medium text-slate-500">
              <Link href="/admin" className="hover:text-forest-green">CESSPA Admin</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-bold text-slate-800 capitalize">
                {pathname.replace("/admin", "").replace("/", "") || "Dashboard"}
              </span>
            </div>
          </div>

          {/* Top Actions: Search, Notifications, Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-400 hover:border-forest-green transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search records...</span>
              <kbd className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => alert("Notification: 3 new membership applications awaiting council evaluation.")}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
            </button>

            <div className="h-6 w-px bg-slate-200" />

            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" /> Super Admin
              </span>
            </div>
          </div>
        </header>

        {/* Admin Content Area */}
        <main className="p-4 sm:p-8 flex-1">{children}</main>
      </div>

      {/* Command Palette Modal */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-3 border-b border-slate-100 flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Jump to member, application, chapter or setting..."
                className="w-full text-xs focus:outline-none"
              />
              <button
                onClick={() => setCommandPaletteOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                ESC
              </button>
            </div>
            <div className="p-2 space-y-1 text-xs">
              {ADMIN_NAV.map((nav) => (
                <Link
                  key={nav.href}
                  href={nav.href}
                  onClick={() => setCommandPaletteOpen(false)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-forest-green"
                >
                  <span>{nav.label}</span>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
