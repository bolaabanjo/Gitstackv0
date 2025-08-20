import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AssistantInterface } from "@/components/assistant/assistant-interface"

export default async function AssistantPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/login")
  }

  // Get user's projects for context
  const { data: projects } = await supabase.from("projects").select("*").eq("user_id", session.user.id)

  return (
    <div className="min-h-screen bg-background">
      <AssistantInterface projects={projects || []} />
    </div>
  )
}
