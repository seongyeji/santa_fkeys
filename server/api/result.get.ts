import { getFirebaseDB } from '../utils/firebase'

export default defineEventHandler(async (event) => {
  const id = getQuery(event).id as string
  const db = getFirebaseDB()

  try {
    const docRef = db.collection('results').doc(id)
    const doc = await docRef.get()

    if (!doc.exists) {
      return null
    }

    return {
      id: doc.id,
      ...doc.data()
    }
  } catch (error) {
    console.error('Error fetching result:', error)
    return null
  }
})
