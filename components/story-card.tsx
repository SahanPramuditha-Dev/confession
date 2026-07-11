'use client'

import { motion } from 'framer-motion'
import { glowVariants, fadeInScale } from '@/lib/micro-animations'

interface StoryCardProps {
  title: string
  content: string
  icon?: React.ReactNode
  delay?: number
  onClick?: () => void
}

export function StoryCard({ title, content, icon, delay = 0, onClick }: StoryCardProps) {
  return (
    <motion.div
      variants={fadeInScale}
      initial="initial"
      animate="animate"
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        variants={glowVariants}
        initial="idle"
        whileHover="glow"
        className="p-8 rounded-2xl bg-gradient-to-br from-[rgba(255,77,109,0.1)] to-[rgba(157,78,221,0.1)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,77,109,0.3)] transition-colors"
      >
        {icon && <div className="mb-4 text-3xl">{icon}</div>}
        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#FF4D6D] to-[#9D4EDD] bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-[rgba(255,255,255,0.7)] leading-relaxed text-lg">{content}</p>
      </motion.div>
    </motion.div>
  )
}
