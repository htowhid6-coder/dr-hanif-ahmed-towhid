'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { detailedSymptomsList, SymptomDetail } from '@/data/symptomsData';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  PhoneCall,
  Search,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  FileText,
  Sparkles,
  ChevronRight,
  Compass
} from 'lucide-react';

/**
 * Reusable scroll-reveal component with smooth Zoom-in / Scale-in animation
 */
function ZoomInScrollCard({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transform transition-all duration-600 ease-out will-change-transform ${
        isVisible
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-[0.88] translate-y-5'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function SymptomsPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Categories list for filter
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(
        detailedSymptomsList.map((s) =>
          language === 'bn' ? s.categoryBn : s.categoryEn
        )
      )
    );
    return ['all', ...unique];
  }, [language]);

  // Filtered symptoms
  const filteredSymptoms = useMemo(() => {
    return detailedSymptomsList.filter((s) => {
      const matchCat =
        selectedCategory === 'all' ||
        (language === 'bn' ? s.categoryBn : s.categoryEn) === selectedCategory;

      const title = language === 'bn' ? s.titleBn : s.titleEn;
      const desc = language === 'bn' ? s.shortDescBn : s.shortDescEn;
      const organ = language === 'bn' ? s.organBn : s.organEn;

      const matchSearch =
        searchTerm.trim() === '' ||
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        organ.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm, language]);

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
            src="/symptoms-cover-banner.png"
            alt={language === 'bn' ? 'ডা. হানিফ তৌহিদ - লক্ষণ ও রোগ বিশ্লেষণ' : 'Dr. Hanif Towhid Symptoms Clinical Guide'}
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
                  {language === 'bn' ? 'ক্লিনিকাল লক্ষণ নির্দেশিকা' : 'Clinical Symptom Navigator'}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                {language === 'bn'
                  ? '১৪টি প্রধান লক্ষণ ও সঠিক চিকিৎসা বিশ্লেষণ'
                  : '14 Core Clinical Symptoms & Diagnostic Guide'}
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed drop-shadow max-w-2xl hidden sm:block">
                {language === 'bn'
                  ? 'প্রতিটি শারীরিক লক্ষণের গভীর শারীরবৃত্তীয় কারণ, বিপদচিহ্ন এবং ডা. হানিফ আহমেদ তৌহিদের বিজ্ঞানসম্মত চিকিৎসা পদ্ধতি জানুন।'
                  : 'Comprehensive pathophysiological breakdown, underlying triggers, red-flag warnings, and evidence-based medicine protocols by Dr. Hanif Ahmed Towhid.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="relative z-10 py-10 md:py-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-10 w-full">
        
        {/* Search & Category Filter Toolbar (Glassmorphic) */}
        <section className="sticky top-20 z-30 animate-in fade-in duration-500">
          <GlassPanel className="p-4 md:p-5 rounded-2xl border border-white/80 bg-white/80 backdrop-blur-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'লক্ষণ বা অঙ্গ অনুসন্ধান করুন (যেমন: জ্বর, কোমর ব্যথা)...'
                    : 'Search symptoms or organs (e.g. fever, knee)...'
                }
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

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 custom-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-accent text-white shadow-md shadow-accent/20 border border-accent'
                      : 'bg-white/70 hover:bg-white text-muted hover:text-ink border border-slate-200'
                  }`}
                >
                  {cat === 'all'
                    ? language === 'bn'
                      ? 'সকল লক্ষণ (১৪)'
                      : 'All Symptoms (14)'
                    : cat}
                </button>
              ))}
            </div>
          </GlassPanel>
        </section>

        {/* Symptoms Overview Quick Jump Navigation Drawer */}
        <section className="animate-in fade-in duration-500">
          <div className="p-5 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-emerald-50/50 via-white/80 to-teal-50/50 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-accent font-bold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>{language === 'bn' ? 'দ্রুত নেভিগেশন (ক্লিক করে সরাসরি পড়ুন)' : 'Quick Jump Navigator'}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {detailedSymptomsList.map((item) => (
                <a
                  key={item.slug}
                  href={`#${item.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/90 hover:bg-accent text-ink hover:text-white border border-slate-200 hover:border-accent text-xs font-medium transition-all shadow-2xs hover:shadow-sm"
                >
                  <span className="text-[10px] font-mono text-muted group-hover:text-white">#{item.id}</span>
                  <span>{language === 'bn' ? item.titleBn.split(',')[0] : item.titleEn.split('&')[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Symptoms Detailed Cards List */}
        <section className="flex flex-col gap-12">
          {filteredSymptoms.length === 0 ? (
            <div className="text-center py-16 bg-white/60 rounded-3xl border border-dashed border-slate-300">
              <Activity className="w-10 h-10 text-muted mx-auto mb-3 animate-pulse" />
              <h3 className="font-serif text-lg font-bold text-ink">
                {language === 'bn' ? 'কোনো লক্ষণ পাওয়া যায়নি' : 'No symptoms match your search'}
              </h3>
              <p className="text-xs text-muted mt-1">
                {language === 'bn' ? 'অনুগ্রহ করে ভিন্ন কোনো শব্দ দিয়ে অনুসন্ধান করুন।' : 'Please try searching with different keywords.'}
              </p>
            </div>
          ) : (
            filteredSymptoms.map((symptom) => (
              <article
                key={symptom.slug}
                id={symptom.slug}
                className="scroll-mt-32 transition-all duration-300"
              >
                {/* Light Glassmorphism Main Card */}
                <div className="rounded-3xl border border-white/80 bg-white/80 backdrop-blur-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 md:p-10 flex flex-col gap-8 relative overflow-hidden group">
                  
                  {/* Subtle Card Ambient Glow */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-accent/10 to-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Top Header: Badge, Number, Category & Organ */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-xs">
                        {language === 'bn' ? symptom.categoryBn : symptom.categoryEn}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-muted font-semibold text-xs flex items-center gap-1.5">
                        <Stethoscope className="w-3.5 h-3.5 text-accent" />
                        <span>
                          {language === 'bn'
                            ? `আক্রান্ত অঙ্গ: ${symptom.organBn}`
                            : `System: ${symptom.organEn}`}
                        </span>
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-slate-900 text-emerald-300 shadow-sm">
                      Symptom #{symptom.id}
                    </span>
                  </div>

                  {/* Visual & Core Summary Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: High-res Symptom Image in Glass Frame (4 Cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                      <div className="relative w-full aspect-4/3 sm:aspect-16/10 lg:aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-slate-100 group-hover:shadow-xl transition-all">
                        <img
                          src={symptom.image}
                          alt={symptom.titleEn}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Doctor Quick Consultation Box (with ZoomIn Scroll Animation) */}
                      <ZoomInScrollCard delay={60} className="w-full">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/70 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col gap-2.5">
                          <div className="flex items-center gap-2 text-accent font-bold text-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{language === 'bn' ? 'সরাসরি ডাক্তারের পরামর্শ' : 'Specialist Clinical Review'}</span>
                          </div>
                          <p className="text-[11px] text-muted leading-relaxed">
                            {language === 'bn'
                              ? 'এই লক্ষণে ভুগলে সময়মতো চিকিৎসা নিয়ে স্থায়ী সুস্থতা নিশ্চিত করুন।'
                              : 'Consult Dr. Hanif Towhid for targeted evaluation and rational prescription.'}
                          </p>
                          <div className="flex items-center gap-2 pt-1">
                            <a
                              href="https://wa.me/8801346132486"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-accent hover:bg-ink text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{language === 'bn' ? 'সিরিয়াল নিন' : 'Book Serial'}</span>
                            </a>
                            <a
                              href="tel:01346132486"
                              className="inline-flex items-center justify-center p-2 rounded-xl bg-white hover:bg-slate-100 text-ink border border-slate-200 transition-all shadow-2xs cursor-pointer"
                              title="Call Serial Hotline"
                            >
                              <PhoneCall className="w-3.5 h-3.5 text-accent" />
                            </a>
                          </div>
                        </div>
                      </ZoomInScrollCard>
                    </div>

                    {/* Right: Detailed Pathophysiology & Medical Overview (8 Cols) */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                      
                      {/* Title & Short Tagline */}
                      <div>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink leading-tight">
                          {language === 'bn' ? symptom.titleBn : symptom.titleEn}
                        </h2>
                        <p className="text-xs sm:text-sm text-accent font-medium mt-1">
                          {language === 'bn' ? symptom.shortDescBn : symptom.shortDescEn}
                        </p>
                      </div>

                      {/* 400-500 words deep clinical overview */}
                      <div className="text-xs sm:text-sm text-ink/85 leading-relaxed font-normal whitespace-pre-line bg-slate-50/60 p-5 rounded-2xl border border-slate-100">
                        {language === 'bn' ? symptom.overviewBn : symptom.overviewEn}
                      </div>

                      {/* Common Causes Breakdown (with Scroll Zoom-In Cards) */}
                      <div className="flex flex-col gap-3">
                        <h3 className="font-serif text-base md:text-lg font-bold text-ink flex items-center gap-2">
                          <FileText className="w-4 h-4 text-accent" />
                          <span>
                            {language === 'bn'
                              ? 'প্রধান কারণ ও শারীরবৃত্তীয় প্রক্রিয়া (Root Causes & Pathological Mechanisms)'
                              : 'Root Causes & Pathological Mechanisms'}
                          </span>
                        </h3>

                        {/* Animated Grid of Cause Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {(language === 'bn' ? symptom.causesBn : symptom.causesEn).map((cause, idx) => (
                            <ZoomInScrollCard
                              key={idx}
                              delay={idx * 80}
                              className="h-full"
                            >
                              <div className="p-4 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/90 hover:border-accent/50 shadow-2xs hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex flex-col gap-1.5 h-full group/cause cursor-default">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-accent group-hover/cause:scale-125 transition-transform shrink-0" />
                                  <h4 className="text-xs font-bold text-ink group-hover/cause:text-accent transition-colors leading-snug">
                                    {cause.title}
                                  </h4>
                                </div>
                                <p className="text-[11px] text-muted leading-relaxed pl-4">
                                  {cause.desc}
                                </p>
                              </div>
                            </ZoomInScrollCard>
                          ))}
                        </div>
                      </div>

                      {/* Red Flag Warnings Box (with Scroll Zoom-In) */}
                      <ZoomInScrollCard delay={100} className="w-full">
                        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/30 hover:border-amber-500/50 shadow-sm transition-all duration-300 flex flex-col gap-2.5">
                          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 animate-bounce" />
                            <span>
                              {language === 'bn'
                                ? 'জরুরি সতর্কবার্তা ও বিপদচিহ্ন (Red Flag Signs - কখন অবিলম্বে ডাক্তার দেখাবেন)'
                                : 'Emergency Red-Flag Warnings (Seek Immediate Medical Care)'}
                            </span>
                          </div>

                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-950/90 pl-1">
                            {(language === 'bn' ? symptom.redFlagsBn : symptom.redFlagsEn).map((flag, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2">
                                <span className="text-amber-600 font-bold">⚠️</span>
                                <span className="leading-relaxed">{flag}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </ZoomInScrollCard>

                      {/* Investigations & Doctor Hanif's Management Protocol (with Scroll Zoom-In) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* Investigation Checklist */}
                        <ZoomInScrollCard delay={120} className="h-full">
                          <div className="p-4 sm:p-5 rounded-2xl bg-white/90 hover:bg-white border border-slate-200 hover:border-accent/40 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col gap-2.5 h-full">
                            <div className="flex items-center gap-2 text-xs font-bold text-ink">
                              <Activity className="w-4 h-4 text-accent" />
                              <span>{language === 'bn' ? 'প্রয়োজনীয় পরীক্ষা-নিরীক্ষা' : 'Essential Diagnostic Tests'}</span>
                            </div>
                            <ul className="flex flex-col gap-1.5 text-[11px] text-muted pl-1">
                              {(language === 'bn' ? symptom.investigationsBn : symptom.investigationsEn).map((inv, iIdx) => (
                                <li key={iIdx} className="flex items-start gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{inv}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </ZoomInScrollCard>

                        {/* Dr. Hanif's Protocol */}
                        <ZoomInScrollCard delay={180} className="h-full">
                          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-white hover:from-emerald-50 border border-emerald-200/80 hover:border-emerald-300 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col gap-2.5 h-full">
                            <div className="flex items-center gap-2 text-xs font-bold text-accent">
                              <ShieldCheck className="w-4 h-4 text-accent" />
                              <span>{language === 'bn' ? 'ডা. হানিফ তৌহিদের চিকিৎসা পদ্ধতি' : 'Clinical Management Protocol'}</span>
                            </div>
                            <p className="text-[11px] text-ink/80 leading-relaxed">
                              {language === 'bn' ? symptom.managementBn : symptom.managementEn}
                            </p>
                          </div>
                        </ZoomInScrollCard>

                      </div>

                    </div>

                  </div>

                </div>
              </article>
            ))
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}
