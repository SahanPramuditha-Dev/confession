import Lenis from 'lenis'
import gsap from 'gsap'

let lenis: Lenis | null = null

export const initializeScroll = () => {
  if (typeof window === 'undefined') return null

  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  })

  lenis.on('scroll', (e: any) => {
    gsap.context((ctx) => {
      // Animation updates on scroll
    })
  })

  const raf = (time: number) => {
    lenis?.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
  return lenis
}

export const getScroll = () => lenis

export const scrollToSection = (target: string | HTMLElement, duration: number = 1) => {
  if (!lenis) return

  lenis.scrollTo(target, {
    duration: duration,
    easing: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  })
}

export const pauseScroll = () => {
  if (lenis) lenis.stop()
}

export const resumeScroll = () => {
  if (lenis) lenis.start()
}

export const destroyScroll = () => {
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
}
