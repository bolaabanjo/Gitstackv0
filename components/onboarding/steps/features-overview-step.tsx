"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Brain, Search, Zap, Shield, ArrowRight, ArrowLeft, Upload, TestTube, MessageSquare } from "lucide-react"

interface FeaturesOverviewStepProps {
  onNext: () => void
  onPrev: () => void
}

export default function FeaturesOverviewStep({ onNext, onPrev }: FeaturesOverviewStepProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="font-serif font-bold text-3xl">Explore GitStack's Features</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Here's what you can do with your new project. Each feature is designed to enhance your development workflow.
        </p>
      </div>

      <div className="space-y-6">
        {/* Private LLM Fine-tuner */}
        <Card className="overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <CardHeader className="lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Code2 className="h-6 w-6" />
                </div>
                <Badge variant="outline">Private LLM Fine-tuner</Badge>
              </div>
              <CardTitle className="text-xl mb-3">Drag-and-Drop Fine-Tuning</CardTitle>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Upload project documentation, READMEs, and architecture notes to create a coding assistant that
                  understands your specific codebase and conventions.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-chart-3" />
                    <span>Models remain private and secure</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Upload className="h-4 w-4 text-chart-3" />
                    <span>Supports text, Markdown, and structured docs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-chart-3" />
                    <span>Local processing by default</span>
                  </li>
                </ul>
              </CardContent>
            </CardHeader>
            <div className="bg-muted/50 lg:p-8 p-6 flex items-center justify-center">
              <div className="text-center">
                <Code2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Fine-tuning Interface</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Regex Generator */}
        <Card className="overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="bg-muted/50 lg:p-8 p-6 flex items-center justify-center lg:order-1">
              <div className="text-center">
                <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Regex Lab Interface</p>
              </div>
            </div>
            <CardHeader className="lg:p-8 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Search className="h-6 w-6" />
                </div>
                <Badge variant="outline">Regex Generator & Tester</Badge>
              </div>
              <CardTitle className="text-xl mb-3">Natural Language to Regex</CardTitle>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Describe regex patterns in plain English and get validated regex with real-time feedback. No more
                  regex guesswork or debugging.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <TestTube className="h-4 w-4 text-chart-3" />
                    <span>Live highlighting and validation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-chart-3" />
                    <span>Natural language ↔ manual toggle</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-chart-3" />
                    <span>Performance optimization suggestions</span>
                  </li>
                </ul>
              </CardContent>
            </CardHeader>
          </div>
        </Card>

        {/* Ask My Repo */}
        <Card className="overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <CardHeader className="lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-chart-3/10 rounded-lg">
                  <Brain className="h-6 w-6" />
                </div>
                <Badge variant="outline">Ask My Repo</Badge>
              </div>
              <CardTitle className="text-xl mb-3">Conversational Codebase Query</CardTitle>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Parse repository structure and documentation directly. Get precise answers with direct code snippets
                  and file references.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-chart-3" />
                    <span>Parse functions, classes, and dependencies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-chart-3" />
                    <span>Works locally, no full repo upload</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-chart-3" />
                    <span>Direct code snippets with file references</span>
                  </li>
                </ul>
              </CardContent>
            </CardHeader>
            <div className="bg-muted/50 lg:p-8 p-6 flex items-center justify-center">
              <div className="text-center">
                <Brain className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Repository Query Interface</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex gap-3 justify-center pt-4">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext} size="lg" className="px-8">
          Complete Setup
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
