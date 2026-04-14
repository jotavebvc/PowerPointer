import { useState, useEffect } from 'react'
import Presentation from './components/Presentation'

const privateSlides = import.meta.glob('./content/slides.jsx')
const exampleSlides = import.meta.glob('./content.example/slides.jsx')

const loader = privateSlides['./content/slides.jsx']
  || exampleSlides['./content.example/slides.jsx']

function App() {
  const [slides, setSlides] = useState(null)

  useEffect(() => {
    loader().then(mod => setSlides(mod.default))
  }, [])

  if (!slides) return null

  return (
    <Presentation>
      {slides}
    </Presentation>
  )
}

export default App
