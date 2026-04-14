import './Slide.css'

export default function Slide({ children, style, className = '', theme = '' }) {
  const themeClass = theme ? `theme-${theme}` : ''
  return (
    <div className={`slide ${themeClass} ${className}`.trim()} style={style}>
      {children}
    </div>
  )
}
