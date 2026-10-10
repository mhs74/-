import { profile } from '../data/site.js'
import './Contact.css'

const mailSubject = encodeURIComponent('[강의 의뢰] 기관명 / 희망 일정')
const mailBody = encodeURIComponent(
  ['기관명:', '담당자 / 연락처:', '교육 대상 · 인원:', '희망 일정 · 시간:', '관심 강의:', '', '문의 내용:'].join('\n'),
)

export default function Contact() {
  const tel = profile.phone.replace(/-/g, '')

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-inner">
        <div>
          <span className="eyebrow">Contact</span>
          <h2 id="contact-title" className="contact-title">
            구성원이 다음 날 바로 쓰는{' '}
            <br />
            AI 교육, 함께 설계하겠습니다.
          </h2>
          <p className="contact-lead">교육 대상, 인원, 희망 일정을 알려주시면 기관에 맞는 커리큘럼을 제안해 드립니다.</p>
        </div>

        <div className="contact-actions">
          <a className="btn btn-primary contact-main" href={`mailto:${profile.email}?subject=${mailSubject}&body=${mailBody}`}>
            이메일로 강의 의뢰하기 <span className="arrow" aria-hidden="true">→</span>
          </a>
          <div className="contact-lines">
            <a href={`mailto:${profile.email}`}>
              <span>이메일</span>
              {profile.email}
            </a>
            <a href={`tel:${tel}`}>
              <span>전화</span>
              {profile.phone}
            </a>
          </div>
        </div>
      </div>

      <footer className="container site-footer">
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
      </footer>
    </section>
  )
}
