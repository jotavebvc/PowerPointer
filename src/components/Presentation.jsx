import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { cloneElement } from 'react'
import DrawingCanvas from './DrawingCanvas'
import './Presentation.css'

export default function Presentation({ children }) {
  const baseSlides = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  )
  const [branchChoices, setBranchChoices] = useState({})
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [drawingActive, setDrawingActive] = useState(false)
  const [drawColor, setDrawColor] = useState('#ff4444')
  const [drawStroke, setDrawStroke] = useState(3)
  const [clearCount, setClearCount] = useState(0)
  const [globalTheme, setGlobalTheme] = useState('midnight')
  const [zoom, setZoom] = useState(1)
  const [showHelp, setShowHelp] = useState(false)
  const canvasRef = useRef(null)

  // Build the effective slide list:
  // Everything before the first branch plays normally.
  // When a branch is hit, if the user already chose, the rest of the
  // presentation is REPLACED by the chosen path (which can itself
  // contain further branches — recursive).
  const slides = useMemo(() => {
    const build = (list) => {
      const result = []
      for (let i = 0; i < list.length; i++) {
        const slide = list[i]
        result.push(slide)
        if (slide.props?.branch) {
          const key = slide.key || `branch-${i}`
          const choice = branchChoices[key]
          if (choice && slide.props.branch[choice]) {
            result.push(...build(slide.props.branch[choice]))
            // Continue with remaining slides after the branch
          } else {
            // No choice yet — stop here
            break
          }
        }
      }
      return result
    }
    return build(baseSlides)
  }, [baseSlides, branchChoices])

  const total = slides.length

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

  // Swipe / touch support
  const touchRef = useRef(null)
  useEffect(() => {
    const SWIPE_THRESHOLD = 30
    let startX = 0
    let startY = 0

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }
    const onTouchEnd = (e) => {
      if (drawingActive) return
      const dx = e.changedTouches[0].clientX - startX
      const dy = e.changedTouches[0].clientY - startY
      if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dy) > Math.abs(dx)) return

      const isOnUnansweredBranch = slides[current]?.props?.branch && !branchChoices[slides[current]?.key || current]
      if (dx < 0 && !isOnUnansweredBranch) next()
      if (dx > 0) prev()
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [next, prev, drawingActive, slides, current, branchChoices])

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
      // Help overlay
      if (e.key === '?') {
        e.preventDefault()
        setShowHelp(h => !h)
        return
      }
      // Zoom
      if (e.key === '+' || e.key === '=') {
        e.preventDefault()
        setZoom(z => Math.min(z + 0.15, 2.5))
        return
      }
      if (e.key === '-' || e.key === '_') {
        e.preventDefault()
        setZoom(z => Math.max(z - 0.15, 0.5))
        return
      }
      if (e.key === '0') {
        e.preventDefault()
        setZoom(1)
        return
      }
      // Theme cycling
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault()
        setGlobalTheme(t => {
          // eslint-disable-next-line react-hooks/immutability
          const i = globalThemes.findIndex(th => th.id === t)
          return globalThemes[(i - 1 + globalThemes.length) % globalThemes.length].id
        })
        return
      }
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault()
        setGlobalTheme(t => {
          const i = globalThemes.findIndex(th => th.id === t)
          return globalThemes[(i + 1) % globalThemes.length].id
        })
        return
      }

      if (drawingActive) return // block nav while drawing

      // Block forward navigation on unanswered branch slides
      const isOnUnansweredBranch = slides[current]?.props?.branch && !branchChoices[slides[current]?.key || current]

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        if (!isOnUnansweredBranch) next()
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

  const handleBranchChoose = useCallback((branchKey, choice) => {
    setBranchChoices(prev => ({ ...prev, [branchKey]: choice }))
    // Advance to next slide (first slide of the chosen path)
    setTimeout(() => {
      setDirection(1)
      setAnimating(true)
      setCurrent(c => c + 1)
      setTimeout(() => setAnimating(false), 350)
    }, 200)
  }, [])

  // Determine what to render for current slide
  const currentSlide = slides[current]
  const isBranch = currentSlide?.props?.branch
  const branchKey = isBranch ? (currentSlide.key || `branch-${current}`) : null
  const branchAlreadyChosen = branchKey != null && branchChoices[branchKey]

  const renderSlide = () => {
    if (isBranch && !branchAlreadyChosen) {
      return cloneElement(currentSlide, {
        onChoose: (choice) => handleBranchChoose(branchKey, choice),
      })
    }
    // If branch was already chosen and user navigated back, show it as answered
    if (isBranch && branchAlreadyChosen) {
      return cloneElement(currentSlide, {
        onChoose: (choice) => {
          // Allow re-choosing — reset this branch and any nested ones
          setBranchChoices(prev => {
            const next = { ...prev }
            // Clear this and all subsequent branch choices
            for (const k of Object.keys(next)) {
              if (k === branchKey) delete next[k]
            }
            next[branchKey] = choice
            return next
          })
          setTimeout(() => {
            setDirection(1)
            setAnimating(true)
            setCurrent(c => c + 1)
            setTimeout(() => setAnimating(false), 350)
          }, 200)
        },
        chosen: branchChoices[branchKey],
      })
    }
    return currentSlide
  }

  return (
    <div className={`presentation global-${globalTheme}`}>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="slide-container" style={{ position: 'relative' }}>
        <div className={slideClass} style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s ease' }}>
          {renderSlide()}
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
        <button onClick={next} disabled={current === total - 1 || (isBranch && !branchAlreadyChosen)}>▶</button>

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

        <span className="controls-separator">|</span>

        <div className="zoom-controls">
          <button
            className="zoom-btn"
            onClick={() => setZoom(z => Math.max(z - 0.15, 0.5))}
            title="Zoom out (−)"
          >−</button>
          <span className="zoom-level" onClick={() => setZoom(1)} title="Reset zoom (0)">
            {Math.round(zoom * 100)}%
          </span>
          <button
            className="zoom-btn"
            onClick={() => setZoom(z => Math.min(z + 0.15, 2.5))}
            title="Zoom in (+)"
          >+</button>
        </div>

        <span className="controls-separator">|</span>

        <button
          className="help-btn"
          onClick={() => setShowHelp(h => !h)}
          title="Atalhos (?)"
        >?</button>
      </div>

      {showHelp && (
        <div className="help-overlay" onClick={() => setShowHelp(false)}>
          <div className="help-panel" onClick={e => e.stopPropagation()}>
            <div className="help-title">Atalhos do teclado</div>
            <div className="help-grid">
              <kbd>←</kbd><span>Slide anterior</span>
              <kbd>→</kbd><span>Próximo slide</span>
              <kbd>Home</kbd><span>Primeiro slide</span>
              <kbd>End</kbd><span>Último slide</span>
              <kbd>D</kbd><span>Desenhar</span>
              <kbd>Z</kbd><span>Desfazer traço</span>
              <kbd>C</kbd><span>Limpar desenho</span>
              <kbd>F</kbd><span>Fogos de artifício</span>
              <kbd>M / N</kbd><span>Trocar tema</span>
              <kbd>+ / −</kbd><span>Zoom in / out</span>
              <kbd>0</kbd><span>Reset zoom</span>
              <kbd>?</kbd><span>Este painel</span>
            </div>
            <div className="help-close">Clique fora ou pressione <kbd>?</kbd> para fechar</div>
          </div>
        </div>
      )}
    </div>
  )
}
