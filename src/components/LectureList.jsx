import { blogLectures, profile } from '../data/site.js'
import './LectureList.css'

export default function LectureList() {
  if (blogLectures.length === 0) return null

  return (
    <section className="section lectures" id="lectures" aria-labelledby="lectures-title">
      <div className="container">
        <div className="section-head lectures-head">
          <div>
            <span className="eyebrow">Lectures</span>
            <h2 id="lectures-title" className="section-title">
              후기로 만나는 강의 현장
            </h2>
            <p className="section-lead">수강생 후기가 남아 있는 대표 강의입니다. 카드를 누르면 블로그 후기로 이동합니다.</p>
          </div>
          <a className="lectures-all" href={profile.blog} target="_blank" rel="noopener noreferrer">
            블로그 전체 보기 <span aria-hidden="true">↗</span>
          </a>
        </div>

        <ul className="lecture-grid">
          {blogLectures.map((l) => (
            <li key={l.url || l.title}>
              <a className="lecture-card" href={l.url || profile.blog} target="_blank" rel="noopener noreferrer">
                {l.tag && <span className="lecture-tag">{l.tag}</span>}
                <h3 className="lecture-title">{l.title}</h3>
                <p className="lecture-desc">{l.desc}</p>
                <span className="lecture-more">
                  후기 보기 <span aria-hidden="true">↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
