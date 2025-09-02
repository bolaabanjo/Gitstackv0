import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/server"
import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const { description } = await request.json()

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const systemPrompt = `You are a regex expert. Generate a regex pattern based on the user's description.

Rules:
1. Return ONLY the regex pattern, no delimiters like / /
2. Make the pattern as accurate and efficient as possible
3. Include common edge cases
4. Use proper escaping for special characters
5. After the pattern, provide a brief explanation

Format your response as JSON:
{
  "pattern": "your_regex_pattern_here",
  "explanation": "Brief explanation of what the pattern matches"
}`

    const { text } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      system: systemPrompt,
      prompt: `Generate a regex pattern for: ${description}`,
      maxTokens: 500,
    })

    try {
      const result = JSON.parse(text)
      return NextResponse.json(result)
    } catch {
      // Fallback if JSON parsing fails
      return NextResponse.json({
        pattern: text.trim(),
        explanation: "AI-generated regex pattern",
      })
    }
  } catch (error) {
    console.error("Regex generation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
