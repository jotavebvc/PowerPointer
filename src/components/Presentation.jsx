import { useState, useEffect, useCallback, useRef } from 'react'
import DrawingCanvas from './DrawingCanvas'
import './Presentation.css'

export default function Presentation({ children }) {
  const slides = Array.isArray(children) ? children : [children]
  const total = slides.length
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0) // -1 left, 1 right, 0 initial
  const [animating, setAnimating] = useState(false)
  const [drawingActive, setDrawingActive] = useState(false)
  const [drawColor, setDrawColor] = useState('#ff4444')
  const [drawStroke, setDrawStroke] = useState(3)
  const [clearCount, setClearCount] = useState(0)
  const [globalTheme, setGlobalTheme] = useState('midnight')
  const canvasRef = useRef(null)

  const goTo = useCallback((index) => {
    const clamped = Math.max(0, Math.min(index, total - 1))
    if (clamped === current) return
    setDirection(clamped > current ? 1 : -1)
    setAnimating(true)
    setCurrent(clamped)
    setTimeout(() => setAnimating(false), 350)
  }, [total, current])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    const handleKey = (e) => {
      // Drawing toggle
      if (e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        setDrawingActive(a => !a)
        return
      }
      // Undo last stroke
      if (e.key === 'z' || e.key === 'Z') {
        e.preventDefault()
        canvasRef.current?.undo()
        return
      }
      // Clear current slide drawing
      if (e.key === 'c' || e.key === 'C') {
        e.preventDefault()
        setClearCount(c => c + 1)
        return
      }

      if (drawingActive) return // block nav while drawing

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
  }, [next, prev, goTo, total, drawingActive, current])

  const canvasKey = `canvas-${current}-${clearCount}`

  const colors = ['#ff4444', '#44ff44', '#4488ff', '#ffaa00', '#ff44ff', '#ffffff']

  const progress = total > 1 ? ((current) / (total - 1)) * 100 : 100

  const slideClass = [
    'slide-wrapper',
    animating && direction === 1 ? 'slide-enter-right' : '',
    animating && direction === -1 ? 'slide-enter-left' : '',
  ].filter(Boolean).join(' ')

  const globalThemes = [
    { id: 'midnight', label: '🌑', name: 'Midnight' },
    { id: 'daylight', label: '☀️', name: 'Daylight' },
    { id: 'ocean', label: '🌊', name: 'Ocean' },
    { id: 'ember', label: '🔥', name: 'Ember' },
  ]

  return (
    <div className={`presentation global-${globalTheme}`}>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="slide-container" style={{ position: 'relative' }}>
        <div className={slideClass}>
          {slides[current]}
        </div>
        <DrawingCanvas
          ref={canvasRef}
          key={canvasKey}
          active={drawingActive}
          color={drawColor}
          strokeWidth={drawStroke}
        />
      </div>
      <div className="presentation-controls">
        <button onClick={prev} disabled={current === 0}>◀</button>
        <span className="slide-counter">{current + 1} / {total}</span>
        <button onClick={next} disabled={current === total - 1}>▶</button>

        <span className="controls-separator">|</span>

        <button
          className={`draw-toggle ${drawingActive ? 'draw-on' : ''}`}
          onClick={() => setDrawingActive(a => !a)}
          title="Desenhar (D)"
        >
          ✏️
        </button>

        {drawingActive && (
          <>
            {colors.map(c => (
              <button
                key={c}
                className={`color-btn ${drawColor === c ? 'color-active' : ''}`}
                style={{ background: c }}
                onClick={() => setDrawColor(c)}
                title={c}
              />
            ))}
            <input
              type="range"
              min="1"
              max="12"
              value={drawStroke}
              onChange={e => setDrawStroke(Number(e.target.value))}
              className="stroke-slider"
              title={`Espessura: ${drawStroke}px`}
            />
            <button
              onClick={() => setClearCount(c => c + 1)}
              title="Limpar (C)"
              className="clear-btn"
            >
              🗑️
            </button>
          </>
        )}

        <span className="controls-separator">|</span>

        <div className="theme-switcher">
          {globalThemes.map(t => (
            <button
              key={t.id}
              className={`theme-btn ${globalTheme === t.id ? 'theme-active' : ''}`}
              onClick={() => setGlobalTheme(t.id)}
              title={t.name}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
