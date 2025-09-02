import { supabase } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { RegexLab } from "@/components/regex/regex-lab"

export default async function RegexPage() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <RegexLab />
    </div>
  )
}
