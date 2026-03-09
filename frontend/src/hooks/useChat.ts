import { useState, useCallback } from 'react'
import { streamAnalysis } from '../api/dataAgent'
import type { Message, Intent } from '../types'

function genId() {
  return Math.random().toString(36).slice(2)
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const updateMessage = (id: string, updater: (m: Message) => Message) => {
    setMessages(prev => prev.map(m => m.id === id ? updater(m) : m))
  }

  const submit = useCallback(async (query: string) => {
    if (isLoading || !query.trim()) return

    setIsLoading(true)

    const userMsg: Message = {
      id: genId(),
      role: 'user',
      content: query,
      filename: file?.name,
    }

    const aiId = genId()
    const aiMsg: Message = {
      id: aiId,
      role: 'assistant',
      content: '',
      isStreaming: true,
      toolCalls: [],
      statusText: 'Thinking...',
    }

    setMessages(prev => [...prev, userMsg, aiMsg])

    try {
      for await (const event of streamAnalysis(query, file)) {
        switch (event.type) {
          case 'status':
            updateMessage(aiId, m => ({ ...m, statusText: event.message }))
            break

          case 'token':
            updateMessage(aiId, m => ({
              ...m,
              content: m.content + (event.content ?? ''),
              statusText: undefined,
            }))
            break

          case 'tool_start':
            updateMessage(aiId, m => ({
              ...m,
              toolCalls: [...(m.toolCalls ?? []), event.content ?? 'execute_code'],
            }))
            break

          case 'tool_end':
            updateMessage(aiId, m => ({
              ...m,
              toolCalls: [],
            }))
            break

          case 'done':
            updateMessage(aiId, m => ({
              ...m,
              content: event.answer || m.content,
              intent: event.intent as Intent | undefined,
              pdf: event.pdf,
              reportName: event.report_name,
              isStreaming: false,
              statusText: undefined,
              toolCalls: [],
            }))
            break

          case 'error':
            updateMessage(aiId, m => ({
              ...m,
              content: `Something went wrong: ${event.message}`,
              isStreaming: false,
              statusText: undefined,
              toolCalls: [],
            }))
            break
        }
      }
    } catch (err) {
      updateMessage(aiId, m => ({
        ...m,
        content: `Connection error: ${err instanceof Error ? err.message : String(err)}`,
        isStreaming: false,
        statusText: undefined,
        toolCalls: [],
      }))
    } finally {
      setIsLoading(false)
      updateMessage(aiId, m => ({ ...m, isStreaming: false, statusText: undefined }))
    }
  }, [isLoading, file])

  const clearMessages = () => setMessages([])

  return { messages, isLoading, file, setFile, submit, clearMessages }
}
