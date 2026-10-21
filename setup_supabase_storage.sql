-- ==============================================================================
-- 📦 SETUP SUPABASE STORAGE BUCKET FOR IMAGE UPLOADS
-- Project: Dr. Hanif Ahmed Towhid Official Website (drhaniftowhid.com)
-- ==============================================================================
-- INSTRUCTIONS FOR DEPLOYMENT:
-- 1. Open Supabase Dashboard: https://supabase.com/dashboard/project/vsbcvfhvxhpogbxqchhi/sql/new
-- 2. Paste this SQL script and click "RUN"
-- ==============================================================================

-- 1. Create public 'uploads' bucket if not already existing
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'uploads',
  'uploads',
  true,
  15728640, -- 15MB file size limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 15728640,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif'];

-- 2. Allow PUBLIC (anyone) to read/download images from 'uploads' bucket
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'uploads');

-- 3. Allow AUTHENTICATED ADMINS to upload new images
DROP POLICY IF EXISTS "Admin Upload Images" ON storage.objects;
CREATE POLICY "Admin Upload Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'uploads');

-- 4. Allow AUTHENTICATED ADMINS to update or replace images
DROP POLICY IF EXISTS "Admin Update Images" ON storage.objects;
CREATE POLICY "Admin Update Images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'uploads');

-- 5. Allow AUTHENTICATED ADMINS to delete images
DROP POLICY IF EXISTS "Admin Delete Images" ON storage.objects;
CREATE POLICY "Admin Delete Images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'uploads');

-- 6. Ensure profiles table has avatar_url column for doctor profile photo
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Verification
SELECT id, name, public, file_size_limit, allowed_mime_types FROM storage.buckets WHERE id = 'uploads';
