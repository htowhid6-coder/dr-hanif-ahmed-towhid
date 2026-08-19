-- Database Schema for Dr. Hanif Ahmed Towhid Website
-- To be run on the Supabase SQL Editor

-- 1. Profiles Table (Doctor Details)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name_en VARCHAR(255) NOT NULL,
  full_name_bn VARCHAR(255) NOT NULL,
  designation_en TEXT NOT NULL,
  designation_bn TEXT NOT NULL,
  bmdc_number VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(100) NOT NULL,
  bio_en TEXT,
  bio_bn TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Chambers Table
CREATE TABLE IF NOT EXISTS public.chambers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en VARCHAR(255) NOT NULL,
  name_bn VARCHAR(255) NOT NULL,
  address_en TEXT NOT NULL,
  address_bn TEXT NOT NULL,
  hours_en VARCHAR(255) NOT NULL,
  hours_bn VARCHAR(255) NOT NULL,
  ticket_phone VARCHAR(100) NOT NULL,
  whatsapp_link VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.chambers ENABLE ROW LEVEL SECURITY;

-- 3. Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  title_bn VARCHAR(255) NOT NULL,
  short_desc_en TEXT NOT NULL,
  short_desc_bn TEXT NOT NULL,
  full_desc_en TEXT NOT NULL,
  full_desc_bn TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- 4. Diseases Table
CREATE TABLE IF NOT EXISTS public.diseases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  title_bn VARCHAR(255) NOT NULL,
  short_desc_en TEXT NOT NULL,
  short_desc_bn TEXT NOT NULL,
  full_desc_en TEXT NOT NULL,
  full_desc_bn TEXT NOT NULL,
  symptoms_en TEXT[] NOT NULL,
  symptoms_bn TEXT[] NOT NULL,
  treatments_en TEXT[] NOT NULL,
  treatments_bn TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.diseases ENABLE ROW LEVEL SECURITY;

-- 5. Blog Posts Table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  lang VARCHAR(10) CHECK (lang IN ('en', 'bn')) NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  read_time VARCHAR(50) NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 6. Symptoms & Clinical Conditions Table
CREATE TABLE IF NOT EXISTS public.symptoms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  title_bn VARCHAR(255) NOT NULL,
  category_en VARCHAR(255) NOT NULL,
  category_bn VARCHAR(255) NOT NULL,
  organ_en VARCHAR(255) NOT NULL,
  organ_bn VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  short_desc_en TEXT NOT NULL,
  short_desc_bn TEXT NOT NULL,
  overview_en TEXT NOT NULL,
  overview_bn TEXT NOT NULL,
  causes_en JSONB DEFAULT '[]'::jsonb,
  causes_bn JSONB DEFAULT '[]'::jsonb,
  red_flags_en JSONB DEFAULT '[]'::jsonb,
  red_flags_bn JSONB DEFAULT '[]'::jsonb,
  investigations_en JSONB DEFAULT '[]'::jsonb,
  investigations_bn JSONB DEFAULT '[]'::jsonb,
  management_en TEXT NOT NULL,
  management_bn TEXT NOT NULL,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.symptoms ENABLE ROW LEVEL SECURITY;

-- Set up Access Policies (RLS)
-- Anyone can READ data
CREATE POLICY "Allow public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read chambers" ON public.chambers FOR SELECT USING (true);
CREATE POLICY "Allow public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public read diseases" ON public.diseases FOR SELECT USING (true);
CREATE POLICY "Allow public read posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Allow public read symptoms" ON public.symptoms FOR SELECT USING (true);

-- Only authenticated admins can write (INSERT, UPDATE, DELETE)
CREATE POLICY "Allow auth write profiles" ON public.profiles FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth write chambers" ON public.chambers FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth write services" ON public.services FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth write diseases" ON public.diseases FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth write posts" ON public.posts FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth write symptoms" ON public.symptoms FOR ALL TO authenticated USING (true);

-- 6. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(100),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Anyone can submit messages (INSERT)
CREATE POLICY "Allow public insert messages" ON public.messages FOR INSERT WITH CHECK (true);
-- Only authenticated admins can view messages (SELECT)
CREATE POLICY "Allow auth read messages" ON public.messages FOR SELECT TO authenticated USING (true);

-- 7. Patient Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name_en VARCHAR(255) NOT NULL,
  reviewer_name_bn VARCHAR(255) NOT NULL,
  reviewer_title_en VARCHAR(255) NOT NULL,
  reviewer_title_bn VARCHAR(255) NOT NULL,
  review_text_en TEXT NOT NULL,
  review_text_bn TEXT NOT NULL,
  initials VARCHAR(10) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Set up Access Policies (RLS) for Reviews
