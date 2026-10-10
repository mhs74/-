import { career } from '../data/site.js'
import './Career.css'

export default function Career() {
  return (
    <section className="section career" id="career" aria-labelledby="career-title">
      <div className="container career-grid">
        <div className="career-intro">
          <span className="eyebrow">Career</span>
          <h2 id="career-title" className="section-title">
            현장에서 쌓은
            <br />
            교육 경력
          </h2>
          <p className="section-lead">26년 기업 교육 현장에서 시작해, 지금은 생성형 AI 교육과 연구로 이어지고 있습니다.</p>
        </div>

        <ol className="timeline">
          {career.map((c) => (
            <li className={`tl-item${c.status === '現' ? ' is-current' : ''}`} key={c.title}>
              <div className="tl-when">
                {c.period && <time className="tl-period">{c.period}</time>}
                <span className="tl-label">{c.label}</span>
              </div>
              <div className="tl-body">
                <h3 className="tl-title">
                  {c.status && <span className="tl-status">{c.status}</span>}
                  {c.title}
                </h3>
                <ul className="tl-items">
                  {c.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
