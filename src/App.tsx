import { Analytics } from '@vercel/analytics/react'
import { PencilFilter } from './components/Pencil'
import Hero from './components/sections/Hero'
import Work from './components/sections/Work'
import Reviews from './components/sections/Reviews'
import Process from './components/sections/Process'
import Engagements from './components/sections/Engagements'
import Faq from './components/sections/Faq'
import About from './components/sections/About'
import Contact from './components/sections/Contact'

function App() {
  return (
    <div className="page">
      <PencilFilter />
      <Hero />
      <main>
        <Work />
        <Reviews />
        <Process />
        <Engagements />
        <About />
        <Faq />
        <Contact />
      </main>
      <Analytics />
    </div>
  )
}

export default App
