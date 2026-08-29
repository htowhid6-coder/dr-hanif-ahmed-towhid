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
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Phone, 
  MessageCircle, 
  Stethoscope, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  UserCheck, 
  Building2,
  ChevronRight
} from 'lucide-react';

export default function BlogPostDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      try {
        const decodedSlug = decodeURIComponent(slug).toLowerCase().trim();

        // 1. Try exact slug match in Supabase
        let { data } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', decodedSlug)
          .maybeSingle();

        // 2. If not found, try single-hyphen normalized match
        if (!data) {
          const normalizedSlug = decodedSlug.replace(/-+/g, '-');
          const res = await supabase
            .from('posts')
            .select('*')
            .eq('slug', normalizedSlug)
            .maybeSingle();
          data = res.data;
        }

        // 3. If still not found, fetch all posts and find matching post (handling extra hyphens or encoding variations)
        if (!data) {
          const { data: allPosts } = await supabase.from('posts').select('*');
          if (allPosts && allPosts.length > 0) {
            const targetNorm = decodedSlug.replace(/[^a-z0-9]/g, '');
            data = allPosts.find((p: any) => {
              const pNorm = (p.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
              return pNorm === targetNorm || (pNorm.length > 10 && (pNorm.includes(targetNorm) || targetNorm.includes(pNorm)));
            });
          }
        }

        // Check local static fallback
        const local = blogData.find(p => 
          p.slug === decodedSlug || 
          p.slug.toLowerCase().replace(/-+/g, '-') === decodedSlug.replace(/-+/g, '-')
        );

        if (data) {
          setPost({
            slug: data.slug,
            lang: data.lang,
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            date: data.created_at ? data.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
            readTime: data.read_time || '5 min read',
            image: data.image_url || local?.image || '/blogs/diabetes_care_guide.jpg',
            category: data.category || local?.category || 'General Medicine',
            categoryBn: data.category_bn || local?.categoryBn || 'মেডিসিন পরামর্শ',
          });
        } else if (local) {
          setPost(local);
        } else {
          setPost(null);
        }
      } catch (err) {
        console.error("Error loading blog details:", err);
        const decodedSlug = decodeURIComponent(slug).toLowerCase().trim();
        const local = blogData.find(p => p.slug === decodedSlug);
        setPost(local || null);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  // Related articles
  const relatedPosts = blogData
    .filter(p => p.lang === language && p.slug !== slug)
    .slice(0, 2);

  const handleShare = async () => {
    if (typeof window !== 'undefined') {
      if (navigator.share) {
        try {
          await navigator.share({
            title: post?.title,
            text: post?.excerpt,
            url: window.location.href,
          });
        } catch {
          // fallback
        }
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col antialiased bg-background">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="animate-spin w-10 h-10 border-4 border-accent border-t-transparent rounded-full mb-3 shadow-md"></div>
          <p className="text-xs text-muted font-medium">Loading clinical article...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col antialiased bg-background">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="font-serif text-2xl font-bold text-ink">Article Not Found</h1>
          <p className="text-xs text-muted mt-2">The requested medical advisory could not be found.</p>
          <button 
            onClick={() => router.push('/blog')}
            className="mt-5 px-5 py-2.5 bg-accent text-white rounded-xl text-xs font-semibold shadow-md hover:bg-ink transition-colors cursor-pointer"
          >
            Back to All Articles
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col antialiased bg-background text-ink selection:bg-accent/20">
      <Navbar />

      {/* Ambient background glow */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[120px]" />
      </div>

      {/* Scrollable Content */}
      <main className="relative z-10 py-10 md:py-16 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto flex flex-col gap-8 w-full">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 text-xs font-bold text-accent">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/70 hover:bg-white border border-panel-border text-ink hover:text-accent shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-accent" />
            <span>{language === 'bn' ? 'সকল ব্লগ ও আর্টিকেল' : 'All Health Articles'}</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/70 hover:bg-white border border-panel-border text-ink hover:text-accent shadow-xs transition-all cursor-pointer text-xs"
          >
            <Share2 className="w-3.5 h-3.5 text-accent" />
            <span>{copied ? (language === 'bn' ? 'লিংক কপি হয়েছে!' : 'Copied!') : (language === 'bn' ? 'শেয়ার করুন' : 'Share')}</span>
          </button>
        </div>

        {/* 1. ARTICLE HERO HEADER & IMAGE */}
        <article className="animate-in fade-in slide-in-from-bottom-4 duration-600">
          <GlassPanel className="flex flex-col gap-6 p-6 sm:p-8 md:p-10 border border-white/90 bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl">
            
            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted font-semibold">
              <span className="text-[11px] font-bold text-accent uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-lg">
                {language === 'bn' ? (post.categoryBn || 'মেডিসিন পরামর্শ') : (post.category || 'Clinical Health')}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                <span>{post.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>{post.readTime}</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-ink leading-tight">
              {post.title}
            </h1>

            {/* Author Credit Badge */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/80 border border-panel-border shadow-xs">
              <div className="w-11 h-11 rounded-2xl bg-accent text-white flex items-center justify-center text-accent font-bold text-xs shadow-sm shrink-0">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-ink truncate">
                    {language === 'bn' ? 'ডা. হানিফ আহমেদ তৌহিদ' : 'Dr. Hanif Ahmed Towhid'}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 shrink-0">
                    {language === 'bn' ? 'বিশেষজ্ঞ পরামর্শ' : 'Specialist Author'}
                  </span>
                </div>
                <span className="text-[11px] text-muted truncate">
                  {language === 'bn'
                    ? 'MBBS, বিসিএস (স্বাস্থ্য), MCPS, FCPS (মেডিসিন) · মেডিসিন বিশেষজ্ঞ, ওসমানী হাসপাতাল'
                    : 'MBBS, BCS (Health), MCPS, FCPS (Medicine) · Medicine Specialist, Osmani Hospital'}
                </span>
              </div>
            </div>

            {/* High-Resolution Generated Featured Image */}
            {post.image && (
              <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 mt-2">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover object-center brightness-95"
                />
              </div>
            )}

            {/* Excerpt Lead Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-accent/5 border-l-4 border-accent text-xs sm:text-sm text-ink leading-relaxed font-medium italic">
              "{post.excerpt}"
            </div>

            {/* Main Rendered HTML Content */}
            <div 
              className="prose prose-slate max-w-none text-muted leading-relaxed pt-6 border-t border-line space-y-4
                prose-headings:font-serif prose-headings:text-ink prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-3
                prose-h2:text-lg prose-h2:sm:text-xl prose-h2:md:text-2xl prose-h2:text-accent
                prose-p:text-xs prose-p:sm:text-sm prose-p:leading-relaxed prose-p:text-slate-700
                prose-ul:list-disc prose-ul:list-inside prose-ul:space-y-1.5 prose-ul:text-xs prose-ul:sm:text-sm"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </GlassPanel>
        </article>

        {/* 2. RELATED HEALTH ARTICLES */}
        {relatedPosts.length > 0 && (
          <section className="flex flex-col gap-4">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              <span>{language === 'bn' ? 'আরও পড়ুন' : 'Related Advisories'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group p-5 rounded-2xl border border-white/80 bg-white/70 hover:bg-white backdrop-blur-md shadow-md hover:shadow-xl hover:border-accent/40 transition-all duration-300 flex flex-col justify-between gap-3"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                      {language === 'bn' ? rel.categoryBn : rel.category}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-ink group-hover:text-accent transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-muted line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>

                  <span className="text-[11px] font-semibold text-accent group-hover:text-ink transition-colors flex items-center gap-1 mt-1">
                    <span>{language === 'bn' ? 'পড়ুন' : 'Read more'}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 3. IN-PERSON CHAMBER CONSULTATION CTA */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl border border-panel-border bg-gradient-to-r from-accent/15 via-accent/5 to-white/80">
          <div className="text-center md:text-left flex flex-col gap-1 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
              {language === 'bn' ? 'ব্যক্তিগত পরামর্শ ও সিরিয়াল' : 'Specialist Consultation'}
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-ink">
              {language === 'bn' ? 'সরাসরি চেম্বারে এসে চিকিৎসকের সাথে কথা বলুন' : 'Consult Dr. Hanif Ahmed Towhid'}
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              {language === 'bn'
                ? 'পপুলার মেডিকেল সেন্টার (৬ষ্ঠ তলা, রুম ৬০৫), নিউ মেডিকেল রোড, কাজলশাহ, সিলেট।'
                : 'Popular Medical Center Ltd. (Room #605), Kazalshah, Sylhet. Serial booking open daily.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+8801346132486"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-ink px-4.5 py-2.5 rounded-xl font-semibold text-xs shadow-md hover:-translate-y-0.5 transition-all whitespace-nowrap cursor-pointer border border-line"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span>01346-132486</span>
            </a>
            <a
              href="https://wa.me/8801346132486"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent hover:bg-ink text-white px-5 py-2.5 rounded-xl font-semibold text-xs shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all whitespace-nowrap cursor-pointer border border-accent/20"
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
