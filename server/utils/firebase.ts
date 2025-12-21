import { initializeApp, cert, getApps, type App } from 'firebase-admin/app'
import { getFirestore, type Firestore } from 'firebase-admin/firestore'
import { getStorage, type Storage } from 'firebase-admin/storage'

let app: App
let db: Firestore
let storage: Storage

export function initFirebase() {
  if (getApps().length === 0) {
    try {
      const config = useRuntimeConfig()

      console.log('[Firebase] Initializing Firebase Admin SDK...')
      console.log('[Firebase] Project ID:', config.firebaseProjectId)
      console.log('[Firebase] Client Email:', config.firebaseClientEmail)
      console.log('[Firebase] Private Key exists:', !!config.firebasePrivateKey)
      console.log('[Firebase] Private Key length:', config.firebasePrivateKey?.length)

      if (!config.firebaseProjectId || !config.firebaseClientEmail || !config.firebasePrivateKey) {
        throw new Error('Missing Firebase configuration. Please check your .env file.')
      }

      app = initializeApp({
        credential: cert({
          projectId: config.firebaseProjectId,
          clientEmail: config.firebaseClientEmail,
          privateKey: config.firebasePrivateKey?.replace(/\\n/g, '\n')
        }),
        storageBucket: `${config.firebaseProjectId}.appspot.com`
      })

      db = getFirestore(app)
      storage = getStorage(app)
      console.log('[Firebase] Successfully initialized')
    } catch (error) {
      console.error('[Firebase] Initialization failed:', error)
      throw error
    }
  }

  return { app, db, storage }
}

export function getFirebaseDB(): Firestore {
  if (!db) {
    const { db: firebaseDb } = initFirebase()
    return firebaseDb
  }
  return db
}

export function getFirebaseStorage(): Storage {
  if (!storage) {
    const { storage: firebaseStorage } = initFirebase()
    return firebaseStorage
  }
  return storage
}
