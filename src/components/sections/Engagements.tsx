import { engagements } from '../../content'

export default function Engagements() {
  if (engagements.length === 0) return null
  return (
    <section className="sec" id="ways" aria-labelledby="ways-h">
      <div className="sec-head">
        <span className="label">Working together</span>
        <h2 id="ways-h">Two ways to work together</h2>
      </div>
      <div className="ways">
        {engagements.map((e) => (
          <div className="way" key={e.title}>
            <h3>{e.title}</h3>
            <p>{e.text}</p>
            {e.price && <span className="price">{e.price}</span>}
          </div>
        ))}
      </div>
    </section>
  )
}
