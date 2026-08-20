'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { blogData, BlogPost } from '@/locales/blogData';
import { detailedSymptomsList, SymptomDetail } from '@/data/symptomsData';
import {
  Activity,
  Stethoscope,
  Search,
  Edit,
  Eye,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ChevronRight,
  X,
  ArrowUpRight,
  Copy,
  RefreshCw,
  Layers,
  HeartPulse,
  ListPlus,
  ShieldAlert,
  TestTubes,
  ExternalLink,
  HelpCircle,
  Thermometer
} from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'profile' | 'chamber' | 'symptoms' | 'blog' | 'reviews' | 'messages'>('profile');
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
    mapUrl: 'https://maps.google.com/maps?q=Popular+Medical+Center+Sylhet+Kazalshah&t=&z=16&ie=UTF8&iwloc=&output=embed',
    directMapLink: 'https://maps.google.com/?q=Popular+Medical+Center+Sylhet',
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

  // Reviews states
  const [adminReviews, setAdminReviews] = useState<any[]>([]);
  const [selectedReview, setSelectedReview] = useState<any | null>(null);
  const [reviewForm, setReviewForm] = useState({
    nameEn: '',
    nameBn: '',
    titleEn: '',
    titleBn: '',
    textEn: '',
    textBn: '',
    initials: '',
  });

  // Symptoms states
  const [adminSymptoms, setAdminSymptoms] = useState<SymptomDetail[]>(detailedSymptomsList);
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomDetail | null>(null);
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);
  const [symptomSearch, setSymptomSearch] = useState('');
  const [symptomCategoryFilter, setSymptomCategoryFilter] = useState('all');
  const [symptomModalTab, setSymptomModalTab] = useState<'basic' | 'overview' | 'causes' | 'redFlags' | 'investigations' | 'management' | 'preview'>('basic');
  const [isSavingSymptom, setIsSavingSymptom] = useState(false);
  const [isSeedingSymptoms, setIsSeedingSymptoms] = useState(false);

  const initialSymptomForm: SymptomDetail = {
    id: 0,
    slug: '',
    titleEn: '',
    titleBn: '',
    categoryEn: 'Infectious & Viral Diseases',
    categoryBn: 'সংক্রামক ও ভাইরাসজনিত রোগ',
    organEn: 'General Systemic',
    organBn: 'সার্বিক স্বাস্থ্য',
    image: '/symptoms/fever.png',
    shortDescEn: '',
    shortDescBn: '',
    overviewEn: '',
    overviewBn: '',
    causesEn: [{ title: '', desc: '' }],
    causesBn: [{ title: '', desc: '' }],
    redFlagsEn: [''],
    redFlagsBn: [''],
    investigationsEn: [''],
    investigationsBn: [''],
    managementEn: '',
    managementBn: ''
  };

  const [symptomForm, setSymptomForm] = useState<SymptomDetail>(initialSymptomForm);

  const symptomImagePresets = [
    { label: 'Fever & Chills', path: '/symptoms/fever.png' },
    { label: 'Low Back Pain', path: '/symptoms/low-back-pain.png' },
    { label: 'Knee & Joint', path: '/symptoms/knee-pain.png' },
    { label: 'Fatigue & Exhaustion', path: '/symptoms/fatigue.png' },
    { label: 'Headache & Migraine', path: '/symptoms/headache.png' },
    { label: 'Restlessness', path: '/symptoms/restlessness.png' },
    { label: 'Palpitation', path: '/symptoms/palpitation.png' },
    { label: 'Anxiety & Panic', path: '/symptoms/anxiety.png' },
    { label: 'Abdominal Fullness', path: '/symptoms/upper-abdominal-discomfort.png' },
    { label: 'Epigastric / Acidity', path: '/symptoms/epigastric-pain.png' },
    { label: 'Cough & Bronchitis', path: '/symptoms/cough.png' },
    { label: 'Breathlessness', path: '/symptoms/exertional-breathlessness.png' },
    { label: 'Chest Pain / Angina', path: '/symptoms/chest-pain.png' },
    { label: 'Dysuria / Burning', path: '/symptoms/dysuria.png' },
    { label: 'Joint Pain (General)', path: '/symptoms/joint-pain.png' },
  ];

  // Fetch Supabase data on login
  useEffect(() => {
    if (isLoggedIn) {
      fetchProfileAndChamber();
      fetchSupabaseBlogs();
      fetchMessages();
      fetchReviews();
      fetchSymptoms();
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

  const fetchSymptoms = async () => {
    try {
      const { data, error } = await supabase
        .from('symptoms')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) {
        const mapped: SymptomDetail[] = data.map((d: any, index: number) => ({
          id: d.id || index + 1,
          slug: d.slug,
          titleEn: d.title_en,
          titleBn: d.title_bn,
          categoryEn: d.category_en,
          categoryBn: d.category_bn,
          organEn: d.organ_en,
          organBn: d.organ_bn,
          image: d.image || '/symptoms/fever.png',
          shortDescEn: d.short_desc_en,
          shortDescBn: d.short_desc_bn,
          overviewEn: d.overview_en,
          overviewBn: d.overview_bn,
          causesEn: Array.isArray(d.causes_en) ? d.causes_en : [],
          causesBn: Array.isArray(d.causes_bn) ? d.causes_bn : [],
          redFlagsEn: Array.isArray(d.red_flags_en) ? d.red_flags_en : [],
          redFlagsBn: Array.isArray(d.red_flags_bn) ? d.red_flags_bn : [],
          investigationsEn: Array.isArray(d.investigations_en) ? d.investigations_en : [],
          investigationsBn: Array.isArray(d.investigations_bn) ? d.investigations_bn : [],
          managementEn: d.management_en,
          managementBn: d.management_bn,
        }));
        setAdminSymptoms(mapped);
      } else {
        setAdminSymptoms(detailedSymptomsList);
      }
    } catch (err) {
      console.error("Error loading symptoms:", err);
      setAdminSymptoms(detailedSymptomsList);
    }
  };

  const handleOpenNewSymptom = () => {
    setSelectedSymptom(null);
    setSymptomForm({
      ...initialSymptomForm,
      id: Date.now()
    });
    setSymptomModalTab('basic');
    setIsSymptomModalOpen(true);
  };

  const handleEditSymptom = (symptom: SymptomDetail) => {
    setSelectedSymptom(symptom);
    setSymptomForm({
      ...symptom,
      causesEn: symptom.causesEn && symptom.causesEn.length > 0 ? symptom.causesEn : [{ title: '', desc: '' }],
      causesBn: symptom.causesBn && symptom.causesBn.length > 0 ? symptom.causesBn : [{ title: '', desc: '' }],
      redFlagsEn: symptom.redFlagsEn && symptom.redFlagsEn.length > 0 ? symptom.redFlagsEn : [''],
      redFlagsBn: symptom.redFlagsBn && symptom.redFlagsBn.length > 0 ? symptom.redFlagsBn : [''],
      investigationsEn: symptom.investigationsEn && symptom.investigationsEn.length > 0 ? symptom.investigationsEn : [''],
      investigationsBn: symptom.investigationsBn && symptom.investigationsBn.length > 0 ? symptom.investigationsBn : ['']
    });
    setSymptomModalTab('basic');
    setIsSymptomModalOpen(true);
  };

  const handleSaveSymptom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSymptom(true);

    try {
      let slug = symptomForm.slug.trim().toLowerCase();
      if (!slug) {
        slug = symptomForm.titleEn
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
      }

      const cleanCausesEn = (symptomForm.causesEn || []).filter(c => c.title.trim() || c.desc.trim());
      const cleanCausesBn = (symptomForm.causesBn || []).filter(c => c.title.trim() || c.desc.trim());
      const cleanRedFlagsEn = (symptomForm.redFlagsEn || []).filter(r => r.trim());
      const cleanRedFlagsBn = (symptomForm.redFlagsBn || []).filter(r => r.trim());
      const cleanInvestigationsEn = (symptomForm.investigationsEn || []).filter(i => i.trim());
      const cleanInvestigationsBn = (symptomForm.investigationsBn || []).filter(i => i.trim());

      const payload = {
        slug,
        title_en: symptomForm.titleEn.trim(),
        title_bn: symptomForm.titleBn.trim(),
        category_en: symptomForm.categoryEn.trim(),
        category_bn: symptomForm.categoryBn.trim(),
        organ_en: symptomForm.organEn.trim(),
        organ_bn: symptomForm.organBn.trim(),
        image: symptomForm.image.trim() || '/symptoms/fever.png',
        short_desc_en: symptomForm.shortDescEn.trim(),
        short_desc_bn: symptomForm.shortDescBn.trim(),
        overview_en: symptomForm.overviewEn.trim(),
        overview_bn: symptomForm.overviewBn.trim(),
        causes_en: cleanCausesEn,
        causes_bn: cleanCausesBn,
        red_flags_en: cleanRedFlagsEn,
        red_flags_bn: cleanRedFlagsBn,
        investigations_en: cleanInvestigationsEn,
        investigations_bn: cleanInvestigationsBn,
        management_en: symptomForm.managementEn.trim(),
        management_bn: symptomForm.managementBn.trim(),
        is_active: true
      };

      const { error } = await supabase
        .from('symptoms')
        .upsert(payload, { onConflict: 'slug' });

      if (error) throw error;

      alert(language === 'bn' ? 'রোগের লক্ষণ সফলভাবে ডাটাবেজে সংরক্ষিত হয়েছে!' : 'Symptom saved to database successfully!');
      setIsSymptomModalOpen(false);
      fetchSymptoms();
    } catch (err: any) {
      console.error(err);
      alert(language === 'bn' ? `সংরক্ষণ করতে সমস্যা হয়েছে: ${err.message || 'ত্রুটি'}` : `Failed to save symptom: ${err.message || 'Error'}`);
    } finally {
      setIsSavingSymptom(false);
    }
  };

  const handleDeleteSymptom = async (symptom: SymptomDetail) => {
    if (!confirm(language === 'bn' ? `আপনি কি নিশ্চিতভাবে "${symptom.titleBn}" লক্ষণটি ডিলিট করতে চান?` : `Are you sure you want to delete "${symptom.titleEn}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('symptoms')
        .delete()
        .eq('slug', symptom.slug);

      if (error) throw error;

      alert(language === 'bn' ? 'লক্ষণ সফলভাবে ডিলিট করা হয়েছে!' : 'Symptom deleted successfully!');
      if (selectedSymptom?.slug === symptom.slug) {
        setIsSymptomModalOpen(false);
        setSelectedSymptom(null);
      }
      fetchSymptoms();
    } catch (err: any) {
      console.error(err);
      alert(language === 'bn' ? `ডিলিট করতে ব্যর্থ হয়েছে: ${err.message || 'ত্রুটি'}` : `Failed to delete symptom: ${err.message || 'Error'}`);
    }
  };

  const handleSeedAllSymptoms = async () => {
    if (!confirm(language === 'bn' ? 'আপনি কি ১৪টি ডিফল্ট লক্ষণ ডাটাবেজে সিড করতে চান?' : 'Seed all 14 default symptoms into Supabase?')) {
      return;
    }
    setIsSeedingSymptoms(true);

    try {
      const payloads = detailedSymptomsList.map((s, idx) => ({
        slug: s.slug,
        title_en: s.titleEn,
        title_bn: s.titleBn,
        category_en: s.categoryEn,
        category_bn: s.categoryBn,
        organ_en: s.organEn,
        organ_bn: s.organBn,
        image: s.image,
        short_desc_en: s.shortDescEn,
        short_desc_bn: s.shortDescBn,
        overview_en: s.overviewEn,
        overview_bn: s.overviewBn,
        causes_en: s.causesEn,
        causes_bn: s.causesBn,
        red_flags_en: s.redFlagsEn,
        red_flags_bn: s.redFlagsBn,
        investigations_en: s.investigationsEn,
        investigations_bn: s.investigationsBn,
        management_en: s.managementEn,
        management_bn: s.managementBn,
        order_index: idx + 1,
        is_active: true
      }));

      const { error } = await supabase
        .from('symptoms')
        .upsert(payloads, { onConflict: 'slug' });

      if (error) throw error;

      alert(language === 'bn' ? 'সকল ১৪টি রোগের লক্ষণ ডাটাবেজে সফলভাবে যুক্ত হয়েছে!' : 'All 14 clinical symptoms seeded to Supabase successfully!');
      fetchSymptoms();
    } catch (err: any) {
      console.error(err);
      alert(language === 'bn' ? `সিড করতে সমস্যা হয়েছে: ${err.message || 'ত্রুটি'}` : `Failed to seed symptoms: ${err.message || 'Error'}`);
    } finally {
      setIsSeedingSymptoms(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setAdminReviews(data);
      }
    } catch (err) {
      console.error("Error loading reviews:", err);
    }
  };

  const handleEditReview = (review: any) => {
    setSelectedReview(review);
    setReviewForm({
      nameEn: review.reviewer_name_en,
      nameBn: review.reviewer_name_bn,
      titleEn: review.reviewer_title_en,
      titleBn: review.reviewer_title_bn,
      textEn: review.review_text_en,
      textBn: review.review_text_bn,
      initials: review.initials,
    });
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();

    let computedInitials = reviewForm.initials.trim();
    if (!computedInitials) {
      const name = reviewForm.nameEn.trim();
      if (name) {
        const parts = name.split(/\s+/);
        if (parts.length === 1) {
          computedInitials = parts[0].slice(0, 2).toUpperCase();
        } else {
          computedInitials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
      } else {
        computedInitials = 'PT';
      }
    }

    const reviewPayload = {
      reviewer_name_en: reviewForm.nameEn,
      reviewer_name_bn: reviewForm.nameBn,
      reviewer_title_en: reviewForm.titleEn,
      reviewer_title_bn: reviewForm.titleBn,
      review_text_en: reviewForm.textEn,
      review_text_bn: reviewForm.textBn,
      initials: computedInitials,
    };

    try {
      if (selectedReview) {
        const { error } = await supabase
          .from('reviews')
          .update(reviewPayload)
          .eq('id', selectedReview.id);

        if (error) throw error;
        alert(language === 'bn' ? 'রিভিউ সফলভাবে আপডেট করা হয়েছে!' : 'Review updated successfully!');
      } else {
        const { error } = await supabase
          .from('reviews')
          .insert([reviewPayload]);

        if (error) throw error;
        alert(language === 'bn' ? 'নতুন রিভিউ যুক্ত করা হয়েছে!' : 'New review added successfully!');
      }

      setSelectedReview(null);
      setReviewForm({
        nameEn: '',
        nameBn: '',
        titleEn: '',
        titleBn: '',
        textEn: '',
        textBn: '',
        initials: '',
      });
      fetchReviews();
    } catch (err) {
      console.error(err);
      alert(language === 'bn' ? 'রিভিউ সেভ করতে সমস্যা হয়েছে!' : 'Failed to save review!');
    }
  };

  const handleDeleteReview = async (review: any) => {
    if (!confirm(language === 'bn' ? 'আপনি কি নিশ্চিতভাবে এই রিভিউটি ডিলিট করতে চান?' : 'Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', review.id);

      if (error) throw error;

      alert(language === 'bn' ? 'রিভিউটি সফলভাবে ডিলিট করা হয়েছে!' : 'Review deleted successfully!');
      setSelectedReview(null);
      setReviewForm({
        nameEn: '',
        nameBn: '',
        titleEn: '',
        titleBn: '',
        textEn: '',
        textBn: '',
        initials: '',
      });
      fetchReviews();
    } catch (err) {
      console.error(err);
      alert(language === 'bn' ? 'ডিলিট করতে সমস্যা হয়েছে!' : 'Failed to delete review!');
    }
  };

  const seedDefaultReviews = async () => {
    try {
      const defaultReviewsSeed = [
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

      const { error } = await supabase
        .from('reviews')
        .insert(defaultReviewsSeed);

      if (error) throw error;

      alert(language === 'bn' ? 'ডিফল্ট রিভিউ সফলভাবে ডেটাবেজে যুক্ত করা হয়েছে!' : 'Default reviews seeded successfully!');
      fetchReviews();
    } catch (err) {
      console.error(err);
      alert(language === 'bn' ? 'ডিফল্ট রিভিউ যুক্ত করতে সমস্যা হয়েছে!' : 'Failed to seed default reviews!');
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

      const localMap = typeof window !== 'undefined' ? localStorage.getItem('chamber_map_url') : null;
      const localDirect = typeof window !== 'undefined' ? localStorage.getItem('chamber_direct_map_link') : null;

      if (chamData) {
        setChamber({
          nameEn: chamData.name_en || 'Popular Medical Center Ltd.',
          nameBn: chamData.name_bn || 'পপুলার মেডিকেল সেন্টার লিঃ',
          addressEn: chamData.address_en || '(6th Floor, Room No-605), New Medical Road, Kazalshah, Sylhet.',
          addressBn: chamData.address_bn || '(৬ষ্ঠ তলা, রুম নং-৬০৫), নিউ মেডিকেল রোড, কাজলশাহ, সিলেট।',
          hoursEn: chamData.hours_en || '5:00 PM – 9:00 PM (Friday Closed)',
          hoursBn: chamData.hours_bn || 'বিকাল ৫টা - রাত ৯টা পর্যন্ত (শুক্রবার বন্ধ)',
          ticketPhone: chamData.ticket_phone || '01346-132486',
          mapUrl: chamData.map_url || localMap || 'https://maps.google.com/maps?q=Popular+Medical+Center+Sylhet+Kazalshah&t=&z=16&ie=UTF8&iwloc=&output=embed',
          directMapLink: chamData.direct_map_link || localDirect || 'https://maps.google.com/?q=Popular+Medical+Center+Sylhet',
        });
      } else if (localMap || localDirect) {
        setChamber(prev => ({
          ...prev,
          mapUrl: localMap || prev.mapUrl,
          directMapLink: localDirect || prev.directMapLink
        }));
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
      if (typeof window !== 'undefined') {
        localStorage.setItem('chamber_map_url', chamber.mapUrl);
        localStorage.setItem('chamber_direct_map_link', chamber.directMapLink);
      }

      const { error } = await supabase.from('chambers').upsert({
        id: '00000000-0000-0000-0000-000000000000',
        name_en: chamber.nameEn,
        name_bn: chamber.nameBn,
        address_en: chamber.addressEn,
        address_bn: chamber.addressBn,
        hours_en: chamber.hoursEn,
        hours_bn: chamber.hoursBn,
        ticket_phone: chamber.ticketPhone,
        map_url: chamber.mapUrl,
        direct_map_link: chamber.directMapLink,
      });

      if (error) {
        console.warn("Supabase chamber update:", error);
      }

      alert(language === 'bn' ? 'চেম্বার তথ্য ও গুগল ম্যাপ লিংক সফলভাবে সেভ হয়েছে!' : 'Chamber details & Google Map saved successfully!');
    } catch (err) {
      console.error(err);
      alert(language === 'bn' ? 'চেম্বার তথ্য সংরক্ষিত হয়েছে!' : 'Chamber details saved!');
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
          {(['profile', 'chamber', 'symptoms', 'blog', 'reviews', 'messages'] as const).map((tab) => (
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
                : tab === 'symptoms'
                ? language === 'bn' ? 'লক্ষণ ও রোগ (Symptoms)' : 'Symptoms Manager'
                : tab === 'blog'
                ? language === 'bn' ? 'ব্লগ ম্যানেজার' : 'Blog Manager'
                : tab === 'reviews'
                ? language === 'bn' ? 'রিভিউ ম্যানেজার' : 'Reviews Manager'
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

              {/* Google Maps Integration Section */}
              <div className="md:col-span-2 pt-3 border-t border-line flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-sm font-bold text-ink flex items-center gap-2">
                    <span>📍 Google Map Integration (গুগল ম্যাপ লিংক ও অবস্থান)</span>
                  </h4>
                  <span className="text-[10px] text-muted bg-white/60 px-2 py-0.5 rounded-full border border-line">
                    Real-time synchronized with Contact Page
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">
                      Google Maps Embed URL / iFrame Code (এম্বেড লিংক বা আইফ্রেম কোড)
                    </label>
                    <textarea
                      rows={3}
                      value={chamber.mapUrl}
                      onChange={(e) => {
                        const val = e.target.value;
                        const match = val.match(/src=["']([^"']+)["']/);
                        if (match && match[1]) {
                          setChamber({ ...chamber, mapUrl: match[1] });
                        } else {
                          setChamber({ ...chamber, mapUrl: val });
                        }
                      }}
                      className="p-2.5 text-xs font-mono rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm resize-none"
                      placeholder="e.g. https://maps.google.com/maps?q=Popular+Medical+Center+Sylhet&output=embed or paste <iframe> tag"
                    />
                    <span className="text-[10px] text-muted">
                      💡 Tip: You can paste Google Maps embed URL or directly paste the &lt;iframe src="..."&gt; code.
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink">
                      Google Maps Direct Direction Link (সরাসরি গুগল ম্যাপ ওপেন লিংক)
                    </label>
                    <textarea
                      rows={3}
                      value={chamber.directMapLink}
                      onChange={(e) => setChamber({ ...chamber, directMapLink: e.target.value })}
                      className="p-2.5 text-xs font-mono rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm resize-none"
                      placeholder="e.g. https://maps.app.goo.gl/... or https://maps.google.com/?q=..."
                    />
                    <span className="text-[10px] text-muted">
                      🚗 This link opens Google Maps app for step-by-step navigation directions.
                    </span>
                  </div>
                </div>

                {/* Live Google Map Preview in Admin */}
                {chamber.mapUrl && (
                  <div className="flex flex-col gap-1.5 mt-2">
                    <label className="text-xs font-bold text-ink">Live Map Preview (ম্যাপের প্রিভিউ):</label>
                    <div className="w-full h-56 rounded-xl overflow-hidden border border-slate-300 bg-slate-100 shadow-inner">
                      <iframe
                        title="Chamber Location Preview"
                        src={chamber.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        className="w-full h-full rounded-xl"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="md:col-span-2 flex justify-end mt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-accent hover:bg-ink text-white font-semibold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
                >
                  💾 Save Chamber Settings & Map
                </button>
              </div>
            </form>
          </GlassPanel>
        )}

        
        {/* TAB: SYMPTOMS & CLINICAL CONDITIONS MANAGER */}
        {activeTab === 'symptoms' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            {/* Header & Stats Banner */}
            <GlassPanel className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-cyan-500/10 border-teal-500/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/20 shrink-0">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink flex items-center gap-2">
                    {language === 'bn' ? 'লক্ষণ ও রোগ ব্যবস্থাপনা' : 'Symptoms & Conditions Manager'}
                    <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-teal-600/10 text-teal-700 font-bold border border-teal-600/20">
                      {adminSymptoms.length} {language === 'bn' ? 'টি লক্ষণ' : 'Symptoms'}
                    </span>
                  </h2>
                  <p className="text-xs text-muted mt-1 max-w-xl">
                    {language === 'bn'
                      ? 'ওয়েবসাইটের সকল রোগের লক্ষণসমূহ সরাসরি ডাটাবেজ থেকে যুক্ত, সম্পাদনা ও নিয়ন্ত্রণ করুন।'
                      : 'Create, update, and manage all clinical symptom cards and emergency red flags live on the website.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto">
                <button
                  type="button"
                  onClick={handleSeedAllSymptoms}
                  disabled={isSeedingSymptoms}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/10 text-amber-700 border border-amber-500/30 hover:bg-amber-500/20 text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                  title={language === 'bn' ? '১৪টি ডিফল্ট লক্ষণ ডাটাবেজে আপলোড করুন' : 'Seed 14 Default Symptoms to Supabase'}
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{isSeedingSymptoms ? (language === 'bn' ? 'সিড হচ্ছে...' : 'Seeding...') : (language === 'bn' ? '১৪টি লক্ষণ সিড করুন' : 'Seed 14 Defaults')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenNewSymptom}
                  className="px-4 py-2 rounded-xl bg-accent text-white hover:bg-ink text-xs font-bold shadow-md shadow-accent/20 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === 'bn' ? '+ নতুন লক্ষণ যুক্ত করুন' : '+ Add New Symptom'}</span>
                </button>
              </div>
            </GlassPanel>

            {/* Filter & Search Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-white/40 p-4 rounded-2xl border border-panel-border">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={symptomSearch}
                  onChange={(e) => setSymptomSearch(e.target.value)}
                  placeholder={language === 'bn' ? 'লক্ষণ বা রোগ খুঁজুন...' : 'Search symptoms by title or slug...'}
                  className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all"
                />
                {symptomSearch && (
                  <button
                    onClick={() => setSymptomSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink text-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <select
                  value={symptomCategoryFilter}
                  onChange={(e) => setSymptomCategoryFilter(e.target.value)}
                  className="p-2 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:outline-none"
                >
                  <option value="all">{language === 'bn' ? 'সকল ক্যাটাগরি (All)' : 'All Categories'}</option>
                  {Array.from(new Set(adminSymptoms.map(s => language === 'bn' ? s.categoryBn : s.categoryEn))).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={fetchSymptoms}
                  className="p-2 text-xs rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-muted hover:text-ink"
                  title="Refresh from Supabase"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Symptoms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {adminSymptoms
                .filter(s => {
                  const cat = language === 'bn' ? s.categoryBn : s.categoryEn;
                  const matchesCat = symptomCategoryFilter === 'all' || cat === symptomCategoryFilter;
                  if (!matchesCat) return false;
                  if (!symptomSearch.trim()) return true;
                  const q = symptomSearch.toLowerCase();
                  return (
                    s.titleEn.toLowerCase().includes(q) ||
                    s.titleBn.toLowerCase().includes(q) ||
                    s.slug.toLowerCase().includes(q) ||
                    s.organEn.toLowerCase().includes(q) ||
                    s.organBn.toLowerCase().includes(q)
                  );
                })
                .map((symptom) => (
                  <GlassPanel
                    key={symptom.slug}
                    className="p-5 rounded-2xl flex flex-col justify-between gap-4 border border-panel-border hover:shadow-lg hover:border-teal-500/30 transition-all group bg-white/80"
                  >
                    <div className="flex flex-col gap-3">
                      {/* Card Header: Image & Badges */}
                      <div className="flex items-start gap-3">
                        <div className="w-14 h-14 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center p-1.5 overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                          <img
                            src={symptom.image || '/symptoms/fever.png'}
                            alt={symptom.titleEn}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/symptoms/fever.png';
                            }}
                          />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-800 border border-teal-500/20">
                              {language === 'bn' ? symptom.categoryBn : symptom.categoryEn}
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-sm text-ink mt-1 truncate">
                            {language === 'bn' ? symptom.titleBn : symptom.titleEn}
                          </h4>
                          <span className="text-[11px] text-muted truncate">
                            {language === 'bn' ? symptom.titleEn : symptom.titleBn}
                          </span>
                        </div>
                      </div>

                      {/* Organ & Short Desc */}
                      <div className="flex items-center gap-1.5 text-[11px] text-teal-700 bg-teal-50/60 px-2.5 py-1 rounded-lg border border-teal-100 font-medium">
                        <HeartPulse className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="truncate">{language === 'bn' ? symptom.organBn : symptom.organEn}</span>
                      </div>

                      <p className="text-xs text-ink/80 line-clamp-2 leading-relaxed">
                        {language === 'bn' ? symptom.shortDescBn : symptom.shortDescEn}
                      </p>

                      {/* Counts / Metrics */}
                      <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-100 text-[10px] text-muted text-center font-mono">
                        <div className="bg-slate-50 p-1 rounded">
                          <span className="font-bold text-ink">{symptom.causesEn?.length || 0}</span> {language === 'bn' ? 'কারণ' : 'Causes'}
                        </div>
                        <div className="bg-red-50 text-red-700 p-1 rounded">
                          <span className="font-bold">{symptom.redFlagsEn?.length || 0}</span> {language === 'bn' ? 'রেড ফ্ল্যাগ' : 'Red Flags'}
                        </div>
                        <div className="bg-blue-50 text-blue-700 p-1 rounded">
                          <span className="font-bold">{symptom.investigationsEn?.length || 0}</span> {language === 'bn' ? 'টেস্ট' : 'Tests'}
                        </div>
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-line/60 mt-1 gap-2">
                      <a
                        href={`/symptoms#${symptom.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-muted hover:text-accent font-medium flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>{language === 'bn' ? 'ভিউ' : 'View'}</span>
                      </a>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleEditSymptom(symptom)}
                          className="px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>{language === 'bn' ? 'এডিট' : 'Edit'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSymptom(symptom)}
                          className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 text-xs transition-colors cursor-pointer"
                          title={language === 'bn' ? 'ডিলিট করুন' : 'Delete'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </GlassPanel>
                ))}
            </div>

            {/* SYMPTOM EDIT / ADD MODAL */}
            {isSymptomModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
                <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col overflow-hidden my-6">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-base text-ink">
                          {selectedSymptom
                            ? (language === 'bn' ? 'রোগের লক্ষণ সম্পাদনা করুন' : 'Edit Symptom & Clinical Details')
                            : (language === 'bn' ? 'নতুন লক্ষণ যুক্ত করুন' : 'Add New Clinical Symptom')}
                        </h3>
                        <span className="text-[11px] text-muted">
                          {symptomForm.slug ? `Slug: ${symptomForm.slug}` : (language === 'bn' ? 'সঠিক তথ্য দিয়ে পূরণ করুন' : 'Fill all bilingual details accurately')}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsSymptomModalOpen(false)}
                      className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-ink flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Modal Tabs Navigation */}
                  <div className="flex border-b border-slate-200 px-6 bg-slate-50/40 overflow-x-auto gap-1">
                    {[
                      { id: 'basic', labelEn: '1. Basic Info', labelBn: '১. সাধারণ তথ্য' },
                      { id: 'overview', labelEn: '2. Overview', labelBn: '২. ওভারভিউ' },
                      { id: 'causes', labelEn: '3. Causes', labelBn: '৩. কারণসমূহ' },
                      { id: 'redFlags', labelEn: '4. Red Flags', labelBn: '৪. রেড ফ্ল্যাগ' },
                      { id: 'investigations', labelEn: '5. Tests', labelBn: '৫. পরীক্ষা' },
                      { id: 'management', labelEn: '6. Advice', labelBn: '৬. পরামর্শ' },
                      { id: 'preview', labelEn: '👁️ Live Preview', labelBn: '👁️ লাইভ প্রিভিউ' },
                    ].map(t => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSymptomModalTab(t.id as any)}
                        className={`px-3.5 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                          symptomModalTab === t.id
                            ? 'border-teal-600 text-teal-700 bg-white'
                            : 'border-transparent text-muted hover:text-ink'
                        }`}
                      >
                        {language === 'bn' ? t.labelBn : t.labelEn}
                      </button>
                    ))}
                  </div>

                  {/* Modal Body / Form */}
                  <form onSubmit={handleSaveSymptom} className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
                    {/* TAB 1: BASIC INFO */}
                    {symptomModalTab === 'basic' && (
                      <div className="flex flex-col gap-4 animate-in fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-ink">Title (English) *</label>
                            <input
                              type="text"
                              required
                              value={symptomForm.titleEn}
                              onChange={(e) => {
                                const title = e.target.value;
                                setSymptomForm(prev => ({
                                  ...prev,
                                  titleEn: title,
                                  slug: prev.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                                }));
                              }}
                              placeholder="e.g. Fever & Recurring Chills"
                              className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:outline-none"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-ink">নাম (বাংলা) *</label>
                            <input
                              type="text"
                              required
                              value={symptomForm.titleBn}
                              onChange={(e) => setSymptomForm({ ...symptomForm, titleBn: e.target.value })}
                              placeholder="যেমন: জ্বর, কাঁপুনি ও সংক্রামক ব্যাধি"
                              className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-ink">URL Slug (Unique identifier) *</label>
                            <input
                              type="text"
                              required
                              value={symptomForm.slug}
                              onChange={(e) => setSymptomForm({ ...symptomForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                              placeholder="e.g. fever"
                              className="p-2.5 text-xs font-mono rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:outline-none"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-ink">Category (English)</label>
                            <input
                              type="text"
                              value={symptomForm.categoryEn}
                              onChange={(e) => setSymptomForm({ ...symptomForm, categoryEn: e.target.value })}
                              placeholder="e.g. Infectious & Viral Diseases"
                              className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:outline-none"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-ink">ক্যাটাগরি (বাংলা)</label>
                            <input
                              type="text"
                              value={symptomForm.categoryBn}
                              onChange={(e) => setSymptomForm({ ...symptomForm, categoryBn: e.target.value })}
                              placeholder="যেমন: সংক্রামক ও ভাইরাসজনিত রোগ"
                              className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-ink">Target Organ / System (English)</label>
                            <input
                              type="text"
                              value={symptomForm.organEn}
                              onChange={(e) => setSymptomForm({ ...symptomForm, organEn: e.target.value })}
                              placeholder="e.g. Immune System & Thermoregulation"
                              className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:outline-none"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-ink">শারীরিক অঙ্গ / সিস্টেম (বাংলা)</label>
                            <input
                              type="text"
                              value={symptomForm.organBn}
                              onChange={(e) => setSymptomForm({ ...symptomForm, organBn: e.target.value })}
                              placeholder="যেমন: রোগ প্রতিরোধ ব্যবস্থা ও তাপমাত্রা নিয়ন্ত্রণ"
                              className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Image selector */}
                        <div className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                          <label className="text-xs font-bold text-ink">Symptom Image Path or URL</label>
                          <input
                            type="text"
                            value={symptomForm.image}
                            onChange={(e) => setSymptomForm({ ...symptomForm, image: e.target.value })}
                            placeholder="/symptoms/fever.png"
                            className="p-2.5 text-xs font-mono rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:outline-none"
                          />

                          <span className="text-[11px] text-muted font-bold mt-1">Quick Select Image Presets:</span>
                          <div className="flex flex-wrap gap-2">
                            {symptomImagePresets.map(preset => (
                              <button
                                key={preset.path}
                                type="button"
                                onClick={() => setSymptomForm({ ...symptomForm, image: preset.path })}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                                  symptomForm.image === preset.path
                                    ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                <img src={preset.path} alt="" className="w-3.5 h-3.5 object-contain" />
                                <span>{preset.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 2: OVERVIEW */}
                    {symptomModalTab === 'overview' && (
                      <div className="flex flex-col gap-4 animate-in fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-ink">Short Summary (English) *</label>
                            <textarea
                              rows={3}
                              required
                              value={symptomForm.shortDescEn}
                              onChange={(e) => setSymptomForm({ ...symptomForm, shortDescEn: e.target.value })}
                              placeholder="Brief 1-2 sentence preview of the symptom..."
                              className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:outline-none"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-ink">সংক্ষিপ্ত বিবরণ (বাংলা) *</label>
                            <textarea
                              rows={3}
                              required
                              value={symptomForm.shortDescBn}
                              onChange={(e) => setSymptomForm({ ...symptomForm, shortDescBn: e.target.value })}
                              placeholder="কার্ডের প্রিভিউতে ১-২ লাইনের সারসংক্ষেপ লিখুন..."
                              className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-ink">Comprehensive Medical Overview (English)</label>
                            <textarea
                              rows={8}
                              value={symptomForm.overviewEn}
                              onChange={(e) => setSymptomForm({ ...symptomForm, overviewEn: e.target.value })}
                              placeholder="Detailed medical pathophysiological explanation..."
                              className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:outline-none font-sans leading-relaxed"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-ink">বিস্তারিত ক্লিনিক্যাল ওভারভিউ (বাংলা)</label>
                            <textarea
                              rows={8}
                              value={symptomForm.overviewBn}
                              onChange={(e) => setSymptomForm({ ...symptomForm, overviewBn: e.target.value })}
                              placeholder="লক্ষণ ও রোগের কারণ, ঝুঁকি ও চিকিৎসকের দৃষ্টিভঙ্গি বাংলায় বিস্তারিত লিখুন..."
                              className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:outline-none font-sans leading-relaxed"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 3: CAUSES */}
                    {symptomModalTab === 'causes' && (
                      <div className="flex flex-col gap-4 animate-in fade-in">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-xs font-bold text-ink">সম্ভাব্য কারণ ও সাব-টাইপসমূহ (Etiology & Sub-types)</h4>
                            <p className="text-[11px] text-muted">রোগের বিভিন্ন কারণ ও বিবরণ বাংলায় এবং ইংরেজিতে যুক্ত করুন।</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSymptomForm(prev => ({
                                ...prev,
                                causesEn: [...(prev.causesEn || []), { title: '', desc: '' }],
                                causesBn: [...(prev.causesBn || []), { title: '', desc: '' }],
                              }));
                            }}
                            className="px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-bold cursor-pointer hover:bg-teal-700 flex items-center gap-1 shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{language === 'bn' ? '+ কারণ যোগ করুন' : '+ Add Cause'}</span>
                          </button>
                        </div>

                        {(symptomForm.causesEn || []).map((cause, index) => (
                          <div key={index} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-3 relative">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                              <span className="text-xs font-bold text-teal-700 font-mono">Cause #{index + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setSymptomForm(prev => ({
                                    ...prev,
                                    causesEn: prev.causesEn?.filter((_, i) => i !== index),
                                    causesBn: prev.causesBn?.filter((_, i) => i !== index),
                                  }));
                                }}
                                className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Remove</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold text-ink">Title (English)</label>
                                <input
                                  type="text"
                                  value={cause.title}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setSymptomForm(prev => {
                                      const updated = [...(prev.causesEn || [])];
                                      updated[index] = { ...updated[index], title: val };
                                      return { ...prev, causesEn: updated };
                                    });
                                  }}
                                  placeholder="e.g. Viral Arboviral Infections"
                                  className="p-2 text-xs rounded-lg border border-slate-300 bg-white"
                                />
                              </div>

                              <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold text-ink">শিরোনাম (বাংলা)</label>
                                <input
                                  type="text"
                                  value={symptomForm.causesBn?.[index]?.title || ''}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setSymptomForm(prev => {
                                      const updated = [...(prev.causesBn || [])];
                                      updated[index] = { ...updated[index], title: val };
                                      return { ...prev, causesBn: updated };
                                    });
                                  }}
                                  placeholder="যেমন: ভাইরাল ও ডেঙ্গু সংক্রমণ"
                                  className="p-2 text-xs rounded-lg border border-slate-300 bg-white"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold text-ink">Description (English)</label>
                                <textarea
                                  rows={2}
                                  value={cause.desc}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setSymptomForm(prev => {
                                      const updated = [...(prev.causesEn || [])];
                                      updated[index] = { ...updated[index], desc: val };
                                      return { ...prev, causesEn: updated };
                                    });
                                  }}
                                  placeholder="Details in English..."
                                  className="p-2 text-xs rounded-lg border border-slate-300 bg-white"
                                />
                              </div>

                              <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold text-ink">বিবরণ (বাংলা)</label>
                                <textarea
                                  rows={2}
                                  value={symptomForm.causesBn?.[index]?.desc || ''}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setSymptomForm(prev => {
                                      const updated = [...(prev.causesBn || [])];
                                      updated[index] = { ...updated[index], desc: val };
                                      return { ...prev, causesBn: updated };
                                    });
                                  }}
                                  placeholder="বাংলা বিবরণ..."
                                  className="p-2 text-xs rounded-lg border border-slate-300 bg-white"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB 4: RED FLAGS */}
                    {symptomModalTab === 'redFlags' && (
                      <div className="flex flex-col gap-4 animate-in fade-in">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-xs font-bold text-red-600 flex items-center gap-1.5">
                              <AlertTriangle className="w-4 h-4" />
                              <span>জরুরি রেড ফ্ল্যাগ সতর্কবার্তা (Emergency Red Flags)</span>
                            </h4>
                            <p className="text-[11px] text-muted">রোগীর জরুরি লক্ষণসমূহ যা দেখলে অবিলম্বে ডাক্তারের কাছে যেতে হবে।</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSymptomForm(prev => ({
                                ...prev,
                                redFlagsEn: [...(prev.redFlagsEn || []), ''],
                                redFlagsBn: [...(prev.redFlagsBn || []), ''],
                              }));
                            }}
                            className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold cursor-pointer hover:bg-red-700 flex items-center gap-1 shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{language === 'bn' ? '+ রেড ফ্ল্যাগ যোগ করুন' : '+ Add Red Flag'}</span>
                          </button>
                        </div>

                        {(symptomForm.redFlagsEn || []).map((flag, index) => (
                          <div key={index} className="p-3.5 rounded-xl bg-red-50/50 border border-red-200 flex flex-col md:flex-row gap-3 items-center">
                            <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                              !
                            </span>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                              <input
                                type="text"
                                value={flag}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setSymptomForm(prev => {
                                    const updated = [...(prev.redFlagsEn || [])];
                                    updated[index] = val;
                                    return { ...prev, redFlagsEn: updated };
                                  });
                                }}
                                placeholder="Red flag warning in English..."
                                className="p-2 text-xs rounded-lg border border-red-200 bg-white"
                              />
                              <input
                                type="text"
                                value={symptomForm.redFlagsBn?.[index] || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setSymptomForm(prev => {
                                    const updated = [...(prev.redFlagsBn || [])];
                                    updated[index] = val;
                                    return { ...prev, redFlagsBn: updated };
                                  });
                                }}
                                placeholder="রেড ফ্ল্যাগ সতর্কতা বাংলায়..."
                                className="p-2 text-xs rounded-lg border border-red-200 bg-white"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setSymptomForm(prev => ({
                                  ...prev,
                                  redFlagsEn: prev.redFlagsEn?.filter((_, i) => i !== index),
                                  redFlagsBn: prev.redFlagsBn?.filter((_, i) => i !== index),
                                }));
                              }}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB 5: INVESTIGATIONS */}
                    {symptomModalTab === 'investigations' && (
                      <div className="flex flex-col gap-4 animate-in fade-in">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                              <TestTubes className="w-4 h-4" />
                              <span>প্রয়োজনীয় পরীক্ষা-নিরীক্ষা (Diagnostic Investigations)</span>
                            </h4>
                            <p className="text-[11px] text-muted">রোগ নির্ণয়ে প্রয়োজনীয় ল্যাবরেটরি ও ইমেজিং টেস্টের তালিকা।</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSymptomForm(prev => ({
                                ...prev,
                                investigationsEn: [...(prev.investigationsEn || []), ''],
                                investigationsBn: [...(prev.investigationsBn || []), ''],
                              }));
                            }}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold cursor-pointer hover:bg-blue-700 flex items-center gap-1 shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{language === 'bn' ? '+ টেস্ট যোগ করুন' : '+ Add Test'}</span>
                          </button>
                        </div>

                        {(symptomForm.investigationsEn || []).map((inv, index) => (
                          <div key={index} className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200 flex flex-col md:flex-row gap-3 items-center">
                            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                              {index + 1}
                            </span>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                              <input
                                type="text"
                                value={inv}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setSymptomForm(prev => {
                                    const updated = [...(prev.investigationsEn || [])];
                                    updated[index] = val;
                                    return { ...prev, investigationsEn: updated };
                                  });
                                }}
                                placeholder="Investigation in English (e.g. CBC with Platelet)..."
                                className="p-2 text-xs rounded-lg border border-blue-200 bg-white"
                              />
                              <input
                                type="text"
                                value={symptomForm.investigationsBn?.[index] || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setSymptomForm(prev => {
                                    const updated = [...(prev.investigationsBn || [])];
                                    updated[index] = val;
                                    return { ...prev, investigationsBn: updated };
                                  });
                                }}
                                placeholder="পরীক্ষার নাম বাংলায়..."
                                className="p-2 text-xs rounded-lg border border-blue-200 bg-white"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setSymptomForm(prev => ({
                                  ...prev,
                                  investigationsEn: prev.investigationsEn?.filter((_, i) => i !== index),
                                  investigationsBn: prev.investigationsBn?.filter((_, i) => i !== index),
                                }));
                              }}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB 6: MANAGEMENT */}
                    {symptomModalTab === 'management' && (
                      <div className="flex flex-col gap-4 animate-in fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-ink">Clinical Management & Advice (English)</label>
                            <textarea
                              rows={7}
                              value={symptomForm.managementEn}
                              onChange={(e) => setSymptomForm({ ...symptomForm, managementEn: e.target.value })}
                              placeholder="Doctor's clinical management approach, rationale against self-medication, and follow-up guidance in English..."
                              className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:outline-none font-sans leading-relaxed"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-ink">চিকিৎসা পরামর্শ ও ডাক্তারের মতামত (বাংলা)</label>
                            <textarea
                              rows={7}
                              value={symptomForm.managementBn}
                              onChange={(e) => setSymptomForm({ ...symptomForm, managementBn: e.target.value })}
                              placeholder="ডা. হানিফ তৌহিদের চিকিৎসাপদ্ধতি, ওষুধ সেবনের সতর্কতা ও দিকনির্দেশনা বাংলায় লিখুন..."
                              className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:outline-none font-sans leading-relaxed"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 7: LIVE PREVIEW */}
                    {symptomModalTab === 'preview' && (
                      <div className="flex flex-col gap-4 p-4 rounded-2xl bg-slate-100 border border-slate-200 animate-in fade-in">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-muted">Patient Portal Public Preview:</span>
                          <span className="text-[10px] bg-teal-600 text-white px-2 py-0.5 rounded-full font-bold">Live Replica</span>
                        </div>

                        <div className="p-6 rounded-3xl bg-white/90 border border-teal-500/20 shadow-xl flex flex-col gap-4">
                          <div className="flex items-start gap-4">
                            <img
                              src={symptomForm.image || '/symptoms/fever.png'}
                              alt=""
                              className="w-16 h-16 object-contain rounded-2xl p-2 bg-teal-50 border border-teal-100 shadow-sm"
                            />
                            <div>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/10 text-teal-800 border border-teal-500/20">
                                {language === 'bn' ? symptomForm.categoryBn : symptomForm.categoryEn}
                              </span>
                              <h3 className="font-serif font-bold text-lg text-ink mt-1">
                                {language === 'bn' ? (symptomForm.titleBn || 'শিরোনাম') : (symptomForm.titleEn || 'Title')}
                              </h3>
                              <p className="text-xs text-muted">
                                {language === 'bn' ? symptomForm.organBn : symptomForm.organEn}
                              </p>
                            </div>
                          </div>

                          <p className="text-xs text-ink/80 leading-relaxed font-serif italic border-l-2 border-teal-500 pl-3">
                            "{language === 'bn' ? (symptomForm.shortDescBn || 'সংক্ষিপ্ত বিবরণ...') : (symptomForm.shortDescEn || 'Short description...')}"
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                            <div className="p-3 rounded-xl bg-red-50/70 border border-red-200">
                              <h5 className="text-[11px] font-bold text-red-700 mb-1 flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                {language === 'bn' ? 'জরুরি রেড ফ্ল্যাগ' : 'Emergency Red Flags'}
                              </h5>
                              <ul className="text-[10px] text-ink/80 space-y-1 list-disc list-inside">
                                {(language === 'bn' ? symptomForm.redFlagsBn : symptomForm.redFlagsEn)?.filter(Boolean).map((rf, idx) => (
                                  <li key={idx}>{rf}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200">
                              <h5 className="text-[11px] font-bold text-blue-700 mb-1 flex items-center gap-1">
                                <TestTubes className="w-3.5 h-3.5" />
                                {language === 'bn' ? 'প্রয়োজনীয় টেস্টসমূহ' : 'Key Investigations'}
                              </h5>
                              <ul className="text-[10px] text-ink/80 space-y-1 list-disc list-inside">
                                {(language === 'bn' ? symptomForm.investigationsBn : symptomForm.investigationsEn)?.filter(Boolean).map((inv, idx) => (
                                  <li key={idx}>{inv}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Form Action Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2 gap-3 flex-wrap bg-white">
                      <div className="flex items-center gap-2">
                        {selectedSymptom && (
                          <button
                            type="button"
                            onClick={() => handleDeleteSymptom(selectedSymptom)}
                            className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>{language === 'bn' ? 'লক্ষণটি মুছুন' : 'Delete Symptom'}</span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setIsSymptomModalOpen(false)}
                          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                        >
                          {language === 'bn' ? 'বাতিল' : 'Cancel'}
                        </button>

                        <button
                          type="submit"
                          disabled={isSavingSymptom}
                          className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-ink text-white text-xs font-bold shadow-md shadow-teal-600/20 transition-all cursor-pointer flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          <span>
                            {isSavingSymptom
                              ? (language === 'bn' ? 'সংরক্ষণ হচ্ছে...' : 'Saving...')
                              : selectedSymptom
                              ? (language === 'bn' ? 'আপডেট সংরক্ষণ করুন' : 'Save Changes')
                              : (language === 'bn' ? 'লক্ষণ প্রকাশ করুন' : 'Publish Symptom')}
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
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

        {/* TAB: REVIEWS MANAGER */}
        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
            {/* Reviews List */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <h3 className="font-serif text-sm font-bold text-ink">
                  {language === 'bn' ? 'রোগী রিভিউ তালিকা' : 'Patient Reviews'}
                </h3>
                <div className="flex gap-1.5">
                  {adminReviews.length === 0 && (
                    <button
                      type="button"
                      onClick={seedDefaultReviews}
                      className="px-2 py-1 bg-accent/10 text-accent border border-accent/20 text-[9px] font-bold rounded-lg cursor-pointer"
                      title={language === 'bn' ? 'ডাটাবেজে ডিফল্ট রিভিউ যুক্ত করুন' : 'Seed default reviews to Supabase'}
                    >
                      {language === 'bn' ? 'ডিফল্ট লোড করুন' : 'Seed Default'}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedReview(null);
                      setReviewForm({
                        nameEn: '',
                        nameBn: '',
                        titleEn: '',
                        titleBn: '',
                        textEn: '',
                        textBn: '',
                        initials: '',
                      });
                    }}
                    className="px-2.5 py-1 bg-accent text-white text-[9px] font-bold rounded-lg cursor-pointer"
                  >
                    + Add New
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
                {adminReviews.length === 0 ? (
                  <div className="py-8 text-center text-muted text-xs border border-panel-border/30 rounded-xl bg-white/10">
                    {language === 'bn' ? 'কোনো রিভিউ পাওয়া যায়নি।' : 'No reviews found.'}
                  </div>
                ) : (
                  adminReviews.map((rev) => (
                    <div
                      key={rev.id}
                      onClick={() => handleEditReview(rev)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedReview?.id === rev.id
                          ? 'border-accent bg-accent/5'
                          : 'border-panel-border bg-white/20 hover:bg-white/40'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-ink line-clamp-1">
                          {language === 'bn' ? rev.reviewer_name_bn : rev.reviewer_name_en}
                        </h4>
                        <span className="text-[9.5px] bg-accent/10 text-accent px-1.5 rounded font-mono font-bold">
                          {rev.initials}
                        </span>
                      </div>
                      <span className="text-[9px] text-muted block mt-1">
                        {language === 'bn' ? rev.reviewer_title_bn : rev.reviewer_title_en}
                      </span>
                      <p className="text-[11px] text-ink/75 line-clamp-2 mt-1.5 italic bg-white/10 p-1.5 rounded border border-panel-border/20">
                        "{language === 'bn' ? rev.review_text_bn : rev.review_text_en}"
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Review Form */}
            <div className="lg:col-span-7">
              <GlassPanel className="p-5 flex flex-col gap-4">
                <h3 className="font-serif text-sm font-bold text-ink border-b border-line pb-1.5">
                  {selectedReview 
                    ? (language === 'bn' ? 'রিভিউ সম্পাদন করুন' : 'Edit Review') 
                    : (language === 'bn' ? 'নতুন রিভিউ যুক্ত করুন' : 'Add New Review')}
                </h3>

                <form onSubmit={handleSaveReview} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-ink">
                        Reviewer Name (English)
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewForm.nameEn}
                        onChange={(e) => setReviewForm({ ...reviewForm, nameEn: e.target.value })}
                        className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                        placeholder="e.g. Abul Hasan"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-ink">
                        রিভিউয়ারের নাম (বাংলা)
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewForm.nameBn}
                        onChange={(e) => setReviewForm({ ...reviewForm, nameBn: e.target.value })}
                        className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                        placeholder="যেমন: আবুল হাসান"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-ink">
                        Location / Title (English)
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewForm.titleEn}
                        onChange={(e) => setReviewForm({ ...reviewForm, titleEn: e.target.value })}
                        className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                        placeholder="e.g. Sylhet Sadar"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-ink">
                        অবস্থান / পদবী (বাংলা)
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewForm.titleBn}
                        onChange={(e) => setReviewForm({ ...reviewForm, titleBn: e.target.value })}
                        className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                        placeholder="যেমন: সিলেট সদর"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-ink">
                        Reviewer Initials (Optional - Auto-generated if blank)
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={reviewForm.initials}
                        onChange={(e) => setReviewForm({ ...reviewForm, initials: e.target.value })}
                        className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                        placeholder="e.g. AH"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-ink">
                      Review Content (English)
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={reviewForm.textEn}
                      onChange={(e) => setReviewForm({ ...reviewForm, textEn: e.target.value })}
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                      placeholder="Enter patient testimonial in English..."
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-ink">
                      রিভিউ বিবরণ (বাংলা)
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={reviewForm.textBn}
                      onChange={(e) => setReviewForm({ ...reviewForm, textBn: e.target.value })}
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                      placeholder="রোগীর সুস্থতার বিবরণ বাংলায় লিখুন..."
                    />
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-accent text-white font-semibold text-xs rounded-xl shadow-md hover:bg-ink transition-colors cursor-pointer text-center inline-flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>
                        {selectedReview
                          ? (language === 'bn' ? 'রিভিউ আপডেট করুন' : 'Update Review')
                          : (language === 'bn' ? 'রিভিউ সংরক্ষণ করুন' : 'Save Review')}
                      </span>
                    </button>
                    {selectedReview && (
                      <button
                        type="button"
                        onClick={() => handleDeleteReview(selectedReview)}
                        className="py-3 px-4 bg-red-50 border border-red-200 text-red-600 font-semibold text-xs rounded-xl hover:bg-red-100 transition-colors cursor-pointer text-center inline-flex items-center justify-center gap-1.5"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>{language === 'bn' ? 'ডিলিট' : 'Delete'}</span>
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
