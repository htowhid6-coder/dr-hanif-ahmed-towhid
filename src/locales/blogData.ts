export interface BlogPost {
  slug: string;
  lang: 'en' | 'bn';
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  image?: string;
  category?: string;
  categoryBn?: string;
  featured?: boolean;
}

export const blogData: BlogPost[] = [
  // --- ENGLISH ARTICLES ---
  {
    slug: 'managing-type2-diabetes-sylhet',
    lang: 'en',
    title: "Managing Type-2 Diabetes: Essential Steps for Patients in Sylhet",
    date: "2026-08-01",
    readTime: "6 min read",
    category: "Metabolism & Diabetes",
    categoryBn: "ডায়াবেটিস ও মেটাবলিজম",
    image: "/blogs/diabetes_care_guide.jpg",
    featured: true,
    excerpt: "Learn how to control blood sugar levels effectively using diet plans, regular screening, and rational medication adjustments under medical care.",
    content: `
      <h2>The Diabetes Challenge in Sylhet</h2>
      <p>Type-2 Diabetes Mellitus has become an epidemic in Bangladesh, particularly in urban and semi-urban areas like Sylhet. Factors such as a carbohydrate-rich diet (rice-based meals), sedentary lifestyles, and genetic predispositions contribute to high sugar levels. Managing diabetes is not just about taking pills; it is about establishing a coordinated routine of metabolic tracking, balanced nutrition, and physical activity.</p>
      
      <h2>Step 1: Rational Dietary Changes</h2>
      <p>Dietary control is the cornerstone of sugar management. Patients in Sylhet often struggle to reduce white rice intake. I recommend substituting it with red rice, oats, or whole wheat flatbreads (roti). Increasing green leafy vegetables and consuming lean proteins helps slow down glucose absorption, preventing sudden post-meal sugar spikes.</p>
      
      <h2>Step 2: Continuous Tracking & HbA1c Monitoring</h2>
      <p>A single fasting blood sugar test does not show the full picture. The HbA1c test, which measures average blood sugar over three months, is the clinical gold standard. Patients should aim for an HbA1c level of under 7% to minimize risks of retinopathy (eye damage), neuropathy (nerve pain), and nephropathy (kidney complications).</p>
      
      <h2>Step 3: Safe Medication & Insulin Calibration</h2>
      <p>Never adjust your diabetes medications based on temporary home test results. Metformin, sulfonylureas, or insulin therapy require precise calibration by an internal medicine specialist. Self-altering dosages can trigger dangerous hypoglycemia (critically low blood sugar) or severe hyperglycemic spikes.</p>
    `
  },
  {
    slug: 'understanding-hypertension-safely',
    lang: 'en',
    title: "Understanding Hypertension: How to Control High Blood Pressure Safely",
    date: "2026-08-03",
    readTime: "5 min read",
    category: "Cardiovascular Care",
    categoryBn: "উচ্চ রক্তচাপ ও হৃদরোগ",
    image: "/blogs/hypertension_care_guide.jpg",
    featured: true,
    excerpt: "Unpack why high blood pressure is called a silent killer and how to optimize your treatment and sodium intake for cardiac safety.",
    content: `
      <h2>The Silent Threat</h2>
      <p>Hypertension is commonly known as a 'silent killer' because it rarely exhibits obvious symptoms until severe cardiovascular or renal damage has occurred. In Sylhet, many stroke patients admitted to Osmani Medical College Hospital are found to have long-standing, undiagnosed high blood pressure.</p>
      
      <h2>Establishing a Measurement Protocol</h2>
      <p>To diagnose hypertension, blood pressure should be measured on multiple occasions while the patient is at rest. A reading consistently above 130/80 mmHg indicates hypertension. Home monitoring using digital cuffs is highly recommended, but the devices should be validated periodically against clinical mercury sphygmomanometers.</p>
      
      <h2>Therapeutic Interventions</h2>
      <p>Dietary sodium restriction (reducing salt intake to less than 2,000 mg per day) is critical. Additionally, weight reduction, aerobic exercise, and avoiding tobacco decrease arterial resistance. Medication adjustments must be handled carefully by your physician; sudden termination of anti-hypertensive drugs can trigger a rebound hypertensive crisis.</p>
    `
  },
  {
    slug: 'understanding-thyroid-disorders',
    lang: 'en',
    title: "Thyroid Disorder Symptoms: A Guide to Hypothyroidism & Hyperthyroidism",
    date: "2026-08-07",
    readTime: "6 min read",
    category: "Endocrinology & Thyroid",
    categoryBn: "থাইরয়েড ও হরমোন",
    image: "/blogs/thyroid_health_guide.jpg",
    featured: false,
    excerpt: "How thyroid hormones regulate metabolism, energy, and weight, and how to balance them under medical guidance.",
    content: `
      <h2>The Thyroid Gland and Metabolism</h2>
      <p>The thyroid is a butterfly-shaped gland in the neck that produces hormones regulating heart rate, body temperature, and energy conversion. Disorders primarily split into hypothyroidism (underactive thyroid) and hyperthyroidism (overactive thyroid).</p>
      
      <h2>Hypothyroidism vs. Hyperthyroidism</h2>
      <p>Hypothyroidism slows down body functions, leading to fatigue, weight gain, constipation, and cold intolerance. Conversely, hyperthyroidism accelerates metabolism, causing weight loss, rapid heart rate, tremors, and heat intolerance. An auto-immune trigger, such as Hashimoto's or Graves' disease, is often the root cause.</p>
      
      <h2>Restoring Hormone Balance</h2>
      <p>Diagnosis requires measuring blood levels of T3, T4, and Thyroid Stimulating Hormone (TSH). Hypothyroidism is managed with daily levothyroxine tablets, while hyperthyroidism requires antithyroid medications or radioactive iodine therapy. Regular dosage audits are vital to prevent hormone fluctuations.</p>
    `
  },
  {
    slug: 'danger-of-antibiotic-misuse',
    lang: 'en',
    title: "Rational Antibiotic Use: Why Misuse is Dangerous for Your Health",
    date: "2026-08-09",
    readTime: "4 min read",
    category: "Rational Medicine",
    categoryBn: "সঠিক ওষুধ ও সচেতনতা",
    image: "/blogs/antibiotic_safety_guide.jpg",
    featured: false,
    excerpt: "Unpacking the growing threat of antimicrobial resistance in Bangladesh and the critical importance of rational prescriptions.",
    content: `
      <h2>The Threat of Antibiotic Resistance</h2>
      <p>Over-the-counter purchases of antibiotics and the failure to complete prescribed cycles have accelerated antimicrobial resistance in Bangladesh. Common bacterial infections are becoming resistant to first-line and second-line antibiotics, leaving doctors with fewer treatment options.</p>
      
      <h2>Antibiotics vs. Viral Infections</h2>
      <p>Antibiotics only target bacterial infections. They are completely ineffective against viruses, including seasonal colds, influenza, and dengue fever. Taking antibiotics for viral fevers damages gut microbiomes without treating the virus, and fuels bacterial resistance.</p>
      
      <h2>Guidelines for Rational Use</h2>
      <p>Only take antibiotics when explicitly prescribed by a registered physician. Always complete the entire prescribed course, even if you feel better mid-cycle, to ensure all bacteria are eliminated and prevent resistant strains from surviving.</p>
    `
  },
  {
    slug: 'migraine-symptoms-treatments-guide',
    lang: 'en',
    title: "Migraine Symptoms and Treatments: When to See a Neurologist",
    date: "2026-08-09",
    readTime: "6 min read",
    category: "Neurology & Headache",
    categoryBn: "নিউরোলজি ও মাথাব্যথা",
    image: "/blogs/diabetes_care_guide.jpg",
    featured: false,
    excerpt: "Differentiating between regular tension headaches and debilitating migraines, identifying triggers, and exploring preventive medical therapies.",
    content: `
      <h2>Tension Headaches vs. Migraines</h2>
      <p>Migraine is a complex neurological disorder characterized by recurrent attacks of moderate to severe pulsating unilateral head pain, frequently accompanied by nausea, vomiting, and heightened sensitivity to light (photophobia) and sound (phonophobia).</p>
      
      <h2>Recognizing Common Triggers</h2>
      <p>Irregular sleep cycles, skipping meals, chronic psychological stress, bright sunlight, and dehydration are common triggers. Keeping a headache diary helps pinpoint personal triggers to prevent severe attacks.</p>
      
      <h2>Targeted Neurological Therapy</h2>
      <p>Effective management includes acute abortive medications taken at the earliest onset of pain and prophylactic daily medications to reduce attack frequency. Overusing over-the-counter painkillers can cause medication-overuse headaches and kidney strain.</p>
    `
  },

  // --- BANGLA ARTICLES ---
  {
    slug: 'managing-diabetes-bengali',
    lang: 'bn',
    title: "সিলেটে ডায়াবেটিস নিয়ন্ত্রণ: লাইফস্টাইল, সুষম খাদ্যাভ্যাস ও ইনসুলিনের সঠিক প্রয়োগ",
    date: "2026-08-02",
    readTime: "৭ মিনিট পাঠ",
    category: "Metabolism & Diabetes",
    categoryBn: "ডায়াবেটিস ও মেটাবলিজম",
    image: "/blogs/diabetes_care_guide.jpg",
    featured: true,
    excerpt: "সিলেট অঞ্চলের খাদ্যাভ্যাস ও জীবনযাত্রার সাথে সামঞ্জস্য রেখে কীভাবে রক্তে শর্করার মাত্রা নিয়ন্ত্রণে রাখবেন এবং সুস্থ থাকবেন—তার বিশেষ পরামর্শ।",
    content: `
      <h2>সিলেটে ডায়াবেটিস বৃদ্ধির প্রেক্ষাপট</h2>
      <p>সিলেট অঞ্চলসহ সারা বাংলাদেশে টাইপ-২ ডায়াবেটিস রোগীর সংখ্যা আশঙ্কাজনকভাবে বাড়ছে। আমাদের ঐতিহ্যবাহী অতিরিক্ত শর্করা নির্ভর খাদ্যাভ্যাস (বিশেষ করে প্রচুর সাদা ভাত সেবন), কায়িক শ্রমের অভাব ও অনিয়মিত জীবনযাপন এর অন্যতম প্রধান কারণ। ডায়াবেটিস নিয়ন্ত্রণ কেবল নিয়মিত ওষুধ সেবনের মধ্যে সীমাবদ্ধ নয়; বরং এটি সঠিক খাদ্যাভ্যাস, শারীরিক শৃঙ্খলা ও নিয়মিত রক্ত পরীক্ষা সমন্বয়ের একটি সুনির্দিষ্ট প্রক্রিয়া।</p>
      
      <h2>খাদ্যাভ্যাসে প্রয়োজনীয় সমন্বয়</h2>
      <p>ডায়াবেটিস রোগীদের ক্ষেত্রে প্রধান কাজ হলো রক্তে সুগারের হঠাৎ বৃদ্ধি (Post-meal Spike) রোধ করা। সাদা ভাতের পরিমাণ কমিয়ে তার পরিবর্তে লাল চালের ভাত, লাল আটার রুটি বা ওটস গ্রহণ করা যেতে পারে। প্রতিদিনের খাদ্যতালিকায় প্রচুর পরিমাণে প্রোটিন (মাছ, মুরগির মাংস, ডিম) এবং আঁশযুক্ত সবুজ শাকসবজি অন্তর্ভুক্ত করলে শর্করা ধীরগতিতে শোষিত হয় এবং সুগার নিয়ন্ত্রণে থাকে।</p>
      
      <h2>ইনসুলিন ও ওষুধের সঠিক ও নিরাপদ সেবন</h2>
      <p>চিকিৎসকের পরামর্শ ছাড়া নিজ সিদ্ধান্তে ডায়াবেটিসের ওষুধ বা ইনসুলিনের মাত্রা পরিবর্তন করা অত্যন্ত বিপজ্জনক। এর ফলে রক্তে সুগারের মাত্রা আশঙ্কাজনকভাবে কমে গিয়ে 'হাইপোগ্লাইসেমিয়া' তৈরি হতে পারে, যা রোগীর জীবনের জন্য ঝুঁকিপূর্ণ। নিয়মিত ব্লাড সুগার পরীক্ষা ও ৩ মাসের গড় সুগার (HbA1c) পরিমাপের মাধ্যমে চিকিৎসকের কাছে গিয়ে ওষুধের আপডেট করে নেওয়া উচিত।</p>
    `
  },
  {
    slug: 'hypertension-guide-bengali',
    lang: 'bn',
    title: "উচ্চ রক্তচাপ বা হাইপারটেনশন: কেন এটি নীরব ঘাতক ও কীভাবে হৃদরোগ প্রতিরোধ করবেন",
    date: "2026-08-04",
    readTime: "৫ মিনিট পাঠ",
    category: "Cardiovascular Care",
    categoryBn: "উচ্চ রক্তচাপ ও হৃদরোগ",
    image: "/blogs/hypertension_care_guide.jpg",
    featured: true,
    excerpt: "উচ্চ রক্তচাপের লক্ষণ, লবণ নিয়ন্ত্রণ এবং নিয়মিত পর্যবেক্ষণের মাধ্যমে কীভাবে স্ট্রোক ও কিডনি বিকল হওয়ার ঝুঁকি এড়ানো যায়।",
    content: `
      <h2>কেন উচ্চ রক্তচাপকে 'নীরব ঘাতক' বলা হয়?</h2>
      <p>উচ্চ রক্তচাপ (Hypertension)-কে চিকিৎসা বিজ্ঞানে 'নীরব ঘাতক' বলা হয়, কারণ বেশিরভাগ ক্ষেত্রেই শুরুতে এর কোনো স্পষ্ট উপসর্গ বা শারীরিক কষ্ট থাকে না। কিন্তু অনিয়ন্ত্রিত রক্তচাপ অলক্ষ্যেই হৃদযন্ত্র, মস্তিষ্ক ও কিডনির রক্তনালী ক্ষতিগ্রস্ত করতে থাকে। সিলেটের হাসপাতালে ভর্তি হওয়া অনেক স্ট্রোক বা হার্ট অ্যাটাক রোগীর ইতিহাস পর্যালোচনা করে দেখা যায়, তারা দীর্ঘদিন ধরেই অনিয়ন্ত্রিত উচ্চ রক্তচাপে ভুগছিলেন কিন্তু সচেতন ছিলেন না।</p>
      
      <h2>খাদ্যে লবণ নিয়ন্ত্রণ ও জীবনযাত্রার পরিবর্তন</h2>
      <p>রক্তচাপ নিয়ন্ত্রণে সবচেয়ে বড় ভূমিকা পালন করে লবণের (সোডিয়াম) সঠিক ব্যবহার। পাতের কাঁচা লবণ খাওয়া সম্পূর্ণ পরিহার করতে হবে এবং প্রক্রিয়াজাত বা ফাস্টফুডজাতীয় লবণাক্ত খাবার এড়িয়ে চলতে হবে। পাশাপাশি দৈনিক অন্তত ৩০ মিনিট হাঁটার অভ্যাস, ওজন নিয়ন্ত্রণে রাখা এবং ধুমপান থেকে বিরত থাকা রক্তচাপ স্বাভাবিক রাখতে সহায়তা করে।</p>
      
      <h2>নিয়মিত পরীক্ষা ও চিকিৎসকের পরামর্শে ওষুধ সেবন</h2>
      <p>অনেকেই ভাবেন প্রেশার মেপে স্বাভাবিক পেলে বা শরীর ভালো লাগলেই ওষুধ বন্ধ করা যায়—এটি একটি সম্পূর্ণ ভুল ধারণা। চিকিৎসকের পরামর্শ ছাড়া হঠাৎ প্রেশারের ওষুধ বন্ধ করলে রক্তচাপ মুহূর্তেই মারাত্মক পর্যায়ে উঠে গিয়ে মস্তিষ্কে রক্তক্ষরণ (Stroke) হতে পারে। তাই নিয়মিত রক্তচাপ মেপে চিকিৎসকের পরামর্শ বজায় রাখা জরুরী।</p>
    `
  },
  {
    slug: 'thyroid-problems-bengali',
    lang: 'bn',
    title: "থাইরয়েড হরমোনের তারতম্য: হাইপোথাইরয়েডিজম ও লক্ষণসমূহের নির্ভরযোগ্য প্রতিকার",
    date: "2026-08-08",
    readTime: "৫ মিনিট পাঠ",
    category: "Endocrinology & Thyroid",
    categoryBn: "থাইরয়েড ও হরমোন",
    image: "/blogs/thyroid_health_guide.jpg",
    featured: false,
    excerpt: "থাইরয়েড গ্রন্থির হরমোন জনিত সমস্যা, অতিরিক্ত ক্লান্তি ও ওজনের তারতম্যের চিকিৎসায় বিশেষজ্ঞ পরামর্শ।",
    content: `
      <h2>থাইরয়েড গ্রন্থির ভূমিকা ও মেটাবলিজম</h2>
      <p>আমাদের গলার সামনের দিকে থাকা প্রজাপতি আকৃতির থাইরয়েড গ্রন্থিটি শরীরের পুরো মেটাবলিজম বা শক্তি উৎপাদন প্রক্রিয়া পরিচালনা করে। রক্তে থাইরয়েড হরমোনের ঘাটতি দেখা দিলে তাকে হাইপোথাইরয়েডিজম এবং আধিক্য দেখা দিলে তাকে হাইপারথাইরয়েডিজম বলা হয়।</p>
      
      <h2>লক্ষণসমূহ সনাক্তকরণ</h2>
      <p>হাইপোথাইরয়েডিজমের প্রধান লক্ষণগুলোর মধ্যে রয়েছে খাদ্যাভ্যাস অপরিবর্তিত থাকা সত্ত্বেও দ্রুত ওজন বৃদ্ধি পাওয়া, সবসময় ক্লান্তি ও অলসতা লাগা, চুল পড়া, কোষ্ঠকাঠিন্য এবং অতিরিক্ত শীত অনুভূত হওয়া। অন্যদিকে, হাইপারথাইরয়েডিজমে ওজন দ্রুত কমে যায়, বুক ধড়ফড় করে এবং অতিরিক্ত ঘাম হয়।</p>
      
      <h2>সুনির্দিষ্ট চিকিৎসা ও হরমোন ব্যালেন্স</h2>
      <p>রক্তে T3, T4 এবং TSH পরীক্ষার মাধ্যমে খুব সহজেই থাইরয়েডের সমস্যা সনাক্ত করা যায়। হাইপোথাইরয়েডিজমে প্রতিদিন সকালে খালি পেটে সুনির্দিষ্ট মাত্রায় লেভোথাইরক্সিন ওষুধ সেবন করতে হয়। নিয়মিত হরমোন লেভেল পরীক্ষার মাধ্যমে ওষুধের ডোজ এডজাস্ট করা হলে রোগী সম্পূর্ণ স্বাভাবিক ও প্রাণবন্ত জীবনযাপন করতে পারেন।</p>
    `
  },
  {
    slug: 'antibiotic-misuse-bengali',
    lang: 'bn',
    title: "অ্যান্টিবায়োটিকের অপব্যবহার ও রেজিস্ট্যান্স: অযথা ওষুধ সেবনের মারাত্মক স্বাস্থ্য ঝুঁকি",
    date: "2026-08-10",
    readTime: "৫ মিনিট পাঠ",
    category: "Rational Medicine",
    categoryBn: "সঠিক ওষুধ ও সচেতনতা",
    image: "/blogs/antibiotic_safety_guide.jpg",
    featured: false,
    excerpt: "চিকিৎসকের পরামর্শ ছাড়া অ্যান্টিবায়োটিক সেবনের ভয়াবহ পরিণতি এবং সঠিক নিয়মে ওষুধ ব্যবহারের সচেতনতামূলক তথ্য।",
    content: `
      <h2>অ্যান্টিবায়োটিক রেজিস্ট্যান্সের ভয়াবহতা</h2>
      <p>বর্তমানে আমাদের দেশে চিকিৎসকের লিখিত ব্যবস্থাপত্র ছাড়াই ফার্মেসি থেকে সরাসরি অ্যান্টিবায়োটিক কিনে খাওয়ার মারাত্মক প্রবণতা দেখা যায়। সামান্য সর্দি-জ্বর হলেই যত্রতত্র অ্যান্টিবায়োটিক সেবনের ফলে ব্যাক্টেরিয়াগুলো ঐ ওষুধের বিরুদ্ধে প্রতিরোধ ক্ষমতা গড়ে তোলে, যাকে 'অ্যান্টিবায়োটিক রেজিস্ট্যান্স' বলা হয়। এর ফলে ভবিষ্যতে সত্যিই কোনো গুরুতর ইনফেকশন হলে সাধারণ অ্যান্টিবায়োটিক আর কাজ করে না।</p>
      
      <h2>ভাইরাস জ্বরে অ্যান্টিবায়োটিকের অকার্যকারিতা</h2>
      <p>মনে রাখা অত্যন্ত জরুরী যে, অ্যান্টিবায়োটিক শুধুমাত্র ব্যাক্টেরিয়া জনিত রোগের বিরুদ্ধে কার্যকর। ভাইরাল জ্বর, ডেঙ্গু, ইনফ্লুয়েঞ্জা বা সাধারণ সর্দি-কাশিতে অ্যান্টিবায়োটিকের কোনো ভূমিকা নেই। এসব ক্ষেত্রে অ্যান্টিবায়োটিক খেলে রোগের কোনো উপকার তো হয়ই না, বরং শরীরের উপকারী ব্যাক্টেরিয়া ধ্বংস হয়ে রোগ প্রতিরোধ ক্ষমতা কমে যায়।</p>
      
      <h2>সঠিক নিয়মাবলী ও জনসচেতনতা</h2>
      <p>১. রেজিস্টার্ড চিকিৎসকের সুনির্দিষ্ট পরামর্শ ছাড়া কখনো অ্যান্টিবায়োটিক সেবন করবেন না।<br />২. চিকিৎসকের নির্দেশিত অ্যান্টিবায়োটিকের পূর্ণ কোর্স (যেমন ৫ বা ৭ দিন) অবশ্যই শেষ করুন। ২-১ দিন পর সুস্থ বোধ করলেও কোর্স অসম্পূর্ণ রেখে ওষুধ বন্ধ করবেন না।</p>
    `
  },
  {
    slug: 'migraine-neurology-bengali',
    lang: 'bn',
    title: "মাইগ্রেন ও তীব্র মাথাব্যথা: কখন একজন নিউরোলজি বিশেষজ্ঞ দেখাবেন",
    date: "2026-08-09",
    readTime: "৬ মিনিট পাঠ",
    category: "Neurology & Headache",
    categoryBn: "নিউরোলজি ও মাথাব্যথা",
    image: "/blogs/diabetes_care_guide.jpg",
    featured: false,
    excerpt: "সাধারণ মাথাব্যথা এবং মাইগ্রেনের মধ্যকার পার্থক্য সনাক্ত করুন এবং মাইগ্রেন প্রতিরোধের আধুনিক চিকিৎসা সম্পর্কে জানুন।",
    content: `
      <h2>সাধারণ মাথাব্যথা বনাম মাইগ্রেন</h2>
      <p>মাইগ্রেন একটি স্নায়বিক রোগ। এটি সাধারণ মাথাব্যথার চেয়ে আলাদা; সাধারণত মাথার একপাশে তীব্র দপদপ করা ব্যথা হয় এবং এর সাথে বমি বমি ভাব, আলো ও শব্দে অস্বস্তি দেখা দেয়।</p>
      
      <h2>মাথাব্যথার সাধারণ ট্রিগারসমূহ</h2>
      <p>অপর্যাপ্ত ঘুম, খালি পেটে থাকা, অতিরিক্ত মানসিক চাপ, রোদ এবং তীব্র আওয়াজ মাইগ্রেনের ব্যথা বাড়িয়ে দেয়। আপনার মাথাব্যথার ট্রিগারগুলি চিহ্নিত করা চিকিৎসার ক্ষেত্রে গুরুত্বপূর্ণ ভূমিকা পালন করে।</p>
      
      <h2>নিউরোলজিক্যাল চিকিৎসা</h2>
      <p>মাইগ্রেনের তীব্রতা ও ফ্রিকোয়েন্সি কমাতে প্রিভেন্টিভ বা প্রোফাইল্যাকটিক থেরাপির প্রয়োজন হয়। চিকিৎসকের পরামর্শ ছাড়া ঘন ঘন ব্যথানাশক ওষুধ খাওয়া কিডনি ও লিভারের জন্য ক্ষতিকর হতে পারে।</p>
    `
  }
];

export const faqsData = [];
export const chamberData = [];

