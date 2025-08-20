"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Code2 } from "lucide-react"
import type { User } from "@supabase/supabase-js"
import WelcomeStep from "./steps/welcome-step"
import ProjectSetupStep from "./steps/project-setup-step"
import FeaturesOverviewStep from "./steps/features-overview-step"
import CompletionStep from "./steps/completion-step"

interface OnboardingFlowProps {
  user: User
}

export type OnboardingStep = "welcome" | "project-setup" | "features-overview" | "completion"

export default function OnboardingFlow({ user }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome")
  const [projectData, setProjectData] = useState<{
    name: string
    description: string
    githubUrl?: string
  } | null>(null)

  const steps: OnboardingStep[] = ["welcome", "project-setup", "features-overview", "completion"]
  const currentStepIndex = steps.indexOf(currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex])
    }
  }

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex])
    }
  }

  const handleProjectSetup = (data: { name: string; description: string; githubUrl?: string }) => {
    setProjectData(data)
    nextStep()
  }

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
            <Badge variant="secondary">Welcome, {user.user_metadata?.full_name || user.email}</Badge>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Getting Started</span>
            <span className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Step Content */}
      <main className="container mx-auto px-4 py-8">
        {currentStep === "welcome" && <WelcomeStep onNext={nextStep} />}

        {currentStep === "project-setup" && <ProjectSetupStep onNext={handleProjectSetup} onPrev={prevStep} />}

        {currentStep === "features-overview" && <FeaturesOverviewStep onNext={nextStep} onPrev={prevStep} />}

        {currentStep === "completion" && <CompletionStep projectData={projectData} user={user} />}
      </main>
    </div>
  )
}
