'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { FIRST_MEETING_DATE } from '@/lib/constants'
import { useLang } from '@/lib/lang-context'
import { t } from '@/lib/i18n'
import { analyticsTracker } from '@/lib/analytics'

interface DateEntryPinProps {
  onSubmit: () => void
  name: string
}

export function DateEntryPin({ onSubmit, name }: DateEntryPinProps) {
  const { lang } = useLang()
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [dateResult, setDateResult] = useState<'correct' | 'incorrect' | null>(null)

  const correctDate = `${FIRST_MEETING_DATE.getFullYear()}${String(FIRST_MEETING_DATE.getMonth() + 1).padStart(2, '0')}${String(FIRST_MEETING_DATE.getDate()).padStart(2, '0')}`

  const getHintMessage = () => {
    if (attempts === 0) return t(lang, 'date_hint_0', name)
    if (attempts === 1) return t(lang, 'date_hint_1')
    return t(lang, 'date_hint_2')
  }

  const handleDigit = (digit: string) => {
    if (pin.length < 8 && !submitted) {
      setPin((prev) => prev + digit)
      setError(false)
    }
  }

  const handleDelete = () => {
    if (!submitted) setPin((prev) => prev.slice(0, -1))
  }

  const finishEntry = useCallback(
    (enteredPin: string) => {
      if (submitted) return

      const isCorrect = enteredPin === correctDate
      setSubmitted(true)
      setDateResult(isCorrect ? 'correct' : 'incorrect')

      if (!isCorrect) {
        setAttempts((a) => a + 1)
        setError(true)
      }

      const days = Math.floor(
        (new Date().getTime() - FIRST_MEETING_DATE.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('dateCorrect', isCorrect ? 'true' : 'false')
        sessionStorage.setItem('enteredDate', enteredPin)
      }

      analyticsTracker.trackEvent(isCorrect ? 'date_correct' : 'date_incorrect', 'dateEntry', {
        entered: enteredPin,
        correct: correctDate,
        days,
        isCorrect,
        timestamp: new Date().toISOString(),
      })

      const sessionId = analyticsTracker.getSessionId()

      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: isCorrect ? 'date_correct' : 'date_incorrect',
          section: 'dateEntry',
          timestamp: new Date().toISOString(),
          sessionId,
          data: { entered: enteredPin, correct: correctDate, days, isCorrect },
        }),
      }).catch((err) => console.error('[DateEntry] analytics error:', err))

      fetch('/api/record-date', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, enteredDate: enteredPin, isCorrect }),
      }).catch((err) => console.error('[DateEntry] record error:', err))

      setTimeout(onSubmit, isCorrect ? 3500 : 4000)
    },
    [submitted, correctDate, onSubmit]
  )

  const handleSubmit = () => {
    if (pin.length === 8) finishEntry(pin)
  }

  useEffect(() => {
    if (pin.length === 8 && !submitted) {
      const timer = setTimeout(() => finishEntry(pin), 900)
      return () => clearTimeout(timer)
    }
  }, [pin, submitted, finishEntry])

  const buttons = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['0'],
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 px-4"
    >
      <div className="text-center max-w-md w-full">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-serif text-3xl font-light mb-2 text-white"
        >
          {name}, a small test…
        </motion.h2>
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-white/50 mb-2 font-light"
        >
          {getHintMessage()}
        </motion.p>
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs text-white/35 mb-8"
        >
          (YYYYMMDD)
        </motion.p>

        <motion.div
          className={`flex justify-center gap-1.5 sm:gap-2 mb-8 h-12 ${error && !submitted ? 'animate-pulse' : ''}`}
          animate={error && !submitted ? { x: [-4, 4, -4, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-8 h-10 sm:w-10 sm:h-12 md:w-12 md:h-12 rounded-xl border-2 border-[#E2D1F9] flex items-center justify-center text-white text-lg font-semibold"
              animate={{
                backgroundColor:
                  i < pin.length ? 'rgba(226, 209, 249, 0.4)' : 'rgba(255, 255, 255, 0.5)',
                borderColor: i < pin.length ? '#FFB7B2' : 'rgba(226, 209, 249, 0.8)',
              }}
              transition={{ duration: 0.2 }}
            >
              {i < pin.length ? (
                <motion.span
                  key={pin[i]}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 150, damping: 12 }}
                >
                  {pin[i]}
                </motion.span>
              ) : null}
            </motion.div>
          ))}
        </motion.div>

        {!submitted && (
          <>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-3 mb-6"
            >
              {buttons.map((row, rowIdx) => (
                <div key={rowIdx} className="flex justify-center gap-2 sm:gap-3">
                  {row.map((digit) => (
                    <motion.button
                      key={digit}
                      onClick={() => handleDigit(digit)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#E2D1F9] to-[#d4bcf6] text-slate-800 font-semibold text-xl hover:shadow-lg hover:shadow-[#E2D1F9]/40 transition-all"
                    >
                      {digit}
                    </motion.button>
                  ))}
                </div>
              ))}
            </motion.div>

            <motion.button
              onClick={handleDelete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 min-h-[44px] rounded-full border border-white/40 text-white/60 hover:bg-white/10 transition-all"
            >
              ← Delete
            </motion.button>
          </>
        )}

        {submitted && dateResult === 'correct' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 space-y-2"
          >
            <p className="font-serif text-2xl text-white font-light">
              You remembered ✨
            </p>
            <p className="text-sm text-white/60 italic font-light">
              Some dates hold memories that are quietly special.
            </p>
          </motion.div>
        )}

        {submitted && dateResult === 'incorrect' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 space-y-2"
          >
            <p className="font-serif text-2xl text-white font-light">That&apos;s okay 🤍</p>
            <p className="text-sm text-white/60 italic font-light">
              Memories live in feelings, not just numbers. Let&apos;s continue…
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
