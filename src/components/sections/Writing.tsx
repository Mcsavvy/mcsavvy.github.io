import { useReveal, staggerDelay } from '../../hooks/useReveal'

type Piece = { title: string; href: string; date: string }

const PIECES: Piece[] = [
  { title: "Why 'Clean Code' Fails At Scale", href: 'https://medium.com/@mcsavvy/clean-code-fails-at-scale', date: 'Jan 2026' },
  {
    title: 'Vibe Coding Is Fun, Until You Have to Own the System',
    href: 'https://medium.com/@mcsavvy/vibe-coding-own-the-system',
    date: '2026',
  },
  {
    title: 'Architectural Autopsy: My First AI System That Broke in Production',
    href: 'https://medium.com/@mcsavvy/architectural-autopsy',
    date: '2026',
  },
  {
    title: 'Why Most Senior Engineers Stall',
    href: 'https://medium.com/@mcsavvy/why-senior-engineers-stall',
    date: '2026',
  },
]

function PieceLink({ piece, index }: { piece: Piece; index: number }) {
  const { ref, className, style } = useReveal<HTMLAnchorElement>(staggerDelay(index))

  return (
    <a ref={ref} className={`piece ${className}`} style={style} href={piece.href} target="_blank" rel="noopener noreferrer">
      <span className="t">{piece.title}</span>
      <span className="d">{piece.date}</span>
    </a>
  )
}

export default function Writing() {
  const h2 = useReveal<HTMLHeadingElement>()
  const sub = useReveal<HTMLParagraphElement>()

  return (
    <section id="writing">
      <div className="wrap">
        <p className="eyebrow">04 / Writing</p>
        <h2 ref={h2.ref} className={h2.className} style={h2.style}>
          Sixteen articles, mostly about what broke
        </h2>
        <p ref={sub.ref} className={`sub ${sub.className}`} style={sub.style}>
          Published on Medium and DEV since 2021.
        </p>

        {PIECES.map((piece, i) => (
          <PieceLink key={piece.href} piece={piece} index={i} />
        ))}
      </div>
    </section>
  )
}
