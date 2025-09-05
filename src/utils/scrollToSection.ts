export function scrollToSection(id: string) {
  if (typeof document === 'undefined') return

  if (id === 'inicio') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
    }

  const el = document.getElementById(id)
  if (el) {
    try {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch {
      // Fallback for older browsers
      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }
}

