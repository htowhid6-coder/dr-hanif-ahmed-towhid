'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { GlassPanel } from '@/components/GlassPanel';
import { defaultSiteSettings, SiteSettings } from '@/data/siteSettingsData';
import supabase from '@/lib/supabase';
import {
  Save,
  Sparkles,
  RefreshCw,
  Image as ImageIcon,
  CheckCircle2,
  Globe,
  Sliders,
  HelpCircle,
  Phone,
  MessageCircle,
  ExternalLink,
  Layers,
  ArrowRight,
  QrCode,
  Smartphone,
  Download,
  Star,
  ArrowUpRight
} from 'lucide-react';

import { ImagePickerField } from '@/components/admin/ImagePickerField';

export const SiteSettingsManager: React.FC = () => {

  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [activeSubTab, setActiveSubTab] = useState<'specialist' | 'question' | 'banners' | 'urgentCta' | 'global' | 'googleReview'>('specialist');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Preset images
  const imagePresets = [
    { label: 'Doctor Consultation Room', path: '/doctor-consultation-bg.png' },
    { label: 'Aesthetic Banner 2 (Excellence)', path: '/Section Breaking Aesthetic Image_2.png' },
    { label: 'Aesthetic Banner 3 (Patient Care)', path: '/Section Breaking Aesthetic Image_3.png' },
    { label: 'About Page Hero Shot', path: '/Dr. Hanif_About page hero section image.png' },
    { label: 'Clean Ambient Background', path: '/about-bg.jpeg' },
    { label: 'Doctor Chamber Background', path: '/chamber-bg.png' },
  ];

  // Load from Supabase & LocalStorage
  const fetchSettings = async () => {
    // 1. LocalStorage
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('site_settings_data');
      if (local) {
        try {
          const parsed = JSON.parse(local);
          setSettings(prev => ({ ...prev, ...parsed }));
        } catch (e) {
          console.error(e);
        }
      }
    }

    // 2. Supabase
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'global_settings')
        .maybeSingle();

      if (!error && data?.data) {
        setSettings(prev => ({ ...prev, ...data.data }));
        if (typeof window !== 'undefined') {
          localStorage.setItem('site_settings_data', JSON.stringify({ ...defaultSiteSettings, ...data.data }));
        }
      }
    } catch (err) {
      console.warn('Could not fetch site_settings from Supabase:', err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // 1. Save to LocalStorage immediately & broadcast event
      if (typeof window !== 'undefined') {
        localStorage.setItem('site_settings_data', JSON.stringify(settings));
        window.dispatchEvent(new Event('site_settings_updated'));
      }

      // 2. Upsert to Supabase
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          id: 'global_settings',
          category: 'general',
          data: settings,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

      if (error) {
        console.warn('Supabase site_settings upsert notice:', error);
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      alert(isBn ? 'সাইট সেটিংস ও কনটেন্ট সফলভাবে সংরক্ষিত হয়েছে!' : 'Site settings and content saved successfully!');
    } catch (err: any) {
      console.error(err);
      alert(isBn ? `সংরক্ষণ ত্রুটি: ${err.message || 'ব্যর্থ হয়েছে'}` : `Failed to save: ${err.message || 'Error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefault = () => {
    if (confirm(isBn ? 'আপনি কি সব সেটিংস ডিফল্ট মানে রিসেট করতে চান?' : 'Reset all settings to initial default values?')) {
      setSettings(defaultSiteSettings);
      if (typeof window !== 'undefined') {
        localStorage.setItem('site_settings_data', JSON.stringify(defaultSiteSettings));
        window.dispatchEvent(new Event('site_settings_updated'));
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 p-5 rounded-2xl border border-panel-border shadow-sm">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" />
            {isBn ? 'গ্লোবাল ওয়েবসাইট কনটেন্ট এডিটর' : 'Global Website Content Editor'}
          </span>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-ink mt-0.5">
            {isBn ? 'হোমপেজ, ব্যানার ও সাইট সেটিংস নিয়ন্ত্রণ' : 'Control Homepage, Banners & Global Text/Images'}
          </h2>
          <p className="text-xs text-muted mt-1">
            {isBn
              ? 'ওয়েবসাইট-এর প্রতিটি সেকশনের শিরোনাম, বর্ণনা, ছবি, ব্যাজ ও বাটন লিঙ্ক এখানে তাৎক্ষণিকভাবে পরিবর্তন করুন।'
              : 'Edit and manage texts, titles, image URLs, badges, and action buttons across all page sections.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-ink cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-muted" />
            <span>{isBn ? 'ডিফল্ট রিসেট' : 'Reset Defaults'}</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-xl bg-accent hover:bg-ink text-white shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? (isBn ? 'সেভ হচ্ছে...' : 'Saving...') : (isBn ? 'সকল পরিবর্তন সেভ করুন' : 'Save All Settings')}</span>
          </button>
        </div>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-line pb-2">
        <button
          type="button"
          onClick={() => setActiveSubTab('specialist')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'specialist'
              ? 'bg-accent text-white shadow-sm'
              : 'bg-white/60 text-muted hover:bg-white hover:text-ink'
          }`}
        >
          {isBn ? '১. স্পেশালিস্ট পরিচিতি সেকশন' : '1. Specialist Intro'}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('question')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'question'
              ? 'bg-accent text-white shadow-sm'
              : 'bg-white/60 text-muted hover:bg-white hover:text-ink'
          }`}
        >
          {isBn ? '২. স্বাস্থ্য জিজ্ঞাসা ব্যানার' : '2. Question Banner'}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('banners')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'banners'
              ? 'bg-accent text-white shadow-sm'
              : 'bg-white/60 text-muted hover:bg-white hover:text-ink'
          }`}
        >
          {isBn ? '৩. এস্থেটিক সেকশন ব্রেকারস (২ ও ৩)' : '3. Aesthetic Breaker Banners'}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('urgentCta')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'urgentCta'
              ? 'bg-accent text-white shadow-sm'
              : 'bg-white/60 text-muted hover:bg-white hover:text-ink'
          }`}
        >
          {isBn ? '৪. আর্জেন্ট সিরিয়াল CTA কার্ড' : '4. Urgent Serial CTA'}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('global')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'global'
              ? 'bg-accent text-white shadow-sm'
              : 'bg-white/60 text-muted hover:bg-white hover:text-ink'
          }`}
        >
          {isBn ? '৫. হেডার, ফুটার ও সোশ্যাল' : '5. Header & Footer'}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('googleReview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'googleReview'
              ? 'bg-accent text-white shadow-sm'
              : 'bg-white/60 text-muted hover:bg-white hover:text-ink'
          }`}
        >
          {isBn ? '৬. গুগল রিভিউ ও কিউআর' : '6. Google Review & QR'}
        </button>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* SUBTAB 1: SPECIALIST INTRO */}
        {activeSubTab === 'specialist' && (
          <GlassPanel className="p-6 md:p-8 flex flex-col gap-5">
            <div className="border-b border-line pb-3">
              <h3 className="font-serif text-base md:text-lg font-bold text-ink flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>{isBn ? 'হোমপেজ স্পেশালিস্ট পরিচিতি সেকশন (Floating Glass Card)' : 'Homepage Specialist Intro Glass Card'}</span>
              </h3>
              <p className="text-xs text-muted mt-0.5">
                {isBn
                  ? 'হোমপেজের হিরোর ঠিক নিচের ফুল-উইডথ ব্যাকগ্রাউন্ড ইমেজ ও ফ্লোটিং কার্ডের যাবতীয় টেক্সট ও ছবি এডিট করুন।'
                  : 'Control the full-width consultation background image, headline, doctor bio summary, and CTA buttons below Hero.'}
              </p>
            </div>

            {/* Background Image Selection with Local Upload & Gallery */}
            <ImagePickerField
              label={isBn ? 'সেকশন ব্যাকগ্রাউন্ড ইমেজ (Section Background Image):' : 'Section Background Image:'}
              value={settings.specialistIntroBgImage}
              onChange={(val) => setSettings({ ...settings, specialistIntroBgImage: val })}
              placeholder="/doctor-consultation-bg.png"
              helperText={isBn ? 'লোকাল ডিভাইস থেকে ছবি আপলোড বা গ্যালারি থেকে নির্বাচন করুন' : 'Upload from device or select from media gallery'}
            />

            {/* Badges & Heading */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'টপ ব্যাজ (বাংলা):' : 'Top Badge (Bengali):'}</label>
                <input
                  type="text"
                  value={settings.specialistIntroBadgeBn}
                  onChange={(e) => setSettings({ ...settings, specialistIntroBadgeBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'টপ ব্যাজ (English):' : 'Top Badge (English):'}</label>
                <input
                  type="text"
                  value={settings.specialistIntroBadgeEn}
                  onChange={(e) => setSettings({ ...settings, specialistIntroBadgeEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'বড় শিরোনাম (বাংলা):' : 'Main Headline (Bengali):'}</label>
                <textarea
                  rows={2}
                  value={settings.specialistIntroTitleBn}
                  onChange={(e) => setSettings({ ...settings, specialistIntroTitleBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'বড় শিরোনাম (English):' : 'Main Headline (English):'}</label>
                <textarea
                  rows={2}
                  value={settings.specialistIntroTitleEn}
                  onChange={(e) => setSettings({ ...settings, specialistIntroTitleEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none resize-none"
                />
              </div>
            </div>

            {/* Doctor Bio Text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'ডাক্তারের পরিচিতি বিবরণ (বাংলা):' : 'Doctor Bio Summary (Bengali):'}</label>
                <textarea
                  rows={4}
                  value={settings.specialistIntroBioBn}
                  onChange={(e) => setSettings({ ...settings, specialistIntroBioBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'ডাক্তারের পরিচিতি বিবরণ (English):' : 'Doctor Bio Summary (English):'}</label>
                <textarea
                  rows={4}
                  value={settings.specialistIntroBioEn}
                  onChange={(e) => setSettings({ ...settings, specialistIntroBioEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-line">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'বাটন টেক্সট (বাংলা):' : 'Button Text (Bengali):'}</label>
                <input
                  type="text"
                  value={settings.specialistIntroCtaTextBn}
                  onChange={(e) => setSettings({ ...settings, specialistIntroCtaTextBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'বাটন টেক্সট (English):' : 'Button Text (English):'}</label>
                <input
                  type="text"
                  value={settings.specialistIntroCtaTextEn}
                  onChange={(e) => setSettings({ ...settings, specialistIntroCtaTextEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'বাটন লিঙ্ক (URL):' : 'Button Link (URL):'}</label>
                <input
                  type="text"
                  value={settings.specialistIntroCtaLink}
                  onChange={(e) => setSettings({ ...settings, specialistIntroCtaLink: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>
            </div>
          </GlassPanel>
        )}

        {/* SUBTAB 2: QUESTION BANNER */}
        {activeSubTab === 'question' && (
          <GlassPanel className="p-6 md:p-8 flex flex-col gap-5">
            <div className="border-b border-line pb-3">
              <h3 className="font-serif text-base md:text-lg font-bold text-ink flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-accent" />
                <span>{isBn ? 'স্বাস্থ্য জিজ্ঞাসা ব্যানার সেকশন (Question Banner)' : 'Symptom Hooking Question Banner'}</span>
              </h3>
              <p className="text-xs text-muted mt-0.5">
                {isBn
                  ? 'হোমপেজে লক্ষণ চেকার সেকশনের উপরে অবস্থিত আকর্ষণীয় প্রশ্ন ও সাবটাইটেল নিয়ন্ত্রণ করুন।'
                  : 'Customize the large hooking question, subtitle, badge, and scroll prompt above the symptom checker.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'ব্যাজ (বাংলা):' : 'Badge (Bengali):'}</label>
                <input
                  type="text"
                  value={settings.questionBannerBadgeBn}
                  onChange={(e) => setSettings({ ...settings, questionBannerBadgeBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'ব্যাজ (English):' : 'Badge (English):'}</label>
                <input
                  type="text"
                  value={settings.questionBannerBadgeEn}
                  onChange={(e) => setSettings({ ...settings, questionBannerBadgeEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'বড় প্রশ্ন শিরোনাম (বাংলা):' : 'Big Question Headline (Bengali):'}</label>
                <input
                  type="text"
                  value={settings.questionBannerTitleBn}
                  onChange={(e) => setSettings({ ...settings, questionBannerTitleBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none font-serif text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'বড় প্রশ্ন শিরোনাম (English):' : 'Big Question Headline (English):'}</label>
                <input
                  type="text"
                  value={settings.questionBannerTitleEn}
                  onChange={(e) => setSettings({ ...settings, questionBannerTitleEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none font-serif text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'সাবটাইটেল / নির্দেশিকা (বাংলা):' : 'Subtitle (Bengali):'}</label>
                <textarea
                  rows={2}
                  value={settings.questionBannerSubtitleBn}
                  onChange={(e) => setSettings({ ...settings, questionBannerSubtitleBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'সাবটাইটেল / নির্দেশিকা (English):' : 'Subtitle (English):'}</label>
                <textarea
                  rows={2}
                  value={settings.questionBannerSubtitleEn}
                  onChange={(e) => setSettings({ ...settings, questionBannerSubtitleEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'স্ক্রল ডাউন টেক্সট (বাংলা):' : 'Scroll Indicator Text (Bengali):'}</label>
                <input
                  type="text"
                  value={settings.questionBannerIndicatorBn}
                  onChange={(e) => setSettings({ ...settings, questionBannerIndicatorBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'স্ক্রল ডাউন টেক্সট (English):' : 'Scroll Indicator Text (English):'}</label>
                <input
                  type="text"
                  value={settings.questionBannerIndicatorEn}
                  onChange={(e) => setSettings({ ...settings, questionBannerIndicatorEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>
            </div>
          </GlassPanel>
        )}

        {/* SUBTAB 3: AESTHETIC SECTION BREAKERS 2 & 3 */}
        {activeSubTab === 'banners' && (
          <div className="flex flex-col gap-6">
            {/* Banner 2 Editor */}
            <GlassPanel className="p-6 md:p-8 flex flex-col gap-5">
              <div className="border-b border-line pb-3">
                <h3 className="font-serif text-base md:text-lg font-bold text-ink flex items-center gap-2">
                  <Layers className="w-4 h-4 text-accent" />
                  <span>{isBn ? 'এস্থেটিক সেকশন ব্রেকার ব্যানার ২ (Clinical Excellence)' : 'Aesthetic Section Breaker Banner 2'}</span>
                </h3>
                <p className="text-xs text-muted mt-0.5">
                  {isBn
                    ? 'About পেজের জার্নির পর ফুল-উইডথ স্ক্রল প্যারালাক্স ব্যানার ও গ্লাস কার্ডের কনটেন্ট।'
                    : 'Full-width edge-to-edge parallax aesthetic banner after journey section on About page.'}
                </p>
              </div>

              <ImagePickerField
                label={isBn ? 'ব্যানার ২ ইমেজ (Banner 2 Background Image):' : 'Banner 2 Background Image:'}
                value={settings.banner2Image}
                onChange={(val) => setSettings({ ...settings, banner2Image: val })}
                placeholder="/Section Breaking Aesthetic Image_2.png"
                helperText={isBn ? 'ডিভাইস থেকে ছবি আপলোড বা গ্যালারি থেকে সিলেক্ট করুন' : 'Upload from device or select from media gallery'}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink">{isBn ? 'ব্যাজ (বাংলা):' : 'Badge (Bengali):'}</label>
                  <input
                    type="text"
                    value={settings.banner2BadgeBn}
                    onChange={(e) => setSettings({ ...settings, banner2BadgeBn: e.target.value })}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink">{isBn ? 'ব্যাজ (English):' : 'Badge (English):'}</label>
                  <input
                    type="text"
                    value={settings.banner2BadgeEn}
                    onChange={(e) => setSettings({ ...settings, banner2BadgeEn: e.target.value })}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink">{isBn ? 'হেডিং (বাংলা):' : 'Heading (Bengali):'}</label>
                  <input
                    type="text"
                    value={settings.banner2HeadingBn}
                    onChange={(e) => setSettings({ ...settings, banner2HeadingBn: e.target.value })}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none font-serif"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink">{isBn ? 'হেডিং (English):' : 'Heading (English):'}</label>
                  <input
                    type="text"
                    value={settings.banner2HeadingEn}
                    onChange={(e) => setSettings({ ...settings, banner2HeadingEn: e.target.value })}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none font-serif"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink">{isBn ? 'সাবটেক্সট (বাংলা):' : 'Subtext (Bengali):'}</label>
                  <textarea
                    rows={2}
                    value={settings.banner2SubtextBn}
                    onChange={(e) => setSettings({ ...settings, banner2SubtextBn: e.target.value })}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink">{isBn ? 'সাবটেক্সট (English):' : 'Subtext (English):'}</label>
                  <textarea
                    rows={2}
                    value={settings.banner2SubtextEn}
                    onChange={(e) => setSettings({ ...settings, banner2SubtextEn: e.target.value })}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                  />
                </div>
              </div>
            </GlassPanel>

            {/* Banner 3 Editor */}
            <GlassPanel className="p-6 md:p-8 flex flex-col gap-5">
              <div className="border-b border-line pb-3">
                <h3 className="font-serif text-base md:text-lg font-bold text-ink flex items-center gap-2">
                  <Layers className="w-4 h-4 text-accent" />
                  <span>{isBn ? 'এস্থেটিক সেকশন ব্রেকার ব্যানার ৩ (Patient Care & Chamber)' : 'Aesthetic Section Breaker Banner 3'}</span>
                </h3>
                <p className="text-xs text-muted mt-0.5">
                  {isBn
                    ? 'About পেজের ফিলোসফি সেকশনের পর ফুল-উইডথ স্ক্রল প্যারালাক্স ব্যানার ও গ্লাস কার্ড।'
                    : 'Full-width parallax aesthetic banner before chamber consultation card on About page.'}
                </p>
              </div>

              <ImagePickerField
                label={isBn ? 'ব্যানার ৩ ইমেজ (Banner 3 Background Image):' : 'Banner 3 Background Image:'}
                value={settings.banner3Image}
                onChange={(val) => setSettings({ ...settings, banner3Image: val })}
                placeholder="/Section Breaking Aesthetic Image_3.png"
                helperText={isBn ? 'ডিভাইস থেকে ছবি আপলোড বা গ্যালারি থেকে সিলেক্ট করুন' : 'Upload from device or select from media gallery'}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink">{isBn ? 'ব্যাজ (বাংলা):' : 'Badge (Bengali):'}</label>
                  <input
                    type="text"
                    value={settings.banner3BadgeBn}
                    onChange={(e) => setSettings({ ...settings, banner3BadgeBn: e.target.value })}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink">{isBn ? 'ব্যাজ (English):' : 'Badge (English):'}</label>
                  <input
                    type="text"
                    value={settings.banner3BadgeEn}
                    onChange={(e) => setSettings({ ...settings, banner3BadgeEn: e.target.value })}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink">{isBn ? 'হেডিং (বাংলা):' : 'Heading (Bengali):'}</label>
                  <input
                    type="text"
                    value={settings.banner3HeadingBn}
                    onChange={(e) => setSettings({ ...settings, banner3HeadingBn: e.target.value })}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none font-serif"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink">{isBn ? 'হেডিং (English):' : 'Heading (English):'}</label>
                  <input
                    type="text"
                    value={settings.banner3HeadingEn}
                    onChange={(e) => setSettings({ ...settings, banner3HeadingEn: e.target.value })}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none font-serif"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink">{isBn ? 'সাবটেক্সট (বাংলা):' : 'Subtext (Bengali):'}</label>
                  <textarea
                    rows={2}
                    value={settings.banner3SubtextBn}
                    onChange={(e) => setSettings({ ...settings, banner3SubtextBn: e.target.value })}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink">{isBn ? 'সাবটেক্সট (English):' : 'Subtext (English):'}</label>
                  <textarea
                    rows={2}
                    value={settings.banner3SubtextEn}
                    onChange={(e) => setSettings({ ...settings, banner3SubtextEn: e.target.value })}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                  />
                </div>
              </div>
            </GlassPanel>
          </div>
        )}

        {/* SUBTAB 4: URGENT SERIAL CTA */}
        {activeSubTab === 'urgentCta' && (
          <GlassPanel className="p-6 md:p-8 flex flex-col gap-5">
            <div className="border-b border-line pb-3">
              <h3 className="font-serif text-base md:text-lg font-bold text-ink flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <span>{isBn ? 'জরুরি সিরিয়াল / বুকিং CTA কার্ড' : 'Urgent Appointment CTA Card'}</span>
              </h3>
              <p className="text-xs text-muted mt-0.5">
                {isBn
                  ? 'হোমপেজে রিভিউ সেকশনের নিচে প্রদর্শিত জরুরি এপয়েন্টমেন্ট কার্ডের টেক্সট ও বাটন নম্বর।'
                  : 'Manage text and action numbers for the urgent appointment callout card.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'কার্ড টাইটেল (বাংলা):' : 'Card Title (Bengali):'}</label>
                <input
                  type="text"
                  value={settings.urgentCtaTitleBn}
                  onChange={(e) => setSettings({ ...settings, urgentCtaTitleBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none font-serif"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'কার্ড টাইটেল (English):' : 'Card Title (English):'}</label>
                <input
                  type="text"
                  value={settings.urgentCtaTitleEn}
                  onChange={(e) => setSettings({ ...settings, urgentCtaTitleEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none font-serif"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'সাবটাইটেল (বাংলা):' : 'Subtitle (Bengali):'}</label>
                <textarea
                  rows={2}
                  value={settings.urgentCtaSubtitleBn}
                  onChange={(e) => setSettings({ ...settings, urgentCtaSubtitleBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'সাবটাইটেল (English):' : 'Subtitle (English):'}</label>
                <textarea
                  rows={2}
                  value={settings.urgentCtaSubtitleEn}
                  onChange={(e) => setSettings({ ...settings, urgentCtaSubtitleEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-line">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'কল নম্বর ডিসপ্লে:' : 'Call Phone Display:'}</label>
                <input
                  type="text"
                  value={settings.urgentCtaPhoneText}
                  onChange={(e) => setSettings({ ...settings, urgentCtaPhoneText: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'হোয়াটসঅ্যাপ বাটন টেক্সট:' : 'WhatsApp Button Text:'}</label>
                <input
                  type="text"
                  value={settings.urgentCtaWhatsappText}
                  onChange={(e) => setSettings({ ...settings, urgentCtaWhatsappText: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>
            </div>
          </GlassPanel>
        )}

        {/* SUBTAB 5: GLOBAL HEADER, FOOTER & SOCIAL */}
        {activeSubTab === 'global' && (
          <GlassPanel className="p-6 md:p-8 flex flex-col gap-5">
            <div className="border-b border-line pb-3">
              <h3 className="font-serif text-base md:text-lg font-bold text-ink flex items-center gap-2">
                <Globe className="w-4 h-4 text-accent" />
                <span>{isBn ? 'হেডার, ফুটার, কপিরাইট ও সোশ্যাল লিংক' : 'Header, Footer, Copyright & Social Links'}</span>
              </h3>
              <p className="text-xs text-muted mt-0.5">
                {isBn
                  ? 'ওয়েবসাইটের সাধারণ ব্র্যান্ডিং, ফেসবুক পেজ লিংক, ফুটার কপিরাইট ও ডেভেলপার ক্রেডিট তথ্য।'
                  : 'Manage top navbar brand title, footer notices, Facebook page link, and developer credits.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'সাইট ব্র্যান্ড নাম (বাংলা):' : 'Site Brand Name (Bengali):'}</label>
                <input
                  type="text"
                  value={settings.siteTitleBn}
                  onChange={(e) => setSettings({ ...settings, siteTitleBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none font-serif"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'সাইট ব্র্যান্ড নাম (English):' : 'Site Brand Name (English):'}</label>
                <input
                  type="text"
                  value={settings.siteTitleEn}
                  onChange={(e) => setSettings({ ...settings, siteTitleEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none font-serif"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'হেডার ট্যাগলাইন (বাংলা):' : 'Header Tagline (Bengali):'}</label>
                <input
                  type="text"
                  value={settings.siteTaglineBn}
                  onChange={(e) => setSettings({ ...settings, siteTaglineBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'হেডার ট্যাগলাইন (English):' : 'Header Tagline (English):'}</label>
                <input
                  type="text"
                  value={settings.siteTaglineEn}
                  onChange={(e) => setSettings({ ...settings, siteTaglineEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-line">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'অফিশিয়াল ফেসবুক পেজ URL:' : 'Official Facebook Page URL:'}</label>
                <input
                  type="text"
                  value={settings.facebookUrl}
                  onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'অফিশিয়াল ইমেইল:' : 'Official Email Address:'}</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'ফুটার কপিরাইট (বাংলা):' : 'Footer Copyright (Bengali):'}</label>
                <input
                  type="text"
                  value={settings.footerCopyrightBn}
                  onChange={(e) => setSettings({ ...settings, footerCopyrightBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'ফুটার কপিরাইট (English):' : 'Footer Copyright (English):'}</label>
                <input
                  type="text"
                  value={settings.footerCopyrightEn}
                  onChange={(e) => setSettings({ ...settings, footerCopyrightEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'ডেভেলপার ক্রেডিট টেক্সট:' : 'Developer Credit Text:'}</label>
                <input
                  type="text"
                  value={settings.developerCreditEn}
                  onChange={(e) => setSettings({ ...settings, developerCreditEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">{isBn ? 'ডেভেলপার ওয়েবসাইট লিংক:' : 'Developer Website URL:'}</label>
                <input
                  type="text"
                  value={settings.developerUrl}
                  onChange={(e) => setSettings({ ...settings, developerUrl: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                />
              </div>
            </div>
          </GlassPanel>
        )}

        {/* SUBTAB 6: GOOGLE REVIEW & QR CODE */}
        {activeSubTab === 'googleReview' && (
          <GlassPanel className="p-6 md:p-8 flex flex-col gap-6 rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-white/95 via-emerald-50/30 to-teal-50/40">
            <div className="border-b border-line pb-3 flex justify-between items-center flex-wrap gap-2">
              <div>
                <h3 className="font-serif text-base md:text-lg font-bold text-ink flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-accent" />
                  <span>{isBn ? 'গুগল রিভিউ কিউআর কোড ও কালেকশন সেটিংস' : 'Google Review QR Code & Collection Settings'}</span>
                </h3>
                <p className="text-xs text-muted mt-1">
                  {isBn 
                    ? 'রোগীদের কাছ থেকে গুগল রিভিউ নেওয়ার জন্য কিউআর কোড এবং গুগল রিভিউ লিঙ্ক পরিচালনা করুন।' 
                    : 'Manage the Google Review submission link and scannable QR code presented to patients.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form inputs */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-ink">
                      {isBn ? 'গুগল রিভিউ লেখার লিঙ্ক (Business Review URL):' : 'Google Review Direct Link (Business URL):'}
                    </label>
                    {settings.googleReviewBusinessUrl && (
                      <a
                        href={settings.googleReviewBusinessUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-blue-600 hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>{isBn ? 'লিঙ্ক টেস্ট করুন' : 'Test Link'}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <input
                    type="url"
                    value={settings.googleReviewBusinessUrl}
                    onChange={(e) => setSettings({ ...settings, googleReviewBusinessUrl: e.target.value })}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                    placeholder="https://maps.google.com/?q=..."
                  />
                  <span className="text-[10px] text-muted">
                    {isBn 
                      ? 'রোগী এই লিঙ্কে ক্লিক করে অথবা কিউআর স্ক্যান করে সরাসরি চেম্বার/ডাক্তারের গুগল রিভিউ পৃষ্ঠায় পৌঁছাবে।' 
                      : 'Patients will land directly on this page to submit their review on Google.'}
                  </span>
                </div>

                <ImagePickerField
                  label={isBn ? 'কাস্টম কিউআর কোড ছবি (Custom QR Image - খালি রাখলে অটো-জেনারেট হবে):' : 'Custom QR Image (Auto-generated if empty):'}
                  value={settings.googleReviewQrCodeImage}
                  onChange={(val) => setSettings({ ...settings, googleReviewQrCodeImage: val })}
                  placeholder="/qr-code.png or URL..."
                  helperText={isBn ? 'গুগল বিজনেস থেকে ডাউনলোড করা কিউআর ছবি দিতে পারেন অথবা এটি খালি রাখলে স্বয়ংক্রিয়ভাবে তৈরি হবে।' : 'Upload custom QR code image, or leave blank to auto-generate.'}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">{isBn ? 'শিরোনাম (English):' : 'Title (English):'}</label>
                    <input
                      type="text"
                      value={settings.googleReviewTitleEn}
                      onChange={(e) => setSettings({ ...settings, googleReviewTitleEn: e.target.value })}
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">{isBn ? 'শিরোনাম (বাংলা):' : 'Title (Bangla):'}</label>
                    <input
                      type="text"
                      value={settings.googleReviewTitleBn}
                      onChange={(e) => setSettings({ ...settings, googleReviewTitleBn: e.target.value })}
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">{isBn ? 'সাবটাইটেল / নির্দেশনা (English):' : 'Subtitle / Instructions (English):'}</label>
                    <textarea
                      rows={2}
                      value={settings.googleReviewSubtitleEn}
                      onChange={(e) => setSettings({ ...settings, googleReviewSubtitleEn: e.target.value })}
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">{isBn ? 'সাবটাইটেল / নির্দেশনা (বাংলা):' : 'Subtitle / Instructions (Bangla):'}</label>
                    <textarea
                      rows={2}
                      value={settings.googleReviewSubtitleBn}
                      onChange={(e) => setSettings({ ...settings, googleReviewSubtitleBn: e.target.value })}
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">{isBn ? 'বাটন টেক্সট (English):' : 'Button Label (English):'}</label>
                    <input
                      type="text"
                      value={settings.googleReviewButtonTextEn}
                      onChange={(e) => setSettings({ ...settings, googleReviewButtonTextEn: e.target.value })}
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">{isBn ? 'বাটন টেক্সট (বাংলা):' : 'Button Label (Bangla):'}</label>
                    <input
                      type="text"
                      value={settings.googleReviewButtonTextBn}
                      onChange={(e) => setSettings({ ...settings, googleReviewButtonTextBn: e.target.value })}
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full bg-white rounded-3xl p-6 border-2 border-emerald-200/90 shadow-lg flex flex-col items-center text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3">
                    {isBn ? 'লাইভ প্রিভিউ' : 'Live Scannable QR'}
                  </span>

                  <div className="relative p-3 bg-white rounded-2xl shadow-md border border-slate-200 my-2">
                    <img
                      src={
                        settings.googleReviewQrCodeImage?.trim()
                          ? settings.googleReviewQrCodeImage
                          : `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
                              settings.googleReviewBusinessUrl || 'https://maps.google.com/?q=Popular+Medical+Center+Sylhet'
                            )}&margin=12`
                      }
                      alt="Google Review QR Code"
                      className="w-44 h-44 object-contain rounded-lg"
                    />
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-ink mt-2">
                    <Smartphone className="w-3.5 h-3.5 text-accent" />
                    <span>{isBn ? 'মোবাইল দিয়ে স্ক্যান করুন' : 'Scan with mobile camera'}</span>
                  </div>

                  <h4 className="font-serif text-sm font-bold text-ink mt-2">
                    {isBn ? settings.googleReviewTitleBn : settings.googleReviewTitleEn}
                  </h4>

                  <a
                    href={settings.googleReviewBusinessUrl || 'https://maps.google.com/?q=Popular+Medical+Center+Sylhet'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full py-2.5 px-4 rounded-xl bg-accent hover:bg-ink text-white text-xs font-semibold shadow transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <span>{isBn ? settings.googleReviewButtonTextBn : settings.googleReviewButtonTextEn}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </GlassPanel>
        )}

        {/* Bottom Save Action Bar */}
        <div className="flex items-center justify-between p-4 bg-white/80 rounded-2xl border border-panel-border shadow-sm">
          <span className="text-xs text-muted">
            {saveSuccess ? (
              <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {isBn ? 'সকল সেটিংস সফলভাবে আপডেট করা হয়েছে!' : 'Settings successfully updated!'}
              </span>
            ) : (
              isBn ? 'পরিবর্তন করার পর অবশ্যই নিচের সেভ বাটনে ক্লিক করুন।' : 'Click save to persist changes across all client pages.'
            )}
          </span>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent hover:bg-ink text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? (isBn ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (isBn ? 'সেভ করুন' : 'Save Changes')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
