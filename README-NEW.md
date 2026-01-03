# Video Editor Portfolio 🎬

A modern, space-themed portfolio website for video editors, built with Next.js and Supabase.

## ✨ Features

- 🌌 **Space Theme** - Animated starfield background
- 🎥 **Dynamic Portfolio** - Auto-updates from Supabase
- 📱 **Fully Responsive** - Mobile & desktop optimized
- 🎨 **Platform Filters** - YouTube, TikTok, Instagram
- 🎬 **Video Embeds** - Modal video player
- ⚡ **Fast & Modern** - Next.js 14 + Tailwind CSS

## 🚀 Quick Start

1. Install dependencies:
```bash
npm install
```

2. Setup `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

3. Run SQL from `supabase-setup.sql` in Supabase dashboard

4. Start dev server:
```bash
npm run dev
```

Open http://localhost:3000

## 📦 Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- Supabase
- TypeScript

## 🎨 Customization

Edit `components/Hero.tsx` and `components/About.tsx` for personal info.

Add projects via Supabase dashboard → projects table.

## 🚢 Deploy

Push to GitHub → Connect to Vercel → Add env vars → Deploy!
