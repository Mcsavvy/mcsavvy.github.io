import { steps } from '../../content'
import { Circle } from '../Pencil'

export default function Process() {
  return (
    <section className="sec" id="how" aria-labelledby="how-h">
      <div className="sec-head">
        <span className="label">How I work</span>
        <h2 id="how-h">
          Questions first. <em>Code second.</em>
        </h2>
      </div>
      <ol className="how">
        {steps.map((s, i) => (
          <li className="step" key={s.n}>
            <span className="n">
              {s.n}
              <Circle gold={i === steps.length - 1} />
            </span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
