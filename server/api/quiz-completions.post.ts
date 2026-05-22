import { query } from '../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    categoryId: string
    answers: Record<string, string>
    topTools: { id: string; name: string; score: number }[]
    durationMs?: number
  }>(event)

  if (!body?.categoryId || !body.answers || !Array.isArray(body.topTools)) {
    throw createError({ statusCode: 400, statusMessage: 'categoryId, answers, topTools required' })
  }

  const row = {
    category_id: body.categoryId,
    answers: body.answers,
    top_tools: body.topTools,
    duration_ms: body.durationMs ?? null,
    user_agent: getRequestHeader(event, 'user-agent') ?? null,
    referer: getRequestHeader(event, 'referer') ?? null
  }

  const result = await query(
    `INSERT INTO quiz_completions
       (category_id, answers, top_tools, duration_ms, user_agent, referer)
     VALUES ($1, $2::jsonb, $3::jsonb, $4, $5, $6)`,
    [
      row.category_id,
      JSON.stringify(row.answers),
      JSON.stringify(row.top_tools),
      row.duration_ms,
      row.user_agent,
      row.referer
    ]
  )

  if (!result) {
    console.log('[quiz-completions] (no DB configured)', row)
    return { ok: true, persisted: false }
  }

  return { ok: true, persisted: true }
})
