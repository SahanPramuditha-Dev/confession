// Bilingual content — Sinhala (default) and English
// Sinhala is written as intimate, poetic prose — NOT translated from English.
// Uses "ඔයා" (intimate) not "ඔබ" (formal). Short sentences. Natural pauses (…).

export type Lang = 'si' | 'en'

export const translations = {

  // ── Loading Screen ────────────────────────────────────────────────────────
  loading_line1: {
    si: 'සමහර කතා ලියවෙන්නේ අවුරුදු ගණනාවක් ගිය පසුවයි...',
    en: 'Some stories begin with years.',
  },
  loading_line2: {
    si: 'ඒත් සමහර කතා... එකම එක මොහොතකින් හිතේ ලියවෙනවා.',
    en: 'Some begin with a single moment.',
  },

  // ── Hero Screen ───────────────────────────────────────────────────────────
  hero_title: {
    si: 'එක් හමුවීමක් නිසා...',
    en: 'One Encounter',
  },
  hero_sub: {
    si: 'සමහරවිට... එකම එක හමුවීමක් ජීවිතයක්ම වෙනස් කරන්න ප්‍රමාණවත් වෙනවා.',
    en: 'Sometimes one meeting is enough to change everything.',
  },
  hero_button: {
    si: 'ඉදිරියට යමු →',
    en: 'Begin →',
  },

  // ── Name Screen ───────────────────────────────────────────────────────────
  name_prompt: {
    si: 'මේ කතාව ලියවුණේ ඔයා වෙනුවෙන්මයි.',
    en: 'This story was written for you.',
  },
  name_sub: {
    si: 'ඔයාගේ නම කියන්න... මේ රහස අපි දෙන්නා අතරම තියේවි.',
    en: 'Just your name — this stays between us.',
  },
  name_placeholder: {
    si: 'ඔයාගේ නම...',
    en: 'Your first name…',
  },
  name_continue: {
    si: 'ඉදිරියට →',
    en: 'Continue →',
  },

  // ── Date Entry Screen ─────────────────────────────────────────────────────
  date_hint_0: {
    si: (name: string) => `${name}... ඒ දිනය ඔයාට විතරයි මතක ඇත්තේ.`,
    en: (name: string) => `${name}, only you would remember this date…`,
  },
  date_hint_1: {
    si: 'අපි මුල්ම වතාවට හමු වුණ දිනය... ඒ ගැන හිතන්න.',
    en: 'Think of the day we first met…',
  },
  date_hint_2: {
    si: 'ඉලක්කම්වලට වඩා ඒ හැඟීම වැදගත් 🤍',
    en: 'The feeling matters more than the numbers 🤍',
  },

  // ── Chapter 1 ─────────────────────────────────────────────────────────────
  ch1_line1: {
    si: 'අපි හමු වුණේ එකම එක වතාවක් විතරයි.',
    en: "We've only crossed paths once.",
  },
  ch1_line2: {
    si: 'ඔයා ගැන මම තාම ගොඩක් දේවල් දන්නේ නැහැ.',
    en: "I don't know much about you.",
  },
  ch1_line3: {
    si: 'ඔයාටත් මාව තාම හඳුනන්නේ නැතුව ඇති.',
    en: "You probably don't know me either.",
  },
  ch1_button: {
    si: 'ඊළඟට →',
    en: 'Next →',
  },

  // ── Chapter 2 ─────────────────────────────────────────────────────────────
  ch2_intro: {
    si: 'ඒ එකම හමුවීම ඇතුළේ... අදටත් මතකයේ රැඳුණු පුංචි මොහොත කිහිපයක් තිබුණා.',
    en: 'In that one meeting, there were small moments about you I still think about.',
  },
  ch2_button: {
    si: 'ඉදිරියට →',
    en: 'Continue →',
  },

  // ── Chapter 3 ─────────────────────────────────────────────────────────────
  ch3_title: {
    si: (name: string) => `${name}... ඔයාට කියන්න ඕනේ දෙයක් තියෙනවා.`,
    en: (name: string) => `${name}, I need to tell you something.`,
  },
  ch3_body: {
    si: 'මගේ හිතේ තියෙන හැඟීම ඇත්තක්. ඔයා ගැන මට දැනෙන දේ ඇත්තක්. තවත් ඒ හැඟීම හිත ඇතුළේ සඟවාගෙන ඉන්න බැහැ.',
    en: "What I feel is real. What I see in you is real. I couldn't keep it to myself any longer.",
  },
  ch3_italic: {
    si: 'ඔයා... මට ගොඩාක් වැදගත්.',
    en: 'This moment matters. You matter deeply.',
  },
  ch3_button: {
    si: 'ඊළඟ රහස →',
    en: "Open what's next →",
  },

  // ── Envelope / Inside Letter ──────────────────────────────────────────────
  letter_line1: {
    si: 'ඔයාව දැකලා තියෙන්නේ එකම එක වතාවක් විතරයි.',
    en: "I've only seen you that once.",
  },
  letter_line2: {
    si: 'සමහරවිට ඒ ඉක්මන්. සමහරවිට ඔයාට ඒ දැනෙනවාත් ඇති.',
    en: 'Maybe this feels unexpected. Maybe too soon.',
  },
  letter_line3: {
    si: 'ඒත් ඔයාව හමුවීම මගේ ජීවිතයට දැනුණු ඒ පුංචි වෙනස... ඒ ගැන කිසිම දිනෙක නිහඬව ඉන්න බැහැ.',
    en: 'But the way meeting you touched my life — I could never stay silent about that.',
  },
  letter_line4: {
    si: 'ඔයාව තේරුම් ගන්නට, ඔයා ළඟ ඉන්නට... ඒ අවස්ථාව ඉල්ලීම ගැන ලජ්ජාවක් නැහැ.',
    en: "I'd genuinely love the chance to know you better.",
  },
  letter_closing: {
    si: 'ඇත්ත හදවතකින්',
    en: 'with all my honesty',
  },

  // ── Reveal ────────────────────────────────────────────────────────────────
  reveal_line1: {
    si: 'මේ විශේෂ කතාව ලියවුණේ...',
    en: 'The person this was written for…',
  },
  reveal_name: {
    si: (name: string) => `ඒ ඔයා, ${name}.`,
    en: (name: string) => `${name}, it's you.`,
  },
  reveal_button: {
    si: 'ඉදිරියට →',
    en: 'Continue →',
  },

  // ── Memory Scene ──────────────────────────────────────────────────────────
  memory_label: {
    si: 'හිතේ රැඳුණු මතකයක්',
    en: 'A memory worth keeping',
  },
  memory_days: {
    si: (days: number) =>
      `ඒ මොහොතෙන් දිනකි ${days}ක් ගෙවිලා... ඒත් ඔයා ගැන හිතන එක තාමත් නතර වෙලා නැහැ.`,
    en: (days: number) =>
      `${days} days have passed since that moment — yet thinking of you never stopped.`,
  },
  memory_body: {
    si: 'ඒ දවසෙ ඉඳලා... සෑම රෑකම ඔයා ගැන හිතෙනවා. ඒ හමුවීම, ඔය ඇස් දෙක, ඔයා කතා කළ විදිය.',
    en: 'Every day since then, I thought about you — that meeting, those eyes, the way you spoke.',
  },
  memory_question: {
    si: '"... ඔය හැඟීමට ඉඩ දෙන්න ඔයා කැමතිද?"',
    en: '"Would you like to explore this connection with me?"',
  },
  memory_button: {
    si: 'ඔයාගේ හිතේ ඇත්ත →',
    en: 'Answer gently →',
  },

  // ── Response Screen ───────────────────────────────────────────────────────
  response_prompt: {
    si: 'ඔයාගේ හිතේ ඇත්ත කුමක්ද?',
    en: 'What does your heart say?',
  },
  response_sub: {
    si: 'ඕනෑම තේරීමක් හරි — ඔයා තමයි ඒ.',
    en: 'No pressure — whatever you feel is perfectly okay.',
  },
  response_yes: {
    si: '💙 ඔව්, ඔයාව හඳුනගන්නට කැමතියි',
    en: "💙 I'd like to get to know you",
  },
  response_thanks: {
    si: '🤍 ඔයාගේ ධෛර්යය ගැන ස්තූතියි',
    en: '🤍 Thank you for telling me this',
  },
  response_time: {
    si: '🌼 මට ටිකක් කාලය ඕනේ',
    en: '🌼 I need a little time',
  },

  // ── Response Replies ──────────────────────────────────────────────────────
  reply_yes: {
    si: 'ඔයාගේ "ඔව්"... ඒ වචනය මගේ ජීවිතේ ළඟම ළඟා. ඇත්තෙන්ම ස්තූතියි.',
    en: 'Your yes — it means the world to me. Thank you, truly.',
  },
  reply_thanks: {
    si: 'ඔයා මේ සියල්ල කියෙව්වා... ඒ තමයි ගොඩාකට වඩා වටින දේ. ස්තූතියි.',
    en: 'The fact that you read all of this means so much. Thank you for your time.',
  },
  reply_time: {
    si: 'ඒ කාලය ඔයාට ඕනේ තරම් ගන්න. ඔයා ගැන හොඳින් ඉන්න. ❤',
    en: 'All the time you need is yours. Take care of yourself. ❤',
  },
  whatsapp_button: {
    si: 'WhatsApp එකෙන් කතා කරමු 💬',
    en: 'Message on WhatsApp 💬',
  },

  // ── Love Letter (correct date) ────────────────────────────────────────────
  letter_correct_title: {
    si: 'ඔයා ඒ දිනය මතකයේ රැකගත්තා',
    en: 'You Remembered It',
  },
  letter_correct_body1: {
    si: (name: string) =>
      `${name}... ඔයා ඒ දිනය මතකයේ රැකගෙන හිටියා කියන එකෙන් මට ඕනේ දේ ඔක්කොම කිව්වා.`,
    en: (name: string) =>
      `${name}, the fact that you remembered tells me everything I need to know.`,
  },
  letter_correct_body2: {
    si: (days: number) =>
      `ඒ ඉඳලා දිනකි ${days}ක් ගෙවිලා... ඒත් ඒ මොහොත හිතෙන්නේ ඊයේ වගේ.`,
    en: (days: number) =>
      `${days} days have passed, yet that moment still feels like yesterday.`,
  },
  letter_correct_closing1: {
    si: 'ඒ පුංචි දිනය රැගෙන... ලස්සන මතකයක් ගෙනාවා.',
    en: 'A little date carrying a beautiful memory.',
  },
  letter_correct_closing2: {
    si: 'සමහර මොහොත නිහඬව ශ්‍රේෂ්ඨ වෙනවා... ඒ ශ්‍රේෂ්ඨකම ගෙනාවේ ඔයා.',
    en: 'Some moments are quietly extraordinary. You made this one.',
  },
  letter_correct_closing3: {
    si: 'ඒ දිනය මතකයේ රැකගත්ත ඔයාට ස්තූතියි',
    en: 'Thank you for remembering',
  },

  // ── Love Letter (wrong date) ──────────────────────────────────────────────
  letter_wrong_title: {
    si: 'ගැටළුවක් නැහැ... ❤',
    en: "That's Okay ❤",
  },
  letter_wrong_body1: {
    si: (name: string) =>
      `${name}... ඉලක්කම් ටිකක් වෙනස් වුණත් — මේ මොහොතේ අර්ථය කිසිදිනෙකත් වෙනස් වෙන්නේ නැහැ.`,
    en: (name: string) =>
      `${name}, the numbers may have been a little different — but the meaning here never changes.`,
  },
  letter_wrong_body2: {
    si: 'සමහර මතක දිනදර්ශනෙ රදන්නේ නැහැ... ඒවා හිතේ රදනවා ✨',
    en: "Some memories aren't kept in calendars... they live in our hearts ✨",
  },
  letter_wrong_closing: {
    si: 'මේ ගමන ඉදිරියට... ඔයා එක්ක.',
    en: "Let's continue this journey — together",
  },

} as const

// Helper function
export function t(lang: Lang, key: keyof typeof translations, arg?: string | number): string {
  const val = translations[key][lang]
  if (typeof val === 'function') {
    // @ts-expect-error dynamic call
    return val(arg ?? '')
  }
  return val as string
}
