'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { servicesData } from '@/locales/diseaseData';
import Link from 'next/link';
import { Pill, ShieldCheck, CheckCircle2, Phone, MessageCircle, ArrowLeft } from 'lucide-react';

export default function ServiceDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  
  const slug = params.slug as string;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="font-serif text-2xl font-bold text-ink">Service Not Found</h1>
          <button 
            onClick={() => router.push('/services')}
            className="mt-4 px-4 py-2 bg-accent text-white rounded-xl text-xs font-semibold"
          >
            Back to Services
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const detailsMap: Record<string, {
    bullets: { en: string[]; bn: string[] };
    expect: { en: string; bn: string };
  }> = {
    'general-medicine': {
      bullets: {
        en: [
          "Complete health checkups and blood count evaluations",
          "Chronic management: Diabetes, Hypertension, and Gout controls",
          "Rational antibiotic therapy preventing drug resistance",
          "Infectious disease recovery: Dengue, Typhoid, and PUO investigations"
        ],
        bn: [
          "সম্পূর্ণ স্বাস্থ্য পরীক্ষা এবং রক্তের হিমোগ্লোবিন বা লিপিড মূল্যায়ন",
          "দীর্ঘস্থায়ী রোগ নিয়ন্ত্রণ: ডায়াবেটিস, প্রেসার এবং ইউরিক অ্যাসিড নিয়ন্ত্রণ",
          "অ্যান্টিবায়োটিকের অপব্যবহার রোধে সচেতন ও সঠিক থেরাপি",
          "সংক্রামক রোগ নিরাময়: ডেঙ্গু, টাইফয়েড এবং অজানা জ্বরের পরীক্ষা"
        ]
      },
      expect: {
        en: "During your session, Dr. Hanif will audit your past prescriptions, map lifestyle factors, and order targeted lab diagnostics to establish a baseline.",
        bn: "আপনার সেশনের সময়, ডাঃ হানিফ আপনার অতীতের প্রেসক্রিপশনগুলি পর্যালোচনা করবেন, জীবনযাত্রার মানচিত্র তৈরি করবেন এবং রোগ সনাক্তকরণের জন্য লক্ষ্যযুক্ত ল্যাব পরীক্ষা দিবেন।"
      }
    },
    'preventive-health': {
      bullets: {
        en: [
          "Autoimmune marker monitoring (RA factor, Uric Acid, ANA)",
          "Lipid profile tracking and coronary risk estimation",
          "Early diabetic indicator screening (HbA1c monitoring)",
          "Annual kidney function tests and hormonal audits"
        ],
        bn: [
          "অটোইমিউন মার্কার মনিটরিং (RA ফ্যাক্টর, ইউরিক অ্যাসিড, ANA)",
          "লিপিড প্রোফাইল ট্র্যাকিং এবং করোনারি ঝুঁকির প্রাক্কলন",
          "প্রাথমিক ডায়াবেটিস সূচক স্ক্রীনিং (HbA1c মনিটরিং)",
          "বার্ষিক কিডনি ফাংশন পরীক্ষা এবং হরমোন অডিট"
        ]
      },
      expect: {
        en: "A preventive consultation involves analyzing family medical histories, setting healthy health index goals, and establishing review intervals.",
        bn: "একটি প্রতিরোধমূলক কনসাল্টেশনের মধ্যে পারিবারিক চিকিৎসার ইতিহাস বিশ্লেষণ করা, স্বাস্থ্য সূচকের লক্ষ্য নির্ধারণ করা এবং নিয়মিত পরীক্ষার ব্যবধান প্রতিষ্ঠা করা অন্তর্ভুক্ত।"
      }
    }
  };

  const extraDetails = detailsMap[slug] || {
    bullets: { en: [], bn: [] },
    expect: { en: "", bn: "" }
  };

  return (
    <div className="relative min-h-screen flex flex-col antialiased">
      <Navbar />

      {/* Fixed Background Image Layer */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
        <img
          src="/about-bg.jpeg"
          className="w-full h-full object-cover object-center brightness-95 opacity-25 blur-[5px]"
          alt="Clean background"
        />
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[0.5px]"></div>
      </div>

      {/* Scrollable Content */}
      <main className="relative z-10 py-12 px-6 md:px-12 max-w-3xl mx-auto flex flex-col gap-8 w-full">
        {/* Navigation Breadcrumb */}
        <div className="text-xs font-bold text-accent">
          <Link href="/services" className="inline-flex items-center gap-1 hover:text-ink">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'সব সেবাসমূহ' : 'All Services'}</span>
          </Link>
        </div>

        {/* Main Details Panel */}
        <section className="animate-in fade-in slide-in-from-bottom-5 duration-500">
          <GlassPanel className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center text-accent shrink-0">
                {service.slug === 'general-medicine' ? (
                  <Pill className="w-6 h-6" />
                ) : (
                  <ShieldCheck className="w-6 h-6" />
                )}
              </div>
              <div>
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">
                  {language === 'bn' ? 'বিশেষ সেবার বিবরণ' : 'Service Specifications'}
                </span>
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-ink leading-tight mt-0.5">
                  {service.title[language]}
                </h1>
              </div>
            </div>

            <p className="text-sm md:text-base leading-relaxed text-muted pt-4 border-t border-line">
              {service.fullDesc[language]}
            </p>

            {/* List of sub services/features */}
            {extraDetails.bullets[language].length > 0 && (
              <div className="flex flex-col gap-3 mt-2">
                <h3 className="font-serif text-sm font-semibold text-ink">
                  {language === 'bn' ? 'এই সেবার আওতাভুক্ত বিষয়সমূহ:' : 'What is included in this service:'}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {extraDetails.bullets[language].map((bullet, idx) => (
                    <li key={idx} className="text-xs text-muted flex items-start gap-2 bg-white/30 p-2.5 rounded-xl border border-panel-border">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What to expect */}
            {extraDetails.expect[language] && (
              <div className="mt-2 pt-4 border-t border-line">
                <h3 className="font-serif text-sm font-semibold text-ink mb-1">
                  {language === 'bn' ? 'সেশনে যা প্রত্যাশা করবেন:' : 'What to expect during session:'}
                </h3>
                <p className="text-xs leading-relaxed text-muted">
                  {extraDetails.expect[language]}
                </p>
              </div>
            )}
          </GlassPanel>
        </section>

        {/* Dynamic CTA Card */}
        <section className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 border border-panel-border bg-accent/5">
          <div>
            <h3 className="font-serif text-base font-bold text-ink">
              {language === 'bn' ? 'এই সেবার জন্য সিরিয়াল নিন' : 'Request Slots for this Service'}
            </h3>
            <p className="text-[10px] text-muted">
              {language === 'bn' ? 'চেম্বারের রোগী দেখার সময়ে সিরিয়ালের জন্য এখনই কল করুন।' : 'Call or WhatsApp during visiting hours to secure your appointment.'}
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="tel:+8801346132486"
              className="inline-flex items-center gap-1.5 bg-accent hover:bg-ink text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md cursor-pointer transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'কল করুন' : 'Call'}</span>
            </a>
            <a
              href="https://wa.me/8801346132486"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-accent hover:bg-ink text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md cursor-pointer transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
