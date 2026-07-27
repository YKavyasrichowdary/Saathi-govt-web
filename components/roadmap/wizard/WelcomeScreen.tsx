"use client";

import { Brain, FileText, Target, Sparkles, User } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const items = [
  {
    icon: <User className="h-5 w-5" />,
    title: "Your Profile",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Resume & Skills",
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: "Opportunity Requirements",
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: "Skill Gaps",
  },
];

export default function WelcomeScreen({
  onStart,
}: WelcomeScreenProps) {
  return (
    <div className="surface-card rounded-3xl border border-border p-10">

      <div className="mx-auto max-w-2xl text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="h-10 w-10" />
        </div>

        <h1 className="mt-6 text-4xl font-bold">
          Build Your AI Success Plan
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          I'll analyze your profile, resume, skills and this opportunity to
          create a personalized execution strategy—not just a generic study plan.
        </p>

      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">

        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border p-5"
          >
            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                {item.icon}
              </div>

              <span className="font-medium">
                {item.title}
              </span>

            </div>
          </div>
        ))}

      </div>

      <div className="mt-10 rounded-2xl bg-primary/5 border border-primary/10 p-5">

        <p className="text-sm text-muted-foreground">
          ⏱ This usually takes less than 30 seconds.
        </p>

      </div>

      <div className="mt-10 flex justify-center">

        <button
          onClick={onStart}
          className="btn-primary px-10 py-4 text-lg"
        >
          Let's Begin
        </button>

      </div>

    </div>
  );
}