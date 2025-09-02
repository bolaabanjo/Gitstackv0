import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/auth/login" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Gitstack" width={32} height={32} className="h-8 w-8" />
            <span className="font-serif font-bold text-2xl">gitstack</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button size="sm" className="rounded-full" asChild>
              <Link href="/auth/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main role="main" className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl space-y-8">
          <div className="space-y-4">
            <h1 className="font-serif font-bold text-4xl md:text-5xl leading-tight">AI-Powered Developer Toolkit</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Private, project-specific coding assistant that adapts to your codebase. Fine-tune models, generate regex,
              and query repositories with natural language.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 rounded-full" asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 rounded-full bg-transparent" asChild>
              <Link href="https://github.com/gitstack/gitstack" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 mr-2" />
                View on GitHub
              </Link>
            </Button>
          </div>

          <div className="pt-8 text-sm text-muted-foreground">Open source • Privacy-first • Developer-focused</div>
        </div>
      </main>
    </div>
  )
}
