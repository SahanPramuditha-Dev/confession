'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const timelineItems = [
  { text: 'The day I saw you.' },
  { text: "I couldn't stop thinking about that moment." },
  { text: 'I wondered if I should simply walk away.' },
  { text: 'But I decided honesty is better than regret.' },
]

export function TimelineCards() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref} className="max-w-2xl mx-auto space-y-4">
      {timelineItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
          }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF4D6D] to-[#9D4EDD] flex items-center justify-center flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#070B18] flex items-center justify-center">
              <span className="text-[#FFD166] text-xs font-bold">{index + 1}</span>
            </div>
          </div>
          <motion.div
            whileHover={{ x: 10 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 flex-1"
          >
            <p className="text-lg text-white font-light">{item.text}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
