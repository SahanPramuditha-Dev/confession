'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Confetti from 'react-confetti'
import { RealisticStarfield } from '@/components/realistic-starfield'
import { Typewriter } from '@/components/typewriter'
import { FloatingStars, FloatingHeart } from '@/components/floating-elements'
import { GlassCard } from '@/components/glass-card'
import { TimelineCards } from '@/components/timeline-cards'
import { Envelope } from '@/components/envelope'
import { MemoryScene } from '@/components/memory-scene'
import { ShootingStarField } from '@/components/shooting-star'
import { ParticleBurst } from '@/components/particle-burst'
import { DateEntryPin } from '@/components/date-entry-pin'
import { AnimatedLetter } from '@/components/animated-letter'
import { EndingSequence } from '@/components/ending-sequence'
import { storyController, sectionConfigs } from '@/lib/story-controller'
import { analyticsTracker } from '@/lib/analytics'

type Section =
  | 'loading'
  | 'hero'
  | 'name'
  | 'dateEntry'
  | 'letter'
  | 'chapter1'
  | 'chapter2'
  | 'chapter3'
  | 'envelope'
  | 'reveal'
  | 'memory'
  | 'response'

export default function Page() {
  const [section, setSection] = useState<Section>('loading')
  const [name, setName] = useState('')
  const [inputName, setInputName] = useState('')
  const [response, setResponse] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [particleBurst, setParticleBurst] = useState(false)
  const [showEnding, setShowEnding] = useState(false)
  const [isAutoAdvancePaused, setIsAutoAdvancePaused] = useState(false)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout>()
  
  // Initialize session on mount
  useEffect(() => {
    // Create initial session
    const initSession = async () => {
      try {
        const sessionId = analyticsTracker.getSessionId()
        await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            deviceInfo: {
              userAgent: navigator.userAgent,
              language: navigator.language,
              timestamp: new Date().toISOString(),
            },
          }),
        })
      } catch (error) {
        console.error('[v0] Failed to initialize session:', error)
      }
    }
    initSession()
  }, [])

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    // Track story started
    if (section === 'loading') {
      analyticsTracker.trackEvent('story_started')
    }
    
    // Track section entry
    analyticsTracker.trackSectionEnter(section)
  }, [section])

  useEffect(() => {
    // Auto-progress through sections ONLY if section allows it
    let timer: NodeJS.Timeout

    // Check if current section should auto-advance
    if (!storyController.shouldAutoAdvance(section)) {
      // Don't auto-advance - wait for user interaction
      return
    }

    const duration = sectionConfigs[section]?.duration || 0

    if (duration > 0) {
      const nextSection: Record<string, Section> = {
        loading: 'hero',
        hero: 'name',
        letter: 'chapter1',
        chapter1: 'chapter2',
        chapter2: 'chapter3',
        chapter3: 'envelope',
        reveal: 'memory',
      }

      const next = nextSection[section]
      if (next) {
        timer = setTimeout(() => setSection(next), duration)
      }
    }

    if (timer) typingTimeoutRef.current = timer
    return () => clearTimeout(timer)
  }, [section])

  const handleContinue = (newSection: Section, withDelay: boolean = true) => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current)
    
    // Smooth scroll to top with cinematic timing
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
        duration: 4500, // 4.5 second smooth scroll
      })
    }
    
    scrollToTop()
    
    // If delay is requested, pause auto-advance for 20 seconds after user completes interaction
    if (withDelay) {
      setIsAutoAdvancePaused(true)
      const pauseTimer = setTimeout(() => {
        setIsAutoAdvancePaused(false)
        setSection(newSection)
      }, 20000) // 20 second pause for emotional reading
      autoAdvanceTimerRef.current = pauseTimer
    } else {
      setSection(newSection)
    }
  }

  // Smooth scroll handler for manual scrolling (cancels auto-advance)
  const handleScroll = () => {
    if (isAutoAdvancePaused) {
      // User is manually scrolling during pause - they're reading
      // This is fine, let them continue
    }
  }

  const handleNameSubmit = () => {
    if (inputName.trim()) {
      setName(inputName.trim())
      analyticsTracker.trackEvent('name_entered', 'name', { name: inputName.trim() })
      setSection('dateEntry')
    }
  }

  const handleReplay = () => {
    setSection('loading')
    setName('')
    setInputName('')
    setResponse(null)
    setShowEnding(false)
  }

  const handleResponse = (choice: string) => {
    if (choice === 'yes') {
      setShowConfetti(true)
      setParticleBurst(true)
      setTimeout(() => setShowConfetti(false), 3000)
      setTimeout(() => setParticleBurst(false), 2000)
      setTimeout(() => setShowEnding(true), 1500)
    } else {
      setTimeout(() => setShowEnding(true), 1000)
    }
    setResponse(choice)
    analyticsTracker.trackEvent('story_completed', 'response', { response: choice })
    analyticsTracker.trackSectionExit('response')
    
    // Mark story as completed in database
    const sessionId = analyticsTracker.getSessionId()
    fetch('/api/complete-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, response: choice, name }),
    }).catch(err => console.error('[v0] Error marking story complete:', err))
  }

  return (
    <main className="relative min-h-screen bg-[#070B18] text-white overflow-hidden">
      <RealisticStarfield />
      <ShootingStarField />
      <ParticleBurst trigger={particleBurst} position={{ x: 50, y: 50 }} color="#FF4D6D" />

      {/* Loading Screen */}
      {section === 'loading' && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="fixed inset-0 flex flex-col items-center justify-center z-40"
        >
          <div className="text-center space-y-12">
            <motion.h1 
              className="text-5xl md:text-7xl font-light max-w-3xl text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
            >
              <Typewriter text="Some stories begin with years." speed={40} />
            </motion.h1>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.p 
                className="text-xl md:text-2xl text-white/60 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.8, delay: 1.2, ease: 'easeOut' }}
              >
                Some begin with a single moment.
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '80px', opacity: 1 }}
              transition={{ duration: 2.8, delay: 3.5, ease: 'easeOut' }}
              className="mx-auto h-1 bg-gradient-to-r from-[#FF4D6D] via-[#9D4EDD] to-[#FFD166]"
            />
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      {section === 'hero' && (
        <motion.section
          key="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="relative min-h-screen flex flex-col items-center justify-center px-4"
        >
          <motion.div
            initial={{ y: 60, opacity: 0, filter: 'blur(10px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center space-y-12 max-w-3xl"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-light bg-gradient-to-r from-[#FF4D6D] via-[#9D4EDD] to-[#FFD166] bg-clip-text text-transparent"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              One Encounter
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-white/80 font-light leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              Sometimes one meeting is enough to make someone unforgettable.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(255, 77, 109, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleContinue('name')}
              className="mt-12 px-8 py-4 bg-gradient-to-r from-[#FF4D6D] to-[#9D4EDD] rounded-full font-semibold text-white"
            >
              Begin →
            </motion.button>
          </motion.div>
        </motion.section>
      )}

      {/* Name Verification */}
      {section === 'name' && (
        <motion.section
          key="name"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="relative min-h-screen flex flex-col items-center justify-center px-4"
        >
          <GlassCard className="w-full max-w-md">
            <h2 className="text-3xl font-light mb-6 text-center">
              This story is written for one person.
            </h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleNameSubmit()
              }}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#FF4D6D] transition-all"
            />
            <button
              onClick={handleNameSubmit}
              className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-[#FF4D6D] to-[#9D4EDD] rounded-lg font-semibold hover:shadow-xl transition-all text-white"
            >
              Continue
            </button>
          </GlassCard>
        </motion.section>
      )}

      {/* Date Entry PIN */}
      {section === 'dateEntry' && name && (
        <DateEntryPin name={name} onSubmit={() => setSection('letter')} />
      )}

      {/* Animated Letter */}
      {section === 'letter' && name && (
        <AnimatedLetter name={name} onComplete={() => setSection('chapter1')} />
      )}

      {/* Chapter 1 */}
      {section === 'chapter1' && (
        <motion.section
          key="chapter1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
        >
          <div className="max-w-2xl space-y-16 text-center">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1.2, ease: 'easeOut' }}
              className="text-2xl md:text-3xl font-light text-white/60"
            >
              {name}...
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.6, ease: 'easeOut' }}
              className="text-5xl md:text-6xl font-light text-white/90 leading-tight"
            >
              We&apos;ve only crossed paths once.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 1.6, ease: 'easeOut' }}
              className="text-3xl md:text-4xl font-light text-white/70"
            >
              I don&apos;t know much about you.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.4, duration: 1.6, ease: 'easeOut' }}
              className="text-3xl md:text-4xl font-light text-white/60"
            >
              You probably don&apos;t know me either.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 6.2, duration: 1 }}
              whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleContinue('chapter2')}
              className="mt-12 px-8 py-4 bg-white/10 border border-white/20 rounded-full font-semibold text-white transition-all"
            >
              Next →
            </motion.button>
          </div>
        </motion.section>
      )}

      {/* Chapter 2 - Timeline */}
      {section === 'chapter2' && (
        <motion.section
          key="chapter2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
        >
          <TimelineCards />
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleContinue('chapter3')}
            className="mt-12 px-8 py-4 bg-white/10 border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-all text-white"
          >
            Continue →
          </motion.button>
        </motion.section>
      )}

      {/* Chapter 3 - Final Thoughts */}
      {section === 'chapter3' && (
        <motion.section
          key="chapter3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
        >
          <div className="max-w-2xl space-y-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.6, ease: 'easeOut' }}
              className="text-5xl md:text-6xl font-light text-white/90 leading-tight"
            >
              But I needed to tell you, {name}.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1.6, ease: 'easeOut' }}
              className="text-2xl md:text-3xl font-light text-white/70"
            >
              What I feel is real. What I see in you is real. And I couldn't keep it to myself any longer.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.6, duration: 1.2, ease: 'easeOut' }}
              className="text-lg md:text-xl font-light text-white/50 italic"
            >
              This moment matters. You matter.
            </motion.p>
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 4.8, duration: 1 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleContinue('envelope')}
            className="mt-12 px-8 py-4 bg-white/10 border border-white/20 rounded-full font-semibold text-white"
          >
            Next →
          </motion.button>
        </motion.section>
      )}

  {/* Envelope */}
  {section === 'envelope' && name && (
    <motion.section
      key="envelope"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <Envelope name={name} onOpen={() => handleContinue('reveal')} />
    </motion.section>
  )}

      {/* Final Reveal */}
      {section === 'reveal' && (
        <motion.section
          key="reveal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="relative min-h-screen flex flex-col items-center justify-center px-4 space-y-16"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 15, delay: 0.3, duration: 1.2 }}
          >
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotateZ: [0, 3, -3, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FloatingHeart />
            </motion.div>
          </motion.div>

          <div className="text-center space-y-8 max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 1.2, duration: 1.4, ease: 'easeOut' }}
              className="text-4xl md:text-5xl font-light text-white/90"
            >
              The person this website was made for...
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 2.4, duration: 1.4, ease: 'easeOut' }}
              className="text-3xl md:text-4xl font-light text-white/70 bg-gradient-to-r from-[#FF4D6D] to-[#9D4EDD] bg-clip-text text-transparent"
            >
              {name && name.length > 0 ? `${name}, it's you.` : '...is someone who made a lasting first impression.'}
            </motion.p>
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 3.6, duration: 1, ease: 'easeOut' }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(255, 77, 109, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleContinue('memory')}
            className="px-8 py-4 bg-gradient-to-r from-[#FF4D6D] to-[#9D4EDD] rounded-full font-semibold text-white transition-all"
          >
            Continue →
          </motion.button>
        </motion.section>
      )}

      {/* Memory Scene */}
      {section === 'memory' && (
        <motion.section
          key="memory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative w-full"
        >
          <MemoryScene name={name} />
        </motion.section>
      )}

      {/* Response Section */}
      {section === 'response' && (
        <motion.section
          key="response"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="relative min-h-screen flex flex-col items-center justify-center px-4 space-y-12"
        >
          {showConfetti && <Confetti />}

          {response ? (
            <div className="text-center max-w-2xl space-y-6">
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 70, damping: 14, delay: 0.3, duration: 1 }}
                className="text-6xl"
              >
                {response === 'yes' && '💙'}
                {response === 'thanks' && '🤍'}
                {response === 'time' && '🌼'}
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
                className="text-2xl md:text-3xl font-light text-white/80"
              >
                {response === 'yes' && 'Thank you. That truly made my day.'}
                {response === 'thanks' && 'I appreciate you taking the time to read this.'}
                {response === 'time' && 'Take all the time you need. Thank you for reading.'}
              </motion.p>

              {response === 'yes' && (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  href="https://wa.me/?text=Hi!%20I%20read%20your%20website%20😊"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analyticsTracker.trackEvent('whatsapp_clicked', 'response')}
                  className="inline-block mt-8 px-8 py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full font-semibold hover:shadow-xl transition-all text-white"
                >
                  Message on WhatsApp
                </motion.a>
              )}
            </div>
          ) : (
            <motion.div 
              className="text-center space-y-8 max-w-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.4, ease: 'easeOut' }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-white/90">
                Only if you&apos;re comfortable...
              </h2>

              <div className="space-y-4">
                <motion.button
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
                  whileHover={{ scale: 1.05, x: 10, backgroundColor: 'rgba(255, 77, 109, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleResponse('yes')}
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-lg font-semibold transition-all text-white"
                >
                  <span>💙</span> I&apos;d like to get to know you
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3, duration: 0.8, ease: 'easeOut' }}
                  whileHover={{ scale: 1.05, x: 10, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleResponse('thanks')}
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-lg font-semibold transition-all text-white"
                >
                  <span>🤍</span> Thank you for telling me
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6, duration: 0.8, ease: 'easeOut' }}
                  whileHover={{ scale: 1.05, x: 10, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleResponse('time')}
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-lg font-semibold transition-all text-white"
                >
                  <span>🌼</span> I need some time
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.section>
      )}

      {/* Ending Sequence */}
      {showEnding && <EndingSequence name={name} onComplete={handleReplay} />}
    </main>
  )
}
