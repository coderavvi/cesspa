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
  MapPin,
  Mail,
  Award,
  Menu,
  X,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Briefcase,
  Calendar,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_NAV = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Members", href: "/admin/members", icon: Users },
  { label: "Applications", href: "/admin/applications", icon: FileCheck },
  { label: "Dues & Finance", href: "/admin/payments", icon: CreditCard },
  { label: "Events & CPD", href: "/admin/events", icon: Calendar },
  { label: "Insights & CMS", href: "/admin/content", icon: BookOpen },
  { label: "Technical Councils", href: "/admin/councils", icon: Briefcase },
  { label: "Chapters & Zones", href: "/admin/chapters", icon: MapPin },
  { label: "Certificates", href: "/admin/certificates", icon: Award },
  { label: "Communications", href: "/admin/communications", icon: Mail },
  { label: "Fee Schedule", href: "/admin/tiers", icon: Layers },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <Link href="/admin" className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#0B4A2B] text-white font-heading font-bold text-xs flex items-center justify-center">
                C
              </span>
              <span className="font-heading font-bold text-sm tracking-tight text-slate-900">
                CESSPA Admin
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-slate-400 hover:text-slate-700"
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
              <span className="truncate text-[11px]">National Secretariat</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                Abuja
              </span>
            </div>
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" /> Public Portal
            </Link>
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
              className="lg:hidden p-1 rounded-md text-slate-600 hover:bg-slate-100"
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
            <span className="text-xs font-mono text-slate-500">CAMA 2020</span>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                SEC
              </span>
              <span className="text-xs font-medium text-slate-800 hidden sm:inline">
                National Council
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
