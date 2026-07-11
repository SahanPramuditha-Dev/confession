'use client'

import { motion } from 'framer-motion'
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
    }
  }

  const baseOpacity = depth === 'far' ? 0.3 : depth === 'mid' ? 0.6 : 1
  const scale = depth === 'far' ? 0.5 : depth === 'mid' ? 0.75 : 1

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isCollected ? 1 : baseOpacity, scale }}
      className="absolute cursor-pointer z-10"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow container */}
      <motion.div
        animate={{
          boxShadow: isHovered || isCollected
            ? `0 0 40px rgba(255, 117, 140, 0.9), 0 0 80px rgba(255, 126, 179, 0.5)`
            : `0 0 20px rgba(255, 117, 140, 0.4), 0 0 40px rgba(255, 126, 179, 0.2)`,
        }}
        className="relative"
      >
        {/* Star */}
        <motion.div
          animate={{
            scale: isHovered || isCollected ? 1.3 : 1,
          }}
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
          className={`w-${size} h-${size} rounded-full transition-all ${
            isCollected
              ? 'bg-gradient-to-r from-[#FF758C] to-[#FF7EB3]'
              : 'bg-white'
          }`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        >
          {/* Twinkle animation */}
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="w-full h-full rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Message card on click, hover, or when active during auto-connect */}
      {(isHovered || isActive) && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: -100, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute left-1/2 transform -translate-x-1/2 w-72 h-36 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-5 text-center shadow-2xl pointer-events-none z-50 flex flex-col items-center justify-center"
        >
          <h3 className="text-xl font-serif text-white mb-2 font-light">{title}</h3>
          <p className="text-sm text-white/90 leading-relaxed font-light">{message}</p>
        </motion.div>
      )}

      {/* Collected indicator */}
      {isCollected && (
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute inset-0 rounded-full border-2 border-[#FFD166]"
        />
      )}
    </motion.div>
  )
}
