'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Disease } from '@/locales/diseaseData';
import { X, AlertCircle, CheckCircle2, MessageCircle, Phone } from 'lucide-react';

interface DiseaseModalProps {
  disease: Disease | null;
  onClose: () => void;
}

export const DiseaseModal: React.FC<DiseaseModalProps> = ({ disease, onClose }) => {
  const { language, t } = useLanguage();

  useEffect(() => {
    if (disease) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [disease]);

  if (!disease) return null;

  const whatsappMessage = encodeURIComponent(
    language === 'bn'
      ? `আসসালামু আলাইকুম, আমি ডা. হানিফ আহমেদ তৌহিদ স্যারের চেম্বারে "${disease.title.bn}" পরামর্শ/চিকিৎসার জন্য সিরিয়াল বুক করতে চাই।`
      : `Hello, I would like to book a consultation appointment with Dr. Hanif Ahmed Towhid for "${disease.title.en}".`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="glass-panel w-full max-w-2xl p-6 md:p-8 rounded-2xl flex flex-col gap-6 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink/75 hover:text-ink hover:scale-110 transition-all p-2 rounded-full hover:bg-white/40 cursor-pointer z-10"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Disease Image Preview */}
        {disease.image && (
          <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-slate-100 border border-panel-border shadow-inner">
            <img
              src={disease.image}
              alt={disease.title[language]}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        {/* Title */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-1 block">
            {language === 'bn' ? 'রোগের পরিচিতি ও প্রাথমিক তথ্য' : 'Disease Overview & Clinical Summary'}
          </span>
          <h3 className="font-serif text-xl md:text-2xl font-bold text-ink">
            {disease.title[language]}
          </h3>
        </div>

        {/* Short Summary Description */}
        <p className="text-sm md:text-base leading-relaxed text-muted bg-white/40 p-4 rounded-xl border border-panel-border">
          {disease.shortDesc[language]}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 border-t border-line">
          {/* Symptoms */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-ink mb-2">
              {language === 'bn' ? 'প্রধান উপসর্গসমূহ:' : 'Key Symptoms:'}
            </h4>
            <ul className="space-y-1.5">
              {disease.symptoms[language].slice(0, 4).map((sym, sIdx) => (
                <li key={sIdx} className="text-xs text-muted flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-ink mb-2">
              {language === 'bn' ? 'চিকিৎসা পরামর্শ:' : 'Treatment Approach:'}
            </h4>
            <ul className="space-y-1.5">
              {disease.treatments[language].slice(0, 3).map((treat, tIdx) => (
                <li key={tIdx} className="text-xs text-muted flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                  <span>{treat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chamber Info Badge */}
        <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-accent/5 border border-accent/15 text-xs text-muted">
          <span>
            {language === 'bn'
              ? 'চেম্বার: পপুলার মেডিকেল সেন্টার (রুম ৬০৫), কাজলশাহ, সিলেট।'
              : 'Chamber: Popular Medical Center (Room #605), Kazalshah, Sylhet.'}
          </span>
          <span className="font-semibold text-accent shrink-0">
            {language === 'bn' ? 'বিকাল ৫টা - রাত ৯টা' : '5:00 PM - 9:00 PM'}
          </span>
        </div>

        {/* Action buttons with Appointment Booking CTA */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-2 border-t border-line">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-panel-border bg-white/40 hover:bg-white/70 text-ink font-semibold text-xs transition-colors cursor-pointer"
          >
            {t('conditions.close')}
          </button>

          <a
            href="tel:+8801346132486"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-white/90 text-ink font-semibold text-xs border border-line shadow-xs transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-accent" />
            <span>01346-132486</span>
          </a>

          <a
            href={`https://wa.me/8801346132486?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-accent hover:bg-ink text-white font-semibold text-xs text-center shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{language === 'bn' ? 'সিরিয়াল বুক করুন (WhatsApp)' : 'Book Appointment (WhatsApp)'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
