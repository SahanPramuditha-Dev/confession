'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ParticleBurstProps {
  trigger?: boolean
  position?: { x: number; y: number }
  color?: string
}

export function ParticleBurst({
  trigger = false,
  position = { x: 50, y: 50 },
  color = '#FF4D6D',
}: ParticleBurstProps) {
  const [particles, setParticles] = useState<
    Array<{ id: number; angle: number; distance: number }>
  >([])

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        angle: (i * 360) / 12,
        distance: 100 + Math.random() * 100,
      }))
      setParticles(newParticles)

      // Reset after animation
      const timer = setTimeout(() => setParticles([]), 2000)
      return () => clearTimeout(timer)
    }
  }, [trigger])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => {
        const radians = (particle.angle * Math.PI) / 180
        const x = Math.cos(radians) * particle.distance
        const y = Math.sin(radians) * particle.distance

        return (
          <motion.div
            key={particle.id}
            initial={{
              x: `${position.x}%`,
              y: `${position.y}%`,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: `calc(${position.x}% + ${x}px)`,
              y: `calc(${position.y}% + ${y}px)`,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 1.5,
              ease: 'easeOut',
            }}
            className="absolute w-1 h-1 rounded-full"
            style={{ backgroundColor: color }}
          />
        )
      })}
    </div>
  )
}
