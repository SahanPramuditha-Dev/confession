import { NextRequest, NextResponse } from 'next/server'
import { recordResponse, recordEvent } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, question, answer } = body

    if (!sessionId || !question || !answer) {

      return NextResponse.json(
        { error: 'Missing required fields: sessionId, question, answer' },
        { status: 400 }
      )
    }

    const nameInput = body?.nameInput
    const enteredDate = body?.enteredDate
    const selection = body?.selection
    const whatsappClicked = body?.whatsappClicked

    // Record the response + separate response_entries doc
    await recordResponse(sessionId, question, answer, {
      nameInput: nameInput ?? null,
      enteredDate: enteredDate ?? null,
      selection: selection ?? null,
      whatsappClicked: Boolean(whatsappClicked),
    })



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
