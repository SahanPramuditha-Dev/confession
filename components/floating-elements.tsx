'use client'

import { motion } from 'framer-motion'

export function FloatingHeart() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      className="text-5xl"
    >
      ❤️
    </motion.div>
  )
}

export function FloatingParticle({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 0],
        y: [-20, -100],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
      }}
      className="absolute w-1 h-1 bg-white rounded-full"
    />
  )
}

export function FloatingStars() {
  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    opacity: Math.random() * 0.5 + 0.3,
    duration: 20 + Math.random() * 10,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{
            x: `${star.initialX}%`,
            y: `${star.initialY}%`,
            opacity: star.opacity,
          }}
          animate={{
            y: [
              `${star.initialY}%`,
              `${Math.random() * 100}%`,
            ],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
          }}
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
        />
      ))}
    </div>
  )
}
