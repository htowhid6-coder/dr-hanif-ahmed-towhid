'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { GlassPanel } from '@/components/GlassPanel';
import { HeroSlide, defaultHeroSlides, defaultHeroBgImage } from '@/data/heroData';
import supabase from '@/lib/supabase';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Stethoscope,
  Building2,
  Phone,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Layers
} from 'lucide-react';

import { ImagePickerField } from '@/components/admin/ImagePickerField';

export const HeroSlidesManager: React.FC = () => {

  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [slides, setSlides] = useState<HeroSlide[]>(defaultHeroSlides);
  const [bgImage, setBgImage] = useState<string>(defaultHeroBgImage);
  const [selectedSlide, setSelectedSlide] = useState<HeroSlide | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'content' | 'doctor' | 'chamber' | 'buttons' | 'preview'>('content');

  // Form State for editing / creating slide
  const [formData, setFormData] = useState<HeroSlide>({
    id: '',
    type: 'custom',
    is_active: true,
    order_index: 0,
    title_en: '',
    title_bn: '',
  });

  // Load from Supabase and LocalStorage
  const fetchHeroSlides = async () => {
    // 1. LocalStorage
    if (typeof window !== 'undefined') {
      const localBg = localStorage.getItem('hero_bg_image');
      if (localBg) setBgImage(localBg);

      const localData = localStorage.getItem('hero_slides_data');
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSlides(parsed);
          }
        } catch (e) {
          console.error('Error parsing local hero slides:', e);
        }
      }
    }

    // 2. Supabase
    try {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && data && data.length > 0) {
        setSlides(data as HeroSlide[]);
        if (typeof window !== 'undefined') {
          localStorage.setItem('hero_slides_data', JSON.stringify(data));
        }
      }
    } catch (err) {
      // Offline or table not ready
    }
  };

  useEffect(() => {
    fetchHeroSlides();
  }, []);

  // Save all slides to storage & Supabase
  const persistSlides = async (updatedSlides: HeroSlide[]) => {
    setSlides(updatedSlides);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hero_slides_data', JSON.stringify(updatedSlides));
      window.dispatchEvent(new Event('hero_updated'));
    }

    try {
      await supabase
        .from('hero_slides')
        .upsert(updatedSlides, { onConflict: 'id' });
    } catch (err) {
      console.warn('Supabase upsert note:', err);
    }
  };

  // Open Edit Modal
  const handleEdit = (slide: HeroSlide) => {
    setSelectedSlide(slide);
    setFormData({ ...slide });
    if (slide.type === 'doctor-intro') {
      setActiveModalTab('doctor');
    } else if (slide.type === 'chamber') {
      setActiveModalTab('chamber');
    } else {
      setActiveModalTab('content');
    }
    setIsModalOpen(true);
  };

  // Open Create New Slide Modal
  const handleAddNew = () => {
    const newId = `slide-${Date.now()}`;
    const newSlide: HeroSlide = {
      id: newId,
      type: 'custom',
      is_active: true,
      order_index: slides.length,
      eyebrow_en: 'Special Feature',
      eyebrow_bn: 'বিশেষ সেবা',
      title_en: 'New Hero Announcement / Headline',
      title_bn: 'নতুন হিরো বার্তা / শিরোনাম',
      lead_en: 'Write detailed subtitle or description here.',
      lead_bn: 'এখানে বিস্তারিত তথ্য ও বিবরণ লিখুন।',
      cta_text_en: 'Contact Now',
      cta_text_bn: 'যোগাযোগ করুন',
      cta_href: 'https://wa.me/8801346132486',
      cta_type: 'whatsapp',
    };
    setSelectedSlide(null);
    setFormData(newSlide);
    setActiveModalTab('content');
    setIsModalOpen(true);
  };

  // Toggle Active/Inactive
  const handleToggleActive = (id: string) => {
    const updated = slides.map(s => s.id === id ? { ...s, is_active: !s.is_active } : s);
    persistSlides(updated);
  };

  // Delete Slide
  const handleDelete = (slide: HeroSlide) => {
    if (!confirm(isBn ? `আপনি কি "${slide.title_bn || slide.title_en}" স্লাইডটি ডিলিট করতে চান?` : `Are you sure you want to delete "${slide.title_en}"?`)) {
      return;
    }

    const updated = slides.filter(s => s.id !== slide.id);
    persistSlides(updated);

    try {
      supabase.from('hero_slides').delete().eq('id', slide.id);
    } catch (err) {}
  };

  // Move Up / Down in Order
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= slides.length) return;

    const newSlides = [...slides];
    const temp = newSlides[index];
    newSlides[index] = newSlides[newIndex];
    newSlides[newIndex] = temp;

    const indexed = newSlides.map((s, idx) => ({ ...s, order_index: idx }));
    persistSlides(indexed);
  };

  // Save Modal Form
  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let updated: HeroSlide[];
      if (selectedSlide) {
        // Edit
        updated = slides.map(s => s.id === formData.id ? { ...formData } : s);
      } else {
        // Add
        updated = [...slides, { ...formData, order_index: slides.length }];
      }

      await persistSlides(updated);
      setIsModalOpen(false);
      alert(isBn ? 'স্লাইডের তথ্য সফলভাবে সংরক্ষিত হয়েছে!' : 'Hero slide saved successfully!');
    } catch (err) {
      console.error(err);
      alert(isBn ? 'সেভ করতে সমস্যা হয়েছে!' : 'Failed to save slide!');
    } finally {
      setIsSaving(false);
    }
  };

  // Save Background Banner Image
  const handleSaveBgImage = (newUrl: string) => {
    setBgImage(newUrl);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hero_bg_image', newUrl);
      window.dispatchEvent(new Event('hero_updated'));
    }
    alert(isBn ? 'হিরো ব্যাকগ্রাউন্ড ইমেজ সফলভাবে আপডেট হয়েছে!' : 'Hero background banner updated successfully!');
  };

  // Image Upload helper (converts to Base64 data URL)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'doctor_image' | 'custom_image' | 'bgImage') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert(isBn ? 'ছবির সাইজ সর্বোচ্চ ৫ মেগাবাইট হতে পারবে।' : 'Image size must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (fieldName === 'bgImage') {
        handleSaveBgImage(result);
      } else {
        setFormData(prev => ({ ...prev, [fieldName]: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Reset to Default Slides
  const handleResetDefaults = async () => {
    if (!confirm(isBn ? 'আপনি কি সকল হিরো স্লাইড ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান?' : 'Reset all hero slides to default content?')) {
      return;
    }

    setIsSeeding(true);
    try {
      await persistSlides(defaultHeroSlides);
      setBgImage(defaultHeroBgImage);
      if (typeof window !== 'undefined') {
        localStorage.setItem('hero_bg_image', defaultHeroBgImage);
        window.dispatchEvent(new Event('hero_updated'));
      }
      alert(isBn ? 'হিরো স্লাইড সফলভাবে ডিফল্ট অবস্থায় সেট করা হয়েছে!' : 'Hero slides reset to default successfully!');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Top Banner & Action Controls */}
      <GlassPanel className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-line">
        <div>
          <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>{isBn ? 'হোম ও হিরো স্লাইড ম্যানেজার' : 'Hero & Homepage Slide Management'}</span>
          </div>
          <h3 className="font-serif text-xl md:text-2xl font-bold text-ink">
            {isBn ? 'হিরো সেকশনের সকল লেখা, ছবি ও বাটন পরিবর্তন' : 'Manage Homepage Hero Slides, Photos & Content'}
          </h3>
          <p className="text-xs sm:text-sm text-muted mt-1 max-w-2xl">
            {isBn
              ? 'হোম পেজের হিরো স্লাইডার, ডাক্তারের ছবি, ডিগ্রি, ভিজিটিং আওয়ার, চেম্বার লোকেশন ও বাটন সরাসরি যোগ, এডিট, ডিলিট ও রি-অর্ডার করুন।'
              : 'Add, edit, re-order, or hide hero cards, doctor profile photo, credentials, chamber schedule, and buttons with real-time sync.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-stretch md:self-auto">
          <button
            type="button"
            onClick={handleResetDefaults}
            disabled={isSeeding}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl shadow-xs cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
            <span>{isBn ? 'ডিফল্ট রিসেট' : 'Reset Defaults'}</span>
          </button>

          <button
            type="button"
            onClick={handleAddNew}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent hover:bg-ink text-white font-semibold text-xs rounded-xl shadow-md cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>{isBn ? 'নতুন স্লাইড যোগ করুন' : 'Add New Slide'}</span>
          </button>
        </div>
      </GlassPanel>

      {/* Hero Background Banner Manager */}
      <GlassPanel className="p-5 md:p-6 border border-line flex flex-col gap-3">
        <ImagePickerField
          label={isBn ? 'হিরো ব্যাকগ্রাউন্ড ব্যানার ছবি (Hero Desktop Banner):' : 'Hero Background Banner Image:'}
          value={bgImage}
          onChange={(val) => handleSaveBgImage(val)}
          placeholder="/hero-desktop.png"
          helperText={isBn ? 'কম্পিউটার থেকে ছবি আপলোড করুন অথবা মিডিয়া গ্যালারি থেকে সিলেক্ট করুন' : 'Upload from device or select from media gallery'}
        />
      </GlassPanel>

      {/* Slide Cards List */}
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-muted uppercase tracking-wider">
            {isBn ? `মোট স্লাইড: ${slides.length} টি` : `Total Slides: ${slides.length}`}
          </span>
          <span className="text-xs text-muted">
            {isBn ? 'উপরে-নিচে সরাতে অ্যারো (⬆️ ⬇️) ব্যবহার করুন' : 'Use arrows to re-order slideshow position'}
          </span>
        </div>

        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`p-4 md:p-5 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              slide.is_active
                ? 'bg-white/90 border-line hover:border-accent/40 shadow-xs hover:shadow-md'
                : 'bg-slate-50/70 border-slate-200 opacity-60'
            }`}
          >
            {/* Left Info */}
            <div className="flex items-start gap-3.5 flex-1 min-w-0">
              {/* Order Badge */}
              <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                #{idx + 1}
              </div>

              {/* Doctor / Custom Thumbnail */}
              {(slide.type === 'doctor-intro' || slide.doctor_image || slide.custom_image) && (
                <div className="w-12 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-2xs">
                  <img
                    src={slide.doctor_image || slide.custom_image || '/doctor-hero.png'}
                    alt="Thumb"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-serif font-bold text-sm md:text-base text-ink truncate">
                    {isBn ? (slide.title_bn || slide.title_en) : (slide.title_en || slide.title_bn)}
                  </h4>

                  {/* Type Badge */}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                    slide.type === 'doctor-intro' ? 'bg-emerald-100 text-emerald-800' :
                    slide.type === 'chamber' ? 'bg-teal-100 text-teal-800' :
                    slide.type === 'welcome' ? 'bg-blue-100 text-blue-800' :
                    slide.type === 'conditions' ? 'bg-purple-100 text-purple-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {slide.type}
                  </span>

                  {!slide.is_active && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-700">
                      {isBn ? 'লুকানো (Hidden)' : 'Disabled'}
                    </span>
                  )}
                </div>

                <p className="text-xs text-muted line-clamp-1">
                  {slide.type === 'doctor-intro' && `${slide.doctor_degrees_bn || slide.doctor_degrees_en} • ${slide.doctor_designation_bn || slide.doctor_designation_en}`}
                  {slide.type === 'chamber' && `${slide.chamber_room_bn || slide.chamber_room_en} • ${slide.chamber_hours_bn || slide.chamber_hours_en}`}
                  {slide.type === 'welcome' && (isBn ? slide.lead_bn : slide.lead_en)}
                  {slide.type === 'conditions' && (isBn ? '১৪টি ক্লিনিক্যাল রোগের গ্রিড ও ড্যাশবোর্ড' : 'Diseases Grid Presentation')}
                  {slide.type === 'custom' && (isBn ? slide.lead_bn : slide.lead_en)}
                </p>

                {/* Micro tags */}
                <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[11px] text-slate-500 font-mono">
                  {slide.cta_text_en && (
                    <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded">
                      CTA: {isBn ? slide.cta_text_bn : slide.cta_text_en}
                    </span>
                  )}
                  {slide.doctor_specialty_en && slide.type === 'doctor-intro' && (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                      {isBn ? slide.doctor_specialty_bn : slide.doctor_specialty_en}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
              {/* Move Up */}
              <button
                type="button"
                disabled={idx === 0}
                onClick={() => handleMove(idx, 'up')}
                title="Move Up"
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

              {/* Move Down */}
              <button
                type="button"
                disabled={idx === slides.length - 1}
                onClick={() => handleMove(idx, 'down')}
                title="Move Down"
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <ArrowDown className="w-4 h-4" />
              </button>

              {/* Toggle Active */}
              <button
                type="button"
                onClick={() => handleToggleActive(slide.id)}
                title={slide.is_active ? 'Hide Slide' : 'Show Slide'}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                  slide.is_active
                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                }`}
              >
                {slide.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              {/* Edit Button */}
              <button
                type="button"
                onClick={() => handleEdit(slide)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-ink text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>{isBn ? 'এডিট' : 'Edit'}</span>
              </button>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => handleDelete(slide)}
                title="Delete Slide"
                className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT / CREATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden my-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center font-bold">
                  <Edit className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base md:text-lg text-ink">
                    {selectedSlide
                      ? (isBn ? `স্লাইড এডিট: ${formData.title_bn || formData.title_en}` : `Edit Slide: ${formData.title_en}`)
                      : (isBn ? 'নতুন হিরো স্লাইড যোগ করুন' : 'Create New Hero Slide')}
                  </h3>
                  <p className="text-xs text-muted">
                    {isBn ? 'বাংলা ও ইংরেজি উভয় ভাষার জন্য তথ্য পরিবর্তন করুন' : 'Configure bilingual content, buttons, and media'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 pb-1 border-b border-slate-200 overflow-x-auto bg-white shrink-0">
              <button
                type="button"
                onClick={() => setActiveModalTab('content')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeModalTab === 'content'
                    ? 'bg-accent text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                📝 {isBn ? 'শিরোনাম ও বিবরণ' : 'Title & Content'}
              </button>

              {(formData.type === 'doctor-intro' || formData.type === 'custom') && (
                <button
                  type="button"
                  onClick={() => setActiveModalTab('doctor')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    activeModalTab === 'doctor'
                      ? 'bg-accent text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  👨‍⚕️ {isBn ? 'ডাক্তারের ছবি ও পরিচিতি' : 'Doctor Photo & Info'}
                </button>
              )}

              {(formData.type === 'chamber' || formData.type === 'doctor-intro') && (
                <button
                  type="button"
                  onClick={() => setActiveModalTab('chamber')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    activeModalTab === 'chamber'
                      ? 'bg-accent text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  🏥 {isBn ? 'চেম্বার ও সময়সূচী' : 'Chamber & Schedule'}
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveModalTab('buttons')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeModalTab === 'buttons'
                    ? 'bg-accent text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                🔘 {isBn ? 'অ্যাকশন বাটন' : 'CTA Buttons'}
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab('preview')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeModalTab === 'preview'
                    ? 'bg-accent text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                👁️ {isBn ? 'লাইভ প্রিভিউ' : 'Live Preview'}
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveForm} className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
              {/* TAB 1: Title & Content */}
              {activeModalTab === 'content' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-ink">Slide Type (স্লাইডের ধরন)</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    >
                      <option value="welcome">Welcome Headline Slide (স্বাগতম শিরোনাম)</option>
                      <option value="doctor-intro">Doctor Intro & Portrait Slide (ডাক্তার পরিচিতি ও ছবি)</option>
                      <option value="conditions">Diseases We Treat Slide (রোগসমূহের তালিকা)</option>
                      <option value="chamber">Chamber & Visiting Hours Slide (চেম্বার ও সময়সূচী)</option>
                      <option value="custom">Custom Slide (কাস্টম স্লাইড)</option>
                    </select>
                  </div>

                  {/* Eyebrow En & Bn */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Eyebrow Tag (English)</label>
                    <input
                      type="text"
                      value={formData.eyebrow_en || ''}
                      onChange={(e) => setFormData({ ...formData, eyebrow_en: e.target.value })}
                      placeholder="e.g. Medicine Specialist · Sylhet"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">আইব্রো ট্যাগ (বাংলা)</label>
                    <input
                      type="text"
                      value={formData.eyebrow_bn || ''}
                      onChange={(e) => setFormData({ ...formData, eyebrow_bn: e.target.value })}
                      placeholder="যেমন: মেডিসিন বিশেষজ্ঞ · সিলেট"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>

                  {/* Title En & Bn */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Main Title (English) *</label>
                    <input
                      type="text"
                      required
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                      placeholder="Enter main slide title..."
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none font-semibold"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">মূল শিরোনাম (বাংলা) *</label>
                    <input
                      type="text"
                      required
                      value={formData.title_bn}
                      onChange={(e) => setFormData({ ...formData, title_bn: e.target.value })}
                      placeholder="স্লাইডের মূল শিরোনাম লিখুন..."
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none font-semibold"
                    />
                  </div>

                  {/* Lead / Subtitle En & Bn */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Subtitle / Lead Description (English)</label>
                    <textarea
                      rows={3}
                      value={formData.lead_en || ''}
                      onChange={(e) => setFormData({ ...formData, lead_en: e.target.value })}
                      placeholder="Enter lead description..."
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">সাবটাইটেল / বিবরণ (বাংলা)</label>
                    <textarea
                      rows={3}
                      value={formData.lead_bn || ''}
                      onChange={(e) => setFormData({ ...formData, lead_bn: e.target.value })}
                      placeholder="সাবটাইটেল বা বিবরণ লিখুন..."
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: Doctor Photo & Info */}
              {activeModalTab === 'doctor' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
                  {/* Doctor Image Manager */}
                  <div className="md:col-span-2">
                    <ImagePickerField
                      label={isBn ? 'ডাক্তারের পোর্ট্রেট ছবি (Doctor Portrait Photo):' : 'Doctor Portrait Photo:'}
                      value={formData.doctor_image || ''}
                      onChange={(val) => setFormData({ ...formData, doctor_image: val })}
                      placeholder="/doctor-hero.png"
                      helperText={isBn ? 'ডিভাইস থেকে আপলোড বা গ্যালারি থেকে সিলেক্ট করুন' : 'Upload device photo or pick from gallery'}
                    />
                  </div>

                  {/* Specialty Badge */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Specialty Badge (English)</label>
                    <input
                      type="text"
                      value={formData.doctor_specialty_en || ''}
                      onChange={(e) => setFormData({ ...formData, doctor_specialty_en: e.target.value })}
                      placeholder="e.g. Medicine Specialist"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">স্পেশালিটি ব্যাজ (বাংলা)</label>
                    <input
                      type="text"
                      value={formData.doctor_specialty_bn || ''}
                      onChange={(e) => setFormData({ ...formData, doctor_specialty_bn: e.target.value })}
                      placeholder="যেমন: মেডিসিন বিশেষজ্ঞ"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>

                  {/* Degrees */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Degrees & Qualifications (English)</label>
                    <input
                      type="text"
                      value={formData.doctor_degrees_en || ''}
                      onChange={(e) => setFormData({ ...formData, doctor_degrees_en: e.target.value })}
                      placeholder="e.g. MBBS, MCPS (Medicine), FCPS (Medicine)"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none font-semibold text-accent"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">ডিগ্রি ও যোগ্যতা (বাংলা)</label>
                    <input
                      type="text"
                      value={formData.doctor_degrees_bn || ''}
                      onChange={(e) => setFormData({ ...formData, doctor_degrees_bn: e.target.value })}
                      placeholder="যেমন: MBBS, MCPS (Medicine), FCPS (Medicine)"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none font-semibold text-accent"
                    />
                  </div>

                  {/* Designation */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Designation & Hospital (English)</label>
                    <textarea
                      rows={2}
                      value={formData.doctor_designation_en || ''}
                      onChange={(e) => setFormData({ ...formData, doctor_designation_en: e.target.value })}
                      placeholder="e.g. Medicine Specialist (Department of Medicine), Sylhet MAG Osmani Medical College Hospital"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">পদবী ও হাসপাতাল (বাংলা)</label>
                    <textarea
                      rows={2}
                      value={formData.doctor_designation_bn || ''}
                      onChange={(e) => setFormData({ ...formData, doctor_designation_bn: e.target.value })}
                      placeholder="যেমন: মেডিসিন বিশেষজ্ঞ (মেডিসিন বিভাগ), সিলেট এম.এ.জি. ওসমানী মেডিকেল কলেজ হাসপাতাল"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>

                  {/* Highlight Box Hours */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Card Visiting Hours (English)</label>
                    <input
                      type="text"
                      value={formData.chamber_hours_highlight_en || ''}
                      onChange={(e) => setFormData({ ...formData, chamber_hours_highlight_en: e.target.value })}
                      placeholder="e.g. Patient Viewing: 5:00 PM – 9:00 PM (Friday & Tuesday Closed)"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">কার্ড রোগী দেখার সময় (বাংলা)</label>
                    <input
                      type="text"
                      value={formData.chamber_hours_highlight_bn || ''}
                      onChange={(e) => setFormData({ ...formData, chamber_hours_highlight_bn: e.target.value })}
                      placeholder="যেমন: রোগী দেখার সময়: প্রতিদিন বিকাল ৫:০০টা – রাত ৯:০০টা (শুক্রবার ও মঙ্গলবার বন্ধ)"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>

                  {/* Highlight Box Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Card Chamber Address (English)</label>
                    <input
                      type="text"
                      value={formData.chamber_address_highlight_en || ''}
                      onChange={(e) => setFormData({ ...formData, chamber_address_highlight_en: e.target.value })}
                      placeholder="e.g. Popular Medical Center Ltd. (Room 605), New Medical Road, Kazalshah, Sylhet."
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">কার্ড চেম্বারের ঠিকানা (বাংলা)</label>
                    <input
                      type="text"
                      value={formData.chamber_address_highlight_bn || ''}
                      onChange={(e) => setFormData({ ...formData, chamber_address_highlight_bn: e.target.value })}
                      placeholder="যেমন: পপুলার মেডিকেল সেন্টার লিমিটেড (রুম-৬০৫), নিউ মেডিকেল রোড, কাজলশাহ, সিলেট।"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: Chamber & Schedule */}
              {activeModalTab === 'chamber' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
                  {/* Chamber Card 1: Room & Badge */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Room / Floor Info (English)</label>
                    <input
                      type="text"
                      value={formData.chamber_room_en || ''}
                      onChange={(e) => setFormData({ ...formData, chamber_room_en: e.target.value })}
                      placeholder="e.g. 6th Floor, Room No-605"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">রুম ও ফ্লোর তথ্য (বাংলা)</label>
                    <input
                      type="text"
                      value={formData.chamber_room_bn || ''}
                      onChange={(e) => setFormData({ ...formData, chamber_room_bn: e.target.value })}
                      placeholder="যেমন: ৬ষ্ঠ তলা, রুম নং-৬০৫"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>

                  {/* Room Badge */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Room Badge (English)</label>
                    <input
                      type="text"
                      value={formData.chamber_room_badge_en || ''}
                      onChange={(e) => setFormData({ ...formData, chamber_room_badge_en: e.target.value })}
                      placeholder="e.g. Main Chamber"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">রুম ব্যাজ (বাংলা)</label>
                    <input
                      type="text"
                      value={formData.chamber_room_badge_bn || ''}
                      onChange={(e) => setFormData({ ...formData, chamber_room_badge_bn: e.target.value })}
                      placeholder="যেমন: প্রধান চেম্বার"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>

                  {/* Chamber Address Card */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Chamber Address Line (English)</label>
                    <input
                      type="text"
                      value={formData.chamber_address_en || ''}
                      onChange={(e) => setFormData({ ...formData, chamber_address_en: e.target.value })}
                      placeholder="e.g. New Medical Road, Kazalshah, Sylhet."
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">চেম্বারের ঠিকানা লাইন (বাংলা)</label>
                    <input
                      type="text"
                      value={formData.chamber_address_bn || ''}
                      onChange={(e) => setFormData({ ...formData, chamber_address_bn: e.target.value })}
                      placeholder="যেমন: নিউ মেডিকেল রোড, কাজলশাহ, সিলেট।"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>

                  {/* Chamber Card 2: Visiting Hours */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Visiting Hours Text (English)</label>
                    <input
                      type="text"
                      value={formData.chamber_hours_en || ''}
                      onChange={(e) => setFormData({ ...formData, chamber_hours_en: e.target.value })}
                      placeholder="e.g. 5:00 PM – 9:00 PM (Daily)"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">রোগী দেখার সময় (বাংলা)</label>
                    <input
                      type="text"
                      value={formData.chamber_hours_bn || ''}
                      onChange={(e) => setFormData({ ...formData, chamber_hours_bn: e.target.value })}
                      placeholder="যেমন: প্রতিদিন বিকাল ৫:০০টা – রাত ৯:০০টা"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>

                  {/* Off Days Badge */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Off-Days Badge (English)</label>
                    <input
                      type="text"
                      value={formData.chamber_off_days_en || ''}
                      onChange={(e) => setFormData({ ...formData, chamber_off_days_en: e.target.value })}
                      placeholder="e.g. Friday & Tuesday Closed"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none text-rose-600 font-semibold"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">বন্ধের দিন ব্যাজ (বাংলা)</label>
                    <input
                      type="text"
                      value={formData.chamber_off_days_bn || ''}
                      onChange={(e) => setFormData({ ...formData, chamber_off_days_bn: e.target.value })}
                      placeholder="যেমন: শুক্রবার ও মঙ্গলবার চেম্বার বন্ধ থাকে"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none text-rose-600 font-semibold"
                    />
                  </div>

                  {/* Chamber Card 3: Hotline & Ticket */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Hotline Phone Number</label>
                    <input
                      type="text"
                      value={formData.chamber_ticket_phone || ''}
                      onChange={(e) => setFormData({ ...formData, chamber_ticket_phone: e.target.value })}
                      placeholder="e.g. 01346-132486"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none font-mono font-bold"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Hotline Badge (বাংলা ও English)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={formData.chamber_ticket_badge_en || ''}
                        onChange={(e) => setFormData({ ...formData, chamber_ticket_badge_en: e.target.value })}
                        placeholder="EN: Serial Hotline"
                        className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                      />
                      <input
                        type="text"
                        value={formData.chamber_ticket_badge_bn || ''}
                        onChange={(e) => setFormData({ ...formData, chamber_ticket_badge_bn: e.target.value })}
                        placeholder="BN: সিরিয়াল হটলাইন"
                        className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Hotline Note */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Hotline Note / Timing (English)</label>
                    <input
                      type="text"
                      value={formData.chamber_ticket_note_en || ''}
                      onChange={(e) => setFormData({ ...formData, chamber_ticket_note_en: e.target.value })}
                      placeholder="e.g. Call after 9:00 AM to confirm your appointment serial"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">হটলাইন নির্দেশনা (বাংলা)</label>
                    <input
                      type="text"
                      value={formData.chamber_ticket_note_bn || ''}
                      onChange={(e) => setFormData({ ...formData, chamber_ticket_note_bn: e.target.value })}
                      placeholder="যেমন: সকাল ৯:০০টার পর কল করে সিরিয়াল বুকিং নিশ্চিত করুন"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: CTA Buttons */}
              {activeModalTab === 'buttons' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
                  {/* Primary CTA */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Primary Button Text (English)</label>
                    <input
                      type="text"
                      value={formData.cta_text_en || ''}
                      onChange={(e) => setFormData({ ...formData, cta_text_en: e.target.value })}
                      placeholder="e.g. Call for Serial"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">প্রধান বাটন টেক্সট (বাংলা)</label>
                    <input
                      type="text"
                      value={formData.cta_text_bn || ''}
                      onChange={(e) => setFormData({ ...formData, cta_text_bn: e.target.value })}
                      placeholder="যেমন: সিরিয়ালের জন্য কল করুন"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Primary Button Link (URL / Phone / WhatsApp)</label>
                    <input
                      type="text"
                      value={formData.cta_href || ''}
                      onChange={(e) => setFormData({ ...formData, cta_href: e.target.value })}
                      placeholder="e.g. https://wa.me/8801346132486 or tel:01346132486"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Primary Button Icon Type</label>
                    <select
                      value={formData.cta_type || 'whatsapp'}
                      onChange={(e) => setFormData({ ...formData, cta_type: e.target.value as any })}
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    >
                      <option value="whatsapp">WhatsApp Icon (MessageCircle)</option>
                      <option value="call">Phone Call Icon (PhoneCall)</option>
                      <option value="link">Regular Link Arrow (ArrowRight)</option>
                    </select>
                  </div>

                  {/* Secondary CTA */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">Secondary Button Text (English)</label>
                    <input
                      type="text"
                      value={formData.secondary_cta_text_en || ''}
                      onChange={(e) => setFormData({ ...formData, secondary_cta_text_en: e.target.value })}
                      placeholder="e.g. Doctor's Journey"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">দ্বিতীয় বাটন টেক্সট (বাংলা)</label>
                    <input
                      type="text"
                      value={formData.secondary_cta_text_bn || ''}
                      onChange={(e) => setFormData({ ...formData, secondary_cta_text_bn: e.target.value })}
                      placeholder="যেমন: ডাক্তারের জীবন ও ডিগ্রি"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-ink">Secondary Button Link (URL / Route)</label>
                    <input
                      type="text"
                      value={formData.secondary_cta_href || ''}
                      onChange={(e) => setFormData({ ...formData, secondary_cta_href: e.target.value })}
                      placeholder="e.g. /about or /diseases or tel:01346132486"
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none font-mono"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: Live Preview */}
              {activeModalTab === 'preview' && (
                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                  <span className="text-xs text-muted">
                    {isBn ? 'এই স্লাইডটি ওয়েবসাইটে যেভাবে প্রদর্শিত হবে তার নমুনা:' : 'Visual preview of this slide card in Bangla and English:'}
                  </span>

                  {/* Bangla Preview Card */}
                  <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                        {formData.eyebrow_bn || 'মেডিসিন বিশেষজ্ঞ · সিলেট'}
                      </span>
                      <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">বাংলা প্রিভিউ</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold leading-snug">
                      {formData.title_bn || 'সঠিক রোগ নির্ণয় ও সুচিকিৎসা — আপনার আস্থায় আমাদের অঙ্গীকার।'}
                    </h3>

                    {formData.type === 'doctor-intro' && (
                      <div className="flex items-center gap-4 bg-white/10 p-3 rounded-2xl">
                        <img src={formData.doctor_image || '/doctor-hero.png'} alt="Doc" className="w-14 h-18 rounded-xl object-cover" />
                        <div>
                          <p className="text-sm font-bold text-emerald-400">{formData.doctor_degrees_bn || 'MBBS, MCPS, FCPS (Medicine)'}</p>
                          <p className="text-xs text-slate-300">{formData.doctor_designation_bn}</p>
                        </div>
                      </div>
                    )}

                    {formData.lead_bn && (
                      <p className="text-xs text-slate-300 leading-relaxed">{formData.lead_bn}</p>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2">
                      {formData.cta_text_bn && (
                        <div className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{formData.cta_text_bn}</span>
                        </div>
                      )}
                      {formData.secondary_cta_text_bn && (
                        <div className="px-4 py-2 bg-white/20 text-white text-xs font-bold rounded-xl">
                          {formData.secondary_cta_text_bn}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between mt-auto">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-ink text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? (isBn ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (isBn ? '💾 স্লাইড সেভ করুন' : 'Save Hero Slide')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSlidesManager;
