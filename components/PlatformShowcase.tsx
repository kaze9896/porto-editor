'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const platforms = [
  {
    name: 'TikTok',
    logo: 'https://freelogopng.com/images/all_img/1655891638tiktok-icon-png.png',
    color: 'from-pink-500 via-purple-500 to-cyan-400',
    glowColor: 'rgba(236, 72, 153, 0.5)',
  },
  {
    name: 'YouTube',
    logo: 'https://www.freepnglogos.com/uploads/youtube-logo-hd-8.png',
    color: 'from-red-500 to-red-700',
    glowColor: 'rgba(239, 68, 68, 0.5)',
  },
  {
    name: 'Instagram',
    logo: 'https://static.vecteezy.com/system/resources/previews/018/930/415/original/instagram-logo-instagram-icon-transparent-free-png.png',
    color: 'from-purple-600 via-pink-500 to-orange-400',
    glowColor: 'rgba(168, 85, 247, 0.5)',
  },
]

const tools = [
  {
    name: 'Alight Motion',
    logo: 'https://freepnglogo.com/images/all_img/1691819804alight-motion-logo-png.png',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'CapCut',
    logo: 'https://www.pngmart.com/files/23/Capcut-Logo-PNG-Photos.png',
    color: 'from-gray-800 to-black',
  },
]

export default function PlatformShowcase() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [isHovering, setIsHovering] = useState<string | null>(null)

  return (
    <section className="min-h-screen py-20 px-4 relative snap-start section-out-view" id="platforms">
      <div className="max-w-7xl mx-auto">
  {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Where I Create
          </h2>
          <p className="text-gray-400 text-lg">Choose a platform to explore my work</p>
        </motion.div>

        {/* Platform Logos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.5,
                }}
                onMouseEnter={() => setIsHovering(platform.name)}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => setSelectedPlatform(selectedPlatform === platform.name ? null : platform.name)}
                className="cursor-pointer relative group"
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl blur-2xl"
                  style={{
                    background: `radial-gradient(circle, ${platform.glowColor} 0%, transparent 70%)`,
                  }}
                  animate={{
                    scale: isHovering === platform.name ? [1, 1.2, 1] : 1,
                    opacity: isHovering === platform.name ? [0.5, 0.8, 0.5] : 0.3,
                  }}
                  transition={{
                    duration: 2,
                    repeat: isHovering === platform.name ? Infinity : 0,
                  }}
                />

                {/* Logo Container */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative bg-gray-900/80 backdrop-blur-lg rounded-3xl p-8 border-2 border-gray-800 overflow-hidden transition-all duration-300 ${
                    selectedPlatform === platform.name ? `bg-gradient-to-br ${platform.color}` : ''
                  }`}
                  style={{
                    boxShadow: isHovering === platform.name 
                      ? `0 0 40px ${platform.glowColor}, 0 0 80px ${platform.glowColor}` 
                      : 'none',
                  }}
                >
                  {/* Animated gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-20 transition-opacity`}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />

                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="w-32 h-32 relative">
                      <img
                        src={platform.logo}
                        alt={platform.name}
                        className="w-full h-full object-contain drop-shadow-2xl"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{platform.name}</h3>
                    {selectedPlatform === platform.name && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-white/80 text-center"
                      >
                        Click to see projects
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Expanded Section */}
        <AnimatePresence>
          {selectedPlatform && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              onMouseLeave={() => setSelectedPlatform(null)}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="bg-gradient-to-b from-gray-900/50 to-transparent backdrop-blur-lg rounded-3xl border border-gray-800 p-8"
              >
                <h3 className="text-3xl font-bold text-white mb-6 text-center">
                  {selectedPlatform} Projects
                </h3>
                <p className="text-center text-gray-400 mb-8">
                  Projects will be loaded from your database here. Add projects in Supabase to see them!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gray-800/50 rounded-xl aspect-video flex items-center justify-center border border-gray-700"
                    >
                      <p className="text-gray-500">Project {i}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            What I Use
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className={`bg-gradient-to-br ${tool.color} p-6 rounded-2xl flex items-center gap-4 cursor-pointer shadow-2xl`}
              >
                <div className="w-20 h-20 relative flex-shrink-0">
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="w-full h-full object-contain drop-shadow-xl"
                  />
                </div>
                <h4 className="text-xl font-bold text-white">{tool.name}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
