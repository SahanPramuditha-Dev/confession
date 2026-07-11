'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { InteractiveStar } from './interactive-star'
import { analyticsTracker } from '@/lib/analytics'

interface ConstellationCollectorProps {
  onComplete: () => void
}

const STARS_DATA = [
  { id: '1', x: 15, y: 20, size: 8, message: 'Your smile', depth: 'close' },
  { id: '2', x: 85, y: 25, size: 6, message: 'The moment we met', depth: 'far' },
  { id: '3', x: 50, y: 15, size: 10, message: 'Your presence', depth: 'close' },
  { id: '4', x: 25, y: 60, size: 7, message: 'Quiet conversations', depth: 'mid' },
  { id: '5', x: 75, y: 70, size: 6, message: 'Unexpected laughter', depth: 'far' },
  { id: '6', x: 50, y: 80, size: 9, message: 'The curiosity you sparked', depth: 'close' },
  { id: '7', x: 10, y: 75, size: 5, message: 'Your courage', depth: 'far' },
]

export function ConstellationCollector({ onComplete }: ConstellationCollectorProps) {
  const [collected, setCollected] = useState<string[]>([])
  const [showContinue, setShowContinue] = useState(false)
  const [completionAnimation, setCompletionAnimation] = useState(false)
  const sessionId = analyticsTracker.getSessionId()
  const [enteredAt] = useState(Date.now())

  useEffect(() => {
    analyticsTracker.trackEvent('star_section_entered', 'constellation', { timestamp: new Date().toISOString() })
  }, [])

  const handleStarCollect = (id: string) => {
    if (!collected.includes(id)) {
      const newCollected = [...collected, id]
      setCollected(newCollected)
      analyticsTracker.trackEvent('star_clicked', 'constellation', { 
        starId: id,
        totalCollected: newCollected.length,
        timestamp: new Date().toISOString(),
      })

      // Check if all stars collected
      if (newCollected.length === STARS_DATA.length) {
        analyticsTracker.trackEvent('all_stars_completed', 'constellation', {
          totalTime: Math.floor((Date.now() - enteredAt) / 1000),
          timestamp: new Date().toISOString(),
        })
        
        // Record in database
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'all_stars_completed',
            section: 'constellation',
            timestamp: new Date().toISOString(),
            sessionId,
            data: {
              totalStars: newCollected.length,
              timeSpent: Math.floor((Date.now() - enteredAt) / 1000),
            },
          }),
        }).catch(err => console.error('[v0] Error recording stars completion:', err))
        
        // Beautiful completion animation before showing continue
        setCompletionAnimation(true)
        setTimeout(() => {
          setShowContinue(true)
        }, 1800)
      }
    }
  }

  const progressPercent = (collected.length / STARS_DATA.length) * 100

  return (
    <div className="relative w-full h-screen bg-[#070B18] overflow-hidden flex flex-col items-center justify-center">
      {/* Completion overlay animation */}
      {completionAnimation && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-b from-[#FF4D6D]/20 to-[#9D4EDD]/20 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="flex items-center justify-center h-full">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-32 h-32 border-4 border-[#FF4D6D] rounded-full opacity-30"
              />
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-light text-white z-50 pointer-events-none"
          >
            Constellation Complete
          </motion.p>
        </>
      )}

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: completionAnimation ? 0 : 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-16 text-center"
      >
        <h2 className="text-4xl font-light text-white mb-4">Click each star to reveal what moved me</h2>
        <p className="text-lg text-white/60">
          {collected.length} / {STARS_DATA.length} stars discovered
        </p>
      </motion.div>

      {/* Stars */}
      <motion.div 
        className="relative w-full h-full"
        animate={{ opacity: completionAnimation ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        {STARS_DATA.map((star) => (
          <InteractiveStar
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            size={star.size}
            message={star.message}
            depth={star.depth as 'far' | 'mid' | 'close'}
            isCollected={collected.includes(star.id)}
            onCollect={handleStarCollect}
          />
        ))}

        {/* Constellation lines - draw when stars are collected */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {collected.length > 1 &&
            collected.slice(0, -1).map((id, idx) => {
              const star1 = STARS_DATA.find((s) => s.id === id)!
              const star2 = STARS_DATA.find((s) => s.id === collected[idx + 1])!
              const x1 = (star1.x / 100) * window.innerWidth
              const y1 = (star1.y / 100) * window.innerHeight
              const x2 = (star2.x / 100) * window.innerWidth
              const y2 = (star2.y / 100) * window.innerHeight

              return (
                <motion.line
                  key={`line-${id}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(255, 77, 109, 0.5)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                />
              )
            })}
        </svg>
      </motion.div>

      {/* Progress indicator */}
      <motion.div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-[#FF4D6D] to-[#9D4EDD]"
            transition={{ duration: 0.6 }}
          />
        </div>
      </motion.div>

      {/* Continue button */}
      {showContinue && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="absolute bottom-8 px-8 py-4 bg-gradient-to-r from-[#FF4D6D] to-[#9D4EDD] rounded-full font-semibold text-white hover:shadow-2xl transition-all"
        >
          Chapter Unlocked →
        </motion.button>
      )}
    </div>
  )
}
