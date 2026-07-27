"use client";

import { useEffect, useState } from "react";
import { Brain, CheckCircle2, Loader2 } from "lucide-react";

const steps = [
  "Reading your profile",
  "Analyzing your resume",
  "Understanding opportunity",
  "Finding skill gaps",
  "Planning milestones",
  "Scheduling missions",
  "Preparing your Success Plan",
];

export default function AIThinkingScreen() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="surface-card rounded-3xl border border-border p-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary animate-pulse">
          <Brain className="h-12 w-12" />
        </div>

        <h1 className="mt-8 text-4xl font-bold">
          Building Your Success Plan
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          Sit back while Saathi understands your profile and prepares a personalized execution strategy.
        </p>

        <div className="mt-10 rounded-2xl border border-border p-6 text-left space-y-3">
          {steps.map((step, index) => {
            const isDone = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            if (index > currentStepIndex) return null;

            return (
              <div key={step} className="flex items-center gap-3 text-base font-medium">
                {isDone && <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />}
                {isCurrent && <Loader2 className="h-5 w-5 text-primary animate-spin shrink-0" />}
                <span className={isDone ? "text-muted-foreground" : "text-foreground"}>
                  {step}{isCurrent ? "..." : ""}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}