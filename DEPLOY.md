# 🚀 cPanel-এ Next.js প্রজেক্ট ডিপ্লয় করার গাইড (Step-by-Step Deployment Guide)

এই ডকুমেন্টে আপনার **Dr. Hanif Towhid** ওয়েবসাইটের Next.js প্রজেক্টটি cPanel-এ ডিপ্লয় করার ২টি সহজ পদ্ধতি বিস্তারিত ব্যাখ্যা করা হয়েছে।

---

## 📌 পদ্ধতি ১: Static HTML Export (যদি cPanel-এ Node.js App সুবিধা না থাকে - সবচেয়ে সহজ ও জনপ্রিয়)

যদি আপনার cPanel হোস্টিংয়ে **Node.js App** অপশন না থাকে, তবে স্ট্যাটিক এক্সপোর্ট করে সহজেই `public_html`-এ আপলোড করতে পারবেন।

### ধাপ ১: `next.config.ts` ফাইলে Export কনফিগার করা
আপনার প্রজেক্টের `next.config.ts` ফাইলটি খুলুন এবং `output: 'export'` যোগ করুন:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### ধাপ ২: লোকাল পিসিতে Build তৈরি করা
আপনার প্রজেক্টের টার্মিনালে নিচের কমান্ডটি চালান:
```bash
npm run build
```
বিল্ড সফলভাবে সম্পন্ন হলে প্রজেক্টের মূল ফোল্ডারে একটি **`out`** নামের ফোল্ডার তৈরি হবে।

### ধাপ ৩: cPanel File Manager-এ ফাইল আপলোড করা
1. আপনার cPanel-এ লগইন করুন এবং **File Manager**-এ প্রবেশ করুন।
2. **`public_html`** ফোল্ডারে যান (ফোল্ডারে আগের অন্য কোনো ফাইল থাকলে তা ডিলিট বা ব্যাকআপ নিয়ে রাখুন)।
3. আপনার পিসির প্রজেক্ট থেকে **`out`** ফোল্ডারের ভেতরের সমস্ত ফাইল ও ফোল্ডার সিলেক্ট করে একটি জিপ (Zip) ফাইল বানান (যেমন: `site-build.zip`)।
4. জিপ ফাইলটি cPanel-এর `public_html`-এ **Upload** করুন।
5. আপলোড শেষে জিপ ফাইলটি সিলেক্ট করে **Extract** (আনজিপ) করুন।

### ধাপ ৪: `.htaccess` ফাইল তৈরি (URL Routing প্রবলেম সমাধানের জন্য)
`public_html` ফোল্ডারের ভেতরে একটি `.htaccess` ফাইল তৈরি করুন (বা ফাইলManager-এ Show Hidden Files চালু করে বিদ্যমান `.htaccess` ফাইলটি এডিট করুন) এবং নিচের কোডটি পেস্ট করে সেভ করুন:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.*)$ $1.html [L]
</IfModule>
```

🎉 **অভিনন্দন!** আপনার ওয়েবসাইটটি ব্রাউজারে সফলভাবে চালু হয়ে যাবে!

---

## 📌 পদ্ধতি ২: cPanel "Setup Node.js App" ব্যবহার করে (Node.js সাপোর্ট থাকলে)

যদি আপনার cPanel হোস্টিংয়ে **Setup Node.js App** (CloudLinux / Phusion Passenger) ফিচারটি থাকে:

### ধাপ ১: লোকাল পিসিতে Build তৈরি করা
টার্মিনালে কমান্ডটি চালান:
```bash
npm run build
```

### ধাপ ২: ফাইল সিলেক্ট ও জিপ করা
প্রজেক্ট ফোল্ডার থেকে নিচের ফাইল ও ফোল্ডারগুলো জিপ (Zip) করুন:
- `.next` ফোল্ডার
- `public` ফোল্ডার
- `src` ফোল্ডার
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `.env.local`

*(নোট: `node_modules` জিপ করার প্রয়োজন নেই, cPanel-এ ইনস্টল করা যাবে।)*

### ধাপ ৩: cPanel-এ Node.js অ্যাপ সেটআপ করা
1. cPanel-এ লগইন করে **Software** সেকশন থেকে **Setup Node.js App**-এ ক্লিক করুন।
2. **Create Application** বাটনে ক্লিক করুন।
3. ফর্মের ঘরগুলো নিম্নোক্ত উপায়ে পূরণ করুন:
   - **Node.js version**: 20.x বা 22.x
   - **Application mode**: Production
   - **Application root**: `hanif-website` (বা ইচ্ছামত যেকোনো ফোল্ডারের নাম)
   - **Application URL**: আপনার মেইন ডোমেইন বা সাবডোমেইন সিলেক্ট করুন।
4. **CREATE** বাটনে ক্লিক করুন।

### ধাপ ৪: ফাইল আপলোড ও এনভায়রনমেন্ট ভ্যারিয়েবল সেট করা
1. cPanel File Manager-এ গিয়ে তৈরি হওয়া অ্যাপ ফোল্ডারে (`hanif-website`) জিপ ফাইলটি আপলোড ও Extract করুন।
2. cPanel-এর Node.js App ম্যানেজার পেজে ফিরে এসে **Environment variables** সেকশনে নিচের ভ্যারিয়েবলগুলো যোগ করুন:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://vsbcvfhvxhpogbxqchhi.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `sb_publishable_E17Ee4atoH9FOYVKiRXDZw_htvPL9en`
3. **Run NPM Install** বাটনে ক্লিক করুন (বা SSH টার্মিনালে `npm install` চালান)।
4. অ্যাপটি চালু করতে **RESTART** বাটনে ক্লিক করুন।

---

## ⚙️ প্রজেক্ট এনভায়রনমেন্ট ভ্যারিয়েবল (Environment Variables):

```env
NEXT_PUBLIC_SUPABASE_URL=https://vsbcvfhvxhpogbxqchhi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_E17Ee4atoH9FOYVKiRXDZw_htvPL9en
```

---
*প্রয়োজনে সাপোর্ট ও সহায়তার জন্য আপনার হোস্টিং প্রোভাইডারের সাথে যোগাযোগ করতে পারেন।*
