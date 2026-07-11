import { NextRequest, NextResponse } from 'next/server'
import { recordResponse, recordEvent } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, question, answer } = await request.json()

    if (!sessionId || !question || !answer) {
      return NextResponse.json(
        { error: 'Missing required fields: sessionId, question, answer' },
        { status: 400 }
      )
    }

    // Record the response
    await recordResponse(sessionId, question, answer)

    // Also record as an event
    await recordEvent(sessionId, 'response_recorded', 'responses', {
      question,
      answer,
      timestamp: new Date().toISOString(),
    })

    console.log('[Response API] Recorded response for session:', sessionId, 'Question:', question)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Response API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to record response', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
