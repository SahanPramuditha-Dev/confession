'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { analyticsTracker } from '@/lib/analytics'

interface EnvelopeProps {
  onOpen?: () => void
  name?: string
}

export function Envelope({ onOpen, name }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    analyticsTracker.trackEvent('letter_opened', 'envelope')
  }, [])

  const handleOpen = () => {
    setIsLoading(true)
    analyticsTracker.trackEvent('letter_opened', 'envelope', { opened: true })
    
    // Show loading state for 2-3 seconds while "preparing" the letter
    setTimeout(() => {
      setIsLoading(false)
      setIsOpen(true)
    }, 3000)
    
    // Call onOpen after animation completes (8 seconds total)
    setTimeout(() => onOpen?.(), 8000)
  }

  // Particle effect for the wax seal
  const particles = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Ambient glow background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#FF4D6D]/10 to-[#9D4EDD]/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center space-y-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 mx-auto border-2 border-[#FF4D6D]/30 border-t-[#FF4D6D] rounded-full"
              />
              <div>
                <p className="text-2xl font-light text-white mb-2">
                  Preparing a little something for you...
                </p>
                <motion.p
                  animate={{ opacity: [0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-sm text-gray-400"
                >
                  ✨
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {!isOpen && !isLoading ? (
          <motion.div
            className="relative cursor-pointer"
            onClick={handleOpen}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Envelope floating animation */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotateZ: [0, 1, -1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Main envelope body */}
              <motion.div
                className="relative w-80 h-48 rounded-2xl overflow-hidden shadow-2xl"
                animate={{
                  boxShadow: [
                    '0 20px 60px rgba(255, 77, 109, 0.2), 0 0 40px rgba(157, 78, 221, 0.15)',
                    '0 30px 80px rgba(255, 77, 109, 0.3), 0 0 60px rgba(157, 78, 221, 0.25)',
                    '0 20px 60px rgba(255, 77, 109, 0.2), 0 0 40px rgba(157, 78, 221, 0.15)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                {/* Envelope background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100" />

                {/* Envelope body with border */}
                <div className="absolute inset-0 border-2 border-slate-300/40 rounded-2xl" />

                {/* Decorative edge accent */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF4D6D] to-transparent opacity-0"
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                {/* Envelope flap (triangle) */}
                <motion.div
                  className="absolute top-0 left-0 right-0 bottom-1/2 bg-gradient-to-b from-slate-200 to-slate-100 rounded-t-2xl"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  }}
                  animate={{
                    y: [0, 2, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Wax seal - glowing effect */}
                <motion.div
                  className="absolute top-1/3 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[#FF4D6D] to-[#C20E4E] shadow-lg"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255, 77, 109, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.2)',
                      '0 0 40px rgba(255, 77, 109, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.3)',
                      '0 0 20px rgba(255, 77, 109, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.2)',
                    ],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  {/* Seal shine */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />

                  {/* Seal center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="text-2xl"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      ♥
                    </motion.span>
                  </div>
                </motion.div>

                {/* Wax seal particles */}
                {particles.map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#FF4D6D]"
                    style={{
                      left: '50%',
                      top: '33%',
                    }}
                    animate={{
                      x: Math.cos((i / 8) * Math.PI * 2) * 50,
                      y: Math.sin((i / 8) * Math.PI * 2) * 50,
                      opacity: [1, 0],
                      scale: [1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}

                {/* Personalized recipient name on envelope */}
                {name && (
                  <motion.div
                    className="absolute top-12 left-8 right-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-slate-500 font-light text-sm">
                      To: {name}
                    </p>
                  </motion.div>
                )}

                {/* Click prompt */}
                <motion.div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <p className="text-slate-600 font-light text-sm tracking-wide">
                    Click to open
                  </p>
                </motion.div>
              </motion.div>

              {/* Subtle letter icon inside */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          /* Opened envelope - letter content */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Letter sheet opening animation */}
            <motion.div
              initial={{ rotateX: 90 }}
              animate={{ rotateX: 0 }}
              transition={{
                duration: 1.2,
                ease: 'easeOut',
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="relative w-96 bg-gradient-to-br from-amber-50/95 via-white/98 to-amber-50/95 rounded-xl p-10 shadow-2xl border border-amber-100/50 backdrop-blur-sm"
              >
                {/* Aged paper texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_20%_50%,#000,transparent_50%)]" />

                {/* Corner decorations */}
                <motion.div
                  className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-200 opacity-50"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-200 opacity-50"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />

                {/* Letter content */}
                <div className="relative z-10 space-y-4">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="text-amber-900 font-light text-sm leading-relaxed"
                  >
                    {name ? `Dear ${name},` : 'Dear you,'}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="text-amber-950/80 font-light text-lg leading-relaxed"
                  >
                    I know we&apos;ve only met once.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                    className="text-amber-950/70 font-light text-lg leading-relaxed"
                  >
                    Maybe this is unexpected. Maybe it&apos;s too soon.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.1, duration: 0.8 }}
                    className="text-amber-950/70 font-light text-lg leading-relaxed"
                  >
                    But I&apos;d regret never telling you that meeting you left a lasting impression on me.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.4, duration: 0.8 }}
                    className="text-amber-900 font-light text-lg leading-relaxed italic pt-2"
                  >
                    I&apos;d genuinely like the chance to know you better.
                  </motion.p>
                </div>

                {/* Decorative separator */}
                <motion.div
                  className="mt-6 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 2.7, duration: 0.8 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
