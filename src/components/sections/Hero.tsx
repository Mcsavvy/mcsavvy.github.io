const LIVE = [
  {
    name: 'ALi',
    what: 'Multi-tenant RAG platform, schema-isolated per client',
    when: 'since Apr 2026',
  },
  {
    name: 'CreditVeto',
    what: 'Credit scoring and real-time fraud detection, Thelix',
    when: 'since Jan 2026',
  },
  {
    name: 'Ornate Healthcare',
    what: 'CQC-aligned KPI platform for a UK care provider',
    when: 'since May 2026',
  },
  {
    name: 'MyFinbuk',
    what: 'Offline-first bookkeeping suite for Nigerian SMBs',
    when: 'since Apr 2026',
  },
]

export default function Hero() {
  return (
    <section id="top">
      <div className="wrap">
        <p className="status">
          <i></i>Open to senior engineering roles
        </p>

        <h1 className="open">
          Demos are easy. I build for the day the network drops, the numbers have to reconcile, and someone audits{' '}
          <b>every row you ever wrote.</b>
        </h1>

        <div className="who">
          <strong>David John, senior software engineer in Lagos.</strong>
          I work in TypeScript and Python on backend and platform systems: agentic AI, African fintech, and software
          that has to survive a regulator. Self-taught since 2020, shipping to production since 2021.
        </div>

        <div className="live">
          <p className="live-h">Running in production now</p>
          {LIVE.map((item) => (
            <div className="row" key={item.name}>
              <span className="r-name">{item.name}</span>
              <span className="r-what">{item.what}</span>
              <span className="r-when">{item.when}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
