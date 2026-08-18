'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { diseaseData } from '@/locales/diseaseData';
import Link from 'next/link';
import { ArrowLeft, AlertCircle, CheckCircle2, Phone, MessageCircle } from 'lucide-react';

export default function ConditionDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  
  const slug = params.slug as string;
  const disease = diseaseData.find((d) => d.slug === slug);

  if (!disease) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="font-serif text-2xl font-bold text-ink">Condition Not Found</h1>
          <button 
            onClick={() => router.push('/conditions')}
            className="mt-4 px-4 py-2 bg-accent text-white rounded-xl text-xs font-semibold"
          >
            Back to Conditions
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col antialiased">
      <Navbar />

      {/* Fixed Background Image Layer */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
        <img
          src="/about-bg.jpeg"
          className="w-full h-full object-cover object-center brightness-95 opacity-25 blur-[5px]"
          alt="Clean background"
        />
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[0.5px]"></div>
      </div>

      {/* Scrollable Content */}
      <main className="relative z-10 py-12 px-6 md:px-12 max-w-3xl mx-auto flex flex-col gap-8 w-full">
        {/* Navigation Breadcrumb */}
        <div className="text-xs font-bold text-accent">
          <Link href="/conditions" className="inline-flex items-center gap-1 hover:text-ink">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'সব চিকিৎসাধীন রোগ' : 'All Conditions'}</span>
          </Link>
        </div>

        {/* Main Details Panel */}
        <section className="animate-in fade-in slide-in-from-bottom-5 duration-500">
          <GlassPanel className="flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">
                {language === 'bn' ? 'রোগের চিকিৎসাগত বিবরণ ও পরামর্শ' : 'Disease Clinical Profile & Analysis'}
              </span>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-ink leading-tight mt-0.5">
                {disease.title[language]}
              </h1>
            </div>

            <div className="text-sm md:text-base leading-relaxed text-muted pt-4 border-t border-line whitespace-pre-line flex flex-col gap-3">
              {disease.fullDesc[language]}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-line">
              {/* Symptoms */}
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-sm font-semibold text-ink">
                  {language === 'bn' ? 'সাধারণত দেখা যাওয়া লক্ষণসমূহ:' : 'Common Symptoms & Identifiers:'}
                </h3>
                <ul className="space-y-2">
                  {disease.symptoms[language].map((sym, sIdx) => (
                    <li key={sIdx} className="text-xs text-muted flex items-start gap-2 bg-white/30 p-2.5 rounded-xl border border-panel-border">
                      <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Treatments */}
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-sm font-semibold text-ink">
                  {language === 'bn' ? 'আমাদের চেম্বারে লভ্য চিকিৎসা পদ্ধতি:' : 'Treatment Modalities Offered:'}
                </h3>
                <ul className="space-y-2">
                  {disease.treatments[language].map((treat, tIdx) => (
                    <li key={tIdx} className="text-xs text-muted flex items-start gap-2 bg-white/30 p-2.5 rounded-xl border border-panel-border">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{treat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* General Advice */}
            <div className="mt-2 pt-4 border-t border-line">
              <h3 className="font-serif text-sm font-semibold text-ink mb-1.5">
                {language === 'bn' ? 'গুরুত্বপূর্ণ চিকিৎসাগত পরামর্শ:' : 'Important Clinical Advisory:'}
              </h3>
              <p className="text-xs leading-relaxed text-muted">
                {language === 'bn'
                  ? 'ডায়াবেটিস, প্রেসার বা থাইরয়েডের মতো হরমোন ও মেটাবলিক রোগ নিয়ন্ত্রণে চিকিৎসকের পরামর্শ ছাড়া হুট করে ওষুধ বন্ধ করা বা ডোজ পরিবর্তন করা অত্যন্ত ঝুঁকিপূর্ণ। কোনো উপসর্গ দীর্ঘস্থায়ী হলে অবিলম্বে পরীক্ষা করিয়ে পরামর্শ গ্রহণ করুন।'
                  : 'Adjusting or suddenly stopping chronic medications for conditions like diabetes, hypertension, or thyroid dysfunction without physician supervision is highly hazardous. If symptoms persist, seek diagnostics immediately.'}
              </p>
            </div>
          </GlassPanel>
        </section>

        {/* Dynamic CTA Card */}
        <section className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 border border-panel-border bg-accent/5">
          <div>
            <h3 className="font-serif text-base font-bold text-ink">
              {language === 'bn' ? 'চেম্বার অ্যাপয়েন্টমেন্ট বুকিং' : 'Schedule Diagnostic Assessment'}
            </h3>
            <p className="text-[10px] text-muted">
              {language === 'bn' ? 'চেম্বারে রোগী দেখানোর সিরিয়াল নিতে সরাসরি এখনই নিচে কল করুন।' : 'Secure your ticket during visiting hours for an in-person diagnostic review.'}
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="tel:+8801346132486"
              className="inline-flex items-center gap-1.5 bg-accent hover:bg-ink text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md cursor-pointer transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'কল করুন' : 'Call'}</span>
            </a>
            <a
              href="https://wa.me/8801346132486"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-accent hover:bg-ink text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md cursor-pointer transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
