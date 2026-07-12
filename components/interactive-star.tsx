'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface InteractiveStarProps {
  id: string
  x: number
  y: number
  size: number
  message: string
  title: string
  depth: 'far' | 'mid' | 'close'
  isCollected: boolean
  isActive?: boolean
  onCollect: (id: string) => void
}

export function InteractiveStar({
  id,
  x,
  y,
  size,
  message,
  title,
  depth,
  isCollected,
  isActive = false,
  onCollect,
}: InteractiveStarProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (!isCollected) {
      onCollect(id)
    } else {
      // Allow re-reading the memory if already collected
      onCollect(id)
    }
  }

  // Visual scaling based on depth
  const baseScale = depth === 'far' ? 0.6 : depth === 'mid' ? 0.8 : 1
  const baseOpacity = depth === 'far' ? 0.4 : depth === 'mid' ? 0.7 : 1

  const isFocused = isActive || isHovered

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isCollected ? 1 : baseOpacity,
        scale: baseScale,
        y: [0, -3, 0] // Gentle floating
      }}
      transition={{
        opacity: { duration: 1 },
        scale: { duration: 1 },
        y: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }
      }}
      className="absolute cursor-pointer z-20 min-w-[60px] min-h-[60px] flex items-center justify-center"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Floating Sparkles (only when hovered or active) */}
      <AnimatePresence>
        {isFocused && !isCollected && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0.5, 1.5, 0.5],
                  x: (Math.random() - 0.5) * 60,
                  y: (Math.random() - 0.5) * 60
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 + Math.random(), repeat: Infinity }}
                className="absolute w-1 h-1 bg-yellow-200 rounded-full blur-[1px]"
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Explosion Particles (triggered on collection) */}
      <AnimatePresence>
        {isCollected && isActive && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`explode-${i}`}
                initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                animate={{ 
                  opacity: 0, 
                  scale: 0,
                  x: Math.cos((i * 30) * Math.PI / 180) * 80,
                  y: Math.sin((i * 30) * Math.PI / 180) * 80
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute w-1.5 h-1.5 bg-amber-300 rounded-full blur-[1px]"
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Breathing Halo / Outer Glow */}
      <motion.div
        animate={{
          scale: isFocused || isCollected ? [1, 1.2, 1] : 1,
          opacity: isFocused || isCollected ? [0.5, 0.8, 0.5] : 0.3,
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute rounded-full pointer-events-none transition-colors duration-700 ${
          isCollected ? 'bg-amber-400/30 blur-md' : 'bg-white/20 blur-sm'
        }`}
        style={{ width: size * 2.5, height: size * 2.5 }}
      />

      {/* Rotating Ring on Hover */}
      <AnimatePresence>
        {(isFocused || isCollected) && (
          <motion.div
            initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 360, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ rotate: { duration: 8, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.3 } }}
            className="absolute rounded-full border border-amber-300/40 pointer-events-none"
            style={{ width: size * 3, height: size * 3 }}
          />
        )}
      </AnimatePresence>

      {/* The Core Star */}
      <motion.div
        animate={{
          scale: isFocused ? 1.4 : isCollected ? 1.2 : 1,
          boxShadow: isCollected 
            ? '0 0 20px rgba(251, 191, 36, 0.8), 0 0 40px rgba(251, 191, 36, 0.4)'
            : isFocused
            ? '0 0 15px rgba(255, 255, 255, 0.8)'
            : '0 0 10px rgba(255, 255, 255, 0.4)',
        }}
        transition={{ duration: 0.4 }}
        className={`relative rounded-full transition-colors duration-700 ${
          isCollected 
            ? 'bg-gradient-to-br from-amber-200 to-rose-300 border border-amber-100' 
            : 'bg-gradient-to-br from-white to-pink-100'
        }`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {/* Pink center core */}
        <div className="absolute inset-1 bg-rose-400/40 rounded-full blur-[1px]" />
      </motion.div>

      {/* Premium Info Card */}
      <AnimatePresence>
        {isActive && (
          <>
            {/* Connecting Beam */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 40 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/2 left-1/2 w-[1px] bg-gradient-to-b from-amber-300/80 to-transparent origin-top z-[-1]"
            />
            
            {/* Glassmorphism Card */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 40, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} // smooth apple-like spring
              className="absolute left-1/2 transform -translate-x-1/2 top-1/2 w-64 sm:w-72 mt-2 bg-white/5 backdrop-blur-xl border border-amber-300/30 rounded-2xl p-6 text-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] z-50 flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Card internal glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50" />
              
              <h3 className="relative text-xl font-serif text-amber-50 mb-3 font-medium tracking-wide">
                {title}
              </h3>
              <p className="relative text-sm text-white/80 leading-relaxed font-light">
                {message}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
