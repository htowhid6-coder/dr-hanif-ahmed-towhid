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

-- Set up Access Policies (RLS)
-- Anyone can READ data
CREATE POLICY "Allow public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read chambers" ON public.chambers FOR SELECT USING (true);
CREATE POLICY "Allow public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public read diseases" ON public.diseases FOR SELECT USING (true);
CREATE POLICY "Allow public read posts" ON public.posts FOR SELECT USING (true);

-- Only authenticated admins can write (INSERT, UPDATE, DELETE)
CREATE POLICY "Allow auth write profiles" ON public.profiles FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth write chambers" ON public.chambers FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth write services" ON public.services FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth write diseases" ON public.diseases FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth write posts" ON public.posts FOR ALL TO authenticated USING (true);

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

