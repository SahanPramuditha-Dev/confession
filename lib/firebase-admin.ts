import { initializeApp, getApps, cert, type App } from 'firebase-admin/app'
import { getFirestore, type Firestore } from 'firebase-admin/firestore'

let adminApp: App | null = null
let adminDb: Firestore | null = null

function getAdminApp(): App | null {
  if (adminApp) return adminApp
  if (getApps().length) {
    adminApp = getApps()[0]!
    return adminApp
  }

  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID

  try {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    if (serviceAccountJson) {
      const serviceAccount = JSON.parse(serviceAccountJson)
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id ?? projectId,
      })
      return adminApp
    }

    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    if (clientEmail && privateKey && projectId) {
      adminApp = initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
      })
      return adminApp
    }

    if (projectId) {
      adminApp = initializeApp({ projectId })
      return adminApp
    }

    console.warn('[Firebase Admin] Credentials missing')
    return null
  } catch (error) {
    console.warn('[Firebase Admin] Failed to initialize:', error)
    return null
  }
}

export function getAdminDb(): Firestore | null {
  if (adminDb) return adminDb

  const app = getAdminApp()
  if (!app) return null

  adminDb = getFirestore(app)
  return adminDb
}
