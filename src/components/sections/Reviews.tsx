import { reviews, type Review } from '../../content'

// Two rows drifting in opposite directions. Each row's cards are rendered twice and the track
// slides by exactly half its width, so the loop has no visible seam. The second copy is hidden
// from assistive tech and the tab order.
const rowA = reviews.filter((_, i) => i % 2 === 0)
const rowB = reviews.filter((_, i) => i % 2 === 1)

function Card({ r }: { r: Review }) {
  const host = r.site.replace(/^https?:\/\//, '')
  return (
    <figure className="rev tile">
      <blockquote>{r.quote}</blockquote>
      <figcaption>
        <img className="rev-photo" src={r.photo} alt="" width="44" height="44" loading="lazy" />
        <span className="rev-who">
          <b>{r.name}</b>
          <span>{r.role}, {r.org}</span>
          <a href={r.site} target="_blank" rel="noopener noreferrer">{host} ↗</a>
        </span>
      </figcaption>
    </figure>
  )
}

function Row({ items, reverse }: { items: Review[]; reverse?: boolean }) {
  // repeat so one half is always wider than a wide screen
  const half = [...items, ...items]
  return (
    <div className={`marquee${reverse ? ' rev-back' : ''}`}>
      <div className="marquee-track">
        <div className="marquee-half">
          {half.map((r, i) => (
            <Card r={r} key={i} />
          ))}
        </div>
        <div className="marquee-half" aria-hidden="true" {...({ inert: '' } as object)}>
          {half.map((r, i) => (
            <Card r={r} key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Reviews() {
  if (reviews.length === 0) return null
  return (
    <section className="sec" id="reviews" aria-labelledby="reviews-h">
      <div className="sec-head">
        <span className="label">Kind words</span>
        <h2 id="reviews-h">
          What clients <em>say.</em>
        </h2>
        <p>Short, and in their own words.</p>
      </div>
      <div className="marquees">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  )
}
