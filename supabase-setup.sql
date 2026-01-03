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

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated insert (optional - for adding via admin panel)
CREATE POLICY "Allow authenticated insert" ON projects
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated update (optional)
CREATE POLICY "Allow authenticated update" ON projects
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated delete (optional)
CREATE POLICY "Allow authenticated delete" ON projects
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Insert sample data (you can modify or remove this)
INSERT INTO projects (title, description, platform, video_url, thumbnail_url, order_index)
VALUES 
  ('Sample YouTube Video', 'A cinematic edit for gaming content', 'youtube', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', null, 1),
  ('TikTok Viral Edit', 'Fast-paced transition showcase', 'tiktok', 'https://www.tiktok.com/@example/video/1234567890', null, 2),
  ('Instagram Reel', 'Aesthetic product showcase', 'instagram', 'https://www.instagram.com/reel/ABC123/', null, 3);

-- Display confirmation
SELECT 'Database setup complete!' as status;
