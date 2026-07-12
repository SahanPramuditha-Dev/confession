'use client'

import { FIRST_MEETING_DATE, MESSAGES } from '@/lib/constants'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { GlassCard } from './glass-card'
import { analyticsTracker } from '@/lib/analytics'

interface MemorySceneProps {
  name?: string
  onContinue: () => void
}

export function MemoryScene({ name = 'You', onContinue }: MemorySceneProps) {
  useEffect(() => {
    analyticsTracker.trackEvent('response_screen_viewed', 'memory')
  }, [])

  const daysAgo = Math.max(
    0,
    Math.floor(
      (new Date().getTime() - FIRST_MEETING_DATE.getTime()) / (1000 * 60 * 60 * 24)
    )
  )

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-[#E2D1F9]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-[#FFB7B2]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="text-center space-y-4"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-white/50 font-serif">
            A memory worth keeping
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-white">
            {name}…
          </h2>
          <p className="text-lg text-white/80 font-light">
            {MESSAGES.memoryIntro(daysAgo)}
          </p>
        </motion.div>

        <GlassCard className="p-5 sm:p-8 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6 text-center"
          >
            <p className="text-white/90 font-light leading-relaxed text-lg">
              Every day since then, I&apos;ve thought about that encounter — about you —
              and how a single moment can quietly shift everything.
            </p>
            <p className="text-xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#FFB7B2] via-[#FFE5B4] to-[#E2D1F9] italic font-serif">
              &ldquo;Would you like to explore this connection with me?&rdquo;
            </p>
          </motion.div>
        </GlassCard>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(255, 183, 178, 0.35)' }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="mx-auto block px-10 py-4 bg-gradient-to-r from-[#FF758C] to-[#FF7EB3] rounded-full font-semibold text-white transition-all hover:shadow-xl"
        >
          Answer gently →
        </motion.button>
      </div>
    </section>
  )
}
