'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { blogData, BlogPost } from '@/locales/blogData';
import Link from 'next/link';
import supabase from '@/lib/supabase';
import { ArrowLeft, Calendar, Clock, Phone, MessageCircle } from 'lucide-react';

export default function BlogPostDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        if (data) {
          setPost({
            slug: data.slug,
            lang: data.lang,
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            date: data.created_at ? data.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
            readTime: data.read_time
          });
        } else {
          const local = blogData.find(p => p.slug === slug);
          setPost(local || null);
        }
      } catch (err) {
        console.error("Error loading blog details from Supabase:", err);
        const local = blogData.find(p => p.slug === slug);
        setPost(local || null);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full mb-2"></div>
          <p className="text-xs text-muted">Loading article...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="font-serif text-2xl font-bold text-ink">Article Not Found</h1>
          <button 
            onClick={() => router.push('/blog')}
            className="mt-4 px-4 py-2 bg-accent text-white rounded-xl text-xs font-semibold"
          >
            Back to Blog
          </button>
        </main>
        <Footer />
      </div>
    );
  }

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
          <Link href="/blog" className="inline-flex items-center gap-1 hover:text-ink">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'সব ব্লগ ও আর্টিকেল' : 'All Blog Articles'}</span>
          </Link>
        </div>

        {/* Main Details Panel */}
        <section className="animate-in fade-in slide-in-from-bottom-5 duration-500">
          <GlassPanel className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
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
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-ink leading-tight">
                {post.title}
              </h1>
            </div>

            {/* Render blog post HTML content */}
            <div 
              className="prose prose-sm max-w-none text-muted leading-relaxed pt-6 border-t border-line space-y-4
                prose-headings:font-serif prose-headings:text-ink prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-2
                prose-h2:text-lg prose-h2:md:text-xl
                prose-p:text-xs prose-p:md:text-sm
                prose-ul:list-disc prose-ul:list-inside prose-ul:space-y-1 prose-ul:text-xs"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </GlassPanel>
        </section>

        {/* CTA Card */}
        <section className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 border border-panel-border bg-accent/5">
          <div>
            <h3 className="font-serif text-base font-bold text-ink">
              {language === 'bn' ? 'ডাক্তারের সাথে চেম্বারে পরামর্শ করুন' : 'Consult with the Doctor'}
            </h3>
            <p className="text-[10px] text-muted">
              {language === 'bn' ? 'ডায়াবেটিস, প্রেসার বা মাথাব্যথার চিকিৎসার সঠিক ডোজ নির্ধারণে চেম্বারে সিরিয়াল নিন।' : 'Book slots for in-person review regarding custom dosage adjustments.'}
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
