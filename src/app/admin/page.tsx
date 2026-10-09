"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  CreditCard,
  FileCheck,
  Calendar,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Mail,
  Award,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { MOCK_APPLICATIONS, MOCK_PAYMENTS } from "@/lib/data/mockData";
import { formatNaira, formatDate } from "@/lib/utils";

const MONTHLY_REVENUE = [
  { month: "Jan", revenue: 850000 },
  { month: "Feb", revenue: 950000 },
  { month: "Mar", revenue: 1200000 },
  { month: "Apr", revenue: 1100000 },
  { month: "May", revenue: 1450000 },
  { month: "Jun", revenue: 1300000 },
  { month: "Jul", revenue: 1650000 },
  { month: "Aug", revenue: 1800000 },
  { month: "Sep", revenue: 2100000 },
  { month: "Oct", revenue: 1850000 },
];

const TIER_DISTRIBUTION = [
  { name: "Certified Pro", value: 260, color: "#0B4A2B" },
  { name: "Associate", value: 135, color: "#2E7D32" },
  { name: "Student", value: 76, color: "#6DAF3F" },
  { name: "Fellow", value: 49, color: "#B8892B" },
  { name: "Corporate", value: 22, color: "#1A3A5C" },
];

const ZONE_DISTRIBUTION = [
  { zone: "South West", count: 198 },
  { zone: "North Central", count: 142 },
  { zone: "South South", count: 124 },
  { zone: "North West", count: 96 },
  { zone: "South East", count: 88 },
  { zone: "North East", count: 64 },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-montserrat font-bold text-heritage-gold uppercase tracking-wider block">
            CESSPA GOVERNANCE COUNCIL
          </span>
          <h1 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-slate-900 uppercase mt-0.5">
            Secretariat Executive Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time status of member registrations, dues remittances, and geopolitical chapter activity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/applications"
            className="px-4 py-2 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
          >
            Review Applications (18)
          </Link>
          <button
            type="button"
            onClick={() => alert("Simulated: Exporting full CESSPA master ledger (CSV)...")}
            className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-montserrat font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export Ledger
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* KPI 1: Total Members */}
        <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-montserrat font-bold uppercase tracking-wider">
              Total Members
            </span>
            <Users className="w-4 h-4 text-forest-green" />
          </div>
          <div>
            <span className="font-montserrat font-extrabold text-2xl sm:text-3xl text-slate-900">
              542
            </span>
            <span className="text-[11px] text-emerald-600 font-bold block mt-0.5 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +14% this quarter
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block pt-1 border-t border-slate-100">
            512 Active • 30 Pending/Lapsed
          </span>
        </div>

        {/* KPI 2: New Applications */}
        <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-montserrat font-bold uppercase tracking-wider">
              Pending Applications
            </span>
            <FileCheck className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <span className="font-montserrat font-extrabold text-2xl sm:text-3xl text-slate-900">
              18
            </span>
            <span className="text-[11px] text-amber-600 font-bold block mt-0.5">
              Requires Panel Review
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block pt-1 border-t border-slate-100">
            Avg review cycle: 4.2 days
          </span>
        </div>

        {/* KPI 3: Dues Collected */}
        <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-montserrat font-bold uppercase tracking-wider">
              Dues Remitted
            </span>
            <CreditCard className="w-4 h-4 text-leaf-green" />
          </div>
          <div>
            <span className="font-montserrat font-extrabold text-xl sm:text-2xl text-forest-green">
              ₦14.25M
            </span>
            <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">
              92% collection rate
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block pt-1 border-t border-slate-100">
            Through Paystack & Transfers
          </span>
        </div>

        {/* KPI 4: Outstanding Dues */}
        <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-montserrat font-bold uppercase tracking-wider">
              Outstanding Dues
            </span>
            <AlertCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div>
            <span className="font-montserrat font-extrabold text-xl sm:text-2xl text-rose-700">
              ₦2.10M
            </span>
            <span className="text-[11px] text-rose-600 font-bold block mt-0.5">
              28 overdue members
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block pt-1 border-t border-slate-100">
            Auto-reminders dispatched
          </span>
        </div>

        {/* KPI 5: Active Events */}
        <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-montserrat font-bold uppercase tracking-wider">
              Upcoming Events
            </span>
            <Calendar className="w-4 h-4 text-heritage-gold" />
          </div>
          <div>
            <span className="font-montserrat font-extrabold text-2xl sm:text-3xl text-slate-900">
              4
            </span>
            <span className="text-[11px] text-slate-600 font-bold block mt-0.5">
              650 total capacity
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block pt-1 border-t border-slate-100">
            418 delegates confirmed
          </span>
        </div>
      </div>

      {/* Visual Recharts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Area Chart (7 Cols) */}
        <div className="lg:col-span-7 rounded-3xl p-6 bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-montserrat font-bold text-heritage-gold uppercase tracking-widest block">
                FINANCIAL TREND
              </span>
              <h3 className="font-montserrat font-extrabold text-lg text-slate-900 uppercase">
                Monthly Dues Remittance (2026)
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-forest-green bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Total: ₦14,250,000
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_REVENUE}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B4A2B" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0B4A2B" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `₦${val / 1000}k`}
                />
                <Tooltip
                  formatter={((val: any) => [formatNaira(Number(val) || 0), "Remittance"]) as any}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0B4A2B"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Member Tier Donut (5 Cols) */}
        <div className="lg:col-span-5 rounded-3xl p-6 bg-white border border-slate-200 shadow-xs space-y-4">
          <div>
            <span className="text-[10px] font-montserrat font-bold text-heritage-gold uppercase tracking-widest block">
              MEMBERSHIP COMPOSITION
            </span>
            <h3 className="font-montserrat font-extrabold text-lg text-slate-900 uppercase">
              Practitioners by Tier
            </h3>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TIER_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {TIER_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={((val: any) => [`${val} Members`, "Count"]) as any}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Geopolitical Zones Bar Chart & Recent Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Members By Zone Bar Chart */}
        <div className="lg:col-span-6 rounded-3xl p-6 bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-montserrat font-bold text-heritage-gold uppercase tracking-widest block">
                CHAPTER DISTRIBUTION
              </span>
              <h3 className="font-montserrat font-extrabold text-lg text-slate-900 uppercase">
                Active Members by Geopolitical Zone
              </h3>
            </div>
            <Link
              href="/admin/chapters"
              className="text-xs font-montserrat font-bold text-forest-green hover:underline"
            >
              Manage Chapters →
            </Link>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ZONE_DISTRIBUTION} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="zone" type="category" stroke="#94a3b8" fontSize={11} width={90} />
                <Tooltip
                  formatter={((val: any) => [`${val} Members`, "Total"]) as any}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
                />
                <Bar dataKey="count" fill="#0B4A2B" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Applications Feed */}
        <div className="lg:col-span-6 rounded-3xl p-6 bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-montserrat font-bold text-heritage-gold uppercase tracking-widest block">
                ACTION REQUIRED
              </span>
              <h3 className="font-montserrat font-extrabold text-lg text-slate-900 uppercase">
                Recent Applications Queue
              </h3>
            </div>
            <Link
              href="/admin/applications"
              className="text-xs font-montserrat font-bold text-forest-green hover:underline"
            >
              View All ({MOCK_APPLICATIONS.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_APPLICATIONS.map((app) => (
              <div
                key={app.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 font-montserrat">{app.applicantName}</strong>
                    <span className="font-mono text-[10px] text-slate-500">
                      {app.applicationNumber}
                    </span>
                  </div>
                  <p className="text-[11px] text-forest-green font-medium mt-0.5">
                    {app.tier} • {app.specialisation}
                  </p>
                  <span className="text-[10px] text-slate-400">
                    Submitted: {formatDate(app.submittedDate)}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-montserrat font-bold uppercase ${
                      app.status === "Approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {app.status}
                  </span>
                  <Link
                    href="/admin/applications"
                    className="block text-[11px] text-forest-green font-bold hover:underline mt-1"
                  >
                    Review Dossier
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Payments Feed */}
      <div className="rounded-3xl p-6 bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-montserrat font-bold text-heritage-gold uppercase tracking-widest block">
              FINANCIAL TRANSACTIONS
            </span>
            <h3 className="font-montserrat font-extrabold text-lg text-slate-900 uppercase">
              Recent Clearing Remittances
            </h3>
          </div>
          <Link
            href="/admin/payments"
            className="text-xs font-montserrat font-bold text-forest-green hover:underline"
          >
            Open Transaction Ledger →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-montserrat uppercase text-[10px]">
                <th className="py-2.5 px-3">Reference</th>
                <th className="py-2.5 px-3">Remitter</th>
                <th className="py-2.5 px-3">Purpose</th>
                <th className="py-2.5 px-3">Channel</th>
                <th className="py-2.5 px-3">Amount (₦)</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {MOCK_PAYMENTS.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3 font-mono text-[11px] text-forest-green font-bold">
                    {tx.reference}
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-900">{tx.memberName}</td>
                  <td className="py-3 px-3">{tx.purpose}</td>
                  <td className="py-3 px-3">{tx.method}</td>
                  <td className="py-3 px-3 font-montserrat font-extrabold text-slate-900">
                    {formatNaira(tx.amount)}
                  </td>
                  <td className="py-3 px-3">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
