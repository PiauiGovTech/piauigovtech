import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/Container'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { supabase } from '../lib/supabaseClient'
 

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
 

  // Transforma sequências de múltiplos Enters em quebras visíveis adicionais.
  // Ex.: 2 Enters => 1 parágrafo + 1 linha extra; 5 Enters => 1 parágrafo + 4 linhas extras.
  const preparedContent = useMemo(() => news?.content || '', [news?.content])

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
      

      <div className="pt-24 sm:pt-28" />
      <Container className="pb-15">
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
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{preparedContent}</ReactMarkdown>
            </div>
          </article>
        )}
      </Container>
    </section>
  )
}
