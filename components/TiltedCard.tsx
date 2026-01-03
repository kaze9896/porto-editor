import type { SpringOptions } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface TiltedCardProps {
  imageSrc: React.ComponentProps<'img'>['src'];
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties['height'];
  containerWidth?: React.CSSProperties['width'];
  imageHeight?: React.CSSProperties['height'];
  imageWidth?: React.CSSProperties['width'];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  enableIdleAnimation?: boolean;
  idleRotateSpeed?: number;
}

const springValues: SpringOptions = {
  damping: 50,
  stiffness: 150,
  mass: 1.5
};

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  enableIdleAnimation = true,
  idleRotateSpeed = 1
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Idle animation - auto rotate when not hovered
  useEffect(() => {
    if (!enableIdleAnimation) return;

    let startTime = performance.now();

    const animate = (currentTime: number) => {
      if (isHovered) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = (currentTime - startTime) * 0.001 * idleRotateSpeed;
      
      // Lebih besar rotasi supaya keliatan
      const idleRotX = Math.sin(elapsed * 0.8) * (rotateAmplitude * 0.9);
      const idleRotY = Math.cos(elapsed * 0.6) * (rotateAmplitude * 1.0);

      rotateX.set(idleRotX);
      rotateY.set(idleRotY);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enableIdleAnimation, isHovered, idleRotateSpeed, rotateAmplitude, rotateX, rotateY]);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    // Clamp rotation to prevent extreme angles
    const maxRotation = rotateAmplitude;
    const rotationX = Math.max(-maxRotation, Math.min(maxRotation, (offsetY / (rect.height / 2)) * -rotateAmplitude));
    const rotationY = Math.max(-maxRotation, Math.min(maxRotation, (offsetX / (rect.width / 2)) * rotateAmplitude));

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    setIsHovered(true);
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    opacity.set(0);
    scale.set(1);
    rotateFigcaption.set(0);
    // Don't reset rotateX/Y here - let idle animation take over smoothly
  }

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
          style={{
            width: imageWidth,
            height: imageHeight,
            boxShadow: `
              2px 2px 0px rgba(255,255,255,0.9),
              4px 4px 0px rgba(255,255,255,0.7),
              6px 6px 0px rgba(255,255,255,0.5),
              8px 8px 0px rgba(255,255,255,0.3),
              10px 10px 0px rgba(255,255,255,0.15)
            `,
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
