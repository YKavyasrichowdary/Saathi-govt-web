"use client";

import { ReactNode } from "react";

import ProgressBar from "@/components/onboarding/layout/ProgressBar";
import Navigation from "@/components/onboarding/layout/Navigation";

interface Props {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
}: Props) {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 py-10">
      <div className="glass rounded-3xl shadow-elegant w-full max-w-3xl p-10">

        <ProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
        />

        <div className="mt-10 min-h-[350px]">
          {children}
        </div>

        <Navigation
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          onNext={onNext}
          onBack={onBack}
        />

      </div>
    </main>
  );
}