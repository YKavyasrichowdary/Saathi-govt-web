"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";

import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  onboardingSchema,
  OnboardingForm,
  OnboardingInput,
} from "@/schemas/onboarding.schema";

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
  const router = useRouter();

  const methods = useForm<OnboardingInput, any, OnboardingForm>({
    resolver: zodResolver(onboardingSchema),

    mode: "onChange",

defaultValues: {
  phone: "",
  gender: undefined,
  dateOfBirth: "",
  city: "",
  state: "",
  country: "",
  bio: "",

  educationLevel: undefined,
  institutionName: "",
  university: "",
  course: "",
  specialization: "",
  currentSemester: "",
  graduationYear: new Date().getFullYear(),
  cgpa: undefined,

  skills: [],

  interests: [],

  careerGoals: [],
},
  });

  const CurrentStep = steps[currentStep];

  async function nextStep() {
    if (currentStep === 0) {
      const valid = await methods.trigger();
      if (!valid) return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }

  function previousStep() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  async function finishOnboarding() {
    const valid = await methods.trigger();
    if (!valid) return;

    const response = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(methods.getValues()),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    router.push("/dashboard");
  }

  return (
    <FormProvider {...methods}>
      <OnboardingLayout
        currentStep={currentStep}
        totalSteps={steps.length}
        onNext={
          currentStep === steps.length - 1
            ? finishOnboarding
            : nextStep
        }
        onBack={previousStep}
        isFirstStep={currentStep === 0}
        isLastStep={currentStep === steps.length - 1}
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