'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { LoveLetter } from './love-letter'

interface AnimatedLetterProps {
  name: string
  onComplete: () => void
}

export function AnimatedLetter({ name, onComplete }: AnimatedLetterProps) {
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
    setTimeout(() => {
      onComplete()
    }, 2000)
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
            className="fixed bottom-8 px-8 py-3 bg-gradient-to-r from-[#FF4D6D] to-[#9D4EDD] rounded-full font-semibold text-white hover:shadow-xl transition-all"
          >
            Continue →
          </motion.button>
        </>
      )}
    </motion.div>
  )
}
