'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { servicesData } from '@/locales/diseaseData';
import Link from 'next/link';
import { Pill, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

export default function Services() {
  const { language, t } = useLanguage();

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
                {language === 'bn' ? 'চিকিৎসাসেবা সমূহ' : 'Clinical Specialties'}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-ink">
                {language === 'bn'
                  ? 'উচ্চতর প্রশিক্ষণ ও সুক্ষ্ম রোগ নির্ণয়ের মেলবন্ধন।'
                  : 'Advanced Diagnosis & Focused Medical Care.'}
              </h1>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-muted pt-2 border-t border-line">
              {language === 'bn'
                ? 'সিলেটের রোগীদের জন্য মেডিসিনের উন্নত চিকিৎসাসেবা প্রদান। প্রতিটি সেবা আধুনিক ডায়াগনস্টিক প্রোটোকল মেনে কাস্টমাইজড থেরাপি সমন্বয়ে পরিচালিত হয়।'
                : 'Providing evidence-based internal medicine consulting in Sylhet. Every consulting is driven by standard clinical protocols and client ease.'}
            </p>
          </GlassPanel>
        </section>

        {/* Detailed Services list */}
        <section className="flex flex-col gap-6">
          {servicesData.map((service) => (
            <GlassPanel
              key={service.slug}
              className="hover:shadow-xl transition-all duration-300 flex flex-col gap-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center text-accent shrink-0">
                  {service.slug === 'general-medicine' ? (
                    <Pill className="w-6 h-6" />
                  ) : (
                    <ShieldCheck className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink mb-1">
                    {service.title[language]}
                  </h2>
                  <p className="text-xs text-accent font-semibold uppercase tracking-wider">
                    {service.slug.replace('-', ' ')}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted">
                {service.fullDesc[language]}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-line justify-between">
                <span className="flex items-center gap-1.5 text-[11px] text-muted font-medium tracking-wide">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  <span>Available Slots: 5:00 PM – 9:00 PM (Popular Chamber)</span>
                </span>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-ink hover:bg-accent text-white font-semibold text-xs rounded-xl shadow-md hover:-translate-y-0.5 transition-transform cursor-pointer"
                >
                  <span>{language === 'bn' ? 'বিস্তারিত সেবাসমূহ' : 'Read Full Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
