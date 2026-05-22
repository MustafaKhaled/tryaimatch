import nodemailer, { type Transporter } from 'nodemailer'
import { query } from '../utils/db'

let transporter: Transporter | null = null

function getTransporter(): Transporter | null {
  if (transporter) return transporter
  const config = useRuntimeConfig()
  // Diagnostic — logs which env vars are present (NOT their values)
  console.log('[contact] env check', {
    hasSmtpHost: !!config.smtpHost,
    hasSmtpUser: !!config.smtpUser,
    hasSmtpPass: !!config.smtpPass,
    smtpPort: config.smtpPort,
    smtpSecure: config.smtpSecure,
    smtpHostLength: (config.smtpHost || '').length,
    smtpUserLength: (config.smtpUser || '').length
  })
  if (!config.smtpHost || !config.smtpUser || !config.smtpPass) return null
  transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort) || 587,
    secure: String(config.smtpSecure) === 'true',
    auth: { user: config.smtpUser, pass: config.smtpPass },
    // Fail fast so the request doesn't hang forever if the SMTP host
    // is unreachable (e.g. host blocks outbound 587)
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000
  })
  return transporter
}

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

  const config = useRuntimeConfig()

  // 1) Persist to Postgres (if DATABASE_URL configured)
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
    else console.log('[contact] no DB configured — skipping insert', submission)
  } catch (e) {
    console.error('[contact] db insert failed', e)
  }

  // 2) Email to hello@tryaimatch.com via SMTP (if configured)
  let emailed = false
  const t = getTransporter()
  if (t) {
    try {
      const html = `
        <h2 style="font-family:system-ui,sans-serif">New product listing request</h2>
        <table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:6px 12px;color:#666">From</td><td style="padding:6px 12px"><strong>${esc(submission.name)}</strong> &lt;${esc(submission.email)}&gt;</td></tr>
          <tr><td style="padding:6px 12px;color:#666">Product</td><td style="padding:6px 12px">${esc(submission.productName)}</td></tr>
          ${submission.productUrl ? `<tr><td style="padding:6px 12px;color:#666">URL</td><td style="padding:6px 12px"><a href="${esc(submission.productUrl)}">${esc(submission.productUrl)}</a></td></tr>` : ''}
          ${submission.category ? `<tr><td style="padding:6px 12px;color:#666">Category</td><td style="padding:6px 12px">${esc(submission.category)}</td></tr>` : ''}
        </table>
        <h3 style="font-family:system-ui,sans-serif;margin-top:24px">Message</h3>
        <p style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(submission.message)}</p>
      `
      await t.sendMail({
        from: config.contactFromEmail,
        to: config.contactToEmail,
        replyTo: submission.email,
        subject: `New listing request: ${submission.productName}`,
        html
      })
      emailed = true
    } catch (e) {
      console.error('[contact] smtp send failed', e)
    }
  } else {
    console.log('[contact] no SMTP configured — skipping email', submission)
  }

  return { ok: true, persisted, emailed }
})

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]!))
}
