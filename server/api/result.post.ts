import { randomUUID } from 'crypto'
import { getFirebaseDB, getFirebaseStorage } from '../utils/firebase'

export default defineEventHandler(async (event) => {
  try {
    console.log('[API] POST /api/result - Received request')

    const body = await readBody(event)
    console.log('[API] Request body:', { userName: body.userName, hasResult: !!body.result, hasAnswers: !!body.answers, hasImage: !!body.imageBase64 })

    const db = getFirebaseDB()
    const storage = getFirebaseStorage()
    console.log('[API] Firebase DB and Storage obtained')

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
    let imageUrl: string | null = null

    // 이미지가 있으면 Storage에 업로드
    if (body.imageBase64) {
      try {
        console.log('[API] Uploading image to Storage...')

        // base64 데이터에서 실제 데이터 부분만 추출
        const base64Data = body.imageBase64.replace(/^data:image\/\w+;base64,/, '')
        const buffer = Buffer.from(base64Data, 'base64')

        const fileName = `results/${randomUUID()}.png`
        const bucket = storage.bucket()
        const file = bucket.file(fileName)

        await file.save(buffer, {
          metadata: {
            contentType: 'image/png'
          },
          public: true
        })

        imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`
        console.log('[API] Image uploaded successfully:', imageUrl)
      } catch (uploadError) {
        console.error('[API] Image upload failed:', uploadError)
        // 이미지 업로드 실패해도 계속 진행
      }
    }

    const data = {
      ip,
      userName: body.userName,
      result: body.result,
      answers: body.answers,
      imageUrl: imageUrl,
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
