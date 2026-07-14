import { FieldValue, Timestamp, type DocumentData } from 'firebase-admin/firestore'
import { getAdminDb } from './firebase-admin'

function serializeDoc(id: string, data: DocumentData) {
  const result: Record<string, unknown> = { id, ...data }
  if (data.created_at instanceof Timestamp) {
    result.created_at = data.created_at.toDate().toISOString()
  }
  return result
}

// ─── Simple submission tracking (the only data we care about) ─────────────────

export async function upsertSubmission(
  sessionId: string,
  fields: {
    name?: string | null
    date?: string | null
    answer?: string | null
    whatsappClicked?: boolean
  }
) {
  try {
    const db = getAdminDb()
    if (!db) return

    const ref = db.collection('submissions').doc(sessionId)
    const existing = await ref.get()

    if (!existing.exists) {
      await ref.set({
        name: fields.name ?? null,
        date: fields.date ?? null,
        answer: fields.answer ?? null,
        whatsappClicked: fields.whatsappClicked ?? false,
        submittedAt: FieldValue.serverTimestamp(),
      })
    } else {
      const updates: Record<string, unknown> = {}
      if (fields.name !== undefined) updates.name = fields.name
      if (fields.date !== undefined) updates.date = fields.date
      if (fields.answer !== undefined) updates.answer = fields.answer
      if (fields.whatsappClicked !== undefined) updates.whatsappClicked = fields.whatsappClicked
      await ref.update(updates)
    }
  } catch (error) {
    console.error('[DB] Error saving submission:', error)
  }
}

// ─── Stubs kept so existing API routes don't break ────────────────────────────
// These do nothing — all meaningful data now goes through upsertSubmission.

export async function createVisitorSession() {
  // no-op
}

export async function recordEvent() {
  // no-op — we no longer track analytics events in Firestore
}

export async function recordResponse(
  sessionId: string,
  _question: string,
  answer: string,
  meta?: { userName?: string | null; enteredDate?: string | null; selection?: string | null; whatsappClicked?: boolean }
) {
  await upsertSubmission(sessionId, {
    name: meta?.userName ?? null,
    date: meta?.enteredDate ?? null,
    answer: meta?.selection ?? answer,
    whatsappClicked: meta?.whatsappClicked ?? false,
  })
}

export async function recordDateEntry(
  sessionId: string,
  enteredDate: string,
  _isCorrect: boolean
) {
  await upsertSubmission(sessionId, { date: enteredDate })
}

export async function markStoryCompleted(sessionId: string, finalResponse: string) {
  await upsertSubmission(sessionId, { answer: finalResponse })
}

export async function updateSessionUser(sessionId: string, userName: string) {
  await upsertSubmission(sessionId, { name: userName })
}

export async function recordWhatsappClick(sessionId: string) {
  await upsertSubmission(sessionId, { whatsappClicked: true })
}

// ─── Admin read helpers ───────────────────────────────────────────────────────

export async function getVisitorStats() {
  try {
    const db = getAdminDb()
    if (!db) return null
    const snapshot = await db.collection('submissions').get()
    const total = snapshot.size
    const withAnswer = snapshot.docs.filter((d) => d.data().answer).length
    return { total_visitors: total, completed_stories: withAnswer }
  } catch (error) {
    console.error('[DB] Error getting stats:', error)
    return null
  }
}

export async function getRecentResponses(limit = 20) {
  try {
    const db = getAdminDb()
    if (!db) return []
    const snapshot = await db
      .collection('submissions')
      .orderBy('submittedAt', 'desc')
      .limit(limit)
      .get()
    return snapshot.docs.map((doc) => serializeDoc(doc.id, doc.data()))
  } catch (error) {
    console.error('[DB] Error getting responses:', error)
    return []
  }
}

export async function getAllSessions(limit = 100) {
  return getRecentResponses(limit)
}

export async function getSessionDetail(sessionId: string) {
  try {
    const db = getAdminDb()
    if (!db) return null
    const doc = await db.collection('submissions').doc(sessionId).get()
    if (!doc.exists) return null
    return serializeDoc(doc.id, doc.data()!)
  } catch (error) {
    console.error('[DB] Error getting session detail:', error)
    return null
  }
}

