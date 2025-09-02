import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.POSTGRESS_NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.POSTGRESS_NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV !== "production") {
    console.warn("Supabase envs missing: add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }

  // Create a mock client that returns appropriate errors for missing configuration
  supabase = {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      signUp: async () => ({ data: null, error: { message: "Supabase not configured" } }),
      signInWithPassword: async () => ({ data: null, error: { message: "Supabase not configured" } }),
      signInWithOAuth: async () => ({ data: null, error: { message: "Supabase not configured" } }),
      signOut: async () => ({ error: null }),
    },
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: null, error: { message: "Supabase not configured" } }),
      update: () => ({ data: null, error: { message: "Supabase not configured" } }),
      delete: () => ({ data: null, error: { message: "Supabase not configured" } }),
    }),
  }
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }
