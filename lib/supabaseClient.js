import { createClient } from '@supabase/supabase-js'

// Load from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. Check your .env.local file.")
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
