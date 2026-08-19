'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { 
  Stethoscope, 
  HeartHandshake, 
  CheckCircle2, 
  MessageCircle, 
  Quote, 
  Award, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  GraduationCap, 
  Phone, 
  ArrowRight,
  UserCheck,
  Heart,
  Calendar,
  Activity
} from 'lucide-react';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
}

function AnimatedScrollItem({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up' 
}: AnimatedCardProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Continuous bi-directional scroll animation: true on enter, false on leave
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: '-20px 0px -20px 0px',
      }
    );

    const current = elementRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  const getTransformClasses = () => {
    switch (direction) {
      case 'left':
        return isVisible 
          ? 'opacity-100 translate-x-0 blur-0 scale-100' 
          : 'opacity-0 -translate-x-12 blur-[1px] scale-[0.98]';
      case 'right':
        return isVisible 
          ? 'opacity-100 translate-x-0 blur-0 scale-100' 
          : 'opacity-0 translate-x-12 blur-[1px] scale-[0.98]';
      case 'scale':
        return isVisible 
          ? 'opacity-100 scale-100 blur-0 translate-y-0' 
          : 'opacity-0 scale-90 blur-[2px] translate-y-8';
      case 'up':
      default:
        return isVisible 
          ? 'opacity-100 translate-y-0 blur-0 scale-100' 
          : 'opacity-0 translate-y-12 blur-[1px] scale-[0.98]';
    }
  };

  return (
    <div
      ref={elementRef}
      style={{ 
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
        transitionDuration: '650ms'
      }}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] transform ${getTransformClasses()} ${className}`}
    >
      {children}
    </div>
  );
}

// Full-Width Aesthetic Section Breaking Banner with Bi-directional Smooth Scroll Parallax & Ultra-Transparent Watercolor Card
function ScrollAestheticBanner({
  src,
  alt,
  badgeText,
  headingText,
  subText,
}: {
  src: string;
  alt: string;
  badgeText?: string;
  headingText?: string;
  subText?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0.5);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Continuous bi-directional trigger on scroll up & down
        setIsInView(entry.isIntersecting);
      },
      { 
        threshold: 0.15,
        rootMargin: '-30px 0px -30px 0px' 
      }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    const handleScroll = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (el) observer.unobserve(el);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const parallaxOffset = (scrollProgress - 0.5) * 50;

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full overflow-hidden my-8 sm:my-12 md:my-16 border-y border-line/40 shadow-xl"
    >
      <div className="relative w-full min-h-[320px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[540px] overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* 100% Original Image with smooth parallax */}
        <img
          src={src}
          alt={alt}
          style={{
            transform: `translate3d(0, ${parallaxOffset}px, 0) scale(${isInView ? 1.02 : 1.08})`,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="w-full h-[125%] -top-[12.5%] absolute inset-0 object-cover object-center pointer-events-none"
        />

        {/* Floating Ultra-Transparent Watercolor Glass Card with Staggered Scroll Animation */}
        {(badgeText || headingText || subText) && (
          <div className="relative z-10 w-full max-w-3xl mx-auto">
            <div
              className={`p-6 sm:p-8 md:p-11 rounded-3xl bg-white/20 hover:bg-white/25 backdrop-blur-[14px] border border-white/50 shadow-[0_10px_35px_rgba(0,0,0,0.15)] flex flex-col items-center gap-3.5 text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                isInView 
                  ? 'opacity-100 translate-y-0 scale-100 blur-0' 
                  : 'opacity-0 translate-y-12 scale-[0.92] blur-[2px]'
              }`}
            >
              {badgeText && (
                <div 
                  style={{ transitionDelay: isInView ? '120ms' : '0ms' }}
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/75 hover:bg-slate-950/85 border border-white/40 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider shadow-lg transition-all duration-700 transform ${
                    isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-90'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>{badgeText}</span>
                </div>
              )}

              {headingText && (
                <h3 
                  style={{ transitionDelay: isInView ? '220ms' : '0ms' }}
                  className={`font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-950 leading-tight drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)] max-w-2xl transition-all duration-700 transform ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                >
                  {headingText}
                </h3>
              )}

              {subText && (
                <p 
                  style={{ transitionDelay: isInView ? '320ms' : '0ms' }}
                  className={`text-xs sm:text-sm md:text-base text-slate-900/90 font-semibold leading-relaxed drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)] max-w-xl transition-all duration-700 transform ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                >
                  {subText}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function About() {
  const { language, t } = useLanguage();
  const [heroInView, setHeroInView] = useState(false);
  const [activeMilestone, setActiveMilestone] = useState<number | null>(0);

  useEffect(() => {
    setHeroInView(true);
  }, []);

  const milestones = [
    {
      id: 0,
      date: t('aboutPage.milestone_fcps_date'),
      title: t('aboutPage.milestone_fcps_title'),
      desc: t('aboutPage.milestone_fcps_desc'),
      icon: Award,
      badge: language === 'bn' ? 'মেডিসিনে সর্বোচ্চ ডিগ্রি' : 'Fellowship Distinction',
    },
    {
      id: 1,
      date: t('aboutPage.milestone_mcps_date'),
      title: t('aboutPage.milestone_mcps_title'),
      desc: t('aboutPage.milestone_mcps_desc'),
      icon: GraduationCap,
      badge: language === 'bn' ? 'উচ্চতর প্রশিক্ষণ' : 'Specialist Membership',
    },
    {
      id: 2,
      date: t('aboutPage.milestone_bcs_date'),
      title: t('aboutPage.milestone_bcs_title'),
      desc: t('aboutPage.milestone_bcs_desc'),
      icon: ShieldCheck,
      badge: language === 'bn' ? 'সরকারি স্বাস্থ্য ক্যাডার' : 'Govt. Gazetted Officer',
    },
    {
      id: 3,
      date: t('aboutPage.milestone_mbbs_date'),
      title: t('aboutPage.milestone_mbbs_title'),
      desc: t('aboutPage.milestone_mbbs_desc'),
      icon: Building2,
      badge: language === 'bn' ? 'ওসমানী মেডিকেল কলেজ' : 'MBBS Graduation',
    },
  ];

  const quickStats = [
    {
      icon: Award,
      label: language === 'bn' ? 'এফসিপিএস ও এমসিপিএস' : 'FCPS & MCPS',
      sub: language === 'bn' ? 'ইন্টারনাল মেডিসিন ডিগ্রি' : 'Medicine Fellowships',
    },
    {
      icon: ShieldCheck,
      label: language === 'bn' ? '৩৭তম বিসিএস (স্বাস্থ্য)' : '37th BCS (Health)',
      sub: language === 'bn' ? 'সরকারি স্বাস্থ্য কর্মকর্তা' : 'Govt. Health Cadre',
    },
    {
      icon: Building2,
      label: language === 'bn' ? 'সিলেট ওসমানী হাসপাতাল' : 'Sylhet Osmani Hospital',
      sub: language === 'bn' ? 'রেজিস্ট্রার (মেডিসিন)' : 'Registrar in Medicine',
    },
    {
      icon: Heart,
      label: language === 'bn' ? 'রোগীকেন্দ্রিক সেবা' : 'Patient-Centric Care',
      sub: language === 'bn' ? 'আধুনিক ও বৈজ্ঞানিক চিকিৎসা' : 'Evidence-Based Practice',
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col antialiased bg-background text-ink selection:bg-accent/20">
      <Navbar />

      {/* Fixed Ambient Background Layer */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[110px]" />
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[0.5px]"></div>
      </div>

      {/* 1. HERO / COVER BANNER SECTION (Edge-to-Edge Full Screen Width) */}
      <section className="relative z-10 w-full bg-slate-950 border-b border-line overflow-hidden">
        <div className="relative w-full h-[360px] sm:h-[450px] md:h-[540px] lg:h-[600px] bg-slate-900 overflow-hidden">
          <img
            src="/Dr. Hanif_About page hero section image.png"
            alt={language === 'bn' ? 'ডা. হানিফ আহমেদ তৌহিদ - পরিচিতি' : 'Dr. Hanif Ahmed Towhid About Banner'}
            className={`w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
              heroInView ? 'scale-100 brightness-95' : 'scale-105 brightness-90'
            }`}
          />

          {/* Smooth Gradient Overlays for Maximum Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none" />

          {/* Banner Text Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14 max-w-7xl mx-auto pointer-events-none">
            <div className="flex flex-col gap-3 max-w-3xl animate-in fade-in slide-in-from-bottom-5 duration-700 pointer-events-auto">
              {/* Doctor Specialist Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-white/30 backdrop-blur-md w-fit shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                  {language === 'bn' ? 'মেডিসিন বিশেষজ্ঞ · সিলেট' : 'Medicine Specialist · Sylhet'}
                </span>
              </div>

              {/* Title Header */}
              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-xl">
                {language === 'bn'
                  ? 'ডা. হানিফ আহমেদ তৌহিদ'
                  : 'Dr. Hanif Ahmed Towhid'}
              </h1>

              <p className="font-sans text-xs sm:text-sm md:text-base text-emerald-200 font-medium drop-shadow-md">
                {language === 'bn'
                  ? 'MBBS, 37th BCS (Health), MCPS (Medicine), FCPS (Medicine)'
                  : 'MBBS, 37th BCS (Health), MCPS (Medicine), FCPS (Medicine)'}
              </p>

              <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed drop-shadow max-w-2xl hidden sm:block">
                {language === 'bn'
                  ? 'রেজিস্ট্রার (মেডিসিন বিভাগ), সিলেট এম.এ.জি. ওসমানী মেডিকেল কলেজ হাসপাতাল। সঠিক রোগ নির্ণয় ও রোগীর প্রতি পরম আন্তরিক সেবায় অঙ্গীকারবদ্ধ।'
                  : 'Registrar, Department of Medicine at Sylhet MAG Osmani Medical College Hospital. Dedicated to scientifically precise internal medicine care.'}
              </p>

              {/* Quick Action CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://wa.me/8801346132486"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-emerald-500 text-white font-semibold text-xs md:text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer border border-white/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে সিরিয়াল নিন' : 'Book via WhatsApp'}</span>
                </a>
                <a
                  href="#journey"
                  className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-white/15 hover:bg-white/30 text-white font-semibold text-xs md:text-sm backdrop-blur-md transition-all cursor-pointer border border-white/30 hover:-translate-y-0.5"
                >
                  <span>{language === 'bn' ? 'চিকিৎসকের প্রোফাইল পড়ুন' : 'Explore Profile'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AUTOMATIC INFINITE SLIDING STATS MARQUEE */}
      <section className="relative z-20 -mt-7 sm:-mt-8 w-full max-w-7xl mx-auto px-2 sm:px-4 overflow-hidden">
        {/* Ambient edge fade gradients */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]">
          <div className="animate-slide-marquee flex items-center gap-4 py-2 select-none">
            {[...quickStats, ...quickStats, ...quickStats, ...quickStats].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-4 sm:p-5 rounded-2xl border border-panel-border bg-white/85 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:border-accent/50 transition-all duration-300 flex items-center gap-3.5 min-w-[260px] sm:min-w-[290px] shrink-0 cursor-pointer group"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-accent/15 group-hover:bg-accent group-hover:text-white text-accent flex items-center justify-center shrink-0 transition-colors duration-300 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-ink truncate group-hover:text-accent transition-colors">
                      {stat.label}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted truncate mt-0.5">
                      {stat.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT CONTAINER (PART 1: JOURNEY SECTION) */}
      <main className="relative z-10 pt-12 md:pt-16 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto flex flex-col gap-12 w-full">
        
        {/* 1. Intro / Journey Section with Scroll Animation */}
        <AnimatedScrollItem direction="up" delay={50}>
          <section id="journey" className="w-full">
            <GlassPanel className="flex flex-col gap-6 p-6 sm:p-8 md:p-10 border border-panel-border bg-white/70 shadow-lg">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                  <span className="w-6 h-0.5 bg-accent inline-block"></span>
                  <UserCheck className="w-3.5 h-3.5" />
                  {t('aboutPage.eyebrow')}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-ink">
                  {t('aboutPage.title')}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm md:text-base leading-relaxed text-muted pt-4 border-t border-line">
                <AnimatedScrollItem direction="left" delay={120}>
                  <p className="bg-white/40 p-5 rounded-2xl border border-panel-border/80 shadow-sm hover:shadow-md hover:bg-white/60 transition-all leading-relaxed">
                    {t('aboutPage.journey_p1')}
                  </p>
                </AnimatedScrollItem>

                <AnimatedScrollItem direction="right" delay={200}>
                  <p className="bg-white/40 p-5 rounded-2xl border border-panel-border/80 shadow-sm hover:shadow-md hover:bg-white/60 transition-all leading-relaxed">
                    {t('aboutPage.journey_p2')}
                  </p>
                </AnimatedScrollItem>
              </div>
            </GlassPanel>
          </section>
        </AnimatedScrollItem>
      </main>

      {/* 4. SECTION BREAKING AESTHETIC IMAGE 2 (FULL SCREEN WIDTH) */}
      <ScrollAestheticBanner
        src="/Section Breaking Aesthetic Image_2.png"
        alt={language === 'bn' ? 'চিকিৎসা উৎকর্ষ ও ক্লিনিক্যাল সেবা' : 'Clinical Excellence & Medical Diagnostics'}
        badgeText={language === 'bn' ? 'ক্লিনিক্যাল উৎকর্ষ ও নির্ভুল রোগ নির্ণয়' : 'Clinical Excellence & Diagnostics'}
        headingText={language === 'bn' ? 'রোগের মূল কারণ অনুসন্ধান ও বৈজ্ঞানিক চিকিৎসা' : 'Root-Cause Clinical Diagnosis & Compassionate Care'}
        subText={language === 'bn' ? 'সিলেট এম.এ.জি. ওসমানী মেডিকেল কলেজ ও হাসপাতালের চিকিৎসা অভিজ্ঞতায় সমৃদ্ধ।' : 'Decades of specialized hospital care and advanced internal medicine practice in Sylhet.'}
      />

      {/* 5. MAIN CONTENT CONTAINER (PART 2: TIMELINE, EXPERTISE, PHILOSOPHY) */}
      <main className="relative z-10 pb-12 md:pb-16 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto flex flex-col gap-12 w-full">
        
        {/* 2. QUALIFICATIONS TIMELINE (Scroll-Triggered Staggered Animations) */}
        <section className="w-full">
          <GlassPanel className="flex flex-col gap-8 p-6 sm:p-8 md:p-10 border border-panel-border bg-white/70 shadow-lg">
            <AnimatedScrollItem direction="up" delay={50}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-accent/15 flex items-center justify-center text-accent shadow-sm">
                    <Award className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-ink">
                      {t('aboutPage.milestones_title')}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">
                      {t('aboutPage.milestones_lead')}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono font-semibold text-accent bg-accent/10 px-3 py-1.5 rounded-full w-fit">
                  {language === 'bn' ? 'ক্লিক করে হাইলাইট করুন' : 'Click to highlight'}
                </span>
              </div>
            </AnimatedScrollItem>

            {/* Interactive Timeline List with Staggered Scroll Animation */}
            <div className="relative border-l-2 border-accent/30 ml-4 sm:ml-6 space-y-6 pb-2">
              {milestones.map((item, idx) => {
                const ItemIcon = item.icon;
                const isSelected = activeMilestone === item.id;

                return (
                  <AnimatedScrollItem
                    key={item.id}
                    direction="left"
                    delay={idx * 100}
                  >
                    <div
                      onClick={() => setActiveMilestone(item.id)}
                      className="relative pl-7 sm:pl-9 group cursor-pointer"
                    >
                      {/* Animated Timeline Node */}
                      <div
                        className={`absolute -left-[9px] top-4 w-4 h-4 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'bg-accent scale-125 shadow-[0_0_0_5px_rgba(47,111,94,0.25)] ring-2 ring-white'
                            : 'bg-accent/40 border-2 border-white group-hover:bg-accent group-hover:scale-110'
                        }`}
                      />

                      {/* Timeline Item Card */}
                      <div
                        className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                          isSelected
                            ? 'bg-white/95 border-accent/50 shadow-md ring-1 ring-accent/20 translate-x-1.5'
                            : 'bg-white/40 border-panel-border hover:bg-white/70 hover:border-accent/30 hover:translate-x-1'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] sm:text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-2.5 py-0.5 rounded-md">
                            {item.date}
                          </span>
                          <span className="text-[10px] font-semibold text-muted bg-white/60 px-2 py-0.5 rounded-md border border-panel-border">
                            {item.badge}
                          </span>
                        </div>

                        <h4 className="font-serif text-base sm:text-lg font-bold text-ink mb-1 group-hover:text-accent transition-colors flex items-center gap-2">
                          <span>{item.title}</span>
                          <ItemIcon className="w-4 h-4 text-accent/70" />
                        </h4>

                        <p className="text-xs sm:text-sm leading-relaxed text-muted font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </AnimatedScrollItem>
                );
              })}
            </div>
          </GlassPanel>
        </section>

        {/* 3. EXPERTISE & PHILOSOPHY GRID (Scroll Sliding From Left & Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
          {/* Clinical Expertise Card (Slide from Left) */}
          <AnimatedScrollItem direction="left" delay={100} className="h-full">
            <GlassPanel className="h-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-panel-border bg-white/75 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-accent/15 flex items-center justify-center text-accent mb-4 shadow-sm">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink mb-2">
                  {t('aboutPage.expertise_title')}
                </h3>
                <p className="text-xs sm:text-sm text-muted mb-6 leading-relaxed">
                  {t('aboutPage.expertise_lead')}
                </p>
              </div>

              <ul className="space-y-3 pt-4 border-t border-line/60">
                <li className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-ink leading-relaxed p-2.5 rounded-xl bg-accent/5 border border-accent/10 hover:bg-accent/10 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{t('aboutPage.expertise_item1')}</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-ink leading-relaxed p-2.5 rounded-xl bg-accent/5 border border-accent/10 hover:bg-accent/10 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{t('aboutPage.expertise_item2')}</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-ink leading-relaxed p-2.5 rounded-xl bg-accent/5 border border-accent/10 hover:bg-accent/10 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{t('aboutPage.expertise_item3')}</span>
                </li>
              </ul>
            </GlassPanel>
          </AnimatedScrollItem>

          {/* Philosophy Card (Slide from Right) */}
          <AnimatedScrollItem direction="right" delay={180} className="h-full">
            <GlassPanel className="h-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-panel-border bg-white/75 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-accent/15 flex items-center justify-center text-accent mb-4 shadow-sm">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink mb-4">
                  {t('aboutPage.philosophy_title')}
                </h3>
                
                <blockquote className="border-l-4 border-accent pl-4 italic text-xs sm:text-sm leading-relaxed text-muted mb-4 relative bg-accent/5 p-4 rounded-r-2xl border-panel-border shadow-sm">
                  <Quote className="w-5 h-5 text-accent/30 inline-block mr-1.5 -mt-1" />
                  "{t('aboutPage.philosophy_quote')}"
                </blockquote>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-muted pt-4 border-t border-line/60">
                {t('aboutPage.philosophy_p')}
              </p>
            </GlassPanel>
          </AnimatedScrollItem>
        </div>

      </main>

      {/* 6. SECTION BREAKING AESTHETIC IMAGE 3 (FULL SCREEN WIDTH) */}
      <ScrollAestheticBanner
        src="/Section Breaking Aesthetic Image_3.png"
        alt={language === 'bn' ? 'রোগীসেবা ও চেম্বার পরামর্শ' : 'Compassionate Patient Care & Chamber Consultation'}
        badgeText={language === 'bn' ? 'রোগীর প্রতি অকৃত্রিম যত্ন ও আস্থা' : 'Dedicated to Patient Care & Trust'}
        headingText={language === 'bn' ? 'সুস্থ জীবনের পথে আপনার পাশে' : 'Guiding Your Journey to Better Health'}
        subText={language === 'bn' ? 'পপুলার মেডিকেল সেন্টার, সিলেট — আধুনিক পরিবেশে নিয়মিত চেম্বার সেবা।' : 'Popular Medical Center Ltd., Sylhet — Professional consultation and caring environment.'}
      />

      {/* 7. MAIN CONTENT CONTAINER (PART 3: CHAMBER CONSULTATION CTA) */}
      <main className="relative z-10 pb-16 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto flex flex-col gap-12 w-full">
        
        {/* 4. CALL TO ACTION & CHAMBER APPOINTMENT CARD (Scroll Scale Up) */}
        <AnimatedScrollItem direction="scale" delay={100}>
          <section className="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl border border-panel-border bg-gradient-to-r from-accent/15 via-accent/5 to-white/70">
            <div className="text-center md:text-left flex flex-col gap-1.5 max-w-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                {language === 'bn' ? 'চেম্বার অ্যাপয়েন্টমেন্ট' : 'Chamber Consultation'}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                {language === 'bn' ? 'সরাসরি চেম্বারে এসে পরামর্শ নিন' : 'Consult Dr. Hanif in Person'}
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {language === 'bn'
                  ? 'পপুলার মেডিকেল সেন্টার লিমিটেড (৬ষ্ঠ তলা, রুম ৬০৫), কাজলশাহ, সিলেট। রোগী দেখার দিন সকাল ৯টার পর সিরিয়াল নিশ্চিত করুন।'
                  : 'Popular Medical Center Ltd. (6th Floor, Room 605), Kazalshah, Sylhet. Please book serial ticket after 9:00 AM on appointment day.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="tel:+8801346132486"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-ink px-5 py-3 rounded-xl font-semibold text-xs md:text-sm shadow-md hover:-translate-y-0.5 transition-all whitespace-nowrap cursor-pointer border border-line"
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>01346-132486</span>
              </a>
              <a
                href="https://wa.me/8801346132486"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent hover:bg-ink text-white px-5.5 py-3 rounded-xl font-semibold text-xs md:text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all whitespace-nowrap cursor-pointer border border-accent/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে সিরিয়াল' : 'WhatsApp Serial'}</span>
              </a>
            </div>
          </section>
        </AnimatedScrollItem>

      </main>

      <Footer />
    </div>
  );
}
