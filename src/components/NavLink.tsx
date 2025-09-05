import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../utils/scrollToSection'

type Props = {
  targetId: string
  children: React.ReactNode
  onNavigate?: () => void
  activeId?: string
}

export default function NavLink({ targetId, children, onNavigate, activeId }: Props) {
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === '/'
  const currentHash = location.hash
  const isActive = activeId
    ? activeId === targetId
    : isHome && (
        (targetId === 'inicio' && (currentHash === '' || currentHash === '#inicio')) ||
        currentHash === `#${targetId}`
      )

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    onNavigate?.()

    if (isHome) {
      // Update hash without leaving Home, then smooth scroll
      if (targetId === 'inicio') {
        navigate({ hash: '' })
        scrollToSection('inicio')
      } else {
        navigate({ hash: `#${targetId}` })
        // slight timeout to allow hash change propagate
        setTimeout(() => scrollToSection(targetId), 0)
      }
    } else {
      // Go to Home with hash; Home effect will handle scrolling
      if (targetId === 'inicio') {
        navigate('/')
      } else {
        navigate(`/#${targetId}`)
      }
    }
  }

  return (
    <a
      href={targetId === 'inicio' ? '/' : `/#${targetId}`}
      onClick={handleClick}
      className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-brand-300 ${
        isActive ? 'text-brand-300' : 'text-white/80'
      }`}
    >
      {children}
    </a>
  )
}
