'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang-context'

export function LangToggle() {
  const { lang, setLang } = useLang()

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2 }}
      onClick={() => setLang(lang === 'si' ? 'en' : 'si')}
      aria-label="Switch language"
      title={lang === 'si' ? 'Switch to English' : 'සිංහලට මාරු වන්න'}
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[4.5rem] z-[60] w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all"
    >
      <motion.span
        key={lang}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        className="text-xs font-semibold text-white tracking-wide"
      >
        {lang === 'si' ? 'EN' : 'සි'}
      </motion.span>
    </motion.button>
  )
}
