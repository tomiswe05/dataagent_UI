import type { SSEEvent } from '../types'

const BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/v1/excel`
  : '/api/v1/excel'

export async function* streamAnalysis(
  query: string,
  file?: File | null
): AsyncGenerator<SSEEvent> {
  const form = new FormData()
  form.append('query', query)
  if (file) form.append('file', file)

  const res = await fetch(`${BASE}/upload/stream`, { method: 'POST', body: form })

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)

  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6).trim()
        if (data) {
          try { yield JSON.parse(data) as SSEEvent } catch { /* skip malformed */ }
        }
      }
    }
  }
}
