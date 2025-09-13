import { useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { toPtBrAuthMessage } from '../utils/ptBrAuthErrors'
import { SITE_URL } from '../utils/siteUrl'

type Props = {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function ChatLoginPopover({ open, onClose, onSuccess }: Props) {
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpf, setCpf] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [info, setInfo] = useState<string | null>(null)
  const [isForgot, setIsForgot] = useState(false)
  
  // Auto-oculta a mensagem de erro e limpa ao digitar
  useEffect(() => {
    if (!error) return
    const t = setTimeout(() => setError(null), 5000)
    return () => clearTimeout(t)
  }, [error])

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) onClose()
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const title = useMemo(() => (isRegister ? 'Registrar' : 'Entrar'), [isRegister])

  function digitsOnly(v: string) {
    return v.replace(/\D+/g, '')
  }
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
    try {
      if (isRegister) {
        const cpfDigits = digitsOnly(cpf)
        if (cpfDigits.length !== 11) throw new Error('CPF inválido (use 11 dígitos)')
        // Pré-validação de conflitos (email/CPF já existentes)
        try {
          const { data: exists } = await supabase.rpc('check_signup_conflicts', { p_email: email, p_cpf: cpfDigits })
          if (exists?.email_exists) {
            throw new Error('E-mail já cadastrado.')
          }
          if (exists?.cpf_exists) {
            throw new Error('CPF já cadastrado.')
          }
        } catch (_) {
          // Se a RPC não existir, seguimos e deixamos o backend/auth acusar
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { cpf: cpfDigits } },
        })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
      onSuccess?.()
      onClose()
    } catch (err: any) {
      setError(toPtBrAuthMessage(err) || 'Erro ao autenticar')
    } finally {
      setLoading(false)
    }
  }

  async function handleSendReset() {
    setError(null)
    setInfo(null)
    const trimmed = email.trim()
    if (!trimmed) { setError('Informe seu e-mail para recuperar a senha.'); return }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(trimmed, { redirectTo: SITE_URL + '/reset-password' })
      if (error) throw error
      setInfo('Enviamos um e-mail com o link para redefinir sua senha.')
    } catch (err) {
      setError(toPtBrAuthMessage(err))
    }
  }

  return (
    <div
      ref={ref}
      className={[
        // Mobile centralizado; em >= sm volta para o canto
        'fixed bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0 z-50',
        'w-[94vw] max-w-[360px] sm:w-[88vw] sm:max-w-[320px]',
        'rounded-xl border border-white/15 bg-white/10 backdrop-blur-3xl text-white shadow-xl ring-1 ring-inset ring-white/10',
        'origin-bottom-right transition-all duration-200 ease-out',
        open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none',
      ].join(' ')}
    >
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-base font-semibold">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegister && (
            <div>
              <label className="block text-xs font-medium text-white/80">CPF</label>
              <input
                inputMode="numeric"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
                className="mt-1 w-full rounded-md border-0 bg-white/10 px-3 py-2 text-white placeholder:text-white/60 ring-1 ring-inset ring-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-white/80">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(null) }}
              autoFocus
              className="mt-1 w-full rounded-md border-0 bg-white/10 px-3 py-2 text-white placeholder:text-white/60 ring-1 ring-inset ring-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/80">Senha</label>
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
                className="absolute inset-y-0 right-2 my-auto h-8 px-2 text-white/80 cursor-pointer"
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
              <button type="button" onClick={handleSendReset} className="text-xs text-brand-400 hover:text-brand-300 underline">Esqueci minha senha</button>
            </div>
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          {info && <p className="text-xs text-emerald-300">{info}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (isRegister ? 'Registrando...' : 'Entrando...') : (isRegister ? 'Registrar' : 'Entrar')}
          </button>
          <p className="text-center text-xs text-white/80">
            {isRegister ? 'Já possui conta? ' : 'Não possui conta? '}
            <button
              type="button"
              onClick={() => { setIsRegister((v) => !v); setError(null) }}
              className="text-brand-400 hover:text-brand-300 underline"
            >
              {isRegister ? 'Entrar' : 'Registre-se'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
