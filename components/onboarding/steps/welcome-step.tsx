"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Brain, Search, Shield, ArrowRight } from "lucide-react"

interface WelcomeStepProps {
  onNext: () => void
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <h1 className="font-serif font-bold text-4xl md:text-5xl">Welcome to GitStack</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Your AI-powered developer toolkit that combines code comprehension, natural language query, and fine-tuning
          into one seamless workflow.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 my-12">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Code2 className="h-8 w-8" />
            </div>
            <CardTitle className="text-lg">Private LLM Fine-tuner</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Upload project docs and fine-tune a model that speaks your codebase's language
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-full w-fit">
              <Search className="h-8 w-8" />
            </div>
            <CardTitle className="text-lg">Regex Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Describe regex patterns in plain English and get validated results instantly
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 p-3 bg-chart-3/10 rounded-full w-fit">
              <Brain className="h-8 w-8" />
            </div>
            <CardTitle className="text-lg">Ask My Repo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Query your repository structure and get precise answers with code snippets
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4 text-chart-3" />
          <span>Privacy-first • Open source • Local-first architecture</span>
        </div>

        <Button size="lg" onClick={onNext} className="text-lg px-8">
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
