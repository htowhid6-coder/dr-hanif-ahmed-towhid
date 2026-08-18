'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { Stethoscope, HeartHandshake, CheckCircle2, MessageCircle, Quote, Award } from 'lucide-react';

export default function About() {
  const { language, t } = useLanguage();

  return (
    <div className="relative min-h-screen flex flex-col antialiased">
      <Navbar />

      {/* Fixed Background Image Layer */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
        <img
          src="/about-bg.jpeg"
          className="w-full h-full object-cover object-center brightness-95 opacity-40 blur-[4px]"
          alt="Clean medical steel diagnostic equipment background"
        />
        <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px]"></div>
      </div>

      {/* Scrollable Content */}
      <main className="relative z-10 py-12 px-6 md:px-12 max-w-4xl mx-auto flex flex-col gap-12 w-full">
        {/* Intro Section */}
        <section className="animate-in fade-in slide-in-from-bottom-5 duration-500">
          <GlassPanel className="flex flex-col gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                <span className="w-6 h-0.5 bg-accent inline-block"></span>
                {t('aboutPage.eyebrow')}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-ink">
                {t('aboutPage.title')}
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base leading-relaxed text-muted pt-4 border-t border-line">
              <p>{t('aboutPage.journey_p1')}</p>
              <p className="border-l-0 md:border-l border-line pl-0 md:pl-6">
                {t('aboutPage.journey_p2')}
              </p>
            </div>
          </GlassPanel>
        </section>

        {/* Qualifications Timeline */}
        <section>
          <GlassPanel className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-ink">
                  {t('aboutPage.milestones_title')}
                </h2>
                <p className="text-xs text-muted mt-0.5">
                  {t('aboutPage.milestones_lead')}
                </p>
              </div>
            </div>

            <div className="relative border-l-2 border-line ml-4 md:ml-6 space-y-8 pb-4">
              {/* FCPS */}
              <div className="relative pl-8">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-accent shadow-[0_0_0_4px_rgba(47,111,94,0.2)]"></div>
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-1">
                  {t('aboutPage.milestone_fcps_date')}
                </span>
                <h3 className="font-serif text-base font-bold text-ink mb-1">
                  {t('aboutPage.milestone_fcps_title')}
                </h3>
                <p className="text-xs leading-relaxed text-muted">
                  {t('aboutPage.milestone_fcps_desc')}
                </p>
              </div>

              {/* MCPS */}
              <div className="relative pl-8">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-accent/40 border-2 border-panel-border"></div>
                <span className="text-[10px] font-bold text-accent/80 uppercase tracking-wider block mb-1">
                  {t('aboutPage.milestone_mcps_date')}
                </span>
                <h3 className="font-serif text-base font-bold text-ink mb-1">
                  {t('aboutPage.milestone_mcps_title')}
                </h3>
                <p className="text-xs leading-relaxed text-muted">
                  {t('aboutPage.milestone_mcps_desc')}
                </p>
              </div>

              {/* BCS */}
              <div className="relative pl-8">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-accent/40 border-2 border-panel-border"></div>
                <span className="text-[10px] font-bold text-accent/80 uppercase tracking-wider block mb-1">
                  {t('aboutPage.milestone_bcs_date')}
                </span>
                <h3 className="font-serif text-base font-bold text-ink mb-1">
                  {t('aboutPage.milestone_bcs_title')}
                </h3>
                <p className="text-xs leading-relaxed text-muted">
                  {t('aboutPage.milestone_bcs_desc')}
                </p>
              </div>

              {/* MBBS */}
              <div className="relative pl-8">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-accent/40 border-2 border-panel-border"></div>
                <span className="text-[10px] font-bold text-accent/80 uppercase tracking-wider block mb-1">
                  {t('aboutPage.milestone_mbbs_date')}
                </span>
                <h3 className="font-serif text-base font-bold text-ink mb-1">
                  {t('aboutPage.milestone_mbbs_title')}
                </h3>
                <p className="text-xs leading-relaxed text-muted">
                  {t('aboutPage.milestone_mbbs_desc')}
                </p>
              </div>
            </div>
          </GlassPanel>
        </section>

        {/* Expertise & Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Clinical Expertise */}
          <GlassPanel className="flex flex-col justify-between p-6 md:p-8">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent mb-4">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-xl font-bold text-ink mb-2">
                {t('aboutPage.expertise_title')}
              </h2>
              <p className="text-xs text-muted mb-6">
                {t('aboutPage.expertise_lead')}
              </p>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-xs font-semibold text-ink leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{t('aboutPage.expertise_item1')}</span>
              </li>
              <li className="flex items-start gap-2 text-xs font-semibold text-ink leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{t('aboutPage.expertise_item2')}</span>
              </li>
              <li className="flex items-start gap-2 text-xs font-semibold text-ink leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{t('aboutPage.expertise_item3')}</span>
              </li>
            </ul>
          </GlassPanel>

          {/* Philosophy */}
          <GlassPanel className="flex flex-col justify-between p-6 md:p-8">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-xl font-bold text-ink mb-4">
                {t('aboutPage.philosophy_title')}
              </h2>
              <blockquote className="border-l-4 border-accent pl-4 italic text-xs leading-relaxed text-muted mb-4 relative">
                <Quote className="w-4 h-4 text-accent/30 inline-block mr-1 -mt-1" />
                "{t('aboutPage.philosophy_quote')}"
              </blockquote>
            </div>
            <p className="text-xs leading-relaxed text-muted mt-2">
              {t('aboutPage.philosophy_p')}
            </p>
          </GlassPanel>
        </div>

        {/* Call to Action */}
        <section className="glass-panel p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-md border border-panel-border">
          <div className="text-center md:text-left flex flex-col gap-1">
            <h3 className="font-serif text-lg font-bold text-ink">
              {language === 'bn' ? 'সরাসরি চেম্বারে এসে দেখান' : 'Visit Chamber in Person'}
            </h3>
            <p className="text-xs text-muted">
              {language === 'bn'
                ? 'পপুলার মেডিকেল সেন্টারে সরাসরি আসার আগে কল দিয়ে সিরিয়াল নিশ্চিত করুন।'
                : 'Confirm your consulting slot at Popular Medical Center before visiting.'}
            </p>
          </div>
          <a
            href="https://wa.me/8801346132486"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-ink text-white px-5 py-3 rounded-xl font-semibold text-xs shadow-md hover:-translate-y-0.5 transition-all whitespace-nowrap cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে সিরিয়াল নিন' : 'Book via WhatsApp'}</span>
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
