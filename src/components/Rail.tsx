import { useScrollSpy } from '../hooks/useScrollSpy'

const LINKS = [
  { id: 'top', hash: 'a1f2c9', label: 'intro' },
  { id: 'work', hash: '7d0b41', label: 'systems' },
  { id: 'experience', hash: '3e94aa', label: 'experience' },
  { id: 'stack', hash: 'c518e2', label: 'stack' },
  { id: 'writing', hash: '0b6d37', label: 'writing' },
  { id: 'contact', hash: 'f4a70d', label: 'contact' },
]

const IDS = LINKS.map((link) => link.id)

export default function Rail() {
  const active = useScrollSpy(IDS)

  return (
    <nav className="rail" aria-label="Sections">
      <div className="rail-head">
        <b>david john</b>log --oneline
      </div>
      {LINKS.map((link) => (
        <a key={link.id} href={`#${link.id}`} className={active === link.id ? 'on' : undefined}>
          <span className="hash">{link.hash}</span>
          <span>{link.label}</span>
        </a>
      ))}
      <div className="rail-foot">
        <span>lagos, ng</span>
        <span>utc+1</span>
      </div>
    </nav>
  )
}
