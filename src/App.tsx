import Rail from './components/Rail'
import Hero from './components/sections/Hero'
import Work from './components/sections/Work'
import Experience from './components/sections/Experience'
import Stack from './components/sections/Stack'
import Writing from './components/sections/Writing'
import Contact from './components/sections/Contact'

function App() {
  return (
    <>
      <Rail />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <Writing />
        <Contact />
      </main>
    </>
  )
}

export default App
