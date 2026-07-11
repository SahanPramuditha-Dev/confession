import { NextRequest, NextResponse } from 'next/server'
import { getVisitorStats, getRecentResponses } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const stats = await getVisitorStats()
    const responses = await getRecentResponses(20)

    return NextResponse.json({
      stats: stats || {
        total_visitors: 0,
        completed_stories: 0,
        completion_rate: 0,
      },
      responses: responses || [],
    })
  } catch (error) {
    console.error('[Admin API] Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
