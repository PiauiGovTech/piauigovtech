import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Container from '../components/Container'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { supabase } from '../lib/supabaseClient'
import Logo from '../components/Logo'
import NavLink from '../components/NavLink'

type News = {
  id: string
  title: string
  content: string
  images: string[] | null
  created_at: string
}

export default function NoticiaDetalhe() {
  const { id } = useParams()
  const [news, setNews] = useState<News | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  // Transforma sequências de múltiplos Enters em quebras visíveis adicionais.
  // Ex.: 2 Enters => 1 parágrafo + 1 linha extra; 5 Enters => 1 parágrafo + 4 linhas extras.
  const preparedContent = useMemo(() => {
    const raw = news?.content || ''
    // Substitui grupos de 2+ "\n" por: "\n\n" + (N-1) linhas com ZWSP para gerar <br/> via remark-breaks
    return raw.replace(/\n{2,}/g, (match) => "\n\n" + "\u200B\n".repeat(match.length - 1))
  }, [news?.content])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('news')
        .select('id,title,content,images,created_at')
        .eq('id', id)
        .single()
      if (error) setError(error.message)
      setNews(data as any)
      setLoading(false)
    })()
  }, [id])

  return (
    <section className="relative min-h-screen bg-[#0B1636]">
      {/* Subtle white glows to match hero */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-14rem)] aspect-[1155/678] w-[38rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-white to-white opacity-10" />
      </div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Piauí Gov Tech</span>
              <div className="flex items-center gap-3 text-brand-400">
                <Logo className="h-8 w-auto" />
                <div className="leading-tight">
                  <div className="text-lg font-bold text-white">
                    piauí<span className="text-gray-300 font-light">gov</span>
                    tech
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z"/>
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-2">
            <NavLink targetId="inicio">Início</NavLink>
            <NavLink targetId="noticias" to="/noticias">Notícias</NavLink>
            <NavLink targetId="quem-somos" to="/quemsomos">Quem somos</NavLink>
            <NavLink targetId="ecossistema">Ecossistema</NavLink>
          </div>
        </nav>

        {menuOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMenuOpen(false)} />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMenuOpen(false)}>
                  <span className="sr-only">Piauí Gov Tech</span>
                  <Logo className="h-8 w-auto text-white/90" />
                </Link>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-200"
                >
                  <span className="sr-only">Close menu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 space-y-2">
                <NavLink targetId="inicio" onNavigate={() => setMenuOpen(false)}>Início</NavLink>
                <NavLink targetId="noticias" to="/noticias" onNavigate={() => setMenuOpen(false)}>Notícias</NavLink>
                <NavLink targetId="quem-somos" to="/quemsomos" onNavigate={() => setMenuOpen(false)}>Quem somos</NavLink>
                <NavLink targetId="ecossistema" onNavigate={() => setMenuOpen(false)}>Ecossistema</NavLink>
                <NavLink targetId="para-quem" onNavigate={() => setMenuOpen(false)}>Para Quem</NavLink>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="pt-24 sm:pt-28" />
      <Container>
        {error && <p className="text-red-600">{error}</p>}
        {news && (
          <article className="mx-auto max-w-4xl text-white">
            {news.images?.[0] && (
              <div className="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-white/5 aspect-[16/9]">
                <img src={news.images[0]} loading="lazy" decoding="async" alt="Imagem da notícia" className="absolute inset-0 h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              </div>
            )}
            <h1 className="mt-6 text-3xl font-bold text-white inline-block transition-colors duration-200">{news.title}</h1>
            <div className="mt-2 text-sm text-white/60">{new Date(news.created_at).toLocaleDateString('pt-BR')}</div>
            <div className="markdown-content mt-6 max-w-none text-white/90">
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{preparedContent}</ReactMarkdown>
            </div>
          </article>
        )}
      </Container>
    </section>
  )
}
