// Paginated list of quiz completions.
//   GET /api/quiz-completions?limit=50&offset=0&category=code
//
// Requires NUXT_ADMIN_TOKEN. Pass via ?token=... or "Authorization: Bearer ..."

import { query } from '../utils/db'

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

  const params: any[] = []
  let where = ''
  if (category) {
    params.push(category)
    where = `WHERE category_id = $${params.length}`
  }

  // Run total + page in parallel
  const [totalRes, pageRes] = await Promise.all([
    query<{ count: string }>(`SELECT COUNT(*)::text AS count FROM quiz_completions ${where}`, params),
    query(
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

  return {
    ok: true,
    persisted: true,
    rows: pageRes.rows,
    total: parseInt(totalRes.rows[0]?.count ?? '0', 10),
    limit,
    offset
  }
})
