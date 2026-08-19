-- ==============================================================================
-- Symptoms Table & Seed Data for Dr. Hanif Ahmed Towhid Website
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================================

-- 1. Create Symptoms Table
CREATE TABLE IF NOT EXISTS public.symptoms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  title_bn VARCHAR(255) NOT NULL,
  category_en VARCHAR(255) NOT NULL,
  category_bn VARCHAR(255) NOT NULL,
  organ_en VARCHAR(255) NOT NULL,
  organ_bn VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  short_desc_en TEXT NOT NULL,
  short_desc_bn TEXT NOT NULL,
  overview_en TEXT NOT NULL,
  overview_bn TEXT NOT NULL,
  causes_en JSONB DEFAULT '[]'::jsonb,
  causes_bn JSONB DEFAULT '[]'::jsonb,
  red_flags_en JSONB DEFAULT '[]'::jsonb,
  red_flags_bn JSONB DEFAULT '[]'::jsonb,
  investigations_en JSONB DEFAULT '[]'::jsonb,
  investigations_bn JSONB DEFAULT '[]'::jsonb,
  management_en TEXT NOT NULL,
  management_bn TEXT NOT NULL,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.symptoms ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
DROP POLICY IF EXISTS "Allow public read symptoms" ON public.symptoms;
CREATE POLICY "Allow public read symptoms" ON public.symptoms FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow auth write symptoms" ON public.symptoms;
CREATE POLICY "Allow auth write symptoms" ON public.symptoms FOR ALL TO authenticated USING (true);

