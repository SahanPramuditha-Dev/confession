// Bilingual content — Sinhala (default) and English
// Usage: t(lang, 'key') or t(lang, 'key', { name: '...' })

export type Lang = 'si' | 'en'

export const translations = {
  // ── Loading Screen ───────────────────────────────────────────────
  loading_line1: {
    si: 'සමහර කතා ආරම්භ වෙන්නෙ අවුරුදු ගණනාවක් ගිය පසුව...',
    en: 'Some stories begin after years of waiting...',
  },
  loading_line2: {
    si: 'ඒත් සමහර කතා... එකම එක මොහොතකින් හිතේ ලියවෙනවා.',
    en: 'But some stories... are written in the heart in a single moment.',
  },

  // ── Hero Screen ───────────────────────────────────────────────
  hero_title: {
    si: 'එක් හමුවීමක්...',
    en: 'One Beautiful Encounter',
  },
  hero_sub: {
    si: 'සමහරවිට ජීවිතයක් වෙනස් කරන්නෙ කාලය නෙමෙයි... එක පුංචි මොහොතක්.',
    en: 'Sometimes it is not time that changes a life... but one beautiful moment.',
  },
  hero_button: {
    si: 'මේ කතාව අරඹන්න →',
    en: 'Begin This Story →',
  },

  // ── Name Screen ───────────────────────────────────────────────
  name_prompt: {
    si: 'මේ පුංචි කතාව ලියවුණේ ඔයා වෙනුවෙන්මයි.',
    en: 'This little story was written just for you.',
  },
  name_sub: {
    si: 'ඔයාගේ නම කියන්න... මේ මොහොත අපි දෙන්නා අතරේ පුංචි රහසක් වේවි.',
    en: 'Tell me your name... this moment will stay as a little secret between us.',
  },
  name_placeholder: {
    si: 'ඔයාගේ නම...',
    en: 'Your name...',
  },
  name_continue: {
    si: 'ඉදිරියට →',
    en: 'Continue →',
  },

  // ── Date Entry Screen ───────────────────────────────────────────────
  date_hint_0: {
    si: (name: string) => `${name}, ඒ විශේෂ දවස තාමත් මතකද...`,
    en: (name: string) => `${name}, do you still remember that special day...`,
  },
  date_hint_1: {
    si: 'අපි මුලින්ම හමු වූ ඒ මොහොත මතක් කරගන්න...',
    en: 'Think back to the moment we first met...',
  },
  date_hint_2: {
    si: 'දින ගණනට වඩා... ඒ හැඟීම වැදගත් 🤍',
    en: 'More than the date... the feeling is what matters 🤍',
  },

  // ── Chapter 1 ───────────────────────────────────────────────
  ch1_line1: {
    si: 'අපි හමු වුණේ එකම එක වතාවක් විතරයි.',
    en: 'We have only met once.',
  },
  ch1_line2: {
    si: 'ඔයා ගැන මම තාම ගොඩක් දේවල් දන්නෙ නැහැ.',
    en: 'I still do not know many things about you.',
  },
  ch1_line3: {
    si: 'ඔයාටත් මාව තාම හඳුනන්නෙ නැතුව ඇති.',
    en: 'You probably do not know much about me either.',
  },
  ch1_button: {
    si: 'ඊළඟට →',
    en: 'Next →',
  },

  // ── Chapter 2 ───────────────────────────────────────────────
  ch2_intro: {
    si: 'ඒ කෙටි හමුවීම ඇතුළේ... අදටත් මතකයේ රැඳුණු පුංචි මොහොතවල් තිබුණා.',
    en: 'Within that short meeting... there were little moments I still carry with me.',
  },
  ch2_button: {
    si: 'ඉදිරියට →',
    en: 'Continue →',
  },

  // ── Timeline Cards ───────────────────────────────────────────────
  timeline_1: {
    si: 'ඔයාව දැකපු ඒ දවස.',
    en: 'The day I saw you.',
  },
  timeline_2: {
    si: 'ඒ මොහොත ගැන හිතන එක නවත්තන්න බැරි වුණා.',
    en: "I couldn't stop thinking about that moment.",
  },
  timeline_3: {
    si: 'මේ හැඟීම නිහඬව තියාගෙන යන්නද කියලා හිතුණා.',
    en: 'I wondered if I should simply walk away.',
  },
  timeline_4: {
    si: 'ඒත් අවංකකම පසුතැවිල්ලට වඩා ලස්සනයි කියලා මට හිතුණා.',
    en: 'But I decided honesty is better than regret.',
  },

  // ── Chapter 3 ───────────────────────────────────────────────
  ch3_title: {
    si: (name: string) => `${name}...`,
    en: (name: string) => `${name}...`,
  },
  ch3_line1: {
    si: 'මට ඔයාට කියන්න හිතුණු දෙයක් තියෙනවා.',
    en: 'There is something I have been meaning to tell you.',
  },
  ch3_line2: {
    si: 'අපි හමු වුණේ එකම එක දවසක් විතරයි...',
    en: 'We only met for a single day...',
  },
  ch3_line3: {
    si: 'ඒත් ඒ මොහොත,\nනොදැනීම මගේ මතකයේ ලස්සන තැනක් අරගෙන.',
    en: 'But that moment,\nwithout me realising, took a beautiful place in my memory.',
  },
  ch3_line4: {
    si: 'හිත කියන දේ,\nහැමදාම නිහඬව හංගගෙන ඉන්න බැරි බව\nඅද මට තේරුණා.',
    en: 'What the heart feels,\ncannot always stay hidden in silence.\nToday I finally understood that.',
  },
  ch3_italic: {
    si: 'සමහර හමුවීම් කෙටි වෙන්න පුළුවන්...\nඒත් ඒවා හදවතේ ලියවෙන මතක කවදාවත් කෙටි වෙන්නෙ නැහැ.',
    en: 'Some meetings may be brief...\nbut the memories they write in the heart are never short.',
  },
  ch3_button: {
    si: 'ඊළඟ රහස →',
    en: "Open what's next →",
  },

  // ── Envelope / Inside Letter ──────────────────────────────────────────────
  letter_line1: {
    si: 'ඔයාව දැකලා තියෙන්නේ එකම එක වතාවක් විතරයි...',
    en: 'I have only seen you once...',
  },
  letter_line2: {
    si: 'සමහරවිට මේක ඔයාට පුදුමයක් වෙන්න පුළුවන්...',
    en: 'Maybe this comes as a surprise...',
  },
  letter_line3: {
    si: 'ඒත් ඒ හමුවීම මගේ හිතේ පුංචි ලස්සන මතකයක් වුණා.',
    en: 'But that meeting became a beautiful little memory in my heart.',
  },
  letter_line4: {
    si: 'ඔයාව තවත් හඳුනාගන්න... ඔයා සමඟ තවත් මතක හදන්න අවස්ථාවක් ලැබුණොත් ඒක මට ගොඩක් වටිනවා.',
    en: 'If I get the chance to know you better... and create more memories with you, it would mean a lot to me.',
  },
  letter_closing: {
    si: 'හදවතින්ම...',
    en: 'With all my heart...',
  },

  // ── Reveal ───────────────────────────────────────────────
  reveal_line1: {
    si: 'මේ හැම වචනයක්ම...\nමේ හැම මතකයක්ම...',
    en: 'Every word in this story...\nEvery memory shared here...',
  },
  reveal_line2: {
    si: 'අන්තිමේදී ලියවුණේ එකම එක් කෙනෙක් වෙනුවෙන්.',
    en: 'Was written for one single person.',
  },
  reveal_name: {
    si: (name: string) => `${name}... ඒ ඔයා. ❤️`,
    en: (name: string) => `${name}... it was you. ❤️`,
  },
  reveal_button: {
    si: 'ඉදිරියට →',
    en: 'Continue →',
  },

  // ── Memory Scene ───────────────────────────────────────────────
  memory_label: {
    si: 'හිතේ රැඳුණු මතකයක්',
    en: 'A memory worth keeping',
  },
  memory_days: {
    si: (days: number) =>
      `ඒ මොහොතෙන් අදට දින ${days}ක් ගෙවිලා.`,
    en: (days: number) =>
      `${days} days have passed since that moment.`,
  },
  memory_days_sub: {
    si: 'කාලය ඉක්මන්ව ගියා...\nඒත් ඒ හමුවීමේ මතකය තාමත් හිතේ අලුත්ම මතකයක් වගේ.',
    en: 'Time flew by...\nBut the memory of that meeting still feels like it just happened.',
  },
  memory_body: {
    si: 'ඔයාගේ සිනහව...\nඔයා කතා කළ විදිහ...\nඒ පුංචි හමුවීම...\n\nනොදැනීම මගේ හිතේ ලස්සන තැනක් අරගෙන.',
    en: 'Your smile...\nThe way you spoke...\nThat little meeting...\n\nWithout me realising, it took a beautiful place in my heart.',
  },
  memory_question: {
    si: 'මේ හැඟීම ඔයාත් එක්ක බෙදාගන්න...\nපුංචි අවස්ථාවක් දෙන්න කැමතිද?',
    en: 'Would you like to give this feeling a little chance...\nto be shared with you?',
  },
  memory_button: {
    si: 'හිත කියන දේ කියන්න →',
    en: 'Speak from the heart →',
  },

  // ── Response Screen ───────────────────────────────────────────────
  response_prompt: {
    si: 'ඔයාගේ හිතේ තියෙන දේ මට කියන්න...',
    en: 'Tell me what your heart truly feels...',
  },
  response_sub: {
    si: 'මේ හැම වචනයක්ම ලිව්වේ අවංක හිතකින්.\nඔයාගේ පිළිතුර මොන විදිහේ වුණත්,\nඒක මම ගෞරවයෙන් භාරගන්නවා.',
    en: 'Every word here was written with an honest heart.\nWhatever your answer may be,\nI will accept it with respect.',
  },
  response_yes: {
    si: '💙 ඔව්... මට ඔයාව හඳුනාගන්න පුංචි අවස්ථාවක් දෙන්න කැමතියි.',
    en: '💙 Yes... I would like the chance to know you better.',
  },
  response_thanks: {
    si: '🤍 ස්තූතියි... මේ හැඟීම කියවලා, මගේ හිත තේරුම් ගන්න උත්සාහ කළාට.',
    en: '🤍 Thank you... for reading this and trying to understand my heart.',
  },
  response_time: {
    si: '🌼 මට තව ටිකක් කාලය ඕනේ...',
    en: '🌼 I need a little more time...',
  },

  // ── Response Replies ──────────────────────────────────────────────────────
  reply_yes: {
    si: 'ඔයාගේ "ඔව්" කියන එක...\nමගේ හිතට ලැබුණු ලස්සනම පිළිතුර.\n\nමේ හැඟීමට පුංචි අවස්ථාවක් දුන්නට\nහදවතින්ම ස්තූතියි. ❤️',
    en: 'Your "yes"...\nis the most beautiful answer my heart has ever received.\n\nThank you from the bottom of my heart\nfor giving this feeling a chance. ❤️',
  },
  reply_thanks: {
    si: 'මේ තරම් දුර කියවලා,\nමගේ හිත තේරුම් ගන්න උත්සාහ කළාට...\nහදවතින්ම ස්තූතියි. 🤍',
    en: 'For reading this far,\nfor trying to understand my heart...\nthank you, truly. 🤍',
  },
  reply_time: {
    si: 'ඔයාට ඕනේ තරම් කාලය ගන්න.\nමේ හැඟීම ඉක්මන්ව යන එකක් නෙමෙයි.\n\nඔයා ගැන සැලකිල්ලෙන්... ❤',
    en: 'Take all the time you need.\nThis feeling is not going anywhere.\n\nTake care of yourself... ❤',
  },
  whatsapp_button: {
    si: 'WhatsApp හරහා කතා කරන්න 💬',
    en: 'Message on WhatsApp 💬',
  },

  // ── Love Letter (correct date) ────────────────────────────────────────────
  letter_correct_title: {
    si: 'ඔයා ඒ දිනය මතක තියාගත්තා...',
    en: 'You Remembered It...',
  },
  letter_correct_body1: {
    si: (name: string) =>
      `${name}, ඔයා ඒ දිනය මතක තියාගෙන ඉන්නවා කියලා දැනගත්තම... මගේ හිතට දැනුණු සතුට වචනවලින් කියන්න බැහැ.`,
    en: (name: string) =>
      `${name}, knowing that you remembered that day... fills my heart with a joy I cannot put into words.`,
  },
  letter_correct_body2: {
    si: (days: number) =>
      `ඒ මොහොතෙන් දින ${days}ක් ගෙවිලා...\nඒත් ඒ හැඟීම තාමත් ඊයේ වගේ.`,
    en: (days: number) =>
      `${days} days have passed since that moment...\nyet it still feels like yesterday.`,
  },
  letter_correct_closing1: {
    si: 'පුංචි දිනයක්... ඒත් ලස්සන මතකයක්.',
    en: 'A little date... carrying a beautiful memory.',
  },
  letter_correct_closing2: {
    si: 'සමහර මොහොත නිහඬ වුණත්... ඒවා හදවතේ හැමදාම රැඳෙනවා.',
    en: 'Some moments are quiet... but they stay in the heart forever.',
  },
  letter_correct_closing3: {
    si: 'ඒ දිනය මතක තියාගත්ත ඔයාට... හදවතින්ම ස්තූතියි ❤️',
    en: 'For remembering that day... thank you from my heart ❤️',
  },

  // ── Love Letter (wrong date) ──────────────────────────────────────────────
  letter_wrong_title: {
    si: 'ඒක හරි... කිසි ගැටළුවක් නැහැ ❤️',
    en: "That's perfectly okay ❤️",
  },
  letter_wrong_body1: {
    si: (name: string) =>
      `${name}, ඉලක්කම් ටිකක් වෙනස් වුණත්... මේ මොහොතේ අදහස කිසිදාකවත් වෙනස් වෙන්නෙ නැහැ.`,
    en: (name: string) =>
      `${name}, even if the numbers were a little different... the meaning of this moment will never change.`,
  },
  letter_wrong_body2: {
    si: 'සමහර මතක දින දර්ශනවල ලියවෙන්නෙ නැහැ...\nඒවා හදවතේ ලියවෙනවා ✨',
    en: "Some memories aren't written in calendars...\nthey are written in the heart ✨",
  },
  letter_wrong_closing: {
    si: 'අපේ මේ පුංචි ගමන... එකට ඉදිරියට.',
    en: "Let's continue this little journey... together.",
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
