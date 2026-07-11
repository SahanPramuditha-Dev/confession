# Analytics & Admin Dashboard Guide

## Quick Start

### Access Admin Dashboard
```
URL: http://localhost:3000/admin/responses
Password: admin123
```

The dashboard displays:
- Total visitors
- Completed stories
- Responses received
- Latest responses table

---

## Analytics Events Reference

### Story Flow Events

#### `story_started`
Fired when visitor enters the site (loading screen).
```javascript
analyticsTracker.trackEvent('story_started')
```

#### `star_section_entered`
Fired when visiting constellation section.
```javascript
analyticsTracker.trackEvent('star_section_entered', 'constellation')
```

#### `star_clicked`
Fired each time a visitor clicks a star.
```javascript
analyticsTracker.trackEvent('star_clicked', 'constellation', { starId: '1' })
```

#### `all_stars_completed`
Fired when all 7 stars have been collected.
```javascript
analyticsTracker.trackEvent('all_stars_completed', 'constellation')
```

#### `letter_opened`
Fired when envelope is opened.
```javascript
analyticsTracker.trackEvent('letter_opened', 'envelope', { opened: true })
```

#### `response_screen_viewed`
Fired when response selection section appears.
```javascript
analyticsTracker.trackEvent('response_screen_viewed', 'memory')
```

#### `response_selected`
Fired when visitor selects a response option.
```javascript
analyticsTracker.trackEvent('response_selected', 'memory', { response: 'yes' })
```

#### `whatsapp_clicked`
Fired when WhatsApp button is clicked.
```javascript
analyticsTracker.trackEvent('whatsapp_clicked', 'response')
```

#### `story_completed`
Fired when story finishes (final response selected).
```javascript
analyticsTracker.trackEvent('story_completed', 'response', { response: 'yes' })
```

---

## Session Tracking

Each visitor gets a unique session ID:
```
Format: {timestamp}-{random}
Example: 1688563800000-a1b2c3d4e
```

All events are tied to this session ID automatically.

### Session Data Persisted
- When story started
- Which sections completed
- Last section visited
- Device information
- Timestamps for all events

---

## Analytics Flow Diagram

```
Visitor Arrives
    ↓
story_started event
    ↓
[Auto-scroll through scenes]
    ↓
star_section_entered → reaches constellation
    ↓
star_clicked (×7) → collecting stars
    ↓
all_stars_completed → ready to continue
    ↓
letter_opened → opens envelope
    ↓
response_screen_viewed → final decision page
    ↓
response_selected → chooses yes/maybe/not now
    ↓
whatsapp_clicked (optional) → sends message
    ↓
story_completed → final event
```

---

## Understanding Response Types

The `response_selected` event has three options:

| Response | Meaning | Color |
|----------|---------|-------|
| `yes` | Interested in getting to know each other | Pink |
| `maybe` | Needs time to think | Purple |
| `time` | Not ready now | Blue |

---

## Database Integration (When Ready)

Once Neon is configured, modify:

**`/api/analytics/route.ts`**
```typescript
// From: Just console logs
// To: INSERT into database

const event = await request.json()
const db = getDatabase()

await db.insert('visitor_events').values({
  session_id: event.sessionId,
  event_type: event.event,
  section: event.section,
  data: event.data,
  created_at: event.timestamp
})
```

**`/api/admin/analytics/route.ts`**
```typescript
// From: Mock data
// To: Real queries

const result = await db.query(
  'SELECT * FROM responses ORDER BY created_at DESC LIMIT 10'
)

return NextResponse.json({
  total_visitors: result.visitorsCount,
  completed_stories: result.completedCount,
  responses_received: result.responseCount,
  latest_responses: result.rows
})
```

---

## Debugging with Console Logs

The analytics tracker includes debug logging:

**Browser Console**
```javascript
// Check session ID
console.log(analyticsTracker.getSessionId())

// Manual event trigger
analyticsTracker.trackEvent('test_event', 'test_section')
```

**Server Logs**
```
[Analytics] Event recorded: { event: 'response_selected', ... }
```

---

## Privacy Considerations

✅ **What's Safe**
- Anonymous session IDs
- Progress through story
- Button clicks and interactions
- Response selections

❌ **Not Collected**
- Names (stored locally only)
- Contact info
- Personal details
- External behavior
- Device identifiers
- IP addresses

---

## Future Enhancements

### Real-time Dashboard
```javascript
// WebSocket connection for live updates
const ws = new WebSocket('ws://localhost:3000/analytics')
ws.onmessage = (event) => {
  const newEvent = JSON.parse(event.data)
  updateDashboard(newEvent)
}
```

### Heatmaps
Track which stars are most commonly clicked first, or how many people leave at each section.

### Funnel Analysis
```
story_started: 100%
   ↓
name_entered: 95%
   ↓
constellation_completed: 87%
   ↓
response_selected: 78%
```

### Time Tracking
Measure how long visitors spend on each section.

---

## Admin Password

Default: `admin123`

To change:
1. Set environment variable: `NEXT_PUBLIC_ADMIN_PASSWORD`
2. Update `/app/admin/responses/page.tsx`

---

## Exporting Data

Currently: Manual export from admin dashboard
Future: API endpoint for CSV/JSON export

```
GET /api/admin/export?format=csv&from=2026-07-01&to=2026-07-31
```

---

## Support

For analytics issues:
1. Check browser console for errors
2. Verify `/api/analytics` endpoint is responding
3. Check session ID in localStorage
4. Review IMPROVEMENTS_IMPLEMENTED.md for full technical details
