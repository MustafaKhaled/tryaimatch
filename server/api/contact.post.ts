import nodemailer, { type Transporter } from 'nodemailer'
import { getSupabase } from '../utils/supabase'

let transporter: Transporter | null = null

function getTransporter(): Transporter | null {
  if (transporter) return transporter
  const config = useRuntimeConfig()
  if (!config.smtpHost || !config.smtpUser || !config.smtpPass) return null
  transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort) || 587,
    secure: String(config.smtpSecure) === 'true',
    auth: { user: config.smtpUser, pass: config.smtpPass }
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

  // 1) Persist to Supabase (if configured)
  const supabase = getSupabase()
  let persisted = false
  if (supabase) {
    const { error } = await supabase.from('contact_submissions').insert({
      name: submission.name,
      email: submission.email,
      product_name: submission.productName,
      product_url: submission.productUrl,
      category: submission.category,
      message: submission.message,
      user_agent: getRequestHeader(event, 'user-agent') ?? null
    })
    if (error) console.error('[contact] supabase insert failed', error)
    else persisted = true
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
