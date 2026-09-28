import { useEffect, useRef } from 'react'
import { receipts } from '../../content'
import { Underline } from '../Pencil'

export default function Hero() {
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.removeAttribute('autoplay')
      v.pause()
    }
  }, [])

  return (
    <header id="top">
      <nav className="nav" aria-label="Main">
        <a className="brand" href="#top">
          <i aria-hidden="true">DJ</i>David John
        </a>
        <ul>
          <li><a href="#work">Work</a></li>
          <li><a href="#how">How I work</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <a className="nav-call" href="#contact">Book a call ↗</a>
      </nav>

      <div className="bento">
        <div className="tile t-video">
          <video
            ref={video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero-poster.jpg"
            aria-label="Animation in four steps. The idea: a founder says I have an idea, is it even possible? The answer: yes, here is how. The plan: discovery, architecture, build. The product: secure, live, yours."
          >
            <source src="/hero-motion.webm" type="video/webm" />
            <source src="/hero-motion.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="t-sub">
          <span className="kicker">Fractional CTO &amp; Software Architect</span>
          <h1>
            I help founders go from <em>“is this even possible?”</em> to a secure, live product.
          </h1>
          <p>
            You bring the problem. I bring the judgment: what to build, what to skip, and how to keep it
            standing once real people use it.
          </p>
        </div>

        <figure className="tile t-photo">
          <span className="tape" aria-hidden="true" />
          <img src="/portrait.jpg" alt="David John, smiling, in an olive polo shirt" width={600} height={800} />
          <figcaption className="hand">that's me, David</figcaption>
        </figure>

        <a className="tile t-cta" href="#contact">
          <span className="label">Next step</span>
          <b>Tell me the idea. I'll tell you if it's possible.</b>
          <span className="go">
            <span>Book a 30-min discovery call</span>
            <span aria-hidden="true">→</span>
          </span>
        </a>
      </div>

      <section className="receipts" aria-label="Proof">
        <span className="label">Receipts, not claims</span>
        <div className="receipts-row">
          {receipts.map((r) => (
            <div className="tile stat" key={r.big}>
              <b className={r.small ? 'small' : undefined}>
                {r.big}
                {r.unit && <span>{r.unit}</span>}
                {r.underline && <Underline />}
              </b>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </section>
    </header>
  )
}
