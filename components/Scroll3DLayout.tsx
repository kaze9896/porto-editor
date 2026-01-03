'use client'

import { useEffect, type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Scroll3DLayout({ children }: Props) {
  // 3d section scroll transition
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section, section[id]')
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement
          if (entry.isIntersecting) {
            target.classList.add('section-in-view')
            target.classList.remove('section-out-view')
          } else {
            target.classList.remove('section-in-view')
            target.classList.add('section-out-view')
          }
        })
      },
      { threshold: 0.25 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [])

  return <main className="relative z-10 flex flex-col">{children}</main>
}
