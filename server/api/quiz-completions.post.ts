import { getSupabase } from '../utils/supabase'

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

  const supabase = getSupabase()
  if (!supabase) {
    console.log('[quiz-completions] (no DB configured)', row)
    return { ok: true, persisted: false }
  }

  const { error } = await supabase.from('quiz_completions').insert(row)
  if (error) {
    console.error('[quiz-completions] insert failed', error)
    throw createError({ statusCode: 500, statusMessage: 'Could not save completion' })
  }

  return { ok: true, persisted: true }
})