-- 4. Seed All 14 Detailed Symptoms (Upsert by slug)
INSERT INTO public.symptoms (
  slug, title_en, title_bn, category_en, category_bn, organ_en, organ_bn,
  image, short_desc_en, short_desc_bn, overview_en, overview_bn,
  causes_en, causes_bn, red_flags_en, red_flags_bn,
  investigations_en, investigations_bn, management_en, management_bn, order_index
)
VALUES
  (
    'fever',
    'Fever & Recurring Chills',
    'জ্বর, কাঁপুনি ও সংক্রামক ব্যাধি',
    'Infectious & Viral Diseases',
    'সংক্রামক ও ভাইরাসজনিত রোগ',
    'Immune System & Thermoregulation',
    'রোগ প্রতিরোধ ব্যবস্থা ও তাপমাত্রা নিয়ন্ত্রণ',
    '/symptoms/fever.png',
    'High body temperature, recurring chills, viral dengue or typhoid infections requiring precise diagnostic blood counts.',
    'তীব্র জ্বর, কাঁপুনি, ডেঙ্গু বা টাইফয়েডের মতো সংক্রামক ব্যাধি যা সঠিক রক্ত পরীক্ষার মাধ্যমে নির্ণয় করা হয়।',
    'Fever (pyrexia) is a cardinal physiological defense mechanism where the hypothalamic set-point is elevated in response to pyrogens released during viral, bacterial, or inflammatory triggers. In clinical general medicine, a fever is never a disease in itself, but rather a vital physiological marker signaling systemic immune activation. In regions like Sylhet with seasonal tropical exposures, acute fevers are frequently linked with Dengue NS1/IgM viremia, Enteric (Typhoid) salmonella bacteremia, urinary tract sepsis, or respiratory infections. 

Unmonitored high-grade fever can trigger rapid dehydration, severe tachycardia, metabolic acid-base shifts, and in vulnerable individuals, delirium or hemodynamic instability. A scientific clinical evaluation by an experienced Medicine Specialist involves mapping the fever pattern (continuous, remittent, or intermittent step-ladder), correlating systemic signs (rash, lymphadenopathy, hepatosplenomegaly), and executing targeted serological and hematological tests rather than indiscriminate antibiotic usage.',
    'জ্বর (Fever) হলো মানবদেহের রোগ প্রতিরোধ ব্যবস্থার একটি অতি গুরুত্বপূর্ণ সতর্কবার্তা। যখন কোনো ভাইরাস, ব্যাকটেরিয়া বা ইনফেকশন শরীরে প্রবেশ করে, তখন মস্তিষ্কের হাইপোথ্যালামাস শরীরের তাপমাত্রা বাড়িয়ে দেয় যাতে জীবাণু ধ্বংস হতে পারে। তাই মেডিসিন বিজ্ঞানে জ্বর নিজে কোনো একক রোগ নয়, বরং শরীরের ভেতরের কোনো অন্তর্নিহিত সমস্যার বহিঃপ্রকাশ। বিশেষ করে সিলেট অঞ্চলে ঋতুভিত্তিক ডেঙ্গু, টাইফয়েড (Enteric Fever), মূত্রনালীর ইনফেকশন ও শ্বাসতন্ত্রের সংক্রমণজনিত জ্বরের প্রাদুর্ভাব বেশি দেখা যায়।

জ্বরকে অবহেলা করা বা চিকিৎসকের পরামর্শ ছাড়া ঘনঘন অ্যান্টিবায়োটিক ও প্যারাসিটামল সেবন করা মারাত্মক ক্ষতিকর। দীর্ঘমেয়াদী বা বারবার ফিরে আসা জ্বর রক্তের মারাত্মক জটিলতা কিংবা অটোইমিউন রোগের লক্ষণ হতে পারে। একজন অভিজ্ঞ মেডিসিন বিশেষজ্ঞের তত্ত্বাবধানে সঠিক রক্ত পরীক্ষা (যেমন CBC, Dengue NS1/IgM, Widal/Blood Culture, SGPT) করে জ্বরের প্রকৃত উৎস শনাক্ত করে বৈজ্ঞানিক চিকিৎসা গ্রহণ করা অপরিহার্য।',
    '[{"title":"Viral Arboviral Infections","desc":"Dengue fever, Chikungunya, and seasonal influenza characterized by acute thrombocytopenia, severe retro-orbital headache, and joint pain."},{"title":"Bacterial Enteric Infections","desc":"Salmonella typhi / paratyphi causing step-ladder high fever, abdominal bloating, bradycardia, and severe lethargy."},{"title":"Urinary Tract & Renal Sepsis","desc":"Ascending E. coli pyelonephritis presenting with high fever, rigors, dysuria, and flank discomfort."},{"title":"Respiratory Tract Infections","desc":"Bacterial pneumonia, acute purulent bronchitis, and severe tonsillopharyngitis with cough and fever spikes."},{"title":"Autoimmune & Connective Tissue Diseases","desc":"Systemic Lupus Erythematosus (SLE) and adult-onset Still’s disease causing fever of unknown origin (FUO)."}]'::jsonb,
    '[{"title":"ভাইরাল ও ডেঙ্গু সংক্রমণ","desc":"ডেঙ্গু ও চিকুনগুনিয়ার মতো ভাইরাল জ্বর, যাতে প্লাটিলেট কমে যাওয়া, চোখের পেছনে ব্যথা ও তীব্র গায়ে ব্যথা দেখা দেয়।"},{"title":"টাইফয়েড ও খাদ্যনালীর ইনফেকশন","desc":"সালমোনেলা ব্যাকটেরিয়াজনিত জ্বর যা পেটে অস্বস্তি, তীব্র দুর্বলতা ও ধাপে ধাপে তাপমাত্রা বৃদ্ধির সাথে দেখা দেয়।"},{"title":"মূত্রনালীর ইনফেকশন (UTI) ও কিডনি প্রদাহ","desc":"প্রস্রাবে জ্বালাপোড়ার সাথে কাঁপুনি দিয়ে হঠাৎ তীব্র জ্বর আসা।"},{"title":"শ্বাসতন্ত্রের ব্যাকটেরিয়াল ইনফেকশন","desc":"নিউমোনিয়া বা তীব্র ব্রঙ্কাইটিস যার সাথে কাশি, বুকে কফ ও শ্বাসকষ্ট থাকে।"},{"title":"অটোইমিউন ও দীর্ঘস্থায়ী রোগ","desc":"এসএলই (SLE) বা শরীরের রোগ প্রতিরোধ ক্ষমতার অস্বাভাবিক প্রতিক্রিয়াজনিত দীর্ঘমেয়াদী অজানা জ্বর।"}]'::jsonb,
    '["High fever persisting beyond 3–4 days without responding to antipyretics.","Platelet drop, skin petechiae, gum bleeding, or black tarry stools (Dengue warning signs).","Altered sensorium, severe neck stiffness, continuous vomiting, or convulsions.","Severe respiratory distress, rapid pulse rate (>110 bpm), or extreme low blood pressure."]'::jsonb,
    '["প্যারাসিটামল সেবনের পরও জ্বর ৩-৪ দিনের বেশি স্থায়ী হওয়া বা বারবার ফিরে আসা।","শরীরে লালচে দাগ (র‍্যাশ), মাড়ি দিয়ে রক্ত পড়া বা কালো পায়খানা হওয়া (ডেঙ্গুর জরুরি লক্ষণ)।","অতিরিক্ত অস্থিরতা, প্রলাপ বকা, ঘাড় শক্ত হয়ে যাওয়া বা খিঁচুনি হওয়া।","তীব্র শ্বাসকষ্ট, পালস অস্বাভাবিক দ্রুত হওয়া বা রক্তচাপ অতিরিক্ত কমে যাওয়া।"]'::jsonb,
    '["Complete Blood Count (CBC) with Platelet count & ESR","Dengue NS1 Antigen & IgM/IgG Serology","Blood Culture & Sensitivity / Widal Titre for Enteric Fever","Urine Routine & Microscopic Examination (R/M/E) with Culture","Chest X-Ray (P/A View) & Serum CRP"]'::jsonb,
    '["কমপ্লিট ব্লাড কাউন্ট (CBC with Platelet & ESR)","ডেঙ্গু এনএস১ (NS1) অ্যান্টিজেন ও অ্যান্টিবডি পরীক্ষা","ব্লাড কালচার ও টাইফয়েড সেরোলজি","ইউরিন রুটিন ও মাইক্রোস্কোপিক পরীক্ষা (Urine R/M/E & Culture)","বুকের এক্স-রে (Chest X-Ray) ও সিআরপি (CRP)"]'::jsonb,
    'Clinical management by Dr. Hanif Towhid emphasizes immediate fluid balance resuscitation, accurate microbiological identification before targeted therapeutic intervention, avoidance of nephrotoxic NSAIDs during active viremia, and systematic inpatient/outpatient monitoring for complete hematological recovery.',
    'ডা. হানিফ আহমেদ তৌহিদ জ্বরের কারণ নির্ধারণে অযথা অপ্রয়োজনীয় অ্যান্টিবায়োটিক পরিহার করে রক্তের সঠিক রিপোর্টের ভিত্তিতে সুনির্দিষ্ট চিকিৎসাপদ্ধতি অনুসরণ করেন। পর্যাপ্ত হাইড্রেশন, রক্তের প্লাটিলেট পর্যবেক্ষণ ও সঠিক ড্রাগ সিলেকশনের মাধ্যমে রোগী দ্রুত সুস্থ হয়ে ওঠেন।',
    1
  ),
  (
    'low-back-pain',
    'Low Back Pain & Spinal Stiffness',
    'কোমর ব্যথা ও মেরুদণ্ডের সমস্যা',
    'Musculoskeletal & Spine Disorders',
    'পেশী ও মেরুদণ্ডের রোগ',
    'Lumbar Spine, Discs & Sciatic Nerve',
    'কোমর, মেরুদণ্ডের ডিস্ক ও নার্ভ',
    '/symptoms/low-back-pain.png',
    'Chronic lumbar stiffness, nerve root irritation, disc pressure or posture-induced spinal pain.',
    'দীর্ঘস্থায়ী কোমর ব্যথা, নার্ভের চাপ বা বসার ভঙ্গিমাজনিত মেরুদণ্ডের সমস্যা ও বাতব্যথা।',
    'Low back pain (lumbalgia) represents one of the most disabling musculoskeletal conditions encountered in internal medicine. It originates from mechanical stresses on the lumbar vertebrae, intervertebral disc degeneration, paraspinal muscle spasms, facet joint arthropathy, or radicular nerve root compression (Sciatica). In modern sedentary lifestyles and heavy occupational routines, prolonged improper posture accelerates degenerative disc disease (PLID), creating chronic morning stiffness and localized radiating pain.

Importantly, systemic inflammatory arthropathies such as Ankylosing Spondylitis, renal pathologies (calculi/pyelonephritis), and metabolic bone demineralization (osteoporosis) can also manifest primarily as lumbar back pain. A thorough clinical assessment distinguishes benign mechanical strain from serious neuro-compressive or inflammatory spinal disorders requiring medical intervention, posture retraining, and rational pharmacotherapy.',
    'কোমর ব্যথা (Low Back Pain) বর্তমান সময়ে কর্মজীবী ও বয়স্ক উভয়ের মাঝেই একটি অত্যন্ত সাধারণ অথচ মারাত্মক সমস্যা। দীর্ঘক্ষণ ভুল ভঙ্গিমায় বসে কাজ করা, ভারী জিনিস তোলা, মেরুদণ্ডের হাড়ের ক্ষয় (Lumbar Spondylosis) কিংবা ডিস্ক সরে গিয়ে নার্ভে চাপ লাগা (PLID / Sciatica)-র কারণে কোমরে তীব্র ব্যথা অনুভূত হয়। অনেক সময় এই ব্যথা কোমর থেকে নিতম্ব ও পায়ের পাতা পর্যন্ত ছড়িয়ে যায়।

কোমর ব্যথা শুধু পেশির টান নয়; এটি কিডনিতে পাথর, বাতজনিত প্রদাহ (যেমন Ankylosing Spondylitis) কিংবা হাড়ের ক্যালসিয়াম কমে যাওয়ার (Osteoporosis) লক্ষণও হতে পারে। দীর্ঘমেয়াদে পেইনকিলার খাওয়া কিডনির জন্য বিপজ্জনক। ডা. হানিফ তৌহিদ মেরুদণ্ডের সঠিক ডায়াগনোসিস করে ব্যথানাশক ওষুধের অপব্যবহার ছাড়াই বিজ্ঞানসম্মত চিকিৎসা ও রিহ্যাবিলিটেশন পরামর্শ প্রদান করেন।',
    '[{"title":"Prolapsed Lumbar Intervertebral Disc (PLID)","desc":"Disc herniation compressing the L4-L5 or L5-S1 sciatic nerve roots, causing sharp radiating shooting leg pain."},{"title":"Lumbar Spondylosis & Osteoarthritis","desc":"Age-related degenerative wear of lumbar vertebrae with osteophyte formation and reduced intervertebral space."},{"title":"Musculoligamentous Strain & Poor Posture","desc":"Continuous desk work, lack of lumbar support, and sudden heavy lifting causing severe myofascial spasms."},{"title":"Inflammatory Spondyloarthritis","desc":"Ankylosing spondylitis causing severe early morning spinal stiffness relieved by exercise in young adults."},{"title":"Renal Calculi & Osteoporotic Fractures","desc":"Referred kidney flank pain or silent vertebral micro-fractures in elderly postmenopausal individuals."}]'::jsonb,
    '[{"title":"ডিস্ক প্রোল্যাপস ও নার্ভে চাপ (PLID / সায়াটিকা)","desc":"মেরুদণ্ডের ডিস্ক সরে গিয়ে নার্ভের গোড়ায় চাপ তৈরি করায় কোমর থেকে পা পর্যন্ত তীব্র অবশ ভাব বা ঝিনঝিন করা।"},{"title":"লাম্বার স্পন্ডিলাইটিস ও হাড়ের ক্ষয়","desc":"বয়সজনিত কারণে কোমরের হাড়ের জয়েন্ট ক্ষয় হয়ে হাড়ের প্রান্তভাগ অসমান হয়ে যাওয়া।"},{"title":"পেশির টান ও ভুল ভঙ্গিমায় বসা","desc":"ঘণ্টার পর ঘণ্টা ঝুঁকে বসে কাজ করা বা হঠাৎ ভারী ওজন তোলার কারণে কোমরের লিগামেন্ট ও পেশিতে তীব্র টান লাগা।"},{"title":"বাতজনিত প্রদাহ (Ankylosing Spondylitis)","desc":"তরুণ বয়সে সকালে ঘুম থেকে ওঠার পর কোমরে তীব্র শক্ত ভাব ও অনড়তা যা চলাফেরা করলে কিছুটা কমে।"},{"title":"কিডনিতে পাথর ও অস্টিওপোরোসিস","desc":"কিডনির পাথরজনিত ব্যথা কোমরে ছড়িয়ে পড়া অথবা হাড়ের ঘনত্ব কমে গিয়ে মাইক্রো-ফ্র্যাকচার তৈরি হওয়া।"}]'::jsonb,
    '["Loss of bladder or bowel control, or progressive numbness in the saddle/groin area (Cauda Equina Syndrome).","Progressive muscle weakness in the leg causing foot drop or inability to walk on heels/toes.","Unexplained weight loss, history of malignancy, or back pain accompanied by fever.","Severe intractable nocturnal back pain that wakes the patient from sound sleep."]'::jsonb,
    '["প্রস্রাব বা পায়খানার নিয়ন্ত্রণ হারিয়ে ফেলা অথবা উরুর ভেতরের অংশে অবশ ভাব হওয়া (Cauda Equina Syndrome)।","পায়ে শক্তি না পাওয়া, হাঁটতে গিয়ে পা আটকে যাওয়া বা পায়ের পাতা অবশ হয়ে ঝুলে পড়া (Foot Drop)।","কোমর ব্যথার সাথে শরীরের ওজন দ্রুত কমে যাওয়া কিংবা কাঁপুনি দিয়ে জ্বর আসা।","রাতে ঘুমানোর সময় ব্যথার তীব্রতায় ঘুম ভেঙে যাওয়া বা ব্যথানাশক ঔষধেও কোনো আরাম না পাওয়া।"]'::jsonb,
    '["Digital X-Ray of Lumbo-Sacral Spine (A/P & Lateral Views with flexion/extension)","High-Resolution MRI of Lumbar Spine (T1/T2 weighted sequences)","Serum Calcium, Vitamin D3 & Bone Mineral Density (BMD / DEXA scan)","HLA-B27 & Serum ESR / CRP for Spondyloarthropathy screening","Ultrasonography of Kidneys & Urinary Bladder (USG of KUB)"]'::jsonb,
    '["মেরুদণ্ডের ডিজিটাল এক্স-রে (L/S Spine X-Ray)","কোমরের উচ্চ রেজোলিউশনের এমআরআই (MRI of Lumbo-Sacral Spine)","রক্তের ক্যালসিয়াম, ভিটামিন ডি৩ (Vitamin D3) ও হাড়ের ক্ষয়ের মাত্রা (DEXA Scan)","বাত রোগের জন্য এইচএলএ-বি২৭ (HLA-B27) ও সিআরপি (CRP)","কিডনির আল্ট্রাসনোগ্রাম (USG of KUB)"]'::jsonb,
    'Therapy combines structured biomechanical posture correction, targeted neuro-modulators rather than chronic renal-toxic NSAIDs, therapeutic core muscle stabilization, calcium-vitamin D optimization, and selective ergonomic lifestyle remodeling under Dr. Hanif’s continuous clinical supervision.',
    'কোমর ব্যথায় নির্বিচারে ব্যথানাশক ওষুধ সেবন না করে মেরুদণ্ডের পেশি শক্ত করার বিশেষ ব্যায়াম, সঠিক ভঙ্গিমা বজায় রাখা, নার্ভের যত্ন ও ভিটামিন ডি অপ্টিমাইজেশনের মাধ্যমে দীর্ঘস্থায়ী উপশম নিশ্চিত করা হয়।',
    2
  ),
  (
    'knee-pain',
    'Knee Pain & Joint Arthritis',
    'হাঁটু ব্যথা, বাত ও অস্থিসন্ধির প্রদাহ',
    'Rheumatology & Joint Disorders',
    'বাত, হাড় ও অস্থিসন্ধির রোগ',
    'Synovial Joint, Cartilage & Meniscus',
    'হাঁটুর অস্থিসন্ধি, তরুণাস্থি ও সাইনোভিয়াল মেমব্রেন',
    '/symptoms/knee-pain.png',
    'Osteoarthritis, uric acid / gout deposition, cartilage wear-and-tear or difficulty walking and climbing stairs.',
    'হাঁটুতে প্রদাহ, ইউরিক এসিডের আধিক্য, অস্টিওআর্থ্রাইটিস বা সিঁড়ি ওঠানামায় তীব্র যন্ত্রণা।',
    'Knee pain (arthralgia of the knee) is a major contributor to mobility limitation, especially among mature adults, overweight individuals, and patients with metabolic syndrome. The knee joint bears significant biomechanical loads, making its articular cartilage, synovial membrane, cruciate ligaments, and menisci susceptible to chronic degeneration. In primary Osteoarthritis (OA), cartilage attrition leads to joint space narrowing, subchondral sclerosis, and painful friction during weight-bearing activities such as walking, squatting, or descending stairs.

Furthermore, metabolic crystal deposition diseases like Gout (monosodium urate crystallization) and autoimmune inflammatory conditions such as Rheumatoid Arthritis (RA) or Seronegative Spondyloarthritis frequently present as acute hot swollen knee synovitis. Accurate clinical medicine differentiation prevents irreversible cartilage loss and averts systemic complications.',
    'হাঁটু ব্যথা (Knee Pain) দৈনন্দিন চলাফেরা ও ওঠাবসায় তীব্র বাধার সৃষ্টি করে। বিশেষ করে বয়স বৃদ্ধি, অতিরিক্ত ওজন, কিংবা রক্তে ইউরিক এসিডের মাত্রা বেড়ে গেলে হাঁটুর ভেতরের পিচ্ছিল ফ্লুইড (Synovial Fluid) ও তরুণাস্থি (Cartilage) শুকিয়ে ক্ষয় হতে শুরু করে। এর ফলে হাড়ের সাথে হাড়ের ঘর্ষণ লেগে প্রচণ্ড ব্যথা, কটকট শব্দ ও হাঁটু ফুলে যাওয়ার মতো সমস্যা দেখা দেয়।

এছাড়াও ইউরিক এসিড জমা হয়ে গেঁটেবাত (Gout) কিংবা রিউমাটয়েড আর্থ্রাইটিস (Rheumatoid Arthritis)-এর কারণেও হাঁটু লাল হয়ে ফুলে প্রচণ্ড যন্ত্রণা হতে পারে। অনেকে হাঁটু ব্যথায় দিনের পর দিন ব্যথানাশক ট্যাবলেট খান, যা গ্যাস্ট্রিক আলসার ও কিডনি ড্যামেজের প্রধান কারণ। ডা. হানিফ তৌহিদ বাত ব্যথার সঠিক কারণ শনাক্ত করে পার্শ্বপ্রতিক্রিয়ামুক্ত কার্যকর চিকিৎসা প্রদান করেন।',
    '[{"title":"Osteoarthritis (Degenerative Knee Disease)","desc":"Progressive breakdown of knee joint hyaline cartilage with subchondral bone remodeling, common after age 45."},{"title":"Gouty Arthritis (Hyperuricemia)","desc":"Acute intensely painful crystal-induced monoarthritis caused by elevated serum uric acid levels depositing in the knee joint."},{"title":"Rheumatoid Arthritis (RA)","desc":"Autoimmune systemic inflammatory synovitis causing symmetrical morning stiffness, warmth, and joint swelling."},{"title":"Meniscal Tear & Ligamentous Sprain","desc":"Mechanical twisting injuries or chronic micro-trauma leading to joint locking and giving-way sensation."},{"title":"Septic Arthritis / Reactive Synovitis","desc":"Bacterial infection within the joint space requiring emergent aspiration and targeted antimicrobial treatment."}]'::jsonb,
    '[{"title":"অস্টিওআর্থ্রাইটিস (হাঁটুর তরুণাস্থি ক্ষয়)","desc":"বয়সের সাথে সাথে হাঁটুর জয়েন্টের কার্টিলেজ বা তরুণাস্থি ক্ষয় হয়ে চলাফেরার সময় খচখচ বা কটকট শব্দ হওয়া ও ব্যথা বাড়া।"},{"title":"গেঁটেবাত বা গাউট (Uric Acid)","desc":"রক্তে ইউরিক এসিডের আধিক্যের ফলে হাঁটুর জয়েন্টে সুচের মতো ক্রিস্টাল জমা হয়ে হঠাৎ তীব্র ব্যথা ও লালচে ফোলা সৃষ্টি হওয়া।"},{"title":"রিউমাটয়েড আর্থ্রাইটিস (আমবাত)","desc":"শরীরের নিজস্ব ইমিউন সিস্টেমের বিভ্রান্তিকর আক্রমণের ফলে হাঁটুর সাইনোভিয়াল পর্দায় তীব্র প্রদাহ ও সকালে ঘুম থেকে উঠলে হাঁটু জমে থাকা।"},{"title":"মেনিসকাস বা লিগামেন্ট ইনজুরি","desc":"অসাবধানতাবশত হাঁটুতে মোচড় লাগা বা ক্ষয়ের কারণে হাঁটু লক হয়ে আটকে যাওয়ার অনুভূতি হওয়া।"},{"title":"ইনফেকশনজনিত জয়েন্ট ফোলা (Septic Arthritis)","desc":"জয়েন্টের ভেতর ব্যাকটেরিয়াল ইনফেকশনের কারণে উচ্চ জ্বরের সাথে হাঁটু অস্বাভাবিক গরম ও ফুলে যাওয়া।"}]'::jsonb,
    '["Inability to bear any weight on the affected knee or sudden joint locking/inability to bend or straighten.","Marked swelling with local redness, burning heat, and high fever (indicative of acute septic arthritis).","Rapidly spreading redness, calf tenderness, and swelling (ruling out deep vein thrombosis / DVT).","Joint deformity with visible bowing or significant knee effusion."]'::jsonb,
    '["হাঁটুতে কোনোভাবেই ভর দিয়ে দাঁড়াতে বা হাঁটতে না পারা এবং হাঁটু পুরোপুরি সোজা বা ভাঁজ করতে না পারা।","হাঁটু অতিরিক্ত ফুলে লাল হয়ে যাওয়া, হাত দিলে গরম লাগা এবং সাথে তীব্র জ্বর থাকা (ইনফেকশনের লক্ষণ)।","হাঁটুর পেছনের মাংসপেশি (Calf) ফুলে যাওয়া ও তীব্র ব্যথা হওয়া (রক্তনালীতে রক্ত জমাট বাঁধার ঝুঁকি)।","হাঁটুর হাড়ের দৃশ্যমান বাঁকানো আকৃতি বা জয়েন্টের মারাত্মক বিকৃতি।"]'::jsonb,
    '["Digital Weight-Bearing X-Ray of Both Knee Joints (A/P & Lateral Views)","Serum Uric Acid level (fasting)","Rheumatoid Factor (RA/RF) & Anti-CCP Antibody","Synovial Fluid Analysis & Polarized Microscopy (when effusion is present)","Serum ESR, CRP & Complete Blood Count"]'::jsonb,
    '["দাঁড়ানো অবস্থায় উভয় হাঁটুর ডিজিটাল এক্স-রে (Weight-bearing X-Ray)","রক্তে ইউরিক এসিডের মাত্রা (Serum Uric Acid)","রিউমাটয়েড ফ্যাক্টর (RA Factor) ও অ্যান্টি-সিসিপি (Anti-CCP)","হাঁটুর ফ্লুইড পরীক্ষা (Synovial Fluid Analysis) প্রয়োজন হলে","রক্তের সিআরপি (CRP), ইএসআর (ESR) ও সিবিসি (CBC)"]'::jsonb,
    'Dr. Hanif Towhid advocates a comprehensive rheumatologic strategy integrating uric acid control, chondro-protective supplements, weight management, quadriceps strengthening, targeted anti-inflammatory modulation, and intra-articular interventions when clinically indicated.',
    'ডা. হানিফ তৌহিদ হাঁটুর চিকিৎসায় শরীরের ওজন নিয়ন্ত্রণ, কোয়াড্রিসেপস পেশির ব্যায়াম, ইউরিক এসিড কমানোর খাদ্যাভ্যাস এবং আধুনিক রিউমাটোলজিক্যাল ওষুধের মাধ্যমে ব্যথাহীন সক্রিয় জীবনের নিশ্চয়তা দেন।',
    3
  ),
  (
    'fatigue',
    'Fatigue & Chronic Exhaustion',
    'শরীর ম্যাজম্যাজ করা বা অতিরিক্ত দুর্বল লাগা (ক্লান্তি ভাব)',
    'Metabolic, Endocrine & Hematology',
    'মেটাবলিক, হরমোন ও রক্তরোগ',
    'Cellular Metabolism, Thyroid & Hemoglobin',
    'সেলুলার শক্তি, থাইরয়েড ও হিমোগ্লোবিন',
    '/symptoms/fatigue.png',
    'Unexplained chronic exhaustion, uncontrolled diabetes, severe anemia, or thyroid hormone deficiency.',
    'অস্বাভাবিক দুর্বলতা, অনিয়ন্ত্রিত ব্লাড সুগার, রক্তস্বল্পতা বা থাইরয়েড হরমোনের ভারসাম্যহীনতা।',
    'Chronic fatigue (asthenia) is one of the most frequent clinical presentations in outpatient internal medicine, characterized by persistent overwhelming weariness unrelieved by normal rest. Far from being merely psychological, unremitting fatigue is a systemic red flag pointing toward cellular energy deprivation, endocrine dysfunction, chronic occult blood loss, or subclinical metabolic failure.

In clinical practice, uncontrolled Type 2 Diabetes Mellitus with cellular glucose starvation, Hypothyroidism (underactive thyroid slowing basal metabolic rate), severe Iron-Deficiency Anemia, chronic kidney insufficiency, and Vitamin D3/B12 deficiencies are the primary culprits. Dr. Hanif Towhid performs detailed biochemical screening to trace the exact root cause rather than offering non-specific multivitamin regimens.',
    'শরীর সবসময় ম্যাজম্যাজ করা, ঘুম থেকে ওঠার পরও ক্লান্তি না যাওয়া, সামান্য কাজেই হাঁপিয়ে ওঠা বা শক্তি না পাওয়ার সমস্যাকে মেডিসিনের ভাষায় ‘Chronic Fatigue’ বলা হয়। অনেকেই এই দুর্বলতাকে সাধারণ আলসেমি বা মানসিক ক্লান্তি মনে করে না বুঝে একের পর এক ভিটামিন বা স্যালাইন গ্রহণ করেন, যা মোটেও সঠিক নয়।

মেডিসিন বিশেষজ্ঞদের মতে, শরীরের ভেতরে লুকায়িত ডায়াবেটিস, থাইরয়েড হরমোনের ঘাটতি (Hypothyroidism), রক্তস্বল্পতা (Anemia), ভিটামিন ডি ও বি১২-এর অভাব, কিংবা লিভার ও কিডনির কার্যক্ষমতা কমে যাওয়ার প্রথম লক্ষণই হলো এই অতিরিক্ত ক্লান্তি ভাব। সঠিক রক্ত পরীক্ষার মাধ্যমে রোগটির শিকড় শনাক্ত করে সময়মতো চিকিৎসা নিলে সম্পূর্ণ সতেজ ও কর্মচঞ্চল জীবনে ফিরে আসা সম্ভব।',
    '[{"title":"Undiagnosed or Uncontrolled Diabetes","desc":"Impaired glucose uptake starving somatic cells of ATP energy despite elevated blood sugar levels."},{"title":"Hypothyroidism (Underactive Thyroid)","desc":"Deficient T3/T4 hormone levels dampening cellular metabolic rate, causing cold intolerance, weight gain, and sluggishness."},{"title":"Severe Iron Deficiency Anemia","desc":"Depleted hemoglobin failing to transport adequate oxygen to vital organs and peripheral muscular tissues."},{"title":"Chronic Kidney or Hepatic Dysmetabolism","desc":"Accumulation of uremic toxins or metabolic sub-products suppressing central neurological alertness."},{"title":"Electrolyte & Micronutrient Depletion","desc":"Severe Vitamin D3 deficiency, Vitamin B12 neuropathy, or chronic hypokalemia/hyponatremia."}]'::jsonb,
    '[{"title":"অনিয়ন্ত্রিত ব্লাড সুগার বা ডায়াবেটিস","desc":"রক্তে গ্লুকোজ বেশি থাকা সত্ত্বেও ইনসুলিনের অভাবে কোষে শক্তি পৌঁছাতে না পেরে শরীর চরম দুর্বল হয়ে পড়ে।"},{"title":"থাইরয়েড হরমোনের ঘাটতি (হাইপোথাইরয়েডিজম)","desc":"টিএসএইচ (TSH) বৃদ্ধি এবং থাইরক্সিনের অভাবে শরীরের মেটাবলিজম মন্থর হয়ে গিয়ে ক্লান্তি ও ওজন বাড়ে।"},{"title":"রক্তস্বল্পতা বা অ্যানিমিয়া (Anemia)","desc":"রক্তে হিমোগ্লোবিন কমে যাওয়ায় কোষে অক্সিজেন পৌঁছাতে পারে না, ফলে সামান্য কাজেই মাথা ঘোরা ও ক্লান্তি আসে।"},{"title":"কিডনি বা লিভারের কার্যক্ষমতা হ্রাস","desc":"শরীরে টক্সিন বা বর্জ্য পদার্থ জমতে শুরু করলে সবসময় ঘুম ঘুম ভাব ও অলসতা অনুভূত হয়।"},{"title":"ভিটামিন ডি ও বি১২-এর মারাত্মক অভাব","desc":"হাড় ও পেশির শক্তি হ্রাস এবং স্নায়বিক অবসাদজনিত সার্বিক দুর্বলতা।"}]'::jsonb,
    '["Unexplained rapid involuntary weight loss (>5% body weight in a month) accompanied by night sweats.","Profuse breathlessness upon mild ordinary walking, pale conjunctiva, and rapid resting pulse (>100 bpm).","Yellowing of eyes/skin (jaundice), abdominal swelling, or dark tea-colored urine.","Extreme muscle weakness making it impossible to lift arms above shoulders or stand from a chair."]'::jsonb,
    '["খাদ্যাভ্যাস পরিবর্তন ছাড়াই শরীরের ওজন দ্রুত হ্রাস পাওয়া এবং রাতে অতিরিক্ত ঘাম হওয়া।","সামান্য হাঁটলেই প্রচণ্ড বুক ধড়ফড় করা, শ্বাসকষ্ট হওয়া এবং চোখ ও জিহ্বা ফ্যাকাশে হয়ে যাওয়া।","চোখ ও প্রস্রাব হলুদ হওয়া (জন্ডিস), পেটে পানি আসা বা পা ফুলে যাওয়া।","চেয়ার থেকে নিজে নিজে উঠতে না পারা বা হাত ও পায়ের পেশির শক্তি মারাত্মক কমে যাওয়া।"]'::jsonb,
    '["Fasting Blood Sugar (FBS), 2-Hour Postprandial Glucose (2HABF) & HbA1c","Complete Blood Count (CBC with Peripheral Blood Film - PBF)","Thyroid Profile (Serum TSH, Free T4, Free T3)","Serum Ferritin, Iron Profile, Vitamin D3 & Vitamin B12","Serum Creatinine, eGFR, Liver Function Tests (SGPT, Bilirubin, Albumin)"]'::jsonb,
    '["ফাস্টিং ব্লাড সুগার, খাবার ২ ঘণ্টা পর গ্লুকোজ ও এইচবিএওয়ানসি (HbA1c)","রক্তের সিবিসি ও পেরিফেরাল ব্লাড ফিল্ম (CBC with PBF)","থাইরয়েড হরমোন টেস্ট (Serum TSH, FT4)","সিরাম ফেরিটিন (আয়রন প্রোফাইল) ও ভিটামিন ডি৩ / বি১২ লেভেল","কিডনি পরীক্ষা (Serum Creatinine) ও লিভার ফাংশন টেস্ট (SGPT)"]'::jsonb,
    'Dr. Hanif Towhid conducts a systematic endocrine-metabolic panel to rectify cellular nutritional deficiencies, normalize glycemic control, balance thyroid feedback loops, and restore baseline vitality through targeted evidence-based medical regimens.',
    'ডা. হানিফ আহমেদ তৌহিদ ক্লান্তির মূল কারণ বিশ্লেষণ করে ডায়াবেটিস নিয়ন্ত্রণ, থাইরয়েড রিপ্লেসমেন্ট এবং সুনির্দিষ্ট মাইক্রোনিউট্রিয়েন্ট থেরাপির মাধ্যমে রোগীকে পুনরায় সতেজ ও কর্মক্ষম করে তোলেন।',
    4
  ),
  (
    'headache',
    'Headache & Migraine Syndromes',
    'মাথা ব্যথা, মাইগ্রেন ও উচ্চ রক্তচাপ',
    'Neurological & Vascular Medicine',
    'স্নায়ুতন্ত্র ও রক্তনালীর রোগ',
    'Cranial Nerves, Cerebral Vessels & Meninges',
    'মস্তিষ্ক, রক্তনালী ও স্নায়ুতন্ত্র',
    '/symptoms/headache.png',
    'Tension headaches, uncontrolled high blood pressure spikes, migraine or sinusitis complications.',
    'মাইগ্রেন, হঠাৎ উচ্চ রক্তচাপ বৃদ্ধি, দুশ্চিন্তাজনিত মাথাব্যথা বা সাইনাসের প্রদাহ।',
    'Headache (cephalalgia) is a critical presenting symptom with causes ranging from benign primary headache disorders (Tension-Type Headache, Migraine with/without aura, Cluster headache) to life-threatening secondary cranial emergencies (Hypertensive Crisis, Subarachnoid Hemorrhage, Meningitis, Intracranial Mass Lesions). 

In internal medicine, sudden severe headache attacks are frequently provoked by malignant blood pressure surges, cervical spondylosis compressing occipital nerves, chronic refractory sinusitis, or sleep apnea. A structured clinical history focusing on pain topography (unilateral throbbing vs. band-like constriction), onset speed, photophobia/phonophobia, and neurological red flags enables accurate stratification and targeted therapeutic intervention.',
    'মাথা ব্যথা (Headache) একটি অত্যন্ত প্রচলিত অথচ অবহেলার অযোগ্য লক্ষণ। মাথার একপাশে দপদপ করা মাইগ্রেন (Migraine), অতিরিক্ত দুশ্চিন্তা ও মানসিক চাপজনিত টেনশন হেডেক, কিংবা কপাল ও চোখের চারপাশে ভারী লাগা সাইনোসাইটিসের কারণে মাথা ব্যথা হতে পারে।

তবে সবচেয়ে বিপজ্জনক হলো হঠাৎ অনিয়ন্ত্রিত উচ্চ রক্তচাপ (High Blood Pressure) বেড়ে গিয়ে মাথার পেছনে তীব্র ব্যথা হওয়া। এছাড়া মস্তিষ্কে রক্তক্ষরণ (Stroke), মেনিনজাইটিস কিংবা ব্রেন টিউমারের প্রথম সতর্কবার্তা হতে পারে তীব্র মাথাব্যথা। ঘনঘন প্যারাসিটামল বা পেইনকিলার খাওয়া সাময়িক উপশম দিলেও কিডনির ক্ষতি করে। ডা. হানিফ তৌহিদ মাথাব্যথার সঠিক টাইপ ও রক্তচাপ মনিটর করে দীর্ঘমেয়াদী নিরাময় পরিকল্পনা তৈরি করেন।',
    '[{"title":"Migraine with/without Aura","desc":"Neurovascular dysfunction causing unilateral throbbing headache, nausea, vomiting, photophobia, and visual scotomas."},{"title":"Hypertensive Encephalopathy / Crisis","desc":"Severe sudden elevation in systemic arterial blood pressure manifesting as occipital throbbing head pain."},{"title":"Tension-Type Headache (TTH)","desc":"Bilateral tight band-like cranial constriction triggered by muscle contraction, stress, and eye strain."},{"title":"Chronic Sinusitis & Refractive Errors","desc":"Facial fullness, frontal brow tenderness, and purulent nasal discharge exacerbated by bending forward."},{"title":"Secondary Intracranial Pathology","desc":"Meningeal inflammation, subarachnoid bleed (thunderclap headache), or space-occupying lesions."}]'::jsonb,
    '[{"title":"মাইগ্রেন (Migraine)","desc":"মাথার যেকোনো একপাশে তীব্র দপদপানি ব্যথা, চোখের সামনে আলো সহ্য না হওয়া ও বমি বমি ভাব।"},{"title":"উচ্চ রক্তচাপ বা হাইপারটেনশন","desc":"রক্তচাপ মারাত্মক বেড়ে যাওয়ার কারণে মাথার পেছন দিকে ভারী লাগা ও তীব্র চাপ অনুভূত হওয়া।"},{"title":"টেনশন হেডেক (Tension Headache)","desc":"মাথার চারপাশ দিয়ে যেন শক্ত ফিতা দিয়ে বেঁধে রাখা হয়েছে এমন একঘেয়ে চাপযুক্ত ব্যথা।"},{"title":"সাইনোসাইটিস ও চোখের সমস্যা","desc":"কপাল ও চোখের চারপাশে ভারী লাগা, নাক বন্ধ থাকা এবং মাথা নিচু করলে ব্যথা বেড়ে যাওয়া।"},{"title":"মস্তিষ্কের জটিল সমস্যা ও রক্তক্ষরণ","desc":"হঠাৎ বিদ্যুতের চমকের মতো প্রচণ্ড তীব্র মাথাব্যথা (Thunderclap Headache) বা মেনিনজাইটিস।"}]'::jsonb,
    '["Sudden \"Worst headache of my life\" developing within seconds (Thunderclap onset).","Headache accompanied by high fever, neck stiffness, confusion, or altered mental status.","New onset headache with focal neurological deficits: facial droop, limb weakness, or slurred speech.","Headache worsening progressively upon coughing, straining, or bending forward, or associated with papilledema."]'::jsonb,
    '["জীবনে কখনো হয়নি এমন হঠাৎ বজ্রপাতের মতো তীব্র মাথা ব্যথা অনুভূত হওয়া (স্ট্রোকের পূর্বলক্ষণ)।","মাথাব্যথার সাথে তীব্র জ্বর, ঘাড় শক্ত হয়ে যাওয়া বা অসংলগ্ন কথাবার্তা বলা।","মুখের একপাশ বেঁকে যাওয়া, হাত-পা অবশ হয়ে যাওয়া বা কথা জড়িয়ে যাওয়া।","কাশি দিলে বা মাথা নিচু করলে ব্যথার তীব্রতা মারাত্মক বেড়ে যাওয়া ও চোখে ঝাপসা দেখা।"]'::jsonb,
    '["24-Hour Ambulatory Blood Pressure Monitoring (ABPM)","Non-Contrast CT Scan of Brain or Brain MRI with MR-Angiography","Digital X-Ray / CT of Paranasal Sinuses (PNS Views)","Fundoscopic Eye Examination for Papilledema","Serum Electrolytes & Inflammatory Markers (ESR / CRP)"]'::jsonb,
    '["২৪ ঘণ্টার ব্লাড প্রেশার মনিটরিং ও নিয়মিত চার্টিং","মস্তিষ্কের সিটি স্ক্যান (CT Brain) বা এমআরআই (MRI Brain)","সাইনোসাইটিসের জন্য এক্স-রে বা সিটি স্ক্যান (PNS)","চোখের পেছনের প্রেশার দেখার জন্য ফান্ডোস্কোপি (Fundoscopy)","রক্তের ইএসআর (ESR) ও প্রয়োজনীয় ল্যাব টেস্ট"]'::jsonb,
    'Dr. Hanif Towhid implements individual prophylactic migraine modulation, rational anti-hypertensive titration, lifestyle and sleep hygiene counseling, and prompt neurological exclusion of vascular emergencies.',
    'ডা. হানিফ তৌহিদ রক্তচাপের সঠিক নিয়ন্ত্রণ, মাইগ্রেন প্রতিরোধক আধুনিক ওষুধ এবং সঠিক জীবনযাত্রা নির্দেশনার মাধ্যমে ঘনঘন মাথা ব্যথার স্থায়ী সমাধানের ব্যবস্থা করেন।',
    5
  ),
  (
    'restlessness',
    'Restlessness, Agitation & Tremors',
    'অস্থিরতা লাগা, ছটফটানি ও হাত কাঁপুনি',
    'Autonomic, Thyroid & Neuro-Psychological',
    'হরমোন, স্নায়ু ও অটোমেটিক নার্ভাস সিস্টেম',
    'Thyroid Gland, Sympathetic Nervous System',
    'থাইরয়েড গ্রন্থি ও স্নায়ুতন্ত্র',
    '/symptoms/restlessness.png',
    'Hyperthyroidism, electrolyte imbalance, sleep disruption or systemic metabolic agitation.',
    'হাইপারথাইরয়েডিজম (থাইরয়েডের আধিক্য), শরীরে লবণের ভারসাম্যহীনতা বা ঘুমের জটিলতা।',
    'Psychomotor restlessness, internal tremors, and autonomic agitation represent excessive sympathetic tone triggered by endocrine or neurochemical dysregulation. In internal medicine, sudden onset of restlessness where the patient feels unable to sit still, experiences fine hand tremors, profuse sweating, heat intolerance, and insomnia, strongly points toward Hyperthyroidism (Thyrotoxicosis / Graves’ Disease).

In addition, profound electrolyte disturbances (hyponatremia, hypomagnesemia), severe anxiety somatization, hypoglycemic episodes, drug withdrawal, and cardiac arrhythmias can induce acute systemic agitation. Dr. Hanif Towhid performs detailed endocrine assays and autonomic evaluations to identify the underlying physiological trigger.',
    'বুকের ভেতর সবসময় একটা অস্থিরতা বা ছটফটানি লাগা, বসে থাকতে না পারা, হাত কাঁপা এবং অতিরিক্ত ঘাম হওয়া কেবল মানসিক সমস্যা নয়; এটি একটি গুরুত্বপূর্ণ শারীরিক হরমোনাল রোগের সংকেত। মেডিসিন বিশেষজ্ঞদের মতে, থাইরয়েড গ্রন্থি যখন অতিরিক্ত মাত্রায় হরমোন তৈরি করতে শুরু করে (Hyperthyroidism), তখন শরীরের বিপাক প্রক্রিয়া অস্বাভাবিক দ্রুত হয়ে যায়। এর ফলে তীব্র গরম লাগা, ওজন হ্রাস, বুক ধড়ফড় ও অস্থিরতা দেখা দেয়।

এছাড়াও রক্তে লবণের তারতম্য (Electrolyte Imbalance), রক্তে সুগার কমে যাওয়া (Hypoglycemia), কিংবা অনিদ্রা ও স্নায়বিক উদ্বেগের কারণেও এমন হতে পারে। হরমোন ও রক্তের সঠিক ডায়াগনোসিস করে চিকিৎসা নিলে এই অস্থিরতা সম্পূর্ণ দূর করা সম্ভব।',
    '[{"title":"Hyperthyroidism / Thyrotoxicosis","desc":"Overactive thyroid gland releasing excess T3/T4 hormones, driving hypermetabolism, tremors, and heat intolerance."},{"title":"Electrolyte Dysbalance (Hyponatremia/Hypokalemia)","desc":"Disturbances in serum sodium, potassium, or calcium levels causing neuromuscular irritability and agitation."},{"title":"Hypoglycemic Surges","desc":"Sudden drops in blood glucose triggering acute adrenergic surges with tremors, diaphoresis, and inner panic."},{"title":"Generalized Anxiety & Autonomic Dysfunction","desc":"Chronic hyperadrenergic sympathetic outflow producing psychomotor tension and restlessness."},{"title":"Caffeine / Substance / Medication Effects","desc":"Excessive stimulants, beta-agonist inhaler overuse, or abrupt drug withdrawal syndromes."}]'::jsonb,
    '[{"title":"থাইরয়েডের আধিক্য (Hyperthyroidism)","desc":"থাইরয়েড থেকে অতিরিক্ত হরমোন বের হওয়ার ফলে বুক ধড়ফড় করা, হাত কাঁপা, গরমে অস্থির হওয়া ও দ্রুত ওজন কমা।"},{"title":"শরীরে লবণের ভারসাম্যহীনতা (Electrolyte Imbalance)","desc":"রক্তে সোডিয়াম বা পটাশিয়ামের মাত্রা কমে গেলে স্নায়ু ও মাংসপেশিতে তীব্র অস্থিরতা ও ছটফটানি শুরু হয়।"},{"title":"রক্তে সুগার কমে যাওয়া (Hypoglycemia)","desc":"ডায়াবেটিসের ওষুধ বা খাবারের অনিয়মে সুগার হঠাৎ নেমে গেলে প্রচণ্ড ঘাম ও শরীর কাঁপতে থাকে।"},{"title":"মানসিক উদ্বেগ ও অটোনমিক নার্ভাস সিস্টেমের সমস্যা","desc":"অতিরিক্ত দুশ্চিন্তায় ব্রেনের অ্যাড্রেনালিন হরমোন বেড়ে গিয়ে ভেতরে এক ধরণের অস্থিরতা কাজ করে।"},{"title":"অতিরিক্ত চা-কফি বা ওষুধের প্রতিক্রিয়া","desc":"অতিরিক্ত ক্যাফেইন গ্রহণ কিংবা অ্যাজমার ইনহেলারের অতিরিক্ত ব্যবহারের পার্শ্বপ্রতিক্রিয়া।"}]'::jsonb,
    '["High fever, severe delirium, extreme tachycardia (>140 bpm), and jaundice (Thyroid Storm).","Severe mental confusion, seizures, or unresponsiveness indicating critical hyponatremia.","Irregular pulse (Atrial Fibrillation) accompanied by acute dizziness or collapse.","Severe chest tightness or sudden shortness of breath alongside intense agitation."]'::jsonb,
    '["উচ্চ জ্বরের সাথে তীব্র ছটফটানি, অতিরিক্ত পালস রেট ও প্রলাপ বকা (Thyroid Storm-এর জরুরি অবস্থা)।","অস্থিরতার পর ধীরে ধীরে জ্ঞান হারিয়ে ফেলা বা খিঁচুনি হওয়া (রক্তে সোডিয়াম মারাত্মক কমার লক্ষণ)।","নাড়ির স্পন্দন অতিরিক্ত দ্রুত ও অনিয়মিত হয়ে যাওয়া (Atrial Fibrillation)।","অস্থিরতার সাথে বুকে তীব্র চাপ বা শ্বাসকষ্ট শুরু হওয়া।"]'::jsonb,
    '["Comprehensive Thyroid Panel (Serum Free T3, Free T4, TSH)","Serum Electrolytes (Sodium, Potassium, Chloride, Bicarbonate)","12-Lead Electrocardiogram (ECG) for Tachyarrhythmias","Fasting & Random Blood Glucose levels","Anti-TPO & TSH Receptor Antibodies (TRAB) for Graves’ Disease"]'::jsonb,
    '["থাইরয়েড হরমোন টেস্ট (Serum Free T3, Free T4, TSH)","রক্তের ইলেকট্রোলাইটস (Serum Electrolytes: Sodium, Potassium)","হৃদস্পন্দনের জন্য ইসিজি (12-Lead ECG)","র্যান্ডম ও ফাস্টিং ব্লাড সুগার পরীক্ষা","অ্যান্টি-থাইরয়েড অ্যান্টিবডি টেস্ট"]'::jsonb,
    'Dr. Hanif Towhid prioritizes rapid endocrine stabilization with targeted antithyroid medications, beta-blocker autonomic modulation, electrolyte re-equilibration, and structured metabolic reassurance.',
    'ডা. হানিফ তৌহিদ থাইরয়েড হরমোনের ভারসাম্য রক্ষা, বিটা-ব্লকার দ্বারা অতিরিক্ত হৃদস্পন্দন নিয়ন্ত্রণ এবং সুনির্দিষ্ট চিকিৎসা দিয়ে দ্রুত স্বাভাবিক অবস্থায় ফিরিয়ে আনেন।',
    6
  ),
  (
    'palpitation',
    'Palpitation & Rapid Heart Rate',
    'বুক ধড়ফড় করা ও দ্রুত হৃদস্পন্দন',
    'Cardiovascular & Hormonal Medicine',
    'হৃদরোগ ও হরমোনজনিত জটিলতা',
    'Cardiac Conduction System & Adrenal Axis',
    'হৃদযন্ত্র, হার্টবিট ও হৃদস্পন্দন',
    '/symptoms/palpitation.png',
    'Rapid heart rate, arrhythmia, acute anxiety, hyperthyroid surges or severe hemoglobin deficiency.',
    'হঠাৎ বুক ধড়ফড় করা, দ্রুত হৃদস্পন্দন, রক্তশূন্যতা কিংবা থাইরয়েড হরমোনের তীব্র পরিবর্তন।',
    'Palpitation is the subjective sensation of an abnormally rapid, forceful, or irregular heartbeat (skipping beats, fluttering, or racing). While commonly triggered by physiological factors like caffeine, nicotine, acute emotional stress, and intense exercise, palpitations can be the sentinel sign of dangerous cardiac arrhythmias (Atrial Fibrillation, Supraventricular Tachycardia - SVT, Ventricular Ectopics) or major systemic disorders.

In internal medicine, severe Iron Deficiency Anemia forces the heart to beat faster to maintain tissue oxygenation. Similarly, Thyrotoxicosis directly sensitizes cardiac beta-receptors, precipitating high-output tachycardias. Dr. Hanif Towhid performs systematic ECG and Holter evaluations to distinguish innocent sinus tachycardia from pathogenic arrhythmias requiring cardio-protective intervention.',
    'বুক ধড়ফড় করা (Palpitation) হলো নিজের হৃৎপিণ্ডের অস্বাভাবিক দ্রুত, ভারি বা অনিয়মিত স্পন্দন অনুভব করা। অনেকেই মনে করেন বুক ধড়ফড় মানেই হয়তো বড় কোনো হার্টের অসুখ। যদিও হৃদযন্ত্রের রিদমের সমস্যা (Arrhythmia / SVT / Atrial Fibrillation) এর একটি কারণ হতে পারে, তবে মেডিসিনের অধিকাংশ ক্ষেত্রে এর পেছনে লুকায়িত থাকে রক্তশূন্যতা (Anemia) বা থাইরয়েড হরমোনের অতিরিক্ত আধিক্য।

রক্তে হিমোগ্লোবিন কমে গেলে শরীরকে সচল রাখতে হার্টকে স্বাভাবিকের চেয়ে দ্বিগুণ গতিতে পাম্প করতে হয়, যা বুক ধড়ফড় হিসেবে প্রকাশ পায়। এছাড়াও হঠাৎ ভয় পাওয়া, গ্যাস্ট্রিকের কারণে ডায়াফ্রামে চাপ লাগা, কিংবা অতিরিক্ত চা-কফি পানেও বুক ধড়ফড় করতে পারে। ডা. হানিফ তৌহিদ ইসিজি ও রক্ত পরীক্ষার মাধ্যমে নির্ভুলভাবে মূল কারণ নির্ণয় করেন।',
    '[{"title":"Cardiac Arrhythmias & Ectopics","desc":"Premature ventricular/atrial contractions (PVCs/PACs), SVT, or Atrial Fibrillation causing rapid irregular beating."},{"title":"Severe Iron-Deficiency Anemia","desc":"Hyperdynamic circulatory state where the heart compensates for poor oxygen-carrying capacity by increasing rate."},{"title":"Hyperthyroidism & Sympathetic Surges","desc":"Direct thyroid hormone inotropy on myocardium precipitating resting tachycardia (>100 bpm)."},{"title":"Panic Disorder & Acute Stress Response","desc":"Adrenaline spikes activating cardiac beta-1 receptors during acute anxiety or phobic triggers."},{"title":"Electrolyte Disturbances & Dehydration","desc":"Hypokalemia or hypomagnesemia destabilizing cardiac myocyte electrical threshold."}]'::jsonb,
    '[{"title":"হৃদযন্ত্রের রিদমের গোলমাল (Cardiac Arrhythmia)","desc":"হার্টরেট হঠাৎ অনেক বেড়ে যাওয়া (SVT) বা স্পন্দন অনিয়মিত হয়ে বুকের ভেতর লাফাচ্ছে এমন ভাব হওয়া।"},{"title":"রক্তস্বল্পতা বা অ্যানিমিয়া","desc":"হিমোগ্লোবিনের ঘাটতি পূরণে হার্টকে দ্রুত স্পন্দিত হতে হয়, ফলে বিশ্রামরত অবস্থাতেও বুক ধড়ফড় করে।"},{"title":"থাইরয়েড হরমোনের বৃদ্ধি (Hyperthyroidism)","desc":"থাইরয়েড হরমোন হার্টকে উত্তেজিত করে সার্বক্ষণিক উচ্চ পালস রেট বজায় রাখে।"},{"title":"প্যানিক অ্যাটাক ও চরম উদ্বেগ","desc":"হঠাৎ ভয় পাওয়া বা দুশ্চিন্তার কারণে রক্তে অ্যাড্রেনালিন হরমোন ছড়িয়ে পড়ে বুক ধড়ফড় শুরু হওয়া।"},{"title":"পানি ও লবণের ঘাটতি (Dehydration)","desc":"পর্যাপ্ত পানি না খাওয়া বা রক্তে পটাশিয়ামের মাত্রা কমে যাওয়ার কারণে হার্টের গতি পরিবর্তন হওয়া।"}]'::jsonb,
    '["Palpitations associated with true syncope (fainting / loss of consciousness) or near-syncope.","Palpitations accompanied by crushing central chest pain radiating to the left jaw or arm.","Sustained resting heart rate >150 beats per minute accompanied by dizziness or cold clammy sweat.","Family history of sudden unexplained cardiac death in young first-degree relatives."]'::jsonb,
    '["বুক ধড়ফড় করার সাথে সাথে মাথা ঘুরে অজ্ঞান হয়ে যাওয়া (Syncope)।","বুক ধড়ফড়ের সাথে বুকে অসহ্য চাপ, ভারী লাগা বা ব্যথা বাম হাত বা চোয়ালে ছড়িয়ে পড়া।","বিশ্রামরত অবস্থাতেও পালস রেট মিনিটে ১৫০-এর বেশি হয়ে শরীর ঠান্ডা ও ঘেমে যাওয়া।","পরিবারে অল্প বয়সে হঠাৎ হার্ট বন্ধ হয়ে মারা যাওয়ার ইতিহাস থাকা।"]'::jsonb,
    '["Standard 12-Lead Electrocardiogram (ECG) during active symptoms","24 to 48-Hour Holter Cardiac Monitoring","Complete Blood Count (CBC with Red Cell Indices)","Thyroid Profile (TSH, FT4)","2D Echocardiography with Color Doppler to assess cardiac valve structure and ejection fraction"]'::jsonb,
    '["১২-লিড ইসিজি (12-Lead ECG)","২৪ ঘণ্টার হোল্টার মনিটরিং (Holter ECG Monitoring)","রক্তের সিবিসি (CBC for Hemoglobin & Anemia)","থাইরয়েড হরমোন টেস্ট (TSH, Free T4)","ইকোকার্ডিওগ্রাফি (2D Echo with Color Doppler)"]'::jsonb,
    'Clinical management by Dr. Hanif Towhid emphasizes rhythm vs. rate control strategies, hematinic replenishment for anemia, thyroid stabilization, anti-arrhythmic pharmacology, and lifestyle decaffeination.',
    'ডা. হানিফ আহমেদ তৌহিদ ইসিজি ও ইকো মূল্যায়নের মাধ্যমে হার্টের ছন্দ ফিরিয়ে আনা, রক্তশূন্যতা দূর করা এবং থাইরয়েড চিকিৎসার মাধ্যমে রোগীর বুক ধড়ফড় সমস্যার স্থায়ী চিকিৎসা প্রদান করেন।',
    7
  ),
  (
    'anxiety',
    'Anxiety, Panic & Chronic Stress',
    'দুশ্চিন্তা, মনের ভেতর ভয়-ভয় ভাব ও প্যানিক অ্যাটাক',
    'Neuro-Psychological & Psychosomatic Medicine',
    'মনোদৈহিক ও স্নায়বিক স্বাস্থ্য',
    'Autonomic Stress Axis & Neurotransmitters',
    'মস্তিষ্ক, স্নায়ুতন্ত্র ও মনোদৈহিক স্বাস্থ্য',
    '/symptoms/anxiety.png',
    'Chronic stress, panic episodes, generalized anxiety linked to chronic somatic physical ailments.',
    'অপ্রয়োজনীয় আতঙ্ক, ভয়-ভয় ভাব, বুক জ্বালাপোড়া ও শারীরিক ব্যাধির সাথে সম্পর্কিত মানসিক চাপ।',
    'Anxiety disorders and psychosomatic tension manifest as an interplay between neurotransmitter dysregulation (GABA, Serotonin, Norepinephrine) and heightened autonomic nervous system arousal. Patients frequently present to General Medicine clinics not with overt psychological complaints, but with disabling somatic symptoms: globus sensation in the throat (feeling of a lump), epigastric butterflies, muscle tension, breathlessness, and acute panic attacks simulating myocardial infarction.

Crucially, organic medical conditions like Pheochromocytoma, Mitral Valve Prolapse, Hypocalcemia, and Dysglycemia can closely mimic or exacerbate anxiety. Dr. Hanif Towhid adopts a comprehensive biopsychosocial medical approach, thoroughly evaluating somatic systems to rule out organic pathology before prescribing targeted neuro-chemical and lifestyle interventions.',
    'মনের ভেতর অহেতুক ভয়-ভয় লাগা, বুক কেঁপে ওঠা, দম বন্ধ হয়ে আসার অনুভূতি হওয়া এবং সবসময় কোনো খারাপ ঘটনার আশঙ্কা থাকাকে চিকিৎসা বিজ্ঞানে ‘Anxiety & Panic Disorder’ বলা হয়। অনেক রোগী সরাসরি মানসিক কষ্টের কথা না বলে শারীরিক সমস্যা নিয়ে ডাক্তারের কাছে আসেন—যেমন গলায় কিছু আটকে থাকার অনুভূতি, পেটে অস্বস্তি, বুক ধড়ফড় বা হাত-পা অবশ লাগা।

অনেকে প্যানিক অ্যাটাককে হার্ট অ্যাটাক মনে করে চরম আতঙ্কিত হয়ে পড়েন। আবার শরীরের ভেতরে হরমোনের তারতম্য, থাইরয়েডের সমস্যা বা রক্তে ক্যালসিয়াম কমে যাওয়ার ফলেও এমন শারীরিক ভয় ও উদ্বেগ হতে পারে। ডা. হানিফ তৌহিদ শারীরিক সব কারণ পুঙ্খানুপুঙ্খ পরীক্ষা করে রোগীকে আশ্বস্ত করেন এবং সঠিক বৈজ্ঞানিক ওষুধের মাধ্যমে উদ্বেগ দূর করতে সহায়তা করেন।',
    '[{"title":"Generalized Anxiety Disorder (GAD)","desc":"Persistent excessive worry about everyday issues linked to neurochemical imbalances in amygdala pathways."},{"title":"Panic Disorder & Agoraphobia","desc":"Sudden unexpected surges of overwhelming terror with hyperventilation, dizziness, and fear of impending doom."},{"title":"Psychosomatic Somatization","desc":"Conversion of emotional tension into chronic bodily symptoms: muscle aches, irritable bowel, and tension headaches."},{"title":"Endocrine & Metabolic Mimics","desc":"Thyrotoxicosis, hypoglycemia, and pheochromocytoma mimicking adrenergic surges."},{"title":"Chronic Sleep Deprivation & Burnout","desc":"Disrupted circadian rhythm leading to cortisol dysregulation and persistent baseline irritability."}]'::jsonb,
    '[{"title":"জেনারেলাইজড অ্যানজাইটি (GAD)","desc":"প্রতিদিনের সাধারণ বিষয় নিয়ে অতিরিক্ত দুশ্চিন্তা ও ভেতরে সবসময় একটি চাপা ভয় কাজ করা।"},{"title":"প্যানিক ডিসঅর্ডার (Panic Attack)","desc":"হঠাৎ কোনো কারণ ছাড়াই তীব্র আতঙ্ক, শ্বাস আটকে আসা, মাথা ঘোরা ও মারা যাওয়ার ভয় লাগা।"},{"title":"মনোদৈহিক লক্ষণ (Psychosomatic Symptoms)","desc":"মানসিক চাপের প্রভাবে পেটে গ্যাস, বুক ধড়ফড়, ঘাড়ে ব্যথা ও হাত-পা কাঁপার মতো শারীরিক সমস্যা হওয়া।"},{"title":"শারীরিক রোগের প্রভাব","desc":"থাইরয়েড হরমোনের আধিক্য বা রক্তে সুগার কমে যাওয়ার কারণে শরীরে অস্থিরতা ও ভয়ের অনুভূতি তৈরি হওয়া।"},{"title":"অনিদ্রা ও অতিরিক্ত কাজের চাপ","desc":"পর্যাপ্ত ঘুম না হওয়া এবং দীর্ঘদিনের মানসিক ক্লান্তির ফলে ব্রেইনের স্ট্রেস হরমোন বেড়ে যাওয়া।"}]'::jsonb,
    '["Active suicidal ideation, severe self-harm intent, or psychotic breaks with reality.","Panic symptoms accompanied by real ECG-proven myocardial ischemia or persistent hypoxia.","Severe anorexia leading to rapid malnutrition, dehydration, or electrolyte collapse.","Loss of ability to perform basic activities of daily living due to paralyzing panic."]'::jsonb,
    '["নিজের ক্ষতি করার ইচ্ছা বা বেঁচে থাকার আগ্রহ সম্পূর্ণ হারিয়ে ফেলা।","আতঙ্কের সাথে সত্যিকারের হার্টের সমস্যা বা অক্সিজেনের মাত্রা কমে যাওয়ার লক্ষণ থাকা।","খাওয়া-দাওয়া সম্পূর্ণ বন্ধ হয়ে শরীর মারাত্মক শুকিয়ে যাওয়া ও পানিশূন্যতা দেখা দেওয়া।","ভয়ের কারণে ঘরের বাইরে বের হতে না পারা বা স্বাভাবিক দৈনন্দিন কাজ সম্পূর্ণ বন্ধ হয়ে যাওয়া।"]'::jsonb,
    '["Complete Metabolic & Thyroid Panel (TSH, FT4, Serum Calcium, Electrolytes)","12-Lead ECG & Echocardiogram (to rule out organic cardiac disease and reassure patient)","Fasting Blood Glucose / HbA1c","Clinical Anxiety & Depression Screening Scales (GAD-7 / PHQ-9 Assessment)"]'::jsonb,
    '["থাইরয়েড ও মেটাবলিক রক্ত পরীক্ষা (TSH, Electrolytes, Calcium)","হার্ট সম্পূর্ণ সুস্থ আছে কিনা নিশ্চিত করতে ইসিজি (12-Lead ECG)","রক্তে গ্লুকোজ ও এইচবিএওয়ানসি (HbA1c)","ক্লিনিক্যাল অ্যানজাইটি স্কেল ও কাউন্সেলিং হিস্ট্রি"]'::jsonb,
    'Treatment focuses on empathetic physician-patient communication, careful non-addictive neuro-pharmacology (SSRIs/SNRIs rather than chronic benzodiazepines), cognitive restructuring, and breathing regulation overseen by Dr. Hanif Towhid.',
    'ডা. হানিফ তৌহিদ ঘুমের ওষুধের ক্ষতিকর আসক্তি এড়িয়ে আধুনিক ও নিরাপদ ওষুধের মাধ্যমে মস্তিষ্কের নিউরোট্রান্সমিটারের ভারসাম্য ফিরিয়ে আনেন এবং সঠিক কাউন্সেলিংয়ের মাধ্যমে মানসিক প্রশান্তি নিশ্চিত করেন।',
    8
  ),
  (
    'upper-abdominal-discomfort',
    'Upper Abdominal Discomfort & Fullness',
    'পেটের ওপরের অংশে অস্বস্তি ও পেট ভারী হওয়া',
    'Gastroenterology & Hepatobiliary',
    'পরিপাকতন্ত্র ও লিভারের রোগ',
    'Stomach, Gallbladder & Fatty Liver',
    'পাকস্থলী, পিত্তথলি ও লিভার',
    '/symptoms/upper-abdominal-discomfort.png',
    'Indigestion, dyspepsia, gallstones, fatty liver irritation or bloated fullness after meals.',
    'খাওয়ার পর পেট ভারী লাগা, বদহজম, ফ্যাটি লিভার বা পিত্তথলির সমস্যার প্রাথমিক লক্ষণ।',
    'Upper abdominal discomfort (functional dyspepsia, bloating, and postprandial distress syndrome) is a major clinical issue involving impaired gastric accommodation, delayed stomach emptying, or hepatobiliary sluggishness. Patients typically complain of early satiety (feeling full after just a few bites), persistent tightness beneath the ribs, excess flatulence, and nausea after meals.

In modern internal medicine, Upper Abdominal Discomfort is frequently associated with Non-Alcoholic Fatty Liver Disease (NAFLD/NASH), Gallbladder stones (cholelithiasis), Chronic Helicobacter pylori gastritis, or Irritable Bowel Syndrome (IBS). Dr. Hanif Towhid utilizes advanced abdominal sonography and metabolic profiling to identify the precise organic cause.',
    'খাওয়ার পরপরই পেটের ওপরের দিকে ভারী লাগা, অল্প খেলেই পেট ভরে যাওয়ার অনুভূতি (Early Satiety), অতিরিক্ত গ্যাস, পেট ফাঁপা বা অস্বস্তি লাগাকে পরিপাকতন্ত্রের ভাষায় ‘Dyspepsia’ বলা হয়। অনেকেই একে সাধারণ গ্যাস মনে করে ফার্মেসি থেকে প্রতিদিন গ্যাস্ট্রিকের ওষুধ খান, যা রোগটিকে আরও জটিল করে তোলে।

মেডিসিন বিশেষজ্ঞদের মতে, পেটের ওপরের অংশে দীর্ঘস্থায়ী অস্বস্তির পেছনে ফ্যাটি লিভার (Fatty Liver Disease), পিত্তথলিতে পাথর (Gallstones), পাকস্থলীতে ক্ষতিকর এইচ. পাইলোরি (H. pylori) ব্যাকটেরিয়ার সংক্রমণ কিংবা খাদ্যনালীর মন্থরতা দায়ী হতে পারে। সঠিক সময়ে আল্ট্রাসনোগ্রাম ও লিভারের টেস্ট করে ফ্যাটি লিভার ও পিত্তথলির যত্ন নেওয়া অত্যন্ত জরুরি।',
    '[{"title":"Functional Dyspepsia & Delayed Gastric Emptying","desc":"Impaired stomach motility and visceral hypersensitivity causing postprandial heaviness and bloating."},{"title":"Non-Alcoholic Fatty Liver Disease (NAFLD)","desc":"Excess hepatic lipid accumulation causing liver capsule stretch and right upper quadrant dull fullness."},{"title":"Gallstones & Chronic Cholecystitis","desc":"Biliary stones triggering episodic right subcostal discomfort, especially following fatty rich meals."},{"title":"Helicobacter pylori Infection","desc":"Chronic bacterial colonization inducing mucosal inflammation and chronic gastric bloating."},{"title":"Exocrine Pancreatic Insufficiency","desc":"Deficient digestive enzymes leading to poor fat absorption and chronic fermentation gas."}]'::jsonb,
    '[{"title":"বদহজম ও পাকস্থলীর গতি মন্থর হওয়া (Dyspepsia)","desc":"খাবার ঠিকমতো হজম না হয়ে পাকস্থলীতে দীর্ঘক্ষণ জমে থাকা, যার ফলে পেট ফুলে থাকে ও অস্বস্তি হয়।"},{"title":"ফ্যাটি লিভার (Fatty Liver Disease)","desc":"লিভারে অতিরিক্ত চর্বি জমার কারণে লিভার আকারে বড় হয়ে পেটের ডানপাশে ওপরের দিকে চাপ ও ভারী ভাব তৈরি হওয়া।"},{"title":"পিত্তথলিতে পাথর (Gallbladder Stones)","desc":"তৈলাক্ত বা গুরুপাক খাবার খাওয়ার পর পেটের ওপরের ডানপাশে অস্বস্তি ও চিনচিন করা ব্যথা।"},{"title":"এইচ. পাইলোরি ব্যাকটেরিয়ার ইনফেকশন","desc":"পাকস্থলীতে জীবাণু সংক্রমণের ফলে দীর্ঘস্থায়ী প্রদাহ ও পেটে গ্যাস জমা।"},{"title":"অগ্ন্যাশয়ের এনজাইমের ঘাটতি","desc":"হজমের সহায়ক পাচক রসের অভাবে তৈলাক্ত খাবার হজম না হয়ে পেটে অতিরিক্ত গ্যাস সৃষ্টি হওয়া।"}]'::jsonb,
    '["Progressive difficulty swallowing solid foods (Dysphagia) or food sticking in the chest.","Unintended significant weight loss with persistent vomiting after meals.","Vomiting blood (hematemesis) or passing jet-black tarry stools (melena).","New onset painless jaundice (yellow eyes) with pale stools and dark urine."]'::jsonb,
    '["খাবার গিলতে কষ্ট হওয়া বা গলায় খাবার আটকে যাওয়ার মতো অনুভূতি হওয়া (Dysphagia)।","খাওয়া ছাড়াই ওজন অস্বাভাবিক কমে যাওয়া এবং ঘনঘন বমি হওয়া।","রক্তবমি হওয়া বা আলকাতরার মতো দুর্গন্ধযুক্ত কালো পায়খানা হওয়া (রক্তক্ষরণের লক্ষণ)।","ব্যথাহীন অবস্থায় চোখ হলুদ হয়ে জন্ডিস দেখা দেওয়া ও পায়খানা সাদাটে হওয়া।"]'::jsonb,
    '["High-Resolution Ultrasonography of Whole Abdomen (USG with fatty liver grading)","Liver Function Tests (Serum SGPT/ALT, SGOT/AST, Alkaline Phosphatase, Bilirubin)","Upper Gastrointestinal Video Endoscopy (when red flags or H. pylori suspected)","Stool for H. pylori Antigen & Occult Blood Test (FOBT)","Lipid Profile & Fasting Blood Sugar"]'::jsonb,
    '["পুরো পেটের আল্ট্রাসনোগ্রাম (USG of Whole Abdomen - ফ্যাটি লিভার ও পিত্তথলি মূল্যায়নে)","লিভার ফাংশন টেস্ট (SGPT, SGOT, Bilirubin)","প্রয়োজনে আপার জিআই এন্ডোস্কোপি (Upper GI Endoscopy)","মলের এইচ. পাইলোরি অ্যান্টিজেন টেস্ট (Stool for H. pylori)","লিপিড প্রোফাইল (রক্তের কোলেস্টেরল পরীক্ষা)"]'::jsonb,
    'Dr. Hanif Towhid designs comprehensive gastro-metabolic pathways incorporating dietary restructuring, prokinetic motility optimization, fatty liver lifestyle modification, and targeted H. pylori eradication.',
    'ডা. হানিফ তৌহিদ খাদ্যাভ্যাসের পরিবর্তন, ফ্যাটি লিভার কমানোর সুনির্দিষ্ট গাইডলাইন এবং গ্যাস্ট্রিকের ওষুধের অপ্রয়োজনীয় ব্যবহার কমিয়ে হজমপ্রক্রিয়া স্বাভাবিক করার বৈজ্ঞানিক চিকিৎসা প্রদান করেন।',
    9
  ),
  (
    'epigastric-pain',
    'Epigastric Pain, Acidity & Peptic Ulcers',
    'বুকের নিচে তীব্র পেট ব্যথা, গ্যাস্ট্রিক ও আলসার',
    'Gastrointestinal & Acid-Peptic Disorders',
    'গ্যাস্ট্রিক, আলসার ও খাদ্যনালীর রোগ',
    'Gastric Mucosa, Duodenum & Lower Esophagus',
    'পাকস্থলী, ডিওডেনাম ও খাদ্যনালী',
    '/symptoms/epigastric-pain.png',
    'Peptic ulcer disease, GERD, severe acidity burn, or acute gastritis requiring rational medical therapy.',
    'তীব্র গ্যাস্ট্রিক আলসার, বুক-পেট জ্বালাপোড়া এবং অ্যান্টাসিড প্রতিরোধী পেটের ব্যথা।',
    'Epigastric pain is sharp, gnawing, or burning distress centered in the upper mid-abdomen immediately below the xiphoid sternum. It is primarily driven by Peptic Ulcer Disease (Gastric and Duodenal Ulcers), Gastroesophageal Reflux Disease (GERD), and Acute Erosive Gastritis. When the protective gastric mucosal barrier is eroded by hyperacidity, NSAID overuse, or Helicobacter pylori infection, acidic gastric secretions directly irritate submucosal pain fibers.

Importantly, in general medicine, severe acute epigastric pain can also herald life-threatening conditions like Acute Pancreatitis or an Inferior Wall Myocardial Infarction (heart attack presenting as stomach acidity). Dr. Hanif Towhid performs careful bedside differentiation to protect both the gastrointestinal and cardiovascular health of the patient.',
    'বুকের ঠিক নিচে বা পেটের ওপরের অংশে জ্বালাপোড়া করা, খামচে ধরা তীব্র ব্যথা হওয়াকে চিকিৎসা বিজ্ঞানে ‘Epigastric Pain’ বা পেপটিক আলসার বলা হয়। পাকস্থলীতে অতিরিক্ত অ্যাসিড তৈরি হলে বা প্রতিরক্ষামূলক স্তর ক্ষতিগ্রস্ত হলে গ্যাস্ট্রিক আলসার ও বুক জ্বালাপোড়া (GERD) দেখা দেয়। সাধারণত খালি পেটে কিংবা খাওয়ার পর পেটে তীব্র মোচড় দিয়ে ব্যথা শুরু হয়।

সবচেয়ে গুরুত্বপূর্ণ বিষয় হলো, অনেক সময় হার্ট অ্যাটাকের (Inferior Wall MI) ব্যথাও হুবহু গ্যাস্ট্রিক বা পেটের ব্যথার মতো মনে হতে পারে। এছাড়াও অগ্ন্যাশয়ের তীব্র প্রদাহ (Acute Pancreatitis) পেটের ওপরের অংশ থেকে পিঠের দিকে ছড়িয়ে যায়। তাই পেটের তীব্র ব্যথাকে কেবল ‘গ্যাস’ ভেবে এড়িয়ে না গিয়ে অভিজ্ঞ চিকিৎসকের পরামর্শ নেওয়া উচিত।',
    '[{"title":"Peptic Ulcer Disease (Gastric / Duodenal)","desc":"Mucosal mucosal crater defects triggered by H. pylori or acid hypersecretion causing gnawing hunger-pain."},{"title":"Gastroesophageal Reflux Disease (GERD)","desc":"Acid backwash irritating the lower esophageal sphincter, producing severe retrosternal heartburn."},{"title":"NSAID / Painkiller-Induced Gastropathy","desc":"Over-the-counter painkillers inhibiting protective prostaglandins, causing acute gastric erosions."},{"title":"Acute Pancreatitis","desc":"Severe sharp boring epigastric pain radiating directly through to the back, aggravated by lying supine."},{"title":"Inferior Wall Myocardial Infarction","desc":"Coronary artery ischemia mimicking acute epigastric burning discomfort and nausea in high-risk patients."}]'::jsonb,
    '[{"title":"পেপটিক আলসার ডিজিজ (পাকস্থলী ও ডিওডেনামে ঘা)","desc":"এইচ. পাইলোরি ব্যাকটেরিয়া বা অতিরিক্ত অ্যাসিডের কারণে পাকস্থলীর ভেতরের দেয়ালে ঘা হয়ে তীব্র জ্বালাপোড়া হওয়া।"},{"title":"গ্যাস্ট্রোইসোফেজিয়াল রিফ্লাক্স (GERD / বুক জ্বালা)","desc":"পেটের অ্যাসিড খাদ্যনালী বেয়ে ওপরে উঠে এসে বুক ও গলা পর্যন্ত তীব্র জ্বালাপোড়া সৃষ্টি করা।"},{"title":"পেইনকিলারের ক্ষতিকর প্রভাব (NSAID Gastropathy)","desc":"ব্যথার ওষুধ খাওয়ার কারণে পাকস্থলীর প্রতিরক্ষামূলক ঝিল্লি নষ্ট হয়ে রক্তক্ষরণ বা পেটে ক্ষত তৈরি হওয়া।"},{"title":"অগ্ন্যাশয়ে তীব্র প্রদাহ (Acute Pancreatitis)","desc":"পেটের ওপরের অংশে অসহ্য তীব্র ব্যথা যা সোজা পিঠের দিকে ছড়িয়ে পড়ে এবং শুয়ে থাকলে বাড়ে।"},{"title":"হার্ট অ্যাটাকের লক্ষণ (Inferior Wall MI)","desc":"হার্ট অ্যাটাকের ব্যথা অনেক সময় গ্যাস্ট্রিকের মতো পেটের ওপর অংশে ভারী লাগা ও বমি ভাব আকারে প্রকাশ পায়।"}]'::jsonb,
    '["Sudden onset excruciating \"knife-like\" abdominal rigidity (sign of perforated peptic ulcer).","Vomiting ground-coffee material or passing tarry black stools (active upper GI bleed).","Epigastric pain accompanied by heavy sweating, shortness of breath, or radiation to the left arm.","Unrelenting severe pain radiating to the back with persistent vomiting (Acute Pancreatitis)."]'::jsonb,
    '["হঠাৎ পেটে ছুরিকাঘাতের মতো তীব্র ব্যথা হওয়া এবং পেট শক্ত কাঠের মতো হয়ে যাওয়া (আলসার ফেটে যাওয়ার লক্ষণ)।","কালো পায়খানা হওয়া বা কফির মতো কালচে বমি হওয়া (ভেতরে রক্তক্ষরণের সংকেত)।","পেট ব্যথার সাথে বুক ধড়ফড় করা, অতিরিক্ত ঘেমে যাওয়া বা ব্যথা বাম হাতে ছড়িয়ে পড়া (হার্ট অ্যাটাকের ঝুঁকি)।","ব্যথা সোজা পিঠের দিকে ছড়িয়ে যাওয়া এবং ক্রমাগত বমি হতে থাকা।"]'::jsonb,
    '["Upper Gastrointestinal (GI) Video Endoscopy with Biopsy / Rapid Urease Test (RUT)","12-Lead Electrocardiogram (ECG) & Serum Troponin-I (to rule out myocardial infarction)","Serum Lipase and Serum Amylase levels (for pancreatitis evaluation)","Ultrasonography of Whole Abdomen (Hepatobiliary assessment)","Complete Blood Count & Stool for Occult Blood"]'::jsonb,
    '["ভিডিও এন্ডোস্কোপি (Upper GI Endoscopy with Biopsy)","হার্ট নিরাপদ কিনা নিশ্চিত করতে ইসিজি (ECG) ও ট্রোপোনিন-আই (Troponin-I)","অগ্ন্যাশয়ের জন্য সিরাম লাইপেজ ও অ্যামাইলেজ (Serum Lipase/Amylase)","পেটের আল্ট্রাসনোগ্রাম (USG of Whole Abdomen)","রক্তের সিবিসি ও মলে রক্তের উপস্থিতি পরীক্ষা (Stool Occult Blood)"]'::jsonb,
    'Dr. Hanif Towhid implements evidence-based gastro-protection, accurate dual/triple H. pylori eradication therapy, mucosal cytoprotective healing agents, and systematic lifestyle de-escalation of chronic acid secretion.',
    'ডা. হানিফ তৌহিদ আলসারের ক্ষত নিরাময়ে আধুনিক প্রোটন পাম্প ইনহিবিটর, এইচ. পাইলোরি নির্মূল চিকিৎসা এবং সঠিক খাদ্যতালিকা প্রণয়ন করে গ্যাস্ট্রিক ও আলসার থেকে স্থায়ী মুক্তি নিশ্চিত করেন।',
    10
  ),
  (
    'cough',
    'Cough, Bronchitis & Respiratory Infections',
    'দীর্ঘস্থায়ী কাশি, ব্রঙ্কাইটিস ও অ্যাজমা',
    'Respiratory & Pulmonary Medicine',
    'শ্বাসতন্ত্র ও ফুসফুসের রোগ',
    'Tracheobronchial Tree, Lungs & Airways',
    'ফুসফুস, শ্বাসনালী ও ব্রঙ্কাস',
    '/symptoms/cough.png',
    'Persistent dry or productive cough, bronchitis, post-viral airway sensitivity or asthma flares.',
    'দীর্ঘস্থায়ী শুকনো কাশি, কফ, সিওপিডি (COPD), অ্যাজমা বা শ্বাসনালীর তীব্র সংবেদনশীলতা।',
    'Cough is a vital protective reflex designed to clear secretions and foreign irritants from the tracheobronchial tree. However, when cough persists beyond 3–8 weeks (Chronic Cough), it transforms into a significant medical challenge. In clinical medicine, persistent cough is categorized as dry/irritant or productive (with sputum) and requires methodical differentiation.

The leading causes of chronic cough include Cough-Variant Asthma (CVA), Chronic Obstructive Pulmonary Disease (COPD in smokers), Post-Infectious Airway Hyperresponsiveness, Gastroesophageal Reflux Disease (GERD with micro-aspiration), and Upper Airway Cough Syndrome (post-nasal drip). In regions with high endemicity, Pulmonary Tuberculosis and bronchiectasis must also be actively evaluated. Dr. Hanif Towhid uses spirometry and pulmonary imaging for targeted treatment.',
    'কাশি (Cough) হলো ফুসফুস ও শ্বাসনালী পরিষ্কার রাখার একটি স্বাভাবিক শারীরবৃত্তীয় প্রক্রিয়া। কিন্তু কাশি যদি ৩ সপ্তাহের বেশি সময় ধরে চলতে থাকে, তবে তাকে ‘দীর্ঘস্থায়ী কাশি’ বলা হয় এবং এর পেছনে গভীর কোনো ফুসফুসীয় রোগ লুকিয়ে থাকে। কাশির সাথে কফ বের হওয়া কিংবা কেবল শুকনো খুসখুসে কাশি উভয়েরই সঠিক কারণ বের করা জরুরি।

ধূমপায়ী ব্যক্তিদের ক্ষেত্রে ক্রনিক ব্রঙ্কাইটিস বা সিওপিডি (COPD), ঋতু পরিবর্তনে অ্যালার্জি বা অ্যাজমা (Asthma), পাকস্থলীর অ্যাসিড খাদ্যনালী হয়ে গলায় উঠে আসা (GERD), কিংবা আমাদের দেশে যক্ষ্মা (Tuberculosis) ও পোস্ট-ভাইরাল কাশির কারণে রোগীরা দীর্ঘ কষ্টে ভোগেন। দোকান থেকে কাশির সিরাপ না খেয়ে ফুসফুসের সঠিক পরীক্ষা করে চিকিৎসা নিলে কাশি থেকে দ্রুত আরোগ্য লাভ করা সম্ভব।',
    '[{"title":"Bronchial Asthma & Cough-Variant Asthma","desc":"Chronic airway inflammation causing wheezing, chest tightness, nocturnal dry coughing, and reversible obstruction."},{"title":"Chronic Obstructive Pulmonary Disease (COPD)","desc":"Progressive airflow limitation in long-term smokers presenting with chronic morning productive cough and exertional dyspnea."},{"title":"Post-Viral Hyperreactive Airway","desc":"Prolonged bronchial hypersensitivity persisting for weeks following a viral influenza or respiratory syncytial infection."},{"title":"Gastroesophageal Reflux Cough (GERD)","desc":"Acid vapors irritating the vagal receptors in the distal esophagus and larynx, provoking dry hacking cough when lying down."},{"title":"Pulmonary Tuberculosis (TB) & Bronchiectasis","desc":"Chronic mycobacterial infection causing evening fever, weight loss, night sweats, and blood-streaked sputum."}]'::jsonb,
    '[{"title":"ব্রঙ্কিয়াল অ্যাজমা বা হাঁপানি (Asthma)","desc":"শ্বাসনালীর অ্যালার্জিক প্রদাহের কারণে রাতে বা ভোরে শুকনো কাশি, বুকে বাঁশির মতো সাঁই-সাঁই শব্দ ও শ্বাসকষ্ট।"},{"title":"সিওপিডি (COPD - ধূমপায়ীদের ফুসফুসের ক্ষয়)","desc":"দীর্ঘদিন ধূমপানের ফলে ফুসফুসের স্থায়ী ক্ষতি হয়ে প্রতিদিন সকালে কফযুক্ত কাশি ও দ্রুত হাঁপিয়ে ওঠা।"},{"title":"পোস্ট-ভাইরাল শ্বাসনালীর সংবেদনশীলতা","desc":"ভাইরাস জ্বরের পর শ্বাসনালী অতিরিক্ত সংবেদনশীল হয়ে কয়েক সপ্তাহ ধরে একটানা খুসখুসে কাশি থাকা।"},{"title":"গ্যাস্ট্রিকের রিফ্লাক্সজনিত কাশি (GERD)","desc":"রাত্রে শোয়ার পর পাকস্থলীর অ্যাসিড গলায় উঠে এসে তীব্র শুকনো কাশির উদ্রেক করা।"},{"title":"যক্ষ্মা (Tuberculosis) ও ব্রঙ্কিয়েকট্যাসিস","desc":"টানা তিন সপ্তাহের বেশি কাশি, সাথে সান্ধ্যকালীন জ্বর, ওজন কমে যাওয়া ও কফের সাথে রক্ত পড়া।"}]'::jsonb,
    '["Coughing up blood or blood-streaked sputum (Hemoptysis).","Unexplained progressive weight loss, drenching night sweats, and evening fever spikes.","Significant change in the character or frequency of a chronic smoker’s cough.","Severe acute stridor, inability to speak complete sentences, or cyanosis (blue lips/fingers)."]'::jsonb,
    '["কাশির সাথে রক্ত বা রক্তের ছোপযুক্ত কফ বের হওয়া (Hemoptysis)।","টানা কাশির সাথে শরীরের ওজন অস্বাভাবিক কমে যাওয়া ও রাতে শরীর ভিজে যাওয়ার মতো ঘাম হওয়া।","ধূমপায়ী ব্যক্তির দীর্ঘদিনের কাশির ধরনে হঠাৎ মারাত্মক পরিবর্তন আসা।","কাশির সাথে মারাত্মক শ্বাসকষ্টে কথা বলতে না পারা বা ঠোঁট ও আঙুল নীলচে হয়ে যাওয়া।"]'::jsonb,
    '["Digital Chest X-Ray (P/A View)","Spirometry with Reversibility Test (PFT for Asthma/COPD grading)","Sputum for AFB, GeneXpert & Gram Stain/Culture","High-Resolution Computed Tomography (HRCT) of Chest (when indicated)","Complete Blood Count (CBC with Total Eosinophil Count - TEC) & Serum Total IgE"]'::jsonb,
    '["বুকের ডিজিটাল এক্স-রে (Chest X-Ray P/A View)","স্পাইরোমেট্রি বা ফুসফুসের কার্যক্ষমতা পরীক্ষা (Spirometry / PFT)","কফের যক্ষ্মা পরীক্ষা (Sputum GeneXpert & AFB)","ফুসফুসের উচ্চ রেজোলিউশনের সিটি স্ক্যান (HRCT Chest) প্রয়োজন হলে","রক্তের সিবিসি ও অ্যালার্জি টেস্ট (Total Eosinophil Count & Serum IgE)"]'::jsonb,
    'Dr. Hanif Towhid tailors evidence-based respiratory care with inhaled corticosteroid/bronchodilator combinations, anti-allergic airway desensitization, smoking cessation counseling, and targeted anti-tubercular or antibacterial regimens.',
    'ডা. হানিফ আহমেদ তৌহিদ স্পাইরোমেট্রি দ্বারা অ্যাজমা ও সিওপিডি সঠিকভাবে নির্ণয় করে আধুনিক ইনহেলার থেরাপি, অ্যালার্জি নিয়ন্ত্রণ এবং ফুসফুসের রিহ্যাবিলিটেশনের মাধ্যমে রোগীকে শ্বাসকষ্ট ও কাশিমুক্ত রাখেন।',
    11
  ),
  (
    'exertional-breathlessness',
    'Exertional Breathlessness & Dyspnea',
    'একটু পরিশ্রমে শ্বাসকষ্ট হওয়া (হাঁপিয়ে ওঠা)',
    'Cardio-Pulmonary & Metabolic Medicine',
    'হৃদযন্ত্র ও ফুসফুসের ক্ষমতা',
    'Cardiopulmonary Functional Capacity & Alveoli',
    'হৃদযন্ত্র ও ফুসফুসের কার্যক্ষমতা',
    '/symptoms/exertional-breathlessness.png',
    'Shortness of breath upon mild exertion, early warning of cardiac strain, anemia or lung airway obstruction.',
    'হালকা পরিশ্রমে বা সিঁড়িতে উঠলেই হাঁপিয়ে ওঠা; যা হৃদরোগ, অ্যানিমিয়া বা ফুসফুসের দুর্বলতার ইঙ্গিত দেয়।',
    'Exertional breathlessness (dyspnea on exertion - DOE) is an alarming clinical symptom where normal physical activity (such as walking uphill, climbing one flight of stairs, or performing household chores) produces an uncomfortable awareness of breathing difficulty. It reflects a critical mismatch between the body''s metabolic oxygen demands and the cardiopulmonary capacity to deliver oxygenated blood to peripheral tissues.

In General Medicine, exertional breathlessness is a primary herald of Early Congestive Heart Failure (left ventricular systolic/diastolic dysfunction), Ischemic Heart Disease (anginal equivalent), Chronic Obstructive Pulmonary Disease (COPD), Interstitial Lung Disease (ILD), and severe Anemia. Dr. Hanif Towhid performs simultaneous cardiac and pulmonary stratification to identify the precise limiting organ system.',
    'হালকা একটু হাঁটাহাঁটি করলেই কিংবা সিঁড়ি দিয়ে ওঠার সময় বুকে হাঁপিয়ে ওঠা, দম ফুরিয়ে যাওয়া বা শ্বাস নিতে কষ্ট হওয়ার সমস্যাকে ‘Exertional Dyspnea’ বলা হয়। অনেকেই একে বয়স বাড়ার স্বাভাবিক লক্ষণ বা মেদ বৃদ্ধির কারণ মনে করে অবহেলা করেন, যা অত্যন্ত ঝুঁকিপূর্ণ।

পরিশ্রমে শ্বাসকষ্ট হওয়া মূলত হার্ট বা ফুসফুসের কার্যক্ষমতা কমে যাওয়ার স্পষ্ট সংকেত। হার্টের পাম্পিং ক্ষমতা কমে যাওয়া (Heart Failure), রক্তে মারাত্মক রক্তশূন্যতা (Anemia), কিংবা ফুসফুসের বায়ুথলি নষ্ট হয়ে যাওয়া (COPD / ILD)-র কারণে কোষে পর্যাপ্ত অক্সিজেন পৌঁছাতে পারে না। দ্রুত কার্ডিওলজি ও পালমোনোলজি পরীক্ষা করে চিকিৎসা শুরু করলে হৃদরোগের মারাত্মক ঝুঁকি এড়ানো সম্ভব।',
    '[{"title":"Congestive Heart Failure (CHF / LV Failure)","desc":"Impaired left ventricular pumping causing elevated pulmonary venous pressure and alveolar congestion on exertion."},{"title":"Coronary Artery Disease (Ischemia)","desc":"Myocardial oxygen supply-demand mismatch presenting as \"anginal equivalent\" dyspnea rather than typical chest pain."},{"title":"Chronic Obstructive Pulmonary Disease & Asthma","desc":"Dynamic hyperinflation and air trapping during increased respiratory demand."},{"title":"Severe Hemoglobin Deficiency (Anemia)","desc":"Depleted blood oxygen-carrying capacity precipitating early tissue hypoxia and rapid panting."},{"title":"Pulmonary Hypertension & Interstitial Fibrosis","desc":"Increased pulmonary arterial resistance or stiff non-compliant lung parenchyma impeding gas exchange."}]'::jsonb,
    '[{"title":"হার্ট ফেইলিউর (Heart Failure / দুর্বল হার্ট)","desc":"হার্টের পাম্প করার শক্তি কমে যাওয়ার ফলে পরিশ্রমে ফুসফুসে পানি জমে তীব্র শ্বাসকষ্ট ও হাঁপিয়ে ওঠা।"},{"title":"ইসকেমিক হার্ট ডিজিজ (হার্টে রক্ত চলাচলে বাধা)","desc":"হার্টের রক্তনালীতে ব্লকের কারণে বুকে সরাসরি ব্যথা না হয়ে পরিশ্রমে তীব্র দম বন্ধ হওয়ার মতো ভাব হওয়া।"},{"title":"সিওপিডি ও ফুসফুসের ক্রনিক রোগ (COPD / ILD)","desc":"ফুসফুসের স্থিতিস্তাপকতা নষ্ট হয়ে যাওয়ার কারণে পরিশ্রমে প্রয়োজনীয় বাতাস প্রবেশ করতে না পারা।"},{"title":"তীব্র রক্তশূন্যতা বা অ্যানিমিয়া","desc":"রক্তে লোহিত কণিকার অভাবে মাংসপেশিতে অক্সিজেন ঘাটতি তৈরি হয়ে দ্রুত শ্বাস নিতে বাধ্য হওয়া।"},{"title":"ফুসফুসের ধমনীতে উচ্চ রক্তচাপ (Pulmonary Hypertension)","desc":"ফুসফুসের রক্তনালীতে প্রেশার বেড়ে গিয়ে হার্টের ডান পাশের ওপর অতিরিক্ত চাপ সৃষ্টি হওয়া।"}]'::jsonb,
    '["Orthopnea: Inability to breathe while lying flat, requiring 2 or more pillows to sleep at night.","Paroxysmal Nocturnal Dyspnea (PND): Waking up suddenly in the middle of the night gasping for fresh air.","Bilateral lower limb swelling (pitting pedal edema) progressing up to the shins.","Breathlessness occurring even at absolute rest (NYHA Functional Class IV)."]'::jsonb,
    '["ফ্ল্যাট হয়ে সোজা শুতে না পারা, শুলেই দম বন্ধ হয়ে আসা এবং রাতে দুই-তিনটি বালিশ দিয়ে ঘুমাতে হওয়া (Orthopnea)।","মধ্যরাতে হঠাৎ দম আটকে গিয়ে ঘুম ভেঙে যাওয়া এবং জানালা খুলে বাতাসের জন্য ছটফট করা (PND)।","উভয় পায়ের পাতা ও গোড়ালি ফুলে যাওয়া এবং আঙুল দিয়ে চাপ দিলে গর্ত হয়ে থাকা (Edema)।","বিশ্রামরত অবস্থায় বা বসে থাকা অবস্থাতেও তীব্র শ্বাসকষ্ট অনুভূত হওয়া।"]'::jsonb,
    '["2D Echocardiography with Color Doppler (LVEF & Diastolic function assessment)","Serum NT-proBNP or BNP Biomarker (cardiac failure gold standard)","Digital Chest X-Ray (P/A View for cardiomegaly & pulmonary edema)","Complete Blood Count (CBC) & Iron Profile","Spirometry & Pulse Oximetry (Resting & Post-6-Minute Walk Test)"]'::jsonb,
    '["ইকোকার্ডিওগ্রাফি (2D Echocardiography - হার্টের ইজেকশন ফ্র্যাকশন বা পাম্পিং ক্ষমতা দেখতে)","হার্ট ফেইলিউরের প্রধান রক্ত পরীক্ষা (Serum NT-proBNP)","বুকের এক্স-রে (Chest X-Ray - ফুসফুসে পানি বা হার্ট বড় হয়েছে কিনা দেখতে)","রক্তের হিমোগ্লোবিনের মাত্রা (CBC with Anemia Panel)","পালস অক্সিমিটার দিয়ে ৬ মিনিট হাঁটার পর রক্তের অক্সিজেনের মাত্রা পরিমাপ"]'::jsonb,
    'Dr. Hanif Towhid applies systematic neurohormonal cardiac blockade (ACEi/ARNI, beta-blockers, SGLT2i), rational diuretic de-congestion, pulmonary bronchodilation, and personalized cardiac rehabilitation exercise guidance.',
    'ডা. হানিফ তৌহিদ হার্টের পাম্পিং ক্ষমতা বাড়ানোর আধুনিক ওষুধ, ফুসফুসের কফ ও পানি নিষ্কাশন এবং পর্যায়ক্রমিক কার্ডিও-পালমোনারি রিহ্যাবিলিটেশনের মাধ্যমে হাঁপিয়ে ওঠার স্থায়ী সমাধান প্রদান করেন।',
    12
  ),
  (
    'chest-pain',
    'Chest Pain, Tightness & Angina Risk',
    'বুকে ব্যথা, চাপ ধরা ও হার্ট অ্যাটাকের ঝুঁকি',
    'Cardio-Thoracic & Urgent Medicine',
    'হৃদরোগ ও বক্ষব্যাধির জরুরি মূল্যায়ন',
    'Myocardium, Coronary Arteries & Chest Wall',
    'হৃদপিণ্ড, করোনারি রক্তনালী ও বুকের খাঁচা',
    '/symptoms/chest-pain.png',
    'Chest heaviness, angina risk, muscular wall strain, or acid reflux simulating cardiac discomfort.',
    'বুকে চাপ ধরা অনুভূতি, এনজাইনা/হার্ট অ্যাটাকের ঝুঁকি কিংবা তীব্র এসিডিটিজনিত বুকের অস্বস্তি।',
    'Chest pain is the quintessential medical emergency in internal medicine, demanding immediate, rigorous clinical differentiation. The anatomical structures within the thorax (heart, aorta, pulmonary vasculature, esophagus, pleura, chest wall muscles) share overlapping visceral sensory nerve pathways, meaning non-cardiac conditions can mimic life-threatening cardiac ischemia and vice versa.

Acute Coronary Syndromes (Unstable Angina, NSTEMI, STEMI) classically present with retrosternal crushing tightness, heaviness, or burning radiating to the left shoulder, neck, or jaw, exacerbated by exertion and relieved by rest or sublingual nitroglycerin. Conversely, costochondritis (chest wall inflammation), GERD, and pleurisy represent non-coronary etiologies. Dr. Hanif Towhid maintains rapid clinical protocols to evaluate chest pain safely.',
    'বুকে ব্যথা (Chest Pain) বা বুকে ভারী পাথরের মতো চাপ লাগা একটি অত্যন্ত সংবেদনশীল এবং জরুরি চিকিৎসার বিষয়। বুকের ভেতরে হার্ট, রক্তনালী, ফুসফুস ও খাদ্যনালী অবস্থান করায় বুকের যেকোনো ব্যথাকে কখনোই অবহেলা করা উচিত নয়। বিশেষ করে বয়স ৪০-এর বেশি, ডায়াবেটিস, উচ্চ রক্তচাপ বা পরিবারে হৃদরোগের ইতিহাস থাকলে যেকোনো নতুন বুক ব্যথা হার্ট অ্যাটাকের লক্ষণ হতে পারে।

হার্টের রক্তনালীতে চর্বি জমে ব্লক তৈরি হলে পরিশ্রমে বা দ্রুত হাঁটলে বুকে তীব্র চাপ, শ্বাসকষ্ট ও ঘেমে যাওয়ার মতো সমস্যা (Angina) দেখা দেয়। এছাড়াও বুকের খাঁচার মাংসপেশির টান (Costochondritis), তীব্র গ্যাস্ট্রিক বা ফুসফুসের আবরণের প্রদাহেও বুকে ব্যথা হতে পারে। ডা. হানিফ তৌহিদ তাৎক্ষণিক ইসিজি ও কার্ডিয়াক মার্কার টেস্টের মাধ্যমে হার্ট সুরক্ষিত রাখার সুনির্দিষ্ট চিকিৎসা নিশ্চিত করেন।',
    '[{"title":"Acute Myocardial Ischemia / Infarction","desc":"Atherosclerotic coronary artery plaque rupture precipitating acute myocardial necrosis and crushing chest tightness."},{"title":"Stable Angina Pectoris","desc":"Predictable exertional retrosternal heaviness lasting 2–10 minutes, relieved promptly by rest."},{"title":"Gastroesophageal Reflux Disease (GERD Spasm)","desc":"Acid-induced esophageal spasms producing burning retrosternal chest pain mimicking angina."},{"title":"Costochondritis & Musculoskeletal Strain","desc":"Inflammation of costochondral junctions presenting with sharp localized chest wall tenderness reproducible on palpation."},{"title":"Pleurisy & Pulmonary Embolism","desc":"Sharp knife-like chest pain aggravated by deep inspiration, coughing, or sudden embolic occlusion."}]'::jsonb,
    '[{"title":"হার্ট অ্যাটাক (Myocardial Infarction / MI)","desc":"হার্টের রক্তনালী হঠাৎ বন্ধ হয়ে যাওয়ার ফলে বুকের মাঝে প্রচণ্ড চাপ, পাথর চাপা দেওয়ার মতো ভারী অনুভূতি ও ঘাম হওয়া।"},{"title":"এনজাইনা (Angina Pectoris - রক্তনালীর ব্লক)","desc":"হাঁটাহাঁটি বা পরিশ্রমে বুকে ব্যথা শুরু হওয়া এবং একটু বিশ্রাম নিলে বা জিহ্বার নিচে স্প্রে নিলে কমে যাওয়া।"},{"title":"তীব্র গ্যাস্ট্রিক ও খাদ্যনালীর রিফ্লাক্স (GERD)","desc":"পাকস্থলীর অ্যাসিডের কারণে বুকের ঠিক মাঝখানে জ্বালাপোড়া ও অস্বস্তি তৈরি হওয়া।"},{"title":"বুকের খাঁচার পেশির বাত বা প্রদাহ (Costochondritis)","desc":"বুকের হাড়ে হাত দিয়ে চাপ দিলে তীব্র ব্যথা অনুভূত হওয়া যা নড়াচড়া বা কাশির সাথে বাড়ে।"},{"title":"ফুসফুসের রক্তনালীতে রক্ত জমাট বাঁধা (Pulmonary Embolism)","desc":"হঠাৎ তীব্র শ্বাসকষ্ট ও কাশির সাথে বুকে সূঁচ ফোটার মতো মারাত্মক ব্যথা হওয়া।"}]'::jsonb,
    '["Crushing central chest pain radiating to the left arm, jaw, back, or neck lasting >15 minutes.","Chest pain accompanied by profuse cold diaphoresis (clammy sweating), nausea, and dizziness.","Sudden onset breathlessness with fainting (syncope) or hemodynamic instability (systolic BP <90 mmHg).","Tearing chest pain radiating directly into the interscapular back region (Aortic Dissection)."]'::jsonb,
    '["বুকের মাঝখানে অসহ্য চাপ যা বাম হাত, ঘাড়, চোয়াল বা পিঠে ছড়িয়ে যায় এবং ১৫ মিনিটের বেশি স্থায়ী হয়।","বুকে ব্যথার সাথে সাথে শরীর ঠান্ডা হয়ে ঝরঝর করে ঘাম হওয়া এবং বমি বমি ভাব থাকা।","ব্যথার সাথে শ্বাস নিতে না পারা, মাথা ঘুরে পড়ে যাওয়া বা রক্তচাপ অতিরিক্ত কমে যাওয়া।","বুকের সামনে থেকে পিঠের দিকে তীব্রভাবে ছিঁড়ে যাওয়ার মতো ব্যথা হওয়া (Aortic Dissection-এর জরুরি লক্ষণ)।"]'::jsonb,
    '["Immediate 12-Lead Electrocardiogram (ECG) with serial ST-T dynamic tracking","High-Sensitivity Cardiac Troponin-I (hs-cTnI) Quantitative Assay","2D Echocardiography for Regional Wall Motion Abnormality (RWMA)","Coronary CT Angiogram or Exercise Tolerance Test (ETT / TMT)","Digital Chest X-Ray (to rule out pneumothorax or aortic widening)"]'::jsonb,
    '["জরুরি ১২-লিড ইসিজি (Immediate 12-Lead ECG)","হার্ট অ্যাটাক নিশ্চিতকরণের জন্য ট্রোপোনিন-আই (Serum Troponin-I)","ইকোকার্ডিওগ্রাফি (2D Echo for Heart Wall Motion)","হার্টের ব্লকের পরিমাণ জানতে করোনারি সিটি এনজিওগ্রাম বা ইটিটি (ETT / CT Angiogram)","বুকের ডিজিটাল এক্স-রে (Chest X-Ray)"]'::jsonb,
    'Dr. Hanif Towhid executes urgent risk-stratification, rapid anti-ischemic medical stabilization, dual antiplatelet and statin optimization, and coordinates timely coronary catheterization when intervention is imperative.',
    'ডা. হানিফ আহমেদ তৌহিদ তাৎক্ষণিক ইসিজি মূল্যায়নের মাধ্যমে জরুরি হার্টের চিকিৎসা, রক্তনালীর চর্বি ও রক্ত জমাট বাঁধা রোধ করার ওষুধ এবং হার্ট সুরক্ষিত রাখার পূর্ণাঙ্গ চিকিৎসা পরিকল্পনা প্রদান করেন।',
    13
  ),
  (
    'dysuria',
    'Dysuria, Burning Micturition & Renal Health',
    'প্রস্রাবে জ্বালাপোড়া, কিডনি ও মূত্রনালীর সমস্যা',
    'Nephrology & Urology Medicine',
    'কিডনি ও মূত্রনালীর রোগ',
    'Kidneys, Ureters, Bladder & Urethra',
    'কিডনি, মূত্রনালী ও মূত্রথলি',
    '/symptoms/dysuria.png',
    'Urinary tract infection (UTI), kidney gravel/stones, concentrated urine or bladder inflammation.',
    'ইউটিআই (UTI), প্রস্রাবে ইনফেকশন, কিডনিতে পাথর বা তীব্র জ্বালাপোড়া ও ব্যথাজনিত সমস্যা।',
    'Dysuria refers to painful, burning, or stinging sensation during or immediately after urination. It is a hallmark symptom of lower and upper urinary tract pathology. In the vast majority of outpatient medical cases, acute dysuria stems from Urinary Tract Infections (Cystitis and Urethritis) caused by uropathogenic bacteria (predominantly Escherichia coli). 

However, recurrent or non-infectious dysuria is frequently caused by Renal Calculi (Kidney / Ureteric Stones causing mucosal scratching), Concentrated Dehydration, Benign Prostatic Hyperplasia (BPH in aging men), and diabetic autonomic cystopathy. Dr. Hanif Towhid performs detailed urine cultures and renal sonography to eradicate recurrent infections and safeguard long-term renal glomerular filtration rate (GFR).',
    'প্রস্রাবের সময় বা প্রস্রাব শেষে তীব্র জ্বালাপোড়া, কামড়ানো বা কাটার মতো ব্যথা হওয়াকে চিকিৎসাবিজ্ঞানের ভাষায় ‘Dysuria’ বলা হয়। এটি সাধারণত মূত্রনালীর ইনফেকশন (UTI) এর অন্যতম প্রধান লক্ষণ। বিশেষ করে নারী, ডায়াবেটিক রোগী এবং যারা প্রতিদিন পর্যাপ্ত পানি পান করেন না, তাদের মাঝে এই সমস্যার প্রাদুর্ভাব সবচেয়ে বেশি দেখা যায়।

এছাড়া কিডনি বা মূত্রথলিতে পাথর (Kidney Stones) থাকলে প্রস্রাবের নালীতে ঘর্ষণের কারণে তীব্র জ্বালাপোড়া ও রক্ত যাওয়ার মতো সমস্যা হতে পারে। বয়স্ক পুরুষদের ক্ষেত্রে প্রোস্টেট গ্ল্যান্ড বড় হয়ে যাওয়াও একটি কারণ। বারবার প্রস্রাবে ইনফেকশন হওয়া কিডনি বিকল (Kidney Failure)-এর দিকে নিয়ে যেতে পারে। তাই লক্ষণ দেখা মাত্রই ডা. হানিফ তৌহিদের পরামর্শে সঠিক অ্যান্টিবায়োটিক কালচার ও কিডনি পরীক্ষা করা উচিত।',
    '[{"title":"Urinary Tract Infection (Cystitis / Pyelonephritis)","desc":"Bacterial colonization of bladder mucosa causing intense burning, urgency, frequency, and cloudy urine."},{"title":"Nephrolithiasis & Ureteric Calculi (Kidney Stones)","desc":"Mineral stones migrating down the ureter, abrading urothelium and causing colicky flank pain and dysuria."},{"title":"Dehydration & Hyper-concentrated Urine","desc":"Inadequate fluid intake leading to high solute concentration that chemically irritates the sensitive urethral lining."},{"title":"Benign Prostatic Hyperplasia (BPH) & Stasis","desc":"Prostatic enlargement obstructing bladder outlet, predisposing elderly men to urinary stasis and recurrent infections."},{"title":"Diabetic Neurogenic Bladder","desc":"Autonomic nerve damage leading to incomplete bladder voiding and recurrent opportunistic infections."}]'::jsonb,
    '[{"title":"মূত্রনালীর ব্যাকটেরিয়াল ইনফেকশন (UTI)","desc":"ব্যাকটেরিয়া সংক্রমণের কারণে মূত্রথলিতে তীব্র প্রদাহ, ঘনঘন প্রস্রাবের বেগ ও প্রস্রাবের সময় আগুনের মতো জ্বালাপোড়া।"},{"title":"কিডনি ও মূত্রথলিতে পাথর (Kidney Stones)","desc":"পাথর মূত্রনালী দিয়ে নামার সময় নালীতে ক্ষত তৈরি করা, যার ফলে তীব্র ব্যথার সাথে প্রস্রাবে রক্ত যেতে পারে।"},{"title":"পানিশূন্যতা বা প্রস্রাব অতিরিক্ত ঘন হওয়া","desc":"প্রচণ্ড গরমে কম পানি পানের কারণে প্রস্রাব হলুদ ও ঘন হয়ে মূত্রনালীর সংবেদনশীল স্তরে তীব্র জ্বালাপোড়া সৃষ্টি করা।"},{"title":"প্রোস্টেট বড় হয়ে যাওয়া (BPH - বয়স্ক পুরুষদের)","desc":"প্রোস্টেট বৃদ্ধির কারণে প্রস্রাবের রাস্তা সংকুচিত হয়ে প্রস্রাব আটকে থাকা ও বারবার ইনফেকশন হওয়া।"},{"title":"ডায়াবেটিসজনিত মূত্রথলির দুর্বলতা","desc":"রক্তে সুগার বেশি থাকার কারণে মূত্রনালীতে বারবার জীবাণু বংশবৃদ্ধি করা ও ইনফেকশন হওয়া।"}]'::jsonb,
    '["High spiking fever accompanied by shaking chills, severe lower back/flank pain (indicative of acute Pyelonephritis).","Visible blood in the urine (Gross Hematuria - red or cola-colored urine).","Complete inability to pass urine (Acute Urinary Retention) leading to excruciating lower abdominal distension.","Progressive swelling of both legs and face with significant drop in daily urine output."]'::jsonb,
    '["প্রস্রাবে জ্বালাপোড়ার সাথে কাঁপুনি দিয়ে তীব্র জ্বর আসা এবং কোমরের একপাশে তীব্র ব্যথা (কিডনি ইনফেকশন বা Pyelonephritis)।","প্রস্রাবের সাথে তাজা রক্ত বা লালচে/কোলা রঙের প্রস্রাব হওয়া (Hematuria)।","প্রস্রাব সম্পূর্ণ বন্ধ হয়ে যাওয়া এবং তলপেট ফুলে অসহ্য যন্ত্রণা হওয়া (Acute Urinary Retention)।","প্রস্রাবের পরিমাণ মারাত্মক কমে যাওয়া এবং পা ও চোখের নিচে পানি জমে ফুলে যাওয়া (কিডনি বিকলের প্রাথমিক লক্ষণ)।"]'::jsonb,
    '["Urine Routine and Microscopic Examination (Urine R/M/E for Pus cells, RBC, Epithelial cells)","Urine Culture & Sensitivity (Urine C/S - to identify exact bacterial strain and antibiotic sensitivity)","Ultrasonography of Kidneys, Ureters & Bladder (USG of KUB with Post-Void Residual / PVR volume)","Serum Creatinine, eGFR & Blood Urea Nitrogen (BUN)","Fasting Blood Sugar / HbA1c"]'::jsonb,
    '["ইউরিন রুটিন ও মাইক্রোস্কোপিক পরীক্ষা (Urine R/M/E - পুঁজ ও ব্যাকটেরিয়ার পরিমাণ দেখতে)","ইউরিন কালচার ও সেনসিটিভিটি (Urine C/S - কোন অ্যান্টিবায়োটিক কাজ করবে তা নিশ্চিত হতে)","কিডনি ও মূত্রথলির আল্ট্রাসনোগ্রাম (USG of KUB - পাথর ও প্রোস্টেট দেখতে)","কিডনির কার্যক্ষমতা পরীক্ষা (Serum Creatinine & eGFR)","রক্তে গ্লুকোজের মাত্রা (Fasting Blood Sugar)"]'::jsonb,
    'Dr. Hanif Towhid emphasizes culture-guided, kidney-safe antibiotic selection to avoid antimicrobial resistance, hydration therapy, urinary alkalinization, stone management, and glycemic control to preserve lifetime renal health.',
    'ডা. হানিফ আহমেদ তৌহিদ ইউরিন কালচার রিপোর্টের ভিত্তিতে কিডনি-সুরক্ষিত সুনির্দিষ্ট অ্যান্টিবায়োটিক প্রদান, পাথরের চিকিৎসা এবং প্রতিরোধমূলক পরামর্শের মাধ্যমে মূত্রনালীর ইনফেকশন ও জ্বালাপোড়ার স্থায়ী সমাধান নিশ্চিত করেন।',
    14
  )
ON CONFLICT (slug) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_bn = EXCLUDED.title_bn,
  category_en = EXCLUDED.category_en,
  category_bn = EXCLUDED.category_bn,
  organ_en = EXCLUDED.organ_en,
  organ_bn = EXCLUDED.organ_bn,
  image = EXCLUDED.image,
  short_desc_en = EXCLUDED.short_desc_en,
  short_desc_bn = EXCLUDED.short_desc_bn,
  overview_en = EXCLUDED.overview_en,
  overview_bn = EXCLUDED.overview_bn,
  causes_en = EXCLUDED.causes_en,
  causes_bn = EXCLUDED.causes_bn,
  red_flags_en = EXCLUDED.red_flags_en,
  red_flags_bn = EXCLUDED.red_flags_bn,
  investigations_en = EXCLUDED.investigations_en,
  investigations_bn = EXCLUDED.investigations_bn,
  management_en = EXCLUDED.management_en,
  management_bn = EXCLUDED.management_bn,
  order_index = EXCLUDED.order_index,
  updated_at = timezone('utc'::text, now());
