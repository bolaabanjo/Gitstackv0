"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Code2, Zap, ArrowRight, Loader2 } from "lucide-react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface CompletionStepProps {
  projectData: {
    name: string
    description: string
    githubUrl?: string
  } | null
  user: User
}

export default function CompletionStep({ projectData, user }: CompletionStepProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (projectData) {
      createProject()
    }
  }, [projectData])

  const createProject = async () => {
    if (!projectData) return

    setIsCreating(true)
    try {
      const { error } = await supabase.from("projects").insert({
        user_id: user.id,
        name: projectData.name,
        description: projectData.description,
        github_url: projectData.githubUrl,
      })

      if (error) {
        console.error("Error creating project:", error)
      } else {
        setIsComplete(true)
      }
    } catch (error) {
      console.error("Error creating project:", error)
    } finally {
      setIsCreating(false)
    }
  }

  const goToDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        {isCreating ? (
          <>
            <div className="mx-auto mb-6 p-4 bg-primary/10 rounded-full w-fit">
              <Loader2 className="h-12 w-12 animate-spin" />
            </div>
            <h1 className="font-serif font-bold text-3xl">Setting up your project...</h1>
            <p className="text-muted-foreground">We're creating your project and preparing your GitStack workspace.</p>
          </>
        ) : isComplete ? (
          <>
            <div className="mx-auto mb-6 p-4 bg-chart-3/10 rounded-full w-fit">
              <CheckCircle className="h-12 w-12 text-chart-3" />
            </div>
            <h1 className="font-serif font-bold text-3xl">Welcome to GitStack!</h1>
            <p className="text-muted-foreground">
              Your project has been created successfully. You're ready to start building with AI-powered tools.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto mb-6 p-4 bg-destructive/10 rounded-full w-fit">
              <Code2 className="h-12 w-12 text-destructive" />
            </div>
            <h1 className="font-serif font-bold text-3xl">Setup Error</h1>
            <p className="text-muted-foreground">There was an issue creating your project. Please try again.</p>
          </>
        )}
      </div>

      {isComplete && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-center">
                <CheckCircle className="h-5 w-5 text-chart-3" />
                Project Created: {projectData?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {projectData?.description || "Your new GitStack project is ready to use."}
                </p>

                {projectData?.githubUrl && (
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Badge variant="secondary">GitHub Connected</Badge>
                    <span className="text-muted-foreground">Repository analysis will begin shortly</span>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="p-2 bg-primary/10 rounded-lg w-fit mx-auto mb-2">
                      <Code2 className="h-5 w-5" />
                    </div>
                    <p className="text-xs text-muted-foreground">Fine-tuner Ready</p>
                  </div>
                  <div className="text-center">
                    <div className="p-2 bg-secondary/10 rounded-lg w-fit mx-auto mb-2">
                      <Zap className="h-5 w-5" />
                    </div>
                    <p className="text-xs text-muted-foreground">Regex Lab Ready</p>
                  </div>
                  <div className="text-center">
                    <div className="p-2 bg-chart-3/10 rounded-lg w-fit mx-auto mb-2">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <p className="text-xs text-muted-foreground">Ask My Repo Ready</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button size="lg" onClick={goToDashboard} className="text-lg px-8">
            Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </>
      )}

      {!isCreating && !isComplete && (
        <Button variant="outline" onClick={() => router.push("/auth/login")}>
          Back to Login
        </Button>
      )}
    </div>
  )
}
