'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function GlassCard({ children, delay = 0, className = '' }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeOut',
      }}
      whileHover={{
        y: -5,
        boxShadow: '0 0 30px rgba(255, 77, 109, 0.3), 0 0 60px rgba(157, 78, 221, 0.2)',
      }}
      className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}
