export interface FAQItem {
  id: string;
  category: 'chamber' | 'specialization' | 'consultation' | 'emergency' | 'advice';
  q: {
    en: string;
    bn: string;
  };
  a: {
    en: string;
    bn: string;
  };
}

export interface FAQCategory {
  id: 'all' | 'chamber' | 'specialization' | 'consultation' | 'emergency' | 'advice';
  label: {
    en: string;
    bn: string;
  };
}

export const faqCategories: FAQCategory[] = [
  { id: 'all', label: { en: 'All FAQs', bn: 'সকল প্রশ্নোত্তর' } },
  { id: 'chamber', label: { en: 'Chamber & Serial', bn: 'চেম্বার ও সিরিয়াল' } },
  { id: 'specialization', label: { en: 'Doctor & Specialties', bn: 'চিকিৎসক ও রোগসমূহ' } },
  { id: 'consultation', label: { en: 'Reports & Visits', bn: 'টেস্ট ও রিপোর্ট' } },
  { id: 'emergency', label: { en: 'Emergency & Online', bn: 'জরুরি ও অনলাইন' } },
  { id: 'advice', label: { en: 'Health Advice', bn: 'স্বাস্থ্য পরামর্শ' } }
];

export const faqsData: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'chamber',
    q: {
      en: "Where does Dr. Hanif Ahmed Towhid see patients and what are the visiting hours?",
      bn: "ডা. হানিফ আহমেদ তৌহিদ কোথায় এবং কখন রোগী দেখেন?"
    },
    a: {
      en: "Dr. Hanif Ahmed Towhid consults patients in his private chamber at Popular Medical Center Ltd., Sylhet (6th Floor, Room No-605, New Medical Road, Kazalshah, Sylhet). Visiting hours are 5:00 PM to 9:00 PM daily. The chamber remains closed on Fridays.",
      bn: "ডা. হানিফ আহমেদ তৌহিদ নিয়মিত রোগী দেখেন সিলেটের কাজলশাহের নিউ মেডিকেল রোডে অবস্থিত পপুলার মেডিকেল সেন্টার লিমিটেড (৬ষ্ঠ তলা, রুম নং-৬০৫)-এ। রোগী দেখার সময়: প্রতিদিন বিকাল ৫:০০টা থেকে রাত ৯:০০টা পর্যন্ত (প্রতি শুক্রবার চেম্বার বন্ধ থাকে)।"
    }
  },
  {
    id: 'faq-2',
    category: 'chamber',
    q: {
      en: "How can I book a serial/ticket for consultation?",
      bn: "সিরিয়াল বা অ্যাপয়েন্টমেন্ট টিকিট কীভাবে বুক করব?"
    },
    a: {
      en: "You can call 01346-132486 starting at 9:00 AM on the day of the appointment to book your serial slot. You can also send a direct message via WhatsApp (+8801346132486) for serial booking and queries.",
      bn: "রোগী দেখানোর দিন সকাল ৯:০০টার পর সরাসরি ০১৩৪৬-১৩২৪৮৬ নম্বরে কল করে আপনার সিরিয়াল বুক করতে পারবেন। এছাড়াও সিরিয়ালের তথ্যের জন্য আমাদের অফিশিয়াল WhatsApp (+8801346132486)-এ মেসেজ দিতে পারেন।"
    }
  },
  {
    id: 'faq-3',
    category: 'chamber',
    q: {
      en: "Can I book an appointment serial in advance before the visit day?",
      bn: "আগের দিন বা অগ্রিম সিরিয়াল নেওয়ার সুযোগ আছে কি?"
    },
    a: {
      en: "To ensure fair and smooth queue management, serials are opened at 9:00 AM on the same day. However, for patients traveling from distant districts or in special circumstances, please contact our chamber reception staff in the morning to discuss advance scheduling options.",
      bn: "রোগীদের সুশৃঙ্খল সিরিয়াল ব্যবস্থাপনার স্বার্থে সাধারণত রোগী দেখানোর দিন সকাল ৯:০০টা থেকেই সিরিয়াল গ্রহণ করা হয়। তবে দূরবর্তী জেলা থেকে আগত রোগী বা বিশেষ প্রয়োজনে আগে থেকেই চেম্বারের সাপোর্ট স্টাফদের সাথে ফোনে কথা বলে পরামর্শ নেওয়ার অনুরোধ করা হচ্ছে।"
    }
  },
  {
    id: 'faq-4',
    category: 'chamber',
    q: {
      en: "How early should I arrive at the chamber after booking a serial?",
      bn: "সিরিয়াল বুক করার পর চেম্বারে কতক্ষণ আগে উপস্থিত হওয়া উচিত?"
    },
    a: {
      en: "We advise arriving at the 6th-floor waiting lounge approximately 15 to 20 minutes before your estimated serial turn. This gives sufficient time to complete patient registration and record basic vitals (blood pressure, pulse, body weight).",
      bn: "আপনার নির্ধারিত সিরিয়াল নম্বরের আনুমানিক সময়ের অন্তত ১৫ থেকে ২০ মিনিট পূর্বে পপুলার মেডিকেল সেন্টারের ৬ষ্ঠ তলার চেম্বার লাউঞ্জে উপস্থিত থাকার অনুরোধ করা হচ্ছে। এতে প্রাথমিক ভাইটালস (রক্তচাপ, পালস, ওজন) পরিমাপ ও রেজিস্ট্রি সম্পন্ন করা সহজ হয়।"
    }
  },
  {
    id: 'faq-5',
    category: 'chamber',
    q: {
      en: "Are elevator (lift) and parking facilities available at the chamber?",
      bn: "পপুলার মেডিকেল সেন্টারে লিফট ও গাড়ি পার্কিংয়ের সুবিধা আছে কি?"
    },
    a: {
      en: "Yes, Popular Medical Center Sylhet is equipped with modern patient lifts, wheelchair accessible ramps, and designated parking space in front and around the complex for patients and attendants.",
      bn: "হ্যাঁ, পপুলার মেডিকেল সেন্টার সিলেটে আধুনিক সার্বক্ষণিক লিফট সুবিধা, হুইলচেয়ার চলাচলের ব্যবস্থা এবং ভবন সংলগ্ন পার্কিং সুবিধা রয়েছে।"
    }
  },
  {
    id: 'faq-6',
    category: 'specialization',
    q: {
      en: "What are Dr. Hanif Ahmed Towhid's qualifications and hospital affiliation?",
      bn: "ডা. হানিফ আহমেদ তৌহিদের শিক্ষাগত যোগ্যতা ও বর্তমান সরকারি পদবী কী?"
    },
    a: {
      en: "Dr. Hanif Ahmed Towhid holds MBBS (SOMC), 37th BCS (Health), MCPS (Medicine), and FCPS (Medicine) credentials. He currently serves as a Registrar in the Department of Medicine at Sylhet MAG Osmani Medical College Hospital.",
      bn: "ডা. হানিফ আহমেদ তৌহিদ অর্জন করেছেন MBBS (সিলেট এমএজি ওসমানী মেডিকেল কলেজ), ৩৭তম বিসিএস (স্বাস্থ্য), MCPS (মেডিসিন) এবং মেডিসিনের সর্বোচ্চ ডিগ্রি FCPS (মেডিসিন)। বর্তমানে তিনি সিলেট এম.এ.জি. ওসমানী মেডিকেল কলেজ হাসপাতালের মেডিসিন বিভাগের রেজিস্ট্রার হিসেবে দায়িত্ব পালন করছেন।"
    }
  },
  {
    id: 'faq-7',
    category: 'specialization',
    q: {
      en: "What medical conditions and diseases does Dr. Hanif treat?",
      bn: "তিনি কোন কোন রোগ ও শারীরিক সমস্যার সুচিকিৎসা প্রদান করেন?"
    },
    a: {
      en: "He treats a wide spectrum of adult internal medicine conditions: uncontrolled diabetes & insulin management, hypertension & high blood pressure, thyroid and hormonal disorders, prolonged and acute fevers (typhoid, dengue, malaria, fever of unknown origin), respiratory infections, acid reflux / GERD & fatty liver, arthritis & joint pains, kidney/UTI infections, and chronic weakness.",
      bn: "মেডিসিন বিশেষজ্ঞ হিসেবে তিনি প্রাপ্তবয়স্কদের জটিল ও দীর্ঘস্থায়ী রোগের সুচিকিৎসা দেন। যার মধ্যে রয়েছে: অনিয়ন্ত্রিত ডায়াবেটিস, উচ্চ রক্তচাপ (হাই প্রেশার), থাইরয়েড ও হরমোন সমস্যা, দীর্ঘস্থায়ী ও জটিল জ্বর (টাইফয়েড, ডেঙ্গু, ম্যালেরিয়া, অজ্ঞাত জ্বর), শ্বাসকষ্ট ও বুকের ইনফেকশন, গ্যাস্ট্রিক আলসার ও লিভার সমস্যা, বাতব্যথা ও জয়েন্টের ব্যথা, প্রস্রাবের ইনফেকশন (UTI), রক্তস্বল্পতা এবং দীর্ঘস্থায়ী দুর্বলতা।"
    }
  },
  {
    id: 'faq-8',
    category: 'specialization',
    q: {
      en: "Does Dr. Hanif treat pediatric (child) patients?",
      bn: "ডা. হানিফ কি শিশুদের চিকিৎসা সেবা প্রদান করেন?"
    },
    a: {
      en: "Dr. Hanif specializes in adult internal medicine (adolescents aged 12+ and adults). For children under 12 years of age, we recommend consulting a certified Child Specialist / Pediatrician for age-appropriate pediatric care.",
      bn: "ডা. হানিফ মূলত প্রাপ্তবয়স্ক ও ১২ বছর বা তদূর্ধ্ব বয়সী রোগীদের ইন্টারনাল মেডিসিন বিশেষজ্ঞ। ১২ বছরের নিচের শিশুদের জন্য শিশু বিশেষজ্ঞ (Pediatrician) চিকিৎসকের পরামর্শ গ্রহণ করা শ্রেয়।"
    }
  },
  {
    id: 'faq-9',
    category: 'specialization',
    q: {
      en: "Can elderly patients suffering from multiple chronic diseases consult him together?",
      bn: "একাধিক রোগে আক্রান্ত বয়োবৃদ্ধ রোগীরা কি একসাথে চিকিৎসা পরামর্শ নিতে পারবেন?"
    },
    a: {
      en: "Yes, multimorbidity management is a cornerstone of internal medicine. Dr. Hanif comprehensively evaluates elderly patients with overlapping diabetes, hypertension, cardiac risk, arthritis, and renal health to balance medications and avoid drug interactions.",
      bn: "অবশ্যই। বয়স্ক রোগীদের ক্ষেত্রে একই সাথে ডায়াবেটিস, উচ্চ রক্তচাপ, হার্টের সমস্যা, কিডনি জটিলতা কিংবা বাতের ব্যথা থাকলে মেডিসিন বিশেষজ্ঞ হিসেবে ডা. হানিফ সামগ্রিক দিক বিবেচনা করে ওষুধের সঠিক সমন্বয় ও পার্শ্বপ্রতিক্রিয়া এড়ানোর সুচিকিৎসা প্রদান করেন।"
    }
  },
  {
    id: 'faq-10',
    category: 'consultation',
    q: {
      en: "What documents and medical history should I bring to my appointment?",
      bn: "প্রথমবার চেম্বারে আসার সময় সাথে কী কী কাগজপত্র আনা দরকার?"
    },
    a: {
      en: "Please bring all previous prescription slips, prior lab test reports (blood/urine tests, X-rays, ultrasound, ECG, CT scans), hospital discharge letters (if previously admitted), and all current medicine packs or a list of active medications.",
      bn: "রোগীর পূর্ববর্তী সকল প্রেসক্রিপশন বা ব্যবস্থাপত্র, বিগত সব রক্ত পরীক্ষা, আল্ট্রাসনোগ্রাম, এক্স-রে, ইসিজি ইত্যাদির রিপোর্ট, পূর্বে হাসপাতালে ভর্তির ছাড়পত্র (যদি থাকে) এবং বর্তমানে যে সকল ওষুধ নিয়মিত খাচ্ছেন তার তালিকা বা পাতার প্যাকেট সাথে আনা অত্যন্ত জরুরি।"
    }
  },
  {
    id: 'faq-11',
    category: 'consultation',
    q: {
      en: "What is the policy and timeframe for showing investigation/test reports?",
      bn: "টেস্টের রিপোর্ট দেখানোর (Follow-up) নিয়ম ও সময়সীমা কতদিন?"
    },
    a: {
      en: "Following your initial consultation, you can bring the requested test reports for review within 7 to 10 days. We suggest calling the chamber desk on the day of your visit to confirm the optimal time slot for report verification.",
      bn: "প্রথমবার রোগী দেখানোর পর যেসব পরীক্ষা-নিরীক্ষা দেওয়া হয়, সেগুলো সম্পন্ন করে সাধারণত ৭ থেকে ১০ দিনের মধ্যে চেম্বারে এসে রিপোর্ট দেখানো যায়। রিপোর্ট দেখাতে আসার দিনও চেম্বার নম্বরে যোগাযোগ করে সময় নিশ্চিত হয়ে আসা উত্তম।"
    }
  },
  {
    id: 'faq-12',
    category: 'consultation',
    q: {
      en: "How frequently should patients with Diabetes & Hypertension come for follow-up?",
      bn: "ডায়াবেটিস ও উচ্চ রক্তচাপের রোগীদের কতদিন পরপর ফলো-আপ করানো উচিত?"
    },
    a: {
      en: "For chronic conditions like diabetes and high blood pressure, stable patients are generally advised to follow up every 1 to 3 months to assess blood sugar control (HbA1c), kidney vitals, and adjust drug dosages accurately.",
      bn: "ডায়াবেটিস ও ব্লাড প্রেশার নিয়ন্ত্রণে থাকলে সাধারণত প্রতি ১ থেকে ৩ মাস অন্তর ফলো-আপ করা উচিত। তবে ওষুধ পরিবর্তনের ক্ষেত্রে বা সুগার/প্রেসার উঠানামা করলে চিকিৎসকের নির্ধারিত তারিখে পুনরায় এসে পরামর্শ নেওয়া বাঞ্ছনীয়।"
    }
  },
  {
    id: 'faq-13',
    category: 'consultation',
    q: {
      en: "Are vital measurements (BP, Weight, Blood Sugar) performed at the chamber?",
      bn: "চেম্বারে কি রক্তচাপ, ওজন ও সুগার মাপার ব্যবস্থা রয়েছে?"
    },
    a: {
      en: "Yes, vital measurements such as Blood Pressure (BP), Pulse rate, Body Weight, and immediate Random Blood Sugar (RBS) are performed by trained chamber clinical assistants prior to your consultation.",
      bn: "হ্যাঁ, ডাক্তারের সাথে সাক্ষাতের পূর্বেই চেম্বারের অভিজ্ঞ সহকারীরা রোগীর রক্তচাপ (BP), পালস রেট, দেহের ওজন এবং প্রয়োজনে তাৎক্ষণিক গ্লুকোজ বা সুগার (RBS) পরীক্ষা সম্পন্ন করেন।"
    }
  },
  {
    id: 'faq-14',
    category: 'consultation',
    q: {
      en: "Am I required to do diagnostic tests only at Popular Medical Center?",
      bn: "প্রেসক্রিপশনে দেওয়া টেস্ট কি পপুলার ডায়াগনস্টিক থেকেই করাতে হবে?"
    },
    a: {
      en: "No, you are welcome to conduct tests at any accredited, standard diagnostic center or hospital of your convenience. Reliable and accurate lab results are what matter most for correct clinical assessment.",
      bn: "না, রোগী তাঁর সুবিধামতো যেকোনো মানসম্মত ও বিশ্বস্ত ডায়াগনস্টিক ল্যাব থেকে পরীক্ষা-নিরীক্ষা করাতে পারেন। সঠিক রোগ নির্ণয়ের জন্য টেস্টের রিপোর্টের নির্ভুলতাই মূল বিবেচ্য বিষয়।"
    }
  },
  {
    id: 'faq-15',
    category: 'emergency',
    q: {
      en: "What should I do in a severe, life-threatening emergency?",
      bn: "হঠাৎ মারাত্মক জরুরি অসুস্থতায় কী পদক্ষেপ নেওয়া উচিত?"
    },
    a: {
      en: "The private chamber is intended for outpatient clinical consultation. In acute life-threatening situations (e.g., sudden severe chest pain, loss of consciousness, stroke symptoms, severe breathing distress), take the patient immediately to the 24/7 Emergency Department of Sylhet MAG Osmani Medical College Hospital or the nearest emergency hospital.",
      bn: "প্রাইভেট চেম্বার মূলত নিয়মিত ও পরিকল্পিত পরামর্শ সেবার জন্য। হঠাৎ তীব্র বুকব্যথা, জ্ঞান হারানো, স্ট্রোকের লক্ষণ, তীব্র শ্বাসকষ্ট বা রোগীর আশঙ্কাজনক পরিস্থিতিতে কোনো বিলম্ব না করে তাৎক্ষণিকভাবে সিলেট এম.এ.জি. ওসমানী মেডিকেল কলেজ হাসপাতালের জরুরি বিভাগ (Emergency Dept) অথবা নিকটস্থ জরুরি হাসপাতালে নিয়ে যাওয়ার অনুরোধ করা হচ্ছে।"
    }
  },
  {
    id: 'faq-16',
    category: 'emergency',
    q: {
      en: "Is online or WhatsApp consultation support available for distant patients?",
      bn: "অনলাইন বা দূরবর্তী রোগীদের জন্য টেলিমেডিসিনের ব্যবস্থা আছে কি?"
    },
    a: {
      en: "In-person consultation is always best for accurate physical examination. However, for follow-up guidance or patients residing far away or overseas, please message our official WhatsApp (+8801346132486) to inquire about online advisory availability.",
      bn: "চেম্বারে সরাসরি সাক্ষাতই সঠিক শারীরিক পরীক্ষার প্রধান মাধ্যম। তবে প্রবাসী বা দূরবর্তী রোগীদের ফলো-আপ পরামর্শ ও জরুরি নির্দেশনার জন্য আমাদের অফিশিয়াল হোয়াটসঅ্যাপ (+8801346132486)-এ যোগাযোগ করে বিশেষ স্লট সম্পর্কে জেনে নেওয়া যাবে।"
    }
  },
  {
    id: 'faq-17',
    category: 'emergency',
    q: {
      en: "What if I lose my prescription slip or need dose clarification?",
      bn: "প্রেসক্রিপশন হারিয়ে গেলে বা ওষুধের ডোজ নিয়ে বিভ্রান্তি তৈরি হলে কী করবেন?"
    },
    a: {
      en: "Send a message containing the patient's full name, registered phone number, and approximate appointment date to our WhatsApp (+8801346132486). Our chamber support team will assist with doctor record verification.",
      bn: "রোগীর পূর্ণ নাম, ফোন নম্বর এবং রোগী দেখানোর আনুমানিক তারিখ উল্লেখ করে আমাদের হোয়াটসঅ্যাপ নাম্বারে (+8801346132486) মেসেজ দিন। আমাদের চেম্বার সাপোর্ট টিম দ্রুত আপনাকে চিকিৎসকের সাথে সমন্বয় করে সহায়তা প্রদান করবে।"
    }
  },
  {
    id: 'faq-18',
    category: 'advice',
    q: {
      en: "Do I need to fast (empty stomach) before my first doctor visit?",
      bn: "প্রথমবার ডাক্তার দেখানোর আগে কি না খেয়ে (খালি পেটে) আসতে হবে?"
    },
    a: {
      en: "No fasting is necessary for the initial consultation. If fasting blood tests (e.g. Fasting Sugar or Lipid Profile) are required, the doctor will guide you with instructions. Patients should always take their routine blood pressure medications on time.",
      bn: "ডাক্তার দেখানোর জন্য খালি পেটে আসার কোনো প্রয়োজন নেই। তবে যদি খালি পেটের টেস্ট (যেমন Fasting Blood Sugar বা Lipid Profile) প্রয়োজন হয়, তবে চিকিৎসক সাক্ষাৎ শেষে স্পষ্ট নিয়ম জানিয়ে দেবেন। আপনার নিয়মিত প্রেসারের ওষুধ সময়মতো খেয়ে আসাই নিরাপদ।"
    }
  },
  {
    id: 'faq-19',
    category: 'advice',
    q: {
      en: "When should I consult an internal medicine specialist for persistent fever or pain?",
      bn: "জ্বর বা শরীরের ব্যথা কতদিন থাকলে মেডিসিন বিশেষজ্ঞ দেখানো উচিত?"
    },
    a: {
      en: "If a fever persists beyond 3 to 4 days, exceeds 102°F, does not respond to paracetamol, or is accompanied by chills, rash, vomiting, or joint swelling, consult a medicine specialist promptly rather than taking self-prescribed antibiotics.",
      bn: "জ্বর যদি ৩-৪ দিনের বেশি স্থায়ী হয়, ১০২ ডিগ্রির উপরে উঠে, সাধারণ প্যারাসিটামলে না কমে অথবা শরীরে তীব্র কাঁপুনি, র্যাশ ও বমি ভাব থাকে, তবে নিজে নিজে কোনো অ্যান্টিবায়োটিক না খেয়ে দ্রুত মেডিসিন বিশেষজ্ঞ চিকিৎসকের শরণাপন্ন হওয়া উচিত।"
    }
  },
  {
    id: 'faq-20',
    category: 'advice',
    q: {
      en: "Why is self-medication with antibiotics without a prescription dangerous?",
      bn: "চিকিৎসকের পরামর্শ ছাড়া ফার্মেসি থেকে অ্যান্টিবায়োটিক খাওয়া কেন মারাত্মক ক্ষতিকর?"
    },
    a: {
      en: "Taking antibiotics haphazardly causes Antibiotic Resistance, making infections untreatable in the future. Moreover, viral fevers (like viral flu or dengue) do not respond to antibiotics and taking them puts undue strain on the liver and kidneys. Always complete full courses only when prescribed by a registered physician.",
      bn: "চিকিৎসকের প্রেসক্রিপশন ছাড়া অ্যান্টিবায়োটিক সেবন করলে ব্যাক্টেরিয়া প্রতিরোধী হয়ে ওঠে (Antibiotic Resistance), যার ফলে পরবর্তীতে জীবনঘাতী ইনফেকশনেও কোনো অ্যান্টিবায়োটিক আর কাজ করে না। এছাড়া সাধারণ ভাইরাস জ্বর বা ডেঙ্গুতে অ্যান্টিবায়োটিক কোনো কাজে আসে না, বরং কিডনি ও লিভারের ক্ষতি করে। তাই রেজিস্টার্ড চিকিৎসকের পরামর্শ ছাড়া কখনো অ্যান্টিবায়োটিক খাবেন না।"
    }
  }
];
