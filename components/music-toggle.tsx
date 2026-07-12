'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ENABLE_MUSIC } from '@/lib/constants'
import { audioSystem } from '@/lib/audio-system'

export function MusicToggle() {
  const [enabled, setEnabled] = useState(false)
  const ambientRef = useRef<{ stop: () => void } | null>(null)

  useEffect(() => {
    return () => {
      ambientRef.current?.stop()
    }
  }, [])

  const toggle = () => {
    if (!ENABLE_MUSIC) return

    if (enabled) {
      ambientRef.current?.stop()
      ambientRef.current = null
      setEnabled(false)
      return
    }

    ambientRef.current = audioSystem.startSoftAmbient()
    setEnabled(true)
  }

  if (!ENABLE_MUSIC) return null

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      onClick={toggle}
      aria-label={enabled ? 'Turn music off' : 'Turn music on'}
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[60] w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-sm text-white hover:bg-white/20 transition-all"
    >
      {enabled ? '♪' : '♫'}
    </motion.button>
  )
}
