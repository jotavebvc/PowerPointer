import { useState } from 'react'
import './BranchSlide.css'

export default function BranchSlide({ question, options, onChoose, chosen }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="branch-slide">
      <div className="branch-question">
        <h2>{question}</h2>
        <div className="branch-divider" />
        {chosen && (
          <p className="branch-chosen-hint">
            Você escolheu <strong>{options.find(o => o.value === chosen)?.label}</strong> — clique para mudar
          </p>
        )}
      </div>
      <div className="branch-options">
        {options.map(opt => (
          <button
            key={opt.value}
            className={[
              'branch-btn',
              `branch-btn--${opt.value}`,
              hovered && hovered !== opt.value ? 'branch-btn--dimmed' : '',
              chosen === opt.value ? 'branch-btn--chosen' : '',
              chosen && chosen !== opt.value ? 'branch-btn--unchosen' : '',
            ].filter(Boolean).join(' ')}
            onMouseEnter={() => setHovered(opt.value)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChoose(opt.value)}
          >
            <span className="branch-btn__icon">{opt.icon}</span>
            <span className="branch-btn__label">{opt.label}</span>
            {opt.description && <span className="branch-btn__desc">{opt.description}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
