import { useRef } from 'react'
import { Paperclip, ArrowUp, X } from 'lucide-react'
import './ChatInput.css'

interface ChatInputProps {
  value: string
  onChange: (val: string) => void
  onSend: () => void
  onFileChange: (file: File | null) => void
  file: File | null
  disabled?: boolean
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  onFileChange,
  file,
  disabled,
}: ChatInputProps) {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="chat-input__wrap">
      <div className="chat-input__box">
        {/* File pill inside box */}
        {file && (
          <div className="chat-input__file-pill">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{file.name}</span>
            <button onClick={() => onFileChange(null)} className="chat-input__file-remove">
              <X size={11} />
            </button>
          </div>
        )}

        <div className="chat-input__row">
          {/* File button */}
          <button
            className="chat-input__attach"
            onClick={() => fileRef.current?.click()}
            title="Upload file"
          >
            <Paperclip size={18} />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            style={{ display: 'none' }}
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          />

          {/* Text input */}
          <textarea
            className="chat-input__textarea"
            placeholder="Ask anything about your data..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={disabled}
          />

          {/* Send button */}
          <button
            className={`chat-input__send ${value.trim() ? 'chat-input__send--active' : ''}`}
            onClick={onSend}
            disabled={disabled || !value.trim()}
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
      <p className="chat-input__hint">Press Enter to send · Shift+Enter for new line</p>
    </div>
  )
}
