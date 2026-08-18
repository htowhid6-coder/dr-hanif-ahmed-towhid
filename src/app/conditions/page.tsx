'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { diseaseData } from '@/locales/diseaseData';
import Link from 'next/link';
import { Activity, ArrowRight } from 'lucide-react';

export default function Conditions() {
  const { language } = useLanguage();

  return (
    <div className="relative min-h-screen flex flex-col antialiased">
      <Navbar />

      {/* Fixed Background Image Layer */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
        <img
          src="/about-bg.jpeg"
          className="w-full h-full object-cover object-center brightness-95 opacity-30 blur-[6px]"
          alt="Clean clinic background"
        />
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[0.5px]"></div>
      </div>

      {/* Scrollable Content */}
      <main className="relative z-10 py-12 px-6 md:px-12 max-w-4xl mx-auto flex flex-col gap-10 w-full">
        {/* Intro */}
        <section className="animate-in fade-in slide-in-from-bottom-5 duration-500">
          <GlassPanel className="flex flex-col gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                <span className="w-6 h-0.5 bg-accent inline-block"></span>
                {language === 'bn' ? 'চিকিৎসাধীন রোগসমূহ' : 'Conditions We Treat'}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-ink">
                {language === 'bn'
                  ? 'ডায়াবেটিস, হরমোনজনিত ও জটিল শারীরিক সমস্যা।'
                  : 'Advanced Care for Diabetes, Hormones, & Chronic Illnesses.'}
              </h1>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-muted pt-2 border-t border-line">
              {language === 'bn'
                ? 'সিলেটে চিকিৎসাধীন বিভিন্ন রোগ ও লক্ষণের ক্লিনিকাল বিশ্লেষণ। সঠিক মূল্যায়ন এবং আধুনিক চিকিৎসার মাধ্যমে দীর্ঘমেয়াদী সুস্থতা নিশ্চিত করা আমাদের অঙ্গীকার।'
                : 'Scientific breakdown of various metabolic, hormonal, and chronic conditions treated by Dr. Hanif in Sylhet. Focused assessment helps ensure long-term health stabilization.'}
            </p>
          </GlassPanel>
        </section>

        {/* Detailed Conditions grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {diseaseData.map((disease) => (
            <GlassPanel
              key={disease.slug}
              className="hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-accent shrink-0" />
                  <h2 className="font-serif text-lg font-bold text-ink">
                    {disease.title[language]}
                  </h2>
                </div>
                <p className="text-xs leading-relaxed text-muted">
                  {disease.shortDesc[language]}
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-line">
                <span className="text-[9px] uppercase tracking-wider text-muted font-bold">
                  {disease.slug}
                </span>
                <Link
                  href={`/conditions/${disease.slug}`}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-ink hover:bg-accent text-white font-semibold text-[10px] rounded-lg shadow-sm hover:-translate-y-0.5 transition-transform cursor-pointer"
                >
                  <span>{language === 'bn' ? 'বিশ্লেষণ পড়ুন' : 'Read Analysis'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </GlassPanel>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
