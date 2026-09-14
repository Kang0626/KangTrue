'use client';

import React, { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const redirectTarget = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push(redirectTarget);
        router.refresh();
      } else {
        setErrorMsg(data.message || 'Incorrect password. Please verify credentials.');
        setIsLoading(false);
      }
    } catch {
      setErrorMsg('An unexpected network error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-[#0085ca]/30 selection:text-sky-200">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#0085ca]/12 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-sky-600/8 rounded-full blur-[120px]" />
      </div>

      {/* Header Bar */}
      <header className="relative z-10 w-full px-6 lg:px-12 py-8 flex items-center justify-between border-b border-slate-800/60 bg-slate-950/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-white font-sans">
              KANGSIK KO
            </span>
            <span className="text-[8px] font-mono font-bold text-[#38bdf8] uppercase tracking-[0.2em] mt-0.5">
              PRODUCTION LEAD PROPOSAL
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Restricted Portal</span>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="relative z-10 max-w-md w-full mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-8 sm:p-10 shadow-2xl">
          {/* Lock Icon Emblem */}
          <div className="w-14 h-14 rounded-2xl bg-[#0085ca]/15 border border-[#0085ca]/30 text-[#38bdf8] flex items-center justify-center mb-6 shadow-inner">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-2 mb-8">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#38bdf8] font-bold block">
              Restricted Access
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-white">
              Password Protected
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
              This portfolio contains confidential R&amp;D documentation and production leadership case studies for Truescape.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-mono text-slate-300 font-medium block">
                Enter Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoFocus
                  required
                  className="w-full pl-4 pr-11 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#0085ca] focus:ring-1 focus:ring-[#0085ca] transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/50 flex items-start gap-2.5 text-xs text-rose-300 font-sans animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#0085ca] hover:bg-[#006ba8] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg shadow-[#0085ca]/25 hover:-translate-y-0.5 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Unlock Access</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-[11px] font-mono text-slate-500">
            <span>Prepared for Elliot Payne &amp; Truescape Committee</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-slate-800/60 text-center text-[11px] font-mono text-slate-600">
        <span>© 2026 Kangsik Ko · Christchurch, New Zealand</span>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500 font-mono text-xs">
          Loading Security Gateway...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
