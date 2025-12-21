import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const dataDir = path.resolve('server/data')
  const filePath = path.join(dataDir, 'results.json')

  await fs.mkdir(dataDir, { recursive: true })

  let existing: any[] = []
  try {
    const file = await fs.readFile(filePath, 'utf-8')
    existing = JSON.parse(file)
  } catch {}

  // IP 주소 가져오기
  const ip = getRequestHeader(event, 'x-forwarded-for') ||
             getRequestHeader(event, 'x-real-ip') ||
             event.node.req.socket.remoteAddress ||
             'unknown'

  // 동일한 IP와 닉네임을 가진 기존 결과 찾기
  const existingIndex = existing.findIndex(
    (item) => item.ip === ip && item.userName === body.userName
  )

  let id: string
  if (existingIndex !== -1) {
    // 기존 결과 업데이트
    id = existing[existingIndex].id
    existing[existingIndex] = {
      id,
      ip,
      userName: body.userName,
      result: body.result,
      answers: body.answers,
      updatedAt: new Date().toISOString()
    }
  } else {
    // 새 결과 추가
    id = randomUUID()
    const result = {
      id,
      ip,
      userName: body.userName,
      result: body.result,
      answers: body.answers,
      updatedAt: new Date().toISOString()
    }
    existing.push(result)
  }

  await fs.writeFile(filePath, JSON.stringify(existing, null, 2))

  return { success: true, id }
})
