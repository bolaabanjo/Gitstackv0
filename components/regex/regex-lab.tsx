"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, TestTube, BookOpen, Save } from "lucide-react"
import Link from "next/link"
import { RegexGenerator } from "./regex-generator"
import { RegexTester } from "./regex-tester"
import { RegexExplainer } from "./regex-explainer"
import { SavedPatterns } from "./saved-patterns"

export function RegexLab() {
  const [activeTab, setActiveTab] = useState("generate")

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
          <h1 className="text-3xl font-bold text-foreground">Regex Lab</h1>
          <p className="text-muted-foreground mt-2">
            Generate, test, and understand regular expressions with AI assistance
          </p>
        </div>
      </div>

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Generate
          </TabsTrigger>
          <TabsTrigger value="test" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Test
          </TabsTrigger>
          <TabsTrigger value="explain" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Explain
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Saved
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate">
          <RegexGenerator />
        </TabsContent>

        <TabsContent value="test">
          <RegexTester />
        </TabsContent>

        <TabsContent value="explain">
          <RegexExplainer />
        </TabsContent>

        <TabsContent value="saved">
          <SavedPatterns />
        </TabsContent>
      </Tabs>
    </div>
  )
}
