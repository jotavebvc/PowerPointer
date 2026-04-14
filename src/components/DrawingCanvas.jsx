import { useState, useRef, useCallback, useImperativeHandle, forwardRef } from 'react'
import './DrawingCanvas.css'

const DrawingCanvas = forwardRef(function DrawingCanvas({ active, color = '#ff4444', strokeWidth = 3 }, ref) {
  const svgRef = useRef(null)
  const [paths, setPaths] = useState([])
  const [currentPath, setCurrentPath] = useState(null)
  const drawing = useRef(false)

  const getPoint = useCallback((e) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }
    const rect = svg.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }, [])

  const handlePointerDown = useCallback((e) => {
    if (!active) return
    e.preventDefault()
    drawing.current = true
    const pt = getPoint(e)
    setCurrentPath({ points: [pt], color, strokeWidth })
  }, [active, color, strokeWidth, getPoint])

  const handlePointerMove = useCallback((e) => {
    if (!drawing.current || !currentPath) return
    e.preventDefault()
    const pt = getPoint(e)
    setCurrentPath(prev => ({
      ...prev,
      points: [...prev.points, pt],
    }))
  }, [currentPath, getPoint])

  const handlePointerUp = useCallback(() => {
    if (!drawing.current) return
    drawing.current = false
    if (currentPath && currentPath.points.length > 1) {
      setPaths(prev => [...prev, currentPath])
    }
    setCurrentPath(null)
  }, [currentPath])

  const undo = useCallback(() => {
    setPaths(prev => prev.slice(0, -1))
  }, [])

  useImperativeHandle(ref, () => ({ undo }), [undo])

  const pointsToD = (points) => {
    if (points.length < 2) return ''
    return points.reduce((acc, pt, i) => {
      return acc + (i === 0 ? `M ${pt.x} ${pt.y}` : ` L ${pt.x} ${pt.y}`)
    }, '')
  }

  return (
    <svg
      ref={svgRef}
      className={`drawing-canvas ${active ? 'drawing-active' : ''}`}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={pointsToD(p.points)}
          stroke={p.color}
          strokeWidth={p.strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {currentPath && currentPath.points.length > 1 && (
        <path
          d={pointsToD(currentPath.points)}
          stroke={currentPath.color}
          strokeWidth={currentPath.strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
})

export default DrawingCanvas

export function useDrawing() {
  const [drawingActive, setDrawingActive] = useState(false)
  const [drawColor, setDrawColor] = useState('#ff4444')
  const [drawStroke, setDrawStroke] = useState(3)

  const toggleDrawing = useCallback(() => setDrawingActive(a => !a), [])
  const clearKey = useRef(0)
  const clearDrawing = useCallback(() => { clearKey.current++ }, [])

  return { drawingActive, toggleDrawing, drawColor, setDrawColor, drawStroke, setDrawStroke, clearKey, clearDrawing }
}
