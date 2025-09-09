import { useEffect, useRef, useState } from 'react'
import Container from '../components/Container'
import { supabase } from '../lib/supabaseClient'

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
    <section className="py-16 md:py-10 bg-white">
      <Container className="h-full overflow-hidden">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Painel Administrativo</h2>
        </div>

        <div className="mt-8 grid h-full gap-8 lg:grid-cols-12">
        <form onSubmit={handleSubmit} className="lg:col-span-7 grid gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm h-full overflow-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Conteúdo</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Imagens <span className="text-red-600">*</span> {editingId ? <span className="text-xs text-gray-500">— deixe vazio para manter as atuais</span> : null}</label>
            <div
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
              onDrop={onDrop}
              className="mt-1 flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-gray-400">
                <path fillRule="evenodd" d="M1.5 6A2.25 2.25 0 0 1 3.75 3.75h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6Zm3 9l3.94-3.94a1.5 1.5 0 0 1 2.12 0L15 15l2.25-2.25a1.5 1.5 0 0 1 2.12 0L19.5 15V6H4.5v9Z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm text-gray-700">Arraste e solte imagens aqui</p>
                <p className="text-xs text-gray-500">ou</p>
              </div>
              <button
                type="button"
                onClick={onBrowseClick}
                className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50 cursor-pointer"
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
              <p className="text-xs text-gray-500">PNG, JPG, até 5MB por arquivo. Máx. 10 imagens.</p>
            </div>

            {editingId && currentImages.length > 0 && pendingImages.length === 0 && (
              <div className="mt-3">
                <div className="text-xs text-gray-500 mb-2">Imagens atuais</div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {currentImages.map((url) => (
                    <img key={url} src={url} className="h-24 w-full rounded-md object-cover ring-1 ring-gray-200" />
                  ))}
                </div>
              </div>
            )}

            {pendingImages.length > 0 && (
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {pendingImages.map((p) => (
                    <div key={p.id} className="relative group">
                      <img src={p.preview} alt="Pré-visualização" className="h-28 w-full rounded-md object-cover ring-1 ring-gray-200" />
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
                <p className="mt-2 text-xs text-gray-500">{pendingImages.length} imagem(ns) pronta(s) para envio</p>
              </div>
            )}
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            {submitting ? 'Salvando...' : editingId ? 'Atualizar notícia' : 'Salvar notícia'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => { setEditingId(null); setTitle(''); setContent(''); setPendingImages([]); setCurrentImages([]) }}
              className="sm:ml-3 w-full sm:w-auto rounded-md border px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Cancelar edição
            </button>
          )}
        </form>
        <aside className="lg:col-span-5 h-full">
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Últimas notícias</h3>
              <div className="mt-4 h-[60vh] overflow-y-auto pr-1">
                <div className="grid gap-4 sm:grid-cols-2">
                  {news.map((n) => (
                    <article key={n.id} className="rounded-lg border border-gray-200 bg-white p-4">
                      {n.images?.[0] && (
                        <img src={n.images[0]} alt="Imagem da notícia" className="h-28 w-full object-cover rounded-md" />
                      )}
                      <h4 className="mt-2 line-clamp-2 text-sm font-semibold text-gray-900">{n.title}</h4>
                      <div className="mt-2 flex gap-2">
                        <button onClick={() => startEdit(n)} className="rounded-md px-2 py-1 text-xs ring-1 ring-gray-300 hover:bg-gray-50 cursor-pointer">Editar</button>
                        <button onClick={() => setConfirmId(n.id)} className="rounded-md px-2 py-1 text-xs text-white bg-red-600 hover:bg-red-700 cursor-pointer">Excluir</button>
                      </div>
                    </article>
                  ))}
                  {news.length === 0 && <p className="text-sm text-gray-600">Nenhuma notícia cadastrada.</p>}
                </div>
              </div>
            </div>
          </div>
        </aside>
        </div>
      {/* Modal de confirmação */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h4 className="text-lg font-semibold text-gray-900">Excluir notícia</h4>
            <p className="mt-2 text-sm text-gray-600">Tem certeza que deseja excluir esta notícia? Esta ação não pode ser desfeita.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
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
      </Container>
    </section>
  )
}


