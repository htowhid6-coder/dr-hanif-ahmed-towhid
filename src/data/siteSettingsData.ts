export interface SiteSettings {
  // Global & Brand
  siteTitleEn: string;
  siteTitleBn: string;
  siteTaglineEn: string;
  siteTaglineBn: string;
  doctorNameEn: string;
  doctorNameBn: string;
  doctorDegreesEn: string;
  doctorDegreesBn: string;
  doctorDesignationEn: string;
  doctorDesignationBn: string;
  doctorHospitalEn: string;
  doctorHospitalBn: string;
  bmdcNumber: string;
  contactPhone: string;
  whatsappNumber: string;
  contactEmail: string;
  facebookUrl: string;
  footerCopyrightEn: string;
  footerCopyrightBn: string;
  developerCreditEn: string;
  developerCreditBn: string;
  developerUrl: string;

  // Home Page Specialist Intro Section
  specialistIntroBadgeEn: string;
  specialistIntroBadgeBn: string;
  specialistIntroTitleEn: string;
  specialistIntroTitleBn: string;
  specialistIntroBioEn: string;
  specialistIntroBioBn: string;
  specialistIntroBgImage: string;
  specialistIntroCtaTextEn: string;
  specialistIntroCtaTextBn: string;
  specialistIntroCtaLink: string;

  // Home Page Hooking Question Banner Section
  questionBannerBadgeEn: string;
  questionBannerBadgeBn: string;
  questionBannerTitleEn: string;
  questionBannerTitleBn: string;
  questionBannerSubtitleEn: string;
  questionBannerSubtitleBn: string;
  questionBannerIndicatorEn: string;
  questionBannerIndicatorBn: string;

  // Home & Global Urgent Appointment CTA
  urgentCtaTitleEn: string;
  urgentCtaTitleBn: string;
  urgentCtaSubtitleEn: string;
  urgentCtaSubtitleBn: string;
  urgentCtaPhoneText: string;
  urgentCtaWhatsappText: string;

  // Google Review & QR Code System
  googleReviewBusinessUrl: string;
  googleReviewQrCodeImage: string;
  googleReviewTitleEn: string;
  googleReviewTitleBn: string;
  googleReviewSubtitleEn: string;
  googleReviewSubtitleBn: string;
  googleReviewButtonTextEn: string;
  googleReviewButtonTextBn: string;
  googleReviewBadgeEn: string;
  googleReviewBadgeBn: string;
  reviewsMetadata?: Record<string, { rating?: number; google_review_url?: string }>;

  // Aesthetic Section Breaker Banner 2
  banner2Image: string;
  banner2BadgeEn: string;
  banner2BadgeBn: string;
  banner2HeadingEn: string;
  banner2HeadingBn: string;
  banner2SubtextEn: string;
  banner2SubtextBn: string;

  // Aesthetic Section Breaker Banner 3
  banner3Image: string;
  banner3BadgeEn: string;
  banner3BadgeBn: string;
  banner3HeadingEn: string;
  banner3HeadingBn: string;
  banner3SubtextEn: string;
  banner3SubtextBn: string;

  // About Page Hero Cover Banner
  aboutHeroImage: string;
  aboutHeroBadgeEn: string;
  aboutHeroBadgeBn: string;
  aboutHeroTitleEn: string;
  aboutHeroTitleBn: string;
  aboutHeroDegreesEn: string;
  aboutHeroDegreesBn: string;
  aboutHeroLeadEn: string;
  aboutHeroLeadBn: string;

  // About Page Journey Story
  aboutJourneyEyebrowEn: string;
  aboutJourneyEyebrowBn: string;
  aboutJourneyTitleEn: string;
  aboutJourneyTitleBn: string;
  aboutJourneyP1En: string;
  aboutJourneyP1Bn: string;
  aboutJourneyP2En: string;
  aboutJourneyP2Bn: string;

  // About Page Milestones Header
  aboutMilestonesTitleEn: string;
  aboutMilestonesTitleBn: string;
  aboutMilestonesLeadEn: string;
  aboutMilestonesLeadBn: string;

  // About Page Expertise
  aboutExpertiseTitleEn: string;
  aboutExpertiseTitleBn: string;
  aboutExpertiseLeadEn: string;
  aboutExpertiseLeadBn: string;
  aboutExpertiseItem1En: string;
  aboutExpertiseItem1Bn: string;
  aboutExpertiseItem2En: string;
  aboutExpertiseItem2Bn: string;
  aboutExpertiseItem3En: string;
  aboutExpertiseItem3Bn: string;

  // About Page Philosophy
  aboutPhilosophyTitleEn: string;
  aboutPhilosophyTitleBn: string;
  aboutPhilosophyQuoteEn: string;
  aboutPhilosophyQuoteBn: string;
  aboutPhilosophyPEn: string;
  aboutPhilosophyPBn: string;

  // About Page Chamber Consultation Box
  aboutChamberBadgeEn: string;
  aboutChamberBadgeBn: string;
  aboutChamberTitleEn: string;
  aboutChamberTitleBn: string;
  aboutChamberSubtitleEn: string;
  aboutChamberSubtitleBn: string;
}

