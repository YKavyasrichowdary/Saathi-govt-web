"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import StepIndicator from "./StepIndicator";
import DailyHoursStep from "./DailyHoursStep";
import ConfidenceStep from "./ConfidenceStep";
import GoalStep from "./GoalStep";
import StudyTimeStep from "./StudyTimeStep";
import WizardNavigation from "./WizardNavigation";
import WelcomeScreen from "./WelcomeScreen";
import AIThinkingScreen from "./AIThinkingScreen";

interface PreparationWizardProps {
  opportunityId?: string;
}

export default function PreparationWizard({
  opportunityId = "",
}: PreparationWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [thinking, setThinking] = useState(false);

  const [wizardData, setWizardData] = useState<{
    dailyHours?: number;
    confidence?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    goal?: "QUALIFY" | "COMPETITIVE";
    preferredStudyTime?: "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT";
  }>({
    dailyHours: 1,
    confidence: undefined,
    goal: undefined,
    preferredStudyTime: undefined,
  });

  async function generateRoadmap(dataToSubmit = wizardData) {
    setThinking(true);
    try {
      const response = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          opportunityId,
          ...dataToSubmit,
        }),
      });

      const data = await response.json();
      
      if (data.success && data.roadmap?.id) {
        router.push(`/roadmap/${data.roadmap.id}`);
      }
    } catch (error) {
      console.error("Failed to generate roadmap:", error);
    }
  }

  if (thinking) {
    return <AIThinkingScreen />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      {step > 0 && (
        <StepIndicator
          currentStep={step}
          totalSteps={4}
        />
      )}

      {step === 0 && (
        <WelcomeScreen
          onStart={() => setStep(1)}
        />
      )}

      <div className="mt-8">
        {step === 1 && (
          <DailyHoursStep
            value={wizardData.dailyHours}
            onSelect={(hours) => {
              setWizardData((prev) => ({
                ...prev,
                dailyHours: hours,
              }));

              setTimeout(() => {
                setStep(2);
              }, 250);
            }}
          />
        )}

        {step === 2 && (
          <ConfidenceStep
            value={wizardData.confidence}
            onSelect={(confidence) => {
              setWizardData((prev) => ({
                ...prev,
                confidence,
              }));

              setTimeout(() => {
                setStep(3);
              }, 250);
            }}
          />
        )}

        {step === 3 && (
          <GoalStep
            value={wizardData.goal}
            onSelect={(goal) => {
              setWizardData((prev) => ({
                ...prev,
                goal,
              }));

              setTimeout(() => {
                setStep(4);
              }, 250);
            }}
          />
        )}

        {step === 4 && (
          <StudyTimeStep
            value={wizardData.preferredStudyTime}
            onSelect={(preferredStudyTime) => {
              const updatedData = {
                ...wizardData,
                preferredStudyTime,
              };
              setWizardData(updatedData);

              setTimeout(() => {
                generateRoadmap(updatedData);
              }, 250);
            }}
          />
        )}
      </div>

      {step > 0 && (
        <WizardNavigation
          currentStep={step}
          totalSteps={4}
          onBack={step > 1 ? () => setStep(step - 1) : undefined}
          onNext={
            step === 4
              ? () => generateRoadmap()
              : () => setStep(step + 1)
          }
        />
      )}
    </div>
  );
}