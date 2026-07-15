'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ENABLE_MUSIC } from '@/lib/constants'

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [enabled, setEnabled] = useState(true)
  const [started, setStarted] = useState(false)

  // Create the audio element once on mount
  useEffect(() => {
    if (!ENABLE_MUSIC || typeof window === 'undefined') return

    const audio = new Audio('/music.m4a')
    audio.loop = true
    audio.volume = 0

    // Helps on mobile browsers (iOS/Safari/embedded WebViews)
    audio.preload = 'auto'
    ;(audio as any).playsInline = true

    audioRef.current = audio

    // Fade in smoothly over 3 seconds

    const fadeIn = () => {
      let vol = 0
      const step = () => {
        if (!audioRef.current) return
        vol = Math.min(vol + 0.02, 0.4) // max volume 40%
        audioRef.current.volume = vol
        if (vol < 0.4) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    // Auto-play on first user interaction (browser policy requires this)
    const tryAutoPlay = () => {
      if (started || !audioRef.current) return
      const a = audioRef.current
      a
        .play()
        .then(() => {
          setStarted(true)
          fadeIn()
        })
        .catch(() => {
          // Browser blocked it — user will need to tap the button
        })

      // Remove gesture listeners once we have attempted to unlock
      document.removeEventListener('click', tryAutoPlay)
      document.removeEventListener('touchstart', tryAutoPlay)
      document.removeEventListener('pointerdown', tryAutoPlay)
      document.removeEventListener('keydown', tryAutoPlay)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }

    const onVisibilityChange = () => {

      // Some mobile browsers pause media when tab visibility changes.
      // Retry when user returns.
      if (document.visibilityState === 'visible') {
        tryAutoPlay()
      }
    }

    // Try immediately (works on some browsers / after reload)
    audioRef.current
      .play()
      .then(() => {
        setStarted(true)
        fadeIn()
      })
      .catch(() => {
        // Not allowed yet — wait for any user gesture
        document.addEventListener('click', tryAutoPlay, { once: true })
        document.addEventListener('touchstart', tryAutoPlay, { once: true })
        document.addEventListener('pointerdown', tryAutoPlay, { once: true })
        document.addEventListener('keydown', tryAutoPlay, { once: true })
      })

    document.addEventListener('visibilitychange', onVisibilityChange)


    return () => {
      audio.pause()
      audio.src = ''
      document.removeEventListener('click', tryAutoPlay)
      document.removeEventListener('touchstart', tryAutoPlay)
      document.removeEventListener('keydown', tryAutoPlay)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggle = () => {
    if (!ENABLE_MUSIC || !audioRef.current) return

    if (enabled) {
      // Fade out then pause
      let vol = audioRef.current.volume
      const fadeOut = () => {
        if (!audioRef.current) return
        vol = Math.max(vol - 0.02, 0)
        audioRef.current.volume = vol
        if (vol > 0) requestAnimationFrame(fadeOut)
        else audioRef.current.pause()
      }
      fadeOut()
      setEnabled(false)
    } else {
      // Resume and fade in
      audioRef.current
        .play()
        .then(() => {
          setStarted(true)
          let vol = 0
          const fadeIn = () => {
            if (!audioRef.current) return
            vol = Math.min(vol + 0.02, 0.4)
            audioRef.current.volume = vol
            if (vol < 0.4) requestAnimationFrame(fadeIn)
          }
          fadeIn()
        })
        .catch(() => {})
      setEnabled(true)
    }
  }

  if (!ENABLE_MUSIC) return null

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      onClick={toggle}
      aria-label={enabled ? 'Pause music' : 'Play music'}
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[60] w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-sm text-white hover:bg-white/20 transition-all"
    >
      {enabled && started ? '♪' : '♫'}
    </motion.button>
  )
}

