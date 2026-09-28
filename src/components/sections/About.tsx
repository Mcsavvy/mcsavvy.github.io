import { about } from '../../content'
import { Underline } from '../Pencil'

export default function About() {
  return (
    <section className="sec" id="about" aria-labelledby="about-h">
      <div className="sec-head">
        <span className="label" id="about-h">About David</span>
      </div>
      <div className="about">
        <p className="quote">
          A yes costs nothing.{' '}
          <span>
            The bill arrives six months later.
            <Underline />
          </span>
        </p>
        <div className="copy">
          <p className="lead">{about.lead}</p>
          {about.body.map((t) => (
            <p key={t}>{t}</p>
          ))}
          <p className="close">{about.close}</p>
        </div>
      </div>
    </section>
  )
}
