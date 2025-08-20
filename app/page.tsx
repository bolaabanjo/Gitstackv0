import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Code2, Brain, Search, Zap, Shield, Users } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export default async function HomePage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-8 w-8" />
            <span className="font-serif font-bold text-2xl">gitstack</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Documentation
            </Button>
            <Button variant="ghost" size="sm">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            {session ? (
              <Button size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button size="sm" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            Open Source • Initial Release
          </Badge>
          <h1 className="font-serif font-bold text-5xl md:text-6xl mb-6 leading-tight">AI-Powered Developer Toolkit</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            gitstack combines code comprehension, natural language query, and fine-tuning into one workflow. A private,
            project-specific coding assistant that adapts to your codebase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session ? (
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/dashboard">
                  <Zap className="h-5 w-5 mr-2" />
                  Go to Dashboard
                </Link>
              </Button>
            ) : (
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/auth/signup">
                  <Zap className="h-5 w-5 mr-2" />
                  Start Building
                </Link>
              </Button>
            )}
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Github className="h-5 w-5 mr-2" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-serif font-bold text-3xl text-center mb-12">Solving Developer Friction</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Brain className="h-8 w-8 mb-2 text-destructive" />
                <CardTitle>Context Gap</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Most coding assistants don't understand project-specific architecture, conventions, or styles.
                  Fine-tuning is often inaccessible or too costly.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Code2 className="h-8 w-8 mb-2 text-destructive" />
                <CardTitle>Regex Pain</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Regex remains one of the most frustrating aspects of programming. Existing tools are clunky,
                  disconnected, and lack real-time feedback.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Search className="h-8 w-8 mb-2 text-destructive" />
                <CardTitle>Repo Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Searching repos, scanning docs, or pinging teammates for answers wastes time. Embedding-based tools
                  often break down with large repos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif font-bold text-4xl text-center mb-16">Three Core Features</h2>

          <div className="space-y-20">
            {/* Private LLM Fine-tuner */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">
                  Private LLM Fine-tuner
                </Badge>
                <h3 className="font-serif font-bold text-3xl mb-4">Drag-and-Drop Fine-Tuning</h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Upload project docs, READMEs, and architecture notes to fine-tune a lightweight model. Your assistant
                  speaks your project's native language.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-chart-3" />
                    Models remain private, no data leakage
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-chart-3" />
                    Pipeline runs locally by default
                  </li>
                  <li className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-chart-3" />
                    Accepts text, Markdown, structured docs
                  </li>
                </ul>
              </div>
              <div className="bg-card rounded-lg p-8 border">
                <div className="bg-muted rounded-lg p-6 text-center">
                  <Code2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Fine-tuning Interface Preview</p>
                </div>
              </div>
            </div>

            {/* Regex Generator */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2">
                <Badge variant="outline" className="mb-4">
                  Regex Generator & Tester
                </Badge>
                <h3 className="font-serif font-bold text-3xl mb-4">Natural Language to Regex</h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  VS Code interface: describe regex in plain English and get validated regex with real-time feedback. No
                  more regex guesswork.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-chart-3" />
                    Live highlighting and validation
                  </li>
                  <li className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-chart-3" />
                    Natural language ↔ manual toggle
                  </li>
                  <li className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-chart-3" />
                    Performance and simplification suggestions
                  </li>
                </ul>
              </div>
              <div className="lg:order-1">
                <div className="bg-card rounded-lg p-8 border">
                  <div className="bg-muted rounded-lg p-6 text-center">
                    <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Regex Generator Interface</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ask My Repo */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">
                  Ask My Repo
                </Badge>
                <h3 className="font-serif font-bold text-3xl mb-4">Conversational Codebase Query</h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Parse repo structure and docs directly, avoiding brittle embeddings. Get precise answers with direct
                  code snippets and file references.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-chart-3" />
                    Parse functions, classes, dependencies
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-chart-3" />
                    Works locally, no full repo upload
                  </li>
                  <li className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-chart-3" />
                    Direct code snippets + file references
                  </li>
                </ul>
              </div>
              <div className="bg-card rounded-lg p-8 border">
                <div className="bg-muted rounded-lg p-6 text-center">
                  <Brain className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Repository Query Interface</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Open Source */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif font-bold text-3xl mb-8">Why Open Source?</h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Developers deserve an open-source solution that works in the IDE, respects privacy, and avoids lock-in.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 mb-4 text-chart-3" />
              <h3 className="font-serif font-semibold text-lg mb-2">Privacy First</h3>
              <p className="text-muted-foreground text-sm">Local-first architecture with transparent data handling</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 mb-4 text-chart-3" />
              <h3 className="font-serif font-semibold text-lg mb-2">Community Driven</h3>
              <p className="text-muted-foreground text-sm">
                Built by developers, for developers, with community contributions
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Code2 className="h-12 w-12 mb-4 text-chart-3" />
              <h3 className="font-serif font-semibold text-lg mb-2">No Lock-in</h3>
              <p className="text-muted-foreground text-sm">
                MIT/Apache 2.0 license with modular, extensible architecture
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif font-bold text-4xl mb-6">Ready to Transform Your Workflow?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the community of developers building the future of AI-powered development tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session ? (
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/dashboard">
                  <Zap className="h-5 w-5 mr-2" />
                  Go to Dashboard
                </Link>
              </Button>
            ) : (
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/auth/signup">
                  <Zap className="h-5 w-5 mr-2" />
                  Get Started Now
                </Link>
              </Button>
            )}
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Github className="h-5 w-5 mr-2" />
              Star on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-6 w-6" />
                <span className="font-serif font-bold text-xl">gitstack</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered toolkit for developers. Open source, privacy-first, and built for real workflows.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 GitStack. Open source under MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
