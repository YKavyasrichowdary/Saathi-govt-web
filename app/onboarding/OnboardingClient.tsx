"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo  from "@/components/Logo";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

export default function OnboardingClient() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const s = STEPS[step];
  const current = answers[s.id] ?? [];
  const canNext = current.length > 0;

  function toggle(value: string) {
    setAnswers((prev) => {
      const arr = prev[s.id] ?? [];

      if (s.multi) {
        return {
          ...prev,
          [s.id]: arr.includes(value)
            ? arr.filter((x) => x !== value)
            : [...arr, value],
        };
      }

      return {
        ...prev,
        [s.id]: [value],
      };
    });
  }

  function handleBack() {
    if (step === 0) {
      router.push("/signup");
    } else {
      setStep((prev) => prev - 1);
    }
  }

  function handleNext() {
    if (step === STEPS.length - 1) {
      router.push("/dashboard");
    } else {
      setStep((prev) => prev + 1);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 pt-8">
        <Logo />
        <div className="text-xs text-muted-foreground">
          Step {step + 1} of {STEPS.length}
        </div>
      </header>

      {/* Progress Bar */}
      <div className="mx-auto mt-6 h-1 w-full max-w-3xl overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{
            width: `${((step + 1) / STEPS.length) * 100}%`,
          }}
        />
      </div>

      <main className="mx-auto w-full max-w-2xl px-6 pb-24 pt-16">
        <div className="text-eyebrow">A few small questions</div>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {s.title}
        </h1>

        <p className="mt-3 text-lg text-muted-foreground">
          {s.subtitle}
        </p>

        {/* Options */}
        <div className="mt-8 flex flex-wrap gap-2">
          {s.options.map((option) => {
            const active = current.includes(option);

            return (
              <button
                key={option}
                onClick={() => toggle(option)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_oklch(0.55_0.2_262/0.5)]"
                    : "border-border bg-surface text-foreground hover:border-primary/40"
                }`}
              >
                {active && <Check className="h-3.5 w-3.5" />}
                {option}
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <button
            disabled={!canNext}
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.55_0.2_262/0.6)] hover:-translate-y-[1px] disabled:pointer-events-none disabled:opacity-40"
          >
            {step === STEPS.length - 1 ? "Enter SAATHI" : "Continue"}

            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  );
}

const STEPS = [
  {
    id: "stage",
    title: "Where are you in your journey?",
    subtitle:
      "So SAATHI shows you the right opportunities from day one.",
    options: [
      "Class 10",
      "Class 11",
      "Class 12",
      "Undergraduate",
      "Graduate",
      "Working professional",
    ],
    multi: false,
  },
  {
    id: "dreams",
    title: "What are you preparing for?",
    subtitle:
      "Pick everything that feels like yours. You can change this any time.",
    options: [
      "Scholarships",
      "Engineering (JEE)",
      "Medical (NEET)",
      "GATE",
      "UPSC / SSC",
      "Bank exams",
      "CAT / MBA",
      "Placements",
      "Internships",
      "Study abroad",
    ],
    multi: true,
  },
  {
    id: "context",
    title: "Anything SAATHI should know?",
    subtitle:
      "Share your language, state, or family income if you'd like tailored scheme suggestions.",
    options: [
      "English",
      "हिंदी",
      "தமிழ்",
      "తెలుగు",
      "বাংলা",
      "मराठी",
      "ગુજરાતી",
      "ಕನ್ನಡ",
    ],
    multi: true,
  },
  {
    id: "commit",
    title: "How much time can you give, honestly?",
    subtitle:
      "No judgement. SAATHI plans around your real life.",
    options: [
      "30 min / day",
      "1 hour / day",
      "2 hours / day",
      "3+ hours / day",
      "Weekends only",
    ],
    multi: false,
  },
];
