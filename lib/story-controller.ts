export type StoryState = 'AUTO_PLAYING' | 'WAITING_FOR_INTERACTION' | 'COMPLETED' | 'PAUSED'

export interface SectionConfig {
  duration: number
  state: StoryState
  requiresInteraction: boolean
}

export const sectionConfigs: Record<string, SectionConfig> = {
  loading: {
    duration: 4500,
    state: 'AUTO_PLAYING',
    requiresInteraction: false,
  },
  hero: {
    duration: 0,
    state: 'WAITING_FOR_INTERACTION',
    requiresInteraction: true,
  },
  name: {
    duration: 0,
    state: 'WAITING_FOR_INTERACTION',
    requiresInteraction: true,
  },
  dateEntry: {
    duration: 0,
    state: 'WAITING_FOR_INTERACTION',
    requiresInteraction: true,
  },
  letter: {
    duration: 0,
    state: 'WAITING_FOR_INTERACTION',
    requiresInteraction: true,
  },
  chapter1: {
    duration: 0,
    state: 'WAITING_FOR_INTERACTION',
    requiresInteraction: true,
  },
  chapter2: {
    duration: 0,
    state: 'WAITING_FOR_INTERACTION',
    requiresInteraction: true,
  },
  constellation: {
    duration: 0,
    state: 'WAITING_FOR_INTERACTION',
    requiresInteraction: true,
  },
  chapter3: {
    duration: 0,
    state: 'WAITING_FOR_INTERACTION',
    requiresInteraction: true,
  },
  envelope: {
    duration: 0,
    state: 'WAITING_FOR_INTERACTION',
    requiresInteraction: true,
  },
  reveal: {
    duration: 0,
    state: 'WAITING_FOR_INTERACTION',
    requiresInteraction: true,
  },
  memory: {
    duration: 0,
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
