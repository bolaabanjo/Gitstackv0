"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, FolderPlus, ArrowRight, ArrowLeft } from "lucide-react"

interface ProjectSetupStepProps {
  onNext: (data: { name: string; description: string; githubUrl?: string }) => void
  onPrev: () => void
}

export default function ProjectSetupStep({ onNext, onPrev }: ProjectSetupStepProps) {
  const [setupType, setSetupType] = useState<"github" | "manual" | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    githubUrl: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    onNext({
      name: formData.name,
      description: formData.description,
      githubUrl: setupType === "github" ? formData.githubUrl : undefined,
    })
  }

  const isValid =
    formData.name.trim().length > 0 &&
    (setupType === "manual" || (setupType === "github" && formData.githubUrl.trim().length > 0))

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="font-serif font-bold text-3xl">Set up your first project</h1>
        <p className="text-muted-foreground">Create a project to organize your AI tools and fine-tuning models</p>
      </div>

      {!setupType ? (
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => setSetupType("github")}
          >
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                <Github className="h-8 w-8" />
              </div>
              <CardTitle>Connect GitHub Repository</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Import an existing repository to analyze its structure and documentation
              </p>
              <Badge variant="secondary">Recommended</Badge>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => setSetupType("manual")}
          >
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-secondary/10 rounded-full w-fit">
                <FolderPlus className="h-8 w-8" />
              </div>
              <CardTitle>Create New Project</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Start fresh with a new project and add documentation later
              </p>
              <Badge variant="outline">Manual Setup</Badge>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {setupType === "github" ? (
                <>
                  <Github className="h-5 w-5" />
                  GitHub Repository
                </>
              ) : (
                <>
                  <FolderPlus className="h-5 w-5" />
                  New Project
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {setupType === "github" && (
                <div className="space-y-2">
                  <label htmlFor="githubUrl" className="text-sm font-medium">
                    GitHub Repository URL
                  </label>
                  <Input
                    id="githubUrl"
                    type="url"
                    placeholder="https://github.com/username/repository"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll analyze the repository structure and documentation
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Project Name
                </label>
                <Input
                  id="name"
                  placeholder="My Awesome Project"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description (Optional)
                </label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your project..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onPrev}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button type="submit" disabled={!isValid} className="flex-1">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {setupType && (
        <div className="text-center">
          <Button variant="ghost" onClick={() => setSetupType(null)} className="text-sm">
            Choose different setup method
          </Button>
        </div>
      )}
    </div>
  )
}
