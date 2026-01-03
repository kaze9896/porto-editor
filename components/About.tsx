'use client'

import { motion } from 'framer-motion'
import { FaYoutube, FaTiktok, FaInstagram, FaWhatsapp } from 'react-icons/fa'

const socialLinks = [
  { name: 'YouTube', icon: FaYoutube, url: '#', color: 'hover:text-red-500' },
  { name: 'TikTok', icon: FaTiktok, url: '#', color: 'hover:text-cyan-400' },
  { name: 'Instagram', icon: FaInstagram, url: '#', color: 'hover:text-pink-500' },
  { name: 'WhatsApp', icon: FaWhatsapp, url: '#', color: 'hover:text-green-500' },
]

export default function About() {
  return (
    <motion.section 
      className="min-h-screen py-20 px-4 relative snap-start section-out-view" 
      id="about"
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I&apos;m a passionate video editor specializing in creating engaging short-form content for 
            YouTube, TikTok, and Instagram. Using mobile editing tools like Alight Motion, I bring 
            creative visions to life with professional results. Whether it&apos;s dynamic transitions, 
            eye-catching effects, or smooth storytelling, I focus on making content that stands out.
          </p>
        </motion.div>

        {/* Contact/Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
          <div className="flex justify-center gap-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 ${social.color} transition-colors`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={40} />
              </motion.a>
            ))}
          </div>
          <p className="text-gray-400 mt-6">
            Interested in working together? Reach out on any platform!
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
