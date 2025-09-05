import { useEffect, useState } from 'react'

export function useScrollSpy(ids: string[], offset = 120) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const getActive = () => {
      let current = ids[0] ?? ''
      let maxTop = -Infinity
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= offset && top > maxTop) {
          maxTop = top
          current = id
        }
      }
      return current
    }

    const onScroll = () => setActiveId(getActive())
    const onResize = () => setActiveId(getActive())

    // Initial
    setActiveId(getActive())
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [ids, offset])

  return activeId
}

