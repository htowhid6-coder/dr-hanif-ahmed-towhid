'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { GlassPanel } from '@/components/GlassPanel';
import {
  Image as ImageIcon,
  Upload,
  Copy,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Trash2,
  RefreshCw,
  FolderOpen
} from 'lucide-react';

interface MediaItem {
  name: string;
  category: string;
  path: string;
  description: string;
}

export const MediaManager: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customUploads, setCustomUploads] = useState<{ name: string; url: string }[]>(() => {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('custom_media_uploads');
      if (local) {
        try {
          return JSON.parse(local);
        } catch (e) {}
      }
    }
    return [];
  });

  const mediaLibrary: MediaItem[] = [
    {
      name: 'Hero Shot (Doctor Portrait)',
      category: 'hero',
      path: '/Hero shot_At dr.hanif towhid.png',
      description: isBn ? 'হোমপেজ হিরো স্লাইডারে প্রদর্শিত ডাক্তারের প্রধান ছবি' : 'Doctor portrait used in hero slider and credentials.'
    },
    {
      name: 'About Page Hero Cover',
      category: 'about',
      path: '/Dr. Hanif_About page hero section image.png',
      description: isBn ? 'About পেজের ফুল-উইডথ কভার ব্যাকগ্রাউন্ড ইমেজ' : 'Full-width top cover banner on About page.'
    },
    {
      name: 'Consultation Room Background',
      category: 'home',
      path: '/doctor-consultation-bg.png',
      description: isBn ? 'হোমপেজে স্পেশালিস্ট পরিচিতি সেকশনের ব্যাকগ্রাউন্ড' : 'Specialist introduction full-width background.'
    },
    {
      name: 'Aesthetic Breaker Banner 2',
      category: 'banners',
      path: '/Section Breaking Aesthetic Image_2.png',
      description: isBn ? 'ক্লিনিক্যাল উৎকর্ষ ও নির্ভুল রোগ নির্ণয় ব্যানার' : 'Clinical excellence & diagnostics parallax banner.'
    },
    {
      name: 'Aesthetic Breaker Banner 3',
      category: 'banners',
      path: '/Section Breaking Aesthetic Image_3.png',
      description: isBn ? 'রোগীসেবা ও চেম্বার পরামর্শ ব্যানার' : 'Patient care & chamber consultation parallax banner.'
    },
    {
      name: 'Ambient Page Background',
      category: 'general',
      path: '/about-bg.jpeg',
      description: isBn ? 'পেজের সূক্ষ্ম ব্যাকগ্রাউন্ড ওয়াটারকালার অ্যাম্বিয়েন্ট ইমেজ' : 'Subtle watercolor ambient background.'
    },
    {
      name: 'Fever & Infectious Symptom',
      category: 'symptoms',
      path: '/symptoms/fever.png',
      description: isBn ? 'জ্বর ও সংক্রামক ব্যাধি আইকন' : 'Fever & infection symptom image.'
    },
    {
      name: 'Low Back Pain Symptom',
      category: 'symptoms',
      path: '/symptoms/low-back-pain.png',
      description: isBn ? 'কোমর ব্যথা ও বাতের ব্যথা আইকন' : 'Low back pain symptom image.'
    },
    {
      name: 'Knee & Joint Pain Symptom',
      category: 'symptoms',
      path: '/symptoms/knee-pain.png',
      description: isBn ? 'হাঁটু ও জয়েন্টের ব্যথা আইকন' : 'Knee & joint pain symptom image.'
    },
    {
      name: 'Fatigue & Exhaustion',
      category: 'symptoms',
      path: '/symptoms/fatigue.png',
      description: isBn ? 'ক্লান্তি ও দুর্বলতা আইকন' : 'Fatigue symptom image.'
    },
    {
      name: 'Headache & Migraine',
      category: 'symptoms',
      path: '/symptoms/headache.png',
      description: isBn ? 'মাথাব্যথা ও মাইগ্রেন আইকন' : 'Headache symptom image.'
    },
    {
      name: 'Chest Pain / Angina',
      category: 'symptoms',
      path: '/symptoms/chest-pain.png',
      description: isBn ? 'বুকে ব্যথা ও হার্ট ব্যাধি আইকন' : 'Chest pain symptom image.'
    },
    {
      name: 'Dysuria / Burning Sensation',
      category: 'symptoms',
      path: '/symptoms/dysuria.png',
      description: isBn ? 'প্রস্রাবে জ্বালাপোড়া আইকন' : 'Dysuria symptom image.'
    },
    {
      name: 'Diabetes Care Blog Thumbnail',
      category: 'blogs',
      path: '/blogs/diabetes_care_guide.jpg',
      description: isBn ? 'ডায়াবেটিস আর্টিকেলের থাম্বনেইল' : 'Diabetes blog article thumbnail.'
    }
  ];

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newItem = {
        name: file.name,
        url: dataUrl
      };
      const updated = [newItem, ...customUploads];
      setCustomUploads(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('custom_media_uploads', JSON.stringify(updated));
      }
      alert(isBn ? 'ইমেজ আপলোড সফল হয়েছে!' : 'Image uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteUpload = (index: number) => {
    const updated = customUploads.filter((_, idx) => idx !== index);
    setCustomUploads(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('custom_media_uploads', JSON.stringify(updated));
    }
  };

  const filteredMedia = mediaLibrary.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 p-5 rounded-2xl border border-panel-border shadow-sm">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider">
            <FolderOpen className="w-3.5 h-3.5" />
            {isBn ? 'মিডিয়া ও ইমেজ অ্যাসেট গ্যালারি' : 'Media & Image Assets Library'}
          </span>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-ink mt-0.5">
            {isBn ? 'ওয়েবসাইটের সকল ছবি ও ব্যানার ম্যানেজমেন্ট' : 'Manage Site Images, Banners & Thumbnails'}
          </h2>
          <p className="text-xs text-muted mt-1">
            {isBn
              ? 'ওয়েবসাইটে ব্যবহৃত প্রতিটি ছবি প্রিভিউ করুন, লিঙ্ক কপি করুন অথবা নতুন ছবি আপলোড করে যেকোনো সেকশনে ব্যবহার করুন।'
              : 'Browse built-in assets, copy paths with one click, or upload local images.'}
          </p>
        </div>

        {/* Upload Button */}
        <label className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-accent hover:bg-ink text-white shadow-md hover:shadow-lg transition-all cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>{isBn ? 'নতুন ছবি আপলোড করুন' : 'Upload Image'}</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line pb-2">
        {[
          { id: 'all', label: isBn ? 'সকল ছবি' : 'All Media' },
          { id: 'hero', label: isBn ? 'হিরো শটস' : 'Hero Shots' },
          { id: 'about', label: isBn ? 'About পেজ' : 'About Page' },
          { id: 'banners', label: isBn ? 'ব্রেকার ব্যানার্স' : 'Aesthetic Banners' },
          { id: 'symptoms', label: isBn ? 'লক্ষণ আইকন' : 'Symptoms' },
          { id: 'blogs', label: isBn ? 'ব্লগ থাম্বনেইল' : 'Blogs' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat.id ? 'bg-accent text-white shadow-xs' : 'bg-white/60 text-muted hover:bg-white hover:text-ink'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Custom Uploads Section */}
      {customUploads.length > 0 && (
        <GlassPanel className="p-5 flex flex-col gap-4">
          <h3 className="font-serif text-sm font-bold text-ink flex items-center gap-2">
            <Upload className="w-4 h-4 text-accent" />
            <span>{isBn ? 'আপনার আপলোডকৃত ছবিসমূহ (Recent Uploads)' : 'Custom Uploaded Images'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {customUploads.map((up, idx) => (
              <div key={idx} className="p-3 bg-white rounded-2xl border border-panel-border shadow-xs flex flex-col gap-2">
                <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={up.url} alt={up.name} className="w-full h-full object-cover" />
                </div>

                <span className="text-xs font-semibold text-ink truncate">{up.name}</span>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => handleCopy(up.url)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-accent hover:underline cursor-pointer"
                  >
                    {copiedPath === up.url ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPath === up.url ? (isBn ? 'কপি হয়েছে!' : 'Copied!') : (isBn ? 'URL কপি' : 'Copy URL')}</span>
                  </button>

                  <button
                    onClick={() => handleDeleteUpload(idx)}
                    className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
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

      {/* Standard Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.map((item, idx) => {
          const isCopied = copiedPath === item.path;
          return (
            <div
              key={idx}
              className="p-4 bg-white rounded-2xl border border-panel-border shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3 group"
            >
              <div className="flex flex-col gap-2">
                <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={item.path}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-xs font-bold text-ink truncate">{item.name}</h4>
                  <p className="text-[11px] text-muted line-clamp-2 mt-0.5 leading-relaxed">{item.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-line">
                <span className="text-[10px] font-mono text-muted truncate max-w-[120px]">{item.path}</span>

                <button
                  type="button"
                  onClick={() => handleCopy(item.path)}
                  className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-accent/10 hover:bg-accent hover:text-white text-accent'
                  }`}
                >
                  {isCopied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? (isBn ? 'কপি হয়েছে' : 'Copied!') : (isBn ? 'কপি পাথ' : 'Copy')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
