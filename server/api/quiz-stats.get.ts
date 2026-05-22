// Aggregate stats over quiz_completions.
//   GET /api/quiz-stats
// Returns:
//   { total, byCategory, last24h, last7d }
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

  const result = await query<{
    total: string
    last24h: string
    last7d: string
  }>(
    `SELECT
       COUNT(*)::text AS total,
       COUNT(*) FILTER (WHERE created_at >= now() - interval '24 hours')::text AS last24h,
       COUNT(*) FILTER (WHERE created_at >= now() - interval '7 days')::text  AS last7d
     FROM quiz_completions`
  )

  if (!result) {
    return { ok: true, persisted: false, total: 0, byCategory: {}, last24h: 0, last7d: 0 }
  }

  const counts = result.rows[0] ?? { total: '0', last24h: '0', last7d: '0' }

  const byCat = await query<{ category_id: string; count: string }>(
    `SELECT category_id, COUNT(*)::text AS count
       FROM quiz_completions
       GROUP BY category_id
       ORDER BY count DESC`
  )

  const byCategory: Record<string, number> = {}
  for (const row of byCat?.rows ?? []) {
    byCategory[row.category_id ?? 'unknown'] = parseInt(row.count, 10)
  }

  return {
    ok: true,
    persisted: true,
    total: parseInt(counts.total, 10),
    last24h: parseInt(counts.last24h, 10),
    last7d: parseInt(counts.last7d, 10),
    byCategory
  }
})
