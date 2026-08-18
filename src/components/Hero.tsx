'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { GlassPanel } from './GlassPanel';
import { MapPin, Clock, Phone, PhoneCall, MessageCircle, Sparkles, ArrowRight, Activity, Droplets, HeartPulse, Dna, Heart, Bean, Thermometer } from 'lucide-react';
import Link from 'next/link';
import { diseaseData, Disease } from '@/locales/diseaseData';

interface SectionStat {
  value: string;
  label: string;
}

interface SectionItem {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: React.ReactNode;
  tags?: string[];
  stats?: SectionStat[];
  cta?: string;
  ctaHref?: string;
  ctaType?: string;
  secondaryCta?: string;
  secondaryCtaHref?: string;
}

interface HeroProps {
  onSelectDisease?: (disease: Disease) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectDisease }) => {
  const { language, t } = useLanguage();
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = sectionRefs.current.indexOf(entry.target as HTMLElement);
          if (idx !== -1) {
            setActiveSection(idx);
            entry.target.classList.add('in-view');
          }
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' });
  };

  const diseaseIconMap: Record<string, React.ReactNode> = {
    'diabetes': <Droplets className="w-4 h-4" />,
    'hypertension': <HeartPulse className="w-4 h-4" />,
    'dyslipidemia': <Dna className="w-4 h-4" />,
    'ischemic-heart-disease': <Heart className="w-4 h-4" />,
    'fatty-liver': <Bean className="w-4 h-4" />,
    'enteric-fever': <Thermometer className="w-4 h-4" />,
  };

  const featuredDiseases = [
    diseaseData.find((d) => d.slug === 'diabetes'),
    diseaseData.find((d) => d.slug === 'hypertension'),
    diseaseData.find((d) => d.slug === 'dyslipidemia'),
    diseaseData.find((d) => d.slug === 'ischemic-heart-disease'),
    diseaseData.find((d) => d.slug === 'fatty-liver'),
    diseaseData.find((d) => d.slug === 'enteric-fever'),
  ].filter(Boolean) as Disease[];

  const sectionsData: SectionItem[] = [
    {
      id: 'welcome',
      eyebrow: t('hero.eyebrow'),
      title: t('hero.title'),
      lead: t('hero.lead'),
      cta: t('hero.cta'),
      ctaHref: 'https://wa.me/8801346132486',
      ctaType: 'whatsapp',
    },
    {
      id: 'doctor-intro',
      eyebrow: t('doctorIntro.eyebrow'),
      title: t('doctorIntro.name'),
      lead: (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden shadow-md border-2 border-white/70 bg-accent/10">
            <img
              src="/doctor-hero.png"
              alt={t('doctorIntro.name')}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col justify-center gap-1.5 text-center sm:text-left">
            <span className="font-bold text-accent text-sm md:text-base tracking-wide">
              {t('doctorIntro.degrees')}
            </span>
            <span className="text-xs md:text-sm text-muted leading-snug">
              {t('doctorIntro.designation')}
            </span>
            <span className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs text-accent font-semibold mt-1">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              {t('chamber.hours')}
            </span>
          </div>
        </div>
      ),
      cta: t('hero.cta'),
      ctaHref: 'https://wa.me/8801346132486',
      ctaType: 'whatsapp',
      secondaryCta: language === 'bn' ? "ডাক্তারের জীবন ও ডিগ্রি" : "Doctor's Journey",
      secondaryCtaHref: '/about',
    },
    {
      id: 'conditions',
      title: language === 'bn' ? 'যেসব রোগের চিকিৎসা দেওয়া হয়' : 'Diseases We Treat',
      lead: (
        <div className="flex flex-col gap-5">
          {/* Animated subtitle with live pulse */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <p className="text-xs md:text-sm text-muted font-medium tracking-wide">
              {language === 'bn'
                ? 'যেকোনো রোগে ক্লিক করে চিকিৎসা পরামর্শ জানুন'
                : 'Tap any condition for instant clinical insights'}
            </p>
          </div>

          {/* Premium Disease Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {featuredDiseases.map((disease, idx) => (
              <button
                key={disease.slug}
                onClick={() => onSelectDisease?.(disease)}
                style={{ animationDelay: `${idx * 80}ms` }}
                className="group relative overflow-hidden p-3 sm:p-3.5 rounded-2xl text-left cursor-pointer transition-all duration-300 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.98] animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both bg-gradient-to-br from-white/80 via-white/60 to-white/40 border border-white/70 hover:border-accent/40 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(47,111,94,0.18)]"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:via-accent/3 group-hover:to-emerald-400/8 transition-all duration-500 rounded-2xl"></div>

                {/* Top accent line */}
                <div className="absolute top-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/60 transition-all duration-500 rounded-full"></div>

                {/* Card content */}
                <div className="relative z-10 flex flex-col gap-2">
                  {/* Icon + arrow */}
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-xl bg-[#317664]/10 text-[#317664] group-hover:bg-[#317664] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                      {diseaseIconMap[disease.slug] || <Activity className="w-4 h-4" />}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent/30 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>

                  {/* Disease name */}
                  <h4 className="text-[11px] sm:text-xs font-bold text-ink leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-2">
                    {disease.title[language]}
                  </h4>

                  {/* Bottom shimmer bar */}
                  <div className="h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-accent via-emerald-400 to-accent/30 rounded-full transition-all duration-500 ease-out"></div>
                </div>
              </button>
            ))}
          </div>

          {/* Bottom stat strip */}
          <div className="flex items-center gap-4 pt-2 border-t border-panel-border">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                {language === 'bn' ? '১৫টি রোগ' : '15 Diseases'}
              </span>
            </div>
            <span className="text-[10px] text-muted">•</span>
            <span className="text-[10px] text-muted font-medium">
              {language === 'bn' ? 'বিস্তারিত তথ্য ও চিকিৎসা' : 'Evidence-based care'}
            </span>
          </div>
        </div>
      ),
      secondaryCta: language === 'bn' ? 'সকল রোগ দেখুন (১৫টি) →' : 'View All 15 Diseases →',
      secondaryCtaHref: '/conditions',
    },
    {
      id: 'chamber',
      eyebrow: t('chamber.eyebrow'),
      title: t('chamber.title'),
      lead: (
        <span className="flex flex-col gap-2 text-sm leading-relaxed text-muted">
          <span className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <span>{t('chamber.address')}</span>
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent shrink-0" />
            <span>{t('chamber.hours')}</span>
          </span>
          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-accent shrink-0" />
            <span>{t('chamber.ticket')}</span>
          </span>
        </span>
      ),
      cta: t('chamber.button'),
      ctaHref: 'https://wa.me/8801346132486',
      ctaType: 'whatsapp',
    },
  ];

  return (
    <div className="relative w-full">
      {/* Sticky Viewport Background Container */}
      <div className="sticky top-0 z-0 w-full h-screen overflow-hidden">
        <picture>
          <source media="(max-width: 760px)" srcSet="/hero-mobile.jpeg" />
          <img
            src="/hero-desktop.jpeg"
            className="w-full h-full object-cover object-center md:object-[78%_58%] animate-floating"
            alt="Medical equipment, blood pressure cuff and diagnostic tools"
          />
        </picture>
        {/* Subtle overlay to enhance contrast */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]"></div>

        {/* Navigation Dot Rail */}
        <nav
          aria-label="Progress Rail"
          className="absolute right-[4vw] top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3.5 p-3 rounded-full glass-panel"
        >
          {sectionsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSection === idx
                  ? 'bg-accent scale-150 shadow-[0_0_8px_rgba(47,111,94,0.5)]'
                  : 'bg-ink/25 hover:bg-ink/50'
              }`}
              aria-label={`Scroll to section ${idx + 1}`}
            />
          ))}
        </nav>
      </div>

      {/* Main Content Layer */}
      <main className="relative z-10 w-full -mt-[100vh]">
        {sectionsData.map((sec, idx) => (
          <section
            key={sec.id}
            ref={(el) => {
              sectionRefs.current[idx] = el;
            }}
            className="min-h-screen w-full flex items-center px-6 md:px-[6vw] relative py-20"
          >
            {/* Scroll Reveal Animation Styles */}
            <div className="w-full max-w-[66%] sm:max-w-[640px] mr-auto opacity-0 translate-y-10 transition-all duration-[1000ms] cubic-bezier(0.22, 0.9, 0.3, 1) [.in-view_&]:opacity-100 [.in-view_&]:translate-y-0">
              <GlassPanel className="flex flex-col gap-6">
                <div>
                  {sec.eyebrow && (
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                      <span className="w-6 h-0.5 bg-accent inline-block"></span>
                      {sec.eyebrow}
                    </span>
                  )}
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-ink">
                    {sec.title}
                  </h2>
                </div>

                {sec.lead && typeof sec.lead === 'string' && (
                  <p className="text-sm md:text-base leading-relaxed text-muted">
                    {sec.lead}
                  </p>
                )}

                {sec.lead && typeof sec.lead !== 'string' && sec.lead}

                {/* Optional Tags list */}
                {sec.tags && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {sec.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-panel-border bg-white/50 text-xs font-medium text-ink shadow-[0_2px_6px_rgba(18,36,31,0.04)]"
                      >
                        <Sparkles className="w-3 h-3 text-accent/80" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Optional Stats rows */}
                {sec.stats && (
                  <div className="grid grid-cols-3 gap-4 mt-2 pt-2 border-t border-line">
                    {sec.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="flex flex-col">
                        <span className="font-serif text-lg md:text-2xl font-bold text-accent">
                          {stat.value}
                        </span>
                        <span className="text-[10px] md:text-xs text-muted uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Call-to-actions */}
                {(sec.cta || sec.secondaryCta) && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {sec.cta && (
                      <a
                        href={sec.ctaHref}
                        target={sec.ctaType === 'whatsapp' ? '_blank' : undefined}
                        rel={sec.ctaType === 'whatsapp' ? 'noopener noreferrer' : undefined}
                        className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs md:text-sm text-white shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer ${
                          sec.ctaType === 'whatsapp'
                            ? 'bg-accent hover:bg-ink'
                            : 'bg-ink hover:bg-accent'
                        }`}
                      >
                        {sec.ctaType === 'whatsapp' ? (
                          <MessageCircle className="w-4 h-4" />
                        ) : (
                          <PhoneCall className="w-4 h-4" />
                        )}
                        <span>{sec.cta}</span>
                      </a>
                    )}

                    {sec.secondaryCta && (
                      <Link
                        href={sec.secondaryCtaHref || '/about'}
                        className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-xl font-semibold text-xs md:text-sm text-ink bg-white/70 hover:bg-white border border-panel-border shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                      >
                        <span>{sec.secondaryCta}</span>
                        <ArrowRight className="w-4 h-4 text-accent" />
                      </Link>
                    )}
                  </div>
                )}
              </GlassPanel>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};
