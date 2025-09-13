import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Container from './Container'

export default function RequireAdmin() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const { data } = await supabase.auth.getSession()
      if (!isMounted) return
      const authed = !!data.session
      setIsAuthenticated(authed)
      if (!authed) {
        setLoading(false)
        return
      }
      const uid = data.session!.user.id
      const { data: prof } = await supabase
        .from('profiles')
        .select('is_adm')
        .eq('id', uid)
        .maybeSingle()
      setIsAdmin(!!prof?.is_adm)
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
  if (!isAdmin) return <Navigate to="/login" replace state={{ from: location, notAdmin: true }} />
  return <Outlet />
}
