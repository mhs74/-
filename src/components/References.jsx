import { affiliations } from '../data/site.js'
import './References.css'

export default function References() {
  return (
    <section className="references" id="references" aria-labelledby="references-title">
      <div className="container">
        <div className="ref-head">
          <h2 id="references-title" className="ref-title">
            26년 현장 경력과{' '}
            <br className="br-mobile" />
            AI 전문 기관 활동으로 검증된 강사
          </h2>
          <p className="ref-note">경력 · 활동 기관</p>
        </div>

        <ul className="ref-grid">
          {affiliations.map((a) => (
            <li className="ref-badge" key={a.name}>
              <span className="ref-mark" aria-hidden="true">
                {a.mark}
              </span>
              <span className="ref-text">
                <strong>{a.name}</strong>
                <span>{a.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
