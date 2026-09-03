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
  Layers, 
  ExternalLink,
  QrCode,
  Copy,
  Check,
  Smartphone,
  MessageSquare
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
  rating?: number;
  google_review_url?: string;
}

export interface GoogleReviewSettings {
  businessUrl?: string;
  qrCodeImage?: string;
  titleEn?: string;
  titleBn?: string;
  subtitleEn?: string;
  subtitleBn?: string;
  buttonTextEn?: string;
  buttonTextBn?: string;
  badgeEn?: string;
  badgeBn?: string;
}

interface InteractiveReviewsProps {
  reviews: Review[];
  language: 'bn' | 'en';
  googleReviewSettings?: GoogleReviewSettings;
}

// Google 4-Color SVG Icon
export const GoogleIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 shrink-0" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
  </svg>
);

export function InteractiveReviewsSection({ reviews, language, googleReviewSettings }: InteractiveReviewsProps) {
  const isBn = language === 'bn';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [showAllModal, setShowAllModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // 3D Card tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const totalReviews = reviews.length > 0 ? reviews.length : 1;
  const currentReview = reviews[currentIndex] || reviews[0];

  // Google review destination link
  const googleReviewUrl = googleReviewSettings?.businessUrl || 'https://maps.google.com/?q=Popular+Medical+Center+Sylhet';
  
  // Scannable QR Image (custom uploaded or instant generated)
  const qrImageSrc = googleReviewSettings?.qrCodeImage?.trim()
    ? googleReviewSettings.qrCodeImage
    : `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(googleReviewUrl)}&margin=12`;

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

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(googleReviewUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
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

  // Compute active rating
  const currentRating = typeof currentReview?.rating === 'number' && !isNaN(currentReview.rating)
    ? currentReview.rating
    : 5;

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden" id="patient-reviews">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-accent animate-spin text-xs" style={{ animationDuration: '6s' }} />
            <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
              {isBn ? 'রোগীদের আস্থা ও সুস্থতার গল্প' : 'Patient Reviews & Trust'}
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink leading-tight">
            {isBn ? 'রোগীদের সুস্থতা ও আস্থার বাস্তব গল্প' : 'Stories of Recovery & Patient Trust'}
          </h2>

          <p className="text-xs md:text-sm text-muted max-w-lg leading-relaxed">
            {isBn 
              ? 'সুস্থ হয়ে ওঠা রোগীদের অভিজ্ঞতা ও ডাক্তারের সুনির্দিষ্ট চিকিৎসার প্রতি তাদের গভীর আস্থার মুহূর্তগুলো দেখুন।' 
              : 'Witness verified moments of recovery and deep clinical trust shared by our healed patients.'}
          </p>

          <a
            href="#leave-google-review"
            className="inline-flex items-center gap-2 mt-1 px-4 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold transition-all shadow-xs cursor-pointer group"
          >
            <GoogleIcon className="w-3.5 h-3.5" />
            <span>{isBn ? 'আপনার রিভিউ দিন (QR Code)' : 'Leave a Google Review (Scan QR)'}</span>
            <span className="text-[10px] text-amber-700 bg-white/80 px-1.5 py-0.2 rounded font-bold ml-1">★ 5.0</span>
          </a>
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

              {/* Top Row: Dynamic Stars, Google Link & Verified Badge */}
              <div className="flex justify-between items-center mb-5 flex-wrap gap-2.5">
                {/* Dynamic Star Rating */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-4 h-4 drop-shadow-xs transition-colors ${
                        star <= currentRating 
                          ? 'text-amber-400 fill-amber-400' 
                          : 'text-slate-300 fill-slate-100'
                      }`} 
                    />
                  ))}
                  <span className="text-xs font-bold text-ink/75 ml-2 font-mono">
                    {currentRating.toFixed(1)}
                  </span>
                </div>

                {/* Right Badges: Google Review Link + Verified Patient */}
                <div className="flex items-center gap-2 flex-wrap">
                  {currentReview?.google_review_url && (
                    <a
                      href={currentReview.google_review_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/90 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[11px] font-semibold transition-all shadow-xs hover:shadow group/glink cursor-pointer"
                      title={isBn ? 'গুগলে দেওয়া রোগীর আসল রিভিউটি দেখুন' : 'View verified review on Google Maps'}
                    >
                      <GoogleIcon className="w-3.5 h-3.5" />
                      <span className="group-hover/glink:underline">
                        {isBn ? 'গুগল রিভিউ দেখুন' : 'Google Review'}
                      </span>
                      <ExternalLink className="w-3 h-3 opacity-70 group-hover/glink:translate-x-0.5 group-hover/glink:-translate-y-0.5 transition-transform" />
                    </a>
                  )}

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-[11px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isBn ? 'যাচাইকৃত রোগী' : 'Verified Patient'}</span>
                  </div>
                </div>
              </div>

              {/* Review Text Body */}
              <div className="relative py-2 min-h-[110px] flex items-center">
                <Quote className="w-9 h-9 text-accent/15 absolute -top-1 -left-2 pointer-events-none" />
                <p className="text-sm md:text-base text-ink font-serif italic leading-relaxed z-10 pl-3">
                  "{isBn 
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
                      {isBn ? currentReview?.reviewer_name_bn : currentReview?.reviewer_name_en}
                    </h4>
                    <span className="text-xs text-muted flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {isBn ? currentReview?.reviewer_title_bn : currentReview?.reviewer_title_en}
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
                  {isAutoPlay ? (isBn ? 'অটোপ্লে' : 'Auto') : (isBn ? 'থামানো' : 'Paused')}
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
                <span className="text-[10px]">{isBn ? 'সকল রিভিউ' : 'View All'}</span>
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

        {/* ---------------------------------------------------- */}
        {/* LEAVE US A GOOGLE REVIEW (QR CODE & ACTION STATION) */}
        {/* ---------------------------------------------------- */}
        <div id="leave-google-review" className="w-full max-w-4xl mx-auto pt-6 scroll-mt-24">
          <div className="relative rounded-3xl p-6 md:p-8 overflow-hidden bg-gradient-to-br from-white/90 via-emerald-50/40 to-teal-50/60 border border-emerald-200/70 shadow-xl backdrop-blur-xl">
            {/* Ambient Background Glows */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-300/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-10">
              
              {/* QR Code Presentation Frame */}
              <div className="flex flex-col items-center shrink-0">
                <div className="relative p-4 bg-white rounded-2xl shadow-lg border-2 border-emerald-100/90 group hover:shadow-xl transition-all duration-300">
                  {/* Subtle Corner Markers */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-accent rounded-tl pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-accent rounded-tr pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-accent rounded-bl pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-accent rounded-br pointer-events-none" />

                  {/* QR Image */}
                  <img
                    src={qrImageSrc}
                    alt="Google Review QR Code"
                    className="w-36 h-36 md:w-44 md:h-44 object-contain rounded-lg transition-transform duration-300 group-hover:scale-102"
                    loading="lazy"
                  />

                  {/* QR center mini logo overlay for aesthetics */}
                  <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center pointer-events-none">
                    <GoogleIcon className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mt-2.5 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
                  <Smartphone className="w-3.5 h-3.5 text-accent animate-bounce" />
                  <span>{isBn ? 'ক্যামেরা দিয়ে স্ক্যান করুন' : 'Scan with Camera'}</span>
                </div>
              </div>

              {/* Callout Information & Actions */}
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-3.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                  <GoogleIcon className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
                    {isBn 
                      ? (googleReviewSettings?.badgeBn || 'আপনার মতামত আমাদের অনুপ্রেরণা') 
                      : (googleReviewSettings?.badgeEn || 'Your Feedback Matters')}
                  </span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink">
                  {isBn 
                    ? (googleReviewSettings?.titleBn || 'গুগলে আপনার আরোগ্য ও চিকিৎসা রিভিউ দিন') 
                    : (googleReviewSettings?.titleEn || 'Leave Us a Google Review')}
                </h3>

                <p className="text-xs md:text-sm text-muted leading-relaxed max-w-xl">
                  {isBn 
                    ? (googleReviewSettings?.subtitleBn || 'ডা. হানিফ আহমেদ তৌহিদের নিকট চিকিৎসা সেবা নিয়ে আপনি কেমন সুস্থ আছেন, আপনার সেই অমূল্য অভিজ্ঞতা গুগলে শেয়ার করে অন্যদের সঠিক চিকিৎসা বেছে নিতে সহায়তা করুন।') 
                    : (googleReviewSettings?.subtitleEn || 'Have you consulted Dr. Hanif Ahmed Towhid? Scan the QR code with your mobile camera or click below to share your experience on Google.')}
                </p>

                {/* Rating Badge Display */}
                <div className="flex items-center gap-2 py-1">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-xs" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-ink/80 font-sans">
                    5.0 Star Rated Care · Verified Patients
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-1.5 w-full">
                  <a
                    href={googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-accent hover:bg-ink text-white font-semibold text-xs md:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <GoogleIcon className="w-4 h-4" />
                    <span>
                      {isBn 
                        ? (googleReviewSettings?.buttonTextBn || 'গুগলে রিভিউ লিখুন') 
                        : (googleReviewSettings?.buttonTextEn || 'Write a Review on Google')}
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white/90 hover:bg-white text-ink border border-slate-300 font-semibold text-xs shadow-xs hover:shadow transition-all cursor-pointer"
                    title={isBn ? 'রিভিউ লিংক কপি করুন' : 'Copy Review Link'}
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-muted" />}
                    <span>{copiedLink ? (isBn ? 'কপি হয়েছে!' : 'Copied!') : (isBn ? 'লিংক কপি করুন' : 'Copy Link')}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
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
                  <span>{isBn ? 'সকল রোগীর আরোগ্যের গল্প' : 'All Patient Recovery Stories'}</span>
                </h3>
                <p className="text-xs text-muted mt-1">
                  {isBn 
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
              {reviews.map((r, i) => {
                const rRating = typeof r.rating === 'number' && !isNaN(r.rating) ? r.rating : 5;
                return (
                  <GlassPanel key={r.id || i} className="p-5 rounded-2xl flex flex-col justify-between gap-3 border border-white/60 bg-white/70">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star 
                            key={s} 
                            className={`w-3.5 h-3.5 ${
                              s <= rRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 fill-slate-100'
                            }`} 
                          />
                        ))}
                        <span className="text-[11px] font-mono font-bold text-ink/75 ml-1">
                          {rRating.toFixed(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {r.google_review_url && (
                          <a
                            href={r.google_review_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
                            title={isBn ? 'গুগলে মূল রিভিউটি দেখুন' : 'View on Google Maps'}
                          >
                            <GoogleIcon className="w-3 h-3" />
                            <span>{isBn ? 'গুগল রিভিউ' : 'Google'}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        <span className="text-[10px] font-mono font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                          #{i + 1}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-ink/80 italic font-serif leading-relaxed">
                      "{isBn ? (r.review_text_bn || r.review_text_en) : (r.review_text_en || r.review_text_bn)}"
                    </p>

                    <div className="flex items-center gap-2.5 border-t border-line/60 pt-2.5 mt-1">
                      <div className="w-8 h-8 rounded-xl bg-accent text-white flex items-center justify-center text-xs font-bold shadow-sm">
                        {r.initials || 'PT'}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-ink">
                          {isBn ? r.reviewer_name_bn : r.reviewer_name_en}
                        </span>
                        <span className="text-[10px] text-muted">
                          {isBn ? r.reviewer_title_bn : r.reviewer_title_en}
                        </span>
                      </div>
                    </div>
                  </GlassPanel>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center border-t border-line pt-3 flex-wrap gap-2">
              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline cursor-pointer"
              >
                <GoogleIcon className="w-3.5 h-3.5" />
                <span>{isBn ? 'আপনিও কি একটি গুগল রিভিউ দিতে চান?' : 'Want to leave your own Google review?'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                type="button"
                onClick={() => setShowAllModal(false)}
                className="px-5 py-2 rounded-xl bg-accent text-white font-semibold text-xs shadow-md hover:bg-ink transition-colors cursor-pointer"
              >
                {isBn ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
