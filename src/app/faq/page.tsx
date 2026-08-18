'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { ChevronDown, ChevronUp, Phone, MessageCircle } from 'lucide-react';

export default function FAQ() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: {
        en: "Where does Dr. Hanif Ahmed Towhid see patients?",
        bn: "ডা. হানিফ আহমেদ তৌহিদ কোথায় রোগী দেখেন?"
      },
      a: {
        en: "He sees patients in his private chamber at Popular Medical Center Ltd., Sylhet (6th Floor, Room No-605, New Medical Road, Kazalshah, Sylhet).",
        bn: "তিনি সিলেটের কাজলশাহের নিউ মেডিকেল রোডে অবস্থিত পপুলার মেডিকেল সেন্টার লিমিটেডে (৬ষ্ঠ তলা, রুম নং-৬০৫) নিয়মিত রোগী দেখেন।"
      }
    },
    {
      q: {
        en: "What are the chamber visiting hours?",
        bn: "চেম্বারে রোগী দেখার সময় কখন?"
      },
      a: {
        en: "Dr. Hanif is available from 5:00 PM to 9:00 PM daily. The chamber remains closed on Fridays.",
        bn: "প্রতিদিন বিকাল ৫:০০টা থেকে রাত ৯:০০টা পর্যন্ত তিনি রোগী দেখেন। প্রতি শুক্রবার চেম্বার বন্ধ থাকে।"
      }
    },
    {
      q: {
        en: "How can I book a serial/ticket for consultation?",
        bn: "সিরিয়াল বা টিকিট কিভাবে সংগ্রহ করব?"
      },
      a: {
        en: "You can call 01346-132486 starting at 9:00 AM on the day of the appointment to book your serial slot.",
        bn: "রোগী দেখানোর দিন সকাল ৯:০০টার পর সরাসরি ০১৩৪৬-১৩২৪৮৬ নম্বরে কল করে আপনার সিরিয়াল বুক করতে পারবেন।"
      }
    },
    {
      q: {
        en: "What is Dr. Hanif's hospital affiliation?",
        bn: "তিনি বর্তমানে কোন সরকারি হাসপাতালে কর্মরত আছেন?"
      },
      a: {
        en: "He serves as a Registrar in the Department of Medicine at Sylhet MAG Osmani Medical College Hospital.",
        bn: "তিনি সিলেট এমএজি ওসমানী মেডিকেল কলেজ হাসপাতালের মেডিসিন বিভাগের একজন রেজিস্ট্রার হিসেবে কর্মরত আছেন।"
      }
    },
    {
      q: {
        en: "What conditions does he treat?",
        bn: "তিনি কোন কোন রোগের চিকিৎসা করেন?"
      },
      a: {
        en: "He treats a wide range of adult internal medicine conditions, including diabetes, hypertension, thyroid and hormonal disorders, fever and infections, and joint or body pain. His post-graduate qualifications (MCPS and FCPS in Medicine) allow him to diagnose and manage complex chronic medical conditions.",
        bn: "তিনি প্রাপ্তবয়স্কদের বিভিন্ন মেডিসিন সংক্রান্ত সমস্যার চিকিৎসা করেন, যেমন ডায়াবেটিস, উচ্চ রক্তচাপ, থাইরয়েড ও হরমোনজনিত সমস্যা, জ্বর ও ইনফেকশন, এবং জয়েন্ট বা শরীরের ব্যথা। মেডিসিনে তাঁর উচ্চতর ডিগ্রি (MCPS এবং FCPS) তাঁকে জটিল দীর্ঘস্থায়ী রোগ নির্ণয় ও চিকিৎসায় সক্ষম করে।"
      }
    }
  ];

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
        <section className="animate-in fade-in slide-in-from-bottom-5 duration-500">
          <GlassPanel className="flex flex-col gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                <span className="w-6 h-0.5 bg-accent inline-block"></span>
                {language === 'bn' ? 'সাধারণ জিজ্ঞাসা' : 'Common Inquiries'}
              </span>
              <h1 className="font-serif text-2xl md:text-3xl font-bold leading-tight text-ink">
                {language === 'bn' ? 'রোগীদের সাহায্যকারী প্রশ্নোত্তর' : 'Patient Advisory & FAQs'}
              </h1>
            </div>

            {/* Accordion List */}
            <div className="flex flex-col gap-4 pt-4 border-t border-line">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-panel-border rounded-xl overflow-hidden bg-white/20 transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full p-4 flex justify-between items-center text-left hover:bg-white/40 transition-colors cursor-pointer"
                    >
                      <span className="font-serif text-sm md:text-base font-bold text-ink pr-4">
                        {faq.q[language]}
                      </span>
                      <span className="text-accent shrink-0">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-line/10 text-xs md:text-sm text-muted leading-relaxed bg-white/10 animate-in slide-in-from-top-2 duration-200">
                        {faq.a[language]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </GlassPanel>
        </section>

        {/* CTA Card */}
        <section className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 border border-panel-border bg-accent/5">
          <div>
            <h3 className="font-serif text-base font-bold text-ink">
              {language === 'bn' ? 'অন্য কোনো প্রশ্ন আছে?' : 'Have other questions?'}
            </h3>
            <p className="text-[10px] text-muted">
              {language === 'bn' ? 'যেকোনো জিজ্ঞাসায় বা অ্যাপয়েন্টমেন্টের তথ্যের জন্য সরাসরি চেম্বার নাম্বারে কল দিন।' : 'Feel free to contact our chamber support staff during business hours.'}
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="tel:+8801346132486"
              className="inline-flex items-center gap-1.5 bg-accent hover:bg-ink text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md cursor-pointer transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'কল করুন' : 'Call'}</span>
            </a>
            <a
              href="https://wa.me/8801346132486"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-accent hover:bg-ink text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md cursor-pointer transition-colors whitespace-nowrap"
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
