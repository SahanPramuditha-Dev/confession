# TODO

## Step 1: Add separate Firestore collection for response inputs
- Update `lib/db.ts` to add writes into a new collection `response_entries` (name confirmed by user as: responses with name input, dateinput, her selection, and whether WhatsApp button clicked).
- Create new DB helpers:
  - `recordResponseEntry({ sessionId, enteredDate, nameInput, selection, whatsappClicked })`
- Keep existing `sessions/{sessionId}.responses` writes for backward compatibility unless removed later.

## Step 2: Pass all needed data to the server when recording
- Update existing APIs:
  - `app/api/record-date/route.ts` to also store date input into session and (optionally) into the pending response entry fields.
  - `app/api/record-response/route.ts` to include:
    - `nameInput`
    - `selection`
    - plus attach `enteredDate` (if available) and `whatsapp_clicked` (current state) for the new collection.
- Update `app/api/record-whatsapp/route.ts` so it updates the newest related `response_entries` documents (or creates/updates a flag) with `whatsappClicked: true`.

## Step 3: Update admin fetching (if needed)
- If admin UI should display from the new collection, add new admin API routes or extend existing ones.

## Step 4: Test
- Run build/lint and sanity check API routes.

