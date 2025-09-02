import { supabase } from "@/lib/supabaseClient"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next") ?? "/dashboard"

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirect to the specified next URL or dashboard
  return NextResponse.redirect(new URL(next, request.url))
}
