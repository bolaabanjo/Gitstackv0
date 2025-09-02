"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { CodeBracketIcon, BeakerIcon, BookOpenIcon } from "@heroicons/react/24/outline"
import { Zap } from "lucide-react"
import Link from "next/link"

export default function QuickActions() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button asChild className="h-auto p-4 flex-col gap-2 rounded-2xl">
            <Link href="/dashboard/projects/new">
              <Plus className="h-6 w-6" />
              <span className="text-sm">New Project</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent rounded-2xl">
            <Link href="/dashboard/assistant">
              <CodeBracketIcon className="h-6 w-6" />
              <span className="text-sm">Fine-tune Model</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent rounded-2xl">
            <Link href="/dashboard/regex">
              <BeakerIcon className="h-6 w-6" />
              <span className="text-sm">Generate Regex</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent rounded-2xl">
            <Link href="/dashboard/repo">
              <BookOpenIcon className="h-6 w-6" />
              <span className="text-sm">Query Repository</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
