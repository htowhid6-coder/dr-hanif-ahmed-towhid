-- SQL to seed the 3 new reviews (and original reviews) in Supabase
-- Run this in the Supabase SQL Editor:

INSERT INTO public.reviews (reviewer_name_en, reviewer_name_bn, reviewer_title_en, reviewer_title_bn, review_text_en, review_text_bn, initials)
VALUES
  (
    'Md. Kamrul Islam',
    'মো. কামরুল ইসলাম',
    'Zindabazar, Sylhet',
    'জিন্দাবাজার, সিলেট',
    'I was suffering from severe hypertension and frequent dizziness. Dr. Hanif''s careful examination and accurate medication plan normalized my blood pressure within weeks. Truly a compassionate physician.',
    'আমার দীর্ঘদিনের উচ্চ রক্তচাপ ও প্রায়ই মাথা ঘোরার সমস্যা ছিল। ডা. হানিফ স্যারের সঠিক প্রেসক্রিপশন ও নিয়মিত ফলোআপের মাধ্যমে অল্প সময়েই আমার প্রেশার নিয়ন্ত্রণে এসেছে। অত্যন্ত যত্নশীল ও অভিজ্ঞ ডাক্তার।',
    'KI'
  ),
  (
    'Farhana Chowdhury',
    'ফারহানা চৌধুরী',
    'Amberkhana, Sylhet',
    'আম্বরখানা, সিলেট',
    'Had chronic thyroid and severe fatigue issues for months. Dr. Hanif explained the condition clearly and adjusted the dosage perfectly. I feel much more energetic now. Very grateful for his guidance.',
    'দীর্ঘদিন ধরে থাইরয়েড ও অতিরিক্ত ক্লান্তির সমস্যায় ভুগছিলাম। ডা. হানিফ স্যার অত্যন্ত শান্তভাবে রোগটি বুঝিয়ে বলেন এবং সঠিক ওষুধ দেন। এখন আমি অনেক সুস্থ ও কর্মক্ষম অনুভব করছি। স্যারের প্রতি আন্তরিক কৃতজ্ঞতা।',
    'FC'
  ),
  (
    'Abdul Malik',
    'আব্দুল মালিক',
    'Beanibazar, Sylhet',
    'বিয়ানীবাজার, সিলেট',
    'Came with severe gastrointestinal complications and persistent chest burning. Sir''s diagnosis was prompt and the prescribed lifestyle changes relieved my symptoms completely. One of the best medicine specialists in Sylhet.',
    'তীব্র পেটের সমস্যা ও গ্যাস্ট্রিকের কারণে বুকে ব্যথায় খুব কষ্ট পাচ্ছিলাম। স্যারের সঠিক রোগ নির্ণয়, খাদ্যাভ্যাস পরিবর্তন ও সময়োপযোগী চিকিৎসায় এখন সম্পূর্ণ সুস্থ। সিলেটের সেরা মেডিসিন বিশেষজ্ঞ ডাক্তার।',
    'AM'
  );
