# 🌐 GitHub-এ Push করে Vercel-এ Deploy করার Step-by-Step Guide

এই গাইডে আপনার **Dr. Hanif Towhid** ওয়েবসাইটটি GitHub-এ Push করে Vercel-এ Host করার সম্পূর্ণ প্রক্রিয়া দেখানো হলো।

---

## 📌 প্রস্তুতি (যা যা লাগবে)

আগে নিচের জিনিসগুলো রেডি করে নিন:

| প্রয়োজনীয় জিনিস | কোথায় পাবেন |
|---|---|
| **GitHub অ্যাকাউন্ট** | https://github.com এ ফ্রি অ্যাকাউন্ট খুলুন |
| **Vercel অ্যাকাউন্ট** | https://vercel.com এ GitHub দিয়ে Login করুন |
| **Git** (লোকাল পিসিতে ইনস্টল করা) | [git-scm.com](https://git-scm.com/downloads) থেকে Download করুন |

> ✅ আপনার পিসিতে Git ইনস্টল করা আছে কিনা চেক করতে টার্মিনালে `git --version` লিখুন।

---

## ✅ Step 1: GitHub-এ নতুন Repository (Repo) তৈরি করা

1. [github.com](https://github.com) এ লগইন করুন।
2. উপরে ডান পাশে **`+`** আইকনে ক্লিক করুন → **New repository** সিলেক্ট করুন।
3. ফর্মটি এভাবে পূরণ করুন:
   - **Repository name**: `dr-hanif-towhid` (বা যেকোনো নাম)
   - **Description** (ঐচ্ছিক): আপনার ওয়েবসাইটের বর্ণনা
   - **Public / Private**: যেকোনো একটি সিলেক্ট করুন
   - ⚠️ **কিছুই চেক করবেন না** — "Add a README", ".gitignore", "license" এসব **আনচেক** রাখুন (কারণ আমরা লোকাল থেকে Push করব)
4. **Create repository** বাটনে ক্লিক করুন।
5. GitHub একটি নতুন পেজ দেখাবে যেখানে কিছু কমান্ড থাকবে — **এখনই বন্ধ করবেন না**, পরের ধাপে এগুলো লাগবে।

---

## ✅ Step 2: লোকাল প্রজেক্টে Git Initialize করা

টার্মিনাল (Command Prompt / PowerShell) খুলুন এবং আপনার প্রজেক্ট ফোল্ডারে যান:

```bash
cd "f:\sadly vi project\WebDevelopment-officedev\WebDevelopment"
```

তারপর Git সেটআপ করুন:

```bash
git init
```

আপনার GitHub username ও email Git-এ যুক্ত করুন (প্রথমবার করলে):

```bash
git config --global user.name "আপনার-গিটহাব-ইউজারনেম"
git config --global user.email "আপনার-গিটহাব-ইমেইল"
```

---

## ✅ Step 3: সব ফাইল Stage ও Commit করা

```bash
git add .
```

> 📝 **নোট:** `.gitignore` ফাইলটি আগে থেকেই আছে যা `node_modules`, `.env`, `.next` ইত্যাদি **GitHub-এ যেতে বাধা দেবে।** তাই নিশ্চিন্ত থাকুন।

Commit করুন:

```bash
git commit -m "Initial commit: Dr. Hanif Towhid website"
```

---

## ✅ Step 4: GitHub Repository-এর সাথে Connect করা

Step 1-এ যে GitHub পেজে কমান্ডগুলো দেখানো হয়েছিল, সেখান থেকে আপনার Repo-এর URL কপি করুন (HTTPS):

```
https://github.com/আপনার-ইউজারনেম/dr-hanif-towhid.git
```

তারপর টার্মিনালে এই কমান্ডগুলো চালান:

```bash
git branch -M main
git remote add origin https://github.com/আপনার-ইউজারনেম/dr-hanif-towhid.git
git push -u origin main
```

> ⚠️ GitHub-এ Login চাইলে আপনার **GitHub username** এবং **Password** দেবেন না — এর বদলে GitHub থেকে একটি **Personal Access Token (PAT)** তৈরি করে Password হিসেবে ব্যবহার করুন। PAT তৈরি করতে: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token → scopes-এ `repo` চেক করুন → Generate।

সফল হলে টার্মিনালে এরকম দেখাবে:

```
Enumerating objects: ...
Total 0 (delta 0), reused 0 (delta 0)
To https://github.com/আপনার-ইউজারনেম/dr-hanif-towhid.git
 * [new branch]      main -> main
```

🎉 **এখন আপনার কোড GitHub-এ আপলোড হয়ে গেছে!**

---

## ✅ Step 5: Vercel-এ Deploy করা (সহজ পদ্ধতি — কোন কমান্ড লাগবে না)

1. [vercel.com](https://vercel.com) এ যান এবং **"Sign Up"** → **"Continue with GitHub"** এ ক্লিক করুন।
2. GitHub-এর অনুমতি দিতে হবে — Vercel-কে যেন আপনার Repository দেখতে পারে।
3. Dashboard-এ **"Add New..."** → **"Project"** এ ক্লিক করুন।
4. আপনার GitHub Repository লিস্ট থেকে `dr-hanif-towhid` সিলেক্ট করে **Import** এ ক্লিক করুন।
5. **Configure Project** পেজে:
   - **Framework Preset**: এটি নিজে থেকেই **Next.js** ধরা হবে।
   - **Root Directory**: `./` (ডিফল্ট)
   - **Build Command**: `next build` (ডিফল্ট)
   - **Output Directory**: `out` (যদি চাইলে Blank রাখুন — Vercel নিজে খুঁজে নেবে)
6. **Environment Variables** সেকশনে নিচের দুটি ভ্যারিয়েবল যোগ করুন:

   | Key | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://vsbcvfhvxhpogbxqchhi.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_E17Ee4atoH9FOYVKiRXDZw_htvPL9en` |

7. **Deploy** বাটনে ক্লিক করুন।
8. Vercel অটোমেটিক Build শুরু করবে এবং ১-২ মিনিটের মধ্যে আপনার ওয়েবসাইট Live হয়ে যাবে!

🎉 **অভিনন্দন!** Vercel আপনাকে একটি URL দেবে যেমন: `https://dr-hanif-towhid.vercel.app`

---

## ✅ Step 6: (ঐচ্ছিক) Custom Domain যুক্ত করা

আপনার নিজের ডোমেইন (যেমন `drhaniftowhid.com`) থাকলে:

1. Vercel Dashboard → আপনার Project → **Settings** → **Domains**।
2. ডোমেইন টাইপ করে **Add** করুন।
3. আপনার DNS প্রোভাইডারে একটা **CNAME** রেকর্ড যোগ করুন:
   - **Name/Host**: `www` (বা `@`)
   - **Value/Target**: `cname.vercel-dns.com`
4. কয়েক মিনিট পর ডোমেইন Active হয়ে যাবে এবং HTTPS অটো-সাপোর্টেড থাকবে।

---

## ✅ Step 7: ভবিষ্যতে Update Push করলে অটো-Deploy হবে

কোডে যেকোনো পরিবর্তনের পর:

```bash
git add .
git commit -m "আপডেটের বর্ণনা"
git push
```

**Vercel নিজে থেকে নতুন Version Build করে Deploy করে দেবে** — কোনো ম্যানুয়াল কাজ লাগবে না।

---

## ⚙️ Environment Variables (সব জায়গায় একই)

| ভ্যারিয়েবল | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://vsbcvfhvxhpogbxqchhi.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_E17Ee4atoH9FOYVKiRXDZw_htvPL9en` |

> ⚠️ **গুরুত্বপূর্ণ:** `.env.local` ফাইলটি GitHub-এ Push হবে না (`.gitignore`-এ আছে), তাই এই ভ্যারিয়েবলগুলো Vercel-এর **Project Settings → Environment Variables** সেকশনে ম্যানুয়ালি যোগ করতে হবে।

---

## 🩹 সাধারণ সমস্যা ও সমাধান (Troubleshooting)

| সমস্যা | সমাধান |
|---|---|
| `git push` এ Permission denied | Git token/PAT ব্যবহার করুন, password নয় |
| Vercel-এ Build Fail | Vercel Project → Deployments → View Logs-এ ক্লিক করে Error দেখুন |
| Supabase data না দেখাচ্ছে | Environment Variables ঠিকমতো যোগ হয়েছে কিনা চেক করুন |
| Site 404 দিচ্ছে | `next.config.ts`-এর `output: 'export'` থাকায় ঠিক আছে; Vercel নিজে সামলাবে |

---

*প্রয়োজনে আরও সাহায্যের জন্য [Vercel Documentation](https://vercel.com/docs) দেখুন।*