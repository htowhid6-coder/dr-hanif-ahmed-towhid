'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { faqsData, faqCategories, FAQItem } from '@/data/faqsData';
import supabase from '@/lib/supabase';
import { 

  ChevronDown, 
  Phone, 
  MessageCircle, 
  Search, 
  HelpCircle,
  Clock,
  UserCheck,
  FileText,
  AlertCircle,
  HeartPulse,
  X,
  ChevronsUpDown,
  Sparkles
} from 'lucide-react';

interface FAQCardProps {
  faq: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  language: 'en' | 'bn';
}

function FAQCard({ faq, index, isOpen, onToggle, language }: FAQCardProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasScrolledIntoView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentRef = itemRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={itemRef}
      style={{
        transitionDelay: `${(index % 6) * 45}ms`,
      }}
      className={`border rounded-2xl overflow-hidden transition-all duration-500 transform ${
        hasScrolledIntoView
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-6 scale-[0.98]'
      } ${
        isOpen
          ? 'border-accent/50 bg-white/75 shadow-lg shadow-accent/5 ring-1 ring-accent/20'
          : 'border-panel-border bg-white/35 hover:bg-white/55 hover:border-panel-border/80'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full p-4.5 md:p-5 flex justify-between items-start text-left cursor-pointer gap-4 transition-colors group"
      >
        <div className="flex items-start gap-3.5">
          <span
            className={`flex items-center justify-center w-7 h-7 rounded-xl text-xs font-bold shrink-0 mt-0.5 transition-all duration-300 ${
              isOpen
                ? 'bg-accent text-white shadow-sm scale-105'
                : 'bg-accent/15 text-accent group-hover:bg-accent/25'
            }`}
          >
            {index + 1}
          </span>
          <div>
            <span className="font-serif text-sm md:text-base font-bold text-ink leading-snug block group-hover:text-accent transition-colors">
              {faq.q[language]}
            </span>
          </div>
        </div>

        <span
          className={`p-1.5 rounded-xl shrink-0 transition-all duration-300 ${
            isOpen
              ? 'bg-accent text-white rotate-180 shadow-sm'
              : 'text-muted bg-white/40 group-hover:bg-accent/10 group-hover:text-accent'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </span>
      </button>

      {/* Smooth fluid height transition using modern CSS grid technique */}
      <div
        className={`grid transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen
            ? 'grid-rows-[1fr] opacity-100 pb-5'
            : 'grid-rows-[0fr] opacity-0 pb-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-3 sm:px-5 pt-3 border-t border-line/10 text-xs md:text-sm text-muted leading-relaxed">
            <div className="pl-0 sm:pl-10 pr-0 sm:pr-2">
              <p className="text-ink/90 whitespace-pre-line leading-relaxed font-normal bg-accent/5 p-3.5 sm:p-4 rounded-xl border border-accent/10">
                {faq.a[language]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { language } = useLanguage();
  const [faqs, setFaqs] = useState<FAQItem[]>(faqsData);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  useEffect(() => {
    const loadFaqs = async () => {
      // 1. LocalStorage
      if (typeof window !== 'undefined') {
        const local = localStorage.getItem('faqs_data');
        if (local) {
          try {
            const parsed = JSON.parse(local);
            if (Array.isArray(parsed) && parsed.length > 0) setFaqs(parsed);
          } catch (e) {}
        }
      }

      // 2. Supabase
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .order('order_index', { ascending: true });

        if (!error && data && data.length > 0) {
          const mapped: FAQItem[] = data.map((d: any, idx: number) => ({
            id: d.id || idx + 1,
            category: d.category || 'chamber',
            q: { en: d.q_en, bn: d.q_bn },
            a: { en: d.a_en, bn: d.a_bn }
          }));
          setFaqs(mapped);
          if (typeof window !== 'undefined') {
            localStorage.setItem('faqs_data', JSON.stringify(mapped));
          }
        }
      } catch (err) {}
    };

    loadFaqs();

    const handleUpdate = () => loadFaqs();
    window.addEventListener('faqs_updated', handleUpdate);
    return () => window.removeEventListener('faqs_updated', handleUpdate);
  }, []);

  // Map category icons
  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'chamber':
        return <Clock className="w-3.5 h-3.5" />;
      case 'specialization':
        return <UserCheck className="w-3.5 h-3.5" />;
      case 'consultation':
        return <FileText className="w-3.5 h-3.5" />;
      case 'emergency':
        return <AlertCircle className="w-3.5 h-3.5" />;
      case 'advice':
        return <HeartPulse className="w-3.5 h-3.5" />;
      default:
        return <HelpCircle className="w-3.5 h-3.5" />;
    }
  };

  // Filter FAQs based on category and search query
  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const qEn = (item.q?.en || '').toLowerCase();
      const qBn = (item.q?.bn || '').toLowerCase();
      const aEn = (item.a?.en || '').toLowerCase();
      const aBn = (item.a?.bn || '').toLowerCase();

      const matchesSearch =
        qEn.includes(query) ||
        qBn.includes(query) ||
        aEn.includes(query) ||
        aBn.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [faqs, selectedCategory, searchQuery]);

  // Toggle single item
  const toggleFaq = (index: number) => {
    if (openIndexes.includes(index)) {

      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  // Toggle all items
  const toggleAll = () => {
    if (openIndexes.length === filteredFaqs.length) {
      setOpenIndexes([]);
    } else {
      setOpenIndexes(filteredFaqs.map((_, i) => i));
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col antialiased">
      <Navbar />

      {/* Fixed Background Image Layer */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src="/about-bg.jpeg"
          className="w-full h-full object-cover object-center brightness-95 opacity-25 blur-[5px]"
          alt="Clean background"
        />
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[0.5px]"></div>
      </div>

      {/* Scrollable Content */}
      <main className="relative z-10 py-10 md:py-14 px-4 md:px-8 max-w-4xl mx-auto flex flex-col gap-8 w-full">
        {/* Header section */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <GlassPanel className="flex flex-col gap-6 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                  <span className="w-6 h-0.5 bg-accent inline-block"></span>
                  <Sparkles className="w-3.5 h-3.5" />
                  {language === 'bn' ? 'সাধারণ জিজ্ঞাসা ও নির্দেশিকা' : 'Patient Advisory & FAQs'}
                </span>
                <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-ink">
                  {language === 'bn' ? 'রোগীদের প্রয়োজনীয় প্রশ্নোত্তর' : 'Frequently Asked Questions'}
                </h1>
                <p className="text-xs md:text-sm text-muted mt-2 max-w-2xl">
                  {language === 'bn'
                    ? 'ডা. হানিফ আহমেদ তৌহিদের চেম্বার সময়সূচী, সিরিয়াল বুকিং, রোগের চিকিৎসা ও রিপোর্ট দেখানো সম্পর্কিত যাবতীয় তথ্য জেনে নিন।'
                    : 'Find verified answers to common questions about chamber timings, serial booking, medical consultations, and report reviews.'}
                </p>
              </div>

              {/* Total count badge */}
              <div className="flex items-center gap-2 self-start md:self-auto bg-accent/10 text-accent font-semibold text-xs px-3.5 py-2 rounded-full border border-accent/20">
                <HelpCircle className="w-4 h-4" />
                <span>
                  {language === 'bn' 
                    ? `মোট ২০টি প্রশ্নোত্তর` 
                    : `20 Advisory FAQs`}
                </span>
              </div>
            </div>

            {/* Live Search Box */}
            <div className="relative mt-2">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-accent absolute left-4.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    language === 'bn'
                      ? 'যেকোনো বিষয় খুঁজুন (উদাঃ সিরিয়াল, সময়, রিপোর্ট, ডায়াবেটিস, ফি...)'
                      : 'Search topics (e.g., serial, timings, reports, diabetes, emergency...)'
                  }
                  className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-panel-border focus:border-accent focus:bg-white focus:outline-none text-xs md:text-sm text-ink placeholder:text-muted/60 transition-all shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 p-1.5 rounded-lg hover:bg-black/5 text-muted hover:text-ink transition-colors cursor-pointer"
                    title={language === 'bn' ? 'সার্চ মুছুন' : 'Clear search'}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-line/60">
              {faqCategories.map((category) => {
                const isActive = selectedCategory === category.id;
                const count =
                  category.id === 'all'
                    ? faqsData.length
                    : faqsData.filter((f) => f.category === category.id).length;

                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none ${
                      isActive
                        ? 'bg-accent text-white shadow-md shadow-accent/20 scale-[1.02]'
                        : 'bg-white/40 text-ink hover:bg-white/70 border border-panel-border'
                    }`}
                  >
                    {getCategoryIcon(category.id)}
                    <span>{category.label[language]}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-accent/10 text-accent font-bold'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Results status & Expand All button */}
            <div className="flex items-center justify-between text-xs text-muted pt-1">
              <span>
                {language === 'bn'
                  ? `ফলাফল: ${filteredFaqs.length}টি প্রশ্ন দেখানো হচ্ছে`
                  : `Showing ${filteredFaqs.length} question${filteredFaqs.length !== 1 ? 's' : ''}`}
              </span>

              {filteredFaqs.length > 0 && (
                <button
                  onClick={toggleAll}
                  className="inline-flex items-center gap-1 text-accent hover:text-ink font-semibold hover:underline cursor-pointer transition-colors"
                >
                  <ChevronsUpDown className="w-3.5 h-3.5" />
                  <span>
                    {openIndexes.length === filteredFaqs.length
                      ? (language === 'bn' ? 'সবগুলো বন্ধ করুন' : 'Collapse All')
                      : (language === 'bn' ? 'সবগুলো খুলুন' : 'Expand All')}
                  </span>
                </button>
              )}
            </div>

            {/* Accordion List with Scroll Reveal and Smooth Transitions */}
            <div className="flex flex-col gap-3.5 pt-2">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-2xl bg-white/20 border border-dashed border-panel-border flex flex-col items-center gap-3">
                  <HelpCircle className="w-10 h-10 text-accent/50" />
                  <p className="text-sm font-semibold text-ink">
                    {language === 'bn'
                      ? 'আপনার অনুসন্ধানের সাথে কোনো প্রশ্নোত্তর মেলেনি'
                      : 'No questions matched your search criteria'}
                  </p>
                  <p className="text-xs text-muted max-w-sm">
                    {language === 'bn'
                      ? 'বানান যাচাই করে আবার চেষ্টা করুন অথবা অন্য ক্যাটাগরি বেছে নিন।'
                      : 'Try checking for typos or explore all categories.'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-2 text-xs font-semibold text-accent hover:underline cursor-pointer"
                  >
                    {language === 'bn' ? 'সব প্রশ্ন দেখুন' : 'Reset and view all FAQs'}
                  </button>
                </div>
              ) : (
                filteredFaqs.map((faq, idx) => (
                  <FAQCard
                    key={faq.id || idx}
                    faq={faq}
                    index={idx}
                    isOpen={openIndexes.includes(idx)}
                    onToggle={() => toggleFaq(idx)}
                    language={language}
                  />
                ))
              )}
            </div>
          </GlassPanel>
        </section>

        {/* CTA Card */}
        <section className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 border border-panel-border bg-gradient-to-r from-accent/10 via-accent/5 to-transparent shadow-sm">
          <div className="text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent block mb-1">
              {language === 'bn' ? 'সরাসরি সহায়তা' : 'Direct Chamber Assistance'}
            </span>
            <h3 className="font-serif text-lg md:text-xl font-bold text-ink">
              {language === 'bn' ? 'নির্দিষ্ট কোনো প্রশ্ন আছে?' : 'Have any further questions?'}
            </h3>
            <p className="text-xs text-muted mt-1 max-w-md">
              {language === 'bn'
                ? 'সিরিয়াল, চেম্বার অবস্থান বা জরুরি যে কোনো তথ্যের জন্য আমাদের সাপোর্ট নাম্বারে সরাসরি কল বা হোয়াটসঅ্যাপ করুন।'
                : 'For appointments, chamber directions, or immediate queries, contact our desk staff during chamber hours.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+8801346132486"
              className="inline-flex items-center gap-2 bg-ink hover:bg-accent text-white text-xs font-semibold px-4.5 py-3 rounded-xl shadow-md hover:-translate-y-0.5 cursor-pointer transition-all whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span>{language === 'bn' ? 'সরাসরি কল দিন' : 'Call Desk'}</span>
            </a>
            <a
              href="https://wa.me/8801346132486"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent hover:bg-ink text-white text-xs font-semibold px-4.5 py-3 rounded-xl shadow-md hover:-translate-y-0.5 cursor-pointer transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
