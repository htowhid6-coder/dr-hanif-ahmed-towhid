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
}

const defaultReviews: Review[] = [
  {
    reviewer_name_en: 'Abul Hasan',
    reviewer_name_bn: 'আবুল হাসান',
    reviewer_title_en: 'Sylhet Sadar',
    reviewer_title_bn: 'সিলেট সদর',
    review_text_en: "I struggled with unmanaged blood sugar for years. Dr. Hanif's continuous tracking and lifestyle modifications did wonders. Highly recommended.",
    review_text_bn: 'দীর্ঘ ৩ বছর ধরে অনিয়ন্ত্রিত ডায়াবেটিসে ভুগছিলাম। পপুলার চেম্বারে ডা. হানিফ স্যারের সুনির্দিষ্ট পরামর্শ ও জীবনযাত্রায় পরিবর্তন আনার পর এখন আমার ব্লাড সুগার সম্পূর্ণ নিয়ন্ত্রণে। স্যার অত্যন্ত ধৈর্য ধরে শোনেন এবং বুঝিয়ে বলেন।',
    initials: 'AH'
  },
  {
    reviewer_name_en: 'Sultana Begum',
    reviewer_name_bn: 'সুলতানা বেগম',
    reviewer_title_en: 'Shahjalal Uposhohor',
    reviewer_title_bn: 'শাহজালাল উপশহর',
    review_text_en: "I suffered from recurring fevers and typhoid for a long time. Following Dr. Hanif's correct diagnosis and treatment, I am now fully recovered. A very caring and reliable doctor.",
    review_text_bn: 'দীর্ঘদিন ধরে ঘন ঘন তীব্র জ্বর ও টাইফয়েডে ভুগছিলাম। স্যারের সঠিক রোগ নির্ণয় ও অ্যান্টিবায়োটিকের সঠিক ব্যবহারে আমি এখন সম্পূর্ণ সুস্থ। অত্যন্ত আন্তরিক ও ভরসা পাওয়ার মতো একজন চিকিৎসক।',
    initials: 'SB'
  },
  {
    reviewer_name_en: 'Md. Kamrul Islam',
    reviewer_name_bn: 'মো. কামরুল ইসলাম',
    reviewer_title_en: 'Zindabazar, Sylhet',
    reviewer_title_bn: 'জিন্দাবাজার, সিলেট',
    review_text_en: "I was suffering from severe hypertension and frequent dizziness. Dr. Hanif's careful examination and accurate medication plan normalized my blood pressure within weeks. Truly a compassionate physician.",
    review_text_bn: 'আমার দীর্ঘদিনের উচ্চ রক্তচাপ ও প্রায়ই মাথা ঘোরার সমস্যা ছিল। ডা. হানিফ স্যারের সঠিক প্রেসক্রিপশন ও নিয়মিত ফলোআপের মাধ্যমে অল্প সময়েই আমার প্রেশার নিয়ন্ত্রণে এসেছে। অত্যন্ত যত্নশীল ও অভিজ্ঞ ডাক্তার।',
    initials: 'KI'
  },
  {
    reviewer_name_en: 'Farhana Chowdhury',
    reviewer_name_bn: 'ফারহানা চৌধুরী',
    reviewer_title_en: 'Amberkhana, Sylhet',
    reviewer_title_bn: 'আম্বরখানা, সিলেট',
    review_text_en: "Had chronic thyroid and severe fatigue issues for months. Dr. Hanif explained the condition clearly and adjusted the dosage perfectly. I feel much more energetic now. Very grateful for his guidance.",
    review_text_bn: 'দীর্ঘদিন ধরে থাইরয়েড ও অতিরিক্ত ক্লান্তির সমস্যায় ভুগছিলাম। ডা. হানিফ স্যার অত্যন্ত শান্তভাবে রোগটি বুঝিয়ে বলেন এবং সঠিক ওষুধ দেন। এখন আমি অনেক সুস্থ ও কর্মক্ষম অনুভব করছি। স্যারের প্রতি আন্তরিক কৃতজ্ঞতা।',
    initials: 'FC'
  },
  {
    reviewer_name_en: 'Abdul Malik',
    reviewer_name_bn: 'আব্দুল মালিক',
    reviewer_title_en: 'Beanibazar, Sylhet',
    reviewer_title_bn: 'বিয়ানীবাজার, সিলেট',
    review_text_en: "Came with severe gastrointestinal complications and persistent chest burning. Sir's diagnosis was prompt and the prescribed lifestyle changes relieved my symptoms completely. One of the best medicine specialists in Sylhet.",
    review_text_bn: 'তীব্র পেটের সমস্যা ও গ্যাস্ট্রিকের কারণে বুকে ব্যথায় খুব কষ্ট পাচ্ছিলাম। স্যারের সঠিক রোগ নির্ণয়, খাদ্যাভ্যাস পরিবর্তন ও সময়োপযোগী চিকিৎসায় এখন সম্পূর্ণ সুস্থ। সিলেটের সেরা মেডিসিন বিশেষজ্ঞ ডাক্তার।',
    initials: 'AM'
  }
];

