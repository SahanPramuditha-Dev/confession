let currentScrollAnimation: number | null = null
let isUserScrolling = false
let scrollInterruptTimer: NodeJS.Timeout | null = null

export function smoothScrollTo(elementId: string, duration: number = 2500, delay: number = 1200) {
  // Cancel any existing scroll animation
  if (currentScrollAnimation !== null) {
    cancelAnimationFrame(currentScrollAnimation)
  }

  // Reset user scrolling flag after delay
  isUserScrolling = false
  
  return new Promise((resolve) => {
    // Wait for delay before starting auto-scroll
    setTimeout(() => {
      const element = document.getElementById(elementId)
      if (!element) {
        resolve(false)
        return
      }

      const start = window.scrollY
      const target = Math.max(0, element.offsetTop - 100) // Offset for context
      const distance = target - start

      // If distance is too small, just resolve
      if (Math.abs(distance) < 50) {
        resolve(true)
        return
      }

      const startTime = Date.now()

      function scroll() {
        if (isUserScrolling) {
          currentScrollAnimation = null
          resolve(false)
          return
        }

        const now = Date.now()
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function for smooth, natural scroll (easeOutCubic)
        const easeProgress = 1 - Math.pow(1 - progress, 3)

        window.scrollTo(0, start + distance * easeProgress)

        if (progress < 1) {
          currentScrollAnimation = requestAnimationFrame(scroll)
        } else {
          currentScrollAnimation = null
          resolve(true)
        }
      }

      currentScrollAnimation = requestAnimationFrame(scroll)
    }, delay)
  })
}

export function pauseAutoScroll() {
  if (currentScrollAnimation !== null) {
    cancelAnimationFrame(currentScrollAnimation)
    currentScrollAnimation = null
  }
}

export function detectUserScroll() {
  const handleScroll = () => {
    isUserScrolling = true
    
    // Clear any existing timer
    if (scrollInterruptTimer) {
      clearTimeout(scrollInterruptTimer)
    }
    
    // Pause auto-scroll for 1.5 seconds after user scroll
    pauseAutoScroll()
    
    // Reset flag after user has stopped scrolling
    scrollInterruptTimer = setTimeout(() => {
      isUserScrolling = false
    }, 1500)
  }

  document.addEventListener('wheel', handleScroll, { passive: true })
  document.addEventListener('touchmove', handleScroll, { passive: true })
  document.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) {
      handleScroll()
    }
  })

  return () => {
    document.removeEventListener('wheel', handleScroll)
    document.removeEventListener('touchmove', handleScroll)
    if (scrollInterruptTimer) {
      clearTimeout(scrollInterruptTimer)
    }
  }
}

export function isCurrentlyScrolling(): boolean {
  return isUserScrolling
}
