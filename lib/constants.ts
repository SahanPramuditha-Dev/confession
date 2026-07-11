// Personalization Configuration
export const FIRST_MEETING_DATE = new Date('2026-07-05')

export const WHATSAPP_NUMBER = '94764158980'
export const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I read your little website and it made me smile 😊'
)

export const SITE_TITLE = 'One Encounter'
export const SITE_DESCRIPTION =
  'A quiet, cinematic story about a single moment that stayed with someone.'

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

export const MESSAGES = {
  loading: 'Some stories begin with years.',
  loadingSub: 'Some begin with a single moment.',
  hero: 'One Encounter',
  heroSub: 'Sometimes one meeting is enough to make someone unforgettable.',
  namePrompt: 'This story is written for one person.',
  namePlaceholder: 'Your first name…',
  dateHint: 'When did we first meet? (YYYYMMDD)',
  chapter1:
    "We've only crossed paths once. I don't know much about you. You probably don't know me either.",
  chapter2: 'Each memory is a little star. Tap them to see what they mean to me.',
  chapter3:
    'But I needed to tell you. What I feel is real. What I see in you is real.',
  envelope: 'I wanted to tell you something I have been carrying since that day.',
  finalReveal: (name: string) => `${name}, it's you.`,
  memoryIntro: (days: number) =>
    `${days} days have passed since that moment — and I still think about it.`,
  responsePrompt: "Only if you're comfortable…",
  yesResponse: 'Thank you. That truly made my day.',
  thanksResponse: 'I appreciate you taking the time to read this.',
  timeResponse: 'Take all the time you need. Thank you for reading.',
}

export const TIMELINE_EVENTS = [
  {
    title: 'First Encounter',
    description: 'The moment everything changed',
    color: '#FFB7B2',
  },
  {
    title: 'Getting Closer',
    description: 'When I realized how special you are',
    color: '#E2D1F9',
  },
  {
    title: 'A Turning Point',
    description: 'The day I decided to reach out',
    color: '#FFE5B4',
  },
]

export const TRANSITION_MS = 600
