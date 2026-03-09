import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import LogoIcon from '../Navbar/LogoIcon'
import './MessageBubble.css'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  intent?: string
  pdf?: string
  reportName?: string
  isStreaming?: boolean
  toolCalls?: string[]
  statusText?: string
}

const INTENT_LABELS: Record<string, string> = {
  simple_answer:    'Quick Answer',
  focused_analysis: 'Analysis',
  full_report:      'Full Report',
}

interface Props {
  message: Message
}

export default function MessageBubble({ message }: Props) {
  if (message.role === 'user') {
    return (
      <div className="msg msg--user">
        <div className="msg__user-bubble">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className="msg msg--ai">
      <div className="msg__avatar">
        <LogoIcon size={16} />
      </div>

      <div className="msg__ai-body">
        {/* Intent badge */}
        {message.intent && INTENT_LABELS[message.intent] && (
          <span className="msg__intent-badge">
            {INTENT_LABELS[message.intent]}
          </span>
        )}

        {/* Tool call indicator */}
        {message.toolCalls && message.toolCalls.length > 0 && (
          <div className="msg__tool-call">
            <div className="msg__tool-spinner" />
            Running analysis...
          </div>
        )}

        {/* Status while streaming */}
        {message.isStreaming && !message.content && message.statusText && (
          <p className="msg__status">{message.statusText}</p>
        )}

        {/* Markdown content */}
        {message.content && (
          <div className={`msg__content ${message.isStreaming ? 'msg__content--streaming' : ''}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}

        {/* PDF download */}
        {message.pdf && message.reportName && (
          <a
            className="msg__pdf-btn"
            href={`data:application/pdf;base64,${message.pdf}`}
            download={message.reportName}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Download Report PDF
          </a>
        )}
      </div>
    </div>
  )
}
