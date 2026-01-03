'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

type Star = {
  id: number
  x: number
  y: number
  size: number
  duration: number
  depth: number // 0 = far, 1 = near
}

const generateStars = (): Star[] =>
  Array.from({ length: 150 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 8 + 6, // slower idle drift
    depth: Math.random(), // used for parallax layers
  }))

export default function Starfield() {
  const stars = useMemo(() => generateStars(), [])
  const [scrollY, setScrollY] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  // starfield parallax
  useEffect(() => {
    if (prefersReducedMotion) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReducedMotion])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {stars.map((star) => {
        // Map depth to parallax strength: far (0) -> tiny movement, near (1) -> more
        const parallaxStrength = prefersReducedMotion ? 0 : 0.25 + star.depth * 0.75
        const translateY = -(scrollY * parallaxStrength * 0.02) // subtle movement

        // idle drifting: very small x/y oscillation
        const driftDistance = 4 + star.depth * 4

        return (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              transform: `translate3d(0, ${translateY}px, 0)`,
            }}
            animate={
              prefersReducedMotion
                ? { opacity: 0.8 }
                : {
                    // floating / drifting stars on idle
                    x: [0, driftDistance, -driftDistance, 0],
                    y: [0, -driftDistance, driftDistance, 0],
                    opacity: [0.3, 1, 0.3],
                  }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    duration: star.duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
          />
        )
      })}
    </div>
  )
}
