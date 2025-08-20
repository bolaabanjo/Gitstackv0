import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const { message, projectId } = await request.json()

    const supabase = createRouteHandlerClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get project details and knowledge base
    const { data: project } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .eq("user_id", session.user.id)
      .single()

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // In a real implementation, you would:
    // 1. Fetch knowledge base items for this project from Supabase
    // 2. Create embeddings and do semantic search
    // 3. Include relevant context in the prompt

    const systemPrompt = `You are a private coding assistant for the project "${project.name}". 
    
Project Description: ${project.description}

You have access to the user's project documentation and codebase knowledge. Help them with:
- Code implementation questions
- Architecture decisions
- Best practices for their specific project
- Debugging and troubleshooting
- Code reviews and suggestions

Be concise, practical, and focus on actionable advice. Always consider the context of their specific project.`

    const { text } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      system: systemPrompt,
      prompt: message,
      maxTokens: 1000,
    })

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
