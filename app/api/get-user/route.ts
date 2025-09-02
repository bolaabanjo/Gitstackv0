// pages/api/get-user.ts
import { NextApiRequest, NextApiResponse } from "next"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerSupabaseClient({ req, res })

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const onboarding_complete = user.user_metadata?.onboarding_complete || false
  return res.status(200).json({ onboarding_complete })
}
