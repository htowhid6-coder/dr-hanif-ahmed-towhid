'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Upload,
  Image as ImageIcon,
  FolderOpen,
  X,
  CheckCircle2,
  Search,
  Sparkles,
  Trash2,
  ExternalLink,
  Layers
} from 'lucide-react';

export interface MediaAsset {
  name: string;
  category: 'hero' | 'about' | 'banners' | 'diseases' | 'symptoms' | 'blogs' | 'custom' | 'general';
  path: string;
  description?: string;
}

export const defaultMediaAssets: MediaAsset[] = [
  {
    name: 'Doctor Hero Portrait (প্রধান হিরো শট)',
    category: 'hero',
    path: '/Hero shot_At dr.hanif towhid.png',
    description: 'Home hero slide doctor portrait with credentials'
  },
  {
    name: 'About Page Cover Banner (অ্যাবাউট কভার)',
    category: 'about',
    path: '/Dr. Hanif_About page hero section image.png',
    description: 'Full-width top cover banner on About page'
  },
  {
    name: 'Consultation Room Background (চেম্বার পরিচিতি)',
    category: 'hero',
    path: '/doctor-consultation-bg.png',
    description: 'Specialist introduction room edge-to-edge background'
  },
  {
    name: 'Aesthetic Breaker Banner 2 (ক্লিনিক্যাল উৎকর্ষ)',
    category: 'banners',
    path: '/Section Breaking Aesthetic Image_2.png',
    description: 'Clinical excellence & diagnostic parallax breaker'
  },
  {
    name: 'Aesthetic Breaker Banner 3 (রোগীসেবা ও পরামর্শ)',
    category: 'banners',
    path: '/Section Breaking Aesthetic Image_3.png',
    description: 'Patient care & chamber consultation parallax breaker'
  },
  {
    name: 'Ambient Watercolor Background (অ্যাম্বিয়েন্ট ব্যাকগ্রাউন্ড)',
    category: 'general',
    path: '/about-bg.jpeg',
    description: 'Soft watercolor ambient background overlay'
  },
  {
    name: 'Diseases Directory Banner (রোগসমূহ কভার)',
    category: 'diseases',
    path: '/diseases-cover-banner.png',
    description: 'Full-width header banner for clinical disease directory'
  },
  {
    name: 'Diabetes Mellitus (ডায়াবেটিস)',
    category: 'diseases',
    path: '/Diseases_Images/diabetes.jpg',
    description: 'Clinical condition image for Diabetes Mellitus'
  },
  {
    name: 'Hypertension (উচ্চ রক্তচাপ)',
    category: 'diseases',
    path: '/Diseases_Images/hypertension.jpg',
    description: 'Clinical condition image for High Blood Pressure'
  },
  {
    name: 'Thyroid Disorder (থাইরয়েড সমস্যা)',
    category: 'diseases',
    path: '/Diseases_Images/thyroid.jpg',
    description: 'Clinical condition image for Thyroid Disease'
  },
  {
    name: 'Fatty Liver Disease (ফ্যাটি লিভার)',
    category: 'diseases',
    path: '/Diseases_Images/fatty_liver.jpg',
    description: 'Clinical condition image for Fatty Liver Disease'
  },
  {
    name: 'Asthma & COPD (হাঁপানি ও সিওপিডি)',
    category: 'diseases',
    path: '/Diseases_Images/asthma_copd.jpg',
    description: 'Clinical condition image for Asthma and COPD'
  },
  {
    name: 'Chronic Kidney Disease (কিডনি সমস্যা)',
    category: 'diseases',
    path: '/Diseases_Images/ckd.jpg',
    description: 'Clinical condition image for Chronic Kidney Disease'
  },
  {
    name: 'Peptic Ulcer (গ্যাস্ট্রিক ও আলসার)',
    category: 'diseases',
    path: '/Diseases_Images/peptic_ulcer.jpg',
    description: 'Clinical condition image for Acid Peptic Disease'
  },
  {
    name: 'Fever & Infection (জ্বর ও সংক্রামক ব্যাধি)',
    category: 'diseases',
    path: '/Diseases_Images/fever_infection.jpg',
    description: 'Clinical condition image for Pyrexia and Infections'
  },
  {
    name: 'Fever Symptom Icon',
    category: 'symptoms',
    path: '/symptoms/fever.png',
    description: 'Symptom anatomy icon'
  },
  {
    name: 'Low Back Pain Icon',
    category: 'symptoms',
    path: '/symptoms/low-back-pain.png',
    description: 'Symptom anatomy icon'
  },
  {
    name: 'Knee & Joint Pain Icon',
    category: 'symptoms',
    path: '/symptoms/knee-pain.png',
    description: 'Symptom anatomy icon'
  },
  {
    name: 'Fatigue & Exhaustion Icon',
    category: 'symptoms',
    path: '/symptoms/fatigue.png',
    description: 'Symptom anatomy icon'
  },
  {
    name: 'Headache & Migraine Icon',
    category: 'symptoms',
    path: '/symptoms/headache.png',
    description: 'Symptom anatomy icon'
  },
  {
    name: 'Chest Pain / Angina Icon',
    category: 'symptoms',
    path: '/symptoms/chest-pain.png',
    description: 'Symptom anatomy icon'
  },
  {
    name: 'Dysuria / Burning Icon',
    category: 'symptoms',
    path: '/symptoms/dysuria.png',
    description: 'Symptom anatomy icon'
  },
  {
    name: 'Diabetes Care Blog Thumbnail',
    category: 'blogs',
    path: '/blogs/diabetes_care_guide.jpg',
    description: 'Featured thumbnail for diabetes care blog'
  }
];

