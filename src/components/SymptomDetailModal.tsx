'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { symptomsList } from './SymptomCheckerSection';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Activity,
  Thermometer,
  Zap,
  Sparkles,
  Brain,
  Clock,
  HeartPulse,
  ShieldAlert,
  AlertCircle,
  Flame,
  Wind,
  Stethoscope,
  Droplets,
} from 'lucide-react';

export const SYMPTOM_ICON_MAP: Record<string, React.ElementType> = {
  'fever': Thermometer,
  'low-back-pain': Activity,
  'knee-pain': Zap,
  'fatigue': Sparkles,
  'headache': Brain,
  'restlessness': Clock,
  'palpitation': HeartPulse,
  'anxiety': ShieldAlert,
  'upper-abdominal-discomfort': AlertCircle,
  'epigastric-pain': Flame,
  'cough': Wind,
  'exertional-breathlessness': Stethoscope,
  'chest-pain': HeartPulse,
  'dysuria': Droplets,
};

export interface GenericSymptom {
  id?: number | string;
  slug: string;
  titleBn?: string;
  titleEn?: string;
  bn?: string;
  en?: string;
  categoryBn?: string;
  categoryEn?: string;
  organBn?: string;
  organEn?: string;
  noteBn?: string;
  noteEn?: string;
  shortDescBn?: string;
  shortDescEn?: string;
  image?: string;
  icon?: React.ElementType;
}

interface SymptomDetailModalProps {
  symptom: GenericSymptom | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  currentIndex?: number;
  totalCount?: number;
  phone?: string;
  whatsappNumber?: string;
}

export const SymptomDetailModal: React.FC<SymptomDetailModalProps> = ({
  symptom,
  isOpen,
  onClose,
  onNext,
  onPrev,
  currentIndex = 1,
  totalCount = 14,
  phone = '01346-132486',
  whatsappNumber = '8801346132486',
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !symptom) return null;

  const IconComponent =
    symptom.icon ||
    SYMPTOM_ICON_MAP[symptom.slug] ||
    Activity;

  const title = isBn
    ? (symptom.titleBn || symptom.bn || '')
    : (symptom.titleEn || symptom.en || '');

  const category = isBn
    ? (symptom.categoryBn || 'সাধারণ মেডিসিন')
    : (symptom.categoryEn || 'General Medicine');

  const organ = isBn
    ? (symptom.organBn || 'রোগ প্রতিরোধ ব্যবস্থা')
    : (symptom.organEn || 'Immune System');

  const staticMatch = symptomsList.find((s) => s.slug === symptom.slug);
  const note = isBn
    ? (staticMatch?.noteBn || (symptom.shortDescBn && symptom.shortDescBn.length < 250 ? symptom.shortDescBn : '') || (symptom.noteBn && symptom.noteBn.length < 250 ? symptom.noteBn : '') || '')
    : (staticMatch?.noteEn || (symptom.shortDescEn && symptom.shortDescEn.length < 250 ? symptom.shortDescEn : '') || (symptom.noteEn && symptom.noteEn.length < 250 ? symptom.noteEn : '') || '');

  const imageSrc = symptom.image || `/symptoms/${symptom.slug}.png`;
  const displayId = typeof symptom.id === 'number' ? symptom.id : currentIndex;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/75 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl bg-slate-900 border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col justify-between animate-in zoom-in-95 duration-300"
      >
        {/* Background Symptom Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover object-center filter brightness-[0.92] scale-100 transition-all duration-700"
          />
          {/* Subtle gradient vignette to guarantee text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />
        </div>

        {/* Top Control Bar with Close and Pagination Badges */}
        <div className="relative z-20 flex items-center justify-between p-4 sm:p-6 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/70 border border-white/25 backdrop-blur-md text-white text-xs font-semibold shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{isBn ? `লক্ষণ তালিকা (${displayId} / ${totalCount})` : `Symptom List (${displayId} / ${totalCount})`}</span>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white border border-white/25 hover:border-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:rotate-90 duration-300"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Middle Navigation Arrows */}
        {onPrev && (
          <button
            onClick={onPrev}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/85 hover:bg-white text-slate-800 shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border border-white/40"
            aria-label="Previous symptom"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {onNext && (
          <button
            onClick={onNext}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/85 hover:bg-white text-slate-800 shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border border-white/40"
            aria-label="Next symptom"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Symptom Info Glass Card (Overlaying Image as in the screenshot) */}
        <div className="relative z-10 px-4 sm:px-12 md:px-14 py-4 max-w-2xl">
          <div className="bg-white/92 hover:bg-white backdrop-blur-md p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-white shadow-xl flex flex-col gap-3 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-teal-500/15 border border-teal-500/25 text-teal-700 flex items-center justify-center shrink-0 shadow-xs">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] sm:text-xs font-bold text-teal-700 uppercase tracking-wider">
                    {category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                    {title}
                  </h3>
                </div>
              </div>
            </div>

            {note && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {note}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/80">
              <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>{isBn ? 'আক্রান্ত অঙ্গ:' : 'Organ:'}</strong> {organ}
                </span>
              </div>

              <Link
                href={`/symptoms/${symptom.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#205A4D] hover:bg-[#163f36] text-white text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{isBn ? 'বিস্তারিত জানুন' : 'Learn More'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Consultation & Serial Hotline Bar (as in screenshot) */}
        <div className="relative z-10 p-3 sm:p-5 m-3 sm:m-6 rounded-2xl bg-white/95 backdrop-blur-md border border-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0 hidden sm:inline-block"></span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {isBn ? 'সরাসরি ডাক্তারের পরামর্শ ও সিরিয়াল' : 'Direct Doctor Consultation & Serial'}
              </h4>
              <p className="text-[11px] text-slate-500">
                {isBn ? 'পপুলার মেডিকেল সেন্টার (রুম ৬০৫), কাজলশাহ, সিলেট।' : 'Popular Medical Center (Room 605), Kazalshah, Sylhet.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center sm:justify-end">
            <a
              href={`tel:+${phone.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-all border border-slate-300/80 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-teal-700" />
              <span>{phone}</span>
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#205A4D] hover:bg-[#163f36] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isBn ? 'সিরিয়াল বুকিং' : 'Book Serial'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