CREATE POLICY "Allow public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow auth write reviews" ON public.reviews FOR ALL TO authenticated USING (true);

-- Seed Initial Reviews
INSERT INTO public.reviews (reviewer_name_en, reviewer_name_bn, reviewer_title_en, reviewer_title_bn, review_text_en, review_text_bn, initials)
VALUES
  ('Abul Hasan', 'আবুল হাসান', 'Sylhet Sadar', 'সিলেট সদর', 'I struggled with unmanaged blood sugar for years. Dr. Hanif''s continuous tracking and lifestyle modifications did wonders. Highly recommended.', 'দীর্ঘ ৩ বছর ধরে অনিয়ন্ত্রিত ডায়াবেটিসে ভুগছিলাম। পপুলার চেম্বারে ডা. হানিফ স্যারের সুনির্দিষ্ট পরামর্শ ও জীবনযাত্রায় পরিবর্তন আনার পর এখন আমার ব্লাড সুগার সম্পূর্ণ নিয়ন্ত্রণে। স্যার অত্যন্ত ধৈর্য ধরে শোনেন এবং বুঝিয়ে বলেন।', 'AH'),
  ('Sultana Begum', 'সুলতানা বেগম', 'Shahjalal Uposhohor', 'শাহজালাল উপশহর', 'I suffered from recurring fevers and typhoid for a long time. Following Dr. Hanif''s correct diagnosis and treatment, I am now fully recovered. A very caring and reliable doctor.', 'দীর্ঘদিন ধরে ঘন ঘন তীব্র জ্বর ও টাইফয়েডে ভুগছিলাম। স্যারের সঠিক রোগ নির্ণয় ও অ্যান্টিবায়োটিকের সঠিক ব্যবহারে আমি এখন সম্পূর্ণ সুস্থ। অত্যন্ত আন্তরিক ও ভরসা পাওয়ার মতো একজন চিকিৎসক।', 'SB'),
  ('Md. Kamrul Islam', 'মো. কামরুল ইসলাম', 'Zindabazar, Sylhet', 'জিন্দাবাজার, সিলেট', 'I was suffering from severe hypertension and frequent dizziness. Dr. Hanif''s careful examination and accurate medication plan normalized my blood pressure within weeks. Truly a compassionate physician.', 'আমার দীর্ঘদিনের উচ্চ রক্তচাপ ও প্রায়ই মাথা ঘোরার সমস্যা ছিল। ডা. হানিফ স্যারের সঠিক প্রেসক্রিপশন ও নিয়মিত ফলোআপের মাধ্যমে অল্প সময়েই আমার প্রেশার নিয়ন্ত্রণে এসেছে। অত্যন্ত যত্নশীল ও অভিজ্ঞ ডাক্তার।', 'KI'),
  ('Farhana Chowdhury', 'ফারহানা চৌধুরী', 'Amberkhana, Sylhet', 'আম্বরখানা, সিলেট', 'Had chronic thyroid and severe fatigue issues for months. Dr. Hanif explained the condition clearly and adjusted the dosage perfectly. I feel much more energetic now. Very grateful for his guidance.', 'দীর্ঘদিন ধরে থাইরয়েড ও অতিরিক্ত ক্লান্তির সমস্যায় ভুগছিলাম। ডা. হানিফ স্যার অত্যন্ত শান্তভাবে রোগটি বুঝিয়ে বলেন এবং সঠিক ওষুধ দেন। এখন আমি অনেক সুস্থ ও কর্মক্ষম অনুভব করছি। স্যারের প্রতি আন্তরিক কৃতজ্ঞতা।', 'FC'),
  ('Abdul Malik', 'আব্দুল মালিক', 'Beanibazar, Sylhet', 'বিয়ানীবাজার, সিলেট', 'Came with severe gastrointestinal complications and persistent chest burning. Sir''s diagnosis was prompt and the prescribed lifestyle changes relieved my symptoms completely. One of the best medicine specialists in Sylhet.', 'তীব্র পেটের সমস্যা ও গ্যাস্ট্রিকের কারণে বুকে ব্যথায় খুব কষ্ট পাচ্ছিলাম। স্যারের সঠিক রোগ নির্ণয়, খাদ্যাভ্যাস পরিবর্তন ও সময়োপযোগী চিকিৎসায় এখন সম্পূর্ণ সুস্থ। সিলেটের সেরা মেডিসিন বিশেষজ্ঞ ডাক্তার।', 'AM')
ON CONFLICT DO NOTHING;


