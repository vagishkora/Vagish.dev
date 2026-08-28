# Supabase Setup Guide for Vagish.dev

This folder contains the complete SQL database schema, Row Level Security (RLS) policies, and seed data for the 5 dynamic sections of your portfolio.

---

## 🚀 3-Step Supabase Setup

### Step 1: Create a Supabase Project
1. Log in to [Supabase](https://supabase.com/).
2. Click **"New Project"**.
3. Name it (e.g. `vagish-portfolio`) and choose a database password.

---

### Step 2: Run the Schema & Seed SQL
1. In your Supabase project dashboard, open the **SQL Editor** from the left sidebar.
2. Open [`supabase/schema.sql`](file:///c:/Vagish/portfolio/supabase/schema.sql) and copy all contents.
3. Paste the SQL into the editor and click **"Run"** (▶).
4. ✅ All 5 tables (`projects`, `certifications`, `skills`, `outreach`, `hobbies`) are created, RLS policies are applied, and all existing portfolio items are seeded!

---

### Step 3: Copy API Credentials
1. Go to **Project Settings** (⚙️) → **API**.
2. Copy:
   - **Project URL** (`https://xyzcompany.supabase.co`)
   - **anon / public key** (`eyJhbGci...`)

---

## 🔑 Adding Credentials to Portfolio and Admin Dashboard

### In the Public Portfolio (`portfolio/`):
Create `.env.local` (or configure in GitHub Actions Repository Secrets if needed):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### In the Admin Dashboard (`admin-dashboard/`):
Create `admin-dashboard/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 👤 Creating Your Admin Login
1. Go to Supabase Dashboard → **Authentication** → **Users**.
2. Click **"Add User"** → **"Create User"**.
3. Enter your email and password.
4. Use these credentials to sign in to your Admin Dashboard!
