"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Github, Plus, ExternalLink, Star, GitFork } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Repository {
  id: string
  name: string
  full_name: string
  description: string
  url: string
  language: string
  stars: number
  forks: number
  updated_at: string
}

interface RepoConnectorProps {
  repositories: Repository[]
}

export function RepoConnector({ repositories }: RepoConnectorProps) {
  const [repoUrl, setRepoUrl] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  const handleConnect = async () => {
    if (!repoUrl.trim()) {
      toast({
        title: "Missing URL",
        description: "Please enter a GitHub repository URL.",
        variant: "destructive",
      })
      return
    }

    // Validate GitHub URL format
    const githubUrlPattern = /^https:\/\/github\.com\/[\w\-.]+\/[\w\-.]+\/?$/
    if (!githubUrlPattern.test(repoUrl.trim())) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid GitHub repository URL.",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)

    try {
      const response = await fetch("/api/repo/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: repoUrl.trim() }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Repository connected",
          description: `Successfully connected ${data.repository.full_name}`,
        })
        setRepoUrl("")
        // In a real app, this would trigger a refresh of the repositories list
      } else {
        throw new Error(data.error || "Failed to connect repository")
      }
    } catch (error) {
      toast({
        title: "Connection failed",
        description: error instanceof Error ? error.message : "Failed to connect repository",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Connect New Repository */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Connect Repository
          </CardTitle>
          <CardDescription>Connect a GitHub repository to start asking questions about your codebase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="repo-url">GitHub Repository URL</Label>
            <Input
              id="repo-url"
              placeholder="https://github.com/username/repository"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
          </div>

          <Button onClick={handleConnect} disabled={isConnecting || !repoUrl.trim()} className="w-full">
            {isConnecting ? "Connecting..." : "Connect Repository"}
          </Button>

          <div className="text-sm text-muted-foreground">
            <p>
              <strong>Note:</strong> Only public repositories are supported. Private repositories require additional
              authentication setup.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Connected Repositories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            Connected Repositories ({repositories.length})
          </CardTitle>
          <CardDescription>Your connected GitHub repositories</CardDescription>
        </CardHeader>
        <CardContent>
          {repositories.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Github className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No repositories connected yet. Connect your first repository to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {repositories.map((repo) => (
                <div key={repo.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Github className="h-4 w-4" />
                        <h4 className="font-medium">{repo.full_name}</h4>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={repo.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                      {repo.description && <p className="text-sm text-muted-foreground mb-2">{repo.description}</p>}
                      <div className="flex items-center gap-2">
                        {repo.language && <Badge variant="outline">{repo.language}</Badge>}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-3 w-3" />
                          {repo.stars}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <GitFork className="h-3 w-3" />
                          {repo.forks}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
