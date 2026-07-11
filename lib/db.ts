import {
  FieldValue,
  Timestamp,
  type DocumentData,
} from 'firebase-admin/firestore'
import { getAdminDb } from './firebase-admin'

function serializeDoc(id: string, data: DocumentData) {
  const result: Record<string, unknown> = { id, ...data }

  if (data.created_at instanceof Timestamp) {
    result.created_at = data.created_at.toDate().toISOString()
  }

  return result
}

export async function createVisitorSession(
  deviceInfo: Record<string, unknown>,
  referrer?: string
) {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  try {
    const db = getAdminDb()
    if (!db) return sessionId

    await db.collection('sessions').doc(sessionId).set({
      visitor_ip: deviceInfo?.ip || 'unknown',
      user_agent: deviceInfo?.userAgent || 'unknown',
      referrer: referrer || null,
      completed: false,
      user_name: null,
      created_at: FieldValue.serverTimestamp(),
    })

    return sessionId
  } catch (error) {
    console.error('[DB] Error creating session:', error)
    return sessionId
  }
}

export async function recordEvent(
  sessionId: string,
  eventType: string,
  section?: string,
  value?: unknown
) {
  try {
    const db = getAdminDb()
    if (!db) return

    await db.collection('analytics_events').add({
      session_id: sessionId,
      event_type: eventType,
      section: section || null,
      data: value || null,
      created_at: FieldValue.serverTimestamp(),
    })
  } catch (error) {
    console.error('[DB] Error recording event:', error)
  }
}

export async function recordResponse(
  sessionId: string,
  question: string,
  answer: string
) {
  try {
    const db = getAdminDb()
    if (!db) return

    await db.collection('responses').add({
      session_id: sessionId,
      question,
      response: answer,
      created_at: FieldValue.serverTimestamp(),
    })
  } catch (error) {
    console.error('[DB] Error recording response:', error)
  }
}

export async function recordDateEntry(
  sessionId: string,
  enteredDate: string,
  isCorrect: boolean
) {
  try {
    const db = getAdminDb()
    if (!db) return

    await db.collection('date_entries').add({
      session_id: sessionId,
      entered_date: enteredDate,
      is_correct: isCorrect,
      created_at: FieldValue.serverTimestamp(),
    })
  } catch (error) {
    console.error('[DB] Error recording date entry:', error)
  }
}

export async function markStoryCompleted(sessionId: string, finalResponse: string) {
  try {
    const db = getAdminDb()
    if (!db) return

    await db.collection('sessions').doc(sessionId).update({
      completed: true,
      final_response: finalResponse,
    })
  } catch (error) {
    console.error('[DB] Error marking story complete:', error)
  }
}

export async function updateSessionUser(sessionId: string, userName: string) {
  try {
    const db = getAdminDb()
    if (!db) return

    await db.collection('sessions').doc(sessionId).update({
      user_name: userName,
    })
  } catch (error) {
    console.error('[DB] Error updating session user:', error)
  }
}

export async function getVisitorStats() {
  try {
    const db = getAdminDb()
    if (!db) return null

    const snapshot = await db.collection('sessions').select('completed').get()
    const total = snapshot.size
    const completed = snapshot.docs.filter((doc) => doc.data().completed).length
    const completionRate = total > 0 ? ((completed / total) * 100).toFixed(2) : 0

    return {
      total_visitors: total,
      completed_stories: completed,
      completion_rate: completionRate,
    }
  } catch (error) {
    console.error('[DB] Error getting stats:', error)
    return null
  }
}

export async function getRecentResponses(limit: number = 20) {
  try {
    const db = getAdminDb()
    if (!db) return []

    const snapshot = await db
      .collection('responses')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .get()

    return snapshot.docs.map((doc) => serializeDoc(doc.id, doc.data()))
  } catch (error) {
    console.error('[DB] Error getting recent responses:', error)
    return []
  }
}

export async function getAllSessions(limit: number = 100) {
  try {
    const db = getAdminDb()
    if (!db) return []

    const snapshot = await db
      .collection('sessions')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .get()

    return snapshot.docs.map((doc) => serializeDoc(doc.id, doc.data()))
  } catch (error) {
    console.error('[DB] Error getting all sessions:', error)
    return []
  }
}

export async function getSessionDetail(sessionId: string) {
  try {
    const db = getAdminDb()
    if (!db) return { session: null, responses: [], dateEntries: [], events: [] }

    const [sessionDoc, responsesSnap, dateEntriesSnap, eventsSnap] = await Promise.all([
      db.collection('sessions').doc(sessionId).get(),
      db.collection('responses').where('session_id', '==', sessionId).get(),
      db.collection('date_entries').where('session_id', '==', sessionId).get(),
      db
        .collection('analytics_events')
        .where('session_id', '==', sessionId)
        .orderBy('created_at', 'asc')
        .get(),
    ])

    return {
      session: sessionDoc.exists ? serializeDoc(sessionDoc.id, sessionDoc.data()!) : null,
      responses: responsesSnap.docs.map((doc) => serializeDoc(doc.id, doc.data())),
      dateEntries: dateEntriesSnap.docs.map((doc) => serializeDoc(doc.id, doc.data())),
      events: eventsSnap.docs.map((doc) => serializeDoc(doc.id, doc.data())),
    }
  } catch (error) {
    console.error('[DB] Error getting session detail:', error)
    return { session: null, responses: [], dateEntries: [], events: [] }
  }
}
