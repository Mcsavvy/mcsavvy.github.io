/// <reference path="../pb_data/types.d.ts" />

// Emails the owner for every new "5 Free Websites" application.
// Install: copy this file to <your PocketBase dir>/pb_hooks/ (PocketBase reloads hooks on change).
// Needs SMTP configured in Dashboard > Settings > Mail settings.
// Written for PocketBase v0.23+.

onRecordAfterCreateSuccess((e) => {
  // a mail problem must never turn a saved application into an error for the visitor
  try {
    const NOTIFY = 'davidjohn@futurdevs.com'
    const r = e.record
    const esc = (s) =>
      String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
    const rows = [
      ['Business', r.getString('business')],
      ['Type', r.getString('type')],
      ['What they sell', r.getString('what')],
      ['City', r.getString('city')],
      ['Page goal', r.getString('goal')],
      ['Customer worth', r.getString('worth') || 'Not given'],
      ['Content ready', r.getString('content')],
      ['Domain', r.getString('domain') || 'None yet'],
      ['Name', r.getString('name')],
      ['WhatsApp', r.getString('whatsapp')],
      ['Email', r.getString('email') || 'None'],
      ['Referral', r.getString('referral') || 'None'],
    ]
    const wa = r.getString('whatsapp').replace(/\D/g, '')
    const table = rows
      .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#4A5E80;vertical-align:top">${esc(k)}</td><td style="padding:6px 0"><b>${esc(v)}</b></td></tr>`)
      .join('')
    const admin = `${e.app.settings().meta.appURL}/_/#/collections?collection=free_websites_applications`

    const message = new MailerMessage({
      from: { address: e.app.settings().meta.senderAddress, name: e.app.settings().meta.senderName },
      to: [{ address: NOTIFY }],
      subject: ('New application: ' + r.getString('business')).replace(/[\r\n]+/g, ' ').slice(0, 150),
      html:
        `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#0F2344">` +
        `<h2 style="margin:0 0 12px">${esc(r.getString('business'))}</h2>` +
        `<table style="border-collapse:collapse">${table}</table>` +
        `<p><a href="https://wa.me/${wa}">Message ${esc(r.getString('name'))} on WhatsApp</a></p>` +
        `<p><a href="${esc(admin)}">Open the applications in PocketBase</a></p></div>`,
    })
    e.app.newMailClient().send(message)
  } catch (err) {
    e.app.logger().error('free_websites_notify failed', 'error', String(err))
  }
  e.next()
}, 'free_websites_applications')
