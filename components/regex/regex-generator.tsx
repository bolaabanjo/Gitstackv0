"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Copy, Wand2, Loader2, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function RegexGenerator() {
  const [description, setDescription] = useState("")
  const [generatedPattern, setGeneratedPattern] = useState("")
  const [explanation, setExplanation] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast({
        title: "Missing description",
        description: "Please describe what you want to match.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/regex/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      })

      const data = await response.json()

      if (data.pattern) {
        setGeneratedPattern(data.pattern)
        setExplanation(data.explanation || "")
        toast({
          title: "Pattern generated",
          description: "Your regex pattern has been created successfully.",
        })
      } else {
        throw new Error("No pattern generated")
      }
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating your regex pattern.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = async () => {
    if (!generatedPattern) return

    try {
      await navigator.clipboard.writeText(generatedPattern)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
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

  const examples = [
    "Match email addresses",
    "Extract phone numbers from text",
    "Validate credit card numbers",
    "Match URLs and web addresses",
    "Find dates in MM/DD/YYYY format",
    "Extract hashtags from social media posts",
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            Generate Regex Pattern
          </CardTitle>
          <CardDescription>
            Describe what you want to match in plain English, and AI will generate the regex pattern for you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">What do you want to match?</Label>
            <Textarea
              id="description"
              placeholder="e.g., Email addresses with common domains like gmail, yahoo, and outlook"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating || !description.trim()} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Pattern...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Regex
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Pattern */}
      {generatedPattern && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Pattern</CardTitle>
            <CardDescription>Your AI-generated regex pattern is ready to use</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Input value={generatedPattern} readOnly className="font-mono" />
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            {explanation && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Explanation:</h4>
                <p className="text-sm text-muted-foreground">{explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Example Prompts</CardTitle>
          <CardDescription>Click on any example to try it out</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {examples.map((example, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80"
                onClick={() => setDescription(example)}
              >
                {example}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
