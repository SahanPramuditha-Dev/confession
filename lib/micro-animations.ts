import { VariantLabels, Variants } from 'framer-motion'

// Glow Effect
export const glowVariants: Variants = {
  idle: {
    boxShadow: '0 0 10px rgba(255, 77, 109, 0.3), 0 0 20px rgba(157, 78, 221, 0.2)',
  },
  glow: {
    boxShadow: [
      '0 0 10px rgba(255, 77, 109, 0.3), 0 0 20px rgba(157, 78, 221, 0.2)',
      '0 0 20px rgba(255, 77, 109, 0.6), 0 0 40px rgba(157, 78, 221, 0.4)',
      '0 0 10px rgba(255, 77, 109, 0.3), 0 0 20px rgba(157, 78, 221, 0.2)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop' as const,
    },
  },
}

// Ripple Effect
export const rippleVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 1,
  },
  animate: {
    scale: 4,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// Tilt Effect
export const tiltVariants: Variants = {
  hover: {
    rotateX: 5,
    rotateY: 5,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  initial: {
    rotateX: 0,
    rotateY: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

// Shimmer Effect
export const shimmerVariants: Variants = {
  animate: {
    backgroundPosition: ['0% 0%', '100% 0%'],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'loop' as const,
      ease: 'linear',
    },
  },
}

// Breathing Effect
export const breathingVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: 'loop' as const,
      ease: 'easeInOut',
    },
  },
}

// Particle Trail
export const particleTrailVariants: Variants = {
  initial: {
    opacity: 1,
    scale: 1,
  },
  animate: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 1.5,
      ease: 'easeOut',
    },
  },
}

// Border Animation
export const borderAnimationVariants: Variants = {
  animate: {
    backgroundPosition: ['0% 0%', '100% 100%'],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'loop' as const,
      ease: 'linear',
    },
  },
}

// Pulse Animation
export const pulseVariants: Variants = {
  animate: {
    opacity: [1, 0.5, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop' as const,
      ease: 'easeInOut',
    },
  },
}

// Float Animation
export const floatVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'loop' as const,
      ease: 'easeInOut',
    },
  },
}

// Slide In From Left
export const slideInLeft: Variants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// Slide In From Right
export const slideInRight: Variants = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// Fade In Scale
export const fadeInScale: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// Stagger Container
export const containerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Stagger Item
export const itemVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}
