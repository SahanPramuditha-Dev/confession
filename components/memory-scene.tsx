'use client'

import { FIRST_MEETING_DATE } from '@/lib/constants'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { GlassCard } from './glass-card'
import { analyticsTracker } from '@/lib/analytics'

interface MemorySceneProps {
  name?: string
}

export function MemoryScene({ name = 'You' }: MemorySceneProps) {
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    analyticsTracker.trackEvent('response_screen_viewed', 'memory')
  }, [])

  const daysAgo = Math.floor(
    (new Date().getTime() - FIRST_MEETING_DATE.getTime()) / (1000 * 60 * 60 * 24)
  )

  const handleResponse = (response: string) => {
    setSelectedResponse(response)
    setShowMessage(true)
    analyticsTracker.trackEvent('response_selected', 'memory', { response })
  }

  const responseMessages = {
    yes: `${name}, I was hoping you'd say yes. Getting to know you better would be a dream come true.`,
    maybe: `${name}, I understand. There's no rush. But I want you to know that the possibility of us matters to me.`,
    no: `${name}, I respect that. Thank you for being honest. You'll always be a beautiful memory for me.`,
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#070B18] via-[#1a0f2e] to-[#070B18] relative overflow-hidden flex items-center justify-center px-4">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            A Memory Worth Keeping
          </h2>
          <p className="text-gray-400 text-lg">
            {daysAgo} days have passed since that moment.
          </p>
        </motion.div>

        <GlassCard className="p-8 mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gray-300 text-center leading-relaxed mb-8">
              Every day, I&apos;ve thought about that encounter. About you. About how
              a single moment can shift everything. I&apos;ve tried to find the right
              words, but nothing feels adequate except this:
            </p>

            <p className="text-xl text-center font-light mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              &quot;Would you like to explore this connection with me?&quot;
            </p>
          </motion.div>
        </GlassCard>

        {!showMessage ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <button
              onClick={() => handleResponse('yes')}
              className="relative group overflow-hidden rounded-lg p-6 bg-gradient-to-r from-pink-500/20 to-pink-600/20 border border-pink-500/30 hover:border-pink-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/0 to-pink-500/0 group-hover:from-pink-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
              <span className="relative text-lg font-semibold text-pink-300 group-hover:text-pink-200 transition-colors">
                Yes
              </span>
            </button>

            <button
              onClick={() => handleResponse('maybe')}
              className="relative group overflow-hidden rounded-lg p-6 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
              <span className="relative text-lg font-semibold text-purple-300 group-hover:text-purple-200 transition-colors">
                Maybe
              </span>
            </button>

            <button
              onClick={() => handleResponse('no')}
              className="relative group overflow-hidden rounded-lg p-6 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/10 transition-all duration-300" />
              <span className="relative text-lg font-semibold text-blue-300 group-hover:text-blue-200 transition-colors">
                Not Now
              </span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <GlassCard className="p-8 mb-6 border-pink-500/30">
              <p className="text-lg text-gray-300">
                {responseMessages[selectedResponse as keyof typeof responseMessages]}
              </p>
            </GlassCard>

            {selectedResponse === 'yes' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-gray-400 mb-4">Let&apos;s start this journey.</p>
                <a
                  href={`https://wa.me/447942622620?text=Hi%20there%21%20I%20saw%20your%20message.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300"
                >
                  Message on WhatsApp
                </a>
              </motion.div>
            )}

            {selectedResponse === 'maybe' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-gray-400">
                  No pressure. I&apos;ll be here whenever you&apos;re ready.
                </p>
              </motion.div>
            )}

            {selectedResponse === 'no' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-gray-400">
                  Thank you for your honesty. Wishing you all the best.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
