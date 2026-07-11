import { NextRequest, NextResponse } from 'next/server'
import { createVisitorSession } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, deviceInfo } = await request.json()

    await createVisitorSession(deviceInfo)

    return NextResponse.json({ success: true, sessionId })
  } catch (error) {
    console.error('[Session API] Error creating session:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}
