import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type untuk project - SIMPLE & CLEAN (tanpa title)
export type Project = {
  id: string
  platform: 'youtube' | 'tiktok' | 'instagram'
  video_url: string
  year: number
  order_index: number
  created_at: string
}
