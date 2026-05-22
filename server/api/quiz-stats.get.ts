// Aggregate stats over quiz_completions.
//   GET /api/quiz-stats
// Returns:
//   { total, byCategory: { [categoryId]: count }, last24h, last7d }
//
// Lightweight admin-style endpoint. Protected by ADMIN_TOKEN if set.

import { getSupabase } from '../utils/supabase'

export default defineEventHandler(async (event) => {
  // Require NUXT_ADMIN_TOKEN. Pass via ?token=... or "Authorization: Bearer ..."
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

  const supabase = getSupabase()
  if (!supabase) {
    return { ok: true, persisted: false, total: 0, byCategory: {}, last24h: 0, last7d: 0 }
  }

  const now = Date.now()
  const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000).toISOString()
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString()

  // Run the four counts in parallel
  const [total, last24h, last7d, byCategoryRows] = await Promise.all([
    supabase.from('quiz_completions').select('id', { count: 'exact', head: true }),
    supabase.from('quiz_completions').select('id', { count: 'exact', head: true }).gte('created_at', oneDayAgo),
    supabase.from('quiz_completions').select('id', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo),
    supabase.from('quiz_completions').select('category_id')
  ])

  if (total.error || last24h.error || last7d.error || byCategoryRows.error) {
    console.error('[quiz-stats] supabase error', {
      total: total.error,
      last24h: last24h.error,
      last7d: last7d.error,
      byCategory: byCategoryRows.error
    })
    throw createError({ statusCode: 500, statusMessage: 'Could not read stats' })
  }

  const byCategory: Record<string, number> = {}
  for (const row of byCategoryRows.data ?? []) {
    const id = (row as any).category_id ?? 'unknown'
    byCategory[id] = (byCategory[id] ?? 0) + 1
  }

  return {
    ok: true,
    persisted: true,
    total: total.count ?? 0,
    last24h: last24h.count ?? 0,
    last7d: last7d.count ?? 0,
    byCategory
  }
})
