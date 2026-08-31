'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { diseaseData, Disease } from '@/locales/diseaseData';
import Link from 'next/link';
import { Activity, ArrowRight, Sparkles, Search, Stethoscope } from 'lucide-react';
import supabase from '@/lib/supabase';

export default function DiseasesPage() {
  const { language } = useLanguage();
  const [diseases, setDiseases] = useState<Disease[]>(diseaseData);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadDiseases = async () => {
      // 1. LocalStorage
      if (typeof window !== 'undefined') {
        const local = localStorage.getItem('diseases_data');
        if (local) {
          try {
            const parsed = JSON.parse(local);
            if (Array.isArray(parsed) && parsed.length > 0) setDiseases(parsed);
          } catch (e) {}
        }
      }

      // 2. Supabase
      try {
        const { data, error } = await supabase
          .from('diseases')
          .select('*');

        if (!error && data && data.length > 0) {
          const mapped: Disease[] = data.map((d: any) => ({
            slug: d.slug,
            image: d.image || '/Diseases_Images/diabetes.jpg',
            title: { en: d.title_en, bn: d.title_bn },
            shortDesc: { en: d.short_desc_en, bn: d.short_desc_bn },
            fullDesc: { en: d.full_desc_en, bn: d.full_desc_bn },
            symptoms: {
              en: Array.isArray(d.symptoms_en) ? d.symptoms_en : [],
              bn: Array.isArray(d.symptoms_bn) ? d.symptoms_bn : []
            },
            treatments: {
              en: Array.isArray(d.treatments_en) ? d.treatments_en : [],
              bn: Array.isArray(d.treatments_bn) ? d.treatments_bn : []
            }
          }));
          setDiseases(mapped);
          if (typeof window !== 'undefined') {
            localStorage.setItem('diseases_data', JSON.stringify(mapped));
          }
        }
      } catch (err) {}
    };

    loadDiseases();

    const handleUpdate = () => loadDiseases();
    window.addEventListener('diseases_updated', handleUpdate);
    return () => window.removeEventListener('diseases_updated', handleUpdate);
  }, []);

  const filteredDiseases = useMemo(() => {
    return diseases.filter((d) => {
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
  }, [diseases, searchTerm, language]);

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
                {language === 'bn' ? `চিকিৎসাধীন রোগের তালিকা (${diseases.length}টি)` : `Clinical Directory (${diseases.length} Diseases)`}
              </h2>
              <p className="text-[11px] text-muted">
                {language === 'bn' ? 'যেকোনো রোগের বিস্তারিত তথ্য ও গাইডলাইন জানতে কার্ডে ক্লিক করুন' : 'Select any disease card below for in-depth pathophysiology and management guidance'}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-accent absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'bn' ? 'রোগের নাম খুঁজুন...' : 'Search disease...'}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-panel-border bg-white text-xs text-ink placeholder:text-muted focus:outline-none focus:border-accent shadow-xs"
            />
          </div>
        </section>

        {/* Dynamic Responsive Disease Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map((disease) => (
            <Link
              key={disease.slug}
              href={`/diseases/${disease.slug}`}
              className="group flex flex-col justify-between rounded-2xl bg-white/85 hover:bg-white border border-panel-border/80 hover:border-accent/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div>
                {/* Disease Feature Image */}
                <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100">
                  <img
                    src={disease.image}
                    alt={disease.title[language]}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Badge */}
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white uppercase tracking-wider bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    {language === 'bn' ? 'ক্লিনিক্যাল গাইড' : 'Clinical Protocol'}
                  </span>
                </div>

                {/* Content Box */}
                <div className="p-5 sm:p-6 flex flex-col gap-3">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-ink group-hover:text-accent transition-colors leading-snug">
                    {disease.title[language]}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-3">
                    {disease.shortDesc[language]}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-5 sm:px-6 pb-5 pt-2 flex items-center justify-between border-t border-line/60 mt-auto">
                <span className="text-xs font-semibold text-accent group-hover:underline flex items-center gap-1">
                  <span>{language === 'bn' ? 'চিকিৎসা পদ্ধতি পড়ুন' : 'Read Full Guide'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] text-muted font-mono">
                  {disease.symptoms?.[language]?.length || 0} {language === 'bn' ? 'টি লক্ষণ' : 'symptoms'}
                </span>
              </div>
            </Link>
          ))}
        </section>

      </main>

      <Footer />
    </div>
  );
}
