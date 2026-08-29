export interface HeroSlide {
  id: string;
  type: 'welcome' | 'doctor-intro' | 'conditions' | 'chamber' | 'custom';
  is_active: boolean;
  order_index: number;

  // General Text / Header Fields
  eyebrow_en?: string;
  eyebrow_bn?: string;
  title_en: string;
  title_bn: string;
  lead_en?: string;
  lead_bn?: string;

  // CTA Buttons
  cta_text_en?: string;
  cta_text_bn?: string;
  cta_href?: string;
  cta_type?: 'whatsapp' | 'call' | 'link';
  secondary_cta_text_en?: string;
  secondary_cta_text_bn?: string;
  secondary_cta_href?: string;

  // Doctor Intro Specific
  doctor_image?: string;
  doctor_specialty_en?: string;
  doctor_specialty_bn?: string;
  doctor_degrees_en?: string;
  doctor_degrees_bn?: string;
  doctor_designation_en?: string;
  doctor_designation_bn?: string;
  chamber_hours_highlight_en?: string;
  chamber_hours_highlight_bn?: string;
  chamber_address_highlight_en?: string;
  chamber_address_highlight_bn?: string;

  // Chamber Slide Specific
  chamber_room_en?: string;
  chamber_room_bn?: string;
  chamber_room_badge_en?: string;
  chamber_room_badge_bn?: string;
  chamber_address_en?: string;
  chamber_address_bn?: string;
  chamber_hours_en?: string;
  chamber_hours_bn?: string;
  chamber_off_days_en?: string;
  chamber_off_days_bn?: string;
  chamber_ticket_phone?: string;
  chamber_ticket_badge_en?: string;
  chamber_ticket_badge_bn?: string;
  chamber_ticket_note_en?: string;
  chamber_ticket_note_bn?: string;

  // Custom Slide Specific
  custom_image?: string;
}

