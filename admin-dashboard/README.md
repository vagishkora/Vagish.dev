# Vagish.dev — Admin Control Dashboard

A private, standalone web application for managing all dynamic content on [Vagish.dev](https://vagishkora.github.io/Vagish.dev/) without touching code or committing.

---

## ⚡ Features
- **Supabase Authentication**: Secure email/password login restricted to your admin account.
- **5 Dynamic Content Managers**:
  1. 📁 **Featured Projects**: Add, edit, delete, reorder project cards and live links.
  2. 📜 **Certifications**: Manage accredited certificates, issuers, and verification links.
  3. ⚡ **Technical Skills**: Update programming languages, frameworks, devops tools, and icons.
  4. 🌟 **Leadership & Outreach**: Manage technical roles (e.g. ACM Tech Co-Head), speaking engagements, and workshops.
  5. 🎯 **Personal Hobbies**: Update lifestyle interests, icons, and display ordering.
- **Interactive Reordering**: Instant Move Up (↑) / Move Down (↓) buttons to rearrange section order.
- **Real-Time Dynamic Sync**: Any change saved in the dashboard is immediately live on your portfolio!

---

## 🛠️ Local Setup Instructions

### 1. Configure Environment Variables
Create a file named `.env.local` inside the `admin-dashboard/` folder:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 2. Run Locally
```bash
cd admin-dashboard
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 🚀 Deployment to Vercel (Free 1-Click Deployment)

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository, and set the **Root Directory** to `admin-dashboard`.
4. Add the two environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**. Your private admin control panel is now live on a secure private URL (e.g. `https://vagish-admin.vercel.app`)!

---

## 🔐 Creating Your Admin User in Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard) → **Authentication** → **Users**.
2. Click **"Add user"** → **"Create user"**.
3. Enter your email and a strong password.
4. Use these credentials to sign in to the Admin Dashboard!
