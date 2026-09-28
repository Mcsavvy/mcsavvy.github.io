import { useState } from 'react'
import { contact } from '../../content'

export default function Contact() {
  const [copied, setCopied] = useState('Copy email')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied('Copied')
    } catch {
      const el = document.getElementById('contact-email')
      if (el) {
        const range = document.createRange()
        range.selectNodeContents(el)
        const sel = window.getSelection()
        sel?.removeAllRanges()
        sel?.addRange(range)
      }
      setCopied('Selected, press copy')
    }
    setTimeout(() => setCopied('Copy email'), 2000)
  }

  return (
    <>
      <section className="contact" id="contact" aria-labelledby="contact-h">
        <div>
          <span className="label">Next step</span>
          <h2 id="contact-h">
            Tell me the idea. <em>I'll tell you if it's possible.</em>
          </h2>
        </div>
        <div className="side">
          <p>A 30-minute discovery call. You talk, I ask questions, and you leave with an honest answer and a next step.</p>
          <a className="btn-main" href={contact.bookingUrl}>
            <span>Book a 30-min discovery call</span>
            <span aria-hidden="true">→</span>
          </a>
          <div className="mail">
            <span id="contact-email">{contact.email}</span>
            <button type="button" onClick={copy}>{copied}</button>
          </div>
          <div className="links">
            {contact.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </section>
      <footer className="footer">
        <span>© {new Date().getFullYear()} David John</span>
        <span>Lagos, Nigeria · building with founders worldwide</span>
      </footer>
    </>
  )
}
