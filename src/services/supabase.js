import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://ywweflbkchgpsmzwpkgc.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3d2VmbGJrY2hncHNtendwa2djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NTYxNjksImV4cCI6MjAyNjUzMjE2OX0.0HR1GMcRNGbK7bd1IRIehFXSNsrwdcGHdzSOqWl-XW0"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;