export default function Home() {
  const { language, t } = useLanguage();
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [bioInView, setBioInView] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const bioRef = useRef<HTMLElement | null>(null);


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
    async function loadReviews() {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          const uniqueDbReviews: Review[] = [];
          const seen = new Set<string>();
          for (const item of data) {
            const key = item.reviewer_name_en?.trim().toLowerCase();
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
  }, []);


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
            src="/doctor-consultation-bg.png"
            alt={language === 'bn' ? 'ক্লিনিক্যাল চেম্বার পরিবেশ' : 'Doctor Consultation Room'}
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
              {language === 'bn' ? 'বিশেষজ্ঞ চিকিৎসক পরিচিতি' : 'Specialist Introduction'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white drop-shadow-md">
              {language === 'bn'
                ? 'সিলেটে ডায়াবেটিস, হরমোন ও মেডিসিন রোগের নির্ভরযোগ্য চিকিৎসা পরামর্শ।'
                : 'Trusted Medical Consultations for Diabetes & Chronic Conditions in Sylhet.'}
            </h2>
          </div>

          <p className="text-sm md:text-base leading-relaxed text-white/95 font-normal drop-shadow-sm max-w-3xl">
            {language === 'bn'
              ? 'ডা. হানিফ আহমেদ তৌহিদ বর্তমানে সিলেট এম.এ.জি. ওসমানী মেডিকেল কলেজ হাসপাতালে মেডিসিনের রেজিস্ট্রার হিসেবে দায়িত্ব পালন করছেন। তিনি রোগীর শারীরিক সমস্যা নিখুঁতভাবে বিশ্লেষণ এবং বিজ্ঞানভিত্তিক চিকিৎসা প্রদানে আন্তরিক। প্রাপ্তবয়স্কদের দীর্ঘস্থায়ী মেডিসিন ব্যাধি, ডায়াবেটিস, হরমোনের ভারসাম্যহীনতা (থাইরয়েড), উচ্চ রক্তচাপ ও জটিল ইনফেকশনের আধুনিক চিকিৎসায় তিনি নিবেদিত।'
              : 'Dr. Hanif Ahmed Towhid serves as a Registrar at Sylhet MAG Osmani Medical College Hospital. He believes in patient-centric, scientifically precise care. His practice is focused on adult medicine, diabetes, hormonal balance (thyroid), and infectious disease management.'}
          </p>

          <div className="flex flex-wrap gap-4 mt-1 pt-4 border-t border-white/20">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/40 bg-white/20 hover:bg-white/35 text-white font-semibold text-xs md:text-sm backdrop-blur-md transition-all cursor-pointer shadow-sm hover:shadow hover:-translate-y-0.5"
            >
              <span>{language === 'bn' ? 'ডাক্তারের পরিচিতি ও ডিগ্রি পড়ুন' : 'Read My Journey'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/8801346132486"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent hover:bg-ink text-white font-semibold text-xs md:text-sm transition-all cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-white/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে সিরিয়াল বুক করুন' : 'WhatsApp Appointment'}</span>
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
        <InteractiveReviewsSection reviews={reviews} language={language} />

        {/* Urgent Appointment CTA Card */}
        <section className="glass-panel p-8 md:p-12 rounded-3xl bg-accent/10 border border-accent/20 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-ink">
              {language === 'bn' ? 'এপয়েন্টমেন্ট বা সিরিয়াল প্রয়োজন?' : 'Need to Book a Serial?'}
            </h3>
            <p className="text-xs md:text-sm text-muted">
              {language === 'bn'
                ? 'পপুলার মেডিকেল সেন্টারে ডা. হানিফ আহমেদ তৌহিদকে দেখাতে সরাসরি চেম্বারে যোগাযোগ করুন।'
                : 'Book your consulting slot at Popular Medical Center Kazalshah, Sylhet.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+8801346132486"
              className="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3.5 rounded-xl font-semibold text-xs md:text-sm shadow-md hover:-translate-y-0.5 transition-transform text-center cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>01346-132486</span>
            </a>
            <a
              href="https://wa.me/8801346132486"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-ink text-white px-6 py-3.5 rounded-xl font-semibold text-xs md:text-sm shadow-md hover:-translate-y-0.5 transition-all text-center cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
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
