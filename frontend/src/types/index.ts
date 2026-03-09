export type Intent =
  | 'simple_answer'
  | 'focused_analysis'
  | 'full_report'
  | 'needs_clarification'
  | 'file_required'
  | 'out_of_scope'

export type SSEEventType = 'status' | 'token' | 'tool_start' | 'tool_end' | 'done' | 'error'

export interface SSEEvent {
  type: SSEEventType
  message?: string
  content?: string
  intent?: Intent
  answer?: string
  filename?: string
  query?: string
  report_name?: string
  pdf?: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  intent?: Intent
  pdf?: string
  reportName?: string
  isStreaming?: boolean
  toolCalls?: string[]
  statusText?: string
  filename?: string
}
