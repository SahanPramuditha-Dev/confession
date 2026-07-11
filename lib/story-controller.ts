export type StoryState = 'AUTO_PLAYING' | 'WAITING_FOR_INTERACTION' | 'COMPLETED' | 'PAUSED'

export interface SectionConfig {
  duration: number // ms, 0 = no auto-advance
  state: StoryState
  requiresInteraction: boolean
  postInteractionWait?: number // 20 second pause after user completes interaction
}

export const sectionConfigs: Record<string, SectionConfig> = {
  loading: {
    duration: 5000, // Longer intro for cinematic feel
    state: 'AUTO_PLAYING',
    requiresInteraction: false,
  },
  hero: {
    duration: 4500, // Slow, emotional hero reveal
    state: 'AUTO_PLAYING',
    requiresInteraction: false,
  },
  name: {
    duration: 20000, // 20 second pause for name entry completion
    state: 'WAITING_FOR_INTERACTION',
    requiresInteraction: true,
    postInteractionWait: 20000, // 20 second wait after submission
  },
  dateEntry: {
    duration: 0, // WAIT for PIN entry
    state: 'WAITING_FOR_INTERACTION',
    requiresInteraction: true,
    postInteractionWait: 20000, // 20 second wait after submission
  },
  letter: {
    duration: 0, // NO auto-advance - user reads the letter at their own pace
    state: 'WAITING_FOR_INTERACTION',
    requiresInteraction: true,
  },
  chapter1: {
    duration: 8000, // Slow narrative reveal
    state: 'AUTO_PLAYING',
    requiresInteraction: false,
    postInteractionWait: 20000, // 20 second pause at end
  },
  chapter2: {
    duration: 7500, // Each chapter slightly faster (growing intensity)
    state: 'AUTO_PLAYING',
    requiresInteraction: false,
    postInteractionWait: 20000, // 20 second pause at end
  },
  chapter3: {
    duration: 7000, // Final chapter
    state: 'AUTO_PLAYING',
    requiresInteraction: false,
    postInteractionWait: 20000, // 20 second pause at end
  },
  constellation: {
    duration: 0, // WAIT for star collection (interactive)
    state: 'WAITING_FOR_INTERACTION',
    requiresInteraction: true,
  },
  envelope: {
    duration: 0, // WAIT for letter open (interactive)
    state: 'WAITING_FOR_INTERACTION',
    requiresInteraction: true,
  },
  reveal: {
    duration: 8000, // Slow, emotional final reveal
    state: 'AUTO_PLAYING',
    requiresInteraction: false,
  },
  memory: {
    duration: 0, // WAIT for response (critical interaction)
    state: 'WAITING_FOR_INTERACTION',
    requiresInteraction: true,
  },
  response: {
    duration: 0,
    state: 'WAITING_FOR_INTERACTION',
    requiresInteraction: true,
  },
}

export class StoryController {
  private currentState: StoryState = 'AUTO_PLAYING'
  private isPaused = false

  getState(): StoryState {
    return this.currentState
  }

  setState(state: StoryState) {
    this.currentState = state
  }

  pause() {
    this.isPaused = true
  }

  resume() {
    this.isPaused = false
  }

  getPaused() {
    return this.isPaused
  }

  shouldAutoAdvance(section: string): boolean {
    if (this.isPaused) return false
    const config = sectionConfigs[section]
    if (!config) return false
    return config.state === 'AUTO_PLAYING' && config.duration > 0
  }

  getAutoAdvanceDuration(section: string): number {
    const config = sectionConfigs[section]
    return config?.duration || 0
  }

  isWaitingForInteraction(section: string): boolean {
    const config = sectionConfigs[section]
    return config?.requiresInteraction || false
  }
}

export const storyController = new StoryController()
