export interface Disease {
  slug: string;
  title: { en: string; bn: string };
  shortDesc: { en: string; bn: string };
  fullDesc: { en: string; bn: string };
  symptoms: { en: string[]; bn: string[] };
  treatments: { en: string[]; bn: string[] };
}

export const diseaseData: Disease[] = [
  {
    slug: 'diabetes',
    title: { en: 'Diabetes (DM)', bn: 'ডায়াবেটিস (Diabetes - DM)' },
    shortDesc: {
      en: 'Comprehensive blood sugar control, insulin optimization, and prevention of kidney, eye, and nerve complications.',
      bn: 'রক্তে সুগার নিয়ন্ত্রণ, ইনসুলিন ও ওষুধের সঠিক মাত্রা এবং কিডনি, চোখ ও স্নায়ুর জটিলতা প্রতিরোধের আধুনিক চিকিৎসা।',
    },
    fullDesc: {
      en: `Diabetes Mellitus (DM) is a chronic metabolic condition where your body either cannot produce enough insulin or cannot effectively use the insulin it produces. When insulin is inadequate, glucose builds up in your bloodstream instead of fueling your cells.

If blood sugar remains uncontrolled over months or years, it silently damages vital organs including your heart, blood vessels, kidneys, eyes, and peripheral nerves. There are two primary adult types: Type 1 Diabetes (where the pancreas produces little to no insulin) and Type 2 Diabetes (the most common form, where insulin resistance develops due to genetics, lifestyle, and visceral fat).

Dr. Hanif Ahmed Towhid specializes in comprehensive diabetes assessment. His clinical approach focuses not merely on prescribing medication, but on formulating an individualized glycemic management plan tailored to your daily schedule, dietary preferences, and physical activity. He guides patients on HbA1c target goals (typically below 6.5% - 7.0%), rational oral hypoglycemic drug combinations, precise insulin injection protocols, diabetic foot care, and regular screening for microvascular and macrovascular complications to ensure a long, healthy, and complication-free life.`,
      bn: `ডায়াবেটিস (Diabetes Mellitus) রক্তে শর্করা বা গ্লুকোজের মাত্রা স্বাভাবিকের চেয়ে বেড়ে যাওয়ার একটি দীর্ঘমেয়াদী রোগ। আমরা যখন খাবার খাই, শরীর তা ভেঙে গ্লুকোজে পরিণত করে যা কোষে শক্তি জোগায়। অগ্ন্যাশয় থেকে তৈরি ইনসুলিন হরমোন এই গ্লুকোজকে কোষে প্রবেশ করতে সাহায্য করে। শরীরে পর্যাপ্ত ইনসুলিন তৈরি না হলে বা ইনসুলিন সঠিকভাবে কাজ না করলে রক্তে সুগারের মাত্রা বেড়ে যায়।

ডায়াবেটিসকে প্রায়শই একটি 'নীরব ঘাতক' বলা হয় কারণ রক্তে সুগার বেড়ে গেলেও শুরুতে অনেক সময় কোনো বড় কষ্ট অনুভূত হয় না। কিন্তু অনিয়ন্ত্রিত সুগার ধীরে ধীরে কিডনি বিকল হওয়া, চোখের দৃষ্টিশক্তি নষ্ট হওয়া (রেটিনোপ্যাথি), হার্ট অ্যাটাক, ব্রেন স্ট্রোক এবং পায়ের স্নায়ু অবশ হয়ে যাওয়ার মতো মারাত্মক জটিলতা সৃষ্টি করতে পারে।

ডা. হানিফ আহমেদ তৌহিদ রোগীদের ব্যক্তিগত জীবনযাত্রা ও কাজের ধরন বিবেচনা করে ডায়াবেটিসের বৈজ্ঞানিক ও নিরাপদ চিকিৎসা প্রদান করেন। তিনি ওষুধের সঠিক মাত্রা নির্ধারণ, ইনসুলিন গ্রহণের সঠিক নিয়ম শেখানো, তিন মাসের গড় সুগার (HbA1c) নিরাপদ মাত্রায় রাখা এবং খাদ্যতালিকা নিয়ন্ত্রণের মাধ্যমে জটিলতামুক্ত সুস্থ জীবনযাপন নিশ্চিত করতে দিকনির্দেশনা প্রদান করেন।`,
    },
    symptoms: {
      en: ['Frequent urination, especially at night', 'Excessive thirst and dry mouth', 'Unexplained weight loss despite normal appetite', 'Persistent tiredness and blurred vision', 'Slow-healing cuts or skin infections'],
      bn: ['ঘন ঘন প্রস্রাবের বেগ হওয়া (বিশেষ করে রাতে)', 'তীব্র তৃষ্ণা লাগা ও গলা শুকিয়ে আসা', 'পর্যাপ্ত খাওয়া সত্ত্বেও অকারণে ওজন কমে যাওয়া', 'সবসময় অতিরিক্ত দুর্বলতা ও চোখে ঝাপসা দেখা', 'শরীরের কোথাও কেটে গেলে বা ঘা সহজে না শুকানো'],
    },
    treatments: {
      en: ['Customized oral hypoglycemic medications (Metformin, SGLT-2 inhibitors, DPP-4 inhibitors)', 'Insulin regimen planning and titration counseling', 'Regular HbA1c, fasting, and post-prandial blood glucose audits', 'Kidney function (Serum Creatinine, Urine ACR) and lipid monitoring', 'Structured diabetic diet and daily physical activity guidance'],
      bn: ['শারীরিক অবস্থা অনুযায়ী নিরাপদ মুখে খাওয়ার ডায়াবেটিসের ওষুধ নির্ধারণ', 'প্রয়োজনে ইনসুলিনের সঠিক ডোজ ও ইনজেকশন নেওয়ার টেকনিক শেখানো', 'নিয়মিত HbA1c ও সুগার মনিটরিংয়ের সুনির্দিষ্ট গাইডলাইন', 'কিডনির সুরক্ষা ও রক্তে চর্বির মাত্রা নিয়মিত পরীক্ষা', 'ভাত, রুটি ও মিষ্টি নিয়ন্ত্রণের সঠিক ডায়েট চার্ট'],
    },
  },
  {
    slug: 'hypertension',
    title: { en: 'Hypertension (HTN)', bn: 'উচ্চ রক্তচাপ / হাইপারটেনশন (HTN)' },
    shortDesc: {
      en: 'Silent killer prevention, cardiovascular risk profiling, and personalized blood pressure management.',
      bn: 'নীরব ঘাতক উচ্চ রক্তচাপ নিয়ন্ত্রণ, হার্ট অ্যাটাক ও স্ট্রোকের ঝুঁকি হ্রাস এবং রক্তনালীর দীর্ঘমেয়াদী সুরক্ষা।',
    },
    fullDesc: {
      en: `Hypertension, commonly known as high blood pressure, occurs when the force of blood pushing against the walls of your blood vessels is consistently too high (typically 140/90 mmHg or higher). Because high blood pressure rarely presents obvious physical warning signs in its initial stages, millions of adults live with it completely unaware.

Persistent arterial pressure forces your heart muscle to work significantly harder to circulate blood. Over time, this constant mechanical strain weakens blood vessels, leading to arterial hardening (atherosclerosis), acute myocardial infarction (heart attack), brain hemorrhage or ischemic stroke, and hypertensive kidney nephropathy.

Dr. Hanif provides systematic blood pressure evaluation, identifying primary vs. secondary causes. His treatment strategy emphasizes achieving consistent systolic control under 130 mmHg and diastolic under 80 mmHg using evidence-based antihypertensive agents (such as ARBs, ACE inhibitors, Calcium Channel Blockers, and modern diuretics) along with practical sodium reduction protocols and cardiovascular risk stratification.`,
      bn: `উচ্চ রক্তচাপ বা হাইপারটেনশন (Hypertension) হলো এমন একটি অবস্থা যেখানে রক্তনালীর ভেতর দিয়ে রক্ত চলাচলের সময় রক্তনালীর দেয়ালে স্বাভাবিকের চেয়ে বেশি চাপ সৃষ্টি হয়। চিকিৎসাবিজ্ঞানে সাধারণত রক্তচাপ ১৪০/৯০ মিলিমিটার মার্কারি বা তার বেশি হলে তাকে উচ্চ রক্তচাপ বলা হয়।

উচ্চ রক্তচাপের সবচেয়ে বিপজ্জনক দিক হলো, অধিকাংশ মানুষের ক্ষেত্রে এর কোনো প্রাথমিক লক্ষণ থাকে না। অনেকেই মনে করেন মাথা ব্যথা বা ঘাড় না ঘুরলেই প্রেশার স্বাভাবিক আছে, যা একটি মারাত্মক ভুল ধারণা। অনিয়ন্ত্রিত উচ্চ রক্তচাপের ফলে হঠাৎ ব্রেন স্ট্রোক হয়ে শরীরের একপাশ প্যারালাইসিস হতে পারে, হার্ট অ্যাটাক হতে পারে এবং কিডনি সম্পূর্ণ নষ্ট হয়ে যেতে পারে।

ডা. হানিফ আহমেদ তৌহিদ প্রতিটি রোগীর সার্বিক স্বাস্থ্য পরীক্ষা করে উপযুক্ত ওষুধ নির্বাচন করেন। নিয়মিত ওষুধ সেবন, খাবারে কাঁচা লবণের ব্যবহার পুরোপুরি বর্জন করা, ওজন নিয়ন্ত্রণে রাখা এবং রক্তচাপ নিরাপদ মাত্রায় (১৩০/৮০ এর নিচে) রাখার মাধ্যমে দীর্ঘমেয়াদী সুস্থতা নিশ্চিত করেন।`,
    },
    symptoms: {
      en: ['Occasional morning occipital headache', 'Dizziness or lightheaded sensation', 'Chest tightness or rapid heartbeat during exertion', 'Shortness of breath and nasal bleeding in severe spikes', 'Blurred vision or facial flushing'],
      bn: ['সকালে ঘুম থেকে ওঠার পর মাথার পেছনের অংশে বা ঘাড়ে ভারী ভাব', 'মাথা ঘোরা, বুক ধড়ফড় করা বা অস্থির লাগা', 'হাঁটাহাঁটি বা পরিশ্রমে বুকে চাপ অনুভব করা', 'প্রেশার খুব বেড়ে গেলে নাক দিয়ে রক্ত পড়া বা চোখে ঝাপসা দেখা', 'অতিরিক্ত মানসিক চাপ ও মেজাজ খিটখিটে হওয়া'],
    },
    treatments: {
      en: ['Targeted antihypertensive drug therapy tailored to age and kidney profile', '24-hour home and ambulatory blood pressure monitoring guidance', 'Kidney, heart ECG, and echocardiogram baseline screenings', 'Strict dietary sodium restriction (<2g/day) counseling', 'Weight management and stress reduction techniques'],
      bn: ['রোগীর বয়স ও কিডনির অবস্থা অনুযায়ী মানানসই প্রেশারের ওষুধ প্রদান', 'বাড়িতে নিয়মিত রক্তচাপ মেপে ডায়েরিতে রেকর্ড রাখার নির্দেশনা', 'হার্টের ইসিজি, ইকো এবং কিডনির কার্যক্ষমতা পরীক্ষা', 'খাবারে বাড়তি কাঁচা লবণ ও অতিরিক্ত তেল-চর্বি বর্জনের পরামর্শ', 'প্রতিদিন অন্তত ৩০ মিনিট হাঁটা ও মানসিক চাপ কমানোর পরামর্শ'],
    },
  },
  {
    slug: 'enteric-fever',
    title: { en: 'Enteric Fever (Typhoid)', bn: 'এন্টেরিক ফিভার / টাইফয়েড (Enteric Fever)' },
    shortDesc: {
      en: 'Accurate diagnosis and targeted antibiotic therapy for Salmonella typhoid and paratyphoid infections.',
      bn: 'সালমোনেলা টাইফি ব্যাকটেরিয়া দ্বারা সৃষ্ট তীব্র ও দীর্ঘস্থায়ী জ্বর, পেটে ব্যথা এবং সঠিক অ্যান্টিবায়োটিক চিকিৎসা।',
    },
    fullDesc: {
      en: `Enteric Fever, encompassing Typhoid and Paratyphoid fever, is a severe systemic bacterial infection caused by Salmonella enterica serotypes Typhi and Paratyphi. In developing regions and urban communities, it spreads primarily through contaminated drinking water, unhygienic street food, raw salads, and poor hand hygiene.

Once ingested, the bacteria multiply in the bloodstream and localize in the intestinal lymphoid tissue (Peyer's patches), liver, spleen, and gallbladder. Without prompt and appropriate medical intervention, enteric fever can progress to life-threatening complications, including intestinal ulceration, bowel perforation, severe gastrointestinal bleeding, and multi-organ sepsis.

Dr. Hanif emphasizes precise microbiological and blood diagnosis (such as early blood cultures and specific serology) over arbitrary empirical prescriptions. He designs culture-guided antibiotic courses that ensure complete eradication of the bacteria, preventing antibiotic resistance, dangerous relapses, and the chronic biliary carrier state.`,
      bn: `এন্টেরিক ফিভার (Enteric Fever), যা আমাদের দেশে সাধারণত টাইফয়েড ও প্যারাটাইফয়েড জ্বর নামে পরিচিত, একটি ব্যাকটেরিয়াজনিত মারাত্মক সংক্রামক ব্যাধি। এটি মূলত 'সালমোনেলা টাইফি' নামক ব্যাকটেরিয়ার সংক্রমণে হয় এবং দূষিত পানি, অস্বাস্থ্যকর খাবার, বাসি খাবার ও অপরিষ্কার হাতের মাধ্যমে মানবদেহে ছড়ায়।

টাইফয়েডের জ্বর সাধারণত ধাপে ধাপে বাড়ে (Step-ladder pattern) এবং অনেকদিন স্থায়ী হয়। সঠিক সময়ে উপযুক্ত চিকিৎসা না করালে এই ব্যাকটেরিয়া অন্ত্র বা নাড়িতে ঘা (আলসার) তৈরি করতে পারে এবং মারাত্মক ক্ষেত্রে নাড়ি ফুটো হয়ে রক্তক্ষরণ হতে পারে।

ডা. হানিফ আহমেদ তৌহিদ সঠিক রক্ত পরীক্ষা ও ক্লিনিক্যাল মূল্যায়নের মাধ্যমে টাইফয়েড শনাক্ত করেন। তিনি পর্যাপ্ত মেয়াদের উপযুক্ত অ্যান্টিবায়োটিক প্রয়োগ করে রোগীকে দ্রুত সুস্থ করে তোলেন এবং যত্রতত্র ভুল অ্যান্টিবায়োটিক ব্যবহারের ফলে তৈরি হওয়া ড্রাগ রেজিস্ট্যান্স প্রতিরোধে কাজ করেন।`,
    },
    symptoms: {
      en: ['Continuous high-grade fever stepping up daily', 'Severe frontal headache and generalized body aches', 'Abdominal pain, bloating, constipation (early) or diarrhea (late)', 'Coated tongue, loss of appetite, and extreme weakness', 'Rose spots on trunk and enlarged spleen in complicated stages'],
      bn: ['দিনের পর দিন জ্বর বাড়তে থাকা এবং সহজে না কমা', 'মাথার সামনের অংশে তীব্র ব্যথা ও সারা শরীরে প্রচণ্ড অস্বস্তি', 'পেট ব্যথা, পেট ফাঁপা বা বদহজম ও পাতলা পায়খানা', 'জিহ্বায় সাদা আস্তরণ পড়া এবং মুখে চরম অরুচি', 'তীব্র ক্লান্তি এবং জটিল ক্ষেত্রে পেট ফুলে যাওয়া'],
    },
    treatments: {
      en: ['Culture-sensitive targeted antibiotic therapy for full recommended duration', 'Adequate fluid hydration and electrolyte replenishment', 'Antipyretic fever control and liver function monitoring', 'Soft, easily digestible high-calorie nutrition counseling', 'Safe water sanitation and Typhoid vaccination advice'],
      bn: ['রক্ত পরীক্ষার ভিত্তিতে সঠিক অ্যান্টিবায়োটিকের সম্পূর্ণ কোর্স সম্পন্ন করা', 'প্রচুর পরিমাণে ফোটানো পানি, ওরস্যালাইন ও পুষ্টিকর তরল খাবার গ্রহণ', 'জ্বর নিয়ন্ত্রণের নিরাপদ ওষুধ ও বিশ্রাম', 'হালকা, সহজপাচ্য জাউ ভাত, স্যুপ ও নরম খাবার খাওয়া', 'ভবিষ্যত প্রতিরোধে পরিষ্কার-পরিচ্ছন্নতা ও টাইফয়েড টিকার পরামর্শ'],
    },
  },
  {
    slug: 'uti',
    title: { en: 'Urinary Tract Infection (UTI)', bn: 'ইউরিনারি ট্র্যাক্ট ইনফেকশন / ইউটিআই (UTI)' },
    shortDesc: {
      en: 'Diagnosis and evidence-based treatment of burning sensation, painful urination, and recurrent bladder infections.',
      bn: 'প্রস্রাবে জ্বালাপোড়া, ঘন ঘন বেগ হওয়া, তলপেটে ব্যথা এবং বারবার মূত্রনালীর ইনফেকশন প্রতিরোধের আধুনিক চিকিৎসা।',
    },
    fullDesc: {
      en: `Urinary Tract Infection (UTI) occurs when uropathogenic bacteria (most commonly Escherichia coli) enter the urinary tract through the urethra and multiply in the urinary bladder (cystitis) or ascend into the kidneys (pyelonephritis). UTIs are particularly prevalent among women due to anatomical factors, as well as individuals with uncontrolled diabetes, urinary catheterization, or enlarged prostate.

If left untreated or improperly managed with incomplete antibiotic courses, lower urinary tract infections can ascend into the renal pelvis, resulting in severe kidney infection (pyelonephritis), kidney scarring, and life-threatening urosepsis.

Dr. Hanif provides comprehensive diagnostic evaluations including urine routine microscopy (R/M/E) and urine culture & sensitivity (C/S). He prescribes focused, kidney-safe antimicrobial regimens, investigates underlying causes such as urinary gravel, stones, or diabetic immunosuppression, and formulates recurrence prevention protocols.`,
      bn: `ইউরিনারি ট্র্যাক্ট ইনফেকশন বা ইউটিআই (UTI) হলো মূত্রনালী, মূত্রথলি বা কিডনিতে ব্যাকটেরিয়াজনিত ইনফেকশন। এটি একটি অত্যন্ত সাধারণ কিন্তু মারাত্মক অস্বস্তিকর সমস্যা। বিশেষ করে নারীদের এবং ডায়াবেটিসে আক্রান্ত রোগীদের এই রোগে আক্রান্ত হওয়ার ঝুঁকি অনেক বেশি থাকে।

মূত্রনালীর ইনফেকশন অবহেলা করলে বা সঠিক চিকিৎসা না নিলে জীবাণু ওপরের দিকে উঠে কিডনিতে ছড়িয়ে পড়তে পারে (যাকে পাইলোনেফ্রাইটিস বলা হয়)। এর ফলে কিডনির স্থায়ী ক্ষতি হতে পারে এবং রক্তে বিষক্রিয়া (Urosepsis) তৈরি হতে পারে।

ডা. হানিফ আহমেদ তৌহিদ প্রস্রাবের মাইক্রোস্কোপিক ও কালচার পরীক্ষার মাধ্যমে সঠিক জীবাণু ও উপযুক্ত ওষুধ চিহ্নিত করেন। তিনি কিডনির সুরক্ষা নিশ্চিত করে পূর্ণ মেয়াদের চিকিৎসা দেন এবং পর্যাপ্ত পানি পানের নিয়ম ও ব্যক্তিগত স্বাস্থ্যবিধির পরামর্শ প্রদান করেন।`,
    },
    symptoms: {
      en: ['Burning sensation or sharp pain during urination (dysuria)', 'Urgent, frequent need to urinate with minimal urine output', 'Cloudy, dark, foul-smelling, or blood-tinged urine', 'Lower abdominal, pelvic, or flank pain', 'Fever with chills if infection reaches kidneys'],
      bn: ['প্রস্রাবের সময় তীব্র জ্বালাপোড়া বা সুই ফোটার মতো ব্যথা হওয়া', 'ঘন ঘন প্রস্রাবের বেগ কিন্তু সামান্য পরিমাণে প্রস্রাব হওয়া', 'প্রস্রাবের রঙ ঘোলাটে, দুর্গন্ধযুক্ত বা লালচে হওয়া', 'তলপেটে সার্বক্ষণিক অস্বস্তি বা ভারী ভারী লাগা', 'কিডনিতে ছড়ালে কাঁপুনি দিয়ে তীব্র জ্বর ও কোমরের একপাশে ব্যথা'],
    },
    treatments: {
      en: ['Urine Culture & Sensitivity guided antibiotic therapy', 'Urinary alkalizer and bladder antispasmodic support', 'Hydration optimization (2.5 - 3 liters daily water intake)', 'Investigation for urinary tract stones, strictures, or enlarged prostate', 'Personal hygiene and post-coital preventive hygiene counseling'],
      bn: ['প্রস্রাব পরীক্ষার রিপোর্ট দেখে সঠিক অ্যান্টিবায়োটিকের কোর্স সম্পন্ন করা', 'প্রস্রাবের জ্বালাপোড়া ও তলপেটের ব্যথা কমানোর ওষুধ', 'প্রতিদিন আড়াই থেকে তিন লিটার নিরাপদ পানি পানের নির্দেশনা', 'প্রস্রাবে পাথর বা ডায়াবেটিস আছে কিনা তা খতিয়ে দেখা', 'ব্যক্তিগত পরিষ্কার-পরিচ্ছন্নতা ও প্রস্রাব আটকে না রাখার পরামর্শ'],
    },
  },
  {
    slug: 'dyslipidemia',
    title: { en: 'Dyslipidemia (High Cholesterol)', bn: 'ডিসলিপিডেমিয়া (Dyslipidemia / রক্তে চর্বি বৃদ্ধি)' },
    shortDesc: {
      en: 'Managing high triglycerides, LDL cholesterol, and lipid abnormalities to prevent heart attacks and blocked arteries.',
      bn: 'রক্তে ক্ষতিকর চর্বি (LDL, ট্রাইগ্লিসারাইড) কমানো এবং রক্তনালী ব্লক হওয়া ও হার্ট অ্যাটাক প্রতিরোধের চিকিৎসা।',
    },
    fullDesc: {
      en: `Dyslipidemia refers to an unhealthy imbalance of lipids (fats) in the bloodstream, characterized by elevated levels of Low-Density Lipoprotein (LDL "bad" cholesterol) and Triglycerides (TG), and low levels of High-Density Lipoprotein (HDL "good" cholesterol).

When excess LDL and triglyceride particles circulate in the blood, they gradually penetrate and deposit into the inner lining of arterial walls. Over time, these fatty deposits form hard, calcified plaques (atherosclerosis), narrowing coronary, cerebral, and peripheral arteries. This drastically elevates the risk of acute heart attacks, angina, and ischemic strokes.

Dr. Hanif conducts detailed fasting lipid profile audits, evaluating 10-year atherosclerotic cardiovascular disease (ASCVD) risk scores. He prescribes modern, well-tolerated lipid-lowering therapies (such as Statins and Ezetimibe) combined with personalized nutritional blueprints to eliminate trans fats and achieve target lipid metrics.`,
      bn: `ডিসলিপিডেমিয়া (Dyslipidemia) হলো রক্তে চর্বি বা কোলেস্টেরলের অস্বাভাবিক বৃদ্ধি। আমাদের রক্তে মূলত চার ধরনের চর্বি থাকে—টোটাল কোলেস্টেরল, ক্ষতিকর কোলেস্টেরল (LDL), উপকারী কোলেস্টেরল (HDL) এবং ট্রাইগ্লিসারাইড (TG)। খাবারে অতিরিক্ত তেল-চর্বি, মিষ্টি, শারীরিক নিষ্ক্রিয়তা ও বংশগত কারণে রক্তে ক্ষতিকর চর্বির মাত্রা বেড়ে যায়।

রক্তে অতিরিক্ত চর্বি থাকলে তা ধীরে ধীরে হার্ট ও ব্রেনের রক্তনালীর ভেতরের দেয়ালে জমে চর্বির স্তর (Plaque) তৈরি করে। এর ফলে রক্তনালী সরু ও শক্ত হয়ে যায়, যাকে চিকিৎসাবিজ্ঞানে 'অ্যাথেরোস্ক্লেরোসিস' বলে। একপর্যায়ে রক্ত চলাচল বন্ধ হয়ে হঠাৎ মারাত্মক হার্ট অ্যাটাক বা ব্রেন স্ট্রোক হতে পারে।

ডা. হানিফ আহমেদ তৌহিদ ফাস্টিং লিপিড প্রোফাইল পরীক্ষার মাধ্যমে প্রতিটি রোগীর ঝুঁকি নির্ধারণ করেন এবং স্ট্যাটিন জাতীয় নিরাপদ ওষুধের মাধ্যমে রক্তে চর্বি কমিয়ে রক্তনালীকে সুরক্ষিত রাখেন।`,
    },
    symptoms: {
      en: ['Usually silent with no early symptoms until arterial narrowing occurs', 'Exertional chest tightness, breathlessness, or early fatigue', 'Yellowish fatty deposits around eyelids (Xanthelasma) in severe cases', 'Numbness or tingling in extremities from reduced circulation'],
      bn: ['প্রাথমিক অবস্থায় কোনো দৃশ্যমান লক্ষণ থাকে না (রক্ত পরীক্ষা ছাড়া বোঝা যায় না)', 'একটু হাঁটলে বা পরিশ্রম করলে বুকে চাপ অনুভব বা হাঁপিয়ে ওঠা', 'চোখের পাতার চারপাশে হলুদাভ চর্বির দানা (জ্যান্থেলাজমা) জমা', 'হাত ও পায়ে রক্ত চলাচল কমে ঝিঁঝি ধরা বা অবশ ভাব'],
    },
    treatments: {
      en: ['Evidence-based Statin therapy (Atorvastatin, Rosuvastatin) and lipid modulators', 'Regular Fasting Lipid Profile and liver enzyme monitoring', 'Elimination of trans-fats, red meat excess, and deep-fried fast foods', 'High-soluble fiber nutrition (oats, vegetables, lentils) counseling', 'Daily 45-minute aerobic exercise and weight optimization'],
      bn: ['রক্তের চর্বি কমাতে উপযুক্ত ও নিরাপদ ওষুধের (Statin) প্রয়োগ', 'নিয়মিত ফাস্টিং লিপিড প্রোফাইল পরীক্ষা করে ওষুধের মাত্রা সমন্বয়', 'ডালডা, ভাজাপোড়া খাবার, লাল মাংস ও অতিরিক্ত মিষ্টি পুরোপুরি বর্জন', 'শাকসবজি, ফলমূল, ইসুবগুল ও ওটস সমৃদ্ধ স্বাস্থ্যকর ডায়েট', 'প্রতিদিন নিয়মিত দ্রুত হাঁটা ও শারীরিক ওজন কমানোর পরিকল্পনা'],
    },
  },
  {
    slug: 'fatty-liver',
    title: { en: 'Fatty Liver Disease', bn: 'ফ্যাটি লিভার ডিজিজ (Fatty Liver Disease)' },
    shortDesc: {
      en: 'Diagnosis of Grade 1-3 liver fat accumulation, liver enzyme management, and metabolic health restoration.',
      bn: 'লিভারে অতিরিক্ত চর্বি জমা, লিভার এনজাইম (SGPT/ALT) বৃদ্ধি রোধ এবং সিরোসিস প্রতিরোধে সুনির্দিষ্ট চিকিৎসা ও ডায়েট।',
    },
    fullDesc: {
      en: `Non-Alcoholic Fatty Liver Disease (NAFLD), now termed MASLD (Metabolic Dysfunction-Associated Steatotic Liver Disease), is a condition where excess fat accumulates within hepatocytes (liver cells) in individuals who consume little or no alcohol. It is strongly linked to insulin resistance, obesity, type-2 diabetes, and high triglyceride levels.

Fatty liver is categorized into progressive stages: Simple Steatosis (Grade 1-2 fat buildup), Non-Alcoholic Steatohepatitis or NASH (where fat causes active inflammation and cell damage), Fibrosis (progressive scarring), and ultimately irreversible Liver Cirrhosis and liver failure.

Dr. Hanif utilizes high-resolution ultrasonography and comprehensive liver enzyme profiles (SGPT/ALT, SGOT/AST, Bilirubin, Albumin) to stage the disease. His therapeutic management focuses on weight reduction protocols, insulin sensitization, antioxidant hepatoprotective support, and structured dietary remodeling to reverse early-stage hepatic fat.`,
      bn: `ফ্যাটি লিভার ডিজিজ (Fatty Liver Disease) হলো লিভার বা যকৃতের কোষে অতিরিক্ত চর্বি জমা হওয়া। সাধারণ মানুষের ধারণা শুধু অ্যালকোহল খেলেই লিভার নষ্ট হয়, কিন্তু বর্তমানে অতিরিক্ত তেল-চর্বিযুক্ত খাবার, চিনিযুক্ত কোমল পানীয়, অনিয়ন্ত্রিত ডায়াবেটিস এবং কায়িক পরিশ্রম না করার কারণে নন-অ্যালকোহলিক ফ্যাটি লিভার ঘরে ঘরে দেখা দিচ্ছে।

শুরুতে লিভারে চর্বি জমা (গ্রেড-১ ও ২) থাকে, যাকে অবহেলা করলে লিভারে প্রদাহ ও ক্ষত তৈরি হয় (যাকে NASH বলে)। দীর্ঘদিন চিকিৎসা না নিলে লিভার শক্ত হয়ে স্থায়ীভাবে বিকল (লিভার সিরোসিস) হতে পারে।

ডা. হানিফ আহমেদ তৌহিদ আল্ট্রাসনোগ্রাম ও লিভারের রক্তের পরীক্ষা (SGPT/ALT) মূল্যায়নের মাধ্যমে ফ্যাটি লিভারের মাত্রা নির্ধারণ করেন এবং সঠিক খাদ্যতালিকা, জীবনযাত্রার পরিবর্তন ও প্রয়োজনীয় ওষুধের মাধ্যমে লিভারের চর্বি দূর করতে কার্যকর চিকিৎসা দেন।`,
    },
    symptoms: {
      en: ['Persistent dull ache or fullness in upper right abdomen', 'Chronic generalized fatigue and mental sluggishness', 'Elevated SGPT/ALT liver enzymes on routine blood tests', 'Enlarged liver (hepatomegaly) palpable during clinical examination'],
      bn: ['পেটের ওপরের ডানপাশে (বুকের পাঁজরের নিচে) ভারী ভারী লাগা বা মৃদু ব্যথা', 'সবসময় ক্লান্ত ও অবসন্ন বোধ হওয়া', 'রক্ত পরীক্ষায় লিভার এনজাইম (SGPT/ALT) স্বাভাবিকের চেয়ে বেশি আসা', 'খাওয়ার পর পেট ফাঁপা ও বদহজমের অনুভূতি'],
    },
    treatments: {
      en: ['Targeted weight reduction (7-10% of body weight loss reverses hepatic fat)', 'Insulin resistance management and blood glucose normalization', 'Lipid-lowering therapy and liver-protective antioxidants', 'Strict elimination of refined sugar, high-fructose corn syrup, and junk food', 'Routine liver ultrasonography and non-invasive fibrosis monitoring'],
      bn: ['বিজ্ঞানসম্মতভাবে শরীরের ওজন ৭-১০% কমানো (যা লিভারের চর্বি দ্রুত কমায়)', 'রক্তের সুগার ও চর্বি কঠোর নিয়ন্ত্রণে রাখা', 'চিনিযুক্ত মিষ্টি পানীয়, প্রক্রিয়াজাত খাবার ও তেল-চর্বি বর্জন', 'পর্যাপ্ত সবুজ শাকসবজি ও অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ খাবার খাওয়া', 'নিয়মিত আল্ট্রাসনোগ্রাম ও লিভার টেস্টের মাধ্যমে উন্নতি পর্যবেক্ষণ'],
    },
  },
  {
    slug: 'ischemic-heart-disease',
    title: { en: 'Ischemic Heart Disease (IHD)', bn: 'ইস্কেমিক হার্ট ডিজিজ (Ischemic Heart Disease)' },
    shortDesc: {
      en: 'Comprehensive medical therapy for reduced blood flow to the heart, chest angina, and coronary artery disease prevention.',
      bn: 'হৃদযন্ত্রে রক্ত সঞ্চালন কমে যাওয়া, বুকে চাপ বা এনজাইনা এবং হার্ট অ্যাটাক প্রতিরোধের আধুনিক মেডিসিন চিকিৎসা।',
    },
    fullDesc: {
      en: `Ischemic Heart Disease (IHD), also called Coronary Artery Disease (CAD), occurs when the coronary arteries that supply oxygenated blood to your heart muscle become narrowed or hardened by fatty plaque buildup (atherosclerosis). As a result, the heart muscle does not receive adequate oxygen, especially during exertion or emotional stress.

The clinical hallmark of IHD is Angina Pectoris—a sensation of heavy squeezing, tightness, or burning in the chest that often radiates to the left shoulder, arm, neck, or jaw. If a plaque ruptures and a blood clot completely occludes a coronary artery, it causes an acute myocardial infarction (Heart Attack), which permanently destroys heart tissue.

Dr. Hanif provides comprehensive medical management for patients with chronic stable angina, post-PCI / post-CABG care, and multi-morbidity coronary risk. His treatment involves anti-platelet therapy (Aspirin, Clopidogrel), beta-blockers, statins, and nitrates, alongside rigorous control of hypertension, diabetes, and lifestyle risk factors.`,
      bn: `ইস্কেমিক হার্ট ডিজিজ (Ischemic Heart Disease) হলো এমন একটি অবস্থা যেখানে হার্টের নিজস্ব রক্তনালীগুলোতে (করোনারি আর্টারি) চর্বি জমে রক্ত চলাচল সংকুচিত হয়ে যায়। এর ফলে হার্টের মাংসপেশিতে পর্যাপ্ত অক্সিজেন ও রক্ত পৌঁছাতে পারে না।

এই রোগের অন্যতম প্রধান লক্ষণ হলো বুকে তীব্র চাপ বা ব্যথা অনুভব করা, যাকে 'এনজাইনা' বলা হয়। সাধারণত দ্রুত হাঁটলে, সিঁড়ি দিয়ে উঠলে বা ভারী কাজ করলে বুকে পাথর চেপে বসার মতো চাপ লাগে, যা বাম বাহু, গলা বা চোয়ালে ছড়িয়ে যেতে পারে। হঠাৎ রক্তনালী পুরোপুরি বন্ধ হয়ে গেলে রোগীর জীবনঘাতী হার্ট অ্যাটাক হতে পারে।

ডা. হানিফ আহমেদ তৌহিদ হার্টের ইসিজি, ইকো ও ঝুঁকি পর্যালোচনা করে রক্ত পাতলা রাখার ওষুধ, রক্তচাপ ও কোলেস্টেরল নিয়ন্ত্রণের মাধ্যমে হার্টকে সুরক্ষিত রাখতে সমন্বিত মেডিসিন সেবা প্রদান করেন।`,
    },
    symptoms: {
      en: ['Chest pressure, squeezing, or heaviness upon walking or climbing stairs', 'Pain radiating to the left arm, neck, jaw, or upper back', 'Sudden shortness of breath, cold sweating, and nausea', 'Unusual fatigue and dizziness during mild daily activities'],
      bn: ['হাঁটাহাঁটি বা সিঁড়ি উঠলে বুকের মাঝখানে বা বামপাশে ভারী পাথর চেপে বসার মতো চাপ', 'ব্যথা বাম বাহু, কাঁধ, গলা বা চোয়ালের দিকে ছড়িয়ে যাওয়া', 'বুকের অস্বস্তির সাথে হঠাৎ অতিরিক্ত ঠান্ডা ঘাম ও শ্বাসকষ্ট', 'অল্প পরিশ্রমে হাঁপিয়ে ওঠা ও বুক ধড়ফড় করা'],
    },
    treatments: {
      en: ['Antiplatelet therapy (Aspirin, Clopidogrel) to prevent blood clots', 'Beta-blockers and Nitrates to reduce cardiac workload and relieve angina', 'High-intensity Statin therapy to stabilize coronary plaques', 'Meticulous management of associated Diabetes and Hypertension', 'Smoking cessation, cardiac rehabilitation, and emergency action plan education'],
      bn: ['রক্ত জমাট বাঁধা রোধে অ্যাসপিরিন জাতীয় রক্ত পাতলাকারী ওষুধের সঠিক ব্যবহার', 'হার্টের কাজের চাপ কমাতে ও বুকের ব্যথা দূর করতে আধুনিক ওষুধের প্রয়োগ', 'কোলেস্টেরল ও রক্তচাপ শতভাগ নিয়ন্ত্রণে রাখা', 'ধূমপান পুরোপুরি ত্যাগ এবং জরুরি অবস্থায় করণীয় সম্পর্কে স্পষ্ট নির্দেশনা', 'হৃদরোগবান্ধব সুষম খাদ্যাভ্যাস ও হালকা ব্যায়ামের পরামর্শ'],
    },
  },
  {
    slug: 'asthma',
    title: { en: 'Asthma', bn: 'অ্যাজমা বা হাঁপানি (Asthma)' },
    shortDesc: {
      en: 'Long-term airway control, inhaler technique optimization, and emergency acute wheezing management.',
      bn: 'শ্বাসনালীর সংবেদনশীলতা, শ্বাসকষ্ট, বুকে বাঁশির মতো শব্দ হওয়া ও সঠিক ইনহেলার ব্যবহারের নির্দেশিকা।',
    },
    fullDesc: {
      en: `Asthma is a chronic inflammatory disorder of the airways characterized by hyper-responsiveness to various environmental triggers such as dust mites, pollen, cold weather, viral infections, smoke, and physical exertion.

During an asthma episode, the lining of the bronchial tubes swells, surrounding smooth muscles contract (bronchospasm), and thick mucus is produced. This dramatically narrows the airway passages, producing episodes of wheezing (a whistling sound in the chest), severe breathlessness, chest tightness, and intractable coughing—frequently worsening at night or early morning.

Dr. Hanif focuses on achieving complete asthma control and preventing emergency hospitalizations. He educates patients on the correct usage of controller and reliever inhalers (ICS-LABA combinations), spacer devices, and personalized Asthma Action Plans to ensure patients can lead fully active, symptom-free lives without unscientific fear of inhalers.`,
      bn: `অ্যাজমা বা হাঁপানি (Asthma) হলো ফুসফুসের শ্বাসনালীর একটি দীর্ঘমেয়াদী অ্যালার্জি ও প্রদাহজনিত রোগ। ধুলাবালি, ঠান্ডা বাতাস, ধোঁয়া, পরাগরেণু বা ঋতু পরিবর্তনের কারণে শ্বাসনালী সংবেদনশীল হয়ে ফুলে যায় এবং সংকুচিত হয়ে অতিরিক্ত কফ তৈরি করে।

এর ফলে ফুসফুসে বাতাস ঢোকা ও বের হওয়ার পথ সরু হয়ে যায়, যার কারণে তীব্র শ্বাসকষ্ট, বুকে বাঁশির মতো সাঁই-সাঁই শব্দ হওয়া এবং রাতে বা ভোরের দিকে একটানা শুকনো কাশি হতে পারে।

অনেকেই ইনহেলার ব্যবহার করতে ভয় পান, যা সম্পূর্ণ ভুল ধারণা। ডা. হানিফ আহমেদ তৌহিদ রোগীদের ইনহেলার ব্যবহারের সঠিক নিয়ম ও ডিভাইস ব্যবহারের প্রশিক্ষণ দেন। তিনি নিয়মিত প্রতিরোধক ইনহেলার ও ওষুধের মাধ্যমে হাঁপানির কষ্ট সম্পূর্ণ নিয়ন্ত্রণে রেখে রোগীকে স্বাভাবিক কর্মক্ষম জীবনযাপন করতে সাহায্য করেন।`,
    },
    symptoms: {
      en: ['Recurrent wheezing (whistling sound when breathing out)', 'Shortness of breath and feeling unable to catch a full breath', 'Persistent dry cough that worsens at night or after waking', 'Chest tightness or heaviness triggered by cold weather or dust'],
      bn: ['শ্বাস ফেলার সময় বুকে বাঁশির মতো সাঁই-সাঁই বা শাঁ-শাঁ শব্দ হওয়া', 'তীব্র শ্বাসকষ্ট ও দম আটকে আসার মতো অনুভূতি', 'রাতে বা ভোরের দিকে একটানা শুকনো কাশি বেড়ে যাওয়া', 'ধুলাবালি, ঠান্ডা লাগলে বা পরিশ্রমে বুকে চাপ ধরা'],
    },
    treatments: {
      en: ['Inhaled Corticosteroids (ICS) + Long-Acting Beta Agonists (LABA) for airway maintenance', 'Rapid-acting bronchodilator reliever therapy for acute attacks', 'Proper inhaler technique and spacer device education', 'Identification and avoidance of personalized environmental allergens', 'Written Asthma Action Plan for self-management'],
      bn: ['প্রদাহ দূর করতে নিয়মিত প্রতিরোধক ইনহেলার (ICS-LABA) ব্যবহার', 'হঠাৎ শ্বাসকষ্টে দ্রুত আরামদায়ক ব্রঙ্কোডাইলেটর ইনহেলার ব্যবহার', 'ইনহেলার ও স্পেসার ব্যবহারের সঠিক পদ্ধতি হাতে-কলমে শেখানো', 'ধুলাবালি, ধোঁয়া ও ঠান্ডা থেকে সুরক্ষার সুনির্দিষ্ট পরামর্শ', 'জরুরি শ্বাসকষ্টের সময় বাসায় তাৎক্ষণিক করণীয় গাইডলাইন'],
    },
  },
  {
    slug: 'copd',
    title: { en: 'Chronic Obstructive Pulmonary Disorder (COPD)', bn: 'সিওপিডি (COPD)' },
    shortDesc: {
      en: 'Specialized care for smoking-related airway damage, chronic cough, and exertional breathlessness.',
      bn: 'ধূমপান বা ধোঁয়া থেকে ফুসফুসের দীর্ঘমেয়াদী ক্ষতি, কফসহ কাশি ও সামান্য পরিশ্রমে হাঁপিয়ে ওঠার আধুনিক চিকিৎসা।',
    },
    fullDesc: {
      en: `Chronic Obstructive Pulmonary Disease (COPD) is a progressive, life-threatening inflammatory lung condition that causes obstructed airflow from the lungs. It encompasses chronic bronchitis (long-term airway inflammation with chronic sputum production) and emphysema (destruction of the fragile air sacs or alveoli where oxygen exchange occurs).

The predominant cause of COPD is long-term exposure to tobacco smoke (cigarettes, bidi, hookahs) as well as biomass smoke from indoor cooking fires in poorly ventilated spaces. Unlike asthma, airway limitation in COPD is largely irreversible and progressively worsens if smoking continues.

Dr. Hanif provides structured COPD assessment, categorizing patients based on symptom severity and exacerbation frequency. His management protocols include long-acting bronchodilators (LAMA/LABA), pulmonary rehabilitation counseling, oxygen therapy evaluation, and influenza/pneumococcal immunization to prevent catastrophic respiratory failure.`,
      bn: `সিওপিডি (Chronic Obstructive Pulmonary Disease - COPD) হলো ফুসফুসের একটি মারাত্মক ও দীর্ঘস্থায়ী রোগ যার ফলে ফুসফুসের ভেতর বাতাস চলাচলের স্বাভাবিক ক্ষমতা স্থায়ীভাবে ক্ষতিগ্রস্ত হয়। দীর্ঘদিনের ধূমপান (সিগারেট, বিড়ি, হুক্কা) এবং কাঠ বা খড়ির চুলার ধোঁয়ায় শ্বাস নেওয়ার কারণে এই রোগ হয়।

সিওপিডিতে আক্রান্ত রোগীদের ফুসফুসের বায়ুনালী স্থায়ীভাবে সংকুচিত হয়ে যায় এবং ফুসফুসের ভেতরের নরম কোষগুলো নষ্ট হয়ে যায়। ফলে রোগী সামান্য হাঁটাহাঁটি বা ঘরের ছোটখাটো কাজ করলেই প্রচণ্ড হাঁপিয়ে ওঠেন এবং দীর্ঘদিন ধরে কফযুক্ত কাশিতে ভোগেন।

ডা. হানিফ আহমেদ তৌহিদ ফুসফুসের কার্যক্ষমতা পরীক্ষা করে দীর্ঘমেয়াদী ইনহেলার, শ্বাসকষ্ট কমানোর ওষুধ এবং ফুসফুসের ব্যায়ামের পরামর্শ দেন। তিনি অবিলম্বে ধূমপান বন্ধ করার বিজ্ঞানসম্মত গাইডলাইন ও নিউমোনিয়া প্রতিরোধক টিকার মাধ্যমে রোগীর শ্বাসপ্রশ্বাস স্বাভাবিক রাখতে সহায়তা করেন।`,
    },
    symptoms: {
      en: ['Progressive shortness of breath, especially during physical activity', 'Chronic cough with daily white, yellow, or greenish sputum', 'Frequent winter chest infections and prolonged recovery', 'Chronic fatigue, chest tightness, and unintentional weight loss in advanced stages'],
      bn: ['সামান্য হাঁটাচলা বা পরিশ্রমে প্রচণ্ড শ্বাসকষ্ট ও হাঁপিয়ে ওঠা', 'প্রতিদিন দীর্ঘস্থায়ী কাশি এবং সাদা বা হলুদাভ কফ নির্গমন', 'শীতকালে ঘন ঘন বুকে কফ বসে তীব্র ইনফেকশন হওয়া', 'সার্বক্ষণিক ক্লান্তি এবং জটিল অবস্থায় ওজন দ্রুত কমে যাওয়া'],
    },
    treatments: {
      en: ['Dual long-acting bronchodilators (LAMA + LABA) for persistent airflow opening', 'Complete smoking cessation support and avoidance of biomass smoke', 'Pulmonary rehabilitation exercises to strengthen breathing muscles', 'Annual influenza and pneumococcal vaccination to prevent acute exacerbations', 'Home oxygen therapy assessment for chronic hypoxemic patients'],
      bn: ['ফুসফুসের পথ খোলা রাখতে উন্নত লং-অ্যাক্টিং ইনহেলার (LAMA/LABA) প্রয়োগ', 'ধূমপান সম্পূর্ণ বন্ধ করা এবং রান্নার ধোঁয়া থেকে দূরে থাকা', 'ফুসফুসের শক্তি বাড়াতে বিশেষ শ্বাসপ্রশ্বাসের ব্যায়াম শেখানো', 'ইনফেকশন ও নিউমোনিয়া রোধে ফ্লু ও নিউমোকক্কাল ভ্যাকসিনের পরামর্শ', 'অক্সিজেনের মাত্রা কমে গেলে ঘরে অক্সিজেন ব্যবহারের নিরাপদ নিয়মাবলী'],
    },
  },
  {
    slug: 'knee-osteoarthritis',
    title: { en: 'Knee Osteoarthritis', bn: 'হাঁটুর অস্টিওআর্থ্রাইটিস (Knee Osteoarthritis)' },
    shortDesc: {
      en: 'Joint cartilage protection, pain management, and mobility restoration without kidney-damaging painkillers.',
      bn: 'হাঁটুর তরুণাস্থি ক্ষয় রোধ, ফোলা ও তীব্র যন্ত্রণা উপশম এবং নিরাপদ ব্যথানাশক ব্যবস্থাপনায় স্বাভাবিক হাঁটাচলা ফিরিয়ে আনা।',
    },
    fullDesc: {
      en: `Knee Osteoarthritis (OA) is the most common form of degenerative joint disease, affecting millions of aging adults. It is characterized by the progressive wear-and-tear and breakdown of the protective articular cartilage covering the ends of bones in the knee joint.

As the smooth cartilage erodes, the exposed bones begin rubbing against one another, creating friction, inflammation, stiffness, bone spurs (osteophytes), and chronic joint pain. Risk factors include advancing age, female gender, obesity (which exerts tremendous mechanical stress on weight-bearing joints), prior knee trauma, and genetic predisposition.

Dr. Hanif focuses on protecting kidney function by preventing the chronic, unsupervised misuse of toxic NSAID painkillers. His holistic management integrates targeted, kidney-safe analgesia, cartilage-supportive pharmacotherapy, joint-unloading weight optimization, quadriceps muscle strengthening exercises, and lifestyle modifications to preserve knee function.`,
      bn: `হাঁটুর অস্টিওআর্থ্রাইটিস (Knee Osteoarthritis) হলো একটি অত্যন্ত পরিচিত বাতব্যথা ও অস্থিসন্ধির ক্ষয়জনিত রোগ। আমাদের হাঁটুর দুটি হাড়ের সংযোগস্থলে একধরনের মসৃণ তরুণাস্থি বা কার্টিলেজ (Cartilage) থাকে, যা হাঁটার সময় ঘর্ষণ রোধ করে শক-অ্যাবজরবার হিসেবে কাজ করে। বয়স বাড়ার সাথে সাথে বা অতিরিক্ত ওজনের চাপে এই তরুণাস্থি ক্ষয়ে যায়।

তরুণাস্থি ক্ষয়ে গেলে হাড়ে হাড়ে ঘষা লাগে, যার ফলে হাঁটুতে তীব্র ব্যথা, ফোলাভাব, কটকট শব্দ হওয়া এবং হাঁটু ভাঁজ করতে বা সিঁড়ি ওঠানামা করতে চরম কষ্ট হয়। অনেকে এই ব্যথার জন্য দিনের পর দিন অতিরিক্ত ব্যথানাশক ওষুধ খেয়ে কিডনি ও পাকস্থলী মারাত্মক ক্ষতিগ্রস্ত করেন।

ডা. হানিফ আহমেদ তৌহিদ কিডনি ও পাকস্থলী সুরক্ষিত রেখে নিরাপদ ওষুধের মাধ্যমে ব্যথা নিয়ন্ত্রণ করেন, হাঁটুর চারপাশের মাংসপেশি শক্তিশালী করার ব্যায়াম দেন এবং ওজন কমিয়ে রোগীকে সুস্থভাবে চলাচলের পরামর্শ দেন।`,
    },
    symptoms: {
      en: ['Deep knee pain during or after walking, kneeling, or climbing stairs', 'Morning stiffness lasting under 30 minutes that eases with mild movement', 'Audible cracking, grating, or popping sounds (crepitus) on bending', 'Knee swelling, joint enlargement, and reduced range of motion'],
      bn: ['হাঁটার সময়, দাঁড়িয়ে থাকলে বা সিঁড়ি ওঠার সময় হাঁটুতে তীব্র ব্যথা', 'সকালে ঘুম থেকে উঠলে হাঁটু জমে বা শক্ত হয়ে থাকা', 'হাঁটু ভাঁজ বা সোজা করার সময় কটকট বা মচমচ শব্দ হওয়া', 'হাঁটু ফুলে যাওয়া এবং নামাজে বা নিচে বসতে তীব্র কষ্ট হওয়া'],
    },
    treatments: {
      en: ['Kidney-safe, gastro-protective multimodal pain management protocols', 'Quadriceps and hamstring muscle strengthening physiotherapy counseling', 'Weight reduction program to reduce mechanical joint load (1 kg loss reduces 4 kg knee pressure)', 'Cartilage-supportive supplementation and topical anti-inflammatory gels', 'Assistive walking aids, footwear modification, and high-chair seating guidance'],
      bn: ['কিডনির ক্ষতি না করে নিরাপদ ব্যথানাশক ও জেল ব্যবহারের সঠিক পরামর্শ', 'হাঁটুর পেশি মজবুত করার কার্যকর ফিজিওথেরাপি ও ব্যায়ামের নির্দেশনা', 'শারীরিক ওজন কমানোর মাধ্যমে হাঁটুর ওপর চাপ হ্রাস করা', 'নিচে বসার পরিবর্তে চেয়ার-টেবিল ও হাই-কমোড ব্যবহারের অভ্যাস', 'প্রয়োজনে কার্টিলেজ সুরক্ষা ও সাপ্লিমেন্টেশনের সঠিক প্রয়োগ'],
    },
  },
  {
    slug: 'stroke',
    title: { en: 'Stroke', bn: 'স্ট্রোক (Stroke)' },
    shortDesc: {
      en: 'Post-stroke medical rehabilitation, blood pressure control, and secondary stroke recurrence prevention.',
      bn: 'মস্তিষ্কে রক্তক্ষরণ বা রক্তনালী বন্ধজনিত স্ট্রোকের পর প্যারালাইসিস পুনর্বাসন এবং পুনরায় স্ট্রোকের ঝুঁকি রোধ।',
    },
    fullDesc: {
      en: `A Stroke (Cerebrovascular Accident) is a medical emergency that occurs when blood supply to part of the brain is interrupted or reduced (Ischemic Stroke, accounting for ~85% of cases) or when a blood vessel in the brain ruptures and bleeds into brain tissue (Hemorrhagic Stroke).

Deprived of oxygen and essential nutrients, brain cells begin dying within minutes. This results in sudden focal neurological deficits such as facial drooping, unilateral arm or leg paralysis (hemiplegia), speech impairment (dysphasia), vision loss, and cognitive alterations.

Dr. Hanif provides dedicated post-acute medical management and secondary stroke prevention. His care protocol involves optimizing antiplatelet / anticoagulant regimens, aggressively treating uncontrolled hypertension and diabetes, managing post-stroke spasticity and neuropathic pain, and coordinating comprehensive neuro-rehabilitation to restore independence.`,
      bn: `স্ট্রোক (Stroke) হলো মস্তিষ্কের রক্তনালীর একটি মারাত্মক জটিল রোগ। অনেকেই ভুলবশত স্ট্রোককে হার্টের রোগ মনে করেন, কিন্তু স্ট্রোক মূলত মস্তিষ্কের বা ব্রেনের রোগ। যখন মস্তিষ্কের কোনো রক্তনালী চর্বি বা জমাট রক্ত দিয়ে বন্ধ হয়ে যায় (ইস্কেমিক স্ট্রোক) অথবা উচ্চ রক্তচাপের কারণে রক্তনালী ফেটে রক্তক্ষরণ হয় (হেমোরেজিক স্ট্রোক), তখন মস্তিষ্কের সেই অংশের কোষগুলো অক্সিজেনের অভাবে মারা যায়।

স্ট্রোকের ফলে হঠাৎ করে মুখের একপাশ বেঁকে যাওয়া, একপাশের হাত-পা অবশ বা প্যারালাইসিস হওয়া, কথা অস্পষ্ট হয়ে যাওয়া এবং ভারসাম্য হারিয়ে ফেলার মতো সমস্যা দেখা দেয়।

ডা. হানিফ আহমেদ তৌহিদ স্ট্রোক পরবর্তী পুনর্বাসন, রক্তচাপ ও ডায়াবেটিস কঠোর নিয়ন্ত্রণ, রক্ত পাতলা রাখার সঠিক ওষুধ এবং পুনরায় যেন স্ট্রোক না হয় সে লক্ষ্যে সমন্বিত আধুনিক চিকিৎসা সেবা প্রদান করেন।`,
    },
    symptoms: {
      en: ['Sudden weakness, numbness, or paralysis on one side of the face, arm, or leg', 'Difficulty speaking, slurred words, or inability to comprehend speech', 'Sudden loss of balance, dizziness, or inability to walk', 'Severe, unprecedented headache with vomiting (hemorrhagic stroke)', 'Sudden blurring or loss of vision in one or both eyes'],
      bn: ['হঠাৎ শরীরের একপাশের হাত বা পা অবশ হয়ে যাওয়া বা শক্তি না পাওয়া', 'মুখের একপাশ বেঁকে যাওয়া বা কথা জড়িয়ে যাওয়া', 'হঠাৎ মাথা ঘুরে পড়ে যাওয়া বা শরীরের ভারসাম্য রক্ষা করতে না পারা', 'অস্বাভাবিক তীব্র মাথাব্যথা ও বমি ভাব', 'চোখে হঠাৎ অন্ধকার দেখা বা একটি জিনিস দুটি দেখা'],
    },
    treatments: {
      en: ['Secondary prevention with antiplatelet therapy (Aspirin/Clopidogrel) or anticoagulation', 'Tight blood pressure, glycemic, and high-intensity Statin cholesterol control', 'Neuro-rehabilitation physiotherapy coordination for motor recovery', 'Management of post-stroke depression, cognitive health, and sleep stability', 'Screening and management of carotid artery stenosis and cardiac arrhythmias'],
      bn: ['পুনরায় স্ট্রোক প্রতিরোধে রক্ত জমাট বাঁধা রোধের নিয়মিত ওষুধ সেবন', 'রক্তচাপ, রক্তের সুগার ও কোলেস্টেরল শতভাগ নিরাপদ সীমায় রাখা', 'প্যারালাইসিস দূর করতে নিয়মিত ফিজিওথেরাপি ও রিহ্যাবিলিটেশন', 'স্ট্রোক রোগীর মানসিক স্বাস্থ্য ও স্মৃতিশক্তির যত্ন নেওয়া', 'হৃদযন্ত্র ও ঘাড়ের রক্তনালীর নিয়মিত পরীক্ষা ও ফলোআপ'],
    },
  },
  {
    slug: 'ibs',
    title: { en: 'Irritable Bowel Syndrome (IBS)', bn: 'আইবিএস (IBS / ইরিটেবল বাওয়েল সিন্ড্রোম)' },
    shortDesc: {
      en: 'Relief from chronic bloating, alternating constipation and diarrhea, and gut-brain nervous sensitivity.',
      bn: 'দীর্ঘস্থায়ী পেটে গ্যাস, পেট ডাকা, অনিয়মিত মলত্যাগ (কখনো ডায়রিয়া, কখনো কোষ্ঠকাঠিন্য) ও পেটের অস্বস্তি দূরীকরণ।',
    },
    fullDesc: {
      en: `Irritable Bowel Syndrome (IBS) is a common gastrointestinal disorder characterized by recurrent abdominal pain, cramping, bloating, and marked changes in bowel habits (diarrhea-predominant IBS-D, constipation-predominant IBS-C, or mixed pattern IBS-M) without detectable structural abnormalities in the gut.

IBS is recognized as a disorder of the Gut-Brain Interaction (DGBI), where altered intestinal motility, visceral hypersensitivity (exaggerated nerve sensitivity in bowel walls), altered gut microbiome, and psychological stress trigger severe digestive discomfort.

Dr. Hanif emphasizes rational, empathetic diagnosis, ruling out red-flag organic conditions (such as celiac disease, inflammatory bowel disease, or malignancies) before establishing an IBS diagnosis. His treatment combines antispasmodics, gut motility regulators, Low-FODMAP dietary education, probiotic therapy, and stress-modulation strategies.`,
      bn: `আইবিএস (Irritable Bowel Syndrome - IBS) হলো পেটের পরিপাকতন্ত্রের একটি দীর্ঘস্থায়ী ও বিরক্তিকর রোগ। এটি মূলত অন্ত্রের অতিরিক্ত সংবেদনশীলতা ও মস্তিষ্কের সাথে পেটের নার্ভের ভারসাম্যের তারতম্যের কারণে হয়। বিভিন্ন পরীক্ষা-নিরীক্ষা করলেও এতে পেটের ভেতরে কোনো দৃশ্যমান ঘা বা ক্ষত পাওয়া যায় না।

আইবিএসের রোগীরা দীর্ঘ সময় ধরে পেটে গ্যাস, পেট ফাঁপা, পেট ভুটভাট ডাকা এবং অনিয়মিত মলত্যাগের সমস্যায় ভোগেন। কারও কারও ক্ষেত্রে প্রায়ই পাতলা পায়খানা ও পেটে মোচড় দিয়ে পায়খানার বেগ হয়, আবার কারও ক্ষেত্রে প্রচণ্ড কোষ্ঠকাঠিন্য দেখা দেয়। মানসিক দুশ্চিন্তা ও অস্বাস্থ্যকর খাবারের কারণে এই সমস্যা বাড়ে।

ডা. হানিফ আহমেদ তৌহিদ অন্যান্য জটিল রোগ পরীক্ষা করে বাদ দেওয়ার পর রোগীর ধরন বুঝে উপযুক্ত ওষুধ, প্রোবায়োটিক এবং কোন কোন খাবার গ্যাস বাড়ায় (Low-FODMAP Diet) তা চিহ্নিত করে দীর্ঘমেয়াদী আরাম নিশ্চিত করেন।`,
    },
    symptoms: {
      en: ['Cramping abdominal pain that often eases after passing bowel motion', 'Persistent bloating, visible abdominal distension, and excess gas', 'Alternating bouts of loose watery stools and hard constipation', 'Sensation of incomplete bowel evacuation and urgency after meals', 'Mucus in stool without unexplained weight loss or rectal bleeding'],
      bn: ['পেটে মোচড় দিয়ে ব্যথা যা পায়খানা করার পর কিছুটা কমে', 'সার্বক্ষণিক পেট ফাঁপা, গ্যাস ও পেট ফুলে থাকা', 'কখনো পাতলা পায়খানা, আবার কখনো কয়েকদিন পায়খানা না হওয়া বা কোষ্ঠকাঠিন্য', 'পায়খানা করার পরও মনে হওয়া পেট পরিষ্কার হয়নি', 'খাওয়ার সাথে সাথেই পেটে চাপ লাগা বা বাথরুমে দৌড়াতে হওয়া'],
    },
    treatments: {
      en: ['Smooth muscle antispasmodics and gut motility regulators', 'Low-FODMAP dietary modification identifying individual trigger foods', 'High-grade targeted probiotics to balance intestinal microbiome', 'Soluble fiber supplementation (Psyllium husk) with adequate hydration', 'Stress management, sleep hygiene, and gut-directed neuromodulators when indicated'],
      bn: ['পেটের মোচড়ানি ও ব্যথা কমানোর অ্যান্টিস্পাজমোডিক ওষুধের প্রয়োগ', 'গ্যাস সৃষ্টিকারী খাবার (দুধ, পেঁয়াজ, অতিরিক্ত ডাল, ফাস্টফুড) পরিহারের গাইডলাইন', 'অন্ত্রের সুস্বাস্থ্যে উন্নত প্রোবায়োটিকের ব্যবহার', 'পর্যাপ্ত পানি ও ইসবগুলের ভুসি খাওয়ার সঠিক নিয়ম', 'মানসিক দুশ্চিন্তা কমানো ও নিয়মিত পর্যাপ্ত ঘুমের পরামর্শ'],
    },
  },
  {
    slug: 'peptic-ulcer',
    title: { en: 'Peptic Ulcer Disease', bn: 'পেপটিক আলসার ডিজিজ (Peptic Ulcer Disease)' },
    shortDesc: {
      en: 'H. pylori eradication, gastric acid control, and treatment of severe upper abdominal burning pain.',
      bn: 'পাকস্থলীর ঘা, বুকের নিচে তীব্র জ্বালাপোড়া, বমি ভাব এবং এইচ পাইলোরি (H. pylori) ব্যাকটেরিয়ার আধুনিক চিকিৎসা।',
    },
    fullDesc: {
      en: `Peptic Ulcer Disease (PUD) refers to painful open sores or ulcers that develop on the inner mucosal lining of the stomach (Gastric Ulcer) or the first part of the small intestine (Duodenal Ulcer). These ulcers occur when the protective mucus layer of the digestive tract is eroded by harsh digestive acids and pepsin.

The two major causative factors of peptic ulcer disease are chronic infection with Helicobacter pylori (H. pylori) bacteria and the frequent, unmonitored use of Non-Steroidal Anti-Inflammatory Drugs (NSAID painkillers such as Diclofenac, Naproxen, and Ibuprofen). Smoking, severe stress, and irregular fasting schedules exacerbate mucosal breakdown.

Dr. Hanif provides comprehensive gastrointestinal assessments, diagnosing H. pylori infections and differentiating benign ulcers from pre-malignant lesions. He prescribes targeted Proton Pump Inhibitor (PPI) regimens, mucosal barrier protectors, and certified H. pylori eradication combination therapies while weaning patients off harmful analgesic abuse.`,
      bn: `পেপটিক আলসার ডিজিজ (Peptic Ulcer Disease), যা আমাদের দেশে সাধারণ ভাষায় 'গ্যাস্ট্রিকের ঘা' বা আলসার নামে পরিচিত, পাকস্থলী বা ক্ষুদ্রান্ত্রের প্রথম অংশের (ডিওডেনাম) ভেতরের দেয়ালে সৃষ্ট ক্ষত। আমাদের পাকস্থলীতে স্বাভাবিকভাবেই হাইড্রোক্লোরিক এসিড তৈরি হয় খাবার হজম করার জন্য। কিন্তু যখন পাকস্থলীর ভেতরের সুরক্ষাকারী স্তর ক্ষতিগ্রস্ত হয়, তখন এই এসিড নিজের মাংসপেশিতে ক্ষত বা আলসার তৈরি করে।

আলসারের দুটি প্রধান কারণ হলো—'এইচ পাইলোরি' (H. pylori) নামক ব্যাকটেরিয়ার দীর্ঘস্থায়ী সংক্রমণ এবং চিকিৎসকের পরামর্শ ছাড়া অতিরিক্ত ব্যথানাশক ওষুধ (পেইনকিলার) সেবন। এছাড়া অতিরিক্ত তেল-মসলাযুক্ত খাবার, অনিয়মিত খাবার খাওয়া ও ধূমপান এই ক্ষতকে আরও বাড়িয়ে দেয়।

ডা. হানিফ আহমেদ তৌহিদ আধুনিক প্রোটন পাম্প ইনহিবিটর (PPI) ওষুধ, ব্যাকটেরিয়ানাশক কম্বিনেশন থেরাপি ও সঠিক খাদ্যবিধির মাধ্যমে গ্যাস্ট্রিক আলসারের মূল কারণ নির্মূল করেন।`,
    },
    symptoms: {
      en: ['Burning, gnawing stomach pain between belly button and breastbone', 'Pain that worsens on an empty stomach (duodenal) or after eating (gastric)', 'Heartburn, acid regurgitation (GERD), and frequent belching', 'Nausea, bloating, and feeling easily full during meals', 'Alarm signs: Black tarry stools or vomiting blood requiring emergency care'],
      bn: ['বুকের ঠিক নিচে বা পেটের ওপরের অংশে তীব্র জ্বালাপোড়া বা কামড়ানোর মতো ব্যথা', 'খালি পেটে থাকলে বা দেরিতে খেলে পেট ব্যথা বেড়ে যাওয়া', 'বুক জ্বলা, টক ঢেকুর ওঠা এবং মুখ দিয়ে অম্লরস চলে আসা', 'বমি বমি ভাব, সামান্য খেলেই পেট ভরে যাওয়া ও ক্ষুধা না লাগা', 'জটিল ক্ষেত্রে কালো রঙের পায়খানা হওয়া বা রক্তবমি হওয়া'],
    },
    treatments: {
      en: ['Structured Proton Pump Inhibitor (PPI) therapy (Esomeprazole, Rabeprazole, Dexlansoprazole)', 'Quadruple or Triple antibiotic eradication therapy for confirmed H. pylori infections', 'Complete discontinuation of harmful OTC NSAID painkillers and gastric irritants', 'Mucosal cytoprotective agents and alginate reflux barriers', 'Timely meals, smoking cessation, and bland dietary planning'],
      bn: ['পাকস্থলীর অতিরিক্ত এসিড কমাতে আধুনিক পিপিআই (PPI) ওষুধের সঠিক কোর্স', 'এইচ পাইলোরি ব্যাকটেরিয়ার অস্তিত্ব থাকলে পূর্ণাঙ্গ অ্যান্টিবায়োটিক থেরাপি', 'পেইনকিলার বা ক্ষতিকর ব্যথানাশক ওষুধ সেবন পুরোপুরি বন্ধ করা', 'সময়মতো খাবার খাওয়া ও খালি পেটে দীর্ঘক্ষণ না থাকা', 'ধূমপান, চা-কফি ও অতিরিক্ত ভাজাপোড়া খাবার পরিহারের নির্দেশনা'],
    },
  },
  {
    slug: 'obesity',
    title: { en: 'Obesity & Weight Management', bn: 'স্থূলতা বা অতিরিক্ত ওজন (Obesity / ওবেসিটি)' },
    shortDesc: {
      en: 'Scientific metabolic weight reduction plans, visceral fat assessment, and related chronic disease prevention.',
      bn: 'বিজ্ঞানসম্মত উপায়ে অতিরিক্ত ওজন কমানো, মেটাবলিজম বৃদ্ধি এবং ডায়াবেটিস ও ফ্যাটি লিভারের ঝুঁকি নিয়ন্ত্রণ।',
    },
    fullDesc: {
      en: `Obesity is a complex, chronic relapsing metabolic disease characterized by excessive adiposity (fat accumulation) that impairs physical health. Clinically diagnosed using Body Mass Index (BMI ≥ 25 kg/m² for Asian populations) and waist circumference measurements, obesity is now recognized as a primary driver of major non-communicable diseases.

Excess visceral fat secretes pro-inflammatory cytokines and free fatty acids, directly inducing systemic insulin resistance, dyslipidemia, endothelial dysfunction, Type 2 Diabetes, Hypertension, Coronary Artery Disease, Obstructive Sleep Apnea, Fatty Liver (MASLD), Osteoarthritis of knees, and hormonal imbalances such as Polycystic Ovary Syndrome (PCOS).

Dr. Hanif approaches obesity as a multi-system medical challenge rather than a simple cosmetic issue. His clinical evaluation screens for underlying endocrine causes (such as hypothyroidism or Cushing's syndrome) and formulates evidence-based metabolic management plans involving caloric deficit nutrition, physical fitness optimization, and medical pharmacotherapy where indicated.`,
      bn: `স্থূলতা বা অতিরিক্ত ওজন (Obesity) কেবল বাহ্যিক সৌন্দর্য বা শারীরিক গঠনের বিষয় নয়, এটি একটি মারাত্মক মেটাবলিক রোগ। এশিয়ানদের শারীরিক গঠন অনুযায়ী বিএমআই (BMI) ২৫ বা তার বেশি হলে এবং পেটের পরিধি স্বাভাবিকের চেয়ে বেশি হলে তাকে ওবেসিটি বা স্থূলতা বলা হয়।

শরীরে বিশেষ করে পেটে ও লিভারে অতিরিক্ত চর্বি জমলে তা শরীরের অন্যান্য হরমোনকে অকার্যকর করে দেয়। স্থূলতা সরাসরি ডায়াবেটিস, উচ্চ রক্তচাপ, হার্ট অ্যাটাক, ফ্যাটি লিভার, ঘুমের মধ্যে শ্বাসকষ্ট (Sleep Apnea) এবং হাঁটুর ক্ষয় ও বাতব্যথার প্রধান কারণ হিসেবে কাজ করে।

ডা. হানিফ আহমেদ তৌহিদ কোনো অননুমোদিত ক্র্যাশ ডায়েট বা অবৈজ্ঞানিক পদ্ধতি পরিহার করে চিকিৎসাবিজ্ঞানের আলোকে ওজন নিয়ন্ত্রণের সঠিক দিকনির্দেশনা দেন। তিনি মেটাবলিজম ও থাইরয়েড পরীক্ষা করে দীর্ঘমেয়াদী খাদ্যতালিকা ও ব্যায়ামের মাধ্যমে শরীরের অতিরিক্ত চর্বি কমিয়ে স্বাভাবিক ওজনের সুস্থ জীবন নিশ্চিত করেন।`,
    },
    symptoms: {
      en: ['High Body Mass Index (BMI) and increased abdominal waist circumference', 'Shortness of breath and excessive sweating on mild physical exertion', 'Loud snoring, daytime sleepiness, and interrupted night sleep (Sleep Apnea)', 'Chronic lower back pain, knee joint stiffness, and physical lethargy', 'Skin changes such as darkened velvety skin around neck folds (Acanthosis Nigricans)'],
      bn: ['শরীরের অতিরিক্ত ওজন ও পেটের চর্বি বৃদ্ধি পাওয়া', 'সামান্য পরিশ্রমেই দ্রুত হাঁপিয়ে ওঠা ও অতিরিক্ত ঘাম হওয়া', 'রাতে ঘুমের মধ্যে অতিরিক্ত নাক ডাকা ও দিনে ঘুম ঘুম ভাব লাগা', 'কোমর ব্যথা, হাঁটু ব্যথা ও শরীরে সার্বক্ষণিক ভারী লাগা', 'ঘাড়ের ভাঁজে বা বগলের নিচে কালো খসখসে দাগ পড়া (ইনসুলিন রেজিস্ট্যান্সের লক্ষণ)'],
    },
    treatments: {
      en: ['Individualized Caloric Deficit Nutritional Blueprint designed for sustainable fat loss', 'Endocrine and metabolic screening (Thyroid, HbA1c, Lipids, Fasting Insulin)', 'Aerobic and resistance physical training counseling (150-300 mins/week)', 'Evidence-based medical anti-obesity pharmacotherapy for qualified patients', 'Behavioral modification and long-term weight maintenance monitoring'],
      bn: ['ব্যক্তিগত ক্যালোরি হিসাব করে পুষ্টিকর ও টেকসই ডায়েট চার্ট প্রদান', 'থাইরয়েড, হরমোন ও মেটাবলিক স্বাস্থ্য পরীক্ষা', 'প্রতি সপ্তাহে অন্তত ১৫০-৩০০ মিনিট নিয়মিত শারীরিক ব্যায়াম ও হাঁটার পরিকল্পনা', 'প্রয়োজনে চিকিৎসকের তত্ত্বাবধানে নিরাপদ ওজন কমানোর ওষুধের প্রয়োগ', 'ওজন কমার পর তা ধরে রাখার দীর্ঘমেয়াদী লাইফস্টাইল গাইডলাইন'],
    },
  },
  {
    slug: 'migraine',
    title: { en: 'Migraine & Chronic Headaches', bn: 'মাইগ্রেন (Migraine / তীব্র মাথাব্যথা)' },
    shortDesc: {
      en: 'Preventive neurological therapies, acute migraine attack relief, and trigger identification counseling.',
      bn: 'মাথার একপাশে দপদপ করা তীব্র ব্যথা, আলো বা শব্দে অস্বস্তি এবং বমি ভাবের স্থায়ী উপশম ও চিকিৎসা।',
    },
    fullDesc: {
      en: `Migraine is a complex neurological disorder characterized by recurrent attacks of severe, throbbing or pulsating headache—frequently localized to one side of the head (unilateral). Migraine pain is caused by temporary neurovascular alterations, including trigeminovascular system activation, cortical spreading depression, and inflammatory neuropeptide release.

A classic migraine attack typically lasts from 4 to 72 hours and is accompanied by photophobia (extreme sensitivity to bright lights), phonophobia (sensitivity to loud sounds), nausea, vomiting, and visual disturbances (visual aura with flashing zig-zag lines or blind spots before pain onset). Common triggers include psychological stress, sleep deprivation, hormonal fluctuations, skipped meals, bright sunlight, and strong odors.

Dr. Hanif provides comprehensive headache evaluations to differentiate migraines from dangerous secondary headaches (such as intracranial hypertension or aneurysm warning signs). His treatment protocol combines acute abortive therapy to halt active attacks, daily prophylactic medications (beta-blockers, topiramate, flunarizine) to reduce attack frequency, and trigger-avoidance education.`,
      bn: `মাইগ্রেন (Migraine) হলো মস্তিষ্কের নার্ভ ও রক্তনালীর একটি বিশেষ স্নায়বিক সমস্যা। এটি সাধারণ মাথাব্যথার চেয়ে অনেক বেশি তীব্র ও কষ্টদায়ক। সাধারণত মাথার একপাশে (কখনো কখনো উভয়পাশে) দপদপ করে তীব্র ব্যথা শুরু হয়, যা কয়েক ঘণ্টা থেকে একটানা দুই-তিন দিন পর্যন্ত স্থায়ী হতে পারে।

মাইগ্রেনের ব্যথার সাথে সাথে রোগীর তীব্র বমি বমি ভাব বা বমি হয় এবং আলো, রোদ বা যেকোনো শব্দে অসহ্য অস্বস্তি লাগে। অনেকের ব্যথা শুরুর আগে চোখের সামনে আলোর ঝলকানি বা আঁকাবাঁকা দাগ দেখা যেতে পারে, যাকে 'অরা' (Aura) বলা হয়। মানসিক চাপ, অনিয়মিত ঘুম, দীর্ঘক্ষণ না খেয়ে থাকা এবং অতিরিক্ত রোদে ঘোরাঘুরি মাইগ্রেনের ব্যথা বাড়িয়ে দেয়।

ডা. হানিফ আহমেদ তৌহিদ রোগীকে সার্বিক পরীক্ষা করে অন্যান্য জটিল কারণ বাদ দিয়ে মাইগ্রেন শনাক্ত করেন। তিনি তাৎক্ষণিক ব্যথা কমানোর নিরাপদ ওষুধ এবং ঘন ঘন ব্যথা হওয়া রোধে দীর্ঘমেয়াদী প্রিভেন্টিভ ওষুধের মাধ্যমে রোগীকে সুস্থ রাখেন।`,
    },
    symptoms: {
      en: ['Moderate to severe throbbing, pulsing headache typically on one side of the head', 'Extreme sensitivity to bright light (photophobia) and loud noises (phonophobia)', 'Nausea, upset stomach, and episodes of vomiting during attacks', 'Visual aura (flashing lights, zigzag patterns, blind spots) prior to pain', 'Fatigue, mood shifts, and neck stiffness preceding or following the attack'],
      bn: ['মাথার একপাশে বা রগে তীব্র দপদপানিযুক্ত অসহ্য মাথাব্যথা', 'আলো বা রোদে তাকাতে না পারা এবং শব্দে মাথা আরও বেশি ধরা', 'ব্যথার তীব্রতায় প্রচণ্ড বমি ভাব হওয়া বা বমি হওয়া', 'ব্যথা শুরুর আগে চোখে আলোর ঝিলিক বা অন্ধকার দেখা', 'মাথাব্যথা শেষ হওয়ার পরও সারাদিন শরীর ভারী ও অবসন্ন লাগা'],
    },
    treatments: {
      en: ['Acute attack abortive therapy (Triptans, targeted NSAIDs, antiemetics) taken at onset', 'Daily prophylactic preventive pharmacotherapy to reduce attack frequency and intensity', 'Trigger identification diary to isolate dietary, sleep, and environmental triggers', 'Sleep hygiene, stress-management techniques, and hydration counseling', 'Screening for secondary causes of headache via neurological evaluation'],
      bn: ['ব্যথা শুরু হওয়া মাত্রই তা বন্ধ করতে নিরাপদ ও দ্রুত কার্যকর ওষুধের প্রয়োগ', 'ঘন ঘন মাইগ্রেন হওয়া রোধে চিকিৎসকের নির্দেশনায় নিয়মিত প্রিভেন্টিভ ওষুধ সেবন', 'যেসব কারণে ব্যথা বাড়ে (রোদ, না খেয়ে থাকা, ঘুমের অনিয়ম) তা খুঁজে বের করে পরিহার করা', 'নিয়মিত পরিমিত ঘুম ও পর্যাপ্ত পানি পানের অভ্যাস গড়ে তোলা', 'দীর্ঘস্থায়ী মাথাব্যথার অন্যান্য স্নায়বিক কারণ নিখুঁতভাবে পরীক্ষা ও নিশ্চিতকরণ'],
    },
  },
];

