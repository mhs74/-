import { useEffect, useState } from 'react'
import { profile } from '../data/site.js'
import './Header.css'

const links = [
  { href: '#references', label: '경력·활동' },
  { href: '#curriculum', label: '커리큘럼' },
  { href: '#reviews', label: '수강 후기' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a className="brand" href="#top" onClick={close}>
          <span className="brand-name">{profile.name}</span>
          <span className="brand-sub">BEAUTY &amp; WELLNESS AI</span>
        </a>

        <button
          className="menu-btn"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav id="site-nav" className={`site-nav${open ? ' is-open' : ''}`} aria-label="주요 메뉴">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={close}>
            강의 의뢰
          </a>
        </nav>
      </div>
    </header>
  )
}
