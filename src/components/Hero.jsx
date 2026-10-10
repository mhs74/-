import { profile, proofPoints } from '../data/site.js'
import './Hero.css'

export default function Hero() {
  const [line1, line2] = profile.slogan

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span className="hero-kicker">생성형 AI 기업교육 강사 · {profile.name}</span>
            <span className="hero-slogan">
              {line1}
              <br />
              <em>AI</em>
              {line2.replace(/^AI/, '')}
            </span>
          </h1>

          <p className="hero-summary">{profile.summary}</p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">
              강의 의뢰하기 <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a className="btn btn-outline" href="#curriculum">
              커리큘럼 보기
            </a>
          </div>

          <dl className="proof">
            {proofPoints.map((p) => (
              <div className="proof-item" key={p.label}>
                <dt>{p.label}</dt>
                <dd>{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="hero-figure">
          <div className="portrait">
            <img
              src={profile.photo}
              alt={`${profile.title} ${profile.name} 강사`}
              width="460"
              height="640"
              fetchPriority="high"
            />
          </div>
          <figcaption className="name-card">
            <span className="name-card-role">{profile.role}</span>
            <strong>
              {profile.title} {profile.name}
            </strong>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
