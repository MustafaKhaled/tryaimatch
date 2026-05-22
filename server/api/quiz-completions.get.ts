// Paginated list of quiz completions.
//   GET /api/quiz-completions?limit=50&offset=0&category=code
// Returns:
//   { rows: [...], total: number, limit, offset }
//
// Each row includes the user's per-question answers (jsonb) and top tools.
// Protected by ADMIN_TOKEN if set.

import { getSupabase } from '../utils/supabase'

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

  const query = getQuery(event)
  const limit = Math.min(Number(query.limit ?? 50), 200)
  const offset = Math.max(Number(query.offset ?? 0), 0)
  const category = (query.category as string | undefined)?.trim() || null

  const supabase = getSupabase()
  if (!supabase) {
    return { ok: true, persisted: false, rows: [], total: 0, limit, offset }
  }

  let q = supabase
    .from('quiz_completions')
    .select(
      'id, created_at, category_id, answers, top_tools, duration_ms, user_agent, referer',
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (category) q = q.eq('category_id', category)

  const { data, count, error } = await q
  if (error) {
    console.error('[quiz-completions GET] supabase error', error)
    throw createError({ statusCode: 500, statusMessage: 'Could not read completions' })
  }

  return {
    ok: true,
    persisted: true,
    rows: data ?? [],
    total: count ?? 0,
    limit,
    offset
  }
})
