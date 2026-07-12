'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { InteractiveStar } from './interactive-star'
import { analyticsTracker } from '@/lib/analytics'

interface ConstellationCollectorProps {
  onComplete: () => void
}

const MESSAGES = [
  { title: 'Your Heart', message: 'Your beautiful heart is what I cherish most of all.' },
  { title: 'Your Warmth', message: 'Your presence is like a warm embrace I never want to leave.' },
  { title: 'Your Spirit', message: 'Your fierce, beautiful spirit inspires me every single day.' },
  { title: 'Your Laugh', message: 'The sound of your laugh is my absolute favorite sound.' },
  { title: 'Your Smile', message: 'Your smile is a light that brightens even my darkest days.' },
  { title: 'Your Gentleness', message: 'Your gentle nature brings peace to every room you enter.' },
  { title: 'Your Voice', message: 'Hearing your voice is the most comforting melody to my soul.' },
  { title: 'Your Beauty', message: 'Your beauty is effortless, radiating from the inside out.' },
  { title: 'Your Hair', message: "The way your hair falls perfectly, even when you aren't trying." },
  { title: 'Your Eyes', message: 'Your eyes hold the depth of an ocean I could get lost in forever.' },
]

function generateHeartPoints(count: number) {
  const points = []
  for (let i = 0; i < count; i++) {
    const t = Math.PI + i * (2 * Math.PI / count)
    const x = 16 * Math.pow(Math.sin(t), 3)
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
    points.push({ x, y })
  }

  const minX = Math.min(...points.map((p) => p.x))
  const maxX = Math.max(...points.map((p) => p.x))
  const minY = Math.min(...points.map((p) => p.y))
  const maxY = Math.max(...points.map((p) => p.y))

  return points.map((p, i) => {
    const sx = ((p.x - minX) / (maxX - minX)) * 70 + 15
    const sy = (1 - (p.y - minY) / (maxY - minY)) * 60 + 20
    return {
      id: String(i + 1),
      x: sx,
      y: sy,
      size: i === 0 || i === Math.floor(count / 2) ? 12 : 9 + Math.random() * 2,
      depth: i % 3 === 0 ? 'close' : i % 2 === 0 ? 'mid' : 'far',
      title: MESSAGES[i].title,
      message: MESSAGES[i].message,
    }
  })
}

const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`bg-star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-24 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent transform -rotate-45"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
          }}
          animate={{
            x: [0, 400],
            y: [0, 400],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 10 + Math.random() * 20,
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  )
}

export function ConstellationCollector({ onComplete }: ConstellationCollectorProps) {
  const [collected, setCollected] = useState<string[]>([])
  const [activeStarId, setActiveStarId] = useState<string | null>(null)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isCompleteSequence, setIsCompleteSequence] = useState(false)

  const starsData = useMemo(() => generateHeartPoints(10), [])

  const handleCollect = (id: string) => {
    setActiveStarId(id)
    if (!collected.includes(id)) {
      const newCollected = [...collected, id]
      setCollected(newCollected)
      analyticsTracker.trackEvent('star_collected', { id })

      if (newCollected.length === starsData.length) {
        setTimeout(() => {
          setIsCompleteSequence(true)
          setActiveStarId(null)
        }, 1500) // Wait for last star interaction to finish
      }
    }
  }

  useEffect(() => {
    if (isCompleteSequence) {
      const timer = setTimeout(() => {
        setIsFadingOut(true)
      }, 5000)
      const completeTimer = setTimeout(() => {
        onComplete()
      }, 7000)
      return () => {
        clearTimeout(timer)
        clearTimeout(completeTimer)
      }
    }
  }, [isCompleteSequence, onComplete])

  // Build the SVG path for the perfect heart
  const heartPath = useMemo(() => {
    if (starsData.length === 0) return ''
    const points = starsData.map(s => `${s.x},${s.y}`)
    // Close the path to form a complete loop
    return `M ${points.join(' L ')} Z`
  }, [starsData])

  const progressPercent = (collected.length / starsData.length) * 100
  const isZoomed = activeStarId !== null && !isCompleteSequence

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="relative w-full h-screen bg-[#0a0a0f] overflow-hidden flex flex-col items-center justify-center"
      onClick={() => {
        // Dismiss active card if clicking background
        if (activeStarId) setActiveStarId(null)
      }}
    >
      {/* Cinematic Deep Space Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0a0a0f] to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-900/10 via-transparent to-transparent" />
      <Particles />

      {/* Simulated Camera Focus */}
      <motion.div 
        animate={{ scale: isZoomed ? 1.05 : 1 }} 
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full max-w-2xl mx-auto"
      >
        {/* Constellation SVG Guides */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Faint underlying guide */}
          <path
            d={heartPath}
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="0.2"
            vectorEffect="non-scaling-stroke"
          />
          {/* Glowing animated path */}
          <motion.path
            d={heartPath}
            fill="none"
            stroke="rgba(251, 191, 36, 0.6)"
            strokeWidth="0.4"
            vectorEffect="non-scaling-stroke"
            pathLength="100"
            strokeDasharray="100"
            animate={{
              strokeDashoffset: isCompleteSequence ? 0 : 100 - progressPercent,
              stroke: isCompleteSequence ? "rgba(251, 191, 36, 1)" : "rgba(251, 191, 36, 0.6)",
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              filter: 'drop-shadow(0px 0px 4px rgba(251, 191, 36, 0.8))'
            }}
          />
        </svg>

        {/* Stars */}
        {starsData.map((star) => (
          <InteractiveStar
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            size={star.size}
            title={star.title}
            message={star.message}
            depth={star.depth as 'far' | 'mid' | 'close'}
            isCollected={collected.includes(star.id) || isCompleteSequence}
            isActive={activeStarId === star.id}
            onCollect={handleCollect}
          />
        ))}

        {/* Focus Overlay - dims other stars slightly when one is active */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-black/40 pointer-events-none z-10"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Completion Sequence Overlay */}
      <AnimatePresence>
        {isCompleteSequence && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
          >
            {/* Massive background glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.5, 0],
              }}
              transition={{ duration: 3, ease: "easeInOut", times: [0, 0.5, 1] }}
              className="absolute w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-amber-500/20 rounded-full blur-[100px]"
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="text-2xl sm:text-4xl md:text-5xl font-serif text-amber-100 font-light text-center px-6 max-w-3xl leading-relaxed tracking-wide drop-shadow-2xl"
            >
              Every little moment came together to create something beautiful.
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isFadingOut || isCompleteSequence || isZoomed ? 0 : 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 sm:top-16 text-center z-30 pointer-events-none"
      >
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4 tracking-wide drop-shadow-lg">
          Every star tells a little story.
        </h2>
        <motion.div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="text-amber-300">✨</span>
          <p className="text-sm sm:text-base text-white/80 font-light">
            {collected.length} of {starsData.length} memories discovered
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
