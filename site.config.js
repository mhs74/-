// 사이트를 배포한 실제 주소입니다. (예: 'https://seomihwa.com')
// 값이 있으면 빌드할 때 canonical, og:url, sitemap.xml, robots.txt 의 사이트맵 주소가 자동으로 채워집니다.
// GitHub Pages 배포에서는 워크플로가 SITE_URL 환경 변수로 넣어 줍니다.
export const SITE_URL = process.env.SITE_URL || ''
