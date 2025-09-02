// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabase } from './lib/supabaseClient'

export async function middleware(req: NextRequest) {
  const { data: { session } } = await supabase.auth.getSession()

  const url = req.nextUrl.clone()

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