export interface AboutMilestone {
  id: number;
  dateEn: string;
  dateBn: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  badgeEn: string;
  badgeBn: string;
  iconName?: string;
  orderIndex: number;
}

export interface QuickStat {
  id: number;
  labelEn: string;
  labelBn: string;
  subEn: string;
  subBn: string;
  iconName?: string;
  orderIndex: number;
}

export const defaultSiteSettings: SiteSettings = {
  // Global & Brand
  siteTitleEn: 'Dr. Hanif Ahmed Towhid',
  siteTitleBn: 'ডা. হানিফ আহমেদ তৌহিদ',
  siteTaglineEn: 'General Medicine Specialist · Sylhet',
  siteTaglineBn: 'মেডিসিন বিশেষজ্ঞ · সিলেট',
  doctorNameEn: 'Dr. Hanif Ahmed Towhid',
  doctorNameBn: 'ডা. হানিফ আহমেদ তৌহিদ',
  doctorDegreesEn: 'MBBS, BCS (Health), MCPS (Medicine), FCPS (Medicine)',
  doctorDegreesBn: 'এমবিবিএস, বিসিএস (স্বাস্থ্য), এমসিপিএস (মেডিসিন), এফসিপিএস (মেডিসিন)',
  doctorDesignationEn: 'Medicine Specialist, Department of Medicine',
  doctorDesignationBn: 'মেডিসিন বিশেষজ্ঞ, মেডিসিন বিভাগ',
  doctorHospitalEn: 'Sylhet MAG Osmani Medical College Hospital',
  doctorHospitalBn: 'সিলেট এম.এ.জি. ওসমানী মেডিকেল কলেজ ও হাসপাতাল',
  bmdcNumber: 'A-76300',
  contactPhone: '01346-132486',
  whatsappNumber: '8801346132486',
  contactEmail: 'htowhid6@gmail.com',
  facebookUrl: 'https://www.facebook.com/share/1DHArPTjmH/',
  footerCopyrightEn: '© 2026 Dr. Hanif Ahmed Towhid. All rights reserved.',
  footerCopyrightBn: '© ২০২৬ ডা. হানিফ আহমেদ তৌহিদ। সর্বস্বত্ব সংরক্ষিত।',
  developerCreditEn: 'Developed by Benzadid Intelligence',
  developerCreditBn: 'ডেভেলপমেন্ট বাই বেনজাদিদ ইন্টেলিজেন্স',
  developerUrl: 'https://benzadidintelligence.com/',

  // Home Page Specialist Intro Section
  specialistIntroBadgeEn: 'Specialist Introduction',
  specialistIntroBadgeBn: 'বিশেষজ্ঞ চিকিৎসক পরিচিতি',
  specialistIntroTitleEn: 'Trusted Medical Consultations for Diabetes & Chronic Conditions in Sylhet.',
  specialistIntroTitleBn: 'সিলেটে ডায়াবেটিস, হরমোন ও মেডিসিন রোগের নির্ভরযোগ্য চিকিৎসা পরামর্শ।',
  specialistIntroBioEn: 'Dr. Hanif Ahmed Towhid serves as a Medicine Specialist at Sylhet MAG Osmani Medical College Hospital. He believes in patient-centric, scientifically precise care. His practice is focused on adult medicine, diabetes, hormonal balance (thyroid), hypertension, and infectious disease management.',
  specialistIntroBioBn: 'ডা. হানিফ আহমেদ তৌহিদ বর্তমানে সিলেট এম.এ.জি. ওসমানী মেডিকেল কলেজ হাসপাতালে মেডিসিন বিশেষজ্ঞ হিসেবে দায়িত্ব পালন করছেন। তিনি রোগীর শারীরিক সমস্যা নিখুঁতভাবে বিশ্লেষণ এবং বিজ্ঞানভিত্তিক চিকিৎসা প্রদানে আন্তরিক। প্রাপ্তবয়স্কদের দীর্ঘস্থায়ী মেডিসিন ব্যাধি, ডায়াবেটিস, হরমোনের ভারসাম্যহীনতা (থাইরয়েড), উচ্চ রক্তচাপ ও জটিল ইনফেকশনের আধুনিক চিকিৎসায় তিনি নিবেদিত।',
  specialistIntroBgImage: '/doctor-consultation-bg.png',
  specialistIntroCtaTextEn: 'Read My Journey',
  specialistIntroCtaTextBn: 'ডাক্তারের পরিচিতি ও ডিগ্রি পড়ুন',
  specialistIntroCtaLink: '/about',

  // Home Page Hooking Question Banner Section
  questionBannerBadgeEn: 'Health Inquiry',
  questionBannerBadgeBn: 'স্বাস্থ্য জিজ্ঞাসা',
  questionBannerTitleEn: 'Are you having these issues?',
  questionBannerTitleBn: 'আপনার কি এই অসুবিধাগুলো হচ্ছে?',
  questionBannerSubtitleEn: 'Do not overlook everyday physical discomfort or recurring symptoms. Check your condition below.',
  questionBannerSubtitleBn: 'প্রতিদিনের শারীরিক অস্বস্তি বা দীর্ঘস্থায়ী কোনো লক্ষণ অবহেলা করবেন না। নিচে আপনার লক্ষণটি মিলিয়ে দেখুন।',
  questionBannerIndicatorEn: 'Explore Symptoms Below',
  questionBannerIndicatorBn: 'নিচে লক্ষণগুলো দেখুন',

  // Home & Global Urgent Appointment CTA
  urgentCtaTitleEn: 'Need to Book a Serial?',
  urgentCtaTitleBn: 'এপয়েন্টমেন্ট বা সিরিয়াল প্রয়োজন?',
  urgentCtaSubtitleEn: 'Book your consulting slot at Popular Medical Center Kazalshah, Sylhet.',
  urgentCtaSubtitleBn: 'পপুলার মেডিকেল সেন্টারে ডা. হানিফ আহমেদ তৌহিদকে দেখাতে সরাসরি চেম্বারে যোগাযোগ করুন।',
  urgentCtaPhoneText: '01346-132486',
  urgentCtaWhatsappText: 'WhatsApp',

  // Google Review & QR Code System
  googleReviewBusinessUrl: 'https://maps.google.com/?q=Popular+Medical+Center+Sylhet',
  googleReviewQrCodeImage: '',
  googleReviewTitleEn: 'Leave Us a Google Review',
  googleReviewTitleBn: 'গুগল রিভিউ দিন',
  googleReviewSubtitleEn: 'Have you received treatment from Dr. Hanif Ahmed Towhid? Scan the QR code with your mobile camera or click below to share your experience on Google.',
  googleReviewSubtitleBn: 'ডা. হানিফ আহমেদ তৌহিদের নিকট চিকিৎসা নিয়েছেন? আপনার মূল্যবান আরোগ্য ও চিকিৎসা অভিজ্ঞতা জানাতে মোবাইল ক্যামেরা দিয়ে কিউআর কোডটি স্ক্যান করুন অথবা নিচের বাটনে ক্লিক করুন।',
  googleReviewButtonTextEn: 'Write a Review on Google',
  googleReviewButtonTextBn: 'গুগলে রিভিউ দিন',
  googleReviewBadgeEn: 'Share Your Story',
  googleReviewBadgeBn: 'আপনার মতামত আমাদের অনুপ্রেরণা',
  reviewsMetadata: {},

  // Aesthetic Section Breaker Banner 2
  banner2Image: '/Section Breaking Aesthetic Image_2.png',
  banner2BadgeEn: 'Clinical Excellence & Diagnostics',
  banner2BadgeBn: 'ক্লিনিক্যাল উৎকর্ষ ও নির্ভুল রোগ নির্ণয়',
  banner2HeadingEn: 'Root-Cause Clinical Diagnosis & Compassionate Care',
  banner2HeadingBn: 'রোগের মূল কারণ অনুসন্ধান ও বৈজ্ঞানিক চিকিৎসা',
  banner2SubtextEn: 'Decades of specialized hospital care and advanced internal medicine practice in Sylhet.',
  banner2SubtextBn: 'সিলেট এম.এ.জি. ওসমানী মেডিকেল কলেজ ও হাসপাতালের চিকিৎসা অভিজ্ঞতায় সমৃদ্ধ।',

  // Aesthetic Section Breaker Banner 3
  banner3Image: '/Section Breaking Aesthetic Image_3.png',
  banner3BadgeEn: 'Dedicated to Patient Care & Trust',
  banner3BadgeBn: 'রোগীর প্রতি অকৃত্রিম যত্ন ও আস্থা',
  banner3HeadingEn: 'Guiding Your Journey to Better Health',
  banner3HeadingBn: 'সুস্থ জীবনের পথে আপনার পাশে',
  banner3SubtextEn: 'Popular Medical Center Ltd., Sylhet — Professional consultation and caring environment.',
  banner3SubtextBn: 'পপুলার মেডিকেল সেন্টার, সিলেট — আধুনিক পরিবেশে নিয়মিত চেম্বার সেবা।',

  // About Page Hero Cover Banner
  aboutHeroImage: '/Dr. Hanif_About page hero section image.png',
  aboutHeroBadgeEn: 'Medicine Specialist · Sylhet',
  aboutHeroBadgeBn: 'মেডিসিন বিশেষজ্ঞ · সিলেট',
  aboutHeroTitleEn: 'Dr. Hanif Ahmed Towhid',
  aboutHeroTitleBn: 'ডা. হানিফ আহমেদ তৌহিদ',
  aboutHeroDegreesEn: 'MBBS, BCS (Health), MCPS (Medicine), FCPS (Medicine)',
  aboutHeroDegreesBn: 'এমবিবিএস, বিসিএস (স্বাস্থ্য), এমসিপিএস (মেডিসিন), এফসিপিএস (মেডিসিন)',
  aboutHeroLeadEn: 'Medicine Specialist, Department of Medicine at Sylhet MAG Osmani Medical College Hospital. Dedicated to scientifically precise internal medicine care.',
  aboutHeroLeadBn: 'মেডিসিন বিশেষজ্ঞ (মেডিসিন বিভাগ), সিলেট এম.এ.জি. ওসমানী মেডিকেল কলেজ হাসপাতাল। সঠিক রোগ নির্ণয় ও রোগীর প্রতি পরম আন্তরিক সেবায় অঙ্গীকারবদ্ধ।',

  // About Page Journey Story
  aboutJourneyEyebrowEn: 'My Medical Journey',
  aboutJourneyEyebrowBn: 'চিকিৎসা জীবন ও অভিজ্ঞতা',
  aboutJourneyTitleEn: 'Dedicated to Evidence-Based Clinical Excellence & Compassionate Healing',
  aboutJourneyTitleBn: 'রোগীর প্রতি গভীর মমত্ববোধ এবং বিজ্ঞানভিত্তিক আধুনিক চিকিৎসায় নিবেদিত',
  aboutJourneyP1En: 'After completing MBBS from Sylhet MAG Osmani Medical College, Dr. Hanif Ahmed Towhid joined the prestigious BCS (Health Cadre). Driven by clinical excellence, he achieved dual specialist distinctions: MCPS (Medicine) and the highest professional fellowship FCPS (Medicine) from Bangladesh College of Physicians and Surgeons (BCPS).',
  aboutJourneyP1Bn: 'সিলেট এম.এ.জি. ওসমানী মেডিকেল কলেজ থেকে এমবিবিএস সম্পন্ন করার পর ডা. হানিফ আহমেদ তৌহিদ গৌরবময় বিসিএস (স্বাস্থ্য) ক্যাডারে যোগদান করেন। চিকিৎসাবিজ্ঞানে আরও গভীর জ্ঞান ও দক্ষতার তাগিদে তিনি বাংলাদেশ কলেজ অব ফিজিশিয়ানস অ্যান্ড সার্জনস (BCPS) থেকে অর্জন করেন মেডিসিনের উচ্চতর ডিগ্রি—এমসিপিএস (MCPS) এবং মেডিসিন বিষয়ের সর্বোচ্চ সম্মানজনক ফেলোশিপ এফসিপিএস (FCPS)।',
  aboutJourneyP2En: 'Currently serving as a Medicine Specialist at Sylhet MAG Osmani Medical College Hospital, Dr. Hanif manages complex adult illnesses, diabetes, thyroid disorders, cardiovascular risks, and infectious diseases, combining modern diagnostics with attentive patient listening.',
  aboutJourneyP2Bn: 'বর্তমানে তিনি সিলেট এম.এ.জি. ওসমানী মেডিকেল কলেজ হাসপাতালে মেডিসিন বিশেষজ্ঞ হিসেবে দায়িত্ব পালন করছেন। জটিল ও দীর্ঘস্থায়ী মেডিসিনের রোগ, অনিয়ন্ত্রিত ডায়াবেটিস, থাইরয়েড ও হরমোনজনিত সমস্যা, উচ্চ রক্তচাপ ও বিভিন্ন সংক্রামক রোগের নিখুঁত রোগ নির্ণয় ও সফল ব্যবস্থাপনায় তিনি রোগীদের আস্থা অর্জন করেছেন।',

  // About Page Milestones Header
  aboutMilestonesTitleEn: 'Academic & Professional Milestones',
  aboutMilestonesTitleBn: 'শিক্ষাগত ও পেশাগত অর্জন',
  aboutMilestonesLeadEn: 'Structured progression towards medicine excellence',
  aboutMilestonesLeadBn: 'চিকিৎসাবিজ্ঞানে ধারাবাহিক উৎকর্ষ ও ডিগ্রি অর্জনের পথচলা',

  // About Page Expertise
  aboutExpertiseTitleEn: 'Clinical Expertise',
  aboutExpertiseTitleBn: 'চিকিৎসাগত বিশেষ ক্ষেত্রসমূহ',
  aboutExpertiseLeadEn: 'Key areas of clinical specialization and hospital-level diagnostic care:',
  aboutExpertiseLeadBn: 'যেসব প্রধান স্বাস্থ্য সমস্যায় বিশেষ পরামর্শ ও সেবা প্রদান করা হয়:',
  aboutExpertiseItem1En: 'Comprehensive Diabetes & Metabolic Disorder Management (Type 1, Type 2, Thyroid, Obesity)',
  aboutExpertiseItem1Bn: 'ডায়াবেটিস, থাইরয়েড ও মেটাবলিক রোগের আধুনিক ব্যবস্থাপনা (টাইপ ১, টাইপ ২ ও হরমোন ভারসাম্যহীনতা)',
  aboutExpertiseItem2En: 'Cardiovascular Risk Prevention, Hypertension & Dyslipidemia Care',
  aboutExpertiseItem2Bn: 'উচ্চ রক্তচাপ, কোলেস্টেরল ও হৃদরোগের ঝুঁকি নিয়ন্ত্রণ এবং সমন্বিত চিকিৎসা',
  aboutExpertiseItem3En: 'Complex Infectious Diseases, Viral Fevers, Chest Conditions & Adult Internal Medicine',
  aboutExpertiseItem3Bn: 'জটিল সংক্রামক রোগ, টাইফয়েড ও ডেঙ্গুজ্বর, ফুসফুসের সংক্রমণ ও প্রাপ্তবয়স্কদের মেডিসিন সেবা',

  // About Page Philosophy
  aboutPhilosophyTitleEn: 'Practice Philosophy',
  aboutPhilosophyTitleBn: 'চিকিৎসা দর্শন ও মূলনীতি',
  aboutPhilosophyQuoteEn: 'Medicine is an art of attentive listening, accurate investigation, and guiding patients toward holistic well-being.',
  aboutPhilosophyQuoteBn: 'চিকিৎসা কেবল ওষুধ প্রেসক্রিপশন নয়; এটি রোগীর কথা মনোযোগ দিয়ে শোনা, সঠিক কারণ অনুসন্ধান করা এবং সুস্থ জীবনযাপনে পথপ্রদর্শন করার আন্তরিক অঙ্গীকার।',
  aboutPhilosophyPEn: 'Dr. Hanif believes every patient deserves clear explanation, tailored diagnostic plans, and rational medication without unnecessary tests or overburdening prescriptions.',
  aboutPhilosophyPBn: 'ডা. হানিফ বিশ্বাস করেন প্রতিটি রোগী তার রোগের ব্যাপারে সহজবোধ্য ব্যাখ্যা, প্রয়োজনীয় রোগ নির্ণয় পরীক্ষা এবং অপ্রয়োজনীয় ওষুধের বোঝা পরিহার করে বিজ্ঞানসম্মত চিকিৎসা পাওয়ার পূর্ণ অধিকার রাখেন।',

  // About Page Chamber Consultation Box
  aboutChamberBadgeEn: 'Chamber Consultation',
  aboutChamberBadgeBn: 'চেম্বার অ্যাপয়েন্টমেন্ট',
  aboutChamberTitleEn: 'Consult Dr. Hanif in Person',
  aboutChamberTitleBn: 'সরাসরি চেম্বারে এসে পরামর্শ নিন',
  aboutChamberSubtitleEn: 'Popular Medical Center Ltd. (6th Floor, Room 605), Kazalshah, Sylhet. Please book serial ticket after 9:00 AM on appointment day.',
  aboutChamberSubtitleBn: 'পপুলার মেডিকেল সেন্টার লিমিটেড (৬ষ্ঠ তলা, রুম ৬০৫), কাজলশাহ, সিলেট। রোগী দেখার দিন সকাল ৯টার পর সিরিয়াল নিশ্চিত করুন।'
};

