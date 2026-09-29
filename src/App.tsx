import { Analytics } from '@vercel/analytics/react'
import { PencilFilter } from './components/Pencil'
import Hero from './components/sections/Hero'
import Work from './components/sections/Work'
import Process from './components/sections/Process'
import About from './components/sections/About'
import Contact from './components/sections/Contact'

function App() {
  return (
    <div className="page">
      <PencilFilter />
      <Hero />
      <main>
        <Work />
        <Process />
        <About />
        <Contact />
      </main>
      <Analytics />
    </div>
  )
}

export default App
