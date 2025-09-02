// middleware.ts
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  const authCookies = req.cookies
    .getAll()
    .filter((cookie) => cookie.name.startsWith("sb-") || cookie.name.includes("supabase"))

  const isAuthRoute =
    url.pathname.startsWith("/auth/login") ||
    url.pathname.startsWith("/auth/signup") ||
    url.pathname === "/auth/callback"

  // If not authenticated, redirect to login
  if (authCookies.length === 0 && !isAuthRoute) {
    url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }

  // If authenticated but trying to access auth routes, send to dashboard
  if (authCookies.length > 0 && isAuthRoute) {
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  // If authenticated, check onboarding status via API
  if (authCookies.length > 0) {
    try {
      const res = await fetch(`${req.nextUrl.origin}/api/get-user`, {
        headers: { cookie: req.headers.get("cookie") || "" },
      })

      if (res.ok) {
        const { onboarding_complete } = await res.json()

        // Redirect based on onboarding status
        if (!onboarding_complete && !url.pathname.startsWith("/onboarding")) {
          url.pathname = "/onboarding"
          return NextResponse.redirect(url)
        }

        if (onboarding_complete && url.pathname.startsWith("/onboarding")) {
          url.pathname = "/dashboard"
          return NextResponse.redirect(url)
        }
      }
    } catch (e) {
      console.error("Error checking onboarding status:", e)
    }
  }

  return NextResponse.next()
}
