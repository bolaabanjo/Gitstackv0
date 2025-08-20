"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, FileText, Brain, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { KnowledgeBase } from "./knowledge-base"
import { ChatInterface } from "./chat-interface"

interface Project {
  id: string
  name: string
  description: string
}

interface AssistantInterfaceProps {
  projects: Project[]
}

export function AssistantInterface({ projects }: AssistantInterfaceProps) {
  const [selectedProject, setSelectedProject] = useState<string>("")
  const [activeTab, setActiveTab] = useState("knowledge")

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
          <h1 className="text-3xl font-bold text-foreground">Private Coding Assistant</h1>
          <p className="text-muted-foreground mt-2">
            Upload your project documentation and chat with an AI that understands your codebase
          </p>
        </div>
      </div>

      {/* Project Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Select Project
          </CardTitle>
          <CardDescription>Choose which project you want to work with for this session</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Select a project..." />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedProject && (
            <div className="mt-4">
              <Badge variant="secondary">Active Project: {projects.find((p) => p.id === selectedProject)?.name}</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Interface */}
      {selectedProject ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat Assistant
            </TabsTrigger>
          </TabsList>

          <TabsContent value="knowledge">
            <KnowledgeBase projectId={selectedProject} />
          </TabsContent>

          <TabsContent value="chat">
            <ChatInterface projectId={selectedProject} />
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Brain className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Select a Project</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Choose a project from the dropdown above to start uploading documentation and chatting with your AI
              assistant.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
