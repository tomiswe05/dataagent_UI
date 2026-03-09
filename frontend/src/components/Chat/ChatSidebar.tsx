import { Plus, MessageSquare, Search } from 'lucide-react'
import LogoIcon from '../Navbar/LogoIcon'
import './ChatSidebar.css'

const HISTORY = [
  'Average salary by department',
  'Q4 revenue outlier analysis',
  'Employee churn report',
  'Sales trend 2025',
]

interface ChatSidebarProps {
  onNewChat: () => void
}

export default function ChatSidebar({ onNewChat }: ChatSidebarProps) {
  return (
    <aside className="chat-sidebar">
      <div className="chat-sidebar__top">
        <div className="chat-sidebar__brand">
          <LogoIcon size={18} />
          <span className="chat-sidebar__name">DataMind</span>
        </div>
        <div className="chat-sidebar__search">
          <Search size={14} />
          <input type="text" placeholder="Search chats..." className="chat-sidebar__search-input" />
        </div>

        <button className="chat-sidebar__new" onClick={onNewChat}>
          <Plus size={16} />
          New Chat
        </button>
      </div>

      <div className="chat-sidebar__section-label">Recent</div>

      <ul className="chat-sidebar__history">
        {HISTORY.map((item) => (
          <li key={item} className="chat-sidebar__item">
            <MessageSquare size={14} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
