import { NextRequest, NextResponse } from 'next/server'
import { recordDateEntry } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, enteredDate, isCorrect } = await request.json()

    console.log('[v0] Recording date entry:', { sessionId, enteredDate, isCorrect })

    await recordDateEntry(sessionId, enteredDate, isCorrect)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Record Date API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to record date' },
      { status: 500 }
    )
  }
}
