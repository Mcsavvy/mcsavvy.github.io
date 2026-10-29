import { useState } from 'react'
import { about } from '../../content'
import { Underline } from '../Pencil'

export default function About() {
  const [open, setOpen] = useState(false)
  return (
    <section className="sec" id="about" aria-labelledby="about-h">
      <span className="label">About David</span>
      <div className="about">
        <h2 className="quote" id="about-h">
          {about.heading[0]}{' '}
          <span>
            {about.heading[1]}
            <Underline />
          </span>
        </h2>
        <div className={`copy${open ? ' open' : ''}`}>
          <p className="lead">{about.lead}</p>
          {about.body.map((t) => (
            <p className="rest" key={t}>{t}</p>
          ))}
          <p className="close">{about.close}</p>
          <button className="read-more" type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? 'Less' : 'Read more'}
          </button>
        </div>
      </div>
    </section>
  )
}
