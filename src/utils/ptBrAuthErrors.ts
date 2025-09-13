export function toPtBrAuthMessage(err: unknown): string {
  const msg = typeof err === 'string' ? err : (err as any)?.message || ''
  const lower = msg.toLowerCase()
  if (lower.includes('invalid login credentials')) return 'Email ou senha inválidos.'
  if (lower.includes('email not confirmed')) return 'E-mail ainda não confirmado. Verifique sua caixa de entrada.'
  if (lower.includes('user already registered') || lower.includes('already registered') || lower.includes('already exists')) return 'E-mail já cadastrado.'
  if (lower.includes('rate limit') || lower.includes('too many') || lower.includes('temporarily')) return 'Muitas tentativas. Tente novamente em alguns minutos.'
  if (lower.includes('oauth')) return 'Erro ao autenticar com o provedor. Tente novamente.'
  if (lower.includes('network')) return 'Erro de rede. Verifique sua conexão.'
  if (lower.includes('password')) return 'Houve um problema com a senha.'
  return msg || 'Ocorreu um erro. Tente novamente.'
}

