import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type Message = {
  id: string
  author: 'eu' | 'outro'
  text: string
  ts: number
}

type Props = {
  open: boolean
  onClose: () => void
}

export default function ChatWidget({ open, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', author: 'outro', text: 'Olá! Como posso ajudar você hoje?', ts: Date.now() },
  ])
  const [text, setText] = useState('')
  const [userEmail, setUserEmail] = useState<string>('')
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data: auth } = await supabase.auth.getUser()
      if (!mounted) return
      setUserEmail(auth.user?.email || '')
    })()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    if (!open) return
    // rola para a última mensagem quando abrir/alterar
    const el = listRef.current
    if (el) {
      requestAnimationFrame(() => el.scrollTo({ top: el.scrollHeight }))
    }
  }, [open, messages.length])

  function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    const content = text.trim()
    if (!content) return
    const myMsg: Message = { id: crypto.randomUUID(), author: 'eu', text: content, ts: Date.now() }
    setMessages((prev) => [...prev, myMsg])
    setText('')
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), author: 'outro', text: 'Recebi sua mensagem: ' + content, ts: Date.now() },
      ])
    }, 600)
  }

  async function handleSignOut() { await supabase.auth.signOut(); onClose() }

  return (
    <div
      className={[
        // Mobile centralizado; em >= sm volta para o canto
        'fixed bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0 z-50',
        'w-[96vw] max-w-[520px] sm:w-[95vw] sm:max-w-[440px] h-[72vh] sm:h-[70vh] max-h-[80vh]',
        'rounded-xl border border-white/15 bg-white/10 backdrop-blur-3xl text-white shadow-xl ring-1 ring-inset ring-white/10 overflow-hidden',
        'origin-bottom-right transition-all duration-200 ease-out',
        open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none',
        'flex flex-col',
      ].join(' ')}
    >
      <header className="p-3 border-b border-white/10 bg-white/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center text-white font-semibold">C</div>
          <div className="truncate">
            <div className="font-semibold leading-tight truncate">Nome do Agente</div>
            <div className="text-[11px] text-white/70 truncate">{userEmail || 'Conectado'}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleSignOut}
            aria-label="Sair"
            title="Sair"
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M15 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/>
              <path d="M10 17l5-5-5-5"/>
              <path d="M15 12H3"/>
            </svg>
          </button>
          <button onClick={onClose} aria-label="Fechar chat" title="Fechar" className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" />
            </svg>
          </button>
        </div>
      </header>
      <div ref={listRef} className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.author === 'eu' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ${m.author === 'eu' ? 'bg-brand-600 text-white rounded-br-sm' : 'bg-white/10 text-white rounded-bl-sm'}`}>
              {m.text}
              <div className="mt-1 text-[10px] opacity-70 text-right">
                {new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={sendMessage}
        className="px-5 pt-3 pb-5 border-t border-white/10 bg-white/5 shrink-0"
        style={{ paddingBottom: 'calc(max(0px, env(safe-area-inset-bottom)) + 8px)' }}
      >
        <div className="flex items-stretch gap-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 h-10 rounded-xl border-0 bg-white/10 px-4 text-white placeholder:text-white/60 ring-1 ring-inset ring-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            aria-label="Enviar"
            className="rounded-full h-10 w-10 flex items-center justify-center bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}
