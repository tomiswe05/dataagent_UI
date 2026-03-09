import LogoIcon from '../Navbar/LogoIcon'
import './EmptyState.css'

const SUGGESTIONS = [
  { label: 'Summarize my dataset',        desc: 'Get a full overview of your data' },
  { label: 'Find outliers in revenue',    desc: 'Detect anomalies automatically'  },
  { label: 'Average salary by dept',      desc: 'Group and compare across columns' },
  { label: 'Generate a full EDA report',  desc: 'Download a complete PDF report'  },
]

interface EmptyStateProps {
  onSuggestion: (text: string) => void
}

export default function EmptyState({ onSuggestion }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <LogoIcon size={32} />
      </div>
      <h2 className="empty-state__title">What do you want to analyse?</h2>
      <p className="empty-state__sub">Upload a CSV or Excel file and ask anything about your data.</p>

      <div className="empty-state__grid">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            className="empty-state__card"
            onClick={() => onSuggestion(s.label)}
          >
            <span className="empty-state__card-label">{s.label}</span>
            <span className="empty-state__card-desc">{s.desc}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
