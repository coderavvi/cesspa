"use client";

import React, { useState } from "react";
import {
  X,
  Check,
  Download,
  Search,
  ExternalLink,
} from "lucide-react";
import { MOCK_APPLICATIONS } from "@/lib/data/mockData";
import { Application } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [selectedApp, setSelectedApp] = useState<Application | null>(applications[0]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = applications.filter((app) => {
    const matchQ =
      !query ||
      app.applicantName.toLowerCase().includes(query.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(query.toLowerCase());
    const matchStatus =
      statusFilter === "All" || app.status === statusFilter;
    return matchQ && matchStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: Application["status"]) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-900 tracking-tight">
            Membership Applications
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Article 3 &amp; Table 1 Credential Review Queue • 30-Day Decision Window
          </p>
        </div>

        <div className="text-xs text-slate-500">
          {applications.filter((a) => a.status !== "Approved").length} pending action
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search applicant or number..."
            className="w-full pl-8 pr-3 py-1.5 rounded-md border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B4A2B]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 text-[11px]">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0B4A2B] bg-white"
          >
            <option value="All">All Applications</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Under Evaluation">Under Evaluation</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Main Workspace (Asymmetric Layout: Table on left, Inspector on right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Application Table (7 cols) */}
        <div className="lg:col-span-7 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-medium">
                <th className="py-2.5 px-3">Application</th>
                <th className="py-2.5 px-3">Applicant</th>
                <th className="py-2.5 px-3">Applied Grade</th>
                <th className="py-2.5 px-3">Submitted</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((app) => {
                const isSelected = selectedApp?.id === app.id;
                return (
                  <tr
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? "bg-slate-100/70" : "hover:bg-slate-50/70"
                    }`}
                  >
                    <td className="py-3 px-3 font-mono font-medium text-[#0B4A2B]">
                      {app.applicationNumber}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{app.applicantName}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[150px]">{app.email}</div>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800">
                      {app.tier}
                    </td>
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                      {formatDate(app.submittedDate)}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                          app.status === "Approved"
                            ? "bg-slate-100 text-[#0B4A2B]"
                            : app.status === "Rejected"
                            ? "bg-rose-50 text-rose-700"
                            : "bg-amber-50 text-amber-800"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right Column: Selected Dossier Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {selectedApp ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                <div>
                  <span className="font-mono text-xs text-[#0B4A2B] font-bold">
                    {selectedApp.applicationNumber}
                  </span>
                  <h2 className="font-heading font-bold text-lg text-slate-900 mt-0.5">
                    {selectedApp.applicantName}
                  </h2>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Applying for: <strong className="text-slate-800">{selectedApp.tier}</strong>
                  </div>
                </div>

                <span
                  className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                    selectedApp.status === "Approved"
                      ? "bg-slate-100 text-[#0B4A2B]"
                      : selectedApp.status === "Rejected"
                      ? "bg-rose-50 text-rose-700"
                      : "bg-amber-50 text-amber-800"
                  }`}
                >
                  {selectedApp.status}
                </span>
              </div>

              {/* Dossier Details */}
              <div className="space-y-2 text-xs divide-y divide-slate-100 text-slate-700">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-mono">{selectedApp.email}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Phone:</span>
                  <span>{selectedApp.phone}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Track &amp; Node:</span>
                  <span>{selectedApp.specialisation}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Qualifications:</span>
                  <span>{selectedApp.qualifications}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Submission Date:</span>
                  <span>{formatDate(selectedApp.submittedDate)}</span>
                </div>
              </div>

              <div className="h-px bg-slate-200" />

              {/* Verification Documents */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Submitted Credentials (Table 1 Evidence)
                </span>
                <div className="space-y-1.5 text-xs">
                  {selectedApp.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-md border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-medium text-slate-900 block">{doc.name}</span>
                        <span className="text-[10px] text-slate-500">{doc.type} • {doc.size}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert(`Downloading verified document: ${doc.name}`)}
                        className="px-2 py-1 text-[11px] text-[#0B4A2B] hover:underline"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-slate-200" />

              {/* Committee Decision Actions (Article 3 Section II: 30-day review decision) */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Membership Committee Action
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedApp.id, "Approved")}
                    className="flex-1 py-1.5 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] text-white text-xs font-semibold transition-colors"
                  >
                    Approve Admission
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedApp.id, "Information Requested")}
                    className="px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
                  >
                    Request Evidence
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedApp.id, "Rejected")}
                    className="px-3 py-1.5 rounded-md border border-slate-200 hover:bg-rose-50 text-rose-700 text-xs font-medium transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400">Select an application from the queue.</div>
          )}
        </div>
      </div>
    </div>
  );
}