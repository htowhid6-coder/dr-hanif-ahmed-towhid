'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { detailedSymptomsList, SymptomDetail } from '@/data/symptomsData';
import supabase from '@/lib/supabase';
import Link from 'next/link';
import {
  Search,
  Activity,
  AlertTriangle,
  Stethoscope,
  CheckCircle2,
  Calendar,
  PhoneCall,
  ShieldCheck,
  FileText,
  Sparkles,
  ChevronRight,
  Compass
} from 'lucide-react';

/**
 * Reusable scroll-reveal component with smooth bi-directional Zoom-in / Scale-in animation
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
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-20px 0px -20px 0px',
      }
    );

    const current = ref.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
        transitionDuration: '600ms',
      }}
      className={`transform transition-all ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
        isVisible
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-[0.96] translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function SymptomsPage() {
  const { language } = useLanguage();
  const [symptoms, setSymptoms] = useState<SymptomDetail[]>(detailedSymptomsList);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Fetch live symptoms from Supabase
  useEffect(() => {
    async function loadSymptoms() {
      try {
        const { data, error } = await supabase
          .from('symptoms')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          const mapped: SymptomDetail[] = data.map((d: any, index: number) => ({
            id: index + 1,
            slug: d.slug,
            titleEn: d.title_en,
            titleBn: d.title_bn,
            categoryEn: d.category_en,
            categoryBn: d.category_bn,
            organEn: d.organ_en,
            organBn: d.organ_bn,
            image: d.image ? d.image.toLowerCase() : '/symptoms/fever.png',
            shortDescEn: d.short_desc_en,
            shortDescBn: d.short_desc_bn,
            overviewEn: d.overview_en,
            overviewBn: d.overview_bn,
            causesEn: Array.isArray(d.causes_en) ? d.causes_en : [],
            causesBn: Array.isArray(d.causes_bn) ? d.causes_bn : [],
            redFlagsEn: Array.isArray(d.red_flags_en) ? d.red_flags_en : [],
            redFlagsBn: Array.isArray(d.red_flags_bn) ? d.red_flags_bn : [],
            investigationsEn: Array.isArray(d.investigations_en) ? d.investigations_en : [],
            investigationsBn: Array.isArray(d.investigations_bn) ? d.investigations_bn : [],
            managementEn: d.management_en,
            managementBn: d.management_bn,
          }));

          // Merge Supabase data with any local defaults not yet in DB
          const seenSlugs = new Set(mapped.map(m => m.slug));
          const merged = [...mapped];
          for (const fallback of detailedSymptomsList) {
            if (!seenSlugs.has(fallback.slug)) {
              merged.push(fallback);
              seenSlugs.add(fallback.slug);
            }
          }
          setSymptoms(merged);
        } else {
          setSymptoms(detailedSymptomsList);
        }
      } catch (err) {
        console.error("Error fetching symptoms from Supabase:", err);
        setSymptoms(detailedSymptomsList);
      } finally {
        setLoading(false);
      }
    }
    loadSymptoms();
  }, []);

  // Dynamic list of unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    symptoms.forEach((s: SymptomDetail) => {
      set.add(language === 'bn' ? s.categoryBn : s.categoryEn);
    });
    return Array.from(set);
  }, [language, symptoms]);

  // Filter symptoms based on search and category
  const filteredSymptoms = useMemo(() => {
    return symptoms.filter((s: SymptomDetail) => {
      const cat = language === 'bn' ? s.categoryBn : s.categoryEn;
      const matchesCategory = selectedCategory === 'all' || cat === selectedCategory;

      if (!matchesCategory) return false;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return true;

      const titleEn = s.titleEn.toLowerCase();
      const titleBn = s.titleBn.toLowerCase();
      const descEn = s.shortDescEn.toLowerCase();
      const descBn = s.shortDescBn.toLowerCase();
      const organEn = s.organEn.toLowerCase();
      const organBn = s.organBn.toLowerCase();

      return (
        titleEn.includes(query) ||
        titleBn.includes(query) ||
        descEn.includes(query) ||
        descBn.includes(query) ||
        organEn.includes(query) ||
        organBn.includes(query)
      );
    });
  }, [searchQuery, selectedCategory, language, symptoms]);

  return (
    <div className="relative min-h-screen flex flex-col antialiased bg-slate-50/60">
      <Navbar />

      {/* Fixed Ambient Background Glows */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[120px]" />
      </div>

      {/* Full-Width Edge-to-Edge Hero Banner */}
      <section className="relative z-10 w-full bg-slate-950 border-b border-line overflow-hidden">
        <div className="relative w-full h-[340px] sm:h-[440px] md:h-[520px] lg:h-[580px] bg-slate-900 overflow-hidden">
          <img
            src="/symptoms-cover-banner.png"
            alt={language === 'bn' ? 'ডা. হানিফ তৌহিদ - লক্ষণ নির্দেশিকা' : 'Dr. Hanif Towhid Symptom Directory'}
            className="w-full h-full object-cover object-center brightness-95"
          />

          {/* Smooth Gradient Overlays for Maximum Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none" />

          {/* Banner Text Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14 max-w-7xl mx-auto pointer-events-none">
            <div className="flex flex-col gap-3 max-w-3xl animate-in fade-in slide-in-from-bottom-5 duration-700 pointer-events-auto">
              
              {/* Specialist Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-white/30 backdrop-blur-md w-fit shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                  {language === 'bn' ? 'ক্লিনিকাল লক্ষণ নির্দেশিকা ও বিশ্লেষণ' : 'Clinical Symptom Directory & Analysis'}
                </span>
              </div>

              {/* Title Header */}
              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-xl">
                {language === 'bn'
                  ? 'আপনার শারীরিক লক্ষণ অনুযায়ী সঠিক চিকিৎসা নির্দেশিকা'
                  : 'Symptom-Targeted Clinical Diagnostics'}
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed drop-shadow max-w-2xl">
                {language === 'bn'
                  ? 'জ্বর, কোমরব্যথা, ক্লান্তি, শ্বাসকষ্ট বা পেটের অস্বস্তির মতো ১৪টি প্রাথমিক শারীরিক লক্ষণের গভীর শারীরবৃত্তীয় বিশ্লেষণ ও ডা. হানিফ আহমেদ তৌহিদের আধুনিক চিকিৎসা পদ্ধতি।'
                  : 'In-depth physiological overview, root cause analysis, red-flag indicators, and evidence-based clinical protocols for 14 major symptoms.'}
              </p>

              {/* Fast Jump Navigator Bar */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs text-emerald-200 font-semibold flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'দ্রুত নেভিগেট করুন:' : 'Quick jump:'}</span>
                </span>
                {detailedSymptomsList.slice(0, 5).map((sym: SymptomDetail) => (
                  <a
                    key={sym.slug}
                    href={`#${sym.slug}`}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/30 text-white backdrop-blur-md transition-colors border border-white/20"
                  >
                    {language === 'bn' ? sym.titleBn : sym.titleEn}
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="relative z-10 py-10 md:py-16 px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto flex flex-col gap-10 w-full">
        
        {/* Interactive Search & Filter Toolbar */}
        <section className="p-4 sm:p-5 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/90 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'bn'
                  ? 'লক্ষণ খুঁজুন (যেমন: জ্বর, ব্যথা, কাশি, বুক ধড়ফড়)...'
                  : 'Search symptoms (e.g., Fever, Cough, Chest Pain)...'
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white/90 text-xs sm:text-sm text-ink placeholder:text-muted focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* Category Filter Pills (Horizontal Scroll on Mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 custom-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-accent text-white shadow-md shadow-accent/25'
                  : 'bg-white text-muted hover:text-ink border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'সকল লক্ষণ' : 'All Symptoms'}</span>
              <span className="text-[10px] opacity-75 font-mono">({detailedSymptomsList.length})</span>
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = detailedSymptomsList.filter(
                (s: SymptomDetail) => (language === 'bn' ? s.categoryBn : s.categoryEn) === cat
              ).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-accent text-white shadow-md shadow-accent/25'
                      : 'bg-white text-muted hover:text-ink border border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[10px] opacity-75 font-mono">({count})</span>
                </button>
              );
            })}
          </div>

        </section>

        {/* Symptoms Detailed Articles List */}
        <section className="flex flex-col gap-12">
          {filteredSymptoms.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white/70 border border-slate-200 text-center flex flex-col items-center justify-center gap-3">
              <Activity className="w-10 h-10 text-muted/50 animate-pulse" />
              <h3 className="font-serif text-lg font-bold text-ink">
                {language === 'bn' ? 'কোনো লক্ষণ পাওয়া যায়নি' : 'No Symptoms Found'}
              </h3>
              <p className="text-xs text-muted">
                {language === 'bn' ? 'অনুগ্রহ করে ভিন্ন কোনো শব্দ দিয়ে অনুসন্ধান করুন।' : 'Please try searching with different keywords.'}
              </p>
            </div>
          ) : (
            filteredSymptoms.map((symptom: SymptomDetail, index: number) => (
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
                      Symptom #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Visual & Core Summary Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: High-res Symptom Image + Specialist Review + Red-Flag Warnings (4 Cols in 1 Column Stack) */}
                    <div className="lg:col-span-4 flex flex-col gap-5">
                      
                      {/* 1. Symptom Image */}
                      <div className="relative w-full aspect-4/3 sm:aspect-16/10 lg:aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-slate-100 group-hover:shadow-xl transition-all">
                        <img
                          src={symptom.image}
                          alt={symptom.titleEn}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* 2. Doctor Quick Consultation Box (Specialist Clinical Review) */}
                      <ZoomInScrollCard delay={60} className="w-full">
                        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/70 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col gap-2.5">
                          <div className="flex items-center gap-2 text-accent font-bold text-xs sm:text-[13px]">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{language === 'bn' ? 'সরাসরি ডাক্তারের পরামর্শ' : 'Specialist Clinical Review'}</span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-muted leading-relaxed">
                            {language === 'bn'
                              ? 'এই লক্ষণে ভুগলে সময়মতো চিকিৎসা নিয়ে স্থায়ী সুস্থতা নিশ্চিত করুন।'
                              : 'Consult Dr. Hanif Towhid for targeted evaluation and rational prescription.'}
                          </p>
                          <div className="flex items-center gap-2 pt-1.5">
                            <a
                              href="https://wa.me/8801346132486"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-accent hover:bg-ink text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
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

                      {/* 3. Emergency Red-Flag Warnings Box (With prominent top spacing and clear separation) */}
                      <ZoomInScrollCard delay={100} className="w-full mt-4 sm:mt-6">
                        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/30 hover:border-amber-500/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 animate-bounce" />
                            <span>
                              {language === 'bn'
                                ? 'জরুরি সতর্কবার্তা ও বিপদচিহ্ন'
                                : 'Emergency Red-Flag Warnings'}
                            </span>
                          </div>

                          <ul className="flex flex-col gap-2.5 text-xs text-amber-950/90 pl-0.5">
                            {(language === 'bn' ? symptom.redFlagsBn : symptom.redFlagsEn).map((flag: string, fIdx: number) => (
                              <li key={fIdx} className="flex items-start gap-2">
                                <span className="text-amber-600 font-bold shrink-0 text-[11px] mt-0.5">⚠️</span>
                                <span className="text-[11px] sm:text-xs leading-relaxed">{flag}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </ZoomInScrollCard>

                    </div>

                    {/* Right Column: Detailed Pathophysiology & Medical Overview (8 Cols) */}
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
                          {(language === 'bn' ? symptom.causesBn : symptom.causesEn).map((cause: { title: string; desc: string }, idx: number) => (
                            <ZoomInScrollCard
                              key={idx}
                              delay={idx * 60}
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

                      {/* Investigations & Doctor Hanif's Management Protocol (with Scroll Zoom-In) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* Investigation Checklist */}
                        <ZoomInScrollCard delay={100} className="h-full">
                          <div className="p-4 sm:p-5 rounded-2xl bg-white/90 hover:bg-white border border-slate-200 hover:border-accent/40 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col gap-2.5 h-full">
                            <div className="flex items-center gap-2 text-xs font-bold text-ink">
                              <Activity className="w-4 h-4 text-accent" />
                              <span>{language === 'bn' ? 'প্রয়োজনীয় পরীক্ষা-নিরীক্ষা' : 'Essential Diagnostic Tests'}</span>
                            </div>
                            <ul className="flex flex-col gap-1.5 text-[11px] text-muted pl-1">
                              {(language === 'bn' ? symptom.investigationsBn : symptom.investigationsEn).map((inv: string, iIdx: number) => (
                                <li key={iIdx} className="flex items-start gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{inv}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </ZoomInScrollCard>

                        {/* Dr. Hanif's Protocol */}
                        <ZoomInScrollCard delay={140} className="h-full">
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
