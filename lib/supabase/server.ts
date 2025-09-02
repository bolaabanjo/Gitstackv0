import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { cache } from "react"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

// Create a cached version of the Supabase client for Server Components
export const createClient = cache(() => {
  const cookieStore = cookies()

  if (!isSupabaseConfigured) {
    console.warn("Supabase environment variables are not set. Using dummy client.")
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signUp: () =>
          Promise.resolve({ data: { user: null, session: null }, error: { message: "Supabase is not configured" } }),
        signInWithPassword: () =>
          Promise.resolve({ data: { user: null, session: null }, error: { message: "Supabase is not configured" } }),
        signOut: () => Promise.resolve({ error: { message: "Supabase is not configured" } }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: { message: "Supabase is not configured" } }),
            limit: () => Promise.resolve({ data: [], error: { message: "Supabase is not configured" } }),
          }),
          order: () => Promise.resolve({ data: [], error: { message: "Supabase is not configured" } }),
        }),
        insert: () => ({
          select: () => ({
            single: () => Promise.resolve({ data: null, error: { message: "Supabase is not configured" } }),
          }),
        }),
      }),
    }
  }

  return createServerComponentClient({ cookies: () => cookieStore })
})

export const supabase = createClient()
