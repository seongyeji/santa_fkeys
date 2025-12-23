import { getFirebaseDB } from '../utils/firebase'
import { calculateResult } from '../../utils/quiz'
import type { CharacterType } from '../../types/quiz'

export default defineEventHandler(async (event) => {
  const id = getQuery(event).id as string
  const db = getFirebaseDB()

  try {
    const docRef = db.collection('results').doc(id)
    const doc = await docRef.get()

    if (!doc.exists) {
      return null
    }

    const data = doc.data()
    const answers = data?.answers as CharacterType[]

    // answers로부터 result 계산
    const result = calculateResult(answers)

    return {
      id: doc.id,
      userName: data?.userName,
      answers: answers,
      result: result
    }
  } catch (error) {
    console.error('Error fetching result:', error)
    return null
  }
})
