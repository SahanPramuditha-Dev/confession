'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FIRST_MEETING_DATE } from '@/lib/constants'

interface LoveLetterProps {
  name: string
  isCorrectDate: boolean
}

export function LoveLetter({ name, isCorrectDate }: LoveLetterProps) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const daysAgo = Math.floor((new Date().getTime() - FIRST_MEETING_DATE.getTime()) / (1000 * 60 * 60 * 24))

  // Floating hearts decoration
  const FloatingHearts = () => (
    <>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[#E63946]/20 pointer-events-none select-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            fontSize: `${12 + (i % 3) * 6}px`,
          }}
          animate={{
            y: [-8, 8, -8],
            rotate: [-5, 5, -5],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        >
          ♥
        </motion.div>
      ))}
    </>
  )

  if (isCorrectDate) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="fixed inset-0 flex items-center justify-center z-50 px-4"
      >
        {/* Soft dark overlay to reduce eye strain */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        <motion.div
          className="relative w-full max-w-[90vw] sm:w-[420px] rounded-2xl overflow-hidden"
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, type: 'spring', bounce: 0.3 }}
        >
          {/* Card background - soft warm dark with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a10] via-[#2a1018] to-[#1a0810]" />
          <div className="absolute inset-0 border border-white/10 rounded-2xl" />

          {/* Soft pink ambient glow at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#E63946]/10 blur-3xl pointer-events-none" />

          <FloatingHearts />

          <div className="relative z-10 p-6 sm:p-10 md:p-12">
            {/* Decorative corner heart */}
            <motion.div
              className="absolute top-5 right-6 text-3xl"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-[#E63946] drop-shadow-[0_0_12px_rgba(230,57,70,0.5)]">❤️</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 1 }}
              className="font-serif text-3xl md:text-4xl font-light text-white/90 mb-1"
            >
              You Remembered It
            </motion.h2>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={showContent ? { width: '50px', opacity: 1 } : {}}
              transition={{ delay: 1, duration: 1 }}
              className="h-[1px] bg-gradient-to-r from-[#E63946]/60 to-transparent mb-8 mt-3"
            />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4, duration: 1 }}
              className="text-white/75 font-serif text-[17px] leading-[1.8] mb-5"
            >
              <span className="font-medium text-white/90">{name}</span>, the fact that you remembered tells me everything I need to know.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.8, duration: 1 }}
              className="text-white/70 font-serif text-[17px] leading-[1.8] mb-8"
            >
              {daysAgo} days have passed since that moment, but it still feels like yesterday. Some meetings change everything, and ours was one of them.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={showContent ? { opacity: 1 } : {}}
              transition={{ delay: 2.2, duration: 1 }}
              className="text-center pt-6 border-t border-white/10 mt-2"
            >
              <p className="text-[#FF8A9B] font-serif text-[16px] italic leading-relaxed">A little date carrying a beautiful memory.</p>
              <p className="text-[#FF8A9B] font-serif text-[16px] italic mt-2 mb-5 leading-relaxed">Some moments are quietly special, and some people make them unforgettable.</p>
              <p className="text-lg font-serif font-light text-white/85">Thank you for remembering this one <span className="text-[#E63946] drop-shadow-[0_0_6px_rgba(230,57,70,0.4)]">❤️</span></p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 flex items-center justify-center z-50 px-4"
    >
      {/* Soft dark overlay to reduce eye strain */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <motion.div
        className="relative w-full max-w-[90vw] sm:w-[420px] rounded-2xl overflow-hidden"
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1, type: 'spring', bounce: 0.3 }}
      >
        {/* Card background - soft warm dark */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a10] via-[#2a1018] to-[#1a0810]" />
        <div className="absolute inset-0 border border-white/10 rounded-2xl" />

        {/* Soft pink ambient glow at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#E63946]/10 blur-3xl pointer-events-none" />

        <FloatingHearts />

        <div className="relative z-10 p-6 sm:p-10 md:p-12">
          {/* Decorative corner heart */}
          <motion.div
            className="absolute top-5 right-6 text-3xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-[#E63946] drop-shadow-[0_0_12px_rgba(230,57,70,0.5)]">❤️</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 1 }}
            className="font-serif text-3xl md:text-4xl font-light text-white/90 mb-1"
          >
            That's Okay <span className="text-[#E63946] drop-shadow-[0_0_8px_rgba(230,57,70,0.4)] inline-block">❤️</span>
          </motion.h2>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={showContent ? { width: '50px', opacity: 1 } : {}}
            transition={{ delay: 1, duration: 1 }}
            className="h-[1px] bg-gradient-to-r from-[#E63946]/60 to-transparent mb-8 mt-3"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 1 }}
            className="text-white/75 font-serif text-[17px] leading-[1.8] mb-5"
          >
            <span className="font-medium text-white/90">{name}</span>, maybe the numbers were a little different, but the meaning behind this moment is what truly matters.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.8, duration: 1 }}
            className="text-white/70 font-serif text-[17px] leading-[1.8] mb-8"
          >
            Some memories are not kept in calendars... they are kept in our hearts ✨
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ delay: 2.2, duration: 1 }}
            className="text-center pt-6 border-t border-white/10 mt-2"
          >
            <p className="text-[#FF8A9B] font-serif text-[16px] italic leading-relaxed">Let's continue this little journey together.</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
