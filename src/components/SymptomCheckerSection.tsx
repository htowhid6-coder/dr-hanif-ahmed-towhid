'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Thermometer,
  Activity,
  Zap,
  Brain,
  HeartPulse,
  ShieldAlert,
  Wind,
  Flame,
  AlertCircle,
  Phone,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
} from 'lucide-react';

export interface SymptomItem {
  id: number;
  slug: string;
  en: string;
  bn: string;
  categoryEn: string;
  categoryBn: string;
  organEn: string;
  organBn: string;
  noteEn: string;
  noteBn: string;
  image: string;
  icon: React.ElementType;
}

export const symptomsList: SymptomItem[] = [
  {
    id: 1,
    slug: 'fever',
    en: 'Fever',
    bn: 'জ্বর',
    categoryEn: 'Infectious & Viral',
    categoryBn: 'সংক্রামক ও ভাইরাসজনিত',
    organEn: 'Immune System',
    organBn: 'রোগ প্রতিরোধ ব্যবস্থা',
    noteEn: 'High fever, recurring chills, viral dengue or typhoid infections requiring precise diagnostic blood counts.',
    noteBn: 'তীব্র জ্বর, কাঁপুনি, ডেঙ্গু বা টাইফয়েডের মতো সংক্রামক ব্যাধি যা সঠিক রক্ত পরীক্ষার মাধ্যমে নির্ণয় করা হয়।',
    image: '/symptoms/fever.png',
    icon: Thermometer,
  },
  {
    id: 2,
    slug: 'low-back-pain',
    en: 'Low Back Pain',
    bn: 'কোমর ব্যথা',
    categoryEn: 'Musculoskeletal & Spine',
    categoryBn: 'পেশী ও মেরুদণ্ড',
    organEn: 'Lumbar Spine & Muscles',
    organBn: 'কোমর ও পেশিতন্ত্র',
    noteEn: 'Chronic lumbar stiffness, nerve root irritation, disc pressure or posture-induced spinal pain.',
    noteBn: 'দীর্ঘস্থায়ী কোমর ব্যথা, নার্ভের চাপ বা বসার ভঙ্গিমাজনিত মেরুদণ্ডের সমস্যা ও বাতব্যথা।',
    image: '/symptoms/low-back-pain.png',
    icon: Activity,
  },
  {
    id: 3,
    slug: 'knee-pain',
    en: 'Knee Pain',
    bn: 'হাঁটু ব্যথা',
    categoryEn: 'Rheumatology & Joints',
    categoryBn: 'বাত ও অস্থিসন্ধি',
    organEn: 'Knee Joints & Cartilage',
    organBn: 'হাঁটুর জয়েন্ট ও তরুণাস্থি',
    noteEn: 'Osteoarthritis, uric acid / gout deposition, cartilage wear-and-tear or difficulty walking and climbing stairs.',
    noteBn: 'হাঁটুতে প্রদাহ, ইউরিক এসিডের আধিক্য, অস্টিওআর্থ্রাইটিস বা সিঁড়ি ওঠানামায় তীব্র যন্ত্রণা।',
    image: '/symptoms/knee-pain.png',
    icon: Zap,
  },
  {
    id: 4,
    slug: 'fatigue',
    en: 'Fatigue',
    bn: 'শরীর ম্যাজম্যাজ করা বা অতিরিক্ত দুর্বল লাগা (ক্লান্তি ভাব)',
    categoryEn: 'Metabolic & Endocrine',
    categoryBn: 'মেটাবলিক ও হরমোন',
    organEn: 'Metabolic Energy',
    organBn: 'মেটাবলিজম ও শক্তি',
    noteEn: 'Unexplained chronic exhaustion, uncontrolled diabetes, severe anemia, or thyroid hormone deficiency.',
    noteBn: 'অস্বাভাবিক দুর্বলতা, অনিয়ন্ত্রিত ব্লাড সুগার, রক্তস্বল্পতা বা থাইরয়েড হরমোনের ভারসাম্যহীনতা।',
    image: '/symptoms/fatigue.png',
    icon: Sparkles,
  },
  {
    id: 5,
    slug: 'headache',
    en: 'Headache',
    bn: 'মাথা ব্যথা',
    categoryEn: 'Neurological & Vascular',
    categoryBn: 'স্নায়ু ও রক্তচাপ',
    organEn: 'Cranial & Vascular',
    organBn: 'মস্তিষ্ক ও রক্তনালী',
    noteEn: 'Tension headaches, uncontrolled high blood pressure spikes, migraine or sinusitis complications.',
    noteBn: 'মাইগ্রেন, হঠাৎ উচ্চ রক্তচাপ বৃদ্ধি, দুশ্চিন্তাজনিত মাথাব্যথা বা সাইনাসের প্রদাহ।',
    image: '/symptoms/headache.png',
    icon: Brain,
  },
  {
    id: 6,
    slug: 'restlessness',
    en: 'Restlessness',
    bn: 'অস্থিরতা লাগা বা ছটফটানি',
    categoryEn: 'Autonomic & Thyroid',
    categoryBn: 'হরমোন ও স্নায়ু',
    organEn: 'Nervous System & Thyroid',
    organBn: 'স্নায়ুতন্ত্র ও থাইরয়েড',
    noteEn: 'Hyperthyroidism, electrolyte imbalance, sleep disruption or systemic metabolic agitation.',
    noteBn: 'হাইপারথাইরয়েডিজম (থাইরয়েডের আধিক্য), শরীরে লবণের ভারসাম্যহীনতা বা ঘুমের জটিলতা।',
    image: '/symptoms/restlessness.png',
    icon: Activity,
  },
  {
    id: 7,
    slug: 'palpitation',
    en: 'Palpitation',
    bn: 'বুক ধড়ফড় করা',
    categoryEn: 'Cardiovascular & Hormonal',
    categoryBn: 'হৃদযন্ত্র ও হরমোন',
    organEn: 'Heart & Pulse Rhythm',
    organBn: 'হৃদস্পন্দন ও হৃদযন্ত্র',
    noteEn: 'Rapid heart rate, arrhythmia, acute anxiety, hyperthyroid surges or severe hemoglobin deficiency.',
    noteBn: 'হঠাৎ বুক ধড়ফড় করা, দ্রুত হৃদস্পন্দন, রক্তশূন্যতা কিংবা থাইরয়েড হরমোনের তীব্র পরিবর্তন।',
    image: '/symptoms/palpitation.png',
    icon: HeartPulse,
  },
  {
    id: 8,
    slug: 'anxiety',
    en: 'Anxiety',
    bn: 'দুশ্চিন্তা হওয়া বা মনের ভেতর ভয়-ভয় ভাব হওয়া',
    categoryEn: 'Neuro-Psychological',
    categoryBn: 'মনোদৈহিক ও হরমোন',
    organEn: 'Autonomic Stress Axis',
    organBn: 'স্নায়ু ও মানসিক স্বাস্থ্য',
    noteEn: 'Chronic stress, panic episodes, generalized anxiety linked to chronic somatic physical ailments.',
    noteBn: 'অপ্রয়োজনীয় আতঙ্ক, ভয়-ভয় ভাব, বুক জ্বালাপোড়া ও শারীরিক ব্যাধির সাথে সম্পর্কিত মানসিক চাপ।',
    image: '/symptoms/anxiety.png',
    icon: ShieldAlert,
  },
  {
    id: 9,
    slug: 'upper-abdominal-discomfort',
    en: 'Upper Abdominal Discomfort',
    bn: 'পেটের ওপরের দিকে অস্বস্তি লাগা বা পেট ভারী হওয়া',
    categoryEn: 'Gastroenterology',
    categoryBn: 'পরিপাকতন্ত্র ও লিভার',
    organEn: 'Stomach & Gallbladder',
    organBn: 'পাকস্থলী ও পিত্তথলি',
    noteEn: 'Indigestion, dyspepsia, gallstones, fatty liver irritation or bloated fullness after meals.',
    noteBn: 'খাওয়ার পর পেট ভারী লাগা, বদহজম, ফ্যাটি লিভার বা পিত্তথলির সমস্যার প্রাথমিক লক্ষণ।',
    image: '/symptoms/upper-abdominal-discomfort.png',
    icon: AlertCircle,
  },
  {
    id: 10,
    slug: 'epigastric-pain',
    en: 'Epigastric Pain',
    bn: 'পেটের ঠিক ওপরের অংশে (বুকের ঠিক নিচে) ব্যথা হওয়া',
    categoryEn: 'Gastrointestinal & Ulcer',
    categoryBn: 'গ্যাস্ট্রিক ও আলসার',
    organEn: 'Gastric Mucosa & Esophagus',
    organBn: 'পাকস্থলীর প্রাচীর ও খাদ্যনালী',
    noteEn: 'Peptic ulcer disease, GERD, severe acidity burn, or acute gastritis requiring rational medical therapy.',
    noteBn: 'তীব্র গ্যাস্ট্রিক আলসার, বুক-পেট জ্বালাপোড়া এবং অ্যান্টাসিড প্রতিরোধী পেটের ব্যথা।',
    image: '/symptoms/epigastric-pain.png',
    icon: Flame,
  },
  {
    id: 11,
    slug: 'cough',
    en: 'Cough',
    bn: 'কাশি',
    categoryEn: 'Respiratory & Pulmonary',
    categoryBn: 'ফুসফুস ও শ্বাসতন্ত্র',
    organEn: 'Lungs & Airways',
    organBn: 'ফুসফুস ও শ্বাসনালী',
    noteEn: 'Persistent dry or productive cough, bronchitis, post-viral airway sensitivity or asthma flares.',
    noteBn: 'দীর্ঘস্থায়ী শুকনো কাশি, কফ, সিওপিডি (COPD), অ্যাজমা বা শ্বাসনালীর তীব্র সংবেদনশীলতা।',
    image: '/symptoms/cough.png',
    icon: Wind,
  },
  {
    id: 12,
    slug: 'exertional-breathlessness',
    en: 'Exertional Breathlessness',
    bn: 'একটু হাঁটাহাঁটি বা পরিশ্রম করলেই শ্বাসকষ্ট হওয়া (হাঁপিয়ে ওঠা)',
    categoryEn: 'Cardio-Pulmonary',
    categoryBn: 'হৃদযন্ত্র ও ফুসফুস',
    organEn: 'Cardiopulmonary Capacity',
    organBn: 'হৃদযন্ত্র ও ফুসফুসের ক্ষমতা',
    noteEn: 'Shortness of breath upon mild exertion, early warning of cardiac strain, anemia or lung airway obstruction.',
    noteBn: 'হালকা পরিশ্রমে বা সিঁড়িতে উঠলেই হাঁপিয়ে ওঠা; যা হৃদরোগ, অ্যানিমিয়া বা ফুসফুসের দুর্বলতার ইঙ্গিত দেয়।',
    image: '/symptoms/exertional-breathlessness.png',
    icon: Wind,
  },
  {
    id: 13,
    slug: 'chest-pain',
    en: 'Chest Pain',
    bn: 'বুকে ব্যথা',
    categoryEn: 'Cardio-Thoracic Urgent',
    categoryBn: 'হৃদযন্ত্র ও বক্ষব্যাধি',
    organEn: 'Heart & Chest Wall',
    organBn: 'হৃদপিণ্ড ও বুকের পেশী',
    noteEn: 'Chest heaviness, angina risk, muscular wall strain, or acid reflux simulating cardiac discomfort.',
    noteBn: 'বুকে চাপ ধরা অনুভূতি, এনজাইনা/হার্ট অ্যাটাকের ঝুঁকি কিংবা তীব্র এসিডিটিজনিত বুকের অস্বস্তি।',
    image: '/symptoms/chest-pain.png',
    icon: HeartPulse,
  },
  {
    id: 14,
    slug: 'dysuria',
    en: 'Dysuria',
    bn: 'প্রস্রাবে জ্বালাপোড়া হওয়া বা প্রস্রাবের সময় ব্যথা হওয়া',
    categoryEn: 'Nephrology & Urology',
    categoryBn: 'কিডনি ও মূত্রনালী',
    organEn: 'Urinary Tract & Kidneys',
    organBn: 'মূত্রনালী ও কিডনি',
    noteEn: 'Urinary tract infection (UTI), kidney gravel/stones, concentrated urine or bladder inflammation.',
    noteBn: 'ইউটিআই (UTI), প্রস্রাবে ইনফেকশন, কিডনিতে পাথর বা তীব্র জ্বালাপোড়া ও ব্যথাজনিত সমস্যা।',
    image: '/symptoms/dysuria.png',
    icon: Zap,
  },
];

