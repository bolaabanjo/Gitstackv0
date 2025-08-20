"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function RegexExplainer() {
  const [pattern, setPattern] = useState("")
  const [explanation, setExplanation] = useState("")
  const [isExplaining, setIsExplaining] = useState(false)
  const { toast } = useToast()

  const handleExplain = async () => {
    if (!pattern.trim()) {
      toast({
        title: "Missing pattern",
        description: "Please enter a regex pattern to explain.",
        variant: "destructive",
      })
      return
    }

    setIsExplaining(true)

    try {
      const response = await fetch("/api/regex/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pattern }),
      })

      const data = await response.json()

      if (data.explanation) {
        setExplanation(data.explanation)
        toast({
          title: "Pattern explained",
          description: "Your regex pattern has been explained in plain English.",
        })
      } else {
        throw new Error("No explanation generated")
      }
    } catch (error) {
      toast({
        title: "Explanation failed",
        description: "There was an error explaining your regex pattern.",
        variant: "destructive",
      })
    } finally {
      setIsExplaining(false)
    }
  }

  const commonPatterns = [
    { pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", description: "Email validation" },
    { pattern: "\\b\\d{3}-\\d{3}-\\d{4}\\b", description: "Phone number (XXX-XXX-XXXX)" },
    { pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$", description: "Strong password" },
    {
      pattern:
        "^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$",
      description: "URL validation",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Explain Regex Pattern
          </CardTitle>
          <CardDescription>Enter a regex pattern and get a plain English explanation of what it does</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="pattern">Regex Pattern</Label>
            <Input
              id="pattern"
              placeholder="Enter regex pattern to explain..."
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="font-mono"
            />
          </div>

          <Button onClick={handleExplain} disabled={isExplaining || !pattern.trim()} className="w-full">
            {isExplaining ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Explaining Pattern...
              </>
            ) : (
              <>
                <BookOpen className="h-4 w-4 mr-2" />
                Explain Pattern
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Explanation */}
      {explanation && (
        <Card>
          <CardHeader>
            <CardTitle>Pattern Explanation</CardTitle>
            <CardDescription>Here's what your regex pattern does in plain English</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm leading-relaxed">{explanation}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Common Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Common Patterns</CardTitle>
          <CardDescription>Click on any pattern to see its explanation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {commonPatterns.map((item, index) => (
              <div
                key={index}
                className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setPattern(item.pattern)}
              >
                <div className="font-mono text-sm mb-1">{item.pattern}</div>
                <div className="text-sm text-muted-foreground">{item.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
