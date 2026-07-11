'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import gsap from 'gsap'
import { audioSystem } from '@/lib/audio-system'

interface EndingSequenceProps {
  name: string
  onComplete?: () => void
}

export function EndingSequence({ name, onComplete }: EndingSequenceProps) {
  const [phase, setPhase] = useState<'stars' | 'zoom' | 'message' | 'final'>('stars')

  const handlePhaseComplete = (nextPhase: typeof phase) => {
    audioSystem.createWhoosh(300)
    setPhase(nextPhase)
  }

  return (
    <div className="fixed inset-0 bg-[#070B18] flex items-center justify-center">
      {/* Star Field Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={phase === 'stars' ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }}
            transition={{
              delay: i * 0.05,
              duration: 2,
              repeat: phase === 'stars' ? Infinity : 0,
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Shooting Star Animation */}
      {phase === 'stars' && (
        <motion.div
          initial={{ x: -1000, y: -1000, opacity: 0 }}
          animate={{ x: 1000, y: 1000, opacity: [0, 1, 0] }}
          transition={{ duration: 3, ease: 'easeIn' }}
          onAnimationComplete={() => handlePhaseComplete('zoom')}
          className="absolute w-1 h-1 bg-[#FFD166] rounded-full blur-sm shadow-lg"
          style={{
            boxShadow: '0 0 20px rgba(255, 209, 102, 0.8), 0 0 40px rgba(255, 77, 109, 0.4)',
          }}
        />
      )}

      {/* Zoom Phase */}
      {phase === 'zoom' && (
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.5 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          onAnimationComplete={() => handlePhaseComplete('message')}
          className="absolute inset-0 bg-gradient-to-b from-[#FF4D6D] via-transparent to-[#9D4EDD]"
        />
      )}

      {/* Thank You Message */}
      {phase === 'message' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          onAnimationComplete={() => handlePhaseComplete('final')}
          className="relative z-10 text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8"
          >
            <div className="text-6xl font-bold bg-gradient-to-r from-[#FF4D6D] to-[#FFD166] bg-clip-text text-transparent mb-4">
              Thank You
            </div>
            <p className="text-2xl text-[rgba(255,255,255,0.8)]">
              {name}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-lg text-[rgba(255,255,255,0.6)] max-w-md"
          >
            For being part of my story
          </motion.p>
        </motion.div>
      )}

      {/* Glowing Heart Pulse */}
      {(phase === 'message' || phase === 'final') && (
        <motion.div
          className="absolute z-10 text-5xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ❤️
        </motion.div>
      )}

      {/* Final Fade to Black */}
      {phase === 'final' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 2 }}
          onAnimationComplete={onComplete}
          className="absolute inset-0 bg-black"
        />
      )}

      {/* Replay Button */}
      {phase === 'final' && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          onClick={onComplete}
          className="relative z-20 px-8 py-4 bg-gradient-to-r from-[#FF4D6D] to-[#9D4EDD] rounded-full text-white font-bold hover:shadow-xl transition-all"
        >
          Replay Story
        </motion.button>
      )}
    </div>
  )
}
