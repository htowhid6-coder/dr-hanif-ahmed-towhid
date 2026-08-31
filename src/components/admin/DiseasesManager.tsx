'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { GlassPanel } from '@/components/GlassPanel';
import { diseaseData, Disease } from '@/locales/diseaseData';
import supabase from '@/lib/supabase';
import {
  Plus,
  Edit,
  Trash2,
  Stethoscope,
  Search,
  CheckCircle2,
  RefreshCw,
  Save,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  X,
  ListPlus
} from 'lucide-react';

import { ImagePickerField } from '@/components/admin/ImagePickerField';

export const DiseasesManager: React.FC = () => {

  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [diseases, setDiseases] = useState<Disease[]>(diseaseData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  const initialForm: Disease = {
    slug: '',
    image: '/Diseases_Images/diabetes.jpg',
    title: { en: '', bn: '' },
    shortDesc: { en: '', bn: '' },
    fullDesc: { en: '', bn: '' },
    symptoms: { en: [''], bn: [''] },
    treatments: { en: [''], bn: [''] }
  };

  const [form, setForm] = useState<Disease>(initialForm);

  const fetchDiseases = async () => {
    // 1. LocalStorage
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('diseases_data');
      if (local) {
        try {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed) && parsed.length > 0) setDiseases(parsed);
        } catch (e) {}
      }
    }

    // 2. Supabase
    try {
      const { data, error } = await supabase
        .from('diseases')
        .select('*');

      if (!error && data && data.length > 0) {
        const mapped: Disease[] = data.map((d: any) => ({
          slug: d.slug,
          image: d.image || '/Diseases_Images/diabetes.jpg',
          title: { en: d.title_en, bn: d.title_bn },
          shortDesc: { en: d.short_desc_en, bn: d.short_desc_bn },
          fullDesc: { en: d.full_desc_en, bn: d.full_desc_bn },
          symptoms: {
            en: Array.isArray(d.symptoms_en) ? d.symptoms_en : [],
            bn: Array.isArray(d.symptoms_bn) ? d.symptoms_bn : []
          },
          treatments: {
            en: Array.isArray(d.treatments_en) ? d.treatments_en : [],
            bn: Array.isArray(d.treatments_bn) ? d.treatments_bn : []
          }
        }));
        setDiseases(mapped);
        if (typeof window !== 'undefined') {
          localStorage.setItem('diseases_data', JSON.stringify(mapped));
        }
      }
    } catch (err) {
      console.warn('Could not load diseases from Supabase:', err);
    }
  };

  useEffect(() => {
    fetchDiseases();
  }, []);

  const persistDiseases = async (updated: Disease[]) => {
    setDiseases(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('diseases_data', JSON.stringify(updated));
      window.dispatchEvent(new Event('diseases_updated'));
    }
  };

  const handleOpenNew = () => {
    setIsEditing(false);
    setForm({
      slug: '',
      image: '/Diseases_Images/diabetes.jpg',
      title: { en: '', bn: '' },
      shortDesc: { en: '', bn: '' },
      fullDesc: { en: '', bn: '' },
      symptoms: { en: [''], bn: [''] },
      treatments: { en: [''], bn: [''] }
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Disease) => {
    setIsEditing(true);
    setForm({
      ...item,
      symptoms: {
        en: item.symptoms?.en?.length ? item.symptoms.en : [''],
        bn: item.symptoms?.bn?.length ? item.symptoms.bn : ['']
      },
      treatments: {
        en: item.treatments?.en?.length ? item.treatments.en : [''],
        bn: item.treatments?.bn?.length ? item.treatments.bn : ['']
      }
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(isBn ? `আপনি কি নিশ্চিতভাবে এই রোগটির তথ্য মুছে ফেলতে চান?` : `Are you sure you want to delete this condition?`)) return;

    const updated = diseases.filter(d => d.slug !== slug);
    await persistDiseases(updated);

    try {
      await supabase.from('diseases').delete().eq('slug', slug);
    } catch (e) {}

    alert(isBn ? 'রোগের তথ্য মুছে ফেলা হয়েছে!' : 'Condition deleted successfully!');
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let slug = form.slug.trim().toLowerCase();
      if (!slug) {
        slug = form.title.en
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
      }

      const cleanForm: Disease = {
        ...form,
        slug,
        symptoms: {
          en: form.symptoms.en.filter(s => s.trim()),
          bn: form.symptoms.bn.filter(s => s.trim())
        },
        treatments: {
          en: form.treatments.en.filter(t => t.trim()),
          bn: form.treatments.bn.filter(t => t.trim())
        }
      };

      let updated: Disease[];
      const exists = diseases.some(d => d.slug === slug);
      if (exists) {
        updated = diseases.map(d => d.slug === slug ? cleanForm : d);
      } else {
        updated = [...diseases, cleanForm];
      }

      await persistDiseases(updated);

      // Save to Supabase
      try {
        const payload = {
          slug: cleanForm.slug,
          title_en: cleanForm.title.en,
          title_bn: cleanForm.title.bn,
          short_desc_en: cleanForm.shortDesc.en,
          short_desc_bn: cleanForm.shortDesc.bn,
          full_desc_en: cleanForm.fullDesc.en,
          full_desc_bn: cleanForm.fullDesc.bn,
          symptoms_en: cleanForm.symptoms.en,
          symptoms_bn: cleanForm.symptoms.bn,
          treatments_en: cleanForm.treatments.en,
          treatments_bn: cleanForm.treatments.bn,
          image: cleanForm.image
        };

        await supabase.from('diseases').upsert(payload, { onConflict: 'slug' });
      } catch (err) {}

      setIsModalOpen(false);
      alert(isBn ? 'রোগের তথ্য সফলভাবে সংরক্ষিত হয়েছে!' : 'Condition saved successfully!');
    } catch (err: any) {
      alert(err.message || 'Error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSeedAll = async () => {
    if (!confirm(isBn ? 'আপনি কি সকল ডিফল্ট রোগের তথ্য ডাটাবেজে সিড করতে চান?' : 'Seed all default diseases into Supabase?')) return;
    setIsSeeding(true);

    try {
      await persistDiseases(diseaseData);

      const payloads = diseaseData.map(d => ({
        slug: d.slug,
        title_en: d.title.en,
        title_bn: d.title.bn,
        short_desc_en: d.shortDesc.en,
        short_desc_bn: d.shortDesc.bn,
        full_desc_en: d.fullDesc.en,
        full_desc_bn: d.fullDesc.bn,
        symptoms_en: d.symptoms.en,
        symptoms_bn: d.symptoms.bn,
        treatments_en: d.treatments.en,
        treatments_bn: d.treatments.bn,
        image: d.image
      }));

      const { error } = await supabase.from('diseases').upsert(payloads, { onConflict: 'slug' });
      if (error) throw error;

      alert(isBn ? 'সকল রোগ সফলভাবে ডাটাবেজে যুক্ত হয়েছে!' : 'All conditions seeded successfully!');
    } catch (err: any) {
      console.error(err);
      alert(isBn ? 'সিড সম্পন্ন হয়েছে (লোকাল ক্যাশে সংরক্ষিত)!' : 'Seeding complete (Cached locally)!');
    } finally {
      setIsSeeding(false);
    }
  };

  const filteredDiseases = diseases.filter(d => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      d.title.en.toLowerCase().includes(query) ||
      d.title.bn.toLowerCase().includes(query) ||
      d.shortDesc.en.toLowerCase().includes(query) ||
      d.shortDesc.bn.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 p-5 rounded-2xl border border-panel-border shadow-sm">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5" />
            {isBn ? 'রোগ ও চিকিৎসা লাইব্রেরি ম্যানেজার' : 'Diseases & Clinical Conditions Manager'}
          </span>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-ink mt-0.5">
            {isBn ? 'রোগের লক্ষণ, চিকিৎসা ও ক্লিনিক্যাল গাইড' : 'Manage Diseases, Symptoms & Treatments Library'}
          </h2>
          <p className="text-xs text-muted mt-1">
            {isBn
              ? 'ডায়াবেটিস, থাইরয়েড, উচ্চ রক্তচাপসহ সকল রোগের বিস্তারিত বিবরণ ও চিকিৎসা পদ্ধতি নিয়ন্ত্রণ করুন।'
              : 'Add, update, or remove medical conditions, symptoms, and treatment plans.'}
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
            <span>{isBn ? 'ডিফল্ট রোগ সিড করুন' : 'Seed Default Diseases'}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-accent hover:bg-ink text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isBn ? 'নতুন রোগ যোগ করুন' : 'Add New Disease'}</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <GlassPanel className="p-4 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-accent absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? 'রোগের নাম বা বিবরণ খুঁজুন...' : 'Search disease or description...'}
            className="w-full pl-10 pr-8 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:border-accent outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <span className="text-xs text-muted font-medium hidden sm:inline">
          {isBn ? `মোট: ${filteredDiseases.length}টি রোগ` : `Total: ${filteredDiseases.length} Conditions`}
        </span>
      </GlassPanel>

      {/* Disease Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDiseases.map((d, idx) => (
          <div
            key={d.slug || idx}
            className="p-5 rounded-2xl border border-panel-border bg-white flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-panel-border bg-slate-100">
                <img src={d.image || '/Diseases_Images/diabetes.jpg'} alt={d.title.en} className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">
                    /{d.slug}
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-ink truncate">
                  {isBn ? d.title.bn : d.title.en}
                </h4>
                <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                  {isBn ? d.shortDesc.bn : d.shortDesc.en}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-line">
              <div className="text-[11px] text-muted flex items-center gap-3">
                <span>{isBn ? `লক্ষণ: ${d.symptoms?.bn?.length || 0}টি` : `${d.symptoms?.en?.length || 0} Symptoms`}</span>
                <span>•</span>
                <span>{isBn ? `চিকিৎসা: ${d.treatments?.bn?.length || 0}টি` : `${d.treatments?.en?.length || 0} Treatments`}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleEdit(d)}
                  className="p-1.5 rounded-lg bg-accent/10 hover:bg-accent hover:text-white text-accent transition-colors cursor-pointer"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(d.slug)}
                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT DISEASE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl border border-panel-border max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-lg font-bold text-ink mb-4 pb-2 border-b border-line">
              {isEditing ? (isBn ? 'রোগের তথ্য সম্পাদনা' : 'Edit Condition') : (isBn ? 'নতুন রোগ যুক্ত করুন' : 'Add New Condition')}
            </h3>

            <form onSubmit={handleSaveModal} className="flex flex-col gap-4">
              <ImagePickerField
                label={isBn ? 'রোগের ফিচার ইমেজ (Condition Feature Image):' : 'Condition Feature Image:'}
                value={form.image}
                onChange={(val) => setForm({ ...form, image: val })}
                placeholder="/Diseases_Images/diabetes.jpg"
                helperText={isBn ? 'ডিভাইস থেকে আপলোড বা গ্যালারি থেকে নির্বাচন করুন' : 'Upload from device or select from gallery'}
              />

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-ink">{isBn ? 'স্লাগ (URL Slug):' : 'URL Slug:'}</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white font-mono"
                  placeholder="e.g. diabetes"
                />
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'রোগের নাম (বাংলা):' : 'Title (Bengali):'}</label>
                  <input
                    type="text"
                    required
                    value={form.title.bn}
                    onChange={(e) => setForm({ ...form, title: { ...form.title, bn: e.target.value } })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white font-serif mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'রোগের নাম (English):' : 'Title (English):'}</label>
                  <input
                    type="text"
                    required
                    value={form.title.en}
                    onChange={(e) => setForm({ ...form, title: { ...form.title, en: e.target.value } })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white font-serif mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'সংক্ষিপ্ত বিবরণ (বাংলা):' : 'Short Desc (Bengali):'}</label>
                  <textarea
                    rows={2}
                    value={form.shortDesc.bn}
                    onChange={(e) => setForm({ ...form, shortDesc: { ...form.shortDesc, bn: e.target.value } })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'সংক্ষিপ্ত বিবরণ (English):' : 'Short Desc (English):'}</label>
                  <textarea
                    rows={2}
                    value={form.shortDesc.en}
                    onChange={(e) => setForm({ ...form, shortDesc: { ...form.shortDesc, en: e.target.value } })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'সম্পূর্ণ বিবরণ (বাংলা):' : 'Full Clinical Guide (Bengali):'}</label>
                  <textarea
                    rows={5}
                    value={form.fullDesc.bn}
                    onChange={(e) => setForm({ ...form, fullDesc: { ...form.fullDesc, bn: e.target.value } })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-ink">{isBn ? 'সম্পূর্ণ বিবরণ (English):' : 'Full Clinical Guide (English):'}</label>
                  <textarea
                    rows={5}
                    value={form.fullDesc.en}
                    onChange={(e) => setForm({ ...form, fullDesc: { ...form.fullDesc, en: e.target.value } })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white mt-1"
                  />
                </div>
              </div>

              {/* Symptoms List Inputs */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">{isBn ? 'প্রধান লক্ষণসমূহ (Symptoms List):' : 'Symptoms List:'}</span>
                  <button
                    type="button"
                    onClick={() => setForm({
                      ...form,
                      symptoms: {
                        en: [...form.symptoms.en, ''],
                        bn: [...form.symptoms.bn, '']
                      }
                    })}
                    className="text-[11px] font-bold text-accent hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{isBn ? 'লক্ষণ যোগ করুন' : 'Add Symptom Point'}</span>
                  </button>
                </div>

                {form.symptoms.bn.map((_, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
                    <input
                      type="text"
                      placeholder={`বাংলা লক্ষণ ${idx + 1}`}
                      value={form.symptoms.bn[idx] || ''}
                      onChange={(e) => {
                        const updated = [...form.symptoms.bn];
                        updated[idx] = e.target.value;
                        setForm({ ...form, symptoms: { ...form.symptoms, bn: updated } });
                      }}
                      className="p-2 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        placeholder={`English Symptom ${idx + 1}`}
                        value={form.symptoms.en[idx] || ''}
                        onChange={(e) => {
                          const updated = [...form.symptoms.en];
                          updated[idx] = e.target.value;
                          setForm({ ...form, symptoms: { ...form.symptoms, en: updated } });
                        }}
                        className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                      />
                      {form.symptoms.bn.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updatedBn = form.symptoms.bn.filter((_, i) => i !== idx);
                            const updatedEn = form.symptoms.en.filter((_, i) => i !== idx);
                            setForm({ ...form, symptoms: { bn: updatedBn, en: updatedEn } });
                          }}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Treatments List Inputs */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">{isBn ? 'চিকিৎসা পদ্ধতি (Treatments List):' : 'Treatments List:'}</span>
                  <button
                    type="button"
                    onClick={() => setForm({
                      ...form,
                      treatments: {
                        en: [...form.treatments.en, ''],
                        bn: [...form.treatments.bn, '']
                      }
                    })}
                    className="text-[11px] font-bold text-accent hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{isBn ? 'চিকিৎসা ধাপ যোগ করুন' : 'Add Treatment Point'}</span>
                  </button>
                </div>

                {form.treatments.bn.map((_, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
                    <input
                      type="text"
                      placeholder={`বাংলা চিকিৎসা ${idx + 1}`}
                      value={form.treatments.bn[idx] || ''}
                      onChange={(e) => {
                        const updated = [...form.treatments.bn];
                        updated[idx] = e.target.value;
                        setForm({ ...form, treatments: { ...form.treatments, bn: updated } });
                      }}
                      className="p-2 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        placeholder={`English Treatment ${idx + 1}`}
                        value={form.treatments.en[idx] || ''}
                        onChange={(e) => {
                          const updated = [...form.treatments.en];
                          updated[idx] = e.target.value;
                          setForm({ ...form, treatments: { ...form.treatments, en: updated } });
                        }}
                        className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                      />
                      {form.treatments.bn.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updatedBn = form.treatments.bn.filter((_, i) => i !== idx);
                            const updatedEn = form.treatments.en.filter((_, i) => i !== idx);
                            setForm({ ...form, treatments: { bn: updatedBn, en: updatedEn } });
                          }}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
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
                  {isSaving ? (isBn ? 'সেভ হচ্ছে...' : 'Saving...') : (isBn ? 'সংরক্ষণ করুন' : 'Save Condition')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
