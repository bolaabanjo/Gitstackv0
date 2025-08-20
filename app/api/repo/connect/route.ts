import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    const supabase = createRouteHandlerClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Extract owner and repo from GitHub URL
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/)
    if (!match) {
      return NextResponse.json({ error: "Invalid GitHub URL" }, { status: 400 })
    }

    const [, owner, repo] = match
    const fullName = `${owner}/${repo}`

    // In a real implementation, you would:
    // 1. Call GitHub API to get repository details
    // 2. Validate that the repository exists and is accessible
    // 3. Store repository metadata in Supabase

    // For demo purposes, we'll create a mock repository entry
    const mockRepository = {
      name: repo,
      full_name: fullName,
      description: `A repository for ${repo}`,
      url: url,
      language: "JavaScript",
      stars: Math.floor(Math.random() * 1000),
      forks: Math.floor(Math.random() * 100),
      user_id: session.user.id,
    }

    const { data: repository, error } = await supabase.from("repositories").insert(mockRepository).select().single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save repository" }, { status: 500 })
    }

    return NextResponse.json({ repository })
  } catch (error) {
    console.error("Repository connection error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
