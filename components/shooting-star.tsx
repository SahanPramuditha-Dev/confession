'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ShootingStarProps {
  delay?: number
  duration?: number
}

export function ShootingStar({ delay = 0, duration = 3 }: ShootingStarProps) {
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)

  useEffect(() => {
    setStartX(Math.random() * 80)
    setStartY(Math.random() * 40)
  }, [])

  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{
        x: `${startX}%`,
        y: `${startY}%`,
        opacity: 0,
      }}
      animate={{
        x: `${startX + 30}%`,
        y: `${startY + 30}%`,
        opacity: [0, 1, 0],
      }}
      transition={{
        duration,
        delay,
        ease: 'easeInOut',
        times: [0, 0.2, 1],
      }}
    >
      <div className="relative">
        {/* Shooting star tail */}
        <div className="absolute top-0 left-0 w-96 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
        {/* Star head */}
        <div className="absolute top-0 left-96 w-1 h-1 bg-white rounded-full shadow-lg" />
      </div>
    </motion.div>
  )
}

export function ShootingStarField() {
  const [stars, setStars] = useState<Array<{ id: number; delay: number }>>([])

  useEffect(() => {
    setStars(
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        delay: i * 4,
      }))
    )

    const interval = setInterval(() => {
      setStars((prev) =>
        prev.map((star) => ({
          ...star,
          delay: star.delay + 0.5,
        }))
      )
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <ShootingStar key={star.id} delay={star.delay} duration={3} />
      ))}
    </div>
  )
}