export const SymptomCheckerSection: React.FC = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [imgSrc, setImgSrc] = useState(symptomsList[0].image);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Touch Swipe coordinates
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const activeSymptom = symptomsList[activeIndex] || symptomsList[0];
  const IconComponent = activeSymptom.icon;

  useEffect(() => {
    setImgSrc(activeSymptom.image);
  }, [activeSymptom]);

  const nextSymptom = () => {
    setActiveIndex((prev) => (prev + 1) % symptomsList.length);
  };

  const prevSymptom = () => {
    setActiveIndex((prev) => (prev - 1 + symptomsList.length) % symptomsList.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only trigger swipe if horizontal movement is significant and greater than vertical scroll
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        // Swiped Left -> Next
        nextSymptom();
      } else {
        // Swiped Right -> Prev
        prevSymptom();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      id="symptoms-section"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#4e5a69] via-[#444F5C] to-[#343d47] text-white py-14 md:py-24 px-4 sm:px-6 md:px-12 border-t border-white/10 scroll-mt-16"
    >
      {/* Background Decorative Tech Grid & Subtle Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col gap-6">
        
        {/* Dynamic Split Layout: 3/4 Visual on Left & 1/4 Symptoms on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT SIDE: 3/4 of the width (approx. 9/12 cols on desktop) with TOUCH SWIPE */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={`lg:col-span-8 xl:col-span-9 flex flex-col justify-between relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-[#363f4b]/60 backdrop-blur-xl min-h-[580px] md:min-h-[640px] select-none transition-all duration-1000 ease-out transform ${
              inView ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}
          >
            {/* Dynamic Symptom Visual with smooth fade & fallback */}
            <div className="absolute inset-0 z-0 overflow-hidden group pointer-events-none">
              <img
                key={activeSymptom.slug}
                src={imgSrc}
                alt={activeSymptom.en}
                onError={() => setImgSrc('/symptom-anatomy.jpg')}
                className="w-full h-full object-cover object-center scale-100 transition-all duration-700 brightness-90 contrast-110 animate-in fade-in zoom-in-95 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/40"></div>
            </div>

            {/* Mobile / Desktop Swipe / Arrow Nav Controls */}
            <div className="absolute inset-y-0 left-2 md:left-4 z-20 flex items-center pointer-events-auto">
              <button
                onClick={prevSymptom}
                aria-label="Previous symptom"
                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-slate-950/50 hover:bg-slate-950/80 border border-white/25 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-white shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            <div className="absolute inset-y-0 right-2 md:right-4 z-20 flex items-center pointer-events-auto">
              <button
                onClick={nextSymptom}
                aria-label="Next symptom"
                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-slate-950/50 hover:bg-slate-950/80 border border-white/25 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-white shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Top Bar: Symptom Detail Hologram Card + Mobile Swipe Indicator */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8 flex flex-col gap-3">
              {/* Mobile Swipe Hint Badge */}
              <div className="lg:hidden flex items-center justify-between gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md w-fit self-end text-[11px] text-emerald-300 font-semibold shadow-sm">
                <MoveHorizontal className="w-3.5 h-3.5 animate-pulse" />
                <span>
                  {language === 'bn' ? 'সোয়াইপ করে দেখুন' : 'Swipe left/right'} ({activeIndex + 1}/{symptomsList.length})
                </span>
              </div>

              {/* Hologram Card */}
              <div className="w-full max-w-xl bg-white/15 hover:bg-white/20 backdrop-blur-md border border-white/25 p-5 md:p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] flex flex-col gap-3 transition-all duration-300 animate-in fade-in duration-500">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/30 flex items-center justify-center text-emerald-300 shadow-sm backdrop-blur-sm">
                      <IconComponent className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block drop-shadow-sm">
                        {language === 'bn' ? activeSymptom.categoryBn : activeSymptom.categoryEn}
                      </span>
                      <h3 className="font-serif text-lg md:text-xl font-bold text-white leading-tight drop-shadow-md">
                        {language === 'bn' ? activeSymptom.bn : activeSymptom.en}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/20 backdrop-blur-sm shadow-sm">
                    #{activeSymptom.id}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-white/90 leading-relaxed border-t border-white/20 pt-2.5 drop-shadow-sm font-normal">
                  {language === 'bn' ? activeSymptom.noteBn : activeSymptom.noteEn}
                </p>

                <div className="flex items-center justify-between gap-3 border-t border-white/20 pt-3 flex-wrap mt-0.5">
                  <div className="flex items-center gap-2 text-[11px] text-emerald-300 font-semibold drop-shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {language === 'bn'
                        ? `আক্রান্ত অঙ্গ: ${activeSymptom.organBn}`
                        : `Affected System: ${activeSymptom.organEn}`}
                    </span>
                  </div>

                  {/* Learn More Button */}
                  <Link
                    href={`/symptoms#${activeSymptom.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/85 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 border border-emerald-400/40 backdrop-blur-sm cursor-pointer ml-auto"
                  >
                    <span>{language === 'bn' ? 'বিস্তারিত জানুন' : 'Learn More'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Floating Doctor Appointment CTA Banner - Watercolor Transparent Style */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8 mt-auto">
              <div className="w-full bg-white/15 hover:bg-white/20 backdrop-blur-md border border-white/25 p-5 md:p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-300">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <h4 className="font-serif text-base md:text-lg font-bold text-white drop-shadow-sm">
                      {language === 'bn' ? 'সরাসরি ডাক্তারের পরামর্শ ও সিরিয়াল' : 'Consult Specialist Dr. Hanif'}
                    </h4>
                  </div>
                  <p className="text-xs text-white/85 drop-shadow-sm">
                    {language === 'bn'
                      ? 'পপুলার মেডিকেল সেন্টার (রুম ৬০৫), কাজলশাহ, সিলেট।'
                      : 'Popular Medical Center (Room #605), Kazalshah, Sylhet.'}
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto">
                  <a
                    href="tel:+8801346132486"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/20 hover:bg-white/35 text-white font-semibold text-xs md:text-sm border border-white/35 backdrop-blur-md transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-emerald-300" />
                    <span>01346-132486</span>
                  </a>
                  <a
                    href="https://wa.me/8801346132486"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent hover:bg-ink text-white font-semibold text-xs md:text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-white/20 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{language === 'bn' ? 'সিরিয়াল বুকিং' : 'Book Appointment'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: 1/4 of the width (approx. 3/12 cols on desktop) */}
          <div
            className={`lg:col-span-4 xl:col-span-3 flex flex-col gap-3.5 transition-all duration-1000 ease-out transform ${
              inView ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}
          >
            <div className="flex items-center justify-between px-2 pb-1 border-b border-white/10">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>{language === 'bn' ? 'লক্ষণ তালিকা (১৪টি)' : 'Symptoms (14)'}</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                {language === 'bn' ? 'ক্লিক বা সোয়াইপ করুন' : 'Click or swipe'}
              </span>
            </div>

            {/* Scrollable list of 14 symptoms with floating hover effects */}
            <div className="flex flex-col gap-2 max-h-[580px] overflow-y-auto pr-1.5 custom-scrollbar">
              {symptomsList.map((symptom, idx) => {
                const isSelected = activeIndex === idx;
                const SymIcon = symptom.icon;

                return (
                  <button
                    key={symptom.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`group w-full text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-accent text-white border-emerald-300 shadow-[0_0_15px_rgba(47,111,94,0.5)] scale-[1.02]'
                        : 'bg-white/5 hover:bg-white/15 text-slate-200 border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs transition-colors ${
                          isSelected
                            ? 'bg-white text-accent font-bold'
                            : 'bg-white/10 text-slate-300 group-hover:text-white'
                        }`}
                      >
                        <SymIcon className="w-3.5 h-3.5" />
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span
                          className={`text-xs md:text-sm font-semibold truncate ${
                            isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                          }`}
                        >
                          {language === 'bn' ? symptom.bn : symptom.en}
                        </span>
                        <span
                          className={`text-[10px] truncate ${
                            isSelected ? 'text-emerald-100' : 'text-slate-400'
                          }`}
                        >
                          {language === 'bn' ? symptom.categoryBn : symptom.categoryEn}
                        </span>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected
                          ? 'text-white translate-x-1'
                          : 'text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
