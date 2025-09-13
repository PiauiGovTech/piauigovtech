import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Container from '../components/Container'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation() as any
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const from = location.state?.from?.pathname || '/admin'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <section className="py-16 md:py-24 bg-[#0B1636] min-h-[calc(100vh-200px)]">
      <Container>
        <div className="mx-auto max-w-md">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">Entrar</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md p-6 text-white shadow-sm">
            <div>
              <label className="block text-sm font-medium text-white/90">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border-0 bg-white/10 px-3 py-2 text-white placeholder:text-white/60 ring-1 ring-inset ring-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md border-0 bg-white/10 px-3 py-2 text-white placeholder:text-white/60 ring-1 ring-inset ring-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                required
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </Container>
    </section>
  )
}

