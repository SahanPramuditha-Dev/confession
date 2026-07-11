import { NextRequest, NextResponse } from 'next/server'
import { recordWhatsappClick } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId' },
        { status: 400 }
      )
    }

    // Record the whatsapp click directly to the session
    await recordWhatsappClick(sessionId)

    console.log('[WhatsApp API] Recorded WhatsApp click for session:', sessionId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[WhatsApp API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to record WhatsApp click', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
