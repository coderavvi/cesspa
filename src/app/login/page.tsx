"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LogIn, Lock, Mail, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { Logo } from "@/components/shared/Logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-ivory">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-brand-border shadow-xl">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo variant="seal-only" size="lg" />
          </div>
          <h2 className="font-montserrat font-extrabold text-2xl text-ink-dark uppercase">
            Member Portal Login
          </h2>
          <p className="text-xs text-ink-muted">
            Access your verified practitioner profile, dues status, and CPD logs.
          </p>
        </div>

        {loggedIn ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-leaf-green flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-montserrat font-extrabold text-xl text-forest-green">
              Authenticated Successfully!
            </h3>
            <div className="p-4 rounded-xl bg-sage-mist/60 border border-brand-border text-xs text-ink-body space-y-1">
              <p className="font-semibold text-ink-dark">Member Portal v2.0 Coming Soon</p>
              <p>
                Full member self-service portal is currently in live staging for the 2026 intake.
                You can currently verify standing under Pay Dues or Member Directory.
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/membership/pay-dues"
                className="w-full py-2.5 rounded-xl bg-forest-green text-white font-montserrat font-bold text-xs uppercase"
              >
                Go to Pay Dues Lookup
              </Link>
              <button
                type="button"
                onClick={() => setLoggedIn(false)}
                className="text-xs text-ink-muted hover:text-ink-dark"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase mb-1">
                Practitioner Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@cesspa.org.ng"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-montserrat font-bold text-ink-dark uppercase">
                  Password
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Simulated: Password reset link dispatched to your registered email.");
                  }}
                  className="text-[11px] text-forest-green hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>
            </div>

            <div className="flex items-center text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-ink-body">
                <input type="checkbox" defaultChecked className="rounded text-forest-green focus:ring-0" />
                <span>Remember this terminal</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-forest-green hover:bg-deep-emerald text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4 text-heritage-gold" /> Sign In to Portal
            </button>

            <div className="pt-4 border-t border-brand-border text-center text-xs text-ink-body">
              <span>Don't have a verified membership account? </span>
              <Link
                href="/membership/register"
                className="font-bold text-forest-green hover:underline"
              >
                Register Here
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
