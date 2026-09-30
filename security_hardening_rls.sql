-- ==============================================================================
-- 🛡️ PRODUCTION DATABASE SECURITY HARDENING & ROW LEVEL SECURITY (RLS) LOCKDOWN
-- Project: Dr. Hanif Ahmed Towhid Official Website (drhaniftowhid.com)
-- Framework Standards: OWASP Top 10, NIST SP 800-63B, HIPAA & GDPR PII Security
-- ==============================================================================
-- INSTRUCTIONS FOR DEPLOYMENT:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/vsbcvfhvxhpogbxqchhi
-- 2. Navigate to SQL Editor -> "New Query"
-- 3. Paste this entire script and click "RUN"
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. CREATE SECURE ADMIN ACCESS CONTROL TABLE & HELPER FUNCTION
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and revoke public access to admin_users to prevent enumeration
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.admin_users FROM anon, authenticated;

-- Seed verified primary administrator
INSERT INTO public.admin_users (email, role)
VALUES ('htowhid6@gmail.com', 'superadmin')
ON CONFLICT (email) DO NOTHING;

-- Cryptographic / Security Definer function to check if current user is an authorized admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE LOWER(email) = LOWER(auth.jwt() ->> 'email')
  ) OR LOWER(auth.jwt() ->> 'email') = LOWER('htowhid6@gmail.com');
$$;

-- ------------------------------------------------------------------------------
-- 2. ENSURE RLS IS ENABLED ON ALL TABLES
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chambers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diseases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 3. DROP INSECURE / PERMISSIVE WRITE POLICIES
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow auth write profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow auth write chambers" ON public.chambers;
DROP POLICY IF EXISTS "Allow auth write services" ON public.services;
DROP POLICY IF EXISTS "Allow auth write diseases" ON public.diseases;
DROP POLICY IF EXISTS "Allow auth write posts" ON public.posts;
DROP POLICY IF EXISTS "Allow auth write symptoms" ON public.symptoms;
DROP POLICY IF EXISTS "Allow auth write reviews" ON public.reviews;
DROP POLICY IF EXISTS "Allow auth write hero_slides" ON public.hero_slides;
DROP POLICY IF EXISTS "Allow auth write site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow auth write faqs" ON public.faqs;
DROP POLICY IF EXISTS "Allow auth read messages" ON public.messages;
DROP POLICY IF EXISTS "Allow auth delete messages" ON public.messages;

-- ------------------------------------------------------------------------------
-- 4. HARDEN PUBLIC READ POLICIES (Read-Only for Public Content)
-- ------------------------------------------------------------------------------
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Allow public read profiles') THEN
    CREATE POLICY "Allow public read profiles" ON public.profiles FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'chambers' AND policyname = 'Allow public read chambers') THEN
    CREATE POLICY "Allow public read chambers" ON public.chambers FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'services' AND policyname = 'Allow public read services') THEN
    CREATE POLICY "Allow public read services" ON public.services FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'diseases' AND policyname = 'Allow public read diseases') THEN
    CREATE POLICY "Allow public read diseases" ON public.diseases FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'posts' AND policyname = 'Allow public read posts') THEN
    CREATE POLICY "Allow public read posts" ON public.posts FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'symptoms' AND policyname = 'Allow public read symptoms') THEN
    CREATE POLICY "Allow public read symptoms" ON public.symptoms FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'reviews' AND policyname = 'Allow public read reviews') THEN
    CREATE POLICY "Allow public read reviews" ON public.reviews FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'hero_slides' AND policyname = 'Allow public read hero_slides') THEN
    CREATE POLICY "Allow public read hero_slides" ON public.hero_slides FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'Allow public read site_settings') THEN
    CREATE POLICY "Allow public read site_settings" ON public.site_settings FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'faqs' AND policyname = 'Allow public read faqs') THEN
    CREATE POLICY "Allow public read faqs" ON public.faqs FOR SELECT USING (true);
  END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 5. HARDEN MESSAGES TABLE (Blind Insert Only for Public; Admin Only for Select/Delete)
-- ------------------------------------------------------------------------------
-- Blind Insert: Public visitors and bot traps can only INSERT inquiries, never SELECT/read other patients' PII
DROP POLICY IF EXISTS "Allow public insert messages" ON public.messages;
CREATE POLICY "Allow public insert messages" ON public.messages 
  FOR INSERT TO anon, authenticated 
  WITH CHECK (true);

-- Strictly restrict Reading (SELECT) patient inquiries to verified admins
CREATE POLICY "Allow admin read messages" ON public.messages 
  FOR SELECT TO authenticated 
  USING (public.is_admin());

-- Strictly restrict Deleting patient inquiries to verified admins
CREATE POLICY "Allow admin delete messages" ON public.messages 
  FOR DELETE TO authenticated 
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- 6. STRICT ADMIN-ONLY MUTATION POLICIES ACROSS ALL CMS CONTENT
-- ------------------------------------------------------------------------------
CREATE POLICY "Allow admin manage profiles" ON public.profiles 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Allow admin manage chambers" ON public.chambers 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Allow admin manage services" ON public.services 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Allow admin manage diseases" ON public.diseases 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Allow admin manage posts" ON public.posts 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Allow admin manage symptoms" ON public.symptoms 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Allow admin manage reviews" ON public.reviews 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Allow admin manage hero_slides" ON public.hero_slides 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Allow admin manage site_settings" ON public.site_settings 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Allow admin manage faqs" ON public.faqs 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

-- ==============================================================================
-- VERIFICATION: Test that policies are applied
-- ==============================================================================
SELECT tablename, policyname, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE schemaname = 'public' 
ORDER BY tablename, cmd;
