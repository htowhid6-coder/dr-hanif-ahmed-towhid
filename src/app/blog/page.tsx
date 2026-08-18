'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { blogData, BlogPost } from '@/locales/blogData';
import Link from 'next/link';
import supabase from '@/lib/supabase';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function Blog() {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          const mapped: BlogPost[] = data.map(d => ({
            slug: d.slug,
            lang: d.lang,
            title: d.title,
            excerpt: d.excerpt,
            content: d.content,
            date: d.created_at ? d.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
            readTime: d.read_time,
          }));
          setBlogs(mapped);
        } else {
          setBlogs(blogData.filter((post) => post.lang === language));
        }
      } catch (err) {
        console.error("Error loading blogs from Supabase:", err);
        setBlogs(blogData.filter((post) => post.lang === language));
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [language]);

  return (
    <div className="relative min-h-screen flex flex-col antialiased">
      <Navbar />

      {/* Fixed Background Image Layer */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
        <img
          src="/about-bg.jpeg"
          className="w-full h-full object-cover object-center brightness-95 opacity-35 blur-[6px]"
          alt="Clean background"
        />
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[0.5px]"></div>
      </div>

      {/* Scrollable Content */}
      <main className="relative z-10 py-12 px-6 md:px-12 max-w-4xl mx-auto flex flex-col gap-10 w-full">
        {/* Intro */}
        <section className="animate-in fade-in slide-in-from-bottom-5 duration-500">
          <GlassPanel className="flex flex-col gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                <span className="w-6 h-0.5 bg-accent inline-block"></span>
                {language === 'bn' ? 'চিকিৎসা ব্লগ ও সচেতনতা' : 'Health Blog & Awareness'}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-ink">
                {language === 'bn'
                  ? 'ডায়াবেটিস, প্রেসার ও স্বাস্থ্য সচেতনতা বার্তা।'
                  : 'Evidence-Based Medical Advisories & Health Blogs.'}
              </h1>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-muted pt-2 border-t border-line">
              {language === 'bn'
                ? 'ডায়াবেটিস নিয়ন্ত্রণ, উচ্চ রক্তচাপ ব্যবস্থাপনা এবং জ্বর নিরসনে গুরুত্বপূর্ণ স্বাস্থ্য পরামর্শ। সায়েন্টিফিক ও রোগীদের বোঝার সহজ ভাষার সমন্বয়।'
                : 'Learn essential tips regarding blood sugar management, hypertension, and chronic disease care compiled in clear layperson friendly formats.'}
            </p>
          </GlassPanel>
        </section>

        {/* Blog Post List */}
        <section className="flex flex-col gap-6">
          {blogs.map((post) => (
            <GlassPanel
              key={post.slug}
              className="hover:shadow-xl transition-all duration-300 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 text-[10px] text-accent font-bold uppercase tracking-wider">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-accent" />
                    <span>{post.date}</span>
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-accent" />
                    <span>{post.readTime}</span>
                  </span>
                </div>
                <h2 className="font-serif text-xl font-bold text-ink hover:text-accent transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
              </div>

              <p className="text-xs md:text-sm leading-relaxed text-muted">
                {post.excerpt}
              </p>

              <div className="pt-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-ink transition-colors"
                >
                  <span>{language === 'bn' ? 'সম্পূর্ণ আর্টিকেল পড়ুন' : 'Read Full Article'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </GlassPanel>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
