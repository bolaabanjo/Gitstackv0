"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Search, Brain, Plus, Zap } from "lucide-react"
import Link from "next/link"

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button asChild className="h-auto p-4 flex-col gap-2">
            <Link href="/dashboard/projects/new">
              <Plus className="h-6 w-6" />
              <span className="text-sm">New Project</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
            <Link href="/dashboard/assistant">
              <Code2 className="h-6 w-6" />
              <span className="text-sm">Fine-tune Model</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
            <Link href="/dashboard/regex">
              <Search className="h-6 w-6" />
              <span className="text-sm">Generate Regex</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
            <Link href="/dashboard/repo">
              <Brain className="h-6 w-6" />
              <span className="text-sm">Query Repository</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
