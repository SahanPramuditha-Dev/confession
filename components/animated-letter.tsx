'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { LoveLetter } from './love-letter'
import { useLang } from '@/lib/lang-context'
import { t } from '@/lib/i18n'

interface AnimatedLetterProps {
  name: string
  onComplete: () => void
}

export function AnimatedLetter({ name, onComplete }: AnimatedLetterProps) {
  const { lang } = useLang()
  const [isCorrectDate, setIsCorrectDate] = useState(false)
  const [showLetter, setShowLetter] = useState(false)

  useEffect(() => {
    // Get the date correctness from sessionStorage
    const dateCorrect = sessionStorage.getItem('dateCorrect') === 'true'
    setIsCorrectDate(dateCorrect)
    
    // Show the letter after a brief delay
    const timer = setTimeout(() => {
      setShowLetter(true)
    }, 600)
    
    return () => clearTimeout(timer)
  }, [])

  const handleComplete = () => {
    onComplete()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      {showLetter && (
        <>
          <LoveLetter name={name} isCorrectDate={isCorrectDate} />
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            onClick={handleComplete}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 mb-[env(safe-area-inset-bottom)] px-8 py-3 bg-gradient-to-r from-[#FF758C] to-[#FF7EB3] rounded-full font-semibold text-white hover:shadow-xl transition-all z-[60]"
          >
            {t(lang, 'name_continue')}
          </motion.button>
        </>
      )}
    </motion.div>
  )
}
