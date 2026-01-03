-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  platform TEXT NOT NULL CHECK (platform IN ('youtube', 'tiktok', 'instagram')),
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS projects_platform_idx ON projects(platform);
CREATE INDEX IF NOT EXISTS projects_order_idx ON projects(order_index);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON projects;
DROP POLICY IF EXISTS "Allow authenticated insert" ON projects;
DROP POLICY IF EXISTS "Allow authenticated update" ON projects;
DROP POLICY IF EXISTS "Allow authenticated delete" ON projects;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policy to allow authenticated insert
CREATE POLICY "Allow authenticated insert" ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated update
CREATE POLICY "Allow authenticated update" ON projects
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policy to allow authenticated delete
CREATE POLICY "Allow authenticated delete" ON projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample data
INSERT INTO projects (title, description, platform, video_url, thumbnail_url, order_index)
VALUES 
  ('Epic Gaming Montage', 'High-energy gaming compilation with smooth transitions', 'youtube', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', 1),
  ('Viral Dance Trend', 'Trending dance with creative effects and timing', 'tiktok', 'https://www.tiktok.com/@example/video/1234567890', null, 2),
  ('Product Showcase Reel', 'Professional product reveal with aesthetic transitions', 'instagram', 'https://www.instagram.com/reel/ABC123/', null, 3)
ON CONFLICT DO NOTHING;

SELECT 'Database setup complete! You can now add more projects.' as message;
