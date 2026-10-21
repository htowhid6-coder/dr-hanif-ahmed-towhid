'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import supabase from '@/lib/supabase';
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
  Layers,
  RotateCcw,
  Loader2,
  AlertCircle
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
    name: 'Doctor Hero Portrait Alternative (ডাক্তারের ছবি ২)',
    category: 'hero',
    path: '/doctor-hero.png',
    description: 'Transparent high-resolution doctor portrait for hero section'
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
    name: 'Diseases Page Cover Banner (রোগসমূহ কভার ব্যানার)',
    category: 'banners',
    path: '/diseases-cover-banner.png',
    description: 'Dr. Hanif Towhid with patient consultation cover banner for /diseases'
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
    path: '/diseases/diabetes.png',
    description: 'Clinical condition image for Diabetes Mellitus'
  },
  {
    name: 'Hypertension (উচ্চ রক্তচাপ)',
    category: 'diseases',
    path: '/diseases/hypertension.png',
    description: 'Clinical condition image for High Blood Pressure'
  },
  {
    name: 'Thyroid Disorder (থাইরয়েড সমস্যা)',
    category: 'diseases',
    path: '/diseases/thyroid.png',
    description: 'Clinical condition image for Thyroid Disease'
  },
  {
    name: 'Fatty Liver Disease (ফ্যাটি লিভার)',
    category: 'diseases',
    path: '/diseases/fatty-liver.png',
    description: 'Clinical condition image for Fatty Liver Disease'
  },
  {
    name: 'Asthma & COPD (হাঁপানি ও সিওপিডি)',
    category: 'diseases',
    path: '/diseases/asthma-copd.png',
    description: 'Clinical condition image for Asthma and COPD'
  },
  {
    name: 'Chronic Kidney Disease (কিডনি সমস্যা)',
    category: 'diseases',
    path: '/diseases/ckd.png',
    description: 'Clinical condition image for Chronic Kidney Disease'
  },
  {
    name: 'Peptic Ulcer (গ্যাস্ট্রিক ও আলসার)',
    category: 'diseases',
    path: '/diseases/peptic-ulcer.png',
    description: 'Clinical condition image for Acid Peptic Disease'
  },
  {
    name: 'Fever & Infection (জ্বর ও সংক্রামক ব্যাধি)',
    category: 'diseases',
    path: '/diseases/fever-infection.png',
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
    name: 'Palpitation Icon',
    category: 'symptoms',
    path: '/symptoms/palpitation.png',
    description: 'Symptom anatomy icon'
  },
  {
    name: 'Cough Icon',
    category: 'symptoms',
    path: '/symptoms/cough.png',
    description: 'Symptom anatomy icon'
  },
  {
    name: 'Diabetes Care Blog Thumbnail',
    category: 'blogs',
    path: '/blogs/diabetes_care_guide.jpg',
    description: 'Featured thumbnail for diabetes care blog'
  }
];

export interface ImagePickerFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  helperText?: string;
  defaultFallback?: string;
  className?: string;
}

