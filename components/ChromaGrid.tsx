import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
  onItemClick?: (url: string) => void;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
  onItemClick
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const mobileFadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  
  // Mobile: track which card is tapped to show chroma effect
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number | null>(null);
  const mobileTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const demo: ChromaItem[] = [
    {
      image: 'https://i.pravatar.cc/300?img=8',
      title: 'Alex Rivera',
      subtitle: 'Full Stack Developer',
      handle: '@alexrivera',
      borderColor: '#4F46E5',
      gradient: 'linear-gradient(145deg,#4F46E5,#000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=11',
      title: 'Jordan Chen',
      subtitle: 'DevOps Engineer',
      handle: '@jordanchen',
      borderColor: '#10B981',
      gradient: 'linear-gradient(210deg,#10B981,#000)',
      url: 'https://linkedin.com/in/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=3',
      title: 'Morgan Blake',
      subtitle: 'UI/UX Designer',
      handle: '@morganblake',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(165deg,#F59E0B,#000)',
      url: 'https://dribbble.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=16',
      title: 'Casey Park',
      subtitle: 'Data Scientist',
      handle: '@caseypark',
      borderColor: '#EF4444',
      gradient: 'linear-gradient(195deg,#EF4444,#000)',
      url: 'https://kaggle.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=25',
      title: 'Sam Kim',
      subtitle: 'Mobile Developer',
      handle: '@thesamkim',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(225deg,#8B5CF6,#000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=60',
      title: 'Tyler Rodriguez',
      subtitle: 'Cloud Architect',
      handle: '@tylerrod',
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(135deg,#06B6D4,#000)',
      url: 'https://aws.amazon.com/'
    }
  ];

  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = (url?: string, index?: number) => {
    // On mobile (touch devices), show chroma effect first
    const isMobile = window.innerWidth < 640; // sm breakpoint
    
    if (isMobile && index !== undefined) {
      // If already active, proceed with click action
      if (mobileActiveIndex === index) {
        if (url && onItemClick) {
          onItemClick(url);
        } else if (url) {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
        setMobileActiveIndex(null);
        return;
      }
      
      // First tap: show chroma effect centered on this card
      setMobileActiveIndex(index);
      
      // Get card position and update chroma position
      const cards = rootRef.current?.querySelectorAll('article');
      if (cards && cards[index]) {
        const card = cards[index] as HTMLElement;
        const cardRect = card.getBoundingClientRect();
        const rootRect = rootRef.current!.getBoundingClientRect();
        const centerX = cardRect.left - rootRect.left + cardRect.width / 2;
        const centerY = cardRect.top - rootRect.top + cardRect.height / 2;
        
        // Update position for mobile overlay
        setX.current?.(centerX);
        setY.current?.(centerY);
        
        // Show chroma effect
        gsap.to(mobileFadeRef.current, { opacity: 0, duration: 0.3, overwrite: true });
      }
      
      // Auto-hide after 2 seconds if not tapped again
      if (mobileTimeoutRef.current) {
        clearTimeout(mobileTimeoutRef.current);
      }
      mobileTimeoutRef.current = setTimeout(() => {
        setMobileActiveIndex(null);
        gsap.to(mobileFadeRef.current, { opacity: 1, duration: 0.3, overwrite: true });
      }, 2000);
      
      return;
    }
    
    // Desktop behavior: immediate click
    if (!url) return;
    if (onItemClick) {
      onItemClick(url);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-full flex flex-nowrap justify-center items-center gap-3 sm:gap-6 md:gap-12 px-2 sm:px-4 ${className}`}
      style={
        {
          '--r': `${radius}px`,
          '--x': '50%',
          '--y': '50%'
        } as React.CSSProperties
      }
    >
      {data.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url, i)}
          className={`group relative flex flex-col w-[85px] h-[115px] sm:w-[120px] sm:h-[155px] md:w-[180px] md:h-[220px] rounded-[12px] sm:rounded-[16px] md:rounded-[20px] overflow-hidden border-2 border-transparent transition-all duration-300 cursor-pointer flex-shrink-0 hover:scale-105 md:hover:scale-110 hover:z-50 ${mobileActiveIndex === i ? 'scale-105 z-50 ring-2 ring-white/50' : ''}`}
          style={
            {
              '--card-border': c.borderColor || 'transparent',
              background: c.gradient,
              '--spotlight-color': 'rgba(255,255,255,0.3)'
            } as React.CSSProperties
          }
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
            }}
          />
          <div className="relative z-10 flex-1 p-2 md:p-3 box-border flex items-center justify-center">
            <img src={c.image} alt={c.title} loading="lazy" className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain drop-shadow-lg" />
          </div>
          <footer className="relative z-10 p-2 md:p-3 text-white font-sans text-center">
            <h3 className="m-0 text-sm sm:text-base md:text-lg font-bold">{c.title}</h3>
            <p className="m-0 text-[10px] sm:text-xs md:text-sm opacity-75">{c.subtitle}</p>
          </footer>
        </article>
      ))}
      {/* Chroma overlay - DESKTOP only (sm and up) */}
      <div
        className="absolute inset-0 pointer-events-none z-30 hidden sm:block"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'
        }}
      />
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40 hidden sm:block"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          opacity: 1
        }}
      />
      
      {/* Chroma overlay - MOBILE only (below sm) */}
      {/* Grayscale overlay - extends beyond container to cover everything */}
      <div
        className="pointer-events-none z-30 sm:hidden"
        style={{
          position: 'absolute',
          top: '-100px',
          left: '-100px',
          right: '-100px',
          bottom: '-100px',
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          ...(mobileActiveIndex !== null ? {
            maskImage: 'radial-gradient(circle var(--r) at calc(var(--x) + 100px) calc(var(--y) + 100px),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)',
            WebkitMaskImage: 'radial-gradient(circle var(--r) at calc(var(--x) + 100px) calc(var(--y) + 100px),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'
          } : {})
        }}
      />
    </div>
  );
};

export default ChromaGrid;
