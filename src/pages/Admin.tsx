import { useEffect, useRef, useState, useMemo } from 'react'
import Container from '../components/Container'
import { supabase } from '../lib/supabaseClient'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

type NewsItem = {
  id: string
  title: string
  content: string
  images: string[]
  created_at: string
}

type PendingImage = {
  id: string
  file: File
  preview: string
}

export default function Admin() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [news, setNews] = useState<NewsItem[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [currentImages, setCurrentImages] = useState<string[]>([])
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)

  const preparedPreviewContent = useMemo(() => content || '', [content])

  async function fetchNews() {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)
    if (error) return
    setNews(data as NewsItem[])
  }

  useEffect(() => {
    fetchNews()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      // Valida conteúdo (remove tags/espacos e confere vazio)
      const contentText = content
        .replace(/<[^>]*>/g, ' ') // remove tags
        .replace(/&nbsp;/g, ' ')  // normaliza nbsp
        .replace(/\s+/g, ' ')    // colapsa espaços
        .trim()
      if (!contentText) {
        setSubmitting(false)
        setError('Conteúdo é obrigatório.')
        return
      }
      const hasAtLeastOneImage = editingId
        ? (pendingImages.length > 0 || currentImages.length > 0)
        : pendingImages.length > 0

      if (!hasAtLeastOneImage) {
        setSubmitting(false)
        setError('Pelo menos uma imagem é obrigatória.')
        return
      }

      const uploadedUrls: string[] = []
      if (pendingImages.length > 0) {
        for (const img of pendingImages) {
          const file = img.file
          const fileExt = file.name.split('.').pop()
          const filePath = `${crypto.randomUUID()}.${fileExt}`
          const { error: uploadError } = await supabase.storage
            .from('news-images')
            .upload(filePath, file, { upsert: false })
          if (uploadError) throw uploadError
          const { data } = supabase.storage.from('news-images').getPublicUrl(filePath)
          uploadedUrls.push(data.publicUrl)
        }
      }

      if (editingId) {
        const finalImages = uploadedUrls.length > 0 ? uploadedUrls : currentImages
        const { error: updateError } = await supabase
          .from('news')
          .update({ title, content, images: finalImages })
          .eq('id', editingId)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase
          .from('news')
          .insert({ title, content, images: uploadedUrls })
        if (insertError) throw insertError
      }

      setTitle('')
      setContent('')
      // Revoga URLs e limpa seleção
      pendingImages.forEach((p) => URL.revokeObjectURL(p.preview))
      setPendingImages([])
      setEditingId(null)
      setCurrentImages([])
      await fetchNews()
    } catch (err: any) {
      setError(err?.message || 'Falha ao salvar notícia')
    } finally {
      setSubmitting(false)
    }
  }

  function startEdit(item: NewsItem) {
    setEditingId(item.id)
    setTitle(item.title)
    setContent(item.content)
    setCurrentImages(item.images || [])
    setPendingImages([])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(id: string) {
    setConfirming(true)
    const { error } = await supabase.from('news').delete().eq('id', id)
    setConfirming(false)
    if (error) {
      setError(error.message)
      return
    }
    setConfirmId(null)
    await fetchNews()
  }

  function addFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    const maxFiles = 10
    const maxSizeBytes = 5 * 1024 * 1024 // 5MB

    const next: PendingImage[] = []
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue
      if (file.size > maxSizeBytes) {
        setError('Cada imagem deve ter no máximo 5MB')
        continue
      }
      next.push({ id: crypto.randomUUID(), file, preview: URL.createObjectURL(file) })
    }
    setPendingImages((prev) => {
      const combined = [...prev, ...next]
      if (combined.length > maxFiles) {
        setError(`Máximo de ${maxFiles} imagens por notícia`)
        return combined.slice(0, maxFiles)
      }
      return combined
    })
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    addFiles(e.dataTransfer.files)
  }

  function onBrowseClick() {
    fileInputRef.current?.click()
  }

  function removePending(id: string) {
    setPendingImages((prev) => {
      const toRemove = prev.find((p) => p.id === id)
      if (toRemove) URL.revokeObjectURL(toRemove.preview)
      return prev.filter((p) => p.id !== id)
    })
  }

  useEffect(() => {
    return () => {
      // Cleanup ao desmontar
      pendingImages.forEach((p) => URL.revokeObjectURL(p.preview))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="py-16 md:py-10 bg-[#0B1636]">
      <Container className="h-full overflow-hidden">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Painel Administrativo</h2>
        </div>

        <div className="mt-8 grid h-full gap-8 lg:grid-cols-12">
        <form onSubmit={handleSubmit} className="lg:col-span-7 grid gap-4 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md p-5 shadow-sm h-full overflow-auto text-white">
          <div>
            <label className="block text-sm font-medium text-white/90">Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-md border-0 bg-white/10 px-3 py-2 text-white placeholder:text-white/60 ring-1 ring-inset ring-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/90">Conteúdo</label>
            <p className="mt-1 text-xs text-white/70">Dica: para imagens, use o campo "Imagens" abaixo. O editor não envia imagens embutidas.</p>
            <div className="mt-1 rounded-md ring-1 ring-inset ring-white/20 overflow-visible quill-dark">
              <div id="admin-editor-toolbar" className="ql-toolbar ql-snow">
                <span className="ql-formats">
                  <button className="ql-bold" title="Negrito" />
                  <button className="ql-italic" title="Itálico" />
                  <button className="ql-underline" title="Sublinhado" />
                  <button className="ql-strike" title="Tachado" />
                </span>
                <span className="ql-formats">
                  <select className="ql-color" title="Cor do texto" />
                  <select className="ql-background" title="Cor de fundo do texto" />
                </span>
                <span className="ql-formats">
                  <button className="ql-list" value="ordered" title="Lista numerada" />
                  <button className="ql-list" value="bullet" title="Lista com marcadores" />
                </span>
                <span className="ql-formats">
                  <select className="ql-align" title="Alinhamento do texto">
                    <option />
                    <option value="center" />
                    <option value="right" />
                    <option value="justify" />
                  </select>
                </span>
                <span className="ql-formats">
                  <button className="ql-link" title="Inserir link" />
                  <button className="ql-blockquote" title="Citação" />
                  <button className="ql-code-block" title="Bloco de código" />
                </span>
                <span className="ql-formats">
                  <button className="ql-clean" title="Limpar formatação" />
                </span>
              </div>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Escreva o conteúdo da notícia..."
                modules={useMemo(() => ({
                  toolbar: { container: '#admin-editor-toolbar' },
                }), [])}
                formats={['bold','italic','underline','strike','color','background','list','bullet','align','link','blockquote','code-block']}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/90">Imagens <span className="text-red-600">*</span> {editingId ? <span className="text-xs text-white/70">— deixe vazio para manter as atuais</span> : null}</label>
            <div
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
              onDrop={onDrop}
              className="mt-1 flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-white/25 bg-white/5 p-6 text-center hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white/70">
                <path fillRule="evenodd" d="M1.5 6A2.25 2.25 0 0 1 3.75 3.75h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6Zm3 9l3.94-3.94a1.5 1.5 0 0 1 2.12 0L15 15l2.25-2.25a1.5 1.5 0 0 1 2.12 0L19.5 15V6H4.5v9Z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm text-white/80">Arraste e solte imagens aqui</p>
                <p className="text-xs text-white/70">ou</p>
              </div>
              <button
                type="button"
                onClick={onBrowseClick}
                className="rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 hover:bg-white/15 cursor-pointer"
              >
                Selecionar imagens
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => addFiles(e.target.files)}
                className="hidden"
              />
              <p className="text-xs text-white/70">PNG, JPG, até 5MB por arquivo. Máx. 10 imagens.</p>
            </div>

            {editingId && currentImages.length > 0 && pendingImages.length === 0 && (
              <div className="mt-3">
                <div className="text-xs text-white/70 mb-2">Imagens atuais</div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {currentImages.map((url) => (
                    <img key={url} src={url} className="h-24 w-full rounded-md object-cover ring-1 ring-white/20" />
                  ))}
                </div>
              </div>
            )}

            {pendingImages.length > 0 && (
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {pendingImages.map((p) => (
                    <div key={p.id} className="relative group">
                      <img src={p.preview} alt="Pré-visualização" className="h-28 w-full rounded-md object-cover ring-1 ring-white/20" />
                      <button
                        type="button"
                        onClick={() => removePending(p.id)}
                        className="absolute right-1 top-1 hidden rounded-full bg-black/60 p-1 text-white group-hover:block cursor-pointer"
                        aria-label="Remover"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-white/70">{pendingImages.length} imagem(ns) pronta(s) para envio</p>
              </div>
            )}
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="w-full sm:w-auto rounded-md ring-1 ring-white/25 px-4 py-2 text-white hover:bg-white/10 cursor-pointer"
            >
              Pré-visualizar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
            >
              {submitting ? 'Salvando...' : editingId ? 'Atualizar notícia' : 'Salvar notícia'}
            </button>
          </div>
          {editingId && (
            <button
              type="button"
              onClick={() => { setEditingId(null); setTitle(''); setContent(''); setPendingImages([]); setCurrentImages([]) }}
              className="sm:ml-3 w-full sm:w-auto rounded-md ring-1 ring-white/25 px-4 py-2 text-white hover:bg-white/10 cursor-pointer"
            >
              Cancelar edição
            </button>
          )}
        </form>
        <aside className="lg:col-span-5 h-full">
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-md p-5 shadow-sm text-white">
              <h3 className="text-xl font-semibold text-white">Últimas notícias</h3>
              <div className="mt-4 h-[60vh] overflow-y-auto pr-1">
                <div className="grid gap-4 sm:grid-cols-2">
                  {news.map((n) => (
                    <article key={n.id} className="rounded-lg border border-white/15 bg-white/10 p-4">
                      {n.images?.[0] && (
                        <img src={n.images[0]} alt="Imagem da notícia" className="h-28 w-full object-cover rounded-md" />
                      )}
                      <h4 className="mt-2 line-clamp-2 text-sm font-semibold text-white">{n.title}</h4>
                      <div className="mt-2 flex gap-2">
                        <button onClick={() => startEdit(n)} className="rounded-md px-2 py-1 text-xs text-white ring-1 ring-white/25 hover:bg-white/10 cursor-pointer">Editar</button>
                        <button onClick={() => setConfirmId(n.id)} className="rounded-md px-2 py-1 text-xs text-white bg-red-600 hover:bg-red-700 cursor-pointer">Excluir</button>
                      </div>
                    </article>
                  ))}
                  {news.length === 0 && <p className="text-sm text-white/80">Nenhuma notícia cadastrada.</p>}
                </div>
              </div>
            </div>
          </div>
        </aside>
        </div>
      {/* Modal de confirmação */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-xl ring-1 ring-white/10 text-white">
            <h4 className="text-lg font-semibold text-white">Excluir notícia</h4>
            <p className="mt-2 text-sm text-white/80">Tem certeza que deseja excluir esta notícia? Esta ação não pode ser desfeita.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="rounded-md px-4 py-2 text-sm text-white ring-1 ring-white/25 hover:bg-white/10 cursor-pointer"
                onClick={() => setConfirmId(null)}
                disabled={confirming}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-60 cursor-pointer"
                onClick={() => confirmId && handleDelete(confirmId)}
                disabled={confirming}
              >
                {confirming ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de pré-visualização */}
      {previewOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0B1636] p-4 ring-1 ring-white/10 shadow-2xl">
            <button
              aria-label="Fechar"
              onClick={() => setPreviewOpen(false)}
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-white/10 text-white hover:bg-white/15 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            <article className="mx-auto max-w-4xl text-white">
              {(pendingImages[0]?.preview || currentImages[0]) && (
                <div className="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-white/5 aspect-[16/9]">
                  <img src={pendingImages[0]?.preview || currentImages[0]} loading="lazy" decoding="async" alt="Imagem da notícia" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                </div>
              )}
              <h1 className="mt-6 text-3xl font-bold text-white inline-block transition-colors duration-200">{title || 'Título da notícia'}</h1>
              <div className="mt-2 text-sm text-white/60">{new Date().toLocaleDateString('pt-BR')}</div>
              <div className="markdown-content mt-6 max-w-none text-white/90">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {preparedPreviewContent}
                </ReactMarkdown>
              </div>
            </article>
          </div>
        </div>
      )}
      </Container>
    </section>
  )
}


