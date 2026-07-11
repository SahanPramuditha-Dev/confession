'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FIRST_MEETING_DATE } from '@/lib/constants'
import { analyticsTracker } from '@/lib/analytics'

interface DateEntryPinProps {
  onSubmit: (name: string) => void
  name: string
}

export function DateEntryPin({ onSubmit, name }: DateEntryPinProps) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [dateResult, setDateResult] = useState<'correct' | 'incorrect' | null>(null)

  // Correct format: YYYYMMDD
  const correctDate = `${FIRST_MEETING_DATE.getFullYear()}${String(FIRST_MEETING_DATE.getMonth() + 1).padStart(2, '0')}${String(FIRST_MEETING_DATE.getDate()).padStart(2, '0')}`
  
  // Personalized hint messages
  const getHintMessage = () => {
    if (attempts === 0) return `${name}, only you would remember this date...`
    if (attempts === 1) return "Think of the day we met..."
    return "This date means everything to me..."
  }

  const handleDigit = (digit: string) => {
    if (pin.length < 8) {
      setPin(pin + digit)
      setError(false)
    }
  }

  const handleDelete = () => {
    setPin(pin.slice(0, -1))
  }

  const handleSubmit = () => {
    if (submitted) return // Prevent double submission
    
    // Record whether date is correct but always allow progression
    const isCorrect = pin === correctDate
    
    if (!isCorrect) {
      setAttempts(attempts + 1)
      setError(true)
      setTimeout(() => setError(false), 2000)
      return
    }
    
    setSubmitted(true)
    setDateResult(isCorrect ? 'correct' : 'incorrect')
    const days = Math.floor((new Date().getTime() - FIRST_MEETING_DATE.getTime()) / (1000 * 60 * 60 * 24))
    
    // Store result in sessionStorage for the letter component
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('dateCorrect', isCorrect ? 'true' : 'false')
      sessionStorage.setItem('enteredDate', pin)
    }
    
    // Track date entry with detailed data
    analyticsTracker.trackEvent(isCorrect ? 'date_correct' : 'date_incorrect', 'dateEntry', {
      entered: pin,
      correct: correctDate,
      days,
      isCorrect,
      timestamp: new Date().toISOString(),
    })
    
    // Record response in database
    const sessionId = analyticsTracker.getSessionId()
    
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: isCorrect ? 'date_correct' : 'date_incorrect',
        section: 'dateEntry',
        timestamp: new Date().toISOString(),
        sessionId,
        data: {
          entered: pin,
          correct: correctDate,
          days,
          isCorrect,
        },
      }),
    }).catch(err => console.error('[v0] Error recording analytics:', err))
    
    // Record to dedicated date_entries table
    fetch('/api/record-date', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        enteredDate: pin,
        isCorrect,
      }),
    }).catch(err => console.error('[v0] Error recording date entry:', err))
    
    // Always proceed to letter after showing result message (5 seconds)
    setTimeout(() => {
      onSubmit(name)
    }, 5000)
  }

  useEffect(() => {
    if (pin.length === 8) {
      setTimeout(handleSubmit, 1200)
    }
  }, [pin])

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
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-light mb-2 text-white"
        >
          {name}, a small test...
        </motion.h2>
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-400 mb-2"
        >
          {getHintMessage()}
        </motion.p>
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs text-gray-500 mb-8"
        >
          (Enter as YYYYMMDD)
        </motion.p>

        {/* PIN Display */}
        <motion.div
          className={`flex justify-center gap-2 mb-8 h-12 ${error ? 'animate-pulse' : ''}`}
          animate={error ? { x: [-5, 5, -5, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-12 h-12 rounded-lg border-2 border-[#9D4EDD] flex items-center justify-center text-white text-lg font-semibold"
              animate={{
                backgroundColor:
                  i < pin.length
                    ? 'rgba(157, 78, 221, 0.3)'
                    : 'rgba(255, 255, 255, 0.05)',
                borderColor:
                  i < pin.length
                    ? '#FF4D6D'
                    : '#9D4EDD',
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

        {/* Numeric Keypad */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="space-y-3 mb-6"
        >
          {buttons.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center gap-3">
              {row.map((digit, digitIdx) => (
                <motion.button
                  key={digit}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.6 + (rowIdx * 0.15) + (digitIdx * 0.1),
                    duration: 0.8
                  }}
                  onClick={() => handleDigit(digit)}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-[#9D4EDD] to-[#6A1B9A] text-white font-semibold text-xl hover:shadow-lg hover:shadow-[#9D4EDD]/50 transition-all"
                >
                  {digit}
                </motion.button>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Delete Button */}
        <motion.button
          onClick={handleDelete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-full border border-[#FF4D6D] text-[#FF4D6D] text-sm hover:bg-[#FF4D6D]/10 transition-all"
        >
          ← Delete
        </motion.button>

        {error && !submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#FFD166] text-sm mt-4"
          >
            That's not quite right, but let's continue...
          </motion.p>
        )}

        {submitted && dateResult === 'correct' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-8 space-y-2"
          >
            <p className="text-2xl text-white font-light">
              You remembered this little moment ✨
            </p>
            <p className="text-sm text-gray-300 italic">
              Some dates hold memories that are quietly special.
            </p>
          </motion.div>
        )}

        {submitted && dateResult === 'incorrect' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-8 space-y-2"
          >
            <p className="text-2xl text-white font-light">
              That's okay 🤍
            </p>
            <p className="text-sm text-gray-300 italic">
              Sometimes memories are not only about dates, but about the feelings attached to them.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
