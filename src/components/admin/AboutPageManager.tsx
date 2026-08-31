'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { GlassPanel } from '@/components/GlassPanel';
import {
  defaultSiteSettings,
  SiteSettings,
  defaultMilestones,
  AboutMilestone,
  defaultQuickStats,
  QuickStat
} from '@/data/siteSettingsData';
import supabase from '@/lib/supabase';
import {
  Save,
  Plus,
  Trash2,
  Edit,
  GraduationCap,
  Award,
  ShieldCheck,
  Building2,
  Heart,
  Sparkles,
  BookOpen,
  Quote,
  CheckCircle2,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Sliders,
  UserCheck
} from 'lucide-react';

import { ImagePickerField } from '@/components/admin/ImagePickerField';

export const AboutPageManager: React.FC = () => {

  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [milestones, setMilestones] = useState<AboutMilestone[]>(defaultMilestones);
  const [quickStats, setQuickStats] = useState<QuickStat[]>(defaultQuickStats);

  const [activeTab, setActiveTab] = useState<'hero' | 'journey' | 'milestones' | 'stats' | 'expertise' | 'philosophy'>('hero');
  const [isSaving, setIsSaving] = useState(false);

  // Milestone edit modal
  const [editingMilestone, setEditingMilestone] = useState<AboutMilestone | null>(null);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);

  // Load from Supabase & LocalStorage
  const fetchData = async () => {
    // 1. LocalStorage
    if (typeof window !== 'undefined') {
      const localSettings = localStorage.getItem('site_settings_data');
      if (localSettings) {
        try {
          setSettings(prev => ({ ...prev, ...JSON.parse(localSettings) }));
        } catch (e) {}
      }

      const localMilestones = localStorage.getItem('about_milestones_data');
      if (localMilestones) {
        try {
          const parsed = JSON.parse(localMilestones);
          if (Array.isArray(parsed) && parsed.length > 0) setMilestones(parsed);
        } catch (e) {}
      }

      const localStats = localStorage.getItem('about_stats_data');
      if (localStats) {
        try {
          const parsed = JSON.parse(localStats);
          if (Array.isArray(parsed) && parsed.length > 0) setQuickStats(parsed);
        } catch (e) {}
      }
    }

    // 2. Supabase
    try {
      const { data: setRes } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'global_settings')
        .maybeSingle();

      if (setRes?.data) {
        setSettings(prev => ({ ...prev, ...setRes.data }));
      }

      const { data: msRes } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'about_milestones')
        .maybeSingle();

      if (msRes?.data && Array.isArray(msRes.data)) {
        setMilestones(msRes.data);
      }

      const { data: stRes } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'about_stats')
        .maybeSingle();

      if (stRes?.data && Array.isArray(stRes.data)) {
        setQuickStats(stRes.data);
      }
    } catch (err) {
      console.warn('Supabase fetch about data notice:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      // 1. Save to LocalStorage & dispatch broadcast event
      if (typeof window !== 'undefined') {
        localStorage.setItem('site_settings_data', JSON.stringify(settings));
        localStorage.setItem('about_milestones_data', JSON.stringify(milestones));
        localStorage.setItem('about_stats_data', JSON.stringify(quickStats));
        window.dispatchEvent(new Event('site_settings_updated'));
        window.dispatchEvent(new Event('about_data_updated'));
      }

      // 2. Upsert to Supabase
      await supabase.from('site_settings').upsert([
        {
          id: 'global_settings',
          category: 'general',
          data: settings,
          updated_at: new Date().toISOString()
        },
        {
          id: 'about_milestones',
          category: 'about',
          data: milestones,
          updated_at: new Date().toISOString()
        },
        {
          id: 'about_stats',
          category: 'about',
          data: quickStats,
          updated_at: new Date().toISOString()
        }
      ]);

      alert(isBn ? 'About পেজের সকল তথ্য সফলভাবে সংরক্ষিত হয়েছে!' : 'About page content saved successfully!');
    } catch (err: any) {
      console.error(err);
      alert(isBn ? `সংরক্ষণ ব্যর্থ: ${err.message || 'ত্রুটি'}` : `Save failed: ${err.message || 'Error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Milestone actions
  const handleOpenNewMilestone = () => {
    setEditingMilestone({
      id: Date.now(),
      dateEn: '2026 · Location',
      dateBn: '২০২৬ · প্রতিষ্ঠান',
      titleEn: '',
      titleBn: '',
      descEn: '',
      descBn: '',
      badgeEn: 'Specialist Fellowship',
      badgeBn: 'বিশেষজ্ঞ ডিগ্রি',
      iconName: 'Award',
      orderIndex: milestones.length
    });
    setIsMilestoneModalOpen(true);
  };

  const handleSaveMilestoneModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMilestone) return;

    const exists = milestones.some(m => m.id === editingMilestone.id);
    let updated: AboutMilestone[];
    if (exists) {
      updated = milestones.map(m => m.id === editingMilestone.id ? editingMilestone : m);
    } else {
      updated = [...milestones, editingMilestone];
    }

    setMilestones(updated);
    setIsMilestoneModalOpen(false);
    setEditingMilestone(null);

    if (typeof window !== 'undefined') {
      localStorage.setItem('about_milestones_data', JSON.stringify(updated));
      window.dispatchEvent(new Event('about_data_updated'));
    }
  };

  const handleDeleteMilestone = (id: number) => {
    if (!confirm(isBn ? 'আপনি কি নিশ্চিতভাবে এই মাইলস্টোনটি ডিলিট করতে চান?' : 'Are you sure you want to delete this milestone?')) return;
    const updated = milestones.filter(m => m.id !== id);
    setMilestones(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('about_milestones_data', JSON.stringify(updated));
      window.dispatchEvent(new Event('about_data_updated'));
    }
  };

  const moveMilestone = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= milestones.length) return;
    const clone = [...milestones];
    const temp = clone[index];
    clone[index] = clone[targetIndex];
    clone[targetIndex] = temp;
    setMilestones(clone);
    if (typeof window !== 'undefined') {
      localStorage.setItem('about_milestones_data', JSON.stringify(clone));
      window.dispatchEvent(new Event('about_data_updated'));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 p-5 rounded-2xl border border-panel-border shadow-sm">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            {isBn ? 'About পেজ কনটেন্ট ম্যানেজার' : 'About Page Content Manager'}
          </span>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-ink mt-0.5">
            {isBn ? 'চিকিৎসকের প্রোফাইল, জার্নি, ডিগ্রি ও অর্জন' : 'Doctor Bio, Journey Story, Degrees & Milestones'}
          </h2>
          <p className="text-xs text-muted mt-1">
            {isBn
              ? 'About পেজের কভার হিরো, জার্নি প্যারাগ্রাফ, ৪টি কোয়ালিফিকেশন মাইলস্টোন, স্ট্যাটস এবং ক্লিনিক্যাল এক্সপার্টাইজ এডিট করুন।'
              : 'Manage hero banner, story paragraphs, qualification timeline (FCPS, MCPS, BCS, MBBS), stats, and philosophy.'}
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold rounded-xl bg-accent hover:bg-ink text-white shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? (isBn ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (isBn ? 'সকল পরিবর্তন সেভ করুন' : 'Save About Page')}</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-line pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'hero' ? 'bg-accent text-white shadow-sm' : 'bg-white/60 text-muted hover:bg-white hover:text-ink'
          }`}
        >
          {isBn ? '১. কভার হিরো ব্যানার' : '1. Cover Hero Banner'}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('journey')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'journey' ? 'bg-accent text-white shadow-sm' : 'bg-white/60 text-muted hover:bg-white hover:text-ink'
          }`}
        >
          {isBn ? '২. জার্নি স্টোরি' : '2. Journey Story'}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('milestones')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'milestones' ? 'bg-accent text-white shadow-sm' : 'bg-white/60 text-muted hover:bg-white hover:text-ink'
          }`}
        >
          {isBn ? '৩. ডিগ্রি ও মাইলস্টোন টাইমলাইন' : '3. Qualification Milestones'}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'stats' ? 'bg-accent text-white shadow-sm' : 'bg-white/60 text-muted hover:bg-white hover:text-ink'
          }`}
        >
          {isBn ? '৪. দ্রুত স্ট্যাটস মারকুই' : '4. Quick Stats Marquee'}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('expertise')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'expertise' ? 'bg-accent text-white shadow-sm' : 'bg-white/60 text-muted hover:bg-white hover:text-ink'
          }`}
        >
          {isBn ? '৫. ক্লিনিক্যাল এক্সপার্টাইজ' : '5. Clinical Expertise'}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('philosophy')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'philosophy' ? 'bg-accent text-white shadow-sm' : 'bg-white/60 text-muted hover:bg-white hover:text-ink'
          }`}
        >
          {isBn ? '৬. চিকিৎসা দর্শন ও উক্তি' : '6. Philosophy & Quote'}
        </button>
      </div>

      {/* 1. COVER HERO TAB */}
      {activeTab === 'hero' && (
        <GlassPanel className="p-6 md:p-8 flex flex-col gap-5">
          <div className="border-b border-line pb-3">
            <h3 className="font-serif text-base md:text-lg font-bold text-ink flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>{isBn ? 'About পেজ কভার হিরো ব্যানার (Full Width Banner)' : 'About Page Cover Hero Banner'}</span>
            </h3>
          </div>

          <ImagePickerField
            label={isBn ? 'কভার হিরো ইমেজ (Hero Cover Banner Image):' : 'Hero Cover Banner Image:'}
            value={settings.aboutHeroImage}
            onChange={(val) => setSettings({ ...settings, aboutHeroImage: val })}
            placeholder="/Dr. Hanif_About page hero section image.png"
            helperText={isBn ? 'লোকাল ডিভাইস থেকে ছবি আপলোড বা গ্যালারি থেকে সিলেক্ট করুন' : 'Upload from device or select from media gallery'}
          />


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'টপ ব্যাজ (বাংলা):' : 'Top Badge (Bengali):'}</label>
              <input
                type="text"
                value={settings.aboutHeroBadgeBn}
                onChange={(e) => setSettings({ ...settings, aboutHeroBadgeBn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'টপ ব্যাজ (English):' : 'Top Badge (English):'}</label>
              <input
                type="text"
                value={settings.aboutHeroBadgeEn}
                onChange={(e) => setSettings({ ...settings, aboutHeroBadgeEn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'ডাক্তারের নাম (বাংলা):' : 'Doctor Name (Bengali):'}</label>
              <input
                type="text"
                value={settings.aboutHeroTitleBn}
                onChange={(e) => setSettings({ ...settings, aboutHeroTitleBn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none font-serif"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'ডাক্তারের নাম (English):' : 'Doctor Name (English):'}</label>
              <input
                type="text"
                value={settings.aboutHeroTitleEn}
                onChange={(e) => setSettings({ ...settings, aboutHeroTitleEn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none font-serif"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'ডিগ্রি তালিকা (বাংলা):' : 'Degrees String (Bengali):'}</label>
              <input
                type="text"
                value={settings.aboutHeroDegreesBn}
                onChange={(e) => setSettings({ ...settings, aboutHeroDegreesBn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none font-mono text-xs"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'ডিগ্রি তালিকা (English):' : 'Degrees String (English):'}</label>
              <input
                type="text"
                value={settings.aboutHeroDegreesEn}
                onChange={(e) => setSettings({ ...settings, aboutHeroDegreesEn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'সংক্ষিপ্ত ভূমিকা (বাংলা):' : 'Hero Subtitle Lead (Bengali):'}</label>
              <textarea
                rows={3}
                value={settings.aboutHeroLeadBn}
                onChange={(e) => setSettings({ ...settings, aboutHeroLeadBn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'সংক্ষিপ্ত ভূমিকা (English):' : 'Hero Subtitle Lead (English):'}</label>
              <textarea
                rows={3}
                value={settings.aboutHeroLeadEn}
                onChange={(e) => setSettings({ ...settings, aboutHeroLeadEn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
              />
            </div>
          </div>
        </GlassPanel>
      )}

      {/* 2. JOURNEY STORY TAB */}
      {activeTab === 'journey' && (
        <GlassPanel className="p-6 md:p-8 flex flex-col gap-5">
          <div className="border-b border-line pb-3">
            <h3 className="font-serif text-base md:text-lg font-bold text-ink flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <span>{isBn ? 'চিকিৎসা জীবন ও অভিজ্ঞতার বিবরণ (Journey Story)' : 'Medical Journey Story Section'}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'আইব্রো টেক্সট (বাংলা):' : 'Eyebrow Text (Bengali):'}</label>
              <input
                type="text"
                value={settings.aboutJourneyEyebrowBn}
                onChange={(e) => setSettings({ ...settings, aboutJourneyEyebrowBn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'আইব্রো টেক্সট (English):' : 'Eyebrow Text (English):'}</label>
              <input
                type="text"
                value={settings.aboutJourneyEyebrowEn}
                onChange={(e) => setSettings({ ...settings, aboutJourneyEyebrowEn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'মূল শিরোনাম (বাংলা):' : 'Main Title (Bengali):'}</label>
              <input
                type="text"
                value={settings.aboutJourneyTitleBn}
                onChange={(e) => setSettings({ ...settings, aboutJourneyTitleBn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none font-serif"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'মূল শিরোনাম (English):' : 'Main Title (English):'}</label>
              <input
                type="text"
                value={settings.aboutJourneyTitleEn}
                onChange={(e) => setSettings({ ...settings, aboutJourneyTitleEn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none font-serif"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-line">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'প্রথম অনুচ্ছেদ (বাংলা):' : 'Paragraph 1 (Bengali):'}</label>
              <textarea
                rows={5}
                value={settings.aboutJourneyP1Bn}
                onChange={(e) => setSettings({ ...settings, aboutJourneyP1Bn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none leading-relaxed"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'প্রথম অনুচ্ছেদ (English):' : 'Paragraph 1 (English):'}</label>
              <textarea
                rows={5}
                value={settings.aboutJourneyP1En}
                onChange={(e) => setSettings({ ...settings, aboutJourneyP1En: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none leading-relaxed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'দ্বিতীয় অনুচ্ছেদ (বাংলা):' : 'Paragraph 2 (Bengali):'}</label>
              <textarea
                rows={5}
                value={settings.aboutJourneyP2Bn}
                onChange={(e) => setSettings({ ...settings, aboutJourneyP2Bn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none leading-relaxed"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'দ্বিতীয় অনুচ্ছেদ (English):' : 'Paragraph 2 (English):'}</label>
              <textarea
                rows={5}
                value={settings.aboutJourneyP2En}
                onChange={(e) => setSettings({ ...settings, aboutJourneyP2En: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none leading-relaxed"
              />
            </div>
          </div>
        </GlassPanel>
      )}

      {/* 3. MILESTONES TAB */}
      {activeTab === 'milestones' && (
        <GlassPanel className="p-6 md:p-8 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-3">
            <div>
              <h3 className="font-serif text-base md:text-lg font-bold text-ink flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                <span>{isBn ? 'শিক্ষাগত ও পেশাগত ডিগ্রি অর্জন (Qualifications Timeline)' : 'Qualifications & Milestones Timeline'}</span>
              </h3>
              <p className="text-xs text-muted mt-0.5">
                {isBn
                  ? 'ডাক্তারের অর্জিত ডিগ্রি ও প্রশিক্ষণ যোগ, এডিট, রিঅর্ডার বা ডিলিট করুন।'
                  : 'Add, edit, reorder, or remove qualifications (FCPS, MCPS, BCS, MBBS).'}
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenNewMilestone}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-white text-xs font-bold shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isBn ? 'নতুন ডিগ্রি/মাইলস্টোন যোগ করুন' : 'Add Milestone'}</span>
            </button>
          </div>

          {/* Section Header Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'টাইমলাইন হেডার (বাংলা):' : 'Timeline Header (Bengali):'}</label>
              <input
                type="text"
                value={settings.aboutMilestonesTitleBn}
                onChange={(e) => setSettings({ ...settings, aboutMilestonesTitleBn: e.target.value })}
                className="p-2 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'টাইমলাইন হেডার (English):' : 'Timeline Header (English):'}</label>
              <input
                type="text"
                value={settings.aboutMilestonesTitleEn}
                onChange={(e) => setSettings({ ...settings, aboutMilestonesTitleEn: e.target.value })}
                className="p-2 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
          </div>

          {/* Milestones List */}
          <div className="flex flex-col gap-3">
            {milestones.map((m, idx) => (
              <div
                key={m.id}
                className="p-4 rounded-2xl border border-panel-border bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold text-accent bg-accent/10 px-2.5 py-0.5 rounded-md">
                        {isBn ? m.dateBn : m.dateEn}
                      </span>
                      <span className="text-[10px] font-semibold text-muted bg-slate-100 px-2 py-0.5 rounded-md">
                        {isBn ? m.badgeBn : m.badgeEn}
                      </span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-ink mt-1">
                      {isBn ? m.titleBn : m.titleEn}
                    </h4>
                    <p className="text-xs text-muted mt-0.5 line-clamp-2 max-w-2xl">
                      {isBn ? m.descBn : m.descEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => moveMilestone(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5 text-muted" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveMilestone(idx, 'down')}
                    disabled={idx === milestones.length - 1}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5 text-muted" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingMilestone(m);
                      setIsMilestoneModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg bg-accent/10 hover:bg-accent hover:text-white text-accent transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteMilestone(m.id)}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      )}

      {/* 4. QUICK STATS TAB */}
      {activeTab === 'stats' && (
        <GlassPanel className="p-6 md:p-8 flex flex-col gap-5">
          <div className="border-b border-line pb-3">
            <h3 className="font-serif text-base md:text-lg font-bold text-ink flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>{isBn ? 'দ্রুত স্ট্যাটস মারকুই কার্ডস (Quick Stats Marquee)' : 'Quick Stats Sliding Marquee'}</span>
            </h3>
            <p className="text-xs text-muted mt-0.5">
              {isBn
                ? 'About পেজের কভার ব্যানারের ঠিক নিচে চলমান ৪টি হাইলাইট কার্ডের লেখা এডিট করুন।'
                : 'Edit the 4 auto-sliding highlight statistics and badge labels below cover banner.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickStats.map((st, idx) => (
              <div key={st.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-3">
                <span className="text-xs font-bold text-accent uppercase">
                  {isBn ? `স্ট্যাট কার্ড ${idx + 1}` : `Stat Card #${idx + 1}`}
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-muted">{isBn ? 'লেবেল (বাংলা):' : 'Label (BN):'}</label>
                    <input
                      type="text"
                      value={st.labelBn}
                      onChange={(e) => {
                        const updated = [...quickStats];
                        updated[idx].labelBn = e.target.value;
                        setQuickStats(updated);
                      }}
                      className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted">{isBn ? 'লেবেল (English):' : 'Label (EN):'}</label>
                    <input
                      type="text"
                      value={st.labelEn}
                      onChange={(e) => {
                        const updated = [...quickStats];
                        updated[idx].labelEn = e.target.value;
                        setQuickStats(updated);
                      }}
                      className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-muted">{isBn ? 'সাবটাইটেল (বাংলা):' : 'Subtitle (BN):'}</label>
                    <input
                      type="text"
                      value={st.subBn}
                      onChange={(e) => {
                        const updated = [...quickStats];
                        updated[idx].subBn = e.target.value;
                        setQuickStats(updated);
                      }}
                      className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted">{isBn ? 'সাবটাইটেল (English):' : 'Subtitle (EN):'}</label>
                    <input
                      type="text"
                      value={st.subEn}
                      onChange={(e) => {
                        const updated = [...quickStats];
                        updated[idx].subEn = e.target.value;
                        setQuickStats(updated);
                      }}
                      className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      )}

      {/* 5. CLINICAL EXPERTISE TAB */}
      {activeTab === 'expertise' && (
        <GlassPanel className="p-6 md:p-8 flex flex-col gap-5">
          <div className="border-b border-line pb-3">
            <h3 className="font-serif text-base md:text-lg font-bold text-ink flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-accent" />
              <span>{isBn ? 'ক্লিনিক্যাল বিশেষত্ব ও সেবাসমূহ (Clinical Expertise)' : 'Clinical Expertise List'}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'হেডার (বাংলা):' : 'Title (Bengali):'}</label>
              <input
                type="text"
                value={settings.aboutExpertiseTitleBn}
                onChange={(e) => setSettings({ ...settings, aboutExpertiseTitleBn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'হেডার (English):' : 'Title (English):'}</label>
              <input
                type="text"
                value={settings.aboutExpertiseTitleEn}
                onChange={(e) => setSettings({ ...settings, aboutExpertiseTitleEn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
          </div>

          {/* Item 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-line">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'বিশেষত্ব ১ (বাংলা):' : 'Expertise Point 1 (Bengali):'}</label>
              <textarea
                rows={2}
                value={settings.aboutExpertiseItem1Bn}
                onChange={(e) => setSettings({ ...settings, aboutExpertiseItem1Bn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'বিশেষত্ব ১ (English):' : 'Expertise Point 1 (English):'}</label>
              <textarea
                rows={2}
                value={settings.aboutExpertiseItem1En}
                onChange={(e) => setSettings({ ...settings, aboutExpertiseItem1En: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
          </div>

          {/* Item 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'বিশেষত্ব ২ (বাংলা):' : 'Expertise Point 2 (Bengali):'}</label>
              <textarea
                rows={2}
                value={settings.aboutExpertiseItem2Bn}
                onChange={(e) => setSettings({ ...settings, aboutExpertiseItem2Bn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'বিশেষত্ব ২ (English):' : 'Expertise Point 2 (English):'}</label>
              <textarea
                rows={2}
                value={settings.aboutExpertiseItem2En}
                onChange={(e) => setSettings({ ...settings, aboutExpertiseItem2En: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
          </div>

          {/* Item 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'বিশেষত্ব ৩ (বাংলা):' : 'Expertise Point 3 (Bengali):'}</label>
              <textarea
                rows={2}
                value={settings.aboutExpertiseItem3Bn}
                onChange={(e) => setSettings({ ...settings, aboutExpertiseItem3Bn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'বিশেষত্ব ৩ (English):' : 'Expertise Point 3 (English):'}</label>
              <textarea
                rows={2}
                value={settings.aboutExpertiseItem3En}
                onChange={(e) => setSettings({ ...settings, aboutExpertiseItem3En: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
          </div>
        </GlassPanel>
      )}

      {/* 6. PHILOSOPHY TAB */}
      {activeTab === 'philosophy' && (
        <GlassPanel className="p-6 md:p-8 flex flex-col gap-5">
          <div className="border-b border-line pb-3">
            <h3 className="font-serif text-base md:text-lg font-bold text-ink flex items-center gap-2">
              <Quote className="w-4 h-4 text-accent" />
              <span>{isBn ? 'চিকিৎসা দর্শন ও মূলনীতি (Practice Philosophy)' : 'Practice Philosophy & Quote'}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'হেডার (বাংলা):' : 'Title (Bengali):'}</label>
              <input
                type="text"
                value={settings.aboutPhilosophyTitleBn}
                onChange={(e) => setSettings({ ...settings, aboutPhilosophyTitleBn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white font-serif"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'হেডার (English):' : 'Title (English):'}</label>
              <input
                type="text"
                value={settings.aboutPhilosophyTitleEn}
                onChange={(e) => setSettings({ ...settings, aboutPhilosophyTitleEn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white font-serif"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-line">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'উক্তি / বাণী (বাংলা):' : 'Quote Text (Bengali):'}</label>
              <textarea
                rows={3}
                value={settings.aboutPhilosophyQuoteBn}
                onChange={(e) => setSettings({ ...settings, aboutPhilosophyQuoteBn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white italic"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'উক্তি / বাণী (English):' : 'Quote Text (English):'}</label>
              <textarea
                rows={3}
                value={settings.aboutPhilosophyQuoteEn}
                onChange={(e) => setSettings({ ...settings, aboutPhilosophyQuoteEn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white italic"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'ব্যাখ্যামূলক বিবরণ (বাংলা):' : 'Description Paragraph (Bengali):'}</label>
              <textarea
                rows={4}
                value={settings.aboutPhilosophyPBn}
                onChange={(e) => setSettings({ ...settings, aboutPhilosophyPBn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink">{isBn ? 'ব্যাখ্যামূলক বিবরণ (English):' : 'Description Paragraph (English):'}</label>
              <textarea
                rows={4}
                value={settings.aboutPhilosophyPEn}
                onChange={(e) => setSettings({ ...settings, aboutPhilosophyPEn: e.target.value })}
                className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>
          </div>
        </GlassPanel>
      )}

      {/* MILESTONE CREATE / EDIT MODAL */}
      {isMilestoneModalOpen && editingMilestone && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-panel-border max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-lg font-bold text-ink mb-4 pb-2 border-b border-line">
              {isBn ? 'ডিগ্রি / মাইলস্টোন সম্পাদনা' : 'Edit Qualification Milestone'}
            </h3>

            <form onSubmit={handleSaveMilestoneModal} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'সাল ও প্রতিষ্ঠান (বাংলা):' : 'Date & Institution (BN):'}</label>
                  <input
                    type="text"
                    required
                    value={editingMilestone.dateBn}
                    onChange={(e) => setEditingMilestone({ ...editingMilestone, dateBn: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'সাল ও প্রতিষ্ঠান (English):' : 'Date & Institution (EN):'}</label>
                  <input
                    type="text"
                    required
                    value={editingMilestone.dateEn}
                    onChange={(e) => setEditingMilestone({ ...editingMilestone, dateEn: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'ব্যাজ (বাংলা):' : 'Badge (BN):'}</label>
                  <input
                    type="text"
                    value={editingMilestone.badgeBn}
                    onChange={(e) => setEditingMilestone({ ...editingMilestone, badgeBn: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'ব্যাজ (English):' : 'Badge (EN):'}</label>
                  <input
                    type="text"
                    value={editingMilestone.badgeEn}
                    onChange={(e) => setEditingMilestone({ ...editingMilestone, badgeEn: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'ডিগ্রির নাম (বাংলা):' : 'Degree Title (BN):'}</label>
                  <input
                    type="text"
                    required
                    value={editingMilestone.titleBn}
                    onChange={(e) => setEditingMilestone({ ...editingMilestone, titleBn: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white font-serif"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'ডিগ্রির নাম (English):' : 'Degree Title (EN):'}</label>
                  <input
                    type="text"
                    required
                    value={editingMilestone.titleEn}
                    onChange={(e) => setEditingMilestone({ ...editingMilestone, titleEn: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white font-serif"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'বিস্তারিত বর্ণনা (বাংলা):' : 'Description (BN):'}</label>
                  <textarea
                    rows={3}
                    value={editingMilestone.descBn}
                    onChange={(e) => setEditingMilestone({ ...editingMilestone, descBn: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'বিস্তারিত বর্ণনা (English):' : 'Description (EN):'}</label>
                  <textarea
                    rows={3}
                    value={editingMilestone.descEn}
                    onChange={(e) => setEditingMilestone({ ...editingMilestone, descEn: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-line mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMilestoneModalOpen(false);
                    setEditingMilestone(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-accent hover:bg-ink text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  {isBn ? 'মাইলস্টোন সেভ করুন' : 'Save Milestone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
