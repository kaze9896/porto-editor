'use client'

import { useEffect, useRef } from 'react'

interface VideoEmbedProps {
  platform: 'youtube' | 'tiktok' | 'instagram'
  videoUrl: string
  year: number
}

// Check if YouTube URL is a Shorts video
function isYouTubeShorts(url: string): boolean {
  return url.includes('/shorts/')
}

// Extract video ID from various URL formats
function extractVideoId(platform: string, url: string): string | null {
  try {
    if (platform === 'youtube') {
      // Handle various YouTube URL formats
      // https://youtube.com/watch?v=VIDEO_ID
      // https://youtu.be/VIDEO_ID
      // https://www.youtube.com/embed/VIDEO_ID
      // https://youtube.com/shorts/VIDEO_ID (YouTube Shorts)
      const patterns = [
        /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/, // Shorts URL
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /[?&]v=([a-zA-Z0-9_-]{11})/
      ]
      for (const pattern of patterns) {
        const match = url.match(pattern)
        if (match) return match[1]
      }
    }
    
    if (platform === 'tiktok') {
      // https://www.tiktok.com/@username/video/VIDEO_ID
      const match = url.match(/video\/(\d+)/)
      if (match) return match[1]
    }
    
    if (platform === 'instagram') {
      // https://www.instagram.com/reel/REEL_ID/
      // https://www.instagram.com/p/POST_ID/
      const match = url.match(/(?:reel|p)\/([a-zA-Z0-9_-]+)/)
      if (match) return match[1]
    }
    
    return null
  } catch {
    return null
  }
}

export default function VideoEmbed({ platform, videoUrl, year }: VideoEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoId = extractVideoId(platform, videoUrl)
  
  // Load TikTok/Instagram embed scripts
  useEffect(() => {
    if (platform === 'tiktok') {
      const script = document.createElement('script')
      script.src = 'https://www.tiktok.com/embed.js'
      script.async = true
      document.body.appendChild(script)
      return () => {
        document.body.removeChild(script)
      }
    }
    
    if (platform === 'instagram') {
      const script = document.createElement('script')
      script.src = '//www.instagram.com/embed.js'
      script.async = true
      document.body.appendChild(script)
      
      // Process embeds after script loads
      script.onload = () => {
        if ((window as unknown as { instgrm?: { Embeds?: { process: () => void } } }).instgrm?.Embeds?.process) {
          (window as unknown as { instgrm: { Embeds: { process: () => void } } }).instgrm.Embeds.process()
        }
      }
      
      return () => {
        document.body.removeChild(script)
      }
    }
  }, [platform, videoUrl])
  
  if (!videoId) {
    return (
      <div className="w-full h-48 bg-gray-800/50 rounded-xl flex items-center justify-center">
        <p className="text-gray-400 text-sm">Invalid video URL</p>
      </div>
    )
  }
  
  // YouTube Embed (handles both regular and Shorts)
  if (platform === 'youtube') {
    const isShorts = isYouTubeShorts(videoUrl)
    
    return (
      <div className="relative w-full flex justify-center group" ref={containerRef}>
        <div 
          className={`rounded-xl overflow-hidden bg-black/20 ${
            isShorts 
              ? 'w-full max-w-[280px] aspect-[9/16]' // Vertical for Shorts
              : 'w-full aspect-video' // Horizontal for regular
          }`}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
          {year}
        </div>
      </div>
    )
  }
  
  // TikTok Embed
  if (platform === 'tiktok') {
    // Extract username from URL for cite
    const usernameMatch = videoUrl.match(/@([^/]+)/)
    const username = usernameMatch ? usernameMatch[1] : 'user'
    
    return (
      <div className="relative w-full flex justify-center" ref={containerRef}>
        <blockquote 
          className="tiktok-embed" 
          cite={videoUrl}
          data-video-id={videoId}
          style={{ maxWidth: '280px', minWidth: '200px', width: '100%' }}
        >
          <section>
            <a target="_blank" href={`https://www.tiktok.com/@${username}`} rel="noreferrer">
              @{username}
            </a>
          </section>
        </blockquote>
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
          {year}
        </div>
      </div>
    )
  }
  
  // Instagram Embed
  if (platform === 'instagram') {
    return (
      <div className="relative w-full flex justify-center" ref={containerRef}>
        <blockquote
          className="instagram-media"
          data-instgrm-captioned
          data-instgrm-permalink={`https://www.instagram.com/reel/${videoId}/`}
          data-instgrm-version="14"
          style={{
            background: '#FFF',
            border: 0,
            borderRadius: '12px',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
            margin: '1px',
            maxWidth: '280px',
            minWidth: '200px',
            padding: 0,
            width: '100%'
          }}
        >
          <a href={`https://www.instagram.com/reel/${videoId}/`} target="_blank" rel="noreferrer">
            View on Instagram
          </a>
        </blockquote>
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
          {year}
        </div>
      </div>
    )
  }
  
  return null
}

// Export functions for testing and reuse
export { extractVideoId, isYouTubeShorts }
