"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import GradientText from "./GradientText"
import TiltedCard from "./TiltedCard"
import SplitText from "./SplitText"
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

export default function AboutMe() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeIcon, setActiveIcon] = useState<string | null>(null)
  const iconTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  
  const handleIconTap = (iconName: string, url: string) => {
    // Check if we're on mobile
    const isMobile = window.innerWidth < 640
    
    if (isMobile) {
      // If already active, navigate
      if (activeIcon === iconName) {
        window.open(url, '_blank', 'noopener,noreferrer')
        setActiveIcon(null)
        return
      }
      
      // First tap: show color
      setActiveIcon(iconName)
      
      // Clear existing timeout
      if (iconTimeoutRef.current) {
        clearTimeout(iconTimeoutRef.current)
      }
      
      // Auto-reset after 2 seconds
      iconTimeoutRef.current = setTimeout(() => {
        setActiveIcon(null)
      }, 2000)
    } else {
      // Desktop: just navigate
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1) within the first viewport height
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const progress = Math.min(1, Math.max(0, scrollY / viewportHeight))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate scale and opacity based on scroll
  const scale = 1 - (scrollProgress * 0.15) // Scale from 1 to 0.85
  const opacity = 1 - (scrollProgress * 0.4) // Opacity from 1 to 0.6

  return (
    <>
      {/* Fixed background section - DIEM di tempat dengan efek mundur */}
      <motion.div 
        className="fixed inset-0 min-h-screen py-20 px-4 flex items-center justify-center" 
        id="about-me"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          zIndex: 10,
          transform: `scale(${scale})`,
          opacity: opacity,
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center justify-items-center">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-10 max-w-xl"
            >
              {/* Heading: Welcome to my portfolio website!! */}
              <SplitText
                text="Welcome to my portofolio website!!"
                className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
                delay={80}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.15}
                rootMargin="-80px"
                tag="h1"
                textAlign="left"
              />

              {/* Name with Gradient, bold + text shadow BEHIND using drop-shadow filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                style={{
                  filter: 'drop-shadow(3px 3px 0px rgba(71,85,105,0.9)) drop-shadow(5px 5px 0px rgba(51,65,85,0.7)) drop-shadow(7px 7px 0px rgba(30,41,59,0.5))'
                }}
              >
                <GradientText
                  colors={["#ffffff", "#c7d2ff", "#60a5fa", "#e5e7eb", "#ffffff"]}
                  animationSpeed={3}
                  showBorder={false}
                  className="text-2xl md:text-3xl font-extrabold"
                >
                  Yonathan Irdiyanto Nugroho Dwi Atmojo
                </GradientText>
              </motion.div>

              {/* Description text with blur-like fade per block */}
              <div className="text-gray-200 space-y-3 leading-relaxed text-sm md:text-base">
                <motion.p
                  initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                 <span className="text-white font-semibold">I'm Video Editor
                    <span className="text-gray-400 italic">(Also I can be your Frontend dev or gym coach — $5 burger and I’m in)</span>
                    </span>.
                  <br />
                  Information System Major with chatgpt
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, delay: 1.7 }}
                >
                  I use <span className="text-blue-400 font-semibold">Alight Motion</span> cause i used to it
                  <br />
                  <span className="text-gray-400 italic">(nahhhhh my laptop just gonna be C4 in after effect).</span>
                </motion.p>

                {/* Social icons */}
                <div className="pt-2 flex gap-6">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleIconTap('instagram', 'https://www.instagram.com/joirno')
                    }}
                    className={`group relative inline-block transition-colors duration-200 cursor-pointer ${activeIcon === 'instagram' ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
                    style={{ width: '28px', height: '28px', background: 'none', border: 'none', padding: 0 }}
                  >
                    <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-200 ${activeIcon === 'instagram' ? '-translate-y-1' : 'group-hover:-translate-y-1'}`}>
                      <FaInstagram size={28} />
                    </div>
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleIconTap('tiktok', 'https://www.tiktok.com/@kazewealth')
                    }}
                    className={`group relative inline-block transition-colors duration-200 cursor-pointer ${activeIcon === 'tiktok' ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'}`}
                    style={{ width: '28px', height: '28px', background: 'none', border: 'none', padding: 0 }}
                  >
                    <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-200 ${activeIcon === 'tiktok' ? '-translate-y-1' : 'group-hover:-translate-y-1'}`}>
                      <FaTiktok size={28} />
                    </div>
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleIconTap('whatsapp', 'https://wa.me/6282220169822')
                    }}
                    className={`group relative inline-block transition-colors duration-200 cursor-pointer ${activeIcon === 'whatsapp' ? 'text-green-500' : 'text-gray-400 hover:text-green-500'}`}
                    style={{ width: '28px', height: '28px', background: 'none', border: 'none', padding: 0 }}
                  >
                    <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-200 ${activeIcon === 'whatsapp' ? '-translate-y-1' : 'group-hover:-translate-y-1'}`}>
                      <FaWhatsapp size={28} />
                    </div>
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleIconTap('email', 'mailto:yonathanirdiyanto@gmail.com')
                    }}
                    className={`group relative inline-block transition-colors duration-200 cursor-pointer ${activeIcon === 'email' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                    style={{ width: '28px', height: '28px', background: 'none', border: 'none', padding: 0 }}
                  >
                    <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-200 ${activeIcon === 'email' ? '-translate-y-1' : 'group-hover:-translate-y-1'}`}>
                      <MdEmail size={28} />
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right side - Tilted Card with your photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="flex justify-center items-center"
            >
              <TiltedCard
                imageSrc="/profile-photo.jpg"
                altText="Yonathan - Video Editor"
                captionText="Yonathan - Video Editor"
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={8}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="text-white text-xs font-semibold px-2 py-1 bg-black/50 rounded">
                    Yonathan - Video Editor
                  </p>
                }
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Spacer untuk scroll */}
      <div className="h-screen" />
    </>
  )
}