export const ImagePickerField: React.FC<ImagePickerFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = '/image.png or URL...',
  helperText,
  defaultFallback,
  className = ''
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [customUploads, setCustomUploads] = useState<{ name: string; url: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load custom uploads from localStorage safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const local = localStorage.getItem('custom_media_uploads');
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed)) setCustomUploads(parsed);
        }
      } catch (e) {}
    }
  }, [isGalleryOpen]);

  /**
   * Process & Optimize image on client-side:
   * 1. Validates image MIME type for security.
   * 2. Attempts upload to Supabase storage 'uploads' bucket if configured.
   * 3. Falls back seamlessly to downsampling on HTML5 Canvas and exporting crisp WebP/JPEG data URL.
   */
  const processAndOptimizeImage = async (file: File): Promise<string> => {
    // 1. Strict MIME type validation
    if (!file.type || !file.type.startsWith('image/')) {
      throw new Error(
        isBn
          ? 'অনুগ্রহ করে শুধুমাত্র বৈধ ইমেজ ফাইল নির্বাচন করুন (JPG, PNG, WebP, SVG)।'
          : 'Please select a valid image file (JPG, PNG, WebP, SVG).'
      );
    }

    // 2. SVG files handled directly
    if (file.type === 'image/svg+xml') {
      const svgDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = () => reject(new Error('Failed to read SVG file'));
        reader.readAsDataURL(file);
      });

      // Try uploading to Supabase Storage
      try {
        const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filePath = `${Date.now()}-${cleanFileName}`;
        const { data: uploadData, error: uploadErr } = await supabase.storage
          .from('uploads')
          .upload(filePath, file, { cacheControl: '3600', upsert: true, contentType: 'image/svg+xml' });

        if (!uploadErr && uploadData?.path) {
          const { data: pubData } = supabase.storage.from('uploads').getPublicUrl(uploadData.path);
          if (pubData?.publicUrl) return pubData.publicUrl;
        }
      } catch (_) {}

      return svgDataUrl;
    }

    // 3. Client-side Canvas optimization (downsamples large phone/camera shots to max 1920px)
    const { blob, dataUrl } = await new Promise<{ blob: Blob; dataUrl: string }>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const maxDimension = 1920;
          let width = img.width;
          let height = img.height;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve({ blob: file, dataUrl: event.target?.result as string });
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Try WebP first for optimal compression
          canvas.toBlob(
            (b) => {
              if (b) {
                const finalDataUrl = canvas.toDataURL('image/webp', 0.88);
                resolve({ blob: b, dataUrl: finalDataUrl });
              } else {
                // Fallback to JPEG
                canvas.toBlob(
                  (jb) => {
                    const finalJpeg = canvas.toDataURL('image/jpeg', 0.88);
                    resolve({ blob: jb || file, dataUrl: finalJpeg });
                  },
                  'image/jpeg',
                  0.88
                );
              }
            },
            'image/webp',
            0.88
          );
        };
        img.onerror = () => {
          resolve({ blob: file, dataUrl: event.target?.result as string });
        };
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });

    // 4. Upload optimized blob to Supabase Storage 'uploads' bucket
    try {
      const ext = blob.type === 'image/webp' ? 'webp' : (file.name.split('.').pop() || 'jpg');
      const cleanFileName = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from('uploads')
        .upload(cleanFileName, blob, {
          cacheControl: '3600',
          upsert: true,
          contentType: blob.type || 'image/jpeg',
        });

      if (!uploadErr && uploadData?.path) {
        const { data: pubData } = supabase.storage.from('uploads').getPublicUrl(uploadData.path);
        if (pubData?.publicUrl) {
          return pubData.publicUrl;
        }
      }
    } catch (_) {
      // Storage bucket not configured yet or offline, proceed with optimized DataURL
    }

    return dataUrl;
  };

  // Handle local device file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      alert(isBn ? 'ছবির সাইজ সর্বোচ্চ ১৫ মেগাবাইট হতে পারবে।' : 'Image size must be less than 15MB.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setIsUploading(true);
    try {
      const optimizedUrl = await processAndOptimizeImage(file);
      onChange(optimizedUrl);

      // Save to gallery for reuse (kept to latest 12 items to prevent localStorage exhaustion)
      const newItem = { name: file.name, url: optimizedUrl };
      const updated = [newItem, ...customUploads.filter((u) => u.name !== file.name)].slice(0, 12);
      setCustomUploads(updated);

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('custom_media_uploads', JSON.stringify(updated));
        } catch (_) {
          // Gracefully suppress storage quota error
        }
      }
    } catch (err: any) {
      console.error('Image upload error:', err);
      alert(err.message || (isBn ? 'ছবি প্রসেস করতে সমস্যা হয়েছে!' : 'Failed to process image!'));
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Combine default assets with user custom uploads
  const allGalleryItems: MediaAsset[] = [
    ...customUploads.map((c) => ({
      name: c.name,
      category: 'custom' as const,
      path: c.url,
      description: isBn ? 'আপনার ডিভাইস থেকে আপলোডকৃত ছবি' : 'Uploaded from your local device'
    })),
    ...defaultMediaAssets
  ];

  // Filter gallery items
  const filteredGallery = allGalleryItems.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchCat;
    return (
      matchCat &&
      (item.name.toLowerCase().includes(query) ||
        item.path.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)))
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
        {helperText && <span className="text-[10px] text-muted">{helperText}</span>}
      </div>

      {/* Input Group with Live Preview Box */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-white/80 p-3 rounded-2xl border border-panel-border shadow-xs">
        {/* Thumbnail Preview Box */}
        <div className="relative w-24 h-20 sm:w-28 sm:h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center group shadow-xs">
          {value ? (
            <>
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1.5 rounded-lg bg-white/90 text-ink hover:bg-white text-xs font-bold shadow-md cursor-pointer transition-transform hover:scale-110"
                  title={isBn ? 'ছবি পরিবর্তন করুন' : 'Change Image'}
                >
                  <Upload className="w-3.5 h-3.5 text-accent" />
                </button>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="p-1.5 rounded-lg bg-red-600/90 text-white hover:bg-red-600 text-xs font-bold shadow-md cursor-pointer transition-transform hover:scale-110"
                  title={isBn ? 'ছবি ক্লিয়ার করুন' : 'Clear Image'}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-muted p-2 text-center">
              <ImageIcon className="w-6 h-6 stroke-1 text-slate-400" />
              <span className="text-[10px] mt-1 text-slate-400 font-medium">
                {isBn ? 'ছবি নেই' : 'No Image'}
              </span>
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-white/85 backdrop-blur-xs flex flex-col items-center justify-center gap-1 z-20">
              <Loader2 className="w-5 h-5 text-accent animate-spin" />
              <span className="text-[9px] font-bold text-accent">
                {isBn ? 'আপলোড হচ্ছে...' : 'Uploading...'}
              </span>
            </div>
          )}
        </div>

        {/* Input Field & Buttons */}
        <div className="flex-1 flex flex-col gap-2 w-full">
          {/* Path/URL Input */}
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-3 pr-8 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-xs"
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 cursor-pointer p-0.5"
                title={isBn ? 'ক্লিয়ার করুন' : 'Clear input'}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 1. Local Device File Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent text-white hover:bg-ink font-semibold text-[11px] transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isUploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              <span>{isBn ? 'ডিভাইস থেকে ছবি আপলোড' : 'Upload From Device'}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/svg+xml, image/avif"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* 2. Gallery Modal Trigger Button */}
            <button
              type="button"
              onClick={() => setIsGalleryOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-panel-border text-ink hover:bg-slate-50 font-semibold text-[11px] transition-all cursor-pointer shadow-xs"
            >
              <FolderOpen className="w-3.5 h-3.5 text-accent" />
              <span>{isBn ? 'গ্যালারি থেকে পছন্দ' : 'Select From Gallery'}</span>
            </button>

            {/* 3. Revert to Default Button (if defaultFallback provided) */}
            {defaultFallback && value !== defaultFallback && (
              <button
                type="button"
                onClick={() => onChange(defaultFallback)}
                className="inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-ink px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 cursor-pointer font-medium transition-colors"
                title={isBn ? 'ডিফল্ট ছবিতে ফিরিয়ে নিন' : 'Revert to default image'}
              >
                <RotateCcw className="w-3 h-3 text-slate-500" />
                <span>{isBn ? 'ডিফল্ট ছবি' : 'Reset Default'}</span>
              </button>
            )}

            {/* 4. Clear Button */}
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="inline-flex items-center gap-1 text-[11px] text-red-500 hover:text-red-700 px-2.5 py-1.5 rounded-xl hover:bg-red-50 cursor-pointer font-medium transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>{isBn ? 'ছবি মুছুন' : 'Remove'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MEDIA GALLERY MODAL */}
      {/* ========================================================================= */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-white/20 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-line flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-accent/15 flex items-center justify-center text-accent shadow-xs">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-ink">
                    {isBn ? 'ওয়েবসাইট মিডিয়া লাইব্রেরি ও গ্যালারি' : 'Website Media Library & Gallery'}
                  </h3>
                  <p className="text-xs text-muted">
                    {isBn
                      ? 'হোমপেজ, ব্যানার, ডক্টর পোর্ট্রেট, সিম্পটম ও ডিজিজের প্রি-সেট বা আপলোডকৃত ছবি পছন্দ করুন।'
                      : 'Select from official doctor portraits, homepage banners, symptoms, and condition photos.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Categories & Search Bar */}
            <div className="p-4 border-b border-line bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5">
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
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
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
                          <span
                            className="text-xs font-bold text-ink truncate group-hover:text-accent transition-colors"
                            title={item.name}
                          >
                            {item.name}
                          </span>
                          <span
                            className="text-[10px] text-muted truncate mt-0.5 font-mono"
                            title={item.path}
                          >
                            {item.path.startsWith('data:') ? 'Base64 Local Image' : item.path}
                          </span>
                        </div>

                        {/* Click to Select hover banner */}
                        <div className="mt-2 pt-2 border-t border-line/60 flex items-center justify-between text-[11px] font-bold text-accent">
                          <span>
                            {isSelected
                              ? isBn
                                ? 'নির্বাচিত'
                                : 'Selected'
                              : isBn
                              ? 'সিলেক্ট করুন'
                              : 'Click to Select'}
                          </span>
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
                {isBn
                  ? `মোট ${filteredGallery.length}টি ইমেজ প্রদর্শিত হচ্ছে`
                  : `Showing ${filteredGallery.length} images`}
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
