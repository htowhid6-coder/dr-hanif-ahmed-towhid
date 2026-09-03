-- Migration: Add customizable rating and google_review_url to patient reviews table
-- Run this in your Supabase SQL Editor if you want to store rating and URL directly in public.reviews columns.

ALTER TABLE public.reviews 
ADD COLUMN IF NOT EXISTS rating NUMERIC(2,1) DEFAULT 5.0,
ADD COLUMN IF NOT EXISTS google_review_url TEXT DEFAULT '';

-- Optional comment description
COMMENT ON COLUMN public.reviews.rating IS 'Star rating of the patient review (e.g. 5.0, 4.0)';
COMMENT ON COLUMN public.reviews.google_review_url IS 'Direct link to the verified review on Google Maps / Google Reviews';
