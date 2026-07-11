'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SceneTransitionProps {
  children: React.ReactNode
  isActive: boolean
  type?: 'fade' | 'blur' | 'zoom' | 'slide'
  duration?: number
}

export function SceneTransition({ 
  children, 
  isActive, 
  type = 'fade',
  duration = 0.6 
}: SceneTransitionProps) {
  const [shouldRender, setShouldRender] = useState(isActive)

  useEffect(() => {
    if (isActive) setShouldRender(true)
  }, [isActive])

  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    blur: {
      initial: { opacity: 0, filter: 'blur(10px)' },
      animate: { opacity: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, filter: 'blur(10px)' },
    },
    zoom: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    },
    slide: {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 },
    },
  }

  return (
    <AnimatePresence mode="wait">
      {shouldRender && (
        <motion.div
          key={`transition-${isActive}`}
          variants={variants[type]}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration }}
          onAnimationComplete={() => {
            if (!isActive) setShouldRender(false)
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
