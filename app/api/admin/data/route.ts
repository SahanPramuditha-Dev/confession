import { NextRequest, NextResponse } from 'next/server'
import { getAllSessions, getRecentResponses, getSessionDetail } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // In production, you'd want to verify admin authentication here
    const authHeader = request.headers.get('authorization')
    
    // Get all sessions
    const sessions = await getAllSessions(500)
    
    // Get recent responses
    const responses = await getRecentResponses(100)
    
    // Get date entries and analytics
    let dateEntries: any[] = []
    let analyticsEvents: any[] = []
    
    if (sessions.length > 0) {
      // For each session, get its details
      const sessionDetails = await Promise.all(
        sessions.slice(0, 50).map(s => getSessionDetail(s.id))
      )
      
      // Flatten the data
      dateEntries = sessionDetails.flatMap(detail => detail.dateEntries || [])
      analyticsEvents = sessionDetails.flatMap(detail => detail.events || [])
    }

    console.log('[Admin API] Sessions:', sessions.length, 'Responses:', responses.length)

    return NextResponse.json({
      sessions,
      responses,
      dateEntries,
      analyticsEvents,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Admin API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
