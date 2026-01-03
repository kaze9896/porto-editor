// Script untuk test koneksi ke Supabase
// Jalankan: npx tsx scripts/test-db-connection.ts

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env.local manually
function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), '.env.local')
    const content = readFileSync(envPath, 'utf-8')
    content.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=')
      if (key && valueParts.length) {
        process.env[key.trim()] = valueParts.join('=').trim()
      }
    })
  } catch {
    console.log('⚠️ Could not load .env.local')
  }
}
loadEnv()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Checking Supabase configuration...\n')

if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is not set!')
  console.log('\n📝 Please create a .env.local file with:')
  console.log('   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key')
  process.exit(1)
}

if (!supabaseAnonKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is not set!')
  process.exit(1)
}

console.log('✅ Environment variables found')
console.log(`   URL: ${supabaseUrl.substring(0, 30)}...`)
console.log(`   Key: ${supabaseAnonKey.substring(0, 20)}...\n`)

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    console.log('🔗 Testing database connection...\n')
    
    // Test 1: Check if projects table exists
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .limit(5)
    
    if (error) {
      console.error('❌ Database error:', error.message)
      
      if (error.message.includes('does not exist')) {
        console.log('\n📝 Table "projects" belum dibuat.')
        console.log('   Jalankan SQL di supabase-setup.sql di Supabase Dashboard > SQL Editor')
      }
      return
    }
    
    console.log('✅ Connection successful!')
    console.log(`📊 Found ${data.length} project(s) in database:\n`)
    
    if (data.length === 0) {
      console.log('   (No projects yet)')
    } else {
      data.forEach((project, i) => {
        console.log(`   ${i + 1}. [${project.platform}] ${project.year} - ${project.video_url.substring(0, 40)}...`)
      })
    }
    
    console.log('\n🎉 Database is ready to use!')
    
  } catch (err) {
    console.error('❌ Unexpected error:', err)
  }
}

testConnection()
