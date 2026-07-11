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

  if (isCorrectDate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 flex items-center justify-center z-50 px-4"
      >
        <motion.div
          className="bg-gradient-to-br from-[#FFE5E5] to-[#FFF5F7] rounded-2xl shadow-2xl max-w-2xl p-8 md:p-12 relative overflow-hidden"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Decorative elements */}
          <motion.div
            className="absolute top-4 right-4 text-4xl"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ✨
          </motion.div>

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-3xl md:text-4xl font-light text-[#6A1B9A] mb-2"
            >
              You Remembered It ✨
            </motion.h2>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={showContent ? { width: '60px', opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-[#FF4D6D] to-[#9D4EDD] mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-lg text-[#4A0E4E] leading-relaxed mb-4"
            >
              <span className="font-semibold">{name}</span>, the fact that you remembered tells me everything I need to know.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="text-lg text-[#4A0E4E] leading-relaxed mb-6"
            >
              {daysAgo} days have passed since that moment, but it still feels like yesterday. Some meetings change everything, and ours was one of them.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={showContent ? { opacity: 1 } : {}}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="text-center pt-4"
            >
              <p className="text-[#6A1B9A] italic">A little date carrying a beautiful memory.</p>
              <p className="text-[#6A1B9A] italic mt-2">Some moments are quietly special, and some people make them unforgettable.</p>
              <p className="text-2xl mt-4">Thank you for remembering this one 🤍</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 flex items-center justify-center z-50 px-4"
    >
      <motion.div
        className="bg-gradient-to-br from-[#FFF5E5] to-[#FFE5CC] rounded-2xl shadow-2xl max-w-2xl p-8 md:p-12 relative overflow-hidden"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {/* Decorative elements */}
        <motion.div
          className="absolute top-4 right-4 text-4xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🤍
        </motion.div>

        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl md:text-4xl font-light text-[#8B4513] mb-2"
          >
            That's Okay 🤍
          </motion.h2>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={showContent ? { width: '60px', opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-[#FFD166] to-[#FF4D6D] mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-lg text-[#6B4423] leading-relaxed mb-4"
          >
            <span className="font-semibold">{name}</span>, maybe the numbers were a little different, but the meaning behind this moment is what truly matters.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="text-lg text-[#6B4423] leading-relaxed mb-6"
          >
            Some memories are not kept in calendars... they are kept in our hearts ✨
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="text-center pt-4"
          >
            <p className="text-[#8B4513]">Let's continue this little journey together.</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
