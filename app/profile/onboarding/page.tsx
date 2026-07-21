"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";

import OnboardingLayout from "@/components/onboarding/layout/OnboardingLayout";

import PersonalStep from "@/components/onboarding/steps/PersonalStep";
import EducationStep from "@/components/onboarding/steps/EducationStep";
import SkillsStep from "@/components/onboarding/steps/SkillsStep";
import InterestsStep from "@/components/onboarding/steps/InterestsStep";
import CareerGoalStep from "@/components/onboarding/steps/CareerGoalStep";

const steps = [
  PersonalStep,
  EducationStep,
  SkillsStep,
  InterestsStep,
  CareerGoalStep,
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm({
    defaultValues: {
      phone: "",
      city: "",
      state: "",
      country: "",
      bio: "",
    },
  });

  const CurrentStep = steps[currentStep];

  function nextStep() {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }

  function previousStep() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  return (
    <FormProvider {...methods}>
      <OnboardingLayout
        currentStep={currentStep}
        totalSteps={steps.length}
        onNext={nextStep}
        onBack={previousStep}
        isLastStep={currentStep === steps.length - 1}
        isFirstStep={currentStep === 0}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentStep />
          </motion.div>
        </AnimatePresence>
      </OnboardingLayout>
    </FormProvider>
  );
}