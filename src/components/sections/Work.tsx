import { useReveal, staggerDelay } from '../../hooks/useReveal'

type Proof = { label: string; href: string }

type CaseStudy = {
  name: string
  tag: string
  constraint: string
  ctx: string
  meta: string
  proof: Proof[]
}

const CASES: CaseStudy[] = [
  {
    name: 'ALi',
    tag: 'agentic AI',
    constraint:
      'The agent had to stop mid-run, ask the user a question, and resume the same execution. Restarting the turn would have thrown away the tool context.',
    ctx: 'Multi-tenant RAG platform. Each client gets a full PostgreSQL schema rather than a tenant column. Retrieval merges pgvector similarity with fulltext ranking through Reciprocal Rank Fusion, then reranks with an LLM. Ingestion covers PDF, DOCX, XLSX, PPTX and scanned images.',
    meta: 'NestJS · Python · Next.js 16 · LangGraph · pgvector · MongoDB checkpointing',
    proof: [
      { label: 'Code', href: 'https://github.com/Mcsavvy/ali' },
      { label: 'Live demo', href: 'https://ali.example.com' },
      { label: 'Write-up', href: 'https://medium.com/@mcsavvy/langgraph-interrupt-resume' },
    ],
  },
  {
    name: 'CreditVeto',
    tag: 'fintech',
    constraint:
      'You cannot test a fraud rule offline. Real traffic is the only honest test set, and blocking a good customer costs more than missing a bad one.',
    ctx: "Shadow mode scores live transactions without blocking anyone, so a rule earns its way into enforcement. Redis pub/sub reloads thresholds without a deploy. Eight rules run in parallel: velocity, structuring, new-device high-value, impossible travel above 900km/h, amount Z-score against the user's own baseline.",
    meta: '5 NestJS microservices · FastAPI scoring · PostgreSQL · MongoDB · Redis · React Native',
    proof: [
      { label: 'Product', href: 'https://creditveto.example.com' },
      { label: 'Write-up', href: 'https://medium.com/@mcsavvy/fraud-engine-from-scratch' },
    ],
  },
  {
    name: 'Ornate Healthcare / Trakitt v3',
    tag: 'regulated',
    constraint:
      'An inspector reads the audit trail as legal evidence. No row can ever change, so corrections append and the schema makes in-place mutation impossible.',
    ctx: 'Single-tenant KPI platform for a UK domiciliary care provider. 41 KPIs across three manager types map to the CQC Single Assessment Framework, with L0 to L4 alert escalation on durable pg-boss jobs and live delivery over SSE. Data stays in the UK and EU.',
    meta: 'NestJS · Next.js · Prisma · pg-boss · Auth.js v5 · Sentry · Hostinger UK',
    proof: [
      { label: 'Code', href: 'https://github.com/Mcsavvy/trakitt' },
      { label: 'Write-up', href: 'https://medium.com/@mcsavvy/cqc-audit-trails-in-code' },
    ],
  },
  {
    name: 'MyFinbuk',
    tag: 'offline-first',
    constraint:
      'A user comes back online with 47 queued operations, one of which references a customer created while offline. That customer has no real ID yet.',
    ctx: 'The sync engine orders operations by dependency and resolves temporary UUIDs to real ones before the server sees anything. Four coordinated apps: PWA plus native shell, background worker, marketing automation, CMS homepage. Money is stored in kobo and invoices carry FIRS VAT categories.',
    meta: 'Next.js 16 · Payload CMS 3 · BullMQ · IndexedDB · Capacitor v8',
    proof: [
      { label: 'Product', href: 'https://myfinbuk.example.com' },
      { label: 'Code', href: 'https://github.com/Mcsavvy/myfinbuk' },
      { label: 'Write-up', href: 'https://medium.com/@mcsavvy/offline-first-sync' },
    ],
  },
  {
    name: 'Shotkeet',
    tag: '3 days · 178 commits',
    constraint:
      "Remotion's bundler cannot run inside Next.js. Webpack collides with webpack, so the renderer and the app had to live on different machines.",
    ctx: 'Prompt-to-MP4 generator. Claude writes Remotion TSX, a safety pass scans the generated code for eval, require and filesystem access, webpack bundles it, and the render lands on Backblaze B2 behind a Cloudflare CDN. App on Vercel, worker on a Hetzner box, queue as the contract between them.',
    meta: 'Next.js 15 · Remotion 4 · Claude Sonnet via OpenRouter · BullMQ · Neon',
    proof: [
      { label: 'Live demo', href: 'https://shotkeet.example.com' },
      { label: 'Code', href: 'https://github.com/Mcsavvy/shotkeet' },
      { label: 'Write-up', href: 'https://medium.com/@mcsavvy/video-saas-in-3-days' },
    ],
  },
  {
    name: 'PoolMind',
    tag: 'blockchain',
    constraint:
      'Stacks confirmations are slow and NAV share pricing needs settled state. The fund cannot quote a price on a transaction that might not land.',
    ctx: "Decentralised arbitrage fund on Stacks. A 379-line SIP-010 Clarity contract prices shares against NAV, routes configurable entry and exit fees, and supports an emergency pause. A Bull queue polls 60 times at five-second intervals, and HMAC signing with constant-time comparison guards the Python agent's calls to the orchestrator.",
    meta: 'Turborepo · NestJS · Clarity · Clarinet · Bull · Telegraf',
    proof: [
      { label: 'Code', href: 'https://github.com/Mcsavvy/poolmind' },
      { label: 'Contract', href: 'https://explorer.hiro.so/txid/poolmind' },
    ],
  },
]

function Case({ item, index }: { item: CaseStudy; index: number }) {
  const { ref, className, style } = useReveal<HTMLDivElement>(staggerDelay(index))

  return (
    <div ref={ref} className={`case ${className}`} style={style}>
      <p className="constraint">{item.constraint}</p>
      <div className="case-id">
        <h3>{item.name}</h3>
        <span className="tag">{item.tag}</span>
      </div>
      <p className="ctx">{item.ctx}</p>
      <p className="meta">{item.meta}</p>
      <div className="proof">
        {item.proof.map((p) => (
          <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer">
            {p.label}
          </a>
        ))}
      </div>
    </div>
  )
}

export default function Work() {
  const h2 = useReveal<HTMLHeadingElement>()
  const sub = useReveal<HTMLParagraphElement>()

  return (
    <section id="work">
      <div className="wrap">
        <p className="eyebrow">01 / Systems</p>
        <h2 ref={h2.ref} className={h2.className} style={h2.style}>
          The constraint came first
        </h2>
        <p ref={sub.ref} className={`sub ${sub.className}`} style={sub.style}>
          Every system below starts with the problem that forced the architecture. Code and demos are linked.
        </p>

        {CASES.map((item, i) => (
          <Case key={item.name} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
