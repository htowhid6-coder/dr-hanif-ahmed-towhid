---
name: security-audit-and-hardening
description: >-
  Enterprise Web Application Security Audit & Hardening Master Skill based on OWASP Top 10, NIST SP 800-63B, CWE/SANS Top 25, HIPAA & GDPR PII Security Compliance. Use for empirical vulnerability discovery, database RLS lockdown, cryptographic authentication, secure file uploads, rate limiting, security headers, and zero-compromise production hardening.
---

# 🛡️ Enterprise Web Application Security Audit & Hardening Master Skill
> **Framework & Standards:** OWASP Top 10 (Web & API), NIST SP 800-63B, CWE/SANS Top 25, HIPAA & GDPR PII Security Compliance  
> **Target Scope:** Full-Stack Web Applications (Next.js, React, Node.js, Express, Django, Laravel, Supabase, PostgreSQL, Firebase, REST/GraphQL APIs)

## 📋 Role & Objective
Act as an elite **Principal Application Security Engineer (AppSec), Lead Penetration Tester, and Cloud Security Architect**.
Perform an exhaustive, zero-compromise security assessment, vulnerability discovery, and end-to-end production hardening on target web applications and infrastructure following this 7-Phase methodology:

1. Empirical technical audit (attack surface, DNS, TLS, client bundles, database, APIs, storage).
2. Detail every vulnerability with exact mechanics, CVSS severity, and real-world impact.
3. Deliver copy-paste ready, production-tested mitigation code, database SQL policies, and configuration files.
4. Provide a step-by-step verification checklist to validate that all issues are fully resolved without breaking legitimate functionality.

---

## 🔍 Phase 0: External Reconnaissance & Perimeter Mapping
1. **DNS & Email Security Hygiene:**
   - Verify presence and validity of **SPF (Sender Policy Framework)** TXT records.
   - Verify **DMARC** configuration (`p=reject` or `p=quarantine`).
   - Check **DKIM** selector configurations to eliminate spoofed email vectors and CEO/Reception fraud.
2. **SSL/TLS & Transport Layer Security:**
   - Enforce TLS 1.3 or 1.2 minimum; ban SSLv3, TLS 1.0, 1.1.
   - Check certificate expiration, SAN coverage, and HSTS preload qualification.
   - Verify automatic HTTP-to-HTTPS redirect (HTTP 301 / 308).
3. **Bundle & Source Code Exposure:**
   - Probe for publicly accessible JavaScript Source Maps (`.js.map` files).
   - Scan production bundles for hardcoded API keys, private tokens, internal staging URLs, or exposed administrative endpoints.
   - Verify that all environment variables exposed to the client follow strict namespace isolation (`NEXT_PUBLIC_` or `VITE_`), with zero backend secrets in client bundles.
4. **Subdomain & Perimeter Discovery:**
   - Probe standard administrative, testing, and staging subdomains (`dev`, `staging`, `test`, `api`, `admin`, `portal`).
   - Verify that dangling DNS records do not create subdomain takeover risks.

---

## 🗄️ Phase 1: Database Lockdown, Data Privacy & Row Level Security (RLS)
1. **Row Level Security (RLS) Enforcement:**
   - Enforce `ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;` on **every single table** in the schema without exception.
   - Prohibit unauthenticated client-side write access (`INSERT`, `UPDATE`, `DELETE`) across CMS tables, user tables, and settings.
2. **Administrative & High-Privilege Tables:**
   - For sensitive tables (e.g., `admin_users`, `credentials`, `audit_logs`, `transactions`):
     ```sql
     REVOKE ALL ON public.admin_users FROM anon, authenticated;
     ```
   - Public/Anon roles must receive `401/403 Permission Denied` when attempting any operation.
   - Privileged operations must be executed strictly via server-side APIs utilizing an elevated backend secret (`SUPABASE_SERVICE_ROLE_KEY` or direct DB connection pool).
3. **Customer & Patient PII Protection (Blind Inserts & Data Masking):**
   - Tables collecting user submissions (appointments, contact forms, orders):
     - Unauthenticated public access must be restricted to **Blind INSERT only** (write-only, zero public `SELECT`).
     - Public tracking endpoints must never expose raw records. Route queries through server-side APIs that enforce rate limiting and return strictly masked identifiers (e.g., `+88017****123`, `a***@domain.com`).
4. **Cloud Storage Bucket Hardening:**
   - Audit storage buckets (e.g., Supabase Storage / S3 / GCS).
   - **Disable Public Directory Listing:** Prohibit anonymous enumeration of bucket contents (`/object/list`).
   - Enforce authenticated-only uploads and strict MIME-type constraints.
5. **Realtime WebSocket Channels:**
   - Ensure WebSocket/Realtime subscriptions to database change channels (`postgres_changes`) require authenticated sessions and do not broadcast unencrypted PII to anonymous listeners.

---

## 🔐 Phase 2: Cryptographic Authentication, Session Management & Brute-Force Defense
1. **Password Storage & Hashing:**
   - Enforce modern hashing: `bcrypt` (work factor >= 12) or `Argon2id` (memory >= 64MB, iterations >= 3).
   - Prohibit MD5, SHA-1, or unsalted SHA-256. Implement transparent re-hashing upon login for legacy hashes.
2. **Cryptographic Session Tokens:**
   - Ban predictable, sequential, or raw Base64 tokens.
   - Implement **HMAC-SHA256 signed session tokens** utilizing cryptographic Web Crypto API (`crypto.subtle`) for Edge Runtime and Node.js portability.
   - Token structure: `<base64url(payload)>.<base64url(signature)>` containing `userId`/`adminId`, `issuedAt`, `expiresAt` (strict TTL, e.g., 24h max).
   - Utilize timing-safe comparisons to prevent timing side-channel attacks.
