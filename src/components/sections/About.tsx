import { about } from '../../content'
import { Underline } from '../Pencil'

export default function About() {
  return (
    <section className="sec" id="about" aria-labelledby="about-h">
      <span className="label">About David</span>
      <div className="about">
        <h2 className="quote" id="about-h">
          A “yes” costs nothing.{' '}
          <span>
            The bill arrives six months later.
            <Underline />
          </span>
        </h2>
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
