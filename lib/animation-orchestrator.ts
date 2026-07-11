import gsap from 'gsap'

export interface AnimationState {
  currentScene: number
  isPlaying: boolean
  progress: number
  totalDuration: number
}

class AnimationOrchestrator {
  private timeline: gsap.core.Timeline | null = null
  private state: AnimationState = {
    currentScene: 0,
    isPlaying: false,
    progress: 0,
    totalDuration: 0,
  }
  private callbacks: {
    onStateChange?: (state: AnimationState) => void
    onSceneChange?: (scene: number) => void
  } = {}

  createTimeline(duration: number = 60) {
    this.timeline = gsap.timeline({
      paused: true,
      onUpdate: () => {
        if (this.timeline) {
          this.state.progress = this.timeline.progress()
          this.callbacks.onStateChange?.(this.state)
        }
      },
    })

    this.state.totalDuration = duration
    return this.timeline
  }

  addScene(
    label: string,
    animation: (tl: gsap.core.Timeline) => void,
    duration: number = 5
  ) {
    if (!this.timeline) return

    this.timeline.add(label, '+=0')
    const position = this.timeline.labels[label]

    gsap.context(() => {
      const sceneTl = gsap.timeline()
      animation(sceneTl)
      this.timeline?.add(sceneTl, position)
    })
  }

  play() {
    if (this.timeline) {
      this.timeline.play()
      this.state.isPlaying = true
      this.callbacks.onStateChange?.(this.state)
    }
  }

  pause() {
    if (this.timeline) {
      this.timeline.pause()
      this.state.isPlaying = false
      this.callbacks.onStateChange?.(this.state)
    }
  }

  goToScene(sceneIndex: number) {
    if (!this.timeline) return

    const labels = Object.keys(this.timeline.labels)
    if (sceneIndex < 0 || sceneIndex >= labels.length) return

    const label = labels[sceneIndex]
    this.timeline.tweenTo(label, {
      duration: 0.5,
      ease: 'power2.inOut',
    })

    this.state.currentScene = sceneIndex
    this.callbacks.onSceneChange?.(sceneIndex)
  }

  skip(duration: number = 2) {
    if (!this.timeline) return

    this.timeline.progress(Math.min(1, this.timeline.progress() + duration / this.state.totalDuration))
  }

  rewind(duration: number = 2) {
    if (!this.timeline) return

    this.timeline.progress(Math.max(0, this.timeline.progress() - duration / this.state.totalDuration))
  }

  replay() {
    if (this.timeline) {
      this.timeline.restart()
      this.state.currentScene = 0
      this.callbacks.onStateChange?.(this.state)
    }
  }

  onStateChange(callback: (state: AnimationState) => void) {
    this.callbacks.onStateChange = callback
  }

  onSceneChange(callback: (scene: number) => void) {
    this.callbacks.onSceneChange = callback
  }

  getState() {
    return this.state
  }

  getTimeline() {
    return this.timeline
  }
}

export const orchestrator = new AnimationOrchestrator()
