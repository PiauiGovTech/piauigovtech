import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Container from '../components/Container'
import { useNavigate, useLocation } from 'react-router-dom'
import { toPtBrAuthMessage } from '../utils/ptBrAuthErrors'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation() as any
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpf, setCpf] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [info, setInfo] = useState<string | null>(null)

  const from = useMemo(() => {
    try {
      const params = new URLSearchParams(location.search || '')
      const redirect = params.get('redirect')
      return redirect || location.state?.from?.pathname || '/admin'
    } catch {
      return location.state?.from?.pathname || '/admin'
    }
  }, [location.search, location.state?.from?.pathname])

  const isAdminFlow = useMemo(() => String(from || '').startsWith('/admin'), [from])

  // Exibe aviso quando o guard do admin redirecionar com notAdmin
  useEffect(() => {
    if (location.state?.notAdmin) {
      setError('Você não possui perfil de administrador.')
    }
  }, [location.state?.notAdmin])

  // Para fluxo admin, desabilita registro e força modo "Entrar"
  useEffect(() => {
    if (isAdminFlow && isRegister) setIsRegister(false)
  }, [isAdminFlow, isRegister])

  // Auto-oculta a mensagem de erro e limpa ao digitar
  useEffect(() => {
    if (!error) return
    const t = setTimeout(() => setError(null), 5000)
    return () => clearTimeout(t)
  }, [error])

  function digitsOnly(v: string) { return v.replace(/\D+/g, '') }
  function formatCPF(v: string) {
    const d = digitsOnly(v).slice(0, 11)
    const p1 = d.slice(0, 3)
    const p2 = d.slice(3, 6)
    const p3 = d.slice(6, 9)
    const p4 = d.slice(9, 11)
    let out = p1
    if (p2) out += '.' + p2
    if (p3) out += '.' + p3
    if (p4) out += '-' + p4
    return out
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    if (isRegister) {
      const cpfDigits = digitsOnly(cpf)
      if (cpfDigits.length !== 11) {
        setLoading(false)
        setError('CPF inválido (use 11 dígitos)')
        return
      }
      // Pré-validação de conflitos (email/CPF já existentes)
      try {
        const { data: exists } = await supabase.rpc('check_signup_conflicts', { p_email: email, p_cpf: cpfDigits })
        if (exists?.email_exists) {
          setLoading(false)
          setError('E-mail já cadastrado.')
          return
        }
        if (exists?.cpf_exists) {
          setLoading(false)
          setError('CPF já cadastrado.')
          return
        }
      } catch (_) {
        // Se RPC não existir, segue com fluxo e o Auth/DB irá acusar
      }
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { cpf: cpfDigits } } })
      setLoading(false)
      if (error) {
        setError(toPtBrAuthMessage(error))
        return
      }
      // Se o alvo é o admin, bloqueia e mostra mensagem
      if (String(from || '').startsWith('/admin')) {
        setError('Você não possui perfil de administrador.')
        return
      }
      navigate(from, { replace: true })
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setLoading(false)
        setError(toPtBrAuthMessage(error))
        return
      }
      // Verifica permissão admin quando o destino é /admin
      if (String(from || '').startsWith('/admin')) {
        const { data: userData } = await supabase.auth.getUser()
        const uid = userData.user?.id
        if (uid) {
          const { data: prof } = await supabase
            .from('profiles')
            .select('is_adm')
            .eq('id', uid)
            .maybeSingle()
          if (!prof?.is_adm) {
            setLoading(false)
            setError('Você não possui perfil de administrador.')
            return
          }
        }
      }
      setLoading(false)
      navigate(from, { replace: true })
    }
  }

  async function handleSendReset() {
    setError(null)
    setInfo(null)
    const trimmed = email.trim()
    if (!trimmed) { setError('Informe seu e-mail para recuperar a senha.'); return }
    try {
      const origin = window.location.origin
      const { error } = await supabase.auth.resetPasswordForEmail(trimmed, { redirectTo: origin + '/reset-password' })
      if (error) throw error
      setInfo('Enviamos um e-mail com o link para redefinir sua senha.')
    } catch (err) {
      setError(toPtBrAuthMessage(err))
    }
  }

  return (
    <section className="py-16 md:py-24 bg-[#0B1636] min-h-[calc(100vh-200px)]">
      <Container>
        <div className="mx-auto max-w-md">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">{isAdminFlow ? 'Entrar' : (isRegister ? 'Registrar' : 'Entrar')}</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md p-6 text-white shadow-sm">
            {!isAdminFlow && isRegister && (
              <div>
                <label className="block text-sm font-medium text-white/90">CPF</label>
                <input
                  inputMode="numeric"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => { setCpf(formatCPF(e.target.value)); if (error) setError(null) }}
                  className="mt-1 w-full rounded-md border-0 bg-white/10 px-3 py-2 text-white placeholder:text-white/60 ring-1 ring-inset ring-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-white/90">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(null) }}
                className="mt-1 w-full rounded-md border-0 bg-white/10 px-3 py-2 text-white placeholder:text-white/60 ring-1 ring-inset ring-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90">Senha</label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (error) setError(null) }}
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  className="w-full rounded-md border-0 bg-white/10 px-3 pr-12 py-2 text-white placeholder:text-white/60 ring-1 ring-inset ring-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute inset-y-0 right-2 my-auto h-8 px-2 rounded-md bg-white/5 text-white/80 hover:bg-white/10"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12c2.2-4.2 6.6-7 10-7s7.8 2.8 10 7c-2.2 4.2-6.6 7-10 7s-7.8-2.8-10-7z"/>
                      <circle cx="12" cy="12" r="3" />
                      <path d="M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12c2.2-4.2 6.6-7 10-7s7.8 2.8 10 7c-2.2 4.2-6.6 7-10 7s-7.8-2.8-10-7z"/>
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="mt-2 text-left">
                <button type="button" onClick={handleSendReset} className="text-sm text-brand-400 hover:text-brand-300 underline">Esqueci minha senha</button>
              </div>
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            {info && <p className="text-sm text-emerald-300">{info}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (isRegister ? 'Registrando...' : 'Entrando...') : (isRegister ? 'Registrar' : 'Entrar')}
            </button>
            {!isAdminFlow && (
              <p className="text-center text-sm text-white/80">
                {isRegister ? 'Já possui conta? ' : 'Não possui conta? '}
                <button
                  type="button"
                  onClick={() => { setIsRegister((v) => !v); setError(null) }}
                  className="text-brand-400 hover:text-brand-300 underline"
                >
                  {isRegister ? 'Entrar' : 'Registre-se'}
                </button>
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  )
}
