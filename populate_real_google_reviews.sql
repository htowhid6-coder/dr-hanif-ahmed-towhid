-- ===================================================================
-- ডা. হানিফ আহমেদ তৌহিদ স্যারের আসল গুগল রিভিউ ডেটাবেজে যুক্ত করার SQL
-- ===================================================================

-- ১. পূর্বের ডামি/মক রিভিউগুলো মুছে ফেলা:
DELETE FROM public.reviews;

-- ২. আসল ১০টি গুগল রিভিউ যুক্ত করা:
INSERT INTO public.reviews (
  reviewer_name_en,
  reviewer_name_bn,
  reviewer_title_en,
  reviewer_title_bn,
  review_text_en,
  review_text_bn,
  initials,
  rating,
  google_review_url
) VALUES
(
  'Safwan Uddin Ahmed',
  'সাফওয়ান উদ্দিন আহমেদ',
  'Verified Google Patient',
  'যাচাইকৃত গুগল রিভিউয়ার',
  'Dr. Hanif is truly an excellent doctor. He takes his time with each patient, listens attentively and never seems rushed. He examines patients thoroughly before jumping to any conclusions or prescriptions. Highly recommended!!!',
  'ডা. হানিফ সত্যিই অসাধারণ একজন চিকিৎসক। তিনি প্রতিটি রোগীকে পর্যাপ্ত সময় দেন, অত্যন্ত মনোযোগ দিয়ে শোনেন এবং কখনো তাড়াহুড়ো করেন না। রোগীকে গভীরভাবে পরীক্ষা করে সঠিক চিকিৎসা দেন। সবার জন্য বিশেষভাবে সুপারিশকৃত।',
  'SA',
  5.0,
  'https://g.page/r/CWPfW1si9Y0MEAE/review'
),
(
  'Mizbah Uddin Ornob',
  'মিজবাহ উদ্দিন অর্ণব',
  'Verified Google Patient',
  'যাচাইকৃত গুগল রিভিউয়ার',
  'Best medicine specialist in Sylhet. He gives each patient plenty of time, listens attentively, and treats everyone with great kindness and respect. Highly recommended.',
  'সিলেটের সেরা মেডিসিন বিশেষজ্ঞ ডাক্তার। তিনি প্রতিটি রোগীকে পর্যাপ্ত সময় দেন, অত্যন্ত মনোযোগ দিয়ে শোনেন এবং সবার সাথে পরম আন্তরিকতা ও শ্রদ্ধাপূর্ণ ব্যবহার করেন। হাইলি রেকমেন্ডেড।',
  'MO',
  5.0,
  'https://g.page/r/CWPfW1si9Y0MEAE/review'
),
(
  'Fatema Imu',
  'ফাতেমা ইমু',
  'Verified Google Patient',
  'যাচাইকৃত গুগল রিভিউয়ার',
  'He''s one of the best physician and human indeed! He not only cures diseases but also cares about the patient''s mental, physical and economic conditions. May Allah bless him.',
  'তিনি নিঃসন্দেহে সেরা একজন চিকিৎসক ও অসাধারণ একজন মানুষ! তিনি কেবল রোগ নিরাময় করেন না, রোগীর মানসিক, শারীরিক এবং আর্থিক অবস্থারও পূর্ণ যত্ন নেন। আল্লাহ উনার মঙ্গল করুন।',
  'FI',
  5.0,
  'https://g.page/r/CWPfW1si9Y0MEAE/review'
),
(
  'Farhat Chowdhury',
  'ফারহাত চৌধুরী',
  'Verified Google Patient',
  'যাচাইকৃত গুগল রিভিউয়ার',
  'Dr. Hanif Ahmed Touhid is a sincere, attentive and humane doctor. He listens patiently, understands the root cause of the problem and provides appropriate treatment. My family and I are very satisfied.',
  'ডা. হানিফ আহমেদ তৌহিদ অত্যন্ত আন্তরিক, মনোযোগী ও মানবিক একজন চিকিৎসক। তিনি পরম ধৈর্য ধরে শুনে সমস্যার মূল কারণ নির্ণয় করে সঠিক চিকিৎসা দেন। আমি ও আমার পরিবার তার চিকিৎসা সেবায় অত্যন্ত সন্তুষ্ট।',
  'FC',
  5.0,
  'https://g.page/r/CWPfW1si9Y0MEAE/review'
),
(
  'MD RUBEL',
  'মো. রুবেল',
  'Verified Google Patient',
  'যাচাইকৃত গুগল রিভিউয়ার',
  'Dr Hanif Sir is the best medicine specialist in Sylhet. I am very happy with the treatment sir.',
  'ডা. হানিফ স্যার সিলেটের সেরা মেডিসিন বিশেষজ্ঞ। স্যারের চিকিৎসায় আমি অত্যন্ত সন্তুষ্ট।',
  'MR',
  5.0,
  'https://g.page/r/CWPfW1si9Y0MEAE/review'
),
(
  'Rafiqul Islam',
  'রফিকুল ইসলাম',
  'Verified Google Patient',
  'যাচাইকৃত গুগল রিভিউয়ার',
  'One of the best medicine specialist in town. Very cordial to patients, and sincere in his duties.',
  'সিলেট শহরের অন্যতম সেরা মেডিসিন বিশেষজ্ঞ। রোগীদের প্রতি অত্যন্ত আন্তরিক এবং দায়িত্বে পরম নিষ্ঠাবান।',
  'RI',
  5.0,
  'https://g.page/r/CWPfW1si9Y0MEAE/review'
),
(
  'Dr. Abu Kamran Rahul',
  'ডা. আবু কামরান রাহুল',
  'Physician & Medical Colleague',
  'চিকিৎসক সহকর্মী',
  'Dr. Hanif is a very talented doctor. His approach to diagnosis and patient care is excellent, I recommend him for any disease of adult medicine.',
  'ডা. হানিফ অত্যন্ত মেধাবী একজন চিকিৎসক। রোগ নির্ণয় এবং রোগীসেবায় তার পদ্ধতি অনন্য। প্রাপ্তবয়স্কদের যেকোনো মেডিসিন চিকিৎসার জন্য তিনি অত্যন্ত বিশ্বস্ত।',
  'AK',
  5.0,
  'https://g.page/r/CWPfW1si9Y0MEAE/review'
),
(
  'Md Nakib Sadat Chowdhury',
  'মো. নাকিব সাদাত চৌধুরী',
  'Verified Google Patient',
  'যাচাইকৃত গুগল রিভিউয়ার',
  'A very talented doctor and most importantly, a very good human being. I truly appreciate his dedication and highly recommend him.',
  'অত্যন্ত মেধাবী একজন ডাক্তার এবং সবচেয়ে বড় কথা অসাধারণ একজন মানুষ। তার আন্তরিকতার জন্য আমি সত্যিই কৃতজ্ঞ এবং অভিজ্ঞ চিকিৎসকের খোঁজে থাকা সবাইকে তাকে দেখানোর পরামর্শ দেব।',
  'NC',
  5.0,
  'https://g.page/r/CWPfW1si9Y0MEAE/review'
),
(
  'Miftah Rahi',
  'মিফতাহ রাহি',
  'Verified Google Patient',
  'যাচাইকৃত গুগল রিভিউয়ার',
  'One of the best medicine specialists in Sylhet—Dr. Hanif Ahmed Towhid is kind, helpful, and truly cares about his patients.',
  'সিলেটের অন্যতম সেরা মেডিসিন বিশেষজ্ঞ—ডা. হানিফ আহমেদ তৌহিদ অত্যন্ত বিনয়ী, সহযোগিতাপূর্ণ এবং রোগীদের প্রতি গভীর যত্নশীল।',
  'MR',
  5.0,
  'https://g.page/r/CWPfW1si9Y0MEAE/review'
),
(
  'Tarek Ahmed',
  'তারেক আহমেদ',
  'Verified Google Patient',
  'যাচাইকৃত গুগল রিভিউয়ার',
  'He is not only a skilled doctor, but also a wonderful human being. Highly experienced and compassionate physician.',
  'তিনি কেবল একজন দক্ষ চিকিৎসকই নন, অত্যন্ত চমৎকার একজন মানুষ। পরম সহানুভূতিশীল ও অভিজ্ঞ চিকিৎসক।',
  'TA',
  5.0,
  'https://g.page/r/CWPfW1si9Y0MEAE/review'
);
