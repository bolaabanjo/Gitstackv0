"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Save, Copy, Trash2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SavedPattern {
  id: string
  name: string
  pattern: string
  description: string
  created_at: string
}

export function SavedPatterns() {
  const [savedPatterns, setSavedPatterns] = useState<SavedPattern[]>([
    {
      id: "1",
      name: "Email Validation",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      description: "Validates email addresses with common domains",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Phone Number",
      pattern: "\\b\\d{3}-\\d{3}-\\d{4}\\b",
      description: "Matches phone numbers in XXX-XXX-XXXX format",
      created_at: new Date().toISOString(),
    },
  ])
  const [newPattern, setNewPattern] = useState({ name: "", pattern: "", description: "" })
  const [showAddForm, setShowAddForm] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    if (!newPattern.name.trim() || !newPattern.pattern.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a name and pattern.",
        variant: "destructive",
      })
      return
    }

    const pattern: SavedPattern = {
      id: Math.random().toString(36).substr(2, 9),
      name: newPattern.name,
      pattern: newPattern.pattern,
      description: newPattern.description,
      created_at: new Date().toISOString(),
    }

    setSavedPatterns((prev) => [pattern, ...prev])
    setNewPattern({ name: "", pattern: "", description: "" })
    setShowAddForm(false)

    toast({
      title: "Pattern saved",
      description: "Your regex pattern has been saved successfully.",
    })
  }

  const handleCopy = async (pattern: string) => {
    try {
      await navigator.clipboard.writeText(pattern)
      toast({
        title: "Copied to clipboard",
        description: "The regex pattern has been copied.",
      })
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = (id: string) => {
    setSavedPatterns((prev) => prev.filter((p) => p.id !== id))
    toast({
      title: "Pattern deleted",
      description: "The regex pattern has been removed.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Add New Pattern */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Save className="h-5 w-5" />
                Save New Pattern
              </CardTitle>
              <CardDescription>Save regex patterns for future use</CardDescription>
            </div>
            <Button variant="outline" onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Pattern
            </Button>
          </div>
        </CardHeader>
        {showAddForm && (
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Pattern Name</Label>
              <Input
                id="name"
                placeholder="e.g., Email Validation"
                value={newPattern.name}
                onChange={(e) => setNewPattern((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="pattern">Regex Pattern</Label>
              <Input
                id="pattern"
                placeholder="Enter your regex pattern..."
                value={newPattern.pattern}
                onChange={(e) => setNewPattern((prev) => ({ ...prev, pattern: e.target.value }))}
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="description">Description (optional)</Label>
              <Input
                id="description"
                placeholder="What does this pattern match?"
                value={newPattern.description}
                onChange={(e) => setNewPattern((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave}>Save Pattern</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Saved Patterns List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Saved Patterns ({savedPatterns.length})</CardTitle>
          <CardDescription>Manage your collection of regex patterns</CardDescription>
        </CardHeader>
        <CardContent>
          {savedPatterns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Save className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No saved patterns yet. Create and save patterns to build your collection.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedPatterns.map((pattern) => (
                <div key={pattern.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium">{pattern.name}</h4>
                      {pattern.description && (
                        <p className="text-sm text-muted-foreground mt-1">{pattern.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleCopy(pattern.pattern)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(pattern.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {pattern.pattern}
                    </Badge>
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
