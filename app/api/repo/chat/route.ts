import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"
import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const { message, repository } = await request.json()

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const systemPrompt = `You are a code analysis assistant for the GitHub repository "${repository.full_name}".

Repository Details:
- Name: ${repository.name}
- Description: ${repository.description}
- Primary Language: ${repository.language}
- Stars: ${repository.stars}
- URL: ${repository.url}

You help developers understand codebases by:
- Explaining code structure and architecture
- Identifying patterns and best practices
- Suggesting improvements and optimizations
- Answering questions about functionality
- Helping with debugging and troubleshooting
- Providing insights about dependencies and technologies used

Be helpful, accurate, and provide actionable insights. If you need to see specific code to answer a question, let the user know.`

    const { text } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      system: systemPrompt,
      prompt: message,
      maxTokens: 1000,
    })

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("Repository chat error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