export const defaultHeroBgImage = '/hero-desktop.png';

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: 'welcome',
    type: 'welcome',
    is_active: true,
    order_index: 0,
    eyebrow_en: 'Medicine Specialist · Sylhet',
    eyebrow_bn: 'মেডিসিন বিশেষজ্ঞ · সিলেট',
    title_en: 'Precision Diagnostics & Compassionate Care — Your Health, Our Priority.',
    title_bn: 'সঠিক রোগ নির্ণয় ও সুচিকিৎসা — আপনার আস্থায় আমাদের অঙ্গীকার।',
    lead_en: 'Dr. Hanif Ahmed Towhid, Medicine Specialist (Department of Medicine), Sylhet MAG Osmani Medical College Hospital.',
    lead_bn: 'ডা. হানিফ আহমেদ তৌহিদ, মেডিসিন বিশেষজ্ঞ (মেডিসিন বিভাগ), সিলেট এম.এ.জি. ওসমানী মেডিকেল কলেজ হাসপাতাল।',
    cta_text_en: 'Call for Serial Booking',
    cta_text_bn: 'সিরিয়ালের জন্য কল করুন',
    cta_href: 'https://wa.me/8801346132486',
    cta_type: 'whatsapp',
  },
  {
    id: 'doctor-intro',
    type: 'doctor-intro',
    is_active: true,
    order_index: 1,
    title_en: 'Dr. Hanif Ahmed Towhid',
    title_bn: 'ডা. হানিফ আহমেদ তৌহিদ',
    doctor_image: '/doctor-hero.png',
    doctor_specialty_en: 'Medicine Specialist',
    doctor_specialty_bn: 'মেডিসিন বিশেষজ্ঞ',
    doctor_degrees_en: 'MBBS, BCS (Health), MCPS (Medicine), FCPS (Medicine)',
    doctor_degrees_bn: 'MBBS, BCS (Health), MCPS (Medicine), FCPS (Medicine)',
    doctor_designation_en: 'Medicine Specialist (Department of Medicine), Sylhet MAG Osmani Medical College Hospital',
    doctor_designation_bn: 'মেডিসিন বিশেষজ্ঞ (মেডিসিন বিভাগ), সিলেট এম.এ.জি. ওসমানী মেডিকেল কলেজ হাসপাতাল',
    chamber_hours_highlight_en: 'Patient Viewing: 5:00 PM – 9:00 PM (Friday & Tuesday Closed)',
    chamber_hours_highlight_bn: 'রোগী দেখার সময়: প্রতিদিন বিকাল ৫:০০টা – রাত ৯:০০টা (শুক্রবার ও মঙ্গলবার বন্ধ)',
    chamber_address_highlight_en: 'Popular Medical Center Ltd. (Room 605), New Medical Road, Kazalshah, Sylhet.',
    chamber_address_highlight_bn: 'পপুলার মেডিকেল সেন্টার লিমিটেড (রুম-৬০৫), নিউ মেডিকেল রোড, কাজলশাহ, সিলেট।',
    cta_text_en: 'Call for Serial',
    cta_text_bn: 'সিরিয়ালের জন্য কল করুন',
    cta_href: 'https://wa.me/8801346132486',
    cta_type: 'whatsapp',
    secondary_cta_text_en: "Doctor's Journey",
    secondary_cta_text_bn: 'ডাক্তারের জীবন ও ডিগ্রি',
    secondary_cta_href: '/about',
  },
  {
    id: 'conditions',
    type: 'conditions',
    is_active: true,
    order_index: 2,
    title_en: 'Diseases We Treat',
    title_bn: 'যেসব রোগের চিকিৎসা দেওয়া হয়',
    lead_en: 'Tap any condition for instant clinical insights',
    lead_bn: 'যেকোনো রোগে ক্লিক করে চিকিৎসা পরামর্শ জানুন',
    secondary_cta_text_en: 'View More',
    secondary_cta_text_bn: 'আরও দেখুন',
    secondary_cta_href: '/diseases',
  },
  {
    id: 'chamber',
    type: 'chamber',
    is_active: true,
    order_index: 3,
    eyebrow_en: 'Chamber Location',
    eyebrow_bn: 'চেম্বারের ঠিকানা ও সময়সূচী',
    title_en: 'Popular Medical Center Ltd., Sylhet.',
    title_bn: 'পপুলার মেডিকেল সেন্টার লিমিটেড, সিলেট।',
    chamber_room_en: '6th Floor, Room No-605',
    chamber_room_bn: '৬ষ্ঠ তলা, রুম নং-৬০৫',
    chamber_room_badge_en: 'Main Chamber',
    chamber_room_badge_bn: 'প্রধান চেম্বার',
    chamber_address_en: 'New Medical Road, Kazalshah, Sylhet.',
    chamber_address_bn: 'নিউ মেডিকেল রোড, কাজলশাহ, সিলেট।',
    chamber_hours_en: '5:00 PM – 9:00 PM (Daily)',
    chamber_hours_bn: 'প্রতিদিন বিকাল ৫:০০টা – রাত ৯:০০টা',
    chamber_off_days_en: 'Friday & Tuesday Closed',
    chamber_off_days_bn: 'শুক্রবার ও মঙ্গলবার চেম্বার বন্ধ থাকে',
    chamber_ticket_phone: '01346-132486',
    chamber_ticket_badge_en: 'Serial Hotline',
    chamber_ticket_badge_bn: 'সিরিয়াল হটলাইন',
    chamber_ticket_note_en: 'Call after 9:00 AM to confirm your appointment serial',
    chamber_ticket_note_bn: 'সকাল ৯:০০টার পর কল করে সিরিয়াল বুকিং নিশ্চিত করুন',
    cta_text_en: 'Contact Chamber via WhatsApp',
    cta_text_bn: 'হোয়াটসঅ্যাপে চেম্বারে যোগাযোগ',
    cta_href: 'https://wa.me/8801346132486',
    cta_type: 'whatsapp',
    secondary_cta_text_en: 'Direct Call',
    secondary_cta_text_bn: 'সরাসরি কল করুন',
    secondary_cta_href: 'tel:01346132486',
  },
];
