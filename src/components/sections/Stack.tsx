import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

const CELLS: { title: string; content: ReactNode }[] = [
  {
    title: 'Languages',
    content: (
      <>
        <b>TypeScript</b>, <b>Python</b>, Clarity, Solidity, JavaScript, Ruby, C
      </>
    ),
  },
  {
    title: 'Backend',
    content: (
      <>
        <b>NestJS</b>, <b>FastAPI</b>, Django + DRF, Express, <b>Prisma</b>, SQLAlchemy, TypeORM
      </>
    ),
  },
  {
    title: 'Frontend',
    content: (
      <>
        <b>Next.js App Router</b>, <b>React 19</b>, Tailwind v4, shadcn/ui, React Query, Zustand, React Native,
        Capacitor, Remotion
      </>
    ),
  },
  {
    title: 'AI & LLM',
    content: (
      <>
        <b>LangGraph</b>, <b>LangChain</b>, Anthropic Claude API, OpenRouter, pgvector, FAISS, OpenAI embeddings,
        prompt design for code generation
      </>
    ),
  },
  {
    title: 'Data & infrastructure',
    content: (
      <>
        <b>PostgreSQL</b>, MongoDB, <b>Redis</b>, <b>BullMQ</b>, Docker, Turborepo, AWS Lambda and Step Functions,
        Vercel, Hetzner, Backblaze B2, Sentry
      </>
    ),
  },
  {
    title: 'Domain',
    content: (
      <>
        Real-time fraud rules, credit scoring, KYC and AML, offline-first sync, kobo precision, Paystack, Termii,
        Dojah, Mono, NDPR, CQC, GDPR
      </>
    ),
  },
]

export default function Stack() {
  const h2 = useReveal<HTMLHeadingElement>()
  const sub = useReveal<HTMLParagraphElement>()
  const grid = useReveal<HTMLDivElement>()

  return (
    <section id="stack">
      <div className="wrap">
        <p className="eyebrow">03 / Stack</p>
        <h2 ref={h2.ref} className={h2.className} style={h2.style}>
          What I reach for
        </h2>
        <p ref={sub.ref} className={`sub ${sub.className}`} style={sub.style}>
          Bold means daily, at production depth.
        </p>

        <div ref={grid.ref} className={`grid ${grid.className}`} style={grid.style}>
          {CELLS.map((cell) => (
            <div className="cell" key={cell.title}>
              <h5>{cell.title}</h5>
              <p>{cell.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
