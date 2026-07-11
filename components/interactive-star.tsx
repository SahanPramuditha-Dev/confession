'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface InteractiveStarProps {
  id: string
  x: number
  y: number
  size: number
  message: string
  depth: number
  isCollected: boolean
  onCollect: (id: string) => void
}

export function InteractiveStar({
  id,
  x,
  y,
  size,
  message,
  depth,
  isCollected,
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
      className="absolute cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%` }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow container */}
      <motion.div
        animate={{
          boxShadow: isHovered || isCollected
            ? `0 0 30px rgba(255, 77, 109, 0.8), 0 0 60px rgba(157, 78, 221, 0.4)`
            : `0 0 15px rgba(255, 77, 109, 0.3), 0 0 30px rgba(157, 78, 221, 0.1)`,
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
              ? 'bg-gradient-to-r from-[#FF4D6D] to-[#9D4EDD]'
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

      {/* Message card on click */}
      {isHovered && !isCollected && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: -50 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2 text-sm text-white pointer-events-none"
        >
          {message}
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