export interface Service {
  slug: string;
  title: { en: string; bn: string };
  shortDesc: { en: string; bn: string };
  fullDesc: { en: string; bn: string };
}

export const servicesData: Service[] = [
  {
    slug: 'general-medicine',
    title: {
      en: 'General Internal Medicine',
      bn: 'জেনারেল ইন্টারনাল মেডিসিন ও বহুরোগের চিকিৎসা',
    },
    shortDesc: {
      en: 'Comprehensive diagnosis and evidence-based treatment of multi-system adult diseases.',
      bn: 'প্রাপ্তবয়স্কদের বহুমুখী ও জটিল অভ্যন্তরীণ শারীরিক রোগের নির্ভুল নির্ণয় ও আধুনিক চিকিৎসা।',
    },
    fullDesc: {
      en: 'General internal medicine focuses on diagnosing and managing complex adult illnesses affecting multiple organ systems. Dr. Hanif provides comprehensive clinical evaluations, laboratory workup coordination, and personalized therapeutic regimens.',
      bn: 'জেনারেল ইন্টারনাল মেডিসিন প্রাপ্তবয়স্কদের বিভিন্ন জটিল ও দীর্ঘমেয়াদী রোগের সঠিক কারণ নির্ণয় ও চিকিৎসার ক্ষেত্রে অত্যন্ত গুরুত্বপূর্ণ। ডা. হানিফ সার্বিক শারীরিক পরীক্ষা এবং নির্ভুল ল্যাব ডায়াগনস্টিকের মাধ্যমে রোগীর ব্যক্তিগত চিকিৎসার পরিকল্পনা করেন।',
    },
  },
  {
    slug: 'preventive-health',
    title: {
      en: 'Preventive Health Screening',
      bn: 'প্রতিরোধমূলক স্বাস্থ্য পরীক্ষা ও স্ক্রীনিং',
    },
    shortDesc: {
      en: 'Cardiac risk profiling, diabetic screens, and hypertension control reviews.',
      bn: 'হৃদরোগের ঝুঁকি নিরূপণ, ডায়াবেটিস স্ক্রীনিং এবং উচ্চ রক্তচাপ নিয়ন্ত্রণের সুনির্দিষ্ট পর্যবেক্ষণ।',
    },
    fullDesc: {
      en: 'Preventive health screening identifies metabolic and cardiovascular abnormalities before irreversible damage occurs. Early intervention through lifestyle guidance and early medical therapies saves lives.',
      bn: 'প্রতিরোধমূলক স্বাস্থ্য পরীক্ষা কোনো বড় রোগ দেখা দেওয়ার আগেই তা শনাক্ত করতে সাহায্য করে। প্রাথমিক অবস্থাতেই রক্তচাপ, সুগার ও কোলেস্টেরল পরীক্ষা করে সঠিক ব্যবস্থা গ্রহণ করলে ভবিষ্যতের বহু মারাত্মক ঝুঁকি এড়ানো সম্ভব।',
    },
  },
];
