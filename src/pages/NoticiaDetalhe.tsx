import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Container from '../components/Container'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
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
    <section className="py-16 md:py-24 bg-white min-h-[calc(100vh-200px)]">
      <Container>
        {error && <p className="text-red-600">{error}</p>}
        {news && (
          <article className="mx-auto max-w-4xl">
            {news.images?.[0] && (
              <div className="relative w-full overflow-hidden rounded-xl bg-gray-100 aspect-[16/9]">
                <img src={news.images[0]} alt="Imagem da notícia" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            )}
            <h1 className="mt-6 text-3xl font-bold text-gray-900 inline-block transition-colors duration-200">{news.title}</h1>
            <div className="mt-2 text-sm text-gray-500">{new Date(news.created_at).toLocaleDateString('pt-BR')}</div>
            <div className="markdown-content mt-6 max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{preparedContent}</ReactMarkdown>
            </div>
          </article>
        )}
      </Container>
    </section>
  )
}


