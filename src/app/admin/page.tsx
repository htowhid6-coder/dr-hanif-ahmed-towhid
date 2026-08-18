'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { blogData, BlogPost } from '@/locales/blogData';
import supabase from '@/lib/supabase';
import RichTextEditor from '@/components/RichTextEditor';
import { Save, Trash2, Download, Plus, LogOut, User, Building2, BookOpen, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  const { language } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState<'profile' | 'chamber' | 'blog' | 'messages'>('profile');
  const [messages, setMessages] = useState<any[]>([]);

  // Profile Form States
  const [profile, setProfile] = useState({
    nameEn: 'Dr. Hanif Ahmed Towhid',
    nameBn: 'ডা. হানিফ আহমেদ তৌহিদ',
    designationEn: 'Registrar, Department of Medicine',
    designationBn: 'রেজিস্ট্রার, মেডিসিন বিভাগ',
    bmdc: 'A-76300',
    email: 'htowhid6@gmail.com',
    phone: '01721291297',
    bioEn: 'Dr. Hanif is dedicated to patients seeking general internal medicine care...',
    bioBn: 'ডা. হানিফ জেনারেল মেডিসিন সেবা প্রার্থীদের নিবেদিত...',
  });

  // Chamber Form States
  const [chamber, setChamber] = useState({
    nameEn: 'Popular Medical Center Ltd.',
    nameBn: 'পপুলার মেডিকেল সেন্টার লিঃ',
    addressEn: '(6th Floor, Room No-605), New Medical Road, Kazalshah, Sylhet.',
    addressBn: '(৬ষ্ঠ তলা, রুম নং-৬০৫), নিউ মেডিকেল রোড, কাজলশাহ, সিলেট।',
    hoursEn: '5:00 PM – 9:00 PM (Friday Closed)',
    hoursBn: 'বিকাল ৫টা - রাত ৯টা পর্যন্ত (শুক্রবার বন্ধ)',
    ticketPhone: '01346-132486',
  });

  // Blog Editor States
  const [blogs, setBlogs] = useState<BlogPost[]>(blogData);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    lang: 'bn',
    readTime: '5 min read',
  });

  // Fetch Supabase data on login
  useEffect(() => {
    if (isLoggedIn) {
      fetchProfileAndChamber();
      fetchSupabaseBlogs();
      fetchMessages();
    }
  }, [isLoggedIn]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setMessages(data);
      }
    } catch (err) {
      console.error("Error loading messages:", err);
    }
  };

  const fetchProfileAndChamber = async () => {
    try {
      // Fetch Profile
      const { data: profData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', '00000000-0000-0000-0000-000000000000')
        .maybeSingle();
      
      if (profData) {
        setProfile({
          nameEn: profData.full_name_en,
          nameBn: profData.full_name_bn,
          designationEn: profData.designation_en,
          designationBn: profData.designation_bn,
          bmdc: profData.bmdc_number,
          email: profData.email,
          phone: profData.phone,
          bioEn: profData.bio_en || '',
          bioBn: profData.bio_bn || '',
        });
      }

      // Fetch Chamber
      const { data: chamData } = await supabase
        .from('chambers')
        .select('*')
        .eq('id', '00000000-0000-0000-0000-000000000000')
        .maybeSingle();

      if (chamData) {
        setChamber({
          nameEn: chamData.name_en,
          nameBn: chamData.name_bn,
          addressEn: chamData.address_en,
          addressBn: chamData.address_bn,
          hoursEn: chamData.hours_en,
          hoursBn: chamData.hours_bn,
          ticketPhone: chamData.ticket_phone,
        });
      }
    } catch (err) {
      console.error("Error loading profiles/chambers:", err);
    }
  };

  const fetchSupabaseBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
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
      }
    } catch (err) {
      console.error("Error fetching blogs from Supabase:", err);
    }
  };

  const initializeMockBlogs = async () => {
    try {
      const payloads = blogData.map(post => ({
        slug: post.slug,
        lang: post.lang,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        read_time: post.readTime,
        is_published: true
      }));

      const { error } = await supabase.from('posts').upsert(payloads, { onConflict: 'slug' });
      if (error) throw error;

      alert(language === 'bn' ? 'সকল ডেমো আর্টিকেল ডাটাবেজে যুক্ত করা হয়েছে!' : 'All mock articles uploaded to Supabase successfully!');
      fetchSupabaseBlogs();
    } catch (err) {
      console.error(err);
      alert(language === 'bn' ? 'ডাটাবেজে যুক্ত করতে সমস্যা হয়েছে!' : 'Failed to upload mock articles!');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      // 1. Try to sign in using Supabase Authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username, // treats username as email (needs to be a valid email in Supabase)
        password: password,
      });

      if (error) {
        // If Supabase Auth fails, check if using local demo bypass credentials
        if (username === 'admin' && password === 'password') {
          setIsLoggedIn(true);
          console.warn("Signed in using local demo bypass. Database writes will be blocked by RLS policies.");
          return;
        }
        throw error;
      }

      if (data?.user) {
        setIsLoggedIn(true);
      }
    } catch (err: any) {
      console.error(err);
      setLoginError(
        language === 'bn'
          ? `লগইন ব্যর্থ হয়েছে: ${err.message || 'অনুগ্রহ করে সঠিক তথ্য দিন'}`
          : `Login failed: ${err.message || 'Please check credentials'}`
      );
    }
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: '00000000-0000-0000-0000-000000000000',
        full_name_en: profile.nameEn,
        full_name_bn: profile.nameBn,
        designation_en: profile.designationEn,
        designation_bn: profile.designationBn,
        bmdc_number: profile.bmdc,
        phone: profile.phone,
        email: profile.email,
        bio_en: profile.bioEn,
        bio_bn: profile.bioBn,
      });
      if (error) throw error;
      alert(language === 'bn' ? 'প্রোফাইল তথ্য সফলভাবে সেভ হয়েছে!' : 'Profile details saved successfully!');
    } catch (err) {
      console.error(err);
      alert(language === 'bn' ? 'সেভ করতে ত্রুটি ঘটেছে!' : 'Failed to save profile!');
    }
  };

  const saveChamber = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('chambers').upsert({
        id: '00000000-0000-0000-0000-000000000000',
        name_en: chamber.nameEn,
        name_bn: chamber.nameBn,
        address_en: chamber.addressEn,
        address_bn: chamber.addressBn,
        hours_en: chamber.hoursEn,
        hours_bn: chamber.hoursBn,
        ticket_phone: chamber.ticketPhone,
      });
      if (error) throw error;
      alert(language === 'bn' ? 'চেম্বার তথ্য সফলভাবে সেভ হয়েছে!' : 'Chamber details saved successfully!');
    } catch (err) {
      console.error(err);
      alert(language === 'bn' ? 'সেভ করতে ত্রুটি ঘটেছে!' : 'Failed to save chamber!');
    }
  };

  const handleEditBlog = (post: BlogPost) => {
    setSelectedPost(post);
    setBlogForm({ ...post });
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const postSlug = selectedPost ? selectedPost.slug : (blogForm.title || 'new-post').toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');

    const postPayload = {
      slug: postSlug,
      lang: blogForm.lang || 'bn',
      title: blogForm.title || '',
      excerpt: blogForm.excerpt || '',
      content: blogForm.content || '',
      read_time: blogForm.readTime || '5 min read',
      is_published: true,
    };

    try {
      const { error } = await supabase.from('posts').upsert(postPayload, { onConflict: 'slug' });
      if (error) throw error;

      const updatedPost: BlogPost = {
        slug: postSlug,
        lang: blogForm.lang as 'en' | 'bn',
        title: blogForm.title || '',
        excerpt: blogForm.excerpt || '',
        content: blogForm.content || '',
        date: new Date().toISOString().split('T')[0],
        readTime: blogForm.readTime || '5 min read',
      };

      if (selectedPost) {
        setBlogs(blogs.map(b => b.slug === selectedPost.slug ? updatedPost : b));
        alert(language === 'bn' ? 'আর্টিকেল আপডেট করা হয়েছে!' : 'Article updated successfully!');
      } else {
        setBlogs([updatedPost, ...blogs]);
        alert(language === 'bn' ? 'নতুন আর্টিকেল যুক্ত করা হয়েছে!' : 'New article created successfully!');
      }

      setSelectedPost(null);
      setBlogForm({ title: '', excerpt: '', content: '', lang: 'bn', readTime: '5 min read' });
    } catch (err) {
      console.error(err);
      alert(language === 'bn' ? 'আর্টিকেল সেভ করতে সমস্যা হয়েছে!' : 'Failed to save article!');
    }
  };

  const handleDeleteBlog = async (post: BlogPost) => {
    if (!confirm(language === 'bn' ? 'আপনি কি নিশ্চিতভাবে এই আর্টিকেলটি ডিলিট করতে চান?' : 'Are you sure you want to delete this article?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('slug', post.slug);

      if (error) throw error;

      setBlogs(blogs.filter(b => b.slug !== post.slug));
      alert(language === 'bn' ? 'আর্টিকেলটি সফলভাবে ডিলিট করা হয়েছে!' : 'Article deleted successfully!');
      
      // Reset editor
      setSelectedPost(null);
      setBlogForm({ title: '', excerpt: '', content: '', lang: 'bn', readTime: '5 min read' });
    } catch (err) {
      console.error(err);
      alert(language === 'bn' ? 'ডিলিট করতে সমস্যা হয়েছে!' : 'Failed to delete article!');
    }
  };

  const handleDeleteMessage = async (msgId: string) => {
    if (!confirm(language === 'bn' ? 'আপনি কি নিশ্চিতভাবে এই বার্তাটি ডিলিট করতে চান?' : 'Are you sure you want to delete this message?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', msgId);

      if (error) throw error;

      setMessages(messages.filter(m => m.id !== msgId));
      alert(language === 'bn' ? 'বার্তাটি সফলভাবে ডিলিট করা হয়েছে!' : 'Message deleted successfully!');
    } catch (err) {
      console.error(err);
      alert(language === 'bn' ? 'ডিলিট করতে সমস্যা হয়েছে!' : 'Failed to delete message!');
    }
  };

  const exportToExcel = () => {
    if (messages.length === 0) {
      alert(language === 'bn' ? 'ডাউনলোড করার মতো কোনো বার্তা নেই!' : 'No messages to export!');
      return;
    }

    const headers = ['Submitted At', 'Patient Name', 'Phone', 'Subject', 'Message'];
    const rows = messages.map(msg => [
      msg.created_at ? new Date(msg.created_at).toLocaleString() : '',
      msg.name || '',
      msg.phone || '',
      msg.subject || '',
      msg.message || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${val.replace(/"/g, '""')}"`).join(','))
    ].join('\r\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `patient_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6 bg-slate-50 relative">
          <div className="fixed inset-0 z-0">
            <img src="/about-bg.jpeg" className="w-full h-full object-cover opacity-20 blur-sm" alt="bg" />
          </div>
          <div className="relative z-10 w-full max-w-sm">
            <GlassPanel className="p-8">
              <div className="text-center mb-6">
                <span className="text-3xl">🔑</span>
                <h1 className="font-serif text-xl font-bold text-ink mt-2">
                  {language === 'bn' ? 'অ্যাডমিন লগইন' : 'Doctor Admin Portal'}
                </h1>
                <p className="text-[10px] text-muted mt-1">
                  Demo credentials: <code className="bg-white/50 px-1 rounded">admin</code> / <code className="bg-white/50 px-1 rounded">password</code>
                </p>
              </div>

              {loginError && (
                <div className="p-2 mb-4 text-center text-xs text-error bg-error-container border border-error/20 rounded-lg">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-ink" htmlFor="username">
                    {language === 'bn' ? 'ইউজারনেম' : 'Username'}
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                    placeholder="e.g. admin@gmail.com"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-ink" htmlFor="password">
                    {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 py-3 bg-accent text-white font-semibold text-xs rounded-xl shadow-md hover:bg-ink transition-colors cursor-pointer text-center"
                >
                  {language === 'bn' ? 'লগইন করুন' : 'Sign In'}
                </button>
              </form>
            </GlassPanel>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col antialiased">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto py-10 px-6 w-full flex flex-col gap-8">
        <div className="flex justify-between items-center bg-white/35 p-6 rounded-2xl border border-panel-border backdrop-blur-md">
          <div>
            <h1 className="font-serif text-2xl font-bold text-ink">
              {language === 'bn' ? 'ড্যাশবোর্ড নিয়ন্ত্রণ প্যানেল' : 'Doctor Control Panel'}
            </h1>
            <p className="text-[10px] text-muted">
              {language === 'bn' ? 'আপনার চেম্বার, প্রোফাইল এবং ব্লগ কন্টেন্ট পরিচালনা করুন।' : 'Directly update chamber details, profile timelines, and publish blogs.'}
            </p>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="px-3.5 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 font-semibold text-xs hover:bg-red-100 cursor-pointer"
          >
            {language === 'bn' ? 'সাইন আউট' : 'Sign Out'}
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-line gap-2 flex-wrap">
          {(['profile', 'chamber', 'blog', 'messages'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-serif text-sm font-semibold capitalize border-b-2 transition-all cursor-pointer ${
                activeTab === tab ? 'border-accent text-accent scale-105' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {tab === 'profile'
                ? language === 'bn' ? 'প্রোফাইল সম্পাদন' : 'Edit Profile'
                : tab === 'chamber'
                ? language === 'bn' ? 'চেম্বার তথ্য' : 'Chamber Info'
                : tab === 'blog'
                ? language === 'bn' ? 'ব্লগ ম্যানেজার' : 'Blog Manager'
                : language === 'bn' ? 'রোগীর বার্তা' : 'Patient Messages'}
            </button>
          ))}
        </div>

        {/* TAB 1: EDIT PROFILE */}
        {activeTab === 'profile' && (
          <GlassPanel className="p-6 md:p-8 animate-in fade-in duration-300">
            <form onSubmit={saveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">Name (English)</label>
                <input
                  type="text"
                  value={profile.nameEn}
                  onChange={(e) => setProfile({ ...profile, nameEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="e.g. Dr. Hanif Ahmed Towhid"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">নাম (বাংলা)</label>
                <input
                  type="text"
                  value={profile.nameBn}
                  onChange={(e) => setProfile({ ...profile, nameBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="যেমন: ডা. হানিফ আহমেদ তৌহিদ"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">Designation (English)</label>
                <input
                  type="text"
                  value={profile.designationEn}
                  onChange={(e) => setProfile({ ...profile, designationEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="e.g. Registrar, Department of Medicine"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">পদবী (বাংলা)</label>
                <input
                  type="text"
                  value={profile.designationBn}
                  onChange={(e) => setProfile({ ...profile, designationBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="যেমন: রেজিস্ট্রার, মেডিসিন বিভাগ"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">BMDC Registration No</label>
                <input
                  type="text"
                  value={profile.bmdc}
                  onChange={(e) => setProfile({ ...profile, bmdc: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="e.g. A-76300"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">Cell Phone</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="e.g. 01721291297"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-bold text-ink">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="e.g. htowhid6@gmail.com"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">Short Bio (English)</label>
                <textarea
                  value={profile.bioEn}
                  onChange={(e) => setProfile({ ...profile, bioEn: e.target.value })}
                  rows={4}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="Enter biography description in English..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">সংক্ষিপ্ত পরিচিতি (বাংলা)</label>
                <textarea
                  value={profile.bioBn}
                  onChange={(e) => setProfile({ ...profile, bioBn: e.target.value })}
                  rows={4}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="বাংলায় পরিচিতি বিবরণ লিখুন..."
                />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-accent hover:bg-ink text-white font-semibold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
                >
                  💾 Save Profile Changes
                </button>
              </div>
            </form>
          </GlassPanel>
        )}

        {/* TAB 2: CHAMBER INFO */}
        {activeTab === 'chamber' && (
          <GlassPanel className="p-6 md:p-8 animate-in fade-in duration-300">
            <form onSubmit={saveChamber} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">Chamber Name (English)</label>
                <input
                  type="text"
                  value={chamber.nameEn}
                  onChange={(e) => setChamber({ ...chamber, nameEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="e.g. Popular Medical Center Ltd."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">চেম্বার নাম (বাংলা)</label>
                <input
                  type="text"
                  value={chamber.nameBn}
                  onChange={(e) => setChamber({ ...chamber, nameBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="যেমন: পপুলার মেডিকেল সেন্টার লিঃ"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">Chamber Address (English)</label>
                <textarea
                  value={chamber.addressEn}
                  onChange={(e) => setChamber({ ...chamber, addressEn: e.target.value })}
                  rows={3}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="Enter chamber street and room address..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">চেম্বার ঠিকানা (বাংলা)</label>
                <textarea
                  value={chamber.addressBn}
                  onChange={(e) => setChamber({ ...chamber, addressBn: e.target.value })}
                  rows={3}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="চেম্বারের পূর্ণ ঠিকানা লিখুন..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">Visiting Hours (English)</label>
                <input
                  type="text"
                  value={chamber.hoursEn}
                  onChange={(e) => setChamber({ ...chamber, hoursEn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="e.g. 5:00 PM – 9:00 PM (Friday Closed)"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">রোগী দেখার সময় (বাংলা)</label>
                <input
                  type="text"
                  value={chamber.hoursBn}
                  onChange={(e) => setChamber({ ...chamber, hoursBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="যেমন: বিকাল ৫টা - রাত ৯টা পর্যন্ত (শুক্রবার বন্ধ)"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-bold text-ink">Ticket Booking Serial Number</label>
                <input
                  type="text"
                  value={chamber.ticketPhone}
                  onChange={(e) => setChamber({ ...chamber, ticketPhone: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="e.g. 01346-132486"
                />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-accent hover:bg-ink text-white font-semibold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
                >
                  💾 Save Chamber Settings
                </button>
              </div>
            </form>
          </GlassPanel>
        )}

        {/* TAB 3: BLOG MANAGER */}
        {activeTab === 'blog' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
            {/* Articles List */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <h3 className="font-serif text-sm font-bold text-ink">
                  {language === 'bn' ? 'আর্টিকেল তালিকা' : 'Published Articles'}
                </h3>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={initializeMockBlogs}
                    className="px-2 py-1 bg-accent/10 text-accent border border-accent/20 text-[9px] font-bold rounded-lg cursor-pointer"
                    title={language === 'bn' ? 'ডাটাবেজে ১০টি ডেমো আর্টিকেল আপলোড করুন' : 'Upload 10 mock articles to Supabase'}
                  >
                    {language === 'bn' ? 'ডেমো আপলোড' : 'Upload Mock'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPost(null);
                      setBlogForm({ title: '', excerpt: '', content: '', lang: 'bn', readTime: '5 min read' });
                    }}
                    className="px-2.5 py-1 bg-accent text-white text-[9px] font-bold rounded-lg cursor-pointer"
                  >
                    + Add New
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
                {blogs.map((b) => (
                  <div
                    key={b.slug}
                    onClick={() => handleEditBlog(b)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedPost?.slug === b.slug
                        ? 'border-accent bg-accent/5'
                        : 'border-panel-border bg-white/20 hover:bg-white/40'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-ink line-clamp-1">{b.title}</h4>
                      <span className="text-[8px] bg-ink/10 px-1 rounded uppercase font-semibold">
                        {b.lang}
                      </span>
                    </div>
                    <span className="text-[8px] text-muted block mt-1">{b.date} · {b.readTime}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Post Creator/Editor Form */}
            <div className="lg:col-span-7">
              <GlassPanel className="p-5 flex flex-col gap-4">
                <h3 className="font-serif text-sm font-bold text-ink border-b border-line pb-1.5">
                  {selectedPost ? `Edit: ${selectedPost.title}` : 'Write New Article'}
                </h3>

                <form onSubmit={handleSaveBlog} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-ink">Language</label>
                      <select
                        value={blogForm.lang}
                        onChange={(e) => setBlogForm({ ...blogForm, lang: e.target.value as 'en' | 'bn' })}
                        className="p-2 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm cursor-pointer"
                      >
                        <option value="bn">বাংলা (Bangla)</option>
                        <option value="en">English</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-ink">Estimated Read Time</label>
                      <input
                        type="text"
                        value={blogForm.readTime}
                        onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                        className="p-2 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                        placeholder="e.g. 5 min read"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-ink">Article Title</label>
                    <input
                      type="text"
                      required
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                      placeholder="Enter a descriptive title for this article..."
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-ink">Short Excerpt (SEO Summary)</label>
                    <textarea
                      required
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      rows={2}
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                      placeholder="Write a brief 1-2 sentence summary for lists and search engines..."
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-ink">Article Body (Rich Text Editor)</label>
                    <RichTextEditor
                      value={blogForm.content || ''}
                      onChange={(val) => setBlogForm({ ...blogForm, content: val })}
                      placeholder="Write article content here..."
                    />
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-accent text-white font-semibold text-xs rounded-xl shadow-md hover:bg-ink transition-colors cursor-pointer text-center inline-flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>{selectedPost ? 'Update Article' : 'Publish Article'}</span>
                    </button>
                    {selectedPost && (
                      <button
                        type="button"
                        onClick={() => handleDeleteBlog(selectedPost)}
                        className="py-3 px-4 bg-red-50 border border-red-200 text-red-600 font-semibold text-xs rounded-xl hover:bg-red-100 transition-colors cursor-pointer text-center inline-flex items-center justify-center gap-1.5"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </form>
              </GlassPanel>
            </div>
          </div>
        )}

        {/* TAB 4: PATIENT MESSAGES */}
        {activeTab === 'messages' && (
          <GlassPanel className="p-6 md:p-8 animate-in fade-in duration-300">
            <div className="flex justify-between items-center border-b border-line pb-2 mb-4 flex-wrap gap-2">
              <h3 className="font-serif text-base font-bold text-ink">
                {language === 'bn' ? 'রোগীদের পাঠানো বার্তা ও সিরিয়াল অনুরোধ' : 'Patient Messages & Serial Requests'}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={exportToExcel}
                  className="px-3 py-1 bg-accent text-white text-xs font-semibold rounded-lg cursor-pointer inline-flex items-center gap-1.5 shadow hover:bg-ink transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'এক্সেল ডাউনলোড (Excel)' : 'Export to Excel'}</span>
                </button>
                <span className="text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full font-sans font-bold">
                  {messages.length} {language === 'bn' ? 'টি বার্তা' : 'Leads'}
                </span>
              </div>
            </div>

            {messages.length === 0 ? (
              <div className="py-12 text-center text-muted text-xs">
                {language === 'bn' ? 'কোনো বার্তা পাওয়া যায়নি।' : 'No messages found.'}
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 rounded-xl border border-panel-border bg-white/40 flex flex-col gap-2 hover:bg-white/60 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                      <div>
                        <h4 className="text-sm font-bold text-ink">{msg.name}</h4>
                        <span className="text-xs text-muted block">{msg.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-muted font-mono">
                          {msg.created_at ? new Date(msg.created_at).toLocaleString() : ''}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="text-[10px] text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded border border-red-200 cursor-pointer font-bold inline-flex items-center gap-1"
                          title={language === 'bn' ? 'বার্তা ডিলিট করুন' : 'Delete Message'}
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>{language === 'bn' ? 'ডিলিট' : 'Delete'}</span>
                        </button>
                      </div>
                    </div>
                    {msg.message && (
                      <p className="text-xs text-ink leading-relaxed bg-white/30 p-2.5 rounded-lg border border-panel-border/30">
                        {msg.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </GlassPanel>
        )}
      </main>

      <Footer />
    </div>
  );
}
