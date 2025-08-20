"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FolderOpen, Clock } from "lucide-react"
import type { User } from "@supabase/supabase-js"

interface WelcomeHeaderProps {
  user: User
  projectCount: number
}

export default function WelcomeHeader({ user, projectCount }: WelcomeHeaderProps) {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening"

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-2xl mb-2">
              {greeting}, {user.user_metadata?.full_name || user.email?.split("@")[0]}!
            </h1>
            <p className="text-muted-foreground">Ready to enhance your development workflow with AI-powered tools?</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <FolderOpen className="h-6 w-6 text-primary" />
                {projectCount}
              </div>
              <p className="text-xs text-muted-foreground">Projects</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <Clock className="h-6 w-6 text-chart-3" />
                {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </div>
              <p className="text-xs text-muted-foreground">Today</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
