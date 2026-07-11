import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getSecurityRules } from 'firebase-admin/security-rules'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const envPath = resolve(root, '.env.local')

for (const line of readFileSync(envPath, 'utf8').split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const eq = trimmed.indexOf('=')
  if (eq === -1) continue
  const key = trimmed.slice(0, eq)
  let value = trimmed.slice(eq + 1)
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1)
  }
  process.env[key] = value
}

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

if (!projectId || !clientEmail || !privateKey) {
  console.error('Missing Firebase Admin credentials in .env.local')
  process.exit(1)
}

if (!getApps().length) {
  initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  })
}

const rulesPath = resolve(root, 'firestore.rules')
const rulesSource = readFileSync(rulesPath, 'utf8')

const ruleset = await getSecurityRules().releaseFirestoreRulesetFromSource(rulesSource)
console.log('Firestore rules deployed:', ruleset.name)
console.log(
  'Note: Composite indexes in firestore.indexes.json are not deployed by this script.',
)
console.log(
  'Firestore will prompt for missing indexes when queries run, or create them in the Firebase Console.',
)
