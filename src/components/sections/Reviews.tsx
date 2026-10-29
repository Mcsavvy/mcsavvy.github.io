import { reviews, type Review } from '../../content'

// Two rows drifting in opposite directions. Each row's cards are rendered twice and the track
// slides by exactly half its width, so the loop has no visible seam. The second copy is hidden
// from assistive tech and the tab order.
// both brands appear in each strip: cards 0,1 and 4,5 on top, 2,3 and 6,7 below
// card width 360 plus the 18px gap
const CARD_SPAN = 378
const rowA = reviews.filter((_, i) => i % 4 < 2)
const rowB = reviews.filter((_, i) => i % 4 >= 2)

// React 18 does not know the `inert` attribute, so it is spread in untyped.
const inertProps = { inert: '' } as object

function Card({ r, copy }: { r: Review; copy?: boolean }) {
  const host = r.site.replace(/^https?:\/\//, '')
  return (
    <figure className="rev tile" {...(copy ? { 'aria-hidden': true, ...inertProps } : {})}>
      <blockquote>{r.quote}</blockquote>
      <figcaption>
        <img className={`rev-photo${r.avatar === 'logo' ? ' logo' : ''}`} src={r[r.avatar]} alt="" width="44" height="44" loading="lazy" />
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
  // repeat the items until one half is wider than a large screen; only the first pass is real
  // content, every other card is a hidden copy that keeps the loop seamless
  const passes = Math.max(2, Math.ceil(2800 / (items.length * CARD_SPAN)))
  const half = (real: boolean) =>
    Array.from({ length: passes }, (_, p) => items.map((r, i) => <Card r={r} copy={!real || p > 0} key={`${p}-${i}`} />))
  return (
    <div className={`marquee${reverse ? ' rev-back' : ''}`}>
      <div className="marquee-track">
        <div className="marquee-half">{half(true)}</div>
        <div className="marquee-half" aria-hidden="true">{half(false)}</div>
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
        {rowA.length > 0 && <Row items={rowA} />}
        {rowB.length > 0 && <Row items={rowB} reverse />}
      </div>
    </section>
  )
}
