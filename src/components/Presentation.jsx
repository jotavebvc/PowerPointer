import { useState, useEffect, useCallback } from 'react'
import './Presentation.css'

export default function Presentation({ children }) {
  const slides = Array.isArray(children) ? children : [children]
  const total = slides.length
  const [current, setCurrent] = useState(0)

  const goTo = useCallback((index) => {
    setCurrent(Math.max(0, Math.min(index, total - 1)))
  }, [total])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        next()
      }
      if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault()
        prev()
      }
      if (e.key === 'Home') goTo(0)
      if (e.key === 'End') goTo(total - 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev, goTo, total])

  return (
    <div className="presentation">
      <div className="slide-container">
        {slides[current]}
      </div>
      <div className="presentation-controls">
        <button onClick={prev} disabled={current === 0}>◀</button>
        <span className="slide-counter">{current + 1} / {total}</span>
        <button onClick={next} disabled={current === total - 1}>▶</button>
      </div>
    </div>
  )
}
