-- =====================================================
-- PORTO-EDITOR DATABASE SETUP (SECURE VERSION)
-- Jalankan di Supabase Dashboard > SQL Editor
-- =====================================================

-- JIKA SUDAH ADA TABEL, JALANKAN INI DULU:
-- DROP TABLE IF EXISTS projects;

-- 1. Buat tabel projects (SIMPLE & CLEAN - tanpa title)
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL CHECK (platform IN ('youtube', 'tiktok', 'instagram')),
  video_url TEXT NOT NULL,
  year INTEGER NOT NULL CHECK (year >= 2020 AND year <= 2030),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Buat index untuk query cepat
CREATE INDEX IF NOT EXISTS idx_projects_platform ON projects(platform);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);

-- 3. KEAMANAN: Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 4. HANYA IZINKAN READ DARI PUBLIC (NO INSERT/UPDATE/DELETE dari frontend!)
-- Ini yang bikin AMAN dari SQL injection & hacking
-- Semua edit HARUS lewat Supabase Dashboard saja
CREATE POLICY "Public can only read projects" ON projects
  FOR SELECT 
  USING (true);

-- TIDAK ADA policy untuk INSERT, UPDATE, DELETE
-- Artinya frontend TIDAK BISA mengubah data sama sekali!
-- Hanya admin di Supabase Dashboard yang bisa edit

-- 5. Sample data (hapus atau ganti dengan project aslimu)
INSERT INTO projects (platform, video_url, year, order_index)
VALUES 
  ('youtube', 'https://youtube.com/watch?v=xxxxx', 2024, 1),
  ('tiktok', 'https://tiktok.com/@kazewealth/video/xxxxx', 2024, 2),
  ('instagram', 'https://instagram.com/reel/xxxxx', 2025, 3);

-- Verifikasi
SELECT 
  '✅ Setup complete!' as status,
  'Table: projects' as table_name,
  'Security: READ-ONLY for public' as security_level,
  'Edit data: Only via Supabase Dashboard' as how_to_edit;
