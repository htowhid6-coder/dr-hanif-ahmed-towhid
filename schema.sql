-- ==============================================================================
-- Complete Database Schema for Dr. Hanif Ahmed Towhid Website
-- Run this script inside your Supabase Dashboard -> SQL Editor -> Run
-- ==============================================================================

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
  map_url TEXT,
  direct_map_link TEXT,
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
  symptoms_en TEXT[] DEFAULT '{}',
  symptoms_bn TEXT[] DEFAULT '{}',
  treatments_en TEXT[] DEFAULT '{}',
  treatments_bn TEXT[] DEFAULT '{}',
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.diseases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diseases ADD COLUMN IF NOT EXISTS image TEXT;

-- 5. Blog Posts Table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  lang VARCHAR(10) CHECK (lang IN ('en', 'bn')) NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  read_time VARCHAR(50) NOT NULL,
  image TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS image TEXT;

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

-- 7. Contact Messages Table
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

-- 8. Patient Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name_en VARCHAR(255) NOT NULL,
  reviewer_name_bn VARCHAR(255) NOT NULL,
  reviewer_title_en VARCHAR(255) NOT NULL,
  reviewer_title_bn VARCHAR(255) NOT NULL,
  review_text_en TEXT NOT NULL,
  review_text_bn TEXT NOT NULL,
  initials VARCHAR(10) NOT NULL,
  rating NUMERIC(2,1) DEFAULT 5.0,
  google_review_url TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 9. Hero & Home Slides Table
CREATE TABLE IF NOT EXISTS public.hero_slides (
  id VARCHAR(100) PRIMARY KEY,
  type VARCHAR(50) NOT NULL DEFAULT 'custom',
  is_active BOOLEAN DEFAULT TRUE,
  order_index INT DEFAULT 0,
  eyebrow_en TEXT,
  eyebrow_bn TEXT,
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  lead_en TEXT,
  lead_bn TEXT,
  cta_text_en TEXT,
  cta_text_bn TEXT,
  cta_href TEXT,
  cta_type VARCHAR(50) DEFAULT 'whatsapp',
  secondary_cta_text_en TEXT,
  secondary_cta_text_bn TEXT,
  secondary_cta_href TEXT,
  doctor_image TEXT,
  doctor_specialty_en TEXT,
  doctor_specialty_bn TEXT,
  doctor_degrees_en TEXT,
  doctor_degrees_bn TEXT,
  doctor_designation_en TEXT,
  doctor_designation_bn TEXT,
  chamber_hours_highlight_en TEXT,
  chamber_hours_highlight_bn TEXT,
  chamber_address_highlight_en TEXT,
  chamber_address_highlight_bn TEXT,
  chamber_room_en TEXT,
  chamber_room_bn TEXT,
  chamber_room_badge_en TEXT,
  chamber_room_badge_bn TEXT,
  chamber_address_en TEXT,
  chamber_address_bn TEXT,
  chamber_hours_en TEXT,
  chamber_hours_bn TEXT,
  chamber_off_days_en TEXT,
  chamber_off_days_bn TEXT,
  chamber_ticket_phone TEXT,
  chamber_ticket_badge_en TEXT,
  chamber_ticket_badge_bn TEXT,
  chamber_ticket_note_en TEXT,
  chamber_ticket_note_bn TEXT,
  custom_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

-- 10. Site Settings & Dynamic Content Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id VARCHAR(100) PRIMARY KEY,
  category VARCHAR(100) NOT NULL DEFAULT 'general',
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 11. FAQs Table
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(100) NOT NULL DEFAULT 'chamber',
  q_en TEXT NOT NULL,
  q_bn TEXT NOT NULL,
  a_en TEXT NOT NULL,
  a_bn TEXT NOT NULL,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- ==============================================================================

-- Public READ Policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read profiles') THEN
    CREATE POLICY "Allow public read profiles" ON public.profiles FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read chambers') THEN
    CREATE POLICY "Allow public read chambers" ON public.chambers FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read services') THEN
    CREATE POLICY "Allow public read services" ON public.services FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read diseases') THEN
    CREATE POLICY "Allow public read diseases" ON public.diseases FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read posts') THEN
    CREATE POLICY "Allow public read posts" ON public.posts FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read symptoms') THEN
    CREATE POLICY "Allow public read symptoms" ON public.symptoms FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read reviews') THEN
    CREATE POLICY "Allow public read reviews" ON public.reviews FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read hero_slides') THEN
    CREATE POLICY "Allow public read hero_slides" ON public.hero_slides FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read site_settings') THEN
    CREATE POLICY "Allow public read site_settings" ON public.site_settings FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read faqs') THEN
    CREATE POLICY "Allow public read faqs" ON public.faqs FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public insert messages') THEN
    CREATE POLICY "Allow public insert messages" ON public.messages FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Authenticated WRITE Policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth write profiles') THEN
    CREATE POLICY "Allow auth write profiles" ON public.profiles FOR ALL TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth write chambers') THEN
    CREATE POLICY "Allow auth write chambers" ON public.chambers FOR ALL TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth write services') THEN
    CREATE POLICY "Allow auth write services" ON public.services FOR ALL TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth write diseases') THEN
    CREATE POLICY "Allow auth write diseases" ON public.diseases FOR ALL TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth write posts') THEN
    CREATE POLICY "Allow auth write posts" ON public.posts FOR ALL TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth write symptoms') THEN
    CREATE POLICY "Allow auth write symptoms" ON public.symptoms FOR ALL TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth write reviews') THEN
    CREATE POLICY "Allow auth write reviews" ON public.reviews FOR ALL TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth write hero_slides') THEN
    CREATE POLICY "Allow auth write hero_slides" ON public.hero_slides FOR ALL TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth write site_settings') THEN
    CREATE POLICY "Allow auth write site_settings" ON public.site_settings FOR ALL TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth write faqs') THEN
    CREATE POLICY "Allow auth write faqs" ON public.faqs FOR ALL TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth read messages') THEN
    CREATE POLICY "Allow auth read messages" ON public.messages FOR SELECT TO authenticated USING (true);
  END IF;
END $$;
