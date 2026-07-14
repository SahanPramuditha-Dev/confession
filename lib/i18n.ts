// Bilingual content — Sinhala (default) and English
// Usage: t(lang, 'key') or t(lang, 'key', { name: '...' })

export type Lang = 'si' | 'en'

export const translations = {
  // ── Loading Screen ────────────────────────────────────────────────────────
  loading_line1: {
    si: 'සමහර කතා ගත ගණනාවකින් ආරම්භ වේ.',
    en: 'Some stories begin with years.',
  },
  loading_line2: {
    si: 'සමහර ඒවා එක් මොහොතකින් ආරම්භ වේ.',
    en: 'Some begin with a single moment.',
  },

  // ── Hero Screen ───────────────────────────────────────────────────────────
  hero_title: {
    si: 'එක් හමුවීමකින්',
    en: 'One Encounter',
  },
  hero_sub: {
    si: 'සමහරවිට එකම හමුවීමකින් ජීවිතය වෙනස් වෙයි.',
    en: 'Sometimes one meeting is enough to change everything.',
  },
  hero_button: {
    si: 'ආරම්භ කරන්න →',
    en: 'Begin →',
  },

  // ── Name Screen ───────────────────────────────────────────────────────────
  name_prompt: {
    si: 'මෙම කතාව ලියා ඇත්තේ ඔබ වෙනුවෙනි.',
    en: 'This story was written for you.',
  },
  name_sub: {
    si: 'ඔබේ නම කියන්න — එය අප අතරේ රහසක් ලෙස රැදේ.',
    en: 'Just your name — this stays between us.',
  },
  name_placeholder: {
    si: 'ඔබේ නම…',
    en: 'Your first name…',
  },
  name_continue: {
    si: 'ඉදිරියට →',
    en: 'Continue →',
  },

  // ── Date Entry Screen ─────────────────────────────────────────────────────
  date_hint_0: {
    si: (name: string) => `${name}, ඒ විශේෂ දිනය ඔබ තනිව දන්නවා…`,
    en: (name: string) => `${name}, only you would remember this date…`,
  },
  date_hint_1: {
    si: 'අපි මුලින්ම හමු වූ දිනය මතක් කර ගන්න…',
    en: 'Think of the day we first met…',
  },
  date_hint_2: {
    si: 'ඔය හැඟීම ඉලක්කම්වලට වඩා වැදගත් 🤍',
    en: 'The feeling matters more than the numbers 🤍',
  },

  // ── Chapter 1 ─────────────────────────────────────────────────────────────
  ch1_line1: {
    si: 'අපි හමු වූයේ එක් වරක් පමණකි.',
    en: "We've only crossed paths once.",
  },
  ch1_line2: {
    si: 'ඔබ ගැන ගොඩ දේ නොදනිමි.',
    en: "I don't know much about you.",
  },
  ch1_line3: {
    si: 'ඔබත් මා ගැන දන්නේ නැති ඇති.',
    en: "You probably don't know me either.",
  },
  ch1_button: {
    si: 'ඊළඟට →',
    en: 'Next →',
  },

  // ── Chapter 2 ─────────────────────────────────────────────────────────────
  ch2_intro: {
    si: 'ඒ එක් හමුවීම තුළ, ඔබ ගැන සිහිවෙන කුඩා මොහොත් කිහිපයක් තිබේ.',
    en: 'In that one meeting, there were small moments about you I still think about.',
  },
  ch2_button: {
    si: 'ඉදිරියට →',
    en: 'Continue →',
  },

  // ── Chapter 3 ─────────────────────────────────────────────────────────────
  ch3_title: {
    si: (name: string) => `${name}, ඔබට කියන්නේ…`,
    en: (name: string) => `${name}, I need to tell you something.`,
  },
  ch3_body: {
    si: 'මා හදවතේ ඇති හැඟීම සැබෑ ය. ඔබ තුළ පෙනෙන දේ සැබෑ ය. තවදුරටත් රහසේ රෙදා ගෙන ඉන්නට නොහැකිය.',
    en: "What I feel is real. What I see in you is real. I couldn't keep it to myself any longer.",
  },
  ch3_italic: {
    si: 'ඔබ ගැන සිතීම ථීරාගේ ③ :\\nඔබ ඒ ඇමතුමට ළඟා ය.',
    en: 'This moment matters. You matter deeply.',
  },
  ch3_button: {
    si: 'ඊළඟ රහස →',
    en: "Open what's next →",
  },

  // ── Envelope / Inside Letter ──────────────────────────────────────────────
  letter_line1: {
    si: 'ඔබව දැක ඇත්තේ ඔය වරක් පමණකි.',
    en: "I've only seen you that once.",
  },
  letter_line2: {
    si: 'සමහරවිට ඒ කාලෙ ඉක්මන්. සමහරවිට ඔබ ඒකත් දන්නේ නැහැ.',
    en: 'Maybe this feels unexpected. Maybe too soon.',
  },
  letter_line3: {
    si: 'නමුත් ඔබ හමු වීමෙන් ජීවිතයට ලැබිච්ච ස්පර්ශය — ඒ ගැන කිසිදාකවත් නොකියා ඉන්නට නොහැකිය.',
    en: 'But the way meeting you touched my life — I could never stay silent about that.',
  },
  letter_line4: {
    si: 'ඔබව තේරුම් ගන්නට, ඔබ ළඟ ඉන්නට — ඒ අවස්ථාව ඉල්ලන්නට අවාචාරයක් නොවෙयी.',
    en: "I'd genuinely love the chance to know you better.",
  },
  letter_closing: {
    si: 'සියලු අවංකතාවකින්',
    en: 'with all my honesty',
  },

  // ── Reveal ────────────────────────────────────────────────────────────────
  reveal_line1: {
    si: 'මෙම සුවිශේෂ කතාව ලිවීම…',
    en: 'The person this was written for…',
  },
  reveal_name: {
    si: (name: string) => `${name}, ඔබ ය.`,
    en: (name: string) => `${name}, it's you.`,
  },
  reveal_button: {
    si: 'ඉදිරියට →',
    en: 'Continue →',
  },

  // ── Memory Scene ──────────────────────────────────────────────────────────
  memory_label: {
    si: 'රැදී ඇති මතකයක්',
    en: 'A memory worth keeping',
  },
  memory_days: {
    si: (days: number) =>
      `ඒ මොහොතෙන් ${days} දිනක් ගෙවී ඇත — ඒත් ඔබ ගැන සිතීම නතර නොවේ.`,
    en: (days: number) =>
      `${days} days have passed since that moment — yet thinking of you never stopped.`,
  },
  memory_body: {
    si: 'ඒ රාත්‍රියේ සිට සෑම දිනකම ඔබ ගැන සිතිණ — ඒ හමුවීම, ඔය ඇස් දෙක, ඒ ගෙලවා ගිය ස්වරය.',
    en: 'Every day since then, I thought about you — that meeting, those eyes, the way you spoke.',
  },
  memory_question: {
    si: '‟ ඔය හැඟීමට ඉඩ දෙන්නට කැමතිද? "',
    en: '"Would you like to explore this connection with me?"',
  },
  memory_button: {
    si: 'සිතා බලා පිළිතුරු දෙන්න →',
    en: 'Answer gently →',
  },

  // ── Response Screen ───────────────────────────────────────────────────────
  response_prompt: {
    si: 'ඔබේ හදවතේ ඇත්ත කුමක්ද?',
    en: 'What does your heart say?',
  },
  response_sub: {
    si: 'ඕනෑම තේරීමක් හොඳ ය — ඔබ ම තිත් ය.',
    en: 'No pressure — whatever you feel is perfectly okay.',
  },
  response_yes: {
    si: '💙 ඔව්, ඔබව දැන ගන්නට කැමතිය',
    en: "💙 I'd like to get to know you",
  },
  response_thanks: {
    si: '🤍 ඔබේ හදවතේ ධෛර්යය ගැන ස්තූතියි',
    en: '🤍 Thank you for telling me this',
  },
  response_time: {
    si: '🌼 මට ටිකක් කාලය ඕනේ',
    en: '🌼 I need a little time',
  },

  // ── Response Replies ──────────────────────────────────────────────────────
  reply_yes: {
    si: 'ඔබේ ඔව් — ඒ වචනය ෙම් ජීවිතේ ළඟ ම ළගාව ය. ස්තූතියි, ඇත්ත.',
    en: 'Your yes — it means the world to me. Thank you, truly.',
  },
  reply_thanks: {
    si: 'ඔබ ඒ කිව්ව ගමනේ, ෙම් හදවතට ළඟා ය. ඔබ ගේ කාලය ගෙව්ව ගේ ස්තූතියි.',
    en: 'The fact that you read all of this means so much. Thank you for your time.',
  },
  reply_time: {
    si: 'ඒ ඉඩ ඔබට ය. කාලය ගෙව ගන්න, ඔබ ගැන ස්වාමිය. ❤',
    en: 'All the time you need is yours. Take care of yourself. ❤',
  },
  whatsapp_button: {
    si: 'WhatsApp හරහා කතා කරන්න 💬',
    en: 'Message on WhatsApp 💬',
  },

  // ── Love Letter (correct date) ────────────────────────────────────────────
  letter_correct_title: {
    si: 'ඔබ ඒ දිනය මතකයේ රැකගත්තා',
    en: 'You Remembered It',
  },
  letter_correct_body1: {
    si: (name: string) =>
      `${name}, ඔබ ඒ දිනය මතකයේ ඇතිව ගෙන ගිය සේ ෙම් සිත ෙම්ල ී ය — ඔව්, ඔව් ය.`,
    en: (name: string) =>
      `${name}, the fact that you remembered tells me everything I need to know.`,
  },
  letter_correct_body2: {
    si: (days: number) =>
      `ඒ සිට ${days} දිනක් ගෙවිලා — ඒත් ඒ මොහොත හිතෙන සේ, ඊයේ ය.`,
    en: (days: number) =>
      `${days} days have passed, yet that moment still feels like yesterday.`,
  },
  letter_correct_closing1: {
    si: 'ඒ කුඩා දිනය රැගෙන ඒ — ලස්සන මතකයක් ය.',
    en: 'A little date carrying a beautiful memory.',
  },
  letter_correct_closing2: {
    si: 'ඔව් — සමහර මොහොත නිහඬ ලෙස ශ්‍රේෂ්ඨ ය. ඒ ගෙනාවේ ඔබ ය.',
    en: 'Some moments are quietly extraordinary. You made this one.',
  },
  letter_correct_closing3: {
    si: 'ඒ දිනය මතකයේ රැකගත්ත ඔබට ස්තූතියි',
    en: 'Thank you for remembering',
  },

  // ── Love Letter (wrong date) ──────────────────────────────────────────────
  letter_wrong_title: {
    si: 'ඒක හරි, කිසි ගැටළුවක් නෑ ❤',
    en: "That's Okay ❤",
  },
  letter_wrong_body1: {
    si: (name: string) =>
      `${name}, ඉලක්කම් ටිකක් මාරු වූවත් — ෙම් මොහොතේ අදහස වෙනස් නොවේ.`,
    en: (name: string) =>
      `${name}, the numbers may have been a little different — but the meaning here never changes.`,
  },
  letter_wrong_body2: {
    si: 'සමහර මතක දිනදර්ශනවල රදන්නේ නැත — ඒවා හදවත්වල ය ✨',
    en: "Some memories aren't kept in calendars... they live in our hearts ✨",
  },
  letter_wrong_closing: {
    si: 'ඉදිරිය ෙම් ගමනේ — ඔබ හා',
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
