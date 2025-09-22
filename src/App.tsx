import { Outlet, useLocation } from 'react-router-dom'
import AdminHeader from './components/AdminHeader'
import SiteHeader from './components/SiteHeader'
import Footer from './components/Footer'
import AdminFooter from './components/AdminFooter'
import { useEffect } from 'react'

export default function App() {
  const location = useLocation()

  // Guarda a posição de scroll antes do reload e restaura após recarregar a página
  useEffect(() => {
    const onBeforeUnload = () => {
      try {
        sessionStorage.setItem(
          'scroll-pos',
          JSON.stringify({ x: window.scrollX, y: window.scrollY, href: location.pathname + location.hash })
        )
      } catch {}
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [location.pathname, location.hash])

  useEffect(() => {
    try {
      const navEntries = (performance as any)?.getEntriesByType?.('navigation') || []
      const isReload = navEntries[0]?.type === 'reload' || (performance as any)?.navigation?.type === 1
      if (!isReload) return
      const raw = sessionStorage.getItem('scroll-pos')
      if (!raw) return
      const { x, y, href } = JSON.parse(raw)
      const current = location.pathname + location.hash
      if (href !== current) return
      // Aguarda layout e então restaura a posição
      setTimeout(() => {
        window.scrollTo(x ?? 0, y ?? 0)
      }, 0) 
    } catch {}
  }, [])
  return (
    <div className="min-h-dvh flex flex-col bg-[#0B1636]">
      {(location.pathname.startsWith('/admin') || location.pathname.startsWith('/login')) ? (
        <AdminHeader />
      ) : (
        <SiteHeader />
      )}
      <main className="flex-1 bg-[#0B1636]">
        <Outlet />
      </main>
      {location.pathname.startsWith('/admin') || location.pathname.startsWith('/login') ? <AdminFooter /> : <Footer />}
    </div>
  )
}
