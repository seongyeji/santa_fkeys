import { randomUUID } from 'crypto'
import { getFirebaseDB } from '../utils/firebase'

export default defineEventHandler(async (event) => {
  try {
    console.log('[API] POST /api/result - Received request')

    const body = await readBody(event)
    console.log('[API] Request body:', { userName: body.userName, hasAnswers: !!body.answers })

    const db = getFirebaseDB()
    console.log('[API] Firebase DB obtained')

    const resultsRef = db.collection('results')

    // 새 결과 추가
    console.log('[API] Creating new result')
    const id = randomUUID()
    const data = {
      userName: body.userName,
      answers: body.answers,
      createdAt: new Date().toISOString()
    }

    await resultsRef.doc(id).set(data)

    console.log('[API] Success - Result ID:', id)
    return { success: true, id }
  } catch (error) {
    console.error('[API] Error in POST /api/result:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save result',
      data: {
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    })
  }
})
