import { useState, useRef, useEffect } from 'react'
import ChatSidebar from '../components/Chat/ChatSidebar'
import MessageBubble from '../components/Chat/MessageBubble'
import EmptyState from '../components/Chat/EmptyState'
import ChatInput from '../components/Chat/ChatInput'
import { useChat } from '../hooks/useChat'
import './Conversation.css'

export default function Conversation() {
  const { messages, isLoading, file, setFile, submit, clearMessages } = useChat()
  const [input, setInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const vv = window.visualViewport
    const updateHeight = () => {
      const h = vv ? vv.height : window.innerHeight
      document.documentElement.style.setProperty('--conversation-height', `${h}px`)
    }
    updateHeight()
    vv?.addEventListener('resize', updateHeight)

    return () => {
      document.body.style.overflow = ''
      vv?.removeEventListener('resize', updateHeight)
      document.documentElement.style.removeProperty('--conversation-height')
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    const query = input
    setInput('')
    submit(query)
  }

  const handleNewChat = () => {
    clearMessages()
    setFile(null)
    setInput('')
    setSidebarOpen(false)
  }

  return (
    <div className="conversation">
      {/* Backdrop — mobile only */}
      {sidebarOpen && (
        <div className="conversation__overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`conversation__sidebar-wrap ${sidebarOpen ? 'conversation__sidebar-wrap--open' : ''}`}>
        <ChatSidebar onNewChat={handleNewChat} />
      </div>

      {/* Main area */}
      <div className="conversation__main">
        {/* Top bar */}
        <div className="conversation__topbar">
          <button className="conversation__menu-btn" onClick={() => setSidebarOpen(p => !p)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <line x1="3" y1="6"  x2="21" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Messages / Empty state */}
        <div className="conversation__messages">
          {messages.length === 0 ? (
            <EmptyState onSuggestion={text => setInput(text)} />
          ) : (
            <div className="conversation__list">
              {messages.map(m => (
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
          disabled={isLoading}
        />
      </div>
    </div>
  )
}
