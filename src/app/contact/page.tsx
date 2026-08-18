'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import supabase from '@/lib/supabase';
import { MapPin, Phone, Mail, Globe, CheckCircle2, Send } from 'lucide-react';

export default function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', phone: '', msg: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      try {
        const { error } = await supabase.from('messages').insert({
          name: formData.name,
          email: '', // Not captured in simple form
          phone: formData.phone,
          subject: 'Contact Form Inquiry',
          message: formData.msg || 'No message provided.'
        });
        if (error) throw error;
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', phone: '', msg: '' });
        }, 3000);
      } catch (err) {
        console.error("Error submitting message to Supabase:", err);
        alert(language === 'bn' ? 'বার্তা পাঠানো ব্যর্থ হয়েছে! পুনরায় চেষ্টা করুন।' : 'Failed to send message! Please try again.');
      }
    }
  };

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
      <main className="relative z-10 py-12 px-6 md:px-12 max-w-4xl mx-auto flex flex-col gap-8 w-full">
        {/* Intro */}
        <section className="animate-in fade-in slide-in-from-bottom-5 duration-500">
          <GlassPanel className="flex flex-col gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                <span className="w-6 h-0.5 bg-accent inline-block"></span>
                {language === 'bn' ? 'চেম্বার ও যোগাযোগ' : 'Chamber & Contacts'}
              </span>
              <h1 className="font-serif text-2xl md:text-3xl font-bold leading-tight text-ink">
                {language === 'bn' ? 'সরাসরি সিরিয়াল বুকিং এবং চেম্বার তথ্য' : 'Secure Serial & Location Reviews'}
              </h1>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-muted pt-2 border-t border-line">
              {language === 'bn'
                ? 'সিলেটের কাজালশাহে অবস্থিত পপুলার মেডিকেল সেন্টারে রোগী দেখানোর সময়সূচী ও যোগাযোগের সঠিক তথ্য নিচে দেওয়া হলো।'
                : 'Official contact coordinates and location routing parameters for securing serial tickets at Popular Medical Center, Sylhet.'}
            </p>
          </GlassPanel>
        </section>

        {/* Detailed Info + Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Chamber Coordinates */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <GlassPanel className="p-6 md:p-8 flex flex-col gap-6">
              <h2 className="font-serif text-lg font-bold text-ink border-b border-line pb-2">
                {language === 'bn' ? 'যোগাযোগের তথ্য' : 'Direct Contacts'}
              </h2>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink">{language === 'bn' ? 'চেম্বার ঠিকানা:' : 'Chamber Address:'}</h4>
                    <p className="text-xs text-muted leading-relaxed mt-0.5">
                      Popular Medical Center Ltd.<br />
                      {language === 'bn' ? '(৬ষ্ঠ তলা, রুম ৬০৫), কাজলশাহ, সিলেট।' : '(6th Floor, Room 605), Kazalshah, Sylhet.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink">{language === 'bn' ? 'টিকিট ও সিরিয়াল:' : 'Ticket/Appointment Serial:'}</h4>
                    <a href="tel:+8801346132486" className="text-xs text-accent font-semibold hover:underline block mt-0.5">
                      01346-132486
                    </a>
                    <span className="text-[10px] text-muted block">({language === 'bn' ? 'সকাল ৯টার পর কল করুন' : 'Call after 9:00 AM'})</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink">{language === 'bn' ? 'ইমেইল ঠিকানা:' : 'Official Email:'}</h4>
                    <a href="mailto:htowhid6@gmail.com" className="text-xs text-accent font-semibold hover:underline block mt-0.5">
                      htowhid6@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink">{language === 'bn' ? 'ফেসবুক পেজ:' : 'Facebook Page:'}</h4>
                    <a
                      href="https://www.facebook.com/share/1DHArPTjmH/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent font-semibold hover:underline block mt-0.5 break-all"
                    >
                      fb.com/Dr.HanifTowhid
                    </a>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>

          {/* Appointment/Query Form */}
          <div className="md:col-span-7">
            <GlassPanel className="p-6 md:p-8">
              <h2 className="font-serif text-lg font-bold text-ink border-b border-line pb-2 mb-4">
                {language === 'bn' ? 'চেম্বার বার্তা পাঠান' : 'Send a Message'}
              </h2>

              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center gap-3 bg-accent/5 border border-accent/20 rounded-xl animate-in fade-in duration-300">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                  <h4 className="font-serif text-base font-bold text-accent">
                    {language === 'bn' ? 'বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}
                  </h4>
                  <p className="text-xs text-muted">
                    {language === 'bn' ? 'আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।' : 'We will respond to your query shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink" htmlFor="name">
                      {language === 'bn' ? 'আপনার নাম (আবশ্যক):' : 'Your Name (Required):'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                      placeholder="e.g. Rahim Uddin"
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
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm"
                      placeholder="e.g. 01712-XXXXXX"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink" htmlFor="msg">
                      {language === 'bn' ? 'বার্তা/প্রশ্ন (ঐচ্ছিক):' : 'Your Query (Optional):'}
                    </label>
                    <textarea
                      id="msg"
                      rows={4}
                      value={formData.msg}
                      onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                      className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white/95 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all shadow-sm resize-none"
                      placeholder="Describe your medical query or appointment request..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full py-3 bg-accent hover:bg-ink text-white font-semibold text-xs rounded-xl shadow-md transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{language === 'bn' ? 'বার্তা পাঠান' : 'Submit Message'}</span>
                  </button>
                </form>
              )}
            </GlassPanel>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
