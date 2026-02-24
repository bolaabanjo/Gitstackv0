import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  let pattern: string;
  try {
    const body = await request.json();
    pattern = body.pattern;

    // Validate the incoming 'pattern' to ensure it's a non-empty string.
    if (typeof pattern !== 'string' || pattern.trim().length === 0) {
      return NextResponse.json({ error: "Invalid pattern provided. Pattern must be a non-empty string." }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

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
    // Differentiate between JSON parsing errors and other server errors
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
      return NextResponse.json({ error: "Invalid JSON body provided" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
