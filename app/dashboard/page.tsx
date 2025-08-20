import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import ProjectsGrid from "@/components/dashboard/projects-grid"
import QuickActions from "@/components/dashboard/quick-actions"
import RecentActivity from "@/components/dashboard/recent-activity"
import WelcomeHeader from "@/components/dashboard/welcome-header"

export default async function DashboardPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If no user, redirect to login
  if (!user) {
    redirect("/auth/login")
  }

  // Get user's projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Get recent activity (recent queries, patterns, etc.)
  const { data: recentQueries } = await supabase
    .from("repo_queries")
    .select("*, projects(name)")
    .eq("project_id", projects?.[0]?.id || "")
    .order("created_at", { ascending: false })
    .limit(5)

  const { data: recentPatterns } = await supabase
    .from("regex_patterns")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <DashboardLayout user={user}>
      <div className="space-y-8">
        <WelcomeHeader user={user} projectCount={projects?.length || 0} />

        <QuickActions />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProjectsGrid projects={projects || []} />
          </div>
          <div>
            <RecentActivity recentQueries={recentQueries || []} recentPatterns={recentPatterns || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
