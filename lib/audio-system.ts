export interface AudioConfig {
  ambient?: string
  effects?: {
    transition?: string
    reveal?: string
    heartbeat?: string
    click?: string
  }
}

export class AudioSystem {
  private audioContext: AudioContext | null = null
  private masterVolume: number = 0.8
  private ambientAudio: HTMLAudioElement | null = null
  private effectAudios: Map<string, HTMLAudioElement> = new Map()

  constructor(config?: AudioConfig) {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      this.setupAudio(config)
    }
  }

  private setupAudio(config?: AudioConfig) {
    if (config?.ambient) {
      this.ambientAudio = new Audio(config.ambient)
      this.ambientAudio.loop = true
      this.ambientAudio.volume = this.masterVolume * 0.3
    }

    if (config?.effects) {
      Object.entries(config.effects).forEach(([key, url]) => {
        const audio = new Audio(url)
        audio.volume = this.masterVolume * 0.6
        this.effectAudios.set(key, audio)
      })
    }
  }

  playAmbient() {
    if (this.ambientAudio) {
      this.ambientAudio.play().catch((e) => console.log('Ambient play failed:', e))
    }
  }

  pauseAmbient() {
    if (this.ambientAudio) {
      this.ambientAudio.pause()
    }
  }

  playEffect(effectName: string) {
    const effect = this.effectAudios.get(effectName)
    if (effect) {
      effect.currentTime = 0
      effect.play().catch((e) => console.log(`Effect ${effectName} play failed:`, e))
    }
  }

  setMasterVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume))
    
    if (this.ambientAudio) {
      this.ambientAudio.volume = this.masterVolume * 0.3
    }

    this.effectAudios.forEach((audio) => {
      audio.volume = this.masterVolume * 0.6
    })
  }

  getMasterVolume() {
    return this.masterVolume
  }

  // Create procedural sounds
  createBeep(frequency: number = 440, duration: number = 100) {
    if (!this.audioContext) return

    const now = this.audioContext.currentTime
    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()

    osc.connect(gain)
    gain.connect(this.audioContext.destination)

    osc.frequency.value = frequency
    gain.gain.setValueAtTime(0.3 * this.masterVolume, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000)

    osc.start(now)
    osc.stop(now + duration / 1000)
  }

  // Create whoosh sound
  createWhoosh(duration: number = 300) {
    if (!this.audioContext) return

    const now = this.audioContext.currentTime
    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()

    osc.connect(gain)
    gain.connect(this.audioContext.destination)

    osc.frequency.setValueAtTime(200, now)
    osc.frequency.exponentialRampToValueAtTime(50, now + duration / 1000)
    gain.gain.setValueAtTime(0.2 * this.masterVolume, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000)

    osc.start(now)
    osc.stop(now + duration / 1000)
  }

  cleanup() {
    if (this.ambientAudio) {
      this.ambientAudio.pause()
      this.ambientAudio = null
    }
    this.effectAudios.clear()
  }
}

export const audioSystem = new AudioSystem()
