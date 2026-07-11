import { NextRequest, NextResponse } from 'next/server'
import { createVisitorSession, updateSessionUser } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, deviceInfo } = await request.json()

    const id = await createVisitorSession(deviceInfo, sessionId)

    return NextResponse.json({ success: true, sessionId: id })
  } catch (error) {
    console.error('[Session API] Error creating session:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { sessionId, userName } = await request.json()

    if (!sessionId || !userName) {
      return NextResponse.json(
        { error: 'Missing sessionId or userName' },
        { status: 400 }
      )
    }

    await updateSessionUser(sessionId, userName)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Session API] Error updating session:', error)
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    )
  }
}
