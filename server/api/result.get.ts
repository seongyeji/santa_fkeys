import { promises as fs } from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const id = getQuery(event).id as string
  const filePath = path.resolve('server/data/results.json')

  try {
    const file = await fs.readFile(filePath, 'utf-8')
    const results = JSON.parse(file)
    const item = results.find((r: any) => r.id === id)
    return item || null
  } catch {
    return null
  }
})
