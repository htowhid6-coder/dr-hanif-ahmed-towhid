'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import supabase from '@/lib/supabase';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  CheckCircle2, 
  Send, 
  MessageCircle, 
  Navigation, 
  ExternalLink,
  Clock,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: '' as 'Male' | 'Female' | '',
    msg: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState('');
  
  // Dynamic Google Map state (fetched from backend/admin or localStorage fallback)
  const defaultEmbed = 'https://maps.google.com/maps?q=Popular+Medical+Center+Sylhet+Kazalshah&t=&z=16&ie=UTF8&iwloc=&output=embed';
  const defaultDirect = 'https://maps.google.com/?q=Popular+Medical+Center+Sylhet';
  
  const [mapEmbedUrl, setMapEmbedUrl] = useState<string>(defaultEmbed);
  const [directMapLink, setDirectMapLink] = useState<string>(defaultDirect);

  useEffect(() => {
    async function loadChamberMap() {
      try {
        if (typeof window !== 'undefined') {
          const localMap = localStorage.getItem('chamber_map_url');
          const localDirect = localStorage.getItem('chamber_direct_map_link');
          if (localMap) setMapEmbedUrl(localMap);
          if (localDirect) setDirectMapLink(localDirect);
        }

        const { data } = await supabase
          .from('chambers')
          .select('*')
          .eq('id', '00000000-0000-0000-0000-000000000000')
          .maybeSingle();

        if (data) {
          if (data.map_url) {
            setMapEmbedUrl(data.map_url);
            if (typeof window !== 'undefined') localStorage.setItem('chamber_map_url', data.map_url);
          }
          if (data.direct_map_link) {
            setDirectMapLink(data.direct_map_link);
            if (typeof window !== 'undefined') localStorage.setItem('chamber_direct_map_link', data.direct_map_link);
          }
        }
      } catch (err) {
        console.warn("Chamber map fetch notice:", err);
      }
    }
    loadChamberMap();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);

    const genderDisplay = formData.gender
      ? (language === 'bn'
          ? (formData.gender === 'Male' ? 'পুরুষ (Male)' : 'মহিলা (Female)')
          : formData.gender)
      : '';

    // Format WhatsApp message text
    const messageBody =
      `*New Patient Inquiry - Dr. Hanif Ahmed Towhid*\n\n` +
      `👤 *Patient Name:* ${formData.name}\n` +
      (formData.age ? `🎂 *Age:* ${formData.age} ${language === 'bn' ? 'বছর' : 'years'}\n` : '') +
      (genderDisplay ? `⚧ *Sex / Gender:* ${genderDisplay}\n` : '') +
      `📞 *Mobile Number:* ${formData.phone}\n` +
      `📝 *Query / Message:*\n${formData.msg || (language === 'bn' ? 'চেম্বার সিরিয়াল ও চিকিৎসা পরামর্শ সংক্রান্ত বার্তা।' : 'Appointment Serial & Consultation Query.')}\n\n` +
      `🌐 _Sent via official chamber website: drhaniftowhid.com_`;

    const whatsappUrl = `https://wa.me/8801346132486?text=${encodeURIComponent(messageBody)}`;
    setLastWhatsappUrl(whatsappUrl);

    try {
      const details = [
        formData.age ? `Age: ${formData.age}` : null,
        formData.gender ? `Sex: ${formData.gender}` : null,
      ].filter(Boolean).join(' | ');

      // Save record to backend messages table for admin logs & CSV records
      await supabase.from('messages').insert({
        name: formData.name,
        email: '',
        phone: formData.phone,
        subject: details ? `Contact Form (${details})` : 'Contact Form WhatsApp Message',
        message: `${details ? `[${details}]\n` : ''}${formData.msg || 'Appointment Serial / Consultation Request'}`
      });
    } catch (err) {
      console.warn("Backend log notice:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);

      // Open WhatsApp automatically in a new tab
      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFormData({ name: '', phone: '', age: '', gender: '', msg: '' });
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
      <main className="relative z-10 py-10 md:py-14 px-4 md:px-8 max-w-5xl mx-auto flex flex-col gap-8 w-full">
        {/* Header Intro */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <GlassPanel className="flex flex-col gap-4 p-6 md:p-8">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                <span className="w-6 h-0.5 bg-accent inline-block"></span>
                <Sparkles className="w-3.5 h-3.5" />
                {language === 'bn' ? 'চেম্বার ও যোগাযোগ' : 'Chamber & Contacts'}
              </span>
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-ink">
                {language === 'bn' ? 'সরাসরি সিরিয়াল বুকিং ও চেম্বার অবস্থান' : 'Consultation Booking & Chamber Location'}
              </h1>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-muted pt-2 border-t border-line/60 max-w-3xl">
              {language === 'bn'
                ? 'সিলেটের কাজলশাহের নিউ মেডিকেল রোডে অবস্থিত পপুলার মেডিকেল সেন্টারে ডা. হানিফ আহমেদ তৌহিদকে দেখানোর সময়সূচী, যোগাযোগ এবং গুগল ম্যাপের মাধ্যমে সঠিক অবস্থান জেনে নিন।'
                : 'Official contact coordinates and Google Map routing for booking consultation appointments at Popular Medical Center, Sylhet.'}
            </p>
          </GlassPanel>
        </section>

        {/* Detailed Info + WhatsApp Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Chamber Coordinates (Left) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <GlassPanel className="p-6 md:p-7 flex flex-col gap-5">
              <h2 className="font-serif text-base md:text-lg font-bold text-ink border-b border-line pb-2 flex items-center gap-2">
                <BuildingIcon className="w-4 h-4 text-accent" />
                <span>{language === 'bn' ? 'যোগাযোগের তথ্য' : 'Direct Coordinates'}</span>
              </h2>

              <div className="flex flex-col gap-4.5">
                {/* Chamber Address */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center text-accent shrink-0 mt-0.5 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink">{language === 'bn' ? 'চেম্বার ঠিকানা:' : 'Chamber Address:'}</h4>
                    <p className="text-xs text-muted leading-relaxed mt-0.5 font-normal">
                      Popular Medical Center Ltd.<br />
                      {language === 'bn' ? '(৬ষ্ঠ তলা, রুম ৬০৫), নিউ মেডিকেল রোড, কাজলশাহ, সিলেট।' : '(6th Floor, Room #605), New Medical Road, Kazalshah, Sylhet.'}
                    </p>
                  </div>
                </div>

                {/* Visiting Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center text-accent shrink-0 mt-0.5 shadow-sm">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink">{language === 'bn' ? 'রোগী দেখার সময়সূচী:' : 'Visiting Hours:'}</h4>
                    <p className="text-xs text-muted leading-relaxed mt-0.5">
                      {language === 'bn' ? 'প্রতিদিন বিকাল ৫:০০টা – রাত ৯:০০টা' : '5:00 PM – 9:00 PM Daily'}
                    </p>
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      {language === 'bn' ? 'প্রতি শুক্রবার ও মঙ্গলবার চেম্বার বন্ধ' : 'Friday & Tuesday Closed'}
                    </span>
                  </div>
                </div>

                {/* Ticket Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center text-accent shrink-0 mt-0.5 shadow-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink">{language === 'bn' ? 'টিকিট ও সিরিয়াল নম্বর:' : 'Serial Booking Phone:'}</h4>
                    <a href="tel:+8801346132486" className="text-xs text-accent font-bold hover:underline block mt-0.5">
                      01346-132486
                    </a>
                    <span className="text-[10px] text-muted block">({language === 'bn' ? 'রোগী দেখানোর দিন সকাল ৯টার পর কল দিন' : 'Call starting from 9:00 AM on visit day'})</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center text-accent shrink-0 mt-0.5 shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink">{language === 'bn' ? 'ইমেইল ঠিকানা:' : 'Official Email:'}</h4>
                    <a href="mailto:htowhid6@gmail.com" className="text-xs text-accent font-semibold hover:underline block mt-0.5">
                      htowhid6@gmail.com
                    </a>
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-start gap-3">
                  <a
                    href="https://www.facebook.com/share/1DHArPTjmH/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
                    title="Dr. Hanif Ahmed Towhid Official Facebook Page"
                    aria-label="Facebook Page"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-xs font-bold text-ink">{language === 'bn' ? 'অফিশিয়াল ফেসবুক পেজ:' : 'Official Facebook Page:'}</h4>
                    <a
                      href="https://www.facebook.com/share/1DHArPTjmH/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-[11px] font-semibold shadow-xs hover:shadow transition-all w-fit cursor-pointer"
                      title="Dr. Hanif Ahmed Towhid Official Facebook Page"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>

          {/* Send Message to Doctor WhatsApp Form (Right) */}
          <div className="md:col-span-7">
            <GlassPanel className="p-6 md:p-8">
              <div className="flex items-center justify-between border-b border-line pb-2 mb-4">
                <h2 className="font-serif text-base md:text-lg font-bold text-ink flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-accent" />
                  <span>{language === 'bn' ? 'ডাক্তারের হোয়াটসঅ্যাপে বার্তা পাঠান' : 'Send Message to Doctor (WhatsApp)'}</span>
                </h2>
                <span className="text-[10px] font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                  {language === 'bn' ? 'সরাসরি হোয়াটসঅ্যাপ' : 'Direct WhatsApp'}
                </span>
              </div>

              {submitted ? (
                <div className="py-8 px-4 text-center flex flex-col items-center justify-center gap-4 bg-accent/10 border border-accent/25 rounded-2xl animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base md:text-lg font-bold text-ink">
                      {language === 'bn' ? 'বার্তা প্রস্তুত ও রেকর্ড সম্পন্ন!' : 'Message Prepared & Logged!'}
                    </h4>
                    <p className="text-xs text-muted max-w-md mt-1">
                      {language === 'bn'
                        ? 'আপনার বার্তাটি চিকিৎসকের হোয়াটসঅ্যাপে পাঠানোর জন্য প্রস্তুত করা হয়েছে। ব্রাউজারে স্বয়ংক্রিয়ভাবে হোয়াটসঅ্যাপ ওপেন না হলে নিচের বাটনে ক্লিক করুন।'
                        : 'Your inquiry has been formatted for Dr. Hanif Towhid on WhatsApp. If WhatsApp did not open automatically, please click below.'}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center mt-1">
                    {lastWhatsappUrl && (
                      <a
                        href={lastWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-ink text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে খুলুন' : 'Open in WhatsApp'}</span>
                      </a>
                    )}
                    <button
                      onClick={handleResetForm}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/70 hover:bg-white text-ink font-semibold text-xs rounded-xl border border-line transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-accent" />
                      <span>{language === 'bn' ? 'আরেকটি বার্তা পাঠান' : 'Send Another'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink" htmlFor="name">
                      {language === 'bn' ? 'রোগীর পূর্ণ নাম (আবশ্যক):' : 'Patient Name (Required):'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="p-3 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                      placeholder={language === 'bn' ? 'যেমন: মোহাম্মদ রহিম উদ্দিন' : 'e.g. Rahim Uddin'}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink" htmlFor="phone">
                      {language === 'bn' ? 'মোবাইল নাম্বার (আবশ্যক):' : 'Mobile Number (Required):'}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="p-3 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                      placeholder="e.g. 01712-XXXXXX"
                    />
                  </div>

                  {/* Age and Sex / Gender Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Age Input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-ink" htmlFor="age">
                        {language === 'bn' ? 'রোগীর বয়স (Age):' : 'Patient Age:'}
                      </label>
                      <input
                        type="number"
                        id="age"
                        min="1"
                        max="120"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="p-3 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                        placeholder={language === 'bn' ? 'যেমন: ৪৫' : 'e.g. 45'}
                      />
                    </div>

                    {/* Sex / Gender Selection */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-ink">
                        {language === 'bn' ? 'লিঙ্গ (Sex / Gender):' : 'Sex / Gender:'}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              gender: formData.gender === 'Male' ? '' : 'Male'
                            })
                          }
                          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer select-none ${
                            formData.gender === 'Male'
                              ? 'bg-accent text-white border-accent shadow-sm ring-2 ring-accent/20'
                              : 'bg-white/95 text-ink/85 border-slate-300 hover:border-accent/60 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-sm">👨</span>
                          <span>{language === 'bn' ? 'পুরুষ (Male)' : 'Male'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              gender: formData.gender === 'Female' ? '' : 'Female'
                            })
                          }
                          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer select-none ${
                            formData.gender === 'Female'
                              ? 'bg-accent text-white border-accent shadow-sm ring-2 ring-accent/20'
                              : 'bg-white/95 text-ink/85 border-slate-300 hover:border-accent/60 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-sm">👩</span>
                          <span>{language === 'bn' ? 'মহিলা (Female)' : 'Female'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink" htmlFor="msg">
                      {language === 'bn' ? 'আপনার শারীরিক সমস্যা বা সিরিয়াল সংক্রান্ত বার্তা (ঐচ্ছিক):' : 'Your Query or Appointment Request (Optional):'}
                    </label>
                    <textarea
                      id="msg"
                      rows={4}
                      value={formData.msg}
                      onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                      className="p-3 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm resize-none"
                      placeholder={
                        language === 'bn'
                          ? 'আপনার শারীরিক লক্ষণ, সমস্যার বিবরণ বা সিরিয়াল সংক্রান্ত বার্তা লিখুন...'
                          : 'Describe your symptoms, medical concerns or serial appointment query...'
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-1 w-full py-3.5 bg-accent hover:bg-ink text-white font-semibold text-xs rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer text-center flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>
                      {isSubmitting
                        ? (language === 'bn' ? 'পাঠানো হচ্ছে...' : 'Submitting...')
                        : (language === 'bn' ? 'হোয়াটসঅ্যাপে সরাসরি বার্তা পাঠান' : 'Send Directly to Doctor on WhatsApp')}
                    </span>
                  </button>

                  <p className="text-[11px] text-muted text-center flex items-center justify-center gap-1 mt-0.5">
                    <span>🔒</span>
                    <span>
                      {language === 'bn'
                        ? 'সাবমিট বাটনে ক্লিক করলেই বার্তাটি সরাসরি ডা. হানিফের হোয়াটসঅ্যাপে সংযুক্ত হবে।'
                        : 'Submitting connects you directly to Dr. Hanif on WhatsApp with formatted details.'}
                    </span>
                  </p>
                </form>
              )}
            </GlassPanel>
          </div>
        </div>

        {/* Dynamic Interactive Google Maps Section (Admin Configurable) */}
        <section className="animate-in fade-in slide-in-from-bottom-5 duration-500">
          <GlassPanel className="p-6 md:p-8 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent block mb-0.5">
                  {language === 'bn' ? 'লাইভ লোকেশন ম্যাপ' : 'Live Navigation Route'}
                </span>
                <h3 className="font-serif text-lg md:text-xl font-bold text-ink flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span>{language === 'bn' ? 'গুগল ম্যাপে চেম্বার অবস্থান' : 'Google Map Chamber Location'}</span>
                </h3>
              </div>

              {directMapLink && (
                <a
                  href={directMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 self-start sm:self-auto px-4 py-2 rounded-xl bg-accent hover:bg-ink text-white font-semibold text-xs shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'দিকনির্দেশনা দেখুন (Get Directions)' : 'Open in Google Maps'}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                </a>
              )}
            </div>

            {/* Google Map Embed Container */}
            <div className="relative w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden border border-panel-border shadow-inner bg-slate-100">
              <iframe
                title="Popular Medical Center Chamber Location"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded-2xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>
                  {language === 'bn'
                    ? 'পপুলার মেডিকেল সেন্টার লিমিটেড (৬ষ্ঠ তলা, রুম ৬০৫), কাজলশাহ, সিলেট।'
                    : 'Popular Medical Center Ltd. (6th Floor, Room 605), Kazalshah, Sylhet.'}
                </span>
              </span>
              <span className="text-[11px] text-accent font-medium">
                {language === 'bn' ? 'সার্বক্ষণিক লিফট ও পার্কিং সুবিধা রয়েছে' : 'Lift & Parking Available'}
              </span>
            </div>
          </GlassPanel>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}
