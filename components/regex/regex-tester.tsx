"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { TestTube, AlertCircle, CheckCircle } from "lucide-react"

export function RegexTester() {
  const [pattern, setPattern] = useState("")
  const [testText, setTestText] = useState("")
  const [flags, setFlags] = useState({
    global: true,
    ignoreCase: false,
    multiline: false,
  })
  const [matches, setMatches] = useState<RegExpMatchArray[]>([])
  const [isValid, setIsValid] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!pattern) {
      setMatches([])
      setIsValid(true)
      setError("")
      return
    }

    try {
      const flagString = `${flags.global ? "g" : ""}${flags.ignoreCase ? "i" : ""}${flags.multiline ? "m" : ""}`
      const regex = new RegExp(pattern, flagString)
      setIsValid(true)
      setError("")

      if (testText) {
        const allMatches: RegExpMatchArray[] = []
        if (flags.global) {
          let match
          const globalRegex = new RegExp(pattern, flagString)
          while ((match = globalRegex.exec(testText)) !== null) {
            allMatches.push(match)
            if (!flags.global) break
          }
        } else {
          const match = testText.match(regex)
          if (match) allMatches.push(match)
        }
        setMatches(allMatches)
      } else {
        setMatches([])
      }
    } catch (err) {
      setIsValid(false)
      setError(err instanceof Error ? err.message : "Invalid regex pattern")
      setMatches([])
    }
  }, [pattern, testText, flags])

  const highlightMatches = (text: string, matches: RegExpMatchArray[]) => {
    if (!matches.length) return text

    let result = text
    let offset = 0

    matches.forEach((match) => {
      if (match.index !== undefined) {
        const start = match.index + offset
        const end = start + match[0].length
        const highlighted = `<mark class="bg-yellow-200 dark:bg-yellow-800">${match[0]}</mark>`
        result = result.slice(0, start) + highlighted + result.slice(end)
        offset += highlighted.length - match[0].length
      }
    })

    return result
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Test Regex Pattern
          </CardTitle>
          <CardDescription>Test your regex patterns against sample text and see live results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="pattern">Regex Pattern</Label>
            <div className="flex items-center gap-2">
              <Input
                id="pattern"
                placeholder="Enter your regex pattern..."
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className={`font-mono ${!isValid ? "border-destructive" : ""}`}
              />
              {isValid ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-destructive" />
              )}
            </div>
            {error && <p className="text-sm text-destructive mt-1">{error}</p>}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="global"
                checked={flags.global}
                onCheckedChange={(checked) => setFlags((prev) => ({ ...prev, global: checked }))}
              />
              <Label htmlFor="global">Global (g)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="ignoreCase"
                checked={flags.ignoreCase}
                onCheckedChange={(checked) => setFlags((prev) => ({ ...prev, ignoreCase: checked }))}
              />
              <Label htmlFor="ignoreCase">Ignore Case (i)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="multiline"
                checked={flags.multiline}
                onCheckedChange={(checked) => setFlags((prev) => ({ ...prev, multiline: checked }))}
              />
              <Label htmlFor="multiline">Multiline (m)</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="testText">Test Text</Label>
            <Textarea
              id="testText"
              placeholder="Enter text to test your regex against..."
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              rows={6}
            />
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {pattern && testText && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>
              {matches.length > 0 ? `Found ${matches.length} match(es)` : "No matches found"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {matches.length > 0 && (
              <>
                <div>
                  <Label>Highlighted Text</Label>
                  <div
                    className="p-3 border rounded-md bg-muted/50 whitespace-pre-wrap font-mono text-sm"
                    dangerouslySetInnerHTML={{ __html: highlightMatches(testText, matches) }}
                  />
                </div>

                <div>
                  <Label>Matches</Label>
                  <div className="space-y-2">
                    {matches.map((match, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Badge variant="outline">Match {index + 1}</Badge>
                        <code className="px-2 py-1 bg-muted rounded text-sm">{match[0]}</code>
                        {match.index !== undefined && (
                          <span className="text-sm text-muted-foreground">at position {match.index}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
