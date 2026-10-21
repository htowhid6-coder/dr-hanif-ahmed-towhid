'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { detailedSymptomsList, SymptomDetail } from '@/data/symptomsData';
import supabase from '@/lib/supabase';
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
  FileText,
  AlertTriangle,
  Compass,
  Zap,
  Droplets,
  Thermometer,
  Brain,
  HeartPulse,
  ShieldAlert,
  Flame,
  Wind,
} from 'lucide-react';

const SYMPTOM_ICON_MAP: Record<string, React.ElementType> = {
  'fever': Thermometer,
  'low-back-pain': Activity,
  'knee-pain': Zap,
  'fatigue': Sparkles,
  'headache': Brain,
  'restlessness': Clock,
  'palpitation': HeartPulse,
  'anxiety': ShieldAlert,
  'upper-abdominal-discomfort': AlertCircle,
  'epigastric-pain': Flame,
  'cough': Wind,
  'exertional-breathlessness': Stethoscope,
  'chest-pain': HeartPulse,
  'dysuria': Droplets,
};

function AnimatedCard({
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
          : 'opacity-0 scale-[0.97] translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function SymptomDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [symptoms, setSymptoms] = useState<SymptomDetail[]>(detailedSymptomsList);
  const [liveChamber, setLiveChamber] = useState<any>(null);

  const slug = params.slug as string;

  useEffect(() => {
    const loadData = async () => {
      try {
        const [symptomsRes, chamberRes] = await Promise.all([
          supabase.from('symptoms').select('*').order('order_index', { ascending: true }),
          supabase.from('chambers').select('*').eq('id', '00000000-0000-0000-0000-000000000000').maybeSingle(),
        ]);

        if (chamberRes.data) {
          setLiveChamber(chamberRes.data);
        }

        if (symptomsRes.data && symptomsRes.data.length > 0) {
          const mapped: SymptomDetail[] = symptomsRes.data.map((d: any, index: number) => {
            const fallback = detailedSymptomsList.find((s) => s.slug === d.slug) || detailedSymptomsList[index] || detailedSymptomsList[0];
            return {
              id: index + 1,
              slug: d.slug,
              titleEn: d.title_en || fallback.titleEn,
              titleBn: d.title_bn || fallback.titleBn,
              categoryEn: d.category_en || fallback.categoryEn,
              categoryBn: d.category_bn || fallback.categoryBn,
              organEn: d.organ_en || fallback.organEn,
              organBn: d.organ_bn || fallback.organBn,
              image: d.image || fallback.image || `/symptoms/${d.slug}.png`,
              shortDescEn: d.short_desc_en || fallback.shortDescEn,
              shortDescBn: d.short_desc_bn || fallback.shortDescBn,
              overviewEn: d.overview_en || fallback.overviewEn,
              overviewBn: d.overview_bn || fallback.overviewBn,
              causesEn: Array.isArray(d.causes_en) && d.causes_en.length > 0 ? d.causes_en : fallback.causesEn,
              causesBn: Array.isArray(d.causes_bn) && d.causes_bn.length > 0 ? d.causes_bn : fallback.causesBn,
              redFlagsEn: Array.isArray(d.red_flags_en) && d.red_flags_en.length > 0 ? d.red_flags_en : fallback.redFlagsEn,
              redFlagsBn: Array.isArray(d.red_flags_bn) && d.red_flags_bn.length > 0 ? d.red_flags_bn : fallback.redFlagsBn,
              investigationsEn: Array.isArray(d.investigations_en) && d.investigations_en.length > 0 ? d.investigations_en : fallback.investigationsEn,
              investigationsBn: Array.isArray(d.investigations_bn) && d.investigations_bn.length > 0 ? d.investigations_bn : fallback.investigationsBn,
              managementEn: d.management_en || fallback.managementEn,
              managementBn: d.management_bn || fallback.managementBn,
            };
          });

          // Ensure any missing static symptoms are merged in
          const seenSlugs = new Set(mapped.map((m) => m.slug));
          for (const fallback of detailedSymptomsList) {
            if (!seenSlugs.has(fallback.slug)) {
              mapped.push(fallback);
              seenSlugs.add(fallback.slug);
            }
          }
          setSymptoms(mapped);
        }
      } catch (err) {
        // Fallback safely to static detailedSymptomsList
      }
    };

    loadData();
  }, []);

  const symptom = symptoms.find((s) => s.slug === slug) || detailedSymptomsList.find((s) => s.slug === slug);

  // Other symptoms for sidebar recommendations
  const otherSymptoms = symptoms.filter((s) => s.slug !== slug).slice(0, 6);

  if (!symptom) {
    return (
      <div className="min-h-screen flex flex-col antialiased bg-slate-50">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-md">
            <Activity className="w-12 h-12 text-accent mx-auto mb-3 animate-pulse" />
            <h1 className="font-serif text-2xl font-bold text-ink">
              {isBn ? 'লক্ষণটি পাওয়া যায়নি' : 'Symptom Guide Not Found'}
            </h1>
            <p className="text-xs text-muted mt-2">
              {isBn
                ? 'অনুগ্রহ করে আমাদের সম্পূর্ণ লক্ষণ তালিকায় ফিরে যান।'
                : 'Please return to our clinical symptoms directory.'}
            </p>
            <button
              onClick={() => router.push('/symptoms')}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-ink text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isBn ? 'লক্ষণ তালিকায় ফিরুন' : 'Back to Symptoms Directory'}</span>
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const title = isBn ? symptom.titleBn : symptom.titleEn;
  const category = isBn ? symptom.categoryBn : symptom.categoryEn;
  const organ = isBn ? symptom.organBn : symptom.organEn;
  const shortDesc = isBn ? symptom.shortDescBn : symptom.shortDescEn;
  const overview = isBn ? symptom.overviewBn : symptom.overviewEn;
  const causes = isBn ? symptom.causesBn : symptom.causesEn;
  const redFlags = isBn ? symptom.redFlagsBn : symptom.redFlagsEn;
  const investigations = isBn ? symptom.investigationsBn : symptom.investigationsEn;
  const management = isBn ? symptom.managementBn : symptom.managementEn;

  const phone = liveChamber?.ticket_phone || '01346-132486';
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const chamberRoom = isBn
    ? liveChamber?.room_bn || 'রুম ৬০৫ (৬ষ্ঠ তলা), পপুলার মেডিকেল সেন্টার'
    : liveChamber?.room_en || 'Room 605 (6th Floor), Popular Medical Center';
  const chamberHours = isBn
    ? liveChamber?.hours_bn || 'প্রতিদিন বিকাল ৫:০০টা – রাত ৯:০০টা (শুক্রবার ও মঙ্গলবার বন্ধ)'
    : liveChamber?.hours_en || 'Daily 5:00 PM – 9:00 PM (Friday & Tuesday Closed)';

  const IconComponent = SYMPTOM_ICON_MAP[symptom.slug] || Activity;

  // JSON-LD structured data for MedicalCondition
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    name: symptom.titleEn,
    alternateName: symptom.titleBn,
    description: symptom.shortDescEn,
    associatedAnatomy: {
      '@type': 'AnatomicalStructure',
      name: symptom.organEn,
    },
    possibleTreatment: {
      '@type': 'MedicalTherapy',
      name: 'Evidence-Based Clinical Management',
      description: symptom.managementEn,
    },
    specialty: {
      '@type': 'MedicalSpecialty',
      name: 'Internal Medicine',
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col antialiased bg-slate-50/70">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      {/* Fixed Ambient Background Glows */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[130px]" />
      </div>

      {/* Main Container */}
      <main className="relative z-10 py-8 md:py-12 px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto flex flex-col gap-8 w-full">
        {/* Navigation Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-medium text-muted animate-in fade-in duration-500 flex-wrap"
        >
          <Link href="/" className="hover:text-accent transition-colors">
            {isBn ? 'হোম' : 'Home'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/symptoms" className="hover:text-accent transition-colors">
            {isBn ? 'লক্ষণ তালিকা ও গাইডলাইন' : 'Symptoms Directory'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-ink font-semibold truncate max-w-[240px] sm:max-w-none">
            {title}
          </span>
        </nav>

        {/* Top Hero Showcase Card */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="rounded-3xl border border-white/90 bg-white/85 backdrop-blur-2xl shadow-xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/15 via-emerald-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Symptom Visual Image Frame (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="relative w-full aspect-16/10 sm:aspect-16/9 lg:aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 border-2 border-white shadow-lg group">
                  <img
                    src={symptom.image}
                    alt={title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Icon Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md text-accent flex items-center justify-center shadow-md border border-white/80">
                      <IconComponent className="w-5 h-5" />
                    </span>
                  </div>

                  {/* Specialty Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-950/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium">
                    <span className="flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{isBn ? 'মেডিসিন বিশেষজ্ঞ পরামর্শ' : 'Internal Medicine Protocol'}</span>
                    </span>
                    <span className="text-[10px] text-emerald-300 font-mono font-bold">
                      {isBn ? 'প্রমাণভিত্তিক যত্ন' : 'Evidence-Based'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Headers & Action Buttons (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {/* Category & Organ Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    <span>{category}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 font-semibold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      {isBn ? `আক্রান্ত অঙ্গ: ${organ}` : `System: ${organ}`}
                    </span>
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-ink leading-tight">
                  {title}
                </h1>

                {/* Concise 1-2 sentence lead text */}
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {shortDesc}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent hover:bg-ink text-white font-semibold text-xs md:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{isBn ? 'সিরিয়ালের জন্য কল করুন' : 'Call for Serial Booking'}</span>
                  </a>

                  <a
                    href="https://wa.me/8801346132486"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs md:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isBn ? 'হোয়াটসঅ্যাপে বুকিং' : 'WhatsApp Serial'}</span>
                  </a>

                  <Link
                    href="/symptoms"
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-ink font-semibold text-xs md:text-sm border border-slate-200 shadow-xs transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 text-muted" />
                    <span>{isBn ? 'সকল লক্ষণ' : 'All Symptoms'}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Two-Column Layout: Left Content (8 Cols) & Right Sidebar (4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Clinical Details Column (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* 1. Deep Clinical Physiological Overview */}
            <AnimatedCard delay={100}>
              <div className="rounded-3xl border border-white/80 bg-white/90 backdrop-blur-xl shadow-lg p-6 sm:p-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 pb-3 border-b border-line">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">
                      {isBn ? 'ক্লিনিকাল পর্যালোচনা' : 'Clinical Overview'}
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                      {isBn ? 'শারীরবৃত্তীয় বিশ্লেষণ ও পর্যালোচনা' : 'Physiological Mechanism & Overview'}
                    </h2>
                  </div>
                </div>

                <div className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal space-y-4 pt-1">
                  {overview.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </AnimatedCard>

            {/* 2. Potential Causes & Underlying Etiologies */}
            {causes && causes.length > 0 && (
              <AnimatedCard delay={200}>
                <div className="rounded-3xl border border-white/80 bg-white/90 backdrop-blur-xl shadow-lg p-6 sm:p-8 flex flex-col gap-5">
                  <div className="flex items-center gap-3 pb-3 border-b border-line">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-700 flex items-center justify-center shrink-0">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
                        {isBn ? 'কারণসমূহ' : 'Etiologies'}
                      </span>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                        {isBn ? 'সম্ভাব্য মূল কারণ ও অন্তর্নিহিত ব্যাধি' : 'Underlying Root Causes'}
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3.5">
                    {causes.map((c, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-accent/40 shadow-2xs hover:shadow-sm transition-all duration-300 flex items-start gap-3.5 group"
                      >
                        <span className="w-7 h-7 rounded-xl bg-accent/10 text-accent font-mono font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                          {cIdx + 1}
                        </span>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-sm sm:text-base font-bold text-ink group-hover:text-accent transition-colors">
                            {c.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted leading-relaxed">
                            {c.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            )}

            {/* 3. Emergency Red-Flag Warnings */}
            {redFlags && redFlags.length > 0 && (
              <AnimatedCard delay={300}>
                <div className="rounded-3xl border border-rose-200/80 bg-gradient-to-br from-rose-50/90 via-white to-amber-50/70 backdrop-blur-xl shadow-lg p-6 sm:p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-rose-200/60">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-600 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                        {isBn ? 'জরুরি সতর্কতা' : 'Emergency Red Flags'}
                      </span>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                        {isBn ? 'কখন অবিলম্বে জরুরি চিকিৎসকের কাছে যাবেন?' : 'When to Seek Immediate Care'}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {isBn
                      ? 'নিচের যেকোনো একটি বা একাধিক লক্ষণ দেখা দিলে সময় অপচয় না করে দ্রুত অভিজ্ঞ মেডিসিন বিশেষজ্ঞের পরামর্শ নিন অথবা হাসপাতালে যোগাযোগ করুন:'
                      : 'If you notice one or more of these red-flag symptoms, do not delay—seek emergency specialist medical care immediately:'}
                  </p>

                  <div className="grid grid-cols-1 gap-2.5">
                    {redFlags.map((rf, rfIdx) => (
                      <div
                        key={rfIdx}
                        className="p-3.5 rounded-xl bg-white/90 border border-rose-200/70 flex items-start gap-3 shadow-2xs"
                      >
                        <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                          {rf}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            )}

            {/* 4. Recommended Diagnostic Investigations */}
            {investigations && investigations.length > 0 && (
              <AnimatedCard delay={400}>
                <div className="rounded-3xl border border-white/80 bg-white/90 backdrop-blur-xl shadow-lg p-6 sm:p-8 flex flex-col gap-5">
                  <div className="flex items-center gap-3 pb-3 border-b border-line">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                        {isBn ? 'ডায়াগনস্টিক টেস্ট' : 'Diagnostic Protocol'}
                      </span>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                        {isBn ? 'প্রয়োজনীয় রক্ত পরীক্ষা ও ডায়াগনস্টিক মূল্যায়ন' : 'Essential Diagnostic Tests'}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted">
                    {isBn
                      ? 'লক্ষণটির প্রকৃত কারণ শনাক্ত করে সঠিক চিকিৎসা শুরুর লক্ষ্যে একজন মেডিসিন বিশেষজ্ঞ সাধারণত নিচের পরীক্ষাগুলো বিবেচনা করেন:'
                      : 'To isolate the root etiology before administering targeted therapy, a specialist physician typically reviews:'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {investigations.map((inv, invIdx) => (
                      <div
                        key={invIdx}
                        className="p-3.5 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-200/70 flex items-start gap-2.5 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-800 font-medium leading-snug">
                          {inv}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            )}

            {/* 5. Specialist Management & Modern Treatment Protocol */}
            {management && (
              <AnimatedCard delay={500}>
                <div className="rounded-3xl border border-white/80 bg-white/90 backdrop-blur-xl shadow-lg p-6 sm:p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-line">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">
                        {isBn ? 'চিকিৎসা পরিকল্পনা' : 'Management Plan'}
                      </span>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                        {isBn ? 'ডা. হানিফ তৌহিদের প্রমাণভিত্তিক চিকিৎসা প্রটোকল' : 'Evidence-Based Clinical Protocol'}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal pt-1">
                    {management}
                  </p>
                </div>
              </AnimatedCard>
            )}

            {/* Bottom Appointment CTA Banner */}
            <AnimatedCard delay={600}>
              <div className="rounded-3xl bg-gradient-to-br from-[#205A4D] to-[#12382F] text-white p-6 sm:p-8 md:p-10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex flex-col gap-2 max-w-xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    {isBn ? 'মেডিসিন বিশেষজ্ঞের পরামর্শ' : 'Specialist Consultation'}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                    {isBn
                      ? 'আপনার লক্ষণটির সঠিক সমাধান নিশ্চিত করুন'
                      : 'Get Accurate Medical Care for Your Symptoms'}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                    {isBn
                      ? 'অপ্রয়োজনীয় ওষুধ বা অ্যান্টিবায়োটিক সেবন না করে একজন অভিজ্ঞ মেডিসিন বিশেষজ্ঞের তত্ত্বাবধানে বিজ্ঞানসম্মত চিকিৎসা নিন।'
                      : 'Avoid self-medication. Receive evidence-based diagnosis and scientific treatment under specialist supervision.'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-[#12382F] font-bold text-xs md:text-sm shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{phone}</span>
                  </a>
                  <a
                    href="https://wa.me/8801346132486"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs md:text-sm shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Right Sticky Sidebar (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
            {/* 1. Chamber & Serial Booking Card */}
            <div className="rounded-3xl border border-white/90 bg-white/90 backdrop-blur-xl shadow-lg p-5 sm:p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-serif text-base sm:text-lg font-bold text-ink">
                  {isBn ? 'চেম্বার ও সিরিয়াল তথ্য' : 'Chamber & Appointments'}
                </h3>
              </div>

              <div className="flex flex-col gap-3 text-xs text-slate-700">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink">{chamberRoom}</strong>
                    <span className="text-muted">
                      {isBn
                        ? 'নিউ মেডিকেল রোড, কাজলশাহ, সিলেট।'
                        : 'New Medical Road, Kazalshah, Sylhet.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink">{isBn ? 'রোগী দেখার সময়' : 'Visiting Hours'}</strong>
                    <span className="text-muted">{chamberHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/70">
                  <Phone className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-emerald-900">{isBn ? 'সিরিয়াল হটলাইন' : 'Serial Booking'}</strong>
                    <a
                      href={`tel:${cleanPhone}`}
                      className="text-accent hover:text-ink font-mono font-bold text-sm transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/8801346132486"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#205A4D] hover:bg-[#163f36] text-white font-semibold text-xs transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{isBn ? 'সিরিয়ালের জন্য মেসেজ দিন' : 'Book via WhatsApp'}</span>
              </a>
            </div>

            {/* 2. Other Key Symptoms Directory */}
            <div className="rounded-3xl border border-white/90 bg-white/90 backdrop-blur-xl shadow-lg p-5 sm:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base sm:text-lg font-bold text-ink flex items-center gap-2">
                  <Compass className="w-4 h-4 text-accent" />
                  <span>{isBn ? 'অন্যান্য লক্ষণসমূহ' : 'Other Key Symptoms'}</span>
                </h3>
                <Link
                  href="/symptoms"
                  className="text-[11px] font-bold text-accent hover:text-ink transition-colors"
                >
                  {isBn ? 'সব দেখুন →' : 'View all →'}
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                {otherSymptoms.map((other) => {
                  const OtherIcon = SYMPTOM_ICON_MAP[other.slug] || Activity;
                  return (
                    <Link
                      key={other.slug}
                      href={`/symptoms/${other.slug}`}
                      className="p-3 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/70 hover:border-accent/40 shadow-2xs hover:shadow-sm transition-all duration-300 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                          <OtherIcon className="w-3.5 h-3.5" />
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-ink group-hover:text-accent transition-colors truncate">
                            {isBn ? other.titleBn : other.titleEn}
                          </span>
                          <span className="text-[10px] text-muted truncate">
                            {isBn ? other.categoryBn : other.categoryEn}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 3. Safe Medical Guidance Reminder */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col gap-2 shadow-2xs">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{isBn ? 'জরুরি স্বাস্থ্য পরামর্শ' : 'Clinical Health Reminder'}</span>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                {isBn
                  ? 'কোনো শারীরিক লক্ষণ অবহেলা করবেন না বা না বুঝে ব্যথানাশক ওষুধ সেবন করবেন না। সুনির্দিষ্ট রোগ নির্ণয়ের জন্য অভিজ্ঞ চিকিৎসকের পরামর্শ নিন।'
                  : 'Never self-medicate with unprescribed analgesics or antibiotics. Always seek precise diagnosis under an expert medicine physician.'}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
