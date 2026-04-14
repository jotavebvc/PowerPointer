import './Slide.css'

export default function Slide({ children, style, className = '' }) {
  return (
    <div className={`slide ${className}`} style={style}>
      {children}
    </div>
  )
}
