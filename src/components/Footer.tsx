'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { defaultSiteSettings, SiteSettings } from '@/data/siteSettingsData';
import supabase from '@/lib/supabase';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);

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
    <footer className="relative z-10 w-full py-12 px-6 md:px-12 bg-footer-bg backdrop-blur-[10px] border-t border-line text-white mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-white">
            {isBn ? (settings.siteTitleBn || 'ডা. হানিফ আহমেদ তৌহিদ') : (settings.siteTitleEn || 'Dr. Hanif Ahmed Towhid')}
          </span>
          <span className="text-[10px] text-gray-200 uppercase tracking-wider mt-1 opacity-80">
            {isBn ? (settings.siteTaglineBn || 'মেডিসিন বিশেষজ্ঞ · সিলেট') : (settings.siteTaglineEn || 'General Medicine Specialist · Sylhet')}
          </span>
        </div>

        <div className="text-center text-xs text-gray-300 max-w-md">
          <p>{isBn ? (settings.footerCopyrightBn || '© ২০২৬ সর্বস্বত্ব সংরক্ষিত।') : (settings.footerCopyrightEn || '© 2026 All rights reserved.')}</p>
          <p className="mt-2 text-[11px] text-gray-300 font-medium">
            <a
              href={settings.developerUrl || 'https://benzadidintelligence.com/'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 hover:text-white font-semibold underline underline-offset-2 transition-colors inline-block"
            >
              {isBn ? (settings.developerCreditBn || 'ডেভেলপমেন্ট বাই বেনজাদিদ ইন্টেলিজেন্স') : (settings.developerCreditEn || 'Developed by Benzadid Intelligence')}
            </a>
          </p>
        </div>

        <nav aria-label="Footer Navigation" className="flex gap-6 text-xs font-semibold">
          <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">
            {t('footer.privacy')}
          </Link>
          <Link href="/disclaimer" className="text-gray-300 hover:text-white transition-colors duration-200">
            Disclaimer
          </Link>
          <Link href="/portal" className="text-gray-300 hover:text-white transition-colors duration-200">
            {t('footer.patientPortal')}
          </Link>
        </nav>
      </div>
    </footer>
  );
};
