'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { Globe, PhoneCall, Calendar, Menu, X } from 'lucide-react';
import { defaultSiteSettings, SiteSettings } from '@/data/siteSettingsData';
import supabase from '@/lib/supabase';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.conditions'), href: '/diseases' },
    { name: t('nav.symptoms'), href: '/symptoms' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.faq'), href: '/faq' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const isBn = language === 'bn';

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-6 py-4 bg-white/35 backdrop-blur-[18px] border-b border-panel-border shadow-sm md:px-12">
      <div className="flex flex-col">
        <Link href="/" className="font-serif text-lg md:text-xl font-bold tracking-tight text-ink hover:opacity-90">
          {isBn ? (settings.siteTitleBn || 'ডা. হানিফ আহমেদ তৌহিদ') : (settings.siteTitleEn || 'Dr. Hanif Ahmed Towhid')}
        </Link>
        <span className="text-[10px] text-muted uppercase tracking-wider font-semibold">
          {isBn ? (settings.siteTaglineBn || 'মেডিসিন বিশেষজ্ঞ') : (settings.siteTaglineEn || 'General Medicine Specialist')}
        </span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-muted hover:text-accent transition-colors duration-200"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* CTA Buttons (Desktop) */}
      <div className="hidden lg:flex items-center gap-4">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-panel-border bg-white/50 text-accent font-semibold text-xs hover:bg-white transition-all cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
        </button>

        <a
          href={`https://wa.me/${settings.whatsappNumber || '8801346132486'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-accent text-white px-5 py-2 rounded-full font-semibold text-xs hover:-translate-y-0.5 transition-transform shadow-md hover:shadow-lg cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{t('nav.appointment')}</span>
        </a>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden text-ink p-1 focus:outline-none cursor-pointer"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="absolute top-[69px] left-0 w-full bg-white/95 backdrop-blur-md border-b border-panel-border p-6 flex flex-col gap-4 lg:hidden shadow-lg animate-in fade-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-muted hover:text-accent py-1.5 border-b border-line"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-between mt-2 pt-2">
            <button
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-panel-border bg-white text-accent font-semibold text-sm hover:bg-slate-50 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}</span>
            </button>

            <a
              href={`https://wa.me/${settings.whatsappNumber || '8801346132486'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-accent text-white px-5 py-2.5 rounded-full font-semibold text-sm text-center shadow-md cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t('nav.appointment')}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
