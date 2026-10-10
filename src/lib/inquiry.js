// 섭외 문의 폼 — 입력 검사와 전송 내용 만들기

export const emptyInquiry = {
  org: '',
  name: '',
  phone: '',
  email: '',
  date: '',
  size: '',
  topic: '',
  format: '',
  region: '',
  message: '',
  agree: false,
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^0\d{1,2}-?\d{3,4}-?\d{4}$/

export function validateInquiry(v) {
  const e = {}
  if (!v.org.trim()) e.org = '회사(기관)명을 입력해 주세요.'
  if (!v.name.trim()) e.name = '담당자 성함을 입력해 주세요.'
  if (!v.phone.trim()) e.phone = '연락처를 입력해 주세요.'
  else if (!PHONE.test(v.phone.replace(/\s/g, ''))) e.phone = '연락처 형식을 확인해 주세요. (예: 010-1234-5678)'
  if (!v.email.trim()) e.email = '이메일을 입력해 주세요.'
  else if (!EMAIL.test(v.email.trim())) e.email = '이메일 형식을 확인해 주세요.'
  if (!v.agree) e.agree = '개인정보 수집·이용에 동의해 주세요.'
  return e
}

export function inquirySubject(v) {
  return `[강의 섭외 문의] ${v.org.trim()}${v.topic ? ` · ${v.topic}` : ''}`
}

export function inquiryLines(v) {
  return [
    ['회사(기관)·직함', v.org],
    ['담당자', v.name],
    ['연락처', v.phone],
    ['이메일', v.email],
    ['희망 일정', v.date],
    ['교육 인원', /^\d+$/.test(String(v.size).trim()) ? `${String(v.size).trim()}명` : v.size],
    ['관심 강의', v.topic],
    ['교육 방식', v.format],
    ['교육 지역', v.region],
  ]
    .filter(([, val]) => String(val || '').trim())
    .map(([k, val]) => `${k}: ${String(val).trim()}`)
    .concat(v.message.trim() ? ['', '문의 내용:', v.message.trim()] : [])
    .join('\n')
}

export function inquiryMailto(to, v) {
  return `mailto:${to}?subject=${encodeURIComponent(inquirySubject(v))}&body=${encodeURIComponent(inquiryLines(v))}`
}

// 구글 시트(Apps Script 웹 앱)로 전송합니다.
// 시트 열: 이름 / 이메일 / 전화번호 / 회사,직함 / 강의 문의 내용
export function sheetPayload(v) {
  const details = [
    ['희망 일정', v.date],
    ['교육 인원', /^\d+$/.test(String(v.size).trim()) ? `${String(v.size).trim()}명` : v.size],
    ['관심 강의', v.topic],
    ['교육 방식', v.format],
    ['교육 지역', v.region],
  ]
    .filter(([, val]) => String(val || '').trim())
    .map(([k, val]) => `${k}: ${String(val).trim()}`)
  return {
    name: v.name.trim(),
    email: v.email.trim(),
    phone: v.phone.trim(),
    company: v.org.trim(),
    message: [details.join('\n'), v.message.trim()].filter(Boolean).join('\n\n'),
  }
}

export async function sendToSheet(url, v) {
  // text/plain 으로 보내야 브라우저의 사전 확인 요청 없이 Apps Script 가 받을 수 있습니다.
  const res = await fetch(url, { method: 'POST', body: JSON.stringify(sheetPayload(v)) })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.ok !== true) throw new Error(data.error || `HTTP ${res.status}`)
  return true
}

// Web3Forms 로 전송합니다. 성공하면 true, 실패하면 오류를 던집니다.
export async function sendInquiry(accessKey, v) {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: inquirySubject(v),
      from_name: `${v.org.trim()} ${v.name.trim()}`,
      replyto: v.email.trim(),
      message: inquiryLines(v),
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.success === false) throw new Error(data.message || `HTTP ${res.status}`)
  return true
}
