import { NextRequest, NextResponse } from 'next/server'
import { markStoryCompleted, recordResponse, updateSessionUser } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, response, name } = await request.json()

    console.log('[v0] Completing story:', { sessionId, response, name })

    // Update session with user name
    if (name) {
      await updateSessionUser(sessionId, name)
    }

    // Record the final response
    await recordResponse(sessionId, 'Would you like to know me better?', response)

    // Mark story completed
    await markStoryCompleted(sessionId, response)

    console.log('[v0] Story completed and saved to database')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Complete Story API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to complete story' },
      { status: 500 }
    )
  }
}