interface ImagePickerFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  helperText?: string;
  className?: string;
}

export const ImagePickerField: React.FC<ImagePickerFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = '/image.png or URL...',
  helperText,
  className = ''
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customUploads, setCustomUploads] = useState<{ name: string; url: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load custom uploads from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('custom_media_uploads');
      if (local) {
        try {
          setCustomUploads(JSON.parse(local));
        } catch (e) {}
      }
    }
  }, [isGalleryOpen]);

  // Handle local device file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onChange(dataUrl);

      // Save to gallery for reuse
      const newItem = { name: file.name, url: dataUrl };
      const updated = [newItem, ...customUploads.filter(u => u.name !== file.name)];
      setCustomUploads(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('custom_media_uploads', JSON.stringify(updated));
      }
    };
    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Combine default assets with user custom uploads
  const allGalleryItems: MediaAsset[] = [
    ...customUploads.map(c => ({
      name: c.name,
      category: 'custom' as const,
      path: c.url,
      description: isBn ? 'আপনার ডিভাইস থেকে আপলোডকৃত ছবি' : 'Uploaded from your device'
    })),
    ...defaultMediaAssets
  ];

  // Filter gallery items
  const filteredGallery = allGalleryItems.filter(item => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchCat;
    return matchCat && (
      item.name.toLowerCase().includes(query) ||
      item.path.toLowerCase().includes(query) ||
      (item.description && item.description.toLowerCase().includes(query))
    );
  });

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label and Actions */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-ink flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-accent" />
          <span>{label}</span>
        </label>
        {helperText && (
          <span className="text-[10px] text-muted">{helperText}</span>
        )}
      </div>

      {/* Input Group with Live Preview Box */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-white/70 p-2.5 rounded-2xl border border-panel-border shadow-xs">
        {/* Thumbnail Preview */}
        <div className="relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center group shadow-xs">
          {value ? (
            <>
              <img
                src={value}
                alt="Selected Preview"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                title={isBn ? 'ছবি ক্লিয়ার করুন' : 'Clear Image'}
              >
                <X className="w-3 h-3" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-muted p-1 text-center">
              <ImageIcon className="w-6 h-6 stroke-1 text-slate-400" />
              <span className="text-[9px] mt-0.5 text-slate-400">{isBn ? 'ছবি নেই' : 'No Image'}</span>
            </div>
          )}
        </div>

        {/* Input Field & Buttons */}
        <div className="flex-1 flex flex-col gap-2 w-full">
          {/* Path/URL Input */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-xs"
          />

          {/* Quick Trigger Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 1. Local Device Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-white hover:bg-ink font-semibold text-[11px] transition-all cursor-pointer shadow-xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isBn ? 'ডিভাইস থেকে আপলোড' : 'Upload Local File'}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* 2. Gallery Modal Trigger Button */}
            <button
              type="button"
              onClick={() => setIsGalleryOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-panel-border text-ink hover:bg-slate-50 font-semibold text-[11px] transition-all cursor-pointer shadow-xs"
            >
              <FolderOpen className="w-3.5 h-3.5 text-accent" />
              <span>{isBn ? 'গ্যালারি থেকে পছন্দ করুন' : 'Select from Gallery'}</span>
            </button>

            {/* 3. Clear Button */}
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="inline-flex items-center gap-1 text-[11px] text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 cursor-pointer font-medium"
              >
                <Trash2 className="w-3 h-3" />
                <span>{isBn ? 'ক্লিয়ার' : 'Clear'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL-SCREEN GLASSMORPHIC MEDIA GALLERY MODAL */}
      {/* ========================================================================= */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl border border-white/60 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-line flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-xs">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-ink">
                    {isBn ? 'মিডিয়া গ্যালারি থেকে ছবি নির্বাচন করুন' : 'Select Image from Media Gallery'}
                  </h3>
                  <p className="text-xs text-muted">
                    {isBn
                      ? 'ওয়েবসাইটে ব্যবহৃত সকল প্রিসেট ছবি বা আপনার আপলোড করা ছবি থেকে ১-ক্লিকে সিলেক্ট করুন।'
                      : 'Choose from preset site assets or your uploaded device images.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent text-white hover:bg-ink text-xs font-bold cursor-pointer shadow-sm transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>{isBn ? 'নতুন আপলোড' : 'Upload New'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsGalleryOpen(false)}
                  className="w-9 h-9 rounded-xl bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 sm:p-5 border-b border-line flex flex-col sm:flex-row gap-3 justify-between items-center bg-white">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {[
                  { id: 'all', label: isBn ? 'সকল ছবি' : 'All' },
                  { id: 'custom', label: isBn ? 'আপলোডকৃত' : 'Uploaded' },
                  { id: 'hero', label: isBn ? 'হিরো ও ডক্টর' : 'Hero & Doctor' },
                  { id: 'about', label: isBn ? 'About ব্যানার' : 'About' },
                  { id: 'banners', label: isBn ? 'ব্রেকার ব্যানার' : 'Banners' },
                  { id: 'diseases', label: isBn ? 'রোগের ছবি' : 'Diseases' },
                  { id: 'symptoms', label: isBn ? 'লক্ষণ আইকন' : 'Symptoms' },
                  { id: 'blogs', label: isBn ? 'ব্লগ' : 'Blogs' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-accent text-white shadow-xs'
                        : 'bg-slate-100 text-muted hover:bg-slate-200 hover:text-ink'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-accent absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isBn ? 'নাম দিয়ে খুঁজুন...' : 'Search media...'}
                  className="w-full pl-8.5 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-slate-50/50">
              {filteredGallery.length === 0 ? (
                <div className="py-16 text-center text-muted text-xs flex flex-col items-center gap-2">
                  <ImageIcon className="w-10 h-10 text-slate-300" />
                  <span>{isBn ? 'কোনো ছবি পাওয়া যায়নি!' : 'No images found matching your filter!'}</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredGallery.map((item, idx) => {
                    const isSelected = value === item.path;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          onChange(item.path);
                          setIsGalleryOpen(false);
                        }}
                        className={`group relative flex flex-col justify-between rounded-2xl bg-white border p-2.5 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-lg hover:-translate-y-1 ${
                          isSelected
                            ? 'border-accent ring-2 ring-accent/30 bg-accent/5'
                            : 'border-panel-border hover:border-accent/40'
                        }`}
                      >
                        {/* Image Preview Container */}
                        <div className="relative w-full h-28 sm:h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img
                            src={item.path}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />

                          {/* Selected Checkmark Badge */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 p-1 rounded-full bg-accent text-white shadow-md">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                          )}

                          {/* Category Badge */}
                          <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold uppercase tracking-wider bg-black/70 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                            {item.category}
                          </span>
                        </div>

                        {/* Title & Path */}
                        <div className="mt-2 flex flex-col">
                          <span className="text-xs font-bold text-ink truncate group-hover:text-accent transition-colors" title={item.name}>
                            {item.name}
                          </span>
                          <span className="text-[10px] text-muted truncate mt-0.5 font-mono" title={item.path}>
                            {item.path.startsWith('data:') ? 'Base64 Local Image' : item.path}
                          </span>
                        </div>

                        {/* Click to Select hover banner */}
                        <div className="mt-2 pt-2 border-t border-line/60 flex items-center justify-between text-[11px] font-bold text-accent">
                          <span>{isSelected ? (isBn ? 'নির্বাচিত' : 'Selected') : (isBn ? 'সিলেক্ট করুন' : 'Click to Select')}</span>
                          <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-line bg-white flex justify-between items-center">
              <span className="text-xs text-muted">
                {isBn ? `মোট ${filteredGallery.length}টি ইমেজ প্রদর্শিত হচ্ছে` : `Showing ${filteredGallery.length} images`}
              </span>
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-ink text-xs font-bold cursor-pointer transition-colors"
              >
                {isBn ? 'বন্ধ করুন' : 'Close Gallery'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