export const defaultMilestones: AboutMilestone[] = [
  {
    id: 0,
    dateEn: '2024 · BCPS Dhaka',
    dateBn: '২০২৪ · বিসিপিএস ঢাকা',
    titleEn: 'FCPS (Medicine) — Fellowship',
    titleBn: 'এফসিপিএস (মেডিসিন) — ফেলোশিপ',
    descEn: 'Highest professional specialist qualification in Internal Medicine awarded by Bangladesh College of Physicians and Surgeons (BCPS).',
    descBn: 'বাংলাদেশ কলেজ অব ফিজিশিয়ানস অ্যান্ড সার্জনস (BCPS) থেকে ইন্টারনাল মেডিসিন বিষয়ে দেশের সর্বোচ্চ সম্মানজনক ফেলোশিপ অর্জন।',
    badgeEn: 'Fellowship Distinction',
    badgeBn: 'মেডিসিনে সর্বোচ্চ ডিগ্রি',
    iconName: 'Award',
    orderIndex: 0
  },
  {
    id: 1,
    dateEn: '2022 · BCPS Dhaka',
    dateBn: '২০২২ · বিসিপিএস ঢাকা',
    titleEn: 'MCPS (Medicine) — Membership',
    titleBn: 'এমসিপিএস (মেডিসিন) — মেম্বারশিপ',
    descEn: 'Post-graduate specialty qualification demonstrating advanced clinical competency in general internal medicine.',
    descBn: 'জেনারেল ইন্টারনাল মেডিসিনে গভীর ক্লিনিক্যাল দক্ষতা ও উচ্চতর পোস্ট-গ্র্যাজুয়েট মেম্বারশিপ ডিগ্রি অর্জন।',
    badgeEn: 'Specialist Membership',
    badgeBn: 'উচ্চতর প্রশিক্ষণ',
    iconName: 'GraduationCap',
    orderIndex: 1
  },
  {
    id: 2,
    dateEn: '2019 · Govt. of Bangladesh',
    dateBn: '২০১৯ · বাংলাদেশ সরকার',
    titleEn: '38th BCS (Health Cadre)',
    titleBn: '৩৮তম বিসিএস (স্বাস্থ্য ক্যাডার)',
    descEn: 'Joined Government Health Service as a Gazetted Officer, serving in government tertiary hospitals.',
    descBn: '৩৮তম বিসিএস পরীক্ষার মাধ্যমে সরকারি স্বাস্থ্য সার্ভিসে গেজেটেড মেডিকেল অফিসার হিসেবে যোগদান।',
    badgeEn: 'Govt. Gazetted Officer',
    badgeBn: 'সরকারি স্বাস্থ্য ক্যাডার',
    iconName: 'ShieldCheck',
    orderIndex: 2
  },
  {
    id: 3,
    dateEn: '2015 · SOMC Sylhet',
    dateBn: '২০১৫ · এসওএমসি সিলেট',
    titleEn: 'MBBS Degree Graduation',
    titleBn: 'এমবিবিএস ডিগ্রি অর্জন',
    descEn: 'Graduated in Medicine and Surgery from Sylhet MAG Osmani Medical College (Shahjalal University of Science & Technology).',
    descBn: 'সিলেট এম.এ.জি. ওসমানী মেডিকেল কলেজ (শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়) থেকে কৃতিত্বের সাথে এমবিবিএস ডিগ্রি সম্পন্ন।',
    badgeEn: 'MBBS Graduation',
    badgeBn: 'ওসমানী মেডিকেল কলেজ',
    iconName: 'Building2',
    orderIndex: 3
  }
];

