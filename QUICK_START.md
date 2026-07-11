# One Encounter - Quick Start Guide

## What's New

Your "One Encounter" website has been completely enhanced with:
- Comprehensive visitor analytics and tracking
- Professional admin dashboard
- Cinematic animations and smooth transitions
- Improved user experience with smarter auto-scroll
- Full Neon PostgreSQL database integration

## Getting Started

### 1. Local Development

```bash
# Start the dev server
pnpm dev

# Visit the site
open http://localhost:3000

# Access admin dashboard
open http://localhost:3000/admin
```

Default admin password: `admin123`

### 2. Deployment to Vercel

```bash
# Deploy automatically
git push origin main

# Or deploy manually
pnpm build
pnpm start
```

**Important**: Set `DATABASE_URL` environment variable in Vercel project settings pointing to your Neon database.

## How to Use

### For Visitors
1. Visit the website at your deployment URL
2. Follow the emotional story (5-6.5 second sections)
3. Enter your name
4. Enter the date (any date works - story continues!)
5. Collect 7 stars in the constellation section
6. Open the letter
7. Answer the final question
8. See the result and optional WhatsApp link

### For Admin (You)
1. Visit `/admin` (e.g., `example.com/admin`)
2. Enter password: `admin123`
3. View analytics:
   - **Overview**: Visitor stats, completion rates
   - **Responses**: All user responses with dates/times
   - **Sessions**: Visitor session information

## Key Changes

### Date Section
- Users can now enter ANY date - the site doesn't block them
- The website still records whether they got it right or wrong
- Creates a smoother emotional experience

### Analytics Tracking
Every interaction is now tracked:
- How many people started/completed the story
- Which users answered "yes" vs other responses
- How long people spent on each section
- Whether they collected all the stars
- WhatsApp clicks

### Animations
All transitions are now slower and more cinematic:
- 5-6.5 second sections (vs 3-4 seconds before)
- Smooth fade-in/fade-out effects
- Blur transitions between sections
- Floating and glowing effects
- More emotional, less rushed

### Auto-Scroll
The story no longer forces you to scroll. It:
- Only auto-advances after you interact
- Waits 1-2 seconds before smooth scrolling
- Lets you interrupt by scrolling yourself
- Never skips important content

## Configuration

### Change Admin Password
Edit `/app/admin/page.tsx` line 34:
```typescript
if (password === 'admin123') {  // Change 'admin123' to your password
```

### Customize Durations
Edit `/lib/story-controller.ts` to adjust section timing:
```typescript
letter: { duration: 6500 },  // Change this value (milliseconds)
```

### Modify Colors
Edit `/app/globals.css` for color theme:
```css
--primary: #FF4D6D;
--secondary: #9D4EDD;
--accent: #FFD166;
```

## Database Setup

### First Time Setup
1. Connect your Neon database to Vercel
2. Add `DATABASE_URL` environment variable
3. Deploy the site
4. Database tables auto-create on first visit

### Viewing Raw Data
Connect to your Neon database directly:
```sql
-- See all visitors
SELECT * FROM visitor_sessions;

-- See all events
SELECT * FROM user_events ORDER BY timestamp DESC;

-- See all responses
SELECT * FROM user_responses;
```

## Monitoring & Analytics

### Real-time Stats
Check `/api/admin/analytics` for current stats:
```bash
curl http://localhost:3000/api/admin/analytics
```

### Top Insights
- Completion rate shows engagement
- Section timing reveals where people drop off
- "Yes" responses show genuine interest
- Star collection completion shows interaction level

## Troubleshooting

### Database Connection Issues
```
Error: "Can't resolve @vercel/postgres"
→ Run: pnpm install
```

### Admin Login Not Working
- Verify password matches in `/app/admin/page.tsx`
- Check for typos (case-sensitive)
- Clear browser cache

### Animations Not Playing
- Check browser compatibility (needs modern browser)
- Disable if performance issues: Edit `/app/page.tsx` animations
- Check DevTools console for errors

### Analytics Not Recording
- Verify `DATABASE_URL` is set
- Check `/api/analytics` endpoint in DevTools Network tab
- Ensure Neon database is running

## Performance Tips

### Optimize for Production
```bash
pnpm build
# Check .next/static for bundle size
```

### Monitor Performance
- Check Web Vitals in admin dashboard
- Monitor database query performance
- Use Vercel Analytics

## Next Steps

### Enhancements You Can Add
1. Email notifications for responses
2. Export data to CSV
3. Charts and graphs
4. Campaign tracking (UTM parameters)
5. A/B testing different messages
6. Video background instead of starfield

### Contact & Support
- Reach out to Vercel support for deployment issues
- Check Neon docs for database questions
- Review IMPROVEMENTS_SUMMARY.md for technical details

## File Reference

### Key Files You Might Edit
- `/app/page.tsx` - Main story experience
- `/app/admin/page.tsx` - Admin dashboard
- `/lib/story-controller.ts` - Animation timing
- `/components/date-entry-pin.tsx` - Date section
- `/components/constellation-collector.tsx` - Star collection

### Database Files
- `/lib/db.ts` - Database operations
- `/app/api/session/route.ts` - Session creation
- `/app/api/analytics/route.ts` - Event logging
- `/app/api/complete-story/route.ts` - Story completion

### New Utilities
- `/lib/analytics.ts` - Analytics tracking
- `/lib/premium-animations.ts` - Animation variants
- `/lib/smooth-scroll.ts` - Scroll utilities

## Deployment Checklist

Before going live:
- [ ] Database URL set in Vercel project settings
- [ ] Admin password changed from default
- [ ] Tested date section (enter wrong date to verify it works)
- [ ] Tested star collection (collect all 7 stars)
- [ ] Tested admin dashboard (view responses)
- [ ] Tested on mobile device
- [ ] Animations play smoothly
- [ ] No console errors in DevTools

## Success Metrics

After launch, monitor:
- Total visitors (goal: grow steadily)
- Completion rate (target: 50%+)
- "Yes" responses (measure of genuine interest)
- Time per section (should average 5-7 seconds)
- Mobile vs desktop split (optimize for mobile)

---

For more details, see `IMPROVEMENTS_SUMMARY.md`
For technical details, see `README.md`

Good luck! The website is ready to make an impression.
