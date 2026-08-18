'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { diseaseData } from '@/locales/diseaseData';
import Link from 'next/link';
import { Activity, ArrowRight, Sparkles, Search, Stethoscope } from 'lucide-react';

export default function DiseasesPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDiseases = useMemo(() => {
    return diseaseData.filter((d) => {
      const title = d.title[language] || '';
      const desc = d.shortDesc[language] || '';
      const slug = d.slug || '';
      const term = searchTerm.trim().toLowerCase();

      return (
        term === '' ||
        title.toLowerCase().includes(term) ||
        desc.toLowerCase().includes(term) ||
        slug.toLowerCase().includes(term)
      );
    });
  }, [searchTerm, language]);

  return (
    <div className="relative min-h-screen flex flex-col antialiased bg-slate-50/50">
      <Navbar />

      {/* Fixed Ambient Background Layer */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[100px]" />
      </div>

      {/* Hero / Cover Banner Section (Edge-to-Edge Full Screen Width) */}
      <section className="relative z-10 w-full bg-slate-950 border-b border-line overflow-hidden">
        <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] lg:h-[560px] bg-slate-900 overflow-hidden">
          <img
            src="/diseases-cover-banner.png"
            alt={language === 'bn' ? 'ডা. হানিফ তৌহিদ - চিকিৎসাধীন রোগসমূহ' : 'Dr. Hanif Towhid Diseases We Treat'}
            className="w-full h-full object-cover object-center brightness-95"
          />
          {/* Subtle Gradient Overlays for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none" />

          {/* Banner Text Content inside max-w-7xl container */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14 max-w-7xl mx-auto pointer-events-none">
            <div className="flex flex-col gap-2.5 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/75 border border-white/30 backdrop-blur-md w-fit shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                  {language === 'bn' ? 'চিকিৎসাধীন রোগসমূহ' : 'Diseases We Treat'}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                {language === 'bn'
                  ? 'ডায়াবেটিস, হরমোনজনিত ও জটিল শারীরিক সমস্যা'
                  : 'Advanced Care for Diabetes, Hormones & Chronic Illnesses'}
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed drop-shadow max-w-2xl hidden sm:block">
                {language === 'bn'
                  ? 'সিলেটে চিকিৎসাধীন প্রধান প্রধান রোগের বিজ্ঞানসম্মত ও আধুনিক ক্লিনিকাল চিকিৎসা বিশ্লেষণ।'
                  : 'Evidence-based clinical care and targeted medical management protocols for chronic metabolic, cardiovascular, and systemic diseases by Dr. Hanif Towhid.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="relative z-10 py-10 md:py-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-10 w-full">
        
        {/* Search & Intro Toolbar */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 md:p-5 rounded-2xl border border-white/80 bg-white/80 backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-base md:text-lg font-bold text-ink">
                {language === 'bn' ? `চিকিৎসাধীন রোগের তালিকা (${diseaseData.length}টি)` : `Clinical Directory (${diseaseData.length} Diseases)`}
              </h2>
              <p className="text-[11px] text-muted">
                {language === 'bn' ? 'যেকোনো রোগের বিস্তারিত তথ্য ও গাইডলাইন জানতে কার্ডে ক্লিক করুন' : 'Select any disease card below for in-depth pathophysiology and management guidance'}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'bn' ? 'রোগের নাম খুঁজুন...' : 'Search disease...'}
              className="w-full pl-10 pr-4 py-2 text-xs md:text-sm rounded-xl bg-slate-100/80 border border-slate-200 focus:outline-none focus:border-accent focus:bg-white transition-all placeholder:text-muted"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-ink cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </section>

        {/* Detailed Diseases Grid (Light Glassmorphic Cards with Visual Media) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white/60 rounded-3xl border border-dashed border-slate-300">
              <Activity className="w-10 h-10 text-muted mx-auto mb-3 animate-pulse" />
              <h3 className="font-serif text-lg font-bold text-ink">
                {language === 'bn' ? 'কোনো রোগ পাওয়া যায়নি' : 'No diseases match your search'}
              </h3>
            </div>
          ) : (
            filteredDiseases.map((disease) => (
              <GlassPanel
                key={disease.slug}
                className="rounded-3xl border border-white/80 bg-white/80 backdrop-blur-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between p-5 sm:p-6 group overflow-hidden"
              >
                <div className="flex flex-col gap-4">
                  {/* Disease Image in rounded glass frame */}
                  <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-inner">
                    <img
                      src={disease.image}
                      alt={disease.title[language]}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span className="text-[10px] uppercase tracking-wider text-slate-700 font-mono font-bold bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-slate-200/60 shadow-2xs">
                        {disease.slug}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-accent/10 group-hover:bg-accent text-accent group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                      <Activity className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-ink group-hover:text-accent transition-colors leading-snug">
                      {disease.title[language]}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-[13px] leading-relaxed text-muted font-normal line-clamp-3">
                    {disease.shortDesc[language]}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-line/80">
                  <span className="text-[11px] font-semibold text-accent flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {language === 'bn' ? 'ক্লিনিকাল গাইড' : 'Clinical Guide'}
                  </span>

                  <Link
                    href={`/diseases/${disease.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink hover:bg-accent text-white font-semibold text-xs rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'বিশ্লেষণ পড়ুন' : 'Read Analysis'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </GlassPanel>
            ))
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
