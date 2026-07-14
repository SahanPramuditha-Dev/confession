'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { analyticsTracker } from '@/lib/analytics'
import { useLang } from '@/lib/lang-context'
import { t } from '@/lib/i18n'

interface EnvelopeProps {
  onOpen?: () => void
  name?: string
}


function FloatingPetals() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none text-[#D4849A]/30"
          style={{
            left: `${8 + i * 18}%`,
            top: `${12 + (i % 3) * 28}%`,
            fontSize: `${10 + (i % 3) * 4}px`,
          }}
          animate={{
            y: [-6, 10, -6],
            x: [-4, 4, -4],
            rotate: [-8, 8, -8],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{
            duration: 5 + i * 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        >
          ✿
        </motion.div>
      ))}
    </>
  )
}

export function Envelope({ onOpen, name }: EnvelopeProps) {
  const { lang } = useLang()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpen = () => {
    if (isLoading || isOpen) return

    setIsLoading(true)
    analyticsTracker.trackEvent('letter_opened', 'envelope', { opened: true })

    setTimeout(() => {
      setIsLoading(false)
      setIsOpen(true)
    }, 1800)
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#FFB7B2]/30 to-[#E2D1F9]/30 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-40"
          >
            <div className="absolute inset-0 bg-[#1a0810]/60 backdrop-blur-sm" />
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative z-10 text-center space-y-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 mx-auto border-2 border-[#FFB7B2]/50 border-t-[#FFB7B2] rounded-full"
              />
              <div>
                <p className="text-2xl font-light text-white mb-2">
                  Preparing a little something for you...
                </p>
                <motion.p
                  animate={{ opacity: [0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-sm text-white/60"
                >
                  ✨
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {!isOpen && (
          <motion.div
            className="relative cursor-pointer"
            onClick={handleOpen}
            whileHover={isLoading ? {} : { scale: 1.08 }}
            whileTap={isLoading ? {} : { scale: 0.95 }}
            style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
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
                className="relative w-64 h-40 sm:w-80 sm:h-48 rounded-2xl overflow-hidden shadow-2xl"
                animate={{
                  boxShadow: [
                    '0 20px 60px rgba(255, 183, 178, 0.2), 0 0 40px rgba(226, 209, 249, 0.15)',
                    '0 30px 80px rgba(255, 183, 178, 0.3), 0 0 60px rgba(226, 209, 249, 0.25)',
                    '0 20px 60px rgba(255, 183, 178, 0.2), 0 0 40px rgba(226, 209, 249, 0.15)',
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
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFB7B2] to-transparent opacity-0"
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
                  className="absolute top-1/3 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[#FFB7B2] to-[#ff9e99] shadow-lg"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255, 183, 178, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.2)',
                      '0 0 40px rgba(255, 183, 178, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.3)',
                      '0 0 20px rgba(255, 183, 178, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.2)',
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
                      className="text-2xl text-[#8B2E42] drop-shadow-[0_0_5px_rgba(139,46,66,0.6)]"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      ❤️
                    </motion.span>
                  </div>
                </motion.div>

                {/* Wax seal particles */}
                {particles.map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#FFB7B2]"
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
                    <p className="text-white/60 font-light text-sm">
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
                  <p className="text-white/80 font-light text-sm tracking-wide">
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
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
          >
            {/* Soft backdrop — hides page particles and reduces eye strain */}
            <div className="absolute inset-0 bg-[#1a0810]/75 backdrop-blur-md" />

            {/* Warm ambient glow */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,183,178,0.12) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.92 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, type: 'spring', bounce: 0.25 }}
              className="relative w-full max-w-[92vw] sm:w-[400px]"
            >
              {/* Gentle floating motion */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="relative overflow-hidden rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.25),0_0_30px_rgba(255,183,178,0.15)]">
                  {/* Parchment base */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FBF5EB] via-[#F8F0E3] to-[#F3E6D4]" />

                  {/* Paper texture */}
                  <div className="absolute inset-0 opacity-[0.06] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjOEI2RjQ3Ii8+Cjwvc3ZnPg==')]" />

                  {/* Soft inner vignette */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(139,90,60,0.04)_100%)]" />

                  {/* Rose-tinted edge glow */}
                  <div className="absolute inset-0 border border-[#E8D5C0]/80 rounded-lg" />
                  <div className="absolute inset-[3px] border border-[#D4A574]/20 rounded-md pointer-events-none" />

                  <FloatingPetals />

                  <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-12 md:px-12 md:py-14">
                    {/* Wax seal accent */}
                    <motion.div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#E8A0A8] to-[#D4849A] shadow-md flex items-center justify-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.4, type: 'spring', bounce: 0.5 }}
                    >
                      <motion.span
                        className="text-sm"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        ♥
                      </motion.span>
                    </motion.div>

                    {/* Corner flourishes */}
                    <motion.div
                      className="absolute top-4 left-4 text-[#D4A574]/50 text-lg"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      ❧
                    </motion.div>
                    <motion.div
                      className="absolute bottom-4 right-4 text-[#D4A574]/50 text-lg rotate-180"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    >
                      ❧
                    </motion.div>

                    <div className="space-y-5">
                      <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.9 }}
                        className="text-[#4A3728] font-serif text-xl sm:text-2xl font-medium tracking-wide"
                      >
                        {name ? `Dear ${name},` : 'Dear you,'}
                      </motion.p>

                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: '48px', opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="h-px bg-gradient-to-r from-[#D4849A]/70 to-transparent"
                      />

                      {[t(lang, 'letter_line1'), t(lang, 'letter_line2'), t(lang, 'letter_line3'), t(lang, 'letter_line4')].map((line, i, arr) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.1 + i * 0.45, duration: 0.9, ease: 'easeOut' }}
                          className={
                            i === arr.length - 1
                              ? 'text-[#7A3E4A] font-serif text-xl leading-relaxed italic pt-2 font-medium'
                              : 'text-[#5C4636] font-serif text-[17px] leading-[1.85]'
                          }
                        >
                          {line}
                        </motion.p>
                      ))}
                    </div>

                    <motion.div
                      className="mt-8 h-px bg-gradient-to-r from-transparent via-[#D4A574]/40 to-transparent"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: 3.2, duration: 0.8 }}
                    />

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.5, duration: 0.8 }}
                      className="mt-5 text-center text-[#9A7B6A] font-serif text-sm italic"
                    >
                      {t(lang, 'letter_closing')}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.8, duration: 0.8 }}
            onClick={() => onOpen?.()}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 mb-[env(safe-area-inset-bottom)] px-8 py-3 bg-gradient-to-r from-[#FF758C] to-[#FF7EB3] rounded-full font-semibold text-white hover:shadow-xl transition-all z-[60]"
          >
            {t(lang, 'name_continue')}
          </motion.button>
        )}
      </div>
    </div>
  )
}
