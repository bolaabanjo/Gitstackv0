"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Github, MessageSquare, FolderOpen, Plus } from "lucide-react"
import Link from "next/link"
import { RepoConnector } from "./repo-connector"
import { RepoExplorer } from "./repo-explorer"
import { RepoChat } from "./repo-chat"

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

interface RepoInterfaceProps {
  repositories: Repository[]
}

export function RepoInterface({ repositories }: RepoInterfaceProps) {
  const [selectedRepo, setSelectedRepo] = useState<string>("")
  const [activeTab, setActiveTab] = useState("connect")

  const selectedRepository = repositories.find((repo) => repo.id === selectedRepo)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Ask My Repo</h1>
          <p className="text-muted-foreground mt-2">
            Connect your GitHub repositories and ask questions about your codebase
          </p>
        </div>
      </div>

      {/* Repository Selection */}
      {repositories.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              Select Repository
            </CardTitle>
            <CardDescription>Choose which repository you want to explore and query</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedRepo} onValueChange={setSelectedRepo}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Select a repository..." />
              </SelectTrigger>
              <SelectContent>
                {repositories.map((repo) => (
                  <SelectItem key={repo.id} value={repo.id}>
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      {repo.full_name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedRepository && (
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="secondary">Active: {selectedRepository.full_name}</Badge>
                {selectedRepository.language && <Badge variant="outline">{selectedRepository.language}</Badge>}
                <Badge variant="outline">{selectedRepository.stars} stars</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="connect" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Connect Repos
          </TabsTrigger>
          <TabsTrigger value="explore" className="flex items-center gap-2" disabled={!selectedRepo}>
            <FolderOpen className="h-4 w-4" />
            Explore Code
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2" disabled={!selectedRepo}>
            <MessageSquare className="h-4 w-4" />
            Ask Questions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="connect">
          <RepoConnector repositories={repositories} />
        </TabsContent>

        <TabsContent value="explore">
          {selectedRepository ? (
            <RepoExplorer repository={selectedRepository} />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Repository</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Choose a repository from the dropdown above to explore its code structure and files.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="chat">
          {selectedRepository ? (
            <RepoChat repository={selectedRepository} />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Repository</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Choose a repository from the dropdown above to start asking questions about your codebase.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
