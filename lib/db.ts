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
  sessionId?: string,
  referrer?: string
) {
  const id =
    sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  try {
    const db = getAdminDb()
    if (!db) return id

    await db.collection('sessions').doc(id).set({
      visitor_ip: deviceInfo?.ip || 'unknown',
      user_agent: deviceInfo?.userAgent || 'unknown',
      referrer: referrer || null,
      completed: false,
      user_name: null,
      final_response: null,
      entered_date: null,
      date_is_correct: null,
      whatsapp_clicked: false,
      whatsapp_clicked_at: null,
      responses: [],
      events: [],
      created_at: FieldValue.serverTimestamp(),
    })

    return id
  } catch (error) {
    console.error('[DB] Error creating session:', error)
    return id
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

    // Add to the session document's events array
    await db.collection('sessions').doc(sessionId).update({
      events: FieldValue.arrayUnion({
        event_type: eventType,
        section: section || null,
        data: value || null,
        timestamp: new Date().toISOString(),
      }),
    })
  } catch (error) {
    console.error('[DB] Error recording event:', error)
  }
}

export type UserResponseItem = {
  question: string
  response: string
  timestamp: string
}

export async function recordResponse(
  sessionId: string,
  question: string,
  answer: string,
  meta?: {
    userName?: string | null
    enteredDate?: string | null
    correctedDate?: string | null
    dateIsCorrect?: boolean | null
    selection?: string | null
    whatsappClicked?: boolean
    whatsappClickedAt?: string | null
  }
) {
  try {
    const db = getAdminDb()
    if (!db) return

    // We store user submissions in `responses/{autoId}`.
    // We create once per session and then update it.
    const responsesRef = db.collection('responses')

    // Use deterministic query: sessionId should be unique per story submission.
    // We'll find the latest doc with this sessionId; if none exists, create.
    const existing = await responsesRef
      .where('sessionId', '==', sessionId)
      .orderBy('submittedAt', 'desc')
      .limit(1)
      .get()

    const now = new Date().toISOString()

    const responseItem: UserResponseItem = {
      question,
      response: answer,
      timestamp: now,
    }

    if (existing.empty) {
      await responsesRef.add({
        sessionId,
        userName: meta?.userName ?? null,
        enteredDate: meta?.enteredDate ?? null,
        correctedDate: meta?.correctedDate ?? null,
        dateIsCorrect: meta?.dateIsCorrect ?? null,
        selection: meta?.selection ?? null,
        responses: [responseItem],
        finalResponse: answer,
        submittedAt: now,
        completed: false,
        whatsappClicked: Boolean(meta?.whatsappClicked),
        whatsappClickedAt: meta?.whatsappClickedAt ?? null,
      })
      return
    }

    const doc = existing.docs[0]

    await doc.ref.update({
      responses: FieldValue.arrayUnion(responseItem),
      // keep finalResponse as the latest answer for now
      finalResponse: answer,
      submittedAt: now,
      selection: meta?.selection ?? null,
      completed: false,
      whatsappClicked: Boolean(meta?.whatsappClicked),
      whatsappClickedAt: meta?.whatsappClickedAt ?? null,
      userName: meta?.userName ?? null,
      enteredDate: meta?.enteredDate ?? null,
      correctedDate: meta?.correctedDate ?? null,
      dateIsCorrect: meta?.dateIsCorrect ?? null,
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

    // Analytics/session tracking can keep date info.
    await db.collection('sessions').doc(sessionId).update({
      entered_date: enteredDate,
      date_is_correct: isCorrect,
      date_entered_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[DB] Error recording date entry:', error)
  }
}


export async function markStoryCompleted(sessionId: string, finalResponse: string) {
  try {
    const db = getAdminDb()
    if (!db) return

    // Mark analytics completed only in sessions
    await db.collection('sessions').doc(sessionId).update({
      completed: true,
      completed_at: new Date().toISOString(),
    })

    // Also update the latest responses submission document
    const latest = await db
      .collection('responses')
      .where('sessionId', '==', sessionId)
      .orderBy('submittedAt', 'desc')
      .limit(1)
      .get()

    if (!latest.empty) {
      await latest.docs[0].ref.update({
        finalResponse,
        completed: true,
      })
    }
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

export async function recordWhatsappClick(sessionId: string) {
  try {
    const db = getAdminDb()
    if (!db) return

    await db.collection('sessions').doc(sessionId).update({
      whatsapp_clicked: true,
      whatsapp_clicked_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[DB] Error recording whatsapp click:', error)
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

    // Get sessions that have responses, ordered by creation
    const snapshot = await db
      .collection('sessions')
      .where('completed', '==', true)
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
    if (!db) return null

    const sessionDoc = await db.collection('sessions').doc(sessionId).get()

    if (!sessionDoc.exists) return null

    return serializeDoc(sessionDoc.id, sessionDoc.data()!)
  } catch (error) {
    console.error('[DB] Error getting session detail:', error)
    return null
  }
}
