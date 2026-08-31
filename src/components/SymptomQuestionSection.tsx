'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { defaultSiteSettings, SiteSettings } from '@/data/siteSettingsData';
import supabase from '@/lib/supabase';

export const SymptomQuestionSection: React.FC = () => {
  const { language } = useLanguage();
  const [inView, setInView] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch settings & listen to updates
  useEffect(() => {
    const loadSettings = async () => {
      if (typeof window !== 'undefined') {
        const local = localStorage.getItem('site_settings_data');
        if (local) {
          try {
            setSettings(prev => ({ ...prev, ...JSON.parse(local) }));
          } catch (e) {}
        }
      }

      try {
        const { data } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 'global_settings')
          .maybeSingle();

        if (data?.data) {
          setSettings(prev => ({ ...prev, ...data.data }));
        }
      } catch (err) {}
    };

    loadSettings();

    const handleUpdate = () => loadSettings();
    window.addEventListener('site_settings_updated', handleUpdate);
    return () => window.removeEventListener('site_settings_updated', handleUpdate);
  }, []);

  const isBn = language === 'bn';

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-background via-[#e4f6ef] to-[#D0E8E0] py-20 sm:py-28 md:py-32 px-6 flex flex-col items-center justify-center text-center border-t border-line scroll-mt-16"
    >
      {/* Soft Glow Radial Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div
        className={`relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-6 transition-all duration-1000 ease-out transform ${
          inView ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-16 opacity-0 scale-95'
        }`}
      >
        {/* Floating Question Icon / Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-semibold text-xs uppercase tracking-widest backdrop-blur-md shadow-sm">
          <HelpCircle className="w-4 h-4 text-accent" />
          <span>{isBn ? settings.questionBannerBadgeBn : settings.questionBannerBadgeEn}</span>
        </div>

        {/* The Big Hooking Question */}
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.15] max-w-4xl drop-shadow-sm">
          {isBn ? settings.questionBannerTitleBn : settings.questionBannerTitleEn}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-muted max-w-2xl leading-relaxed">
          {isBn ? settings.questionBannerSubtitleBn : settings.questionBannerSubtitleEn}
        </p>

        {/* Animated Scroll Down Indicator */}
        <div className="flex flex-col items-center gap-2 mt-4 text-accent animate-bounce">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
            {isBn ? settings.questionBannerIndicatorBn : settings.questionBannerIndicatorEn}
          </span>
          <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-sm">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  );
};
