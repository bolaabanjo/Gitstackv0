import { supabase } from "@/lib/supabaseClient"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import SignUpForm from "@/components/auth/signup-form"

export default async function SignUpPage() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is already logged in, redirect to dashboard
  if (session) {
    redirect("/onboarding")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" aria-label="Gitstack Home">
            <Image src="/logo.png" alt="Gitstack" width={48} height={48} className="mx-auto h-12 w-12" />
          </Link>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}
