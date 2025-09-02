import { supabase } from "@/lib/supabaseClient"
import { redirect } from "next/navigation"
import OnboardingFlow from "@/components/onboarding/onboarding-flow"

export default async function OnboardingPage() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If no user, redirect to login
  if (!user) {
    redirect("/auth/login")
  }

  // Check if user has already completed onboarding
  const { data: projects } = await supabase.from("projects").select("id").eq("user_id", user.id).limit(1)

  // If user has projects, they've completed onboarding
  if (projects && projects.length > 0) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <OnboardingFlow user={user} />
    </div>
  )
}
