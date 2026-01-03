'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden snap-start section-out-view">
      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.9 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            style={{ backgroundSize: '200% 200%' }}
          >
            Video Editor
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Creating engaging content for YouTube & Social Media
          </motion.p>
          
          <motion.p 
            className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Specialized in short-form content editing with Alight Motion and mobile editing tools.
            Bringing creative visions to life, one frame at a time.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-gray-400 text-sm"
          >
            ↓ Scroll to explore ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
