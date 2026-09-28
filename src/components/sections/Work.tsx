import { useEffect, useRef, useState } from 'react'
import { featured, more } from '../../content'

export default function Work() {
  const [open, setOpen] = useState(false)
  const section = useRef<HTMLElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // keep collapsed cards out of the tab order and away from screen readers
    if (open) inner.current?.removeAttribute('inert')
    else inner.current?.setAttribute('inert', '')
  }, [open])

  const toggle = () => {
    const next = !open
    setOpen(next)
    if (!next) section.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="sec" id="work" aria-labelledby="work-h" ref={section}>
      <div className="sec-head">
        <span className="label">Selected work</span>
        <h2 id="work-h">
          Problems founders <em>trusted me with.</em>
        </h2>
        <p>Four products, four different worries. Each one started with a question, not a spec.</p>
      </div>

      <div className="work">
        {featured.map((p) => (
          <article className="tile proj" key={p.title}>
            <span className="tape" aria-hidden="true" />
            {p.image ? (
              <img className="shot" src={p.image} alt={`${p.title}: ${p.shot}`} />
            ) : (
              <div className="shot placeholder">
                <div>
                  <b>Screenshot</b>
                  {p.shot} · 16:10
                </div>
              </div>
            )}
            <div className="body">
              <span className="meta">{p.meta}</span>
              <h3>{p.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: p.story }} />
              <span className="hand moral">{p.moral}</span>
            </div>
          </article>
        ))}
      </div>

      <button className="more-toggle" aria-expanded={open} aria-controls="more-work" onClick={toggle}>
        <span>{open ? 'Show fewer projects' : `See ${more.length} more projects`}</span>
        <span className="chev" aria-hidden="true">↓</span>
      </button>

      <div className={`more-wrap${open ? ' open' : ''}`} id="more-work">
        <div className="more-inner" ref={inner}>
          <div className="more">
            {more.map((m) => (
              <article className="card" key={m.title}>
                <span className="meta">
                  <span>{m.meta}</span>
                  <b>{m.kind}</b>
                </span>
                <h3>{m.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: m.story }} />
                <span className="hand moral">{m.moral}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
