export type EventType =
  | 'story_started'
  | 'section_entered'
  | 'section_exited'
  | 'name_entered'
  | 'date_entered'
  | 'date_correct'
  | 'date_incorrect'
  | 'star_clicked'
  | 'all_stars_completed'
  | 'letter_opened'
  | 'response_selected'
  | 'whatsapp_clicked'
  | 'story_completed'
  | 'page_scroll'
  | 'button_clicked'
  | 'star_section_entered'
  | 'user_typing'
  | 'form_submitted'
  | 'scroll_event'

export interface AnalyticsEvent {
  event: EventType
  section?: string
  timestamp: string
  sessionId: string
  data?: Record<string, any>
}

class AnalyticsTracker {
  private sessionId: string
  private events: AnalyticsEvent[] = []
  private sectionTimings: Map<string, { enteredAt: number; duration: number }> = new Map()
  private currentSection: string | null = null
  private sessionStartTime: number = Date.now()
  private userName: string = ''
  private userResponses: Map<string, string> = new Map()

  constructor() {
    this.sessionId = this.generateSessionId()
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  getSessionId(): string {
    return this.sessionId
  }

  trackSectionEnter(section: string) {
    if (this.currentSection) {
      this.trackSectionExit(this.currentSection)
    }
    this.currentSection = section
    const enteredAt = Date.now()
    this.sectionTimings.set(section, { enteredAt, duration: 0 })
    this.trackEvent('section_entered', section, { enteredAt })
  }

  trackSectionExit(section: string) {
    if (this.sectionTimings.has(section)) {
      const timing = this.sectionTimings.get(section)!
      const duration = Date.now() - timing.enteredAt
      timing.duration = duration
      this.trackEvent('section_exited', section, { duration })
    }
  }

  getSectionTimings() {
    return Object.fromEntries(
      Array.from(this.sectionTimings.entries()).map(([section, timing]) => [
        section,
        timing.duration,
      ])
    )
  }

  trackEvent(eventType: EventType, section?: string, data?: Record<string, any>) {
    const event: AnalyticsEvent = {
      event: eventType,
      section,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      data,
    }

    this.events.push(event)

    // Send to server for persistence
    this.sendToServer(event)
  }

  private async sendToServer(event: AnalyticsEvent) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      })
    } catch (error) {
      console.error('[v0] Failed to send analytics event:', error)
    }
  }

  setUserName(name: string) {
    this.userName = name
  }

  getUserName(): string {
    return this.userName
  }

  recordUserResponse(key: string, value: string) {
    this.userResponses.set(key, value)
  }

  getSessionDuration(): number {
    return Math.floor((Date.now() - this.sessionStartTime) / 1000)
  }

  getSessionData() {
    return {
      sessionId: this.sessionId,
      duration: this.getSessionDuration(),
      userName: this.userName,
      sectionTimings: this.getSectionTimings(),
      eventCount: this.events.length,
      responses: Object.fromEntries(this.userResponses),
    }
  }
}

export const analyticsTracker = new AnalyticsTracker()
