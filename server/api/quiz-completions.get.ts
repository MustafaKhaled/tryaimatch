// Paginated list of quiz completions, with answers enriched to include
// the actual question text and the label of the option each user picked.
//
//   GET /api/quiz-completions?limit=50&offset=0&category=code
//
// Requires NUXT_ADMIN_TOKEN. Pass via ?token=... or "Authorization: Bearer ..."
//
// Each row's `answers` field becomes:
//   [
//     { questionId, question, optionId, answer },
//     ...
//   ]
// instead of the raw `{ questionId: optionId }` map stored in the DB.

import { query } from '../utils/db'
import { categories } from '../../data/categories'

type EnrichedAnswer = {
  questionId: string
  question: string
  optionId: string
  answer: string
}

function enrichAnswers(categoryId: string, raw: Record<string, string>): EnrichedAnswer[] {
  const cat = categories[categoryId as keyof typeof categories]
  if (!cat) {
    // Unknown category — fall back to raw map so we don't lose data
    return Object.entries(raw).map(([questionId, optionId]) => ({
      questionId,
      question: questionId,
      optionId,
      answer: optionId
    }))
  }

  const out: EnrichedAnswer[] = []
  for (const q of cat.questions) {
    const optionId = raw[q.id]
    if (optionId === undefined) continue
    const option = q.options.find((o) => o.id === optionId)
    out.push({
      questionId: q.id,
      question: q.title,
      optionId,
      answer: option?.label ?? optionId
    })
  }
  return out
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig() as any
  const adminToken = (config.adminToken as string | undefined) || ''
  if (!adminToken) {
    throw createError({ statusCode: 503, statusMessage: 'Admin endpoints disabled: set NUXT_ADMIN_TOKEN' })
  }
  const fromQuery = getQuery(event).token as string | undefined
  const fromHeader = (getRequestHeader(event, 'authorization') || '').replace(/^Bearer\s+/i, '')
  if (fromQuery !== adminToken && fromHeader !== adminToken) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const q = getQuery(event)
  const limit = Math.min(Math.max(Number(q.limit ?? 50), 1), 200)
  const offset = Math.max(Number(q.offset ?? 0), 0)
  const category = (q.category as string | undefined)?.trim() || null
  const raw = q.raw === '1' || q.raw === 'true' // ?raw=1 returns the original answer map

  const params: any[] = []
  let where = ''
  if (category) {
    params.push(category)
    where = `WHERE category_id = $${params.length}`
  }

  const [totalRes, pageRes] = await Promise.all([
    query<{ count: string }>(`SELECT COUNT(*)::text AS count FROM quiz_completions ${where}`, params),
    query<{
      id: string
      created_at: Date
      category_id: string
      answers: Record<string, string>
      top_tools: any
      duration_ms: number | null
      user_agent: string | null
      referer: string | null
    }>(
      `SELECT id, created_at, category_id, answers, top_tools,
              duration_ms, user_agent, referer
         FROM quiz_completions
         ${where}
         ORDER BY created_at DESC
         LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limit, offset]
    )
  ])

  if (!totalRes || !pageRes) {
    return { ok: true, persisted: false, rows: [], total: 0, limit, offset }
  }

  const cat = (id: string) => categories[id as keyof typeof categories]

  const rows = pageRes.rows.map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    categoryId: row.category_id,
    categoryLabel: cat(row.category_id)?.label ?? row.category_id,
    answers: raw ? row.answers : enrichAnswers(row.category_id, row.answers || {}),
    topTools: row.top_tools,
    durationMs: row.duration_ms,
    userAgent: row.user_agent,
    referer: row.referer
  }))

  return {
    ok: true,
    persisted: true,
    rows,
    total: parseInt(totalRes.rows[0]?.count ?? '0', 10),
    limit,
    offset
  }
})
