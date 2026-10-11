import { faqs } from '../../content'

export default function Faq() {
  const items = faqs.filter((f) => f.a.trim() !== '')
  if (items.length === 0) return null
  return (
    <section className="sec" id="faq" aria-labelledby="faq-h">
      <div className="sec-head">
        <span className="label">FAQ</span>
        <h2 id="faq-h">Questions founders ask</h2>
      </div>
      <div className="faq">
        {items.map((f, i) => (
          <details key={f.q} open={i === 0}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
