'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import Confetti from 'react-confetti'
import { SoftParticles } from '@/components/soft-particles'
import { Typewriter } from '@/components/typewriter'
import { FloatingHeart } from '@/components/floating-elements'
import { GlassCard } from '@/components/glass-card'
import { TimelineCards } from '@/components/timeline-cards'
import { Envelope } from '@/components/envelope'
import { MemoryScene } from '@/components/memory-scene'
import { ParticleBurst } from '@/components/particle-burst'
import { DateEntryPin } from '@/components/date-entry-pin'
import { AnimatedLetter } from '@/components/animated-letter'
import { EndingSequence } from '@/components/ending-sequence'
import { MusicToggle } from '@/components/music-toggle'
import { LangToggle } from '@/components/lang-toggle'
import { storyController, sectionConfigs } from '@/lib/story-controller'
import { analyticsTracker } from '@/lib/analytics'
import { useLang } from '@/lib/lang-context'
import { t } from '@/lib/i18n'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  TRANSITION_MS,
} from '@/lib/constants'

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

const SKIP_INTRO_KEY = 'story_seen'

function getInitialSection(): Section {
  if (typeof window === 'undefined') return 'loading'
  return localStorage.getItem(SKIP_INTRO_KEY) === 'true' ? 'hero' : 'loading'
}

