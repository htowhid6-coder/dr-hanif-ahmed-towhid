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
      title: t('doctorIntro.name'),
      lead: (
        <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 pt-1">
          {/* Doctor Portrait Image: Much Larger, Grand Presence (~42%-44% Width on Desktop) */}
          <div className="relative w-56 sm:w-[42%] md:w-[44%] min-w-[200px] max-w-[280px] aspect-[3.2/4.4] sm:aspect-auto sm:min-h-[290px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white bg-slate-100 group mx-auto sm:mx-0">
            <img
              src="/doctor-hero.png"
              alt={t('doctorIntro.name')}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3">
              <span className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-wider bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-xl block text-center shadow-md border border-white/20">
                {language === 'bn' ? 'মেডিসিন বিশেষজ্ঞ' : 'Medicine Specialist'}
              </span>
            </div>
          </div>

          {/* Doctor Details: Roomy & Elegantly Formatted */}
          <div className="flex-1 flex flex-col justify-start gap-4 text-center sm:text-left py-0.5">
            {/* Specialty Badge + Degrees + Designation */}
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center justify-center sm:justify-start gap-2">
                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs sm:text-sm font-bold tracking-wide">
                  {language === 'bn' ? 'মেডিসিন বিশেষজ্ঞ' : 'Medicine Specialist'}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="font-serif font-bold text-accent text-base sm:text-lg md:text-xl tracking-wide">
                  {t('doctorIntro.degrees')}
                </h3>
                <p className="text-sm sm:text-base text-ink font-semibold leading-snug">
                  {t('doctorIntro.designation')}
                </p>
              </div>
            </div>

            {/* Chamber & Visiting Hours Highlight Box */}
            <div className="flex flex-col gap-1.5 p-3.5 sm:p-4 rounded-2xl bg-white/80 border border-white/90 shadow-xs">
              <div className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm md:text-base text-ink font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                <span>{t('chamber.hours')}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {language === 'bn' 
                  ? 'পপুলার মেডিকেল সেন্টার লিমিটেড (রুম-৬০৫), নিউ মেডিকেল রোড, কাজলশাহ, সিলেট।' 
                  : 'Popular Medical Center Ltd. (Room 605), New Medical Road, Kazalshah, Sylhet.'}
              </p>
            </div>
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
      secondaryCtaHref: '/diseases',
    },
    {
      id: 'chamber',
      eyebrow: t('chamber.eyebrow'),
      title: t('chamber.title'),
      lead: (
        <div className="flex flex-col gap-3.5 pt-1">
          {/* Card 1: Location & Room */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/70 hover:bg-white border border-white/80 hover:border-accent/40 shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-ink group-hover:text-accent transition-colors">
                  {language === 'bn' ? '৬ষ্ঠ তলা, রুম নং-৬০৫' : '6th Floor, Room No-605'}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                  {language === 'bn' ? 'প্রধান চেম্বার' : 'Main Chamber'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-muted leading-relaxed">
                {language === 'bn' ? 'নিউ মেডিকেল রোড, কাজলশাহ, সিলেট।' : 'New Medical Road, Kazalshah, Sylhet.'}
              </p>
            </div>
          </div>

          {/* Card 2: Visiting Hours */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/70 hover:bg-white border border-white/80 hover:border-emerald-400/40 shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-ink">
                  {language === 'bn' ? 'প্রতিদিন বিকাল ৫:০০টা – রাত ৯:০০টা' : '5:00 PM – 9:00 PM (Daily)'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-rose-600 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                {language === 'bn' ? 'শুক্রবার চেম্বার বন্ধ থাকে' : 'Friday Closed'}
              </p>
            </div>
          </div>

          {/* Card 3: Hotline & Ticket Booking */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-teal-50/70 via-white to-emerald-50/70 hover:from-teal-50 hover:to-emerald-50 border border-teal-200/70 hover:border-accent shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-teal-600/10 text-teal-700 group-hover:bg-teal-700 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <a
                  href="tel:01346132486"
                  className="text-xs sm:text-sm font-mono font-bold text-accent hover:text-ink transition-colors cursor-pointer"
                >
                  01346-132486
                </a>
                <span className="text-[10px] font-bold text-teal-800 bg-teal-100/80 px-2 py-0.5 rounded-md">
                  {language === 'bn' ? 'সিরিয়াল হটলাইন' : 'Serial Hotline'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-muted">
                {language === 'bn' ? 'সকাল ৯:০০টার পর কল করে সিরিয়াল বুকিং নিশ্চিত করুন' : 'Call after 9:00 AM to confirm your appointment serial'}
              </p>
            </div>
          </div>
        </div>
      ),
      cta: t('chamber.button'),
      ctaHref: 'https://wa.me/8801346132486',
      ctaType: 'whatsapp',
      secondaryCta: language === 'bn' ? 'সরাসরি কল করুন' : 'Direct Call',
      secondaryCtaHref: 'tel:01346132486',
    },
  ];

  return (
    <div className="relative w-full">
      {/* Sticky Viewport Background Container */}
      <div className="sticky top-0 z-0 w-full h-screen overflow-hidden">
        <picture>
          <source media="(max-width: 760px)" srcSet="/hero-mobile.jpeg" />
          <img
            src="/hero-desktop.png"
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
            className="min-h-screen w-full flex items-center justify-center sm:justify-start px-3 sm:px-6 md:px-[6vw] relative py-12 sm:py-20"
          >
            {/* Scroll Reveal Animation Styles */}
            <div className={`w-full ${sec.id === 'doctor-intro' || sec.id === 'chamber' ? 'max-w-[95vw] sm:max-w-[720px] md:max-w-[740px]' : 'max-w-[95vw] sm:max-w-[640px]'} mx-auto sm:mx-0 sm:mr-auto opacity-0 translate-y-10 transition-all duration-[1000ms] cubic-bezier(0.22, 0.9, 0.3, 1) [.in-view_&]:opacity-100 [.in-view_&]:translate-y-0`}>
              <GlassPanel className="flex flex-col gap-4 sm:gap-6 p-5 sm:p-7 md:p-8">
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
