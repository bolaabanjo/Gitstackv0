import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const { pattern } = await request.json()

    const supabase = createRouteHandlerClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const systemPrompt = `You are a regex expert. Explain regex patterns in plain English.

Rules:
1. Break down the pattern piece by piece
2. Explain what each part does
3. Use simple, non-technical language when possible
4. Mention what the overall pattern matches
5. Keep the explanation concise but comprehensive

The user will provide a regex pattern, and you should explain it clearly.`

    const { text } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      system: systemPrompt,
      prompt: `Explain this regex pattern: ${pattern}`,
      maxTokens: 800,
    })

    return NextResponse.json({ explanation: text.trim() })
  } catch (error) {
    console.error("Regex explanation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
