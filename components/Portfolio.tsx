'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassSurface from './GlassSurface'
import BlurText from './BlurText'
import ChromaGrid from './ChromaGrid'
import PlatformModal from './PlatformModal'

const socialMediaItems = [
  {
    image: 'https://freelogopng.com/images/all_img/1655891638tiktok-icon-png.png',
    title: 'TikTok',
    subtitle: 'Short Videos',
    borderColor: '#00f2ea',
    gradient: 'linear-gradient(145deg, #00f2ea, #ff0050, #000)',
    url: 'tiktok' // Changed to platform identifier
  },
  {
    image: 'https://www.freepnglogos.com/uploads/youtube-logo-hd-8.png',
    title: 'YouTube',
    subtitle: 'Long Videos',
    borderColor: '#FF0000',
    gradient: 'linear-gradient(145deg, #FF0000, #000)',
    url: 'youtube' // Changed to platform identifier
  },
  {
    image: 'https://static.vecteezy.com/system/resources/previews/018/930/415/original/instagram-logo-instagram-icon-transparent-free-png.png',
    title: 'Instagram',
    subtitle: 'Reels',
    borderColor: '#E1306C',
    gradient: 'linear-gradient(145deg, #833AB4, #E1306C, #F77737, #000)',
    url: 'instagram' // Changed to platform identifier
  }
]

export default function Portfolio() {
  const [selectedPlatform, setSelectedPlatform] = useState<'youtube' | 'tiktok' | 'instagram' | null>(null)
  
  const handlePlatformClick = (url: string) => {
    // url is now the platform identifier
    if (url === 'youtube' || url === 'tiktok' || url === 'instagram') {
      setSelectedPlatform(url)
    }
  }
  
  return (
    <>
      <section
        id="portfolio"
        className="min-h-screen py-10 px-4 relative flex items-center justify-center"
        style={{
          zIndex: 30,
          backgroundColor: 'transparent',
        }}
      >
        <div className="w-full max-w-6xl mx-auto px-4">
          <GlassSurface
            width="100%"
            height={550}
            borderRadius={50}
            borderWidth={0.07}
            brightness={50}
            opacity={0.93}
            blur={30}
            displace={2.2}
            backgroundOpacity={0.27}
            saturation={1}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            className="overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
          >
            <div className="w-full h-full flex flex-col items-center justify-start gap-6 sm:gap-8 px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10">
              {/* Title - MY PORTFOLIO dengan BlurText animasi saat scroll masuk + glow tipis */}
              <div className="w-full text-center pt-6 md:pt-10 pb-4 md:pb-6">
                <div style={{ 
                  filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3)) drop-shadow(0 0 15px rgba(255,255,255,0.15))'
                }}>
                  <BlurText
                    text="MY PORTFOLIO"
                    delay={60}
                    animateBy="letters"
                    direction="top"
                    threshold={0.2}
                    className="text-3xl sm:text-4xl md:text-6xl font-black tracking-wider text-white justify-center"
                  />
                </div>
              </div>
              
              {/* ChromaGrid untuk social media dengan fade animation - responsive */}
              <motion.div 
                className="flex-1 w-full px-2 md:px-4"
                style={{ 
                  minHeight: '300px', 
                  position: 'relative',
                  filter: 'drop-shadow(2px 2px 0px rgba(71,85,105,0.5)) drop-shadow(3px 3px 0px rgba(51,65,85,0.3))'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              >
                <ChromaGrid 
                  items={socialMediaItems}
                  radius={200}
                  damping={0.45}
                  fadeOut={0.6}
                  ease="power3.out"
                  className="justify-center items-center h-full"
                  onItemClick={handlePlatformClick}
                />
              </motion.div>
            </div>
          </GlassSurface>
        </div>
      </section>
      
      {/* Platform Modal */}
      <PlatformModal 
        platform={selectedPlatform} 
        onClose={() => setSelectedPlatform(null)} 
      />
    </>
  )
}
