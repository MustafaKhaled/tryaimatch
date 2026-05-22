import { query } from '../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    name: string
    email: string
    productName: string
    productUrl?: string
    category?: string
    message: string
  }>(event)

  if (!body?.name?.trim() || !body?.email?.trim() || !body?.productName?.trim() || !body?.message?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'name, email, productName, message are required' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email' })
  }

  const submission = {
    name: body.name.trim(),
    email: body.email.trim(),
    productName: body.productName.trim(),
    productUrl: body.productUrl?.trim() || null,
    category: body.category?.trim() || null,
    message: body.message.trim()
  }

  let persisted = false
  try {
    const result = await query(
      `INSERT INTO contact_submissions
         (name, email, product_name, product_url, category, message, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        submission.name,
        submission.email,
        submission.productName,
        submission.productUrl,
        submission.category,
        submission.message,
        getRequestHeader(event, 'user-agent') ?? null
      ]
    )
    if (result) persisted = true
    else console.log('[contact] no DB configured — submission dropped', submission)
  } catch (e) {
    console.error('[contact] db insert failed', e)
    throw createError({ statusCode: 500, statusMessage: 'Could not save submission' })
  }

  return { ok: true, persisted }
})
