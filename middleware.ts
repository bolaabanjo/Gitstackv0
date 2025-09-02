// middleware.ts
import { NextResponse, type NextRequest } from "next/server"
import type { NextRequest } from 'next/server'
import { supabase } from './lib/supabaseClient'

export async function middleware(req: NextRequest) {
  const { data: { session } } = await supabase.auth.getSession()

  const url = req.nextUrl.clone()

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

export async function updateSession(request: NextRequest) {
  // If Supabase is not configured, just continue without auth
  if (!isSupabaseConfigured) {
    return NextResponse.next({
      request,
    })
  }

  const res = NextResponse.next()

  // Check if this is an auth callback
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    // Redirect to onboarding after auth callback
    return NextResponse.redirect(new URL("/onboarding", request.url))
  }

  // Protected routes - redirect to login if not authenticated
  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/auth/login") ||
    request.nextUrl.pathname.startsWith("/auth/signup") ||
    request.nextUrl.pathname === "/auth/callback"

  const isPublicRoute = request.nextUrl.pathname === "/"

  if (!isAuthRoute && !isPublicRoute) {
    // Simple cookie check - detailed session validation happens in route handlers
    const authCookies = request.cookies
      .getAll()
      .filter((cookie) => cookie.name.startsWith("sb-") || cookie.name.includes("supabase"))

    if (authCookies.length === 0) {
      const redirectUrl = new URL("/auth/login", request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()
}

  if (!session) {
    if (!url.pathname.startsWith('/auth')) {
      url.pathname = '/auth/login'
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  const user = session.user
  const onboardingComplete = user?.user_metadata?.onboarding_complete

  if (!onboardingComplete && !url.pathname.startsWith('/onboarding')) {
    url.pathname = '/onboarding'
    return NextResponse.redirect(url)
  }

  if (onboardingComplete && url.pathname.startsWith('/auth')) {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
