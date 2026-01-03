'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, type Project } from '@/lib/supabase'
import VideoEmbed from './VideoEmbed'
import { FaTimes, FaYoutube, FaTiktok, FaInstagram, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const ITEMS_PER_PAGE = 5

interface PlatformModalProps {
  platform: 'youtube' | 'tiktok' | 'instagram' | null
  onClose: () => void
}

const platformConfig = {
  youtube: {
    name: 'YouTube',
    icon: FaYoutube,
    color: '#FF0000',
    gradient: 'from-red-600 to-red-800'
  },
  tiktok: {
    name: 'TikTok',
    icon: FaTiktok,
    color: '#00f2ea',
    gradient: 'from-cyan-400 via-purple-500 to-pink-500'
  },
  instagram: {
    name: 'Instagram',
    icon: FaInstagram,
    color: '#E1306C',
    gradient: 'from-purple-600 via-pink-500 to-orange-400'
  }
}

export default function PlatformModal({ platform, onClose }: PlatformModalProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  
  // Reset page when platform changes
  useEffect(() => {
    setCurrentPage(1)
  }, [platform])
  
  useEffect(() => {
    if (!platform) return
    
    async function fetchProjects() {
      setLoading(true)
      setError(null)
      
      try {
        const { data, error: fetchError } = await supabase
          .from('projects')
          .select('*')
          .eq('platform', platform)
          .order('year', { ascending: false }) // Sort by year, newest first
          .order('order_index', { ascending: true }) // Then by order_index
        
        if (fetchError) {
          setError(fetchError.message)
          return
        }
        
        setProjects(data || [])
      } catch (err) {
        setError('Failed to load projects')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProjects()
  }, [platform])
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (platform) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [platform])
  
  if (!platform) return null
  
  const config = platformConfig[platform]
  const Icon = config.icon
  
  // Pagination logic
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProjects = projects.slice(startIndex, endIndex)
  
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }
  
  return (
    <AnimatePresence>
      {platform && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-gray-900/95 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl overflow-hidden mx-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`relative bg-gradient-to-r ${config.gradient} p-4 md:p-6`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                  <Icon size={28} className="text-white md:hidden" />
                  <Icon size={40} className="text-white hidden md:block" />
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">{config.name} Projects</h2>
                    <p className="text-white/70 text-xs md:text-sm">
                      {projects.length} video{projects.length !== 1 ? 's' : ''}
                      {totalPages > 1 && ` • Page ${currentPage}/${totalPages}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors text-white"
                >
                  <FaTimes size={20} className="md:hidden" />
                  <FaTimes size={24} className="hidden md:block" />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-white"></div>
                </div>
              )}
              
              {error && (
                <div className="text-center py-12">
                  <p className="text-red-400 text-sm md:text-base">{error}</p>
                </div>
              )}
              
              {!loading && !error && projects.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-sm md:text-base">No projects yet for {config.name}</p>
                </div>
              )}
              
              {!loading && !error && projects.length > 0 && (
                <>
                  {/* Vertical scroll grid */}
                  <div className="flex flex-col gap-4 overflow-y-auto pb-4">
                    {currentProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-800/50 rounded-xl p-3 md:p-4 border border-white/5 w-full flex justify-center"
                      >
                        <VideoEmbed
                          platform={project.platform}
                          videoUrl={project.video_url}
                          year={project.year}
                        />
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Pagination Controls - Always show */}
                  <div className="flex items-center justify-center gap-2 md:gap-4 mt-4 pt-4 border-t border-white/10">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white"
                      >
                        <FaChevronLeft size={16} />
                      </button>
                      
                      <div className="flex items-center gap-1 md:gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full text-sm md:text-base font-medium transition-all ${
                              page === currentPage
                                ? 'bg-gradient-to-r ' + config.gradient + ' text-white scale-110'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white"
                      >
                        <FaChevronRight size={16} />
                      </button>
                    </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
