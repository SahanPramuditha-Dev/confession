import { NextRequest, NextResponse } from 'next/server'
import { recordResponse } from '@/lib/db'

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

    await recordResponse(sessionId, question, answer, {
      userName: body?.nameInput ?? null,
      enteredDate: body?.enteredDate ?? null,
      selection: body?.selection ?? null,
      whatsappClicked: Boolean(body?.whatsappClicked),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Response API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to record response' },
      { status: 500 }
    )
  }
}
