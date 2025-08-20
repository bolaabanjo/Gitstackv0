"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Trash2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface KnowledgeItem {
  id: string
  title: string
  content: string
  type: "file" | "manual"
  created_at: string
}

interface KnowledgeBaseProps {
  projectId: string
}

export function KnowledgeBase({ projectId }: KnowledgeBaseProps) {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [manualTitle, setManualTitle] = useState("")
  const [manualContent, setManualContent] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    try {
      for (const file of files) {
        const content = await file.text()
        const newItem: KnowledgeItem = {
          id: Math.random().toString(36).substr(2, 9),
          title: file.name,
          content,
          type: "file",
          created_at: new Date().toISOString(),
        }

        // In a real app, this would save to Supabase
        setKnowledgeItems((prev) => [...prev, newItem])
      }

      toast({
        title: "Files uploaded successfully",
        description: `Added ${files.length} file(s) to your knowledge base.`,
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleManualAdd = () => {
    if (!manualTitle.trim() || !manualContent.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and content.",
        variant: "destructive",
      })
      return
    }

    const newItem: KnowledgeItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: manualTitle,
      content: manualContent,
      type: "manual",
      created_at: new Date().toISOString(),
    }

    setKnowledgeItems((prev) => [...prev, newItem])
    setManualTitle("")
    setManualContent("")

    toast({
      title: "Knowledge added",
      description: "Successfully added manual knowledge to your base.",
    })
  }

  const handleDelete = (id: string) => {
    setKnowledgeItems((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Knowledge removed",
      description: "Item has been removed from your knowledge base.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Files
            </CardTitle>
            <CardDescription>
              Upload documentation, READMEs, architecture notes, and other project files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Select Files</Label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".txt,.md,.json,.yml,.yaml,.js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.h,.cs,.php,.rb,.go,.rs,.swift,.kt"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  disabled={isUploading}
                />
              </div>
              <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="w-full">
                {isUploading ? "Uploading..." : "Choose Files"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Manual Knowledge
            </CardTitle>
            <CardDescription>Manually add project context, coding patterns, or specific instructions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="manual-title">Title</Label>
                <Input
                  id="manual-title"
                  placeholder="e.g., API Authentication Pattern"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="manual-content">Content</Label>
                <Textarea
                  id="manual-content"
                  placeholder="Describe your coding patterns, architecture decisions, or any context that would help the AI understand your project..."
                  value={manualContent}
                  onChange={(e) => setManualContent(e.target.value)}
                  rows={4}
                />
              </div>
              <Button onClick={handleManualAdd} className="w-full">
                Add Knowledge
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Knowledge Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Knowledge Base ({knowledgeItems.length} items)
          </CardTitle>
          <CardDescription>Your uploaded files and manual knowledge that the AI can reference</CardDescription>
        </CardHeader>
        <CardContent>
          {knowledgeItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No knowledge items yet. Upload files or add manual knowledge to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {knowledgeItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <Badge variant={item.type === "file" ? "default" : "secondary"}>{item.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.content.substring(0, 150)}...</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
