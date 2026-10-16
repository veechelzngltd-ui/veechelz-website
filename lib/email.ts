// Shared helpers for the website's transactional emails (Resend).

export const BRAND_NAME = 'Veechelz Nigeria Limited'
export const BRAND_PHONE = '0911 111 7575'
export const BRAND_WHATSAPP_URL = 'https://wa.me/2349111117575'

/**
 * Sender address. Defaults to Resend's shared test sender, which can ONLY deliver
 * to the Resend account owner's own email. To email customers, verify a domain in
 * Resend and set RESEND_FROM_EMAIL (e.g. orders@yourdomain.com) in the environment.
 */
export function fromAddress(displayName: string): string {
  const address = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
  return `${displayName} <${address}>`
}

export function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

/** Branded wrapper for the customer-facing "we received your request" emails. */
export function customerEmailShell(opts: {
  heading: string
  greetingName: string
  intro: string
  bodyHtml?: string
  closing: string
}): string {
  const { heading, greetingName, intro, bodyHtml = '', closing } = opts
  return `
  <div style="background-color:#F7F5F0; padding:32px 16px; font-family: Arial, Helvetica, sans-serif; color:#292524;">
    <div style="max-width:600px; margin:0 auto; background:#FFFFFF; border:1px solid #E7E5E4;">
      <div style="background-color:#18181B; padding:24px 32px;">
        <p style="margin:0; font-family: Georgia, serif; font-size:22px; letter-spacing:4px; color:#F7F5F0;">VEECHELZ</p>
        <p style="margin:4px 0 0; font-size:11px; letter-spacing:2px; color:#B38F5B;">ARCHITECTURAL WINDOW FINISHING</p>
      </div>
      <div style="height:3px; background-color:#B38F5B;"></div>
      <div style="padding:32px;">
        <h2 style="margin:0 0 16px; font-family: Georgia, serif; font-weight:normal; font-size:22px; color:#18181B;">${escapeHtml(heading)}</h2>
        <p style="margin:0 0 12px; font-size:15px; line-height:1.6;">Hello ${escapeHtml(greetingName)},</p>
        <p style="margin:0 0 20px; font-size:15px; line-height:1.6;">${escapeHtml(intro)}</p>
        ${bodyHtml}
        <p style="margin:24px 0 0; font-size:15px; line-height:1.6;">${escapeHtml(closing)}</p>
        <p style="margin:24px 0 0; font-size:14px; line-height:1.6;">
          In a hurry? Call or WhatsApp us on
          <a href="${BRAND_WHATSAPP_URL}" style="color:#B38F5B; text-decoration:none;"><strong>${BRAND_PHONE}</strong></a>.
        </p>
        <p style="margin:24px 0 0; font-size:14px;">Warm regards,<br /><strong>The Veechelz Team</strong></p>
      </div>
      <div style="background-color:#F5F5F4; padding:16px 32px; font-size:11px; color:#78716C; line-height:1.6;">
        ${BRAND_NAME} (RC-451171) &bull; Suite B5, Begger Paint Plaza, Alexandria Crescent, Wuse 2, Abuja<br />
        This is an automatic confirmation. You can reply to this email to reach our team.
      </div>
    </div>
  </div>`
}
