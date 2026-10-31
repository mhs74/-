import { instagram, profile } from '../data/site.js'
import './Instagram.css'

const tones = ['tone-1', 'tone-2', 'tone-3', 'tone-4', 'tone-5', 'tone-6']

export default function Instagram() {
  const { handle, displayName, bio, highlights, posts } = instagram
  const base = import.meta.env.BASE_URL

  return (
    <section className="section insta" id="instagram" aria-labelledby="insta-title">
      <div className="container insta-layout">
        <div className="insta-copy">
          <span className="eyebrow">Instagram</span>
          <h2 id="insta-title" className="section-title">
            강의 소식은
            <br />
            인스타그램에서
          </h2>
          <p className="section-lead">
            강의 현장, 바로 따라 하는 AI 활용 팁, 새 책 소식을 @{handle} 에 올리고 있습니다.
          </p>
          <a className="btn insta-follow-btn" href={profile.instagram} target="_blank" rel="noopener noreferrer">
            @{handle} 팔로우 <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="ig-phone" role="group" aria-label={`인스타그램 @${handle} 프로필 미리보기`}>
          <div className="ig-topbar">
            <span className="ig-handle">{handle}</span>
            <span className="ig-dots" aria-hidden="true">···</span>
          </div>

          <div className="ig-profile">
            <a className="ig-avatar" href={profile.instagram} target="_blank" rel="noopener noreferrer">
              <img src={profile.photo} alt={`${profile.name} 인스타그램 프로필 사진`} loading="lazy" />
            </a>
            <div className="ig-meta">
              <strong className="ig-name">{displayName}</strong>
              <span className="ig-role">{profile.title}</span>
            </div>
          </div>

          <div className="ig-bio">
            {bio.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <a href={profile.linktree} target="_blank" rel="noopener noreferrer">
              {profile.linktree.replace(/^https?:\/\//, '')}
            </a>
          </div>

          <div className="ig-actions">
            <a className="ig-btn ig-btn-primary" href={profile.instagram} target="_blank" rel="noopener noreferrer">
              팔로우
            </a>
            <a className="ig-btn" href="#contact">
              강의 문의
            </a>
          </div>

          {highlights.length > 0 && (
            <ul className="ig-highlights" aria-label="하이라이트">
              {highlights.map((h) => (
                <li key={h.label}>
                  <span className="ig-hl-ring" aria-hidden="true">
                    <span>{h.emoji}</span>
                  </span>
                  <span className="ig-hl-label">{h.label}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="ig-tabs" aria-hidden="true">
            <span className="is-active">▦</span>
            <span>▶</span>
            <span>◎</span>
          </div>

          <ul className="ig-grid">
            {posts.map((p, i) => (
              <li key={p.title}>
                <a
                  className={`ig-post ${p.image ? 'has-image' : tones[i % tones.length]}`}
                  href={p.url || profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.image ? (
                    <img src={`${base}images/${p.image}`} alt={p.title} loading="lazy" />
                  ) : (
                    <span className="ig-post-text">
                      <strong>{p.title}</strong>
                      {p.sub && <span>{p.sub}</span>}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
