# Quick Setup Guide

## Before You Share

### Step 1: Personalize the Experience

Edit `/lib/constants.ts` and set:

```typescript
export const TARGET_NAME = 'Zainab'  // ← Change this to the recipient's name
export const FIRST_MEETING_DATE = new Date('2024-07-05')  // ← Your meeting date
```

The experience will only fully unlock when the recipient enters the correct name.

### Step 2: Customize Messages (Optional)

Update any messages in `/lib/constants.ts` under the `MESSAGES` object:

```typescript
export const MESSAGES = {
  chapter1: 'Your custom opening message here...',
  envelope: 'Update the envelope letter content...',
  // ... customize any message you want
}
```

### Step 3: Customize Timeline Events (Optional)

Edit the `TIMELINE_EVENTS` array in `/lib/constants.ts`:

```typescript
export const TIMELINE_EVENTS = [
  {
    title: 'Event 1 Title',
    description: 'Event description',
    color: '#FF4D6D',
  },
  // Add or remove timeline events
]
```

### Step 4: Update Colors (Optional)

Edit `/app/globals.css` to change the color scheme:

```css
:root {
  --background: #070B18;    /* Dark background */
  --primary: #FF4D6D;       /* Pink */
  --secondary: #9D4EDD;     /* Purple */
  --accent: #FFD166;        /* Gold */
}
```

### Step 5: Test Locally

```bash
pnpm dev
```

Visit `http://localhost:3000` and test by entering the target name.

## Deployment Options

### Option A: Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel: [vercel.com/new](https://vercel.com/new)
3. Select your repository
4. Deploy (no config needed!)

### Option B: Other Platforms

The site works on any Node.js hosting:
- Netlify
- Railway
- Render
- Your own server

## Sharing

### Via Direct URL
```
https://your-domain.com
```

### Via QR Code
Generate a QR code pointing to your deployment using:
- [qr-code-generator.com](https://www.qr-code-generator.com/)
- Any QR code generator

### Via Social Media
Share the link privately or publicly depending on your preference.

## What Happens When They Visit

1. **Loading Screen**: Dramatic typewriter introduction
2. **Hero Section**: Beautiful title and Begin button
3. **Name Input**: They enter their name
4. **Rejection if Wrong Name**: If they don't enter the target name, they get a generic message (customize in constants)
5. **Full Experience if Correct Name**: If they enter the target name, they unlock:
   - Chapter narrative
   - Timeline of memories
   - Interactive constellation
   - Envelope letter
   - Final reveal with their name
   - Three response options

## Response Tracking

Currently, responses are not tracked. To add tracking:

1. Add an API endpoint to log responses
2. Update the response buttons to call the endpoint
3. Store responses in a database (Supabase, Firebase, etc.)

## Customization Ideas

- Change the color scheme to match their favorite colors
- Update constellation meanings to reflect real memories
- Add a custom timeline with important dates
- Include their favorite music in the audio element
- Adjust animation speeds in Framer Motion transitions
- Add more personalized messages throughout

## Troubleshooting

### Site not loading?
- Check that Node.js dependencies are installed: `pnpm install`
- Restart dev server: `pnpm dev`

### Name check not working?
- Verify TARGET_NAME matches exactly (case matters after initial check)
- Check browser console for errors (DevTools → Console)

### Animations not smooth?
- Test on a desktop browser first
- Close other tabs to free up resources
- Check your GPU acceleration is enabled

### WhatsApp button not working?
- Verify the WhatsApp URL format is correct
- Make sure the recipient has WhatsApp installed

## Advanced Customization

### Changing Fonts

Edit `/app/layout.tsx`:

```typescript
import { YourFont } from 'next/font/google'

const font = YourFont({ subsets: ['latin'] })
```

### Adding Custom Animations

Edit component files to adjust Framer Motion transitions:

```typescript
animate={{ opacity: 1 }}
transition={{ duration: 2, delay: 0.5 }}
```

### Changing Button Behavior

Update response handlers in `/app/page.tsx` to add custom actions.

## Mobile Optimization

The site is responsive, but for best experience:

1. Test on both portrait and landscape
2. Adjust font sizes if needed in Tailwind classes
3. Verify buttons are easily clickable on mobile

## After They Respond

- Save their response somehow (email, database, form)
- Customize next steps based on their answer
- Consider adding a "Thank You" page after their response

## Need Help?

- Check the README.md for detailed feature documentation
- Review component files for implementation details
- Test locally before deploying
- Review Framer Motion and Tailwind CSS docs for customization

---

**Ready to share? Deploy and send with confidence! 💝**
