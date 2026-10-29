import { Analytics } from '@vercel/analytics/react'
import { PencilFilter } from './components/Pencil'
import Hero from './components/sections/Hero'
import Work from './components/sections/Work'
import Sites from './components/sections/Sites'
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
        <Reviews />
        <Work />
        <Sites />
        <About />
        <Process />
        <Engagements />
        <Faq />
        <Contact />
      </main>
      <Analytics />
    </div>
  )
}

export default App
