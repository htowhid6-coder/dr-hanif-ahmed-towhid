'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { blogData, BlogPost } from '@/locales/blogData';
import Link from 'next/link';
import supabase from '@/lib/supabase';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  Sparkles, 
  BookOpen, 
  UserCheck, 
  Tag, 
  Flame, 
  Activity, 
  Stethoscope,
  HeartPulse,
  Phone,
  MessageCircle,
  Share2,
  CheckCircle2,
  X
} from 'lucide-react';

export default function Blog() {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [heroInView, setHeroInView] = useState(false);

  useEffect(() => {
    setHeroInView(true);
    async function fetchBlogs() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('lang', language)
          .eq('is_published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          const mapped: BlogPost[] = data.map((d, index) => {
            const localFallback = blogData.find(p => p.slug === d.slug);
            return {
              slug: d.slug,
              lang: d.lang,
              title: d.title,
              excerpt: d.excerpt,
              content: d.content,
              date: d.created_at ? d.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
              readTime: d.read_time || '5 min read',
              image: d.image_url || localFallback?.image || '/blogs/diabetes_care_guide.jpg',
              category: d.category || localFallback?.category || 'General Medicine',
              categoryBn: d.category_bn || localFallback?.categoryBn || 'মেডিসিন পরামর্শ',
              featured: index === 0 || localFallback?.featured || false
            };
          });
          setBlogs(mapped);
        } else {
          setBlogs(blogData.filter((post) => post.lang === language));
        }
      } catch (err) {
        console.error("Error loading blogs:", err);
        setBlogs(blogData.filter((post) => post.lang === language));
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [language]);

  // Extract categories dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach(b => {
      if (b.category) set.add(b.category);
    });
    return Array.from(set);
  }, [blogs]);

  // Filter blogs based on Search & Category
  const filteredBlogs = useMemo(() => {
    return blogs.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const titleMatch = post.title.toLowerCase().includes(query);
      const excerptMatch = post.excerpt.toLowerCase().includes(query);
      const catMatch = (post.category || '').toLowerCase().includes(query) || (post.categoryBn || '').toLowerCase().includes(query);

      return matchesCategory && (titleMatch || excerptMatch || catMatch);
    });
  }, [blogs, selectedCategory, searchQuery]);

  // Featured / Spotlight post
  const featuredPost = useMemo(() => {
    return filteredBlogs.find(p => p.featured) || filteredBlogs[0] || blogs[0];
  }, [filteredBlogs, blogs]);

  // Other posts (excluding current spotlight if spotlight shown)
  const remainingPosts = useMemo(() => {
    if (!featuredPost) return filteredBlogs;
    return filteredBlogs.filter(p => p.slug !== featuredPost.slug);
  }, [filteredBlogs, featuredPost]);

  return (
    <div className="relative min-h-screen flex flex-col antialiased bg-background text-ink selection:bg-accent/20">
      <Navbar />

      {/* Ambient Animated Gradient Background Glow */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-emerald-400/6 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(47,111,95,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
      </div>

      {/* Main Container */}
      <main className="relative z-10 py-10 md:py-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-10 w-full">
        
        {/* 1. HERO HEADER SECTION */}
        <section className={`flex flex-col gap-6 text-center max-w-4xl mx-auto transition-all duration-700 ease-out transform ${
          heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-panel-border text-accent text-xs font-bold uppercase tracking-wider mx-auto shadow-sm backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>{language === 'bn' ? 'চিকিৎসা ব্লগ ও সচেতনতামূলক নিবন্ধ' : 'Medical Insights & Clinical Articles'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-tight">
            {language === 'bn'
              ? 'সুস্থ জীবনের জন্য বিজ্ঞানসম্মত চিকিৎসা বার্তা'
              : 'Evidence-Based Medicine & Patient Health Advisories'}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-muted max-w-2xl mx-auto leading-relaxed">
            {language === 'bn'
              ? 'ডায়াবেটিস, প্রেসার, থাইরয়েড ও জটিল মেডিসিন রোগের সঠিক পরিচর্যা ও চিকিৎসা বিশ্লেষণ। ডা. হানিফ আহমেদ তৌহিদের সার্বিক নির্দেশনায় রচিত।'
              : 'Clinical guidance on chronic metabolic disorders, cardiovascular health, and rational medical care curated by Dr. Hanif Ahmed Towhid.'}
          </p>

          {/* Search & Category Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-lg mt-2 w-full">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'bn' ? 'ব্লগ অনুসন্ধান করুন (যেমন: ডায়াবেটিস, প্রেসার)...' : 'Search health articles...'}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-white/90 text-xs text-ink placeholder:text-muted focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills (Horizontal scrollable) */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 custom-scrollbar">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-accent text-white shadow-md shadow-accent/25 scale-105'
                    : 'bg-white/70 hover:bg-white text-muted hover:text-ink border border-line/60'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'সকল' : 'All'}</span>
                <span className="text-[10px] opacity-75 font-mono">({blogs.length})</span>
              </button>

              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                const samplePost = blogs.find(b => b.category === cat);
                const count = blogs.filter(b => b.category === cat).length;
                const label = language === 'bn' ? (samplePost?.categoryBn || cat) : cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? 'bg-accent text-white shadow-md shadow-accent/25 scale-105'
                        : 'bg-white/70 hover:bg-white text-muted hover:text-ink border border-line/60'
                    }`}
                  >
                    <span>{label}</span>
                    <span className="text-[10px] opacity-75 font-mono">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 2. SPOTLIGHT / FEATURED ARTICLE SHOWCASE */}
        {featuredPost && (
          <section className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block relative rounded-3xl overflow-hidden border border-white/90 bg-white/75 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-accent/40 transition-all duration-500 transform hover:-translate-y-1"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Visual Image Banner with Subtle Zoom */}
                <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] overflow-hidden bg-slate-900">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden" />
                  
                  {/* Floating Highlight Pill */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-white text-[11px] font-bold uppercase tracking-wider shadow-md backdrop-blur-md">
                      <Flame className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                      <span>{language === 'bn' ? 'প্রধান ফিচার্ড আর্টিকেল' : 'Featured Spotlight'}</span>
                    </span>
                  </div>
                </div>

                {/* Content Panel */}
                <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-6 bg-gradient-to-b from-white/90 to-white/70">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted font-semibold">
                      <span className="text-[11px] font-bold text-accent uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-lg">
                        {language === 'bn' ? featuredPost.categoryBn : featuredPost.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        <span>{featuredPost.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        <span>{featuredPost.readTime}</span>
                      </span>
                    </div>

                    <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-ink group-hover:text-accent transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-3 sm:line-clamp-4 font-normal">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  {/* Doctor Author Credit & Read Action */}
                  <div className="flex items-center justify-between border-t border-line/60 pt-4 mt-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center text-accent font-bold text-xs shadow-sm">
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-ink">
                          {language === 'bn' ? 'ডা. হানিফ আহমেদ তৌহিদ' : 'Dr. Hanif Ahmed Towhid'}
                        </span>
                        <span className="text-[10px] text-muted">
                          {language === 'bn' ? 'মেডিসিন বিশেষজ্ঞ' : 'Medicine Specialist'}
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-white font-semibold text-xs shadow-md group-hover:bg-ink group-hover:shadow-lg transition-all duration-300">
                      <span>{language === 'bn' ? 'সম্পূর্ণ পড়ুন' : 'Read Article'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* 3. ARTICLES GRID */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-line/60 pb-3">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              <span>{language === 'bn' ? 'সকল স্বাস্থ্য নিবন্ধসমূহ' : 'All Health Articles'}</span>
            </h3>
            <span className="text-xs text-muted font-mono font-semibold">
              {filteredBlogs.length} {language === 'bn' ? 'টি আর্টিকেল' : 'Articles'}
            </span>
          </div>

          {remainingPosts.length === 0 && (
            <div className="text-center py-16 p-8 rounded-3xl bg-white/60 border border-panel-border">
              <Activity className="w-10 h-10 text-muted mx-auto mb-3 opacity-40 animate-pulse" />
              <h4 className="font-serif text-lg font-bold text-ink">
                {language === 'bn' ? 'কোনো আর্টিকেল পাওয়া যায়নি' : 'No articles found'}
              </h4>
              <p className="text-xs text-muted mt-1">
                {language === 'bn' ? 'ভিন্ন কোনো কি-ওয়ার্ড দিয়ে আবার অনুসন্ধান করুন।' : 'Try searching with another keyword or select all categories.'}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {remainingPosts.map((post, idx) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="group flex flex-col justify-between rounded-3xl overflow-hidden border border-white/85 bg-white/75 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-accent/40 transition-all duration-300 hover:-translate-y-1.5 animate-in fade-in duration-500 cursor-pointer"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 shadow-md">
                        {language === 'bn' ? post.categoryBn : post.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-[11px] text-muted font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-accent" />
                        <span>{post.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-accent" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h4 className="font-serif text-base sm:text-lg font-bold text-ink group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h4>

                    <p className="text-xs text-muted leading-relaxed line-clamp-3 font-normal">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 sm:p-6 pt-0 border-t border-line/40 flex items-center justify-between mt-2">
                  <span className="text-[11px] font-semibold text-accent group-hover:text-ink transition-colors flex items-center gap-1">
                    <span>{language === 'bn' ? 'বিস্তারিত পড়ুন' : 'Read Article'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <span className="w-7 h-7 rounded-full bg-accent/10 group-hover:bg-accent group-hover:text-white text-accent flex items-center justify-center transition-colors">
                    <BookOpen className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. CLINICAL CONSULTATION & CHAMBER CTA */}
        <section className="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl border border-panel-border bg-gradient-to-r from-accent/15 via-accent/5 to-white/80 mt-6">
          <div className="text-center md:text-left flex flex-col gap-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider justify-center md:justify-start">
              <Stethoscope className="w-4 h-4" />
              <span>{language === 'bn' ? 'সরাসরি বিশেষজ্ঞ পরামর্শ' : 'Specialist Consultation'}</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              {language === 'bn'
                ? 'ডায়াবেটিস ও ক্রনিক রোগের সঠিক ডোজ নির্ধারণে চেম্বারে দেখান'
                : 'Personalized Medical Management by Dr. Hanif Ahmed Towhid'}
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              {language === 'bn'
                ? 'পপুলার মেডিকেল সেন্টার (৬ষ্ঠ তলা, রুম ৬০৫), কাজলশাহ, সিলেট। রোগী দেখার দিন সকাল ৯টার পর সিরিয়াল নিশ্চিত করুন।'
                : 'Popular Medical Center Ltd. (Room #605), Kazalshah, Sylhet. Daily visiting hours 5:00 PM – 9:00 PM (Friday & Tuesday Closed).'}
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

      </main>

      <Footer />
    </div>
  );
}
