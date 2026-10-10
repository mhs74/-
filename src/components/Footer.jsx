import { profile } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="site-footer-wrap">
      <div className="container site-footer">
        <p>
          © {profile.title} {profile.name}
        </p>
        <nav aria-label="외부 채널">
          <a href={profile.blog} target="_blank" rel="noopener noreferrer">
            블로그
          </a>
          <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
            인스타그램
          </a>
          <a href={profile.linktree} target="_blank" rel="noopener noreferrer">
            링크 모음
          </a>
        </nav>
      </div>
    </footer>
  )
}
