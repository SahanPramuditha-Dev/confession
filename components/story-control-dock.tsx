'use client'

import { motion } from 'framer-motion'
import { Play, Pause, SkipForward, SkipBack, Volume2, Volume1, RotateCcw } from 'lucide-react'
import { useState } from 'react'

interface StoryControlDockProps {
  isPlaying: boolean
  progress: number
  onPlay: () => void
  onPause: () => void
  onSkip: () => void
  onRewind: () => void
  onReplay: () => void
  onVolumeChange: (volume: number) => void
  totalDuration: number
  currentTime: number
}

export function StoryControlDock({
  isPlaying,
  progress,
  onPlay,
  onPause,
  onSkip,
  onRewind,
  onReplay,
  onVolumeChange,
  totalDuration,
  currentTime,
}: StoryControlDockProps) {
  const [volume, setVolume] = useState(0.8)
  const [showVolume, setShowVolume] = useState(false)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-gradient-to-b from-[rgba(255,77,109,0.1)] to-[rgba(157,78,221,0.1)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] rounded-full px-8 py-4 shadow-2xl">
        <div className="flex items-center gap-6">
          {/* Rewind */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRewind}
            className="p-2 hover:bg-[rgba(255,77,109,0.2)] rounded-full transition-colors"
          >
            <SkipBack size={20} className="text-[#FFD166]" />
          </motion.button>

          {/* Play/Pause */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={isPlaying ? onPause : onPlay}
            className="p-3 bg-gradient-to-r from-[#FF4D6D] to-[#9D4EDD] rounded-full hover:shadow-xl transition-all"
          >
            {isPlaying ? (
              <Pause size={24} className="text-white fill-white" />
            ) : (
              <Play size={24} className="text-white fill-white ml-1" />
            )}
          </motion.button>

          {/* Skip */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSkip}
            className="p-2 hover:bg-[rgba(157,78,221,0.2)] rounded-full transition-colors"
          >
            <SkipForward size={20} className="text-[#9D4EDD]" />
          </motion.button>

          {/* Separator */}
          <div className="w-px h-6 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.2)] to-transparent" />

          {/* Time Display */}
          <div className="text-xs font-mono text-[rgba(255,255,255,0.6)] min-w-[80px] text-center">
            <div>{formatTime(currentTime)}</div>
            <div className="text-[rgba(255,255,255,0.4)] text-[10px]">{formatTime(totalDuration)}</div>
          </div>

          {/* Progress Bar */}
          <div className="w-32 h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF4D6D] to-[#9D4EDD] rounded-full"
              style={{ width: `${progress * 100}%` }}
              transition={{ type: 'tween' }}
            />
          </div>

          {/* Volume */}
          <motion.div
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
            className="relative"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-full transition-colors"
            >
              {volume > 0 ? (
                <Volume2 size={20} className="text-[rgba(255,255,255,0.7)]" />
              ) : (
                <Volume1 size={20} className="text-[rgba(255,255,255,0.4)]" />
              )}
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={showVolume ? { opacity: 1, y: -50 } : { opacity: 0, y: 10 }}
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
              pointerEvents={showVolume ? 'auto' : 'none'}
            >
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={(e) => {
                  const newVolume = parseInt(e.currentTarget.value) / 100
                  setVolume(newVolume)
                  onVolumeChange(newVolume)
                }}
                className="w-1 h-20 appearance-none bg-gradient-to-t from-[#FF4D6D] to-[#9D4EDD] rounded-full cursor-pointer vertical-slider"
              />
            </motion.div>
          </motion.div>

          {/* Separator */}
          <div className="w-px h-6 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.2)] to-transparent" />

          {/* Replay */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReplay}
            className="p-2 hover:bg-[rgba(255,77,109,0.2)] rounded-full transition-colors"
          >
            <RotateCcw size={20} className="text-[#FF4D6D]" />
          </motion.button>
        </div>
      </div>

      <style jsx>{`
        .vertical-slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 77, 109, 0.6);
        }

        .vertical-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(255, 77, 109, 0.6);
        }
      `}</style>
    </motion.div>
  )
}
