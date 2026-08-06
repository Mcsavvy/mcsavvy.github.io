import { useReveal } from '../../hooks/useReveal'

const WANT = [
  {
    term: 'Role',
    detail: 'Senior backend or platform engineer. Teams building AI systems, fintech, or regulated software.',
  },
  {
    term: 'Arrangement',
    detail: 'Remote, full-time. Lagos, UTC+1, overlapping European and US East hours.',
  },
  { term: 'Notice', detail: 'Four weeks from offer.' },
  {
    term: 'Not looking for',
    detail: 'Frontend-only roles, or work where nobody owns the architecture.',
  },
]

const LINKS = [
  { label: 'Résumé, PDF', href: '/david-john-resume.pdf', download: true },
  { label: 'github.com/Mcsavvy', href: 'https://github.com/Mcsavvy' },
  { label: 'medium.com/@mcsavvy', href: 'https://medium.com/@mcsavvy' },
  { label: 'x.com/davemcsavvy', href: 'https://twitter.com/davemcsavvy' },
  { label: '+234 808 879 2254', href: 'tel:+2348088792254' },
]

export default function Contact() {
  const h2 = useReveal<HTMLHeadingElement>()
  const sub = useReveal<HTMLParagraphElement>()
  const want = useReveal<HTMLDListElement>()
  const mail = useReveal<HTMLAnchorElement>()
  const links = useReveal<HTMLDivElement>()

  return (
    <section id="contact">
      <div className="wrap">
        <p className="eyebrow">05 / Contact</p>
        <h2 ref={h2.ref} className={h2.className} style={h2.style}>
          What I am looking for
        </h2>
        <p ref={sub.ref} className={`sub ${sub.className}`} style={sub.style}>
          If the shape below fits, the fastest thing you can do is email me.
        </p>

        <dl ref={want.ref} className={`want ${want.className}`} style={want.style}>
          {WANT.map((item) => (
            <div key={item.term}>
              <dt>{item.term}</dt>
              <dd>{item.detail}</dd>
            </div>
          ))}
        </dl>

        <a
          ref={mail.ref}
          className={`mail ${mail.className}`}
          style={mail.style}
          href="mailto:david@futurdevs.com"
        >
          david@futurdevs.com
        </a>

        <div ref={links.ref} className={`links ${links.className}`} style={links.style}>
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              download={link.download}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>

        <footer>
          David John (Chukwuemeka) &nbsp;&middot;&nbsp; Lagos, Nigeria
          <br />
          ALX Certified Software Engineer, 2024 &nbsp;&middot;&nbsp; Hashgraph Developer, 2025
        </footer>
      </div>
    </section>
  )
}
