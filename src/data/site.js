// 사이트에 들어가는 모든 문구와 정보는 이 파일에서 관리합니다.

export const profile = {
  name: '서미화',
  title: '뷰티앤웰니스AI 대표',
  role: '모바일 생성형AI 크리에이터',
  slogan: ['아름다움에', 'AI를 더하다'],
  summary:
    '아모레퍼시픽에서 26년간 지도강사·수석강사·교육담당으로 현장을 가르쳐 왔습니다. 그 경험 위에 생성형 AI를 더해, 구성원이 다음 날 바로 쓰는 실무형 AI 교육을 설계합니다.',
  photo: `${import.meta.env.BASE_URL}images/seomihwa-ai-lecturer.jpg`,
  email: 'meshe921@gmail.com',
  phone: '010-2126-2533',
  blog: 'https://blog.naver.com/ai_seach',
  instagram: 'https://instagram.com/bw.ai_lab',
  linktree: 'https://litt.ly/min.ai',
}

// 첫 화면 바로 아래에 보이는 핵심 숫자
export const proofPoints = [
  { value: '26년', label: '아모레퍼시픽 교육 경력' },
  { value: '8권', label: '저서 · 공저' },
  { value: '우수상', label: '인공지능콘텐츠강사경진대회' },
]

// 경력·활동 기관 (출강 기관 목록을 받으면 clients 로 따로 추가하세요)
export const affiliations = [
  { name: '아모레퍼시픽', role: '前 교육·강사 26년 · 연수직영점 대표', mark: 'AP' },
  { name: '(사)중소상공인SNS지원협회', role: '부회장', mark: 'SNS' },
  { name: '한국지식문화원', role: '부회장', mark: 'KC' },
  { name: 'AI리터러시협회', role: '이사', mark: 'AIL' },
  { name: '한국AI영상제작협회', role: '이사', mark: 'AIV' },
  { name: '디지털융합교육원', role: '지도교수', mark: 'DE' },
  { name: 'GEO마케팅연구원', role: '선임연구원', mark: 'GEO' },
  { name: '4차산업혁명연구원', role: '선임연구원', mark: '4IR' },
]

export const programs = [
  {
    id: 'chatgpt',
    tag: '전 직원 AI 역량',
    title: '생성형 AI 챗GPT 300% 활용법',
    target: 'AI가 처음인 임직원 · 공무원 · 소상공인',
    duration: '2시간 특강 ~ 4회 과정',
    outcomes: [
      '스마트폰으로 ChatGPT 바로 시작하기',
      '보고서 · 기획 · 메일 업무 프롬프트 실습',
      '부서별 반복 업무 자동화 아이디어 도출',
    ],
  },
  {
    id: 'marketing',
    tag: '뷰티 · 유통 · 서비스',
    title: 'AI로 혁신하는 화장품 홍보 · 마케팅',
    target: '뷰티 · 웰니스 기업 마케팅 · 영업 담당자',
    duration: '2 ~ 3시간 특강',
    outcomes: [
      'AI로 상품 소개 글 · SNS 콘텐츠 제작',
      '고객 응대 문구와 상담 스크립트 만들기',
      '홍보 이미지 · 숏폼 영상 생성 실습',
    ],
  },
  {
    id: 'branding',
    tag: '리더 · 강사 · 1인 기업',
    title: 'AI 시대의 퍼스널 브랜딩 & GEO 마케팅',
    target: '사내 강사 · 관리자 · 창업 지원 기관 수강생',
    duration: '2시간 특강 ~ 3회 과정',
    outcomes: [
      '나와 조직의 브랜드 메시지 정의',
      'AI 검색(GEO)에 노출되는 콘텐츠 전략',
      'SNS가 허공에 머물지 않는 운영 루틴',
    ],
  },
]

// 블로그 대표 후기 강의 — 강의 목록 섹션에 카드로 나옵니다.
// 블로그 글을 하나씩 추가하세요. 목록이 비어 있으면 섹션이 화면에 나오지 않습니다.
// 예시:
// { title: '○○공사 임직원 챗GPT 실무 특강', desc: '보고서 작성 시간을 줄이는 프롬프트 실습', tag: '공공기관', url: 'https://blog.naver.com/ai_seach/글번호' },
export const blogLectures = []

// 경력 — 위에서 아래로 시간 순서. period 가 없는 항목은 label 이 대신 표시됩니다.
export const career = [
  {
    period: '1997.11 — 2023.7',
    label: '26년',
    title: '아모레퍼시픽',
    status: '前',
    items: ['지도강사 · 수석강사 · 교육담당', '서비스강사 · 메이크업강사 · 디지털강사', '영업담당 · 라이브커머스', '연수직영점 대표'],
  },
  {
    period: '',
    label: '학력 · 수료',
    title: '대학원 · 최고위과정',
    status: '',
    items: [
      '중앙대학교 의약식품대학원 건강기능식품 석사 전공',
      '숙명여자대학교 평생교육원',
      '이화여자대학교 최고위과정 수료',
      '한양대학교 미래융합경영최고과정',
    ],
  },
  {
    period: '',
    label: '현재',
    title: '뷰티앤웰니스AI 대표',
    status: '現',
    items: [
      'GEO마케팅연구원 선임연구원 · AI선거연구소 연구위원',
      '(사)중소상공인SNS지원협회 부회장 · 한국지식문화원 부회장',
      'AI리터러시협회 이사 · 한국AI영상제작협회 이사',
      '4차산업혁명연구원 선임연구원 · 디지털융합교육원 지도교수',
      '한국예술협회 AI아티스트',
      '파인낸스투데이 기자 · ESG 강사 · 출판지도사',
    ],
  },
]

// 섭외 문의 폼
// accessKey 를 넣으면 문의가 이메일로 자동 전송됩니다. (https://web3forms.com 에서 이메일 인증 후 발급)
// 비어 있으면 [보내기]를 눌렀을 때 방문자의 메일 앱이 내용이 채워진 채로 열립니다.
export const inquiryForm = {
  accessKey: '',
  formats: ['오프라인 출강', '온라인(Zoom 등)', '협의 필요'],
}
