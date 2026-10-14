import { profile } from '../data/site.js'
import ContactForm from './ContactForm.jsx'
import './Contact.css'

export default function Contact() {
  const tel = profile.phone.replace(/-/g, '')

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-inner">
        <div className="contact-info">
          <span className="eyebrow">Contact</span>
          <h2 id="contact-title" className="contact-title">
            구성원이 다음 날 바로 쓰는{' '}
            <br />
            AI 교육, 함께 설계하겠습니다.
          </h2>
          <p className="contact-lead">교육 대상, 인원, 희망 일정을 알려주시면 기관에 맞는 커리큘럼을 제안해 드립니다.</p>

          <address className="contact-lines">
            <a href={`mailto:${profile.email}`}>
              <span>이메일</span>
              {profile.email}
            </a>
            <a href={`tel:${tel}`}>
              <span>전화</span>
              {profile.phone}
            </a>
          </address>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
