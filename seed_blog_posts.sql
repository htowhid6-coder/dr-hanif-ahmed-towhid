-- =========================================================================
-- Supabase SQL Query to insert 5 English Blog Posts for Dr. Hanif Towhid
-- Run this script in the Supabase SQL Editor
-- =========================================================================

-- Ensure all required columns exist on public.posts table
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS category VARCHAR(255);
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS category_bn VARCHAR(255);

-- -------------------------------------------------------------------------
-- Post: Urinary Tract Infection (UTI): Causes, Symptoms, Treatment and Prevention
-- -------------------------------------------------------------------------
INSERT INTO public.posts (
  slug,
  lang,
  title,
  excerpt,
  content,
  read_time,
  image_url,
  category,
  category_bn,
  is_published
) VALUES (
  'urinary-tract-infection',
  'en',
  'Urinary Tract Infection (UTI): Causes, Symptoms, Treatment and Prevention',
  'Suffering from burning urination, frequent urge to urinate, or lower abdominal pain? Learn the causes, symptoms, diagnosis, treatment and prevention of Urinary Tract Infection (UTI) from Dr. Hanif Ahmed Towhid, Medicine Specialist in Sylhet.',
  '<h2>Introduction</h2>
<p>Urinary Tract Infection, commonly known as UTI, is one of the most frequent bacterial infections seen in outpatient departments across Bangladesh. As a Medicine Specialist practicing in Sylhet, Dr. Hanif Ahmed Towhid regularly treats patients — especially women — who come in with complaints of burning urination, frequent urge to urinate, and lower abdominal discomfort. If left untreated, a simple UTI can progress into a serious kidney infection, so understanding this condition early is essential for every patient.</p>
<p>This comprehensive guide explains everything you need to know about urinary tract infections — from causes and symptoms to diagnosis, treatment options, and practical prevention tips — written to help patients in Sylhet and across Bangladesh make informed decisions about their urinary health.</p>
<h2>What Is a Urinary Tract Infection?</h2>
<p>A urinary tract infection occurs when harmful bacteria enter the urinary system — which includes the kidneys, ureters, bladder, and urethra — and begin to multiply. Most UTIs affect the lower urinary tract, specifically the bladder (cystitis) and urethra (urethritis). However, if the infection travels upward, it can reach the kidneys and cause a more severe condition called pyelonephritis, which requires urgent medical attention.</p>
<p>UTIs are extremely common, particularly among women, due to their shorter urethra, which allows bacteria easier access to the bladder. However, men, children, and elderly individuals can also develop urinary tract infections, sometimes due to underlying conditions like enlarged prostate, kidney stones, or diabetes.</p>
<h2>Common Causes of Urinary Tract Infection</h2>
<p>Understanding the root causes of UTI can help patients take preventive steps. The most common causes include:</p>
<ul>
  <li><strong>Bacterial invasion:</strong> The bacterium <em>Escherichia coli (E. coli)</em>, which normally lives in the intestines, is responsible for the vast majority of UTIs.</li>
  <li><strong>Poor personal hygiene:</strong> Improper wiping technique after using the toilet can transfer bacteria from the anal region to the urethra.</li>
  <li><strong>Holding urine for long periods:</strong> This allows bacteria to multiply in the bladder.</li>
  <li><strong>Sexual activity:</strong> Intercourse can push bacteria into the urethra, which is why UTIs are sometimes called "honeymoon cystitis."</li>
  <li><strong>Dehydration:</strong> Not drinking enough water reduces the frequency of urination, giving bacteria more time to grow.</li>
  <li><strong>Diabetes mellitus:</strong> High blood sugar levels create a favorable environment for bacterial growth and weaken the immune response.</li>
  <li><strong>Kidney stones or urinary tract obstruction:</strong> These block the normal flow of urine, increasing infection risk.</li>
  <li><strong>Catheter use:</strong> Patients who require urinary catheters, especially in hospital settings, are at higher risk of infection.</li>
  <li><strong>Pregnancy:</strong> Hormonal and physical changes during pregnancy increase susceptibility to UTIs.</li>
  <li><strong>Menopause:</strong> Reduced estrogen levels change the vaginal and urinary tract flora, increasing infection risk in older women.</li>
</ul>
<h2>Symptoms of Urinary Tract Infection</h2>
<p>The symptoms of UTI vary depending on which part of the urinary tract is affected. Common signs and symptoms include:</p>
<h3>Lower Urinary Tract Infection (Bladder/Urethra)</h3>
<ul>
  <li>Burning sensation or pain during urination</li>
  <li>Frequent urge to urinate, even when the bladder is nearly empty</li>
  <li>Passing small amounts of urine frequently</li>
  <li>Cloudy, dark, or strong-smelling urine</li>
  <li>Blood in the urine (hematuria)</li>
  <li>Pain or pressure in the lower abdomen or pelvis</li>
  <li>General discomfort or feeling unwell</li>
</ul>
<h3>Upper Urinary Tract Infection (Kidney Infection)</h3>
<p>If the infection spreads to the kidneys, symptoms become more severe and may include:</p>
<ul>
  <li>High fever with chills</li>
  <li>Severe pain in the back or sides (flank pain)</li>
  <li>Nausea and vomiting</li>
  <li>Fatigue and general weakness</li>
</ul>
<p><strong>Important:</strong> Kidney infection is a medical emergency. If you experience fever along with back pain and urinary symptoms, you should consult a Medicine Specialist immediately.</p>
<h2>Who Is Most at Risk?</h2>
<p>Certain groups of people face a higher risk of developing urinary tract infections:</p>
<ul>
  <li>Women, especially those who are sexually active</li>
  <li>Pregnant women</li>
  <li>Postmenopausal women</li>
  <li>People with diabetes</li>
  <li>Elderly individuals</li>
  <li>Patients with kidney stones or structural abnormalities in the urinary tract</li>
  <li>Individuals using urinary catheters</li>
  <li>People with weakened immune systems</li>
</ul>
<h2>How Is UTI Diagnosed?</h2>
<p>When a patient presents with symptoms suggestive of a urinary tract infection, Dr. Hanif Ahmed Towhid follows a systematic diagnostic approach:</p>
<ol>
  <li><strong>Clinical history and physical examination:</strong> Reviewing symptoms, duration, and risk factors.</li>
  <li><strong>Urine routine microscopic examination (R/M/E):</strong> This test checks for the presence of white blood cells, red blood cells, and bacteria in the urine.</li>
  <li><strong>Urine culture and sensitivity test:</strong> This identifies the exact bacteria causing the infection and determines which antibiotics will be most effective — crucial for accurate treatment and avoiding antibiotic resistance.</li>
  <li><strong>Ultrasonography of the kidney, ureter, and bladder (KUB):</strong> Recommended for recurrent infections to rule out stones, obstruction, or structural abnormalities.</li>
  <li><strong>Blood tests:</strong> In cases of suspected kidney infection, blood tests including complete blood count (CBC), kidney function tests, and blood sugar levels may be ordered.</li>
</ol>
<h2>Treatment of Urinary Tract Infection</h2>
<p>Treatment depends on the severity and location of the infection.</p>
<h3>Uncomplicated UTI (Bladder Infection)</h3>
<ul>
  <li>A short course of oral antibiotics, prescribed based on local resistance patterns and, when available, urine culture sensitivity results</li>
  <li>Adequate fluid intake to help flush out bacteria</li>
  <li>Pain relief medication if needed for discomfort</li>
</ul>
<h3>Complicated UTI or Kidney Infection</h3>
<ul>
  <li>Longer course of antibiotics, sometimes requiring hospital admission</li>
  <li>Intravenous fluids and, in severe cases, intravenous antibiotics</li>
  <li>Close monitoring of kidney function</li>
</ul>
<h3>Important Note on Antibiotic Use</h3>
<p>One of the biggest concerns in Bangladesh today is the misuse of antibiotics without proper prescription, which leads to antibiotic resistance. Patients should <strong>never self-medicate</strong> with antibiotics purchased over the counter. Always consult a qualified Medicine Specialist for proper diagnosis and a tailored treatment plan, and always complete the full course of antibiotics as prescribed, even if symptoms improve early.</p>
<h2>Complications of Untreated UTI</h2>
<p>If a urinary tract infection is ignored or inadequately treated, it can lead to serious complications:</p>
<ul>
  <li><strong>Recurrent infections:</strong> Some patients experience UTIs repeatedly, requiring long-term management strategies.</li>
  <li><strong>Kidney damage:</strong> Repeated kidney infections can cause permanent scarring and reduced kidney function.</li>
  <li><strong>Sepsis:</strong> In severe, untreated cases, the infection can spread into the bloodstream, becoming life-threatening.</li>
  <li><strong>Pregnancy complications:</strong> Untreated UTIs during pregnancy are associated with premature labor and low birth weight.</li>
</ul>
<h2>Prevention Tips for Urinary Tract Infection</h2>
<p>Prevention is always better than cure. Dr. Hanif Ahmed Towhid recommends the following practical steps to reduce your risk of UTI:</p>
<ol>
  <li><strong>Drink plenty of water:</strong> Aim for at least 8–10 glasses of water daily to flush bacteria out of the urinary tract.</li>
  <li><strong>Do not hold urine:</strong> Urinate as soon as you feel the urge, and try to empty your bladder completely each time.</li>
  <li><strong>Practice proper hygiene:</strong> Always wipe from front to back after using the toilet.</li>
  <li><strong>Urinate after sexual intercourse:</strong> This helps flush out any bacteria that may have entered the urethra.</li>
  <li><strong>Avoid irritating feminine products:</strong> Scented soaps, douches, and powders can disrupt the natural bacterial balance.</li>
  <li><strong>Wear breathable cotton underwear:</strong> Avoid tight synthetic fabrics that trap moisture.</li>
  <li><strong>Control blood sugar:</strong> If you have diabetes, keeping your blood sugar well-controlled reduces infection risk.</li>
  <li><strong>Consider cranberry products:</strong> Some studies suggest cranberry juice or supplements may help reduce recurrent UTIs, though this should not replace medical treatment.</li>
  <li><strong>Treat constipation promptly:</strong> Chronic constipation can increase UTI risk in some individuals.</li>
  <li><strong>Regular checkups:</strong> If you experience recurrent UTIs, a thorough evaluation is necessary to identify underlying causes.</li>
</ol>
<h2>When Should You See a Medicine Specialist?</h2>
<p>You should seek medical consultation promptly if you experience:</p>
<ul>
  <li>Burning sensation during urination lasting more than a day</li>
  <li>Fever with urinary symptoms</li>
  <li>Blood in urine</li>
  <li>Severe lower abdominal or back pain</li>
  <li>Recurrent UTIs (three or more per year)</li>
  <li>UTI symptoms during pregnancy</li>
</ul>
<p>Early diagnosis and appropriate treatment prevent complications and provide faster relief.</p>
<h2>Conclusion</h2>
<p>Urinary tract infection is a common but manageable condition when diagnosed and treated properly. Ignoring symptoms or relying on self-medication can lead to recurrent infections and, in severe cases, permanent kidney damage. If you or a loved one in Sylhet is experiencing symptoms of UTI, don''t delay — proper evaluation by a qualified Medicine Specialist ensures accurate diagnosis and effective, safe treatment.</p>
<hr />
<h2>About Dr. Hanif Ahmed Towhid</h2>
<p><strong>Dr. Hanif Ahmed Towhid</strong></p>
<p>MBBS, MCPS (Medicine), FCPS (Medicine)</p>
<p>Medicine Specialist</p>
<p>Registrar (Department of Medicine), Sylhet MAG Osmani Medical College Hospital</p>
<p><strong>Chamber:</strong> Popular Medical Center Ltd. (Room 605), New Medical Road, Kazalshah, Sylhet</p>
<p><strong>Patient Viewing Hours:</strong> 5:00 PM – 9:00 PM (Friday & Tuesday Closed)</p>
<p>If you are experiencing symptoms of urinary tract infection or any other internal medicine concern, book an appointment with Dr. Hanif Ahmed Towhid at Popular Medical Center Ltd., Sylhet, for expert diagnosis and personalized treatment.</p>',
  '7 min read',
  '/blogs/blogimage/urinary-tract-infection.png',
  'Nephrology & Urology',
  'ইউরিন ও কিডনি রোগ',
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  lang = EXCLUDED.lang,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  read_time = EXCLUDED.read_time,
  image_url = EXCLUDED.image_url,
  category = EXCLUDED.category,
  category_bn = EXCLUDED.category_bn,
  is_published = EXCLUDED.is_published,
  updated_at = timezone('utc'::text, now());

-- -------------------------------------------------------------------------
-- Post: Typhoid Fever: Symptoms, Causes, Diagnosis and Treatment
-- -------------------------------------------------------------------------
INSERT INTO public.posts (
  slug,
  lang,
  title,
  excerpt,
  content,
  read_time,
  image_url,
  category,
  category_bn,
  is_published
) VALUES (
  'typhoid-fever',
  'en',
  'Typhoid Fever: Symptoms, Causes, Diagnosis and Treatment',
  'Typhoid fever remains a major health concern in Bangladesh. Learn the causes, symptoms, diagnosis, treatment and prevention of typhoid from Dr. Hanif Ahmed Towhid, Medicine Specialist and Registrar (Medicine), Sylhet Osmani Medical College Hospital.',
  '<h2>Introduction</h2>
<p>Typhoid fever is one of the most common infectious diseases diagnosed in medicine outpatient departments throughout Bangladesh, particularly in Sylhet and surrounding regions where contaminated water and food remain significant public health challenges. As a Medicine Specialist, Dr. Hanif Ahmed Towhid frequently encounters patients presenting with prolonged fever, weakness, and abdominal discomfort — classic signs of this bacterial infection.</p>
<p>Despite being a well-known disease, many patients still misunderstand typhoid fever, often confusing it with viral fever or delaying proper treatment. This detailed guide covers everything you need to know about typhoid — its causes, symptoms, diagnosis, treatment, and most importantly, how to prevent it.</p>
<h2>What Is Typhoid Fever?</h2>
<p>Typhoid fever is a systemic bacterial infection caused by <em>Salmonella enterica</em> serotype Typhi (commonly called <em>Salmonella Typhi</em>). The bacteria spread through contaminated food and water, particularly in areas with poor sanitation. Once ingested, the bacteria travel through the intestinal wall into the bloodstream, causing a prolonged, systemic illness that affects multiple organ systems if left untreated.</p>
<p>Typhoid is endemic in South Asia, including Bangladesh, and cases tend to rise during the monsoon season when water contamination is more common.</p>
<h2>How Does Typhoid Spread?</h2>
<p>Typhoid fever spreads primarily through the fecal-oral route. Common modes of transmission include:</p>
<ul>
  <li><strong>Contaminated drinking water:</strong> Water sources contaminated with sewage are a leading cause of outbreaks.</li>
  <li><strong>Contaminated food:</strong> Food prepared or washed with contaminated water, or handled by an infected person with poor hand hygiene.</li>
  <li><strong>Street food and unhygienic food handling:</strong> Roadside food stalls with inadequate sanitation practices are a common source of infection in urban areas.</li>
  <li><strong>Carriers:</strong> Some individuals who have recovered from typhoid continue to carry the bacteria in their gallbladder and can unknowingly spread the infection through food handling.</li>
  <li><strong>Poor sanitation infrastructure:</strong> Areas lacking proper sewage treatment and clean water supply see higher rates of typhoid.</li>
</ul>
<h2>Symptoms of Typhoid Fever</h2>
<p>Typhoid fever typically develops gradually over one to three weeks after exposure to the bacteria. Symptoms often worsen progressively if untreated.</p>
<h3>Early Symptoms (Week 1)</h3>
<ul>
  <li>Gradually rising fever, often reaching 103–104°F (39–40°C)</li>
  <li>Fever that is typically higher in the evening (stepladder pattern)</li>
  <li>Headache</li>
  <li>Weakness and fatigue</li>
  <li>Loss of appetite</li>
  <li>Abdominal discomfort</li>
  <li>Constipation (more common in adults) or diarrhea (more common in children)</li>
  <li>Dry cough</li>
</ul>
<h3>Progressive Symptoms (Week 2–3, if untreated)</h3>
<ul>
  <li>Sustained high fever</li>
  <li>Rose-colored spots on the chest and abdomen (in some patients)</li>
  <li>Severe abdominal pain and distension</li>
  <li>Enlarged liver and spleen</li>
  <li>Confusion or altered mental status in severe cases</li>
  <li>Extreme weakness and dehydration</li>
</ul>
<h3>Serious Complications (if left untreated)</h3>
<ul>
  <li>Intestinal bleeding</li>
  <li>Intestinal perforation (a surgical emergency)</li>
  <li>Typhoid encephalopathy (brain involvement)</li>
  <li>Sepsis</li>
</ul>
<p><strong>Important:</strong> Because early symptoms of typhoid overlap with many other febrile illnesses like dengue, malaria, and viral fever, self-diagnosis is dangerous. Proper laboratory testing is essential.</p>
<h2>How Is Typhoid Diagnosed?</h2>
<p>Accurate diagnosis is critical because typhoid fever requires specific antibiotic treatment. Dr. Hanif Ahmed Towhid typically follows this diagnostic pathway:</p>
<ol>
  <li><strong>Clinical assessment:</strong> Detailed history of fever pattern, duration, and associated symptoms.</li>
  <li><strong>Blood culture:</strong> Considered the gold standard for diagnosing typhoid, especially in the first week of illness, as it directly detects <em>Salmonella Typhi</em> in the blood.</li>
  <li><strong>Widal test:</strong> A commonly used serological test in Bangladesh, though it has limitations in accuracy and should be interpreted carefully alongside clinical findings.</li>
  <li><strong>Complete blood count (CBC):</strong> Often shows a low or normal white blood cell count in typhoid, which helps differentiate it from other bacterial infections.</li>
  <li><strong>Typhidot or other rapid diagnostic tests:</strong> May be used to detect specific antibodies against <em>Salmonella Typhi</em>.</li>
  <li><strong>Stool and urine culture:</strong> Occasionally used, particularly to identify carriers.</li>
</ol>
<p>It''s important to note that no single test is 100% definitive, which is why an experienced Medicine Specialist correlates laboratory findings with the patient''s clinical presentation before confirming diagnosis and starting treatment.</p>
<h2>Treatment of Typhoid Fever</h2>
<p>Typhoid fever is a bacterial infection and requires prompt antibiotic treatment under medical supervision.</p>
<h3>Antibiotic Therapy</h3>
<p>The choice of antibiotic depends on local resistance patterns, severity of illness, and patient-specific factors such as pregnancy or allergies. Commonly used antibiotic classes include fluoroquinolones, third-generation cephalosporins, and azithromycin, prescribed strictly according to a physician''s assessment.</p>
<h3>Supportive Care</h3>
<ul>
  <li><strong>Adequate hydration:</strong> Oral rehydration solution or intravenous fluids in cases of severe dehydration</li>
  <li><strong>Fever management:</strong> Paracetamol for fever control, avoiding aspirin and NSAIDs</li>
  <li><strong>Nutritional support:</strong> Light, easily digestible, high-calorie meals during recovery</li>
  <li><strong>Rest:</strong> Adequate physical rest is essential for recovery</li>
</ul>
<h3>Hospitalization</h3>
<p>Patients with severe symptoms, signs of complications (such as intestinal bleeding or perforation), significant dehydration, or those who are not responding to outpatient treatment may require hospital admission for close monitoring and intravenous therapy.</p>
<h3>Why Self-Medication Is Dangerous</h3>
<p>Many patients in Bangladesh attempt to treat fever with over-the-counter antibiotics without proper diagnosis. This practice is extremely risky because:</p>
<ul>
  <li>Incorrect or incomplete antibiotic courses contribute to antibiotic resistance</li>
  <li>Untreated or inadequately treated typhoid can progress to life-threatening complications</li>
  <li>Symptoms may temporarily improve while the underlying infection persists, leading to relapse</li>
</ul>
<p>Always consult a qualified Medicine Specialist for proper diagnosis and treatment.</p>
<h2>Complications of Untreated Typhoid</h2>
<p>If typhoid fever is not diagnosed and treated promptly, serious complications can develop, including:</p>
<ul>
  <li><strong>Intestinal perforation:</strong> A life-threatening emergency requiring immediate surgery</li>
  <li><strong>Gastrointestinal bleeding:</strong> Can range from mild to severe</li>
  <li><strong>Typhoid encephalopathy:</strong> Confusion, delirium, or altered consciousness</li>
  <li><strong>Relapse:</strong> Recurrence of symptoms after apparent recovery</li>
  <li><strong>Chronic carrier state:</strong> Some individuals continue to harbor the bacteria and can transmit it to others even after symptoms resolve</li>
</ul>
<h2>Prevention of Typhoid Fever</h2>
<p>Prevention is particularly important in regions like Sylhet where water contamination risk is significant, especially during monsoon season. Dr. Hanif Ahmed Towhid recommends the following preventive measures:</p>
<ol>
  <li><strong>Drink safe water:</strong> Always drink boiled or properly filtered/purified water. Avoid water from unreliable sources.</li>
  <li><strong>Practice good hand hygiene:</strong> Wash hands thoroughly with soap before eating and after using the toilet.</li>
  <li><strong>Eat properly cooked food:</strong> Avoid raw or undercooked food, especially from street vendors with questionable hygiene practices.</li>
  <li><strong>Wash fruits and vegetables:</strong> Use clean water to wash produce before consumption, or peel fruits when possible.</li>
  <li><strong>Avoid ice from unknown sources:</strong> Ice made from contaminated water is a common hidden source of infection.</li>
  <li><strong>Typhoid vaccination:</strong> Vaccines are available and recommended, particularly for children, travelers to endemic areas, and individuals at higher risk. Consult your Medicine Specialist about vaccination options.</li>
  <li><strong>Maintain proper sanitation:</strong> Ensure proper disposal of waste and access to clean toilet facilities.</li>
  <li><strong>Isolate and treat carriers:</strong> Individuals who have recovered from typhoid should follow up with stool testing to rule out carrier status, especially if involved in food handling.</li>
</ol>
<h2>When Should You See a Medicine Specialist?</h2>
<p>Seek medical attention promptly if you experience:</p>
<ul>
  <li>Fever lasting more than 3 days, especially if it is persistently high</li>
  <li>Fever accompanied by severe abdominal pain, distension, or vomiting</li>
  <li>Signs of dehydration (reduced urination, dizziness, dry mouth)</li>
  <li>Confusion or unusual drowsiness</li>
  <li>Blood in stool or vomit</li>
</ul>
<h2>Conclusion</h2>
<p>Typhoid fever remains a significant public health concern in Bangladesh, but with early diagnosis and appropriate antibiotic treatment, most patients recover fully without complications. The key is not to ignore prolonged fever or attempt self-treatment with random medications. If you or a family member in Sylhet is experiencing symptoms suggestive of typhoid, timely consultation with a qualified Medicine Specialist can prevent serious complications and ensure a faster, safer recovery.</p>
<hr />
<h2>About Dr. Hanif Ahmed Towhid</h2>
<p><strong>Dr. Hanif Ahmed Towhid</strong></p>
<p>MBBS, MCPS (Medicine), FCPS (Medicine)</p>
<p>Medicine Specialist</p>
<p>Registrar (Department of Medicine), Sylhet MAG Osmani Medical College Hospital</p>
<p><strong>Chamber:</strong> Popular Medical Center Ltd. (Room 605), New Medical Road, Kazalshah, Sylhet</p>
<p><strong>Patient Viewing Hours:</strong> 5:00 PM – 9:00 PM (Friday & Tuesday Closed)</p>
<p>For accurate diagnosis and expert treatment of typhoid fever or any other internal medicine condition, visit Dr. Hanif Ahmed Towhid at Popular Medical Center Ltd., Sylhet.</p>',
  '6 min read',
  '/blogs/blogimage/Typhoid.png',
  'Infectious Diseases',
  'সংক্রামক রোগ ও জ্বর',
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  lang = EXCLUDED.lang,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  read_time = EXCLUDED.read_time,
  image_url = EXCLUDED.image_url,
  category = EXCLUDED.category,
  category_bn = EXCLUDED.category_bn,
  is_published = EXCLUDED.is_published,
  updated_at = timezone('utc'::text, now());

-- -------------------------------------------------------------------------
-- Post: High Cholesterol: What's the Problem and What to Do
-- -------------------------------------------------------------------------
INSERT INTO public.posts (
  slug,
  lang,
  title,
  excerpt,
  content,
  read_time,
  image_url,
  category,
  category_bn,
  is_published
) VALUES (
  'high-cholesterol',
  'en',
  'High Cholesterol: What''s the Problem and What to Do',
  'High cholesterol silently increases your risk of heart attack and stroke. Learn what causes high cholesterol, its warning signs, and practical steps to control it from Dr. Hanif Ahmed Towhid, Medicine Specialist, Sylhet Osmani Medical College Hospital.',
  '<h2>Introduction</h2>
<p>High cholesterol is often called a "silent" health problem because it typically causes no noticeable symptoms until it leads to a serious event like a heart attack or stroke. As a Medicine Specialist in Sylhet, Dr. Hanif Ahmed Towhid regularly sees patients who are shocked to learn they have dangerously high cholesterol levels — discovered only during a routine checkup or, unfortunately, after a cardiovascular emergency.</p>
<p>With changing dietary habits, increasing consumption of fried and processed foods, and more sedentary lifestyles across Bangladesh, high cholesterol has become an increasingly common problem, even among younger adults. This guide explains what high cholesterol really means, why it matters, and most importantly, what you can do about it.</p>
<h2>What Is Cholesterol?</h2>
<p>Cholesterol is a waxy, fat-like substance that your body needs to build healthy cells, produce hormones, and support digestion. Your liver produces most of the cholesterol your body needs, while the rest comes from the food you eat, particularly animal products.</p>
<p>Cholesterol travels through your bloodstream attached to proteins, forming particles called lipoproteins. There are two main types relevant to health:</p>
<ul>
  <li><strong>LDL (Low-Density Lipoprotein):</strong> Often called "bad" cholesterol because high levels lead to plaque buildup in the arteries.</li>
  <li><strong>HDL (High-Density Lipoprotein):</strong> Known as "good" cholesterol because it helps remove excess cholesterol from the bloodstream, transporting it back to the liver for elimination.</li>
</ul>
<p>There''s also <strong>triglycerides</strong>, another type of fat in the blood that, when elevated, further increases cardiovascular risk.</p>
<h2>What Is the Problem with High Cholesterol?</h2>
<p>When LDL cholesterol levels are too high, or HDL levels are too low, cholesterol can begin to accumulate on the walls of your arteries. Over time, this buildup — called plaque — narrows and hardens the arteries, a condition known as <strong>atherosclerosis</strong>.</p>
<p>This narrowing restricts blood flow and creates serious risks:</p>
<ul>
  <li><strong>Reduced blood flow to the heart:</strong> Can cause chest pain (angina) and eventually lead to a heart attack.</li>
  <li><strong>Reduced blood flow to the brain:</strong> Increases the risk of stroke.</li>
  <li><strong>Peripheral artery disease:</strong> Reduced blood flow to the limbs, causing pain and, in severe cases, tissue damage.</li>
  <li><strong>Blood clot formation:</strong> Plaque can rupture, triggering a blood clot that can suddenly block an artery entirely — this is how many heart attacks and strokes occur.</li>
</ul>
<p>The most concerning aspect of high cholesterol is that it develops silently over years, often without any warning symptoms, which is why regular screening is so important.</p>
<h2>Causes and Risk Factors of High Cholesterol</h2>
<p>Several factors contribute to elevated cholesterol levels:</p>
<h3>Modifiable Risk Factors</h3>
<ul>
  <li><strong>Unhealthy diet:</strong> High intake of saturated fats, trans fats, and fried foods (common in traditional Bangladeshi cuisine involving heavy oil and ghee)</li>
  <li><strong>Physical inactivity:</strong> Sedentary lifestyle lowers HDL (good) cholesterol</li>
  <li><strong>Obesity:</strong> Excess body weight is strongly linked to elevated LDL and triglycerides, and lower HDL</li>
  <li><strong>Smoking:</strong> Damages blood vessels and lowers HDL cholesterol</li>
  <li><strong>Excessive alcohol consumption:</strong> Can raise triglyceride levels</li>
  <li><strong>Uncontrolled diabetes:</strong> High blood sugar contributes to abnormal cholesterol levels</li>
  <li><strong>Stress:</strong> Chronic stress may indirectly affect cholesterol through poor lifestyle habits</li>
</ul>
<h3>Non-Modifiable Risk Factors</h3>
<ul>
  <li><strong>Genetics/Family history:</strong> Some people inherit a condition called familial hypercholesterolemia, causing very high cholesterol from a young age</li>
  <li><strong>Age:</strong> Cholesterol levels tend to rise naturally with age</li>
  <li><strong>Gender:</strong> Men generally have higher risk at younger ages, while women''s risk increases after menopause</li>
</ul>
<h2>Symptoms: Why High Cholesterol Often Goes Unnoticed</h2>
<p>In most cases, high cholesterol itself does not cause any symptoms. This is precisely why it is so dangerous — many people don''t realize they have a problem until they experience a cardiovascular event.</p>
<p>However, in severe or long-standing cases, some signs may appear:</p>
<ul>
  <li><strong>Xanthomas:</strong> Yellowish fatty deposits under the skin, often around the eyes or joints</li>
  <li><strong>Chest pain or discomfort:</strong> May indicate reduced blood flow to the heart due to advanced plaque buildup</li>
  <li><strong>Symptoms of peripheral artery disease:</strong> Leg pain during walking that improves with rest</li>
</ul>
<p>Because of this silent nature, Dr. Hanif Ahmed Towhid strongly emphasizes that <strong>the only reliable way to know your cholesterol status is through a blood test</strong> — not by how you feel.</p>
<h2>How Is High Cholesterol Diagnosed?</h2>
<p>Diagnosis is made through a simple blood test called a <strong>lipid profile</strong>, which measures:</p>
<ul>
  <li>Total cholesterol</li>
  <li>LDL cholesterol</li>
  <li>HDL cholesterol</li>
  <li>Triglycerides</li>
</ul>
<p>This test is usually done after fasting for 9–12 hours for the most accurate results. Based on your results, age, and other risk factors like blood pressure, diabetes, and family history, your Medicine Specialist will assess your overall cardiovascular risk and recommend an appropriate management plan.</p>
<p><strong>Recommended screening:</strong> Adults over 20 years old should have their cholesterol checked at least once every 4–6 years, and more frequently if you have risk factors like diabetes, hypertension, obesity, smoking, or a family history of heart disease.</p>
<h2>What to Do About High Cholesterol: Treatment and Management</h2>
<p>The good news is that high cholesterol is highly manageable through a combination of lifestyle changes and, when necessary, medication.</p>
<h3>1. Dietary Changes</h3>
<ul>
  <li><strong>Reduce saturated and trans fats:</strong> Limit red meat, full-fat dairy, fried foods, and baked goods made with hydrogenated oils</li>
  <li><strong>Increase fiber intake:</strong> Foods like oats, lentils (daal), beans, fruits, and vegetables help lower LDL cholesterol</li>
  <li><strong>Choose healthy fats:</strong> Use mustard oil or olive oil in moderation instead of ghee or heavily saturated cooking oils; include nuts and fatty fish like hilsa or salmon</li>
  <li><strong>Limit sugar and refined carbohydrates:</strong> These can raise triglyceride levels</li>
  <li><strong>Reduce salt intake:</strong> Helps control blood pressure, which compounds cardiovascular risk alongside high cholesterol</li>
</ul>
<h3>2. Physical Activity</h3>
<ul>
  <li>Aim for at least 150 minutes of moderate exercise per week, such as brisk walking, cycling, or swimming</li>
  <li>Regular physical activity helps raise HDL (good) cholesterol and lower LDL and triglycerides</li>
  <li>Even simple changes like taking stairs instead of elevators and walking instead of using rickshaws for short distances can help</li>
</ul>
<h3>3. Weight Management</h3>
<ul>
  <li>Losing even 5–10% of body weight can significantly improve cholesterol levels</li>
  <li>Focus on sustainable, gradual weight loss rather than crash diets</li>
</ul>
<h3>4. Quit Smoking</h3>
<ul>
  <li>Quitting smoking improves HDL cholesterol levels and significantly reduces cardiovascular risk within just weeks of cessation</li>
</ul>
<h3>5. Limit Alcohol Consumption</h3>
<ul>
  <li>If you drink alcohol, do so in moderation, as excessive intake raises triglycerides</li>
</ul>
<h3>6. Medications</h3>
<p>When lifestyle changes alone are not enough, or when cardiovascular risk is high, your Medicine Specialist may prescribe cholesterol-lowering medications such as statins or other lipid-lowering agents. These medications are highly effective but should always be taken under proper medical supervision, with periodic monitoring of liver function and cholesterol levels.</p>
<p><strong>Important:</strong> Never start or stop cholesterol medication on your own. Dosage and choice of medication depend on your individual risk profile, other health conditions, and lab results.</p>
<h3>7. Manage Related Conditions</h3>
<p>Since high cholesterol often coexists with diabetes and high blood pressure, managing these conditions together is essential for reducing overall cardiovascular risk.</p>
<h2>Complications of Untreated High Cholesterol</h2>
<p>If left unmanaged, high cholesterol significantly increases the risk of:</p>
<ul>
  <li>Heart attack (myocardial infarction)</li>
  <li>Stroke</li>
  <li>Peripheral artery disease</li>
  <li>Coronary artery disease</li>
  <li>Sudden cardiac events</li>
</ul>
<h2>Prevention Tips</h2>
<ul>
  <li>Maintain a balanced, low-fat diet rich in fiber, fruits, and vegetables</li>
  <li>Exercise regularly</li>
  <li>Maintain a healthy body weight</li>
  <li>Avoid smoking and limit alcohol</li>
  <li>Get regular health checkups, including lipid profile testing, especially if you have a family history of heart disease</li>
  <li>Manage stress through healthy coping mechanisms</li>
</ul>
<h2>When Should You See a Medicine Specialist?</h2>
<p>You should consult a Medicine Specialist if:</p>
<ul>
  <li>You are over 20 years old and haven''t had a cholesterol check recently</li>
  <li>You have a family history of high cholesterol or early heart disease</li>
  <li>You have diabetes, high blood pressure, or are overweight</li>
  <li>You smoke or have other cardiovascular risk factors</li>
  <li>You experience chest pain, shortness of breath, or leg pain during walking</li>
</ul>
<h2>Conclusion</h2>
<p>High cholesterol may not cause symptoms, but its consequences — heart attack and stroke — can be devastating and sudden. The good news is that with early detection through simple blood testing and consistent lifestyle changes, high cholesterol is very manageable. If you haven''t checked your cholesterol levels recently, or if you have risk factors for heart disease, don''t wait for symptoms to appear. Schedule a consultation with a qualified Medicine Specialist today.</p>
<hr />
<h2>About Dr. Hanif Ahmed Towhid</h2>
<p><strong>Dr. Hanif Ahmed Towhid</strong></p>
<p>MBBS, MCPS (Medicine), FCPS (Medicine)</p>
<p>Medicine Specialist</p>
<p>Registrar (Department of Medicine), Sylhet MAG Osmani Medical College Hospital</p>
<p><strong>Chamber:</strong> Popular Medical Center Ltd. (Room 605), New Medical Road, Kazalshah, Sylhet</p>
<p><strong>Patient Viewing Hours:</strong> 5:00 PM – 9:00 PM (Friday & Tuesday Closed)</p>
<p>For personalized cholesterol screening, heart health risk assessment, and expert management, book your appointment with Dr. Hanif Ahmed Towhid at Popular Medical Center Ltd., Sylhet.</p>',
  '7 min read',
  '/blogs/blogimage/high-cholesterol.png',
  'Cardiovascular Care',
  'উচ্চ রক্তচাপ ও হৃদরোগ',
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  lang = EXCLUDED.lang,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  read_time = EXCLUDED.read_time,
  image_url = EXCLUDED.image_url,
  category = EXCLUDED.category,
  category_bn = EXCLUDED.category_bn,
  is_published = EXCLUDED.is_published,
  updated_at = timezone('utc'::text, now());

-- -------------------------------------------------------------------------
-- Post: 5 Steps You Should Take When Having Severe Chest Pain
-- -------------------------------------------------------------------------
INSERT INTO public.posts (
  slug,
  lang,
  title,
  excerpt,
  content,
  read_time,
  image_url,
  category,
  category_bn,
  is_published
) VALUES (
  '5-steps-severe-chest-pain',
  'en',
  '5 Steps You Should Take When Having Severe Chest Pain',
  'Severe chest pain can be a sign of a heart attack. Learn the 5 critical steps to take immediately during severe chest pain, and when to rush to the hospital, from Dr. Hanif Ahmed Towhid, Medicine Specialist, Sylhet Osmani Medical College Hospital.',
  '<h2>Introduction</h2>
<p>Severe chest pain is one of the most frightening symptoms a person can experience — and for good reason. It can be a warning sign of a heart attack, a life-threatening emergency where every minute matters. As a Medicine Specialist working in the emergency and inpatient departments of Sylhet MAG Osmani Medical College Hospital, Dr. Hanif Ahmed Towhid has seen firsthand how the actions taken in the first few minutes of severe chest pain can make the difference between life and death.</p>
<p>Unfortunately, in Bangladesh, many patients delay seeking help, mistake heart attack symptoms for gas or indigestion, or don''t know what steps to take in those critical first moments. This guide outlines exactly what to do — and what not to do — when you or someone near you experiences severe chest pain.</p>
<h2>Understanding Severe Chest Pain</h2>
<p>Chest pain can arise from many causes, ranging from relatively harmless conditions like muscle strain or acid reflux to life-threatening emergencies like heart attack, aortic dissection, or pulmonary embolism. Because it is impossible to reliably distinguish a dangerous cause from a harmless one without medical evaluation, <strong>all severe or new chest pain should be treated as a potential emergency</strong> until proven otherwise.</p>
<h3>Warning Signs That Suggest a Heart-Related Emergency</h3>
<ul>
  <li>Pain or pressure in the center or left side of the chest, often described as tightness, squeezing, or heaviness</li>
  <li>Pain radiating to the left arm, jaw, neck, or back</li>
  <li>Shortness of breath</li>
  <li>Sweating (cold, clammy skin)</li>
  <li>Nausea or vomiting</li>
  <li>Dizziness or lightheadedness</li>
  <li>A sense of impending doom</li>
  <li>Pain that worsens with exertion and improves with rest (though heart attack pain often does NOT go away with rest)</li>
</ul>
<p>If any of these symptoms accompany chest pain, immediate action is essential.</p>
<h2>The 5 Critical Steps When Experiencing Severe Chest Pain</h2>
<h3>Step 1: Stop All Activity and Sit or Lie Down Immediately</h3>
<p>The moment severe chest pain begins, stop whatever you are doing. Physical exertion increases the heart''s oxygen demand, which can worsen a heart attack in progress. Sit down in a comfortable position, ideally with your back supported, or lie down with your upper body slightly elevated. Try to stay as calm as possible — panic increases heart rate and can worsen symptoms, though this is understandably difficult in such a frightening moment.</p>
<p><strong>Do NOT:</strong></p>
<ul>
  <li>Continue working, walking, or driving</li>
  <li>Try to "push through" the pain</li>
  <li>Lie flat if you''re having difficulty breathing — a semi-reclined position is often more comfortable</li>
</ul>
<h3>Step 2: Call for Emergency Help Immediately</h3>
<p>Do not wait to see if the pain goes away on its own. Call emergency medical services or have someone take you to the nearest hospital with emergency and cardiac care facilities immediately. In Sylhet, hospitals like Sylhet MAG Osmani Medical College Hospital and other facilities with emergency departments should be your destination for suspected heart attack.</p>
<p><strong>Do NOT:</strong></p>
<ul>
  <li>Drive yourself to the hospital if at all possible — arrange for someone else to drive, or call for an ambulance, since you could lose consciousness</li>
  <li>Wait several hours to "see if it gets better" — time is critical in heart attacks; damage to heart muscle increases with every passing minute</li>
  <li>Try to visit a local pharmacy for over-the-counter pain relief instead of going to a hospital</li>
</ul>
<h3>Step 3: Take Aspirin, If Available and Not Contraindicated</h3>
<p>If a heart attack is suspected, and the person is not allergic to aspirin and has no history of bleeding disorders, chewing a standard aspirin tablet (typically 300mg, or as advised by emergency medical guidance) can help by thinning the blood and potentially limiting damage from a forming blood clot in the coronary artery.</p>
<p><strong>Important cautions:</strong></p>
<ul>
  <li>This step should only be taken if you strongly suspect a heart attack, and ideally after or while contacting emergency services</li>
  <li>Do not give aspirin to someone with a known allergy to aspirin, active bleeding, or a history of bleeding disorders</li>
  <li>Aspirin is not a substitute for emergency medical care — it is a supportive measure only</li>
</ul>
<h3>Step 4: Loosen Tight Clothing and Ensure Fresh Air</h3>
<p>While waiting for emergency help to arrive, loosen any tight clothing around the neck, chest, and waist to ease breathing and circulation. If indoors, ensure the area has good ventilation or fresh air. If the person becomes unconscious and is not breathing normally, and you or someone nearby knows CPR (cardiopulmonary resuscitation), begin CPR immediately while waiting for emergency responders, as this can be life-saving.</p>
<p><strong>Additional supportive measures:</strong></p>
<ul>
  <li>Reassure the person and keep them calm</li>
  <li>Do not give food or water</li>
  <li>Monitor breathing and consciousness continuously</li>
  <li>If the person has prescribed heart medication (such as nitroglycerin/sublingual nitrate) from a previous diagnosis of heart disease, it may be used as previously instructed by their physician — but this should not delay emergency transport</li>
</ul>
<h3>Step 5: Get to a Hospital with Emergency Cardiac Care as Fast as Possible</h3>
<p>Once initial steps are taken, the priority becomes reaching a hospital equipped with emergency cardiac care as quickly and safely as possible. At the hospital, doctors will perform:</p>
<ul>
  <li><strong>ECG (Electrocardiogram):</strong> To detect signs of heart attack</li>
  <li><strong>Blood tests (Troponin):</strong> To confirm heart muscle damage</li>
  <li><strong>Further evaluation and treatment:</strong> Which may include clot-dissolving medication, angioplasty, or other emergency interventions depending on the diagnosis</li>
</ul>
<p><strong>Remember: "Time is muscle."</strong> The faster a heart attack is treated, the more heart muscle can be saved, and the better the long-term outcome.</p>
<h2>Common Mistakes People Make During Chest Pain</h2>
<p>Dr. Hanif Ahmed Towhid highlights several dangerous mistakes commonly seen in patients:</p>
<ol>
  <li><strong>Assuming it''s just gas or indigestion</strong> and taking antacids instead of seeking medical evaluation</li>
  <li><strong>Waiting to see if the pain resolves</strong> before seeking help, losing critical time</li>
  <li><strong>Driving themselves to the hospital</strong>, risking loss of consciousness while driving</li>
  <li><strong>Delaying care due to fear of hospital costs</strong>, which can result in far more serious and costly complications later</li>
  <li><strong>Not informing family members or coworkers</strong> about the symptoms, delaying the response time</li>
</ol>
<h2>Chest Pain That May Not Be Heart-Related</h2>
<p>While all severe chest pain should be evaluated urgently, it''s worth noting other possible causes that a Medicine Specialist will consider during evaluation:</p>
<ul>
  <li><strong>Gastroesophageal reflux disease (GERD):</strong> Burning chest pain related to eating, often worse when lying down</li>
  <li><strong>Musculoskeletal pain:</strong> Pain that worsens with movement or pressing on the chest wall</li>
  <li><strong>Anxiety or panic attacks:</strong> Can cause chest tightness, rapid heartbeat, and shortness of breath</li>
  <li><strong>Pulmonary conditions:</strong> Such as pneumonia or pleurisy, which cause pain that worsens with breathing</li>
</ul>
<p>However, distinguishing these from a heart attack requires proper medical evaluation — never assume it is a harmless cause without professional assessment, especially if you have risk factors like diabetes, hypertension, smoking, high cholesterol, or a family history of heart disease.</p>
<h2>Who Is at Higher Risk of Heart Attack?</h2>
<ul>
  <li>Individuals with diabetes</li>
  <li>Individuals with high blood pressure</li>
  <li>People with high cholesterol</li>
  <li>Smokers</li>
  <li>People who are overweight or obese</li>
  <li>Individuals with a family history of heart disease</li>
  <li>People with a sedentary lifestyle</li>
  <li>Older adults, though heart attacks are increasingly seen in younger patients due to lifestyle factors</li>
</ul>
<h2>Prevention: Reducing Your Long-Term Risk</h2>
<p>While the 5 steps above address what to do during an emergency, long-term prevention is equally important:</p>
<ul>
  <li>Control blood pressure, blood sugar, and cholesterol through regular checkups</li>
  <li>Maintain a heart-healthy diet low in saturated fat and salt</li>
  <li>Exercise regularly</li>
  <li>Avoid smoking</li>
  <li>Manage stress</li>
  <li>Attend regular health screenings, especially if you have risk factors</li>
</ul>
<h2>Conclusion</h2>
<p>Severe chest pain should never be ignored or self-diagnosed. The five steps outlined above — stopping activity, calling for emergency help, considering aspirin if appropriate, loosening tight clothing, and rushing to a hospital with emergency cardiac care — can genuinely save a life. If you or someone around you ever experiences severe, unexplained chest pain, act immediately rather than waiting. In matters of the heart, every second truly counts.</p>
<hr />
<h2>About Dr. Hanif Ahmed Towhid</h2>
<p><strong>Dr. Hanif Ahmed Towhid</strong></p>
<p>MBBS, MCPS (Medicine), FCPS (Medicine)</p>
<p>Medicine Specialist</p>
<p>Registrar (Department of Medicine), Sylhet MAG Osmani Medical College Hospital</p>
<p><strong>Chamber:</strong> Popular Medical Center Ltd. (Room 605), New Medical Road, Kazalshah, Sylhet</p>
<p><strong>Patient Viewing Hours:</strong> 5:00 PM – 9:00 PM (Friday & Tuesday Closed)</p>
<p>For evaluation of chest pain, heart disease risk assessment, or any internal medicine concern, consult Dr. Hanif Ahmed Towhid at Popular Medical Center Ltd., Sylhet. <strong>In case of a suspected heart attack, always go to the nearest emergency department immediately rather than waiting for a scheduled appointment.</strong></p>',
  '6 min read',
  '/blogs/blogimage/5-steps-severe-chest-pain.png',
  'Emergency Medicine',
  'জরুরি স্বাস্থ্যসেবা',
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  lang = EXCLUDED.lang,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  read_time = EXCLUDED.read_time,
  image_url = EXCLUDED.image_url,
  category = EXCLUDED.category,
  category_bn = EXCLUDED.category_bn,
  is_published = EXCLUDED.is_published,
  updated_at = timezone('utc'::text, now());

-- -------------------------------------------------------------------------
-- Post: Stroke Can Be Prevented: Causes, Warning Signs and Prevention Strategies
-- -------------------------------------------------------------------------
INSERT INTO public.posts (
  slug,
  lang,
  title,
  excerpt,
  content,
  read_time,
  image_url,
  category,
  category_bn,
  is_published
) VALUES (
  'stroke-can-be-prevented',
  'en',
  'Stroke Can Be Prevented: Causes, Warning Signs and Prevention Strategies',
  'Stroke is a leading cause of death and disability, but up to 80% of strokes are preventable. Learn the warning signs, risk factors, and proven prevention strategies from Dr. Hanif Ahmed Towhid, Medicine Specialist, Sylhet Osmani Medical College Hospital.',
  '<h2>Introduction</h2>
<p>Stroke is one of the leading causes of death and long-term disability in Bangladesh and around the world. Every year, countless families are affected when a loved one suddenly loses the ability to speak, move, or think clearly due to a stroke. As a Medicine Specialist in Sylhet, Dr. Hanif Ahmed Towhid frequently treats stroke patients and their families, and one message he emphasizes again and again is this: <strong>stroke is largely preventable.</strong></p>
<p>Research shows that up to 80% of strokes can be prevented through risk factor control and healthy lifestyle choices. This guide explains what stroke is, its warning signs, who is at risk, and most importantly, the concrete steps you can take to significantly reduce your risk of having a stroke.</p>
<h2>What Is a Stroke?</h2>
<p>A stroke occurs when the blood supply to part of the brain is interrupted or reduced, depriving brain tissue of oxygen and nutrients. Brain cells begin to die within minutes, which is why stroke is a medical emergency requiring immediate treatment.</p>
<p>There are two main types of stroke:</p>
<h3>1. Ischemic Stroke (Most Common)</h3>
<p>Occurs when a blood clot blocks or narrows an artery supplying blood to the brain. This accounts for approximately 85% of all strokes and is often related to atherosclerosis (fatty plaque buildup in arteries) or blood clots traveling from the heart.</p>
<h3>2. Hemorrhagic Stroke</h3>
<p>Occurs when a blood vessel in the brain ruptures and bleeds into surrounding brain tissue. This is often associated with uncontrolled high blood pressure or weakened blood vessels (aneurysms).</p>
<p>There is also a related condition called a <strong>Transient Ischemic Attack (TIA)</strong>, or "mini-stroke," where symptoms are similar to stroke but resolve within minutes to hours. A TIA is a critical warning sign that a full stroke may follow and should never be ignored.</p>
<h2>Recognizing the Warning Signs of Stroke: Think F.A.S.T.</h2>
<p>Recognizing stroke symptoms quickly and seeking immediate medical care dramatically improves outcomes. The internationally recognized F.A.S.T. method helps identify stroke symptoms:</p>
<ul>
  <li><strong>F – Face Drooping:</strong> One side of the face droops or feels numb. Ask the person to smile — is it uneven?</li>
  <li><strong>A – Arm Weakness:</strong> One arm feels weak or numb. Ask the person to raise both arms — does one drift downward?</li>
  <li><strong>S – Speech Difficulty:</strong> Speech is slurred, or the person has trouble speaking or understanding speech. Ask them to repeat a simple sentence.</li>
  <li><strong>T – Time to Call Emergency Services:</strong> If you observe any of these signs, note the time symptoms started and get the person to a hospital immediately.</li>
</ul>
<h3>Other Possible Symptoms of Stroke</h3>
<ul>
  <li>Sudden numbness or weakness, especially on one side of the body</li>
  <li>Sudden confusion or trouble understanding</li>
  <li>Sudden trouble seeing in one or both eyes</li>
  <li>Sudden severe headache with no known cause</li>
  <li>Sudden trouble walking, dizziness, loss of balance, or coordination</li>
</ul>
<p><strong>Every minute matters.</strong> The phrase used in medicine is "time is brain" — the longer treatment is delayed, the more brain tissue is lost. Immediate hospitalization allows for treatments like clot-dissolving medication, which are only effective within a limited time window after symptom onset.</p>
<h2>Risk Factors for Stroke</h2>
<p>Understanding your risk factors is the first step toward prevention. Risk factors fall into two categories:</p>
<h3>Modifiable Risk Factors (Can Be Controlled)</h3>
<ul>
  <li><strong>High blood pressure:</strong> The single most important controllable risk factor for stroke</li>
  <li><strong>Diabetes:</strong> Damages blood vessels over time and increases stroke risk</li>
  <li><strong>High cholesterol:</strong> Contributes to plaque buildup in arteries supplying the brain</li>
  <li><strong>Smoking:</strong> Damages blood vessels and increases clot formation</li>
  <li><strong>Obesity and physical inactivity:</strong> Contribute to multiple stroke risk factors</li>
  <li><strong>Atrial fibrillation (irregular heartbeat):</strong> A significant cause of blood clots that can travel to the brain</li>
  <li><strong>Excessive alcohol consumption</strong></li>
  <li><strong>Unhealthy diet:</strong> High in salt, saturated fat, and processed foods</li>
  <li><strong>Chronic stress</strong></li>
  <li><strong>Poor sleep patterns and untreated sleep apnea</strong></li>
</ul>
<h3>Non-Modifiable Risk Factors</h3>
<ul>
  <li><strong>Age:</strong> Risk increases with age, though stroke can occur at any age</li>
  <li><strong>Family history:</strong> Genetic predisposition to stroke or related conditions</li>
  <li><strong>Previous stroke or TIA:</strong> Significantly increases risk of future stroke</li>
  <li><strong>Gender:</strong> Men have a somewhat higher risk at younger ages, though stroke patterns vary across life stages</li>
</ul>
<h2>How Can Stroke Be Prevented? Practical Strategies</h2>
<p>Dr. Hanif Ahmed Towhid outlines the following evidence-based strategies to significantly reduce your risk of stroke:</p>
<h3>1. Control Your Blood Pressure</h3>
<p>High blood pressure is the leading modifiable risk factor for stroke. Have your blood pressure checked regularly, and if elevated, work with your Medicine Specialist to manage it through lifestyle changes and, if necessary, medication. Aim for blood pressure targets set by your physician based on your individual health profile.</p>
<h3>2. Manage Diabetes Effectively</h3>
<p>If you have diabetes, keeping your blood sugar within target range significantly reduces stroke risk. Regular monitoring, medication adherence, and lifestyle management are key.</p>
<h3>3. Control Cholesterol Levels</h3>
<p>Get regular lipid profile testing and manage high cholesterol through diet, exercise, and medication when prescribed, as discussed in detail in our related article on high cholesterol.</p>
<h3>4. Quit Smoking</h3>
<p>Smoking cessation is one of the single most impactful changes a person can make to reduce stroke risk. Risk begins to decline shortly after quitting and continues to improve over time.</p>
<h3>5. Maintain a Healthy, Balanced Diet</h3>
<ul>
  <li>Reduce salt intake to help control blood pressure</li>
  <li>Limit saturated and trans fats</li>
  <li>Increase intake of fruits, vegetables, whole grains, and fiber</li>
  <li>Choose healthy fats like those found in fish and nuts</li>
  <li>Limit processed and fried foods, common in everyday Bangladeshi diets</li>
</ul>
<h3>6. Exercise Regularly</h3>
<p>Aim for at least 150 minutes of moderate physical activity per week, such as brisk walking, swimming, or cycling. Regular exercise helps control blood pressure, weight, cholesterol, and blood sugar — all key stroke risk factors.</p>
<h3>7. Maintain a Healthy Body Weight</h3>
<p>Excess weight, particularly abdominal fat, is linked to higher stroke risk through its effects on blood pressure, cholesterol, and diabetes risk.</p>
<h3>8. Limit Alcohol Consumption</h3>
<p>If you consume alcohol, do so in moderation, as excessive intake raises blood pressure and stroke risk.</p>
<h3>9. Manage Atrial Fibrillation</h3>
<p>If you have an irregular heartbeat (atrial fibrillation), proper management, including blood-thinning medication when prescribed, significantly reduces the risk of clot-related stroke. This condition should be diagnosed and monitored by a Medicine Specialist.</p>
<h3>10. Prioritize Sleep and Manage Stress</h3>
<p>Poor sleep quality and untreated sleep apnea are linked to increased stroke risk. Similarly, chronic stress can contribute to high blood pressure and unhealthy coping behaviors. Prioritizing quality sleep and healthy stress management supports overall cardiovascular health.</p>
<h3>11. Regular Health Checkups</h3>
<p>Routine screening for blood pressure, blood sugar, cholesterol, and heart rhythm allows early detection and management of risk factors before they lead to stroke.</p>
<h2>What to Do If You Suspect a Stroke</h2>
<p>If you or someone near you shows signs of stroke:</p>
<ol>
  <li><strong>Note the time symptoms started</strong> — this information is critical for treatment decisions</li>
  <li><strong>Call for emergency transport immediately</strong> — do not wait to see if symptoms improve</li>
  <li><strong>Do not give food, water, or medication</strong> by mouth, as swallowing may be impaired</li>
  <li><strong>Keep the person calm and safe</strong> while waiting for emergency help</li>
  <li><strong>Go to a hospital equipped with stroke care</strong> as quickly as possible</li>
</ol>
<p>Rapid treatment within the critical time window can significantly reduce long-term disability and improve recovery outcomes.</p>
<h2>Life After Stroke: Rehabilitation and Long-Term Care</h2>
<p>For patients who have survived a stroke, ongoing care is essential to prevent recurrence and support recovery:</p>
<ul>
  <li><strong>Physical therapy and rehabilitation</strong> to regain strength, coordination, and independence</li>
  <li><strong>Speech therapy</strong>, if speech or swallowing was affected</li>
  <li><strong>Strict management of underlying risk factors</strong> to prevent a second stroke, which carries even higher risk</li>
  <li><strong>Regular follow-up</strong> with a Medicine Specialist for ongoing monitoring and medication adjustment</li>
  <li><strong>Emotional and psychological support</strong>, as depression is common after stroke and should be addressed</li>
</ul>
<h2>Conclusion</h2>
<p>Stroke is a devastating condition, but the encouraging truth is that most strokes are preventable through consistent management of risk factors like blood pressure, diabetes, cholesterol, and lifestyle habits. Recognizing the warning signs using the F.A.S.T. method and seeking immediate medical attention can also make the difference between full recovery and permanent disability. If you have risk factors for stroke, or simply want to take proactive steps toward better long-term brain health, consult a qualified Medicine Specialist today for a comprehensive risk assessment.</p>
<hr />
<h2>About Dr. Hanif Ahmed Towhid</h2>
<p><strong>Dr. Hanif Ahmed Towhid</strong></p>
<p>MBBS, MCPS (Medicine), FCPS (Medicine)</p>
<p>Medicine Specialist</p>
<p>Registrar (Department of Medicine), Sylhet MAG Osmani Medical College Hospital</p>
<p><strong>Chamber:</strong> Popular Medical Center Ltd. (Room 605), New Medical Road, Kazalshah, Sylhet</p>
<p><strong>Patient Viewing Hours:</strong> 5:00 PM – 9:00 PM (Friday & Tuesday Closed)</p>
<p>For a comprehensive stroke risk assessment, blood pressure and cholesterol management, or any internal medicine concern, book a consultation with Dr. Hanif Ahmed Towhid at Popular Medical Center Ltd., Sylhet. <strong>If you suspect someone is having a stroke, go to the nearest emergency department immediately — do not wait for a scheduled appointment.</strong></p>',
  '7 min read',
  '/blogs/blogimage/stroke.png',
  'Neurology & Stroke Care',
  'স্ট্রোক ও স্নায়ুরোগ',
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  lang = EXCLUDED.lang,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  read_time = EXCLUDED.read_time,
  image_url = EXCLUDED.image_url,
  category = EXCLUDED.category,
  category_bn = EXCLUDED.category_bn,
  is_published = EXCLUDED.is_published,
  updated_at = timezone('utc'::text, now());
