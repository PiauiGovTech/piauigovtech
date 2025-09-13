import { useEffect, useRef, useState } from 'react'
import Container from '../components/Container'
import { supabase } from '../lib/supabaseClient'

type Message = {
  id: string
  author: 'eu' | 'outro'
  text: string
  ts: number
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', author: 'outro', text: 'Olá! Como posso ajudar você hoje?', ts: Date.now() },
  ])
  const [text, setText] = useState('')
  const [userEmail, setUserEmail] = useState<string>('')
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data } = await supabase.auth.getUser()
      if (!mounted) return
      const email = data.user?.email || ''
      setUserEmail(email)
    })()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    // rola para a última mensagem
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages.length])

  function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    const content = text.trim()
    if (!content) return
    const myMsg: Message = { id: crypto.randomUUID(), author: 'eu', text: content, ts: Date.now() }
    setMessages((prev) => [...prev, myMsg])
    setText('')
    // resposta mockada do "atendente"
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), author: 'outro', text: 'Recebi sua mensagem: ' + content, ts: Date.now() },
      ])
    }, 600)
  }

  return (
    <section className="py-6 md:py-8 bg-[#0B1636] min-h-[calc(100vh-200px)]">
      <Container>
        <div className="mx-auto max-w-3xl h-[70vh] md:h-[75vh] rounded-xl border border-white/15 bg-white/5 backdrop-blur-md flex flex-col overflow-hidden">
          <header className="p-4 border-b border-white/10 text-white flex items-center gap-3 bg-white/5">
            <div className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center text-white font-semibold">C</div>
            <div>
              <div className="font-semibold">Atendimento</div>
              <div className="text-xs text-white/70">{userEmail || 'Conectado'}</div>
            </div>
          </header>
          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.author === 'eu' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm shadow-sm ${m.author === 'eu' ? 'bg-brand-600 text-white rounded-br-sm' : 'bg-white/10 text-white rounded-bl-sm'}`}>
                  {m.text}
                  <div className="mt-1 text-[10px] opacity-70 text-right">
                    {new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="p-3 border-t border-white/10 bg-white/5">
            <div className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 rounded-lg border-0 bg-white/10 px-3 py-2 text-white placeholder:text-white/60 ring-1 ring-inset ring-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Enviar</button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  )
}

