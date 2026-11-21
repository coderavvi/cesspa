"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldAlert,
  Loader2,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { DEFAULT_CREDENTIALS, DEFAULT_PASSWORD_DISPLAY } from "@/lib/auth/constants";

function AdminLoginForm() {
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);

  // Auto-fill demo credentials
  const handleFillDemo = () => {
    setEmail(DEFAULT_CREDENTIALS.email);
    setPassword(DEFAULT_PASSWORD_DISPLAY);
    setError(null);
  };

  // Reset demo credentials to default
  const handleResetDemoPassword = async () => {
    try {
      setResetting(true);
      setError(null);
      const res = await fetch("/api/admin/reset-password", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setEmail(DEFAULT_CREDENTIALS.email);
        setPassword(DEFAULT_PASSWORD_DISPLAY);
        setResetMessage("Demo password reset to default: Admin@2026!");
        setTimeout(() => setResetMessage(null), 4000);
      } else {
        setError(data.error || "Failed to reset demo password.");
      }
    } catch {
      setError("Network error while resetting password.");
    } finally {
      setResetting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials.");
        setLoading(false);
        return;
      }

      // Hard redirect to ensure fresh cookies and middleware validation
      window.location.href = redirectTarget;
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#0B4A2B] text-white font-heading font-extrabold text-xl shadow-xs">
            C
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 tracking-tight">
            CESSPA Secretariat Portal
          </h1>
          <p className="text-xs text-slate-500">
            Sign in to access administrative records, finance ledgers, and membership registers.
          </p>
        </div>

        {/* Card */}
        <div className="mt-8 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-xs space-y-6">
          {/* Demo User Helper Card */}
          <div className="p-3.5 rounded-md bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-[#0B4A2B]">
                Demo Account Credentials
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-semibold text-[#0B4A2B] hover:underline cursor-pointer"
              >
                Fill Credentials
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-600 font-mono text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px] font-sans">Email:</span>
                <span className="font-medium text-slate-900 select-all">{DEFAULT_CREDENTIALS.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-sans">Default Password:</span>
                <span className="font-medium text-slate-900 select-all">{DEFAULT_PASSWORD_DISPLAY}</span>
              </div>
            </div>
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="p-3 rounded-md bg-rose-50 border border-rose-200 flex items-start gap-2 text-xs text-rose-800">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {resetMessage && (
            <div className="p-3 rounded-md bg-emerald-50 border border-emerald-200 flex items-start gap-2 text-xs text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{resetMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Administrator Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cesspa.org.ng"
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B4A2B]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-slate-700 font-medium">Password</label>
                <button
                  type="button"
                  onClick={handleResetDemoPassword}
                  disabled={resetting}
                  className="text-[11px] text-slate-500 hover:text-[#0B4A2B] inline-flex items-center gap-1 cursor-pointer"
                  title="Reset demo password back to default if changed"
                >
                  <RotateCcw className={`w-3 h-3 ${resetting ? "animate-spin" : ""}`} />
                  <span>Reset Demo Password</span>
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2 rounded-md border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B4A2B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-md bg-[#0B4A2B] hover:bg-[#08331F] disabled:opacity-70 text-white font-semibold text-xs inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Admin Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              ← Return to public website
            </Link>
            <span className="font-mono text-slate-400">v2.0 Secretariat</span>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-6">
          Certified Environmental &amp; Social Safeguards Practitioners Association.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-400">Loading portal...</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
