// Paginated list of contact form submissions.
//   GET /api/contact-submissions?limit=50&offset=0
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

  const [totalRes, pageRes] = await Promise.all([
    query<{ count: string }>(`SELECT COUNT(*)::text AS count FROM contact_submissions`),
    query<{
      id: string
      created_at: Date
      name: string
      email: string
      product_name: string
      product_url: string | null
      category: string | null
      message: string
      user_agent: string | null
    }>(
      `SELECT id, created_at, name, email, product_name, product_url,
              category, message, user_agent
         FROM contact_submissions
         ORDER BY created_at DESC
         LIMIT $1 OFFSET $2`,
      [limit, offset]
    )
  ])

  if (!totalRes || !pageRes) {
    return { ok: true, persisted: false, rows: [], total: 0, limit, offset }
  }

  return {
    ok: true,
    persisted: true,
    rows: pageRes.rows.map((row) => ({
      id: row.id,
      createdAt: row.created_at,
      name: row.name,
      email: row.email,
      productName: row.product_name,
      productUrl: row.product_url,
      category: row.category,
      message: row.message,
      userAgent: row.user_agent
    })),
    total: parseInt(totalRes.rows[0]?.count ?? '0', 10),
    limit,
    offset
  }
})
