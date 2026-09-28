// Hand-drawn pencil marks shared across sections.

export function PencilFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <filter id="pencil">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={2} seed={7} />
          <feDisplacementMap in="SourceGraphic" scale={2.6} />
        </filter>
      </defs>
    </svg>
  )
}

export function Underline({ className = '' }: { className?: string }) {
  return (
    <svg className={`pen-underline ${className}`} viewBox="0 0 100 14" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M2 8 C 30 3, 60 12, 98 5"
        fill="none"
        stroke="var(--paper-vellum)"
        strokeWidth={2.4}
        strokeLinecap="round"
        filter="url(#pencil)"
        pathLength={1}
      />
    </svg>
  )
}

export function Circle({ gold = false }: { gold?: boolean }) {
  return (
    <svg viewBox="0 0 42 42" aria-hidden="true">
      <path
        d="M21 3 C 36 3, 40 16, 38 26 C 35 38, 10 40, 5 27 C 1 14, 11 3, 25 4"
        fill="none"
        stroke={gold ? 'var(--paper-vellum)' : 'var(--paper-ink)'}
        strokeWidth={gold ? 1.8 : 1.4}
        strokeLinecap="round"
        filter="url(#pencil)"
      />
    </svg>
  )
}
