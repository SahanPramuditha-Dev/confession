// Personalization Configuration
// The date when you first met
export const FIRST_MEETING_DATE = new Date('2026-07-05') // July 5, 2026

// Feature Flags
export const ENABLE_EASTER_EGGS = true
export const ENABLE_SHOOTING_STARS = true
export const ENABLE_MUSIC = true
export const ENABLE_PARTICLE_EFFECTS = true

// Constellation Meanings
export const CONSTELLATION_MEANINGS: Record<number, string> = {
  0: 'The first moment I saw you',
  1: 'Your smile that changed everything',
  2: 'The courage to say hello',
  3: 'Laughter that felt like home',
  4: 'A connection beyond words',
  5: 'The magic of being understood',
  6: 'Hope for something beautiful',
  7: 'A moment frozen in time',
}

// Message Templates
export const MESSAGES = {
  loading: 'Connecting to a memory...',
  hero: 'One Encounter',
  chapter1:
    'It started with a single moment. Not in the grand, sweeping way that stories are told, but in the quiet, profound way that changes everything.',
  chapter2:
    'Each memory is a star in our sky. Click them to discover what they mean to me.',
  envelope:
    "I wanted to tell you something. Something that I've been carrying since that day we met.",
  finalReveal: (name: string) =>
    `${name}, you changed my life in a way I never expected. And I&apos;m grateful for every moment we&apos;ve shared.`,
  yesResponse: (name: string) =>
    `${name}, I was hoping you&apos;d say yes. The thought of getting to know you better makes my heart race.`,
  maybeResponse: (name: string) =>
    `${name}, I understand. There&apos;s no rush. But I want you to know that the possibility of you and me matters to me.`,
  noResponse: (name: string) =>
    `${name}, I respect that. Thank you for being honest. You&apos;ll always be a beautiful memory for me.`,
}

// Timeline Events
export const TIMELINE_EVENTS = [
  {
    title: 'First Encounter',
    description: 'The moment everything changed',
    color: '#FF4D6D',
  },
  {
    title: 'Getting Closer',
    description: 'When I realized how special you are',
    color: '#9D4EDD',
  },
  {
    title: 'A Turning Point',
    description: 'The day I decided to reach out',
    color: '#FFD166',
  },
]
