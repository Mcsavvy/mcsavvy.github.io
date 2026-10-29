import { clientSites } from '../../content'

export default function Sites() {
  return (
    <section className="sec sites" id="sites" aria-labelledby="sites-h">
      <div className="sec-head">
        <span className="label">Also live</span>
        <h2 id="sites-h">Small businesses, on the web.</h2>
      </div>
      <ul className="sites-row">
        {clientSites.map((c) => (
          <li key={c.name}>
            <a className="site" href={c.href} target="_blank" rel="noopener noreferrer">
              <img src={c.image} alt={c.alt} width={800} height={500} loading="lazy" />
              <span className="site-name">{c.name}</span>
              <span className="site-kind">{c.kind}</span>
              <span className="site-host">{c.host} ↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
