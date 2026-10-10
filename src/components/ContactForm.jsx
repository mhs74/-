import { useRef, useState } from 'react'
import { inquiryForm, profile, programs } from '../data/site.js'
import { emptyInquiry, inquiryMailto, sendInquiry, validateInquiry } from '../lib/inquiry.js'
import './ContactForm.css'

const ORDER = ['org', 'name', 'phone', 'email', 'agree']

export default function ContactForm() {
  const [values, setValues] = useState(emptyInquiry)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error
  const formRef = useRef(null)
  const direct = Boolean(inquiryForm.accessKey)

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    // 스팸 방지용 숨은 칸이 채워져 있으면 조용히 무시합니다.
    if (formRef.current?.elements.botcheck?.checked) return

    const found = validateInquiry(values)
    setErrors(found)
    const first = ORDER.find((k) => found[k])
    if (first) {
      formRef.current?.elements[first]?.focus()
      return
    }

    if (!direct) {
      window.location.href = inquiryMailto(profile.email, values)
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      await sendInquiry(inquiryForm.accessKey, values)
      setStatus('sent')
      setValues(emptyInquiry)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="inquiry inquiry-done" role="status">
        <span className="done-mark" aria-hidden="true">✓</span>
        <h3>문의가 접수되었습니다</h3>
        <p>내용을 확인한 뒤 남겨주신 연락처로 회신드리겠습니다.</p>
        <button type="button" className="inquiry-reset" onClick={() => setStatus('idle')}>
          새 문의 작성하기
        </button>
      </div>
    )
  }

  const field = (key, label, props = {}, required = false) => (
    <div className={`f-field${errors[key] ? ' has-error' : ''}`}>
      <label htmlFor={`f-${key}`}>
        {label}
        {required && <span className="f-req"> (필수)</span>}
      </label>
      <input
        id={`f-${key}`}
        name={key}
        value={values[key]}
        onChange={set(key)}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `f-${key}-err` : undefined}
        {...props}
      />
      {errors[key] && (
        <p className="f-error" id={`f-${key}-err`}>
          {errors[key]}
        </p>
      )}
    </div>
  )

  return (
    <form ref={formRef} className="inquiry" onSubmit={onSubmit} noValidate aria-labelledby="inquiry-title">
      <h3 id="inquiry-title" className="inquiry-title">
        강의 섭외 문의
      </h3>
      <p className="inquiry-note">
        {direct
          ? '작성해 주시면 담당 강사에게 바로 전달됩니다.'
          : `보내기를 누르면 메일 앱이 열리고, 작성하신 내용이 ${profile.email} 으로 채워집니다.`}
      </p>

      <input type="checkbox" name="botcheck" className="f-bot" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="f-row">
        {field('org', '기관명', { autoComplete: 'organization', placeholder: '예: ○○공사 인재개발팀' }, true)}
        {field('name', '담당자', { autoComplete: 'name', placeholder: '성함' }, true)}
      </div>
      <div className="f-row">
        {field('phone', '연락처', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '010-0000-0000' }, true)}
        {field('email', '이메일', { type: 'email', autoComplete: 'email', placeholder: 'name@company.com' }, true)}
      </div>
      <div className="f-row">
        {field('date', '희망 일정', { placeholder: '예: 11월 셋째 주 오후' })}
        {field('size', '교육 인원', { placeholder: '예: 30명' })}
      </div>

      <div className="f-field">
        <label htmlFor="f-topic">관심 강의</label>
        <select id="f-topic" name="topic" value={values.topic} onChange={set('topic')}>
          <option value="">선택해 주세요</option>
          {programs.map((p) => (
            <option key={p.id} value={p.title}>
              {p.title}
            </option>
          ))}
          <option value="맞춤 강의">기관 맞춤 강의</option>
        </select>
      </div>

      <fieldset className="f-field f-choices">
        <legend>교육 방식</legend>
        <div className="f-chips">
          {inquiryForm.formats.map((f) => (
            <label key={f} className={`f-chip${values.format === f ? ' is-on' : ''}`}>
              <input type="radio" name="format" value={f} checked={values.format === f} onChange={set('format')} />
              {f}
            </label>
          ))}
        </div>
      </fieldset>

      {field('region', '교육 지역', { placeholder: '예: 서울 강남구 / 세종시' })}

      <div className="f-field">
        <label htmlFor="f-message">문의 내용</label>
        <textarea
          id="f-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={set('message')}
          placeholder="교육 대상, 목적, 원하시는 내용을 자유롭게 적어 주세요."
        />
      </div>

      <div className={`f-agree${errors.agree ? ' has-error' : ''}`}>
        <label>
          <input
            type="checkbox"
            name="agree"
            checked={values.agree}
            onChange={set('agree')}
            aria-invalid={Boolean(errors.agree)}
            aria-describedby="f-agree-info"
          />
          <span>개인정보 수집·이용에 동의합니다. (필수)</span>
        </label>
        <p id="f-agree-info" className="f-agree-info">
          수집 항목: 기관명, 담당자, 연락처, 이메일 · 이용 목적: 강의 섭외 상담 및 회신 · 보유 기간: 상담 완료 후 1년
        </p>
        {errors.agree && <p className="f-error">{errors.agree}</p>}
      </div>

      {status === 'error' && (
        <p className="f-alert" role="alert">
          전송하지 못했습니다. 잠시 후 다시 시도하시거나 {profile.email} 으로 메일을 보내 주세요.
        </p>
      )}
      {status === 'mailto' && (
        <p className="f-alert is-info" role="status">
          메일 앱에서 내용을 확인하고 전송해 주세요. 메일 앱이 열리지 않으면 {profile.email} 으로 직접 보내 주세요.
        </p>
      )}

      <button type="submit" className="btn btn-primary inquiry-submit" disabled={status === 'sending'}>
        {status === 'sending' ? '보내는 중…' : '문의 보내기'}
        {status !== 'sending' && (
          <span className="arrow" aria-hidden="true">
            →
          </span>
        )}
      </button>
    </form>
  )
}
