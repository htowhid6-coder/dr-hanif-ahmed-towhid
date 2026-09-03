'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { DiseaseModal } from '@/components/DiseaseModal';
import { SymptomQuestionSection } from '@/components/SymptomQuestionSection';
import { SymptomCheckerSection } from '@/components/SymptomCheckerSection';
import { InteractiveReviewsSection } from '@/components/InteractiveReviewsSection';
import { diseaseData, Disease } from '@/locales/diseaseData';
import { defaultSiteSettings, SiteSettings } from '@/data/siteSettingsData';
import Link from 'next/link';
import { MessageCircle, Phone, PhoneCall, ArrowRight, Activity, Quote, MapPin } from 'lucide-react';
import supabase from '@/lib/supabase';

interface Review {
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

const defaultReviews: Review[] = [
  {
    reviewer_name_en: 'Mizbah Uddin Ornob',
    reviewer_name_bn: 'মিজবাহ উদ্দিন অর্ণব',
    reviewer_title_en: 'Verified Google Patient',
    reviewer_title_bn: 'যাচাইকৃত গুগল রিভিউয়ার',
    review_text_en: "Best medicine specialist in Sylhet. He gives each patient plenty of time, listens attentively, and treats everyone with great kindness and respect. Highly recommended.",
    review_text_bn: 'সিলেটের সেরা মেডিসিন বিশেষজ্ঞ ডাক্তার। তিনি প্রতিটি রোগীকে পর্যাপ্ত সময় দেন, অত্যন্ত মনোযোগ দিয়ে শোনেন এবং সবার সাথে পরম আন্তরিকতা ও শ্রদ্ধাপূর্ণ ব্যবহার করেন। হাইলি রেকমেন্ডেড।',
    initials: 'MO',
    rating: 5,
    google_review_url: 'https://g.page/r/CWPfW1si9Y0MEAE/review'
  },
  {
    reviewer_name_en: 'Safwan Uddin Ahmed',
    reviewer_name_bn: 'সাফওয়ান উদ্দিন আহমেদ',
    reviewer_title_en: 'Verified Google Patient',
    reviewer_title_bn: 'যাচাইকৃত গুগল রিভিউয়ার',
    review_text_en: "Dr. Hanif is truly an excellent doctor. He takes his time with each patient, listens attentively and never seems rushed. He examines patients thoroughly before jumping to any conclusions or prescriptions. He's also very transparent, always explaining the side effects of any medication and making sure he prescribes only what's genuinely necessary. Beyond his clinical skill, Dr. Hanif is incredibly talented and empathetic. Highly recommended!!!",
    review_text_bn: 'ডা. হানিফ সত্যিই অসাধারণ একজন চিকিৎসক। তিনি প্রতিটি রোগীকে পর্যাপ্ত সময় দেন, অত্যন্ত মনোযোগ দিয়ে শোনেন এবং কখনো তাড়াহুড়ো করেন না। রোগীকে গভীরভাবে পরীক্ষা করে সঠিক চিকিৎসা দেন। সবার জন্য বিশেষভাবে সুপারিশকৃত।',
    initials: 'SA',
    rating: 5,
    google_review_url: 'https://g.page/r/CWPfW1si9Y0MEAE/review'
  },
  {
    reviewer_name_en: 'Rafiqul Islam',
    reviewer_name_bn: 'রফিকুল ইসলাম',
    reviewer_title_en: 'Verified Google Patient',
    reviewer_title_bn: 'যাচাইকৃত গুগল রিভিউয়ার',
    review_text_en: "One of the best medicine specialist in town. Very cordial to patients, and sincere in his duties.",
    review_text_bn: 'সিলেট শহরের অন্যতম সেরা মেডিসিন বিশেষজ্ঞ। রোগীদের প্রতি অত্যন্ত আন্তরিক এবং দায়িত্বে পরম নিষ্ঠাবান।',
    initials: 'RI',
    rating: 5,
    google_review_url: 'https://g.page/r/CWPfW1si9Y0MEAE/review'
  },
  {
    reviewer_name_en: 'Fatema Imu',
    reviewer_name_bn: 'ফাতেমা ইমু',
    reviewer_title_en: 'Verified Google Patient',
    reviewer_title_bn: 'যাচাইকৃত গুগল রিভিউয়ার',
    review_text_en: "He's one of the best physician and human indeed! He not only cures diseases but also cares about the patient's mental, physical and economic conditions. May Allah bless him.",
    review_text_bn: 'তিনি নিঃসন্দেহে সেরা একজন চিকিৎসক ও অসাধারণ একজন মানুষ! তিনি কেবল রোগ নিরাময় করেন না, রোগীর মানসিক, শারীরিক এবং আর্থিক অবস্থারও পূর্ণ যত্ন নেন। আল্লাহ উনার মঙ্গল করুন।',
    initials: 'FI',
    rating: 5,
    google_review_url: 'https://g.page/r/CWPfW1si9Y0MEAE/review'
  },
  {
    reviewer_name_en: 'Dr. Abu Kamran Rahul',
    reviewer_name_bn: 'ডা. আবু কামরান রাহুল',
    reviewer_title_en: 'Physician & Medical Colleague',
    reviewer_title_bn: 'চিকিৎসক সহকর্মী',
    review_text_en: "Dr. Hanif is a very talented doctor. His approach to diagnosis and patient care is excellent, I recommend him for any disease of adult medicine.",
    review_text_bn: 'ডা. হানিফ অত্যন্ত মেধাবী একজন চিকিৎসক। রোগ নির্ণয় এবং রোগীসেবায় তার পদ্ধতি অনন্য। প্রাপ্তবয়স্কদের যেকোনো মেডিসিন চিকিৎসার জন্য তিনি অত্যন্ত বিশ্বস্ত।',
    initials: 'AK',
    rating: 5,
    google_review_url: 'https://g.page/r/CWPfW1si9Y0MEAE/review'
  },
  {
    reviewer_name_en: 'Dr. Alim Al Razy',
    reviewer_name_bn: 'ডা. আলিম আল রাজী',
    reviewer_title_en: 'Physician & Medical Colleague',
    reviewer_title_bn: 'চিকিৎসক সহকর্মী',
    review_text_en: "Finest internist of Sylhet. Exceptional clinical acumen and patient dedication.",
    review_text_bn: 'সিলেটের অন্যতম সেরা ইন্টারনিস্ট (মেডিসিন বিশেষজ্ঞ)। রোগীর প্রতি গভীর যত্ন ও নির্ভুল চিকিৎসায় অসাধারণ।',
    initials: 'AR',
    rating: 5,
    google_review_url: 'https://g.page/r/CWPfW1si9Y0MEAE/review'
  },
  {
    reviewer_name_en: 'Konok Kanti Deb',
    reviewer_name_bn: 'কনক কান্তি দেব',
    reviewer_title_en: 'Verified Google Patient',
    reviewer_title_bn: 'যাচাইকৃত গুগল রিভিউয়ার',
    review_text_en: "Good behaviour and very attentive consultation. Highly satisfied with the treatment.",
    review_text_bn: 'অত্যন্ত অমায়িক ব্যবহার এবং যত্নশীল চিকিৎসা পরামর্শ। স্যারের সেবায় অত্যন্ত সন্তুষ্ট।',
    initials: 'KD',
    rating: 5,
    google_review_url: 'https://g.page/r/CWPfW1si9Y0MEAE/review'
  },
  {
    reviewer_name_en: 'Md Nakib Sadat Chowdhury',
    reviewer_name_bn: 'মো. নাকিব সাদাত চৌধুরী',
    reviewer_title_en: 'Verified Google Patient',
    reviewer_title_bn: 'যাচাইকৃত গুগল রিভিউয়ার',
    review_text_en: "A very talented doctor and most importantly, a very good human being. I truly appreciate his dedication and highly recommend him to anyone looking for a knowledgeable and caring physician.",
    review_text_bn: 'অত্যন্ত মেধাবী একজন ডাক্তার এবং সবচেয়ে বড় কথা অসাধারণ একজন মানুষ। তার আন্তরিকতার জন্য আমি সত্যিই কৃতজ্ঞ এবং সবাইকে তাকে দেখানোর পরামর্শ দেব।',
    initials: 'NC',
    rating: 5,
    google_review_url: 'https://g.page/r/CWPfW1si9Y0MEAE/review'
  },
  {
    reviewer_name_en: 'Miftah Rahi',
    reviewer_name_bn: 'মিফতাহ রাহি',
    reviewer_title_en: 'Verified Google Patient',
    reviewer_title_bn: 'যাচাইকৃত গুগল রিভিউয়ার',
    review_text_en: "One of the best medicine specialists in Sylhet—Dr. Hanif Ahmed Towhid is kind, helpful, and truly cares about his patients.",
    review_text_bn: 'সিলেটের অন্যতম সেরা মেডিসিন বিশেষজ্ঞ—ডা. হানিফ আহমেদ তৌহিদ অত্যন্ত বিনয়ী, সহযোগিতাপূর্ণ এবং রোগীদের প্রতি গভীর যত্নশীল।',
    initials: 'MR',
    rating: 5,
    google_review_url: 'https://g.page/r/CWPfW1si9Y0MEAE/review'
  },
  {
    reviewer_name_en: 'Tarek Ahmed',
    reviewer_name_bn: 'তারেক আহমেদ',
    reviewer_title_en: 'Verified Google Patient',
    reviewer_title_bn: 'যাচাইকৃত গুগল রিভিউয়ার',
    review_text_en: "He is not only a skilled doctor, but also a wonderful human being. May Allah grant him a healthy, safe and long life and grant him the ability to serve us for a long time. Amen.",
    review_text_bn: 'তিনি কেবল একজন দক্ষ চিকিৎসকই নন, অত্যন্ত চমৎকার একজন মানুষ। আল্লাহ যেন তাকে সুস্থ, নিরাপদ ও দীর্ঘ জীবন দান করেন এবং দীর্ঘকাল মানবসেবায় যুক্ত রাখেন। আমিন।',
    initials: 'TA',
    rating: 5,
    google_review_url: 'https://g.page/r/CWPfW1si9Y0MEAE/review'
  },
  {
    reviewer_name_en: 'MD RUBEL',
    reviewer_name_bn: 'মো. রুবেল',
    reviewer_title_en: 'Verified Google Patient',
    reviewer_title_bn: 'যাচাইকৃত গুগল রিভিউয়ার',
    review_text_en: "Dr Hanif Sir is the best medicine specialist in Sylhet. I am very happy with the treatment sir.",
    review_text_bn: 'ডা. হানিফ স্যার সিলেটের সেরা মেডিসিন বিশেষজ্ঞ। স্যারের চিকিৎসায় আমি অত্যন্ত সন্তুষ্ট।',
    initials: 'MR',
    rating: 5,
    google_review_url: 'https://g.page/r/CWPfW1si9Y0MEAE/review'
  },
  {
    reviewer_name_en: 'Farhat Chowdhury',
    reviewer_name_bn: 'ফারহাত চৌধুরী',
    reviewer_title_en: 'Verified Google Patient',
    reviewer_title_bn: 'যাচাইকৃত গুগল রিভিউয়ার',
    review_text_en: "Dr. Hanif Ahmed Touhid is a sincere, attentive and humane doctor. He listens to each patient patiently, understands the root cause of the problem and provides appropriate treatment. My family and I are very satisfied.",
    review_text_bn: 'ডা. হানিফ আহমেদ তৌহিদ অত্যন্ত আন্তরিক, মনোযোগী ও মানবিক একজন চিকিৎসক। তিনি পরম ধৈর্য ধরে শুনে সমস্যার মূল কারণ নির্ণয় করে সঠিক চিকিৎসা দেন। আমি ও আমার পরিবার তার চিকিৎসা সেবায় অত্যন্ত সন্তুষ্ট।',
    initials: 'FC',
    rating: 5,
    google_review_url: 'https://g.page/r/CWPfW1si9Y0MEAE/review'
  },
  {
    reviewer_name_en: 'Priyanka Roy Pinki',
    reviewer_name_bn: 'প্রিয়াঙ্কা রায় পিংকি',
    reviewer_title_en: 'Verified Google Patient',
    reviewer_title_bn: 'যাচাইকৃত গুগল রিভিউয়ার',
    review_text_en: "Very good treatment, any patient will be satisfied.",
    review_text_bn: 'অত্যন্ত ভালো চিকিৎসা সেবা, যেকোনো রোগীই তার চিকিৎসায় সন্তুষ্ট হবেন।',
    initials: 'PP',
    rating: 5,
    google_review_url: 'https://g.page/r/CWPfW1si9Y0MEAE/review'
  },
  {
    reviewer_name_en: 'Md. Rokon',
    reviewer_name_bn: 'মো. রোকন',
    reviewer_title_en: 'Verified Google Patient',
    reviewer_title_bn: 'যাচাইকৃত গুগল রিভিউয়ার',
    review_text_en: "Very good doctor. You are a good doctor and a wonderful person. May Allah grant you a good life. Amen.",
    review_text_bn: 'খুব ভালো ডাক্তার। আপনি একজন দক্ষ চিকিৎসক এবং চমৎকার একজন মানুষ। পরম সহানুভূতিশীল।',
    initials: 'MR',
    rating: 5,
    google_review_url: 'https://g.page/r/CWPfW1si9Y0MEAE/review'
  },
  {
    reviewer_name_en: 'Tanjirul Islam Rupak',
    reviewer_name_bn: 'তানজিরুল ইসলাম রূপক',
    reviewer_title_en: 'Verified Google Patient',
    reviewer_title_bn: 'যাচাইকৃত গুগল রিভিউয়ার',
    review_text_en: "Outstanding patient care and diagnosis. Highly recommended medicine specialist in Sylhet.",
    review_text_bn: 'চমৎকার চিকিৎসা ও আন্তরিক সেবা। সিলেটের অন্যতম বিশ্বস্ত ও নির্ভুল মেডিসিন বিশেষজ্ঞ।',
    initials: 'TR',
    rating: 5,
    google_review_url: 'https://g.page/r/CWPfW1si9Y0MEAE/review'
  },
  {
    reviewer_name_en: 'Sakib Mahmud',
    reviewer_name_bn: 'সাকিব মাহমুদ',
    reviewer_title_en: 'Verified Google Patient',
    reviewer_title_bn: 'যাচাইকৃত গুগল রিভিউয়ার',
    review_text_en: "Excellent diagnosis and supportive physician. Very satisfied with the treatment.",
    review_text_bn: 'নিখুঁত রোগ নির্ণয় এবং অত্যন্ত সহায়ক চিকিৎসক। চিকিৎসায় সম্পূর্ণ সন্তুষ্ট।',
    initials: 'SM',
    rating: 5,
    google_review_url: 'https://g.page/r/CWPfW1si9Y0MEAE/review'
  },
  {
    reviewer_name_en: 'Es Ebrahim',
    reviewer_name_bn: 'ইএস ইব্রাহিম',
    reviewer_title_en: 'Verified Google Patient',
    reviewer_title_bn: 'যাচাইকৃত গুগল রিভিউয়ার',
    review_text_en: "Very professional and caring doctor. Highly satisfied with the consultation.",
    review_text_bn: 'অত্যন্ত পেশাদার এবং যত্নশীল চিকিৎসক। পরামর্শ ও চিকিৎসায় সম্পূর্ণ সন্তুষ্ট।',
    initials: 'EE',
    rating: 5,
    google_review_url: 'https://g.page/r/CWPfW1si9Y0MEAE/review'
  }
];

export default function Home() {
  const { language, t } = useLanguage();
  const isBn = language === 'bn';
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [bioInView, setBioInView] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const bioRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBioInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (bioRef.current) {
      observer.observe(bioRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loadSettings = async () => {
      if (typeof window !== 'undefined') {
        const local = localStorage.getItem('site_settings_data');
        if (local) {
          try {
            setSettings(prev => ({ ...prev, ...JSON.parse(local) }));
          } catch (e) {}
        }
      }

      try {
        const { data } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 'global_settings')
          .maybeSingle();

        if (data?.data) {
          setSettings(prev => ({ ...prev, ...data.data }));
        }
      } catch (err) {}
    };

    loadSettings();

    const handleUpdate = () => loadSettings();
    window.addEventListener('site_settings_updated', handleUpdate);
    return () => window.removeEventListener('site_settings_updated', handleUpdate);
  }, []);

