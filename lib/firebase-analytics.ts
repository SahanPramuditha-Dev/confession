'use client'

import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics'
import { getFirebaseApp } from './firebase'

let analytics: Analytics | null = null

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (analytics) return analytics

  const app = getFirebaseApp()
  if (!app) return null

  if (!(await isSupported())) return null

  analytics = getAnalytics(app)
  return analytics
}
