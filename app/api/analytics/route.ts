import { NextRequest, NextResponse } from 'next/server'
import { recordEvent } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const event = await request.json()

    const { event: eventType, sessionId, section, data, timestamp } = event

    // Record to database
    await recordEvent(sessionId, eventType, section, data)

    console.log('[Analytics] Event recorded:', eventType, 'for session:', sessionId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Analytics] Error processing event:', error)
    return NextResponse.json({ error: 'Failed to record event' }, { status: 500 })
  }
}
