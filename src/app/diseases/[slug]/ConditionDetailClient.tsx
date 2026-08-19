'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { diseaseData, Disease } from '@/locales/diseaseData';
import Link from 'next/link';
import {
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Phone,
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Activity,
  ArrowRight,
  ChevronRight,
  HeartHandshake,
  FileText,
  AlertTriangle,
  Compass
} from 'lucide-react';

/**
 * Reusable scroll-reveal component with smooth bi-directional Zoom-in / Scale-in animation
 */
function AnimatedPointCard({
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

export default function ConditionDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  
  const slug = params.slug as string;
  const disease = diseaseData.find((d) => d.slug === slug);

  // Filter other diseases for quick browsing in the sidebar
  const otherDiseases = diseaseData
    .filter((d) => d.slug !== slug)
    .slice(0, 5);

  if (!disease) {
    return (
      <div className="min-h-screen flex flex-col antialiased bg-slate-50">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-md">
            <Activity className="w-12 h-12 text-accent mx-auto mb-3 animate-pulse" />
            <h1 className="font-serif text-2xl font-bold text-ink">
              {language === 'bn' ? 'রোগটি পাওয়া যায়নি' : 'Disease Profile Not Found'}
            </h1>
            <p className="text-xs text-muted mt-2">
              {language === 'bn' ? 'অনুগ্রহ করে চিকিৎসাধীন সকল রোগের তালিকায় ফিরে যান।' : 'Please return to our clinical directory to explore available diseases.'}
            </p>
            <button 
              onClick={() => router.push('/diseases')}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-ink text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'bn' ? 'চিকিৎসাধীন রোগসমূহে ফিরুন' : 'Back to Diseases Directory'}</span>
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col antialiased bg-slate-50/60">
      <Navbar />

      {/* Fixed Ambient Background Glows */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[120px]" />
      </div>

      {/* Scrollable Wide Main Container */}
      <main className="relative z-10 py-8 md:py-12 px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto flex flex-col gap-8 w-full">
        
        {/* Navigation Breadcrumb Bar */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-muted animate-in fade-in duration-500">
          <Link href="/" className="hover:text-accent transition-colors">
            {language === 'bn' ? 'হোম' : 'Home'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/diseases" className="hover:text-accent transition-colors">
            {language === 'bn' ? 'চিকিৎসাধীন রোগসমূহ' : 'Diseases We Treat'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-ink font-semibold truncate max-w-[200px] sm:max-w-none">
            {disease.title[language]}
          </span>
        </nav>

        {/* Top Hero Showcase Card (Glassmorphic Wide Banner) */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="rounded-3xl border border-white/90 bg-white/85 backdrop-blur-2xl shadow-xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
            
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/15 via-emerald-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Visual Disease Frame (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="relative w-full aspect-16/10 sm:aspect-16/9 lg:aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 border-2 border-white shadow-lg group">
                  <img
                    src={disease.image}
                    alt={disease.title[language]}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Slug Identifier Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] uppercase tracking-wider text-slate-800 font-mono font-bold bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-200/80 shadow-sm">
                      #{disease.slug}
                    </span>
                  </div>

                  {/* Specialty Tag */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium">
                    <Stethoscope className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{language === 'bn' ? 'মেডিসিন বিশেষজ্ঞ পরামর্শ' : 'Internal Medicine Care'}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Disease Headers & Quick Action (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-xs w-fit">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>
                    {language === 'bn' ? 'বিশেষজ্ঞ ক্লিনিকাল বিশ্লেষণ ও চিকিৎসা' : 'Specialist Clinical Analysis & Care'}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-ink leading-tight">
                  {disease.title[language]}
                </h1>

                {/* Lead Summary */}
                <p className="text-xs sm:text-sm md:text-base text-muted leading-relaxed">
                  {disease.shortDesc[language]}
                </p>

                {/* Highlight Stats Pill Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-white/80 border border-panel-border flex flex-col gap-0.5">
                    <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">
                      {language === 'bn' ? 'ক্লিনিকাল বিভাগ' : 'Department'}
                    </span>
                    <span className="text-xs font-bold text-ink truncate">
                      {language === 'bn' ? 'ইন্টারনাল মেডিসিন' : 'Internal Medicine'}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/80 border border-panel-border flex flex-col gap-0.5">
                    <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">
                      {language === 'bn' ? 'প্রধান লক্ষণসমূহ' : 'Key Symptoms'}
                    </span>
                    <span className="text-xs font-bold text-accent">
                      {disease.symptoms[language].length} {language === 'bn' ? 'টি লক্ষণ' : 'Indicators'}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/80 border border-panel-border col-span-2 sm:col-span-1 flex flex-col gap-0.5">
                    <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">
                      {language === 'bn' ? 'চিকিৎসা পদ্ধতি' : 'Protocols'}
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      {disease.treatments[language].length} {language === 'bn' ? 'ধাপের চিকিৎসা' : 'Steps'}
                    </span>
                  </div>
                </div>

                {/* Fast Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://wa.me/8801346132486"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-ink text-white font-semibold text-xs md:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে সিরিয়াল বুকিং' : 'Book Serial via WhatsApp'}</span>
                  </a>

                  <a
                    href="tel:01346132486"
                    className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-ink font-semibold text-xs md:text-sm border border-line shadow-xs transition-all cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-accent" />
                    <span>01346-132486</span>
                  </a>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Main Content Layout Grid (8 Cols Left Content + 4 Cols Right Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Comprehensive Medical Sections (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* 1. In-Depth Overview & Pathophysiology */}
            <section className="rounded-3xl border border-white/80 bg-white/80 backdrop-blur-xl shadow-md p-6 sm:p-8 flex flex-col gap-5">
              <div className="flex items-center gap-2.5 text-ink border-b border-line pb-4">
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-ink">
                    {language === 'bn' ? 'রোগের বিস্তারিত বিবরণ ও কারণ (Overview & Pathophysiology)' : 'Overview & Clinical Assessment'}
                  </h2>
                  <span className="text-[11px] text-muted">
                    {language === 'bn' ? 'রোগের উৎস, ঝুঁকি ও জটিলতার ক্লিনিকাল পর্যালোচনা' : 'Pathophysiology, risk factors and systemic health impact'}
                  </span>
                </div>
              </div>

              {/* Full Description with Smooth Zoom/Fade Scroll Animation */}
              <AnimatedPointCard delay={80} className="w-full">
                <div className="text-xs sm:text-sm md:text-[15px] text-ink/85 leading-relaxed font-normal whitespace-pre-line space-y-4 bg-slate-50/80 hover:bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition-all duration-300">
                  {disease.fullDesc[language]}
                </div>
              </AnimatedPointCard>
            </section>

            {/* 2. Interactive Symptoms & Identifiers (with Smooth Scroll Zoom-In Cards) */}
            <section className="rounded-3xl border border-white/80 bg-white/80 backdrop-blur-xl shadow-md p-6 sm:p-8 flex flex-col gap-5">
              <div className="flex items-center gap-2.5 text-ink border-b border-line pb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-ink">
                    {language === 'bn' ? 'প্রধান উপসর্গ ও লক্ষণসমূহ (Common Symptoms & Identifiers)' : 'Common Symptoms & Identifiers'}
                  </h3>
                  <span className="text-[11px] text-muted">
                    {language === 'bn' ? 'যেসব শারীরিক উপসর্গ দেখা দিলে সতর্ক হতে হবে' : 'Primary indicators and clinical warning signs'}
                  </span>
                </div>
              </div>

              {/* Animated Grid of Symptoms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {disease.symptoms[language].map((sym, sIdx) => (
                  <AnimatedPointCard
                    key={sIdx}
                    delay={sIdx * 60}
                    className="h-full"
                  >
                    <div className="p-4 rounded-2xl bg-white hover:bg-amber-50/30 border border-slate-200/80 hover:border-amber-400/70 shadow-2xs hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex items-start gap-3 group h-full cursor-default">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-white group-hover:scale-110 transition-all">
                        <AlertTriangle className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-[13px] text-ink/90 group-hover:text-ink leading-relaxed font-medium">
                        {sym}
                      </span>
                    </div>
                  </AnimatedPointCard>
                ))}
              </div>
            </section>

            {/* 3. Evidence-Based Treatment Modalities (with Smooth Scroll Zoom-In Cards) */}
            <section className="rounded-3xl border border-white/80 bg-white/80 backdrop-blur-xl shadow-md p-6 sm:p-8 flex flex-col gap-5">
              <div className="flex items-center gap-2.5 text-ink border-b border-line pb-4">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-ink">
                    {language === 'bn' ? 'ডা. হানিফের বিজ্ঞানসম্মত চিকিৎসা পদ্ধতি (Clinical Protocols)' : 'Evidence-Based Clinical Management Protocols'}
                  </h3>
                  <span className="text-[11px] text-muted">
                    {language === 'bn' ? 'আধুনিক গাইডলাইন অনুযায়ী লক্ষ্যভিত্তিক চিকিৎসা সেবা' : 'Tailored treatment modalities and diagnostic follow-up'}
                  </span>
                </div>
              </div>

              {/* Animated Grid of Treatments */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {disease.treatments[language].map((treat, tIdx) => (
                  <AnimatedPointCard
                    key={tIdx}
                    delay={tIdx * 60}
                    className="h-full"
                  >
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/20 hover:from-emerald-50 hover:to-white border border-emerald-200/80 hover:border-emerald-400 shadow-2xs hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex items-start gap-3 group h-full cursor-default">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 transition-all">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-[13px] text-ink/90 group-hover:text-emerald-950 leading-relaxed font-medium">
                        {treat}
                      </span>
                    </div>
                  </AnimatedPointCard>
                ))}
              </div>
            </section>

          </div>

          {/* Right Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Chamber Location & Serial Widget */}
            <AnimatedPointCard delay={100}>
              <GlassPanel className="p-6 rounded-3xl border border-white/80 bg-white/85 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all flex flex-col gap-4">
                <div className="flex items-center gap-2.5 text-accent font-bold text-sm border-b border-line pb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{language === 'bn' ? 'চেম্বার ও রোগী দেখার সময়' : 'Chamber & Visiting Hours'}</span>
                </div>

                <div className="flex flex-col gap-3 text-xs text-ink/90">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-ink">
                      {language === 'bn' ? 'পপুলার মেডিকেল সেন্টার লিমিটেড, সিলেট' : 'Popular Medical Center Ltd., Sylhet'}
                    </h4>
                    <p className="text-[11px] text-muted mt-0.5 leading-relaxed">
                      {language === 'bn' ? '(৬ষ্ঠ তলা, রুম নং-৬০৫), নিউ মেডিকেল রোড, কাজলশাহ, সিলেট।' : '(6th Floor, Room No-605), New Medical Road, Kazalshah, Sylhet.'}
                    </p>
                  </div>

                  <div className="flex items-start gap-2 pt-2 border-t border-line/70">
                    <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-ink">{language === 'bn' ? 'রোগী দেখার সময়:' : 'Visiting Hours:'}</span>
                      <p className="text-[11px] text-muted">
                        {language === 'bn' ? 'প্রতিদিন বিকাল ৫:০০টা – রাত ৯:০০টা (শুক্রবার বন্ধ)' : '5:00 PM – 9:00 PM (Friday Closed)'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2 border-t border-line/70">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-ink">{language === 'bn' ? 'সিরিয়াল বুকিং নম্বর:' : 'Serial Hotline:'}</span>
                      <p className="text-xs font-mono font-bold text-accent">01346-132486</p>
                      <span className="text-[10px] text-muted">{language === 'bn' ? '(সকাল ৯:০০টা থেকে কল করুন)' : '(Call after 9:00 AM)'}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Booking Actions */}
                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href="https://wa.me/8801346132486"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-accent hover:bg-ink text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে সিরিয়াল নিন' : 'WhatsApp Serial Booking'}</span>
                  </a>
                  <a
                    href="tel:01346132486"
                    className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-ink font-semibold text-xs transition-all border border-slate-200/80 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-accent" />
                    <span>{language === 'bn' ? 'সরাসরি কল করুন' : 'Direct Call Hotline'}</span>
                  </a>
                </div>
              </GlassPanel>
            </AnimatedPointCard>

            {/* Doctor Profile Brief */}
            <AnimatedPointCard delay={140}>
              <div className="p-5 rounded-3xl border border-slate-200/80 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/60 backdrop-blur-md shadow-sm hover:shadow-md transition-all flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-accent text-white flex items-center justify-center font-serif font-bold text-base shadow-sm">
                    Dr.H
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-ink">
                      {language === 'bn' ? 'ডা. হানিফ আহমেদ তৌহিদ' : 'Dr. Hanif Ahmed Towhid'}
                    </h4>
                    <p className="text-[10px] text-accent font-semibold">
                      MBBS, MCPS (Medicine), FCPS (Medicine)
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">
                  {language === 'bn'
                    ? 'রেজিস্ট্রার (মেডিসিন বিভাগ), সিলেট এম.এ.জি. ওসমানী মেডিকেল কলেজ হাসপাতাল।'
                    : 'Registrar (Department of Medicine), Sylhet MAG Osmani Medical College Hospital.'}
                </p>
              </div>
            </AnimatedPointCard>

            {/* Other Diseases Quick Jump Navigator */}
            <AnimatedPointCard delay={180}>
              <div className="p-5 rounded-3xl border border-white/80 bg-white/80 backdrop-blur-xl shadow-md hover:shadow-lg transition-all flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-ink uppercase tracking-wider border-b border-line pb-2.5">
                  <Compass className="w-4 h-4 text-accent" />
                  <span>{language === 'bn' ? 'অন্যান্য চিকিৎসাধীন রোগসমূহ' : 'Other Diseases We Treat'}</span>
                </div>

                <div className="flex flex-col gap-2">
                  {otherDiseases.map((other) => (
                    <Link
                      key={other.slug}
                      href={`/diseases/${other.slug}`}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100/90 border border-transparent hover:border-slate-200 transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <img
                            src={other.image}
                            alt={other.title[language]}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-medium text-ink group-hover:text-accent transition-colors line-clamp-1">
                          {other.title[language]}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                    </Link>
                  ))}
                </div>

                <Link
                  href="/diseases"
                  className="mt-2 pt-2.5 border-t border-line text-center text-xs font-bold text-accent hover:text-ink transition-colors flex items-center justify-center gap-1"
                >
                  <span>{language === 'bn' ? `সবগুলো রোগ দেখুন (${diseaseData.length}টি) →` : `View All ${diseaseData.length} Diseases →`}</span>
                </Link>
              </div>
            </AnimatedPointCard>

            {/* Essential Clinical Safety Advisory (Placed below 'Other Diseases We Treat' card) */}
            <AnimatedPointCard delay={220} className="w-full">
              <div className="rounded-3xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/30 hover:border-amber-500/50 p-5 sm:p-6 flex flex-col gap-2.5 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 animate-pulse" />
                  <span>
                    {language === 'bn' ? 'জরুরি চিকিৎসাগত সতর্কতা' : 'Essential Clinical Safety Advisory'}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-amber-950/90 leading-relaxed font-medium">
                  {language === 'bn'
                    ? 'ডায়াবেটিস, প্রেশার বা থাইরয়েডের মতো হরমোন ও মেটাবলিক রোগ নিয়ন্ত্রণে চিকিৎসকের পরামর্শ ছাড়া হঠাৎ ওষুধ বন্ধ করা বা ডোজ পরিবর্তন করা অত্যন্ত ঝুঁকিপূর্ণ। কোনো উপসর্গ দীর্ঘস্থায়ী হলে অবিলম্বে পরীক্ষা করিয়ে পরামর্শ গ্রহণ করুন।'
                    : 'Adjusting or abruptly stopping chronic medications for conditions like diabetes, hypertension, or thyroid dysfunction without physician supervision is hazardous. If symptoms persist or worsen, seek diagnostics and specialized review immediately.'}
                </p>
              </div>
            </AnimatedPointCard>

          </aside>

        </div>

      </main>

      <Footer />
    </div>
  );
}
