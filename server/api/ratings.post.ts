import { getSupabase } from '../utils/supabase'

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

  const supabase = getSupabase()
  if (!supabase) {
    console.log('[ratings] (no DB configured)', row)
    return { ok: true, persisted: false }
  }

  const { error } = await supabase.from('ratings').insert(row)
  if (error) {
    console.error('[ratings] insert failed', error)
    throw createError({ statusCode: 500, statusMessage: 'Could not save rating' })
  }

  return { ok: true, persisted: true }
})