export const defaultQuickStats: QuickStat[] = [
  {
    id: 0,
    labelEn: 'FCPS & MCPS',
    labelBn: 'এফসিপিএস ও এমসিপিএস',
    subEn: 'Medicine Fellowships',
    subBn: 'ইন্টারনাল মেডিসিন ডিগ্রি',
    iconName: 'Award',
    orderIndex: 0
  },
  {
    id: 1,
    labelEn: 'BCS (Health)',
    labelBn: 'বিসিএস (স্বাস্থ্য)',
    subEn: 'Govt. Health Cadre',
    subBn: 'সরকারি স্বাস্থ্য কর্মকর্তা',
    iconName: 'ShieldCheck',
    orderIndex: 1
  },
  {
    id: 2,
    labelEn: 'Sylhet Osmani Hospital',
    labelBn: 'সিলেট ওসমানী হাসপাতাল',
    subEn: 'Medicine Specialist',
    subBn: 'মেডিসিন বিশেষজ্ঞ',
    iconName: 'Building2',
    orderIndex: 2
  },
  {
    id: 3,
    labelEn: 'Patient-Centric Care',
    labelBn: 'রোগীকেন্দ্রিক সেবা',
    subEn: 'Evidence-Based Practice',
    subBn: 'আধুনিক ও বৈজ্ঞানিক চিকিৎসা',
    iconName: 'Heart',
    orderIndex: 3
  }
];
