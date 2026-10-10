import { programs } from '../data/site.js'
import './Curriculum.css'

export default function Curriculum() {
  return (
    <section className="section curriculum" id="curriculum" aria-labelledby="curriculum-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Curriculum</span>
          <h2 id="curriculum-title" className="section-title">
            대표 강의 프로그램
          </h2>
          <p className="section-lead">
            교육 대상과 목적에 맞춰 시간과 실습 내용을 조정합니다. 모든 강의는 스마트폰 하나로 따라 하는 실습 중심입니다.
          </p>
        </div>

        <div className="program-grid">
          {programs.map((p, i) => (
            <article className="program-card" key={p.id} aria-labelledby={`program-${p.id}`}>
              <div className="program-top">
                <span className="program-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="program-tag">{p.tag}</span>
              </div>
              <h3 id={`program-${p.id}`} className="program-title">
                {p.title}
              </h3>

              <dl className="program-meta">
                <div>
                  <dt>대상</dt>
                  <dd>{p.target}</dd>
                </div>
                <div>
                  <dt>시간</dt>
                  <dd>{p.duration}</dd>
                </div>
              </dl>

              <ul className="program-outcomes" aria-label="주요 내용">
                {p.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>

              <a className="program-link" href="#contact">
                이 강의 문의하기 <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
