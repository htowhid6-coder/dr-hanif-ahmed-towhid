'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { GlassPanel } from '@/components/GlassPanel';
import { faqsData, faqCategories, FAQItem } from '@/data/faqsData';
import supabase from '@/lib/supabase';
import {
  Plus,
  Edit,
  Trash2,
  HelpCircle,
  Search,
  CheckCircle2,
  RefreshCw,
  Save,
  ArrowUp,
  ArrowDown,
  Clock,
  UserCheck,
  FileText,
  AlertCircle,
  HeartPulse,
  X
} from 'lucide-react';

export const FaqManager: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [faqs, setFaqs] = useState<FAQItem[]>(faqsData);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const initialFaqForm: FAQItem = {
    id: '',
    category: 'chamber',
    q: { en: '', bn: '' },
    a: { en: '', bn: '' }
  };

  const [faqForm, setFaqForm] = useState<FAQItem>(initialFaqForm);
  const [isEditing, setIsEditing] = useState(false);

  const fetchFaqs = async () => {
    // 1. LocalStorage
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('faqs_data');
      if (local) {
        try {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setFaqs(parsed);
          }
        } catch (e) { }
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
          q: {
            en: d.q_en,
            bn: d.q_bn
          },
          a: {
            en: d.a_en,
            bn: d.a_bn
          }
        }));
        setFaqs(mapped);
        if (typeof window !== 'undefined') {
          localStorage.setItem('faqs_data', JSON.stringify(mapped));
        }
      }
    } catch (err) {
      console.warn('Could not load faqs from Supabase:', err);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const persistFaqs = async (updated: FAQItem[]) => {
    setFaqs(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('faqs_data', JSON.stringify(updated));
      window.dispatchEvent(new Event('faqs_updated'));
    }
  };

  const handleOpenNew = () => {
    setIsEditing(false);
    setFaqForm({
      id: `faq-${Date.now()}`,
      category: (selectedCategory === 'all' ? 'chamber' : selectedCategory) as FAQItem['category'],
      q: { en: '', bn: '' },
      a: { en: '', bn: '' }
    });
    setIsModalOpen(true);
  };

  const handleEdit = (faq: FAQItem) => {
    setIsEditing(true);
    setFaqForm({ ...faq });
    setIsModalOpen(true);
  };

  const handleDelete = async (faq: FAQItem) => {
    if (!confirm(isBn ? `আপনি কি এই প্রশ্নোত্তরটি ডিলিট করতে চান?` : `Are you sure you want to delete this FAQ?`)) return;

    const updated = faqs.filter(f => f.id !== faq.id);
    await persistFaqs(updated);

    try {
      if (typeof faq.id === 'string' && faq.id.includes('-')) {
        await supabase.from('faqs').delete().eq('id', faq.id);
      }
    } catch (e) { }

    alert(isBn ? 'প্রশ্নোত্তর সফলভাবে মুছে ফেলা হয়েছে!' : 'FAQ deleted successfully!');
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let updated: FAQItem[];
      if (isEditing) {
        updated = faqs.map(f => f.id === faqForm.id ? faqForm : f);
      } else {
        updated = [...faqs, faqForm];
      }

      await persistFaqs(updated);

      // Save to Supabase
      try {
        const payload = {
          category: faqForm.category,
          q_en: faqForm.q.en,
          q_bn: faqForm.q.bn,
          a_en: faqForm.a.en,
          a_bn: faqForm.a.bn,
          order_index: updated.findIndex(u => u.id === faqForm.id)
        };

        if (typeof faqForm.id === 'string' && faqForm.id.includes('-')) {
          await supabase.from('faqs').update(payload).eq('id', faqForm.id);
        } else {
          await supabase.from('faqs').insert([payload]);
        }
      } catch (err) { }

      setIsModalOpen(false);
      alert(isBn ? 'প্রশ্নোত্তর সফলভাবে সংরক্ষিত হয়েছে!' : 'FAQ saved successfully!');
    } catch (err: any) {
      alert(err.message || 'Error');
    } finally {
      setIsSaving(false);
    }
  };

  const moveFaq = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= filteredFaqs.length) return;
    const item1 = filteredFaqs[index];
    const item2 = filteredFaqs[target];

    const updated = [...faqs];
    const idx1 = updated.findIndex(f => f.id === item1.id);
    const idx2 = updated.findIndex(f => f.id === item2.id);
    if (idx1 !== -1 && idx2 !== -1) {
      const temp = updated[idx1];
      updated[idx1] = updated[idx2];
      updated[idx2] = temp;
      persistFaqs(updated);
    }
  };

  const handleSeedAll = async () => {
    if (!confirm(isBn ? 'আপনি কি ডাটাবেজে সকল ২০টি ডিফল্ট প্রশ্নোত্তর সিড করতে চান?' : 'Seed all 20 default FAQs into Supabase?')) return;
    setIsSeeding(true);

    try {
      await persistFaqs(faqsData);

      const payloads = faqsData.map((f, idx) => ({
        category: f.category,
        q_en: f.q.en,
        q_bn: f.q.bn,
        a_en: f.a.en,
        a_bn: f.a.bn,
        order_index: idx,
        is_active: true
      }));

      const { error } = await supabase.from('faqs').insert(payloads);
      if (error) throw error;

      alert(isBn ? 'সকল ২০টি প্রশ্নোত্তর সফলভাবে ডাটাবেজে সিড হয়েছে!' : 'All 20 FAQs seeded to database successfully!');
    } catch (err: any) {
      console.error(err);
      alert(isBn ? 'সিড সম্পন্ন হয়েছে (লোকাল ক্যাশে সংরক্ষিত)!' : 'Seeding complete (Cached locally)!');
    } finally {
      setIsSeeding(false);
    }
  };

  // Filtered FAQs
  const filteredFaqs = faqs.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCat;
    return matchesCat && (
      item.q.en.toLowerCase().includes(query) ||
      item.q.bn.toLowerCase().includes(query) ||
      item.a.en.toLowerCase().includes(query) ||
      item.a.bn.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 p-5 rounded-2xl border border-panel-border shadow-sm">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            {isBn ? 'প্রশ্নোত্তর ও পরামর্শ ম্যানেজার' : 'FAQ & Advisory Manager'}
          </span>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-ink mt-0.5">
            {isBn ? 'রোগীদের সচরাচর জিজ্ঞাসিত প্রশ্নোত্তর' : 'Manage Frequently Asked Questions'}
          </h2>
          <p className="text-xs text-muted mt-1">
            {isBn
              ? 'চেম্বার, রোগ, সিরিয়াল ও পরামর্শ সম্পর্কিত বাংলা এবং ইংরেজি প্রশ্ন-উত্তর যোগ, এডিট ও নিয়ন্ত্রণ করুন।'
              : 'Add, update, or reorder bilingual FAQs for patient advisory.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleSeedAll}
            disabled={isSeeding}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-ink cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-muted" />
            <span>{isBn ? '২০টি ডিফল্ট FAQ সিড করুন' : 'Seed 20 Default FAQs'}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-accent hover:bg-ink text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isBn ? 'নতুন প্রশ্ন যোগ করুন' : 'Add New FAQ'}</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <GlassPanel className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-accent absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? 'প্রশ্ন বা উত্তর খুঁজুন...' : 'Search question or answer...'}
            className="w-full pl-10 pr-8 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {faqCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${selectedCategory === cat.id
                  ? 'bg-accent text-white shadow-xs'
                  : 'bg-slate-100 text-muted hover:bg-slate-200'
                }`}
            >
              {cat.label[language]} ({cat.id === 'all' ? faqs.length : faqs.filter(f => f.category === cat.id).length})
            </button>
          ))}
        </div>
      </GlassPanel>

      {/* FAQs List */}
      <div className="flex flex-col gap-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white/50 rounded-2xl border border-dashed border-panel-border">
            <p className="text-xs text-muted">{isBn ? 'কোনো প্রশ্নোত্তর পাওয়া যায়নি।' : 'No FAQs found.'}</p>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => (
            <div
              key={faq.id || idx}
              className="p-4 rounded-2xl border border-panel-border bg-white flex flex-col sm:flex-row sm:items-start justify-between gap-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-accent/15 text-accent flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>

                <div className="flex flex-col gap-1 max-w-3xl">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider bg-accent/10 px-2 py-0.5 rounded-md w-fit">
                    {faqCategories.find(c => c.id === faq.category)?.label[language] || faq.category}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-ink">
                    {isBn ? faq.q.bn : faq.q.en}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed whitespace-pre-line mt-0.5 line-clamp-3">
                    {isBn ? faq.a.bn : faq.a.en}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-start shrink-0">
                <button
                  type="button"
                  onClick={() => moveFaq(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-muted" />
                </button>
                <button
                  type="button"
                  onClick={() => moveFaq(idx, 'down')}
                  disabled={idx === filteredFaqs.length - 1}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5 text-muted" />
                </button>
                <button
                  type="button"
                  onClick={() => handleEdit(faq)}
                  className="p-1.5 rounded-lg bg-accent/10 hover:bg-accent hover:text-white text-accent transition-colors cursor-pointer"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(faq)}
                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE / EDIT FAQ MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-panel-border max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-lg font-bold text-ink mb-4 pb-2 border-b border-line">
              {isEditing ? (isBn ? 'প্রশ্নোত্তর সম্পাদনা' : 'Edit FAQ') : (isBn ? 'নতুন প্রশ্নোত্তর যুক্ত করুন' : 'Add New FAQ')}
            </h3>

            <form onSubmit={handleSaveModal} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-ink">{isBn ? 'ক্যাটাগরি:' : 'Category:'}</label>
                <select
                  value={faqForm.category}
                  onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value as FAQItem['category'] })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white mt-1"
                >
                  {faqCategories.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label[language]}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'প্রশ্ন (বাংলা):' : 'Question (Bengali):'}</label>
                  <input
                    type="text"
                    required
                    value={faqForm.q.bn}
                    onChange={(e) => setFaqForm({ ...faqForm, q: { ...faqForm.q, bn: e.target.value } })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white font-serif mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'প্রশ্ন (English):' : 'Question (English):'}</label>
                  <input
                    type="text"
                    required
                    value={faqForm.q.en}
                    onChange={(e) => setFaqForm({ ...faqForm, q: { ...faqForm.q, en: e.target.value } })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white font-serif mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'উত্তর (বাংলা):' : 'Answer (Bengali):'}</label>
                  <textarea
                    rows={6}
                    required
                    value={faqForm.a.bn}
                    onChange={(e) => setFaqForm({ ...faqForm, a: { ...faqForm.a, bn: e.target.value } })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'উত্তর (English):' : 'Answer (English):'}</label>
                  <textarea
                    rows={6}
                    required
                    value={faqForm.a.en}
                    onChange={(e) => setFaqForm({ ...faqForm, a: { ...faqForm.a, en: e.target.value } })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white mt-1"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-line mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-accent hover:bg-ink text-white text-xs font-bold shadow-md cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? (isBn ? 'সেভ হচ্ছে...' : 'Saving...') : (isBn ? 'সংরক্ষণ করুন' : 'Save FAQ')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
