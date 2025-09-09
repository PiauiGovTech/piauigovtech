import { createClient } from '@supabase/supabase-js'

// Substitua pelos valores do seu projeto Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string || 'https://ynzznqstfumgjxuljmmw.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluenpucXN0ZnVtZ2p4dWxqbW13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNTMxMzIsImV4cCI6MjA3MjkyOTEzMn0.78d4KSA3O5zyQkaJrmbRbwzqHWNV8SHNrkGTMyL86d0'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