  useEffect(() => {
    async function loadReviews() {
      try {
        // Read reviews_meta from localStorage or settings
        let metaMap: Record<string, any> = {};
        if (typeof window !== 'undefined') {
          try {
            const local = localStorage.getItem('site_settings_data');
            if (local) {
              const parsed = JSON.parse(local);
              if (parsed.reviewsMetadata) metaMap = { ...parsed.reviewsMetadata };
            }
            const localReviewsMeta = localStorage.getItem('reviews_meta');
            if (localReviewsMeta) {
              metaMap = { ...metaMap, ...JSON.parse(localReviewsMeta) };
            }
          } catch (e) {}
        }

        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          const uniqueDbReviews: Review[] = [];
          const seen = new Set<string>();
          for (const rawItem of data) {
            const key = rawItem.reviewer_name_en?.trim().toLowerCase();
            const id = rawItem.id;
            const meta = (id && metaMap[id]) || (key && metaMap[key]) || {};

            const item: Review = {
              ...rawItem,
              rating: typeof rawItem.rating === 'number' ? rawItem.rating : (meta.rating ?? 5),
              google_review_url: rawItem.google_review_url || meta.google_review_url || '',
            };

            if (key && !seen.has(key)) {
              seen.add(key);
              uniqueDbReviews.push(item);
            }
          }
          const merged = [...uniqueDbReviews];
          for (const def of defaultReviews) {
            const key = def.reviewer_name_en?.trim().toLowerCase();
            if (key && !seen.has(key)) {
              seen.add(key);
              merged.push(def);
            }
          }
          setReviews(merged);
        } else {
          setReviews(defaultReviews);
        }
      } catch (err) {
        console.error("Error loading reviews from Supabase:", err);
        setReviews(defaultReviews);
      }
    }
    loadReviews();
  }, [settings.reviewsMetadata]);

  const openDiseaseModal = (slug: string) => {
    const disease = diseaseData.find((d) => d.slug === slug);
    if (disease) {
      setSelectedDisease(disease);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-ink antialiased">
      <Navbar />

      {/* Hero Section with LOCKED fixed background and scrolling panels */}
      <Hero onSelectDisease={setSelectedDisease} />

      {/* Full-width Specialist Introduction Section with Background Image & Animated Watercolor Glass Card */}
      <section
        id="doctor-bio"
        ref={bioRef}
        className="relative w-full overflow-hidden border-y border-line py-20 md:py-28 px-6 md:px-12 flex items-center justify-center scroll-mt-20"
      >
        {/* Background Image Layer - Full Width Edge to Edge */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={settings.specialistIntroBgImage || '/doctor-consultation-bg.png'}
            alt={isBn ? 'ক্লিনিক্যাল চেম্বার পরিবেশ' : 'Doctor Consultation Room'}
            className={`w-full h-full object-cover object-center transition-transform duration-1000 ease-out ${
              bioInView ? 'scale-100' : 'scale-105'
            }`}
          />
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-[0.5px]"></div>
        </div>

        {/* Floating Watercolor Ultra-Transparent Glassmorphic Card (Right-to-Left Scroll Entrance Animation) */}
        <div
          className={`relative z-10 w-full max-w-4xl bg-white/15 hover:bg-white/20 backdrop-blur-md border border-white/30 p-8 sm:p-10 md:p-14 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] flex flex-col gap-6 transition-all duration-1000 ease-out transform ${
            bioInView
              ? 'translate-x-0 opacity-100 scale-100 animate-float-gentle'
              : 'translate-x-20 opacity-0 scale-95'
          }`}
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-200 mb-3 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {isBn ? settings.specialistIntroBadgeBn : settings.specialistIntroBadgeEn}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white drop-shadow-md">
              {isBn ? settings.specialistIntroTitleBn : settings.specialistIntroTitleEn}
            </h2>
          </div>

          <p className="text-sm md:text-base leading-relaxed text-white/95 font-normal drop-shadow-sm max-w-3xl">
            {isBn ? settings.specialistIntroBioBn : settings.specialistIntroBioEn}
          </p>

          <div className="flex flex-wrap gap-4 mt-1 pt-4 border-t border-white/20">
            <Link
              href={settings.specialistIntroCtaLink || '/about'}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/40 bg-white/20 hover:bg-white/35 text-white font-semibold text-xs md:text-sm backdrop-blur-md transition-all cursor-pointer shadow-sm hover:shadow hover:-translate-y-0.5"
            >
              <span>{isBn ? settings.specialistIntroCtaTextBn : settings.specialistIntroCtaTextEn}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${settings.whatsappNumber || '8801346132486'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent hover:bg-ink text-white font-semibold text-xs md:text-sm transition-all cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-white/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isBn ? 'হোয়াটসঅ্যাপে সিরিয়াল বুক করুন' : 'WhatsApp Appointment'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Dedicated Hooking Question Banner Section */}
      <SymptomQuestionSection />

      {/* Interactive Full-Width Symptom Evaluation Section */}
      <SymptomCheckerSection />

      {/* Content below Symptom Section */}
      <div className="relative z-10 bg-background w-full py-16 px-6 md:px-12 flex flex-col gap-20 max-w-7xl mx-auto">

        {/* Testimonials / Patient Trust - 3D Interactive Experience */}
        <InteractiveReviewsSection 
          reviews={reviews} 
          language={language} 
          googleReviewSettings={{
            businessUrl: settings.googleReviewBusinessUrl,
            qrCodeImage: settings.googleReviewQrCodeImage,
            titleEn: settings.googleReviewTitleEn,
            titleBn: settings.googleReviewTitleBn,
            subtitleEn: settings.googleReviewSubtitleEn,
            subtitleBn: settings.googleReviewSubtitleBn,
            buttonTextEn: settings.googleReviewButtonTextEn,
            buttonTextBn: settings.googleReviewButtonTextBn,
            badgeEn: settings.googleReviewBadgeEn,
            badgeBn: settings.googleReviewBadgeBn,
          }}
        />

        {/* Urgent Appointment CTA Card */}
        <section className="glass-panel p-8 md:p-12 rounded-3xl bg-accent/10 border border-accent/20 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-ink">
              {isBn ? settings.urgentCtaTitleBn : settings.urgentCtaTitleEn}
            </h3>
            <p className="text-xs md:text-sm text-muted">
              {isBn ? settings.urgentCtaSubtitleBn : settings.urgentCtaSubtitleEn}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:+${settings.contactPhone?.replace(/[^0-9]/g, '') || '8801346132486'}`}
              className="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3.5 rounded-xl font-semibold text-xs md:text-sm shadow-md hover:-translate-y-0.5 transition-transform text-center cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>{settings.urgentCtaPhoneText || settings.contactPhone || '01346-132486'}</span>
            </a>
            <a
              href={`https://wa.me/${settings.whatsappNumber || '8801346132486'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-ink text-white px-6 py-3.5 rounded-xl font-semibold text-xs md:text-sm shadow-md hover:-translate-y-0.5 transition-all text-center cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{settings.urgentCtaWhatsappText || 'WhatsApp'}</span>
            </a>
          </div>
        </section>

      </div>

      <Footer />

      {/* Render Modal Detail Box */}
      <DiseaseModal disease={selectedDisease} onClose={() => setSelectedDisease(null)} />
    </div>
  );
}
