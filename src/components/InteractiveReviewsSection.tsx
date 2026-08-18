'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GlassPanel } from '@/components/GlassPanel';
import { 
  Quote, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  CheckCircle2, 
  Star, 
  BookOpen, 
  X,
  Volume2,
  VolumeX,
  Layers,
  Activity
} from 'lucide-react';

export interface Review {
  id?: string;
  reviewer_name_en: string;
  reviewer_name_bn: string;
  reviewer_title_en: string;
  reviewer_title_bn: string;
  review_text_en: string;
  review_text_bn: string;
  initials: string;
}

interface InteractiveReviewsProps {
  reviews: Review[];
  language: 'bn' | 'en';
}

export function InteractiveReviewsSection({ reviews, language }: InteractiveReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [showAllModal, setShowAllModal] = useState(false);

  // 3D Card tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const totalReviews = reviews.length > 0 ? reviews.length : 1;
  const currentReview = reviews[currentIndex] || reviews[0];

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimKey(prev => prev + 1);

    setCurrentIndex(prev => (prev + 1) % totalReviews);
    setProgress(0);

    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  }, [isAnimating, totalReviews]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimKey(prev => prev + 1);

    setCurrentIndex(prev => (prev - 1 + totalReviews) % totalReviews);
    setProgress(0);

    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  }, [isAnimating, totalReviews]);

  const handleSelect = (index: number) => {
    if (index === currentIndex || isAnimating) return;
    setIsAnimating(true);
    setAnimKey(prev => prev + 1);
    setCurrentIndex(index);
    setProgress(0);

    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  // Auto-play timer with smooth progress bar
  useEffect(() => {
    if (!isAutoPlay) return;

    const intervalTime = 6000; // 6 seconds per card
    const stepTime = 60; // update progress every 60ms
    const stepIncrement = (stepTime / intervalTime) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + stepIncrement;
      });
    }, stepTime);

    return () => clearInterval(timer);
  }, [isAutoPlay, handleNext]);

  // Handle 3D mouse tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 8, // rotateX
      y: (x / (rect.width / 2)) * 8,   // rotateY
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden" id="patient-reviews">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-accent animate-spin text-xs" style={{ animationDuration: '6s' }} />
            <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
              {language === 'bn' ? 'রোগীদের আস্থা ও সুস্থতার গল্প' : 'Patient Reviews & Trust'}
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink leading-tight">
            {language === 'bn' ? 'রোগীদের সুস্থতা ও আস্থার বাস্তব গল্প' : 'Stories of Recovery & Patient Trust'}
          </h2>

          <p className="text-xs md:text-sm text-muted max-w-lg leading-relaxed">
            {language === 'bn' 
              ? 'সুস্থ হয়ে ওঠা রোগীদের অভিজ্ঞতা ও ডাক্তারের সুনির্দিষ্ট চিকিৎসার প্রতি তাদের গভীর আস্থার মুহূর্তগুলো দেখুন।' 
              : 'Witness verified moments of recovery and deep clinical trust shared by our healed patients.'}
          </p>
        </div>

        {/* Review Card Showcase (Centered & Clean) */}
        <div 
          className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Ambient Floating Particle Accents Behind Card */}
          <div className="absolute -top-4 -left-4 pointer-events-none z-0">
            <Sparkles className="w-5 h-5 text-accent/25 animate-pulse" />
          </div>
          <div className="absolute -bottom-3 -right-4 pointer-events-none z-0">
            <Sparkles className="w-5 h-5 text-emerald-500/25 animate-spin" style={{ animationDuration: '8s' }} />
          </div>

          {/* Flying Active Card */}
          <div 
            key={animKey}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="w-full animate-fly-in-card z-10"
          >
            <GlassPanel className="p-7 md:p-9 rounded-3xl relative overflow-hidden border border-white/70 shadow-2xl bg-white/75 backdrop-blur-2xl transition-all duration-300 hover:shadow-accent/15 hover:border-accent/30 group">
              {/* Ambient Card Backlight */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-accent/15 to-emerald-400/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />

              {/* Top Row: Stars & Verified Badge */}
              <div className="flex justify-between items-center mb-5 flex-wrap gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-sm" />
                  ))}
                  <span className="text-xs font-bold text-muted ml-2 font-mono">5.0</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-[11px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'bn' ? 'যাচাইকৃত রোগী' : 'Verified Patient'}</span>
                </div>
              </div>

              {/* Review Text Body */}
              <div className="relative py-2 min-h-[110px] flex items-center">
                <Quote className="w-9 h-9 text-accent/15 absolute -top-1 -left-2 pointer-events-none" />
                <p className="text-sm md:text-base text-ink font-serif italic leading-relaxed z-10 pl-3">
                  "{language === 'bn' 
                    ? (currentReview?.review_text_bn || currentReview?.review_text_en)
                    : (currentReview?.review_text_en || currentReview?.review_text_bn)}"
                </p>
              </div>

              {/* Patient Profile Row */}
              <div className="flex items-center justify-between border-t border-line/80 pt-4 mt-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-accent to-emerald-400 text-white flex items-center justify-center text-sm font-bold shadow-md shadow-accent/20 border border-white/50">
                    {currentReview?.initials || 'PT'}
                  </div>

                  <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-ink">
                      {language === 'bn' ? currentReview?.reviewer_name_bn : currentReview?.reviewer_name_en}
                    </h4>
                    <span className="text-xs text-muted flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {language === 'bn' ? currentReview?.reviewer_title_bn : currentReview?.reviewer_title_en}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-muted font-mono bg-slate-100/80 px-2.5 py-1 rounded-lg border border-slate-200">
                  {currentIndex + 1} / {totalReviews}
                </div>
              </div>
            </GlassPanel>
          </div>

          {/* Interactive Flow Controls */}
          <div className="flex items-center justify-between w-full mt-6 gap-3 flex-wrap">
            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 rounded-2xl bg-white/80 hover:bg-white border border-slate-200 hover:border-accent text-ink hover:text-accent flex items-center justify-center shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
                title="Previous Story"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded-2xl bg-accent hover:bg-ink text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                title="Next Story"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Dots Indicator */}
            <div className="flex items-center gap-1.5">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex 
                      ? 'w-6 bg-accent' 
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={`Review ${idx + 1}`}
                />
              ))}
            </div>

            {/* Auto-Play Toggle & View All Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  isAutoPlay 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                    : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}
                title={isAutoPlay ? 'Pause auto-play' : 'Start auto-play'}
              >
                {isAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span className="text-[10px]">
                  {isAutoPlay ? (language === 'bn' ? 'অটোপ্লে' : 'Auto') : (language === 'bn' ? 'থামানো' : 'Paused')}
                </span>
              </button>

              {/* View All Stories Button */}
              <button
                type="button"
                onClick={() => setShowAllModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white border border-slate-200 text-ink text-xs font-semibold transition-all cursor-pointer shadow-sm hover:shadow"
                title="View All Reviews"
              >
                <Layers className="w-3 h-3 text-accent" />
                <span className="text-[10px]">{language === 'bn' ? 'সকল রিভিউ' : 'View All'}</span>
              </button>
            </div>
          </div>

          {/* Auto-play sleek timer line */}
          {isAutoPlay && (
            <div className="w-full h-1 bg-slate-200/60 rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent to-emerald-400 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

      </div>

      {/* MODAL: View All Stories Grid */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[85vh] bg-background/95 rounded-3xl border border-white/50 shadow-2xl p-6 md:p-8 flex flex-col gap-6 overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-line pb-4">
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-ink flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <span>{language === 'bn' ? 'সকল রোগীর আরোগ্যের গল্প' : 'All Patient Recovery Stories'}</span>
                </h3>
                <p className="text-xs text-muted mt-1">
                  {language === 'bn' 
                    ? `মোট ${reviews.length} টি প্রশংসাপত্র ও রিভিউ সংরক্ষিত রয়েছে` 
                    : `Total ${reviews.length} verified reviews and testimonials`}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAllModal(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-ink flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-1 custom-scrollbar max-h-[60vh]">
              {reviews.map((r, i) => (
                <GlassPanel key={r.id || i} className="p-5 rounded-2xl flex flex-col justify-between gap-3 border border-white/60 bg-white/70">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                      #{i + 1}
                    </span>
                  </div>

                  <p className="text-xs text-ink/80 italic font-serif leading-relaxed">
                    "{language === 'bn' ? r.review_text_bn : r.review_text_en}"
                  </p>

                  <div className="flex items-center gap-2.5 border-t border-line/60 pt-2.5 mt-1">
                    <div className="w-8 h-8 rounded-xl bg-accent text-white flex items-center justify-center text-xs font-bold shadow-sm">
                      {r.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-ink">
                        {language === 'bn' ? r.reviewer_name_bn : r.reviewer_name_en}
                      </span>
                      <span className="text-[10px] text-muted">
                        {language === 'bn' ? r.reviewer_title_bn : r.reviewer_title_en}
                      </span>
                    </div>
                  </div>
                </GlassPanel>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-line pt-3">
              <button
                type="button"
                onClick={() => setShowAllModal(false)}
                className="px-5 py-2 rounded-xl bg-accent text-white font-semibold text-xs shadow-md hover:bg-ink transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
