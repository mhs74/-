# 서미화 강사 섭외 사이트

기업·공공기관 교육 담당자를 위한 강사 섭외 사이트입니다. (React + Vite)

## 실행

```bash
npm install
npm run dev      # 개발 서버 http://localhost:5173
npm run build    # dist/ 에 배포용 파일 생성 (검색엔진용 HTML 미리 렌더링 포함)
npm run preview  # 빌드 결과 확인 http://localhost:4173
```

## 수정하는 곳

| 바꾸고 싶은 것 | 파일 |
|---|---|
| 문구 · 경력 · 강의 · 연락처 | `src/data/site.js` |
| 색상 · 글꼴 · 여백 · 버튼 | `src/styles/tokens.css` |
| 검색 노출 정보 (제목, 설명, 키워드) | `index.html` |
| 배포 주소 (canonical · sitemap 자동 생성) | `site.config.js` |

## 검색 노출(SEO)

- 빌드할 때 본문을 HTML로 미리 그려 넣어, 네이버·구글 로봇이 자바스크립트 없이도 내용을 읽습니다.
- `index.html` 에 제목·설명·키워드, Open Graph(카카오톡·SNS 공유 미리보기), 구조화 데이터(Person)를 넣었습니다.
- 배포 후 `site.config.js` 에 주소를 넣고 다시 빌드하면 `sitemap.xml` 과 canonical 이 생성됩니다.
- 네이버 서치어드바이저 · 구글 서치콘솔에서 받은 인증 코드는 `index.html` 의 주석 자리에 넣으세요.

이전 정적 HTML 초안은 `legacy/` 폴더에 있습니다.
