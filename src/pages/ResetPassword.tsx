import { useEffect, useState } from 'react'
import Container from '../components/Container'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { toPtBrAuthMessage } from '../utils/ptBrAuthErrors'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { data } = await supabase.auth.getSession()
        if (!mounted) return
        setReady(!!data.session)
        if (!data.session) {
          setError('Link inválido ou expirado. Solicite novamente a recuperação de senha.')
        }
      } catch (_) {
        setReady(false)
        setError('Não foi possível validar o link de recuperação.')
      }
    })()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    if (!error && !notice) return
    const t = setTimeout(() => { setError(null); setNotice(null) }, 6000)
    return () => clearTimeout(t)
  }, [error, notice])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (password.length < 6) {
      setError('A nova senha deve ter ao menos 6 caracteres.')
      return
    }
    if (password !== confirm) {
      setError('As senhas não conferem.')
      return
    }
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setNotice('Senha atualizada com sucesso. Você já pode entrar com a nova senha.')
      setTimeout(() => navigate('/login'), 1200)
    } catch (err) {
      setError(toPtBrAuthMessage(err))
    }
  }

  return (
    <section className="py-16 md:py-24 bg-[#0B1636] min-h-[calc(100vh-200px)]">
      <Container>
        <div className="mx-auto max-w-md rounded-xl border border-white/15 bg-white/10 backdrop-blur-md p-6 text-white">
          <h2 className="text-2xl font-semibold">Definir nova senha</h2>
          {!ready && !error && (
            <p className="mt-2 text-white/80">Validando link...</p>
          )}
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          {ready && (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/90">Nova senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-md border-0 bg-white/10 px-3 py-2 text-white placeholder:text-white/60 ring-1 ring-inset ring-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90">Confirmar senha</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="mt-1 w-full rounded-md border-0 bg-white/10 px-3 py-2 text-white placeholder:text-white/60 ring-1 ring-inset ring-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                  required
                />
              </div>
              {notice && <p className="text-sm text-emerald-300">{notice}</p>}
              <button type="submit" className="w-full rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Salvar nova senha</button>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}

