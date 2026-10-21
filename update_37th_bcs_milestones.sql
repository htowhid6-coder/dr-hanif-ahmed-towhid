-- ==============================================================================
-- 🩺 UPDATE 38th BCS TO 37th BCS IN SUPABASE SITE_SETTINGS
-- Project: Dr. Hanif Ahmed Towhid Official Website (drhaniftowhid.com)
-- Milestone: Dr. Hanif Ahmed Towhid joined 37th BCS (Health Cadre)
-- ==============================================================================
-- Run this in Supabase SQL Editor if you want to execute direct SQL:
-- https://supabase.com/dashboard/project/vsbcvfhvxhpogbxqchhi/sql/new

UPDATE public.site_settings
SET data = (
  SELECT jsonb_agg(
    CASE 
      WHEN (elem->>'titleEn' LIKE '%38th%' OR elem->>'titleEn' LIKE '%38%' OR elem->>'titleBn' LIKE '%৩৮তম%' OR (elem->>'id')::int = 2)
      THEN jsonb_build_object(
        'id', (elem->>'id')::int,
        'iconName', elem->>'iconName',
        'badgeEn', elem->>'badgeEn',
        'badgeBn', elem->>'badgeBn',
        'titleEn', '37th BCS (Health Cadre)',
        'titleBn', '৩৭তম বিসিএস (স্বাস্থ্য ক্যাডার)',
        'dateEn', elem->>'dateEn',
        'dateBn', elem->>'dateBn',
        'descEn', 'Joined Government Health Service as a Gazetted Officer through 37th BCS, serving in government tertiary hospitals.',
        'descBn', '৩৭তম বিসিএস পরীক্ষার মাধ্যমে সরকারি স্বাস্থ্য সার্ভিসে গেজেটেড মেডিকেল অফিসার হিসেবে যোগদান।',
        'orderIndex', (elem->>'orderIndex')::int
      )
      ELSE elem
    END
  )
  FROM jsonb_array_elements(data) AS elem
),
updated_at = NOW()
WHERE id = 'about_milestones';

-- Verification query
SELECT * FROM public.site_settings WHERE id = 'about_milestones';
