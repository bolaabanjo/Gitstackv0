import { supabase } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { RepoInterface } from "@/components/repo/repo-interface"

export default async function RepoPage() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/login")
  }

  // Get user's connected repositories
  const { data: repositories } = await supabase
    .from("repositories")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <RepoInterface repositories={repositories || []} />
    </div>
  )
}
