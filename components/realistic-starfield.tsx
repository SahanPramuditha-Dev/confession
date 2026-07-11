'use client'

import { useEffect, useRef } from 'react'

export function RealisticStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Three layers of stars with different speeds
    const layers = [
      { count: 80, speed: 0.02, size: 0.5, opacity: 0.4 }, // Far layer
      { count: 150, speed: 0.05, size: 1, opacity: 0.6 }, // Mid layer
      { count: 100, speed: 0.1, size: 1.5, opacity: 0.9 }, // Close layer
    ]

    const stars = layers.flatMap((layer, layerIdx) =>
      Array.from({ length: layer.count }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * layer.size + 0.5,
        opacity: Math.random() * layer.opacity + 0.3,
        twinkleSpeed: Math.random() * 0.03,
        twinklePhase: Math.random() * Math.PI * 2,
        layerIdx,
      }))
    )

    let animationId: number
    let time = 0

    const animate = () => {
      time += 1

      // Clear with dark background
      ctx.fillStyle = '#070B18'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add subtle aurora glow
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, 'rgba(157, 78, 221, 0.05)')
      gradient.addColorStop(0.5, 'rgba(7, 11, 24, 0)')
      gradient.addColorStop(1, 'rgba(255, 77, 109, 0.03)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars with twinkling
      stars.forEach((star) => {
        const layer = layers[star.layerIdx]
        const parallaxShift = (time * layer.speed) % canvas.width
        const x = (star.x + parallaxShift) % canvas.width
        const twinkle = Math.sin(star.twinklePhase + time * star.twinkleSpeed)
        const finalOpacity = star.opacity * (0.5 + twinkle * 0.5)

        // Glow effect
        ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity * 0.3})`
        ctx.beginPath()
        ctx.arc(x, star.y, star.radius * 2.5, 0, Math.PI * 2)
        ctx.fill()

        // Star core
        ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`
        ctx.beginPath()
        ctx.arc(x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ background: '#070B18' }}
    />
  )
}
