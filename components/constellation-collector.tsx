'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { InteractiveStar } from './interactive-star'
import { analyticsTracker } from '@/lib/analytics'

interface ConstellationCollectorProps {
  onComplete: () => void
}

const STARS_DATA = [
  { id: '1', x: 50, y: 80, size: 12, title: 'Your Heart', message: 'Your beautiful heart is what I cherish most of all.', depth: 'close' },
  { id: '2', x: 60, y: 67, size: 8, title: 'Your Warmth', message: 'Your presence is like a warm embrace I never want to leave.', depth: 'mid' },
  { id: '3', x: 90, y: 41, size: 10, title: 'Your Spirit', message: 'Your fierce, beautiful spirit inspires me every single day.', depth: 'far' },
  { id: '4', x: 90, y: 13, size: 9, title: 'Your Laugh', message: 'The sound of your laugh is my absolute favorite sound.', depth: 'mid' },
  { id: '5', x: 60, y: 10, size: 11, title: 'Your Smile', message: 'Your smile is a light that brightens even my darkest days.', depth: 'close' },
  { id: '6', x: 50, y: 24, size: 8, title: 'Your Gentleness', message: 'Your gentle nature brings peace to every room you enter.', depth: 'far' },
  { id: '7', x: 40, y: 10, size: 10, title: 'Your Voice', message: 'Hearing your voice is the most comforting melody to my soul.', depth: 'close' },
  { id: '8', x: 10, y: 13, size: 9, title: 'Your Beauty', message: 'Your beauty is effortless, radiating from the inside out.', depth: 'mid' },
  { id: '9', x: 10, y: 41, size: 8, title: 'Your Hair', message: "The way your hair falls perfectly, even when you aren't trying.", depth: 'far' },
  { id: '10', x: 40, y: 67, size: 11, title: 'Your Eyes', message: 'Your eyes hold the depth of an ocean I could get lost in forever.', depth: 'close' },
]

const HEART_CENTER = { x: 50, y: 42 }

function getCurvedPath(x1: number, y1: number, x2: number, y2: number): string {
  const midX = (x1 + x2) / 2
  const midY = (y1 + y2) / 2

  const toCenterX = midX - HEART_CENTER.x
  const toCenterY = midY - HEART_CENTER.y
  const dist = Math.sqrt(toCenterX ** 2 + toCenterY ** 2) || 1

  const isTopCleft = midY < 38 && Math.abs(midX - 50) < 22
  const isBottomPoint = y1 > 75 || y2 > 75
  const bulge = isTopCleft ? -6 : isBottomPoint ? 4 : 8

  const ctrlX = midX + (toCenterX / dist) * bulge
  const ctrlY = midY + (toCenterY / dist) * bulge

  return `M ${x1} ${y1} Q ${ctrlX} ${ctrlY} ${x2} ${y2}`
}

export function ConstellationCollector({ onComplete }: ConstellationCollectorProps) {
  const [collected, setCollected] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < STARS_DATA.length) {
        const currentIndex = index
        setActiveIndex(currentIndex)
        setCollected(prev => {
          if (!prev.includes(STARS_DATA[currentIndex].id)) {
            return [...prev, STARS_DATA[currentIndex].id]
          }
          return prev
        })
        index++
      } else {
        setActiveIndex(-1)
        clearInterval(interval)
        setTimeout(() => {
          setIsFadingOut(true)
        }, 1500)
        setTimeout(() => {
          onComplete()
        }, 3500)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [onComplete])

  const progressPercent = (collected.length / STARS_DATA.length) * 100

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="relative w-full h-screen bg-gradient-to-br from-[#2a0414] via-[#4a0e26] to-[#1a0009] overflow-hidden flex flex-col items-center justify-center"
    >


      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isFadingOut ? 0 : 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 sm:top-16 text-center"
      >
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4">
          Watch the stars align for you...
        </h2>
        <p className="text-lg text-white/60">
          {collected.length} / {STARS_DATA.length} stars discovered
        </p>
      </motion.div>

      {/* Stars */}
      <motion.div className="relative w-full h-full">
        {STARS_DATA.map((star, idx) => (
          <InteractiveStar
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            size={star.size}
            title={star.title}
            message={star.message}
            depth={star.depth as 'far' | 'mid' | 'close'}
            isCollected={collected.includes(star.id)}
            isActive={activeIndex === idx}
            onCollect={() => {}}
          />
        ))}

        {/* Constellation lines — smooth curves between adjacent stars */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {STARS_DATA.map((star, idx) => {
            const nextStar = STARS_DATA[(idx + 1) % STARS_DATA.length]
            if (collected.includes(star.id) && collected.includes(nextStar.id)) {
              const pathD = getCurvedPath(star.x, star.y, nextStar.x, nextStar.y)
              return (
                <motion.path
                  key={`line-${star.id}-${nextStar.id}`}
                  d={pathD}
                  fill="none"
                  stroke="rgba(255, 117, 140, 0.6)"
                  strokeWidth="0.35"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              )
            }
            return null
          })}
        </svg>
      </motion.div>

      {/* Progress indicator */}
      <motion.div className="absolute bottom-12 sm:bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="w-48 sm:w-64 h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-[#FFB7B2] to-[#E2D1F9]"
            transition={{ duration: 0.6 }}
          />
        </div>
      </motion.div>


    </motion.div>
  )
}
