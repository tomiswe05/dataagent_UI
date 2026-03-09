import { useState, useRef, useEffect } from 'react'
import ChatSidebar from '../components/Chat/ChatSidebar'
import MessageBubble from '../components/Chat/MessageBubble'
import EmptyState from '../components/Chat/EmptyState'
import ChatInput from '../components/Chat/ChatInput'
import './Conversation.css'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  intent?: string
  isStreaming?: boolean
  toolCalls?: string[]
}

const MOCK_MESSAGES: Message[] = [
  { id: '1', role: 'user', content: 'What is the average salary by department?' },
  {
    id: '2',
    role: 'assistant',
    intent: 'simple_answer',
    content: `Here's the average salary breakdown by department:\n\n| Department | Avg Salary | Headcount |\n|---|---|---|\n| Engineering | **$95,400** | 42 |\n| Marketing | $72,800 | 18 |\n| Sales | $68,200 | 31 |\n| Operations | $61,500 | 24 |\n\nEngineering leads at **31% above** the company average of $72,900.`,
  },
]

export default function Conversation() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input }
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      intent: 'focused_analysis',
      toolCalls: ['execute_code'],
      content: '',
      isStreaming: true,
    }
    setMessages((prev) => [...prev, userMsg, aiMsg])
    setInput('')

    // Simulate streaming (replace with real logic later)
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMsg.id
            ? { ...m, content: 'Analysis complete. Here are the results based on your query.', isStreaming: false, toolCalls: [] }
            : m
        )
      )
    }, 2000)
  }

  const handleNewChat = () => {
    setMessages([])
    setFile(null)
    setInput('')
  }

  const loadMock = () => setMessages(MOCK_MESSAGES)

  return (
    <div className="conversation">
      {/* Backdrop — mobile only */}
      {sidebarOpen && (
        <div className="conversation__overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar — always in DOM, slide via CSS */}
      <div className={`conversation__sidebar-wrap ${sidebarOpen ? 'conversation__sidebar-wrap--open' : ''}`}>
        <ChatSidebar onNewChat={() => { handleNewChat(); setSidebarOpen(false) }} />
      </div>

      {/* Main area */}
      <div className="conversation__main">
        {/* Top bar */}
        <div className="conversation__topbar">
          <button className="conversation__menu-btn" onClick={() => setSidebarOpen((p) => !p)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <line x1="3" y1="6"  x2="21" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          {/* Demo button — remove later */}
          <button className="conversation__demo-btn" onClick={loadMock}>Load mock messages</button>
        </div>

        {/* Messages / Empty state */}
        <div className="conversation__messages">
          {messages.length === 0 ? (
            <EmptyState onSuggestion={(text) => setInput(text)} />
          ) : (
            <div className="conversation__list">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          onFileChange={setFile}
          file={file}
        />
      </div>
    </div>
  )
}
