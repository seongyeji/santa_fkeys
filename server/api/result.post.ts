import { randomUUID } from 'crypto'
import { getFirebaseDB } from '../utils/firebase'

export default defineEventHandler(async (event) => {
  try {
    console.log('[API] POST /api/result - Received request')

    const body = await readBody(event)
    console.log('[API] Request body:', { userName: body.userName, hasResult: !!body.result, hasAnswers: !!body.answers })

    const db = getFirebaseDB()
    console.log('[API] Firebase DB obtained')

    // IP 주소 가져오기
    const ip = getRequestHeader(event, 'x-forwarded-for') ||
               getRequestHeader(event, 'x-real-ip') ||
               event.node.req.socket.remoteAddress ||
               'unknown'

    const resultsRef = db.collection('results')

    // 동일한 IP와 닉네임을 가진 기존 결과 찾기
    console.log('[API] Checking for existing result...')
    const existingSnapshot = await resultsRef
      .where('ip', '==', ip)
      .where('userName', '==', body.userName)
      .limit(1)
      .get()

    let id: string
    const data = {
      ip,
      userName: body.userName,
      result: body.result,
      answers: body.answers,
      updatedAt: new Date().toISOString()
    }

    if (!existingSnapshot.empty) {
      // 기존 결과 업데이트
      console.log('[API] Updating existing result')
      const doc = existingSnapshot.docs[0]!
      id = doc.id
      await resultsRef.doc(id).update(data)
    } else {
      // 새 결과 추가
      console.log('[API] Creating new result')
      id = randomUUID()
      await resultsRef.doc(id).set({
        ...data,
        createdAt: new Date().toISOString()
      })
    }

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
