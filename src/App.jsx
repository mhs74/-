import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import References from './components/References.jsx'
import Curriculum from './components/Curriculum.jsx'
import Reviews from './components/Reviews.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">본문 바로가기</a>
      <Header />
      <main id="main">
        <Hero />
        <References />
        <Curriculum />
        <Reviews />
        <Contact />
      </main>
    </>
  )
}
