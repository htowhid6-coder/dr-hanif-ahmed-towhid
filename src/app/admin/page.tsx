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
import { Save, Trash2, Download, Plus, LogOut, User, Building2, BookOpen, MessageSquare, GraduationCap, Sliders, Image as ImageIcon, Star, QrCode, Smartphone, Check } from 'lucide-react';

import { HeroSlidesManager } from '@/components/admin/HeroSlidesManager';
import { SiteSettingsManager } from '@/components/admin/SiteSettingsManager';
import { AboutPageManager } from '@/components/admin/AboutPageManager';
import { FaqManager } from '@/components/admin/FaqManager';
import { DiseasesManager } from '@/components/admin/DiseasesManager';
import { MediaManager } from '@/components/admin/MediaManager';
import { ImagePickerField } from '@/components/admin/ImagePickerField';

export default function AdminDashboard() {
  const { language } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState<'profile' | 'chamber' | 'hero' | 'about' | 'symptoms' | 'diseases' | 'faqs' | 'blog' | 'reviews' | 'settings' | 'media' | 'messages'>('profile');
  const [messages, setMessages] = useState<any[]>([]);


  // Profile Form States
  const [profile, setProfile] = useState({
    nameEn: 'Dr. Hanif Ahmed Towhid',
    nameBn: 'ডা. হানিফ আহমেদ তৌহিদ',
    designationEn: 'Medicine Specialist, Department of Medicine',
    designationBn: 'মেডিসিন বিশেষজ্ঞ, মেডিসিন বিভাগ',
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
    hoursEn: '5:00 PM – 9:00 PM (Friday & Tuesday Closed)',
    hoursBn: 'বিকাল ৫টা - রাত ৯টা পর্যন্ত (শুক্রবার ও মঙ্গলবার বন্ধ)',
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
    rating: 5,
    googleReviewUrl: '',
  });

  // Google Review QR & Link Settings
  const [reviewQrSettings, setReviewQrSettings] = useState({
    businessUrl: 'https://maps.google.com/?q=Popular+Medical+Center+Sylhet',
    qrCodeImage: '',
    titleEn: 'Leave Us a Google Review',
    titleBn: 'গুগল রিভিউ দিন',
    subtitleEn: 'Have you received treatment from Dr. Hanif Ahmed Towhid? Scan the QR code with your mobile camera or click below to share your experience on Google.',
    subtitleBn: 'ডা. হানিফ আহমেদ তৌহিদের নিকট চিকিৎসা নিয়েছেন? আপনার মূল্যবান আরোগ্য ও চিকিৎসা অভিজ্ঞতা জানাতে মোবাইল ক্যামেরা দিয়ে কিউআর কোডটি স্ক্যান করুন অথবা নিচের বাটনে ক্লিক করুন।',
    buttonTextEn: 'Write a Review on Google',
    buttonTextBn: 'গুগলে রিভিউ দিন',
  });
  const [isSavingQrSettings, setIsSavingQrSettings] = useState(false);
  const [copiedAdminQrUrl, setCopiedAdminQrUrl] = useState(false);

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
      // 1. Read metadata and QR settings from site_settings (global_settings) or localStorage
      let metaMap: Record<string, any> = {};
      try {
        const { data: setRow } = await supabase
          .from('site_settings')
          .select('data')
          .eq('id', 'global_settings')
          .maybeSingle();

        if (setRow?.data) {
          if (setRow.data.reviewsMetadata) metaMap = { ...setRow.data.reviewsMetadata };
          setReviewQrSettings(prev => ({
            ...prev,
            businessUrl: setRow.data.googleReviewBusinessUrl || prev.businessUrl,
            qrCodeImage: setRow.data.googleReviewQrCodeImage || '',
            titleEn: setRow.data.googleReviewTitleEn || prev.titleEn,
            titleBn: setRow.data.googleReviewTitleBn || prev.titleBn,
            subtitleEn: setRow.data.googleReviewSubtitleEn || prev.subtitleEn,
            subtitleBn: setRow.data.googleReviewSubtitleBn || prev.subtitleBn,
            buttonTextEn: setRow.data.googleReviewButtonTextEn || prev.buttonTextEn,
            buttonTextBn: setRow.data.googleReviewButtonTextBn || prev.buttonTextBn,
          }));
        }
      } catch (e) {
        console.warn('Could not read global_settings in admin:', e);
      }

      if (typeof window !== 'undefined') {
        try {
          const localMeta = localStorage.getItem('reviews_meta');
          if (localMeta) metaMap = { ...metaMap, ...JSON.parse(localMeta) };
          const localSite = localStorage.getItem('site_settings_data');
          if (localSite) {
            const parsed = JSON.parse(localSite);
            if (parsed.reviewsMetadata) metaMap = { ...metaMap, ...parsed.reviewsMetadata };
            if (parsed.googleReviewBusinessUrl) {
              setReviewQrSettings(prev => ({
                ...prev,
                businessUrl: parsed.googleReviewBusinessUrl || prev.businessUrl,
                qrCodeImage: parsed.googleReviewQrCodeImage || '',
                titleEn: parsed.googleReviewTitleEn || prev.titleEn,
                titleBn: parsed.googleReviewTitleBn || prev.titleBn,
                subtitleEn: parsed.googleReviewSubtitleEn || prev.subtitleEn,
                subtitleBn: parsed.googleReviewSubtitleBn || prev.subtitleBn,
                buttonTextEn: parsed.googleReviewButtonTextEn || prev.buttonTextEn,
                buttonTextBn: parsed.googleReviewButtonTextBn || prev.buttonTextBn,
              }));
            }
          }
        } catch (e) {}
      }

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        const enriched = data.map((r: any) => {
          const meta = metaMap[r.id] || metaMap[r.reviewer_name_en?.trim().toLowerCase()] || {};
          return {
            ...r,
            rating: typeof r.rating === 'number' ? r.rating : (meta.rating ?? 5),
            google_review_url: r.google_review_url || meta.google_review_url || '',
          };
        });
        setAdminReviews(enriched);
      }
    } catch (err) {
      console.error("Error loading reviews:", err);
    }
  };

  const handleEditReview = (review: any) => {
    setSelectedReview(review);
    setReviewForm({
      nameEn: review.reviewer_name_en || '',
      nameBn: review.reviewer_name_bn || '',
      titleEn: review.reviewer_title_en || '',
      titleBn: review.reviewer_title_bn || '',
      textEn: review.review_text_en || '',
      textBn: review.review_text_bn || '',
      initials: review.initials || '',
      rating: typeof review.rating === 'number' ? review.rating : 5,
      googleReviewUrl: review.google_review_url || '',
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

    const fullPayload: any = {
      reviewer_name_en: reviewForm.nameEn,
      reviewer_name_bn: reviewForm.nameBn,
      reviewer_title_en: reviewForm.titleEn,
      reviewer_title_bn: reviewForm.titleBn,
      review_text_en: reviewForm.textEn,
      review_text_bn: reviewForm.textBn,
      initials: computedInitials,
      rating: Number(reviewForm.rating) || 5,
      google_review_url: reviewForm.googleReviewUrl?.trim() || '',
    };

    const basePayload: any = {
      reviewer_name_en: reviewForm.nameEn,
      reviewer_name_bn: reviewForm.nameBn,
      reviewer_title_en: reviewForm.titleEn,
      reviewer_title_bn: reviewForm.titleBn,
      review_text_en: reviewForm.textEn,
      review_text_bn: reviewForm.textBn,
      initials: computedInitials,
    };

    const saveMetaToGlobalSettings = async (reviewIdOrKey: string, rating: number, url: string) => {
      try {
        if (typeof window !== 'undefined') {
          const currentMeta = JSON.parse(localStorage.getItem('reviews_meta') || '{}');
          currentMeta[reviewIdOrKey] = { rating, google_review_url: url };
          localStorage.setItem('reviews_meta', JSON.stringify(currentMeta));
        }

        const { data: setRow } = await supabase
          .from('site_settings')
          .select('data')
          .eq('id', 'global_settings')
          .maybeSingle();

        const currentData = setRow?.data || {};
        const reviewsMetadata = currentData.reviewsMetadata || {};
        reviewsMetadata[reviewIdOrKey] = { rating, google_review_url: url };

        await supabase
          .from('site_settings')
          .update({
            data: { ...currentData, reviewsMetadata },
            updated_at: new Date().toISOString()
          })
          .eq('id', 'global_settings');

        if (typeof window !== 'undefined') {
          const currentSite = JSON.parse(localStorage.getItem('site_settings_data') || '{}');
          currentSite.reviewsMetadata = reviewsMetadata;
          localStorage.setItem('site_settings_data', JSON.stringify(currentSite));
          window.dispatchEvent(new Event('site_settings_updated'));
        }
      } catch (err) {
        console.warn('Metadata mirror note:', err);
      }
    };

    try {
      if (selectedReview) {
        // Try updating with full payload (if columns exist)
        const updateRes = await supabase
          .from('reviews')
          .update(fullPayload)
          .eq('id', selectedReview.id);

        if (updateRes.error) {
          // Fall back to base columns if rating or google_review_url don't exist yet
          const fallbackRes = await supabase
            .from('reviews')
            .update(basePayload)
            .eq('id', selectedReview.id);
          if (fallbackRes.error) throw fallbackRes.error;
        }

        await saveMetaToGlobalSettings(selectedReview.id, Number(reviewForm.rating) || 5, reviewForm.googleReviewUrl?.trim() || '');
        if (reviewForm.nameEn?.trim()) {
          await saveMetaToGlobalSettings(reviewForm.nameEn.trim().toLowerCase(), Number(reviewForm.rating) || 5, reviewForm.googleReviewUrl?.trim() || '');
        }

        alert(language === 'bn' ? 'রিভিউ সফলভাবে আপডেট করা হয়েছে!' : 'Review updated successfully!');
      } else {
        // Try inserting full payload
        const insertRes = await supabase
          .from('reviews')
          .insert([fullPayload])
          .select();

        let insertedId = insertRes.data?.[0]?.id;

        if (insertRes.error) {
          const fallbackRes = await supabase
            .from('reviews')
            .insert([basePayload])
            .select();
          if (fallbackRes.error) throw fallbackRes.error;
          insertedId = fallbackRes.data?.[0]?.id;
        }

        if (insertedId) {
          await saveMetaToGlobalSettings(insertedId, Number(reviewForm.rating) || 5, reviewForm.googleReviewUrl?.trim() || '');
        }
        if (reviewForm.nameEn?.trim()) {
          await saveMetaToGlobalSettings(reviewForm.nameEn.trim().toLowerCase(), Number(reviewForm.rating) || 5, reviewForm.googleReviewUrl?.trim() || '');
        }

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
        rating: 5,
        googleReviewUrl: '',
      });
      fetchReviews();
    } catch (err: any) {
      console.error(err);
      alert(language === 'bn' ? `রিভিউ সেভ করতে সমস্যা হয়েছে: ${err.message || 'ত্রুটি'}` : `Failed to save review: ${err.message || 'Error'}`);
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

      // Clean up reviewsMetadata from global_settings and localStorage
      try {
        if (typeof window !== 'undefined') {
          const currentMeta = JSON.parse(localStorage.getItem('reviews_meta') || '{}');
          delete currentMeta[review.id];
          if (review.reviewer_name_en) delete currentMeta[review.reviewer_name_en.trim().toLowerCase()];
          localStorage.setItem('reviews_meta', JSON.stringify(currentMeta));
        }

        const { data: setRow } = await supabase
          .from('site_settings')
          .select('data')
          .eq('id', 'global_settings')
          .maybeSingle();

        if (setRow?.data?.reviewsMetadata) {
          const updatedMeta = { ...setRow.data.reviewsMetadata };
          delete updatedMeta[review.id];
          if (review.reviewer_name_en) delete updatedMeta[review.reviewer_name_en.trim().toLowerCase()];
          await supabase
            .from('site_settings')
            .update({
              data: { ...setRow.data, reviewsMetadata: updatedMeta },
              updated_at: new Date().toISOString()
            })
            .eq('id', 'global_settings');
        }
      } catch (e) {}

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
        rating: 5,
        googleReviewUrl: '',
      });
      fetchReviews();
    } catch (err: any) {
      console.error(err);
      alert(language === 'bn' ? 'ডিলিট করতে সমস্যা হয়েছে!' : 'Failed to delete review!');
    }
  };

  const handleSaveQrSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSavingQrSettings(true);
    try {
      const { data: setRow } = await supabase
        .from('site_settings')
        .select('data')
        .eq('id', 'global_settings')
        .maybeSingle();

      const currentData = setRow?.data || {};
      const updatedData = {
        ...currentData,
        googleReviewBusinessUrl: reviewQrSettings.businessUrl,
        googleReviewQrCodeImage: reviewQrSettings.qrCodeImage,
        googleReviewTitleEn: reviewQrSettings.titleEn,
        googleReviewTitleBn: reviewQrSettings.titleBn,
        googleReviewSubtitleEn: reviewQrSettings.subtitleEn,
        googleReviewSubtitleBn: reviewQrSettings.subtitleBn,
        googleReviewButtonTextEn: reviewQrSettings.buttonTextEn,
        googleReviewButtonTextBn: reviewQrSettings.buttonTextBn,
      };

      const { error } = await supabase
        .from('site_settings')
        .update({
          data: updatedData,
          updated_at: new Date().toISOString()
        })
        .eq('id', 'global_settings');

      if (error) throw error;

      if (typeof window !== 'undefined') {
        const local = JSON.parse(localStorage.getItem('site_settings_data') || '{}');
        localStorage.setItem('site_settings_data', JSON.stringify({ ...local, ...updatedData }));
        window.dispatchEvent(new Event('site_settings_updated'));
      }

      alert(language === 'bn' ? 'গুগল রিভিউ কিউআর কোড ও লিংক সেটিংস সফলভাবে সংরক্ষিত হয়েছে!' : 'Google Review QR code and link settings saved successfully!');
    } catch (err: any) {
      console.error(err);
      alert(language === 'bn' ? `সেভ করতে সমস্যা হয়েছে: ${err.message}` : `Failed to save: ${err.message}`);
    } finally {
      setIsSavingQrSettings(false);
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
          hoursEn: chamData.hours_en || '5:00 PM – 9:00 PM (Friday & Tuesday Closed)',
          hoursBn: chamData.hours_bn || 'বিকাল ৫টা - রাত ৯টা পর্যন্ত (শুক্রবার ও মঙ্গলবার বন্ধ)',
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
          readTime: d.read_time || '5 min read',
          image: d.image_url || '/blogs/diabetes_care_guide.jpg',
          category: d.category || 'General Medicine',
          categoryBn: d.category_bn || 'মেডিসিন পরামর্শ',
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
        image_url: post.image,
        category: post.category,
        category_bn: post.categoryBn,
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
    const generateSlug = (text: string) => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    };

    const postSlug = selectedPost ? selectedPost.slug : generateSlug(blogForm.title || 'new-post');

    const postPayload = {
      slug: postSlug,
      lang: blogForm.lang || 'bn',
      title: blogForm.title || '',
      excerpt: blogForm.excerpt || '',
      content: blogForm.content || '',
      read_time: blogForm.readTime || '5 min read',
      image_url: blogForm.image || '/blogs/diabetes_care_guide.jpg',
      category: blogForm.category || 'General Medicine',
      category_bn: blogForm.categoryBn || 'মেডিসিন পরামর্শ',
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
        image: blogForm.image || '/blogs/diabetes_care_guide.jpg',
        category: blogForm.category || 'General Medicine',
        categoryBn: blogForm.categoryBn || 'মেডিসিন পরামর্শ',
      };

      if (selectedPost) {
        setBlogs(blogs.map(b => b.slug === selectedPost.slug ? updatedPost : b));
        alert(language === 'bn' ? 'আর্টিকেল আপডেট করা হয়েছে!' : 'Article updated successfully!');
      } else {
        setBlogs([updatedPost, ...blogs]);
        alert(language === 'bn' ? 'নতুন আর্টিকেল যুক্ত করা হয়েছে!' : 'New article created successfully!');
      }

      setSelectedPost(null);
      setBlogForm({ title: '', excerpt: '', content: '', lang: 'bn', readTime: '5 min read', image: '/blogs/diabetes_care_guide.jpg', category: 'General Medicine', categoryBn: 'মেডিসিন পরামর্শ' });
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
        <div className="flex border-b border-line gap-1.5 flex-wrap">
          {([
            { id: 'profile', bn: '১. প্রোফাইল ও ডিগ্রি', en: '1. Profile' },
            { id: 'chamber', bn: '২. চেম্বার ও ম্যাপ', en: '2. Chamber' },
            { id: 'hero', bn: '৩. হিরো স্লাইডার', en: '3. Hero Slides' },
            { id: 'about', bn: '৪. About পেজ', en: '4. About Page' },
            { id: 'symptoms', bn: '৫. লক্ষণ চেকার', en: '5. Symptoms' },
            { id: 'diseases', bn: '৬. রোগ ও চিকিৎসা', en: '6. Diseases' },
            { id: 'faqs', bn: '৭. FAQ ও প্রশ্নোত্তর', en: '7. FAQs' },
            { id: 'blog', bn: '৮. হেলথ ব্লগ', en: '8. Blog Posts' },
            { id: 'reviews', bn: '৯. পেশেন্ট রিভিউ', en: '9. Reviews' },
            { id: 'settings', bn: '১০. সাইট সেটিংস ও ব্যানার', en: '10. Site Settings' },
            { id: 'media', bn: '১১. মিডিয়া ও ছবি', en: '11. Media Library' },
            { id: 'messages', bn: '১২. রোগীর বার্তা', en: '12. Messages' },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-accent text-white shadow-sm ring-2 ring-accent/20'
                  : 'bg-white/50 text-muted hover:bg-white hover:text-ink border border-panel-border/50'
              }`}
            >
              {language === 'bn' ? tab.bn : tab.en}
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
                  placeholder="e.g. Medicine Specialist, Department of Medicine"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">পদবী (বাংলা)</label>
                <input
                  type="text"
                  value={profile.designationBn}
                  onChange={(e) => setProfile({ ...profile, designationBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="যেমন: মেডিসিন বিশেষজ্ঞ, মেডিসিন বিভাগ"
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
                  placeholder="e.g. 5:00 PM – 9:00 PM (Friday & Tuesday Closed)"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-ink">রোগী দেখার সময় (বাংলা)</label>
                <input
                  type="text"
                  value={chamber.hoursBn}
                  onChange={(e) => setChamber({ ...chamber, hoursBn: e.target.value })}
                  className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                  placeholder="যেমন: বিকাল ৫টা - রাত ৯টা পর্যন্ত (শুক্রবার ও মঙ্গলবার বন্ধ)"
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

        {/* TAB 3: HERO & HOME SLIDES */}
        {activeTab === 'hero' && (
          <HeroSlidesManager />
        )}

        {/* TAB 4: ABOUT PAGE CONTENT */}
        {activeTab === 'about' && (
          <AboutPageManager />
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

                  {/* Blog Thumbnail Image Picker */}
                  <ImagePickerField
                    label={language === 'bn' ? 'ব্লগ থাম্বনেইল ছবি (Blog Featured Image):' : 'Blog Featured Image:'}
                    value={blogForm.image || ''}
                    onChange={(val) => setBlogForm({ ...blogForm, image: val })}
                    placeholder="/blogs/diabetes_care_guide.jpg"
                    helperText={language === 'bn' ? 'ডিভাইস থেকে ছবি আপলোড বা গ্যালারি থেকে সিলেক্ট করুন' : 'Upload from device or select from gallery'}
                  />

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
          <div className="flex flex-col gap-8 animate-in fade-in duration-300">
            {/* Top Grid: Reviews List and Review Creator/Editor */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Reviews List */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h3 className="font-serif text-sm font-bold text-ink flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>{language === 'bn' ? 'রোগী রিভিউ তালিকা' : 'Patient Reviews'}</span>
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
                          rating: 5,
                          googleReviewUrl: '',
                        });
                      }}
                      className="px-2.5 py-1 bg-accent text-white text-[9px] font-bold rounded-lg cursor-pointer shadow-xs hover:bg-ink transition-colors"
                    >
                      + Add New
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3 max-h-[560px] overflow-y-auto pr-1">
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
                            ? 'border-accent bg-accent/5 ring-1 ring-accent/30'
                            : 'border-panel-border bg-white/20 hover:bg-white/40'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-xs font-bold text-ink line-clamp-1">
                            {language === 'bn' ? rev.reviewer_name_bn : rev.reviewer_name_en}
                          </h4>
                          <span className="text-[9.5px] bg-accent/10 text-accent px-1.5 rounded font-mono font-bold">
                            {rev.initials || 'PT'}
                          </span>
                        </div>

                        <span className="text-[9px] text-muted block mt-0.5">
                          {language === 'bn' ? rev.reviewer_title_bn : rev.reviewer_title_en}
                        </span>

                        {/* Stars & Google Link Indicator */}
                        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3 h-3 ${
                                  s <= (rev.rating ?? 5)
                                    ? 'text-amber-400 fill-amber-400 drop-shadow-xs'
                                    : 'text-slate-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-mono font-bold text-ink/75">
                            {(rev.rating ?? 5).toFixed(1)}
                          </span>

                          {rev.google_review_url && (
                            <a
                              href={rev.google_review_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="ml-auto inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 text-[9px] font-semibold border border-blue-200 cursor-pointer transition-colors"
                              title="Open original review on Google"
                            >
                              <span>Google Review</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>

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
                  <div className="flex justify-between items-center border-b border-line pb-2 flex-wrap gap-2">
                    <h3 className="font-serif text-sm font-bold text-ink flex items-center gap-2">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span>
                        {selectedReview 
                          ? (language === 'bn' ? 'রিভিউ সম্পাদন করুন' : 'Edit Review') 
                          : (language === 'bn' ? 'নতুন রিভিউ যুক্ত করুন' : 'Add New Review')}
                      </span>
                    </h3>

                    {selectedReview && (
                      <span className="text-[10px] text-muted font-mono">
                        ID: {selectedReview.id.slice(0, 8)}...
                      </span>
                    )}
                  </div>

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

                    {/* FEATURE 3: Customizable Star Rating Picker */}
                    <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <label className="text-[11px] font-bold text-amber-950 flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>{language === 'bn' ? 'রিভিউ স্টার রেটিং (Star Rating: ১ - ৫)' : 'Review Star Rating (1 - 5 Stars)'}</span>
                        </label>
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-amber-200/70 text-amber-900 border border-amber-300">
                          {reviewForm.rating} {language === 'bn' ? 'স্টার' : 'Stars'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 flex-wrap mt-1">
                        {/* Interactive Clickable 5 Stars */}
                        <div className="flex items-center gap-1 bg-white p-1.5 rounded-xl border border-amber-200 shadow-xs">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setReviewForm({ ...reviewForm, rating: s })}
                              className="p-1 hover:scale-125 transition-transform cursor-pointer"
                              title={`${s} Star${s > 1 ? 's' : ''}`}
                            >
                              <Star
                                className={`w-5 h-5 transition-colors ${
                                  s <= reviewForm.rating
                                    ? 'text-amber-400 fill-amber-400 drop-shadow-xs'
                                    : 'text-slate-300 hover:text-amber-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>

                        {/* Quick Presets */}
                        <div className="flex items-center gap-1 flex-wrap">
                          {[5, 4, 3, 2, 1].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setReviewForm({ ...reviewForm, rating: num })}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                                reviewForm.rating === num
                                  ? 'bg-amber-500 text-white shadow-xs scale-105'
                                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              {num}★
                            </button>
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-amber-900/80 mt-0.5">
                        {language === 'bn' 
                          ? 'রোগী গুগলে যত স্টার দিয়েছেন (যেমন ৪ বা ৫ স্টার), সেই স্টার নির্বাচন করুন। ওয়েবসাইটে এই রেটিং প্রদর্শিত হবে।' 
                          : 'Select the actual rating given by the patient on Google (e.g. 4 or 5 stars).'}
                      </p>
                    </div>

                    {/* FEATURE 1: Google Review Direct URL Input */}
                    <div className="flex flex-col gap-1 p-3 rounded-2xl bg-blue-50/40 border border-blue-200/60">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-blue-950 flex items-center gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                          <span>
                            {language === 'bn' 
                              ? 'আসল গুগল রিভিউ লিংক (Google Review URL - ঐচ্ছিক)' 
                              : 'Real Google Review Link (Optional)'}
                          </span>
                        </label>

                        {reviewForm.googleReviewUrl && (
                          <a
                            href={reviewForm.googleReviewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-blue-600 font-semibold hover:underline flex items-center gap-0.5"
                          >
                            <span>{language === 'bn' ? 'লিংক যাচাই করুন' : 'Test Link'}</span>
                            <ArrowUpRight className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                      <input
                        type="url"
                        value={reviewForm.googleReviewUrl}
                        onChange={(e) => setReviewForm({ ...reviewForm, googleReviewUrl: e.target.value })}
                        className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                        placeholder="e.g. https://maps.app.goo.gl/... or Google Maps direct review link"
                      />
                      <span className="text-[9.5px] text-blue-900/70">
                        {language === 'bn'
                          ? 'এখানে লিংক দিলে ভিজিটররা এই রিভিউ কার্ডে "গুগল রিভিউ দেখুন" বাটনে ক্লিক করে আসল রিভিউ দেখতে পারবে।'
                          : 'Visitors will be able to click "Google Review" on this review to view the verified review on Google.'}
                      </span>
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

            {/* FEATURE 2: Dedicated "Leave Us a Google Review" QR Code & Review Collection Section */}
            <GlassPanel className="p-6 md:p-8 rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-white/95 via-emerald-50/30 to-teal-50/40 shadow-xl">
              <div className="flex justify-between items-center border-b border-line pb-3 mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-ink flex items-center gap-2">
                      <span>{language === 'bn' ? 'গুগল রিভিউ কিউআর কোড ও কালেকশন সেটিংস' : 'Leave Us a Google Review (QR Code & Settings)'}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-sans font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                        Public QR Station
                      </span>
                    </h3>
                    <p className="text-xs text-muted mt-0.5">
                      {language === 'bn' 
                        ? 'রোগীরা যাতে চেম্বারে বা ওয়েবসাইটে মোবাইল দিয়ে স্ক্যান করে সরাসরি গুগল রিভিউ দিতে পারে, তার কিউআর কোড ও লিংক পরিচালনা করুন।' 
                        : 'Manage the public QR code and direct submission link where patients leave their Google review.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSaveQrSettings()}
                  disabled={isSavingQrSettings}
                  className="px-5 py-2.5 bg-accent hover:bg-ink text-white text-xs font-semibold rounded-xl shadow-md cursor-pointer inline-flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>
                    {isSavingQrSettings 
                      ? (language === 'bn' ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') 
                      : (language === 'bn' ? 'কিউআর সেটিংস সংরক্ষণ করুন' : 'Save QR Settings')}
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: QR Configuration Inputs */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  {/* Google Review Submission Link */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-bold text-ink flex items-center gap-1.5">
                        <ExternalLink className="w-3.5 h-3.5 text-accent" />
                        <span>{language === 'bn' ? 'গুগল রিভিউ লেখার ডিরেক্ট লিংক (Business Review URL)' : 'Google Review Write-A-Review URL'}</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (typeof navigator !== 'undefined' && navigator.clipboard) {
                              navigator.clipboard.writeText(reviewQrSettings.businessUrl);
                              setCopiedAdminQrUrl(true);
                              setTimeout(() => setCopiedAdminQrUrl(false), 2000);
                            }
                          }}
                          className="text-[10px] text-accent hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          {copiedAdminQrUrl ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedAdminQrUrl ? (language === 'bn' ? 'কপি হয়েছে' : 'Copied') : (language === 'bn' ? 'লিংক কপি' : 'Copy')}</span>
                        </button>
                        {reviewQrSettings.businessUrl && (
                          <a
                            href={reviewQrSettings.businessUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-blue-600 hover:underline inline-flex items-center gap-0.5"
                          >
                            <span>{language === 'bn' ? 'লিংক খুলুন' : 'Open Link'}</span>
                            <ArrowUpRight className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <input
                      type="url"
                      value={reviewQrSettings.businessUrl}
                      onChange={(e) => setReviewQrSettings({ ...reviewQrSettings, businessUrl: e.target.value })}
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                      placeholder="e.g. https://search.google.com/local/writereview?placeid=... or Google Maps link"
                    />
                    <span className="text-[10px] text-muted">
                      {language === 'bn'
                        ? 'রোগীরা এই লিংকে ঢুকে সরাসরি গুগল রিভিউ লিখতে পারবে। কিউআর কোড এই লিংক থেকেই তৈরি হবে।'
                        : 'Patients will land on this Google page to write their review. The QR code encodes this URL.'}
                    </span>
                  </div>

                  {/* QR Code Image Upload / Picker */}
                  <ImagePickerField
                    label={language === 'bn' ? 'কাস্টম কিউআর কোড ছবি (ঐচ্ছিক - খালি রাখলে অটো জেনারেট হবে)' : 'Custom QR Code Image (Optional - Auto-generated if empty)'}
                    value={reviewQrSettings.qrCodeImage}
                    onChange={(val) => setReviewQrSettings({ ...reviewQrSettings, qrCodeImage: val })}
                    placeholder="/qr-google-review.png or URL..."
                    helperText={language === 'bn' ? 'আপনি চাইলে গুগল বিজনেস থেকে ডাউনলোড করা কিউআর ছবি আপলোড করতে পারেন, অথবা খালি রাখলে স্বয়ংক্রিয়ভাবে তৈরি হবে।' : 'Upload custom Google QR image, or leave empty to auto-generate.'}
                  />

                  {/* Title En / Bn */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-ink">QR Section Title (English)</label>
                      <input
                        type="text"
                        value={reviewQrSettings.titleEn}
                        onChange={(e) => setReviewQrSettings({ ...reviewQrSettings, titleEn: e.target.value })}
                        className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                        placeholder="Leave Us a Google Review"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-ink">কিউআর সেকশন শিরোনাম (বাংলা)</label>
                      <input
                        type="text"
                        value={reviewQrSettings.titleBn}
                        onChange={(e) => setReviewQrSettings({ ...reviewQrSettings, titleBn: e.target.value })}
                        className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                        placeholder="গুগলে আপনার আরোগ্য ও চিকিৎসা রিভিউ দিন"
                      />
                    </div>
                  </div>

                  {/* Subtitle En / Bn */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-ink">Instructions / Subtitle (English)</label>
                      <textarea
                        rows={2}
                        value={reviewQrSettings.subtitleEn}
                        onChange={(e) => setReviewQrSettings({ ...reviewQrSettings, subtitleEn: e.target.value })}
                        className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                        placeholder="Scan QR code with camera or click below to share your experience on Google."
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-ink">নির্দেশনা / সাবটাইটেল (বাংলা)</label>
                      <textarea
                        rows={2}
                        value={reviewQrSettings.subtitleBn}
                        onChange={(e) => setReviewQrSettings({ ...reviewQrSettings, subtitleBn: e.target.value })}
                        className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                        placeholder="আপনার মূল্যবান অভিজ্ঞতা জানাতে মোবাইল ক্যামেরা দিয়ে কিউআর কোড স্ক্যান করুন..."
                      />
                    </div>
                  </div>

                  {/* Button Text En / Bn */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-ink">Button Label (English)</label>
                      <input
                        type="text"
                        value={reviewQrSettings.buttonTextEn}
                        onChange={(e) => setReviewQrSettings({ ...reviewQrSettings, buttonTextEn: e.target.value })}
                        className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                        placeholder="Write a Review on Google"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-ink">বাটন টেক্সট (বাংলা)</label>
                      <input
                        type="text"
                        value={reviewQrSettings.buttonTextBn}
                        onChange={(e) => setReviewQrSettings({ ...reviewQrSettings, buttonTextBn: e.target.value })}
                        className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                        placeholder="গুগলে রিভিউ দিন"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Live QR Preview & Print/Download */}
                <div className="lg:col-span-5 flex flex-col items-center gap-4">
                  <div className="w-full bg-white rounded-3xl p-6 border-2 border-emerald-200/90 shadow-lg flex flex-col items-center text-center relative overflow-hidden">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3">
                      {language === 'bn' ? 'লাইভ প্রিভিউ (স্মার্টফোনে স্ক্যান করুন)' : 'Live Preview (Scan With Phone)'}
                    </span>

                    {/* QR Code Presentation Box */}
                    <div className="relative p-3 bg-white rounded-2xl shadow-md border border-slate-200 my-2">
                      <img
                        src={
                          reviewQrSettings.qrCodeImage?.trim()
                            ? reviewQrSettings.qrCodeImage
                            : `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
                                reviewQrSettings.businessUrl || 'https://maps.google.com/?q=Popular+Medical+Center+Sylhet'
                              )}&margin=12`
                        }
                        alt="Live Google Review QR Code"
                        className="w-44 h-44 object-contain rounded-lg"
                      />
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-ink mt-2">
                      <Smartphone className="w-3.5 h-3.5 text-accent" />
                      <span>{language === 'bn' ? 'ক্যামেরা দিয়ে স্ক্যান করুন' : 'Scan with phone camera'}</span>
                    </div>

                    <h4 className="font-serif text-sm font-bold text-ink mt-2">
                      {language === 'bn' ? reviewQrSettings.titleBn : reviewQrSettings.titleEn}
                    </h4>

                    <p className="text-[11px] text-muted line-clamp-2 px-2 mt-1">
                      {language === 'bn' ? reviewQrSettings.subtitleBn : reviewQrSettings.subtitleEn}
                    </p>

                    <div className="flex items-center gap-2 mt-4 w-full">
                      <a
                        href={reviewQrSettings.businessUrl || 'https://maps.google.com/?q=Popular+Medical+Center+Sylhet'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-3 rounded-xl bg-accent hover:bg-ink text-white text-xs font-semibold shadow transition-colors inline-flex items-center justify-center gap-1.5"
                      >
                        <span>{language === 'bn' ? reviewQrSettings.buttonTextBn : reviewQrSettings.buttonTextEn}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={
                          reviewQrSettings.qrCodeImage?.trim()
                            ? reviewQrSettings.qrCodeImage
                            : `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(
                                reviewQrSettings.businessUrl || 'https://maps.google.com/?q=Popular+Medical+Center+Sylhet'
                              )}&margin=15`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        download="Dr_Hanif_Towhid_Google_Review_QR.png"
                        className="p-2.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-ink text-xs font-semibold transition-colors inline-flex items-center justify-center"
                        title={language === 'bn' ? 'কিউআর কোড ডাউনলোড করুন' : 'Download High-Res QR for Print'}
                      >
                        <Download className="w-4 h-4 text-accent" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </GlassPanel>

          </div>
        )}

        {/* TAB: DISEASES & CONDITIONS LIBRARY */}
        {activeTab === 'diseases' && (
          <DiseasesManager />
        )}

        {/* TAB: FAQS & PATIENT ADVISORY */}
        {activeTab === 'faqs' && (
          <FaqManager />
        )}

        {/* TAB: SITE SETTINGS & BANNERS */}
        {activeTab === 'settings' && (
          <SiteSettingsManager />
        )}

        {/* TAB: MEDIA & ASSETS LIBRARY */}
        {activeTab === 'media' && (
          <MediaManager />
        )}

        {/* TAB: PATIENT MESSAGES */}
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
