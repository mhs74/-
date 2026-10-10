// 빌드된 페이지를 미리 HTML로 그려 넣습니다.
// 네이버 · 구글 검색 로봇이 자바스크립트 실행 없이도 본문을 읽을 수 있게 하기 위함입니다.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { SITE_URL } from '../site.config.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, process.env.OUT_DIR || 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, profile, programs } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

let html = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')
html = html.replace('<!--app-html-->', render())

// 강의 프로그램을 검색엔진이 이해하는 구조화 데이터(Course)로 넣습니다.
const courses = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `${profile.name} 강사 대표 강의 프로그램`,
  itemListElement: programs.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Course',
      name: p.title,
      description: `${p.target} 대상 · ${p.duration}. ${p.outcomes.join(', ')}`,
      inLanguage: 'ko',
      provider: { '@type': 'Person', name: profile.name },
    },
  })),
}
html = html.replace(
  '<!--jsonld-courses-->',
  `<script type="application/ld+json">${JSON.stringify(courses)}</script>`,
)

const site = SITE_URL.replace(/\/$/, '')
// '/images/a.jpg' 나 '/-/images/a.jpg' 같은 경로를 전체 주소로 바꿉니다.
const absolute = (p) => {
  const u = new URL(site + '/')
  return p.startsWith(u.pathname) ? u.origin + p : site + p
}
if (site) {
  html = html
    .replace('<!--canonical-->', `<link rel="canonical" href="${site}/" />\n    <meta property="og:url" content="${site}/" />`)
    .replace(/(content="|"image": ")(\/[^"]*?images\/)/g, (_, prefix, p) => prefix + absolute(p))
    .replace('"name": "서미화",', `"name": "서미화",\n        "url": "${site}/",`)

  const today = new Date().toISOString().slice(0, 10)
  fs.writeFileSync(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${site}/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>
</urlset>
`,
  )
  fs.appendFileSync(path.join(dist, 'robots.txt'), `\nSitemap: ${site}/sitemap.xml\n`)
} else {
  console.warn('[prerender] site.config.js 의 SITE_URL 이 비어 있어 canonical · sitemap.xml 은 만들지 않았습니다.')
}

fs.writeFileSync(path.join(dist, 'index.html'), html)
fs.rmSync(ssrDir, { recursive: true, force: true })
console.log('[prerender] dist/index.html 에 본문 HTML을 넣었습니다.')
