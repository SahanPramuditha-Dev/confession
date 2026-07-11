'use client'

import { CONSTELLATION_MEANINGS } from '@/lib/constants'
import { motion } from 'framer-motion'
import { useState } from 'react'

const stars = [
  { label: 'The first moment I saw you', id: 'star-0' },
  { label: 'Your smile that changed everything', id: 'star-1' },
  { label: 'The courage to say hello', id: 'star-2' },
  { label: 'Laughter that felt like home', id: 'star-3' },
  { label: 'I wanted you to know this', id: 'main', isMain: true },
]

export function Constellation() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set())

  const toggleReveal = (id: string) => {
    const newRevealed = new Set(revealed)
    if (newRevealed.has(id)) {
      newRevealed.delete(id)
    } else {
      newRevealed.add(id)
    }
    setRevealed(newRevealed)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl md:text-5xl font-light mb-20 text-center max-w-2xl">
        Click each star to reveal what moved me
      </h2>

      <div className="relative w-full max-w-2xl aspect-square">
        {stars.map((star, index) => {
          const angle = (index * 360) / stars.length
          const radius = star.isMain ? 0 : 45 // percentage instead of pixels
          const x = Math.cos((angle * Math.PI) / 180) * radius
          const y = Math.sin((angle * Math.PI) / 180) * radius

          return (
            <motion.div
              key={star.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
              }}
              className="flex items-center justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleReveal(star.id)}
              style={{
                transform: `translate(calc(-50% + ${x}%), calc(-50% + ${y}%))`,
              }}
                className={`relative w-20 h-20 rounded-full font-semibold transition-all ${
                  star.isMain
                    ? 'bg-gradient-to-r from-[#FF4D6D] to-[#9D4EDD] text-white shadow-2xl'
                    : revealed.has(star.id)
                      ? 'bg-gradient-to-r from-[#FFD166] to-[#FF4D6D] text-[#070B18]'
                      : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                }`}
              >
                <motion.div
                  animate={
                    revealed.has(star.id) || star.isMain
                      ? {
                          boxShadow: [
                            '0 0 20px rgba(255, 77, 109, 0.5)',
                            '0 0 40px rgba(157, 78, 221, 0.5)',
                            '0 0 20px rgba(255, 77, 109, 0.5)',
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                />
                <span className="text-2xl">✨</span>
              </motion.button>

              {(revealed.has(star.id) || star.isMain) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-24 w-32 text-center text-sm text-white bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-2"
                >
                  {star.label}
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
