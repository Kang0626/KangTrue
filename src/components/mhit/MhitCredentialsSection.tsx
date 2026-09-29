'use client';

import React from 'react';
import { MHIT_PROPOSAL } from '@/lib/constants';
import { ShieldCheck, Mail, Phone, MapPin, Award, BookOpen, Lock, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const MhitCredentialsSection: React.FC = () => {
  const { credentials, applicant } = MHIT_PROPOSAL;

  return (
    <section id="credentials" className="py-24 sm:py-32 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/20 mb-4 uppercase tracking-wider">
            {credentials.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            {credentials.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Bridging 16+ years of visual effects supervision with procedural OpenUSD/3DGS workflows, real-time web engines, and academic CG lecturing.
          </p>
        </div>

        {/* Credentials Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-950 font-sans tracking-tight">
                  {applicant.name}
                </h3>
                <p className="text-sm font-mono text-[#0085ca] font-semibold mt-1">
                  Candidate for Master of Human Interface Technology (MHIT)
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>NZ Permanent Resident</span>
              </div>
            </div>

            {/* Experience Points */}
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Core Domain Expertise &amp; Teaching Background
              </span>
              <div className="space-y-3">
                {credentials.experience.map((exp, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#0085ca]/10 text-[#0085ca] flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-sm sm:text-base text-slate-700 font-light leading-relaxed">
                      {exp}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-[#0085ca] shrink-0" />
                <span>{credentials.location}</span>
              </div>
              <a
                href={`mailto:${applicant.email}`}
                className="flex items-center gap-2 text-slate-600 hover:text-[#0085ca] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#0085ca] shrink-0" />
                <span>{applicant.email}</span>
              </a>
              <a
                href={`tel:${applicant.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-slate-600 hover:text-[#0085ca] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#0085ca] shrink-0" />
                <span>{applicant.phone}</span>
              </a>
            </div>
          </div>

          {/* Quick Actions & Locked Showcase Card */}
          <div className="p-8 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0085ca]/20 border border-[#0085ca]/40 flex items-center justify-center text-[#38bdf8]">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold font-sans text-white tracking-tight">
                Private Production Showcase
              </h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Contains complete industrial R&amp;D documentation, full-length reality capture video footage, and procedural Houdini SOP node networks.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <Link
                href="/showcase/"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0085ca] hover:bg-[#006ba8] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#0085ca]/25 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Open Private Showcase</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/specs/"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono font-medium transition-colors border border-slate-800"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Full Architecture Specs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
