import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function RequireAuth() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const { data } = await supabase.auth.getSession()
      if (!isMounted) return
      setIsAuthenticated(!!data.session)
      setLoading(false)
    })()
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
    })
    return () => {
      isMounted = false
      sub.subscription.unsubscribe()
    }
  }, [])

  if (loading) return null
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />
  return <Outlet />
}