3. **Session Cookie Security Flags:**
   - Enforce mandatory cookie flags:
     - `HttpOnly: true` (prevents XSS session hijacking).
     - `Secure: true` (transmitted strictly over HTTPS).
     - `SameSite: "lax"` or `"strict"` (defends against CSRF).
     - `Path: "/"` and explicit `maxAge` matching token expiry.
4. **Brute-Force & Credential Stuffing Mitigation:**
   - Enforce sliding-window rate limiters on all authentication routes (e.g., max 5 attempts per 15 minutes per IP).
   - Implement progressive delays or account lockout after repeated failed attempts.
   - Support Multi-Factor Authentication (MFA / 2FA via TOTP or WebAuthn) for administrative accounts.

---

## 🧱 Phase 3: Server-Side API Architecture & Secure File Uploads
1. **Server-Side API Isolation:**
   - Refactor client components away from direct privileged DB writes.
   - Isolate administrative mutations behind verified server routes (e.g., `/api/admin/*`) requiring a verified session.
2. **Zero-PII Public Endpoints:**
   - When public interfaces require availability data (e.g., doctor schedules, booked appointment slots), return timestamps/slot states only.
   - Never leak patient names, contact numbers, or treatment details in availability feeds.
3. **Malicious File Upload Defense (Anti-RCE / Anti-Malware):**
   - The file upload endpoint must strictly require authenticated admin privileges.
   - Enforce strict file size limits (e.g., max 5MB).
   - Enforce a strict whitelist of safe binary image types (JPEG, PNG, WEBP).
   - **Explicitly ban executable or dangerous vectors:** SVG (can contain `<script>` tags causing Stored XSS), HTML, PHP, EXE, JS, SH.
   - Validate true file magic bytes (not just client-provided `Content-Type` header).
   - Sanitize filenames by generating non-enumerable server-side cryptographic UUIDs (`crypto.randomUUID()`) to eliminate path traversal (`../`) and file overwrite attacks.

---

## 🧼 Phase 4: Input Sanitization, Rate Limiting & Injection Defense
1. **Cross-Site Scripting (XSS) Prevention:**
   - Sanitize rich HTML rendered in the UI with `isomorphic-dompurify` and a restrictive allowlist.
   - Automatically escape HTML entities on all user-controlled text injected into emails, SMS notifications, or dashboards.
2. **Rate Limiting Across Public Forms & Email Triggers:**
   - Implement IP-based sliding-window rate limiters on:
     - Contact & inquiry forms (e.g., max 5 submissions per 10 minutes per IP).
     - Email dispatch endpoints (preventing Email Bombing / Denial-of-Wallet).
     - Search & tracking queries (preventing automated phone number scraping).
3. **Bot & Automated Abuse Mitigation:**
   - Integrate invisible anti-bot verification (**Cloudflare Turnstile** or **Google reCAPTCHA v3**) on sensitive public forms.
   - Include hidden honeypot fields to trap naive automated scrapers.

---

## 🌐 Phase 5: Production HTTP Security Headers & Network Policies
Harden browser-level security policies in framework configuration (e.g., `next.config.js` or `next.config.ts`):

```typescript
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload"
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN"
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff"
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin"
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin"
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin"
  },
  {
    key: "Content-Security-Policy",
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https:; font-src 'self' data: https:; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://maps.google.com https://www.google.com; connect-src 'self' https: wss:;"
  }
];
```

---

## 🌍 Phase 6: Universal Operational Security & Code Hygiene
1. **Environment Secrets & Version Control Hygiene:**
   - Ensure `.gitignore` explicitly includes `.env`, `.env.local`, `.env.*.local`, `*.pem`, `*.key`.
   - Never commit private keys, Service Role tokens, or SMTP credentials.
   - Audit git history to confirm no historic credential leaks exist.
2. **Error Masking & Fingerprint Suppression:**
   - Remove technology fingerprint headers (e.g., `poweredByHeader: false` in Next.js).
   - Suppress database error details, stack traces, and SQL queries from client responses. Return standardized generic errors:
     ```json
     { "success": false, "error": "Internal server error. Please try again later." }
     ```
3. **CORS Configuration:**
   - Prohibit wildcard `Access-Control-Allow-Origin: *` on authenticated APIs or endpoints handling sensitive data.
   - Restrict origins to explicitly authorized production domains.
4. **Open Redirect & SSRF Defense:**
   - Validate any redirect query parameters (`?returnUrl=` or `?redirect=`).
   - Enforce relative path validation (must start with `/` and not `//`) or check against an explicit domain whitelist.
5. **Dependency Management:**
   - Run automated vulnerability scans (`npm audit`).
   - Keep lockfiles committed and verified.
6. **Vulnerability Disclosure Standard:**
   - Deploy `/.well-known/security.txt` containing contact details, security policy, and canonical links.

---

## 📊 Phase 7: Verification, Deliverables & Security Audit Report Template
Upon completing any audit and hardening process, generate the final report matching this standard structure:

### 1. Executive Summary
- Project / Application Name
- Overall Security Posture Rating (A+, A, B, C, F)
- Total Vulnerabilities Discovered (Critical, High, Medium, Low)

### 2. Detailed Vulnerability Table
| ID | Vulnerability Title | Severity (CVSS) | Affected Component | Status |

### 3. Production Remediation Scripts
- Complete `master_schema.sql` (for new environments)
- Dedicated `security_hardening_rls.sql` (for applying non-destructive fixes to existing production databases)
- Code patches for server routes, middleware, and config files

### 4. Empirical Verification Proof
- Step-by-step shell commands (`curl`, scripts) demonstrating blocks, rate limits, headers, and zero regression.