export default function Page() {
  const { lang } = useLang()
  const [section, setSection] = useState<Section>('loading')
  const [name, setName] = useState('')
  const [inputName, setInputName] = useState('')
  const [response, setResponse] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [particleBurst, setParticleBurst] = useState(false)
  const [showEnding, setShowEnding] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout>()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setSection(getInitialSection())
    setHydrated(true)
  }, [])

  useEffect(() => {
    const update = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
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
        console.error('[Story] Failed to initialize session:', error)
      }
    }
    initSession()
  }, [])

  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (section === 'loading') {
      analyticsTracker.trackEvent('story_started')
    }
    analyticsTracker.trackSectionEnter(section)
    if (section === 'hero') {
      localStorage.setItem(SKIP_INTRO_KEY, 'true')
    }
  }, [section, hydrated])

  useEffect(() => {
    if (!storyController.shouldAutoAdvance(section)) return

    const duration = sectionConfigs[section]?.duration || 0
    if (duration <= 0) return

    const nextSection: Partial<Record<Section, Section>> = {
      loading: 'hero',
    }

    const next = nextSection[section]
    if (!next) return

    const timer = setTimeout(() => setSection(next), duration)
    autoAdvanceTimerRef.current = timer
    return () => clearTimeout(timer)
  }, [section])

  const handleContinue = useCallback((newSection: Section) => {
    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setSection(newSection), TRANSITION_MS)
  }, [])

  const handleNameSubmit = async () => {
    const trimmed = inputName.trim()
    if (!trimmed) return

    setName(trimmed)
    analyticsTracker.setUserName(trimmed)
    analyticsTracker.trackEvent('name_entered', 'name', { name: trimmed })

    try {
      await fetch('/api/session', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: analyticsTracker.getSessionId(),
          userName: trimmed,
        }),
      })
    } catch (error) {
      console.error('[Story] Failed to save name:', error)
    }

    setSection('dateEntry')
  }

  const handleReplay = () => {
    setShowEnding(false)
    setResponse(null)
    setShowConfetti(false)
    setParticleBurst(false)
    setName('')
    setInputName('')
    setSection('hero')
  }

  const handleResponse = (choice: string) => {
    setResponse(choice)
    analyticsTracker.trackEvent('story_completed', 'response', { response: choice })
    analyticsTracker.recordUserResponse('final', choice)

    if (choice === 'yes') {
      setShowConfetti(true)
      setParticleBurst(true)
      setTimeout(() => setShowConfetti(false), 4000)
      setTimeout(() => setParticleBurst(false), 2500)
      // Don't auto-show ending for 'yes' - let them click WhatsApp first
    } else {
      setTimeout(() => setShowEnding(true), 2500)
    }

    const sessionId = analyticsTracker.getSessionId()

    // Gather inputs for response_entries
    const enteredDate = sessionStorage.getItem('enteredDate')
    const nameInput = name

    // whatsappClicked is true only if user clicks WhatsApp later; default false here
    fetch('/api/record-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        question: 'Would you like to explore this connection?',
        answer: choice,
        nameInput,
        enteredDate,
        selection: choice,
        whatsappClicked: false,
      }),
    }).catch((err) => console.error('[Story] Error recording response:', err))


    fetch('/api/complete-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, response: choice, name }),
    }).catch((err) => console.error('[Story] Error marking story complete:', err))
  }

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

  if (!hydrated) {
    return <main className="min-h-screen bg-gradient-to-br from-[#2a0414] via-[#4a0e26] to-[#1a0009]" />
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#2a0414] via-[#4a0e26] to-[#1a0009] text-white overflow-hidden">
      <SoftParticles />
      <MusicToggle />
      <LangToggle />
      <ParticleBurst trigger={particleBurst} position={{ x: 50, y: 50 }} color="#FF4D6D" />

      {showConfetti && windowSize.width > 0 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={350}
          gravity={0.08}
        />
      )}

      <AnimatePresence mode="wait">
        {section === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="fixed inset-0 flex flex-col items-center justify-center z-40"
          >
            <div className="text-center space-y-12 px-4">
              <motion.h1
                className="font-serif text-3xl sm:text-5xl md:text-7xl font-light max-w-3xl text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
              >
                <Typewriter text={t(lang, 'loading_line1')} speed={42} />
              </motion.h1>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <motion.p
                  className="text-xl md:text-2xl text-white/80 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.4, delay: 1, ease: 'easeOut' }}
                >
                  {t(lang, 'loading_line2')}
                </motion.p>
              </motion.div>
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '80px', opacity: 1 }}
                transition={{ duration: 2, delay: 2.5, ease: 'easeOut' }}
                className="mx-auto h-0.5 bg-gradient-to-r from-[#FFB7B2] via-[#E2D1F9] to-[#FFE5B4]"
              />
            </div>
          </motion.div>
        )}

        {section === 'hero' && (
          <motion.section
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="relative min-h-screen flex flex-col items-center justify-center px-4"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center space-y-10 max-w-3xl"
            >
              <motion.h1
                className="font-serif text-4xl sm:text-6xl md:text-8xl font-light bg-gradient-to-r from-[#FFB7B2] via-[#E2D1F9] to-[#FFE5B4] bg-clip-text text-transparent"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {t(lang, 'hero_title')}
              </motion.h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                {t(lang, 'hero_sub')}
              </p>
              <motion.button
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                whileHover={{ scale: 1.06, boxShadow: '0 0 28px rgba(255, 77, 109, 0.45)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleContinue('name')}
                className="mt-8 px-10 py-4 bg-gradient-to-r from-[#FF758C] to-[#FF7EB3] rounded-full font-semibold text-white shadow-lg"
              >
                {t(lang, 'hero_button')}
              </motion.button>
            </motion.div>
          </motion.section>
        )}

        {section === 'name' && (
          <motion.section
            key="name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen flex flex-col items-center justify-center px-4"
          >
            <GlassCard className="w-full max-w-md">
              <h2 className="font-serif text-3xl font-light mb-2 text-center">
                {t(lang, 'name_prompt')}
              </h2>
              <p className="text-sm text-white/60 text-center mb-6 font-light">
                {t(lang, 'name_sub')}
              </p>
              <input
                type="text"
                placeholder={t(lang, 'name_placeholder')}
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNameSubmit()
                }}
                autoFocus
                className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#FF758C] focus:ring-2 focus:ring-[#FF758C]/40 transition-all font-light"
              />
              <button
                onClick={handleNameSubmit}
                disabled={!inputName.trim()}
                className="w-full mt-5 px-6 py-3.5 bg-gradient-to-r from-[#FF758C] to-[#FF7EB3] rounded-2xl font-semibold hover:shadow-xl transition-all text-white disabled:from-white/10 disabled:to-white/5 disabled:text-white/40 disabled:cursor-not-allowed disabled:shadow-none border border-transparent disabled:border-white/10"
              >
                {t(lang, 'name_continue')}
              </button>
            </GlassCard>
          </motion.section>
        )}

        {section === 'dateEntry' && name && (
          <DateEntryPin name={name} onSubmit={() => setSection('letter')} />
        )}

        {section === 'letter' && name && (
          <AnimatedLetter name={name} onComplete={() => handleContinue('chapter1')} />
        )}

        {section === 'chapter1' && (
          <motion.section
            key="chapter1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
          >
            <div className="max-w-2xl space-y-14 text-center">
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-white/55"
              >
                {name}…
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1.2 }}
                className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white/90 leading-tight"
              >
                {t(lang, 'ch1_line1')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 1.2 }}
                className="text-xl sm:text-2xl md:text-3xl font-light text-white/65"
              >
                {t(lang, 'ch1_line2')}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 1.2 }}
                className="text-xl sm:text-2xl md:text-3xl font-light text-white/50"
              >
                {t(lang, 'ch1_line3')}
              </motion.p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8, duration: 0.8 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleContinue('chapter2')}
                className="mt-6 px-8 py-4 bg-white/10 border border-white/20 rounded-full font-semibold text-white"
              >
                {t(lang, 'ch1_button')}
              </motion.button>
            </div>
          </motion.section>
        )}

        {section === 'chapter2' && (
          <motion.section
            key="chapter2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-serif text-2xl text-white/80 mb-10 text-center max-w-lg font-light"
            >
              {t(lang, 'ch2_intro')}
            </motion.p>
            <TimelineCards />
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleContinue('chapter3')}
              className="mt-12 px-8 py-4 bg-white/10 border border-white/20 rounded-full font-semibold text-white"
            >
              {t(lang, 'ch2_button')}
            </motion.button>
          </motion.section>
        )}

        {section === 'chapter3' && (
          <motion.section
            key="chapter3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
          >
            <div className="max-w-2xl space-y-8 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1.2 }}
                className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white leading-tight"
              >
                {t(lang, 'ch3_title', name)}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1 }}
                className="text-lg sm:text-xl md:text-2xl font-light text-white/90 leading-relaxed"
              >
                {t(lang, 'ch3_line1')}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="text-lg sm:text-xl font-light text-white/80 leading-relaxed"
              >
                {t(lang, 'ch3_line2')}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 1 }}
                className="text-lg sm:text-xl font-light text-white/75 leading-relaxed whitespace-pre-line"
              >
                {t(lang, 'ch3_line3')}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 1 }}
                className="text-lg sm:text-xl font-light text-white/70 leading-relaxed whitespace-pre-line"
              >
                {t(lang, 'ch3_line4')}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 1 }}
                className="text-lg text-white/60 italic font-serif leading-relaxed whitespace-pre-line"
              >
                {t(lang, 'ch3_italic')}
              </motion.p>
            </div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.2 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleContinue('envelope')}
              className="mt-12 px-8 py-4 bg-white/10 border border-white/20 rounded-full font-semibold text-white"
            >
              {t(lang, 'ch3_button')}
            </motion.button>
          </motion.section>
        )}

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

        {section === 'reveal' && (
          <motion.section
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen flex flex-col items-center justify-center px-4 space-y-14"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 70, damping: 14, delay: 0.2 }}
            >
              <motion.div
                animate={{ y: [0, -12, 0], rotateZ: [0, 2, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="animate-[pulse-heart_2s_ease-in-out_infinite]"
              >
                <FloatingHeart />
              </motion.div>
            </motion.div>

            <div className="text-center space-y-6 max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1.2 }}
                className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white/80 whitespace-pre-line leading-relaxed"
              >
                {t(lang, 'reveal_line1')}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1.2 }}
                className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-white/70"
              >
                {t(lang, 'reveal_line2')}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 2.4, duration: 1.2, ease: 'easeOut' }}
                className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-[#FFB7B2] to-[#E2D1F9] bg-clip-text text-transparent"
              >
                {name ? t(lang, 'reveal_name', name) : '…'}
              </motion.p>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2 }}
              whileHover={{ scale: 1.08, boxShadow: '0 0 32px rgba(255, 77, 109, 0.5)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleContinue('memory')}
              className="px-10 py-4 bg-gradient-to-r from-[#FF758C] to-[#FF7EB3] rounded-full font-semibold text-white shadow-lg"
            >
              {t(lang, 'reveal_button')}
            </motion.button>
          </motion.section>
        )}

        {section === 'memory' && (
          <motion.section key="memory" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <MemoryScene name={name} onContinue={() => handleContinue('response')} />
          </motion.section>
        )}

        {section === 'response' && (
          <motion.section
            key="response"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16"
          >
            {response ? (
              <div className="text-center max-w-2xl space-y-8">
                <motion.div
                  initial={{ scale: 0, rotate: -120 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 80, damping: 12 }}
                  className="text-6xl"
                >
                  {response === 'yes' && '💙'}
                  {response === 'thanks' && '🤍'}
                  {response === 'time' && '🌼'}
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-serif text-2xl md:text-3xl font-light text-white/90 whitespace-pre-line leading-relaxed"
                >
                  {response === 'yes' && t(lang, 'reply_yes')}
                  {response === 'thanks' && t(lang, 'reply_thanks')}
                  {response === 'time' && t(lang, 'reply_time')}
                </motion.p>

                {response === 'yes' && (
                  <motion.a
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      analyticsTracker.trackEvent('whatsapp_clicked', 'response')
                      fetch('/api/record-whatsapp', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ sessionId: analyticsTracker.getSessionId() }),
                      }).catch(err => console.error('[Story] Error recording WhatsApp click:', err))
                    }}
                    className="inline-block mt-4 px-10 py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full font-semibold hover:shadow-xl transition-all text-white"
                  >
                    {t(lang, 'whatsapp_button')}
                  </motion.a>
                )}
              </div>
            ) : (
              <motion.div
                className="text-center space-y-8 max-w-md w-full"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-light text-white">
                  {t(lang, 'response_prompt')}
                </h2>
                <p className="text-white/60 text-sm font-light whitespace-pre-line leading-relaxed">
                  {t(lang, 'response_sub')}
                </p>

                <div className="space-y-3">
                  {[
                    { id: 'yes', label: t(lang, 'response_yes') },
                    { id: 'thanks', label: t(lang, 'response_thanks') },
                    { id: 'time', label: t(lang, 'response_time') },
                  ].map((opt, i) => (
                    <motion.button
                      key={opt.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.15 }}
                      whileHover={{
                        scale: 1.03,
                        x: 6,
                        backgroundColor:
                          opt.id === 'yes'
                            ? 'rgba(255, 183, 178, 0.4)'
                            : 'rgba(255, 255, 255, 0.4)',
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleResponse(opt.id)}
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl font-light text-white text-left transition-colors hover:bg-white/20"
                    >
                      <span>{opt.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {showEnding && response !== 'yes' && <EndingSequence name={name} onComplete={handleReplay} />}
    </main>
  )
}
