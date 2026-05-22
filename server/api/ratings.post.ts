import { query } from '../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    rating: number
    comment?: string
    categoryId?: string
    topToolId?: string
  }>(event)

  if (!body || typeof body.rating !== 'number' || body.rating < 1 || body.rating > 5) {
    throw createError({ statusCode: 400, statusMessage: 'rating (1–5) is required' })
  }

  const row = {
    rating: body.rating,
    comment: body.comment?.trim() || null,
    category_id: body.categoryId ?? null,
    top_tool_id: body.topToolId ?? null,
    user_agent: getRequestHeader(event, 'user-agent') ?? null
  }

  const result = await query(
    `INSERT INTO ratings (rating, comment, category_id, top_tool_id, user_agent)
     VALUES ($1, $2, $3, $4, $5)`,
    [row.rating, row.comment, row.category_id, row.top_tool_id, row.user_agent]
  )

  if (!result) {
    console.log('[ratings] (no DB configured)', row)
    return { ok: true, persisted: false }
  }

  return { ok: true, persisted: true }
})
